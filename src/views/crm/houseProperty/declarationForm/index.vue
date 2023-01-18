<template>
  <div class="app-container declarationForm">
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
                <el-form-item label="客户名称/联系方式" prop="keyword">
                  <el-input
                    placeholder="请输入客户名称"
                    v-model="queryParams.keyword"
                    size="small"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item label="所属公司" prop="companyName ">
                  <el-input
                    placeholder="请输入所属公司"
                    v-model="queryParams.companyName"
                    size="small"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="报单时间"
                  prop="declarationTime"
                  class="clientsLv"
                >
                  <el-date-picker
                    v-model="queryParams.declarationTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="客户类型"
                  prop="clientType"
                  class="clientsLv"
                >
                  <el-radio-group v-model="queryParams.clientType">
                    <el-radio
                      v-for="item in houseCustomerTypeList"
                      :key="item.dictCode"
                      :label="item.dictCode"
                    >
                      {{ item.dictName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button type="cyan" size="small" @click="resetQuery"
                  >重置</el-button
                >
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认</el-button
                >
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search"
              >筛选
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.keyword"
            placeholder="请输入客户名称或联系方式"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuerys"
          />
          <el-button
            class="ml8"
            icon="el-icon-upload2"
            size="small"
            @click="handleExport"
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
    <!--  -->
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.condition" @tab-click="handleQuerys">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <el-tab-pane label="尾款订单" value="10" name="10"></el-tab-pane>
        <el-tab-pane label="未提交订单" value="20" name="20"></el-tab-pane>
        <el-tab-pane label="未提单订单" value="30" name="30"></el-tab-pane>
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
        class="slither"
        v-loading="loading"
        :data="companyList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="资源id" align="center" prop="id" /> -->
        <el-table-column
          label="订单编号"
          align="left"
          prop="orderNo"
          width="220"
        >
          <template slot-scope="scope">
            <div
              type="text"
              style="display:flex;align-items:center;line-height: 16px;"
            >
              <span style="color:#3978E7;"> {{ scope.row.orderNo }}</span>
              <span class="newFather" v-if="advanceUpdate(scope.row)">
                <img
                  src="@/assets/image/new.png"
                  alt=""
                  style="width:38px;height: 13px; margin-left:4px;"
                />

                <span class="new">new</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="客户名称"
          align="left"
          prop="clientName"
          width=" 130"
        >
          <template slot-scope="scope">
            {{ scope.row.houproClientResult.clientName }}
          </template>
        </el-table-column>

        <el-table-column
          label="所属公司"
          align="left"
          prop="companyName"
          width=" 130"
        >
          <template slot-scope="scope">
            {{ scope.row.houproClientResult.companyName }}
          </template>
        </el-table-column>

        <el-table-column label="联系方式" align="left" prop="phone" width="130">
          <template slot-scope="scope">
            {{ scope.row.houproClientResult.phone }}
          </template>
        </el-table-column>

        <el-table-column
          label="剩余套餐数"
          align="left"
          prop="purchaseQuantity"
          width="100"
        />
        <el-table-column
          label="客户类型"
          align="left"
          :formatter="houseCustomerTypeFormat"
          width="150"
        />
        <el-table-column
          label="报单时间"
          align="left"
          prop="customsTime"
          width="150"
        />
        <el-table-column
          label="所属区域"
          align="left"
          width="200"
          prop="region"
        >
          <template slot-scope="scope">
            {{ scope.row.houproClientResult.region }}
          </template>
        </el-table-column>
        <el-table-column
          label="报单审核"
          align="left"
          width="150"
          prop="status"
        >
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status == 10">待审核</el-tag>
            <el-tag
              style="cursor:pointer"
              v-if="scope.row.status == 20"
              @click="viewDetails(scope.row)"
              >通过</el-tag
            >
            <el-tag
              type="danger"
              v-if="scope.row.status == 30"
              @click="viewDetails(scope.row)"
              >未通过</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          label="尾款审核"
          align="left"
          width="150"
          prop="finalStatus"
        >
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.finalStatus == 10"
              >待审核</el-tag
            >
            <el-tag
              v-if="scope.row.finalStatus == 20"
              @click="auditDetails(scope.row)"
              >通过</el-tag
            >
            <el-tag
              type="danger"
              v-if="scope.row.finalStatus == 30"
              @click="auditDetails(scope.row)"
              >未通过</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="newOrders(scope.row)"
              v-hasPermi="['share:bank:edit']"
              >创建订单</el-button
            >
            <el-button
              size="mini"
              type="text"
              style="color:#EF5465"
              @click="modify(scope.row)"
              v-if="scope.row.status == 30 || scope.row.finalStatus == 30"
              >修改</el-button
            >
            <!-- :disabled="scope.row.purchaseQuantity == 0||scope.row.finalStatus==10||scope.row.finalStatus==30||scope.row.specialStatus==10" -->
            <!-- :disabled="
                scope.row.specialStatus == 10
                  ? true
                  : scope.row.finalStatus == 10
                  ? true
                  : scope.row.finalStatus == 30
                  ? true
                  : scope.row.purchaseQuantity == 0
                  ? true
                  : false
              " -->
            <!-- :class="
                scope.row.purchaseQuantity == 0 ||
                scope.row.finalStatus == 10 ||
                scope.row.finalStatus == 30 ||
                scope.row.specialStatus == 10
                  ? 'gray'
                  : 'yellow'
              " -->
            <!-- :class="
               scope.row.specialStatus == 10? 'gray'
                : scope.row.finalStatus == 10 ? 'gray'
                 : scope.row.finalStatus == 30 ? 'gray'
                : scope.row.purchaseQuantity == 0
                  ? 'gray'
                  : 'yellow'
              " -->
            <el-button
              size="mini"
              type="text"
              :class="
                scope.row.purchaseQuantity == 0 ||
                scope.row.finalStatus == 10 ||
                scope.row.finalStatus == 30 ||
                scope.row.specialStatus == 10 ||
                scope.row.specialStatus == 5
                  ? 'gray'
                  : 'yellow'
              "
              :disabled="
                scope.row.purchaseQuantity == 0 ||
                  scope.row.finalStatus == 10 ||
                  scope.row.finalStatus == 30 ||
                  scope.row.specialStatus == 10 ||
                  scope.row.specialStatus == 5
              "
              @click="handleBill(scope.row)"
              v-if="scope.row.status == 20"
              >提单</el-button
            >
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

    <!-- 导入 -->
    <el-dialog
      title="导入"
      open
      :visible.sync="uploadingFile"
      width="516px"
      append-to-body
      class="uploadingFile"
    >
      <el-row>
        <el-col :span="24">
          <span class="title">模块下载:</span>
          <el-button style="padding:0px;border:0px;" @click="downloadModule">
            <el-tag style="margin:0px;">下载</el-tag>
          </el-button>
        </el-col>
        <el-col :span="24" style="display:flex">
          <span class="title">上传文件:</span>
          <el-upload
            ref="importUpdateFile"
            class="upload-demo"
            :auto-upload="false"
            :action="importFileUrl"
            :on-change="uploadingTrigger"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            accept=".xls,.xlsx"
            :on-exceed="handleExceed"
            :file-list="importFileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              上传文件只能为excel文件，且为xlsx,xls格式
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitFormUploading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 审核结果展示 -->
    <el-dialog
      title="订单审核详情"
      :visible.sync="result"
      width="500px"
      append-to-body
      class="toExamine"
    >
      <el-form
        ref="auditDetailsForm"
        :model="auditDetailsForm"
        label-width="82px"
        class="auditDetailsForm"
      >
        <el-row
          :gutter="24"
          style="margin-left: -33px;
             margin-right: -33px;
             border-bottom: 1px solid #E6E7EB;
             margin-bottom: 24px;"
        >
          <el-col :span="24" style="padding-left:0px">
            <el-form-item prop="companyName">
              <template>
                <div style="font-size:16px">
                  <i class="el-icon-school" style="margin-right:10px" />{{
                    auditDetailsForm.name
                  }}
                </div>
              </template>
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-divider></el-divider>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见：" prop="companyName">
              <template>
                <el-tag
                  v-if="auditDetailsForm.status == 20"
                  style="height: 22px !important;line-height: 22px !important;
    margin: 0px;"
                  >审核通过</el-tag
                >
                <el-tag
                  type="danger"
                  v-if="auditDetailsForm.status == 30"
                  style="height: 22px !important;line-height: 22px !important;
    margin: 0px;"
                  >审核未通过</el-tag
                >
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核备注：" prop="remark">
              <template>
                {{ auditDetailsForm.remark }}
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核时间：" prop="time">
              <template>
                {{ auditDetailsForm.time }}
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核人：" prop="name">
              <template>
                {{ auditDetailsForm.name }}
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 尾款收费 -->
    <el-dialog width="516px" title="尾款收费" :visible.sync="balanceShow">
      <div class="balance">
        <el-form v-model="balanceForm">
          <el-row :gutter="20">
            <el-col :span="12" class="signingTime">
              <el-form-item label="预收金额" prop="amountReceivable">
                <span class="yue">元</span>
                <el-input
                  v-model="balanceForm.amountReceivable"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付时间" prop="receiptTime">
                <el-date-picker
                  v-model="balanceForm.receiptTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  @change="Update"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款方式" prop="paymentMethod">
                <el-select
                  v-model="balanceForm.paymentMethod"
                  placeholder="请选择收款方式"
                >
                  <el-option
                    v-for="item in PaymentMethodList"
                    :key="item.id"
                    :label="item.patternPayment"
                    :value="item.patternPayment"
                  >
                    {{ item.patternPayment }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款账户" prop="account">
                <el-input
                  placeholder="请输入付款账户"
                  v-model="balanceForm.account"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="收费备注" class="applicant" prop="remarks">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4 }"
                  v-model="balanceForm.remarks"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上传附件" prop="imageIds">
                <el-upload
                  ref="uploadCharge"
                  class="upload-demo"
                  :headers="headers"
                  :action="uploadUrl"
                  :data="{ state: 20, clientId: clientId }"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="
                    (response, file, fileList) =>
                      uploadSuccess(response, file, fileList, 40)
                  "
                  multiple
                  :limit="3"
                  list-type="picture"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button icon="el-icon-upload2">上传附件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col>
              <template>
                <div class="imgStyle">
                  <span v-for="val in voucherImgList" :key="val.id">
                    <el-image
                      :src="fileUrl + val.url"
                      style="width:50%; margin-bottom:10px"
                      :preview-src-list="
                        voucherImgList.map(ite => {
                          return fileUrl + ite.url;
                        })
                      "
                    />
                  </span>
                </div>
              </template>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn">
        <el-button @click="balanceShow = false">取 消</el-button>
        <el-button type="primary" @click="handleCharge">确认收费</el-button>
      </div>
    </el-dialog>
    <house-drawer
      ref="houseDrawer"
      :visible.sync="orderShow"
      :companyId="companyId"
      :settings="settings"
      @editOrder="editOrderFun"
    ></house-drawer>
    <create-house-order
      ref="createHouseOrder"
      :companyId="companyId"
      @changeShow="showAddOrUpdate"
      :houseOrderShow="houseOrderShow"
    ></create-house-order>
    <!-- <house-bill-of-lading
      ref="HouseBillOfLading"
      :houseId="houseId"
      @changeShow="showHouseBillOfLading"
      :houseBillOfLadingShow="houseBillOfLadingShow"
    >
    </house-bill-of-lading> -->

    <house-place-order
      ref="HousePlaceOrder"
      :houseId="houseId"
      @changeShow="showHousePlaceOrder"
      :HousePlaceOrderShow="HousePlaceOrderShow"
    >
    </house-place-order>
  </div>
</template>

<script>
import {
  listClient,
  addClient,
  delClient,
  getClient,
  alterClient, //修改客户信息
  entrepreneurMessageLiaison
} from "@/api/crm/customer/customer";
import { mapGetters } from "vuex";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import EditOrder from "@/views/components/EditOrder";
import { throttle } from "@/utils/hmt";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import {
  houseOrder,
  reviewDetails,
  ModificationOfDeclaration,
  updateFinalPayment
} from "../../../../api/crm/houseProperty/declarationForm";
import HouseDrawer from "@/views/components/HouseDrawer/index";
import CreateHouseOrder from "@/views/components/CreateHouseOrder/index";
import HouseBillOfLading from "@/views/components/HouseBillOfLading/index";
import HousePlaceOrder from "../../../components/HousePlaceOrder/index";
import {
  BalancePaymentEcho,
  PaymentMethod
} from "../../../../api/crm/HouseBillOfLading/HouseBillOfLading";
export default {
  components: {
    HouseDrawer,
    EditOrder,
    CreateHouseOrder,
    HouseBillOfLading,
    HousePlaceOrder
  },
  name: "declarationForm",
  data() {
    return {
      importFileUrl:
        process.env.VUE_APP_CRM_API +
        "/hmkj-crm/resoBusinessOpportunity/bulkImport",
      fileUrl: process.env.VUE_APP_FILE_API,
      uploadUrl:
        process.env.VUE_APP_BASE_API + "/hmkj-crm/houproImgfile/upload",
      headers: { Authorization: _getSessionStore(tokenKey) },
      uploadingFile: false, //上传
      orderVisible: false, //查看订单显示
      clientId: null,
      orderId: "",
      hiddenTab: true,
      labelPosition: "right",
      houseCustomerTypeList: [], //客户类型
      areaOptions: regionData, //区域数据
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisible: false,
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
      // 公司表格数据
      companyList: [],
      // 弹出层标题
      title: "",
      //创建订单
      houseOrderShow: false,
      //提单
      // houseBillOfLadingShow: false,
      HousePlaceOrderShow: false,
      //尾款收费弹窗
      balanceShow: false,
      //尾款收费
      balanceForm: {},
      //收费支付时间
      PaymentTime: "",
      //收款方式
      PaymentMethodList: [],
      // 是否显示弹出层
      open: false,
      // 是否抽屉弹出层
      orderShow: false,
      houseId: null,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        createBy: null, //业务员
        companyId: null,
        appId: "",
        companyName: "",
        clientType: null,
        province: null,
        city: null,
        county: null,
        condition:'0'
      },
      // 表单参数
      form: {},
      result: false, //订单审核详情弹出框
      auditDetailsForm: {}, //订单审核详情表单
      //单选框默认选项
      radio: "1",
      settings: [{ icon: "el-icon-delete", lable: "删除", value: "1" }],
      load: false,
      companyId: null,
      // 上传
      fileList: [],
      importFileList: [], //导入数据
      //付款凭证
      voucherImgList: [],
      imageIds: []
    };
  },
  computed: {
    ...mapGetters(["tableHeight"])
    // view: {
    //     get() {
    //       if (this.visible) {
    //         this.getData()
    //       }
    //     }
    // }
  },
  watch: {
    orderShow: function(val, oldVal) {
      if (!val) {
        this.getList();
      }
    }
  },
  created() {
    this.handleRegionChange();
    //客户类型
    this.getDicts("house_customer_type").then(res => {
      this.houseCustomerTypeList = res.data;
    });
    this.getList();
    this.queryParams.appId = this.$store.getters.appId + "";
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm); //当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    /** 查询客户信息列表 */
    getList() {
      this.loading = true;
      let queryParams = this.queryParams;
      let data = JSON.parse(JSON.stringify(queryParams));
      data.condition = data.condition == "0" ? "" : data.condition;
      houseOrder(data).then(response => {
        this.companyList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    //new显示
    advanceUpdate(row) {
      var date = new Date();
      var month = Number(date.getMonth()) + 1;
      if (month < 10) {
        month = "0" + month;
      } else {
        return (month = month);
      }
      var day = Number(date.getDate());
      if (day < 10) {
        day = "0" + day;
      }
      var year = date.getFullYear();
      this.PaymentTime = [year, month, day].join("-");
      row.createTime = row.createTime.substr(0, 10);
      return this.PaymentTime.substr(0, 4) - row.createTime.substr(0, 4) == 0
        ? this.PaymentTime.substr(5, 2) - row.createTime.substr(5, 2) == 0
          ? this.PaymentTime.substr(8, 2) - row.createTime.substr(8, 2) <= 3 &&
            this.PaymentTime.substr(8, 2) - row.createTime.substr(8, 2) >= 0
            ? true
            : false
          : false
        : false;
    },
    //查看详情
    viewDetails(row) {
      this.result = true;
      reviewDetails({ id: row.id, dateType: 10 }).then(response => {
        this.auditDetailsForm = response.data;
      });
    },
    //确认尾款收费支付时间
    Update() {
      var date = new Date();
      var month = Number(date.getMonth()) + 1;
      if (month < 10) {
        month = "0" + month;
      } else {
        return (month = month);
      }
      var day = Number(date.getDate());
      if (day < 10) {
        day = "0" + day;
      }
      var year = date.getFullYear();
      this.PaymentTime = [year, month, day].join("-");
 
      if (this.balanceForm.receiptTime > this.PaymentTime) {
        this.msgError("支付时间不能大于当前时间");
        return (this.balanceForm.receiptTime = "");
      }
    },
    //确认尾款收费
    handleCharge: throttle(function() {
      this.balanceForm.imageIds =
        this.balanceForm.imageIds + "," + this.imageIds.join(",");
      updateFinalPayment(this.balanceForm)
        .then(response => {
          this.balanceShow = false;
          this.getList();
        })
        .catch(err => {});
    }),
    //查看尾款详情
    auditDetails(row) {
      this.result = true;
      reviewDetails({ id: row.id, dateType: 20 }).then(response => {
        this.auditDetailsForm = response.data;
      });
    },
    //提单
    // handleBill(row) {
    //   this.houseId = row.id;
    //   console.log(row);
    //   let EchoForm = {
    //     clientId: row.houproClientResult.id,
    //     orderId: row.id,
    //     clientType: row.type,
    //     businessType: row.businessType,
    //     clientName: row.houproClientResult.clientName,
    //     tidan: "no"
    //   };
    //   this.houseBillOfLadingShow = true;
    //   this.$refs.HouseBillOfLading.echo(EchoForm);
    // },
    // showHouseBillOfLading(data) {
    //   if (data === "false") {
    //     this.houseBillOfLadingShow = false;
    //   } else {
    //     this.houseBillOfLadingShow = true;
    //   }
    // },
    handleBill(row) {
      this.houseId = row.id;
      let EchoForm = {
        clientId: row.houproClientResult.id,
        orderId: row.id,
        clientType: row.type,
        businessType: row.businessType,
        clientName: row.houproClientResult.clientName,
        specialStatus: row.specialStatus,
        tidan: "no"
      };
      this.HousePlaceOrderShow = true;
      this.$refs.HousePlaceOrder.echo(EchoForm);
    },
    showHousePlaceOrder(data) {
      if (data === "false") {
        this.HousePlaceOrderShow = false;
      } else {
        this.HousePlaceOrderShow = true;
      }
    },
    //新增订单
    newOrders(row) {
      this.houseOrderShow = true;
      // console.log(row.houproClientResult.id);
      let EchoForm = {
        clientId: row.houproClientResult.id,
        clientType: row.type,
        clientName: row.clientName
      };
      this.$refs.createHouseOrder.handleOrderEcho(EchoForm);
    },
    showAddOrUpdate(data) {
      if (data === "false") {
        this.houseOrderShow = false;
      } else {
        this.houseOrderShow = true;
      }
    },

    //修改
    modify(row) {
      this.companyId = row.id;
      let dateType = null;
      if (row.status == 20 && row.finalStatus == 30) {
        dateType = 20;
      } else if (row.status == 30) {
        dateType = 10;
      }
      let EchoForm = {
        clientId: row.houproClientResult.id,
        clientType: row.type,
        clientName: row.houproClientResult.clientName,
        id: row.id,
        modify: "no",
        dateType: dateType,
        tidan: "oderModify"
      };
      if (dateType == 10) {
        this.HousePlaceOrderShow = true;
        this.$refs.HousePlaceOrder.echo(EchoForm);
      } else if (dateType == 20) {
        this.balanceShow = true;
        this.$nextTick(() => {
          this.$refs.uploadCharge.clearFiles();
        });
        (this.clientId = row.houproClientResult.id),
          ModificationOfDeclaration({ id: row.id, dateType: dateType }).then(
            response => {
              this.balanceForm = response.data;
              this.voucherImgList = [];
              this.imageIds = [];
              if (this.balanceForm.houproImgfileList.length !== 0) {
                this.balanceForm.houproImgfileList.forEach(item => {
                  this.voucherImgList.push(item);
                });
                this.imageIds.push(this.balanceForm.imageIds);
              }
              // this.balanceForm.amountReceivable = response.data.endingParagraph;
            }
          );
        PaymentMethod(this.balanceForm).then(response => {
          this.PaymentMethodList = response.data;
        });
      }
    },
    // 模块下载
    downloadModule() {
      // console.info("模块下载");
      // window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
      // window.location.href = baseURL + "/common/download";
    },
    // 上传
    // 上传文件时触发
    uploadingTrigger(file, importFileList) {
      if (importFileList.length > 1) {
        importFileList.splice(0, 1);
      }
    },
    handleRemove(file, importFileList) {
      // console.log(file, importFileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, importFileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + importFileList.length} 个文件`
      );
    },
    // 删除
    beforeRemove(file, fileList) {
      // console.info("确定移除");
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传确定按钮
    submitFormUploading() {
      this.$refs.importUpdateFile.submit();
    },
    //

    handleRegionChange() {
      let value = this.form.cityCode;
      // console.log(this.form.cityCode);
      // console.log(value);
      // this.form.prov = CodeToText[value[0]];
      // this.form.city = CodeToText[value[1]];
      // this.form.county = CodeToText[value[2]];
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.showSearch = false; //筛选取消按钮
      this.resetForm("queryForm");
      this.uploadingFile = false; //导入取消按钮
    },
    // 表单重置
    reset() {
      this.form = {
        appId: this.queryParams.appId || this.$store.getters.appId || "",
        id: null,
        companyName: null,
        companyId: null,
        createBy: null,
        vatCollection: "10"
      };
      this.resetForm("form");
    },

    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      if (this.queryParams.declarationTime) {
        if (this.queryParams.declarationTime.length !== 0) {
          this.queryParams.beginTime =
            this.queryParams.declarationTime[0] + " 00:00:00";
          this.queryParams.endTime =
            this.queryParams.declarationTime[1] + " 23:59:59";
        } else {
          this.queryParams.beginTime = "";
          this.queryParams.endTime = "";
        }
      }else {
          this.queryParams.beginTime = "";
          this.queryParams.endTime = "";
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
      this.$refs.queryForm.resetFields();
      this.resetForm("queryForm");
      this.queryParams={
        pageNo: 1,
        pageSize: 10,
        createBy: null, //业务员
        companyId: null,
        appId: "",
        companyName: "",
        clientType: null,
        province: null,
        city: null,
        county: null,
        condition:'0',
      };
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    //导入
    bulkImport() {
      this.uploadingFile = true;
      // bulkImportOpportunity().then(reponse => {
      // });
    },
    /** 导出按钮操作 */
    handleExport() {
      // const queryParams = this.queryParams;
      // this.$confirm("是否确认导出所有公司银行开户信息数据项?", "警告", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(function() {
      //     window.location.href =
      //       process.env.VUE_APP_CRM_API +
      //       "/hmkj-crm/resoBusinessOpportunity/excelTemplate";
      //   })
      //   .catch(function() {});
    },

    editOrderFun(row) {
      this.orderId = row.id;
      this.orderVisible = true;
      this.hiddenTab = false;
    },
    // 客户类型字典
    houseCustomerTypeFormat(row) {
      return this.selectDictLabel(this.houseCustomerTypeList, row.type);
    },
    //图片上传成功
    uploadSuccess(response, file, fileList, type) {
      this.ImageUrlList = fileList.map(ite => {
        return ite.url;
      });
      let files = fileList
        .map(item => {
          let temp = item.response;
          if (temp && temp.code == 200) {
            return temp.data.id;
          } else {
            return undefined;
          }
        })
        .filter(item => {
          return item != undefined;
        })
        .join(",");
      if (type == 10) {
        this.form.contractImg = files;
      } else if (type == 20) {
        this.form.paymentImg = files;
      } else if (type == 30) {
        this.form.userListImg = files;
      } else if (type == 40) {
        this.balanceForm.imageIds = files;
      }
    }
  }
};
</script>

<style lang="scss">
.declarationForm {
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
  // 导入
  .uploadingFile {
    .el-dialog {
      .el-dialog__body {
        padding: 14px 50px !important;
        .el-row {
          .el-col {
            margin: 10px 0px;
            .title {
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;
              line-height: 34px;
              margin-right: 18px;
            }
          }
        }
        .dialog-footer {
          text-align: right;
          margin-top: 50px;
        }
      }
    }
  }
  .balance {
    .signingTime {
      position: relative;
      .yue {
        position: absolute;
        top: 38px;
        right: 12px;
        z-index: 99;
      }
    }
  }
  .btn {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
    .el-button {
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  //筛选
  .search-popover {
    .el-form-item__label {
      width: 128px !important;
    }
    .el-input__inner {
      width: 222px;
    }
    .clientsLv {
      .el-input__inner {
        width: 100% !important;
      }
      .el-form-item__content {
        width: 100%;
      }
    }
  }
  //新增客户
  .addClients {
    .el-dialog {
      height: 662px;
      .el-dialog__footer {
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
    }
  }
  .newFather {
    position: relative;
  }
  .new {
    position: absolute;
    top: -1px;
    right: 5px;
    color: #ffffff;
  }
  .imgStyle {
    display: flex;
    flex-direction: row;
    .el-image > img {
      width: 70px;
      height: 50px;
      margin-right: 10px;
    }
  }
  // 审核
  .toExamine {
    // .el-dialog .el-dialog__body {
    //   height: 284px;
    //   overflow: auto;
    // }
    .auditDetailsForm {
      margin: 0px !important;
    }
    // .el-dialog .el-dialog__footer {
    //   padding: 15px 24px;
    // }
  }
  .yellow {
    color: #f3a35f;
  }
  .gray {
    color: #909399;
  }
}
</style>
