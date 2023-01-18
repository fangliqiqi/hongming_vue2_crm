<template>
  <div class="app-container">
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            trigger="manual"
            v-model="showSearch"
          >
            <!-- 筛选 -->
            <div class="search-popover">
              <el-form
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
              >
                <!-- <el-form-item label="内帐审核人:" prop="auditor">
                  <el-input
                    placeholder="请输入内帐审核人名称"
                    v-model="queryParams.auditor"
                  ></el-input>
                </el-form-item>
                <el-form-item label="调度审核人:" prop="dispatch">
                  <el-input
                    placeholder="请输入调度审核人名称"
                    v-model="queryParams.dispatch"
                  ></el-input>
                </el-form-item>
                <el-form-item label="主管审核时间" prop="specialStartList">
                  <el-date-picker
                    v-model="specialStartList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    @change="a(specialStartList)"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="内帐审核时间">
                  <el-date-picker
                    v-model="auditorStartList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item> -->
                <!-- <el-form-item label="调度审核时间">
                  <el-date-picker
                    v-model="dispatchTimeList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item> -->
                <el-form-item label="订单创建时间">
                  <el-date-picker
                    v-model="createDateList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="服务类别" prop="accountType">
                  <el-select
                    v-model="queryParams.accountType"
                    placeholder="请选择服务类别"
                  >
                    <el-option
                      v-for="item in serviceCategoryList"
                      :key="item.dictCode"
                      :label="item.dictLabel"
                      :value="item.dictCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否切老户" prop="companies">
                  <el-radio-group v-model="queryParams.companies">
                    <el-radio
                      v-for="item in yesNoList"
                      :label="item.dictCode"
                      >{{ item.dictLabel }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="订单编号:" prop="orderNo">
                  <el-input
                    placeholder="请输入订单编号"
                    v-model="queryParams.orderNo"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="订单发起人:"
                  prop="createBy"
                  v-if="isZhuGuan"
                >
                  <el-input
                    placeholder="请输入订单发起人名称"
                    v-model="queryParams.createBy"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认
                </el-button>
              </div>
            </div>
            <el-button
              slot="reference"
              size="small"
              icon="el-icon-search"
              @click="showSearch = !showSearch"
              >筛选
            </el-button>
          </el-popover>

          <el-popover
            ref="popover"
            style="
              width: 100px !important;
              display: inline-block;
              margin-left: 8px;
            "
            placement="bottom-start"
            trigger="click"
            @show="onShowPopover"
            @hide="onHidePopover"
            v-if="roleFlag"
          >
            <el-tree
              node-key="id"
              ref="deptTree"
              class="select-tree"
              highlight-current
              show-checkbox
              check-strictly
              :style="`min-width: ${treeWidth}`"
              :data="companyOptions"
              :props="{
                label: 'name',
                children: 'companyStructures',
              }"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              :default-expand-all="false"
              @node-click="onClickNode"
              @check-change="handleNodeClick"
            >
            </el-tree>
            <el-input
              slot="reference"
              ref="input"
              v-model="labelModel"
              clearable
              :style="`width: ${width}px`"
              :class="{ rotate: showStatus }"
              suffix-icon="el-icon-arrow-down"
              :placeholder="placeholder"
            >
            </el-input>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.keyword"
            placeholder="请输入客户简称或表编号或税号"
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
    <!-- 客户信息列表 -->
    <div class="tabbar-vi">
      <el-tabs v-model="orderTypeactive" @tab-click="handleQuerys">
        <el-tab-pane label="全部订单" value="全部订单" name=""></el-tab-pane>
        <el-tab-pane label="异常订单" value="100" name="100"></el-tab-pane>
        <el-tab-pane
          v-for="(item, index) in orderTypeList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
          v-if="index <= 2"
        ></el-tab-pane>
        <el-tab-pane label="特殊审批" value="200" name="200"></el-tab-pane>
        <el-tab-pane label="尾款收费" value="300" name="300"></el-tab-pane>
      </el-tabs>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button
            size="mini"
            circle
            icon="el-icon-refresh"
            @click="handleQuerys"
          />
        </el-tooltip>
      </div>
    </div>
    <div class="table-data">
      <el-table
        :data="orderList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
        @row-click="handleRowFun"
      >
        <el-table-column type="expand" align="left" prop="marketBusirSerprices">
          <template slot-scope="scopes">
            <el-table
              v-loading="loading"
              :data="scopes.row.marketBusirSerprices"
              style="width: 50%"
            >
              <el-table-column
                label="项目名称"
                align="left"
                prop="serpriceName"
              />
              <el-table-column
                label="主管审核状态"
                align="left"
                prop="specialApprovalsType"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.specialApprovalsType != ''">
                    <el-tag
                      type="warning"
                      size="mini"
                      v-if="scope.row.specialApprovalsType == 10"
                    >
                      {{ auditState(scope.row.specialApprovalsType) }}
                    </el-tag>
                    <el-tag
                      size="mini"
                      v-if="scope.row.specialApprovalsType == 20"
                    >
                      {{ auditState(scope.row.specialApprovalsType) }}
                    </el-tag>
                    <el-tag
                      type="danger"
                      size="mini"
                      v-if="scope.row.specialApprovalsType == 30"
                    >
                      {{ auditState(scope.row.specialApprovalsType) }}
                    </el-tag>
                    <!-- <el-tag type="info" size=mini v-if="scope.row.specialApprovalsType==40"> {{auditState(scope.row.specialApprovalsType)}}</el-tag> -->
                    <span
                      style="
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        text-align: center;
                        border-radius: 50%;
                        border: 1px solid #3978e7;
                        color: #3978e7;
                        font-size: 10px;
                        margin-left: 8px;
                        line-height: 12px;
                      "
                      @click="competentAuditDetailUp(scope.row)"
                      v-if="
                        scope.row.specialApprovalsType == 20 ||
                        scope.row.specialApprovalsType == 30
                      "
                      >?</span
                    >
                    <span
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
                      v-if="scope.row.specialApprovalsType == 10"
                      >?</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="内帐审核状态"
                align="left"
                prop="advanceReviewerType"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.advanceReviewerType != ''">
                    <el-tag
                      type="warning"
                      size="mini"
                      v-if="scope.row.advanceReviewerType == 10"
                    >
                      {{ auditState(scope.row.advanceReviewerType) }}
                    </el-tag>
                    <el-tag
                      size="mini"
                      v-if="scope.row.advanceReviewerType == 20"
                    >
                      {{ auditState(scope.row.advanceReviewerType) }}
                    </el-tag>
                    <el-tag
                      type="danger"
                      size="mini"
                      v-if="scope.row.advanceReviewerType == 30"
                    >
                      {{ auditState(scope.row.advanceReviewerType) }}
                    </el-tag>
                    <el-tag
                      type="info"
                      size="mini"
                      v-if="scope.row.advanceReviewerType == 40"
                    >
                      {{ auditState(scope.row.advanceReviewerType) }}
                    </el-tag>
                    <span
                      style="
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        text-align: center;
                        border-radius: 50%;
                        border: 1px solid #3978e7;
                        color: #3978e7;
                        font-size: 10px;
                        margin-left: 8px;
                        line-height: 12px;
                      "
                      @click="innertentAuditDetailUp(scope.row)"
                      v-if="
                        scope.row.advanceReviewerType == 20 ||
                        scope.row.advanceReviewerType == 30
                      "
                      >?</span
                    >
                    <span
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
                      v-else
                      >?</span
                    >
                  </div>
                  <!-- </div> -->
                </template>
              </el-table-column>
              <el-table-column label="调度审核状态" align="left" prop="type">
                <template slot-scope="scope">
                  <div v-if="scope.row.type != ''">
                    <el-tag
                      type="warning"
                      size="mini"
                      v-if="scope.row.type == 10"
                    >
                      {{ auditState(scope.row.type) }}</el-tag
                    >
                    <el-tag size="mini" v-if="scope.row.type == 20">
                      {{ auditState(scope.row.type) }}</el-tag
                    >
                    <el-tag
                      type="danger"
                      size="mini"
                      v-if="scope.row.type == 30"
                    >
                      {{ auditState(scope.row.type) }}</el-tag
                    >
                    <el-tag type="info" size="mini" v-if="scope.row.type == 40">
                      {{ auditState(scope.row.type) }}</el-tag
                    >
                    <span
                      style="
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        text-align: center;
                        border-radius: 50%;
                        border: 1px solid #3978e7;
                        color: #3978e7;
                        font-size: 10px;
                        margin-left: 8px;
                        line-height: 12px;
                      "
                      @click="orderParticularsUp(scope.row)"
                      v-if="scope.row.type == 20 || scope.row.type == 30"
                      >?</span
                    >
                    <span
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
                      v-else
                      >?</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-popover
                    v-if="
                      scope.row.servMoneyPlanResultList.length > 0
                        ? scope.row.servMoneyPlanResultList[0].auditRemark
                        : false
                    "
                    placement="top-start"
                    title="提示"
                    width="200"
                    trigger="hover"
                    :content="scope.row.servMoneyPlanResultList[0].auditRemark"
                  >
                    <el-button
                      slot="reference"
                      type="text"
                      :disabled="
                        scope.row.servMoneyPlanResultList.length == 0 ||
                        (scope.row.accountType == 20
                          ? scope.row.servMoneyPlanResultList[0].auditStatus ==
                            10
                            ? true
                            : scope.row.servMoneyPlanResultList.length > 0 &&
                              scope.row.servMoneyPlanResultList[0].serId
                            ? false
                            : true
                          : scope.row.servMoneyPlanResultList.length > 0
                          ? scope.row.servMoneyPlanResultList[0].auditStatus ==
                              10 ||
                            scope.row.servMoneyPlanResultList[0].auditStatus ==
                              20
                          : false)
                      "
                      @click="chargeFun(scope.row)"
                      >收费</el-button
                    >
                  </el-popover>
                  <el-button
                    v-else
                    type="text"
                    :disabled="
                      scope.row.servMoneyPlanResultList.length == 0 ||
                      (scope.row.accountType == 20
                        ? scope.row.servMoneyPlanResultList[0].auditStatus == 10
                          ? true
                          : scope.row.servMoneyPlanResultList.length > 0 &&
                            scope.row.servMoneyPlanResultList[0].serId
                          ? false
                          : true
                        : scope.row.servMoneyPlanResultList.length > 0
                        ? scope.row.servMoneyPlanResultList[0].auditStatus ==
                            10 ||
                          scope.row.servMoneyPlanResultList[0].auditStatus == 20
                        : false)
                    "
                    @click="chargeFun(scope.row)"
                    >收费</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column
          label="订单编号"
          align="left"
          prop="orderNo"
          min-width="120"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="orderShowFun(scope.row)">
              <span style="color: red" v-if="scope.row.expeditedType == 10"
                >!!!</span
              >
              {{ scope.row.orderNo }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" align="left" prop="companyName">
          <template slot-scope="scope">
            <el-button type="text">
              {{ scope.row.companyName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="订单发起人" align="left" prop="createBy" />
        <el-table-column label="审核主管" align="center" prop="approverName" />
        <el-table-column label="审核内帐" align="left" prop="auditor" />
        <el-table-column
          label="审核调度"
          align="left"
          prop="dispatch"
        /><!--  -->
        <el-table-column label="创建时间" align="left" prop="createDate" />
        <el-table-column
          label="订单审核结果"
          align="left"
          prop="orderType"
          :formatter="orderTypeFormat"
        >
          <template slot-scope="scope">
            <el-tag type="warning" size="mini" v-if="scope.row.orderType == 10"
              >{{ auditState(scope.row.orderType) }}
            </el-tag>
            <el-tag size="mini" v-else-if="scope.row.orderType == 20"
              >{{ auditState(scope.row.orderType) }}
            </el-tag>
            <el-tag
              size="mini"
              type="danger"
              v-else-if="scope.row.orderType == 30"
              >{{ auditState(scope.row.orderType) }}
            </el-tag>
            <el-tag
              size="mini"
              type="info"
              v-else-if="scope.row.orderType == 40"
              >{{ auditState(scope.row.orderType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          class-name="table-control"
          fixed="right"
        >
          <template slot="header">
            <span>操作</span>
            <div class="edit">
              <i class="el-icon-edit-outline"></i>
            </div>
          </template>
          <template slot-scope="scope">
            <div v-if="scope.row.orderType == 10">
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                @click="onOrderRemind(scope.row)"
                v-if="scope.row.expeditedType == 20"
                style="display: inline-block; margin-right: 8px"
                >催审
              </el-button>

              <span
                style="color: #d2d3d6; display: inline-block; margin-right: 8px"
                v-if="scope.row.expeditedType == 10"
                >催审</span
              >
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                class="red"
                @click="onRevokeOrderRemind(scope.row)"
                v-if="scope.row.expeditedType == 10"
                >撤销催审
              </el-button>
              <span style="color: #d2d3d6" v-if="scope.row.expeditedType == 20"
                >撤销催审</span
              >
            </div>
            <div v-if="scope.row.orderType != 10">
              <span
                style="color: #d2d3d6; display: inline-block; margin-right: 8px"
                >催审</span
              >

              <span style="color: #d2d3d6">撤销催审</span>
            </div>
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
    <!-- 主管审核详情 -->
    <el-dialog
      title="主管审核详情"
      :visible.sync="competentAuditDetail"
      width="516px"
      append-to-body
      class="orderParticulars"
    >
      <el-form label-position="labelPosition" class="chengjiao">
        <el-row :gutter="20" class="name">
          <el-col :span="24">
            <div class="companyName">
              <i class="el-icon-office-building" style="margin-right: 9px"></i>
              <span>{{ orderParticularsList.companyName }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="62" class="form-box">
          <el-col :span="24">
            <div class="sonBox idea">
              <span class="right14">审核状态:</span>
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.specialApprovalsType == 20"
              >
                通过
              </el-radio>
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.specialApprovalsType == 30"
              >
                未通过
              </el-radio>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="sonBox">
              <span class="right14">审核备注:</span>
              <span class="price">{{
                orderParticularsList.reexamination
              }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{
                orderParticularsList.approveSpecialTime
              }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{ orderParticularsList.approverName }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 内帐审核详情 -->
    <el-dialog
      title="内帐审核详情"
      :visible.sync="innertentAuditDetail"
      width="516px"
      append-to-body
      class="orderParticulars"
    >
      <el-form label-position="labelPosition" class="chengjiao">
        <el-row :gutter="20" class="name">
          <el-col :span="24">
            <div class="companyName">
              <i class="el-icon-office-building" style="margin-right: 9px"></i>
              <span>{{ orderParticularsList.companyName }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="62" class="form-box">
          <el-col :span="24">
            <div class="sonBox idea">
              <span class="right14">审核状态:</span>
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.advanceReviewerType == 10"
              >
                审核中
              </el-radio>
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.advanceReviewerType == 20"
              >
                通过
              </el-radio>
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.advanceReviewerType == 30"
              >
                未通过
              </el-radio>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="sonBox">
              <span class="right14">审核备注:</span>
              <span class="price">{{
                orderParticularsList.advanceReviewerRemarks
              }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{
                orderParticularsList.advanceReviewerTime
              }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{
                orderParticularsList.advanceTollReviewer
              }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 调度审核详情 -->
    <el-dialog
      title="调度审核详情"
      :visible.sync="orderParticulars"
      width="516px"
      append-to-body
      class="orderParticulars"
    >
      <el-form label-position="labelPosition" class="chengjiao">
        <el-row :gutter="20" class="name">
          <el-col :span="24">
            <div class="companyName">
              <i class="el-icon-office-building" style="margin-right: 9px"></i>
              <span>{{ orderParticularsList.companyName }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="62" class="form-box">
          <el-col :span="24">
            <div class="sonBox idea">
              <span class="right14">审核状态:</span>
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.type == 10"
              >
                审核中</el-radio
              >
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.type == 20"
              >
                通过</el-radio
              >
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.type == 30"
              >
                未通过</el-radio
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="sonBox">
              <span class="right14">审核备注:</span>
              <span class="price">{{ orderParticularsList.auditRemark }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{ orderParticularsList.auditTime }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{ orderParticularsList.auditName }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <edit-drawer
      ref="editDrawer"
      :visible.sync="drawerShow"
      :companyId="companyId"
      @editOrder="editOrderFun"
    ></edit-drawer>
    <!-- 收费-->
    <el-dialog
      title="收费"
      width="520px"
      :visible.sync="chargeShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      custom-class="item_full"
      append-to-body
    >
      <el-form
        class="mag0"
        ref="chargeForm"
        :rules="chargeRules"
        :model="charge"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="金额" prop="amountInArear">
              <el-input
                v-model.number="charge.amountInArear"
                type="text"
                placeholder="请输入金额"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付时间" prop="practicalTime">
              <el-date-picker
                v-model="charge.practicalTime"
                type="datetime"
                @change="advanceUpdate"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择支付时间"
                :clearable="false"
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
                v-model="charge.payCode"
                @change="handleRegionChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款方式" prop="paymentMethod">
              <el-select
                v-model="charge.paymentMethod"
                @change="payment(charge.paymentMethod)"
                placeholder="请选择付款方式"
              >
                <el-option
                  v-for="item in houproPaymentSettingList"
                  :key="item.id"
                  :label="item.patternPayment"
                  :value="item.patternPayment"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款户名" prop="accountName">
              <el-select
                v-model="charge.accountName"
                @change="accountNameChange(charge.accountName)"
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
            <el-form-item label="收款账号" prop="account">
              <el-select
                v-model="charge.account"
                placeholder="请选择收款账号"
                @change="AccountChange(charge.account)"
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
          <el-col :span="12" v-if="charge.bankType == 10">
            <el-form-item label="开户行" prop="accountBank">
              <el-select
                v-model="charge.accountBank"
                placeholder="请选择开户行"
                @change="BankChange(charge.accountBank)"
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
            <el-form-item label="收费备注" prop="remarks">
              <el-input
                type="textarea"
                placeholder="请输入备注信息"
                class="minh98"
                v-model="charge.remarks"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上传附件" prop="imageIds">
          <el-upload
            class="upload-file"
            ref="chargeUpload"
            :headers="headers"
            :action="fileUrl"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :data="{ type: '10' }"
            multiple
            :on-success="
              (res, file, files) =>
                handleFileSuccess(res, file, files, { id: charge.id }, 20)
            "
            :before-upload="(file) => beforeFileUpload(file, '', 20)"
            :file-list="chargeList"
            list-type="picture"
          >
            <el-button size="small" icon="el-icon-upload2">上传附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chargeShow = false">取消</el-button>
        <el-button type="primary" @click="updateCharge">确认发起</el-button>
      </div>
    </el-dialog>
    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index: 2033"
      v-if="dialogVisible"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import {
  orderClientList,
  orderRemind, //催审
  revokeOrderRemind, //撤销
  getChargeInfo,
  updateCharge,
} from "@/api/crm/clientOrder/clientOrder";
import {
  listClient,
  addClient,
  delClient,
  getClient,
  alterClient, //修改客户信息
  entrepreneurMessageLiaison,
  ExpiringCustomers, //即将到期客户
  CustomerInArrears, //欠费客户
  TaxNature, //纳税性质
  exportCustomer,
  exportCustomerData,
} from "@/api/crm/customer/customer";

import { delImg } from "@/api/crm/customerService/agentAccount";
import {
  GetPaymentMethod,
  GetAccountNumber,
} from "@/api/crm/createHouseOrder/createHouseOrder";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import EditDrawer from "@/views/components/EditDrawer/index";
import { CompanyDepartmentPersonnel } from "../../../../api/crm/finance/customer";

export default {
  name: "Agent",
  components: {
    EditDrawer,
    ElImageViewer,
  },
  props: {
    // 接收绑定参数
    value: {
      required: false,
      default: -1,
    },
    // 输入框宽度
    width: String,
    // 输入框占位符
    placeholder: {
      type: String,
      required: false,
      default: "组织架构",
    },
  },
  data() {
    var validateMaxMoney = (rule, value, callback) => {
      if (!value || value == 0) {
        return callback(new Error("预收金额不能为空"));
      } else if (this.charge.amountInArear >= value) {
        return callback();
      } else {
        return callback(new Error("预收金额不能大于项目金额"));
      }
    };
    return {
      // 树状菜单显示状态
      showStatus: false,
      // 菜单宽度
      treeWidth: "auto",
      // 输入框显示值
      labelModel: "",
      // 实际请求传值
      valueModel: "0",
      // 公司树选项
      companyOptions: [],

      uncollectedTypeCut: "", //切换特殊审批/尾款收费状态值
      orderTypeCut: "", //切换状态值
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      headers: { Authorization: _getSessionStore(tokenKey) },
      filePath: process.env.VUE_APP_FILE_API,
      fileUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmBillImg/upload", //附件上传
      companyId: null,
      drawerShow: false,
      serviceCategoryList: [], //服务类别
      // 总条数
      total: 0,
      radio: "1",
      inputVisible: false,
      labelPosition: "top",
      labelLevel: [{ dictCode: "A" }], //级别标签
      showSearch: false, // 显示搜索条件
      labelType: [{ dictName: "a" }, { dictName: "b" }],
      sourceTypeLvList: [
        { dictCode: "待审核订单", dictName: "待审核订单" },
        { dictCode: "审核通过", dictName: "审核通过" },
        { dictCode: "审核未通过", dictName: "审核未通过" },
        { dictCode: "特殊审批", dictName: "特殊审批" },
      ], //审核状态
      loading: true, // 遮罩层
      areaOptions: regionData, //区域数据
      //支付类型
      houproPaymentSettingList: [],
      //支付账号
      CollectioAccountList: [],
      companyList: [],
      orderList: [], //列表信息渲染
      // sourceTypeLvList:[],
      // clientType:  [{dictName:"待审核订单"},{dictName:"审核通过"},{dictName:"审核未通过"},{dictName:"特殊审批"}], //客户类型字典
      clientType: [],
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        orderType: "0",
        clientType: null,
        deptId: null,
        createBy: null, //订单发起人
        orderNo: null,
        appId: "",
        companyId: "",
        accountType: "", //服务类别
        specialWhether: null, //特殊审批
        uncollectedType: null,
        dispatch: null, //调度审核人名称
        approverName: null, //主管审核人
        auditor: null, //内帐审核人
        specialStartDate: "", //主管审核开始时间
        specialEndDate: "", //主管审核结束时间
        auditorStartDate: "", //内帐审核开始时间
        auditorEndDate: "", //内帐审核截至时间
        sDispatchTime: "", //调度审核开始时间
        eDispatchTime: "", //调度审核结束时间
      },
      dispatchTimeList: [], //调度审核时间
      auditorStartList: [], //内帐审核时间
      specialStartList: [], //主管审核日期
      createDateList: [], //订单创建时间
      open: false, // 是否显示弹出层
      renewals: false,
      orderTypeList: [], //审核状态
      competentAuditDetail: false, //主管审核详情
      orderParticulars: false, //调度审核详情
      innertentAuditDetail: false, //内帐审核详情
      orderParticularsList: {}, //审核详情数据
      chargeShow: false, //收费显示
      charge: {},
      chargeRules: {
        amountInArear: [
          { validator: validateMaxMoney, trigger: "blur" },
          { type: "number", message: "价格必须为数字值" },
          { required: true, message: "预售金额不能为空", trigger: "blur" },
        ],
      },
      paymentMethodOption: [], //支付方式数据
      //支付户名
      accountNameList: [],
      //开户行
      bankOfDepositList: [],
      PaymentNameList: [],
      chargeList: [],
      roleFlag: false,
      orderTypeactive: null,
      isZhuGuan: false,
      yesNoList: [], //切老户
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: (state) => state.user,
    }),
  },
  created() {
    this.roles = this.userInfo.roleCodes;
    if (
      this.roles.indexOf("accountExecutive") == -1 &&
      this.roles.indexOf("fieldClerk") == -1 &&
      this.roles.indexOf("customerServiceClerk") == -1 &&
      this.roles.indexOf("externalAccountsClerk") == -1
    ) {
      this.roleFlag = true;
    } else {
      this.roleFlag = false;
    }
    if (
      this.roles.indexOf("accountExecutiveSupervisor") != -1 ||
      this.roles.indexOf("marketCompanyBusirInternalAccount") != -1 ||
      this.roles.indexOf("schedulingSupervisor") != -1 ||
      this.roles.indexOf("fieldSupervisor") != -1 ||
      this.roles.indexOf("customerServiceSupervisor") != -1 ||
      this.roles.indexOf("marketBusirSerprice") != -1 ||
      this.roles.indexOf("branchResponsiblePerson") != -1
    ) {
      this.isZhuGuan = true;
    } else {
      this.isZhuGuan = false;
    }
    console.log(this.isZhuGuan);

    this.getList();
    this.getCompanyList();
    // this.queryParams.appId = this.$store.getters.appId + "";
    // 审核状态
    this.getDicts("auditor_state").then((res) => {
      this.orderTypeList = res.data;
      // console.info(res);
    });
    this.getDicts("payment_method").then((res) => {
      this.paymentMethodOption = res.data;
    });
    //服务类别
    this.getDicts("service_category").then((res) => {
      this.serviceCategoryList = res.data;
    });
    this.getDicts("sys_yes_no").then((res) => {
      this.yesNoList = res.data;
    });
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm); //当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    closeViewer() {
      this.dialogVisible = false;
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /** 查询商机信息列表 */
    getList() {
      this.loading = true;
      // this.queryParams.orderType=this.queryParams.orderType;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      // data.orderType = data.orderType == "0" ? "" : data.orderType;
      // this.orderTypeCut = data.orderType == "0" ? "" : data.orderType;
      // this.uncollectedTypeCut = this.queryParams.uncollectedType;

      orderClientList(data).then((response) => {
        this.orderList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },

    getCompanyList() {
      CompanyDepartmentPersonnel({}).then((response) => {
        let companyOptions = response.data;
        this.companyOptions = companyOptions || [];
        this.getList();
      });
    },

    handleNodeClick(data, checked) {
      console.log("hahahah");
      if (checked) {
        this.labelModel = data.name;
        if (data.deptId != "") {
          this.queryParams.firmId = "";
          this.queryParams.createId = "";
          this.queryParams.deptId = data.deptId;
          this.getList();
          this.showStatus = false;
        } else if (data.companyId == "" && data.deptId == "") {
          this.queryParams.firmId = "";
          this.queryParams.deptId = "";
          this.queryParams.createId = data.id;
          this.getList();
        } else {
          this.queryParams.createId = "";
          this.queryParams.deptId = "";
          this.queryParams.firmId = data.companyId;
          this.getList();
        }
      }
      let option = this.companyOptions;
      this.setTreeCheck(option, data.id, checked);
    },
    setTreeCheck(data, id, checked) {
      data.forEach((item) => {
        if (item.id == id || !checked) {
          // this.$refs.deptTree.setChecked(data.deptId,true,false)
        } else {
          this.$refs.deptTree.setChecked(item.id, false, false);
        }
        if (item.companyStructures && item.companyStructures.length > 0) {
          this.setTreeCheck(item.companyStructures, id, checked);
        }
      });
    },
    // 单击节点
    onClickNode(node) {
      console.log(node);
      this.queryParams.companyId = node.companyId;
      this.labelModel = node[this.props.label];
      this.valueModel = node[this.props.rowId];
      this.onCloseTree();
    },
    // 偏平数组转化为树状层级结构
    switchTree() {
      return this.cleanChildren(this.buildTree(this.options, "0"));
    },
    // 隐藏树状菜单
    onCloseTree() {
      this.$refs.popover.showPopper = false;
    },

    // 显示时触发
    onShowPopover() {
      this.showStatus = true;
      this.$refs.deptTree.filter(false);
    },
    // 隐藏时触发
    onHidePopover() {
      this.showStatus = false;
      this.$emit("selected", this.valueModel);
    },
    // 树节点过滤方法
    filterNode(query, data) {
      if (!query) return true;
      return data[this.props.label].indexOf(query) !== -1;
    },
    // 搜索树状数据中的 ID
    queryTree(tree, id) {
      let stark = [];
      stark = stark.concat(tree);
      while (stark.length) {
        const temp = stark.shift();
        if (temp[this.props.children]) {
          stark = stark.concat(temp[this.props.children]);
        }
        if (temp[this.props.rowId] === id) {
          return temp[this.props.label];
        }
      }
      return "";
    },
    // 将一维的扁平数组转换为多层级对象
    buildTree(data, id = "0") {
      const fa = (parentId) => {
        const temp = [];
        for (let i = 0; i < data.length; i++) {
          const n = data[i];
          if (n[this.props.parent] === parentId) {
            n.children = fa(n.rowGuid);
            temp.push(n);
          }
        }
        return temp;
      };
      return fa(id);
    },
    // 清除空 children项
    cleanChildren(data) {
      const fa = (list) => {
        list.map((e) => {
          if (e.children.length) {
            fa(e.children);
          } else {
            delete e.children;
          }
          return e;
        });
        return list;
      };
      return fa(data);
    },

    //审核状态
    auditState(data) {
      if (data == 10) {
        return "待审核";
      } else if (data == 20) {
        return "审核成功";
      } else if (data == 30) {
        return "审核失败";
      } else if (data == 40) {
        return "订单创建中";
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      // const queryParams = this.queryParams;
      // this.$confirm("是否确认导出所有公司银行开户信息数据项?", "警告", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(function () {
      //     window.location.href =
      //       process.env.VUE_APP_CRM_API +
      //       "/hmkj-crm/resoBusinessOpportunity/excelTemplate";
      //   })
      //   .catch(function () {});
      let fileUrl = process.env.VUE_APP_FILE_API;
      const queryParams = this.queryParams;
      console.log(queryParams);
      this.$confirm("是否确认导出所有客户订单数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportCustomerData(queryParams);
        })
        .then((response) => {
          console.info(response);
          let filename = response.data.filename;
          let elink = document.createElement("a");
          elink.download = filename;
          elink.text = filename;
          elink.style.display = "none";
          elink.href = decodeURIComponent(fileUrl + "/download/" + filename);
          document.getElementById("app").appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        })
        .catch(function () {});
    },

    handleTableQuery(e) {
      this.queryParams.specialStartDate = "";
      this.queryParams.specialEndDate = "";
      this.queryParams.auditorStartDate = "";
      this.queryParams.auditorEndDate = "";
      this.queryParams.sDispatchTime = "";
      this.queryParams.eDispatchTime = "";
      this.queryParams.accountType = null;
      this.queryParams.specialWhether = null;
      this.queryParams.uncollectedType = null;
      this.queryParams.approverName = null;
      this.queryParams.auditor = null;
      this.queryParams.auditor = null;
      this.queryParams.dispatch = null;
      this.specialStartList = null;
      this.auditorStartList = null;
      this.dispatchTimeList = null;
      this.createDateList = null;
      if (e.keyCode != 13) {
        this.showSearch = false;
      }

      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      // if (this.queryParams.orderType == 4) {
      //   this.queryParams.orderType = null;
      //   this.queryParams.specialWhether = 10;
      //   this.queryParams.uncollectedType = null;
      //   this.queryParams.abnormalOrder = null;

      // } else if (this.queryParams.orderType == 5) {
      //   this.queryParams.orderType = null;
      //   this.queryParams.uncollectedType = 10;
      //   this.queryParams.specialWhether = null;
      //   this.queryParams.abnormalOrder = null;
      // }
      // else if (this.queryParams.orderType == 1) {

      //   this.queryParams.orderType = null;
      //   this.queryParams.abnormalOrder = 10;
      //   this.queryParams.specialWhether = null;
      // }else {
      //   this.queryParams.orderType = this.queryParams.orderType;
      //   this.queryParams.uncollectedType = null;
      //   this.queryParams.specialWhether = null;
      //   this.queryParams.abnormalOrder = null;
      // }
      // console.log(this.queryParams.orderType);

      if (this.orderTypeactive == "100") {
        // 异常订单
        this.queryParams.orderType = null;
        this.queryParams.abnormalOrder = "10";
        this.queryParams.uncollectedType = null;
        this.queryParams.specialWhether = null;
      } else if (this.orderTypeactive == "200") {
        // 特殊审批
        this.queryParams.orderType = null;
        this.queryParams.abnormalOrder = null;
        this.queryParams.specialWhether = "10";
        this.queryParams.uncollectedType = null;
      } else if (this.orderTypeactive == "300") {
        //尾款收费
        this.queryParams.orderType = "";
        // uncollectedType='10'
        this.queryParams.abnormalOrder = null;
        this.queryParams.uncollectedType = "10";
        this.queryParams.specialWhether = null;
      } else {
        this.queryParams.orderType = this.orderTypeactive;
        this.queryParams.abnormalOrder = null;
        this.queryParams.uncollectedType = null;
        this.queryParams.specialWhether = null;
      }

      if (this.specialStartList) {
        if (this.specialStartList.length > 0) {
          this.queryParams.specialStartDate =
            this.specialStartList[0] + " 00:00:00";
          this.queryParams.specialEndDate =
            this.specialStartList[1] + " 23:59:59";
        } else {
          this.queryParams.specialStartDate = "";
          this.queryParams.specialEndDate = "";
        }
      } else {
        this.queryParams.specialStartDate = "";
        this.queryParams.specialEndDate = "";
      }
      if (this.auditorStartList) {
        if (this.auditorStartList.length > 0) {
          this.queryParams.auditorStartDate =
            this.auditorStartList[0] + " 00:00:00";
          this.queryParams.auditorEndDate =
            this.auditorStartList[1] + " 23:59:59";
        } else {
          this.queryParams.auditorStartDate = "";
          this.queryParams.auditorEndDate = "";
        }
      } else {
        this.queryParams.auditorStartDate = "";
        this.queryParams.auditorEndDate = "";
      }

      if (this.dispatchTimeList) {
        if (this.dispatchTimeList.length > 0) {
          this.queryParams.sDispatchTime =
            this.dispatchTimeList[0] + " 00:00:00";
          this.queryParams.eDispatchTime =
            this.dispatchTimeList[1] + " 23:59:59";
        } else {
          this.queryParams.sDispatchTime = "";
          this.queryParams.eDispatchTime = "";
        }
      } else {
        this.queryParams.sDispatchTime = "";
        this.queryParams.eDispatchTime = "";
      }

      if (this.createDateList) {
        if (this.createDateList.length > 0) {
          this.queryParams.createStartTime =
            this.createDateList[0] + " 00:00:00";
          this.queryParams.createEndTime = this.createDateList[1] + " 23:59:59";
        } else {
          this.queryParams.createStartTime = "";
          this.queryParams.createEndTime = "";
        }
      } else {
        this.queryParams.createStartTime = "";
        this.queryParams.createEndTime = "";
      }

      this.queryParams.pageNo = 1;
      this.getList();
      // this.resetForm("queryForm");
      // this.specialStartList = null;
      // this.auditorStartList = null;
      // this.dispatchTimeList = null;
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      this.queryParams.specialWhether = null;
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      if (this.queryParams.orderType == 4) {
        this.queryParams.orderType = null;
        this.queryParams.specialWhether = 10;
      }
      this.resetQuery();
      // this.queryParams.orderType = this.orderTypeCut;
      // this.queryParams.specialWhether = this.uncollectedTypeCut;

      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.$refs.queryForm.resetFields();
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        orderType: "0",
        clientType: null,
        appId: "",
        companyId: "",
        createBy: null,
        orderNo: null,
        accountType: "", //服务类别
        specialWhether: null, //特殊审批
        uncollectedType: null,
        dispatch: null, //调度审核人名称
        approverName: null, //主管审核人
        auditor: null, //内帐审核人
        specialStartDate: "", //主管审核开始时间
        specialEndDate: "", //主管审核结束时间
        auditorStartDate: "", //内帐审核开始时间
        auditorEndDate: "", //内帐审核截至时间
        sDispatchTime: "", //调度审核开始时间
        eDispatchTime: "", //调度审核结束时间
      };
      this.specialStartList = null;
      this.auditorStartList = null;
      this.dispatchTimeList = null;
      this.createDateList = null;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    //所属地区
    handleRegionChange(value) {
      this.CollectioAccountList = [];
      this.bankOfDepositList = [];
      this.houproPaymentSettingList = [];
      this.accountNameList = [];
      (this.charge.paymentTerm = ""),
        (this.charge.account = ""),
        (this.charge.accountBank = "");
      this.charge.accountName = "";
      this.charge.paymentMethod = "";
      this.charge.payCode = value;
      this.charge.payProvince = CodeToText[value[0]];
      this.charge.payCity = CodeToText[value[1]];
      this.charge.payCounty = CodeToText[value[2]];
      GetPaymentMethod({
        type: 10,
        province: this.charge.payProvince,
        city: this.charge.payCity,
      }).then((response) => {
        this.houproPaymentSettingList = response.data;
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
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      this.PaymentTime =
        [year, month, day].join("-") + " " + [hour, minutes, seconds].join(":");
      // console.log(this.PaymentTime);
      if (this.charge.practicalTime > this.PaymentTime) {
        this.msgError("支付时间不能大于当前时间");
        return (this.charge.practicalTime = "");
      }
    },
    //收款方式
    // payment() {
    //   let paymentId;
    //   this.houproPaymentSettingList.forEach(item => {
    //     if (this.charge.paymentMethod == item.patternPayment) {
    //       paymentId = item.id;
    //       console.log(paymentId);
    //     }
    //   });
    //   this.CollectioAccountList = [];
    //   GetAccountNumber({ parentId: paymentId }).then(response => {
    //     this.CollectioAccountList = response.data;
    //     console.log(this.CollectioAccountList);
    //   });
    // },
    //收款方式
    payment(val) {
      let paymentId = "";
      this.charge.account = "";
      this.charge.accountName = "";
      this.charge.accountBank = "";
      this.houproPaymentSettingList.forEach((item) => {
        if (this.charge.paymentMethod == item.patternPayment) {
          paymentId = item.id;
          this.charge.bankType = item.bankType;
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
      this.charge.account = "";
      (this.charge.accountBank = ""), (this.CollectioAccountList = []);
      this.bankOfDepositList = [];
      this.PaymentNameList.forEach((item) => {
        if (
          item.accountName == val &&
          item.patternPayment == this.charge.paymentMethod
        ) {
          this.CollectioAccountList.push(item);
          this.bankOfDepositList.push(item);
        }
      });
    },
    AccountChange(val) {
      this.bankOfDepositList.forEach((item) => {
        if (val == item.payAccount) {
          this.charge.accountBank = item.accountBank;
        }
      });
    },
    //开户行
    BankChange(val) {
      this.CollectioAccountList.forEach((item) => {
        if (val == item.accountBank) {
          this.charge.account = item.payAccount;
        }
      });
    },

    // 客户提交按钮
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.id = null;
          addClient(this.form).then((response) => {
            if (response.code === 200) {
              this.msgSuccess("新增商机成功");
              this.open = false;
              this.getList();
            }
          });
        }
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 取消按钮
    cancel() {
      this.showSearch = false; //筛选取消按钮
      this.resetForm("queryForm");
      // console.info(this.open);
      this.open = false;
      this.reset();
      this.openCustomer = false; //新增客户取消按钮
      this.renewals = false;
      this.showSearch = false;
      this.specialStartList = null;
      this.auditorStartList = null;
      this.dispatchTimeList = null;
      this.createDateList = null;
    },

    // 表单重置
    reset() {
      clientType: "";
    },
    //字典
    // 审核状态字典
    orderTypeFormat(row) {
      // console.info(row);

      return this.selectDictLabel(this.orderTypeList, row.orderType);
    },
    //主管审核详情
    competentAuditDetailUp(row) {
      this.orderParticularsList = row;
      this.competentAuditDetail = true; //主管审核详情
    },
    //内帐审核详情
    innertentAuditDetailUp(row) {
      this.orderParticularsList = row;
      this.innertentAuditDetail = true; //内帐审核详情
    },
    //调度审核详情弹窗
    orderParticularsUp(row) {
      // console.info(row);
      this.orderParticulars = true; //调度的审核状态

      // this.auditData.id = row.id;
      // this.auditData.companyName = row.companyName;
      this.orderParticularsList = row;
    },
    // 催审
    onOrderRemind(row) {
      orderRemind({ id: row.id }).then((response) => {
        this.getList();
      });
    },
    // 催审
    onRevokeOrderRemind(row) {
      revokeOrderRemind({ id: row.id }).then((response) => {
        // console.info(response);

        this.getList();
      });
    },
    orderShowFun(row) {
      this.companyId = row.companyId;
      this.$refs.editDrawer.editOrderFun(row);
    },
    editOrderFun() {},
    handleRowFun(row, column, event) {
      if (
        column.property &&
        column.property != undefined &&
        column.property != "undefined" &&
        column.property == "companyName"
      ) {
        this.reset();
        this.companyId = row.companyId;
        this.drawerShow = true;
      }
    },

    chargeFun(row) {
      let sid =
        row.accountType == 20
          ? row.servMoneyPlanResultList.length > 0
            ? row.servMoneyPlanResultList[0].serId
            : undefined
          : row.servMoneyPlanResultList[0].id;
      if (sid) {
        getChargeInfo({ id: sid }).then((res) => {
          if (res.code == 200 && !this.isEmpty(res.data)) {
            this.charge = res.data;
            this.charge.amountInArear = res.data.amountInArear;
            this.charge.remarks = res.data.remarks;
            this.charge.payCode = JSON.parse(this.charge.payCode);
            this.accountNameList = [];
            this.PaymentNameList = [];
            this.houproPaymentSettingList = res.data.paymentSettingResults;
            this.houproPaymentSettingList.forEach((item) => {
              if (this.charge.paymentMethod != "") {
                if (this.charge.paymentMethod == item.patternPayment) {
                  this.charge.currentRate = item.currentRate;
                  if (item.houproPaymentSettingResult.length != 0) {
                    item.houproPaymentSettingResult.forEach((val) => {
                      this.accountNameList.push(val.accountName);
                      this.PaymentNameList.push(val);
                    });
                  } else {
                    this.accountNameList = [];
                    this.PaymentNameList = [];
                  }

                  this.accountNameList = Array.from(
                    new Set(this.accountNameList)
                  );
                }
              }
            });
            this.CollectioAccountList = [];
            if (this.charge.accountName != "") {
              this.PaymentNameList.forEach((ite) => {
                if (this.charge.accountName == ite.accountName) {
                  this.CollectioAccountList.push(ite);
                }
              });
            } else {
              this.CollectioAccountList = [];
            }
            this.chargeShow = true;
          }
        });
        console.log(sid);
      }

      // AdvancePayment({ id: row.id }).then(response => {
      // this.charge = response.data;
      // this.charge.practicalTime=response.data.advancePaymentTime
      // this.charge.amountInArear = response.data.advanceActualAmount;
      //  this.charge.remarks=response.data.advanceRemarks
      //  this.charge.payCode = JSON.parse(this.charge.payCode)
      // console.log(this.charge.payCode);
      // this.accountNameList = [];
      // this.PaymentNameList = [];
      // this.houproPaymentSettingList = response.data.paymentSettingResults;
      // this.houproPaymentSettingList.forEach(item => {
      //   if (this.charge.paymentMethod != "") {
      //     if (this.charge.paymentMethod == item.patternPayment) {
      //       this.charge.currentRate = item.currentRate;
      //  item.houproPaymentSettingResult.forEach(val => {
      //         this.accountNameList.push(val.accountName);
      //         this.PaymentNameList.push(val);
      //       });
      //       this.accountNameList = Array.from(new Set(this.accountNameList));
      //     }
      //   }
      // });
      //    this.CollectioAccountList = []
      // if (this.charge.accountName != "") {
      //   this.PaymentNameList.forEach(ite=>{
      //        if (this.charge.accountName == ite.accountName) {
      //   this.CollectioAccountList.push(ite)
      // }
      //   })

      //  }else{
      //    this.CollectioAccountList = []
      //  }

      // });
    },

    updateCharge() {
      this.$refs["chargeForm"].validate((valid) => {
        if (valid) {
          updateCharge(this.charge).then((res) => {
            this.getList();
            try {
              this.$refs.chargeUpload.clearFiles();
            } catch (e) {}
            this.$nextTick(() => {
              this.chargeShow = false;
            });
          });
        }
      });
    },
    //图片删除
    handleRemove(file, fileList) {
      // console.log(file);
      delImg({ id: file.response.data.id }).then((res) => {
        this.charge.imageIds = fileList
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
      });
    },
    //图片预览
    handlePreview(file) {
      // console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, "提示");
    },
    handleFileSuccess(res, file, files, data, type) {
      this.ImageUrlList = files.map((ite) => {
        return ite.url;
      });
      //附件上传成功
      // console.info(res, file, files, data);

      if (res.code == 200) {
        this.charge.imageIds = files
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
    },
    beforeFileUpload(file) {
      // console.info(file.type);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss">
.el-table .fixed-width {
  .el-button--mini {
    &.red {
      color: #ef5465;
    }
  }
}

.orderParticulars {
  .el-dialog {
    .el-dialog__body {
      padding-bottom: 100px;

      .chengjiao {
        margin: 0px;

        .name {
          .el-col {
            .companyName {
              display: flex;
              align-items: center;
              padding-bottom: 23px;
              padding-top: 10px;
              border-bottom: 1px solid #e6e7eb;

              i {
                font-size: 22px;
              }

              span {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #303133;
              }
            }
          }
        }

        .form-box {
          width: 100%;
          margin: 0px !important;
          padding-top: 27px;

          .el-col {
            margin-bottom: 20px;
          }

          .sonBox {
            // margin-left: 34px;
            // margin-right: 34px;
            .right14 {
              margin-right: 14px;

              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;
              line-height: 24px;
            }

            .price {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;
              line-height: 24px;
            }
          }

          .idea {
            display: flex;
            align-items: center;

            .el-radio {
              height: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
