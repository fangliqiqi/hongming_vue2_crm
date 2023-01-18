<template>
  <div class="app-container billOfLading">
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
                <!--                <el-button type="success" size="small" @click="cancel">取消</el-button>-->
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
      <el-tabs v-model="queryParams.clientType" @tab-click="handleClick">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <el-tab-pane label="欠费订单" value="10" name="10"></el-tab-pane>
        <!-- <el-tab-pane
          v-for="item in clientType"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
        ></el-tab-pane> -->
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
    <!-- 全部客户 -->
    <div class="table-data" v-show="queryParams.clientType != 10">
      <el-table
        class="slither"
        v-loading="loading"
        :data="companyList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="提单编号"
          align="left"
          prop="orderNo"
          width="220"
        >
          <!-- <template slot-scope="scope">
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
          </template> -->
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
          label="提单用户名"
          align="left"
          prop="name"
          width=" 130"
        >
          <template slot-scope="scope">
            <div
              type="text"
              style="display:flex;align-items:center;line-height: 16px;"
            >
              <img
                src="@/assets/image/user.png"
                alt=""
                style="width:18px;height: 18px; margin-right:4px;"
              />
              <span style="color:#3978E7;"> {{ scope.row.name[0] }}</span>

              <img
                src="@/assets/image/more.png"
                alt=""
                v-if="scope.row.name.length > 1"
                style="width:18px;height: 18px; margin-left:4px;cursor:pointer;"
                @click="handeleUserName(scope.row.name)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="提单套餐数"
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
        >
          <!-- <template slot-scope="scope">
                      <span>
                        {{ parseTime(scope.row.customsTime, "{y}-{m}-{d}") }} 
                      
                      </span>
                    </template> -->
        </el-table-column>
        <el-table-column
          label="报单审核"
          align="left"
          width="150"
          prop="ladingAudit"
        >
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.ladingAudit == 10"
              >待审核</el-tag
            >
            <el-tag v-if="scope.row.ladingAudit == 20">通过</el-tag>
            <el-tag type="danger" v-if="scope.row.ladingAudit == 30"
              >未通过</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          label="提单状态"
          align="left"
          prop="reportAudit"
          width="150"
        >
          <template slot-scope="scope">
            <el-tag
              type="warning"
              v-if="scope.row.reportAudit == 10 || scope.row.reportAudit == ''"
              >提单中</el-tag
            >
            <el-tag v-if="scope.row.reportAudit == 20">提单成功</el-tag>
            <el-tag type="danger" v-if="scope.row.reportAudit == 30"
              >提单失败</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="color:#EF5465"
              @click="modify(scope.row)"
              v-if="
                roles.indexOf('salesmanEstate') !== -1 &&
                  scope.row.reportAudit == 30
              "
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              style="color:#F3A35F"
              @click="tidan(scope.row)"
              v-if="
                roles.indexOf('submitReceiptsStaff') !== -1 &&
                  (scope.row.reportAudit == '10' || scope.row.reportAudit == '')
              "
              >提单</el-button
            >
            <!-- <el-button
              size="mini"
              type="text"
              style="color:#EF5465"
              @click="handleReject"
              v-if="roles.indexOf('submitReceiptsStaff') !== -1"
              >驳回</el-button
            > -->
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
    <!-- 欠费订单 -->
    <div class="table-data" v-show="queryParams.clientType == 10">
      <el-table
        class="slither"
        v-loading="loading"
        :data="ArrearsList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="订单号" align="left" prop="orderNo" width="220">
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
        />

        <el-table-column
          label="联系方式"
          align="left"
          prop="phone"
          width="150"
        />
        <el-table-column
          label="所属区域"
          align="left"
          prop="region"
          width="150"
        />
        <el-table-column
          label="欠费金额"
          align="left"
          prop="amountReceivable"
          width="150"
        />
        <el-table-column
          label="套餐名称"
          align="left"
          prop="packageName"
          width="150"
        />

        <el-table-column
          label="内账审核"
          align="left"
          width="150"
          prop="status"
        >
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status == 10">待审核</el-tag>
            <el-tag v-if="scope.row.status == 20">通过</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 30">未通过</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleBalance(scope.row)"
              >收费</el-button
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

    <!-- 驳回 -->
    <el-dialog title="驳回" :visible.sync="stopShow" width="30%">
      <el-form>
        <el-form-item prop="remark" label="驳回原因" :inline="true">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="5"
            placeholder="请输入驳回原因"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提单用户名 -->
    <el-dialog
      title="提单用户名"
      open
      :visible.sync="userNameShow"
      width="704px"
      class="userNameShow"
    >
      <el-row>
        <el-col
          class="user"
          :span="8"
          v-for="(item, val) in userNameList"
          :key="val"
        >
          <img src="@/assets/image/user.png" alt="" class="img" />
          <span style="margin-left:31px">{{ item }}</span>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 收费 -->
    <el-dialog width="516px" title="收费" :visible.sync="balanceShow">
      <div class="balance">
        <el-form v-model="balanceForm">
          <el-row :gutter="20">
            <el-col :span="12" class="signingTime">
              <el-form-item label="预收金额">
                <span class="yue">元</span>
                <el-input
                  v-model="balanceForm.amountReceivable"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付时间">
                <el-date-picker
                  v-model="balanceForm.receiptTime"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款方式">
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
              <el-form-item label="付款账户">
                <el-input
                  placeholder="请输入付款账户"
                  v-model="balanceForm.account"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="收费备注" class="applicant">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4 }"
                  v-model="balanceForm.remarks"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上传附件">
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
          </el-row>
        </el-form>
      </div>
      <div class="btn">
        <el-button @click="balanceShow = false">取 消</el-button>
        <el-button type="primary" @click="handleCharge">确认收费</el-button>
      </div>
    </el-dialog>
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
    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index:2033;"
      v-if="dialogVisible"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
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
    <house-bill-of-lading
      ref="HouseBillOfLading"
      @changeShow="showHouseBillOfLading"
      :houseBillOfLadingShow="houseBillOfLadingShow"
    ></house-bill-of-lading>
  </div>
