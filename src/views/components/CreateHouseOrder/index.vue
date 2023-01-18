<template>
  <div class="createHouseOrder">
    <el-dialog
      :title="title"
      ref="createHouseOrder"
      :visible.sync="showDialog"
      @close="handleClose"
      width="714px"
      class="createOrder"
    >
      <div class="house">
        <el-form
          :model="form"
          label-position="top"
          ref="form"
          :rules="formRules"
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
                  type="datetime"
                  placeholder="请选择报单时间"
                  :disabled="disable"
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
                  @change="handleChange"
                  :disabled="disable"
                >
                  <el-option
                    v-for="item in houseBusinessTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="购买数量" prop="purchaseQuantity">
                <el-input-number
                  v-model="form.purchaseQuantity"
                  :min="1"
                  :max="form.clientType == 10 ? 1 : 9999"
                  :disabled="disable"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="套餐类型" prop="packageName">
                <el-select
                  v-model="form.packageName"
                  placeholder="请选择套餐类型"
                  :disabled="disable"
                  @change="packageType"
                >
                  <el-option
                    v-for="item in houproPackageList"
                    :key="item.id"
                    :label="item.packageName"
                    :value="item.packageName"
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
                :disabled="disable"
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
                  :disabled="disable"
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
                <el-input v-model="form.amountReceivable" disabled>{{
                  amountReceivable
                }}</el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="signingTime">
              <el-form-item label="已收金额" prop="amountReceived">
                <span class="yue">元</span>
                <el-input
                  v-model="form.amountReceived"
                  :disabled="disable"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8" class="signingTime">
              <el-form-item label="未收尾款" prop="endingParagraph">
                <span class="yue">元</span>
                <el-input v-model="form.endingParagraph" :disabled="true">{{
                  balance
                }}</el-input>
              </el-form-item>
            </el-col>
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
                  :options="areaOptions"
                  v-model="form.payCode"
                  @change="handleRegionChange"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收款方式" prop="paymentTerm">
                <el-select
                  v-model="form.paymentTerm"
                  @change="payment(form.paymentTerm)"
                  placeholder="请选择收款方式"
                  :disabled="disable"
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
              <el-form-item label="收款户名" prop="accountName">
                <el-select
                  v-model="form.accountName"
                  @change="accountNameChange(form.accountName)"
                  placeholder="请选择收款方式"
                  :disabled="disable"
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
              <el-form-item label="收款账号" prop="payAccount">
                <el-select
                  v-model="form.payAccount"
                  placeholder="请选择收款账号"
                  :disabled="disable"
                  @change="AccountChange(form.payAccount)"
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
            <el-col :span="12" v-if="form.bankType == 10">
              <el-form-item label="开户行" prop="accountBank">
                <el-select
                  v-model="form.accountBank"
                  placeholder="请选择开户行"
                  :disabled="disable"
                  @change="BankChange(form.accountBank)"
                >
                  <el-option
                    v-for="item in bankOfDepositList"
                    :key="item.id"
                    :label="item.accountBank"
                    :value="item.accountBank"
                  >
                    <!-- {{ item.accountBank }} -->
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付时间" prop="payTime ">
                <el-date-picker
                  v-model="form.payTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  @change="advanceUpdate"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="立即提单" prop="immediatelyType">
                <el-radio-group
                  v-model="form.immediatelyType"
                  :disabled="disable"
                >
                  <el-radio
                    v-for="(item, index) in yesNoList"
                    :key="index"
                    :label="item.label"
                  >
                    {{ item.dictName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="24" v-if="form.clientType == 20">
              <el-form-item label="用户名" prop="account">
                <div class="even">
                  <span>
                    <el-input
                      v-model="form.account"
                      style="width:182px;"
                    ></el-input>
                    <span class="jia" @click="onAdd"
                      ><i class="el-icon-plus"></i
                    ></span>
                  </span>
                  <span
                    v-for="(item, i) of items"
                    :key="i"
                    style="display: inline-block;margin-bottom:10px;"
                  >
                    <el-input v-model="items[i]" style="width:182px"></el-input>
                    <span class="jia" @click="onDel(i)"
                      ><i class="el-icon-minus"></i
                    ></span>
                  </span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-else>
              <el-form-item label="用户名" prop="account">
                <el-input v-model="form.account"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="报单备注" prop="remark">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  v-model="form.remark"
                  :disabled="disable"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="22" v-if="form.signbillType == 30">
            <el-col :span="12">
              <el-form-item label="业务类型" prop="businessType">
                <el-select
                  v-model="form.businessType"
                  :disabled="disable"
                  placeholder="请选择业务类型"
                  @change="handleChange"
                >
                  <el-option
                    v-for="item in houseBusinessTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                    {{ item.name }}
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
                  :disabled="disable"
                >
                  <el-option
                    v-for="item in houproPackageList"
                    :key="item.id"
                    :label="item.packageName"
                    :value="item.packageName"
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
                prop="amountReceivable"
              >
                <span class="yue">元</span>
                <el-input v-model="form.amountReceivable"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="22" v-if="form.signbillType == 30">
            <el-col :span="12" class="signingTime">
              <el-form-item label="已收金额" prop="amountReceived">
                <span class="yue">元</span>
                <el-input v-model="form.amountReceived"></el-input>
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
                  :disabled="disable"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="收款方式" prop="paymentTerm">
                <el-select
                  v-model="form.paymentTerm"
                  placeholder="请选择收款方式"
                  @change="payment"
                  :disabled="disable"
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
              <el-form-item label="用户名" prop="account">
                <el-input v-model="form.account"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="签单类型" prop="signbillType">
                <el-select
                  v-model="form.signbillType"
                  placeholder="请选择签单类型"
                  :disabled="disable"
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
                  :disabled="disable"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="22">
            <el-col :span="12">
              <el-form-item label="合同附件" prop="bargainImgeId">
                <el-upload
                  :disabled="disable"
                  ref="uploadCharges"
                  class="upload-file"
                  :headers="headers"
                  :action="uploadUrl"
                  :data="{ state: 10, clientId: clientId }"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="
                    (response, file, fileList) =>
                      uploadSuccess(response, file, fileList, 10)
                  "
                  multiple
                  :limit="3"
                  list-type="picture-card"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button type="text" icon="el-icon-upload2">
                    <span
                      style="margin-top:10px;color:#A1A2A6;line-height: 20px;"
                      ><br />上传附件</span
                    ></el-button
                  >
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款凭证" prop="evidencePaymentImgeId">
                <el-upload
                  :disabled="disable"
                  ref="uploadCharge"
                  class="upload-file"
                  :headers="headers"
                  :action="uploadUrl"
                  :data="{ state: 20, clientId: clientId }"
                  :on-preview="handlePicturePayment"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="
                    (response, file, fileList) =>
                      uploadSuccess(response, file, fileList, 20)
                  "
                  multiple
                  :limit="3"
                  list-type="picture-card"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button type="text" icon="el-icon-upload2">
                    <span
                      style="margin-top:10px;color:#A1A2A6;line-height: 20px;"
                      ><br />上传附件</span
                    ></el-button
                  >
                  <el-dialog :visible.sync="dialogImgVisible">
                    <img width="100%" :src="PaymentImageUrl" alt="" />
                  </el-dialog>
                  <!-- <el-button icon="el-icon-upload2">上传附件</el-button> -->
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.clientType == 20">
              <el-form-item label="用户名列表" prop="userListImg">
                <template>
                  <div class="upload" @click="bulkImport">
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
        </el-form>
      </div>
      <div class="btn">
        <!-- <el-row :gutter="24">
      <el-col :span="4"> -->
        <el-button type="primary" @click="Submit(20)"> 暂存</el-button>
        <!-- </el-col>
      <el-col :span="4"> -->
        <el-button type="primary" @click="Submit(10)">提交</el-button>
        <!-- </el-col>
    </el-row> -->
      </div>
      <!-- 图片放大 -->
      <el-image-viewer
        style="z-index:2033;"
        v-if="dialogVisible"
        :on-close="closeViewer"
        :url-list="ImageUrlList"
      />
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
          <span class="title">模板下载:</span>
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
            :data="{ clientId: clientId, type: this.form.businessType }"
            :headers="headers"
            :on-change="uploadingTrigger"
            :on-remove="handleRemove"
            accept=".xls,.xlsx"
            :on-success="excelSuccess"
            :file-list="importFileList"
          >
            <!-- :limit="1" -->
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
    <!-- 特殊审批 -->
    <el-dialog width="516px" title="特殊审批" :visible.sync="specialShow">
      <div class="steps">
        <el-steps :space="200" :active="active" process-status="wait">
          <el-step title="创建审批"></el-step>
          <el-step title="主管/经理审核"></el-step>
          <el-step title="总经理审批"></el-step>
          <el-step title="财务审批"></el-step>
        </el-steps>
        <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
      </div>
      <div class="special">
        <el-form :inline="true">
          <el-form-item label="申请理由">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4 }"
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
      <div style="display:flex;justify-content: flex-end;">
        <el-button @click="specialShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确认发起</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import {
  createOrder,
  orderEcho,
  templateDownload,
  GetPaymentMethod,
  GetAccountNumber
} from "../../../api/crm/createHouseOrder/createHouseOrder";
import { throttle } from "@/utils/hmt";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
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
  name: "createHouseOrder",
  props: {
    houseOrderShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkMoney = (rule, value, callback) => {
      if (value==='') {
        return callback(new Error("金额不能为空"));
      } else {
        if (Number(value) <= 0) {
        callback(new Error("请输入大于0的数"));
      }
      callback()
      }
    };
    return {
      statusList: [],
      clientId: null,
      items: [],
      textarea2: null,
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      uploadUrl:
        process.env.VUE_APP_BASE_API + "/hmkj-crm/houproImgfile/upload",
      importFileUrl:
        process.env.VUE_APP_CRM_API +
        "/hmkj-crm/houproOrderCustomerAccount/bulkImport",
      headers: { Authorization: _getSessionStore(tokenKey) },
      fileList: [], //文件上传数据
      showDialog: false,
      PaymentImageUrl: "",
      dialogImgVisible: false,
      form: {
        orderNo:'',
        customsTime: "",
        businessType: "",
        purchaseQuantity:'',
        packageName: "",
        packagePrice:'',
        packagePeriod:'',
        signbillType: "",
        clientType:'',
        amountReceivable:'',
        amountReceived: "",
        endingParagraph:'',
        payCode: "",
        paymentTerm: "",
        accountName: "",
        payAccount: "",
        accountBank:'',
        payTime: "",
        immediatelyType:'',
        bargainImgeId: "",
        remark:'',
        evidencePaymentImgeId: "",
        account: "",
        givingMoney:'',
      },
      uploadingFile: false, //上传
      importFileList: [], //导入数据
      //特殊审批弹窗
      specialShow: false,
      //客户类型
      houseCustomerTypeList: [],
      //业务类型
      houseBusinessTypeList: [],
      formRules: {
        customsTime: [
          { required: true, message: "报单时间不能为空", trigger: "blur" }
        ],
        businessType: [
          { required: true, message: "业务类型不能为空", trigger: "change" }
        ],
        packageName: [
          { required: true, message: "套餐类型不能为空", trigger: "change" }
        ],
        signbillType: [
          { required: true, message: "签单类型不能为空", trigger: "change" }
        ],
        amountReceived: [
          {
            // type: "number",
            validator: checkMoney,
            trigger: "blur"
          }
        ],
        payCode: [
          { required: true, message: "收款地区不能为空", trigger: "change" }
        ],
        paymentTerm: [
          { required: true, message: "收款方式不能为空", trigger: "change" }
        ],
        accountName: [
          { required: true, message: "收款户名不能为空", trigger: "change" }
        ],
        payAccount: [
          { required: true, message: "收款账号不能为空", trigger: "change" }
        ],
        payTime: [
          { required: true, message: "收款时间不能为空", trigger: "change" }
        ],
        bargainImgeId: [
          { required: true, message: "合同附件不能为空", trigger: "change" }
        ],
        evidencePaymentImgeId: [
          { required: true, message: "付款凭证不能为空", trigger: "change" }
        ]
      },
      //是否立即提单
      yesNoList: [
        { label: "Y", dictName: "是" },
        { label: "N", dictName: "否" }
      ],
      areaOptions: regionData, //区域数据
      //收款时间
      PaymentTime: "",
      //签单类型
      signatureTypeList: [],
      // 步骤条
      active: 1,
      //支付类型
      houproPaymentSettingList: [],
      //支付账号
      CollectioAccountList: [],
      //支付户名
      accountNameList: [],
      //开户行
      bankOfDepositList: [],
      PaymentNameList: [],
      //套餐类型
      houproPackageList: [],
      disable: false,
      title: "创建订单"
    };
  },
  watch: {
    houseOrderShow(oldVal, newVal) {
      this.showDialog = this.houseOrderShow;
    }
  },
  created() {
    //客户类型
    this.getDicts("house_customer_type").then(res => {
      this.houseCustomerTypeList = res.data;
    });
    //业务类型
    // this.getDicts("house_business_type").then(res => {
    //   this.houseBusinessTypeList = res.data;
    // });
    this.getDicts("signature_type").then(res => {
      this.signatureTypeList = res.data;
    });
  },
  computed: {
    balance() {
      this.form.endingParagraph =
        this.form.amountReceivable - this.form.amountReceived;
    },
    amountReceivable() {
      return (this.form.amountReceivable =
        this.form.packagePrice * this.form.purchaseQuantity);
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
    //业务类型发生变化
    handleChange() {
      this.houproPackageList = [];
      this.form.houproPackageList.forEach(item => {
        if (item.affiliationType == this.form.businessType) {
          this.houproPackageList.push(item);
        }
      });
    },
    //所属地区
    handleRegionChange(value) {
      this.form.paymentTerm = "";
      this.form.payAccount = "";
      this.form.accountBank = "";
      this.form.accountName = "";
      this.form.payCode = value;
      this.form.payProvince = CodeToText[value[0]];
      this.form.payCity = CodeToText[value[1]];
      this.form.payCounty = CodeToText[value[2]];
      this.form.region =
        this.form.payProvince + this.form.payCity + this.form.payCounty;
      this.houproPaymentSettingList = [];

      GetPaymentMethod({
        type: 20,
        province: this.form.payProvince,
        city: this.form.payCity
      }).then(response => {
        this.houproPaymentSettingList = response.data;
      });
    },
    //订单回显
    handleOrderEcho(row) {
      this.items = [];
      this.clientId = row.clientId;
      this.$nextTick(() => {
        this.$refs.uploadCharge.clearFiles();
        this.$refs.uploadCharges.clearFiles();
      });
      orderEcho(row).then(response => {
        let data = response.data;
        if (data.payCode == "") {
          if (data.houproPaymentSettingList.length > 0) {
            data.payCode = data.houproPaymentSettingList[0].cityCode.replace(
              "[",
              ""
            );
            data.payCode = data.payCode.replace("]", "");
            data.payCode = data.payCode.replace('"', "");
            data.payCode = data.payCode.replace('"', "");
            data.payCode = data.payCode.replace('"', "");
            data.payCode = data.payCode.replace('"', "");
            data.payCode = data.payCode.replace('"', "");
            data.payCode = data.payCode.replace('"', "");
            data.payCode = data.payCode.split(",");
          } else {
            data.payCode = "";
          }
        } else {
          data.payCode = data.payCode.replace("[", "");
          data.payCode = data.payCode.replace("]", "");
          data.payCode = data.payCode.replace('"', "");
          data.payCode = data.payCode.replace('"', "");
          data.payCode = data.payCode.replace('"', "");
          data.payCode = data.payCode.replace('"', "");
          data.payCode = data.payCode.replace('"', "");
          data.payCode = data.payCode.replace('"', "");
          data.payCode = data.payCode.split(",");
        }
        this.accountNameList = [];
        this.PaymentNameList = [];
        this.bankOfDepositList = [];
        data.houproPaymentSettingList.forEach(item => {
          if (data.paymentTerm != "")
            if (data.paymentTerm == item.patternPayment) {
              item.houproPaymentSettingResult.forEach(val => {
                this.accountNameList.push(val.accountName);
                this.PaymentNameList.push(val);
              });
              this.accountNameList = Array.from(new Set(this.accountNameList));
            }
        });
        this.CollectioAccountList = [];
        if (data.accountName != "") {
          this.PaymentNameList.forEach(ite => {
            if (data.accountName == ite.accountName) {
              this.CollectioAccountList.push(ite);
            }
          });
        } else {
          this.CollectioAccountList = [];
        }

        this.houseBusinessTypeList = response.data.crmIntermUserlabelList;
        data.clientType = row.clientType;
        data.clientId = row.clientId;
        data.clientName = row.clientName;
        data.immediatelyType = "N";
        data.modify = row.modify == "yes" ? row.modify : "no";
        if (data.modify == "yes") {
          this.title = "修改";
          this.disable = true;
        } else {
          this.disable = false;
          this.title = "创建订单";
        }
        this.houproPaymentSettingList = data.houproPaymentSettingList;

        if (data.houproOrderCustomerAccountList.length == 1) {
          data.account = data.houproOrderCustomerAccountList[0].rechargeAccount;
        } else if (data.houproOrderCustomerAccountList.length > 1) {
          data.account = data.houproOrderCustomerAccountList[0].rechargeAccount;
          let houproOrderCustomerAccountList = data.houproOrderCustomerAccountList.slice(
            1
          );
          houproOrderCustomerAccountList.forEach(item => {
            this.items.push(item.rechargeAccount);
          });
        } else {
          data.account = "";
        }

        this.form = data;
      });
    },

    //套餐类型
    packageType() {
      this.houproPackageList.forEach(item => {
        if (this.form.packageName == item.packageName) {
          this.form.packageId = item.id;
          this.form.packagePrice = item.packagePrice;
          this.form.packagePeriod = item.packagePeriod;
        }
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
      if (this.form.payTime > this.PaymentTime) {
        this.msgError("支付时间不能大于当前时间");
        return (this.form.payTime = "");
      }
    },
    //收款方式
    payment(val) {
      let paymentId;
      this.form.payAccount = "";
      this.form.accountBank = "";
      this.form.accountName = "";
      this.houproPaymentSettingList.forEach(item => {
        if (this.form.paymentTerm == item.patternPayment) {
          this.form.bankType = item.bankType;
          this.form.currentRate = item.currentRate;
          paymentId = item.id;
        }
      });

      GetAccountNumber({ parentId: paymentId }).then(response => {
        this.accountNameList = [];
        this.bankOfDepositList = [];
        this.PaymentNameList = [];
        response.data.forEach(item => {
          if (item.patternPayment == val) {
            this.accountNameList.push(item.accountName);
            this.PaymentNameList.push(item);
          }
        });
        this.accountNameList = Array.from(new Set(this.accountNameList));
      });
    },
    //收款用户
    accountNameChange(val) {
      this.form.payAccount = "";
      this.form.accountBank = "";
      this.CollectioAccountList = [];
      this.bankOfDepositList = [];
      this.PaymentNameList.forEach(item => {
        if (
          item.accountName == val &&
          item.patternPayment == this.form.paymentTerm
        ) {
          this.CollectioAccountList.push(item);
          this.bankOfDepositList.push(item);
        }
      });
    },

    AccountChange(val) {
      this.bankOfDepositList.forEach(item => {
        if (val == item.payAccount) {
          this.form.accountBank = item.accountBank;
        }
      });
    },
    //开户行
    BankChange(val) {
      // console.log(val);
      this.CollectioAccountList.forEach(item => {
        if (val == item.accountBank) {
          this.form.payAccount = item.payAccount;
        }
      });
    },
    //暂存 提交订单
    Submit: throttle(function(row) {
      if (row == 10) {
        // console.log(this.$refs["form"]);
        this.$refs["form"].validate(valid => {
          if (valid) {
            // console.log(123);
            this.form.houproOrderCustomerAccountList = [];
            let arr = {};
            let tep = {};
            if (this.items.length > 0) {
              tep.rechargeAccount = this.form.account;
              this.form.houproOrderCustomerAccountList.push(tep);
              this.items.forEach((item, i) => {
                let temp = {};
                temp.rechargeAccount = item;
                if (temp.rechargeAccount != "") {
                  this.form.houproOrderCustomerAccountList.push(temp);
                }
              });
            } else {
              arr.rechargeAccount = this.form.account;
              this.form.houproOrderCustomerAccountList.push(arr);
            }
            this.form.payProvince = CodeToText[this.form.payCode[0]];
            this.form.payCity = CodeToText[this.form.payCode[1]];
            this.form.payCounty = CodeToText[this.form.payCode[2]];
            this.form.ts = row;
            this.form.amountReceived =
              this.form.amountReceived == "" ? 0 : this.form.amountReceived;
            createOrder(this.form).then(response => {
              this.showDialog = false;
              this.$parent.getList();
            });
          }callback()
        });
      } else {
        this.form.houproOrderCustomerAccountList = [];
        let arr = {};
        let tep = {};
        if (this.items.length > 0) {
          tep.rechargeAccount = this.form.account;
          this.form.houproOrderCustomerAccountList.push(tep);
          this.items.forEach((item, i) => {
            let temp = {};
            temp.rechargeAccount = item;
            if (temp.rechargeAccount != "") {
              this.form.houproOrderCustomerAccountList.push(temp);
            }
          });
        } else {
          arr.rechargeAccount = this.form.account;
          this.form.houproOrderCustomerAccountList.push(arr);
        }

        this.form.payProvince = CodeToText[this.form.payCode[0]];
        this.form.payCity = CodeToText[this.form.payCode[1]];
        this.form.payCounty = CodeToText[this.form.payCode[2]];
        this.form.ts = row;
        this.form.amountReceived =
          this.form.amountReceived == "" ? 0 : this.form.amountReceived;
        createOrder(this.form).then(response => {
          this.showDialog = false;
          this.$parent.getList();
        });
      }
    }),
    //导入
    bulkImport() {
      this.uploadingFile = true;
    },
    // 模板下载
    // downloadModule() {
    //   console.info("模板下载");
    //   window.location.href =
    //     process.env.VUE_APP_DOWN_API + "/houproOrderTaxation/excelTemplate";
    // },
    downloadExcel(res, fileName = "未命名.xls") {
      debugger;
      const a = document.createElement("a");
      const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);
      a.setAttribute("href", url);
      a.setAttribute("download", fileName);
      a.click();
    },
    async downloadModule() {
      const res = await templateDownload({ id: this.houseId });
      this.downloadExcel(res, "房产提单用户名列表.xls");
    },
    // 上传文件时触发
    uploadingTrigger(file, importFileList) {
      if (importFileList.length > 1) {
        importFileList.splice(0, 1);
      }
    },
    excelSuccess(response, file, fileList, type) {
      let data = response.data;
      if (data.sum == 1) {
        data.accounts = data.account[0].rechargeAccount;
      } else if (data.sum > 1) {
        data.accounts = data.account[0].rechargeAccount;
        let account = data.account.slice(1);
        account.forEach(item => {
          this.items.push(item.rechargeAccount);
        });
      } else {
        data.accounts = "";
      }
      this.form.account = data.accounts;
      //  this.form.
    },
    // 上传确定按钮
    submitFormUploading() {
      this.$refs.importUpdateFile.submit();
      this.uploadingFile = false;
      this.this.form.ts = 20;
      createOrder(this.form).then(response => {
        // this.showDialog = false;
        this.$parent.getList();
      });
    },
    //特殊审批提交
    confirm() {},
    next() {
      if (this.active++ > 3) this.active = 0;
    },
    //合同附件上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //付款凭证
    handlePicturePayment(file) {
      this.PaymentImageUrl = file.url;
      this.dialogImgVisible = true;
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
    },
    cancel() {
      this.uploadingFile = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.house {
  width: 656px;
  height: 602px;
  overflow: auto;
  margin-left: 0px;
  margin-right: 0px;
}
.btn {
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  .el-button {
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 25px;
    padding-right: 25px;
  }
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
</style>

<style lang="scss">
.createHouseOrder {
  .createOrder {
    .el-dialog {
      background: #f5f6f8 !important;
    }
    .house {
      width: 102%;
      .el-form {
        width: 646px;
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
  }

  .special {
    margin-top: 20px;
    border-top: 1px solid #e6e7eb;
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
        background-color: #4977e0;
        color: #fff;
      }
      .el-step__title {
        color: #4977e0;
      }
    }
    .el-step__head.is-wait {
      .el-step__icon.is-text {
        background-color: #e6e7eb;
        color: #fff;
      }

      .el-step__title {
        color: #565759 !important;
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
          // color: #565759;
        }
      }
      .el-step .is-horizontal {
        :nth-child(4) {
          flex-basis: 0px !important;
        }
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
}
</style>
