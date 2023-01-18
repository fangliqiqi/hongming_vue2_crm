<template>
  <div>
    <!-- 续费 -->
    <el-dialog
      :title="title"
      :visible.sync="renewals"
      width="704px"
      custom-class="renew"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="renewForm"
        :rules="rules"
        label-position="top"
        class="chengjiao"
      >
        <div>
          <el-row type="flex" justify="space-between" :gutter="24">
            <el-col :span="12">
              <el-form-item label="续签合同编号" prop="controlNo">
                <el-input
                  v-model="renewForm.controlNo"
                  placeholder="请输入续签合同编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同金额" prop="money">
                <el-input
                  v-model="renewForm.money"
                  placeholder="请输入合同金额"
                  oninput="value=value.replace(/[^\d]/g,'')"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" :gutter="24">
            <el-col :span="12">
              <el-form-item label="签约时长">
                <el-row :gutter="24">
                  <el-col :span="12" class="signingTime">
                    <span class="nian">年</span>
                    <el-select
                      v-model="renewForm.renewYear"
                      @change="renewalDuration"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in 12"
                        :key="item + '年'"
                        :label="item"
                        :value="item"
                      >
                        {{ item }}
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12" class="signingTime">
                    <span class="yue"> 月</span>
                    <el-select
                      v-model="renewForm.renewMonth"
                      @change="renewalDuration"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in 11"
                        :key="item + '月'"
                        :label="item"
                        :value="item"
                      >
                        {{ item }}
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收费周期" prop="projectParam.cycleType">
                <el-select
                  v-model="renewForm.projectParam.cycleType"
                  placeholder="请选择收费周期"
                >
                  <el-option
                    v-for="item in feesCycleList"
                    :label="item.dictLabel"
                    :key="item.dictCode + 'x'"
                    :value="item.dictCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="续费服务项">
                <el-input
                  v-model="renewForm.projectParam.serpriceName"
                  placeholder="请输入续费服务项"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col
              style="display: flex; align-items: flex-end; height: 4.15rem"
              :span="12"
            >
              <el-button @click="collectionsUpdate" type="primary"
                >收费</el-button
              >
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item label="服务时间">
              <el-col :span="6">
                <el-date-picker
                  v-model="renewForm.projectParam.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :readonly="true"
                  placeholder="请输入服务周期开始时间"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="1" style="text-align: center">
                <span>-</span>
              </el-col>
              <el-col :span="6">
                <el-date-picker
                  v-model="renewForm.projectParam.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :readonly="true"
                  placeholder="服务周期结束时间"
                >
                </el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="账本费">
                <el-input
                  v-model="renewForm.projectParam.amountPayout"
                  placeholder="请输入账本费"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col
              style="display: flex; align-items: flex-end; height: 4.15rem"
              :span="4"
            >
              <el-checkbox
                true-label="10"
                false-label="20"
                v-model="renewForm.projectParam.giveAwayType"
                @change="giveAwayTypeChange"
                >赠送项</el-checkbox
              >
            </el-col>
            <el-col :span="10">
              <el-form-item label="赠送月份">
                <el-input
                  v-model.number="renewForm.projectParam.giftMonth"
                  placeholder="请输入赠送月份"
                  @change="giftMonthChange"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append">月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="添加合同附件">
              <!-- <div
                v-for="(item, index) in getData.marketCompbusiImgfileResults"
                :key="index + 'm'"
                class="father"
              >
                <i
                  class="el-icon-circle-close delDutton"
                  @click="delimg(index)"
                ></i>

                <el-image
                  style="width: 100%; height: 100px,margin-bottom:10px"
                  :src="item.url"
                  :preview-src-list="
                    getData.marketCompbusiImgfileResults.map((ite) => {
                      return ite.url;
                    })
                  "
                ></el-image>
              </div> -->

              <el-upload
                class="upload-file"
                ref="uploadRenew"
                :headers="headers"
                :action="fileUrl"
                :on-preview="handlePictureCardPreview"
                :on-remove="
                  (file, feesList) => handleRemove(file, feesList, 20)
                "
                :before-remove="beforeRemove"
                :data="{
                  uploadType: 10,
                  companyId: getData.companyId,
                  busirecordId: getData.busirId,
                }"
                multiple
                :on-success="
                  (res, file, files) => uploadSuccess(res, file, files, 20)
                "
                :file-list="fileList"
                list-type="picture"
              >
                <el-button size="small" icon="el-icon-upload2"
                  >上传合同照片</el-button
                >
              </el-upload>
            </el-form-item>
          </el-row>
          <!-- <el-row>
            <el-col>
              <el-form-item label="">
                <el-button @click="openPdf">生成电子合同</el-button>
              </el-form-item>
            </el-col>
          </el-row> -->
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button>特殊审批</el-button> -->
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button :disabled="xufei" type="primary" @click="handleRenewals"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="预收款明细"
      width="520px"
      :visible.sync="collectionsShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      custom-class="item_full"
      append-to-body
    >
      <el-form
        class="mag0"
        ref="collectionsForm"
        :rules="rules"
        :model="renewForm"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="预收金额"
              prop="projectParam.advanceActualAmount"
            >
              <el-input
                v-model.number="renewForm.projectParam.advanceActualAmount"
                type="text"
                placeholder="请输入预收金额"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="支付时间"
              prop="projectParam.advancePaymentTime"
            >
              <el-date-picker
                v-model="renewForm.projectParam.advancePaymentTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择支付时间"
                :clearable="false"
                @change="handlePaymentTime"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="收款所属地区"
              prop="payCode"
              style="height: 67px"
            >
              <el-cascader
                placeholder="请选择收款所属地区"
                style="width: 100%"
                size="small"
                :options="areaOptions"
                v-model="renewForm.projectParam.payCode"
                @change="handleCityCodeChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款方式" prop="projectParam.paymentMethod">
              <el-select
                v-model="renewForm.projectParam.paymentMethod"
                @change="payment(renewForm.projectParam.paymentMethod)"
                placeholder="请选择付款方式"
              >
                <el-option
                  v-for="item in houproPaymentSettingList"
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
            <el-form-item label="收款户名" prop="projectParam.accountName">
              <el-select
                v-model="renewForm.projectParam.accountName"
                @change="accountNameChange(renewForm.projectParam.accountName)"
                placeholder="请选择收款户名"
              >
                <el-option
                  v-for="item in accountNameList"
                  :key="item.id"
                  :label="item"
                  :value="item"
                >
                  {{ item }}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款账户" prop="projectParam.account">
              <el-select
                v-model="renewForm.projectParam.account"
                placeholder="请选择收款账户"
              >
                <el-option
                  v-for="item in CollectioAccountList"
                  :key="item.id"
                  :label="item.payAccount"
                  :value="item.payAccount"
                >
                  {{ item.payAccount }}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行" prop="projectParam.accountBank">
              <el-select
                v-model="renewForm.projectParam.accountBank"
                placeholder="请选择开户行"
                @change="BankChange(renewForm.projectParam.accountBank)"
              >
                <el-option
                  v-for="item in bankOfDepositList"
                  :key="item.id"
                  :label="item.accountBank"
                  :value="item.accountBank"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收费备注" prop="projectParam.advanceRemarks">
              <el-input
                type="textarea"
                placeholder="请输入备注信息"
                class="minh98"
                v-model="renewForm.projectParam.advanceRemarks"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上传附件">
          <el-upload
            class="upload-file"
            ref="collectionUpload"
            :headers="headers"
            :action="fileUrl"
            :on-preview="handlePictureCardPreview"
            :on-remove="(file, feesList) => handleRemove(file, feesList, 20)"
            :before-remove="beforeRemove"
            :data="{
              uploadType: 10,
              companyId: getData.companyId,
              busirecordId: getData.busirId,
            }"
            multiple
            :on-success="
              (res, file, files) => handleFileSuccess(res, file, files, 20)
            "
            :file-list="feesList"
            list-type="picture"
          >
            <el-button size="small" icon="el-icon-upload2">上传附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitCollections">取消</el-button>
        <el-button type="primary" @click="collectionsShow = false"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <contract-pdf
      :visible.sync="contractPdfShow"
      :orderId="orderIdPdf"
      @close="closePdf"
      :isXuFei="isXuFei"
      :renewForm="renewForm"
      @func="getMsgFormSon"
    ></contract-pdf>
    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index: 3000"
      v-if="dialogVisible"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import ContractPdf from "@/views/components/ContractPdf";
