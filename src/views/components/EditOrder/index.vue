<template>
  <div class="edit_order">
    <el-dialog
      custom-class="order_dialog"
      width="704px"
      :title="titleName"
      :visible.sync="orderVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div slot="title" class="title-vi">
        <div>
          <div>
            <i class="el-icon-s-opportunity"></i>
          </div>
          <span>{{ titleName }}</span>
        </div>
        <div class="control" v-show="settings && settings.length > 0">
          <el-dropdown @command="command" trigger="hover">
            <span class="el-dropdown-link">
              <i class="el-icon-setting"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdown">
              <el-dropdown-item
                v-for="(item, index) in settings"
                :icon="item.icon"
                :key="item.value || index"
                :disabled="
                  orderType == 60 ||
                  (orderType > 10 &&
                    orderType < 50 &&
                    orderType != 30 &&
                    orderType != 20) ||
                  readonly
                "
                :command="item.value || index"
                >{{ item.lable }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div @click="close"></div>
        </div>
      </div>
      <el-tabs
        v-show="!hiddenTab"
        v-model="activeName"
        :stretch="true"
        @tab-click="handleClick"
      >
        <el-tab-pane label="订单详情" name="detail"></el-tab-pane>
        <!--          <el-tab-pane label="项目" name="second">-->
        <!--            <div class="mih">-->
        <!--              <div class="project_vi bgfff" >-->
        <!--                <el-button class="add-button" icon="el-icon-plus">添加项目</el-button>-->
        <!--                <el-table :data="form.product">-->
        <!--                  <el-table-column label="服务项" ></el-table-column>-->
        <!--                  <el-table-column label="关联订单" ></el-table-column>-->
        <!--                  <el-table-column label="项目状态" ></el-table-column>-->
        <!--                  <el-table-column label="已用天数" ></el-table-column>-->
        <!--                  <el-table-column label="进度" ></el-table-column>-->
        <!--                </el-table>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </el-tab-pane>-->
        <el-tab-pane label="材料附件" name="third">
          <div class="mih">
            <el-alert
              class="tip_vi"
              title="提示：文件可上传jpg、png、jpeg、doc、docx、xls、xlsx、pdf类型文件，每次上传不超过2M"
              type="warning"
              show-icon
              :closable="false"
            >
            </el-alert>
            <el-row
              class="material_science bgfff mt10"
              v-if="serveList.length > 0"
            >
              <el-col
                :span="12"
                class="file_item"
                v-for="(items, index) in serveList"
                :key="index"
              >
                <div class="title_vi">
                  <div class="title">
                    <div>
                      <i class="el-icon-tickets"></i>
                      <span class="ml8">{{ items.serpriceName }}</span>
                      <span
                        >{{ items.isPresented == 10 ? " - 赠送项目" : "" }}
                      </span>
                    </div>
                    <div
                      style="
                        margin-top: 15px;
                        margin-bottom: 15px;
                        cursor: pointer;
                      "
                      @click="MaterialAccessories(items.serpriceName, items.id)"
                    >
                      <img
                        src="../../../assets/image/WORD.png"
                        alt=""
                        style="width: 70px"
                      />
                    </div>
                    <div>
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <el-button
                            v-if="
                              items.richText != '' &&
                              items.auditorState != 10 &&
                              items.dispatchState != 10 &&
                              items.specialApprovalsType != 10 &&
                              !isDiaoDu &&
                              !isNeiZhang
                            "
                            type="warning"
                            plain
                            @click="updateRichText(items.id)"
                            >修改</el-button
                          >
                        </el-col>
                        <el-col :span="8" style="margin-left: 15px">
                          <el-button
                            v-if="items.richText != ''"
                            type="success"
                            plain
                            @click="downloadFiles(items.id)"
                            >下载预览</el-button
                          >
                        </el-col>

                        <el-col :span="8">
                          <el-button
                            v-if="
                              items.richText == '' && !isDiaoDu && !isNeiZhang
                            "
                            type="primary"
                            plain
                            @click="addRichText(items.id)"
                            >添加</el-button
                          >
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-col>
              <!-- <div> -->
              <!-- <el-row :gutter="20">
                    <el-col
                      :span="8"
                      v-for="item in items.serveFileList"
                      :key="item.url"
                    >
                      <div class="file">
                        <el-image
                          :src="item.url"
                          :preview-src-list="
                            items.serveFileList.map(ite => {
                              return ite.url;
                            })
                          "
                          v-if="isImg(item.url)"
                        ></el-image>
                        <a v-else :href="item.url">
                          <span>{{ item.name }}</span>
                        </a>
                      </div>
                    </el-col>

                    <el-col :span="8">
                      <div class="file">
                        <el-upload
                          class="file-uploader upload-file"
                          :disabled="
                            (orderType > 10 &&
                              orderType < 50 &&
                              orderType != 35) ||
                              readonly
                          "
                          :action="fileUrl"
                          :headers="headers"
                          :data="{
                            uploadType: '',
                            companyId: form.companyId,
                            busirecordId: items.id
                          }"
                          ref="serveFileRef"
                          :show-file-list="false"
                          :on-success="
                            (res, file, files) =>
                              handleFileSuccess(res, file, files, {
                                id: items.id
                              })
                          "
                          :before-upload="file => beforeFileUpload(file, '')"
                          :file-list="items.serveFileList"
                        >
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                    </el-col>
                  </el-row> -->
              <!-- </div> -->
            </el-row>
          </div>
        </el-tab-pane>

        <el-tab-pane label="合同附件" name="fourth">
          <div class="mih">
            <el-alert
              class="tip_vi"
              title="提示：文件可上传jpg、png、jpeg、doc、docx、xls、xlsx、pdf类型文件，每次上传不超过2M"
              type="warning"
              show-icon
              :closable="false"
            >
            </el-alert>
            <div class="bgfff mt10">
              <!-- <div class="flex flex-row aic jcb">
                <el-button
                  v-if="contractList.length == 0"
                  class="add-button mt32"
                  icon="el-icon-plus"
                  :disabled="
                    ((orderType > 10 && orderType < 50 && orderType != 35) ||
                      readonly) &&
                    form.specialWhether != 10
                  "
                  @click="addContractFun"
                  >添加合同明细
                </el-button>

                <el-button
                  v-if="contractList.length == 0"
                  class="add-button mt32"
                  icon="el-icon-plus"
                  :disabled="
                    (orderType > 10 && orderType < 50 && orderType != 35) ||
                    readonly
                  "
                  @click="contractPdfShow = true"
                  >生成电子合同
                </el-button>
              </div> -->
              <div
                class="flex flex-row aic jcb"
                v-if="contractList.length == 0"
              >
                <el-button
                  v-if="contractList.length == 0"
                  :disabled="isDiaoDu || isNeiZhang"
                  class="add-button mt32"
                  icon="el-icon-plus"
                  @click="addContractFun"
                  >添加合同明细
                </el-button>

                <el-button
                  v-if="contractList.length == 0"
                  :disabled="isDiaoDu || isNeiZhang"
                  class="add-button mt32 mr32"
                  icon="el-icon-plus"
                  @click="contractPdfShow = true"
                  >生成电子合同
                </el-button>
              </div>

              <div class="file_vi mt20" style="border-top: 1px #e6e7eb solid">
                <div
                  v-show="false"
                  class="file_item"
                  v-for="items in contractList"
                  :key="items.id"
                >
                  <div class="title_vi jcb flex-row">
                    <div class="title">
                      <i class="el-icon-tickets"></i>
                      <span class="ml8">{{ items.controlNo }}</span>
                    </div>
                    <!-- <div v-if="items.conType!='HM'">
                      <el-button
                        plain
                        type="primary"
                        @click="addContractFun(items)"
                        :disabled="
                          (orderType > 10 &&
                            orderType < 50 &&
                            orderType != 35) ||
                          readonly
                        "
                        >修改合同
                      </el-button>
                    </div> -->
                  </div>
                  <div>
                    <el-row :gutter="20" type="flex">
                      <el-col
                        :span="8"
                        v-for="item in items.marketCompbusiImgfileResults"
                        :key="item.id"
                      >
                        <div class="file">
                          <el-image
                            :src="filePath + item.url"
                            :preview-src-list="
                              items.marketCompbusiImgfileResults.map((ite) => {
                                return filePath + ite.url;
                              })
                            "
                          ></el-image>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div
                  class="file_item"
                  v-for="items in contractList"
                  :key="items.index"
                >
                  <div class="title_vi jcb flex-row mb20">
                    <div class="title">
                      <i class="el-icon-tickets"></i>
                      <span class="ml8 colorCss">{{ items.controlNo }} </span>
                    </div>
                    <div class="flex-row aic">
                      <el-button
                        plain
                        size="mini"
                        type="primary"
                        @click="viewContractFun(items)"
                        v-if="items.nzAudit == 20 || items.nzAudit == 10"
                        >预览
                      </el-button>
                      <el-button
                        plain
                        size="mini"
                        type="danger"
                        @click="delContractFun(items)"
                        v-if="items.nzAudit == '' || items.nzAudit == 30"
                        >作废
                      </el-button>
                      <el-button
                        type="primary"
                        @click="reviseContractFun(items)"
                        v-if="items.nzAudit == '' || items.nzAudit == 30"
                        size="mini"
                        plain
                        >修改合同
                      </el-button>
                      <el-button
                        v-if="items.nzAudit == 20"
                        :disabled="items.changeGeneralStatus == 10"
                        type="warning"
                        @click="changeContractFun(items)"
                        size="mini"
                        plain
                        >变更
                      </el-button>
                    </div>
                    <!-- <div class="flex-row aic">
                      <el-button
                        v-if="items.conType == 'HM'"
                        plain
                        type="primary"
                        @click="viewContractFun(items)"
                        :disabled="
                          (orderType > 10 &&
                            orderType < 50 &&
                            orderType != 35) ||
                          readonly
                        "
                        >预览
                      </el-button>

                      <el-button
                        plain
                        size="mini"
                        type="danger"
                        @click="delContractFun(items)"
                        :disabled="
                          (orderType > 10 &&
                            orderType < 50 &&
                            orderType != 35) ||
                          readonly
                        "
                        >作废
                      </el-button>
                      <el-button
                        v-if="
                          items.orderType == 30 ||
                          (items.orderType == 40 && items.conType != 'HM')
                        "
                        type="primary"
                        @click="reviseContractFun(items)"
                        size="mini"
                        plain
                        >修改合同
                      </el-button>
                      <el-button
                        v-if="items.nzAudit == 20"
                        :disabled="items.changeGeneralStatus == 10"
                        type="warning"
                        @click="changeContractFun(items)"
                        size="mini"
                        plain
                        >变更
                      </el-button>

                    </div> -->
                  </div>
                  <el-form
                    label-width="100px"
                    style="width: calc(100% - 100px)"
                  >
                    <el-row :gutter="24">
                      <el-col :span="24"
                        ><el-form-item
                          label="服务项目"
                          label-width="120"
                          label-positio="left"
                          ><span>{{
                            items.serviceItems ||
                            items.marketBusirSerprices
                              .map((item) => item.serpriceName)
                              .join(" / ")
                          }}</span></el-form-item
                        ></el-col
                      >
                      <el-col :span="12"
                        ><el-form-item
                          label="合同金额:"
                          label-width="120"
                          label-positio="left"
                          ><span>{{ items.money }}元</span></el-form-item
                        ></el-col
                      >
                      <el-col :span="12"
                        ><el-form-item
                          label="合同有效期:"
                          label-width="120"
                          label-positio="left"
                          ><span
                            >{{
                              parseTime(
                                items.servicePeriodStart,
                                "{y}-{m}-{d}"
                              )
                            }}至{{
                              parseTime(items.servicePeriodEnd, "{y}-{m}-{d}")
                            }}</span
                          ></el-form-item
                        ></el-col
                      >
                      <el-col :span="12"
                        ><el-form-item
                          label="签约时间:"
                          label-width="120"
                          label-positio="left"
                          ><span>{{
                            parseTime(items.signingDate, "{y}-{m}-{d}")
                          }}</span></el-form-item
                        ></el-col
                      >
                      <!-- <el-col :span="12"
                        ><el-form-item
                          label="合同生效期"
                          label-width="120"
                          label-positio="left"
                          ><span>
                            {{parseTime(
                                items.servicePeriodStart,
                                "{y}-{m}-{d}"
                              )}}
                            </span></el-form-item
                        ></el-col
                      > -->
                      <el-col :span="12"
                        ><el-form-item
                          label="签单人:"
                          label-width="120"
                          label-positio="left"
                          ><span>{{ items.signBill }}</span></el-form-item
                        ></el-col
                      >
                      <!-- <el-col :span="24"
                        ><el-form-item label="合同文件" label-width="120" label-positio="left"
                          ><span>{{ items.path }}</span></el-form-item
                        ></el-col
                      > -->
                    </el-row>
                  </el-form>

                  <div class="htImg">
                    <el-row :gutter="20" type="flex">
                      <el-col
                        :span="8"
                        v-for="item in items.marketCompbusiImgfileResults"
                        :key="item.id"
                      >
                        <div class="file">
                          <el-image
                            :src="filePath + item.url"
                            :preview-src-list="
                              items.marketCompbusiImgfileResults.map((ite) => {
                                return filePath + ite.url;
                              })
                            "
                          ></el-image>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="订单支出" name="firth">
          <div class="mih">
            <div class="project_vi bgfff">
              <div class="flex-row aic jcb">
                <div class="flex-row aic ml32 fs-14">
                  <i class="el-icon-s-opportunity"></i>
                  <span class="ml8">成本总金额：</span>
                  <span class="col3978e7">{{ sumExpendMoney }}元</span>
                </div>
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  icon="el-icon-plus"
                  class="mr32"
                  @click="expendShow = true"
                  :disabled="
                    (orderType > 10 &&
                      orderType < 50 &&
                      orderType != 35 &&
                      orderType != 25) ||
                    readonly
                  "
                  >添加支出
                </el-button>
              </div>
              <el-table :data="expendList">
                <el-table-column
                  label="支出编号"
                  prop="expendNumber"
                ></el-table-column>
                <el-table-column
                  label="科目代码"
                  prop="accountCode"
                ></el-table-column>
                <el-table-column
                  label="支出类型"
                  prop="expendName"
                ></el-table-column>
                <el-table-column
                  label="支出金额"
                  prop="expendMoney"
                ></el-table-column>
                <el-table-column
                  label="审核状态"
                  prop="reviewerType"
                  :formatter="reviewerTypeFormat"
                ></el-table-column>
                <el-table-column label="支出人" prop="payee"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="回款计划" name="sixth">
          <div class="mih">
            <div class="project_vi bgfff">
              <div class="flex-row aic jcb">
                <div class="flex-row aic ml32 fs-14">
                  <i class="el-icon-s-opportunity"></i>
                  <span class="ml8">回款计划</span>
                </div>
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  class="mr32"
                  @click="modify"
                  :disabled="
                    readonly ||
                    (orderType > 10 &&
                      orderType < 50 &&
                      orderType != 35 &&
                      orderType != 25)
                  "
                  >修改回款计划</el-button
                >
              </div>

              <el-table
                :data="paymentPlanList"
                :show-summary="true"
                class="PaymentCollectionTable"
              >
                <!-- style="overflow-y: scroll;
    white-space: nowrap;
    height: 500px;
