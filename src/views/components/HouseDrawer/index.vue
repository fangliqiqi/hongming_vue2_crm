<template>
  <!-- 查看创建订单 -->
  <div class="drawer-vi">
    <drawer
      :visible.sync="orderShow"
      :title="titleName"
      :settings="settings"
      :command="command"
    >
      <div class="agent_vi">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="足迹" name="first">
            <div
              class="footprint_list"
              style="overflow: auto; padding: 32px 32px 0 33px"
            >
              <ul
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
              >
                <li v-for="item in footprintList" class="list-item">
                  <span class="time wns">{{
                    parseTime(item.operTime, "{y}-{m}-{d} {h}:{i}")
                  }}</span>
                  <span class="name wns">{{ item.operName }}</span>
                  <span class="text">{{ item.title }}</span>
                </li>
              </ul>
              <p v-if="loading">加载中...</p>
              <!-- <p v-if="total">没有更多了</p> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="客户信息" name="second">
            <div class="businiss_info">
              <div class="relation_company">
                <img src="@/assets/image/logo.png" />
                <div>
                  <el-input
                    class="name"
                    v-model="form.companyName"
                    placeholder="请填写姓名"
                    :readonly="readonly"
                    @change="updateForm({ companyName: $event }, item)"
                  ></el-input>
                  <!--                  <span>{{form.companyName}}</span>-->
                  <el-button type="primary" size="small" plain
                    >关联企业1家
                  </el-button>
                </div>
              </div>
              <el-form
                label-position="top"
                size="small"
                :inline="true"
                :model="form"
              >
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="客户名称">
                      <el-input
                        :readonly="true"
                        class="mw222"
                        size="small"
                        v-model="form.client"
                        @change="updateForm({ client: $event })"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="手机号码">
                      <el-input
                        placeholder="请输入您的手机号码"
                        class="mw222"
                        size="small"
                        :readonly="readonly"
                        v-model="form.enterpriseNumber"
                        @change="updateForm({ enterpriseNumber: $event })"
                      ></el-input>
                    </el-form-item>
                    <!-- <el-form-item
                      label="企业税号"
                      v-model="form.enterpriseNumber"
                    >
                      <el-input class="mw222" size="small"></el-input>
                    </el-form-item> -->
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="微信号">
                      <el-input
                        placeholder="请输入您的微信号"
                        class="mw222"
                        size="small"
                        v-model="form.createBy"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="所属公司">
                      <el-input
                        class="mw222"
                        size="small"
                        :readonly="readonly"
                        v-model="form.vatCollection"
                        @change="updateForm({ vatCollection: $event })"
                        :maxlength="11"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="所在地区">
                      <el-cascader
                        placeholder="请选择信息所在地区"
                        class="mw222"
                        size="small"
                        :disabled="readonly"
                        :options="areaOptions"
                        v-model="form.district"
                        @change="handleAreaChange"
                      >
                      </el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户标签">
                      <el-input
                        placeholder="请输入联系人"
                        class="mw222"
                        size="small"
                        :readonly="readonly"
                        v-model="form.linkman"
                        @change="
                          updateForm({
                            linkman: $event,
                            linkmanId: form.linkmanId,
                          })
                        "
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="安居客账号">
                      <el-input
                        class="mw222"
                        size="small"
                        :readonly="readonly"
                        v-model="form.linkmanPhone"
                        @change="
                          updateForm({
                            linkmanPhone: $event,
                            linkmanId: form.linkmanId,
                          })
                        "
                        :maxlength="11"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="58用户名">
                      <el-input
                        class="mw222"
                        size="small"
                        :readonly="readonly"
                        v-model="form.industryName"
                        @change="updateForm({ industryName: $event })"
                        :maxlength="11"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="销售顾问">
                      <el-input
                        class="mw222"
                        size="small"
                        :readonly="readonly"
                        v-model="form.clientType"
                        @change="updateForm({ clientType: $event })"
                        :maxlength="11"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="销售岗位">
                      <el-input
                        class="mw222"
                        size="small"
                        :readonly="true"
                        :value="
                          selectDictLabel(customerStatusList, form.delSwitch)
                        "
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="12">
                    <el-form-item label="业务描述">
                      <el-input type="textarea" v-model="form.categoryText" class="mw222" size="small" :readonly="readonly"
                                @change="updateForm({'categoryText':$event})"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="详细地址">
                      <el-input
                        type="textarea"
                        v-model="form.address"
                        class="mw222" :readonly="readonly"
                        size="small"
                        @change="updateForm({ address: $event })"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户等级">
                      <el-select
                        class="mw222"
                        size="small" :disabled="readonly"
                        v-model="form.clientLv"
                        placeholder="请选择客户等级"
                        @change="updateForm({ clientLv: $event })"
                      >
                        <el-option
                          v-for="item in clientLvList"
                          :label="item.dictName"
                          :value="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="意向度">
                      <el-select
                        class="mw222"
                        size="small" :disabled="readonly"
                        v-model="form.opinion"
                        placeholder="请选择意向度"
                        @change="updateForm({ opinion: $event })"
                      >
                        <el-option
                          v-for="item in opinionList"
                          :label="item.dictName"
                          :value="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户来源">
                      <el-select
                        class="mw222"
                        size="small" :disabled="readonly"
                        v-model="form.clientSource"
                        placeholder="请选择客户来源"
                        @change="updateForm({ clientSource: $event })"
                      >
                        <el-option
                          v-for="item in clientSourceList"
                          :label="item.dictName"
                          :value="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户标签">
                      <div class="tag-vi mw222">
                        <el-tag
                          :key="tag"
                          v-for="tag in form.userlabelIds"
                          closable
                          :disable-transitions="false"
                          @close="handleCloseCallback(tag)"
                        >
                          {{ tag }}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="small" :readonly="readonly"
                          @keyup.enter.native="handleInputCallback"
                          @blur="handleInputCallback"
                        >
                        </el-input>
                        <el-button
                          v-else
                          class="button-new-tag"
                          size="small" v-show="!readonly"
                          @click="showInput"
                          icon="el-icon-plus"
                          >添加标签
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-col> -->
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>

          <el-tab-pane
            :label="'订单(' + (orderList.length || 0) + ')'"
            name="indent"
          >
            <div style="padding: 32px 32px 0 33px" class="indent bgfff">
              <el-button
                class="add-button mw100"
                size="small"
                :disabled="readonly"
                icon="el-icon-plus"
                @click="newOrders()"
                >新增订单</el-button
              >
              <div class="mt20 table-data">
                <el-table class="slither" v-loading="loading" :data="orderList">
                  <el-table-column
                    label="订单编号"
                    align="center"
                    prop="orderNo"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <el-button
                        @click="editOrderFun(scope.row)"
                        type="text"
                        :disabled="readonly"
                        >{{ scope.row.orderNo }}</el-button
                      >
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="客户名称"
                    align="center"
                    :formatter="auditorStateFormat"
                  />
                  <el-table-column
                    label="所属公司"
                    align="center"
                    :formatter="auditorStateFormat"
                  />
                  <el-table-column
                    label="报单日期"
                    align="center"
                    prop="createDate"
                  />

                  <el-table-column
                    label="订单金额"
                    align="center"
                    prop="totalMoney"
                  />
                  <el-table-column
                    label="签单人"
                    align="center"
                    prop="createBy"
                  />
                  <el-table-column
                    label="操作"
                    align="center"
                    class-name="table-control"
                    fixed="right"
                    width="90px"
                  >
                    <template slot="header">
                      <i class="el-icon-edit-outline"></i>
                    </template>
                    <template>
                      <el-button
                        size="mini"
                        type="primary"
                        v-hasPermi="['share:bank:edit']"
                        >尾款收费</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="'合同(' + (contractList.length || 0) + ')'"
            name="contract"
          >
            <div class="contract_vi">
              <!-- <el-row>
                <el-col :span="24">
                  <el-button
                    class="add-button"
                    size="small"
                    icon="el-icon-plus"
                    @click="newContract"
                    >新增合同</el-button>
                </el-col>
              </el-row> -->
              <!-- 合同列表渲染 -->
              <!-- getContractList -->
              <div class="contract_list">
                <div
                  class="child"
                  v-for="(item, index) in contractList"
                  :key="index"
                >
                  <div class="title">
                    <div class="link"></div>
                    <div class="font">
                      {{ "合同编号:" + item.controlNo }}
                    </div>
                    <el-button
                      type="warning"
                      @click.native="renew(item)"
                      size="mini"
                      plain
                      v-if="!(item.accountType == 10)"
                      :disabled="item.renewType == 10 || readonly"
                      >续费
                    </el-button>
                  </div>
                  <el-row class="kind">
                    <el-col :span="10">
                      <div class="name">
                        <span
                          >签单人:<span class="span">{{
                            item.createBy
                          }}</span></span
                        >
                        <span
                          >签约日期:<span class="span">{{
                            parseTime(item.signingDate, "{y}-{m}-{d}")
                          }}</span></span
                        >
                        <span
                          >合同有效期:<span class="span"
                            >{{ parseTime(item.startTime, "{y}-{m}-{d}") }}至{{
                              parseTime(item.endTime, "{y}-{m}-{d}")
                            }}
                          </span>
                        </span>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="name">
                        <span
                          >服务项目:<span class="span">{{
                            item.serpriceName
                          }}</span></span
                        >
                        <span
                          >合同金额:<span class="color span"
                            >￥{{ item.money }}</span
                          ></span
                        >
                        <span
                          >收费周期:<span class="span">{{
                            item.cycleType == 10
                              ? "按月收费"
                              : item.cycleType == 20
                              ? "按季度收费"
                              : item.cycleType == 30
                              ? "按半年收费"
                              : item.cycleType == 40
                              ? "按年收费"
                              : ""
                          }}</span></span
                        >
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="name">
                        <span>合同照片</span>

                        <span
                          v-for="val in item.marketCompbusiImgfileResults"
                          :key="val.id"
                        >
                          <el-image
                            :src="val.url"
                            :preview-src-list="
                              item.marketCompbusiImgfileResults.map((ite) => {
                                return ite.url;
                              })
                            "
                          >
                          </el-image>
                        </span>

                        <span></span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </drawer>
    <!-- 订单七项 -->
    <edit-order
      :visible.sync="orderVisible"
      :orderId="orderId"
      :hidden-tab="hiddenTab"
      :readonly="readonly"
    ></edit-order>

    <create-house-order
      ref="createHouseOrder"
      :companyId="companyId"
      @changeShow="showAddOrUpdate"
      :houseOrderShow="houseOrderShow"
    ></create-house-order>

    <new-order
      :company="companyInfo"
      :visible.sync="newOrderVisible"
      :companyId="companyId"
      @editOrder="editOrderFun"
    ></new-order>
    <!-- 续费 -->
    <renew-contract
      :visible.sync="renewals"
      :renewForm="renewForm"
    ></renew-contract>

    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index: 2033"
      v-if="dialogVisibles"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import CreateHouseOrder from "@/views/components/CreateHouseOrder/index";