</template>

<script>

import {
  BalancePaymentEcho,
  SubmitBalancePayment,
  PaymentMethod
} from "../../../../api/crm/HouseBillOfLading/HouseBillOfLading";
import { mapGetters } from "vuex";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import EditOrder from "@/views/components/EditOrder";
import { throttle } from "@/utils/hmt";
import { getMapIndustry } from "@/api/crm/index"; //行业分类
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
  billOfList,
  overdueOrders
} from "../../../../api/crm/houseProperty/billOfLading";
import HouseDrawer from "@/views/components/HouseDrawer/index";
import CreateHouseOrder from "@/views/components/CreateHouseOrder/index";
import HouseBillOfLading from "@/views/components/HouseBillOfLading/index";
import { mapState } from "vuex";
export default {
  components: {
    HouseDrawer,
    EditOrder,
    CreateHouseOrder,
    HouseBillOfLading
  },
  name: "billOfLading",
  data() {
    return {
      uploadUrl:
        process.env.VUE_APP_BASE_API + "/hmkj-crm/houproImgfile/upload",
      importFileUrl:
        process.env.VUE_APP_CRM_API +
        "/hmkj-crm/resoBusinessOpportunity/bulkImport",
      roles: [],
      dialogVisible: false, //图片放大
      dialogImageUrl: "", //图片放大地址
      clientId: null,
      uploadingFile: false, //上传
      houseId: null,
      //驳回
      stopShow: false,
      //提单用户名弹窗
      userNameShow: false,
      //提单用户名
      userNameList: [],
          clientLv: null, //客户等级
      clientType: [], //客户类型字典
      houseCustomerTypeList: [], //客户类型
      industryMap: [], //行业分类
       enterpriseMessageList: {}, //企业信息
      marketTaxInforResultList: {}, //企业信息-税务信息
      bankResultList: {}, //银行
      personnelResultsList: [], //股东

      headers: { Authorization: _getSessionStore(tokenKey) },
      // 遮罩层
      loading: true,
      //客户创建时间
      PaymentTime: null,
      // 选中数组
      ids: [],
      //收费表单
      balanceForm: {},
      //收费弹出框
      balanceShow: false,
      //尾款支付方式
      PaymentMethodList: [],
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
      //欠费订单数据
      ArrearsList: [],
      // 弹出层标题
      title: "",
      //创建订单
      houseOrderShow: false,
      //提单
      houseBillOfLadingShow: false,
      // 是否显示弹出层
      open: false,
      // 是否抽屉弹出层
      orderShow: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        clientType:'0',
        clientLv: null,
        district: null, //所在地区
        createBy: null, //业务员
        companyId: null,
        remarks: null,
        appId: "",
        companyName: "",
        province: null,
        city: null,
        county: null
      },
      // 表单参数
      form: {},
      settings: [{ icon: "el-icon-delete", lable: "删除", value: "1" }],
      load: false,
      companyId: null,
      // 上传
      fileList: [],
      importFileList: [] //导入数据
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    // view: {
    //     get() {
    //       if (this.visible) {
    //         this.getData()
    //       }
    //     }
    // }
    ...mapState({
      userInfo: state => state.user
    })
  },
  watch: {
    orderShow: function(val, oldVal) {
      if (!val) {
        this.getList();
      }
    }
  },
  created() {
    this.roles = this.userInfo.roleCodes;
    //客户类型
    this.getDicts("house_customer_type").then(res => {
      this.houseCustomerTypeList = res.data;
    });
    //客户类型
    this.getDicts("opportunity_type").then(res => {
      this.clientType = res.data;
    });
    this.getList();
    this.queryParams.appId = this.$store.getters.appId + "";
    getMapIndustry().then(res => {
      this.industryMap = res.data;
    }); //行业分类
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
    //tabs切换
    handleClick(tab, event) {
      if (tab.name == "") {
        this.getList();
      } else if (tab.name == "10") {
        this.getList();
      }
    },
    /** 查询客户信息列表 */
    getList() {
      this.loading = true;
      let queryParams = this.queryParams;
      queryParams.district =
        queryParams.district &&
        queryParams.district.length > 0 &&
        queryParams.district[0]
          ? queryParams.district
          : null;
      let data = JSON.parse(JSON.stringify(queryParams));
      data.clientType = data.clientType != "10" ? "" : data.clientType;

      if (data.clientType == 10) {
        overdueOrders(data).then(response => {
          this.ArrearsList = response.data.rows;
          this.total = response.data.totalRows;
          this.loading = false;
        });
      } else {
        billOfList(data).then(response => {
          this.companyList = response.data.rows || [];
          this.total = response.data.totalRows;
          this.loading = false;
          this.companyList.forEach(item => {
            item.name = item.name.split(",");
          });
        });
      }
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
      row.createDate = row.createDate.substr(0, 10);
      return this.PaymentTime.substr(0, 4) - row.createDate.substr(0, 4) == 0
        ? this.PaymentTime.substr(5, 2) - row.createDate.substr(5, 2) == 0
          ? this.PaymentTime.substr(8, 2) - row.createDate.substr(8, 2) <= 3 &&
            this.PaymentTime.substr(8, 2) - row.createDate.substr(8, 2) >= 0
            ? true
            : false
          : false
        : false;
    },

    //驳回
    handleReject() {
      this.stopShow = true;
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    closeViewer() {
      this.dialogVisible = false;
    },
    //收费
    handleBalance(row) {
      this.balanceShow = true;
      this.clientId = row.clientId;
      BalancePaymentEcho({ id: row.id }).then(response => {
        this.balanceForm.amountReceivable = response.data;
      });
      PaymentMethod(this.balanceForm).then(response => {
        this.PaymentMethodList = response.data;
      });
    },
    //确认收费
    handleCharge: throttle(function() {
      this.balanceForm.houproOrderDeclareParam = this.form;
      SubmitBalancePayment(this.balanceForm).then(response => {
        this.balanceShow = false;
      });
    }),
    //创建订单
    showAddOrUpdate(data) {
      if (data === "false") {
        this.houseOrderShow = false;
      } else {
        this.houseOrderShow = true;
      }
    },
    //修改
    modify(row) {
      this.houseId = row.id;
      this.houseBillOfLadingShow = true;
      let EchoForm = {
        id: row.id,
        clientId: row.houproClientResult.id,
        clientName: row.houproClientResult.clientName,
        clientType: row.clientType,
        tidan: "modify"
      };
      this.$refs.HouseBillOfLading.echo(EchoForm);
    },

    //提单
    tidan(row) {
      this.houseId = row.id;
      this.houseBillOfLadingShow = true;
      let EchoForm = {
        id: row.id,
        tidan: "yes"
      };
      this.$refs.HouseBillOfLading.echo(EchoForm);
    },
    //提单
    showHouseBillOfLading(data) {
      if (data === "false") {
        this.houseBillOfLadingShow = false;
      } else {
        this.houseBillOfLadingShow = true;
      }
    },
    //提单用户名
    handeleUserName(row) {
      this.userNameList = row;
      this.userNameShow = true;
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
    //图片上传成功
    uploadSuccess(response, file, fileList, type) {
      this.ImageUrlList = fileList.map(ite => {
        return ite.url;
      });
      this.balanceForm.imageIds = fileList
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

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.stopShow = false; //驳回
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
        client: null, //编号
        companyType: null,
        enterpriseNumber: null, //企业税号
        companyId: null,
        createBy: null,
        remarks: null,
        clientLv: "10",
        vatCollection: "10",
        district: null,
        industryName: null, //行业分类
        clienteleName: null,
        clientSource: null,
        companies: "20",
        userlabelIds: []
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
        }else{
          this.queryParams.beginTime = '';
          this.queryParams.endTime = '';
        }
      }else{
          this.queryParams.beginTime = '';
          this.queryParams.endTime = '';
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
        clientType:'0',
        clientLv: null,
        district: null, //所在地区
        createBy: null, //业务员
        companyId: null,
        remarks: null,
        appId: "",
        companyName: "",
        province: null,
        city: null,
        county: null
      };
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    handleRegionChange(value, type = 20) {
      if (type == 10) {
        this.queryParams.district = value;
        this.queryParams.province = CodeToText[value[0]];
        this.queryParams.city = CodeToText[value[1]];
        this.queryParams.county = CodeToText[value[2]];
      } else {
        this.form.district = value;
        this.form.province = CodeToText[value[0]];
        this.form.city = CodeToText[value[1]];
        this.form.county = CodeToText[value[2]];
      }
    },

    //导入
    bulkImport() {
      this.uploadingFile = true;
      // bulkImportOpportunity().then(reponse => {
      // });
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
          window.location.href =
            process.env.VUE_APP_CRM_API +
            "/hmkj-crm/resoBusinessOpportunity/excelTemplate";
        })
        .catch(function() {});
    },
       // 客户类型字典
    houseCustomerTypeFormat(row) {
      return this.selectDictLabel(this.houseCustomerTypeList, row.clientType);
    },
    editOrderFun(row) {
      this.orderId = row.id;
      this.orderVisible = true;
      this.hiddenTab = false;
    }
  }
};
</script>

<style lang="scss">
.billOfLading {
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
  //提单用户名
  .userNameShow {
    .el-dialog {
      height: 662px;
      .el-dialog__body {
        padding: 0px 68px;
      }
      .user {
        border-bottom: 1px solid #e6e7eb;
        height: 78px;
        font-size: 18px;
        font-weight: 400;
        color: #565759;
        line-height: 78px;
        position: relative;
        .img {
          width: 24px;
          height: 24px;
          margin-right: 7px;
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
        }
      }
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
}
</style>
