<template>
  <div class="register app-container">
    <el-row>
      <el-col :span="4">
        <div class="head-container" style="flex-direction: column !important;">
          <el-select
            v-model="belongCompanyName"
            placeholder="组织架构"
            @change="handelChange"
            style="margin-top:5px;margin-bottom:8px;"
          >
            <el-option
              v-for="item in CompaniesList"
              :key="item.companyId"
              :label="item.name"
              :value="item.companyId"
            >
            </el-option>
          </el-select>

          <el-input
            v-model="companyName"
            placeholder="请输入项目名称"
            clearable
            @keyup.enter.native="handleQuery(companyName)"
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 0px;width: 100%"
          />
        </div>
        <div class="tree-container" style="position:relative">
          <el-tree
            :data="typeOptions"
            :props="{
              label: 'name',
              children: 'children'
            }"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            node-key="companyId"
            ref="tree"
            :highlight-current='true'
            default-expand-all
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span v-show="data.flag">{{ node.label }}</span>
              <span v-show="!data.flag">
                <el-input
                  class="slot-t-input"
                  size="mini"
                  style="width:100px"
                  autofocus
                  v-model="data.name"
                  :ref="'slotTreeInput' + data.id"
                  @blur.stop="NodeBlur(node, data)"
                  @keydown.native.enter="NodeBlur(node, data)"
                >
                </el-input>
              </span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="treeEdit(node, data)"
                >
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >
                  <i class="el-icon-delete"></i>
                </el-button>
              </span>
            </span>
          </el-tree>
          <div
            style="width:100%;text-align: center;
            position: absolute;
            bottom: 30px;"
          >
            <el-button
              type="text"
              style="background:#f1f1f1;width:100%"
              @click="classificationShow = true"
            >
              <i class="el-icon-circle-plus-outline" style="font-size:16px" />
              新增分类
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="search-vi">
          <el-button
            type="primary"
            plain
            @click="addItems"
            style="display: inline-block;margin-right:12px;"
            >新增项目</el-button
          >

          <div class="msgbox-vi">
            <label>公告</label>
            <div class="msg-vi">
              这里是一条消息，后面也是一条消息，消息轮播这里是...
            </div>
          </div>
        </div>
        <div class="table-data">
          <!-- <el-tabs tab-position="left" > -->
          <!-- <el-row> -->
          <el-col :span="4">
            <div class="tree-container">
              <el-tree
                :data="titleArray"
                :props="{
                  label: 'name',
                  children: 'children'
                }"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                node-key="companyId"
                ref="tree"
                default-expand-all
                @node-click="titleNodeClick"
              />
            </div>
          </el-col>
          <el-col :span="20" style="hieht:100%;">
            <!-- <div> -->
            <el-col :span="24">
              <div class="content-top">
                <span
                  style="
                      font-size: 20px;
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: #303133;
                      line-height: 24px;"
                  >{{ formData.businessType }}
                </span>
                <div class="content-btnbox">
                  <el-button
                    plain
                    @click="initialize"
                    v-if="titleArray.length > 0"
                    >恢复初始化</el-button
                  >
                  <el-button
                    type="danger"
                    plain
                    v-if="titleArray.length > 0"
                    @click="projectTemplate"
                    >删除</el-button
                  >
                  <el-button
                    type="primary"
                    v-if="titleArray.length > 0"
                    @click="saveData"
                    >保存</el-button
                  >
                </div>
              </div>
            </el-col>
            <el-form class="content-content">
              <el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="项目名称">
                      <el-input
                        placeholder="请输入项目名称"
                        v-model="formData.name"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="业务类型">
                      <!-- <el-input
                        placeholder="请输入业务类型"
                        v-model="formData.businessType"
                      /> -->
                      <el-select
                        v-model="formData.parentId"
                        filterable
                        placeholder="请选择"
                        style="width:100%"
                        @change="ProjectChange2"
                      >
                        <el-option
                          v-for="item in ProjectList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="项目金额">
                      <el-input
                        placeholder="请输入项目金额"
                        v-model="formData.price"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="是否为周期性项目"
                      style="display：flex !important;"
                    >
                      <el-radio-group v-model="formData.type" style="width: 100%;">
                        <el-radio :label="20">是</el-radio>
                        <el-radio :label="10">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="项目要求">
                      <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入业务类型"
                        v-model="formData.matterContent"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="所需资料">
                      <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入业务类型"
                        v-model="formData.relatedDataName"
                      />
                    </el-form-item>
                  </el-col>
                  <!-- 步骤记录 -->
                  <el-col :span="24" class="box_table">
                    <el-col :span="24">
                      <div class="box_table_header">
                        <div class="table_left">
                          <i class="el-icon-s-operation "></i>
                          <span>税务备案</span>
                        </div>
                        <div class="table_right">
                          <el-button
                            type="primary"
                            plain
                            @click="addStep"
                            v-if="titleArray.length > 0"
                            style="display: inline-block;margin-right:12px;"
                            >+ 添加步骤</el-button
                          >

                          <!-- <el-progress
                            :percentage="progressBarPercent"
                            :format="format"
                            :stroke-width="6"
                          ></el-progress> -->
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <el-table
                        style="width: 100%;display: grid;"
                        :data="tableArray"
                      >
                        <el-table-column
                          type="selection"
                          align="center"
                          style="grid-template-columns: 10%;"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="performSorting"
                          label="序号"
                          align="center"
                          min-width="50"
                        >
                          <template slot-scope="scope">
                            步骤{{ scope.row.performSorting }}
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="步骤名"
                          align="left"
                          show-overflow-tooltip
                          prop="performName"
                          min-width="454"
                        >
                          <template slot-scope="scope">
                            <el-tooltip
                              effect="dark"
                              :content="scope.row.performName"
                              placement="top"
                            >
                              <el-input
                                type="text"
                                v-model="scope.row.performName"
                                size="mini"
                              />
                            </el-tooltip>
                          </template>
                        </el-table-column>

                        <el-table-column
                          label="操作"
                          align="center"
                          min-width="120"
                        >
                          <template slot-scope="scope">
                            <div
                              style="display: flex; justify-content:space-between;color:#4977E0;"
                              class="omg"
                            >
                              <div
                                class="textclick"
                                @click="interposition(scope.row.performSorting)"
                              >
                                插入
                              </div>
                              <div
                                class="textclick"
                                @click="deleteStep(scope.row)"
                              >
                                删除
                              </div>
                              <div
                                class="textclick"
                                style="margin-right：8px; text-decoration: underline;color:#EF5465;"
                                @click="theAttachment(scope.row)"
                              >
                                所需附件
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="项目成果">
                      <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入业务类型"
                        v-model="formData.achievement"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-row>
            </el-form>
            <!-- </div> -->
          </el-col>
        </div>
      </el-col>
    </el-row>
    <!-- 新增分类 -->
    <el-dialog
      title="新增分类"
      :visible.sync="classificationShow"
      width="422px"
      append-to-body
      class="items"
    >
      <el-form :model="classificationForm">
        <el-row>
          <el-col :span="24" class="add-name">
            <el-form-item label="项目名称" style="display：flex !important;">
              <el-input
                placeholder="请输入项目名称"
                v-model="classificationForm.name"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" class="add-name">
            <el-form-item label="所属类型" style="display：flex !important;">
              <el-select
                v-model="classificationForm.type"
                filterable
                placeholder="请选择"
                style="width:184px"
                @change="ProjectChange"
              >
              <el-option
                      v-for="item in serviceCategoryList"
                      :key="item.dictCode"
                      :label="item.dictLabel"
                      :value="item.dictCode"
                    >
                    </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="24" class="add-name">
            <el-form-item
              label="是否为周期性项目"
              style="display：flex !important;"
            >
              <el-radio-group v-model="classificationForm.type">
                <el-radio :label="20">是</el-radio>
                <el-radio :label="10">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer bottom">
        <el-button @click="classificationShow = false">取 消</el-button>
        <el-button type="primary" @click="addClassification">确定</el-button>
      </div>
    </el-dialog>
    <!-- 所需附件 -->
    <el-dialog
      title="所需附件"
      :visible.sync="theAttachmentState"
      width="516px"
      append-to-body
    >
      <div style="padding-bottom:40px; padding-top:30px;">
        <el-tag
          :key="tag.id"
          v-for="tag in labelList"
          closable
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <div v-if="inputVisible" class="box-inpt-box">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @keyup.enter.native="handleInputConfirm()"
            value-key="label"
            class="seek-frame"
            :autofocus="true"
            @select="handleSelect"
          >
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="handleIconClick"
            >
            </i>
            <template slot-scope="{ item }">
              <div class="name" v-if="item.add" @click="addLabelUp">
                <i class="el-icon-plus"></i>
                {{ item.name }}
              </div>
              <div class="name" v-else>{{ item.label }}</div>
            </template>
          </el-autocomplete>
        </div>
        <div v-else>
          <el-button class="button-new-tag" size="small" @click="showInput"
            >+ 添加所需附件</el-button
          >
        </div>
      </div>
      <div style="margin-top：30px;text-align: right; ">
        <el-button @click="theAttachmentState = !theAttachmentState"
          >取 消</el-button
        >
        <el-button type="primary" @click="addLabelListSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 添加标签 -->
    <el-dialog
      title="新增标签"
      :visible.sync="addTagUp"
      width="422px"
      append-to-body
      :data="addLabelList"
      class="offApply uploading required add-tally"
    >
      <el-form>
        <el-row>
          <el-col :span="24" class="add-name">
            <el-form-item
              label="请输入新增标签名字"
              style="display：flex !important;"
            >
              <el-input placeholder="请输入新增标签名字" v-model="inputValue" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer bottom">
        <el-button @click="addTagUp = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addLabelSubmit()"
          v-if="roles.indexOf('boss') == -1"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <!-- 新增项目 -->
    <el-dialog
      title="新增"
      :visible.sync="itemsCondition"
      width="422px"
      append-to-body
      :data="additemsObject"
      class="items"
    >
      <el-form>
        <el-row>
          <el-col :span="24" class="add-name">
            <el-form-item label="项目名称" style="display：flex !important;">
              <!-- <el-input
                placeholder="请输入项目名称"
                v-model="additemsObject.name"
              /> -->
              <el-autocomplete
                v-model="additemsObject.name"
                :fetch-suggestions="parentLevelProductSearch"
                placeholder="请输入项目名称"
                @select="handleEntryName"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="add-name">
            <!-- <div style="margin-bottom: 18px;display:flex;">
              <span style="width:30%;">所属服务项</span>
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="additemsObject.businessType"
                :fetch-suggestions="parentLevelProductSearch"
                placeholder="请输入所属服务项"
                value-key="label"
                class="seek-frame"
                :autofocus="true"
                @select="selectServicesAvailable"
                style="width:184px;"
              >
                <i
                  class="el-icon-search el-input__icon"
                  slot="suffix"
                  @click="handleIconClick"
                >
                </i>
                <template slot-scope="{ item }">
                  <div class="name" >{{ item.name }}</div>
                </template>
              </el-autocomplete>
            </div> -->
            <el-form-item label="所属服务项" style="display：flex !important;">
              <el-select
                v-model="additemsObject.parentId"
                filterable
                placeholder="请选择"
                style="width:184px"
                @change="ProjectChange"
              >
                <el-option
                  v-for="item in ProjectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="add-name">
            <el-form-item label="项目价格" style="display：flex !important;">
              <el-input
                placeholder="请输入项目价格"
                v-model="additemsObject.price"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="add-name">
            <el-form-item
              label="是否为周期性项目"
              style="display：flex !important;"
            >
              <el-radio-group v-model="additemsObject.type">
                <el-radio :label="20">是</el-radio>
                <el-radio :label="10">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer bottom">
        <el-button @click="itemsCondition = false">取 消</el-button>
        <el-button type="primary" @click="addItemsSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  AequiredAccessory, // 跟进记录-操作- 所需附件
  addLabelLiaison, // 跟进记录-操作- 所需附件-新增标签提交
  removeLiaison, // 跟进记录-操作- 所需附件-删除标签
  updateExecutorLabel //跟进记录-操作- 所需附件-提交按钮
} from "@/api/crm/outWork/outWork";
import {
  findSerpricePage,
  findBySerpriceId,
  templateUpdate,
  selectByParent, // 新增项目--所属服务项
  templateAdd, //新增项目--提交按钮
  deleteSerprice, //项目模板--删除
  recoverySerprice, //项目模板复原
  delProjectTemplate, //项目模板大类删除
  modifyProjectTemplate, //项目模板大类修改
  ChooseCompany,
  Classification,
  entryName,
  searchName
} from "@/api/crm/templateBase/templateBase";
import { throttle } from "@/utils/hmt";
export default {
  name: "templateBase",
  data() {
    return {
      data: [],
      itemsCondition: false, //新增项目
      restaurants: [],
      parentLevelProductList: [], //父级产品数组
      additemsObject: {}, //新增项目数据
      roles: [],
      serviceCategoryList: [], //服务类别
      classificationForm: {}, //新增分类
      classificationShow: false,
      CompaniesList: [],
      belongCompanyName: "",
      companyName: "",
      typeOptions: [], //菜单
      dataData: {}, //选择标题的数据
      formData: {}, //表单数据
      progressBarPercent: 30,
      theAttachmentState: false, //所需附件显示
      labelList: [], //所需附件数据
      inputVisible: false,
      inputValue: null,
      addTagUp: false, //新增标签
      titleArray: [],
      // stepsToRecord:[],//步骤记录数据
      // labelList: ["张云雷", "探水清河"],
      noIdObj: {
        label: null,
        performSorting: null //序号
      }, //添加步骤时没有id的步骤信息
      addLabelList: {
        label: null
      }, //新增标签数据
      LIST: null,
      sortId: null, //添加标签的步骤id
      tableArray: [], //步骤记录数据
      ProjectList: [], //所属服务项
      entryNameList: [],
      old: "",
      state: "",
      childrenId:null,
    };
  },
  computed: {},
  watch: {
    view: function(val, oldVal) {
      if (!val) {
        this.getList();
      }
    }
  },
  created() {
    //服务类别
    this.getDicts("service_category").then(res => {
      this.serviceCategoryList = res.data;
    });
    // this.getCompanyList();
    this.getList();
    this.getProjectList()

  },

  methods: {
    // 恢复初始化
    initialize() {
      
        findBySerpriceId({ id: this.childrenId}).then(response => {
          if(response.code == 200){
            this.formData = response.data;
            this.tableArray = response.data.crmSerpriceExecutorResults;
            this.$message.success("已恢复初始化");
          }else{
            this.$message.success("删除项目初始化失败");
          }
          
        });

      // recoverySerprice({ id: this.formData.id }).then(response => {
      //   if (response.code == 200) {
      //     findSerpricePage({}).then(response => {
      //       this.typeOptions = response.data.rows;
      //       this.dataData = this.typeOptions[0];
      //       this.formData = this.dataData.crmIntermSerprices[0];
      //       this.titleArray = response.data.rows[0].crmIntermSerprices;
      //       console.log(this.formData)
      //       console.log('初始化')
      //       console.log(this.childrenId)
      //       findBySerpriceId({ id: this.childrenId}).then(response => {
      //         this.formData = response.data;
      //         this.tableArray = response.data.crmSerpriceExecutorResults;
      //       });
      //     });
      //     // this.$message.success("已恢复初始化");
      //   } else {
      //     // this.$message.success("删除项目初始化失败");
      //   }
      // });
      
    },
    //删除单个父类项目
    remove(node, data) {
      // console.log(data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);

      this.$confirm("是否确认删此除项目?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delProjectTemplate({ id: data.id });
        })
        .then(response => {
          if (response.code == 200) {
            children.splice(index, 1);
            this.getList();
          }
        });
    },
    //修改
    NodeBlur(Node, data) {
      // console.log(data);
      if (data.name === "") {
        this.$message.error("菜单名不可为空！");
        return false;
      } else {
        if (!data.flag) {
          this.$set(data, "isEdit", false);
        }
        this.$nextTick(() => {
          this.$refs["slotTreeInput" + data.id].$refs.input.focus();
          modifyProjectTemplate({
            name: data.name,
            id: data.id,
            parentId: data.parentId
          }).then(response => {
            data.flag = true;
            // console.log(response);
            response.data.forEach(item => {
              let temp = {};
              item.child.forEach(ite => {
                temp.id = ite.id;
                temp.label = ite.name;
              });
            });
          });
        });
      }
    },

    querySearchAsync(queryString, cb) {
      var restaurants = this.entryNameList;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //单选标记编辑
    treeEdit(node, data) {
      data.flag = false;
      if (data.name === "") {
        this.$message.error("菜单名不可为空！");
        return false;
      }
    },
    // 项目模板--删除
    projectTemplate() {
      // console.info(this.formData);
      // console.info(this.formData.id);
      let data = this.formData.id;
      this.$confirm("是否确认此删除项目模板?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return deleteSerprice({ id: data });
        })
        .then(response => {
          if (response.code == 200) {
            findSerpricePage({}).then(response => {
              this.typeOptions = response.data.rows;
              this.dataData = this.typeOptions[0];
              this.formData = this.dataData.crmIntermSerprices[0];
              this.titleArray = response.data.rows[0].crmIntermSerprices;

              findBySerpriceId({ id: this.formData.id }).then(response => {
                this.formData = response.data;
                this.tableArray = response.data.crmSerpriceExecutorResults;
              });
            });
            this.$message.success("删除项目成功");
          } else {
            this.$message.success("删除项目失败");
          }
        });
    },

    parentLevelProductSearch(queryString, cb) {
      // this.additemsObject.name = queryString
      this.old = this.additemsObject.name;
      if (queryString) {
        entryName({ name: queryString }).then(response => {
          this.entryNameList = response.data;
          let arr = [];
          response.data.forEach((item, index) => {
            arr.push({
              value: item.name,
              label: index,
              add: true
            });
          });

          cb(arr);
        });
      } else {
        let arr = [];
        arr.push({
          value: "暂无",
          label: queryString,
          add: true
        });
        cb(arr);
      }
    },
    // 获取所属服务项
    getProjectList(){
      selectByParent().then(response => {
        this.ProjectList = response.data;
      });
    },
    //所属服务项
    ProjectChange() {
      this.ProjectList.forEach(item => {
        if (item.id.indexOf(this.additemsObject.parentId) != -1) {
          this.additemsObject.businessType = item.businessType;
          this.additemsObject.type = item.type;
        }
      });
    },
    ProjectChange2(data){
      console.log(data)
      this.ProjectList.forEach(item => {
        if (item.id.indexOf(this.formData.parentId) != -1) {
          this.formData.businessType = item.businessType;
          console.log(item)
          // this.additemsObject.type = item.type;
        }
      });
    },

    // 新增项目提交按钮
    addItemsSubmit() {
      templateAdd(this.additemsObject).then(response => {
        if (response.code == 200) {
          findSerpricePage({}).then(response => {
            this.typeOptions = response.data.rows;
            this.dataData = this.typeOptions[0];
            this.formData = this.dataData.crmIntermSerprices[0];
            this.titleArray = response.data.rows[0].crmIntermSerprices;
          });
          // },
          this.itemsCondition = false;
          this.$message.success("新增项目成功");
          this.additemsObject = {};
        } else {
          this.$message.success("新增项目失败");
        }
      });
    },
    // 保存
    saveData() {
      this.formData.crmSerpriceExecutorParams = this.tableArray;
      this.formData.crmSerpriceExecutorResults = [];
      templateUpdate(this.formData).then(response => {
        if (response.code == 200) {
          this.$message.success("保存成功");
          this.getList()
        } else {
          this.$message("保存失败");
        }
      });
    },
    // 节点单击事件
    handleNodeClick(data) {
      console.log('父节点')
      this.dataData = data;
      this.formData = [];
      data.crmIntermSerprices.forEach(item => {
        if (item.sharedType == 10) {
          if (item.name.indexOf("*") != -1) {
            item.name = item.name;
          } else {
            item.name = "*" + item.name;
          }
        } else {
          item.name = item.name;
        }
      });

      this.titleArray = data.crmIntermSerprices;
      // this.tableArray = data.crmIntermSerprices[0].crmSerpriceExecutorResults;
      if (
        data.crmIntermSerprices[0] != null &&
        data.crmIntermSerprices[0] != [] &&
        data.crmIntermSerprices[0] != undefined
      ) {
        this.formData = data.crmIntermSerprices[0];
        console.log(this.formData)
        this.formData.type = Number(this.formData.type)

        findBySerpriceId({ id: this.formData.id }).then(response => {
          this.tableArray = response.data.crmSerpriceExecutorResults;
        });
      }
    },

    // 筛选节点
    filterNode(value, data) {
      // console.info(data);
    },

    // 点击标题
    titleNodeClick(data) {
      this.formData = data;
      console.log('子节点')
      this.childrenId = data.id;
      findBySerpriceId({ id: data.id }).then(response => {
        this.formData = response.data;
        this.formData.type = Number(response.data.type)
        // this.titleArray=response.data.crmIntermSerprices
        this.tableArray = response.data.crmSerpriceExecutorResults;
      });
    },

    //新增分类
    addClassification() {
      this.classificationForm.parentId = -1;
      Classification(this.classificationForm).then(response => {
        // console.log(response);
        this.classificationShow = false;

        this.getList();
      });
    },
    // 列表信息
    getList() {
      findSerpricePage({}).then(response => {
        this.typeOptions = response.data.rows;
        this.dataData = this.typeOptions[0];
        this.formData = this.dataData.crmIntermSerprices[0];
         response.data.rows[0].crmIntermSerprices.forEach(item => {
        if (item.sharedType == 10) {
          if (item.name.indexOf("*") != -1) {
            item.name = item.name;
          } else {
            item.name = "*" + item.name;
          }
        } else {
          item.name = item.name;
        }
      });
      // console.log(response.data.rows[0].crmIntermSerprices);
        this.titleArray = response.data.rows[0].crmIntermSerprices;
        findBySerpriceId({ id: this.formData.id }).then(response => {
          this.formData = response.data;
          this.tableArray = response.data.crmSerpriceExecutorResults;
        });
      });
      ChooseCompany().then(response => {
        this.CompaniesList = response.data;
      });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handelChange(val) {
      this.formData = {};
      this.titleArray = [];
      console.log(val);
      searchName({ firmIds: val }).then(response => {
        this.typeOptions = response.data.rows;
        this.titleArray = response.data.rows[0].childList;
      this.formData = this.dataData.crmIntermSerprices[0];
          response.data.rows[0].crmIntermSerprices.forEach(item => {
        if (item.sharedType == 10) {
          if (item.name.indexOf("*") != -1) {
            item.name = item.name;
          } else {
            item.name = "*" + item.name;
          }
        } else {
          item.name = item.name;
        }
              });
        this.titleArray = response.data.rows[0].crmIntermSerprices;
        console.log(response.data.rows[0].crmIntermSerprices)
        console.log(this.titleArray);
        findBySerpriceId({ id: this.formData.id }).then(response => {
          this.formData = response.data;
          this.tableArray = response.data.crmSerpriceExecutorResults;

      });
       });
      ChooseCompany().then(response => {
        this.CompaniesList = response.data;
      });
    },
    handleQuery(val) {
      searchName({ name: val }).then(response => {
        this.typeOptions = response.data.rows;
        this.titleArray = response.data.rows[0].crmIntermSerprices;
        console.log(this.titleArray)
      });
    },
    // 添加步骤
    addStep() {
      this.tableArray.push({
        name: "公司注册",
        performSorting: this.tableArray.length + 1
      });
      return this.tableArray;
    },
    // 插入步骤
    interposition(i) {
      let table = this.tableArray;
      let temp = {
        sort: "",
        performName: table.performName || "",
        deadline: table.deadline || "",
        completionStatus: 10
      };
      this.noIdObj.performSorting = i; //新增步骤的id
      table.splice(i - 1, 0, temp);
      this.tableArray = table.map((item, index) => {
        item.performSorting = index + 1;

        return item;
      });
    },
    // 删除步骤
    deleteStep(row) {
      let data = String;
      this.tableArray.forEach((item, i) => {
        if (
          item.performSorting == row.performSorting
        ) {
          this.tableArray.splice(i, 1);
        }
      });
      this.tableArray.forEach((item,index)=>{
        item.performSorting=index+1
      })
    },
    // 任务进度条的文字
    format(percentage) {
      return "完成进度:" + percentage + "%";
    },
    // 所需附件
    theAttachment(row) {
      this.labelList = [];
      this.sortId = row;
      this.theAttachmentState = true;
      this.addLabelList.procedureId = row.id;
      let label = row.label;
      if (label != null && label != "" && label != undefined) {
        this.labelList = label.split(",");
        for (let item of this.labelList) {
          if (item == null || item == "") {
            this.labelList.splice(item, 1);
          }
        }
      }
    },
    // 添加所需附件
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        // this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 跟进记录-操作- 所需附件-提交按钮
    addLabelListSubmit: throttle(function() {
      let label = this.labelList.join(",");
      for (let index of this.tableArray) {
        if (index.performSorting == this.sortId.performSorting) {
          index.label = label;
        }
      }
      this.theAttachmentState = false;
    }),
    // 删除标签
    handleClose(tag) {
      this.labelList.splice(this.labelList.indexOf(tag), 1);
      // if (this.sortId.id != null) {
      //   removeLiaison({ label: tag, id: this.addLabelList.procedureId }).then(
      //     response => {
      //       return this.labelList;
      //     }
      //   );
      // }
    },
    //新增标签提交按钮
    addLabelSubmit: throttle(function() {
      this.addTagUp = false;
      this.addLabelList.label = this.inputValue;
      // this.labelList.push(inputValue);
      this.labelList.push(this.addLabelList.label);
      addLabelLiaison(this.addLabelList).then(response => {
        this.inputValue = null;
      });
    }),
    handleInputConfirm: throttle(function() {
      let inputValue = this.inputValue;
      if (this.LIST == false) {
        if (inputValue) {
          this.labelList.push(inputValue);
        }
      }
      if (this.LIST == false) {
        AequiredAccessory({ keyword: this.inputValue }).then(response => {
          this.inputVisible = false;
          this.inputValue = "";
        });
      }
    }),
    handleIconClick(ev) {
      // console.log(ev);
    },
    // 所需附件-输入框
    querySearch(queryString, cb) {
      this.LIST = false;
      // 调用 callback 返回建议列表的数据
      if (queryString) {
        AequiredAccessory({ keyword: queryString }).then(response => {
          let arr = response.data;
          if (response.data.length == 0) {
            arr.push({
              name: "添加标签",
              label: queryString,
              add: true
            });
            this.LIST = true;
          } else {
            arr.push({
              name: "添加标签",
              add: true
            });
          }
          cb(arr);
        });
      } else {
        let arr = [];
        arr.push({
          name: "添加标签",
          label: queryString,
          add: true
        });
        cb(arr);
      }
    },
    // 添加标签
    addLabelUp() {
      this.addTagUp = true;
    },
    handleSelect(item) {
      // console.log(item);
    },
    handleEntryName(item) {
      this.$nextTick(() => {
        this.additemsObject.name = this.old;
      });
    },

    //新增项目
    addItems() {
      this.itemsCondition = true;
      this.$set(this.additemsObject,'type',10)
      this.additemsObject.parentId = this.formData.parentId;
      this.additemsObject.businessType = this.formData.businessType;
    },

    selectServicesAvailable(item) {
      this.additemsObject.parentId = item.id;
      this.additemsObject.businessType = item.name;
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  .tree-container {
    border-top: 0px;
  }
  .el-row {
    .el-col {
      height: 100%;
    }
  }
  .table-data {
    height: calc(100% - 104px);
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    display: flex;
    .left {
      width: 195px;
      .el-menu-vertical-demo {
        height: 100%;
      }
      .el-menu {
        .el-menu-item {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
        }
      }
    }
    .content {
      width: calc(100% - 194px);
      overflow: hidden;
      .content-title {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e6e7eb;
        padding: 0 40px;

        .content-headline {
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #303133;
          padding-top: 6px;
        }
      }
      // .content-content {
      //   padding: 27px 40px 20px;
      //   height: calc(100vh - 40px);
      //   text-align: center;
      //   overflow-y: scroll;
      // }
      // .content-content::-webkit-scrollbar {
      //   display: none;
      // }
    }
    //
    .el-col {
      .el-col {
        .content-top {
          padding: 0 41px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e6e7eb;
          display: flex;
          justify-content: space-between;
        }
      }
      .tree-container {
        min-height: calc(100vh - 192px);
      }
      .content-content {
        padding: 0 41px;
        height: calc(100vh - 200px);
        overflow-y: scroll;
        .el-row {
          // .el-col{
          //   .content-top{
          //     display: flex;
          //     justify-content: space-between;
          //   }
          // }
          .el-row {
            .box_table {
              width: 100%;
              background: #ffffff;
              padding: 24px 0 24px;
              display: flex;
              flex-wrap: wrap;
              .el-col {
                .box_table_header {
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 18px;
                  .table_left {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                  }
                  .table_right {
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    .addbut {
                      width: 97px;
                      height: 28px;
                      outline: none;
                      text-align: center;
                      background: #ecf2fc;
                      border: 1px solid #b5c8f1;
                      border-radius: 3px;
                      font-size: 12px;
                      line-height: 24px;
                      color: #4977e0;
                      margin-right: 5px;
                    }
                    .el-progress {
                      width: 87px;
                      display: flex;
                      flex-direction: column;
                      color: pink;
                    }
                  }
                }
                .el-table__header tr,
                .el-table__header th {
                  padding: 0;
                  height: 42px;
                  line-height: 42px;
                  color: #6e7073;
                  font-size: 12px;
                }
                .el-table__body tr,
                .el-table__body td {
                  padding: 0;
                  height: 42px;
                  line-height: 42px;
                }
              }
            }
          }
        }
      }
      .content-content::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
// 新建项目
.items {
  color: pink;

  .el-dialog {
    .el-dialog__body {
      .el-form {
        .el-row {
          .el-col {
            .el-form-item--small.el-form-item {
              display: flex;
            }
          }
        }
      }
    }
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  i {
    font-size: 16px;
  }
}
</style>
<style lang="scss">
.register {
  .table-data {
    .el-tabs {
      width: 100%;
      .el-tabs__header.is-left {
        width: 195px;
        .el-tabs__nav-wrap {
          .el-tabs__nav-scroll {
            .el-tabs__nav {
              .el-tabs__item {
                text-align: left;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                line-height: 40px;
              }
            }
          }
        }
      }
    }
  }
  .el-tabs__content {
    height: 100%;
  }
  .el-tabs--left .el-tabs__header.is-left {
    margin-right: 0px;
  }
}
.el-progress-bar {
  padding-right: 0 !important;
}

.el-progress__text {
  white-space: nowrap;
  font-size: 12px;
  color: #565759;
  margin-top: 5px;
  margin-left: 0;
}
.items {
  .el-dialog .el-dialog__body .el-form .el-form-item__label {
    width: 40%;
    text-align: left;
  }
}
</style>