import {
  delClient,
  getClient,
  addContact,
  delContact, //删除联系人/
  updateContact,
  getContactsList, //联系人
  getContracRecordtList, //合同列表
  addContract, //新增合同
  alterClient, //修改客户信息
  addFollowRecord, //新增跟进记录
  getFollowRecordList, //根据id回显跟进记录
  getOpportunityFootprintList,
  entrepreneurMessageLiaison, //企业信息
} from "@/api/crm/customer/customer";
import { listOrder } from "@/api/crm/order";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import EditOrder from "@/views/components/EditOrder";
import NewOrder from "@/views/components/NewOrder";
import EditCompany from "@/views/components/EditCompany";
import RenewContract from "@/views/components/RenewContract";
import { getMapIndustry } from "@/api/crm/index"; //行业分类
import { contractProjectRenewalDetails } from "../../../api/crm/customerService/agentAccount";

export default {
  components: {
    EditOrder,
    EditCompany,
    NewOrder,
    RenewContract,
    ElImageViewer,
    CreateHouseOrder,
  },
  name: "EditDrawer",
  props: {
    readonly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    companyId: {
      type: [Number, String],
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: [Array, Object],
      default() {
        return [];
      },
    },
  },
  watch: {
    orderVisible(val) {
      if (!val) {
        this.getOrderList(this.companyId);
      }
    },
  },
  computed: {
    titleName() {
      return "客户资料";
    },
    orderShow: {
      get() {
        if (this.visible) {
          this.activeName = "second";
          this.stepIndex = 0;
          this.reset();
          this.getData();
        }
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  data() {
    return {
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisibles: false,
      // 遮罩层
      load: false,
      loading: false,
      renewals: false,
      title: "",
      headers: { Authorization: _getSessionStore(tokenKey) },
      filePath: process.env.VUE_APP_FILE_API,
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload",
      vatTypeList: [],
      areaOptions: [],
      industryNameList: [],
      opinionList: [],
      clientSourceList: [],
      inputVisible: false,
      inputValue: "",
      renewForm: {},
      areaOptions: regionData, //区域数据
      clientLvList: [], //客户等级字典
      industryMap: [], //行业分类数据
      enterpriseMessage: {}, //企业信息
      //查看订单显示
      orderVisible: false,
      orderId: "",
      hiddenTab: true,
      companyInfo: {},
      // 表单参数
      form: {},
      //跟进记录表单参数
      followForm: {},
      //合同参数
      contractForm: {},
      // 表单校验
      contactsList: [],
      //内账审核状态
      auditorState: [],
      companyList: [],
      followList: [], //足迹
      footprintList: [],
      chargePeriodList: [],
      addFollowShow: false,
      newOrderVisible: false,
      //创建订单
      houseOrderShow: false,
      customerRatingList: [], //客户等级字典
      followTypeList: [], //跟进方式字典
      proTypeName: "",
      fileList: [],
      orderList: [],
      customerStatusList: [],
      stepIndex: 0,
      activeName: "first",
      contractList: [],
      // 表单校验
      rules: {
        clienteleName: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur",
          },
        ],
        companyName: [
          {
            required: true,
            message: "客户名称不能为空",
            trigger: "blur",
          },
        ],
        clientType: [
          {
            required: true,
            message: "客户类型不能为空",
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: "所在地不能为空",
            trigger: "blur",
          },
        ],
        bankAddress: [
          {
            required: true,
            message: "开卡行地址不能为空",
            trigger: "blur",
          },
        ],
        bankName: [
          {
            required: true,
            message: "开户行不能为空",
            trigger: "blur",
          },
        ],
        companyId: [
          {
            required: true,
            message: "公司Id不能为空",
            trigger: "blur",
          },
        ],
        clientSource: [
          {
            required: true,
            message: "商机来源不能为空",
            trigger: "blur",
          },
        ],

        industryName: [
          {
            required: true,
            message: "行业分类不能为空",
            trigger: "blur",
          },
        ],
      },
      followRules: {
        nextContent: [
          {
            required: true,
            message: "下次跟进内容不能为空",
            trigger: "blur",
          },
        ],
        nextFollowTime: [
          {
            required: true,
            message: "下次跟进日期不能为空",
            trigger: "blur",
          },
        ],
        tempTime: [
          {
            required: true,
            message: "请输入具体的时刻",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择跟进方式",
            trigger: "blur",
          },
        ],
      },
      clientType: [], //客户类型字典
      orderTypeList: [],
    };
  },
  methods: {
    closeViewer() {
      this.dialogVisibles = false;
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibles = true;
    },
    getData() {
      //客户等级
      this.getDicts("customer_rating").then((res) => {
        this.clientLvList = res.data;
      });
      //客户来源
      this.getDicts("business_from").then((res) => {
        this.clientSourceList = res.data;
      });
      // 客户状态
      this.getDicts("customer_status").then((res) => {
        this.customerStatusList = res.data;
      });
      //内账审核状态
      this.getDicts("auditor_state").then((res) => {
        this.auditorState = res.data;
      });
      //客户等级
      this.getDicts("customer_rating").then((res) => {
        this.customerRatingList = res.data;
      });
      //跟进方式
      this.getDicts("follow_type").then((res) => {
        this.followTypeList = res.data;
      });
      // 收费周期
      this.getDicts("fees_cycle").then((res) => {
        this.chargePeriodList = res.data;
      });
      this.getDicts("sys_normal_disable").then((response) => {
        this.statusOptions = response.data;
      });
      this.getDicts("order_state").then((res) => {
        this.orderTypeList = res.data;
      });
      //纳税性质
      this.getDicts("vat_type").then((res) => {
        this.vatTypeList = res.data;
      });
      //意向度
      this.getDicts("source_type_lv").then((res) => {
        this.opinionList = res.data;
      });
      //客户类型
      this.getDicts("opportunity_type").then((res) => {
        this.clientType = res.data;
      });
      this.getDetail(this.companyId);
      this.getContacts(this.companyId); //获取联系人
      this.getOrderList(this.companyId);
      this.getContractList(this.companyId); //合同
      this.entrepreneurMessageList(this.companyId); //企业信息
    },
    // 表单重置
    reset() {
      this.form = {
        appId: this.$store.getters.appId || "",
        id: null,
        companyName: null,
        client: null, //编号
        companyType: null,
        enterpriseNumber: null, //企业税号
        companyId: null,
        bankName: null,
        bankAccountNumber: null,
        bankAddress: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        taxType: "10",
        district: null,
        clientLv: "10",
        clienteleName: null,
        clientSource: null,
        industryName: null,
        companies: "是",
        userlabelIds: [],
      };
      this.resetForm("form");
    },
    followReset() {
      this.followForm = {
        imageIds: null, //上传附件
        nextContent: null,
        nextDate: null,
        tempTime: null,
        nextFollowTime: null,
        companyId: null, //添加跟进记录id
        theContent: null, //本次跟进记录
        type: null,
      };
      this.$refs.upload.clearFiles();
      this.resetForm("followForm");
    },
    command: function (command) {
      //删除客户
      if (command == "1") {
        const ids = this.form.id;
        this.$confirm("是否确认此删除客户信息?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(function () {
            return delClient({ id: ids });
          })
          .then(() => {
            this.orderShow = false;
            this.msgSuccess("删除成功");
          })
          .catch(function () {});
      } else if (command == "2") {
        this.dialogVisible = true;
        //移交商机
      } else if (command == "3") {
        //释放商机
        const ids = this.form.id;
        this.$confirm("是否确定释放该条商机？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(function () {
            return toMareLiberum({ id: ids });
          })
          .then(() => {
            this.getList();
            this.orderShow = false;
            this.msgSuccess("释放成功");
          })
          .catch(function () {});
      }
    },
    // 足迹列表
    getFootprintList(id) {
      getOpportunityFootprintList(id).then((response) => {
        this.footprintList = response.data;
      });
    },
    //跟进记录
    getFollowList(id) {
      getFollowRecordList({ id: id, classify: 20 }).then((response) => {
        this.followList = response.data;
      });
    },
    //联系人
    getContacts(id) {
      getContactsList({ id: id }).then((response) => {
        this.contactsList = response.data;
      });
    },
    // 合同列表
    getContractList(id) {
      getContracRecordtList({ id: id }).then((response) => {
        this.contractList = response.data;
      });
    },
    getOrderList(id) {
      listOrder({ id: id }).then((res) => {
        this.orderList = res.data || [] || "";
      });
    },
    getDetail(id, cb) {
      getClient({ id: id }).then((response) => {
        let data = response.data;
        if (data) {
          try {
            data.userlabelIds = data.userlabelIds
              ? JSON.parse(data.userlabelIds)
              : [];
            data.industryName = data.industryName
              ? JSON.parse(data.industryName)
              : [];
            if (data.district) {
              data.district = JSON.parse(data.district);
            } else {
              let arr = [];
              try {
                arr.push(TextToCode[data.province].code);
                arr.push(TextToCode[data.province][data.city].code);
                arr.push(
                  TextToCode[data.province][data.city][data.county].code
                );
              } catch (e) {
                // console.info(e);
              }
              data.district = arr;
            }
          } catch (e) {
            // console.info(e);
          }
          this.form = data;
          if (typeof cb == "function") {
            cb(response);
          }
        }
        getMapIndustry().then((response) => {
          this.industryMap = response.data;
        });
      });
    },
    handleClick(tab) {
      let companyId = this.companyId;
      if (tab.name == "first") {
        this.getFootprintList(companyId); //获取足迹
      } else if (tab.name == "second") {
        this.getDetail(companyId); //客户信息
      } else if (tab.name == "third") {
        this.getFollowList(companyId); //获取跟进记录
      } else if (tab.name == "fourth") {
        this.getContacts(companyId); //获取联系人
      } else if (tab.name == "indent") {
        this.getOrderList(companyId);
      } else if (tab.name == "contract") {
        this.getContractList(companyId); //合同
      } else if (tab.name == "fiveth") {
        this.entrepreneurMessageList(companyId); //企业信息
      }
    },
    addContactFun() {
      let item = {
        email: "",
        id: null,
        name: "",
        opportunityId: this.form.id,
        phone: "",
        positionName: "",
        qq: "",
        remark: "",
        tel: "",
        vx: "",
      };
      this.contactsList.push(item);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //地区
    handleAreaChange(value) {
      this.form.district = value;
      let data = {
        district: value,
        province: CodeToText[value[0]],
        city: CodeToText[value[1]],
        county: CodeToText[value[2]],
      };
      this.form.province = data.province;
      this.form.city = data.city;
      this.form.county = data.county;
      this.updateForm(data);
    },
    //修改
    updateForm(data) {
      // console.info(arguments)
      // console.info(this.form.district)
      // console.info(this.form)
      // console.info(data)
      data.id = this.form.id;
      alterClient(data).then((response) => {
        // console.info(response)
        if (response.code === 200) {
        }
      });
    },
    // 新增跟进记录按钮
    addFollow() {
      this.followReset();
      this.addFollowShow = !this.addFollowShow;
    },
    /** 新增跟进记录提交按钮 */
    followFormSubmit() {
      // console.info(this.$refs.validate)
      this.$refs["followForm"].validate((valid) => {
        if (valid) {
          (this.followForm.classify = 20),
            (this.followForm.companyId = this.form.id); //添加跟进记录id
          this.followForm.nextDate =
            this.followForm.nextFollowTime + " " + this.followForm.tempTime;
          addFollowRecord(this.followForm).then((response) => {
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
      this.$refs["contractForm"].validate((valid) => {
        if (valid) {
          this.contractForm.companyId = this.form.id; //添加合同记录id
          addContract(this.contractForm).then((response) => {
            if (response.code === 200) {
              this.msgSuccess("新增合同成功");
              this.getContractList(this.contractForm.companyId);
              this.open = false;
            }
          });
        }
      });
    },
    editOrderFun(row) {
      if (!this.companyId && row.companyId) {
        this.companyId = row.companyId;
      }
      this.getOrderList(this.companyId);
      this.$emit("editOrder", row);
      this.orderId = row.id;
      this.orderVisible = true;
      this.hiddenTab = false;
    },
    //上传附件
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.followForm.imageIds = fileList
        .map((item) => {
          let temp = item.response;
          // console.info(temp)
          if (temp.code == 200) {
            return temp.data.id;
          } else {
            return undefined;
          }
        })
        .filter((item) => {
          return item != undefined;
        })
        .join(",");
    },
    handlePreview(file) {
      // console.log(file);
    },
    previewImg(list) {
      return list.map((item) => {
        return this.filePath + item.url;
      });
    },
    handleExceed(files, fileList) {
      // if(files&& fileList){
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
      // }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadSuccess(response, file, fileList) {
      this.ImageUrlList = fileList.map((ite) => {
        return ite.url;
      });
      // console.info(file)
      // console.info(fileList)
      // console.info(response)
      this.followForm.imageIds = fileList
        .map((item) => {
          let temp = item.response;
          // console.info(temp)
          // console.info(file)
          if (temp.code == 200) {
            return temp.data.id;
          } else {
            return undefined;
          }
        })
        .filter((item) => {
          return item != undefined;
        })
        .join(",");
    },
    //跟进记录通过
    followTypeFormat(row) {
      return this.selectDictLabel(this.followTypeList, row.type);
    },
    //客户等级字典
    clientLvFormat(row) {
      return this.selectDictLabel(this.clientLvList, row.clientLv);
    },
    //新增订单
    newOrders(row) {
      if (row && row.id) {
        this.companyId = row.id;
        this.companyInfo = row;
      }
      this.houseOrderShow = true;
      // this.newOrderVisible = true;
    },
    showAddOrUpdate(data) {
      if (data === "false") {
        this.houseOrderShow = false;
      } else {
        this.houseOrderShow = true;
      }
    },
    //更新修改新增联系人
    updateContactFun(data, row) {
      data.companyId = this.companyId;
      if (!row.name) {
        this.msgError("联系人姓名不能为空");
      } else if (!row.id) {
        addContact(data).then((res) => {
          this.msgSuccess("新增联系人成功");
          this.getContacts(this.form.id);
        });
      } else {
        data.id = row.id;
        updateContact(data).then((res) => {
          this.getContacts(this.form.id);
        });
      }
    },
    //删除联系人
    delContactFun(row) {
      if (row.id) {
        this.$confirm("是否确认删除该联系人?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(function () {
            return delContact({ id: row.id });
          })
          .then(() => {
            this.getContacts(this.form.id);
            this.msgSuccess("删除成功");
          })
          .catch(function () {});
      } else {
        this.contactsList.splice(this.contactsList.indexOf(row), 1);
      }
    },
    handleInputCallback() {
      this.handleInputConfirm((res) => {
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
      // console.info(tag)
      this.handleClose(tag, (res) => {
        this.updateForm({ userlabelIds: res });
      });
    },
    handleClose(tag, cb) {
      this.form.userlabelIds.splice(this.form.userlabelIds.indexOf(tag), 1);
      if (typeof cb == "function") {
        cb(this.form.userlabelIds);
      }
    },
    handleRenewals() {
      this.renewals = false;
    },
    //续费
    renew(row) {
      if (row.renewType == "30") {
        contractProjectRenewalDetails({
          id: row.renewId,
          renewType: row.renewType,
        }).then((response) => {
          this.renewals = true;
          this.renewForm = response.data;
          this.renewForm.contractFileIds = "";
          this.renewForm.companyId = this.companyId;
          this.renewForm.contractId = row.id;
          this.renewForm.contractNumber = row.controlNo;
          this.renewForm.takeEffectTime = row.takeTime;
          this.renewForm.renewStartingTime = row.takeTime;
          this.renewForm.marketCompbusiImgfileResults =
            row.marketCompbusiImgfileResults;
        });
      } else {
        this.renewals = true;
        this.renewForm = row;
        this.renewForm.contractFileIds = "";
        this.renewForm.contractId = row.id;
        this.renewForm.companyId = this.companyId;
        this.renewForm.contractNumber = row.controlNo;
        this.renewForm.takeEffectTime = row.takeTime;
        this.renewForm.renewStartingTime = row.takeTime;
        delete this.renewForm.id;
      }
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.dialogVisible = false;
      this.renewals = false;
    },
    //订单审核结果
    auditorStateFormat(row) {
      return this.selectDictLabel(this.auditorState, row.orderType);
    },
    //  //企业信息
    entrepreneurMessageList(id) {
      id = id || this.companyId;
      entrepreneurMessageLiaison({ id: id, classify: 20 }).then((response) => {
        this.enterpriseMessage = response.data || {};
      });
    },
  },
};
</script>

<style lang="scss">
.relation_company {
  .name {
    margin-left: -12px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    color: #303133;
    .el-input__inner {
      border-color: transparent !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.table-data {
  margin: 0px !important;
  margin-top: 20px !important;
  padding: 0px !important;
}
</style>
