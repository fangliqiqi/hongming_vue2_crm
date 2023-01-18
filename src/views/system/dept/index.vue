<template>
  <div class="app-container">
    <el-row>
      <!--公司数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="companyName"
            placeholder="请输入公司名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 0px;width: 100%"
          />
        </div>
        <div class="tree-container">
          <el-tree
            :data="companyOptions"
            :props="{
                label: 'name',
                children: 'children'
              }"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            node-key="companyId"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <div class="search-vi">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-popover
                placement="top-start"
                popper-class="search-popover-vi"
                width="400"
                trigger="manual"
                v-model="showSearch"
              >
                <div class="search-popover">
                  <el-form :model="queryParams" ref="queryForm" :inline="true" label-position="left" label-width="120px">
                    <el-form-item label="应用名称" prop="appId">
                      <el-select v-model="queryParams.appId" placeholder="请选择应用名称" class="mw222">
                        <el-option
                          v-for="item in $store.getters.myApps"
                          :key="item.appId"
                          :label="item.appName"
                          :value="item.appId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称" prop="menuName">
                      <el-input
                        v-model="queryParams.menuName"
                        placeholder="请输入菜单名称"
                        clearable
                        size="small"
                        class="mw222"
                        @keyup.enter.native="handleQuery"
                      />
                    </el-form-item>

                    <!-- <el-form-item label="权限字符" prop="roleCode">
                      <el-input
                        v-model="queryParams.roleCode"
                        placeholder="请输入权限字符"
                        clearable
                        size="small"
                        class="mw222"
                        @keyup.enter.native="handleQuery"
                      />
                    </el-form-item> -->
                    <el-form-item label="状态" prop="status">
                      <el-select
                        v-model="queryParams.status"
                        placeholder="菜单状态"
                        clearable
                        size="small"
                        class="mw222"
                      >
                        <el-option
                          v-for="dict in statusOptions"
                          :key="dict.dictValue"
                          :label="dict.dictLabel"
                          :value="dict.dictValue"
                        />
                      </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="创建时间">
                      <el-date-picker
                        v-model="dateRange"
                        size="small"
                        class="mw350"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      ></el-date-picker>
                    </el-form-item> -->
                  </el-form>
                  <div class="popover-footer">
                    <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
                    <el-button type="cyan" icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
                    <el-button size="small" @click="showSearch = false">取 消</el-button>
                  </div>
                </div>
                <el-button slot="reference" size="small" icon="el-icon-search" @click="showSearch = !showSearch">筛选
                </el-button>
              </el-popover>
              <el-input
                class="ml8"
                v-model="queryParams.menuName"
                placeholder="请输入菜单名称"
                clearable
                size="small"
                style="width: 240px"
                suffix-icon="el-icon-search"
                @keyup.enter.native="handleQuery"
              />
              <el-button
                class="ml8"
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="handleAdd()"
                v-hasPermi="['crm:log:add']"
              >新增部门
              </el-button>
            </el-col>
          </el-row>
          <div class="msgbox-vi">
            <label>公告</label>
            <div class="msg-vi">
              这里是一条消息，后面也是一条消息，消息轮播这里是...
            </div>
          </div>
        </div>
        <div class="tabbar-vi">
          <el-tabs v-model="queryParams.appId" @tab-click="handleQuery(queryParams.appId)">
            <el-tab-pane v-for="item in $store.getters.myApps"
                         :key="item.appId"
                         :label="item.appName"
                         :value="item.appId" :name="item.appId"></el-tab-pane>
          </el-tabs>
          <div class="top-right-btn">
            <el-tooltip class="item" effect="dark" content="刷新" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery"/>
            </el-tooltip>
          </div>
        </div>
        <div class="table-data">
          <el-table
            :height="tableHeight+40"
            v-loading="loading"
            :data="deptList"
            row-key="deptId"
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            :default-sort = "{prop: 'orderNo', order: 'ascending'}"
          >
            <el-table-column prop="deptName" label="部门名称" width="260"></el-table-column>
            <el-table-column prop="deptShortName" label="部门简称" width="260"></el-table-column>
            <el-table-column prop="deptCode" label="部门编码" width="260"></el-table-column>
            <el-table-column prop="description" label="简介" width="260"></el-table-column>
            <el-table-column prop="orderNo" label="排序" width="200"></el-table-column>
            <el-table-column prop="status" label="状态"  width="100">
              <template slot-scope="scope">
                <el-tooltip :content="statusFormat(scope.row)" placement="top">
                  <el-switch v-model="scope.row.status"
                             active-color="#dcdfe6"
                             inactive-color="#3978e7"
                             :active-value="2"
                             :inactive-value="1"
                             @change="(val)=>switchChange({status:val,deptId:scope.row.deptId})"
                  >
                  </el-switch>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" width="200">
              <template slot-scope="scope">
                <span>{{parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:dept:edit']"
                >修改</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-plus"
                  @click="handleAdd(scope.row)"
                  v-hasPermi="['system:dept:add']"
                >新增</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['system:dept:remove']"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>



    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="所属公司" prop="companyId">
              <el-cascader
                class="mw100"
                v-model="form.companyId"
                @change="companyChange"
                :props="{ emitPath:false,checkStrictly: true,label:'name',value:'companyId' }"
                placeholder="选择上级公司"
                :options="companyOptions"
                filterable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item label="所属部门" prop="parentId">
             <el-cascader
             class="mw100"
               v-model="form.parentId"
               :props="{ emitPath:false,checkStrictly: true,label:'deptName',value:'deptId' }"
               placeholder="选择上级部门"
               :options="deptOptions"
               filterable></el-cascader>
                <!-- <el-select placeholder="选择上级部门" v-model="form.parentId">
                  <el-option v-for="item in deptOptions" :label="item.deptName" :value="item.deptId"></el-option>
                </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="form.deptName" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门简称" prop="deptShortName">
              <el-input v-model="form.deptShortName" placeholder="请输入部门简称" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNo">
              <el-input-number v-model="form.orderNo" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="简介" prop="description">
              <el-input type="textarea" v-model="form.description"  />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listDept, getDept, delDept, addDept, updateDept, listDeptExcludeChild } from "@/api/system/dept";
  import { listCompany } from "@/api/system/company";
  import { mapGetters } from 'vuex'
import {  throttle } from "@/utils/hmt";
  export default {
    name: "Dept",
    components: {  },
    data() {
      return {
        // 遮罩层
        loading: true,
        // 显示搜索条件
        showSearch: false,
        // 表格树数据
        deptList: [],
        // 部门树选项
        deptOptions: [],
        // 弹出层标题
        title: "",
        //公司名称
        companyName:'',
        // 公司树选项
        companyOptions:[],
        // 是否显示弹出层
        open: false,
        // 状态数据字典
        statusOptions: [],
        // 查询参数
        queryParams: {
          deptName: undefined,
          status: undefined,
          companyId:'',
          appId: this.$store.getters.appId
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          companyId:[
            { required: true, message: "公司不能为空", trigger: "blur" }
          ],
          parentId: [
            { required: true, message: "上级部门不能为空", trigger: "blur" }
          ],
          deptName: [
            { required: true, message: "部门名称不能为空", trigger: "blur" }
          ],
          orderNo: [
            { required: true, message: "顺序不能为空", trigger: "blur" }
          ],
          phone: [
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ]
        }
      };
    },
    watch: {
      companyName(val) {
        this.$refs.tree.filter(val);
      }
    },
    computed: {
      ...mapGetters(['tableHeight'])
    },
    created() {

      this.getDicts("sys_normal_disable").then(response => {
        this.statusOptions = response.data;
      });
      this.getCompanyList();
    },
    methods: {
      /** 查询部门列表 */
      getList() {
        this.loading = true;
        if(this.queryParams.companyId!='') {
          listDept(this.queryParams).then(response => {
            this.deptList = this.handleTree(response.data, "deptId","parentId");
            this.loading = false;
          });
        }else {
          this.deptList =[];
          this.loading = false;
        }

      },
      getCompanyList(){
        listCompany({name:this.companyName,appId: this.queryParams.appId}).then(response => {
          let companyOptions = this.handleTree(response.data, "companyId","parentId");
          if(companyOptions.length>0){
            this.queryParams.companyId = companyOptions[0].companyId;
            this.$refs.tree.setCurrentKey(this.queryParams.companyId)
          }else{
            this.queryParams.companyId = ''
          }
          this.companyOptions = companyOptions||[];
          this.getList();
        });
      },
      // 筛选节点
      filterNode(value, data) {
        // console.info(data)
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 节点单击事件
      handleNodeClick(data) {
        // console.info()
        this.queryParams.companyId = data.companyId;
        this.getList();
      },
      /** 转换部门数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.deptId,
          label: node.deptName,
          children: node.children
        };
      },
      // 字典状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status);
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          deptId: undefined,
          parentId: "-1",
          deptName: undefined,
          orderNo: 1,
          status: 1,
          companyId: '',
          companyName: "",
          deptCode: "",
          deptShortName: "",
          description: "",
          parentName: "",
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery(tab) {
        if(tab){
          this.getCompanyList();
        }else{
          this.getList();
        }
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      /** 新增按钮操作 */
      handleAdd(row) {
        this.reset();
        if (row!=undefined) {
          this.form.parentId = row.deptId;
          this.form.companyId = row.companyId;
          
        }else if(row==undefined){
          // console.log(2222);
          this.form.companyId = this.queryParams.companyId||'';;
          this.form.parentId = -1;         
        }
        this.open = true;
        this.title = "添加部门";
        this.getDeptOptions()
      },
      //公司改变
      companyChange(val){
        if(val){
          this.form.parentId = -1
          this.form.companyId = val;
        }
        this.getDeptOptions()
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        getDept({deptId:row.deptId}).then(response => {
          this.form = response.data; 
          if(response.data.parentId==-1){
            this.form.parentId = response.data.deptId
          }else{
 this.form.parentId = response.data.parentId
          }
          // console.log(response.data);   
          this.open = true;
          this.title = "修改部门";
          this.getDeptOptions()
        });
      },
      getDeptOptions(){
        let companyId = this.form.companyId;
        if(companyId)
        listDept({companyId:companyId,parentId:-1}).then(response => {
          let depts = response.data ||[]
          depts.unshift({deptId:-1,deptName:'主部门',deptId:-1});
          this.deptOptions = depts;
      let dept = this.handleTree(response.data,"deptId","parentId");
      if(dept.length>0){
        this.queryParams.deptId =  dept[0].dept;
       this.$refs.tree.setCurrentKey(this.queryParams.deptId)
      }else{
        this.queryParams.deptId=''
      }
    this.deptOptions = dept||[];
        });
      },
      /** 提交按钮 */
      submitForm: throttle( function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.deptId != undefined) {
              updateDept(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addDept(this.form).then(response => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      }),
      /** 删除按钮操作 */
      handleDelete(row) {
        this.$confirm('是否确认删除名称为"' + row.deptName + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDept({deptId:row.deptId});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
      },
      switchChange(data){
        updateDept(data)
      }
    }
  };
</script>
