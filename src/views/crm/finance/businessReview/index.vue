<template>
  <div class="app-container businessReview">
    <!-- 业务审核 -->
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
                v-if="specialApprovalsType == 10"
              >
                <el-form-item label="审核人:" prop="approverName">
                  <el-input
                    placeholder="请输入审核人名称"
                    v-model="queryParams.approverName"
                  ></el-input>
                </el-form-item>
                <el-form-item label="审核时间">
                  <el-date-picker
                    v-model="specialStartTimeList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="审核状态" prop="specialApprovalsType">
                  <el-radio-group v-model="queryParams.specialApprovalsType">
                    <el-radio
                      v-for="item in auditStateList"
                      :key="item.dictCode"
                      :label="item.dictCode"
                    >
                      {{ item.dictName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <el-form
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
                v-if="specialApprovalsType == 20"
              >
                <el-form-item label="流失原因" prop="churnReason">
                  <el-input
                    placeholder="请输入流失原因"
                    v-model="queryParams.churnReason"
                    class="mw222"
                    size="small"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="提交人" prop="churnApplicant">
                  <el-input
                    placeholder="请输入提交人"
                    v-model="queryParams.churnApplicant"
                    class="mw222"
                    size="small"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                  <el-date-picker
                    v-model="applicationTimeList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="审核时间">
                  <el-date-picker
                    v-model="approveTimeList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="客户状态" prop="delSwitch">
                  <el-radio-group v-model="queryParams.delSwitch">
                    <el-radio
                      v-for="item in churnTypeList"
                      :key="item.dictCode"
                      :label="item.dictCode"
                    >
                      {{ item.dictName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="审核状态" prop="churnType">
                  <el-radio-group v-model="queryParams.churnType">
                    <el-radio
                      v-for="item in auditStateList"
                      :key="item.dictCode"
                      :label="item.dictCode"
                    >
                      {{ item.dictName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button type="cyan" size="small" @click="resetQuery"
                  >重置</el-button
                >
                <el-button type="primary" size="small" @click="filtrate"
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
            placeholder="请输入客户简称或表编号或税号"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="seek"
          />
          <!-- <el-dropdown
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAddCustomer"
            v-noRole="[
              'schedulingSupervisor',
              'dispatchClerks',
              'marketCompanyBusirInternalAccount'
            ]"
          >
            <span>
              <i class="el-icon-plus"></i>
              新建客户
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item
              >

            </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <el-button
            class="ml8"
            icon="el-icon-upload2"
            size="small"
            @click="handleExport"
            v-hasPermi="['crm:log:export']"
            >导出
          </el-button> -->
        </el-col>
      </el-row>

      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>
    <div class="tabbar-vi">
      <el-tabs v-model="specialApprovalsType" @tab-click="handleQuerys">
        <!-- @tab-click="handleQuerys" -->
        <!-- <el-tab-pane label="订单审核" value="" name=""></el-tab-pane>
        <el-tab-pane label="流失审核" value="" name=""></el-tab-pane>
        <el-tab-pane label="合同审核" value="" name=""></el-tab-pane> -->
        <el-tab-pane
          v-for="item in sourceTypeLvList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
        ></el-tab-pane>
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
    <!-- 订单审核 -->
    <div class="table-data" v-if="specialApprovalsType == 10">
      <el-table
        :data="bankList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
        @row-click="handleRowFun"
      >
        <el-table-column type="selection" width="55" align="center" />

        <el-table-column
          label="客户名称"
          align="left"
          prop="companyName"
          min-width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.companyName }}
          </template>
        </el-table-column>
        <el-table-column
          label="订单编号"
          align="left"
          prop="orderNo"
          min-width="200"
        >
          <template slot-scope="scope">
            <div
              type="text"
              @click="orderShowFun(scope.row)"
              style="display: flex; align-items: center; line-height: 16px"
            >
              <img
                src="@/assets/image/orderAuditCompetent/ji.png"
                alt=""
                style="width: 24px; height: 16px; margin-right: 4px"
                v-if="scope.row.expeditedType == 10"
              />
              <span style="color: #3978e7"> {{ scope.row.orderNo }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="客户状态" align="left" prop="companyType">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.companyType == 10">
              {{ clientStatus(scope.row.companyType) }}
            </el-tag>
            <el-tag type="danger" v-else-if="scope.row.companyType == 40">
              {{ clientStatus(scope.row.companyType) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="申请人" align="left" prop="specialApplicant">
          <template slot-scope="scope">
            {{ scope.row.specialApplicant }}
          </template>
        </el-table-column>

        <el-table-column
          label="申请时间"
          align="left"
          prop="specialTime"
          min-width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.specialTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="申请详情"
          align="left"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']"
              @click="applyUp(scope.row)"
              >申请详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          align="left"
          prop="specialApprovalsType"
        >
          <template slot-scope="scope">
            <el-tag
              type="warning"
              v-if="scope.row.specialApprovalsType == 10"
              >{{ auditState(scope.row.specialApprovalsType) }}</el-tag
            >
            <el-tag v-else-if="scope.row.specialApprovalsType == 20">{{
              auditState(scope.row.specialApprovalsType)
            }}</el-tag>
            <el-tag
              type="danger"
              v-else-if="scope.row.specialApprovalsType == 30"
              >{{ auditState(scope.row.specialApprovalsType) }}</el-tag
            >
            <span v-else>—————</span>
          </template>
        </el-table-column>
        <el-table-column label="审核人" align="left" prop="approverName">
          <template slot-scope="scope">
            {{ scope.row.approverName }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="left"
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
            <el-button
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']"
              @click="auditUp(scope.row)"
              v-if="scope.row.specialApprovalsType == 10"
              >审核</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']"
              class="classCompanyType"
              v-else
              >审核</el-button
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
    <!-- 变更审核 -->
    <div class="table-data" v-if="specialApprovalsType == 20">
      <el-table
        :data="bankList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="left" />
        <el-table-column label="客户名称" align="left" prop="companyName" />
        <el-table-column label="客户编号" align="left" prop="client">
          <template slot-scope="scope">
            {{ scope.row.client }}
          </template>
        </el-table-column>
        <el-table-column
          label="客户状态"
          align="left"
          prop="delSwitch"
          :formatter="delSwitchFormat"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.delSwitch == 10">
              {{ delSwitchFun(scope.row.delSwitch) }}
            </el-tag>
            <el-tag type="danger" v-if="scope.row.delSwitch == 40">
              {{ delSwitchFun(scope.row.delSwitch) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请人" align="left" prop="churnApplicant" />
        <el-table-column label="申请详情" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="orderAuditUp(scope.row.id)"
            >
              申请详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="left" prop="churnType">
          <template slot-scope="scope">
            <!-- <el-tag type="warning">{{
              auditState(scope.row.churnType)
            }}</el-tag> -->
            <!--  -->
            <el-tag type="warning" v-if="scope.row.churnType == 10">{{
              auditState(scope.row.churnType)
            }}</el-tag>
            <el-tag v-else-if="scope.row.churnType == 20">{{
              auditState(scope.row.churnType)
            }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.churnType == 30">{{
              auditState(scope.row.churnType)
            }}</el-tag>
            <span v-else>—————</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="审核结果" align="center" prop='churnType'/> -->
        <!-- <el-table-column label="审核人" align="left" prop="churnReviewer" /> -->
        <el-table-column label="审核人" align="left" prop="churnReviewer">
          <template slot-scope="scope">
            {{ scope.row.churnReviewer }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="left"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.delSwitch == 10"
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']"
              @click="auditUpLS(scope.row.id)"
            >
              审核</el-button
            >
            <el-button
              v-if="scope.row.delSwitch != 10"
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']"
              @click="ordersAuditUp(scope.row.id)"
            >
              查看详情
            </el-button>
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
    <!-- 流失审核 -->
    <div class="table-data" v-if="specialApprovalsType == 20">
      <el-table
        :data="bankList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="left" />
        <el-table-column label="客户名称" align="left" prop="companyName" />
        <el-table-column label="客户编号" align="left" prop="client">
          <template slot-scope="scope">
            {{ scope.row.client }}
          </template>
        </el-table-column>
        <el-table-column
          label="客户状态"
          align="left"
          prop="delSwitch"
          :formatter="delSwitchFormat"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.delSwitch == 10">
              {{ delSwitchFun(scope.row.delSwitch) }}
            </el-tag>
            <el-tag type="danger" v-if="scope.row.delSwitch == 40">
              {{ delSwitchFun(scope.row.delSwitch) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请人" align="left" prop="churnApplicant" />
        <el-table-column label="申请详情" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="orderAuditUp(scope.row.id)"
            >
              申请详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="left" prop="churnType">
          <template slot-scope="scope">
            <!-- <el-tag type="warning">{{
              auditState(scope.row.churnType)
            }}</el-tag> -->
            <!--  -->
            <el-tag type="warning" v-if="scope.row.churnType == 10">{{
              auditState(scope.row.churnType)
            }}</el-tag>
            <el-tag v-else-if="scope.row.churnType == 20">{{
              auditState(scope.row.churnType)
            }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.churnType == 30">{{
              auditState(scope.row.churnType)
            }}</el-tag>
            <span v-else>—————</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="审核结果" align="center" prop='churnType'/> -->
        <!-- <el-table-column label="审核人" align="left" prop="churnReviewer" /> -->
        <el-table-column label="审核人" align="left" prop="churnReviewer">
          <template slot-scope="scope">
            {{ scope.row.churnReviewer }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="left"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.delSwitch == 10"
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']"
              @click="auditUpLS(scope.row.id)"
            >
              审核</el-button
            >
            <el-button
              v-if="scope.row.delSwitch != 10"
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']"
              @click="ordersAuditUp(scope.row.id)"
            >
              查看详情
            </el-button>
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
    <!-- 流失审核 -->
    <div class="table-datas" v-if="specialApprovalsType == 30">
      <el-table
        :data="bankList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="left" />
        <el-table-column
          label="合同编号"
          align="left"
          prop="controlNo"
          min-width="160"
        >
          <template slot-scope="scope">
            <el-button @click="viewContractFun(scope.row)" type="text">
              {{ scope.row.controlNo }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="客户名称"
          align="left"
          prop="companyName"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.companyName }}
          </template>
        </el-table-column>

        <el-table-column
          label="订单编号"
          align="left"
          prop="orderNo"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="orderShowFun(scope.row)">
              {{ scope.row.orderNo }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="合同金额" align="left" prop="money" width="130">
          <template slot-scope="scope"> {{ scope.row.money }}元 </template>
        </el-table-column>
        <el-table-column
          label="合同开始时间"
          align="left"
          prop="servicePeriodStart"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{
              parseTime(scope.row.servicePeriodStart, "{y}-{m}-{d}")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="合同结束时间"
          align="left"
          prop="servicePeriodEnd"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{
              parseTime(scope.row.servicePeriodEnd, "{y}-{m}-{d}")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="签约时间"
          align="left"
          prop="signingDate"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.signingDate, "{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="小程序二维码"
          align="center"
          class-name="small-padding fixed-width"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.state == 1"
              type="primary"
              plain
              icon="el-icon-picture-outline-round"
              @click="handleCode(scope.row)"
              v-hasPermi="['share:contract:edit']"
              >小程序二维码</el-button
            >
            <el-button v-show="scope.row.state != 1">暂无</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="H5二维码"
          align="center"
          class-name="small-padding fixed-width"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.state == 1"
              type="primary"
              plain
              icon="el-icon-picture-outline-round"
              @click="handleH5Code(scope.row)"
              v-hasPermi="['share:contract:edit']"
              >H5二维码</el-button
            >
            <el-button v-show="scope.row.state != 1">暂无</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="签单人"
          align="left"
          prop="signBill"
          width="100"
        >
        </el-table-column>
        <el-table-column label="合同类别" align="right" min-width="100">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.parentId == -1 || scope.row.parentId == ''"
              type="success"
              >新签</el-button
            >
            <el-button v-else type="danger">续费</el-button>
          </template>
        </el-table-column>
        <el-table-column label="合同状态" align="right" min-width="100">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.zgChange == 10"
              type="warning"
              plain
              v-hasPermi="['share:contract:edit']"
              >审核中</el-button
            >
            <el-button
              v-show="scope.row.zgChange == 20"
              type="primary"
              plain
              v-hasPermi="['share:contract:edit']"
              >审核成功</el-button
            >
            <el-button
              v-show="scope.row.zgChange == 30"
              type="danger"
              plain
              v-hasPermi="['share:contract:edit']"
              >审核失败</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click.native="openDetail(scope.row)">
                {{ scope.row.zgChange == "10" ? "审核" : "审核详情" }}
              </el-button>
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
    <edit-drawer
      ref="editDrawer"
      :visible.sync="drawerShow"
      :companyId="companyId"
      @editOrder="editOrderFun"
    ></edit-drawer>
    <!-- 申请详情 -->
    <el-dialog
      title="特殊审批申请"
      :visible.sync="openApply"
      width="704px"
      append-to-body
      class="addCustomer businiss apply"
    >
      <el-form ref="form" label-position="labelPosition" class="chengjiao">
        <el-row>
          <el-col :span="24">
            <div>
              <span class="A1A2A6">客户：</span>
              <span class="price">{{ viewDetailsList.companyName }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <span class="A1A2A6">订单号：</span>
              <span class="price">{{ viewDetailsList.orderNo }}</span>
            </div>
          </el-col>
          <!-- <el-col :span="12">
            <div>
              <span class="A1A2A6">服务项：</span>
              <span class="price">{{
                viewDetailsList.intermSerprceNames
              }}</span>
            </div>
          </el-col> -->
          <el-col :span="24">
            <div>
              <span class="A1A2A6">原因说明：</span>
              <span class="price">{{ viewDetailsList.applyContent }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <span class="A1A2A6">申请人：</span>
              <span class="price">{{ viewDetailsList.specialApplicant }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <span class="A1A2A6">申请时间：</span>
              <span class="price">{{ viewDetailsList.specialTime }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <span class="A1A2A6">审核人：</span>
              <span class="price">{{ viewDetailsList.approverName }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <span class="A1A2A6">审核时间：</span>
              <span class="price">{{
                viewDetailsList.approveSpecialTime
              }}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div>
              <span class="A1A2A6">审核状态：</span>
              <span class="price">
                <el-tag
                  type="warning"
                  v-if="viewDetailsList.specialApprovalsType == 10"
                  >{{
                    auditState(viewDetailsList.specialApprovalsType)
                  }}</el-tag
                >
                <el-tag v-if="viewDetailsList.specialApprovalsType == 20">{{
                  auditState(viewDetailsList.specialApprovalsType)
                }}</el-tag>
                <el-tag
                  type="danger"
                  v-if="viewDetailsList.specialApprovalsType == 30"
                  >{{
                    auditState(viewDetailsList.specialApprovalsType)
                  }}</el-tag
                >
              </span>
              <!-- <span>{{viewDetailsList.orderState}}</span> -->
            </div>
          </el-col>
          <el-col :span="24">
            <div>
              <span class="A1A2A6">审核备注：</span>
              <span class="price">{{ viewDetailsList.reexamination }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="cancel">确认</el-button>
      </div>
      <!-- </div> -->
    </el-dialog>
    <!-- 审核 -->
    <el-dialog
      title="订单审核"
      :visible.sync="openOrderAudit"
      width="516px"
      append-to-body
      class="addCustomer businiss orderAudit"
    >
      <el-form
        ref="form"
        label-position="labelPosition"
        class="chengjiao"
        :model="auditData"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="companyName">
              <i class="el-icon-office-building"></i>
              <span>{{ auditData.companyName }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-alert
              title="点击不通过，必须填写备注，否则无法确认审核!"
              type="warning"
              show-icon
              class="word"
            >
            </el-alert>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              label="审核意见:"
              style="margin-left: 36px; margin-right: 34px; margin-top: 16px"
            >
              <el-radio label="20" v-model="auditData.specialApprovalsType"
                >通过</el-radio
              >
              <el-radio label="30" v-model="auditData.specialApprovalsType"
                >不通过</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="审核备注" class="tax">
              <el-input
                type="textarea"
                style="width: 330px; height: 98px"
                placeholder="请填写审核备注"
                v-model="auditData.reexamination"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确认审核</el-button>
      </div>
    </el-dialog>
    <!-- 查看流失申请详情 -->
    <el-dialog
      title="查看流失申请"
      :visible.sync="openOrderAuditLS"
      width="704px"
      append-to-body
      class="addCustomer businiss OrderAudit"
    >
      <el-form ref="form" label-position="labelPosition" class="chengjiao">
        <el-row>
          <el-col :span="24">
            <div class="companyName">
              <span class="right14">流失客户:</span>
              <span class="price">{{ companyList.companyName }}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="companyName">
              <span class="right14">流失原因:</span>
              <span
                class="price"
                v-for="item in reasonsList"
                :key="item.dictCode"
                >{{
                  item.dictCode == companyList.churnReason ? item.dictName : ""
                }}</span
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="companyName">
              <span class="right14">原因说明:</span>
              <span class="price">{{ companyList.churnDescription }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="margin-bottom: 0px">
            <div class="companyName">
              <span class="right14">申请人:</span>
              <span>{{ companyList.churnApplicant }}</span>
            </div>
          </el-col>
          <el-col :span="12" style="margin-bottom: 0px">
            <div class="companyName">
              <span class="right14">申请时间:</span>
              <span>{{ companyList.applicantTime }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="0" v-if="custom">
          <el-col :span="12">
            <div class="companyName">
              <span class="right14">审核人:</span>
              <span>{{ companyList.churnReviewer }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="companyName">
              <span class="right14">审核时间:</span>
              <span>{{ companyList.reviewerTime }}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="companyName">
              <span class="right14">审核状态:</span>
              <el-tag
                style="
                  height: 22px !important;
                  font-size: 12px !important;
                  line-height: 22px !important;
                "
                >{{ auditState(companyList.churnType) }}</el-tag
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="companyName">
              <span class="right14">审核备注:</span>
              <span>{{ companyList.reviewerRemarks }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer bottom">
        <el-button @click="openOrderAuditLS = false">取 消</el-button>

        <el-button type="primary" @click="openOrderAuditLS = false"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <!-- 流失审核 -->
    <el-dialog
      title="审核"
      :visible.sync="openOffAudit"
      width="516px"
      append-to-body
      class="addCustomer businiss orderAudit"
    >
      <el-form
        label-width="85px"
        ref="form"
        label-position="labelPosition"
        class="chengjiao"
        :model="auditData"
      >
        <!--       
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="companyName">
              <i class="el-icon-edit"></i>
              <span>{{ auditData.companyName }}</span>
            </div>
          </el-col>
        </el-row> -->
        <!-- 申请原因 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 16px">
            <el-form-item label="申请原因" class="tax">
              <div class="left">
                <!-- <el-input
                readonly
                type="text"
                placeholder="请填写申请备注"
                v-model="auditData.reviewerRemarks"
                v-for="item in reasonsList" :key="item.dictCode"
              /> -->
                <span v-for="item in reasonsList" :key="item.dictCode">{{
                  item.dictCode == companyList.churnReason ? item.dictName : ""
                }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 申请人 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 16px">
            <el-form-item label="申请人" class="tax">
              <div class="left">
                <span>{{ companyList.churnApplicant }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 申请时间 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 16px">
            <el-form-item label="申请时间" class="tax">
              <div class="left">
                <span>{{ companyList.applicantTime }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 申请备注 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 16px">
            <el-form-item label="申请备注" class="tax">
              <div class="left">
                {{ companyList.churnDescription }}
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 警告框 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 10px" class="tax">
            <el-alert
              title="点击不通过，必须填写备注，否则无法确认审核!"
              type="warning"
              show-icon
              style="width: 400px; height: 35px; margin-top: 16px"
            >
            </el-alert>
          </el-col>
        </el-row>
        <!-- 审核意见 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 16px">
            <el-form-item
              label="审核意见:"
              style="margin-left: 36px; margin-right: 34px"
            >
              <el-radio label="20" v-model="companyList.churnType"
                >通过</el-radio
              >
              <el-radio label="30" v-model="companyList.churnType"
                >不通过</el-radio
              >
              <!-- {{ auditState(companyList.churnType) }} -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 10px">
            <el-form-item
              label="审核备注"
              style="margin-left: 36px; margin-right: 34px"
            >
              <el-input
                type="textarea"
                style="width: 330px; height: 120px"
                placeholder="请填写审核备注"
                v-model="companyList.reviewerRemarks"
              />
              <!-- {{ companyList.reviewerRemarks }} -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitFormLS">确认</el-button>
      </div>
    </el-dialog>
    <!-- 二维码 -->
    <el-dialog
      :title="codeTitle"
      :visible.sync="codeOpen"
      width="800px"
      append-to-body
    >
      <div class="code_img">
        <img :src="codeImg" alt="" />
      </div>
    </el-dialog>
    <!-- H5二维码 -->
    <el-dialog
      :title="hcodeTitle"
      :visible.sync="hcodeOpen"
      width="800px"
      append-to-body
    >
      <div class="code_img">
        <img :src="hcodeImg" alt="" />
      </div>
    </el-dialog>
    <el-dialog
      title="订单审核详情"
      :visible.sync="orderReview"
      width="516px"
      append-to-body
      class="OrderReview"
    >
      <el-form
        label-position="labelPosition"
        class="chengjiao"
        :model="auditData"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="companyName">
              <i class="el-icon-office-building" style="margin-right: 9px"></i>
              <span>{{ auditData.companyName }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="rowFather">
          <el-col :span="12">
            <el-form-item label="合同编号" style="position: relative">
              <el-input v-model="auditData.controlNo" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签单人" style="position: relative">
              <el-input v-model="auditData.signBill" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额" style="position: relative">
              <span
                style="position: absolute; top: 38px; right: 15px; z-index: 99"
                >元</span
              >
              <el-input v-model="auditData.money" :disabled="true"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签约时间">
              <el-date-picker
                v-model="auditData.signingDate"
                type="date"
                placeholder="选择日期"
                :disabled="true"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同开始时间">
              <el-date-picker
                v-model="auditData.servicePeriodStart"
                type="date"
                placeholder="选择日期"
                :disabled="true"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同结束时间">
              <el-date-picker
                v-model="auditData.servicePeriodEnd"
                type="date"
                placeholder="选择日期"
                :disabled="true"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请理由">
              <el-input
                type="textarea"
                style="width: 465px; height: 50px"
                placeholder="请填写申请理由"
                v-model="auditData.changeApplication"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-alert
              title="点击不通过，必须填写备注，否则无法确认审核!"
              type="warning"
              show-icon
              class="word"
            >
            </el-alert>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              label="审核意见:"
              style="margin-left: 36px; margin-right: 34px; margin-top: 16px"
            >
              <el-radio-group v-model="nzAudit">
                <el-radio label="20">通过</el-radio>
                <el-radio label="30">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20"> </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="remarks">
            <el-form-item
              label="审核备注:"
              style="
                margin-left: 36px;
                margin-right: 34px;
                display: flex;
                align-items: flex-start;
              "
            >
              <el-input
                type="textarea"
                style="width: 325px; height: 98px"
                placeholder="请填写审核备注"
                v-model="auditData.zgChangeRemarks"
              />
              <!-- v-model="auditData.nzAuditRemarks"  -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shenHeCancel">取 消</el-button>
        <el-button
          :disabled="auditData.zgChange !== '10'"
          type="primary"
          @click="shenHeSubmitForm"
          >确认审核</el-button
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
  </div>
</template>

<script>
import EditDrawer from "@/views/components/EditDrawer/index";
import { mapGetters } from "vuex";
import {
  orderAuditBeList, //订单审核主管列表
  viewDetails, //查看详情
  orderAuditSubmit, //订单审核
} from "@/api/crm/orderAuditCompetent/orderAuditCompetent";
import {
  runApplyBeList,
  zgChangeListPageList, //变更审核列表
  runAudit,
  runParticulars,
  zgChangeAudit, //确认边更审核
} from "@/api/crm/runProposer/runProposer"; //流失审核
import { updateCode, updateH5Code } from "@/api/crm/contract";
import EditContract from "@/views/components/EditContract";
export default {
  components: {
    EditDrawer,
    EditContract,
  },
  data() {
    return {
      contractShow: false,
      contractId: "",
      form: {},
      codeImg: "",
      hcodeImg: "",
      codeTitle: "",
      hcodeTitle: "",
      codeOpen: false,
      hcodeOpen: false,
      nzAudit: "20", //审核是否通过
      renewForm: {},
      auditData: {
        reexamination: null, //审核备注
      }, //审核数据
      viewDetailsList: [], //查看详情
      openApply: false, //申请详情弹出层
      openOrderAudit: false, //审核弹出层
      openOrderAuditLS: false, //流失申请详情
      custom: 0,
      reasonsList: [], //流失原因
      openOffAudit: false, //流失审核弹出层
      drawerShow: false,
      churnTypeList: [
        { dictCode: 10, dictName: "正常" },
        { dictCode: 40, dictName: "流失" },
      ], //流失申请审核状态
      settings: [{ icon: "el-icon-delete", lable: "删除", value: "1" }],
      auditStateList: [
        { dictName: "待审核", dictCode: "10" },
        { dictName: "审核成功", dictCode: "20" },
        { dictName: "审核失败", dictCode: "30" },
      ], //筛选审核状态
      sourceTypeLvList: [
        { dictName: "订单审核", dictCode: "10" },
        { dictName: "流失审核", dictCode: "20" },
        { dictName: "变更审核", dictCode: "30" },
        // { dictName: "合同审核", dictCode: "30" }
      ], //切换
      view: false, // 是否抽屉弹出层
      showSearch: false, // 显示搜索条件
      loading: true, // 遮罩层
      orderVisible: false, //查看订单显示
      orderId: "",
      hiddenTab: true,
      total: 0, // 总条数
      companyList: [], //   表格数据
      filePath: process.env.VUE_APP_FILE_API,
      orderReview: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        type: 10,
        clientLv: null,
        linkman: null, //联系人
        district: null, //所在地区
        createBy: null, //业务员
        companyId: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        accomplishTime: null,
        followTime: null,
        enteringTime: null,
        appId: "",
        companyName: "",
        roleName: null,
        clientType: "0",
        area: "",
        county: "",
        labelName: "",
        specialApprovalsType: "0",
        // churnType:'0'
      },
      specialApprovalsType: "10",
      bankList: [], //列表数据
      companyId: [
        {
          required: true,
          message: "公司Id不能为空",
          trigger: "blur",
        },
      ],
      companyId: null,
      specialStartTimeList: null, //审核时间
      approveTimeList: null, //订单审核时间
      applicationTimeList: null, //申请时间
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
  },
  created() {
    this.getList();
    //流失原因
    this.getDicts("reasons_for_loss").then((res) => {
      this.reasonsList = res.data;
    });
  },
  methods: {
    viewContractFun(row) {
      this.renewForm.xufei = true;
      let rows = {
        id: row.id,
        xufei: this.renewForm.xufei,
      };
      this.contractShow = true;
      this.contractId = row.id;
      this.form = rows;
    },
    shenHeCancel() {
      this.orderReview = false;
    },
    //变更审核确认审核
    shenHeSubmitForm() {
      let companyForm = {
        id: this.auditData.ccrId,
        zgChange: this.nzAudit,
        zgChangeRemarks: this.auditData.zgChangeRemarks,
      };
      console.log(companyForm);
      zgChangeAudit(companyForm).then((response) => {
        if (response.code == 200) {
          this.orderReview = false; //订单审核
          this.getListHT();
          this.auditData = {};
        }
      });
    },
    //变更审核审核
    openDetail(row) {
      this.auditData = row;
      this.orderReview = true;
      if (row.zgChange == "10") {
        this.nzAudit = "";
      } else {
        this.nzAudit = row.zgChange;
      }
    },
    // 生成二维码
    handleCode(row) {
      let id = row.id;
      updateCode({
        id: id,
      }).then((res) => {
        if (res.code == 200) {
          this.codeTitle = "合同编号:" + row.controlNo + "的小程序二维码";
          this.codeOpen = true;
          this.codeImg = this.filePath + res.data;
        }
      });
    },
    // 生成H5二维码
    handleH5Code(row) {
      console.log(row);
      let id = row.id;
      updateH5Code({
        id: id,
      }).then((res) => {
        if (res.code == 200) {
          this.hcodeTitle = "合同编号:" + row.controlNo + "的H5二维码";
          this.hcodeOpen = true;
          // this.hcodeImg = this.filePath + res.data
          this.hcodeImg = res.data;
        }
      });
    },
    // 搜索框
    seek() {
      if (this.specialApprovalsType == 10) {
        this.getList();
      } else if (this.specialApprovalsType == 20) {
        this.getListLS();
      } else if (this.specialApprovalsType == 30) {
        this.getListHT();
      }
    },
    //客户字典状态
    delSwitchFormat(row) {
      return this.selectDictLabel(this.delSwitchList, row.delSwitch);
    },
    //行业分类字典
    industryNameFormat(row) {
      return this.selectDictLabel(this.industryNameList, row.industryName);
    },
    //客户来源分类字典
    businessFromFormat(row) {
      return this.selectDictLabel(this.clientSourceList, row.clientSource);
    },

    //客户状态
    delSwitchFun(data) {
      if (data == 10) {
        return "正常";
      } else if (data == 20) {
        return "已删除";
      } else if (data == 30) {
        return "回收站";
      } else {
        return "流失";
      }
    },
    /** 查询客户信息列表 */
    getList() {
      this.loading = true;
      this.queryParams.reviewerType = this.queryParams.clientType;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      data.specialApprovalsType =
        data.specialApprovalsType == "0" ? null : data.specialApprovalsType;
      // data.specialApprovalsType=null
      orderAuditBeList(data).then((response) => {
        this.bankList = response.data.rows;
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    orderShowFun(row) {
      this.companyId = row.companyId;
      this.$refs.editDrawer.editOrderFun(row);
    },
    // 申请详情
    applyUp(row) {
      this.reset();
      this.openApply = true;
      this.title = "特殊申请审批";
      let id = row.id;
      viewDetails({ orderId: row.id }).then((response) => {
        this.viewDetailsList = response.data;
      });
    },
    // 审核
    auditUp(row) {
      this.reset();
      this.openOrderAudit = true;
      this.title = "订单审核";
      this.auditData.id = row.id;
      this.auditData.reexamination = row.reexamination;
      this.auditData.companyName = row.companyName;
    },
    // 订单审核提交按钮
    submitForm() {
      let companyListRun = JSON.parse(JSON.stringify(this.auditData));
      orderAuditSubmit(companyListRun).then((response) => {
        this.openOrderAudit = false;
        this.getList();
      });
      this.openOrderAudit = false;
      this.$refs["form"].validate((valid) => {
        if (valid) {
        }
      });
    },
    //  流失审核提交按钮
    submitFormLS() {
      let companyListRun = this.companyList;
      if (
        companyListRun.reviewerRemarks == "" &&
        companyListRun.churnType == "30"
      ) {
        return this.$message.error("必须填写审核备注!");
      }
      runAudit(companyListRun).then((response) => {
        this.openOffAudit = false;
      });
      this.getListLS();
    },
    // 流失审核
    getListLS() {
      this.loading = true;
      this.queryParams.reviewerType = this.queryParams.clientType;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      runApplyBeList(data).then((response) => {
        this.bankList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    // 变更审核
    getListHT() {
      this.loading = true;
      this.queryParams.reviewerType = this.queryParams.clientType;
      this.queryParams.specialApprovalsType =
        this.queryParams.specialApprovalsType == "0"
          ? null
          : this.queryParams.specialApprovalsType;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      zgChangeListPageList(data).then((response) => {
        this.bankList = response.data.rows || [];
        console.log(this.bankList[0].companyName);
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.openOrderAudit = false; //审核取消按钮
      this.openApply = false; //申请详情取消按钮
      this.showSearch = false; //筛选取消按钮
      this.openOrderAuditLS = false; //流失申请详情
      this.openOffAudit = false; //流失申请审核
    },
    //     handleRowFun(row, column, event) {
    //   if (
    //     column.property &&
    //     column.property != undefined &&
    //     column.property != "undefined"
    //   ) {
    //     this.reset();
    //     this.companyId = row.id;
    //     this.view = true;
    //   }
    // },
    editOrderFun(row) {
      this.orderId = row.id;
      this.orderVisible = true;
      this.hiddenTab = false;
    },
    //
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
    // ?筛选按钮
    filtrate() {
      //   if (e.keyCode != 13) {
      //     this.showSearch = false;
      //   }
      if (this.specialApprovalsType == 10) {
        if (this.specialStartTimeList) {
          this.queryParams.specialStartDate =
            this.specialStartTimeList[0] + " 00:00:00";
          this.queryParams.specialEndDate =
            this.specialStartTimeList[1] + " 23:59:59";
        } else {
          this.queryParams.specialStartDate = "";
          this.queryParams.specialEndDate = "";
        }
        this.getList();
      } else if (this.specialApprovalsType == 20) {
        if (this.applicationTimeList) {
          this.queryParams.applicationStart =
            this.applicationTimeList[0] + " 00:00:00";
          this.queryParams.applicationEnd =
            this.applicationTimeList[1] + " 23:59:59";
        } else {
          this.queryParams.applicationStart = "";
          this.queryParams.applicationEnd = "";
        }
        if (this.approveTimeList) {
          this.queryParams.approveStart = this.approveTimeList[0] + " 00:00:00";
          this.queryParams.approveEnd = this.approveTimeList[1] + " 23:59:59";
        }
        this.getListLS();
      } else if (this.specialApprovalsType == 30) {
        this.getListHT();
      }
    },
    /** 切换操作 */
    handleQuerys(e) {
      this.specialApprovalsType = e.name;
      // this.queryParams.pageNo = 1;
      // this.queryParams.pageSize = 10;

      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        clientType: null,
        keyword: "",
        specialApprovalsType: "0",
        approverName: null, //审核人名称
        specialStartDate: "", //审核开始时间
        specialEndDate: "", //审核结束时间
      };
      if (e.name == 10) {
        this.getList();
      } else if (e.name == 20) {
        this.getListLS();
      } else if (e.name == 30) {
        this.getListHT();
      }
    },
    /** 刷新按钮按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      // this.resetQuery();
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        clientType: null,
        specialApprovalsType: "0",
        approverName: null, //审核人名称
        specialStartDate: "", //审核开始时间
        specialEndDate: "", //审核结束时间
      };
      if (this.specialApprovalsType == 10) {
        this.getList();
      } else if (this.specialApprovalsType == 20) {
        this.getListLS();
      } else if (this.specialApprovalsType == 30) {
        this.getListHT();
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNo: 1,
        pageNum: 10,
        id: null,
        churnType: null,
        reviewerRemarks: null,
        clientType: "0",
        churnReason: null, //流失原因
        churnApplicant: null, //申请人
        applicationStart: "", //申请开始时间
        applicationEnd: "", //申请结束时间
        approveStart: "", //订单审核开始时间
        approveEnd: "", //订单审核结束时间
        delSwitch: null, //审核状态
        specialApprovalsType: "0",
        churnType: "0",
      };
      this.applicationTimeList = null;
      this.approveTimeList = null;
    },
    // 客户状态
    clientStatus(status) {
      if (status == 10) {
        return (status = "正常");
      } else if (status == 20) {
        return (status = "已删除");
      } else if (status == 30) {
        return (status = "回收站");
      } else if (status == 40) {
        return (status = "流失");
      }
    },
    //审核状态
    auditState(data) {
      if (data == 10) {
        return "审核中";
      } else if (data == 20) {
        return "审核成功";
      } else if (data == 30) {
        return "审核失败";
      } else {
        return "审核中1";
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    // 表单重置
    reset() {
      this.form = {
        userlabelIds: [],
      };
    },
    // 查看流失申请
    orderAuditUp(id) {
      this.reset();
      this.custom = 0;
      this.openOrderAuditLS = true;
      this.title = "查看详情";
      let data = JSON.parse(JSON.stringify(id));
      runParticulars({ companyId: data }).then((response) => {
        this.companyList = response.data;
      });
    },
    // ?流失申请查看详情
    ordersAuditUp(id) {
      this.reset();
      this.custom = this.custom + 1;
      this.openOrderAuditLS = true;
      this.title = "查看详情";
      //
      let data = JSON.parse(JSON.stringify(id));
      runParticulars({ companyId: data }).then((response) => {
        this.companyList = response.data;
      });
    },
    auditUpLS(id) {
      this.reset();
      this.openOffAudit = true;
      this.title = "流失审核";
      let data = JSON.parse(JSON.stringify(id));
      runParticulars({ companyId: data }).then((response) => {
        this.companyList = response.data;
      });
    },
  },
};
</script>

<style lang="scss">
.businessReview {
}
</style>
<style lang="scss">
.orderAudit {
  .chengjiao {
    margin: 0px !important;
    .companyName {
      padding-top: 9px;
      padding-bottom: 23px;
      display: flex;
      align-items: center;
      border-bottom: 1px dashed #e6e7eb;
      .el-icon-edit:before {
        content: "\e78c";
        display: inline-block;
      }
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        line-height: 24px;
        margin-left: 9px;
      }
    }
    .word {
      margin-top: 9px;
      height: 34px;
    }
    .tax {
      margin-left: 36px;
      margin-right: 34px;
      display: flex;
      margin-bottom: 0px;
      .el-textarea__inner {
        height: 100%;
      }
    }
  }
}
.el-form-item__content .left {
  margin-left: -50px !important;
}
.OrderAudit {
  .el-dialog__body {
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 0px;
    margin-bottom: 154px;
    .chengjiao {
      margin: 0px;
      padding-left: 32px;
      padding-right: 32px;
      border-bottom: 1px solid #e6e7eb;
      .el-row {
        padding-top: 25px;
        padding-bottom: 28px;
        border-bottom: 1px solid #e6e7eb;
        .el-col {
          margin-bottom: 16px;
          .right14 {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #a1a2a6;
            margin-right: 16px;
          }
          .price {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #565759;
            line-height: 24px;
          }
        }
        .el-col:last-child {
          margin-bottom: 0px;
        }
      }
      .el-row:last-child {
        border: 0px;
      }
    }
  }
}
</style>
<style lang="scss">
.apply .el-dialog {
  background-color: #ffffff;
}
.classCompanyType {
  span {
    color: #d2d3d6;
  }
}
.orderAudit {
  .chengjiao {
    margin: 0px !important;
    .companyName {
      padding-top: 9px;
      padding-bottom: 23px;
      display: flex;
      align-items: center;
      border-bottom: 1px dashed #e6e7eb;
      .el-icon-edit:before {
        content: "\e78c";
        display: inline-block;
      }
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        line-height: 24px;
        margin-left: 9px;
      }
    }
    .word {
      margin-top: 9px;
      height: 34px;
    }
    .tax {
      margin-left: 36px;
      margin-right: 34px;
      display: flex;
      margin-bottom: 0px;
      .el-textarea__inner {
        height: 100%;
      }
    }
  }
}
// 订单审核
.OrderReview {
  overflow: auto;
  .el-dialog {
    border-radius: 4px;
    margin-top: 15vh !important ;
    .el-dialog__body {
      .chengjiao {
        margin: 0px;

        .el-row {
          .word {
            .el-alert__content {
              .el-alert__title {
                color: #6e7073;
                font-size: 12px;
              }
            }
          }
          .companyName {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
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
          .remarks {
            .el-form-item__label {
              line-height: 1;
            }
            .el-form-item__content {
              .el-textarea__inner {
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
.apply {
  .el-dialog {
    // height: 662px;
    .el-dialog__body {
      padding-top: 0px;
      .el-form {
        background: #ffffff;
        margin: 0px;
        margin-bottom: 138px;
        padding-top: 0px;
        padding-left: 8px;
        padding-right: 8px;
        padding-bottom: 14px;
        .el-row {
          padding-top: 26px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e6e7eb;
          .el-col {
            margin-bottom: 13px;
          }
        }
        .el-input {
          width: 100%;
        }
        .el-select {
          width: 100%;
        }
      }
    }
    .name {
      display: flex;
      align-items: flex-start;
      span {
        margin-right: 12px;
      }
      img {
        width: 76px;
        height: 76px;
      }
    }
  }
}
</style>