" -->
                <el-table-column
                  label="服务项"
                  prop="serpriceName"
                ></el-table-column>
                <el-table-column label="服务时间" width="160">
                  <template slot-scope="scope">
                    {{
                      parseTime(scope.row.receiptTime, "{y}-{m}-{d}") +
                      " ~ " +
                      parseTime(scope.row.endTime, "{y}-{m}-{d}")
                    }}
                  </template>
                </el-table-column>
                <el-table-column label="实际应收" prop="currentRepaymentAmount">
                  <template slot-scope="scope">
                    {{ scope.row.currentRepaymentAmount || 0 }}
                  </template>
                </el-table-column>
                <el-table-column label="优惠金额" prop="discountAmount">
                  <template slot-scope="scope">
                    {{ scope.row.discountAmount || 0 }}
                  </template>
                </el-table-column>
                <el-table-column label="已收金额" prop="amountReceived">
                  <template slot-scope="scope">
                    <span :class="{ 'text-navy': scope.row.state == 20 }">
                      {{
                        scope.row.alreadyMoney ||
                        scope.row.actualPaymentAmount ||
                        0
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="未收金额" prop="amountInArear">
                  <template slot-scope="scope">
                    {{ scope.row.amountInArear || 0 }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收费情况" name="seventh">
          <div class="mih">
            <div class="flex-col bgfff">
              <el-table :data="servMoneyList" :show-summary="true">
                <el-table-column
                  label="服务项"
                  prop="serpriceName"
                ></el-table-column>
                <el-table-column
                  label="总金额"
                  prop="totalMoney"
                ></el-table-column>
                <el-table-column
                  label="优惠金额"
                  prop="discountAmountTotal"
                ></el-table-column>
                <el-table-column
                  label="已收金额"
                  prop="actualPaymentAmount"
                ></el-table-column>
                <el-table-column
                  label="未收金额"
                  prop="amountInArear"
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div
        class="detail_vi"
        :class="{ hidden_tab: hiddenTab }"
        v-show="activeName == 'detail'"
      >
        <steper
          :step-list="typeList"
          :active="stepList.indexOf(20) == -1 ? 3 : stepList.indexOf(20) - 1"
        ></steper>
        <!-- <steper :step-list="typeList" :active="1"></steper> -->
        <div class="order_vi mt20">
          <div class="bgfff flex-col item_full">
            <el-form
              class="mt20 mb10"
              ref="orderForm"
              :model="form"
              :rules="rules"
              size="small"
              :inline="true"
              label-position="top"
            >
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="订单编号">
                    <el-input
                      :readonly="true"
                      v-model="form.orderNo"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="签单时间">
                    <el-date-picker
                      :readonly="true"
                      v-model="form.createDate"
                      type="datetime"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="服务顾问">
                    <el-input
                      :readonly="true"
                      v-model="form.createBy"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item label="调度员">
                    <el-input
                      :readonly="true"
                      v-model="form.dispatch"
                    ></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
              <!-- <el-row :gutter="24" v-if="form.type == 20">
                <el-col :span="12" v-if="false">
                  <el-form-item label="账本费">
                    <el-input
                      :readonly="(orderType > 10 && orderType < 50) || readonly"
                      v-model="form.accountBook"
                      @change="orderUpdate({ accountBook: $event })"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="凭证交接">
                    <el-select
                      :disabled="(orderType > 10 && orderType < 50) || readonly"
                      v-model="form.certificateType"
                      @change="orderUpdate({ certificateType: $event })"
                    >
                      <el-option
                        v-for="item in handoverMode"
                        :label="item.dictName"
                        :key="item.dictValue"
                        :value="item.dictValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row> -->
            </el-form>
          </div>
          <div class="bgfff mt20 flex-col">
            <div class="title_vi">
              <span
                >服务项目 ({{
                  (form.product && form.product.length) || 0
                }})</span
              >
              <div>
                <el-button
                  type="primary"
                  plain
                  size="mini"
                  @click="addServeFun(20)"
                  :disabled="(orderType > 10 && orderType < 50) || readonly"
                  >添加服务项目
                </el-button>
              </div>
            </div>

            <div v-if="form.type == 10">
              <el-table :data="form.product">
                <el-table-column
                  prop="serpriceName"
                  label="服务项"
                ></el-table-column>
                <el-table-column
                  prop="price"
                  label="原价 (元/次)"
                ></el-table-column>
                <!-- <el-table-column
                  prop="discountType"
                  label="折扣与减免"
                  :formatter="
                    row => selectDictLabel(discountTypeList, row.discountType)
                  "
                ></el-table-column> -->
                <el-table-column label="服务时间">
                  <template slot-scope="scope">
                    <span>
                      {{ parseTime(scope.row.startTime, "{y}-{m}-{d}") }} ~
                      {{ parseTime(scope.row.endTime, "{y}-{m}-{d}") }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="moneyReceived"
                  label="实际单价(元/次)"
                  width="120"
                ></el-table-column>
                <!-- :disabled="
                        (orderType > 10 && orderType < 50) ||
                          (scope.row.advanceReviewerType == 20 &&
                            scope.row.type == 20) ||
                          readonly
                      " 企业代账-->

                <el-table-column prop="" label="" align="center" width="80">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="default"
                      icon="el-icon-edit-outline"
                      @click="updateServeFun(scope.row)"
                    ></el-button>
                    <!-- <el-button
                      type="text"
                      size="default"
                      icon="el-icon-delete"
                      :disabled="
                        scope.row.advanceTypeyn == 10 ||
                        (orderType > 10 && orderType < 50) ||
                        (scope.row.advanceReviewerType == 20 &&
                         scope.row.type == 20) ||
                        readonly
                      "
                      @click="
                        delServe({ id: scope.row.id, orderType: form.type })
                      "
                    ></el-button> -->
                    <el-button
                      type="text"
                      size="default"
                      icon="el-icon-delete"
                      @click="
                        delServe({ id: scope.row.id, orderType: form.type })
                      "
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table_sum">
                <span>订单总金额：{{ sumMoney }}元</span>
                <span>(原价{{ sumPrice }}元)</span>
              </div>
            </div>

            <div class="flex-col jcc" v-else>
              <div
                class="table_vi flex-col"
                v-for="items in form.product"
                :key="items.index"
              >
                <div class="sub_title_vi">
                  <div>
                    <div></div>
                    <span>{{ items.serpriceName || "" }}</span>
                    <label
                      >（收费周期：{{
                        selectDictLabel(feesCycleList, items.cycleType)
                      }}）</label
                    >
                  </div>
                  <div>
                    <!-- <el-button
                      type="text"
                      size="default"
                      icon="el-icon-edit-outline"
                      :disabled="
                        (orderType > 10 && orderType < 50) ||
                        (items.advanceReviewerType == 20 && items.type == 20) ||
                        readonly
                      "
                      @click="updateServeFun(items)"
                    ></el-button> -->
                    <el-button
                      type="text"
                      size="default"
                      icon="el-icon-edit-outline"
                      @click="updateServeFun(items)"
                    ></el-button>

                    <el-button
                      type="text"
                      size="default"
                      icon="el-icon-delete"
                      :disabled="
                        items.advanceTypeyn == 10 ||
                        (orderType > 10 && orderType < 50) ||
                        (items.advanceReviewerType == 20 && items.type == 20) ||
                        readonly
                      "
                      @click="delServe({ id: items.id, orderType: form.type })"
                    ></el-button>
                  </div>
                </div>
                <el-table :data="[items]">
                  <el-table-column
                    prop="serpriceName"
                    label="服务项"
                  ></el-table-column>
                  <el-table-column label="服务时间">
                    <template slot-scope="scope">
                      <span>
                        {{ parseTime(scope.row.startTime, "{y}-{m}") }} ~
                        {{ parseTime(scope.row.endTime, "{y}-{m}") }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="原价 (元/年)"
                    prop="price"
                  ></el-table-column>
                  <!-- <el-table-column
                    label="折扣与减免"
                    width="100"
                    prop="discountType"
                    :formatter="
                      row => selectDictLabel(discountTypeList, row.discountType)
                    "
                  ></el-table-column> -->
                  <!-- <el-table-column label="服务时间" prop=""></el-table-column> -->
                  <el-table-column
                    label="实收金额"
                    prop="moneyReceived"
                  ></el-table-column>
                </el-table>
              </div>
              <div class="table_sum">
                <span>订单总金额：{{ sumMoney }}元</span>
                <span>(原价{{ sumPrice }}元)</span>
              </div>
            </div>
          </div>
          <div class="bgfff mt20 flex-col">
            <div class="title_vi">
              <span
                >赠送服务 ({{
                  (form.giveProduct && form.giveProduct.length) || 0
                }})</span
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="addServeFun(10)"
                :disabled="(orderType > 10 && orderType < 50) || readonly"
                >添加服务项目
              </el-button>
            </div>
            <el-table :data="form.giveProduct">
              <el-table-column prop="serpriceId" label="服务项">
                <template slot-scope="scope">
                  <el-cascader
                    :disabled="orderType > 10 && orderType < 50"
                    v-model="scope.row.serpriceId"
                    :options="scope.row.proTypeList"
                    :props="{
                      emitPath: false,
                      label: 'name',
                      value: 'id',
                      children: 'crmIntermSerprices',
                    }"
                    @visible-change="(val) => cascaderShow(val, scope.row)"
                    @change="
                      serveUpdate({
                        serpriceId: $event,
                        id: scope.row.id,
                        orderType: form.type,
                        serpriceName: proTypeName($event),
                      })
                    "
                  ></el-cascader>
                </template>
              </el-table-column>
              <el-table-column label="服务时间">
                <template slot-scope="scope">
                  <span>
                    {{ parseTime(scope.row.startTime, "{y}-{m}-{d}") }} ~
                    {{ parseTime(scope.row.endTime, "{y}-{m}-{d}") }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="price"
                label="原价 (元/次)"
              ></el-table-column>
              <el-table-column prop="" label="" align="center" width="80">
                <template slot-scope="scope">
                  <!-- :disabled="orderType > 10 && orderType < 50"  审核成功-->
                  <el-button
                    type="text"
                    size="default"
                    icon="el-icon-edit-outline"
                    @click="updateServeFun(scope.row)"
                  ></el-button>

                  <el-button
                    :disabled="orderType > 10 && orderType < 50"
                    type="text"
                    size="default"
                    icon="el-icon-delete"
                    @click="
                      delServe({ id: scope.row.id, orderType: form.type })
                    "
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="bgfff mt20 flex-col">
            <div class="title_vi">
              <span
                >预收款 ({{ (form.product && form.product.length) || 0 }})</span
              >
              <!--                <el-button type="primary" plain size="mini" @click="collectionsFun">设置预收款</el-button>-->
            </div>
            <el-table :data="form.product">
              <el-table-column prop="serpriceName" label="服务项">
              </el-table-column>
              <el-table-column prop="paymentAmount" label="未收">
                <template slot-scope="scope">
                  <span>{{ scope.row.advanceArrears || 0.0 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="advanceMoney" label="预收">
                <template slot-scope="scope">
                  <!-- :readonly="
                      scope.row.advanceTypeyn == 10 ||
                        (orderType > 10 && orderType < 50) ||
                        (scope.row.advanceReviewerType == 20 &&
                          scope.row.type == 20) ||
                        readonly
                    " -->
                  <el-input
                    :readonly="true"
                    v-model="scope.row.advanceMoney"
                    placeholder="0.00"
                    @change="
                      advanceUpdate(
                        {
                          advanceMoney: $event,
                          id: scope.row.id,
                          orderType: form.type,
                        },
                        scope.row
                      )
                    "
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="advanceTime"
                label="预收时间"
                min-width="140"
              >
                <template slot-scope="scope">
                  <!-- :readonly="
                      scope.row.advanceTypeyn == 10 ||
                        (orderType > 10 && orderType < 50) ||
                        (scope.row.advanceReviewerType == 20 &&
                          scope.row.type == 20) ||
                        readonly
                    " -->
                  <el-date-picker
                    :readonly="true"
                    @change="
                      advanceUpdate({
                        advanceTime: $event,
                        id: scope.row.id,
                        orderType: form.type,
                      })
                    "
                    :clearable="false"
                    style="width: 136px; max-width: 136px"
                    v-model="scope.row.advanceTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="" label="" align="center" width="100">
                <!-- ((orderType > 10 && orderType < 50) ||
                        (scope.row.advanceReviewerType == 20 &&
                          scope.row.type == 20) ||
                        readonly) &&
                        !isNeiZhang  表单提交后-->
                <template slot-scope="scope">
                  <!-- <el-button
                    type="primary"
                    plain
                    size="mini"
                    @click="collectionsUpdate(scope.row)"
                    >{{
                      ((orderType > 10 && orderType < 50) ||
                        (scope.row.advanceReviewerType == 20 &&
                          scope.row.type == 20) ||
                        readonly) &&
                        isNeiZhang
                        ? "查看详情"
                        : "收款"
                    }}
                  </el-button> -->
                  <el-button
                    type="primary"
                    plain
                    size="mini"
                    @click="collectionsUpdate(scope.row)"
                    >{{
                      orderTypeactive == 10 ||
                      orderTypeactive == 20 ||
                      isNeiZhang
                        ? "查看详情"
                        : "收款"
                    }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="bgfff mt20 flex-col">
            <div class="title_vi">
              <span>订单备注</span>
            </div>
            <div class="remark_vi">
              <el-input
                type="textarea"
                v-model="form.remarks"
                @change="orderUpdate({ remarks: $event })"
              ></el-input>
            </div>
          </div>
          <div
            class="bgfff mt20 flex-col"
            v-if="
              !!(
                form.specialApprovalsType == 10 ||
                form.specialApprovalsType == 20 ||
                form.specialApprovalsType == 50
              )
            "
          >
            <el-row
              class="ml32 mr32 mt10 mb10"
              :gutter="24"
              type="flex"
              align="middle"
            >
              <el-col :span="12">
                <div>
                  <span class="cola1a2a6">特殊审批人：</span>
                  <span class="col565759">{{ form.approverName }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flex-row aic">
                  <span class="cola1a2a6">特殊审批状态：</span>
                  <el-tag
                    type="warning"
                    size="medium"
                    @click="approvalFun(form)"
                  >
                    {{
                      form.specialApprovalsType == 50
                        ? "订单待提交"
                        : selectDictLabel(
                            auditStatusList,
                            form.specialApprovalsType
                          )
                    }}
                  </el-tag>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="warning"
            @click="approvalFun()"
            v-if="
              !(orderType > 10 && orderType < 50) &&
              form.specialWhether != 10 &&
              !readonly
            "
            >特殊审批
          </el-button>
          <!--          <el-button type="warning" @click="unApprovalFun" v-else>撤销审批</el-button>-->
          <el-button
            @click="delOrder"
            v-noRole="['schedulingSupervisor', 'dispatchClerks']"
            v-if="
              (orderType == 60 || !(orderType > 10 && orderType < 50)) &&
              !readonly
            "
            >删除订单
          </el-button>
          <el-button
            type="primary"
            @click="submitFun"
            v-if="
              !(orderType > 10 && orderType < 50 && orderType != 35) &&
              !readonly
            "
            >提交订单
          </el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 续费 -->

    <!-- 富文本编辑器 -->
    <el-dialog
      title="材料附件"
      class="richText"
      :visible.sync="richTextShow"
      width="720px"
      :close-on-click-modal="false"
    >
      <div class="edit_container">
        <el-upload
          class="avatar-uploader"
          :action="fileUrl"
          :data="{
            uploadType: 60,
            companyId: form.companyId,
            busirecordId: richTextId,
          }"
          :headers="headers"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="(file) => beforeUpload(file)"
        >
        </el-upload>
        <!--  新增时输入 -->
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          class="ql-snow ql-editor"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        >
        </quill-editor>
        <!-- 从数据库读取展示 -->
        <div v-html="str" class="ql-editor">
          {{ str }}
        </div>
        <div
          slot="footer"
          class="dialog-footer"
          style="display: flex; justify-content: flex-end"
        >
          <el-button @click="richTextShow = false">取消</el-button>
          <el-button @click="richText()" type="primary">确定</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 添加服务项目-->
    <el-dialog
      width="520px"
      custom-class="serve_dialog item_full"
      :title="serveTitle"
      :visible.sync="serveShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body
    >
      <el-form
        label-position="top"
        :model="serve"
        :rules="serveRules"
        ref="serveForm"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="服务名称" prop="serpriceId">
              <el-cascader
                v-model="serve.serpriceId"
                :options="proTypeList"
                filterable
                :props="{
                  emitPath: false,
                  label: 'name',
                  value: 'id',
                  children: 'crmIntermSerprices',
                }"
                clearable
                @change="proTypeChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="新增服务项目"
              v-if="orderTypeactive == '30' || orderTypeactive == '40'"
            >
              <el-button
                icon="el-icon-plus"
                type="primary"
                plain
                @click="newServeFun"
                >新增服务项目
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="服务时间"
              prop="period"
              v-if="bookFeesType == 20"
            >
              <el-date-picker
                v-model="serve.period"
                type="monthrange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                value-format="yyyy-MM-dd"
                @change="changeServiceTimes(serve.period)"
                :picker-options="serviceTime"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="服务时间" prop="period" v-else>
              <el-date-picker
                v-model="serve.period"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="serve.isPresented == '20'">
            <el-form-item label="收费周期" prop="cycleType">
              <el-select v-model="serve.cycleType">
                <el-option
                  v-for="item in feesCycleList.filter((item) => {
                    return serve.serveType == 10
                      ? item.dictCode == 100
                      : item.dictCode != 100;
                  })"
                  :label="item.dictLabel"
                  :key="item.dictCode"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="原价"
              prop="price"
              style=" margin-bottom: 17px;!important"
            >
              <el-input
                class="yuanc"
                v-model="serve.price"
                placeholder="请输入价格"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="bookFeesType == 20">
            <el-form-item label="账本费">
              <el-input v-model="bookFees" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="bookFeesType == 20">
            <el-form-item
              style="
                height: 67px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
              "
            >
              <el-checkbox v-model="giftItems" @change="(e) => handleBlur(20)"
                >赠送项</el-checkbox
              >
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="serve.isPresented == '20'">
            <el-form-item
              label="实际单价"
              prop="moneyReceived"
              v-if="bookFeesType == 20"
            >
              <el-input
                class="yuanc"
                @change="handleBlur(10)"
                v-model.number="serve.moneyReceived"
                placeholder="请输入价格"
              ></el-input>
            </el-form-item>
            <el-form-item label="实际单价" prop="moneyReceived" v-else>
              <el-input
                class="yuanc"
                v-model.number="serve.moneyReceived"
                placeholder="请输入价格"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="bookFeesType == 20">
            <el-form-item label="是否切老户:" prop="companies">
              <el-radio-group v-model="serve.companies">
                <el-radio v-for="item in yesNoList" :label="item.dictCode" :key="item.index">{{
                  item.dictLabel
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="serveDel">取消</el-button>
        <el-button
          type="primary"
          @click="addServe"
          v-if="orderTypeactive == '30' || orderTypeactive == '40'"
          >保存</el-button
        >
      </div>
    </el-dialog>

    <!--    新增服务产品  -->
    <el-dialog title="新增服务产品" :visible.sync="showDialog" width="516px">
      <el-form
        ref="serviceForm"
        v-model="serviceForm"
        label-position="left"
        label-width="100px"
        maxHeight="612px"
        style="margin-top: 30px"
      >
        <el-form-item label="项目名称">
          <el-input v-model="serviceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属服务项">
          <el-select
            v-model="serviceForm.parentId"
            filterable
            placeholder="请选择所属服务项"
            @change="serviceChange(serviceForm.parentId)"
          >
            <el-option
              v-for="item in serviceList"
              :key="item.id"
              :label="item.businessType"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目价格">
          <el-input v-model="serviceForm.price"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取消 </el-button>
        <el-button type="primary" @click="ConfirmService">确定</el-button>
      </div>
    </el-dialog>
    <!-- 设置整单折扣-->
    <el-dialog
      title="设置整单折扣"
      width="420px"
      :visible.sync="discountShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body
    >
      <el-form>
        <el-form-item label="请输入折扣">
          <el-input
            placeholder="请输入折扣"
            v-model.number="form.discount"
            class="bfh"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="discountShow = false">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </el-dialog>
    <!-- 特殊审批-->
    <el-dialog
      title="特殊审批"
      width="520px"
      :visible.sync="approvalShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body
    >
      <div class="step-vi">
        <steper
          :step-list="[
            { name: '创建审批' },
            { name: '审批审核' },
            { name: '结束' },
          ]"
          :active="
            form.specialApprovalsType == 10
              ? 1
              : form.specialApprovalsType == 20 ||
                form.specialApprovalsType == 30
              ? 2
              : 0
          "
        ></steper>
      </div>
      <el-form :model="approval" :rules="approvalRules" ref="approvalForm">
        <el-form-item label="申请理由" prop="applyContent">
          <el-input
            type="textarea"
            :readonly="
              form.specialApprovalsType == 10 || form.specialApprovalsType == 20
            "
            placeholder="请输入申请理由"
            v-model="approval.applyContent"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请人" prop="approverName">
          <el-input
            type="text"
            :readonly="true"
            placeholder="请输入申请人"
            v-model="approval.approverName"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="approvalShow = false">取消</el-button>
        <el-button
          type="primary"
          @click="approvalSubmit"
          v-if="
            !(
              form.specialApprovalsType == 10 ||
              form.specialApprovalsType == 20 ||
              form.specialApprovalsType == 50
            )
          "
          >确认发起
        </el-button>
      </div>
    </el-dialog>

    <!-- 预收款收费-->
    <el-dialog
      title="预付款收费"
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
        :rules="collectionsRules"
        :model="collections"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="预收金额" prop="advanceActualAmount">
              <el-input
                :disabled="disabled"
                v-model.number="collections.advanceActualAmount"
                type="text"
                placeholder="请输入预收金额"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付时间" prop="advancePaymentTime">
              <el-date-picker
                :disabled="disabled"
                v-model="collections.advancePaymentTime"
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
                :disabled="disabled"
                placeholder="请选择收款所属地区"
                style="width: 100%"
                size="small"
                :options="areaOptions"
                v-model="collections.payCode"
                @change="handleCityCodeChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款方式" prop="paymentMethod">
              <el-select
                :disabled="disabled"
                v-model="collections.paymentMethod"
                @change="payment(collections.paymentMethod)"
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
            <el-form-item label="收款户名" prop="accountName">
              <el-select
                :disabled="disabled"
                v-model="collections.accountName"
                @change="accountNameChange(collections.accountName)"
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
            <el-form-item label="付款账户" prop="account">
              <el-select
                :disabled="disabled"
                v-model="collections.account"
                placeholder="请选择付款账户"
                @change="AccountChange(collections.account)"
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
          <el-col :span="12" v-if="collections.bankType == 10">
            <el-form-item label="开户行" prop="accountBank">
              <el-select
                :disabled="disabled"
                v-model="collections.accountBank"
                placeholder="请选择开户行"
                @change="BankChange(collections.accountBank)"
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
          <!-- <el-col :span="12">
            <el-form-item label="付款账户" prop="account">
              <el-input
                type="text"
                placeholder="请输入付款账户"
                v-model="collections.account"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款方式" prop="paymentMethod">
              <el-select v-model="collections.paymentMethod">
                <el-option
                  v-for="item in paymentMethodOption"
                  :value="item.dictCode"
                  :label="item.dictLabel"
                  :key="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收费备注" prop="advanceRemarks">
              <el-input
                :disabled="disabled"
                type="textarea"
                placeholder="请输入备注信息"
                class="minh98"
                v-model="collections.advanceRemarks"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上传附件" prop="advanceFileIds">
          <el-upload
            class="upload-file"
            ref="collectionUpload"
            :headers="headers"
            :action="fileUrl"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :data="{
              uploadType: '',
              companyId: form.companyId,
              busirecordId: collections.id,
            }"
            multiple
            :on-success="
              (res, file, files) =>
                handleFileSuccess(res, file, files, { id: collections.id }, 20)
            "
            :before-upload="(file) => beforeFileUpload(file, '', 20)"
            :file-list="feesList"
            list-type="picture"
            :disabled="isNeiZhang || disabled"
          >
            <el-button
              size="small"
              icon="el-icon-upload2"
              v-if="orderTypeactive == 30 || orderTypeactive == 40"
              >上传附件</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- <div
        slot="footer"
        class="dialog-footer"
        v-if="orderType != 25 && collections.advanceActualAmount != 3000"
      >
        <el-button @click="collectionsShow = false">取消</el-button>
        <el-button
          type="primary"
          @click="updateCollections"
          :disabled="isNeiZhang"
          >确认发起</el-button
        >
      </div> -->
      <div
        slot="footer"
        class="dialog-footer"
        v-if="orderType !== 10 || orderType !== 20"
      >
        <el-button @click="collectionsShow = false">取消</el-button>
        <el-button
          v-if="orderTypeactive == 30 || orderTypeactive == 40"
          type="primary"
          @click="updateCollections"
          :disabled="isNeiZhang"
          >确认发起</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改回款计划 -->
    <el-dialog
      title="修改回款计划"
      width="520px"
      :visible.sync="paymentPlan"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      custom-class="item_full"
    >
      <el-form :model="returnForm" ref="returnForm" :rules="returnRules">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="服务项" prop="id">
              <el-select v-model="returnForm.id" @change="cycleTypeChang">
                <el-option
                  v-for="item in serpriceNameList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.serpriceName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="从几月开始修改" prop="payBackTime">
              <el-date-picker
                v-model="returnForm.payBackTime"
                type="month"
                placeholder="选择从几月开始修改"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="收费周期" prop="cycleType">
              <el-select v-model="returnForm.cycleType">
                <el-option
                  v-for="item in feesCycleList"
                  :label="item.dictLabel"
                  :key="item.dictCode"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paymentPlan = false">取消</el-button>
        <el-button type="primary" @click="paymentCollection"
          >确认修改</el-button
        >
      </div>
    </el-dialog>

    <!-- 合同 -->
    <edit-contract
      :visible.sync="contractShow"
      :orderId="orderId"
      :contractId="contractId"
      :order="form"
    ></edit-contract>

    <!-- 支出   -->
    <edit-expend
      :visible.sync="expendShow"
      :orderId="orderId"
      :expendId="expendId"
      :order="form"
    ></edit-expend>
    <el-dialog
      :title="MaterialAccessoriesTitle"
      width="704px"
      class="MaterialAccessories"
      :visible.sync="MaterialAccessoriesShow"
    >
      <div style="height: 820px; overflow: auto" v-html="this.content"></div>
    </el-dialog>

    <!-- 图片放大 -->
    <el-image-viewer
      zIndex="3000"
      v-if="dialogVisible"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
    <contract-pdf
      :visible.sync="contractPdfShow"
      :orderId="orderId"
      @close="closePdf"
    ></contract-pdf>
    <pdf-show :visible.sync="pdfShow" :url="pdfUrl"></pdf-show>
    <!-- 修改合同 -->
    <el-dialog
      :title="heText"
      :visible.sync="reviseContractJudge"
      width="704px"
      append-to-body
      custom-class="renew"
    >
      <el-form
        ref="form"
        :model="reviseContractForm"
        :rules="rules"
        label-position="top"
        class="chengjiao"
      >
        <el-row :gutter="24">
          <!-- <el-col :span="12" v-if="!!reviseContractForm.id">
            <el-form-item label="合同编号">
              <el-input v-model="reviseContractForm.controlNo" placeholder="请输入合同编号" />
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="签约时间" prop="signingDate">
              <el-date-picker
                v-model="reviseContractForm.signingDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择签约时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同生效期" prop="validity">
              <el-date-picker
                type="date"
                v-model="reviseContractForm.validity"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择合同生效期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同开始时间" prop="servicePeriodStart">
              <el-date-picker
                type="date"
                v-model="reviseContractForm.servicePeriodStart"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择合同开始时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同停止时间" prop="servicePeriodEnd">
              <el-date-picker
                type="date"
                v-model="reviseContractForm.servicePeriodEnd"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择合同停止时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额" prop="money">
              <el-input
                class="yuan"
                v-model="reviseContractForm.money"
                placeholder="请输入合同金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="添加合同附件" prop="imgfileIds">
              <!-- <el-upload
                class="upload-file"
                ref="contractFile"
                :action="fileUrl"
                :headers="headers"
                :data="{
                  uploadType: '',
                  companyId: order.companyId,
                  busirecordId: orderId
                }"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :on-success="
                  (res, file, files) =>
                    handleFileSuccess(res, file, files, { id: form.id })
                "
                :before-upload="file => beforeFileUpload(file, '')"
                :on-change="fileChange"
                :file-list="fileList"
                list-type="picture"
              > -->
              <el-upload
                class="upload-file"
                ref="collectionUpload"
                :headers="headers"
                :action="fileUrl"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :data="{
                  uploadType: '',
                  companyId: form.companyId,
                }"
                multiple
                :on-success="
                  (res, file, files) =>
                    handleFileSuccesss(
                      res,
                      file,
                      files,
                      { id: collections.id },
                      20
                    )
                "
                :before-upload="(file) => beforeFileUpload(file, '', 20)"
                :file-list="feesList"
                list-type="picture"
                :disabled="isNeiZhang"
              >
                <el-button type="primary" plain>点击上传</el-button>
                <!--                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
              <!-- marketCompbusiImgfileResults -->
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="modificationhTImg">
              <el-image
                v-for="(
                  item, index
                ) in reviseContractForm.marketCompbusiImgfileResults"
                :key="index"
                :src="filePath + item.url"
              ></el-image>
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="关联服务项">
              <el-table
                :row-style="{ height: '50px' }"
                :header-cell-style="{ height: '42px' }"
                ref="table"
                :data="reviseContractForm.marketBusirSerprices"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  align="center"
                  :selectable="
                    (row, index) => {
                      return row.contractFlag != 10;
                    }
                  "
                  contractFlag
                  width="48"
                >
                </el-table-column>
                <el-table-column label="服务项" width="100" prop="serpriceName">
                </el-table-column>
                <el-table-column
                  label="收费周期"
                  width="90"
                  prop="cycleType"
                  :formatter="
                    (row) => selectDictLabel(feesCycleList, row.cycleType)
                  "
                >
                </el-table-column>
                <el-table-column label="服务时间">
                  <template slot-scope="scope">
                    <div class="flex-row mw100 aic">
                      <el-date-picker
                        type="date"
                        v-model="scope.row.startTime"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择日期"
                        style="max-width: 154px"
                        :clearable="false"
                        :readonly="true"
                        @change="
                          updateDate({
                            id: scope.row.id,
                            startTime: $event,
                            endTime: scope.row.endTime,
                            accountType: scope.row.accountType,
                            isPresented: scope.row.isPresented,
                          })
                        "
                      >
                      </el-date-picker>
                      <span class="spacing ml10 mr10">-</span>
                      <el-date-picker
                        type="date"
                        v-model="scope.row.endTime"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择日期"
                        style="max-width: 154px"
                        :clearable="false"
                        :readonly="true"
                        @change="
                          updateDate({
                            id: scope.row.id,
                            startTime: scope.row.startTime,
                            endTime: $event,
                            accountType: scope.row.accountType,
                            isPresented: scope.row.isPresented,
                          })
                        "
                      >
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="heText == '变更合同'" :gutter="24">
          <el-col :span="24">
            <!-- <el-divider></el-divider> -->
            <div style="margin-left: 20px; font-size: 15px" class="Tips">
              <i class="el-icon-warning" style="color: #f3a35f"> </i
              >变更审请，必须填写理由，否则无法完成变更！
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="变更审请理由" prop="changeRemarks">
              <el-input
                style="width: 500px"
                type="textarea"
                :autosize="{ minRows: 5 }"
                placeholder="请填写变更审请理由"
                v-model="reviseContractForm.changeRemarks"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reviseContractJudge = false">取 消</el-button>
        <el-button type="primary" @click="contractSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
const toolbarOptions = [
  // toggled buttons
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  // custom button values
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  // superscript/subscript
  [{ script: "sub" }, { script: "super" }],
  // outdent/indent
  [{ indent: "-1" }, { indent: "+1" }],
  // text direction
  [{ direction: "rtl" }],
  [
    {
      size: [
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "32px",
        "36px",
        "48px",
        "64px",
        "72px",
      ],
    },
  ],
  // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // dropdown with defaults from theme
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  // remove formatting button
  ["clean"],
];
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import imageResize from "quill-image-resize-module";
let Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "32px",
  "36px",
  "48px",
  "64px",
  "72px",
];
Quill.register(Size, true);

import {
  addOrder,
  updateOrder,
  getOrder,
  orderSubmission,
  delOrder,
  addBusirAndSerprice,
  addGiveSerprice,
  updateServe,
  deleteServe,
  gathering,
  getServMoneyByOrderId,
  getFileByOrderId,
  updateAdvance,
  getProTypeList,
  getContractAndImgFile,
  specialApproval,
  getSerpriceServMoneyByOrderId,
  getExpendByOrder,
  selectOrderAndSerprice,
  productUpdate,
  revocation,
  AddConfirmService,
  ServiceItem,
  AdvancePayment,
  richTextSubmission,
  richTextEcho,
  downloadRichText,
  selectNewContractParticulars, //修改合同的合同详情
  contractUpdate, ////修改合同的合同详情--提交
} from "@/api/crm/order";
import {
  GetPaymentMethod,
  GetAccountNumber,
  contractDetails,
} from "@/api/crm/createHouseOrder/createHouseOrder";
import { updateOrderRecycleBin } from "@/api/crm/RecycleBin/RecycleBin";
import {
  getIntermSerpriceList,
  addIntermSerprice,
} from "@/api/crm/intermSerprice";
import { updateReturned } from "@/api/crm/customerService/agentAccount";
import EditContract from "@/views/components/EditContract";
import EditExpend from "@/views/components/EditExpend";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import { isPromise, throttle } from "@/utils/hmt";

import { fakeDelContract } from "@/api/crm/contract";
import { delContract } from "@/api/crm/contract";
import pdfShow from "@/components/Pdf/show";

/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import ContractPdf from "@/views/components/ContractPdf";
export default {
  name: "EditOrder",
  props: {
    orderId: {
      type: String,
      required: true,
      default: "",
    },
    hiddenTab: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    delFlag: {
      type: [Number, String],
      default: "",
    },
  },
  components: {
    EditExpend,
    EditContract,
    ElImageViewer,
    ContractPdf,
    pdfShow,
  },

  created() {
    this.getDicts("sys_yes_no").then((res) => {
      this.yesNoList = res.data;
    });
  },
  computed: {
    ...mapState({
      // userInfo: state => state.user
      userInfo: (state) => state,
    }),

    isNeiZhang() {
      return this.$store.getters.roleCodes.some((item) => {
        return (
          item == "marketCompanyBusirInternalAccount" ||
          item == "marketCompanyBusirInternalAccountClerk"
        );
      });
    },
    disabled() {
      if (this.orderTypeactive == 30 || this.orderTypeactive == 40) {
        return false;
      } else {
        return true;
      }
    },
    isDiaoDu() {
      return this.$store.getters.roleCodes.some((item) => {
        return item == "schedulingSupervisor" || item == "dispatchClerks";
      });
    },
    titleName() {
      return this.form.orderNo || "订单";
    },
    orderVisible: {
      get() {
        if (this.visible) {
          this.activeName = "detail";
          this.initDate();
        }
        return this.visible;
      },
      set(val) {
        this.contractShow = false;
        this.expendShow = false;
        this.reset();
        this.$emit("update:visible", val);
      },
    },
    typeList() {
      return [
        { name: "创建订单", value: 1, child: [] },
        { name: "订单审核", value: 2, child: [] },
        { name: "工单执行", value: 3, child: [] },
        { name: "完结", value: 4, child: [] },
      ];
    },
    // typeList() {
    //   let type = this.form.type;
    //   if (type == 10) {
    //     return [
    //       { name: "创建订单", value: 1, child: [] },
    //       { name: "订单审核", value: 2, child: [] },
    //       { name: "工单分配", value: 3, child: [] },
    //       { name: "工单执行", value: 4, child: [] },
    //       { name: "反馈", value: 5, child: [] },
    //       { name: "完结", value: 6, child: [] }
    //     ];
    //   } else if (type == 20) {
    //     return [
    //       { name: "创建订单", value: 1, child: [] },
    //       { name: "订单审核", value: 2, child: [] },
    //       {
    //         name: "代账<br/>" + "指派",
    //         value: 3,
    //         child: [
    //           { name: "服" },
    //           { name: "账" },
    //           { name: "税" },
    //           { name: "审" },
    //           { name: "费" }
    //         ]
    //       },
    //       { name: "反馈", value: 5, child: [] },
    //       { name: "完结", value: 6, child: [] }
    //     ];
    //   } else {
    //     return [
    //       { name: "创建订单", value: 1, child: [] },
    //       { name: "订单审核", value: 2, child: [] },
    //       { name: "工单分配", value: 3, child: [] },
    //       { name: "工单执行", value: 4, child: [] },
    //       { name: "反馈", value: 5, child: [] },
    //       { name: "完结", value: 6, child: [] }
    //     ];
    //   }
    // },
    //订单实际单价
    // balance() {
    //   if (this.bookFeesType == 20) {
    //     if(this.giftItems==false){
    //   this.serve.moneyReceived = this.serve.moneyReceived + this.bookFees;
    //     }else{
    //       this.serve.moneyReceived = this.serve.price
    //     }

    //   } else if (this.bookFeesType != 20) {
    //  this.serve.moneyReceived=this.serve.price;
    //     // this.getProductTypeList();
    //   }
    // },

    //订单原价
    sumPrice() {
      let price = 0;
      try {
        price += Number(this.form.accountBook);
        this.form.product.forEach((item) => {
          price += Number(item.price);
        });
        return parseFloat(price).toFixed(2);
      } catch (e) {
        return parseFloat(price).toFixed(2);
      }
    },
    //订单总金额
    sumMoney() {
      let price = 0;
      try {
        price += Number(this.form.accountBook) || 0;
        this.form.product.forEach((item) => {
          price += Number(item.moneyReceived);
        });
        return parseFloat(price).toFixed(2);
      } catch (e) {
        return parseFloat(price).toFixed(2);
      }
    },
    //支出总额
    sumExpendMoney() {
      let price = 0;
      try {
        this.expendList.forEach((item) => {
          price += Number(item.expendMoney) || 0;
        });
        return parseFloat(price).toFixed(2);
      } catch (e) {
        return parseFloat(price).toFixed(2);
      }
    },
    //订单状态
    orderType() {
      console.log("ssss");
      let order = this.form;
      let orderType = 10;
      if (order) {
        let isSpecial = order.specialWhether; //是否特殊审批20-非，10是
        let specialType = order.specialApprovalsType; //特殊审批状态 ，10待审核，20成功、30失败 40关闭
        let expeditedType = order.expeditedType; //是否加急、20非、10是
        let dispatchState = order.dispatchState; //调度 默认40，正常提交10，特殊审批成功10，成功20，30失败
        let auditorState = order.auditorState; //内账，默认40，正常提交10，特殊审批成功10，成功20，30失败

        if (isSpecial == 20 && dispatchState == 40 && auditorState == 40) {
          orderType = 10; //订单默认状态
        } else if (isSpecial == 10 && specialType == 10) {
          orderType = 30; //特殊审批待审核
        } else if (isSpecial == 10 && auditorState == 50) {
          orderType = 35; //特殊审批提交
        } else if (isSpecial == 10 && auditorState == 30) {
          orderType = 50; //特殊审批失败
        } else if (dispatchState == 10 && auditorState == 10) {
          orderType = 20; //订单正常提交
        } else if (dispatchState == 20 && auditorState == 20) {
          orderType = 25; //审核成功
        } else if (dispatchState == 30 || auditorState == 30) {
          orderType = 60; //审核失败
        } else if (dispatchState == 10 || auditorState == 10) {
          orderType = 30; //审批待审核
        }
        return orderType;
      } else {
        return orderType;
      }
    },
    // stepIndex() {
    //   let index = 0;
    //   index = this.stepList.lastIndexOf("20");
    //   return index - 1;
    // },
    // stepIndex() {
    //   let index = 0;
    //   index =
    //     this.orderType == 20 || this.orderType == 30
    //       ? 1
    //       : this.orderType == 10
    //       ? 0
    //       : 0;
    //   return index;
    // },
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  watch: {
    expendShow(val) {
      // console.info(val)
      if (this.orderVisible && !val) {
        this.getExpendList();
      }
    },

    contractShow(val) {
      if (this.orderVisible && !val) {
        this.getContract();
      }
    },
  },
  data() {
    var validateMaxMoney = (rule, value, callback) => {
      // console.log(value);
      // console.log(this.serve.moneyReceived);
      if (!value || value == 0) {
        return callback(new Error("预收金额不能为空"));
      } else if (this.advanceArrears >= value) {
        return callback();
      } else {
        return callback(new Error("预收金额不能大于项目金额"));
      }
    };
    var validateMinZero = (rule, value, callback) => {
      if (value > 0) {
        return callback();
      } else {
        return callback(new Error("价格必须大于0,请于赠送项目添加"));
      }
    };
    return {
      reviseContractJudge: false, //修改合同判断值
      reviseContractForm: {}, //修改合同
      // 调整图片大小和位置
      customModulesForEditor: [{ alias: "imageResize", module: imageResize }],
      //设置编辑器图片可拖拽
      editorSettings: {
        modules: { imageResize: {} },
      },
      num: null,
      heText: "", //修改合同dialog文字
      stepList: [], //进度列表
      bookFees: 200, //账本费
      bookFeesType: 10, //是否为记账类型
      giftItems: true, //赠送项
      content: `<p></p><p><br></p><ol><li><strong><em>Or drag/paste an image here.</em></strong></li><li><strong><em>rerew</em></strong></li><li><strong><em>rtrete</em></strong></li><li><strong><em>tytrytr</em></strong></li><li><strong><em>uytu</em></strong></li></ol>`,
      editorOption: {
        scrollingContainer: "#editorcontainer",
        placeholder: "",
        // or 'bubble'
        theme: "snow",
        modules: {
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
          toolbar: {
            // 工具栏
            container: toolbarOptions,
            handlers: {
              image: function (value) {
                // console.info(value);
                if (value) {
                  // upload点击上传事件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  // console.info('this.quill.format("image", false)');
                  // this.quill.format("image", false);
                }
              },
              upload: (value) => {
                // console.info(value);
              },
            },
          },
        },
      },
      str: "",
      //富文本编辑器弹出框
      richTextShow: false,
      richTextId: "",
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      contractPdfShow: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 6);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              let year = start.getFullYear();
              let month = start.getMonth();
              let first = new Date(year, month, 1);
              let last = new Date(year, month + 1, 0);
              let firstDay = first.getDay();
              let currDay = start.getDate();
              let lastDay = last.getDate();
              // console.info(firstDay, currDay, lastDay);
              end.setTime(end.getTime() + 3600 * 1000 * 24 * (lastDay - 1));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              let year = start.getFullYear();
              let month = start.getMonth();
              let dayleng = 0;
              for (let i = 1; i < 4; i++) {
                dayleng += new Date(year, month + i, 0).getDate();
              }
              end.setTime(end.getTime() + 3600 * 1000 * 24 * (dayleng - 1));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              let year = start.getFullYear();
              let month = start.getMonth();
              let dayleng = 0;
              for (let i = 1; i < 7; i++) {
                dayleng += new Date(year, month + i, 0).getDate();
              }
              end.setTime(end.getTime() + 3600 * 1000 * 24 * (dayleng - 1));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              let year = start.getFullYear();
              let month = start.getMonth();
              let dayleng = 0;
              for (let i = 1; i < 13; i++) {
                let months = month + i;
                if (months > 12) {
                  months = months - 12;
                  dayleng += new Date(year + 1, months, 0).getDate();
                } else {
                  dayleng += new Date(year, months, 0).getDate();
                }
              }
              end.setTime(end.getTime() + 3600 * 1000 * 24 * (dayleng - 1));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近两年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              let year = start.getFullYear();
              let month = start.getMonth();
              let dayleng = 0;
              for (let i = 1; i < 25; i++) {
                let months = month + i;
                if (months > 24) {
                  months = months - 24;
                  dayleng += new Date(year + 2, months, 0).getDate();
                } else if (months > 12) {
                  months = months - 12;
                  dayleng += new Date(year + 1, months, 0).getDate();
                } else {
                  dayleng += new Date(year, months, 0).getDate();
                }
              }
              end.setTime(end.getTime() + 3600 * 1000 * 24 * (dayleng - 1));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              let year = start.getFullYear();
              let month = start.getMonth();
              let dayleng = 0;
              for (let i = 1; i < 37; i++) {
                let months = month + i;
                if (months > 36) {
                  months = months - 36;
                  dayleng += new Date(year + 2, months, 0).getDate();
                } else if (months > 24) {
                  months = months - 24;
                  dayleng += new Date(year + 2, months, 0).getDate();
                } else if (months > 12) {
                  months = months - 12;
                  dayleng += new Date(year + 1, months, 0).getDate();
                } else {
                  dayleng += new Date(year, months, 0).getDate();
                }
              }
              end.setTime(end.getTime() + 3600 * 1000 * 24 * (dayleng - 1));
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      
      advanceArrears: null,
      headers: { Authorization: _getSessionStore(tokenKey) },
      filePath: process.env.VUE_APP_FILE_API,
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload", //跟进记录上传
      fileUrl:
        process.env.VUE_APP_CRM_API + "/hmkj-crm/marketCompbusiImgfile/upload", //附件上传
      fileList: [],
      MaterialAccessoriesShow: false, //富文本点击预览
      MaterialAccessoriesTitle: "",
      //支付户名
      accountNameList: [],
      //开户行
      bankOfDepositList: [],
      PaymentNameList: [],
      //区域数据
      areaOptions: regionData,
      //支付类型
      houproPaymentSettingList: [],
      //支付账号
      CollectioAccountList: [],
      feesList: [],
      //收费支付时间
      PaymentTime: "",
      serveFileList: [],
      proTypeList: [], //服务类型数据
      feesCycleList: [], //收费周期
      discountTypeList: [], //优惠方式
      handoverMode: [], //交接方式
      auditStatusList: [], //审核状态
      reviewerTypeList: [], //订单支出审核状态
      paymentMethodOption: [], //收款方式
      rules: {},
      form: {
        id: this.orderId,
      },
      serveData: [],
      activeName: "detail",
      serviceList: [], //所属服务项
      serviceForm: {
        name: "",
        price: null,
        businessType: "",
        parentId: "",
      },
      newServeRules: {
        name: [
          {
            required: true,
            message: "服务名称不能为空",
            trigger: "blur",
          },
        ],
      },
      blurFlag: false,
      contractShow: false,
      showDialog: false,
      expendShow: false, //支出
      serveTitle: "添加服务项目",
      serveShow: false, //服务
      serve: {},
      serveRules: {
        serpriceId: [
          {
            required: true,
            message: "服务名称不能为空",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "原价不能为空",
            trigger: "blur",
          },
        ],
        moneyReceived: [
          {
            required: true,
            message: "实际价格不能为空",
            trigger: "blur",
          },
          { type: "number", message: "价格必须为数字值" },
          { validator: validateMinZero, trigger: "blur" },
        ],
        period: [
          {
            required: true,
            message: "服务时间不能为空",
            trigger: "blur",
          },
        ],
      },
      content: "", //富文本
      serveList: [],
      changeData: {},
      approval: {
        applyContent: "",
      }, //特殊审批
      approvalShow: false, //特殊审批
      discountShow: false, //折扣
      collectionsShow: false, //预收款
      collectionsRules: {
        advanceActualAmount: [
          { validator: validateMaxMoney, trigger: "blur" },
          { type: "number", message: "价格必须为数字值" },
          { required: true, message: "预售金额不能为空", trigger: "blur" },
        ],
        advancePaymentTime: [
          { required: true, message: "支付时间不能为空", trigger: "change" },
        ],
      },
      collections: {},
      servMoneyList: [],
      contractList: [], //合同列表
      contractId: "",
      expendList: [], //支出列表
      expendId: "",
      paymentPlanList: [], //回款计划服务项列表
      //修改回款计划
      returnForm: {},
      returnRules: {
        id: [{ required: true, message: "服务项目不能为空", trigger: "blur" }],
        payBackTime: [
          { required: true, message: "修改日期不能为空", trigger: "blur" },
        ],
        cycleType: [
          { required: true, message: "收费周期不能为空", trigger: "blur" },
        ],
      },
      //服务项列表
      serpriceNameList: [],
      paymentPlan: false,
      settings: [],
      // settings: [{ icon: "el-icon-delete", lable: "撤销订单", value: "1" }],

      pdfUrl: "",
      renewForm: {},
      pdfShow: false,
      approvalRules: {
        applyContent: [
          { required: true, message: "申请理由不能为空", trigger: "blur" },
        ],
      },
      orderTypeactive: null,
      yesNoList: [], //切老户
    };
  },
  mounted() {
    let content = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);
  },

  methods: {
    auditState(data) {
      if (data == 10) {
        return "待审核";
      } else if (data == 20) {
        return "审核成功";
      } else if (data == 30) {
        return "审核失败";
      }
    },
    initDate() {
      this.getDicts("fees_cycle").then((res) => {
        this.feesCycleList = res.data;
      });
      this.getDicts("discount_type").then((res) => {
        this.discountTypeList = res.data;
      });
      this.getDicts("handover_mode").then((res) => {
        this.handoverMode = res.data;
      });
      this.getDicts("audit_status").then((res) => {
        this.auditStatusList = res.data;
        this.reviewerTypeList = res.data.slice(0, 3);
      });
      this.getDicts("payment_method").then((res) => {
        this.paymentMethodOption = res.data;
      });
      this.getData();
      this.selectOrderAndSerpriceList();
    },
    handleBlur(type, val) {
      // console.log(val);
      let obj2 = Object.assign({}, this.serve);
      if (this.bookFeesType == 20) {
        if (type == 10) {
          this.serve.moneyReceived = this.giftItems
            ? obj2.moneyReceived
            : this.serve.moneyReceived + this.bookFees;
        } else if (type == 20) {
          this.serve.moneyReceived = this.giftItems
            ? obj2.moneyReceived - this.bookFees
            : obj2.moneyReceived + this.bookFees;
        } else {
          this.serve.moneyReceived = obj2.moneyReceived;
        }
      } else if (this.bookFeesType != 20) {
        this.serve.moneyReceived = this.serve.price;
        // this.getProductTypeList();
      }
    },
    //tabs切换
    handleClick(tab, event) {
      if (tab.name == "detail") {
        this.getData();
      } else if (tab.name == "third") {
        this.getFileList();
      } else if (tab.name == "fourth") {
        this.getContract();
      } else if (tab.name == "firth") {
        this.getExpendList();
      } else if (tab.name == "sixth") {
        this.getPaymentPlan();
      } else if (tab.name == "seventh") {
        this.getServMoney();
      }
    },
    MaterialAccessories(val, id) {
      this.MaterialAccessoriesShow = true;
      this.MaterialAccessoriesTitle = val;
      richTextEcho({ projectId: id }).then((response) => {
        this.content = response.data.richText;
      });
    },

    getFileList() {
      getFileByOrderId({ id: this.orderId, delSwitch: this.delFlag }).then(
        // getFileByOrderId({ id: this.form.id, delSwitch: this.delFlag }).then(
        (res) => {
          let data = res.data || [];
          this.serveList = data.map((items) => {
            items.serveFileList = items.imgfiles.map((item) => {
              return {
                url: this.filePath + item.url,
                name: item.name + "." + item.type,
                id: item.id,
              };
            });
            return items;
          });
        }
      );
    },
    richText() {
      richTextSubmission({
        id: this.richTextId,
        richText: this.content,
      }).then((response) => {
        this.richTextShow = false;
        this.getFileList();
      });
    },
    //富文本下载
    downloadFiles(id) {
      let fileUrl = process.env.VUE_APP_FILE_API;
      downloadRichText({ id: id }).then((response) => {
        let filename = response.data;
        let elink = document.createElement("a");
        elink.download = filename;
        elink.text = filename;
        elink.style.display = "none";
        window.open(
          fileUrl + "/downloadpdfMaterial/" + filename,
          "_blank",
          "toolbar=yes, width=1000, height=900"
        );
        // elink.href = decodeURIComponent(fileUrl +'/downloadpdfMaterial/' +filename);
        document.getElementById("app").appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        // document.body.removeChild(elink);
      });
    },

    updateRichText(id) {
      this.richTextId = id;
      this.richTextShow = true;
      richTextEcho({ projectId: id }).then((response) => {
        this.content = response.data.richText;
      });
      var time = setInterval(() => {
        richTextSubmission({
          id: this.richTextId,
          richText: this.content,
        }).then((response) => {}); //保存表单信息的操作
        if (this.richTextShow == false) {
          clearInterval(time);
        }
      }, 60000);
    },

    addRichText(id) {
      this.content = "";
      this.richTextId = id;
      this.richTextShow = true;
      var time = setInterval(() => {
        richTextSubmission({
          id: this.richTextId,
          richText: this.content,
        }).then((response) => {});
        //保存表单信息的操作
        if (this.richTextShow == false) {
          clearInterval(time);
        }
      }, 60000);
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur(e) {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件

    onEditorChange(e) {
      this.content = e.html;
    }, // 内容改变事件
    //转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },

    closeViewer() {
      this.dialogVisible = false;
    },
    handleCityCodeChange(value) {
      this.CollectioAccountList = [];
      this.bankOfDepositList = [];
      this.houproPaymentSettingList = [];
      this.accountNameList = [];
      (this.collections.paymentTerm = ""),
        (this.collections.account = ""),
        (this.collections.accountBank = ""),
        (this.collections.accountName = "");
      this.collections.paymentMethod = "";
      this.collections.payCode = value;
      this.collections.payProvince = CodeToText[value[0]];
      this.collections.payCity = CodeToText[value[1]];
      this.collections.payCounty = CodeToText[value[2]];
      GetPaymentMethod({
        type: 10,
        province: this.collections.payProvince,
        city: this.collections.payCity,
      }).then((response) => {
        this.houproPaymentSettingList = response.data;
      });
    },
    //收款方式
    payment(val) {
      let paymentId = "";
      this.collections.account = "";
      this.collections.accountName = "";
      this.collections.accountBank = "";
      console.log(this.collections.paymentMethod);
      this.houproPaymentSettingList.forEach((item) => {
        if (this.collections.paymentMethod == item.patternPayment) {
          paymentId = item.id;
          this.collections.bankType = item.bankType;
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
      });
    },
    //收款用户
    accountNameChange(val) {
      this.collections.account = "";
      this.collections.accountBank = "";
      this.CollectioAccountList = [];
      this.bankOfDepositList = [];
      this.PaymentNameList.forEach((item) => {
        if (
          item.accountName == val &&
          item.patternPayment == this.collections.paymentMethod
        ) {
          this.CollectioAccountList.push(item);
          this.bankOfDepositList.push(item);
        }
      });
    },
    AccountChange(val) {
      this.bankOfDepositList.forEach((item) => {
        if (val == item.payAccount) {
          this.collections.accountBank = item.accountBank;
        }
      });
    },
    //开户行
    BankChange(val) {
      this.CollectioAccountList.forEach((item) => {
        if (val == item.accountBank) {
          this.collections.account = item.payAccount;
        }
      });
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
      if (this.collections.advancePaymentTime > this.PaymentTime) {
        this.msgError("支付时间不能大于当前时间");
        return (this.collections.advancePaymentTime = "");
      }
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.ImageUrlList = [this.dialogImageUrl]
      this.dialogVisible = true;
    },
    //收费列表
    getServMoney() {
      getServMoneyByOrderId({ id: this.form.id, delSwitch: this.delFlag }).then(
        (res) => {
          this.servMoneyList = res.data;
        }
      );
    },
    //合同附件列表
    getContract() {
      console.log(this.orderId);
      console.log(this.form.id);
      // getContractAndImgFile({ id: this.form.id, delSwitch: this.delFlag }).then(
      getContractAndImgFile({ id: this.orderId, delSwitch: this.delFlag }).then(
        (res) => {
          res.data.map((items) => {
            items.conType = items.controlNo.substring(0, 2);
          });
          this.contractList = res.data;

          let that = this;
          this.contractList.map((items) => {
            items.months = this.setMonths(
              items.servicePeriodStart,
              items.servicePeriodEnd
            );
          });
          console.log(this.contractList);
        }
      );
    },
    //计算服务周期
    setMonths(start, end) {
      let startTimeArr = start.split("-");
      let endTimeArr = end.split("-");
      this.startTime = {
        year: startTimeArr && startTimeArr.length > 2 ? startTimeArr[0] : "",
        month: startTimeArr && startTimeArr.length > 2 ? startTimeArr[1] : "",
      };
      this.endTime = {
        year: endTimeArr && endTimeArr.length > 2 ? endTimeArr[0] : "",
        month: endTimeArr && endTimeArr.length > 2 ? endTimeArr[1] : "",
      };
      var year1 = parseInt(this.startTime.year),
        month1 = parseInt(this.startTime.month),
        year2 = parseInt(this.endTime.year),
        month2 = parseInt(this.endTime.month);
      //通过年,月差计算月份差
      let months = (year2 - year1) * 12 + (month2 - month1) + 1;
      return months;
    },

    // 接受子 事件 然后刷新页面
    closePdf(data) {
      // console.log(data);
      if (data == "10") {
        this.contractPdfShow = false;
        this.getContract();
      }
    },
    //支出列表
    getExpendList() {
      getExpendByOrder({ id: this.form.id, delSwitch: this.delFlag }).then(
        (res) => {
          this.expendList = res.data;
        }
      );
    },

    //汇款机会列表
    getPaymentPlan() {
      getSerpriceServMoneyByOrderId({
        id: this.form.id,
        delSwitch: this.delFlag,
      }).then((res) => {
        this.paymentPlanList = res.data.map((item) => {
          item.amountReceived =
            item.alreadyMoney || item.actualPaymentAmount || 0;
          return item;
        });
      });
    },
    getData() {
      let id = this.orderId;
      if (id) {
        getOrder({ id: id, delSwitch: this.delFlag })
          .then((res) => {
            console.info(res);
            // 是本人的就可以撤销订单 不是本人创建的订单就不可以撤销
            if (res.data.revokeType == "10") {
              let obj = [
                { icon: "el-icon-delete", lable: "撤销订单", value: "1" },
              ];
              this.settings = obj;
              console.log(this.settings);
            } else {
              this.settings = [];
            }

            let data = res.data;
            // console.info(typeof data.product)
            try {
              data.product =
                data.product != "" && typeof data.product == "string"
                  ? JSON.parse(data.product)
                  : typeof data.product == "object"
                  ? data.product
                  : []; //选择的产品
              let giveProduct =
                data.giveProduct != "" && typeof data.giveProduct == "string"
                  ? JSON.parse(data.giveProduct)
                  : typeof data.giveProduct == "object"
                  ? data.giveProduct
                  : []; //赠送的产品
              data.giveProduct = giveProduct.map((product) => {
                product.proTypeList = [];
                getProTypeList({
                  id: product.busirId,
                  productId: product.id,
                }).then((res) => {
                  product.proTypeList = res.data.map((items) => {
                    items.crmIntermSerprices =
                      items.crmIntermSerprices.length > 0
                        ? items.crmIntermSerprices.map((item) => {
                            item.crmIntermSerprices =
                              item.crmIntermSerprices.length > 0
                                ? item.crmIntermSerprices
                                : null;
                            return item;
                          })
                        : null;
                    return items;
                  });
                  this.$forceUpdate();
                });
                return product;
              });
            } catch (e) {
              // console.info(e);
              data.product = [];
              data.giveProduct = [];
            }
            this.form = data;
          })
          .catch((err) => {
            this.reset();
          });
      }
    },
    cascaderShow(val, row) {
      if (val) {
        getProTypeList({ id: row.busirId, productId: row.id }).then((res) => {
          row.proTypeList = res.data.map((items) => {
            items.crmIntermSerprices =
              items.crmIntermSerprices.length > 0
                ? items.crmIntermSerprices.map((item) => {
                    item.crmIntermSerprices =
                      item.crmIntermSerprices.length > 0
                        ? item.crmIntermSerprices
                        : null;
                    return item;
                  })
                : null;
            return items;
          });
          // console.info(row);
          this.$forceUpdate();
        });
      }
    },
    delOrder() {
      let id = this.form.id;
      this.$confirm("是否确认删除该订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateOrderRecycleBin({ id: id });
        })
        .then(() => {
          this.orderVisible = false;
          this.msgSuccess("删除成功");
        });
    },
    //提交订单
    submitFun: throttle(function () {
      orderSubmission({
        id: this.form.id,
        specialWhether: this.form.specialWhether,
        specialApprovalsType: this.form.specialApprovalsType,
      }).then((res) => {
        this.getData();
        this.orderVisible = false;
        this.msgSuccess("提交订单");
      });
    }),
    //获取产品类别列表
    getProductTypeList(row, cb) {
      let orderId = row && row.busirId;
      let data = { id: orderId || this.form.id };
      if (row) {
        data.productId = row.id;
      }
      getProTypeList(data).then((res) => {
        res.data.forEach((item) => {
          if (this.serve.serpriceId == "") {
            this.bookFeesType = 10;
          } else {
            if (item.id == this.serve.serpriceId) {
              this.bookFeesType = item.type;
            } else {
              item.crmIntermSerprices.forEach((ite) => {
                if (ite.id == this.serve.serpriceId) {
                  this.bookFeesType = item.type;
                }
              });
            }
          }
        });
        let proTypeList = res.data.map((items) => {
          items.crmIntermSerprices =
            items.crmIntermSerprices.length > 0
              ? items.crmIntermSerprices.map((item) => {
                  item.crmIntermSerprices =
                    item.crmIntermSerprices.length > 0
                      ? item.crmIntermSerprices
                      : null;
                  return item;
                })
              : null;
          return items;
        });
        if (typeof cb == "function") {
          return cb(proTypeList);
        } else {
          this.proTypeList = proTypeList;
        }
      });
    },
    // 表单重置
    reset() {
      this.form = {
        id: this.orderId,
        accountBook: null, //账本费
        certificateType: null,
        companyId: null,
        proceeds: [], //预收款
        product: [], //选择的产品
        giveProduct: [], //赠送的产品
        orderNo: null, //订单编号
        type: 10,
        createDate: null, //创建时间
      };
      this.resetForm("orderForm");
    },
    // 服务表单重置
    serveReset() {
      this.serve = {
        id: null,
        busirId: this.form.id,
        companyId: this.form.companyId,
        serpriceId: null,
        serpriceName: null,
        cycleType: "30", //收费的周期(年,半年,季度,月)
        period: [], //收费的周期
        endTime: null, //产品结束的日期
        startTime: null, //产品开始的日期
        discountType: "10",
        isPresented: null, //是否为赠送
        price: null, //项目实际价格
        moneyReceived: null, //实收金额
        serveType: null, //服务类型
        companies: null,
      };
      this.bookFeesType = "10";
      // this.resetForm("serveForm");
    },
    // 预收款表单重置
    collectionsReset() {
      this.collections = {
        id: null,
        account: null, //收款账户
        advanceActualAmount: null, //预付款金额
        advancePaymentTime: null, //预付款时间
        serpriceName: null, //服务名称
        serpriceId: null, //产品服务表id
        advanceFileIds: null, //附件
        isPresented: "20", //是否为赠送
        price: null, //项目实际价格
        remarks: null, //备注
      };
      this.resetForm("collectionsForm");
      this.$nextTick(() => {
        try {
          this.$refs.collectionUpload.clearFiles();
        } catch (e) {}
      });
    },
    //添加服务
    addServeFun(flag) {
      this.serveReset();
      this.serveShow = true;
      this.serve.isPresented = flag;
      this.$set(this.serve, "companies", "20");
      this.getProductTypeList();
    },
    // 取消
    serveDel() {
      this.serveShow = false;
      this.serveReset();
    },
    //更新服务
    updateServeFun(data) {
      let serve = JSON.parse(JSON.stringify(data));
      this.serveReset();
      if (this.orderTypeactive == 10 || this.orderTypeactive == 20) {
        this.serveTitle = "查看服务项目";
      } else {
        this.serveTitle = "添加服务项目";
        // this.serve.companies = '20'
      }

      this.serveShow = true;
      console.info(serve);

      let arr = [];
      arr.push(serve.startTime);
      arr.push(serve.endTime);
      serve.period = arr || [];
      this.getProductTypeList(serve);
      serve.discountType = serve.discountType || "10";
      serve.serveType = serve.accountType;
      serve.cycleType =
        serve.accountType == 10
          ? "100"
          : serve.cycleType == "100"
          ? "30"
          : serve.cycleType;
      // serve.companies  = Number(serve.companies)
      console.info(serve.companies);
      this.serve = serve;
    },
    //记账报税类型时间选择
    changeServiceTimes(val) {
      let dayleng = 0;
      let current = val[1].split("-");
      let year = current[0];
      let months = current[1];
      dayleng += new Date(year, months, 0).getDate();
      if (current[2] == "01") {
        current[2] = dayleng.toString();
        current.forEach((item, index) => {
          current[index] = parseInt(current[index]);
        });
        this.serve.period[1] = current.join("-");
      }
    },
    addServe: throttle(function () {
      if (this.giftItems == true) {
        this.serve.giveAwayType = 10;
      } else if (this.giftItems == false) {
        this.serve.giveAwayType = 20;
      }
      this.serve.amountPayout = this.bookFees;
      this.$refs["serveForm"].validate((valid) => {
        if (valid) {
          let serve = JSON.parse(JSON.stringify(this.serve));
          console.log(serve)
          serve.orderType = this.form.type;
          serve.startTime = serve.period[0];
          serve.endTime = serve.period[1];
          if (serve.isPresented == 10) {
            serve.moneyReceived = 0;
          }
          if (serve.id) {
            updateServe(serve).then((res) => {
              this.serveShow = false;
              this.getData();
            });
          } else {
            if (serve.isPresented == 10) {
              addGiveSerprice(serve).then((res) => {
                // console.info(res)
                this.getData();
                this.serveShow = false;
              });
            } else {
              addBusirAndSerprice(serve).then((res) => {
                // console.info(res)
                this.getData();
                this.serveShow = false;
              });
            }
          }
        }
      });
    }),
    //新建服务项目
    newServeFun() {
      this.serviceForm.name = "";
      this.serviceForm.businessType = "";
      this.serviceForm.price = null;
      (this.serviceForm.parentId = ""),
        ServiceItem().then((response) => {
          this.serviceList = response.data;
        });
      this.showDialog = true;
    },
    //所属服务项
    serviceChange(row) {
      this.serviceList.forEach((item) => {
        console.log("sssss");
        console.log(item);
        if (item.id.indexOf(row) != -1) {
          this.serviceForm.businessType = item.businessType;
        }
      });
    },
    //提交新增服务项
    ConfirmService() {
      AddConfirmService(this.serviceForm).then((response) => {
        this.showDialog = false;
        this.getProductTypeList();
      });
    },
    // addNewServe: throttle(function() {
    //   this.$refs["newServe"].validate(valid => {
    //     if (valid) {
    //       this.newServe.type = this.form.type;
    //       addIntermSerprice(this.newServe).then(res => {
    //         this.showDialog = false;
    //       });
    //     }
    //   });
    // }),

    collectionsFun() {
      this.collectionsShow = true;
      this.collectionsReset();
    },

    collectionsUpdate(row) {
      console.log(row);
      this.advanceArrears = row.moneyReceived;
      let collections = JSON.parse(JSON.stringify(row));
      collections.advanceActualAmount = Number(
        collections.advanceActualAmount ||
          collections.advanceActualAmount ||
          null
      );
      collections.advancePaymentTime =
        collections.advancePaymentTime || collections.advancePaymentTime || "";
      this.collections = collections;
      this.collectionsShow = true;
      this.$nextTick(() => {
        try {
          this.$refs.collectionUpload.clearFiles();
          this.feesList = collections.advanceImages.map((item) => {
            return {
              url: this.filePath + item.url,
              name: item.name + "." + item.type,
              id: item.id,
            };
          });
        } catch (e) {}
      });
      AdvancePayment({ id: row.id }).then((response) => {
        this.collections = response.data;
        this.collections.advanceActualAmount =
          response.data.advanceActualAmount;
        this.collections.advancePaymentTime = response.data.advancePaymentTime;
        this.collections.payCode = JSON.parse(this.collections.payCode);
        this.accountNameList = [];
        this.PaymentNameList = [];
        this.houproPaymentSettingList = response.data.paymentSettingResults;
        this.houproPaymentSettingList.forEach((item) => {
          if (this.collections.paymentTerm != "") {
            if (this.collections.paymentTerm == item.patternPayment) {
              this.collections.currentRate = item.currentRate;
              item.houproPaymentSettingResult.forEach((val) => {
                this.accountNameList.push(val.accountName);
                this.PaymentNameList.push(val);
              });
              this.accountNameList = Array.from(new Set(this.accountNameList));
            }
          }
        });
        this.CollectioAccountList = [];
        if (this.collections.accountName != "") {
          this.PaymentNameList.forEach((ite) => {
            if (this.collections.accountName == ite.accountName) {
              this.CollectioAccountList.push(ite);
            }
          });
        } else {
          this.CollectioAccountList = [];
        }

        //  this.houproPaymentSettingList=response.data.paymentSettingResults
        //  if(this.houproPaymentSettingList.length>0){
        //     this.houproPaymentSettingList.forEach(item => {
        //      if(this.collections.paymentTerm !=''){
        //     if (this.collections.paymentTerm == item.patternPayment) {
        //       this.collections.currentRate = item.currentRate;
        //       this.CollectioAccountList = item.houproPaymentSettingResult
        //       console.log(item.houproPaymentSettingResult);
        //     }
        //      }else{
        //        this.CollectioAccountList = []
        //      }
        //   });
        //  }else{
        //    this.houproPaymentSettingList=[]
        //  }
      });
    },

    updateCollections: throttle(function () {
      this.$refs["collectionsForm"].validate((valid) => {
        if (valid) {
          // let collections = this.collections;
          // let serve = {
          //   id: collections.id,
          //   account: collections.account, //收款账户
          //   advanceActualAmount: collections.advanceActualAmount, //预付款金额
          //   advancePaymentTime: collections.advancePaymentTime, //预付款时间
          //   advanceFileIds: collections.advanceFileIds, //附件
          //   advanceRemarks: collections.advanceRemarks, //备注
          //   accountType: collections.accountType,
          //   paymentMethod: collections.paymentMethod
          // };
          gathering(this.collections)
            .then((response) => {
              // console.info(response)
              this.getData();
              this.collectionsShow = false;
            })
            .catch((error) => {
              // console.info(error)
            });
        }
      });
    }),

    addContractFun(row) {
      this.contractId = row.id;
      this.contractShow = true;
    },
    // 作废
    delContractFun(row) {
      this.$confirm("是否确认作废该项目合同?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return fakeDelContract({ id: row.id });
        })
        .then(() => {
          this.getContract();
          this.msgSuccess("作废成功");
        })
        .catch(function () {});
    },

    viewContractFun(row) {
      console.info(row);
      if (row.dzContractType == 10 || row.dzContractType == "10") {
        this.detailId = row.companyId;
        this.pdfUrl = row.path || "";
        this.pdfShow = true;
      } else {
        this.renewForm.xufei = true;
        let rows = {
          id: row.id,
          xufei: this.renewForm.xufei,
        };
        this.contractShow = true;
        this.contractId = row.id;
        this.form = rows;
      }
    },

    addCollections() {
      this.$refs["collectionsForm"].validate((valid) => {
        if (valid) {
          let serve = JSON.parse(JSON.stringify(this.collections));
          this.form.proceeds.push(serve);
          this.collectionsShow = false;
          this.collectionsReset();
        }
      });
    },
    selectOrderAndSerpriceList() {
      selectOrderAndSerprice({ id: this.orderId }).then((response) => {
        console.log("出来了");
        console.log(response.data.orderType);
        this.orderTypeactive = response.data.orderType;
        this.serpriceNameList = response.data.product;
        this.stepList = response.data.res;
      });
    },
    //修改回款计划
    modify() {
      this.paymentPlan = true;
      this.returnForm = {
        id: null,
        payBackTime: null,
        cycleType: null,
      };
      selectOrderAndSerprice({ id: this.orderId }).then((response) => {
        console.log("出来了");
        this.serpriceNameList = response.data.product;
        console.log(response.data.res);
        this.stepList = response.data.res;
        console.log(this.serpriceNameList);
      });
    },
    //项目名称
    cycleTypeChang(id) {
      let obj = {};
      obj = this.serpriceNameList.find((item) => {
        return item.id === id;
      });
      this.returnForm.serpriceName = obj.serpriceName;
    },

    //提交回款计划
    paymentCollection: throttle(function () {
      this.$refs["returnForm"].validate((valid) => {
        if (valid) {
          updateReturned(this.returnForm).then((response) => {
            if (response.code === 200) {
              this.msgSuccess("修改回款计划成功");
            }
            this.paymentPlan = false;
            this.getPaymentPlan();
          });
        }
      });
    }),
    //特色审批
    approvalFun: throttle(function (row) {
      this.approvalShow = true;
      let form = JSON.parse(JSON.stringify(this.form));
      this.approval = {
        id: form.id,
        specialApprovalsType: (row && row.specialApprovalsType) || "",
        applyContent: (row && row.applyContent) || "",
        approverName:
          (row && row.approverName) || this.$store.getters.name || "",
      };
    }),
    unApprovalFun() {
      let form = JSON.parse(JSON.stringify(this.form));
      let order = {
        id: form.id,
        specialApprovalsType: "",
        applyContent: "",
        approverName: "",
      };
      updateOrder(order)
        .then((res) => {
          this.approvalShow = false;
          this.msgSuccess("撤销审批成功");
          this.getData();
        })
        .catch((err) => {
          this.msgError("撤销审批失败");
        });
    },
    approvalSubmit: throttle(function () {
      this.$refs["approvalForm"].validate((valid) => {
        if (valid) {
          delete this.approval.approverName;
          specialApproval(this.approval)
            .then((res) => {
              this.approvalShow = false;
              this.msgSuccess("提交审核成功");
              this.getData();
            })
            .catch((err) => {
              this.msgError("提交审核失败");
            });
        }
      });
    }),
    //更新订单数据
    orderUpdate(data) {
      data.id = this.form.id;
      // console.info(data)
      updateOrder(data)
        .then((response) => {
          this.getData();
        })
        .catch((error) => {
          this.getData();
        });
    },
    serveUpdate(data) {
      // console.info(arguments)
      updateServe(data)
        .then((response) => {
          this.getData();
        })
        .catch((err) => {
          this.getData();
        });
    },
    advanceUpdate(data, row) {
      if (row ? row.moneyReceived >= data.advanceMoney : true) {
        updateAdvance(data)
          .then((response) => {
            this.getData();
          })
          .catch((err) => {
            this.getData();
          });
      } else {
        this.msgError("预收不能大于项目应收金额！");
      }
    },
    delServe(data) {
      this.$confirm("是否确认删除该服务项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return deleteServe(data);
        })
        .then(() => {
          this.getData();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    submitForm: throttle(function () {
      this.$refs["orderForm"].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            updateOrder(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("更新订单成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addOrder(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增订单成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    }),
    reviewerTypeFormat(row) {
      return this.selectDictLabel(this.reviewerTypeList, row.reviewerType);
    },
    isImg(url) {
      var index = url.lastIndexOf(".");
      var ext = url.substr(index + 1);
      let typeList = ["png", "jpg", "jpeg"];
      return typeList.some((item) => {
        return item == ext;
      });
    },
    //图片删除
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    //图片预览
    handlePreview(file) {
      // console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, "提示");
    },
    uploadSuccess(res) {
      // 首先获取富文本编辑器的实例
      let quill = this.$refs.myQuillEditor.quill;
      // 上传成功所执行
      if (res.code == 200 && res.data !== null) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        let url = process.env.VUE_APP_BASE_API;
        // 插入图片res为服务器返回的数据
        quill.insertEmbed(length, "image", url + res.data.url);

        // var imgtml="<img src="+(url+ res.data.url)+"></img>";
        //                                               console.log(imgtml);
        // quill.clipboard.dangerouslyPasteHTML(imgtml);

        // 光标移动至文本末端
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },

    uploadError() {
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    beforeUpload(file) {
      // 显示loading动画
      this.quillUpdateImg = true;
    },
      //修改合同上传图片
    handleFileSuccess(res, file, files, data) {
      this.ImageUrlList = files.map((ite) => {
        return ite.url;
      });
      //附件上传成功
      this.reviseContractForm.imgfileIds = files
        .map((item) => {
          if (item.id) {
            return item.id;
          } else if (item.response && item.response.code == 200) {
            return item.response.data.id;
          } else {
            return undefined;
          }
        })
        .filter((item) => {
          return item != undefined;
        })
        .join(",");
    },
    handleFileSuccess(res, file, files, data, type) {
      this.form.imgfileIds = files.map((item) => {
        if (item.id) {
          return item.id;
        } else if (item.response && item.response.code == 200) {
          return item.response.data.id;
        } else {
          return undefined;
        }
      });
      this.ImageUrlList = files.map((ite) => {
        return ite.url;
      });
      //附件上传成功
      // console.info(res, file, files, data);
      if (type == 20) {
        if (res.code == 200) {
          this.collections.advanceFileIds = files
            .map((item) => {
              if (item.id) {
                return item.id;
              } else if (item.response && item.response.code == 200) {
                return item.response.data.id;
              } else {
                return undefined;
              }
            })
            .filter((item) => {
              return item != undefined;
            })
            .join(",");
        }
      } else {
        if (res.code == 200) {
          data.fileIds = files
            .map((item) => {
              if (item.id) {
                return item.id;
              } else if (item.response && item.response.code == 200) {
                return item.response.data.id;
              } else {
                return undefined;
              }
            })
            .filter((item) => {
              return item != undefined;
            })
            .join(",");
          productUpdate(data)
            .then((response) => {
              this.getFileList();
              this.$refs.serveFileRef.clearFiles();
            })
            .catch((err) => {
              this.getData();
              this.$refs.serveFileRef.clearFiles();
            });
        }
      }
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeFileUpload(file) {
      console.info("上传文件beforeFileUpload");
      console.info(file);
      console.info(this.form);
      // console.info(file.type);
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword";
      // jpg、png、jpeg、doc、docx、xls、xlsx、pdf
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    proTypeName(val) {
      let proType = {};
      this.proTypeList.forEach((items) => {
        if (val == items.id) {
          proType = items;
        } else {
          if (items.crmIntermSerprices && items.crmIntermSerprices.length > 0) {
            items.crmIntermSerprices.forEach((item) => {
              if (val == item.id) {
                proType = item;
              }
            });
          }
        }
      });
      return proType.name || "";
    },
    proTypeChange(val) {
      let proType = {};
      this.proTypeList.forEach((items) => {
        if (items.crmIntermSerprices && items.crmIntermSerprices.length == 0) {
          if (val == items.id) {
            proType = items;
            this.bookFeesType = items.type;
          }
        } else if (
          items.crmIntermSerprices &&
          items.crmIntermSerprices.length > 0
        ) {
          items.crmIntermSerprices.forEach((ite) => {
            if (val == ite.id) {
              proType = ite;
              this.bookFeesType = ite.type;
            }
          });
        } else {
          if (items.crmIntermSerprices && items.crmIntermSerprices.length > 0) {
            items.crmIntermSerprices.forEach((item) => {
              if (val == item.id) {
                proType = item;
              }
            });
          }
        }
      });
      this.serve.serpriceName = proType.name;
      this.serve.accountType = proType.type;
      this.serve.price = proType.highestPrice
        ? proType.highestPrice
        : proType.price;
      if (this.serve.discountType == 10) {
        this.serve.moneyReceived = proType.price;
        this.serve.serveType = proType.type;
        this.serve.cycleType =
          proType.type == 10
            ? "100"
            : this.serve.cycleType == "100"
            ? "30"
            : this.serve.cycleType;
      }
    },
    command(value) {
      revocation({ id: this.form.id }).then((res) => {
        this.activeName = "detail";
        this.initDate();
        // this.close();
      });
    },
    close() {
      this.$emit("update:visible", false);
      // let path =  this.$route.path
      // console.info(path)
      // if(path=='/agent/agentList'){
      //   this.$router.push('/financeCustomer/customerList')
      // }
    },

    // 修改合同
    reviseContractFun(items) {
      this.heText = "修改合同";
      this.reviseContractJudge = true; //修改合同
      if (items) {
        this.reviseContractForm.companyId = items.id;
      }
      selectNewContractParticulars({
        id: this.reviseContractForm.companyId,
      }).then((res) => {
        this.reviseContractForm = res.data;
        this.changeData = {
          id: this.reviseContractForm.id,
          controlNo: this.reviseContractForm.controlNo, //合同编号
          busirSerpriceIds: this.reviseContractForm.busirSerpriceIds, //服务项目的id (多个)
          companyId: this.reviseContractForm.companyId, //公司id
          money: this.reviseContractForm.money, //合同金额
          servicePeriodEnd: this.reviseContractForm.servicePeriodEnd,
          signingDate: this.reviseContractForm.signingDate,
          validity: this.reviseContractForm.validity, //合同生效期
          imgfileIds: this.reviseContractForm.imgfileIds
            ? this.reviseContractForm.imgfileIds.toString()
            : "",
        };
      });
    },
    // 变更合同
    changeContractFun(items) {
      this.heText = "变更合同";
      this.reviseContractJudge = true; //修改合同
      if (items) {
        this.reviseContractForm.companyId = items.id;
      }
      selectNewContractParticulars({
        id: this.reviseContractForm.companyId,
      }).then((res) => {
        this.reviseContractForm = res.data;
      });
    },
    // 修改合同
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => {
        if (item) {
          return item.id;
        }
      });
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    updateDate(data) {
      updateContractAndSerprice(data).then((res) => {
        // console.info(res);
      });
    },
    // 修改合同-提交按钮
    contractSubmit() {
      let data = {
        id: this.reviseContractForm.id,
        controlNo: this.reviseContractForm.controlNo, //合同编号
        busirSerpriceIds: this.reviseContractForm.busirSerpriceIds, //服务项目的id (多个)
        companyId: this.reviseContractForm.companyId, //公司id
        money: this.reviseContractForm.money, //合同金额
        servicePeriodEnd: this.reviseContractForm.servicePeriodEnd,
        servicePeriodStart: this.reviseContractForm.servicePeriodStart,
        signingDate: this.reviseContractForm.signingDate,
        validity: this.reviseContractForm.validity, //合同生效期
        imgfileIds: this.reviseContractForm.imgfileIds ? this.reviseContractForm.imgfileIds.toString() : "",
      };
      console.log(this.heText)
      if (this.heText == "变更合同") {
        data.changeType = 10;
        data.changeRemarks = this.reviseContractForm.changeRemarks || "";
        contractUpdate(data).then((res) => {
          this.reviseContractJudge = false;
          // this.getContractList(this.companyId);
          this.msgSuccess("提交成功");
        });
      } else {
        if (data.changeType) {
          delete data.changeType;
        }
        if (JSON.stringify(this.changeData) == JSON.stringify(data)) {
          this.reviseContractJudge = false;
        } else {
          contractUpdate(data).then((res) => {
            // this.getContractList(this.companyId);
            this.reviseContractJudge = false;
            this.msgSuccess("提交成功");
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.modificationhTImg {
  margin-bottom: 40px;
  .el-image {
    width: 200px;
    height: 142px;
  }
}
.htImg {
  padding: 0 10px;
}
.maxh {
  display: flex;
  flex-direction: column;
  max-height: calc(85vh - 180px) !important;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.detail_vi {
  .title_vi {
    & > span {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
  }
}

.step-vi {
  display: flex;
  height: 70px;
  align-items: center;
  border-bottom: 1px solid #e6e7eb;
  margin-top: -14px;
  margin-bottom: 20px;

  & > * {
    width: 100%;
  }
}
.material_science {
  padding-top: 6px;
  padding-bottom: 15px;
  .file_item {
    display: flex;
    flex-direction: column;
    align-items: center;

    &:last-child {
      & > div {
        border-bottom: 0 !important;
      }
    }

    & > div:not(.title_vi) {
      width: calc(100% - 64px);
      border-bottom: 1px #e6e7eb dashed;
      padding-bottom: 22px;
    }

    .title_vi {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0px transparent solid;
      height: 184px;
      box-sizing: border-box;
      padding: 0 32px;
      padding-top: 54px;
      .title {
        margin-left: 8px;
        color: #303133;
        font-size: 18px;
        font-family: Arial;
        font-weight: 400;
      }
    }

    .file {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      & > a {
        width: 100%;
        height: 132px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f8f9fb;
      }
      & > div {
        width: 100%;
        height: 132px;
      }

      & > span {
        margin-top: 12px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #565759;
      }
    }
  }
}
.colorCss {
  color: blue;
}
.file_vi {
  padding-top: 6px;

  .file_item {
    display: flex;
    flex-direction: column;
    align-items: center;

    &:last-child {
      & > div {
        border-bottom: 0 !important;
      }
    }

    & > div:not(.title_vi) {
      width: calc(100% - 64px);
      border-bottom: 1px #e6e7eb dashed;
      padding-bottom: 22px;
    }

    .title_vi {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0px transparent solid;
      height: 54px;
      box-sizing: border-box;
      padding: 0 32px;
      padding-top: 54px;
      .title {
        margin-left: 8px;
        color: #303133;
        font-size: 18px;
        font-family: Arial;
        font-weight: 400;
      }
    }

    .file {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      & > a {
        width: 100%;
        height: 132px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f8f9fb;
      }
      & > div {
        width: 100%;
        height: 132px;
      }

      & > span {
        margin-top: 12px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #565759;
      }
    }
  }
}

.table_vi {
  display: flex;
  flex-direction: column;
  width: 100%;

  .sub_title_vi {
    width: 100%;
    max-width: calc(100% - 64px);
    border-top: 0;
    margin-left: 32px;
    justify-content: space-between;
    padding-bottom: 4px;
    padding-top: 12px;
  }

  .el-table {
    margin-top: 0px !important;
    margin-bottom: 0 !important;
  }
}

.table_sum {
  height: 40px;
  min-height: 40px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  border-top: 1px #e6e7eb solid;
  padding-left: 32px;

  span {
    color: #a1a2a6;
    font-size: 12px;
    font-family: Microsoft YaHei;

    &:first-child {
      font-size: 14px;
      font-weight: bold;
      color: #565759;
      margin-right: 8px;
    }
  }
}

/*滚动条整体样式*/
.ql-container ::-webkit-scrollbar {
  width: 10px; /*竖向滚动条的宽度*/
  height: 10px; /*横向滚动条的高度*/
}
.ql-container ::-webkit-scrollbar-thumb {
  /*滚动条里面的小方块*/
  background: #666666;
  border-radius: 5px;
}
.ql-container ::-webkit-scrollbar-track {
  /*滚动条轨道的样式*/
  background: #ccc;
  border-radius: 5px;
}
.ql-container.ql-snow {
  min-height: 260px;
}
.quill-editor.ql-snow.ql-editor {
  padding: 0;
}
/*自定义字体大小*/
/deep/.ql-snow .ql-picker.ql-size,
/deep/.ql-snow .ql-picker.ql-header {
  width: 75px !important;
}

/deep/.ql-snow .ql-picker.ql-font {
  width: 80px !important;
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
  content: "10px";
  font-size: 16px;
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
  font-size: 16px;
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
  font-size: 16px;
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
  font-size: 16px;
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  content: "18px";
  /*font-size: 18px;*/
  font-size: 16px;
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
  font-size: 16px;
  /*font-size: 20px;*/
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
  font-size: 16px;
  /*font-size: 24px;*/
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
  content: "32px";
  font-size: 16px;
  /*font-size: 32px;*/
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
  content: "36px";
  font-size: 16px;
  /*font-size: 36px;*/
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="48px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="48px"]::before {
  content: "48px";
  font-size: 16px;
  /*font-size: 48px;*/
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="64px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="64px"]::before {
  content: "64px";
  font-size: 16px;
  /*font-size: 64px;*/
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="72px"]::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="72px"]::before {
  content: "72px";
  font-size: 16px;
  /*font-size: 72px;*/
}
</style>
<style lang="scss">
.PaymentCollectionTable {
  .el-table__body-wrapper {
    height: 500px !important;
    overflow: auto !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
}
.richText {
  .edit_container {
    .quill-editor {
      .ql-toolbar.ql-snow + .ql-container.ql-snow {
        .ql-editor {
          height: 400px;
        }
      }
    }
  }
}
.file-uploader {
  background-color: #f8f9fb;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    span {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #a1a2a6;
    }
  }
}

.tip_vi {
  height: 34px;
  display: flex;
  align-items: center;
  background-color: #fdf6f0;
  border: 1px #faeee1 solid;
  border-radius: 2px;
  color: #f3a35f;

  span {
    color: #6e7073;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }
}

.edit_order {
  .order_dialog {
    margin-top: 6vh !important;
    background-color: #f5f6f8 !important;
    .title-vi {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      /*border-bottom: 1px #E6E7EB solid;*/
      box-sizing: border-box;
      justify-content: space-between;

      & > div:first-child {
        margin-left: 24px;
        display: flex;
        align-items: center;

        & > div {
          margin-right: 8px;
          background: #3978e7;
          height: 28px;
          width: 28px;
          border-radius: 3px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        span {
          color: #303133;
          font-family: Microsoft YaHei;
          font-size: 16px;
        }
      }

      .control {
        display: flex;
        align-items: center;
        height: 100%;

        & > * {
          height: 100%;
          max-height: 100%;
          width: 56px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-left: 1px #e6e7eb solid;
          cursor: pointer;
          user-select: none;

          &:hover {
            background: #ffffff;
          }

          .el-dropdown-link {
            user-select: none;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            outline: none;
          }
        }
      }
    }

    .mih {
      min-height: 64vh;
      max-height: calc(90vh - 172px) !important;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .el-dialog__body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;

      & > * {
        width: 100%;
      }
    }

    .dialog-footer {
      text-align: right;
      padding-top: 24px;
      margin-bottom: -8px;
    }

    .el-tabs {
      .el-tabs__header {
        background-color: #ffffff;
        margin-bottom: 0px;
      }

      .el-tabs__item.is-top {
        font-size: 14px;
        padding-left: 19px;
        padding-right: 19px;
        height: 56px;
        line-height: 56px;

        &:nth-child(2) {
          padding-left: 32px;
        }

        &:last-child {
          padding-right: 32px;
        }
      }

      .el-tabs__nav {
        max-width: 100%;
      }

      .el-tabs__nav-wrap::after {
        background-color: transparent;
      }

      .el-tabs__content {
        margin-top: 20px;

        .el-tab-pane {
        }
      }
    }

    .hidden_tab {
      .order_vi {
        height: calc(90vh - 230px) !important;
      }
    }

    .order_vi {
      height: calc(90vh - 260px - 36px);
      max-height: 100vh;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .add-button {
      margin-left: 32px;
      max-width: 100%;
      width: calc(100% - 64px);
      border: 1px #e6e7eb dashed;
    }

    .project_vi {
      padding-top: 32px;
      display: flex;
      flex-direction: column;
    }

    .el-form-item {
      width: 100%;

      .el-input {
        width: 100% !important;
      }
    }

    .remark_vi {
      margin: 24px 32px 30px 32px;
      width: calc(100% - 64px);

      .el-textarea__inner {
        border-radius: 2px;
        min-height: 98px !important;
      }
    }
  }
}

.serve_dialog {
  .el-radio-group {
    .el-radio {
      margin-right: 26px !important;

      &:last-child {
        margin-right: 0 !important;
      }
    }
  }

  .el-dialog__body {
    .el-form {
      margin: 0;
    }
  }
}

.MaterialAccessories {
  .el-dialog {
    margin-top: 6vh !important;
  }
  .el-dialog .el-dialog__body {
    height: 822px !important;
  }
}
</style>
