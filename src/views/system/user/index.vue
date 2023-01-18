<template>
  <div class="app-container">
    <el-row>
      <!--部门数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 0px;width: 100%"
          />
        </div>
        <div class="tree-container">
          <el-tree
            :props="{
              label: 'name',
              children: 'children'
            }"
            :load="loadNode"
            lazy
            default-expand-all
            node-key="companyId"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
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
                  <el-form
                    :model="queryParams"
                    ref="queryForm"
                    :inline="true"
                    label-width="68px"
                  >
                    <el-form-item label="用户名称" prop="userName">
                      <el-input
                        v-model="queryParams.name"
                        placeholder="请输入用户名称"
                        clearable
                        size="small"
                        style="width: 240px"
                        @keyup.enter.native="handleQuery"
                      />
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phonenumber">
                      <el-input
                        v-model="queryParams.phone"
                        placeholder="请输入手机号码"
                        clearable
                        size="small"
                        style="width: 240px"
                        @keyup.enter.native="handleQuery"
                      />
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                      <el-select
                        v-model="queryParams.status"
                        placeholder="用户状态"
                        clearable
                        size="small"
                        style="width: 240px"
                      >
                        <el-option
                          v-for="dict in statusOptions"
                          :key="dict.dictValue"
                          :label="dict.dictLabel"
                          :value="dict.dictValue"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <el-date-picker
                        v-model="dateRange"
                        size="small"
                        style="width: 240px"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      ></el-date-picker>
                    </el-form-item>
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
                placeholder="请输入用户名称"
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
                v-hasPermi="['crm:log:add']"
                >新增人员
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
              :key="item.appId"
              :label="item.appName"
              :value="item.appId"
              :name="item.appId"
            ></el-tab-pane>
          </el-tabs>
          <div class="top-right-btn">
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新"
              placement="top"
            >
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
            v-loading="loading"
            :height="tableHeight"
            :data="userList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="用户编号" prop="userId" />
            <el-table-column
              label="用户名称"
              prop="userName"
              :show-overflow-tooltip="true"
              width="120"
            />
            <el-table-column
              label="用户昵称"
              prop="nickName"
              :show-overflow-tooltip="true"
              width="120"
            />
            <el-table-column
              label="门店名称"
              prop="branchName"
              :show-overflow-tooltip="true"
              v-if="queryParams.appId == 10"
            />
            <!--          <el-table-column label="公司"  prop="companyId" :show-overflow-tooltip="true" />-->
            <el-table-column label="角色" prop="roleList" min-width="200">
              <template slot-scope="scope">
                <el-tag
                  size="mini"
                  v-for="item in scope.row.roleList"
                  :key="scope.row.userId + '-r' + item.roleId"
                >
                  {{ item.roleName }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="职位" prop="dutyList" min-width="200">
              <template slot-scope="scope">
                <el-tag
                  size="mini"
                  v-for="item in scope.row.dutyList"
                  :key="scope.row.userId + '-d' + item.dutyId"
                >
                  {{ item.dutyName }}
                </el-tag>
              </template>
            </el-table-column>
            <!--          <el-table-column label="部门"  prop="dept.deptName" :show-overflow-tooltip="true" />-->
            <el-table-column label="手机号码" prop="phone" width="120" />
            <el-table-column
              label="性别"
              prop="sex"
              width="120"
              :formatter="row => selectDictLabel(sexOptions, row.sex)"
            />
            <el-table-column label="星级" prop="empLevel" width="120">
              <template slot-scope="scope">
                <i
                  class="el-icon-star-on text-danger"
                  v-for="item in scope.row.empLevel"
                ></i>
              </template>
            </el-table-column>
            <!--          <el-table-column label="工资类型"  prop="salType" width="120" :formatter="(row)=>selectDictLabel(sexOptions,row.sex)" />-->
            <el-table-column label="状态">
              <template slot-scope="scope">
                <!--              <el-switch-->
                <!--                v-model="scope.row.status"-->
                <!--                active-value="0"-->
                <!--                inactive-value="1"-->
                <!--                @change="handleStatusChange(scope.row)"-->
                <!--              ></el-switch>-->
                <el-tooltip :content="statusFormat(scope.row)" placement="top">
                  <el-switch
                    v-model="scope.row.status"
                    active-color="#dcdfe6"
                    inactive-color="#3978e7"
                    :active-value="2"
                    :inactive-value="1"
                    @change="handleStatusChange(scope.row)"
                  ></el-switch>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              prop="description"
              :show-overflow-tooltip="true"
            />

            <el-table-column label="入职时间" prop="entryTime" width="160">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.entryTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="离职时间"
              prop="resignationTime"
              width="160"
            >
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.resignationTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="160">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="160"
              class-name="small-padding fixed-width"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:user:edit']"
                  >修改
                </el-button>
                <el-button
                  v-if="scope.row.userId !== 1"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['system:user:remove']"
                  >删除
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-key"
                  @click="handleResetPwd(scope.row)"
                  v-hasPermi="['system:user:resetPwd']"
                  >重置
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNo"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog
      :title="title"
      custom-class="order_dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="open"
      width="704px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="联系方式" prop="mobilePhone">
              <el-input
                v-model="form.mobilePhone"
                placeholder="请输入联系方式"
                maxlength="11"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号" prop="account">
              <el-input
                v-model="form.account"
                placeholder="请输入账号（不能为纯数字）"
                :readonly="!!form.userId"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入姓名"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入昵称"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input
                v-model="form.idCard"
                placeholder="请输入身份证号"
                maxlength="18"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="出生年月" prop="birthday">
              <el-date-picker
                v-model="form.birthday"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请输入出生年月"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="QQ" prop="qqNumber">
              <el-input
                v-model="form.qqNumber"
                placeholder="请输入QQ"
                maxlength="20"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="地区" prop="birthplace">
              <el-cascader
                placeholder="请选择地区"
                class="mw100"
                size="small"
                :options="areaOptions"
                v-model="form.birthplace"
                @change="handleAreaChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col> -->
            <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                  >{{ dict.dictLabel }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                  >{{ dict.dictLabel }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="this.title=='添加用户'">
            <el-form-item
              label="是否允许手机号登录"
              prop="isPhonLogin"
              label-width="180px"
            >
              <el-radio-group v-model="form.isPhonLogin">
                <el-radio
                  v-for="(item, index) in isPhonLoginList"
                  :key="index"
                  :label="item.value"
                  >{{ item.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input
                v-model="form.address"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="24" v-if="roles.indexOf('admin')!=-1">
            <el-form-item label="应用" prop="application">
              <el-checkbox-group v-model="SysUserApplyParam" @change="SysUserApplyParamChange">
              <el-checkbox v-for="item in applicationList"  :key="item.appId"
                :label="item.appId">{{item.appName}}</el-checkbox>
              </el-checkbox-group>
             <!-- <el-select v-model="SysUserApplyParam" multiple placeholder="请选择" @change="SysUserApplyParamChange">
    <el-option
      v-for="item in applicationList"
      :key="item.appId"
      :label="item.appName"
      :value="item.appId">
    </el-option>
  </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        :model="{ entUserDepts: entUserDepts }"
        :rules="entRules"
        ref="entForm"
      >
        <el-row>
          <el-col :span="24">
            <el-table
              class="table-form"
              :data="entUserDepts"
              :span-method="objectSpanMethod"
              border
              style="margin-left: 0px; width: calc(100% - 0px);"
            >
              <el-table-column label="公司">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'entUserDepts.' + scope.$index + '.companyId'"
                    :rules="entRules.companyId"
                  >
                    <el-cascader
                      class="mw100"
                      v-model="scope.row.companyId"
                      :show-all-levels="false"
                      @visible-change="val => visibleChange(val, scope.row, 10)"
                      @change="val => companyChange(val, scope.row)"
                      :props="{
                        emitPath: false,
                        checkStrictly: true,
                        label: 'name',
                        value: 'companyId'
                      }"
                      placeholder="公司"
                      :options="companySelect"
                      auto-complete="off"
                      filterable
                    ></el-cascader>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="部门">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'entUserDepts[' + scope.$index + '].deptId'"
                    :rules="entRules.deptId"
                  >
                    <el-cascader
                      class="mw100"
                      v-model="scope.row.deptId"
                      @visible-change="val => visibleChange(val, scope.row, 20)"
                      :show-all-levels="false"
                      :props="{
                        emitPath: false,
                        checkStrictly: true,
                        label: 'deptName',
                        value: 'deptId'
                      }"
                      placeholder="部门"
                      :options="scope.row.deptSelect"
                      filterable
                    ></el-cascader>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="职位">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'entUserDepts[' + scope.$index + '].dutyId'"
                    :rules="entRules.dutyId"
                  >
                    <el-select v-model="scope.row.dutyId" placeholder="职位">
                      <el-option
                        v-for="item in scope.row.dutySelect"
                        :key="item.dutyId"
                        :label="item.dutyName"
                        :value="item.dutyId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="角色">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'entUserDepts[' + scope.$index + '].roleIds'"
                    :rules="entRules.roleIds"

                  >
                    <el-select
                     class="userOption"
                      v-model="scope.row.roleIds"
                      placeholder="角色"
                      :multiple="true"
                      @change="val => roleChage(val, scope.row)"
                    >
                      <el-option

                        v-for="item in scope.row.roleSelect"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="100" align="center">
                <template slot="header" slot-scope="scope">
                  <el-button type="primary" round plain @click="addRow()"
                    >添加公司</el-button
                  >
                </template>
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-plus"
                    circle
                    @click="addRow(scope.row, scope.$index)"
                  ></el-button>
                  <el-button
                    :disabled="delFlag"
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="delRow(scope.row, scope.$index)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />
          是否更新已经存在的用户数据
          <el-link type="info" style="font-size:12px" @click="importTemplate"
            >下载模板</el-link
          >
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listUser,
  listUserPage,
  getUser,
  delUser,
  addUser,
  updateUser,
  resetUserPwd,
  changeUserStatus,
  getCompanySelect,
  getDeptSelect,
  getDutySelect,
  getCheckIDCard,
  getCheckPhone,
  getCheckAccount,
  getUserByPhone,
  application
} from "@/api/system/user";
import { listDept } from "@/api/system/dept";
import { listRole } from "@/api/system/role";
import { getToken } from "@/utils/auth";
import { listCompany } from "@/api/system/company";
import { mapGetters,mapState } from 'vuex';
import { isPromise, throttle } from "@/utils/hmt";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";

export default {
  name: "User",
  components: {},
  data() {
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      getCheckAccount(value, this.form.userId)
        .then(res => {
          // console.info(res);
          if (res && res.data < 1) {
            callback();
          } else {
            callback(new Error("账号已存在"));
          }
        })
        .catch(err => {
          callback(new Error("网络错误"));
        });
    };
    var validatePhone = (rule, value, callback) => {
      // console.info(rule);
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      if (this.isEdit) {
        getCheckPhone(value, this.form.userId)
          .then(res => {
            // console.info(res);
            if (res && res.data < 1) {
              callback();
            } else {
              callback(new Error("手机号码已存在"));
            }
          })
          .catch(err => {
            callback(new Error("网络错误"));
          });
      } else {
        let isSubmint = !this.isSubmint;
        this.getUserInfo({ phone: value })
          .then(res => {
            if (res && isSubmint) {
              this.form = res;
            }
            callback();
          })
          .catch(err => {
            callback(new Error("网络错误"));
          });
      }
    };
    var validateIDCard = (rule, value, callback) => {
      if (!value) {
        return callback();
      } else {
        getCheckIDCard(value, this.form.userId)
          .then(res => {
            // console.info(res);
            if (res && res.data < 1) {
              callback();
            } else {
              callback(new Error("身份证已存在"));
            }
          })
          .catch(err => {
            callback(new Error("网络错误"));
          });
      }
    };

    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      areaOptions: regionData, //区域数据
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      //是否允许手机号登录
      isPhonLoginList: [
        { name: "是", value: true },
        { name: "否", value: false },
      ],
      // 日期范围
      dateRange: [],
      companyOptions: [],
      companySelect: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      userCompanys: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData"
      },
      //应用列表
      applicationList:[],
      //选中的应用
      SysUserApplyParam:[],
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        account: "",
        branchId: "",
        companyId: "",
        deptId: "",
        name: "",
        status: "",
        appId: this.$store.getters.appId
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        nickName:[
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        account: [
          { validator: validateAccount, trigger: "blur" },
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            pattern:/^.*[^\d].*$/,
            message:'账号不能为纯数字',
            trigger: "change"

          }
        ],
        idCard: [{ validator: validateIDCard, trigger: "blur" }],
        deptId: [
          { required: true, message: "所属部门不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobilePhone: [
          { validator: validatePhone, trigger: "blur" },
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "change"
          }
        ],
        birthplace:[
         { required: true, message: "地区不能为空", trigger: "blur" }
        ]
      },
      entRules: {
        companyId: [
          { required: true, message: "公司名称不能为空", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "所属部门不能为空", trigger: "blur" }
        ],
        dutyId: [
          { required: true, message: "职位名称不能为空", trigger: "blur" }
        ],
        roleIds: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ]
      },
      userDeptsTree: [],
      isEdit: false,
      isSubmint: false
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
      ...mapState({
      userInfo: state => state.user
    }),
    isAddCom: function() {
      return isPromise("/guns-cloud-system/entCompany/queryParentCompany");
    },
    entUserDepts() {
      let tempArr = [],
        pcount = 0;
      this.userDeptsTree.forEach((items, index, arra) => {
        pcount += items.deptDutyList.length;
        items.deptDutyList.forEach((item, idx, arr) => {
          item.deptSelect = items.deptSelect || [];
          item.dutySelect = items.dutySelect || [];
          item.roleSelect = items.roleSelect || [];
          item.pRow = pcount;
          item.cRow = arr.length;
          item.index = idx;
          item.pindex = index;
          tempArr.push(item);
        });
      });

      return tempArr;
    },
    delFlag() {
      return (
        this.userDeptsTree.length <= 1 &&
        this.userDeptsTree[0].deptDutyList.length <= 1
      );
    }
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    // this.getCompanyList();
    // this.getTreeselect();
    this.roles = this.userInfo.roleCodes;
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_user_sex").then(response => {
      this.sexOptions = response.data;
    });
    // this.getDicts("sys_user_type").then(response => {
    //   this.sexOptions = response.data;
    // });
    // this.getConfigKey("sys.user.initPassword").then(response => {
    //   this.initPassword = response.msg;
    // });
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUserPage(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.userList = response.data.rows;
          this.total = response.data.totalRows;
          this.loading = false;
        }
      );
      // getCompanySelect().then(res => {
      //   let companyOptions = this.handleTree(res.data, 'companyId', 'parentId');
      //   if (this.isAddCom) {
      //     companyOptions.unshift({ companyId: '-1', name: '主公司' })
      //   }
      //   this.companySelect = companyOptions
      // })
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      // console.info(data);
      if (data.isDept) {
        this.queryParams.deptId = data.companyId;
        this.queryParams.companyId = data.companyPid;
      } else {
        this.queryParams.companyId = data.companyId;
        this.queryParams.deptId = "";
      }
      this.getList();
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "1" ? "启用" : "停用";
      this.$confirm(
        '确认要"' + text + '""' + row.userName + '"用户吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return changeUserStatus(row.userId, row.status);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
        })
        .catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined, //用户信息id
        unionId: undefined, //用户在开放平台的唯一标识符
        deptId: undefined,
        userName: undefined,
        nickName:null,
        birthday: undefined, //生日
        birthplace: undefined, //籍贯
        mobilePhone: undefined, //手机号
        email: undefined, //邮箱
        idCard: undefined, //身份证号
        sex: 1, //性别(1男2女)
        status: 1, //状态:1启用,2禁用
        isPhonLogin: true, //是否允许手机号登录
        description: undefined, //备注
        qqNumber: undefined,
        password: "", //密码
        province: "", //省
        city: "", //市
        address: "", //详细地址
        district: "", //县/区
        entUserDepts: [], //用户所属部门和职务的集合
        roleIds: []
      };
      this.resetForm("form");
    },
    async initCompanys(companyId, deptId) {
      let userCompanys = {
        companyId: companyId || undefined, //公司id
        deptDutyList: [],
        deptSelect: [],
        dutySelect: [],
        roleSelect: [],
        roleIds: undefined
      };
      if (userCompanys.companyId) {
        getDeptSelect(userCompanys.companyId).then(response => {
          let deptArr = response.data.map(item => {
            item.deptId = parseInt(item.deptId).toString();
            return item;
          });
          let dept = this.handleTree(deptArr, "deptId", "parentId");
          dept.unshift({ deptId: "-1", deptName: "主部门" });
          userCompanys.deptSelect = dept;
        });
        getDutySelect(userCompanys.companyId).then(res => {
          userCompanys.dutySelect = res.data;
        });
        listRole({ companyId: userCompanys.companyId }).then(res => {
          userCompanys.roleSelect = res.data;
        });
      }
      userCompanys.deptDutyList.push(this.initDeptDuty(userCompanys, deptId));
      return userCompanys;
    },
    initDeptDuty(row, deptId) {
      let deptDuty = {
        companyId: (row && row.companyId) || undefined, //公司id
        defaultFlag: "N", //是否为 默认部门('N'代表否,'Y'代表是)
        deptId: deptId || undefined, //部门id
        dutyId: undefined, //职务id
        entryTime: undefined, //入职时间
        resignationTime: undefined, //离职时间
        userDeptId: undefined, //主键id
        userId: (row && row.userId) || undefined,
        roleIds: (row && row.roleIds) || undefined,
        deptSelect: (row && row.deptSelect) || [],
        dutySelect: (row && row.dutySelect) || [],
        roleSelect: (row && row.roleSelect) || []
      };
      return deptDuty;
    },
    async addRow(row, index) {
      if (row) {
        let temp = JSON.parse(JSON.stringify(row));
        this.userDeptsTree.forEach((items, index) => {
          if (index == row.pindex) {
            items.deptDutyList.splice(row.index + 1, 0, this.initDeptDuty(row));
          }
        });
      } else {
        let temp = await this.initCompanys();
        // console.info(temp);
        this.userDeptsTree.push(temp);
      }
    },
    delRow(row, index) {
      this.userDeptsTree.forEach((items, index, arra) => {
        if (index == row.pindex) {
          if (items.deptDutyList.length > 1) {
            items.deptDutyList.splice(row.index, 1);
          } else if (items.deptDutyList.length == 1) {
            this.userDeptsTree.splice(row.pindex, 1);
          }
        }
      });
    },
    //公司改变
    companyChange(val, row) {
      this.userDeptsTree.forEach((items, index) => {
        if (row.pindex == index && val) {
          getDeptSelect(val).then(response => {
            let deptArr = response.data.map(item => {
              item.deptId = parseInt(item.deptId).toString();
              return item;
            });
            let dept = this.handleTree(deptArr, "deptId", "parentId");
            // console.info(deptArr,dept)
            dept.unshift({ deptId: "-1", deptName: "主部门" });
            items.deptSelect = dept;
          });
          getDutySelect(val).then(res => {
            items.dutySelect = res.data;
          });
          listRole({ companyId: val }).then(res => {
            items.roleSelect = res.data;
          });
          items.companyId = val;
          items.deptDutyList.forEach(item => {
            item.companyId = val;
            item.deptId = undefined;
            item.dutyId = undefined;
            item.roleIds = undefined;
          });
        }
      });
    },
    visibleChange(val, row, type) {
      //10,公司。20,部门
      if (val) {
        if (type == 10) {
          let companyIds = this.userDeptsTree.map(item => {
            return item.companyId;
          });
          this.companySelect = this.companySelect.map(items => {
            items.disabled =
              companyIds.indexOf(items.companyId) != -1 &&
              this.userDeptsTree[row.pindex].companyId != items.companyId;
            if (items.children && items.children.length > 0) {
              items.children.map(item => {
                item.disabled =
                  companyIds.indexOf(item.companyId) != -1 &&
                  this.userDeptsTree[row.pindex].companyId != item.companyId;
                return item;
              });
            }
            return items;
          });
        } else if (type == 20) {
          let deptIds = this.userDeptsTree[row.pindex].deptDutyList.map(
            item => {
              return item.deptId;
            }
          );
          this.userDeptsTree[row.pindex].deptSelect = this.userDeptsTree[
            row.pindex
          ].deptSelect.map(items => {
            items.disabled =
              deptIds.indexOf(items.deptId) != -1 &&
              this.userDeptsTree[row.pindex].deptDutyList[row.index].deptId !=
                items.deptId;
            if (items.children && items.children.length > 0) {
              items.children.map(item => {
                item.disabled =
                  deptIds.indexOf(item.deptId) != -1 &&
                  this.userDeptsTree[row.pindex].deptDutyList[row.index]
                    .deptId != item.deptId;
                return item;
              });
            }
            return items;
          });
        }
      }
    },
    //角色改变
    roleChage(val, row) {
      // console.info(val, row);
      this.userDeptsTree.forEach((items, index) => {
        if (row.pindex == index) {
          items.roleIds = val;
          items.deptDutyList.forEach(item => {
            item.roleIds = val;
          });
        }
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    async handleAdd() {
      this.reset();
      this.open = true;
      this.isEdit = false;
      this.title = "添加用户";
      this.SysUserApplyParam=[]
      application().then(response=>{
        this.applicationList = response.data
      })
      let companyId = this.queryParams.companyId || undefined;
      let deptId = this.queryParams.deptId || undefined;
      let company = await this.initCompanys(
        companyId,
        typeof deptId == "number" ? deptId.toString() : deptId
      );
      this.userDeptsTree = [company];
    },
    getUserInfo(row) {
      let that = this;
      return new Promise((resolve, reject) => {
        getUserByPhone(row.phone)
          .then(response => {
            // console.info(response);
            let data = response.data;
            if (!data) {
              return resolve(undefined);
            }
            try {
              if (data.birthplace) {
                data.birthplace = JSON.parse(data.birthplace);
              } else {
                let arr = [];
                try {
                  arr.push(TextToCode[data.province].code);
                  arr.push(TextToCode[data.province][data.city].code);
                  arr.push(
                    TextToCode[data.province][data.city][data.district].code
                  );
                } catch (e) {
                  // console.info(e);
                }
                data.birthplace = arr;
              }
            } catch (e) {
              // console.info(e);
            }
            let userTree = new Array();
            let companys = new Array();
            (data.UserCompanyAndDeptResult || []).forEach(items => {
              items.roleIds = items.roleInfoList.map(item => {
                return parseInt(item.roleId).toString();
              });
              if (companys.indexOf(items.companyId) == -1) {
                let companyList = {
                  companyId: items.companyId, //公司id
                  companyName: items.companyName,
                  deptDutyList: [],
                  deptSelect: [],
                  dutySelect: [],
                  roleSelect: [],
                  deptDuty: [],
                  roleIds: items.roleIds
                };
                companyList.deptDutyList.push(items);
                companys.push(items.companyId);
                userTree.push(companyList);
              } else {
                userTree.forEach(item => {
                  if (items.companyId == item.companyId) {
                    item.roleIds = Array.from(
                      new Set(item.roleIds.concat(items.roleIds))
                    );
                    item.deptDutyList.push(items);
                  }
                });
              }
            });
            if (!that.isSubmint) {
              that.userDeptsTree = userTree.map(items => {
                getDeptSelect(items.companyId).then(response => {
                  let deptArr = response.data.map(item => {
                    item.deptId = parseInt(item.deptId).toString();
                    return item;
                  });
                  let dept = this.handleTree(deptArr, "deptId", "parentId");
                  // console.info(dept);
                  dept.unshift({ deptId: "-1", deptName: "主部门" });
                  items.deptSelect = dept;
                  this.$forceUpdate();
                });
                getDutySelect(items.companyId).then(res => {
                  items.dutySelect = res.data.map(item => {
                    item.dutyId = parseInt(item.dutyId).toString();
                    return item;
                  });
                  this.$forceUpdate();
                });
                listRole({ companyId: items.companyId }).then(res => {
                  items.roleSelect = res.data.map(item => {
                    item.roleId = parseInt(item.roleId).toString();
                    return item;
                  });
                  this.$forceUpdate();
                });
                return items;
              });
            }
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getUserById(row) {
      let that = this;
      return new Promise((resolve, reject) => {
        getUser({ userId: row.userId })
          .then(response => {
            let data = response.data;
            try {
              if (data.birthplace) {
                data.birthplace = JSON.parse(data.birthplace);
              } else {
                let arr = [];
                try {
                  arr.push(TextToCode[data.province].code);
                  arr.push(TextToCode[data.province][data.city].code);
                  arr.push(
                    TextToCode[data.province][data.city][data.district].code
                  );
                } catch (e) {
                  // console.info(e);
                }
                data.birthplace = arr;
              }
            } catch (e) {
              // console.info(e);
            }
            let userTree = [];
            let companys = [];
            data.userCompanyAndDeptResult.forEach(items => {
              items.roleIds = items.roleInfoList.map(item => {
                return parseInt(item.roleId).toString();
              });
              if (companys.indexOf(items.companyId) == -1) {
                let companyList = {
                  companyId: items.companyId, //公司id
                  companyName: items.companyName,
                  deptDutyList: [],
                  deptSelect: [],
                  dutySelect: [],
                  roleSelect: [],
                  deptDuty: [],
                  roleIds: items.roleIds
                };
                companyList.deptDutyList.push(items);
                companys.push(items.companyId);
                userTree.push(companyList);
              } else {
                userTree.forEach(item => {
                  if (items.companyId == item.companyId) {
                    item.roleIds = Array.from(
                      new Set(item.roleIds.concat(items.roleIds))
                    );
                    item.deptDutyList.push(items);
                  }
                });
              }
            });
            that.userDeptsTree = userTree.map(items => {
              getDeptSelect(items.companyId).then(response => {
                let deptArr = response.data.map(item => {
                  item.deptId = parseInt(item.deptId).toString();
                  return item;
                });
                let dept = this.handleTree(deptArr, "deptId", "parentId");
                // console.info(dept);
                dept.unshift({ deptId: "-1", deptName: "主部门" });
                items.deptSelect = dept;
                this.$forceUpdate();
              });
              getDutySelect(items.companyId).then(res => {
                items.dutySelect = res.data.map(item => {
                  item.dutyId = parseInt(item.dutyId).toString();
                  return item;
                });
                this.$forceUpdate();
              });
              listRole({ companyId: items.companyId }).then(res => {
                items.roleSelect = res.data.map(item => {
                  item.roleId = parseInt(item.roleId).toString();
                  return item;
                });
                this.$forceUpdate();
              });
              return items;
            });
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /** 修改按钮操作 */
    handleUpdate(row){
      this.reset();
      this.isEdit = true;
       application().then(response=>{
        this.applicationList = response.data
      })
      // this.getTreeselect();
      const userId = row.userId;
      if (true) {
        this.getUserInfo(row).then(res => {
            this.form = res;
            let trp={}
            this.form.SysUserApplyParam = []
            this.form.sysUserApplyMap.forEach(item=>{
              console.log(item)
              trp=item
              this.SysUserApplyParam.push(item.appId)
              this.form.SysUserApplyParam.push(trp)
              
              // trp.appId = item
              // trp.userId = row.userId
              // this.SysUserApplyParam.push(item.appId)
              // this.form.SysUserApplyParam.push(trp)
            })
            this.open = true;
            this.title = "修改用户";
          })
          .catch();
      } else {
        this.getUserById(row)
          .then(res => {
            this.form = res;
            this.open = true;
            this.title = "修改用户";
          })
          .catch();
      }
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          resetUserPwd(row.userId, value).then(response => {
            this.msgSuccess("修改成功，新密码是：" + value);
          });
        })
        .catch(() => {});
    },
    // 应用选择
   SysUserApplyParamChange(){
     console.log(this.form.userId)
     this.form.SysUserApplyParam=[]
     let trp={}
      this.SysUserApplyParam.forEach(item=>{
        trp={}
        trp.appId=item
        trp.userId = this.form.userId
        this.form.SysUserApplyParam.push(trp)
      })
      console.log(this.form.SysUserApplyParam);
   },
    /** 提交按钮 */
    submitForm: throttle(function() {
      this.isSubmint = true;
      this.$refs["form"].validate(valid => {
        this.$refs["entForm"].validate(evalid => {
          if (valid && evalid) {
            let arr = [];
            this.entUserDepts.forEach(items => {
              arr = arr.concat(items.roleIds);
            });
            this.form.roleIds = Array.from(new Set(arr));
            let userDeptsTree = JSON.parse(JSON.stringify(this.userDeptsTree));
            this.form.entUserDepts = userDeptsTree;

            if (this.form.userId) {
              // 修改的时候 同时修改了应用
              // this.form.SysUserApplyParam = []
              // let trp={}
              // this.SysUserApplyParam.forEach(item=>{
              //   trp={}
              //   trp.appId=item
              //   trp.userId=this.form.userId
              //   this.form.SysUserApplyParam.push(trp)
              //   this.$forceUpdate()
              // })
              console.log(this.form)
              updateUser(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
                this.isSubmint = false;
              });
            } else {
              addUser(this.form).then(response => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
                this.isSubmint = false;
              });
            }
          } else {
            this.isSubmint = false;
          }
        });
      });
    }),
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$confirm(
        '是否确认删除用户编号为"' + userIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delUser({ userId: userIds });
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/user/export",
        {
          ...this.queryParams
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "system/user/importTemplate",
        {
          ...this.queryParams
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    getDeptOptions() {
      let companyId = this.form.companyId;
      if (companyId) {
        listDept({ companyId: companyId }).then(response => {
          let dept = response.data;
          dept.unshift({ deptId: -1, deptName: "主部门" });
          this.deptOptions = dept;
        });
      }
    },

    loadNode(node, resolve) {
      // console.info(arguments);
      if (node.level === 0) {
        listCompany({ name: this.companyName, appId: this.queryParams.appId })
          .then(response => {
            let companyOptions = this.handleTree(
              response.data,
              "companyId",
              "parentId"
            );
            // console.log(response.data);
            // console.log(companyOptions);
            if (companyOptions.length > 0) {
              this.queryParams.companyId = companyOptions[0].companyId;
              this.$refs.tree.setCurrentKey(this.queryParams.companyId);
            } else {
              this.queryParams.companyId = "";
            }
            if (this.roles.indexOf("admin") != -1) {
              companyOptions.unshift({ companyId: -1, name: "主公司" });
            }
            this.companyOptions = companyOptions || [];
            this.companySelect = companyOptions || [];
            this.getList();
            return resolve(companyOptions);
          })
          .catch(err => {
            return resolve([]);
          });
      } else if (
        node.data.companyId &&
        node.data.companyId > 0 &&
        !node.data.isDept
      ) {
        let nodeList = node.data.children || [];
        listDept({ companyId: node.data.companyId })
          .then(response => {
            let data = response.data.map(item => {
              return {
                companyId: item.deptId,
                isDept: true,
                name: item.deptName,
                parentId: item.parentId,
                companyPid: item.companyId
              };
            });
            let deptList = this.handleTree(data, "companyId", "parentId");
            nodeList = nodeList.concat(deptList);

            return resolve(nodeList);
          })
          .catch(err => {
            return resolve(nodeList);
          });
      } else {
        return resolve(node.data.children || []);
      }
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    //修改
    handleAreaChange(value) {
      this.form.district = value;
      let data = {
        birthplace: value,
        province: CodeToText[value[0]],
        city: CodeToText[value[1]],
        district: CodeToText[value[2]]
      };
      this.form.birthplace = data.birthplace;
      this.form.province = data.province;
      this.form.city = data.city;
      this.form.district = data.district;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let cRow = row.cRow;
      let pRow = row.pRow;
      if (columnIndex === 0 || columnIndex === 3) {
        if (pRow - cRow - rowIndex == 0) {
          return {
            rowspan: cRow,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>
<style scoped>
.order_dialog {
  background-color: #ffffff !important;
}

</style>
<style lang="scss">
.table-form {
  .el-form-item {
    margin-bottom: 0 !important;
  }
}
.userOption{
  .el-select__tags{
    max-width: 76px !important;
  }
  .el-tag.el-tag--info.el-tag--mini.el-tag--light{
  width: 100px;
  overflow: hidden;
 text-overflow: ellipsis;
    white-space: nowrap;
  .el-select__tags-text{
    width: 39px;
    overflow: hidden;
     text-overflow: ellipsis;
    white-space: nowrap;
    display:inline-flex;
  }
  }

}
</style>
