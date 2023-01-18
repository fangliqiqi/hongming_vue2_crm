<template>
  <div class="edit_company">
    <div class="company_vi bgfff">
      <div class="title_vi">
        <span>工商信息</span>
        <div>
          <el-button
            type="primary"
            plain
            :disabled="readonly"
            @click="relevanceYZF"
            v-if="!companyInfo.qyid"
            >关联云帐房</el-button
          >
          <el-button type="primary" plain :disabled="readonly"
            >创建关联企业</el-button
          >
        </div>
      </div>
      <el-form label-position="top" :model="companyInfo">
        <el-row :gutter="22">
          <el-col :span="8">
            <el-form-item label="公司名称">
              <el-input
                v-model="companyInfo.companyName"
                :readonly="readonly"
                @change="updateAndContactForm({ companyName: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记注册类型">
              <el-select
                v-model="companyInfo.registrationType"
                placeholder="请选择登记注册类型"
                @change="updateAndContactForm({ registrationType: $event })"
              >
                <el-option
                  v-for="item in registrationList"
                  :key="item.dictCode"
                  :label="item.dictLabel"
                  :value="item.dictLabel"
                >
                </el-option>
              </el-select>
              <!-- <el-input
                placeholder="请输入登记注册类型"
                v-model="companyInfo.registrationType"
                :readonly="readonly"
                @change="updateAndContactForm({ registrationType: $event })"
              >
              </el-input> -->
            </el-form-item>
          </el-col>

          <el-col :span="8" v-for="item in personnelResults">
            <el-form-item
              label="法定代表人"
              v-if="item.shareholderPositionType == 10"
            >
              <el-input
                placeholder="请输入法定代表人"
                v-model="item.name"
                :readonly="readonly"
                @change="
                  prepForm({
                    name: $event,
                    id: item.id,
                    shareholderPositionType: 10,
                  })
                "
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col
            :span="8"
            v-for="(item, index) in personnelResults"
            :key="index"
          >
            <el-form-item
              v-if="item.shareholderPositionType == 10"
              label="法人证件号"
              prop="legalPersonCertificate"
            >
              <el-input
                placeholder="请输入法定法人证件号"
                v-model="item.legalPersonCertificate"
                :readonly="readonly"
                @change="
                  prepForm({
                    legalPersonCertificate: $event,
                    id: item.id,
                    shareholderPositionType: 10,
                  })
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-for="item in personnelResults">
            <el-form-item
              v-if="item.shareholderPositionType == 10"
              label="法人联系方式"
              prop="legalPersonCertificate"
            >
              <el-input
                v-model="item.mobile"
                :readonly="readonly"
                @change="
                  prepForm({
                    mobile: $event,
                    id: item.id,
                    shareholderPositionType: 10,
                  })
                "
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="注册资本">
              <el-input
                placeholder="请输入注册资本"
                class="text_wan"
                :readonly="readonly"
                v-model="companyInfo.registeredCapital"
                @change="updateAndContactForm({ registeredCapital: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实收资本">
              <el-input
                placeholder="请输入实收资本"
                class="text_wan"
                :readonly="readonly"
                v-model="companyInfo.paidAmount"
                @change="updateAndContactForm({ paidAmount: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="社会信用代码">
              <el-input
                placeholder="请输入社会信用代码"
                :readonly="readonly"
                v-model="companyInfo.enterpriseNumber"
                @change="updateAndContactForm({ enterpriseNumber: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记机关">
              <el-input
                :readonly="readonly"
                placeholder="请输入登记机关"
                v-model="companyInfo.registrationAuthority"
                @change="
                  updateAndContactForm({ registrationAuthority: $event })
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="经营期限">
              <el-row>
                <el-col :span="11">
                  <el-date-picker
                    :readonly="readonly"
                    v-model="companyInfo.operatingStarting"
                    @change="
                      updateAndContactForm({ operatingStarting: $event })
                    "
                    type="date"
                    placeholder="经营开始日期"
                  >
                  </el-date-picker>
                </el-col>
                <el-col :span="2" style="text-align: center"> -- </el-col>
                <el-col :span="11">
                  <el-date-picker
                    :readonly="readonly"
                    v-model="companyInfo.operatingEnd"
                    @change="updateAndContactForm({ operatingEnd: $event })"
                    type="date"
                    placeholder="经营结束日期"
                  >
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="16">
            <el-form-item label="经营期限">
              <el-row :gutter="4">
                <el-col :span="11">
                  <el-date-picker
                  :readonly="readonly"
                    v-model="companyInfo.operatingStarting"
                    @change="
                      updateAndContactForm({ operatingStarting: $event })
                    "
                    type="date"
                    placeholder="经营开始日期"
                  >
                  </el-date-picker>
                </el-col>
                <el-col :span="2">
                  ——
                </el-col>
                <el-col :span="11">
                  <el-date-picker
                  :readonly="readonly"
                    v-model="companyInfo.operatingEnd"
                    @change="updateAndContactForm({ operatingEnd: $event })"
                    type="date"
                    placeholder="经营结束日期"
                  >
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col> -->

          <el-col :span="8">
            <el-form-item label="核准日期">
              <el-date-picker
                :readonly="readonly"
                v-model="companyInfo.approvedDate"
                @change="updateAndContactForm({ approvedDate: $event })"
                placeholder="请输入核准日期"
                type="date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记状态">
              <el-select
                v-model="companyInfo.registrationStatus"
                placeholder="请选择登记状态"
                @change="updateAndContactForm({ registrationStatus: $event })"
              >
                <el-option
                  v-for="item in registerList"
                  :key="item.dictCode"
                  :label="item.dictLabel"
                  :value="item.dictCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立日期">
              <el-date-picker
                class="mw100"
                v-model="companyInfo.registerTime"
                type="date"
                :readonly="readonly"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="updateAndContactForm({ registerTime: $event })"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="经营范围">
              <el-input
                type="textarea"
                placeholder="请输入经营范围"
                v-model="companyInfo.businessScope"
                :readonly="readonly"
                @change="updateAndContactForm({ businessScope: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="sub_title_vi">
          <div>
            <div></div>
            <span>股东信息</span>
          </div>
        </div>
        <!-- 未 -->
        <el-row :gutter="22">
          <el-col
            :span="6"
            v-for="item in personnelResults"
            v-if="item.shareholderPositionType == 30"
          >
            <el-form-item label="董事长">
              <el-input
                placeholder="请输入董事长姓名"
                v-model="item.name"
                :readonly="readonly"
                @change="
                  prepForm({
                    name: $event,
                    id: item.id,
                    shareholderPositionType: 30,
                  })
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="6"
            v-for="item in personnelResults"
            v-if="item.shareholderPositionType == 40"
          >
            <el-form-item label="董事">
              <el-input
                placeholder="请输董事姓名"
                v-model="item.name"
                :readonly="readonly"
                @change="
                  prepForm({
                    name: $event,
                    id: item.id,
                    shareholderPositionType: 40,
                  })
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="6"
            v-for="item in personnelResults"
            v-if="item.shareholderPositionType == 20"
          >
            <el-form-item label="监理">
              <el-input
                placeholder="请输入监理姓名"
                v-model="item.name"
                :readonly="readonly"
                @change="
                  prepForm({
                    name: $event,
                    id: item.id,
                    shareholderPositionType: 20,
                  })
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="6"
            v-for="item in personnelResults"
            v-if="item.shareholderPositionType == 50"
          >
            <el-form-item label="经理">
              <el-input
                placeholder="请输入经理姓名"
                v-model="item.name"
                :readonly="readonly"
                @change="
                  prepForm({
                    name: $event,
                    id: item.id,
                    shareholderPositionType: 50,
                  })
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- 新增股东 -->
          <el-col :span="24">
            <div
              style="
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #565759;
                margin-bottom: 12px;
              "
            >
              股东持股比例
            </div>
          </el-col>
          <el-col :span="24" v-for="(item, pindex) in personnelResults">
            <el-row :gutter="22" v-if="item.shareholderPositionType == 60">
              <el-col :span="7" style="margin-bottom: 12px">
                <el-input
                  v-model="item.name"
                  :readonly="readonly"
                  placeholder="请输入股东姓名"
                  @change="updateEmployeeForm({ name: $event, id: item.id })"
                ></el-input>
              </el-col>
              <el-col :span="7">
                <el-input
                  class="text_wan"
                  v-model="item.ratioMoney"
                  :readonly="readonly"
                  placeholder="请输入出资额(万)"
                  @change="
                    updateEmployeeForm({ ratioMoney: $event, id: item.id })
                  "
                ></el-input>
              </el-col>
              <el-col :span="7">
                <el-input
                  class="bfh"
                  v-model="item.ratioShare"
                  :readonly="readonly"
                  placeholder="请输入持股比例"
                  @change="
                    updateEmployeeForm({ ratioShare: $event, id: item.id })
                  "
                ></el-input>
              </el-col>
              <el-col :span="3" style="margin-bottom: 12px">
                <el-button
                  type="text"
                  @click="linkmanDeleteForm(item.id, pindex)"
                  :disabled="personnelResults.length <= 6 || readonly"
                  >删除</el-button
                >
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-button
          class="add-button"
          size="small"
          :disabled="readonly"
          icon="el-icon-plus"
          @click="addShareholder"
          >新增股东</el-button
        >
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="companyInfo.remarks"
                :readonly="readonly"
                placeholder="请输入您的备注信息"
                @change="updateAndContactForm({ remarks: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="company_vi mt20 bgfff">
      <div class="title_vi">
        <span>银行信息</span>
      </div>
      <el-form label-position="top">
        <el-row :gutter="22">
          <el-col :span="24">
            <el-form-item label="基本户开户银行/基本户银行账号">
              <el-input
                placeholder="请输入开户银行/基本户银行账号"
                v-model="bankResult.bankName"
                :readonly="readonly"
                @change="updateBankForm({ bankName: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="基本户银行账号">
              <el-input
                placeholder="请输入您的银行账户"
                v-model="bankResult.bankAccountNumber"
                :readonly="readonly"
                @change="updateBankForm({ bankAccountNumber: $event })"
              ></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </div>
    <div class="company_vi mt20 bgfff">
      <div class="title_vi">
        <span>税务信息</span>
      </div>
      <el-form label-position="top" v-model="marketTaxInforResult">
        <el-row :gutter="22">
          <el-col :span="24">
            <el-form-item label="税务注册地址">
              <el-cascader
                placeholder="请选择税务注册地址"
                style="width: 100%"
                class="mw222"
                size="small"
                :options="areaOptions"
                v-model="companyInfo.district"
                :readonly="readonly"
                @change="handleAreaChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="主管税务机关">
              <el-input
                placeholder="请输入主管税务机关"
                v-model="marketTaxInforResult.authoritiesCharge"
                :readonly="readonly"
                @change="updateTaxForm({ authoritiesCharge: $event })"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="所属税务局">
              <el-input
                placeholder="请输入所属税务局"
                v-model="marketTaxInforResult.authoritiesCharge"
                :readonly="readonly"
                @change="updateTaxForm({ authoritiesCharge: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税务机关地址">
              <el-input
                placeholder="请输入税务机关地址"
                v-model="marketTaxInforResult.authorityAddss"
                :readonly="readonly"
                @change="updateTaxForm({ authorityAddss: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税务专管员">
              <el-input
                placeholder="请输入税务专员名称"
                v-model="marketTaxInforResult.taxCollector"
                :readonly="readonly"
                @change="updateTaxForm({ taxCollector: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专管员联系方式">
              <el-input
                placeholder="请输入专管员联系方式"
                v-model="marketTaxInforResult.taxPhone"
                :readonly="readonly"
                @change="updateTaxForm({ taxPhone: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="财务代表人">
              <el-input
                placeholder="请输入财税代表人"
                v-model="marketTaxInforResult.financeAttache"
                :readonly="readonly"
                @change="updateTaxForm({ financeAttache: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="代表人证件号">
              <el-input
                placeholder="请输入代表人证件号"
                v-model="marketTaxInforResult.financeAttacheNumber"
                :readonly="readonly"
                @change="updateTaxForm({ financeAttacheNumber: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税性质">
              <!-- <el-input
                placeholder="请输入纳税性质"
                v-model="marketTaxInforResult.taxNature"
                :readonly="readonly"
                @change="updateTaxForm({ taxNature: $event })"
              ></el-input> -->
              <el-select
                class="mw222"
                size="small"
                v-model="companyInfo.vatCollection"
                :readonly="readonly"
                placeholder="请选择纳税性质"
                @change="modifyForm({ vatCollection: $event })"
              >
                <el-option
                  v-for="item in vatTypeList"
                  :label="item.name"
                  :value="item.labelId"
                  :key="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税识别号">
              <!-- @change="updateTaxForm({ taxIdentificationNumber: $event })" -->
              <el-input
                placeholder="请输入纳税识别号"
                v-model="companyInfo.enterpriseNumber"
                :readonly="readonly"
                @change="updateAndContactForm({ enterpriseNumber: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="纳税区域">
              <el-cascader
                placeholder="请选择纳税区域"
                style="width: 100%"
                class="mw222"
                size="small"
                :options="areaOptions"
                v-model="companyInfo.district"
                :readonly="readonly"
                @change="handleAreaChange"
              >
              </el-cascader>
              <!-- <el-input
                placeholder="请输入纳税区域"
                v-model="marketTaxInforResult.taxAreaCounty"
                :readonly="readonly"
                @change="updateTaxForm({ taxAreaCounty: $event })"
              ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实名(网报)账号">
              <el-input
                placeholder="请输入账号"
                v-model="marketTaxInforResult.realNameAccount"
                :readonly="readonly"
                @change="updateTaxForm({ realNameAccount: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实名(网报)密码">
              <el-input
                v-model="marketTaxInforResult.realNamePwd"
                :readonly="readonly"
                @change="updateTaxForm({ realNamePwd: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税务登录账号">
              <el-input
                placeholder="请输入税务登录账号"
                v-model="marketTaxInforResult.taxationId"
                :readonly="readonly"
                @change="updateTaxForm({ taxationId: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税务登录密码">
              <el-input
                v-model="marketTaxInforResult.taxationPwd"
                :readonly="readonly"
                @change="updateTaxForm({ taxationPwd: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有税控盘">
              <el-select
                v-model="marketTaxInforResult.controlYn"
                placeholder="请选择是否有税控盘"
                @change="updateTaxForm({ controlYn: $event })"
              >
                <el-option
                  v-for="item in yesOrNoList"
                  :key="item.orderNo"
                  :label="item.dictLabel"
                  :value="item.dictCode"
                >
                </el-option>
                <!-- <el-input
                placeholder="请输入是否有税控盘"
                v-model="marketTaxInforResult.controlYn"
                :readonly="readonly"
                @change="updateTaxForm({ controlYn: $event })"
              ></el-input> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="个税申报密码">
              <el-input
                placeholder="请输入个税申报密码"
                v-model="marketTaxInforResult.incomeTaxPwd"
                :readonly="readonly"
                @change="updateTaxForm({ incomeTaxPwd: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社保账号">
              <el-input
                placeholder="请输入社保账号"
                v-model="marketTaxInforResult.socialSecAccount"
                :readonly="readonly"
                @change="updateTaxForm({ socialSecAccount: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社保密码">
              <el-input
                placeholder="请输入社保密码"
                v-model="marketTaxInforResult.socialSecPwd"
                :readonly="readonly"
                @change="updateTaxForm({ socialSecPwd: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公积金账号">
              <el-input
                placeholder="请输入公积金账号"
                v-model="marketTaxInforResult.providentAccount"
                :readonly="readonly"
                @change="updateTaxForm({ providentAccount: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公积金密码">
              <el-input
                placeholder="请输入公积金密码"
                v-model="marketTaxInforResult.providentPwd"
                :readonly="readonly"
                @change="updateTaxForm({ providentPwd: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="看账账号">
              <el-input
                placeholder="请输入看账账号"
                v-model="marketTaxInforResult.checkAccount"
                :readonly="readonly"
                @change="updateTaxForm({ checkAccount: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="核定税种">
              <el-input
                placeholder="请输入核定税种"
                v-model="marketTaxInforResult.checkRatifyTaxes"
                :readonly="readonly"
                @change="updateTaxForm({ checkRatifyTaxes: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                placeholder="请输入备注"
                v-model="marketTaxInforResult.remarks"
                :readonly="readonly"
                @change="updateTaxForm({ remarks: $event })"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <yuanZhangFang
      :qyid="companyInfo.qyid"
     v-if="companyInfo.qyid" 
    ></yuanZhangFang>
  </div>