import {
  GetPaymentMethod,
  GetAccountNumber,
} from "@/api/crm/createHouseOrder/createHouseOrder";
import request from "@/utils/request";
import {
  contractProjectRenewal,
  delImg,
} from "../../../api/crm/customerService/agentAccount";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import { AdvancePayment } from "@/api/crm/order";
import {
  contractProjectRenewalDetails,
  findPayMethod,
} from "@/api/crm/customerService/agentAccount";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import { throttle } from "@/utils/hmt";
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
    visible: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      isXuFei: false,
      orderIdPdf: "",
      contractPdfShow: false,
      feesList: [],
      filePath: process.env.VUE_APP_FILE_API,
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload", //跟进记录上传
      fileUrl:
        process.env.VUE_APP_CRM_API + "/hmkj-crm/marketCompbusiImgfile/upload", //附件上传
      fileList: [],
      isNeiZhang: false,
      //续签合同规则
      collectionsRules: {
        advanceActualAmount: [
          // { validator: validateMaxMoney, trigger: "blur" },
          { type: "number", message: "价格必须为数字值" },
          { required: true, message: "预售金额不能为空", trigger: "blur" },
        ],
        advancePaymentTime: [
          { required: true, message: "支付时间不能为空", trigger: "change" },
        ],
      },
      isPresented: false,
      PaymentTime: "",
      monthDate: "",
      timer: "",
      collectionsShow: false, //续签合同
      dialogFormVisible: false,
      xufei: true,
      collections: {},
      ImageUrlList: [],
      dialogImageUrl: "",
      giftStartTime: "",
      html2ImgFun: "",
      giveAwayType: "", //赠送项
      dialogVisible: false,
      fileList: [], //文件上传数据
      headers: { Authorization: _getSessionStore(tokenKey) },
      fileIdsUrl:
        process.env.VUE_APP_BASE_API + "/hmkj-crm/marketCompbusiImgfile/upload",
      title: "",
      feesCycleList: [], //收费周期
      //区域数据
      areaOptions: regionData,
      //支付类型
      houproPaymentSettingList: [],
      //支付账号
      CollectioAccountList: [],
      //付款方式
      paymentMethod: [],
      //支付户名
      accountNameList: [],
      isFile: false,
      //开户行
      bankOfDepositList: [],
      PaymentNameList: [],
      getData: {},
      loading: false,
      isDisable: false,
      pdfForm: {},
      value2: "",
      // 表单校验
      rules: {
        giftEndTime: [
          {
            required: true,
            message: "赠送月份不能为空",
            trigger: "blur",
          },
        ],
        payBackTime: [
          {
            required: true,
            message: "每月收费时间不能为空",
            trigger: "blur",
          },
        ],
        amountReceived: [
          {
            required: true,
            message: "预收金额不能为空",
            trigger: "blur",
          },
        ],
        contractNumber: [
          {
            required: true,
            message: "合同编号不能为空",
            trigger: "blur",
          },
        ],
        takeEffectTime: [
          {
            required: true,
            message: "合同生效期不能为空",
            trigger: "blur",
          },
        ],
        money: [
          {
            required: true,
            message: "合同金额不能为空",
            trigger: "blur",
          },
        ],
        cycleType: [
          {
            required: true,
            message: "收费周期不能为空",
            trigger: "change",
          },
        ],
        customerPhone: [
          {
            required: true,
            message: "签约时长不能为空",
            trigger: "change",
          },
        ],
        paymentMethod: [
          {
            required: true,
            message: "收款方式不能为空",
            trigger: "change",
          },
        ],
        amountPayout: [
          {
            required: true,
            message: "账本费不能为空",
            trigger: "blur",
          },
        ],
        serpriceName: [
          {
            required: true,
            message: "续费服务项不能为空",
            trigger: "blur",
          },
        ],
        accountsReceivable: [
          {
            required: true,
            message: "收款账户不能为空",
            trigger: "blur",
          },
        ],
        // chargeNotes: [
        //   {
        //     required: true,
        //     message: "收款备注不能为空",
        //     trigger: "blur"
        //   }
        // ],
        remark: [
          {
            required: true,
            message: "任务内容不能为空",
            trigger: "blur",
          },
        ],
        billType: [
          {
            required: true,
            message: "票据类型不能为空",
            trigger: "blur",
          },
        ],
        companyName: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur",
          },
        ],
        paymentTime: [
          {
            required: true,
            message: "收款时间不能为空",
            trigger: "blur",
          },
        ],
      },
      renewForm: {
        projectParam: {
          cycleType: null,
          money: "",
        },
      },
    };
  },
  watch: {
    form: {
      handler(temp, objVal) {
        this.xufei = temp.xufei;
        this.$nextTick((_) => {
          this.$refs.uploadRenew.clearFiles();
          this.$refs.collectionUpload.clearFiles();
        });
        console.log(this.xufei);
        if (temp.id) {
          this.getRenewalDetails(temp.id, temp.renewType);
        }
      },
    },
  },
  computed: {
    renewals: {
      get() {
        if (this.visible) {
          this.title = "续签合同";
          //收费周期
          this.getDicts("fees_cycle").then((res) => {
            this.feesCycleList = res.data;
          });
          //收款方式
          this.getDicts("payment_method").then((res) => {
            this.paymentMethod = res.data;
          });
        }
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  components: {
    ElImageViewer,
    ContractPdf,
  },
  name: "RenewContract",
  methods: {
    getMsgFormSon(data) {
      this.pdfForm = data;
    },
    //生成电子合同
    openPdf() {
      this.contractPdfShow = true;
      this.isFile = true;
      this.isXuFei = true;
      this.orderIdPdf = this.renewForm.companyId;
    },
    // 接受子 事件 然后刷新页面
    closePdf(data) {
      console.log(11111);
      if (data == "10") {
        this.contractPdfShow = false;
        // this.getContract();
      }
    },
    /**
     * @description: 获取n个月后的日期
     * @param {String} dtstr 日期
     * @param {String} n 几个月
     * @return: 日期
     */
    addmulMonth(dtstr, n) {
      let s = dtstr.split("-");
      let yy = parseInt(s[0]);
      let mm = parseInt(s[1]);
      let dd = parseInt(s[2]) + 1;
      var num = mm + parseInt(n);

      if (num / 12 > 1) {
        yy += Math.floor(num / 12);
        mm = num % 12;
      } else {
        mm += parseInt(n);
      }

      //获取当前日期中月的天数
      let newDate = new Date(yy, mm, 0);
      //这里传入的0代表获取上一个月的最后一天；如果传1，则获得当月的第一天
      let days = newDate.getDate();
      //天数大于当前月
      if (dd > days) {
        dd = days;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (dd < 10) {
        dd = "0" + dd;
      }
      return yy + "-" + mm + "-" + dd;
    },
    gettimes(dtstr) {
      dtstr = new Date(dtstr);
      var dateTime = dtstr.setDate(dtstr.getDate() + 1);
      dateTime = new Date(dateTime);
      //这里传入的0代表获取上一个月的最后一天；如果传1，则获得当月的第一天
      let Y = dateTime.getFullYear();
      let M = dateTime.getMonth() + 1;
      let D = dateTime.getDate();
      return Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
    },
    //打开获取续费合同接口数据
    getRenewalDetails(id, type) {
      contractProjectRenewalDetails({ id: id, renewType: type }).then(
        (response) => {
          this.renewals = true;
          let arr = response.data;
          this.getData = response.data;
          let serprice = [];
          if (arr.marketBusirSerprices) {
            let marketBusirSerprices = (arr.marketBusirSerprices || []).filter(
              (item) => item.accountType == 20
            );
            serprice =
              marketBusirSerprices.length > 0 ? marketBusirSerprices[0] : {};
            if (serprice.payCode) {
              serprice.payCode =
                typeof arr.payCode == "string"
                  ? JSON.parse(serprice.payCode)
                  : serprice.payCode;
            }
          }
          if (serprice.giftMonth) {
            if (serprice.endTime) {
              this.monthDate = this.addmulMonth(
                serprice.endTime,
                -serprice.giftMonth
              );
            }
          } else {
            if (serprice.endTime) {
              this.monthDate = serprice.endTime;
            }
          }
          this.getData.busirId = serprice.busirId;

          //外层图片id
          if (arr.marketCompbusiImgfileResults) {
            let imgfileIds = arr.marketCompbusiImgfileResults.map((item) => {
              return item.id;
            });
            arr.contractFileIds = arr.contractFileIds
              ? arr.contractFileIds.split(",").concat(imgfileIds.join(","))
              : imgfileIds.join(",");

            try {
              this.fileList = arr.marketCompbusiImgfileResults.map((item) => {
                return {
                  url: this.filePath + item.url,
                  name: item.name + "." + item.type,
                  id: item.id,
                };
              });
            } catch (e) {}
          }
          //内层图片id
          if (serprice.advanceImages) {
            let advanceFileIds = serprice.advanceImages.map((item) => {
              return item.id;
            });
            arr.advanceFileIds = arr.advanceFileIds
              ? arr.advanceFileIds.split(",").concat(advanceFileIds.join(","))
              : advanceFileIds.join(",");
            try {
              // this.$nextTick((_) => {
              //   this.$refs.collectionUpload.clearFiles();
              // });
              this.feesList = serprice.advanceImages.map((item) => {
                return {
                  url: this.filePath + item.url,
                  name: item.name + "." + item.type,
                  id: item.id,
                };
              });
            } catch (e) {}
          }
          if (serprice.payCode) {
            //付款方式选择
            serprice.payProvince = CodeToText[serprice.payCode[0]];
            serprice.payCity = CodeToText[serprice.payCode[1]];
            GetPaymentMethod({
              type: 10,
              province: serprice.payProvince,
              city: serprice.payCity,
            }).then((response) => {
              this.houproPaymentSettingList = response.data;
            });
          }
          this.renewForm = {
            companyId: arr.companyId,
            compayBusirId: arr.compayBusirId,
            money: arr.money,
            controlNo: arr.controlNo,
            imgfileIds: arr.contractFileIds,
            specialApprovalsType: arr.specialApprovalsType,
            auditorState: arr.auditorState,
            dispatchState: arr.dispatchState,
            id: arr.id,
            parentIds: arr.parentIds,
            renewYear: arr.renewYear,
            renewMonth: arr.renewMonth,
            servicePeriodStart: serprice.startTime,
            servicePeriodEnd: serprice.endTime,
            projectParam: {
              accountType: serprice.accountType,
              startTime: serprice.startTime,
              endTime: serprice.endTime,
              giftEndTime: serprice.endTime,
              giftStartTime: this.giftStartTime,
              advanceFileIds: arr.advanceFileIds,
              renewProjectIds: serprice.renewProjectIds,
              giftMonth: serprice.giftMonth,
              id: serprice.id,
              serpriceId: serprice.serpriceId,
              busirId: serprice.busirId,
              payCode: serprice.payCode,
              cycleType: serprice.cycleType,
              serpriceName: serprice.serpriceName,
              giveAwayType: serprice.giveAwayType,
              price: serprice.price,
              amountPayout: 200,
              account: serprice.account,
              accountName: serprice.accountName,
              accountBank: serprice.accountBank,
              paymentMethod: serprice.paymentMethod,
              advanceRemarks: serprice.advanceRemarks,
              advancePaymentTime: serprice.advancePaymentTime,
              advanceActualAmount: serprice.advanceActualAmount,
            },
          };
          console.log(this.renewForm);
        }
      );
    },
    //确定续费
    handleRenewals: throttle(function ({ title, selid, data }) {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.monthDate) {
            this.giftStartTime = this.gettimes(this.monthDate);
          }
          this.renewForm.projectParam.giftStartTime = this.giftStartTime;
          this.renewForm.servicePeriodEnd = this.renewForm.projectParam.endTime;
          this.renewForm.projectParam.giftEndTime =
            this.renewForm.projectParam.endTime;
          this.renewForm.projectParam.moneyReceived = this.renewForm.money;
          if (!this.renewForm.projectParam.giftMonth) {
            this.renewForm.projectParam.giftStartTime = "";
            this.renewForm.projectParam.giftEndTime = "";
          }
          if (this.isFile == true) {
            console.log(this.renewForm)
            var fm = new FormData();
            fm.append("file", this.dataURLtoFile(this.pdfForm, "合同.pdf"));
            fm.append(
              "param",
              new Blob([JSON.stringify(this.renewForm)], {
                type: "application/json",
              })
            );
            request({
              method: "post",
              type: "multipart/form-data",
              url: "/hmkj-crm/marketCompanyEssential/projectRenewal",
              data: fm,
            }).then((response) => {
              if (response.code == 200) {
                this.renewals = false;
                this.msgSuccess("创建订单成功");
                this.$parent.getContractList(this.renewForm.companyId);
              }
            });
          } else {
            var fm = new FormData();
            fm.append("file", null);
            fm.append(
              "param",
              new Blob([JSON.stringify(this.renewForm)], {
                type: "application/json",
              })
            );
            request({
              method: "post",
              type: "multipart/form-data",
              url: "/hmkj-crm/marketCompanyEssential/projectRenewal",
              data: fm,
            }).then((response) => {
              if (response.code == 200) {
                this.renewals = false;
                this.msgSuccess("创建订单成功");
                this.$parent.getContractList(this.renewForm.companyId);
              }
            });
          }
          //电子合同文件
        }
      });
    }, 5000),
    //内层dialog取消
    dialogCancel() {
      //续费
      this.renewals = false;
    },
    //赠送月份change事件
    giftMonthChange(e) {
      if (e == "") {
        e = 0;
      }
      if (this.monthDate) {
        this.renewForm.projectParam.endTime = this.addmulMonth(
          this.monthDate,
          e
        );
        console.log(this.monthDate);
        console.log(this.renewForm.projectParam.endTime);
      }
    },
    //续费时长
    renewalDuration(param) {
      console.info(param);
      // this.renewForm.customerPhone =
      //   parseInt(this.renewForm.renewYear || 0) +
      //   "年" +
      //   parseInt(this.renewForm.renewMonth || 0) +
      //   "月";
      if (this.renewForm.renewYear || this.renewForm.renewMonth) {
        try {
          let renewStartingTime = this.renewForm.projectParam.startTime;
          let startTime = new Date(renewStartingTime);
          let year =
            startTime.getFullYear() + parseInt(this.renewForm.renewYear || 0);
          let month =
            startTime.getMonth() + parseInt(this.renewForm.renewMonth || 0);
          let endTime = new Date(year, month, 0);
          let Y = endTime.getFullYear();
          let M = endTime.getMonth() + 1;
          let D = endTime.getDate();
          this.monthDate =
            Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
          this.renewForm.projectParam.endTime =
            Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
          if (this.renewForm.projectParam.giftMonth) {
            if (this.monthDate) {
              console.log("进入赠送月份");
              let startTime = new Date(this.monthDate);
              let year = startTime.getFullYear();
              let month =
                startTime.getMonth() +
                this.renewForm.projectParam.giftMonth +
                1;
              let endTime = new Date(year, month, 0);
              let Y = endTime.getFullYear();
              let M = endTime.getMonth() + 1;
              let D = endTime.getDate();
              this.renewForm.projectParam.endTime =
                Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
            }
          }
          console.log(this.monthDate);
          console.log(this.renewForm.projectParam.endTime);
        } catch (e) {
          console.info(e);
        }
      } else {
        this.renewForm.projectParam.endTime = "";
      }
    },
    //内层dialog取消
    submitCollections() {
      this.collectionsShow = false;
    },
    //确认收费支付时间
    handlePaymentTime() {
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
      var hour = date.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      } else {
        return (hour = hour);
      }
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.PaymentTime =
        [year, month, day].join("-") + " " + [hour, minutes, seconds].join(":");
      if (this.renewForm.projectParam.advancePaymentTime > this.PaymentTime) {
        this.msgError("支付时间不能大于当前时间");
        return (this.renewForm.projectParam.advancePaymentTime = "");
      }
    },
    //赠送项的改变
    giveAwayTypeChange(e) {
      var money = Number(this.renewForm.money);
      if (e == 10) {
        this.renewForm.money = money - 200;
        this.renewForm.projectParam.moneyReceived = money - 200;
      } else {
        this.renewForm.money = money + 200;
        this.renewForm.projectParam.moneyReceived = money + 200;
      }
    },
    //续签合同
    collectionsUpdate() {
      this.collectionsShow = true;
    },
    closeViewer() {
      this.dialogVisible = false;
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //城市选择
    handleCityCodeChange(value) {
      console.log(1111);
      this.CollectioAccountList = [];
      this.bankOfDepositList = [];
      this.houproPaymentSettingList = [];
      this.accountNameList = [];
      (this.renewForm.projectParam.accountBank = ""),
        (this.renewForm.projectParam.account = ""),
        (this.renewForm.projectParam.accountName = "");
      this.renewForm.projectParam.paymentMethod = "";
      this.renewForm.projectParam.payCode = value;
      this.renewForm.projectParam.payProvince = CodeToText[value[0]];
      this.renewForm.projectParam.payCity = CodeToText[value[1]];
      this.renewForm.projectParam.payCounty = CodeToText[value[2]];
      GetPaymentMethod({
        type: 10,
        province: this.renewForm.projectParam.payProvince,
        city: this.renewForm.projectParam.payCity,
      }).then((response) => {
        this.houproPaymentSettingList = response.data;
      });
    },
    //收款方式
    payment(val) {
      let paymentId = "";
      this.renewForm.accountsReceivable = "";
      (this.renewForm.projectParam.accountBank = ""),
        (this.renewForm.projectParam.accountName = "");
      this.houproPaymentSettingList.forEach((item) => {
        if (this.renewForm.projectParam.paymentMethod == item.patternPayment) {
          paymentId = item.id;
        }
      });
      this.CollectioAccountList = [];
      this.bankOfDepositList = [];
      GetAccountNumber({ parentId: paymentId }).then((response) => {
        this.accountNameList = [];
        this.PaymentNameList = [];
        response.data.forEach((item) => {
          if (item.patternPayment == val) {
            this.accountNameList.push(item.accountName);
            this.PaymentNameList.push(item);
          }
        });

        this.accountNameList = Array.from(new Set(this.accountNameList));
        // console.log(this.accountNameList);
      });
    },
    //收款用户
    accountNameChange(val) {
      this.renewForm.accountsReceivable = "";
      (this.renewForm.projectParam.accountBank = ""),
        (this.CollectioAccountList = []);
      this.bankOfDepositList = [];
      this.PaymentNameList.forEach((item) => {
        if (
          item.accountName == val &&
          item.patternPayment == this.renewForm.projectParam.paymentMethod
        ) {
          this.CollectioAccountList.push(item);
          console.log(this.CollectioAccountList);
          this.bankOfDepositList.push(item);
        }
      });
    },

    //收款账户下拉框强制刷新
    selectPlatform(val) {
      this.$forceUpdate(); //强制更新
      this.bankOfDepositList.forEach((item) => {
        if (val == item.payAccount) {
          this.renewForm.projectParam.accountBank = item.accountBank;
        }
      });
    },
    BankChange(val) {
      this.$forceUpdate();
      this.CollectioAccountList.forEach((item) => {
        if (val == item.accountBank) {
          this.renewForm.accountsReceivable = item.payAccount;
        }
      });
    },

    //收款
    renewalFee() {
      this.renewShow = true;
      //内层地区选择
      // this.accountNameList = [];
      // this.PaymentNameList = [];
      // this.houproPaymentSettingList = this.renewForm.paymentSettingResults;
      // this.houproPaymentSettingList.forEach((item) => {
      //   if (this.collections.paymentTerm != "") {
      //     if (this.collections.paymentTerm == item.patternPayment) {
      //       this.collections.currentRate = item.currentRate;
      //       item.houproPaymentSettingResult.forEach((val) => {
      //         this.accountNameList.push(val.accountName);
      //         this.PaymentNameList.push(val);
      //       });
      //       this.accountNameList = Array.from(
      //         new Set(this.accountNameList)
      //       );
      //     }
      //   }
      // });
    },
    delimg(index) {
      this.getData.marketCompbusiImgfileResults.splice(index, 1);
    },
    //图片上传成功
    uploadSuccess(response, file, fileList, type) {
      this.ImageUrlList = fileList.map((ite) => {
        return ite.url;
      });
      let files = fileList
        .map((item) => {
          let temp = item.response;
          if (temp && temp.code == 200) {
            return temp.data.id;
          } else {
            return undefined;
          }
        })
        .filter((item) => {
          return item != undefined;
        })
        .join(",");
      this.renewForm.imgfileIds = files;
    },
    //内层图片上传成功
    handleFileSuccess(response, file, fileList, type) {
      this.ImageUrlList = fileList.map((ite) => {
        return ite.url;
      });
      let files = fileList
        .map((item) => {
          let temp = item.response;
          if (temp && temp.code == 200) {
            return temp.data.id;
          } else {
            return undefined;
          }
        })
        .filter((item) => {
          return item != undefined;
        })
        .join(",");
      this.renewForm.projectParam.advanceFileIds = files;
    },
    handleRemove(file, fileList, type) {
      delImg({
        id: file.response.data.id,
        companyId: file.response.data.companyId,
      }).then((res) => {
        let files = fileList
          .map((item) => {
            let temp = item.response;

            if (temp && temp.code == 200) {
              return temp.data.id;
            } else {
              return undefined;
            }
          })
          .filter((item) => {
            return item != undefined;
          })
          .join(",");
        if (type == 10) {
        } else if (type == 20) {
          this.renewForm.contractFileIds = files;
        } else if (type == 60) {
          this.renewForm.fileIds = files;
        }
      });
    },
    handlePreview(file) {},
    previewImg(list) {
      return list.map((item) => {
        return this.filePath + item.url;
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);

      // delImg({ id: file.response.data.id }).then(response => {});
    },
  },
};
</script>

<style lang="scss">
//续费
.renew {
  &.el-dialog {
    background: #f5f6f7;

    .el-dialog__body {
      height: 650px;
      overflow: auto;

      .el-form {
        margin: 0 !important;
        .father {
          position: relative;
          .delDutton {
            position: absolute;
            top: 0;
            right: 5px;
            z-index: 99;
            cursor: pointer;
          }
        }

        .signingTime {
          position: relative;
          .nian,
          .yue {
            position: absolute;
            top: 2px;
            right: 40px;
            z-index: 99;
          }
        }

        > div {
          background-color: #fff;
          margin-bottom: 20px;
          padding-left: 32px;
          padding-right: 32px;

          &:nth-child(2),
          &:nth-child(3) {
            padding-left: 0px !important;
            padding-right: 0px !important;

            > div {
              &:nth-child(1) {
                border-bottom: 1px solid #e6e7eb;
                padding-left: 32px;
                line-height: 54px;
                height: 54px;
                font-size: 16px;
                font-weight: bold;
                color: #303133;
              }

              &:nth-child(2) {
                margin: 20px 32px 10px 32px;
              }
            }
          }

          &:nth-child(4) {
            padding-top: 26px;
          }
        }
      }
    }
  }
}
</style>
