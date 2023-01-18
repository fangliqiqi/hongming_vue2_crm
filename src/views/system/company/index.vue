<template>
  <div class="app-container">
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
              <el-form
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-position="left"
                label-width="120px"
              >
                <el-form-item label="应用名称" prop="appId">
                  <el-select
                    v-model="queryParams.appId"
                    placeholder="请选择应用名称"
                    class="mw222"
                  >
                    <el-option
                      v-for="item in $store.getters.myApps"
                      :key="item.appId + 'b'"
                      :label="item.appName"
                      :value="item.appId"
                    >
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
                      :key="dict.dictValue + 'd'"
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
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  size="small"
                  @click="handleQuery"
                  >搜索</el-button
                >
                <el-button
                  type="cyan"
                  icon="el-icon-refresh"
                  size="small"
                  @click="resetQuery"
                  >重置</el-button
                >
                <el-button size="small" @click="showSearch = false"
                  >取 消</el-button
                >
              </div>
            </div>
            <el-button
              slot="reference"
              size="small"
              icon="el-icon-search"
              @click="showSearch = !showSearch"
              >筛选
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.name"
            placeholder="请输入公司名称"
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
            @click="handleAdd"
            v-if="roles.indexOf('admin') != -1"
            v-hasPermi="['crm:log:add']"
            >新增
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
      <el-tabs v-model="queryParams.appId" @tab-click="handleQuery">
        <el-tab-pane
          v-for="item in $store.getters.myApps"
          :key="item.appId + 'm'"
          :label="item.appName"
          :value="item.appId"
          :name="item.appId"
        ></el-tab-pane>
      </el-tabs>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button
            size="mini"
            circle
            icon="el-icon-refresh"
            @click="handleQuery"
          />
        </el-tooltip>
      </div>
    </div>
    <div class="table-data">
      <el-table
        :height="tableHeight"
        v-loading="loading"
        :data="companyList"
        row-key="companyId"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :default-sort="{ prop: 'orderNo', order: 'ascending' }"
      >
        <el-table-column prop="name" label="名称" width="260"></el-table-column>
        <el-table-column
          prop="shortName"
          label="简称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="cpCode"
          label="编码"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="principalName"
          label="负责人"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="principalPhone"
          label="联系方式"
          width="200"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tooltip :content="statusFormat(scope.row)" placement="top">
              <el-switch
                v-model="scope.row.status"
                active-color="#dcdfe6"
                inactive-color="#3978e7"
                :active-value="2"
                :inactive-value="1"
                @change="
                  val =>
                    switchChange({
                      status: val,
                      companyId: scope.row.companyId
                    })
                "
              >
              </el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="简介"
          width="200"
        ></el-table-column>
        <el-table-column prop="url" label="地址" width="200"></el-table-column>
        <el-table-column
          prop="orderNo"
          label="排序"
          width="200"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="200"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          fixed="right"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleAdd(scope.row)"
              >新增</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-button
              v-if="scope.row.parentId != -1 || isAddCom"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加或修改公司对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="704px"
      append-to-body
      :before-close="beforeClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <el-col :span="24" v-if="form.parentId !== 0">
            <el-form-item label="归属上级" prop="parentId">
              <!-- v-if="!isAddCom&&form.companyId&&form.parentId==-1" -->
              <el-select
                v-model="form.parentId"
                placeholder="选择上级公司"
                v-if="form.companyId && form.parentId == -1"
                clearable
                :disabled="true"
              >
                <el-option :value="-1" label="主公司"></el-option>
                <!-- <el-option v-for="item in companyOptions" :label="item.name" :value="item.companyId" :key="item.companyId"></el-option> -->
              </el-select>
              <el-select
                v-model="form.parentId"
                placeholder="选择上级公司"
                v-else
                clearable
                @change="companyChange"
              >
                <el-option
                  v-for="item in companyOptions"
                  :label="item.name"
                  :value="item.companyId"
                  :key="item.companyId + 'e'"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入公司名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司简称" prop="shortName">
              <el-input v-model="form.shortName" placeholder="请输入公司简称" />
            </el-form-item>
          </el-col>
          <template :gutter="24" v-if="principalType == 10">
            <el-col :span="12">
              <el-form-item
                label="负责人"
                prop="principalName"
                label-width="80px"
              >
                <el-select
                  v-model="form.principalName"
                  filterable
                  remote
                  placeholder="请输入负责人"
                  :remote-method="
                    query => remoteMethod(query, form.parentId, form.companyId)
                  "
                  :loading="loading"
                >
                  <!--  -->
                  <el-option
                    v-for="(item, index) in principalOptions"
                    :key="item.userId + 'k' + index"
                    :label="item.name"
                    :value="item.userId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="." class="nolabel">
                <el-button
                  @click="(principalType = 20), $forceUpdate()"
                  type="primary"
                  plain
                  >新增负责人</el-button
                >
              </el-form-item>
            </el-col>
          </template>
          <template :gutter="24" v-if="principalType != 10">
            <el-col :span="12">
              <el-form-item label="负责人" prop="principalName">
                <el-input
                  v-model="form.principalName"
                  placeholder="请输入负责人姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式" prop="principalPhone">
                <el-input
                  v-model="form.principalPhone"
                  placeholder="请输入负责人手机号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账号" prop="principalAccount">
                <el-input
                  v-model="form.principalAccount"
                  placeholder="请输入负责人账号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" prop="principalPwd">
                <el-input
                  v-model="form.principalPwd"
                  type="password"
                  auto-complete="off"
                  placeholder="请输入负责人密码"
                  :show-password="true"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="." class="nolabel">
                <el-button @click="checkPersonLiable" type="primary" plain
                  >选择负责人</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="12"> </el-col>
          </template>
          <el-col :span="12">
            <el-form-item label="地区" prop="areaCode">
              <el-cascader
                placeholder="请选择地区"
                class="mw100"
                size="small"
                :options="areaOptions"
                v-model="form.areaCode"
                @change="handleAreaChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue + 'c'"
                  :label="dict.dictValue"
                  >{{ dict.dictLabel }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNo">
              <el-input-number
                v-model="form.orderNo"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="门户地址" prop="url">
              <el-input
                type="text"
                v-model="form.url"
                placeholder="请输入门户地址"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="简介" prop="description">
              <el-input
                type="textarea"
                v-model="form.description"
                placeholder="请输入简介"
              />
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
import {
  listCompany,
  getCompany,
  delCompany,
  addCompany,
  updateCompany,
  changeCompanyStatus,
  getCompanyUserList,
  checkCompanyName
} from "@/api/system/company";

/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapGetters } from "vuex";
import { isPromise,throttle } from "@/utils/hmt";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { mapState } from "vuex";
export default {
  name: "Company",
  components: { Treeselect },
  data() {
    var validateCompanyName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("公司名称不能为空"));
      }
      checkCompanyName({ name: value })
        .then(res => {
          // console.info(res);
          if (
            res &&
            (res.data < 1 || (res.data <= 1 && this.form.companyId !== ""))
          ) {
            callback();
          } else {
            callback(new Error("公司名称已存在"));
          }
        })
        .catch(err => {
          callback(new Error("网络错误"));
        });
    };

    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: false,
      // 表格树数据
      companyList: [],
      // 公司树选项
      companyOptions: [],
      areaOptions: regionData, //区域数据
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      //负责人列表
      principalOptions: [],
      // 查询参数
      queryParams: {
        deptName: undefined,
        status: undefined,
        appId: this.$store.getters.appId
      },
      //角色
      roles: "",
      principalType: 10,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        principalId: [
          { required: true, message: "公司负责人不能为空", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "公司不能为空", trigger: "blur" }
        ],
        name: [{ validator: validateCompanyName, trigger: "blur" }],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        principalName: [
          { required: true, message: "负责人姓名不能为空", trigger: "blur" }
        ],
        principalPhone: [
          { required: true, message: "负责人手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        areaCode: [
          { required: true, message: "地区不能为空", trigger: "blur" }
        ],
        principalAccount: [
          { required: true, message: "负责人账号不能为空", trigger: "blur" }
        ],
        principalPwd: [
          { required: true, message: "负责人密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    isAddCom: function() {
      return isPromise("/guns-cloud-system/entCompany/queryParentCompany");
    },
    ...mapState({
      userInfo: state => state.user
    })
  },
  created() {
    this.roles = this.userInfo.roleCodes;
    this.getList();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询公司列表 */
    getList() {
      this.loading = true;
      listCompany(this.queryParams).then(response => {
        this.companyList = this.handleTree(
          response.data,
          "companyId",
          "parentId"
        );
        this.loading = false;
      });
    },
    //选择负责人
    checkPersonLiable() {
      this.principalType = 10;
      this.form.principalName = "";
      this.$forceUpdate();
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
    //选择地区
    handleAreaChange(value) {
      this.form.district = value;
      let data = {
        areaCode: value,
        province: CodeToText[value[0]],
        city: CodeToText[value[1]],
        district: CodeToText[value[2]]
      };
      this.form.areaCode = data.areaCode;
      this.form.province = data.province;
      this.form.city = data.city;
      this.form.county = data.district;
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
    },
    beforeClose(done) {
      this.reset();
      done();
    },
    // 表单重置
    reset() {
      this.form = {
        companyId: "",
        cpCode: "",
        description: "",
        name: "",
        orderNo: 0,
        parentIds: "",
        principalId: "",
        shortName: "",
        status: 1,
        url: "",
        principalName: "", //负责人姓名
        principalPhone: "", // 负责人手机号
        principalAccount: "", //负责人账号
        principalPwd: "123456", //负责人密码
        parentId: "",
        appId: this.queryParams.appId
      };
      try {
        this.resetForm("form");
      } catch (e) {
        // console.info(e);
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.principalOptions = [];
      this.reset();
      if (row != undefined) {
        this.form.parentId = row.companyId;
      }
      // console.log(this.form.parentId);
      this.principalType = 10;
      this.open = true;

      this.title = "添加公司";
      listCompany({ appId: this.queryParams.appId, parentId: "" }).then(
        response => {
          let companyList = response.data || [];
          if (this.roles.indexOf("admin") != -1) {
            companyList.unshift({
              companyId: "-1",
              name: "主公司",
              parentIds: "-1"
            });
          }
          this.companyOptions = companyList;
        }
      );
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // console.info(row)
      this.principalOptions = [];
      this.principalType = 10;
      getCompany(row.companyId).then(response => {
        this.form = response.data;
        if (this.form.areaCode != "") {
          this.form.areaCode = JSON.parse(response.data.areaCode);
        }

        this.open = true;
        this.title = "修改公司";
      });

      listCompany({
        appId: this.queryParams.appId,
        companyId: row.companyId
      }).then(response => {
        let companyList = response.data || [];
        if (this.isAddCom) {
          companyList.push({
            companyId: "-1",
            name: "主公司",
            parentIds: "-1"
          });
        }
        this.companyOptions = companyList;
        // console.log(this.companyOptions);
      });
    },
    /** 提交按钮 */
    submitForm: throttle(function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.form));
          if (this.principalType == 10) {
            form.principalName = null;
            form.principalPhone = null;
            form.principalAccount = null;
            form.principalPwd = null;
          } else {
            form.principalId = null;
            form.principalPwd = encrypt(this.form.principalPwd);
          }
          if (isNaN(this.form.principalName)) {
            form.principalName = this.form.principalName;
            form.principalId = this.form.principalId;
          } else {
            form.principalId = this.form.principalName;
            this.principalOptions.forEach(item => {
              if (form.principalId == item.userId) {
                form.principalName = item.name;
              }
            });
          }

          if (form.companyId) {
            updateCompany(form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCompany(form).then(response => {
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
      this.$confirm('是否确认删除名称为"' + row.name + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delCompany({ companyId: row.companyId });
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    companyChange(val) {
      if (val) {
        this.form.principalId = "";
      }
    },
    remoteMethod(query, pId, cId) {
      this.companyOptions.map(item => {
        if (item.companyId == pId) {
          if (item.parentIds == -1) {
            pId = pId;
          } else {
            let parentIds = item.parentIds.split(",");
            pId =
              parentIds && parentIds.length > 1 ? parentIds[1] : parentIds[0];
          }
        }
      });
      // console.log(pId);
      // console.log(cId);
      if (query != "" && pId != ""&&pId != undefined && pId != null ) {
        if (pId == -1 && (cId == undefined || cId == null || cId == "")) {
          getCompanyUserList({ companyId: 0, keyword: query }).then(res => {
            this.principalOptions = res.data;
          });
        } else if (pId == -1) {
          getCompanyUserList({ companyId: cId, keyword: query }).then(res => {
            this.principalOptions = res.data;
          });
        }
        else {
          getCompanyUserList({ companyId: pId, keyword: query }).then(res => {
            this.principalOptions = res.data;
            // console.log(this.principalOptions);
          });
        }
        // setTimeout(() => {
        //   this.loading = false;
        //   this.principalOptions = this.list.filter(item => {
        //     return item.label.toLowerCase()
        //       .indexOf(query.toLowerCase()) > -1;
        //   });
        // }, 200);
      } else {
        this.principalOptions = [];
      }
    },
    switchChange(data) {
      changeCompanyStatus(data);
    }
  }
};
</script>