</template>

<script>
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import {
  updateAndContact, //企业信息--修改工商信息
  updateEmployee, //企业信息--修改股东信息
  addEmployee, //新增股东
  linkmanDelete, //删除股东
  updateTaxation, //企业信息--修改税务信息
  updateBank, //企业信息--修改银行信息
} from "@/api/crm/EditCompany/EditCompany";
import {
  entrepreneurMessageLiaison, //企业信息
  alterClient, //修改客户信息地址
  ModifyPayTaxes, //修改纳税性质
  createQy, //关联云帐房
} from "@/api/crm/customer/customer";
import { throttle } from "@/utils/hmt";
import { PayTaxes } from "@/api/crm/customer/customer";
import yuanZhangFang from "../yunzhangfang/index"; //云帐房

export default {
  // 接受父组件的值
  props: {
    readonly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    companyInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    vatTypeList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    PayTaxesId: {
      type: [String, Number],
      default: null,
    },
  },
  components: {
    yuanZhangFang,
  },
  name: "EditCompany",
  computed: {
    bankResult() {
      return this.companyInfo.bankResult || {};
    },
    marketTaxInforResult() {
      return this.companyInfo.marketTaxInforResult || {};
    },

    personnelResults() {
      let list = this.companyInfo.personnelResults || [];
      return list.length > 0
        ? list
        : [
            { name: "", shareholderPositionType: 10 },
            { name: "", shareholderPositionType: 20 },
            { name: "", shareholderPositionType: 30 },
            { name: "", shareholderPositionType: 40 },
            { name: "", shareholderPositionType: 50 },
            {
              name: "",
              shareholderPositionType: 60,
              ratioMoney: "",
              ratioShare: "",
            },
          ];
    },
  },
  data() {
    return {
      courseBalanceJudge: false, //科目余额判断条件
      // 查询参数
      queryParams: {
        companyId: null,
        id: null,
      },
      positionIdList: [], //职位字典
      registerList: [], //登记状态
      registrationList: [], //登记注册类型
      yesOrNoList: [], //是否有税盘
      DeleteShareholder: false, //删除股东显示条件
      delObj: {},
      areaOptions: regionData, //区域数据
      taxAreaCounty: null, //纳税区域
      // vatTypeList: [], //纳税性质
      // PayTaxesId: null,
    };
  },
  created() {
    console.info("判断----");
    console.info(this.companyInfo);
    console.info(this.companyInfo.qyid);
    //职位字典
    this.getDicts("post").then((res) => {
      this.positionIdList = res.data;
    });
    //登记注册类型
    this.getDicts("registration_type").then((res) => {
      this.registrationList = res.data;
    });
    //是否有税盘
    this.getDicts("sys_yes_no").then((res) => {
      this.yesOrNoList = res.data;
    });

    this.getDicts("registration_status").then((res) => {
      this.registerList = res.data;
      // console.log(this.registerList);
    });
    // // // 纳税性质
    // this.getDicts("vat_type").then((res) => {
    //   this.vatTypeList = res.data;
    // });
  },
  methods: {
    //修改纳税性质
    modifyForm(data) {
      console.log(this.companyInfo);
      ModifyPayTaxes({
        id: this.PayTaxesId,
        companyId: this.companyInfo.id,
        companyLabel: data.vatCollection,
      }).then((response) => {
        if (response.code === 200) {
          this.entrepreneurMessageList(this.companyInfo.id);
        }
      });
    },
    //  //企业信息
    entrepreneurMessageList(id) {
      entrepreneurMessageLiaison({ id: id, classify: 20 }).then((response) => {
        this.companyInfo = response.data || {};
      });
      // this.companyId
      // this.companyInfo.id
      console.info("企业信息");
      console.info(id);
      console.info(this.companyInfo);
      console.info(this.companyId);
      PayTaxes({ id: id }).then((response) => {
        this.vatTypeList = [];
        this.PayTaxesId = response.data.id;
        response.data.results.forEach((item) => {
          item.child.forEach((ite) => {
            if (ite.selectedType != "") {
              this.form.vatCollection = ite.id;
            }
            let tep = {};
            tep.labelId = ite.id;
            tep.name = ite.name;
            this.vatTypeList.push(tep);
          });
        });
      });
      this.$emit("updateInfo", this.companyInfo.id);
    },
    //企业信息- 工商信息修改
    updateAndContactForm(data) {
      console.info("企业信息- 工商信息修改");
      data.id = this.companyInfo.id;
      updateAndContact(data).then((response) => {
        if (response.code === 200) {
          this.entrepreneurMessageList(this.companyInfo.id);
        }
      });
    },
    // 董事长
    prepForm(data) {
      data.companyId = this.companyInfo.id;
      data.shareholderType = 10;
      updateEmployee(data).then((response) => {});
    },

    //企业信息- 股东信息修改
    updateEmployeeForm(data) {
      let companyId = this.companyInfo.id;
      if (data.id) {
        updateEmployee(data).then((response) => {});
      } else {
        data.shareholderPositionType = 60;
        data.shareholderType = 10;
        data.companyId = companyId;
        addEmployee(data).then((response) => {
          this.entrepreneurMessageList(companyId);
        });
      }
    },
    //地区
    handleAreaChange(value) {
      this.companyInfo.district = value;
      let data = {
        district: value,
        province: CodeToText[value[0]],
        city: CodeToText[value[1]],
        county: CodeToText[value[2]],
      };
      this.companyInfo.province = data.province;
      this.companyInfo.city = data.city;
      this.companyInfo.county = data.county;
      this.updateForm(data);
      this.entrepreneurMessageList(this.companyInfo.id)
    },
    //企业信息- 税务信息修改
    updateTaxForm(data) {
      // console.info(data);
      if (data.vatCollection != null) {
        data.id = this.companyInfo.id;
        return updateAndContact(data).then((response) => {});
      }
      // if (data.taxAreaCounty != null) {
      //   data.taxAreaProvince = CodeToText[data.taxAreaCounty[0]];
      //   data.taxAreaCity = CodeToText[data.taxAreaCounty[1]];
      //   data.taxAreaCounty = CodeToText[data.taxAreaCounty[2]];
      // }
      data.id = this.marketTaxInforResult.id;
      data.companyId = this.companyInfo.id;
      updateTaxation(data).then((response) => {
        if (response.code === 200) {
        }
      });
    },
    //修改
    updateForm(data) {
      data.id = this.companyInfo.id;
      alterClient(data).then((response) => {
        if (response.code === 200) {
        }
      });
    },
    //企业信息- 银行修改
    updateBankForm(data) {
      data.id = this.bankResult.id;
      data.companyId = this.companyInfo.id;
      updateBank(data).then((response) => {
        if (response.code === 200) {
        }
      });
    },
    // 新增股东
    addShareholder() {
      this.companyInfo.personnelResults.push({
        shareholderPositionType: 60,
        name: "",
        ratioMoney: "",
        ratioShare: "",
      });
    },
    //删除股东
    linkmanDeleteForm(id, index) {
      if (id) {
        this.$confirm("是否确认此删除客户信息?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(function () {
            return linkmanDelete({ id: id });
          })
          .then(() => {
            this.msgSuccess("删除成功");
            this.entrepreneurMessageList();
            this.DeleteShareholder = false;
          })
          .catch(function () {});
      } else {
        this.companyInfo.personnelResults.splice(index, 1);
      }
    },
    //关联云帐房
    relevanceYZF() {
      var data = {};
      data.companyId = this.companyInfo.id || "";
      data.qymc = this.companyInfo.companyName || "";
      console.info("关联云帐房");
      console.info(this.companyInfo);
      console.info(this.personnelResults);
      //  法定代表人
      this.personnelResults.forEach((item, index) => {
        if (item.shareholderPositionType == 10) {
          data.fddbrmc = item.name || "";
          // data.fddbrmc=item.legalPersonCertificate
          data.felxfs = item.mobile || "";
          console.info("法定代表人");
          console.info(item.name);
          console.info("法人证件号");
          console.info(item.legalPersonCertificate);
          console.info("法人联系方式");
          console.info(item.mobile);
        }
      });
      // 纳税识别号
      data.nsrsbh = this.companyInfo.enterpriseNumber || "";
      data.jsdlmm = this.marketTaxInforResult.taxationPwd || "";
      data.jsdlyhm = this.marketTaxInforResult.taxationId || "";
      data.gsjsmm = this.marketTaxInforResult.incomeTaxPwd || "";
      data.smdlyhm = this.marketTaxInforResult.realNameAccount || "";
      data.smdlmm = this.marketTaxInforResult.realNamePwd || "";
        // data.nsrzgdm = this.companyInfo.enterpriseNumber || "";
        data.nsrzgdm = '001';
        
        data.kjzz='2'//账套会计准则-暂时写‘2’
        // 获取当年年份
        var nowDate = new Date();
        data.ztqynf=nowDate.getFullYear()//账套启用年份
      console.info("纳税识别号");
      console.info(this.companyInfo.enterpriseNumber);
      // 实名（网报）账号
      console.info("实名（网报）账号");
      console.info(this.marketTaxInforResult.realNameAccount);
      // 实名（网报）密码
      console.info("实名（网报）密码");
      console.info(this.marketTaxInforResult.realNamePwd);
      // 税务登录账号
      console.info("税务登录账号");
      console.info(this.marketTaxInforResult.taxationId);
      // 税务登录密码
      console.info("税务登录密码");
      console.info(this.marketTaxInforResult.taxationPwd);
      // 个税申报密码
      console.info("个税申报密码");
      console.info(this.marketTaxInforResult.incomeTaxPwd);
      createQy(data).then((response) => {
        console.info("请求");
        console.info(response);
      });
    },
  },
};
</script>
<style lang="scss">
// .el-drawer.rtl.edit-vi{
//     z-index: 1000 !important;
// }
// .v-modal{
//   z-index: 2000 !important;
// }
// .el-dialog {
//   z-index: 2020 !important;
// }
.Delete {
  .el-dialog {
    margin-top: 29vh !important;
    .el-dialog__body {
      .box {
        display: flex;
        .iont {
          width: 22px;
          height: 22px;
          line-height: 24px;
          text-align: center;
          background: rgb(231, 166, 107);
          color: #ffffff;
          border-radius: 50%;
          margin-right: 12px;
        }
        .font {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #565759;
          line-height: 24px;
        }
      }
      .button {
        margin-top: 22px;
        text-align: right;
      }
    }
  }
}
</style>
<style scoped>
.edit_company {
  display: flex;
  flex-direction: column;
}
</style>
