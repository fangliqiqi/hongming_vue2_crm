<template>
  <div class="app-container orderReviews" >
    <!-- 首行搜索框 -->
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            v-model="showSearch"
          >
            <div class="search-popover">
              <el-form
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="审核时间" prop="enteringTime">
                  <el-date-picker
                    v-model="queryParams.enteringTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="调度审核状态" prop="dispatchState">
                  <el-radio-group v-model="queryParams.dispatchState">
                    <el-radio
                      v-for="item in dispatchStateList"
                      :key="item.dictId"
                      :label="item.dictCode"
                      :value="item.dictCode"
                    >
                      {{ item.dictLabel }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="审核财务" prop="financeName">
                  <el-input
                    placeholder="请输入"
                    v-model="queryParams.financeName"
                  >
                  </el-input>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认</el-button
                >
                <!-- <el-button size="small" @click="showSearch = false"
                  >取 消</el-button
                > -->
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search"
              >筛选
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.keyword"
            placeholder="请输入角色名称"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuerys"
          />
          <!-- <el-dropdown
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAdd"
          >
            <span>
              <i class="el-icon-plus"></i>
              新建商机
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%" @click.native="bulkImport"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-button
            class="ml8"
            icon="el-icon-download"
            size="small"
            @click="handleExport"
            v-if="false"
            v-hasPermi="['crm:log:export']"
            >导出
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
    <!-- 审核状态 -->
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.flag" @tab-click="handleQuery">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <!-- <el-tab-pane
          v-for="item in dispatchStateList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
        ></el-tab-pane> -->
        <el-tab-pane label="分配" value="10" name="10"></el-tab-pane>
        <el-tab-pane label="未分配" value="20" name="20"></el-tab-pane>
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

    <!-- 表格 -->
    <div class="table-data">
      <el-table
        v-loading="loading"
        :data="BusinessList"
        :height="tableHeight"
        @selection-change="handleSelectionChange"
        width="100%"
      >
        <el-table-column type="expand" align="left">
          <template slot-scope="scopes">
            <el-table
              v-loading="loading"
              :data="scopes.row.dispatchProductList"
              style="width: 50%;min-width:704px;"
            >
              <el-table-column label="项目名称" prop="serpriceName" />
              <el-table-column label="财务审核结果" prop="auditorState">
                <template slot-scope="scope">
                  <div
                    style="display: inline-block;"
                    v-if="scope.row.auditorState == '30'"
                    :class="{
                      bgred: scope.row.auditorState == '30'
                    }"
                  >
                    审核未通过
                  </div>
                  <div
                    style="display: inline-block;"
                    v-if="scope.row.auditorState == '20'"
                    :class="{
                      bgblue: scope.row.auditorState == '20'
                    }"
                  >
                    审核通过
                  </div>
                  <div
                    style="display: inline-block;"
                    v-if="scope.row.auditorState == '10'"
                    :class="{
                      bgyellow: scope.row.auditorState == '10'
                    }"
                  >
                    待审核
                  </div>
                  <!-- <span style="display: inline-block; width: 14px;
                    height: 14px;text-align: center;
                    border-radius: 50%;
                    border: 1px solid #3978E7; color:#3978E7;font-size: 10px; margin-left:8px;
                    line-height: 12px;" @click="handleDetails(scope.row)"
                         >?</span> -->
                </template>
              </el-table-column>
              <el-table-column label='执行人' prop="executorName">
              </el-table-column>
              <el-table-column
                label="操作"
                class-name="small-padding fixed-width"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    style="color:#3978E7"
                    v-hasPermi="['share:bank:edit']"
                    @click="examineResult(scope.row, scopes.row)"
                    v-if="scope.row.dispatchState !== '10'"
                    >查看详情</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    style="color:#3978E7"
                    @click="handleExamine(scope.row)"
                    v-hasPermi="['share:bank:edit']"
                    v-if="
                      scope.row.dispatchState == '10' &&
                        roles.indexOf('boss') == -1
                    "
                    >审核</el-button
                  >
                  <!-- <el-button
                    size="mini"
                    type="text"
                    style="color:#3978E7"
                    @click="handleAllocation(scopes.row, scope.row)"
                    v-hasPermi="['share:bank:remove']"
                    v-if="
                      scope.row.dispatchState == 20 &&
                        scope.row.auditorState == 20 &&
                        scope.row.allocationType == '' &&
                        roles.indexOf('boss') == -1
                    "
                    >分配</el-button
                  > -->
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="客户名称" prop="companyName">
          <template slot-scope="scope">
            <el-button type="text" @click="showDrawer(scope.row)">{{
              scope.row.companyName
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="客户编号" prop="client" />
        <el-table-column label="订单编号" prop="orderNo">
          <template slot-scope="scope">
            <el-button type="text" @click="editOrderFun(scope.row)">
              <span style="color:red;" v-if="scope.row.expeditedType == 10"
                >!!!</span
              >
              {{ scope.row.orderNo }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="服务顾问" prop="createBy" />
        <!-- <el-table-column label="调度员" align="center" prop="dispatch" /> -->
        <el-table-column label="审核财务" prop="auditor" />
        <el-table-column
          label="财务审核结果"
          prop="auditorState"
          :formatter="auditorStateFormat"
        >
          <template slot-scope="scope">
            <div
              v-if="scope.row.auditorState == 30"
              :class="{
                bgred: scope.row.auditorState == 30
              }"
            >
              审核未通过
            </div>
            <div
              v-if="scope.row.auditorState == 20"
              :class="{
                bgblue: scope.row.auditorState == 20
              }"
            >
              审核通过
            </div>
            <div
              v-if="scope.row.auditorState == 10"
              :class="{
                bgyellow: scope.row.auditorState == 10
              }"
            >
              待审核
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="调度审核状态 "
          prop="dispatchState"
          :formatter="dispatchStateFormat"
        >
          <template slot-scope="scope">
            <div
              v-if="scope.row.dispatchState == 30"
              :class="{
                bgred: scope.row.dispatchState == 30
              }"
            >
              审核未通过
            </div>
            <div
              v-if="scope.row.dispatchState == 20"
              :class="{
                bgblue: scope.row.dispatchState == 20
              }"
            >
              审核通过
            </div>
            <div
              v-if="scope.row.dispatchState == 10"
              :class="{
                bgyellow: scope.row.dispatchState == 10
              }"
            >
              待审核
            </div>
          </template>
        </el-table-column>

        <!-- <el-table-column class-name="table-control" fixed="right" width="100px">
          <template slot="header">
            <i class="el-icon-edit-outline"></i>

          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleTransfer(scope.row)"
            >转移</el-button>
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
    <!-- 订单转移 -->
    <el-dialog
      :title="transfertitle"
      :visible.sync="transferopen"
      width="500px"
      append-to-body
      class="orderAllocation"
    >
      <el-input
        placeholder="输入关键字进行过滤"
        style="margin-bottom: 20px;"
        v-model="filterText">
      </el-input>
      <el-tree
        node-key="id"
        class="select-tree"
        ref="tree"
        highlight-current
        show-checkbox
        check-strictly
        :data="companyOptions"
        :props="{
          label: 'name',
          children: 'companyStructures'
        }"
        :filter-node-method="filterNode"
        @node-click="onClickNode"
        @check-change="handleNodeClick"
      >
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submittransferForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      append-to-body
      class="orderAllocation"
    >
      <el-form ref="distributionForm" :model="distributionForm" :rules="rules">
        <el-row :gutter="14">
          <el-col :span="12">
            <el-form-item label="部门" prop="role">
              <el-select
                v-model="distributionForm.role"
                placeholder="请选择部门 "
                clearable
                size="small"
              >
                <el-option
                  v-for="item in department"
                  :key="item.deptId"
                  :value="item.deptId"
                  :label="item.deptName"
                  @click.native="departmentMembers(item)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门人员" prop="userId">
              <el-select
                v-model="distributionForm.userId"
                placeholder="请选择部门员工 "
                clearable
                size="small"
                @change="handleDepartment"
              >
                <el-option
                  v-for="(item, index) in departmentStaff"
                  :key="index + 'k'"
                  :value="item.userId"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 订单审核 -->
    <el-dialog
      title="订单审核"
      :visible.sync="examine"
      width="500px"
      append-to-body
      class="orderReview">
      <el-form ref="orderCheckFrom" :model="orderFrom" :rules="orderRules">
        <el-row :gutter="24">
          <el-col :span="12">
            <div style="font-size:16px">
              <i class="el-icon-school" style="margin-right:10px" />客户名称：{{
                orderFrom.companyName
              }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-divider></el-divider>
            <div>
              <i class="el-icon-warning" style="color:#F3A35F"> </i
              >点击不通过，必须填写备注，否则无法确认审核！
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="审核意见">
              <el-radio-group v-model="orderFrom.status">
                <el-radio
                  v-for="item in statusList"
                  :key="item.dictName"
                  :label="item.dictCode"
                  >{{ item.dictName }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="审核备注" prop="remark">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5 }"
                v-model="orderFrom.remark"
                placeholder="请输入审核备注"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAudit">确认审核</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>

    <!-- 审核结果展示 -->
    <el-dialog
      title="订单审核详情"
      :visible.sync="result"
      width="500px"
      append-to-body
      class="orderReview">
      <el-form
        ref="auditDetailsFrom"
        :model="auditDetailsFrom"
        :rules="orderRules"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <div style="font-size:16px">
              <i class="el-icon-school" style="margin-right:10px" />客户名称：{{
                CompanyName
              }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-divider></el-divider>
          </el-col>
        </el-row>
        <el-row :gutter="62" class="form-box">
          <el-col :span="24">
            <div class="sonBox idea">
              <span class="right14">审核状态:</span>
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="auditDetailsFrom.status == 20"
              >
                通过</el-radio
              >
              <el-radio v-model="radio" label="1" class="price" v-else>
                未通过</el-radio
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="sonBox">
              <span class="right14">审核备注:</span>
              <span class="price">{{ auditDetailsFrom.remark }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{ auditDetailsFrom.time }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{ auditDetailsFrom.name }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="cancel">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 新增订单 -->
    <el-dialog
      title="新增订单--选择服务产品"
      :visible.sync="newOrderVisible"
      width="704px"
      class="newOrders">
      <div class="el-icon-office-building mt10">
        {{ form.companyName }}
      </div>
      <el-divider></el-divider>
      <el-form
        ref="orderform"
        v-model="form"
        :rules="rules"
        :label-position="labelPosition"
        label-width="80px"
        maxHeight="612px"
        class="chengjiao"
      >
        <div>
          <el-row :gutter="24">
            <el-col>
              <el-input
                v-model="proTypeName"
                placeholder="请输入服务产品"
                clearable
                size="small"
                style="width: 240px"
                suffix-icon="el-icon-search"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="请选择一个服务产品:">
                <el-row :gutter="20" style="margin-top: -10px">
                  <el-col v-for="item in proTypeOption" :span="8">
                    <div class="type_item" @click="toOrderFun(item)">
                      <span>
                        {{ item.name }}
                      </span>
                      <el-button type="primary" size="mini">
                        选择并创建合同订单
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>

          <!--          <el-row :gutter="24">-->
          <!--            <el-col>-->
          <!--              <el-form-item label="创建新的服务产品:">-->
          <!--                <el-input v-model="form.district" placeholder="请选择行业分类" />-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->
          <!--          </el-row>-->
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消 </el-button>
      </div>
    </el-dialog>
    <edit-order
      :visible.sync="orderVisible"
      :orderId="orderId"
      :hidden-tab="hiddenTab"
    ></edit-order>

    <edit-drawer
      :visible.sync="drawerVisible"
      :companyId="companyId"
    ></edit-drawer>

  </div>
</template>

<script>
import {
  delClient,
  updateContact,
  getContactsList, //联系人
  getContracRecordtList, //合同列表
  addContract, //新增合同
  alterClient, //修改客户信息
  addFollowRecord //新增跟进记录
} from "@/api/crm/customer/customer";
import {
  listBank,
  getBank,
  delBank,
  addBank,
  updateBank,
  exportBank
} from "@/api/crm/bank";
import { throttle } from "@/utils/hmt";
import EditOrder from "@/views/components/EditOrder";
import EditDrawer from "@/views/components/EditDrawer";
import { mapGetters } from "vuex";
import { getIntermSerpriceList } from "@/api/crm/intermSerprice";
import { addOrder } from "@/api/crm/order";
import { mapState } from "vuex";
import {
  CompanyBusir,
  entDept,
  entUser,
  allocation,
  audit,
  auditDetails,
  companyTreeByRole,
  transfer
} from "../../../../api/crm/businessScheduling/orderReview";

export default {
  name: "orderReview",
  components: {
    EditOrder,
    EditDrawer
  },
  data() {
    var checkRemark = (rule, value, callback) => {
      // console.info(arguments);
      if (value === "" && this.orderFrom.status == 30) {
        callback(new Error("请输入审核备注"));
      } else {
        if (this.orderFrom.remark !== "") {
          this.$refs.orderCheckFrom.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      lastTime: 0,
      //角色
      roles: [],
      customerRatingList: [], //客户等级字典
      vatTypeList: [], //增值税类型
      footprintList: [],
      load: false,
      stepIndex: 0,
      activeName: "first",
      // activeName: "indent",
      activeOrder: "second",
      dialogVisibleshow: false,
      drawerVisible: false, //抽屉显示
      followList: [], //足迹
      footprintList: [],
      addFollowShow: false,
      settings: [
        { icon: "el-icon-delete", lable: "删除客户", value: "1" },
        {
          icon: "el-icon-news",
          lable: "移交商机",
          value: "2"
        },
        { icon: "el-icon-link", lable: "释放商机", value: "3" }
      ],
      //新增订单
      newOrderVisible: false,

      // 是否抽屉弹出层
      view: false,
      //审核结果展示
      result: false,
      //审核
      orderFrom: {},
      //订单审核结果
      statusList: [],
      //审核详情
      auditDetailsFrom: {},
      //公司名称
      CompanyName: "",
      //表单对齐方式
      labelPosition: "top",
      //单选框默认选项
      radio: "1",
      //查看订单显示
      orderVisible: false,
      orderId: "",
      hiddenTab: true,
      //订单审核
      examine: false,
      //财务审核状态
      auditorState: [],
      //调度审核状态
      dispatchState: [],
      //项目
      dispatchProductList: [],
      //部门员工
      departmentStaff: [],
      //部门
      department: [],
      //审核状态字典
      dispatchStateList: [],
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
      delSwitch: [],
      // 总条数
      total: 0,
      // 商机等级表格数据
      BusinessList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //分配参数
      distributionForm: {
        orderId: null,
        userId: null,
        role: null,
        productId: null,
        userName: ""
      },
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        companyId: null,
        bankName: null,
        bankAccountNumber: null,
        bankAddress: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        dispatchState: null,
        financeName: null,
        sDispatchTime: null,
        eDispatchTime: null
      },

      // 表单参数
      form: {},
      //订单审核校验
      orderRules: {
        remark: [{ validator: checkRemark, trigger: "blur" }]
      },
      // 表单校验
      rules: {
        bankAccountNumber: [
          {
            required: true,
            message: "银行卡账号不能为空",
            trigger: "blur"
          }
        ],
        bankAddress: [
          {
            required: true,
            message: "开卡行地址不能为空",
            trigger: "blur"
          }
        ],
        bankName: [
          {
            required: true,
            message: "开户行不能为空",
            trigger: "blur"
          }
        ],
        companyId: [
          {
            required: true,
            message: "公司Id不能为空",
            trigger: "blur"
          }
        ],
        role: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "blur"
          }
        ],
        userId: [
          {
            required: true,
            message: "部门员工不能为空",
            trigger: "blur"
          }
        ]
      },
      proTypeName: "",
      proTypeOption: [],
      companyId: null,
      transferFrom:{  //订单转移
        orderId:null,
        userId:null,
      },
      companyOptions: [],// 公司树选项
      transfertitle:null,
      transferopen:false,
      filterText:null,
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: state => state.user
    })
  },
  created() {
    this.roles = this.userInfo.roleCodes;
    this.getDicts("del_switch").then(res => {
      this.delSwitch = res.data;
    });
    //调度审核状态
    this.getDicts("dispatch_state").then(res => {
      this.dispatchStateList = res.data.slice(0, 3);
      this.dispatchState = res.data;
    });
    //财务审核状态
    this.getDicts("auditor_state").then(res => {
      this.auditorState = res.data;
    });
    //订单审核结果
    this.getDicts("order_review_results").then(res => {
      this.statusList = res.data;
      // console.log(this.statusList);
    });
    //增值税类型
    this.getDicts("vat_type").then(res => {
      this.vatTypeList = res.data;
    });
    this.getList();
  },
  watch: {
    orderVisible: function(val, oldVal) {
      if (!val) {
        // this.getOrderList(this.form.id);
        this.newOrderVisible = false;
      }
    },
    proTypeName(val) {
      this.proTypeOption = this.proTypeList.filter(item => {
        return item.name.indexOf(val) != -1;
      });
    },

    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
   beforeRouteEnter(to, from, next){
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },

  methods: {
    /** 查询商机信息列表 */
    getList() {
      this.loading = true;
      let queryParams = JSON.parse(JSON.stringify(this.queryParams));
      queryParams.flag = queryParams.flag == "0" ? "" : queryParams.flag;
      if (queryParams.enteringTime) {
        if (queryParams.enteringTime.length !== 0) {
          queryParams.sDispatchTime = queryParams.enteringTime[0] + " 00:00:00";
          queryParams.eDispatchTime = queryParams.enteringTime[1] + " 23:59:59";
          delete queryParams.enteringTime;
        }
      }
      CompanyBusir(queryParams).then(response => {
        this.BusinessList = response.data.rows;
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    //审核
    handleExamine(row) {
      this.orderFrom = { id: row.id, status: "20", remark: "" };
      this.examine = true;
    },
    //订单审核确定
    confirmAudit() {
      this.$refs["orderCheckFrom"].validate(valid => {
        if (valid) {
          audit(this.orderFrom).then(response => {
            this.examine = false;
            if (response.code == 200) {
              if (this.orderFrom.status == 20) {
                this.$message.success("审核通过");
              } else if (this.orderFrom.status == 30) {
                this.$message.success("审核未通过");
              }
            }
            this.getList();
          });
        }
      });
    },
    //审核详情
    examineResult(row, rows) {
      this.result = true;
      this.CompanyName = rows.companyName;

      auditDetails({ id: row.id }).then(response => {
        this.auditDetailsFrom = response.data;
      });
    },
    //订单七项
    editOrderFun(row) {
      this.orderId = row.busirId;
      this.orderVisible = true;
      this.hiddenTab = false;
    },
    //订单信息抽屉弹窗
    orderInformation() {
      this.view = true;
    },
    command: function(command) {
      //删除客户
      if (command == "1") {
        const ids = this.form.id;
        this.$confirm("是否确认此删除客户信息?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(function() {
            return { idelClientd: ids };
          })
          .then(() => {
            this.getList();
            this.msgSuccess("删除成功");
          })
          .catch(function() {});
      } else if (command == "2") {
        this.dialogVisible = true;
        //移交商机
      } else if (command == "3") {
        //释放商机
        const ids = this.form.id;
        this.$confirm("是否确定释放该条商机？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(function() {
            return toMareLiberum({ id: ids });
          })
          .then(() => {
            this.getList();
            this.view = false;
            this.msgSuccess("释放成功");
          })
          .catch(function() {});
      }
    },
    //修改
    updateForm(data) {
      data.id = this.form.id;
      alterClient(data).then(response => {
        // console.info(response);
        if (response.code === 200) {
        }
      });
    },

    // 订单转移 获取部门信息
    handleTransfer(row){
      console.log(row)
      // 清空上次选择的信息
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
      });
      this.filterText = null
      this.$set(this.transferFrom,'orderId',row.busirId)
      companyTreeByRole().then(response=>{
        this.transfertitle ="订单:" + row.orderNo +"转移"
        this.transferopen = true;
        let companyOptions = response.data;
        this.companyOptions = companyOptions || [];
      })
    },
    // 单击节点
    onClickNode(node) {
      console.log(node)
    },
    // 点击选中 并且只能单选
    handleNodeClick(data, checked) {
      if(checked){
        this.$refs.tree.setCheckedKeys([data.id])
        this.$set(this.transferFrom,'userId',data.id)
      }else{

      }
    },
    // 节点过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 订单转移提交
    submittransferForm(){
      console.log(this.transferFrom)
      if(this.transferFrom.userId){
        transfer(this.transferFrom).then(res=>{
          this.$message.success('转移成功')
          this.transferopen = false
          this.getList()
          this.reset()
        })
      }else{
        this.$message.error('请选择转移的公司')
      }
    },
    //地区
    handleAreaChange(value) {
      this.form.district = value;
      let data = {
        district: value,
        prov: CodeToText[value[0]],
        city: CodeToText[value[1]],
        county: CodeToText[value[2]]
      };
      this.form.province = data.prov;
      this.form.city = data.city;
      this.form.county = data.county;
      this.updateForm(data);
    },
    handleInputCallback() {
      this.handleInputConfirm(res => {
        this.updateForm({ userlabelIds: res });
      });
    },
    handleInputConfirm(cb) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.userlabelIds.push(inputValue);
        if (typeof cb == "function") {
          cb(this.form.userlabelIds);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleCloseCallback(tag) {
      // console.info(tag);
      this.handleClose(tag, res => {
        this.updateForm({ userlabelIds: res });
      });
    },
    handleClose(tag, cb) {
      this.form.userlabelIds.splice(this.form.userlabelIds.indexOf(tag), 1);
      if (typeof cb == "function") {
        cb(this.form.userlabelIds);
      }
    },
    handleClick() {},
    handleClicks() {},
    // 新增跟进记录按钮
    addFollow() {
      this.followReset();
      this.addFollowShow = !this.addFollowShow;
    },
    /** 新增跟进记录提交按钮 */
    followFormSubmit() {
      this.$refs["followForm"].validate(valid => {
        if (valid) {
          (this.followForm.classify = 20),
            (this.followForm.companyId = this.form.id); //添加跟进记录id
          this.followForm.nextDate =
            this.followForm.nextFollowTime + " " + this.followForm.tempTime;
          addFollowRecord(this.followForm).then(response => {
            // console.info("新增跟进成功");
            if (response.code == 200) {
              this.msgSuccess("新增跟进成功");
              this.addFollowShow = false;
              // this.getFollowList(this.form.id);
              this.getFollowList(this.followForm.companyId);
              this.followReset();
            }
          });
        }
      });
    },
    // 新增合同提交按钮
    contractSubmit() {
      this.$refs["contractForm"].validate(valid => {
        if (valid) {
          this.contractForm.companyId = this.form.id; //添加合同记录id
          addContract(this.contractForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增合同成功");
              this.getContractList(this.contractForm.companyId);
              this.open = false;
            }
          });
        }
      });
    },
    //财务审核详情
    handleDetails(row) {
      // console.log(row);
    },

    //分配
    handleAllocation(row, rows) {
      this.distributionForm.role = null;
      this.distributionForm.deptName = null;
      this.distributionForm.userId = null;
      this.distributionForm.userName = null;
      this.open = true;
      this.title = "分配订单—" + rows.serpriceName;
      this.distributionForm.productId = rows.id;
      this.distributionForm.orderId = row.busirId;
      entDept(this.queryParams).then(response => {
        this.department = response.data;
      });
    },

    /** 分配提交按钮 */
    submitForm: throttle(function() {
      this.$refs["distributionForm"].validate(valid => {
        if (valid) {
          allocation(this.distributionForm).then(response => {
            if (response.code == 200) {
              this.$message.success("分配成功");
            }
            this.departmentStaff = [];
            this.department = [];
            this.open = false;
            this.getList();
          });
        }
      });
    }),

    //部门选择
    departmentMembers(row) {
      let deptId = row.deptId;
      this.distributionForm.role = row.deptName;
      this.distributionForm.deptName = row.deptShortName;
      this.distributionForm.userId = null;
      this.distributionForm.userName = null;
      entUser({ deptId: deptId, deptName: row.deptShortName }).then(
        response => {
          this.departmentStaff = response.data;
          if(response.data.length>0){
            this.distributionForm.userId = response.data[0].userId;
            this.distributionForm.userName =response.data[0].name;
          }
        }
      );
    },

    //获取部门员工id
    handleDepartment(val) {
      let user = this.departmentStaff.filter(item => {
        return item.userId == val;
      });
      this.distributionForm.userName =
        user && user.length > 0 ? user[0].name : null;
    },

    // 取消按钮
    cancel() {
      //查看详情
      this.result = false;
      //项目分配
      this.examine = false;
      //新增订单
      this.newOrderVisible = false;
      this.open = false;
      this.transferopen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        companyId: null,
        bankName: null,
        bankAccountNumber: null,
        bankAddress: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null,
        delSwitch: null
      };
      this.transferFrom = {
        orderId:null,
        userId:null
      };
      this.filterText = null
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.getList();

    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.resetQuery();

      this.getList();

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.enteringTime = null;
      this.resetForm("queryForm");
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getBank({ id: row.id }).then(response => {
        this.form = response.data;
        this.open = true;
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除公司银行开户信息编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delBank({ id: ids });
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有公司银行开户信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportBank(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    //调度 审核状态
    dispatchStateFormat(row) {
      return this.selectDictLabel(this.dispatchState, row.dispatchState);
    },
    //内账 审核状态
    auditorStateFormat(row) {
      return this.selectDictLabel(this.auditorState, row.auditorState);
    },
    //订单审核结果
    statusFormat(row) {
      return this.selectDictLabel(this.status, row.status);
    },
    //增值税类型
    taxTypeFormat(row) {
      return this.selectDictLabel(this.vatTypeList, row.taxType);
    },
    showDrawer(row) {
      this.drawerVisible = true;
      this.companyId = row.companyId;
    }
  }
};
</script>
<style lang="scss">
.orderReviews{
//分配
.orderAllocation {
  font-weight: 400;
  color: #565759;
  .el-dialog {
    width: 422px !important;
    /*height: 208px;*/
    margin-top: 30vh !important;
    .el-dialog__body {
      padding: 20px 24px 0 24px !important;
      .el-form {
        margin: 0;
        .el-input {
          width: 222px !important;
        }
        .el-select {
          width: 222px !important;
        }
      }
    }
    .el-dialog__footer {
      padding: 6px 24px 16px 24px;
    }
  }
}

// 审核

.orderReview {
  .el-dialog .el-dialog__body {
    height: 284px;
    overflow: auto;
  }
  .el-dialog .el-dialog__footer {
    padding: 15px 24px;
  }
  .el-form {
    margin: 0 !important;
    .el-row {
      &:nth-child(2) {
        margin-bottom: 14px;
        .el-divider--horizontal {
          margin-bottom: 9px;
        }

        div {
          &:nth-child(2) {
            background: #fdf6f0;
            border: 1px solid #faeee1;
            height: 34px;
            padding-left: 16px;
            line-height: 34px;
            font-size: 12px;
            i {
              font-size: 16px;
              margin-right: 10px;
              line-height: 34px;
            }
          }
        }
      }
      &:nth-child(3),
      &:nth-child(4) {
        margin-left: 20px !important;
        margin-right: 20px !important;
      }
      &:nth-child(4) {
        .el-textarea {
          width: 80% !important;
        }
      }
    }
  }
  .form-box {
    width: 100%;
    margin: 0px !important;
    padding-top: 27px;
    .el-col {
      margin-bottom: 20px;
    }
    .sonBox {
      // margin-left: 34px;
      // margin-right: 34px;
      .right14 {
        margin-right: 14px;

        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #565759;
        line-height: 24px;
      }
      .price {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #565759;
        line-height: 24px;
      }
    }
    .idea {
      display: flex;
      align-items: center;
      .el-radio {
        height: 18px;
      }
    }
  }
}
}
</style>


<style lang="scss" scoped>
.bgred {
  text-align: center;
  background: #faeef0;
  color: #ef5465;
  width: 86px;
  height: 22px;
  border-radius: 3px;
}
.bgblue {
  text-align: center;
  background: #ecf2fc;
  color: #3978e7;
  width: 86px;
  height: 22px;
  border-radius: 3px;
}
.bgyellow {
  text-align: center;
  background: #fdf6f0;
  color: #f3a35f;
  width: 86px;
  height: 22px;
  border-radius: 3px;
}
</style>

<style lang="scss">
.type_item {
  width: 100%;
  height: 92px;
  border: 1px #e6e7eb solid;
  background-color: #f8f9fb;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  overflow: hidden;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  & > span {
    margin: 24px 20px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #565759;
  }
  .el-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
  }
  &:hover {
    border-color: #b5c8f1;
    background-color: #ecf2fc;
    & > span {
      color: #4977e0;
    }
    .el-button {
      transform: translateY(0);
    }
  }
}
.orderReviews{
  .el-tree-node{
    .is-leaf + .el-checkbox .el-checkbox__inner{
      display: inline-block;
    }
    .el-checkbox .el-checkbox__inner{
      display: none;
    }
  }
}


</style>
