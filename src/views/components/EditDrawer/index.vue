<template>
  <!-- 查看创建订单 -->
  <div class="drawer-vi">
    <drawer
      :visible.sync="view"
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
                <li
                  v-for="(item, index) in footprintList"
                  :key="index"
                  class="list-item"
                >
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
                <div style="width: 100%">
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
                    <el-form-item label="客户编号">
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
                    <el-form-item label="企业税号">
                      <el-input
                        placeholder="请输入您的企业税号"
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
                    <el-form-item label="服务顾问">
                      <el-input
                        placeholder="请输入您的服务顾问"
                        class="mw222"
                        size="small"
                        v-model="form.createBy"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纳税性质">
                      <el-select
                        class="mw222"
                        size="small"
                        :disabled="readonly"
                        v-model="form.vatCollection"
                        placeholder="请选择纳税性质"
                        @change="modifyForm({ vatCollection: $event })"
                      >
                        <el-option
                          v-for="(item, index) in PayTaxesList"
                          :label="item.name"
                          :value="item.labelId"
                          :key="index"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系人">
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
                    <el-form-item label="联系方式">
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
                    <el-form-item label="行业分类">
                      <el-cascader
                        placeholder="请选择行业分类"
                        class="mw222"
                        size="small"
                        filterable
                        :disabled="readonly"
                        :options="industryMap"
                        v-model="form.industryName"
                        :props="{
                          label: 'name',
                          value: 'id',
                          children: 'broadList',
                        }"
                        @change="updateForm({ industryName: $event })"
                      ></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户类型">
                      <el-select
                        class="mw222"
                        size="small"
                        :disabled="readonly"
                        v-model="form.clientType"
                        placeholder="请选择客户类型"
                        @change="updateForm({ clientType: $event })"
                      >
                        <el-option
                          v-for="item in clientType"
                          :label="item.dictName"
                          :value="item.dictCode"
                          :key="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户状态">
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
                  <el-col :span="12">
                    <el-form-item label="业务描述">
                      <el-input
                        type="textarea"
                        v-model="form.categoryText"
                        class="mw222"
                        size="small"
                        :readonly="readonly"
                        @change="updateForm({ categoryText: $event })"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="详细地址">
                      <el-input
                        type="textarea"
                        v-model="form.address"
                        class="mw222"
                        :readonly="readonly"
                        size="small"
                        @change="updateForm({ address: $event })"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户等级">
                      <el-select
                        class="mw222"
                        size="small"
                        :disabled="readonly"
                        v-model="form.clientLv"
                        placeholder="请选择客户等级"
                        @change="updateForm({ clientLv: $event })"
                      >
                        <el-option
                          v-for="item in clientLvList"
                          :label="item.dictName"
                          :value="item.dictCode"
                          :key="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <!-- <el-col :span="12">
                    <el-form-item label="意向度">
                      <el-select
                        class="mw222"
                        size="small"
                        :disabled="readonly"
                        v-model="form.opinion"
                        placeholder="请选择意向度"
                        @change="updateForm({ opinion: $event })"
                      >
                        <el-option
                          v-for="item in opinionList"
                          :label="item.dictName"
                          :value="item.dictCode"
                          :key="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="12">
                    <el-form-item label="客户来源">
                      <el-select
                        class="mw222"
                        size="small"
                        :disabled="readonly"
                        v-model="form.clientSource"
                        placeholder="请选择客户来源"
                        @change="updateForm({ clientSource: $event })"
                      >
                        <el-option
                          v-for="item in clientSourceList"
                          :label="item.dictName"
                          :value="item.dictCode"
                          :key="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户标签">
                      <div class="tag-vi mw222">
                        <el-tag
                          :key="index"
                          v-for="(tag, index) in form.userlabelIds"
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
                          size="small"
                          :readonly="readonly"
                          @keyup.enter.native="handleInputCallback"
                          @blur="handleInputCallback"
                        >
                        </el-input>
                        <el-button
                          v-else
                          class="button-new-tag"
                          size="small"
                          v-show="!readonly"
                          @click="showInput"
                          icon="el-icon-plus"
                          >添加标签
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="是否切老户:" prop="form.companies">
                      <el-radio
                        :disabled="companiesEnable == 20"
                        @change="updateForm({ companies: $event })"
                        v-for="item in yesNoList"
                        :key="item.index"
                        v-model="form.companies"
                        :label="item.dictCode"
                        >{{ item.dictLabel }}</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="跟进记录" name="third">
            <div class="follow_list">
              <!-- <el-row>
                <el-col :span="24">
                  <el-button
                    class="add-button"
                    size="small"
                    icon="el-icon-plus"
                    @click="addFollow"
                    :disabled="readonly"
                    >添加跟进记录
                  </el-button>
                </el-col>
              </el-row> -->
              <!-- 新增跟进记录 -->
              <el-form
                :model="followForm"
                :rules="followRules"
                :inline="true"
                ref="followForm"
                label-width="108px"
                style="margin-top: 0px"
              >
                <!-- v-show="addFollowShow" -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="本次跟进方式" prop="type">
                      <el-select
                        v-model="followForm.type"
                        class="mw222"
                        placeholder="请选择跟进方式"
                      >
                        <el-option
                          v-for="item in followTypeList"
                          :label="item.dictName"
                          :value="item.dictCode"
                          :key="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="本次跟进记录">
                      <el-input
                        type="textarea"
                        autosize
                        v-model="followForm.theContent"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="上传附件" style="margin-bottom: 0px">
                      <el-upload
                        ref="upload"
                        class="upload-file"
                        :headers="headers"
                        :action="uploadUrl"
                        :data="{ type: 20 }"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="uploadSuccess"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        list-type="picture"
                      >
                        <el-button icon="el-icon-upload2" size="small"
                          >点击上传
                        </el-button>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="flex aic">
                    <el-form-item label="下次提醒时间" prop="nextFollowTime">
                      <el-date-picker
                        style="width: 174px"
                        v-model="followForm.nextFollowTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <span class="ml8 mr10 mb18" style="color: #303133">-</span>
                    <el-form-item label="" prop="tempTime">
                      <el-time-picker
                        style="width: 174px"
                        value-format="HH:mm:ss"
                        v-model="followForm.tempTime"
                        :picker-options="{
                          selectableRange: '00:00:00 - 23:59:59',
                        }"
                        placeholder="选择时间"
                      >
                      </el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="下次跟进内容" prop="nextContent">
                      <el-input
                        type="textarea"
                        autosize
                        v-model="followForm.nextContent"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label=" " class="mt8">
                      <el-button type="primary" @click="followFormSubmit"
                        >立即添加
                      </el-button>
                      <el-button @click="followReset">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- 跟进记录列表渲染 -->
              <el-row style="margin-top: 12px">
                <el-col>
                  <!-- <span>{{followList}}</span> -->
                  <div
                    v-for="(item, index) in followList"
                    :key="index"
                    class="follow_item"
                  >
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <div class="info_vi">
                        <span>{{ item.createBy }}</span>
                        <span v-show="!!item.type"
                          >通过{{ followTypeFormat(item) }}</span
                        >
                        <span>{{ item.createDate }}</span>
                      </div>
                      <span>{{ item.theContent }}</span>
                      <div class="img_vi">
                        <el-image
                          class="img"
                          v-for="(img, index) in item.recordImgParamList || []"
                          :key="index"
                          :src="filePath + img.url"
                          :preview-src-list="
                            previewImg(item.recordImgParamList)
                          "
                        >
                        </el-image>
                      </div>
                      <div class="next_vi">
                        <div>
                          <span>下次跟进时间</span>
                          <span>{{ item.nextDate }}</span>
                        </div>
                        <div>
                          <span>下次跟进内容</span>
                          <span>{{ item.nextContent }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <!-- v-if="!(isWaiqin&&!isown)" -->
          <el-tab-pane
            :label="'联系人(' + (contactsList.length || 0) + ')'"
            name="fourth"
            v-if="!(isWaiqin && isown != '10')"
          >
            <!-- 联系人列表渲染 -->
            <div class="contacts_vi">
              <el-row :gutter="20">
                <el-col
                  :span="12"
                  v-for="(item, index) in contactsList"
                  :key="index"
                >
                  <div class="contacts_item">
                    <div class="title" style="margin-bottom: 0px">
                      <div>
                        <img src="@/assets/image/contacts.png" />
                        <el-input
                          style="width: 110px"
                          class="name"
                          v-model="item.name"
                          :readonly="readonly"
                          placeholder="请填写姓名"
                          @change="updateContactFun({ name: $event }, item)"
                        ></el-input>
                        <div class="lianxiren">
                          <span class="contactsSY" v-if="item.sort == '0'">
                            首要联系人
                          </span>
                          <span
                            class="shareholderPositionType"
                            v-if="item.shareholderPositionType == 10"
                          >
                            公司法人
                          </span>
                          <span
                            class="shareholderPositionType"
                            v-else-if="item.shareholderPositionType == 20"
                          >
                            监理
                          </span>
                          <span
                            class="shareholderPositionType"
                            v-else-if="item.shareholderPositionType == 30"
                          >
                            董事长
                          </span>
                          <span
                            class="shareholderPositionType"
                            v-else-if="item.shareholderPositionType == 40"
                          >
                            董事
                          </span>
                          <span
                            class="shareholderPositionType"
                            v-else-if="item.shareholderPositionType == 50"
                          >
                            经理
                          </span>
                          <span
                            class="shareholderPositionType"
                            v-else-if="item.shareholderPositionType == 60"
                          >
                            其他
                          </span>
                        </div>
                      </div>
                      <el-dropdown class="downCss" trigger="click">
                        <el-button type="text" plain class="downCss">
                          <div class="el-icon-more iconB"></div>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <span @click="changesContact(item)"
                              >设为首要联系人</span
                            >
                          </el-dropdown-item>
                          <el-dropdown-item divided>
                            <span @click="delContactFun(item)" class="spanCs"
                              >删除</span
                            >
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                    <el-form
                      label-width="40px"
                      label-position="left"
                      :inline="true"
                    >
                      <el-form-item label="职位">
                        <el-input
                          v-model="item.positionId"
                          :readonly="readonly"
                          placeholder="请填写职位"
                          @change="
                            updateContactFun({ positionId: $event }, item)
                          "
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="手机">
                        <el-input
                          v-model="item.mobile"
                          :readonly="readonly"
                          placeholder="请填写手机"
                          @change="updateContactFun({ mobile: $event }, item)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="电话">
                        <el-input
                          v-model="item.officePhone"
                          :readonly="readonly"
                          placeholder="请填写电话"
                          @change="
                            updateContactFun({ officePhone: $event }, item)
                          "
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="微信">
                        <el-input
                          v-model="item.wechatId"
                          :readonly="readonly"
                          placeholder="请填写微信"
                          @change="updateContactFun({ wechatId: $event }, item)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="QQ">
                        <el-input
                          v-model="item.qqNumber"
                          :readonly="readonly"
                          placeholder="请填写QQ"
                          @change="updateContactFun({ qqNumber: $event }, item)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱">
                        <el-input
                          v-model="item.mailbox"
                          :readonly="readonly"
                          placeholder="请填写邮箱"
                          @change="updateContactFun({ mailbox: $event }, item)"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
                <el-col :span="12" v-if="!readonly">
                  <div class="contacts_add" @click="addContactFun">
                    <div>
                      <span></span>
                      <span></span>
                    </div>
                    <span>新增联系人</span>
                  </div>
                </el-col>
              </el-row>
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
              <div class="mt20">
                <el-table :data="orderList">
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
                      >
                        {{ scope.row.orderNo }}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="订单状态"
                    align="center"
                    :formatter="auditorStateFormat"
                  />
                  <el-table-column
                    label="签单日期"
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

                    <!-- v-if="!(item.accountType == 10)&&item.auditorState==20&&item.dispatchState==20"
                      :disabled="item.renewType == 10 || readonly"  续费的状态显示-->
                    <!--     <el-button
                      v-if="item.marketBusirSerprices.some(item=>(item.accountType==20))"
                      :disabled="item.renewType == 10|| readonly"
                      type="warning"
                      @click.native="renew(item)"
                      size="mini"
                      plain
                      >续费
                    </el-button> -->
                    <div
                      v-if="
                        item.marketBusirSerprices.some(
                          (items) => items.accountType == 20
                        )
                      "
                    >
                      <el-button
                        type="warning"
                        v-if="
                          (item.orderType == '20' || item.orderType == '30') &&
                          item.successfulRenewal == ''
                        "
                        @click.native="renew(item)"
                        size="mini"
                        plain
                        >续费
                      </el-button>
                    </div>
                    <div style="margin-left: 10px" class="flex-row aic">
                      <el-button
                        plain
                        size="mini"
                        type="success"
                        @click="openDetail(item)"
                        v-if="item.nzAudit == 20 || item.nzAudit == 10"
                        >预览
                      </el-button>
                      <el-button
                        plain
                        size="mini"
                        type="info"
                        @click="changeContractFun(item)"
                        v-if="item.nzAudit == 20"
                        :disabled="item.changeGeneralStatus == 10"
                        >变更
                      </el-button>
                      <el-button
                        plain
                        type="danger"
                        @click="delContractFun(item)"
                        size="mini"
                        v-if="item.nzAudit == '' || item.nzAudit == 30"
                        >作废
                      </el-button>
                      <el-button
                        v-if="item.nzAudit == '' || item.nzAudit == 30"
                        type="primary"
                        @click="reviseContractFun(item)"
                        size="mini"
                        plain
                        >修改合同
                      </el-button>
                    </div>
                  </div>
                  <el-row class="kind">
                    <el-col :span="11">
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
                            >{{
                              parseTime(item.servicePeriodStart, "{y}-{m}-{d}")
                            }}至{{
                              parseTime(item.servicePeriodEnd, "{y}-{m}-{d}")
                            }}
                          </span>
                        </span>
                      </div>
                    </el-col>
                    <el-col :span="13">
                      <div class="name">
                        <!-- item.length!=''&& item.length!=1?item.serpriceName:item.serpriceName -->
                        <span
                          >服务项目:<span
                            class="span"
                            v-for="(item, index) in item.marketBusirSerprices"
                            :key="index"
                            >{{
                              item.length == 0
                                ? item.item.serpriceName
                                : item.serpriceName
                            }}</span
                          ></span
                        >
                        <span
                          >合同金额:<span class="color span"
                            >￥{{ item.money }}</span
                          ></span
                        >
                        <!-- <span
                          >收费周期:<span class="span"></span><span v-for="ite in feesCycleList" :key="ite.dictCode">
                            {{
                              item.cycleType==ite.dictCode?ite.dictName:null
                          }}</span></span
                        > -->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row
                    class="kind"
                    style="margin-top: 0"
                    v-if="item.conType != 'HM'"
                  >
                    <el-col :span="4">
                      <div class="name">
                        <span>合同照片</span>
                        <span
                          class="contractImg"
                          v-for="val in item.marketCompbusiImgfileResults"
                          :key="val.id"
                        >
                          <!-- style="width:500px;height:800px" -->
                          <el-image
                            :src="filePath + val.url"
                            :preview-src-list="
                              item.marketCompbusiImgfileResults.map((ite) => {
                                return filePath + ite.url;
                              })
                            "
                          >
                          </el-image>
                        </span>
                        <span></span>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-tag
                        type="success"
                        v-if="item.renewType == 20"
                        size="mini"
                        >成功</el-tag
                      >
                      <el-tag
                        type="warning"
                        v-if="item.renewType == 10"
                        size="mini"
                        >待审核</el-tag
                      >
                      <el-tag
                        type="danger"
                        v-if="item.renewType == 30"
                        size="mini"
                        >失败</el-tag
                      >
                      <el-popover
                        v-if="
                          item.reviewerRemarks &&
                          (item.renewType == 10 ||
                            item.renewType == 20 ||
                            item.renewType == 30)
                        "
                        placement="top-start"
                        title=""
                        width="200"
                        trigger="hover"
                        :content="item.reviewerRemarks"
                      >
                        <span
                          slot="reference"
                          style="
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            text-align: center;
                            border-radius: 50%;
                            border: 1px solid #d2d3d6;
                            color: #d2d3d6;
                            font-size: 10px;
                            margin-left: 8px;
                            line-height: 12px;
                          "
                          v-if="
                            item.renewType == 10 ||
                            item.renewType == 20 ||
                            item.renewType == 30
                          "
                          >?</span
                        >
                      </el-popover>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="企业信息" name="fiveth">
            <edit-company
              :companyInfo="enterpriseMessage"
              :vatTypeList="vatTypeList"
              :PayTaxesId="PayTaxesId"
              @updateInfo="entrepreneurMessageList"
              :readonly="readonly"
            ></edit-company>
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
    >
    </edit-order>
    <new-order
      :company="companyInfo"
      :visible.sync="newOrderVisible"
      :companyId="companyId"
      @editOrder="editOrderFun"
    >
    </new-order>
    <!-- 续费 -->
    <renew-contract
      :visible.sync="renewals"
      :form="renewForm"
      :orderId="orderId"
    ></renew-contract>

    <!-- 查看详情 -->
    <edit-contract
      :visible.sync="contractShow"
      :orderId="detailId"
      :contractId="contractId"
      :order="detailForm"
    ></edit-contract>

    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index: 2033"
      v-if="dialogVisibles"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
    <!-- 流失申请 -->
    <el-dialog
      title="流失申请"
      :visible.sync="openOffAudit"
      width="704px"
      append-to-body
      class="addCustomer businiss offApply"
    >
      <el-form
        ref="lossFrom"
        label-position="labelPosition"
        class="chengjiao"
        :rules="lossRules"
        :model="lossFrom"
      >
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="12">
            <el-form-item label="流失客户" prop="companyName">
              <el-input
                :readonly="true"
                placeholder="请输入客户名称"
                v-model="lossFrom.companyName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流失原因" prop="churnReason">
              <el-select
                v-model="lossFrom.churnReason"
                placeholder="请选择流失原因"
              >
                <el-option
                  v-for="item in reasonsList"
                  :label="item.dictLabel"
                  :key="item.dictCode"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="原因说明" class="tax" prop="churnDescription">
              <el-input
                type="textarea"
                style="width: 100%; height: 98px"
                placeholder="请输入流失原因说明"
                v-model="lossFrom.churnDescription"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer bottom">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">提交申请</el-button>
      </div>
    </el-dialog>
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
                    handleFileSuccess(
                      res,
                      file,
                      files,
                      { id: collections.id },
                      20
                    )
                "
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
        <el-button type="primary" @click="contractSubmits">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import {
  delClient,
  getClient,
  addContact,
  delContact, //删除联系人/
  updateContact,
  changeContact, //设置首要联系人
  getContactsList, //联系人
  getContracRecordtList, //合同列表
  addContract, //新增合同
  alterClient, //修改客户信息
  addFollowRecord, //新增跟进记录
  getFollowRecordList, //根据id回显跟进记录
  getOpportunityFootprintList,
  entrepreneurMessageLiaison, //企业信息
  PayTaxes, //纳税性质
  ModifyPayTaxes, //修改纳税性质
} from "@/api/crm/customer/customer";
import { mapState } from "vuex";
import {
  listOrder,
  selectNewContractParticulars, //修改合同的合同详情
  contractUpdate, ////修改合同的合同详情--提交
} from "@/api/crm/order";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
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
import EditOrder from "@/views/components/EditOrder";
import NewOrder from "@/views/components/NewOrder";
import EditCompany from "@/views/components/EditCompany";
import RenewContract from "@/views/components/RenewContract";
import EditContract from "@/views/components/EditContract";
import { getMapIndustry } from "@/api/crm/index"; //行业分类
import { fakeDelContract } from "@/api/crm/contract";
import {
  contractProjectRenewalDetails,
  findPayMethod,
} from "@/api/crm/customerService/agentAccount";
import {
  runApplyList,
  runParticulars,
  runApply,
  runRecover, //流失恢复
} from "@/api/crm/runApplyRecover/runApplyRecover";
export default {
  components: {
    EditOrder,
    EditCompany,
    NewOrder,
    RenewContract,
    ElImageViewer,
    EditContract,
    pdfShow,
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
    isown: {
      //是不是自己创建
      type: [Number, String],
      default: "10",
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
    ...mapState({
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
    isWaiqin() {
      return this.$store.getters.roleCodes.some((item) => {
        return item == "fieldSupervisor" || item == "fieldClerk";
      });
    },
    titleName() {
      return "客户资料";
    },
    view: {
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
    //订单状态
    orderType() {
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
  },
  data() {
    return {
      xufei: "查看详情",
      contractShow: false,
      detailId: "", //订单详情id
      // 查询参数
      queryParams: {
        companyId: null,
        id: null,
      },
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisibles: false,
      // 遮罩层
      load: false,
      loading: false,
      renewals: false,
      title: "",
      headers: {
        Authorization: _getSessionStore(tokenKey),
      },
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
      detailForm: {},
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
      customerRatingList: [], //客户等级字典
      followTypeList: [], //跟进方式字典
      proTypeName: "",
      fileList: [],
      orderList: [],
      customerStatusList: [],
      stepIndex: 0,
      activeName: "first",
      contractList: [],
      yesNoList: [], //切老户
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
      contractId: "", //续费合同id
      detailForm: {},
      PayTaxesList: [], //纳税性质
      PayTaxesId: null, //纳税性质Id
      feesCycleList: [], //收费周期
      openOffAudit: false, //流失审核弹出层
      changeData: {},
      //流失申请表单验证
      lossRules: {
        churnReason: [
          {
            required: true,
            message: "流失原因不能为空",
            trigger: "blur",
          },
        ],
        churnDescription: [
          {
            required: true,
            message: "流失原因说明不能为空",
            trigger: "blur",
          },
        ],
      },
      UprunApplyFrom: {}, //流失申请
      reasonsList: [], //流失原因
      lossFrom: {},
      heText: "修改合同",
      // pdf信息
      pdfUrl: "",
      pdfShow: false,
      reviseContractJudge: false, //修改合同判断值
      reviseContractForm: {}, //修改合同
      fileUrl:
        process.env.VUE_APP_CRM_API + "/hmkj-crm/marketCompbusiImgfile/upload", //附件上传
      feesList: [],
      companiesEnable: null, //判断切老户是否能改
      wqCustomerCreatorType: null, //判断是否是自己创建的
    };
  },
  created() {
    //流失原因
    this.getDicts("reasons_for_loss").then((res) => {
      this.reasonsList = res.data;
    });
    this.getDicts("sys_yes_no").then((res) => {
      this.yesNoList = res.data;
    });
  },

  methods: {
    // 设置首要联系人
    changesContact(row) {
      this.queryParams.companyId = row.companyId;
      this.queryParams.id = row.id;
      changeContact(this.queryParams).then((res) => {
        this.getContacts(this.form.id);
        console.log(res);
      });
    },
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
      //收费周期
      this.getDicts("fees_cycle").then((res) => {
        this.feesCycleList = res.data;
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
      this.lossFrom = {};
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
      console.log(command);
      console.log(this.form);
      if (command == "1") {
        // this.reset()
        this.openOffAudit = true;
        this.lossFrom = {
          companyName: this.form.companyName,
          id: this.form.id,
          churnReason: "",
          churnDescription: "",
        };
        // const ids = this.form.id;
        // this.$confirm("是否确认此删除客户信息?", "警告", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(function() {
        //     return delClient({ id: ids });
        //   })
        //   .then(() => {
        //     this.view = false;
        //     this.msgSuccess("删除成功");
        //   })
        //   .catch(function() {});
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
            return toMareLiberum({
              id: ids,
            });
          })
          .then(() => {
            this.getList();
            this.view = false;
            this.msgSuccess("释放成功");
          })
          .catch(function () {});
      }
    },
    // 申请提交按钮
    submitForm() {
      delete this.lossFrom.companyName;
      console.log(this.lossFrom);
      this.$refs["lossFrom"].validate((valid) => {
        if (valid) {
          runApply(this.lossFrom).then((response) => {
            this.openOffAudit = false;
            this.msgSuccess("申请成功");
            // this.getList();
          });
        }
      });
    },

    // 足迹列表
    getFootprintList(id) {
      getOpportunityFootprintList(id).then((response) => {
        this.footprintList = response.data;
      });
    },
    //跟进记录
    getFollowList(id) {
      this.followReset();
      getFollowRecordList({
        id: id,
        classify: 20,
      }).then((response) => {
        this.followList = response.data;
      });
    },
    //联系人
    getContacts(id) {
      getContactsList({
        id: id,
      }).then((response) => {
        this.contactsList = response.data;
      });
    },
    // 合同列表
    getContractList(id) {
      getContracRecordtList({
        id: id,
      }).then((response) => {
        response.data.map((items) => {
          items.conType = items.controlNo.substring(0, 2);
        });
        this.contractList = response.data;
      });
    },
    // 预览pdf
    viewContractFun(row) {
      console.info(row.path);
      this.pdfUrl = row.path || "";
      this.pdfShow = true;
    },
    // 作废
    delContractFun(row) {
      console.log(row);
      this.$confirm("是否确认作废该项目合同?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return fakeDelContract({ id: row.id });
        })
        .then(() => {
          this.getContractList(this.companyId);
          this.msgSuccess("作废成功");
        })
        .catch(function () {});
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
    reviseContractFun(items) {
      this.reviseContractJudge = true; //修改合同
      this.heText = "修改合同";
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
          imgfileIds: this.form.imgfileIds
            ? this.form.imgfileIds.toString()
            : "",
        };
        console.log(this.changeData);
      });
    },
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
    contractSubmits() {
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
        imgfileIds: this.form.imgfileIds ? this.form.imgfileIds.toString() : "",
      };
      if (this.heText == "变更合同") {
        data.changeType = 10;
        data.changeRemarks = this.reviseContractForm.changeRemarks || "";
        contractUpdate(data).then((res) => {
          this.reviseContractJudge = false;
          this.getContractList(this.companyId);
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
            this.getContractList(this.companyId);
            this.reviseContractJudge = false;
            this.msgSuccess("提交成功");
          });
        }
      }
    },
    getOrderList(id) {
      listOrder({
        id: id,
      }).then((res) => {
        this.orderList = res.data || [] || "";
      });
    },
    getDetail(id, cb) {
      getClient({
        id: id,
      }).then((response) => {
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
          this.companiesEnable = data.companiesEnable;
          console.log(this.companiesEnable);
          if (typeof cb == "function") {
            cb(response);
          }
        }
        getMapIndustry().then((response) => {
          this.industryMap = response.data;
        });
      });
      console.log(1111);
      PayTaxes({
        id: this.companyId,
      }).then((response) => {
        this.PayTaxesList = [];
        this.PayTaxesId = response.data.id;
        response.data.results.forEach((item) => {
          item.child.forEach((ite) => {
            if (ite.selectedType != "") {
              this.form.vatCollection = ite.id;
            }
            let tep = {};
            tep.labelId = ite.id;
            tep.name = ite.name;
            this.PayTaxesList.push(tep);
          });
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
      console.log(data);
      data.id = this.form.id;
      alterClient(data).then((response) => {
        if (response.code === 200) {
        }
      });
    },
    //修改纳税性质
    modifyForm(data) {
      ModifyPayTaxes({
        id: this.PayTaxesId,
        companyId: this.companyId,
        companyLabel: data.vatCollection,
      }).then((response) => {
        // console.log(response);
      });
    },

    // 新增跟进记录按钮
    addFollow() {
      this.followReset();
      this.addFollowShow = !this.addFollowShow;
    },
    /** 新增跟进记录提交按钮 */
    followFormSubmit() {
      this.$refs["followForm"].validate((valid) => {
        if (valid) {
          (this.followForm.classify = 20),
            (this.followForm.companyId = this.form.id); //添加跟进记录id
          this.followForm.nextDate =
            this.followForm.nextFollowTime + " " + this.followForm.tempTime;
          // console.log(this.followForm.nextDate);
          addFollowRecord(this.followForm).then((response) => {
            // console.info("新增跟进成功");
            if (response.code == 200) {
              this.msgSuccess("新增跟进成功");
              this.addFollowShow = false;
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
      // 判断一下是来自合同页面还是订单页面
      this.orderId = row.compayBusirId ? row.compayBusirId : row.id;
      this.orderVisible = true;
      this.hiddenTab = false;
    },
    //上传附件
    handleRemove(file, fileList) {
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
      this.followForm.imageIds = fileList
        .map((item) => {
          let temp = item.response;
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
        console.log(row);
        this.companyInfo = row;
      }
      this.newOrderVisible = true;
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
            return delContact({
              id: row.id,
            });
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
        this.updateForm({
          userlabelIds: res,
        });
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
      this.handleClose(tag, (res) => {
        this.updateForm({
          userlabelIds: res,
        });
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

    //续费查看详情
    openDetail(row) {
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
        this.detailForm = rows;
      }
    },

    //续费
    renew(row) {
      this.renewForm.xufei = false;
      let rows = {
        id: row.id,
        renewType: row.renewType,
        xufei: this.renewForm.xufei,
      };
      this.renewForm = rows;
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
      console.log(this.companyId);
      id = id || this.companyId;

      entrepreneurMessageLiaison({
        id: id,
        classify: 20,
      }).then((response) => {
        this.enterpriseMessage = response.data || {};
        if (this.enterpriseMessage.district) {
          this.enterpriseMessage.district = JSON.parse(
            this.enterpriseMessage.district
          );
        } else {
          let arr = [];
          try {
            arr.push(TextToCode[this.enterpriseMessage.province].code);
            arr.push(
              TextToCode[this.enterpriseMessage.province][
                this.enterpriseMessage.city
              ].code
            );
            arr.push(
              TextToCode[this.enterpriseMessage.province][
                this.enterpriseMessage.city
              ][this.enterpriseMessage.county].code
            );
          } catch (e) {
            // console.info(e);
          }
          this.enterpriseMessage.district = arr;
        }
        console.info("企业信息------");
        console.info(this.enterpriseMessage);
      });
      PayTaxes({ id: id }).then((response) => {
        this.vatTypeList = [];
        if (response.data.id) {
          this.PayTaxesId = (response.data.id || "").toString();
        } else {
          this.PayTaxesId = "";
        }
        console.log(this.PayTaxesId);
        response.data.results.forEach((item) => {
          item.child.forEach((ite) => {
            if (ite.selectedType != "") {
              this.enterpriseMessage.vatCollection = ite.id;
            }
            let tep = {};
            tep.labelId = ite.id;
            tep.name = ite.name;
            this.vatTypeList.push(tep);
          });
        });
      });
    },
  },
};
</script>

<style lang="scss">
.downCss {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  text-align: center;
}

.span {
  margin-left: 4px !important;
}

.spanCs {
  display: block;
  width: 100%;
  height: 100%;
}
.lianxiren {
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .contactsSY {
    text-align: center;
    display: inline-block;
    font-size: 10px;
    -webkit-transform: scale(0.8);
    color: white;
    line-height: 18px;
    width: 70px;
    height: 18px;
    background: #7480af;
    border-radius: 2px;
  }
  .shareholderPositionType {
    text-align: center;
    display: inline-block;
    font-size: 10px;
    -webkit-transform: scale(0.8);
    color: white;
    line-height: 18px;
    padding: 0 8px;
    height: 18px;
    background: #e6a23c;
    border-radius: 2px;
  }
}

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
