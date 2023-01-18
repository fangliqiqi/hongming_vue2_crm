<template>
  <div class="HousePlaceOrder">
    <el-dialog
      title="提单"
      ref=" HousePlaceOrder"
      :visible.sync="showDialog"
      @close="handleClose"
      width="704px"
      class="createOrder"
    >
      <div class="house">
        <el-form v-model="form" label-position="top" ref="houseForm">
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
                  :disabled="disable"
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
              <el-form-item label="应收金额" prop="amountReceivable">
                <span class="yue">元</span>
                <el-input
                  v-model="form.amountReceivable"
                  :disabled="true"
                ></el-input>
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
                label="所属地区"
                prop="payCode"
                style="height:67px"
              >
                <el-cascader
                  placeholder="请选择所属地区"
                  style="width: 100%"
                  size="small"
                  :disabled="disable"
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
              <el-form-item label="收款账号" prop="payAccount">
                <el-select
                  v-model="form.payAccount"
                  placeholder="请选择收款账号"
              
                  :disabled="disable"
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
              <el-form-item label="收款时间" prop="payTime ">
                <el-date-picker
                  v-model="form.payTime "
                  type="date"
                   :disabled="disable"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  @change="CollectionTimeUpdate"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="立即提单" prop="immediatelyType">
                <el-radio-group v-model="form.immediatelyType" :disabled="disable">
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
              <el-form-item label="用户名" prop="Account">
                <div class="even">
                  <span>
                    <el-input
                      v-model="form.Account"
                      :readonly="userRole=='submitReceiptsStaff'"
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
                    <el-input v-model="items[i]" style="width:182px" :readonly="userRole=='submitReceiptsStaff'"></el-input>
                    <span class="jia" @click="onDel(i)"
                      ><i class="el-icon-minus"></i
                    ></span>
                  </span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-else>
              <el-form-item label="用户名" prop="Account">
                <el-input v-model="form.Account" :readonly="userRole=='submitReceiptsStaff'"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="报单备注" prop="remark">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  v-model="form.remark"
                  :readonly="userRole=='submitReceiptsStaff'"
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
                  :disabled="disable"
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
                  :disabled="disable"
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
                    :value="item.id"
                  >
                    {{ item.patternPayment }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="用户名" prop="Account">
                <el-input v-model="form.Account" :readonly="userRole=='submitReceiptsStaff'"></el-input>
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
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

    <el-row :gutter="22">
            <el-col :span="12" v-if="!(this.tidan=='yes')">
              <el-form-item label="合同附件" prop="bargainImgeId">
                <!-- <el-upload
                  :disabled="true"
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
                </el-upload> -->
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
            <el-col :span="12" v-if="!(this.tidan=='yes')">
              <el-form-item label="付款凭证" prop="evidencePaymentImgeId">
                <!-- <el-upload
                  :disabled="true"
                  ref="uploadCharge"
                  class="upload-file"
                  :headers="headers"
                  :action="uploadUrl"
                  :data="{ state: 20, clientId: clientId }"
                  :on-preview="handlePictureCardPreview"
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
                </el-upload> -->
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
                  <div class="upload" @click="bulkImport">
                    <i
                      class="el-icon-download"
                      style="font-size:28px;color:#A1A2A6;"
                    />
                    <span
                      style="display: block;margin-top:2px;color:#A1A2A6;line-height: 20px; font-size:12px;"
                      >下载附件</span
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
        <el-button v-if="(form.endingParagraph == 0||tidan=='oderModify') && userRole.indexOf('salesmanEstate') !== -1" @click="Submit(20)">
          暂存</el-button
        >
        <el-button
          type="primary"
          @click="Submit(10)"
          v-if="(form.endingParagraph == 0||tidan=='oderModify'||specialStatus==20) && userRole.indexOf('salesmanEstate') !== -1"
          >提交</el-button
        >
        <!-- 如果尾款金额不为0，按钮为特殊审批和尾款收费，否则的话就是暂存和提交 -->
        <el-button
          type="warning"
          @click="handleSpecial"
          v-if="form.endingParagraph > 0?form.specialApproval==''?false:true:false"
        >
          特殊审批</el-button
        >
        <el-button
          type="primary"
          @click="handleBalance(form.orderId)"
          v-if="form.endingParagraph > 0?form.finalPayment ==''?false:true:false "
          >尾款收费</el-button
        >

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
            :data="{clientId:clientId,type:this.form.businessType}"
            :headers="headers"
            :on-change="uploadingTrigger"
            :on-remove="handleRemove"
            accept=".xls,.xlsx"
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
        <el-button @click="uploadingFile=false">取 消</el-button>
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
    </el-dialog>

    <!-- 特殊审批 -->
    <el-dialog width="516px" title="特殊审批" :visible.sync="specialShow">
      <div class="step-vi">
        <steper
          :step-list="stepList"
          :active="active"
        ></steper>
      </div>
      <div class="special">
        <el-form :inline="true" :model="form">
          <el-form-item label="申请理由">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4 }"
              placeholder="请输入申请理由"
              v-model="form.applicationReason"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="申请人:" prop="roles" class="applicant">
            <!-- <el-input v-model="roles"></el-input> -->
            <span>{{ roles }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div style="display:flex;justify-content: flex-end;">
        <el-button @click="specialShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确认发起</el-button>
      </div>
    </el-dialog>

    <!-- 尾款收费 -->
    <el-dialog width="516px" title="尾款收费" :visible.sync="balanceShow">
      <div class="balance">
        <el-form v-model="balanceForm"  ref="balanceForm">
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
                  @change="advanceUpdate"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
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
            </el-col> -->
                <el-col :span="12">
              <el-form-item
                label="所属地区"
                prop="payCode"
                style="height:67px"
              >
                <el-cascader
                  placeholder="请选择所属地区"
                  style="width: 100%"
                  size="small"
                  :options="areaOptions"
                  v-model="balanceForm.payCode"
                  @change="handleRegionChange"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收款方式" prop="paymentMethod">
                <el-select
                  v-model="balanceForm.paymentMethod"
                  placeholder="请选择收款方式"
                  @change="payment(balanceForm.paymentMethod)"
  
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
                  v-model="balanceForm.accountName"
                  @change="accountNameChange(balanceForm.accountName)"
                  placeholder="请选择收款方式"
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
              <el-form-item label="收款账号" prop="account">
                <el-select
                  v-model="balanceForm.account"
                  placeholder="请选择收款账号"
                  @change="AccountChange(balanceForm.account)"
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
            <!-- v-if="balanceForm.bankType==10" -->
              <el-col :span="12" >
              <el-form-item label="开户行" prop="accountBank">
                 <el-select
                  v-model="balanceForm.accountBank"
                  placeholder="请选择开户行"
                  @change="BankChange(balanceForm.accountBank)"
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
          </el-row>
        </el-form>
      </div>
      <div class="btn">
        <el-button @click="balanceShow = false">取 消</el-button>
        <el-button type="primary" @click="handleCharge">确认收费</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { mapState } from "vuex";
import {
  findNotSubmitOrder,
    downloadAccount,
  SpecialSubmission,
  BalancePaymentEcho,
  SubmitBalancePayment,
  PaymentMethod,
  SubmitForReview,
  SpecialApproval,
   ModifyOrder,
  } from "../../../api/crm/HouseBillOfLading/HouseBillOfLading";
import {
  templateDownload,
  GetPaymentMethod,
  GetAccountNumber
} from "../../../api/crm/createHouseOrder/createHouseOrder";
import {
  regionData,
   CodeToText,
} from "element-china-area-data";
import { throttle } from "@/utils/hmt";
import { bringOrder } from "../../../api/crm/houseProperty/billOfLading";
import {ModificationOfDeclaration} from "../../../api/crm/houseProperty/declarationForm"
export default {
  components: {
    ElImageViewer
  },
  name: "HousePlaceOrder",
  props: {
    HousePlaceOrderShow: {
      type: Boolean,
      default: false
    },
    houseId: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      yesNoList: [
        { label: "Y", dictName: "是" },
        { label: "N", dictName: "否" }
      ],
      items: [],
      clientId: null,
      textarea2: null,
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      roles: [],
      userRole:[],
      uploadUrl:
        process.env.VUE_APP_BASE_API + "/hmkj-crm/houproImgfile/upload",
      headers: { Authorization: _getSessionStore(tokenKey) },
      fileUrl: process.env.VUE_APP_FILE_API,
      fileList: [], //文件上传数据
       importFileUrl:
        process.env.VUE_APP_CRM_API +
        "/hmkj-crm/houproOrderCustomerAccount/bulkImport",
      showDialog: false,
      uploadingFile: false, //上传
      importFileList: [], //导入数据
      showDialog: false,
      tidan: "",
     specialStatus:null, 
      houseFormId: null,
      houproOrderCustomerAccountList: [],
      form: { Account: "" },
       //收费支付时间
      PaymentTime: "",
      //审核步骤
      stepList: [],
      //特殊审批弹窗
      specialShow: false,
  
      //尾款收费弹窗
      balanceShow: false,
      //尾款收费
      balanceForm: {},
      //客户类型
      houseCustomerTypeList: [],
      //业务类型
      houseBusinessTypeList: [],
  
      //签单类型
      signatureTypeList: [],
      //套餐类型
      houproPackageList: [],
      //支付类型
      houproPaymentSettingList: [],
      // 步骤条
      active: 0,
      //付款凭证
      voucherImgList: [],
      //合同附件
      contractImgList: [],
       //合同附件
      contractImgList: [],
      areaOptions: regionData, //区域数据
      //支付账号
      CollectioAccountList: [],
      //开户行
      bankOfDepositList:[],
      //尾款支付方式
      PaymentMethodList: [],
       //支付户名
      accountNameList: [],
      PaymentNameList: [],
      disable : true
    };
  },
  watch: {
    HousePlaceOrderShow(oldVal, newVal) {
      this.showDialog = this.HousePlaceOrderShow;
    }
  },
  created() {
    this.roles = this.userInfo.name;
    this.userRole= this.userInfo.roleCodes;
    //客户类型
    this.getDicts("house_customer_type").then(res => {
      this.houseCustomerTypeList = res.data;
      });
    //业务类型
    this.getDicts("house_business_type").then(res => {
      this.houseBusinessTypeList = res.data;
    });

    this.getDicts("signature_type").then(res => {
      this.signatureTypeList = res.data;
      });
  },
  computed: {
    balance() {
      this.form.endingParagraph =
        this.form.amountReceivable - this.form.amountReceived;
    },
    ...mapState({
      userInfo: state => state.user
    })
  },
  methods: {
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("changeShow", "false");
    },
      handleRegionChange(value) {
      this.balanceForm.paymentTerm = "",
      this.balanceForm.account = "",
      this.balanceForm.accountBank="";
       this.balanceForm.accountName = "";
       this.balanceForm.paymentMethod='';
      this.balanceForm.payCode = value;
      this.CollectioAccountList = [];
      this.bankOfDepositList = []
        this.houproPaymentSettingList=[];
        this.accountNameList = [];
      this.balanceForm.payProvince= CodeToText[value[0]];
      this.balanceForm.payCity = CodeToText[value[1]];
      this.balanceForm.payCounty= CodeToText[value[2]];
      this.balanceForm.region = this.balanceForm.payProvince + this.balanceForm.payCity + this.balanceForm.payCounty;
    
      GetPaymentMethod({
        type: 20,
        province: this.balanceForm.payProvince,
        city: this.balanceForm.payCity
      }).then(response => {
        this.houproPaymentSettingList = response.data;
      });
    },
    //确认尾款收费支付时间
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
      if (this.balanceForm.receiptTime > this.PaymentTime) {
        this.msgError("支付时间不能大于当前时间");
        return (this.balanceForm.receiptTime = "");
      }
    },
    //收款时间
    CollectionTimeUpdate() {
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
    //大客户添加用户名
    onAdd() {
        if(this.userRole=='submitReceiptsStaff'){
    //  console.log(v);
      }else{
      this.items.push("");
      }
    },
    //大客户删除用户名
    onDel(i) {
      if(this.userRole=='submitReceiptsStaff'){

  // console.log(v);
      }else{
this.items.splice(i, 1);
this.form.houproOrderCustomerAccountList.splice(i,1);
      }
      
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
  //   //收款方式
  //  payment() {
  //     let paymentId;
  //     this.form.payAccount = "",
  //     this.houproPaymentSettingList.forEach(item => {
  //       if (this.form.paymentTerm == item.patternPayment) {
  //         this.form.currentRate = item.currentRate;
  //         paymentId = item.id;
  //       }
  //     });
  //     this.CollectioAccountList =[]
  //     GetAccountNumber({ parentId: paymentId }).then(response => {
  //       this.CollectioAccountList = response.data;
  //       console.log(this.CollectioAccountList);
  //     });
  //   },

 //收款方式
    payment(val) { 
      this.balanceForm.account = "";
      this.balanceForm.accountBank="";
        this.balanceForm.accountName = "";

        let paymentId = '';
        this.houproPaymentSettingList.forEach(item => {  
          if (this.balanceForm.paymentMethod == item.patternPayment) {
            paymentId = item.id;
          }
        });
     this.CollectioAccountList = [];
     this.bankOfDepositList = []
      GetAccountNumber({ parentId: paymentId }).then(response => {
        this.accountNameList = [];
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
      this.balanceForm.account = "";
      this.balanceForm.accountBank="";
      this.CollectioAccountList = [];
      this.bankOfDepositList = []
      this.PaymentNameList.forEach(item => {
        if (
          item.accountName == val &&
          item.patternPayment == this.balanceForm.paymentMethod
        ) {
          this.CollectioAccountList.push(item);
           this.bankOfDepositList.push(item);
        }
      });

    },
       AccountChange(val){
     this.bankOfDepositList.forEach(item=>{
  if(val==item.payAccount){
   this.balanceForm.accountBank = item.accountBank
  }
})
    },
       //开户行
BankChange(val){
this.CollectioAccountList.forEach(item=>{
  if(val==item.accountBank){
   this.balanceForm.account = item.payAccount
  }
})
},
    //提单回显
    echo(row) {
      this.tidan = row.tidan;
      this.specialStatus  = row.specialStatus
      this.clientId = row.clientId;
      if (row.tidan == "no") {
        this.disable =true
        findNotSubmitOrder(row).then(response => {
          let data = response.data;
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
          this.voucherImgList = [];
          this.contractImgList = [];
          if(data.houproImgfileList.length !== 0){
          data.houproImgfileList.forEach(item => {
            if (item.name == "付款凭证") {
              this.voucherImgList.push(item);
            } else if (item.name == "合同附件") {
              this.contractImgList.push(item);
            }
          });
          }
          this.houproOrderCustomerAccountList =
            data.houproOrderCustomerAccountList;
          this.houproPaymentSettingList = data.houproPaymentSettingList;
          this.houproPackageList = data.houproPackageList;
          if (data.houproOrderCustomerAccountList.length == 0) {
            data.Account = "";
          } else if (data.houproOrderCustomerAccountList.length == 1) {
            data.Account =
              data.houproOrderCustomerAccountList[0].rechargeAccount;
          } else {
            data.Account =
              data.houproOrderCustomerAccountList[0].rechargeAccount;
            let houproOrderCustomerAccountList = data.houproOrderCustomerAccountList.slice(
              1
            );
            this.items = [];
            houproOrderCustomerAccountList.forEach(item => {
              this.items.push(item.rechargeAccount);
            });
          }
          this.form = data;
        });
      }else if(row.tidan =="oderModify"){
        this.houseFormId = row.id;
         this.disable = false;
        ModificationOfDeclaration(row).then(response => {
          let data = response.data;
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
          this.voucherImgList = [];
          this.contractImgList = [];
          if (data.houproImgfileList.length !== 0) {
            data.houproImgfileList.forEach(item => {
              if (item.name == "付款凭证") {
                this.voucherImgList.push(item);
              } else if (item.name == "合同附件") {
                this.contractImgList.push(item);
              }
            });
          }
          this.houproOrderCustomerAccountList =
            data.houproOrderCustomerAccountList;
          this.houproPaymentSettingList = data.houproPaymentSettingList;
          this.houproPackageList = data.houproPackageList;
          if (data.houproOrderCustomerAccountList.length == 0) {
            data.Account = "";
          } else if (data.houproOrderCustomerAccountList.length == 1) {
            data.Account =
              data.houproOrderCustomerAccountList[0].rechargeAccount;
          } else {
            data.Account =
              data.houproOrderCustomerAccountList[0].rechargeAccount;
            let houproOrderCustomerAccountList = data.houproOrderCustomerAccountList.slice(
              1
            );
            this.items = [];
            houproOrderCustomerAccountList.forEach(item => {
              this.items.push(item.rechargeAccount);
            });
          }
          this.form = data;
        });
      }
    },
    //提交订单
    Submit: throttle(function(row) {
      this.form.houproOrderCustomerAccountList = [];
      let temp = {
        beginTime: "",
        businessType: this.houproOrderCustomerAccountList[0].businessType,
        clientId: this.houproOrderCustomerAccountList[0].clientId,
        clientName: this.houproOrderCustomerAccountList[0].clientName,
        createId: this.houproOrderCustomerAccountList[0].createId,
        createName: this.houproOrderCustomerAccountList[0].createName,
        createTime: this.houproOrderCustomerAccountList[0].createTime,
        delSwitch: this.houproOrderCustomerAccountList[0].delSwitch,
        endTime: this.houproOrderCustomerAccountList[0].endTime,
        id: this.houproOrderCustomerAccountList[0].id,
        isEffect: this.houproOrderCustomerAccountList[0].isEffect,
        orderId: this.houproOrderCustomerAccountList[0].orderId,
        packageName: this.houproOrderCustomerAccountList[0].packageName,
        rechargeAccount: "",
        remark: this.houproOrderCustomerAccountList[0].remark,
        startUsing: this.houproOrderCustomerAccountList[0].startUsing,
        ts: this.houproOrderCustomerAccountList[0].ts,
        updateId: this.houproOrderCustomerAccountList[0].updateId,
        updateName: this.houproOrderCustomerAccountList[0].updateName,
        updateTime: this.houproOrderCustomerAccountList[0].updateTime
      };
      temp.rechargeAccount = "";
      if (this.items.length > 0) {
        temp.rechargeAccount = this.form.Account;
        this.form.houproOrderCustomerAccountList.push(temp);
        this.items.forEach(item => {
          let tep = {
            beginTime: "",
            businessType: this.houproOrderCustomerAccountList[0].businessType,
            clientId: this.houproOrderCustomerAccountList[0].clientId,
            clientName: this.houproOrderCustomerAccountList[0].clientName,
            createId: this.houproOrderCustomerAccountList[0].createId,
            createName: this.houproOrderCustomerAccountList[0].createName,
            createTime: this.houproOrderCustomerAccountList[0].createTime,
            delSwitch: this.houproOrderCustomerAccountList[0].delSwitch,
            endTime: this.houproOrderCustomerAccountList[0].endTime,
            id: this.houproOrderCustomerAccountList[0].id,
            isEffect: this.houproOrderCustomerAccountList[0].isEffect,
            orderId: this.houproOrderCustomerAccountList[0].orderId,
            packageName: this.houproOrderCustomerAccountList[0].packageName,
            rechargeAccount: "",
            remark: this.houproOrderCustomerAccountList[0].remark,
            startUsing: this.houproOrderCustomerAccountList[0].startUsing,
            ts: this.houproOrderCustomerAccountList[0].ts,
            updateId: this.houproOrderCustomerAccountList[0].updateId,
            updateName: this.houproOrderCustomerAccountList[0].updateName,
            updateTime: this.houproOrderCustomerAccountList[0].updateTime
          };
          tep.rechargeAccount = item;
            if(temp.rechargeAccount !=''){
 this.form.houproOrderCustomerAccountList.push(tep);
          }
        });
      } else {
        this.houproOrderCustomerAccountList[0].rechargeAccount = this.form.Account;
        this.form.houproOrderCustomerAccountList = this.houproOrderCustomerAccountList;
      }
      this.form.ts = row;
      if(this.tidan=="modify"){
bringOrder(this.form).then(response => {
             this.showDialog = false;
           this.$parent.getList();
      })
      }else if(this.tidan =="oderModify"){
        ModifyOrder(this.form).then(response=>{
           this.showDialog = false;
            this.$parent.getList();
        })
      }else 
      // if (this.form.immediatelyType == "N" && this.form.endingParagraph > 0 && this.specialStatus!=20) {
      //   this.specialShow = true;
      // } else
      {
         bringOrder(this.form).then(response => {
          this.showDialog = false;
           this.$parent.getList();
      })
      }
    }),
    //特殊审批
    handleSpecial() {
      this.specialShow = true;
       this.stepList = [{ name: "创建审批" }];
       SpecialApproval().then(response=>{
         let arr=[]
arr = Object.values(response.data)
arr.forEach(item=>{
  let temp={}
  temp.name = item+'审批'
  this.stepList.push(temp)
})
       })     
    },

    //特殊审批提交
    confirm: throttle(function() {
      SpecialSubmission(this.form).then(item => {
        this.specialShow = false;
        this.showDialog = false;
         this.$parent.getList();
      });
    }),
    next() {
      if (this.active++ > 3) this.active = 0;
    },
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

    // 上传确定按钮
    submitFormUploading() {
      this.$refs.importUpdateFile.submit();
    },
    //尾款收费
    handleBalance(id) {
      this.Submit(20)
      this.reset();
       this.$nextTick(() => {
        this.$refs.uploadCharge.clearFiles();
      });
      this.balanceShow = true;
      BalancePaymentEcho({ id: id }).then(response => {
        this.balanceForm.amountReceivable = response.data;
      });

      PaymentMethod(this.balanceForm).then(response => {
        this.PaymentMethodList = response.data;
      });
    },
    //确认尾款收费
    handleCharge: throttle(function() {
      this.balanceForm.houproOrderDeclareParam = this.form;
       this.balanceForm.payCounty = this.form.payCounty;
         this.balanceForm. payProvince = this.form. payProvince;
         this.balanceForm.payCity = this.form.payCity;
// this.balanceForm.payCode = this.form.payCode;

      SubmitBalancePayment(this.balanceForm).then(response => {
        this.balanceShow = false;
        this.showDialog = false;
        this.$parent.getList();
      });
    }),
    //提单员提单审核提交
    reject(row) {
      this.form.status = row;
      SubmitForReview({
        status: row,
        remark: this.form.remarks,
        id: this.houseFormId,
        type: this.form.clientType
      }).then(response => {
        this.showDialog = false;
        this.$parent.getList();
      });
    },

    downloadExcel(res, fileName = "未命名.xls") {
      debugger;
      const a = document.createElement("a");
      const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);
      a.setAttribute("href", url);
      a.setAttribute("download", fileName);
      a.click();
    },
    async bulkImport() {
      const res = await downloadAccount({ id: this.houseId });
      this.downloadExcel(res, "房产提单用户名列表.xls");
    },
   // 表单重置
    reset() {
      this.balanceForm = {
        receiptTime:'',
        amountReceivable:'',
        paymentMethod: '',
        account: '',
        remarks:'',
        imageIds: '',
      };
      this.resetForm("balanceForm");
    },
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
<style lang="scss" scoped>
.house {
  height: 602px;
  overflow: auto;
  margin-left: 0px;
  margin-right: 0px;
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
.step_vi {
  padding: 0px !important;
}
</style>

<style lang="scss">
.HousePlaceOrder {
  .createOrder {
    .el-dialog {
      background: #f5f6f8 !important;
    }

    .house {
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
  }

  .special {
    margin-top: 25px;
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
        }
      }
      .el-step .is-horizontal {
        :nth-child(4) {
          flex-basis: 0px !important;
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
  .imgStyle {
    display: flex;
    flex-direction: row;

    .el-image > img {
      width: 70px;
      height: 50px;
      margin-right: 10px;
    }
  }
}
</style>
