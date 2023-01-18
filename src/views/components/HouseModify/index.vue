<template>
  <div class="HouseModify">
    <el-dialog
      title="订单详情"
      :visible.sync="showDialog"
      @close="handleClose"
      width="704px"
      class="createOrder"
    >
      <div class="house">
        <el-form
          :model="form"
          ref="houseForm"
          label-position="top"
          :rules="orderRules"
        >
          <el-row :gutter="22">
            <el-col :span="12">
              <el-form-item label="订单编号" prop="orderNo">
                <el-input v-model="form.orderNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报单时间" prop="customsTime">
                <el-date-picker
                  v-model="form.customsTime"
                  type="date"
                  placeholder="请选择报单时间"
                  :disabled="true"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="22" v-if="!(form.signbillType == 30)">
            <el-col :span="12">
              <el-form-item label="业务类型" prop="businessType">
                <el-select
                  v-model="form.businessType"
                  placeholder="请选择业务类型"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in houseBusinessTypeList"
                    :key="item.dictCode"
                    :label="item.dictLabel"
                    :value="item.dictCode"
                  >
                    {{ item.dictName }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="购买数量" prop="purchaseQuantity">
                <el-input-number
                  v-model="form.purchaseQuantity"
                  :min="1"
                  :disabled="true"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="套餐类型" prop="packageName">
                <el-select
                  v-model="form.packageName"
                  placeholder="请选择套餐类型"
                  :disabled="true"
                  @change="packageType"
                >
                  <el-option
                    v-for="item in houproPackageList"
                    :key="item.id"
                    :label="item.packageName"
                    :value="item.id"
                  >
                    {{ item.packageName }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="套餐金额"
                class="signingTime"
                prop="packagePrice"
                :disabled="true"
              >
                <span class="yue">元</span>
                <el-input v-model="form.packagePrice" :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8" class="signingTime">
              <el-form-item label="服务周期" prop="packagePeriod">
                <span class="yue"> 月</span>
                <el-input
                  v-model="form.packagePeriod"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="签单类型" prop="signbillType">
                <el-select
                  v-model="form.signbillType"
                  placeholder="请选择签单类型"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in signatureTypeList"
                    :key="item.dictCode"
                    :label="item.dictLabel"
                    :value="item.dictCode"
                  >
                    {{ item.dictName }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="客户类型" prop="clientType">
                <el-select
                  v-model="form.clientType"
                  placeholder="请选择客户类型"
                  disabled
                >
                  <el-option
                    v-for="item in houseCustomerTypeList"
                    :key="item.dictCode"
                    :label="item.dictLabel"
                    :value="item.dictCode"
                  >
                    {{ item.dictName }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="22" v-if="!(form.signbillType == 30)">
            <el-col :span="8" class="signingTime">
              <el-form-item label="合同金额" prop="amountReceivable">
                <span class="yue">元</span>
                <el-input
                  v-model="form.amountReceivable"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="signingTime">
              <el-form-item label="已收定金" prop="amountReceived">
                <span class="yue">元</span>
                <el-input
                  v-model="form.amountReceived"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8" class="signingTime" v-if="form.type !=30">
              <el-form-item label="未收尾款" prop="endingParagraph">
                <span class="yue">元</span>
                <el-input v-model="form.endingParagraph" :disabled="true">{{
                  balance
                }}</el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="signingTime" v-if="form.type==30" >
              <el-form-item label="本次已收尾款" prop="finalPayment">
                <span class="yue">元</span>
                <el-input v-model="form.finalPayment" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="signingTime" v-if="form.type==30">
              <el-form-item label="剩余应收尾款" prop="endingParagraph">
                <span class="yue">元</span>
                <el-input v-model="form.endingParagraph" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row :gutter="22" v-if="!(form.signbillType == 30)">
            <!--<el-col :span="12">
              <el-form-item label="收款方式" prop="paymentTerm">
                <el-select
                  v-model="form.paymentTerm"
                  placeholder="请选择收款方式"
                  @change="payment"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in houproPaymentSettingList"
                    :key="item.id"
                    :label="item.patternPayment"
                    :value="item.id"
                  >
                    {{ item.patternPayment }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
             <el-col :span="12">
              <el-form-item
                label="收款所属地区"
                prop="payCode"
                style="height:67px"
              >
                <el-cascader
                  placeholder="请选择收款所属地区"
                  style="width: 100%"
                  size="small"
                  disabled
                  :options="areaOptions"
                  v-model="form.payCode"
                  @change="handleRegionChange"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="收款方式" prop="patternPayment">
                <el-select
                  v-model="form.paymentTerm"
                  @change="payment"
                  placeholder="请选择收款方式"
                  :disabled="true"
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
                <el-form-item label="收款账号" prop="payAccount">
                <el-select
                  v-model="form.payAccount"
                  placeholder="请选择收款账号"
                  :disabled="true"
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
              <el-form-item label="支付时间" prop="payTime ">
                <el-date-picker
                  v-model="form.payTime "
                  type="date"
                  placeholder="选择日期"
                  disabled
                  value-format="yyyy-MM-dd"
                  @change="advanceUpdate"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="立即提单" prop="immediatelyType">
                <el-radio-group v-model="form.immediatelyType" :disabled="true">
                  <el-radio
                    v-for="item in yesNoList"
                    :key="item.dictCode"
                    :label="item.dictValue"
                  >
                    {{ item.dictName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="24" v-if="form.clientType == 20">
              <el-form-item label="用户名" prop="Account" v-if="false">
                <div class="even">
                  <span>
                    <el-input
                      v-model="form.Account"
                      style="width:182px;"
                      disabled
                    ></el-input>
                    <span class="jia"><i class="el-icon-plus"></i></span>
                  </span>
                  <span
                    v-for="(item, i) of items"
                    :key="i"
                    style="display: inline-block;margin-bottom:10px;"
                  >
                    <el-input
                      v-model="items[i]"
                      style="width:182px"
                      disabled
                    ></el-input>
                    <span class="jia"><i class="el-icon-minus"></i></span>
                  </span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="用户名"
                prop="Account"
                v-if="false"
              >
                <el-input v-model="form.Account" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上期套餐到期时间" prop="endTime">
                <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  placeholder="请选择报单时间"
                  :disabled="true"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="报单备注" prop="remark">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  v-model="form.remark"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="22" v-if="form.signbillType == 30">
            <el-col :span="12">
              <el-form-item label="业务类型" prop="businessType">
                <el-select
                  v-model="form.businessType"
                  :disabled="true"
                  placeholder="请选择业务类型"
                >
                  <el-option
                    v-for="item in houseBusinessTypeList"
                    :key="item.dictCode"
                    :label="item.dictLabel"
                    :value="item.dictCode"
                  >
                    {{ item.dictName }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户类型" prop="clientType">
                <el-select
                  v-model="form.clientType"
                  placeholder="请选择客户类型"
                  disabled
                >
                  <el-option
                    v-for="item in houseCustomerTypeList"
                    :key="item.dictCode"
                    :label="item.dictLabel"
                    :value="item.dictCode"
                  >
                    {{ item.dictName }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="套餐类型" prop="packageName">
                <el-select
                  v-model="form.packageName"
                  placeholder="请选择套餐类型"
                  @change="packageType"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in houproPackageList"
                    :key="item.id"
                    :label="item.packageName"
                    :value="item.id"
                  >
                    {{ item.packageName }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="合同金额"
                class="signingTime"
                prop="packagePrice"
              >
                <span class="yue">元</span>
                <el-input v-model="form.packagePrice" :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="22" v-if="form.signbillType == 30">
            <el-col :span="12" class="signingTime">
              <el-form-item label="已收金额" prop="amountReceived">
                <span class="yue">元</span>
                <el-input
                  v-model="form.amountReceived"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="signingTime">
              <el-form-item label="未收金额" prop="endingParagraph">
                <span class="yue">元</span>
                <el-input
                  v-model="form.endingParagraph"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" class="signingTime">
              <el-form-item label="赠送币" prop="givingMoney">
                <span class="yue">个</span>
                <el-input
                  v-model="form.givingMoney"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="收款方式" prop="paymentTerm">
                <el-select
                  v-model="form.paymentTerm"
                  placeholder="请选择收款方式"
                  @change="payment"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in houproPaymentSettingList"
                    :key="item.id"
                    :label="item.patternPayment"
                    :value="item.id"
                  >
                    {{ item.patternPayment }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12" v-if="false">
              <el-form-item label="用户名" prop="Account">
                <el-input v-model="form.Account"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签单类型" prop="signbillType">
                <el-select
                  v-model="form.signbillType"
                  placeholder="请选择签单类型"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in signatureTypeList"
                    :key="item.dictCode"
                    :label="item.dictLabel"
                    :value="item.dictCode"
                  >
                    {{ item.dictName }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="报单备注" prop="remark">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  v-model="form.remark"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="22">
            <el-col :span="12">
              <el-form-item label="合同附件">
                <template>
                  <div class="imgStyle">
                    <span v-for="val in contractImgList" :key="val.id">
                      <el-image
                        :src="fileUrl + val.url"
                        :preview-src-list="
                          contractImgList.map(ite => {
                            return fileUrl + ite.url;
                          })
                        "
                      />
                    </span>
                  </div>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款凭证">
                <template>
                  <div class="imgStyle">
                    <span v-for="val in voucherImgList" :key="val.id">
                      <el-image
                        :src="fileUrl + val.url"
                        :preview-src-list="
                          voucherImgList.map(ite => {
                            return fileUrl + ite.url;
                          })
                        "
                      />
                    </span>
                  </div>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.clientType == 20">
              <el-form-item label="用户名列表" prop="userListImg">
                <template>
                  <div class="upload">
                    <i
                      class="el-icon-upload2"
                      style="font-size:28px;color:#A1A2A6;"
                    />
                    <span
                      style="margin-top:2px;color:#A1A2A6;line-height: 20px; font-size:12px;"
                      >上传附件</span
                    >
                  </div>
                </template>

                <!-- </el-upload> -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="22">
            <el-col :span="24">
              <el-form-item label="驳回原因" prop="remarks">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4 }"
                  placeholder="请填写审核备注"
                  v-model="form.remarks"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn">
        <el-button type="primary" v-if="false"> 暂存</el-button>
        <el-button type="primary" @click="Submit" v-if="false">提交</el-button>
        <el-button type="danger" @click="reject(30)"> 驳回</el-button>
        <el-button type="primary" @click="reject(20)">通过</el-button>
      </div>
      <!-- 图片放大 -->
      <el-image-viewer
        style="z-index:2033;"
        v-if="dialogVisible"
        :on-close="closeViewer"
        :url-list="ImageUrlList"
      />
    </el-dialog>

    <!-- 特殊审批 -->
    <el-dialog width="516px" title="特殊审批" :visible.sync="specialShow">
      <div class="steps">
        <el-steps :space="200" :active="active" process-status="wait">
          <el-step title="创建审批"></el-step>
          <el-step title="主管/经理审核"></el-step>
          <el-step title="总经理审批"></el-step>
          <el-step title="财务审批"></el-step>
        </el-steps>
      </div>
      <div class="special">
        <el-form :inline="true">
          <el-form-item label="申请理由">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2 }"
              placeholder="请输入申请理由"
              v-model="textarea2"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="申请人:" class="applicant">
            <el-input v-model="textarea2"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <el-button @click="specialShow = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确认发起</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import {
  createOrder,
  orderEcho
} from "../../../api/crm/createHouseOrder/createHouseOrder";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import {
  selectAuditRecord,
  auditToExamine
} from "../../../api/crm/privateLedger/realEstateAudit";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  components: {
    ElImageViewer
  },
  name: "HouseModify",
  props: {
    houseModifyShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkRemark = (rule, value, callback) => {
      if (value === "" && this.form.status == 30) {
        callback(new Error("请输入审核备注"));
      } else {
        if (this.form.remarks !== "") {
          this.$refs.houseForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      textarea2: null,
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      fileUrl: process.env.VUE_APP_FILE_API,
      uploadUrl: process.env.VUE_APP_BASE_API + "/hmkj-crm/houproImgfile/upload",
      headers: { Authorization: _getSessionStore(tokenKey) },
      fileList: [], //文件上传数据
      clientId: null,
      showDialog: false,
      items: [],
      form: {},
       //支付账号
      CollectioAccountList: [],
       //收款时间
      PaymentTime: "",
      //特殊审批弹窗
      specialShow: false,
      //客户类型
      houseCustomerTypeList: [],
      //业务类型
      houseBusinessTypeList: [],
      //是否立即提单
      yesNoList: [],
      //签单类型
      signatureTypeList: [],
      // 步骤条
      active: 0,
      //支付类型
      houproPaymentSettingList: [],
      //套餐类型
      houproPackageList: [],
      //付款凭证
      voucherImgList: [],
      //合同附件
      contractImgList: [],
      //审核提交
      arrForm:{},
       areaOptions: regionData, //区域数据
      //订单审核校验
      orderRules: {
        remarks: [{ validator: checkRemark, trigger: "blur" }]
      }
    };
  },
  watch: {
    houseModifyShow(oldVal, newVal) {
      this.showDialog = this.houseModifyShow;
    }
  },
  created() {
    //客户类型
    this.getDicts("house_customer_type").then(res => {
      this.houseCustomerTypeList = res.data;
       });
    //业务类型
    this.getDicts("house_business_type").then(res => {
      this.houseBusinessTypeList = res.data;
    });
    this.getDicts("sys_yes_no").then(res => {
      this.yesNoList = res.data;
    });
    this.getDicts("signature_type").then(res => {
      this.signatureTypeList = res.data;
    });
  },
  computed: {
    balance() {
      this.form.endingParagraph =
        this.form.amountReceivable - this.form.amountReceived;
    }
  },
  methods: {
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("changeShow", "false");
    },
    //大客户添加用户名
    onAdd() {
      this.items.push("");
    },
    //大客户删除用户名
    onDel(i) {
      this.items.splice(i, 1);
    },
    //审核回显
    echo(row) {
      this.arrForm = row
      selectAuditRecord({ id: row.id, type: row.type }).then(response => {
        let data = response.data
          data.payCode = data.payCode.replace(
          "[",
          ""
        );
        data.payCode = data.payCode.replace("]", "");
        data.payCode = data.payCode.replace('\"', "");
        data.payCode = data.payCode.replace('\"', "");
        data.payCode = data.payCode.replace('\"', "");
        data.payCode = data.payCode.replace('\"', "");
        data.payCode = data.payCode.replace('\"', "");
        data.payCode = data.payCode.replace('\"', "");
        data.payCode = data.payCode.split(",");
        // this.form = response.data;
         data.type = row.type;
        this.voucherImgList = [];
        this.contractImgList = [];
        data.houproImgfileList.forEach(item => {
          if (item.name == "付款凭证") {
            this.voucherImgList.push(item);
          } else if (item.name == "合同附件") {
            this.contractImgList.push(item);
          }
        });
        this.houproPaymentSettingList = data.houproPaymentSettingList;
        this.houproPackageList = data.houproPackageList;
        if (data.houproOrderCustomerAccountList.length == 1) {
         data.houproOrderCustomerAccountList.forEach(item => {
            data.Account = item.rechargeAccount;
          });
        } else if(data.houproOrderCustomerAccountList.length >1){
          let houproOrderCustomerAccountList = data.houproOrderCustomerAccountList.slice(
            1
          );
          data.houproOrderCustomerAccountList
            .slice(0, 1)
            .forEach(item => {
             data.Account = item.rechargeAccount;
            });
            this.items=[]
          houproOrderCustomerAccountList.forEach(item => {
            this.items.push(item.rechargeAccount);
          });
        }else (this.form.Account ="")
        this.form = data
      });
    },
    //审核结果提交
    reject(row) {
      this.form.status = row;
      this.$refs["houseForm"].validate(valid => {
        if (valid) {
          auditToExamine({
            status: row,
            type: this.form.type,
            remark: this.form.remarks,
            id: this.arrForm.id
          }).then(response => {
            this.showDialog = false;
            this.$parent.getList();
          });
        }
      });
    },

    //套餐类型
    packageType() {
      this.houproPackageList.forEach(item => {
        if (this.form.packageName == item.id) {
          this.form.packagePrice = item.packagePrice;
          this.form.packagePeriod = item.packagePeriod;
        }
      });
    },
   handleRegionChange(value) {
      this.form.payCode = value;
      this.form.paymentTerm = "",
this.form.payAccount = "",
      this.form.payProvince= CodeToText[value[0]];
      this.form.payCity = CodeToText[value[1]];
      this.form.payCounty= CodeToText[value[2]];
      this.form.region = this.form.payProvince + this.form.payCity + this.form.payCounty;
      this.houproPaymentSettingList=[]
     GetPaymentMethod({
        type: 20,
        province: this.form.payProvince,
        city: this.form.payCity
      }).then(response => {
        this.houproPaymentSettingList = response.data;
      });
    },
    //收款方式
   payment() {
      let paymentId;
      this.form.payAccount = "",
      this.houproPaymentSettingList.forEach(item => {
        if (this.form.paymentTerm == item.patternPayment) {
          this.form.currentRate = item.currentRate;
          paymentId = item.id;
        }
      });
      this.CollectioAccountList =[]
      GetAccountNumber({ parentId: paymentId }).then(response => {
        this.CollectioAccountList = response.data;
  
      });
    },

//确认收款时间
    advanceUpdate() {
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
      if (this.form.payTime  > this.PaymentTime) {
        this.msgError("支付时间不能大于当前时间");
        return (this.form.payTime  = "");
      }
    },
    //提交订单
    Submit() {
      
      if (this.form.endingParagraph > 0) {
        this.specialShow = true;
      } else {
        createOrder(this.form).then(response => {

          this.showDialog = false;
        });
      }
    },
    //特殊审批提交
    confirm() {},
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    closeViewer() {
      this.dialogVisible = false;
    },
    handleRemove(file, fileList) {
      delImg({
        id: file.response.data.id,
        companyId: file.response.data.companyId
      }).then(res => {
        let files = fileList
          .map(item => {
            let temp = item.response;

            if (temp.code == 200) {
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
        }
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);

      // delImg({ id: file.response.data.id }).then(response => {});
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
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
        this.form.bargainImgeId = files;
      } else if (type == 20) {
        this.form.evidencePaymentImgeId = files;
      } else if (type == 30) {
        this.form.userListImg = files;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.house {
  width: 628px;
  height: 602px;
  overflow: auto;
  margin-left: 0px;
  margin-right: 0px;
}
.btn {
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  .el-button {
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 25px;
    padding-right: 25px;
  }
}
</style>

<style lang="scss">
.HouseModify {
  .el-dialog {
    background: #f5f6f8 !important;
  }
  .house {
    width: 100%;
    .el-form {
      width: 628px;
      margin-left: 0px;
      margin-right: 0px;
      padding-left: 0px;
      padding-right: 0px;
    }
    .signingTime {
      position: relative;
      .yue {
        position: absolute;
        top: 2px;
        right: 12px;
        z-index: 99;
      }
    }
    .el-input-number--small {
      width: 100%;
    }
    .el-radio-group {
      width: 100%;
    }
    .el-row {
      background-color: #fff;
      margin-bottom: 20px;
      padding: 15px 32px 4px 32px;
    }
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

  .special {
    margin-top: 20px;
    border-top: 1px solid #ccc;
    padding-top: 25px;
    .el-form {
      margin-left: 0px !important;
      margin-right: 0px !important;
      .el-form-item__content {
        width: 470px;
      }
    }
    .applicant {
      .el-form-item__content {
        width: 220px;
        .el-input__inner {
          border: 0px;
        }
      }
    }
  }
  .steps {
    width: 510px;
    margin: auto;
    .el-step__line {
      margin-right: 4px;
      margin-left: 65px;
      width: 48px;
    }
    .el-step__head .is-finish {
      .el-step__icon.is-text {
        background-color: #4977e0 !important;
        color: #fff !important;
      }
      .el-step__title {
        color: #4977e0 !important;
      }
    }
    .el-step__head.is-wait {
      .el-step__icon.is-text {
        background-color: #e6e7eb;
        color: #fff;
      }
    }
    .el-steps {
      display: flex;
      :nth-child(1) {
        flex-basis: 0px !important;
        flex: 2;
        .el-step__main {
          width: 30px;
        }
      }
      :nth-child(2) {
        flex-basis: 0 !important;
        flex: 2.8;
        .el-step__main {
          width: 64px;
        }
        .el-step__line {
          margin-left: 98px;
        }
      }
      :nth-child(3) {
        flex-basis: 0 !important;
        flex: 2.5;
        .el-step__main {
          width: 43px;
        }
        .el-step__line {
          margin-left: 80px;
        }
      }
      :nth-child(4) {
        flex-basis: 0 !important;
        flex: 2;
        .el-step__main {
          width: 30px;
        }
      }
      .el-step__icon.is-text {
        border: 1px solid;
      }

      .el-step__main {
        position: absolute;
        top: 0px;
        left: 30px;
        .el-step__title {
          font-size: 14px;
          line-height: 17px;
          color: #565759;
        }
      }
      .el-step .is-horizontal {
        :nth-child(4) {
          flex-basis: 0px !important;
        }
      }
    }
  }
  .upload {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .jia {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-left: 8px;
    line-height: 32px;
    text-align: center;
    background: #f8f9fb;
    border: 1px solid #e6e7eb;
    color: #6e7073;
  }
  .even {
    > :nth-child(2n + 1) {
      margin-right: 85px;
    }
  }
}
</style>
