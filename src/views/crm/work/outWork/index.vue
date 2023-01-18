<template>
  <div class="app-container">
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            v-model="showSearch"
          >
            <!-- 筛选弹框 -->
            <!-- <div class="search-popover">

            </div> -->
            <div class="search-popover">
              <el-form
                :visible.sync="showSearch"
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="创建时间" prop="dateCreatedList">
                  <el-date-picker
                    v-model="dateCreatedList"
                    size="small"
                    class="mw350"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="完成时间" prop="accomplishDataList">
                  <el-date-picker
                    v-model="accomplishDataList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="截止时间" prop="deadlineList">
                  <el-date-picker
                    v-model="deadlineList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="所在地区">
                  <el-cascader
                    placeholder="请选择信息所在地区"
                    style="width: 100%"
                    size="small"
                    :options="areaOptions"
                    v-model="district"
                    @change="handleRegionChange"
                  >
                  </el-cascader>
                </el-form-item>
                <el-form-item label="标记">
                  <el-input
                    style="width: 199px"
                    v-model="queryParams.labelName"
                    placeholder="请输入标记"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认</el-button
                >
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search"
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
          >
            <el-tree
              node-key="id"
              ref="organizationTree"
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
              @check-change="handleOrganizationTreeClick"
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
            icon="el-icon-download"
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
    <!-- 任务列表 -->
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.flowStatus" @tab-click="handleTabQuery">
        <el-tab-pane label="全部任务" value="全部任务" name=""></el-tab-pane>

        <el-tab-pane label="未分配" value="600" name="600"></el-tab-pane>
        <el-tab-pane label="已分配" value="700" name="700"></el-tab-pane>
        <el-tab-pane label="停止服务客户" value="10" name="10"></el-tab-pane>
        <el-tab-pane label="已完成" value="30" name="30"></el-tab-pane>
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
    <div class="table-data">
      <el-table
        :data="bankList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="left" />
        <el-table-column label="任务类型" align="left" prop="serpriceName" />

        <el-table-column label="客户名称" align="left" prop="companyName">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="showDrawer(scope.row)"
              style="width: 100%"
              >{{ scope.row.companyName }}</el-button
            >
            <el-dropdown
              v-if="scope.row.crmIntermUserlabelResults != ''"
              class="choice"
              trigger="click"
            >
              <span class="el-dropdown-link">
                {{ scope.row.crmIntermUserlabelResults[0].name
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in scope.row.crmIntermUserlabelResults"
                  :key="index"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column label="任务内容" align="left" prop="remarks">
          <template slot-scope="scope">
            <span style="color: #3978e7" @click="taskParticularsUp(scope.row)"
              >查看任务内容</span
            >
          </template>
        </el-table-column>
        <el-table-column label="指派人" align="left" prop="assigner" />
        <el-table-column label="执行人" align="left" prop="executor" />
        <el-table-column
          label="任务状态"
          align="left"
          prop="flowStatus"
          :formatter="auditStateDictionaries"
        >
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.flowStatus == 10">
              {{ TaskState(scope.row.flowStatus) }}
            </el-tag>
            <el-tag v-if="scope.row.flowStatus == 20">
              {{ TaskState(scope.row.flowStatus) }}
            </el-tag>
            <el-tag type="success" v-if="scope.row.flowStatus == 30">
              {{ TaskState(scope.row.flowStatus) }}
            </el-tag>
            <el-tag type="danger" v-if="scope.row.flowStatus == 40">
              {{ TaskState(scope.row.flowStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" align="left" prop="createDate">
          <template slot-scope="scope">
            <span>{{
              parseTime(scope.row.createDate, "{y}-{m}-{d} {h}:{i}:{s}")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截止日期" align="left" prop="truncationTime">
          <template slot-scope="scope">
            <span>{{
              parseTime(scope.row.truncationTime, "{y}-{m}-{d} {h}:{i}:{s}")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="完成日期" align="left" prop="figureOutTime">
          <template slot-scope="scope">
            <span>{{
              parseTime(scope.row.figureOutTime, "{y}-{m}-{d} {h}:{i}:{s}")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="left" prop="wqAuditType">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.wqAuditType == 10">{{
              auditState(scope.row.wqAuditType)
            }}</el-tag>
            <el-tag v-else-if="scope.row.wqAuditType == 20">{{
              auditState(scope.row.wqAuditType)
            }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.wqAuditType == 30">{{
              auditState(scope.row.wqAuditType)
            }}</el-tag>
            <el-tag type="success" v-else>
              {{ "执行中" }}
            </el-tag>
            <!-- <span v-else>—————</span> -->
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="left"
          width="200px"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.flowStatus == 10">
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                style="color:#A1A2A6;"
                >查看跟进</el-button
              >

              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                style="color:#A1A2A6;"
                >移交</el-button
              ><br />
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                style="color:#A1A2A6;"
                >驳回</el-button
              >

              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                class="red"
                style="color:#A1A2A6;"
                >关闭</el-button
              >
            </div> -->
            <div v-if="scope.row.flowStatus != 10">
              <el-button
                size="mini"
                type="text"
                @click="addFollow(scope.row)"
                v-hasPermi="['crm:userlabel:edit']"
                >查看跟进</el-button
              >
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                style="color: #a1a2a6"
                v-if="scope.row.allocationId != ''"
                >移交</el-button
              >
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                v-if="scope.row.allocationId == ''"
                @click="offAuditUp(scope.row), executor(scope.row)"
                >移交</el-button
              >
              <br />
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                @click="orderAuditUp(scope.row)"
                v-if="scope.row.wqAuditType == 20"
              >
                驳回</el-button
              >
              <el-button
                size="mini"
                type="text"
                style="color: #a1a2a6"
                v-if="scope.row.wqAuditType != 20"
                >驳回</el-button
              >

              <el-button
                size="mini"
                type="text"
                @click="orderParticularsUp(scope.row)"
                v-if="
                  scope.row.wqAuditType == 20 || scope.row.wqAuditType == 30
                "
                >查看详情</el-button
              >
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                class="red"
                @click="shutBtn(scope.row)"
                v-if="scope.row.flowStatus != 30"
                >关闭</el-button
              >
            </div>
            <div v-if="scope.row.flowStatus == 10">
              <el-button
                type="success"
                plain
                @click="handleActivation(scope.row.id)"
                >激活</el-button
              >
              <el-button
                type="primary"
                plain
                @click="seeWhy(scope.row.reasonClosure)"
                >查看原因</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="left"
          class-name="table-control"
          width="50"
        >
          <!-- fixed="right" -->
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
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
    <!-- 任务详情 -->
    <el-dialog
      title="任务详情"
      :visible.sync="taskParticulars"
      width="704px"
      append-to-body
      class="task"
    >
      <div class="box">
        <el-form
          ref="form"
          :model="taskParticularsData"
          label-position="labelPosition"
          class="chengjiao"
        >
          <el-row type="flex" justify="space-between" :gutter="24">
            <el-col :span="12">
              <el-form-item label="客户名称">
                <el-input
                  placeholder="请输入客户名称"
                  v-model="taskParticularsData.companyName"
                  :disabled="!!taskParticularsData"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input
                  placeholder="请输入联系人"
                  v-model="taskParticularsData.linkman"
                  :disabled="!!taskParticularsData"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" :gutter="24">
            <el-col :span="12">
              <el-form-item label="联系方式">
                <el-input
                  placeholder="请输入联系方式"
                  v-model="taskParticularsData.mobile"
                  :disabled="!!taskParticularsData"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地区">
                <el-select
                  placeholder="请选择所在地区"
                  v-model="taskParticularsData.region"
                  :disabled="!!taskParticularsData"
                >
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="详细地址" class="tax">
                <el-input
                  v-model="taskParticularsData.address"
                  style="width: 100%"
                  placeholder="请输入详细地址"
                  :disabled="!!taskParticularsData"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="任务类型">
                <el-select
                  placeholder="请选择任务类型"
                  v-model="taskParticularsData.serpriceName"
                  :disabled="!!taskParticularsData"
                >
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="任务内容" class="tax box-tax" prop="remarks">
                <el-input
                  v-model="taskParticularsData.remarks"
                  type="textarea"
                  style="width: 100%;height：80px;"
                  placeholder="请输入任务内容"
                  :disabled="!!taskParticularsData"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="截止时间" prop="tempDate">
                <el-date-picker
                  style="width: 100%；"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  v-model="taskParticularsData.truncationTime"
                  :disabled="!!taskParticularsData"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="执行人">
                <el-select
                  placeholder="请选择执行人"
                  v-model="taskParticularsData.executor"
                  :disabled="!!taskParticularsData"
                >
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" :gutter="24">
            <el-col :span="12">
              <el-form-item label="创建人">
                <el-input
                  placeholder="请输入创建人"
                  v-model="taskParticularsData.assigner"
                  :disabled="!!taskParticularsData"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer bottom">
          <el-button @click="cancel">取 消</el-button>
          <el-button
            type="primary"
            @click="cancel"
            v-if="roles.indexOf('boss') == -1"
            >确定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!--  审核-->
    <el-dialog
      title="订单审核"
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
              <span>{{ queryParams.companyName }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <!-- <el-alert
              title="点击不通过，必须填写备注，否则无法确认审核!"
              type="warning"
              show-icon
              class="word"
            >
            </el-alert> -->
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              label="审核意见:"
              style="margin-left:36px;margin-right:34px;margin-top: 16px;"
              prop="dispatchState"
            >
              <el-radio v-model="auditData.dispatchState" label="20"
                >通过</el-radio
              >
              <el-radio v-model="auditData.dispatchState" label="30"
                >不通过</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :span="24" class="remarks">
            <el-form-item
              label="驳回原因:"
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
                placeholder="请填写驳回原因"
                v-model="auditData.auditorRemarks"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button
          type="primary"
          @click="auditSubmitBtn"
          v-if="roles.indexOf('boss') == -1"
          >确认驳回</el-button
        >
      </div>
    </el-dialog>
    <!-- 订单审核详情 -->
    <el-dialog
      title="订单审核详情"
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
              <span>{{ auditData.companyName }}</span>
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
                v-if="orderParticularsList.status == 20"
              >
                通过</el-radio
              >
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.status == 30"
              >
                未通过</el-radio
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="sonBox">
              <span class="right14">审核备注:</span>
              <span class="price">{{ orderParticularsList.remark }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{ orderParticularsList.time }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{ orderParticularsList.name }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 关闭 -->
    <el-dialog
      title="提示"
      :visible.sync="shutPopUp"
      width="422px"
      append-to-body
      class="shutPop"
    >
      <el-form :model="stopForm" ref="stopForm" :rules="stopFormRules">
        <el-row style="margin-bottom: 15px">
          <el-col :span="24">
            <span
              style="
                display: inline-block;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                text-align: center;
                line-height: 22px;
                color: #ffffff;
                background: rgb(231, 166, 107);
                margin-right: 12px;
              "
              >!</span
            >
            <span>关闭后，该任务将无法继续进行任何操作！</span>
          </el-col>
        </el-row>
        <el-form-item prop="remark">
          <el-input
            v-model="stopForm.remark"
            type="textarea"
            :rows="5"
            placeholder="请输入关闭原因"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button
          type="primary"
          @click="shutBtnsubmit()"
          v-if="roles.indexOf('boss') == -1"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <!-- 查看关闭原因 -->
    <el-dialog title="停止服务原因" :visible.sync="stopReasonShow" width="30%">
      <el-form>
        <el-form-item prop="remark">
          <el-input
            v-model="stopReason"
            type="textarea"
            :rows="5"
            readonly
            placeholder="请输入停止服务原因"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="stopReasonShow=false">取 消</el-button> -->
        <el-button type="primary" @click="stopReasonShow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 跟进记录 -->
    <el-dialog
      title="跟进记录"
      :visible.sync="followOpen"
      width="704px"
      append-to-body
      class="addCustomer businiss offApply follow"
    >
      <div class="box">
        <div class="table_header">
          <i class="el-icon-office-building mr10"></i>
          <span>{{ this.companyName }}</span>
        </div>
        <div class="box_table">
          <div class="box_table_header">
            <div class="table_left">
              <i class="el-icon-s-operation"></i>
              <span>{{ taskType }}</span>
            </div>
            <div class="table_right">
              <button class="addbut" @click="addStep" v-if="judge == true">
                + 添加步骤
              </button>
              <el-progress
                :percentage="this.progressBarPercent"
                :format="format"
                :stroke-width="6"
                style="width: 80px; white-space: nowrap"
              ></el-progress>
            </div>
          </div>
          <el-table
            style="width: 100%"
            :data="tableArray"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="50">
            </el-table-column>
            <el-table-column
              prop="sort"
              label="序号"
              align="center"
              width="50"
            />
            <el-table-column
              prop="performName"
              label="步骤名"
              align="left"
              show-overflow-tooltip
              width="100"
            >
              <template slot-scope="scope">
                <el-tooltip
                  effect="dark"
                  :content="scope.row.performName"
                  placement="top"
                >
                  <el-input
                    type="text"
                    v-model="scope.row.performName"
                    size="mini"
                  />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="execUserName" label="执行人" width="90">
              <template slot-scope="scope">
                <el-tooltip
                  effect="dark"
                  :content="scope.row.execUserName"
                  placement="top"
                >
                  <el-input
                    type="text"
                    :disabled="true"
                    v-model="scope.row.execUserName"
                    size="mini"
                  />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="136"
              align="center"
              prop="execUserName"
            >
              <template slot-scope="scope">
                <!--  -->
                <div v-if="judge == true">
                  <div
                    style="display: flex; justify-content: space-between"
                    class="omg"
                    v-if="scope.row.completionStatus == 10"
                  >
                    <div class="textclick" @click="addL(scope.row.sort)">
                      插入
                    </div>
                    <div class="textclick" @click="deleteBtn(scope.row)">
                      删除
                    </div>
                    <div
                      class="textclick"
                      @click="requiredAccessory(scope.row)"
                      style="margin-right：8px; text-decoration: underline;"
                    >
                      所需附件
                    </div>
                  </div>
                  <!-- 已完成状态 -->
                  <div class="omg" v-if="scope.row.completionStatus != 10">
                    <div
                      class="textclick"
                      style="color: rgb(161, 162, 166) !important"
                    >
                      已完成
                    </div>
                  </div>
                </div>
                <!-- 有一个步骤开始完成状态 -->
                <div v-if="judge == false">
                  <div v-if="scope.row.completionStatus == 20">
                    <div
                      class="textclick"
                      style="color: rgb(161, 162, 166) !important"
                    >
                      已完成
                    </div>
                  </div>
                  <div v-if="scope.row.completionStatus != 20">
                    <div
                      class="textclick"
                      style="color: rgb(161, 162, 166) !important"
                    >
                      未完成
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="步骤记录"
              align="center"
              prop="completionStatus"
              width="70"
            >
              <template slot-scope="scope">
                <i
                  class="el-icon-upload"
                  style="color: #3978e7; font-size: 26px"
                  v-if="scope.row.completionStatus != 10"
                  @click="uploading(scope.row)"
                ></i>
                <i
                  class="el-icon-upload"
                  style="font-size: 26px"
                  v-if="scope.row.completionStatus == 10"
                ></i>
              </template>
            </el-table-column>
            <el-table-column
              label="截止日期"
              align="center"
              prop="deadline"
              width="95"
              v-if="tableArray.deadline != ''"
            >
            </el-table-column>
          </el-table>
          <div
            slot="footer"
            class="dialog-footer"
            style="display: flex; justify-content: flex-end; padding-top: 20px"
            v-if="judge == true && roles.indexOf('boss') == -1"
          >
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="saveFile">保存</el-button>
          </div>
        </div>
        <div class="followShow">
          <div
            class="followShow_title"
            v-for="(item, index) in tableArrayBottom"
            :key="index"
          >
            <div class="followShow_left">
              <el-image
                src="https://bpic.588ku.com/element_origin_min_pic/20/11/25/fb8b042f84f045383dd382139bd3a881.jpg"
                fit="cover"
                class="head"
              ></el-image>
            </div>
            <div class="followShow_right">
              <div class="top">
                <div>
                  <span class="name">{{ item.createBy }}</span>
                  <span class="time">{{ item.createDate }}</span>
                  <span><i class="el-icon-location"></i></span>
                </div>
                <div>
                  <span class="detail">{{ item.remark }}</span>
                </div>
              </div>
              <div class="uploading">
                <el-image
                  class="img"
                  v-for="img in item.crmRecordImgList"
                  :key="img.id"
                  :src="img.url"
                  fit="cover"
                  :preview-src-list="
                    item.crmRecordImgList.map((ite) => {
                      return ite.url;
                    })
                  "
                ></el-image>
                <!-- <el-image
                  src="item.url"
                  v-for="item in item.crmRecordImgList"
                  fit="cover"
                  class="img"
                ></el-image> -->
              </div>
              <div class="step">
                <div class="step-item">
                  <span class="step-item-top">完成步骤</span>
                  <span class="step-item-bottom">{{
                    item.accomplishStep
                  }}</span>
                </div>
                <div class="step-item" v-if="item.accomplishTime != ''">
                  <span class="step-item-top">完成时间</span>
                  <!-- <span class="step-item-bottom">{{item.accomplishTime}}</span> -->
                  <span>{{
                    parseTime(item.accomplishTime, "{y}-{m}-{d}")
                  }}</span>
                </div>
                <div class="step-item">
                  <span class="step-item-top">截止时间</span>
                  <!-- <span class="step-item-bottom">{{item.deadline}}</span> -->
                  <span>{{ parseTime(item.deadline, "{y}-{m}-{d}") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 所需附件 -->
    <el-dialog
      title="所需附件"
      :visible.sync="AccessoryOpen"
      width="516px"
      append-to-body
      :data="tableArray"
      class="offApply uploading required"
    >
        <!-- <el-alert
      title="提示：文件可上传jpg、png、jpeg、doc、docx、xls、xlsx、pdf类型文件，每次上传不超过2M!"
      type="warning"
      show-icon class="title">
    </el-alert> -->
      <div class="box" style="padding-bottom: 40px; padding-top: 30px">
        <el-tag
          v-for="tag in labelList"
          :key="tag.id"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <div v-if="inputVisible" class="box-inpt-box">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @keyup.enter.native="handleInputConfirm()"
            value-key="label"
            class="seek-frame"
            :autofocus="true"
            @select="handleSelect"
          >
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="handleIconClick"
            >
            </i>
            <template slot-scope="{ item }">
              <div class="name" v-if="item.add" @click="addLabelUp">
                <i class="el-icon-plus"></i>
                {{ item.name }}
              </div>
              <div class="name" v-else>{{ item.label }}</div>
            </template>
          </el-autocomplete>
        </div>
        <div v-else>
          <el-button class="button-new-tag" size="small" @click="showInput"
            >+ 添加所需附件</el-button
          >
        </div>
      </div>
      <div
        class="button"
        style="margin-top：30px;"
        v-if="roles.indexOf('boss') == -1"
      >
        <el-button @click="misscancel">取 消</el-button>
        <el-button type="primary" @click="addLabelListSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 添加标签 -->
    <el-dialog
      title="新增标签"
      :visible.sync="addTagUp"
      width="422px"
      append-to-body
      :data="addLabelList"
      class="offApply uploading required add-tally"
    >
      <el-form>
        <el-row>
          <el-col :span="24" class="add-name">
            <el-form-item
              label="请输入新增标签名字"
              style="display：flex !important;"
            >
              <el-input placeholder="请输入新增标签名字" v-model="inputValue" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer bottom">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="addLabelSubmit()"
          v-if="roles.indexOf('boss') == -1"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <!--  步骤记录 -->
    <el-dialog
      title="步骤记录"
      :visible.sync="uploadingOpen"
      width="704px"
      append-to-body
      v-model="stepLabelList"
      class="addCustomer businiss offApply uploading"
    >
      <!-- <el-alert
    title="提示：文件可上传jpg、png、jpeg、doc、docx、xls、xlsx、pdf类型文件，每次上传不超过2M!"
    type="warning"
    show-icon class="title">
  </el-alert> -->
      <div class="box">
        <div
          class="box_on box_time"
          v-for="(item, index) in stepLabelList"
          :key="index"
          v-if="stepLabelList.length > 0"
        >
          <div class="box_on_time">
            <div>{{ item }}</div>
          </div>
          <div
            v-for="(it, inde) in stepsToRecordObj.crmRecordImgList"
            :key="inde"
          >
            <img
              :src="it.url"
              alt=""
              v-if="it.label == item"
              style="width: 180px; height: 132px"
            />
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>
        <el-row :gutter="20" class="remark">
          <el-col :span="24">
            <div class="tax">
              <div class="tax_tit">备注</div>
              <el-input
                class="input"
                :disabled="true"
                type="this.stepsToRecordObj.remarks"
                :rows="2"
                placeholder="暂无备注"
                v-model="stepsToRecordObj.remarks"
              >
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="button" v-if="roles.indexOf('boss') == -1">
        <el-button @click="misscancel">取 消</el-button>
        <el-button type="primary" @click="misscancel">确定</el-button>
      </div>
    </el-dialog>
    <!-- 完成备注 -->
    <el-dialog
      title="备注"
      :modal-append-to-body="false"
      :visible.sync="remarkOpen"
      width="422px"
      append-to-body
      class="addCustomer businiss taskPopUp remark remarkUp"
    >
      <el-form :model="remarkForm">
        <el-form-item prop="remark">
          <el-input
            type="textarea"
            v-model="remarkForm.remark"
            resize="none"
            :rows="5"
            placeholder="请输入审核备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button" v-if="roles.indexOf('boss') == -1">
        <el-button @click="misscancel">取 消</el-button>
        <el-button type="primary" @click="accomplish">确定</el-button>
      </div>
    </el-dialog>
    <!-- 移交 -->
    <el-dialog
      title="移交"
      :visible.sync="openOffAudit"
      width="704px"
      append-to-body
      :data="handOverList"
      class="addCustomer businiss offApply"
    >
      <div class="box">
        <el-form
          ref="handOverForm"
          label-position="labelPosition"
          class="chengjiao"
          :rules="rules"
          :model="handOverForm"
        >
          <el-row type="flex" justify="space-between" :gutter="24">
            <el-col :span="12">
              <el-form-item label="客户名称">
                <el-input
                  placeholder="请输入客户名称"
                  v-model="handOverList.companyName"
                  :disabled="!!handOverList"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input
                  placeholder="请输入联系人"
                  v-model="handOverList.linkman"
                  :disabled="!!handOverList"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" :gutter="24">
            <el-col :span="12">
              <el-form-item label="联系方式">
                <el-input
                  placeholder="请输入联系方式"
                  v-model="handOverList.mobile"
                  :disabled="!!handOverList"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地区">
                <el-select
                  placeholder="请选择所在地区"
                  v-model="handOverList.region"
                  :disabled="!!handOverList"
                >
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="详细地址" class="tax">
                <el-input
                  v-model="handOverList.address"
                  :disabled="!!handOverList"
                  style="width: 100%"
                  placeholder="请输入详细地址"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="任务类型">
                <el-select
                  placeholder="请选择任务类型"
                  v-model="handOverList.serpriceName"
                  :disabled="!!handOverList"
                >
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="任务内容" class="tax" prop="remarks">
                <el-input
                  type="textarea"
                  :rows="4"
                  style="width: 100%"
                  placeholder="请输入任务内容"
                  v-model="handOverForm.remarks"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="截至时间" prop="truncationTime">
                <el-date-picker
                  style="width: 100%；"
                  type="datetime"
                  placeholder="选择日期"
                  v-model="handOverForm.truncationTime"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" :gutter="24">
            <el-col :span="12">
              <el-form-item label="执行人部门">
                <el-popover
                  ref="popover"
                  style="width: 222px !important; display: inline-block"
                  placement="bottom-start"
                  trigger="click"
                >
                  <el-tree
                    :data="wqDeptOptions"
                    ref="roleTree"
                    show-checkbox
                    node-key="deptId"
                    check-strictly
                    :props="{
                      emitPath: false,
                      checkStrictly: true,
                      label: 'deptName',
                      value: 'deptId',
                      children: 'children',
                    }"
                    @check-change="handleDeptClick"
                  ></el-tree>

                  <el-input
                    slot="reference"
                    ref="input"
                    v-model="department.companyName"
                    clearable
                    suffix-icon="el-icon-arrow-down"
                    placeholder="请选择部门"
                  >
                  </el-input>
                </el-popover>
                <!-- <el-cascader
                  style="width: 284px;"
                  v-model="department.companyName"
                  :props="{
                    emitPath: false,
                    checkStrictly: true,
                    label: 'deptName',
                    value: 'deptId',
                    children: 'children'
                  }"
                  :options="wqDeptOptions"
                  @change="wqDeptChange"
                ></el-cascader> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="执行人">
                <el-select
                  placeholder="请选择执行人"
                  v-model="departmentStaff.name"
                  clearable
                  size="small"
                  style="margin-bottom: 10px"
                  @change="handleDepartments"
                >
                  <el-option
                    v-for="(item, index) in wqDepartmentStaff"
                    :key="index + 'k'"
                    :value="item.userId"
                    :label="item.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row type="flex" justify="space-between" :gutter="24">
            <el-col :span="12">
              <el-form-item label="执行人部门">
                <el-select
                  placeholder="请选择执行人部门"
                  v-model="department.companyName"
                >
                  <el-option
                    v-for="item in department"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId"
                    @click.native="executorMembers(item)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="执行人">
                <el-select
                  placeholder="请选择执行人"
                  v-model="departmentStaff.name"
                >
                  <el-option
                    v-for="item in departmentStaff"
                    :label="item.name"
                    :value="item.name"
                    @click.native="executor1(item)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
        </el-form>
        <div slot="footer" class="dialog-footer bottom">
          <!-- <el-button @click="miss">任务冲突</el-button> -->
          <el-button @click="cancel">取 消</el-button>
          <el-button
            type="primary"
            @click="handOversubmitForm(handOverList.id)"
            v-if="roles.indexOf('boss') == -1"
            >确定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 任务冲突 -->
    <el-dialog
      title="流失申请"
      :visible.sync="taskMiss"
      width="422px"
      append-to-body
      class="addCustomer businiss taskPopUp"
    >
      <div class="hint">
        <span class="icon">!</span>
        <span class="font">同一时刻不可安排不同地点的多个任务！</span>
      </div>
      <div class="button">
        <el-button @click="misscancel">取 消</el-button>
        <el-button type="primary" @click="misssubmitForm">确定</el-button>
      </div>
    </el-dialog>
    <edit-drawer
      :visible.sync="drawerVisible"
      :companyId="companyId"
    ></edit-drawer>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
<script>
import { mapGetters } from "vuex";
import { tokenKey } from "@/settings";
import { _getSessionStore } from "@/utils/storage";
import {
  workCompetentList, //列表渲染
  lookTaskConsumptionParticulars, //任务详情
  submitAudit, //审核
  lookParticulars, //订单申请详情
  followRecord, //跟进记录
  interposition, //跟进记录-操作-插入
  deleteLiaison, //跟进记录-操作-删除
  AequiredAccessory, // 跟进记录-操作- 所需附件
  addLabelLiaison, // 跟进记录-操作- 所需附件-新增标签提交
  removeLiaison, // 跟进记录-操作- 所需附件-删除标签
  updateExecutorLabel, //跟进记录-操作- 所需附件-提交按钮
  accomplishSubmit, // 完成-备注确定
  handOver, //移交回显
  handOverSubmit, //移交提交
  allocation, //派工
  entDept, //分配查询部门
  entUser, //根据部门获取用户下拉列表
  shutOperation, //关闭
  exportD,
  activation,
} from "@/api/crm/outWork/outWork";
import {
  Department,
  Staff,
} from "../../../../api/crm/externalAccount/agencyService";
import {
  uploadingEcho, //步骤记录
} from "@/api/crm/outWorkclerk/outWorkclerk";
import EditDrawer from "@/views/components/EditDrawer";
/*获取省市区信息*/
import { mapState } from "vuex";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import { cssStyle } from "@/utils/generator/html";
import { throttle } from "@/utils/hmt";
import { cleanLogininfor } from "@/api/system/logininfor";
import { CompanyDepartmentPersonnel } from "@/api/crm/finance/customer";
export default {
  // inject:['reload'],
  components: {
    EditDrawer,
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
    return {
      requestData:{
        pageNo: 1,
        pageSize: 10,
        clientType: null,
        flowStatus: null,
        enteringTime: null, // 上传
        startTime: null, //创建日期开始时间
        endTime: null, //创建日期结束时间
        finishStartTime: null, //完成日期开始时间
        finishEndTime: null, //完成日期结束时间
        abortStartTime: null, //截至日期开始时间
        abortEndTime: null, //截至日期结束时间
        wQFirmId: "",
        wQDeptId: "",
        wQUserId: "",
        province: null, //省
        city: null, //市
        county: null, //区
      },
      roles: [],
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload",
      headers: { Authorization: _getSessionStore(tokenKey) },
      multiple: true,
      fileList: [], //文件上传数据
      total: 0,
      radio: "1",
      taskStateList: [], //任务状态
      bankList: [],
      drawerVisible: false, //抽屉显示
      kfDepartmentStaff: [],
      wqDepartmentStaff: [],
      kfDeptOptions: [],
      wqDeptOptions: [],
      departmentList: [],
      companyId: null,
      // 显示搜索条件
      showSearch: false,
      areaOptions: regionData, //区域数据
      flowStatusCut: "", //切换状态值
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        clientType: null,
        flowStatus: null,
        enteringTime: null, // 上传
        startTime: null, //创建日期开始时间
        endTime: null, //创建日期结束时间
        finishStartTime: null, //完成日期开始时间
        finishEndTime: null, //完成日期结束时间
        abortStartTime: null, //截至日期开始时间
        abortEndTime: null, //截至日期结束时间
        wQFirmId: "",
        wQDeptId: "",
        wQUserId: "",
        province: null, //省
        city: null, //市
        county: null, //区
      },
      labelName: "", //筛选标记
      district: null, //所在地区
      deadlineList: [], //筛选截至日期
      accomplishDataList: [], //筛选完成日期
      dateCreatedList: [], //筛选创建日期
      //移交表单验证
      rules: {
        truncationTime: [
          {
            required: true,
            message: "截至时间不能为空",
            trigger: "blur",
          },
        ],
        // remarks: [
        //   {
        //     required: true,
        //     message: "任务内容不能为空",
        //     trigger: "blur"
        //   }
        // ]
      },
      //查看停止服务原因
      stopReasonShow: false,
      stopReason: "",
      stopForm: { remark: "" },
      //停止服务校验
      stopFormRules: {
        remark: [
          {
            required: true,
            message: "关闭原因不能为空",
            trigger: "blur",
          },
        ],
      },
      delSwitch: [],
      clientType: "6",
      openOffAudit: false, //移交弹出层
      taskParticulars: false, //任务详情弹出层
      screenOff: false, //筛选弹出层
      taskMiss: false, //任务冲突
      opinion: "汪汪队", //客户名称
      orderReview: false, //审核
      auditData: {}, //审核数据
      clientTypeList: [{ dictName: "a" }, { dictName: "b" }], //客户类型字典
      orderParticulars: false, //审核详情
      orderParticularsList: {}, //查看审核详情
      shutPopUp: false, //关闭条件
      followOpen: false, //跟进记录
      remarkOpen: false, // 完成备注弹出层
      uploadingOpen: false, //步骤记录取消按钮
      // recordList: [], //记录
      stepsToRecordObj: {
        label: null,
      }, //步骤记录数据
      stepLabelList: [], //步骤记录回显标签名
      performerlist: [{ value: "张三" }],
      remarkForm: {},
      handOverList: {}, //移交回显列表
      handOverForm: {
        truncationTime: null,
        remarks: null,
        userName: null,
      }, //移交提交表
      // 跟进记录的表格
      tableArray: [{ id: "步骤01" }],
      tableArrayBottom: {},

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      department: {},
      departmentStaff: {}, //执行人
      //分配参数
      distributionForm: {
        orderId: null,
        userId: null,
        role: null,
        productId: null,
      },
      shutBtnsubmitId: null, //操作关闭按钮的id
      taskParticularsData: {
        handOver: null,
        region: null,
      }, //任务详情
      tianjia: {
        sort: null,
        performName: null,
        deadline: 999,
      }, //添加跟进记录
      AccessoryOpen: false, //所需附件
      AccessoryOpenList: [], //所需附件
      addTagUp: false, //新增标签
      addLabelList: {
        label: null,
      }, //新增标签数据
      labelList: [], //所需附件标签list
      inputVisible: false,
      inputValue: "",
      inputList: ["1", "22"], //输入框下拉shuju
      // 所需附件

      restaurants: [],
      // restaurants11: [],
      judge: true, //跟进记录操作的条件判断
      recordData: {}, //跟进记录接口传值
      progressBar: null, //完成进度
      progressBarPercent: 0, //完成进度百分比
      noIdObj: {
        label: null,
        addStepId: null,
      }, //添加步骤时没有id的步骤信息
      // addStepId:null,//添加步骤的id
      LIST: null,
      sortId: null, //添加标签的步骤id
      companyName: null, //当前公司id
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
      //任务类型
      taskType: "",
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     //因为当钩子执行前，组件实例还没被创建
  //     // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
  //     // console.log(vm);//当前组件的实例
  //     vm.resetQuery();
  //     vm.getList();
  //   });
  // },

  methods: {
    //字典
    //任务状态
    auditStateDictionaries(row) {
      return this.selectDictLabel(this.taskStateList, row.flowStatus);
    },
    //审核状态
    auditState(data) {
      if (data == 10) {
        return "待审核";
      } else if (data == 20) {
        return "审核通过";
      } else if (data == 30) {
        return "审核未通过";
      } else if (data == 40) {
        return "";
      }
    },
    //任务状态
    TaskState(data) {
      if (data == 10) {
        return "关闭";
      } else if (data == 20) {
        return "执行中";
      } else if (data == 30) {
        return "完成";
      } else if (data == 40) {
        return "暂停";
      }
    },
    //抽屉
    showDrawer(row) {
      this.drawerVisible = true;
      this.companyId = row.companyId;
    },
    //查看停止服务原因
    seeWhy(val) {
      this.stopReasonShow = true;
      this.stopReason = val;
    },
    handleActivation(ids) {
      activation({ id: ids }).then((response) => {
        this.getList();
      });
    },
    //表单重置
    reset() {
      this.form = {
        //  district: null
      };
      //  this.resetForm("queryForm");
      this.resetForm("form");
    },
    // 所在地区
    // handleRegionChange(value,type=20) {
    //     if(type==10){
    //       console.info(this.queryParams)
    //       this.queryParams.district = value
    //       this.queryParams.province = CodeToText[value[0]]
    //       this.queryParams.city = CodeToText[value[1]]
    //       this.queryParams.county = CodeToText[value[2]]
    //     }else{
    //       console.info(this.queryParams)
    //       this.queryParams.district = value
    //       this.queryParams.province = CodeToText[value[0]]
    //       this.queryParams.city = CodeToText[value[1]]
    //       this.queryParams.county = CodeToText[value[2]]
    //        console.info(this.queryParams)
    //     }

    //     },
    getCompanyList() {
      CompanyDepartmentPersonnel({}).then((response) => {
        // console.log(response.data);
        let companyOptions = response.data;
        this.companyOptions = companyOptions || [];
        this.getList();
      });
    },
    handleOrganizationTreeClick(data, checked) {
      // console.log(data);
      if (checked) {
        this.labelModel = data.name;
        if (data.deptId != "") {
          this.queryParams.wQFirmId = "";
          this.queryParams.wQUserId = "";
          this.queryParams.wQDeptId = data.deptId;
          this.getList();
          this.showStatus = false;
        } else if (data.companyId == "" && data.deptId == "") {
          this.queryParams.wQFirmId = "";
          this.queryParams.wQDeptId = "";
          this.queryParams.wQUserId = data.id;
          // console.log(this.queryParams);
          this.getList();
        } else {
          this.queryParams.wQUserId = "";
          this.queryParams.wQDeptId = "";
          this.queryParams.wQFirmId = data.companyId;
          // console.log(this.queryParams);
          this.getList();
        }
      }
      let option = this.companyOptions;
      this.setOrganizationTreeCheck(option, data.id, checked);
    },

    setOrganizationTreeCheck(data, id, checked) {
      data.forEach((item) => {
        if (item.id == id || !checked) {
          // this.$refs.deptTree.setChecked(data.deptId,true,false)
        } else {
          this.$refs.organizationTree.setChecked(item.id, false, false);
        }
        if (item.companyStructures && item.companyStructures.length > 0) {
          this.setOrganizationTreeCheck(item.companyStructures, id, checked);
        }
      });
    },
    // 单击节点
    onClickNode(node) {
      this.queryParams.companyId = data.companyId;
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
      this.$refs.organizationTree.filter(false);
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
    handleRegionChange(value) {
      this.district = value;
      this.queryParams.province = CodeToText[value[0]];
      this.queryParams.city = CodeToText[value[1]];
      this.queryParams.county = CodeToText[value[2]];
    },
    /** 导出按钮操作 */
    handleExport() {
      let fileUrl = process.env.VUE_APP_FILE_API;
      this.loading = true;
      let data = this.requestData;
      data.exportType = 10;
      delete data.pageNo;
      delete data.pageSize;
      this.$confirm("是否确认导出所有服务项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportD(data);
        })
        .then((response) => {
          let filename = response.data.filename;
          let elink = document.createElement("a");
          elink.download = filename;
          elink.text = filename;
          elink.style.display = "none";
          window.open(fileUrl + "/download/" + filename,'_blank');
          // elink.href = decodeURIComponent(fileUrl + "/download/" + filename);
          document.getElementById("app").appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        })
        .catch(function () {});
    },
    handleTabQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }

      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 筛选按钮操作 */
    handleQuerys(e) {
      if (this.queryParams.flowStatus == 600) {
        this.queryParams.flowStatus = null;
        this.queryParams.flag = 10;
      } else if (this.queryParams.flowStatus == 700) {
        this.queryParams.flag = 20;
        this.queryParams.flowStatus = null;
        // } else if (this.queryParams.flowStatus == 800) {
      } else if (this.queryParams.flowStatus == 30) {
        this.queryParams.flag = 30;
        this.queryParams.flowStatus = 30;
        // } else if (this.queryParams.flowStatus == 800) {
      }
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      if (this.dateCreatedList) {
        if (this.dateCreatedList.length !== 0) {
          this.queryParams.startTime = this.dateCreatedList[0] + " 00:00:00";
          this.queryParams.endTime = this.dateCreatedList[1] + " 23:59:59";
        } else {
          this.queryParams.startTime = "";
          this.queryParams.endTime = "";
        }
      } else {
        this.queryParams.startTime = "";
        this.queryParams.endTime = "";
      }

      if (this.accomplishDataList) {
        if (this.accomplishDataList.length !== 0) {
          this.queryParams.finishStartTime =
            this.accomplishDataList[0] + " 00:00:00";
          this.queryParams.finishEndTime =
            this.accomplishDataList[1] + " 23:59:59";
        } else {
          this.queryParams.finishStartTime = "";
          this.queryParams.finishEndTime = "";
        }
      } else {
        this.queryParams.finishStartTime = "";
        this.queryParams.finishEndTime = "";
      }

      if (this.deadlineList) {
        if (this.deadlineList.length !== 0) {
          this.queryParams.abortStartTime = this.deadlineList[0] + " 00:00:00";
          this.queryParams.abortEndTime = this.deadlineList[1] + " 23:59:59";
        } else {
          this.queryParams.abortStartTime = "";
          this.queryParams.abortEndTime = "";
        }
      } else {
        this.queryParams.abortStartTime = "";
        this.queryParams.abortEndTime = "";
      }
      this.getList();
      // 查询参数
      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
    },
    /** 筛选按钮操作 */
    handleQuery(e) {
      // this.queryParams
      // this.queryParams.flag=this.flowStatusCut
      console.info("筛选按钮操作");
      console.info(this.queryParams);

      // if (this.queryParams.flowStatus == 600) {
      //   // this.queryParams.flowStatus = null;
      //   this.queryParams.flag = 10;
      // } else if (this.queryParams.flowStatus == 700) {
      //   this.queryParams.flag = 20;
      //   this.queryParams.flowStatus = null;
      // }
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      // 查询参数
      // this.resetQuery();
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        clientType: null,
        flowStatus: null,
        enteringTime: null, // 上传
        startTime: null, //创建日期开始时间
        endTime: null, //创建日期结束时间
        finishStartTime: null, //完成日期开始时间
        finishEndTime: null, //完成日期结束时间
        abortStartTime: null, //截至日期开始时间
        abortEndTime: null, //截至日期结束时间
        wQFirmId: "",
        wQDeptId: "",
        wQUserId: "",
        province: null, //省
        city: null, //市
        county: null, //区
      };
      this.district = [];
      this.deadlineList = []; //筛选截至日期
      this.accomplishDataList = []; //筛选完成日期
      this.dateCreatedList = []; //筛选创建日期
      this.labelName = "";
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    // 审核弹窗
    orderAuditUp(row) {
      this.orderReview = true;
      this.auditData.id = row.id;
      this.auditData.identification = row.identification;
      this.queryParams.companyName = row.companyName;
    },
    //审核提交按钮
    auditSubmitBtn() {
      this.auditData.status = 30;
      this.auditData.remark = this.auditData.auditorRemarks;
      submitAudit(this.auditData).then((response) => {
        this.auditData = {};
        this.getList();
        this.msgSuccess("审核提交成功");
        this.orderReview = false;
      });
    },
    //订单审核详情弹窗
    orderParticularsUp(row) {
      this.orderParticulars = true;
      this.auditData.id = row.id;
      this.auditData.companyName = row.companyName;
      lookParticulars({ id: row.id, type: row.identification }).then(
        (response) => {
          this.orderParticularsList = response.data;
        }
      );
    },
    // 移交
    offAuditUp(row) {
      this.handOverForm = {};
      this.reset();
      this.openOffAudit = true;
      this.title = "移交";
      this.department.companyName = "";
      this.departmentStaff.name = "";
      //
      let id = row.id;
      handOver({ productId: row.id }).then((response) => {
        this.handOverList = response.data;
        this.handOverList.region =
          response.data.marketCompanyEssentialResult.province +
          "-" +
          response.data.marketCompanyEssentialResult.city +
          "-" +
          response.data.marketCompanyEssentialResult.county;
        this.handOverList.address =
          response.data.marketCompanyEssentialResult.address;
      });
      //
    },

    handleDeptClick(data, checked) {
      // console.log(data);
      if (checked) {
        this.wqDeptChange(data.deptId);
        this.department.companyName = data.deptName;
      }
      let option = this.wqDeptOptions;
      this.setDeptCheck(option, data.deptId, checked);
    },

    setDeptCheck(data, id, checked) {
      // console.info(arguments);
      data.forEach((item) => {
        if (item.deptId == id || !checked) {
          // this.$refs.deptTree.setChecked(data.deptId,true,false)
        } else {
          this.$refs.roleTree.setChecked(item.deptId, false, false);
        }
        if (item.children && item.children.length > 0) {
          this.setDeptCheck(item.children, id, checked);
        }
      });
    },
    wqDeptChange(val) {
      this.wqDepartmentStaff = [];
      this.handOverForm.extUserId = "";
      this.handOverForm.extRole = "";
      Staff({ abbreviation: "WQB", deptId: val }).then((response) => {
        this.wqDepartmentStaff = response.data;
      });
    },

    handleDepartments(val) {
      this.wqDepartmentStaff.forEach((item) => {
        if (item.userId == val) {
          this.handOverForm.userId = item.userId;
          this.handOverForm.userName = item.name;
          this.handOverForm.roleCode = item.roleCode;
          this.handOverForm.deptId = item.deptId;
          this.handOverForm.firmId = item.companyId;
        }
      });
      this.$forceUpdate(); //强制更新
    },
    //执行人
    executor(row) {
      this.distributionForm.productId = row.id;
      this.distributionForm.orderId = row.busirId;
      this.dispatchDialog = true;
      Department({}).then((response) => {
        let wqList = this.handleTree(
          response.data.wqbDept,
          "deptId",
          "parentId"
        );
        this.departmentList = response.data.wqbDept;
        this.wqDeptOptions = wqList;
        this.department.companyName = wqList[0].deptName;
        this.wqDepartmentStaff = [];
        this.handOverForm.extUserId = "";
        this.handOverForm.extRole = "";
        Staff({ abbreviation: "WQB", deptId: wqList[0].deptId }).then(
          (response) => {
            this.wqDepartmentStaff = response.data;
            this.departmentStaff.name = response.data[0].name;
          }
        );
      });
    },
    //部门选择
    executorMembers(row) {
      let deptId = row.deptId;
      this.distributionForm.role = row.deptName;
      entUser({ deptId: deptId, deptName: row.deptShortName }).then(
        (response) => {
          this.departmentStaff = response.data;
        }
      );
    },
    //执行人选择
    executor1(item) {
      this.distributionForm.userId = item.userId;
      this.handOverForm.userId = item.userId;
      this.handOverForm.userName = item.name;
      this.handOverForm.firmId = item.companyId;
      this.handOverForm.deptId = item.deptId;
      this.handOverForm.roleCode = item.roleCode;
    },
    //移交提交按钮
    handOversubmitForm: throttle(function (id) {
      this.handOverForm.id = id;
      this.wqDeptOptions.forEach((item) => {
        if (item.deptName == this.department.companyName) {
          this.handOverForm.deptId = item.deptId;
        }
      });
      this.wqDepartmentStaff.forEach((ite) => {
        if (ite.name == this.departmentStaff.name) {
          this.handOverForm.userId = ite.userId;
          this.handOverForm.userName = ite.name;
          this.handOverForm.firmId = ite.companyId;
          this.handOverForm.roleCode = ite.roleCode;
        }
      });
      this.$refs["handOverForm"].validate((valid) => {
        if (valid) {
          handOverSubmit(this.handOverForm).then((response) => {
            this.handOverForm = {};
            this.openOffAudit = false;
            this.getList();
            this.msgSuccess("移交成功");
          });
        }
      });
    }),

    // 任务详情
    taskParticularsUp(row) {
      this.reset();
      this.taskParticulars = true;
      this.title = "任务详情";
      lookTaskConsumptionParticulars({ id: row.id }).then((response) => {
        this.taskParticularsData = response.data;
        this.taskParticularsData.region =
          response.data.province +
          "-" +
          response.data.city +
          "-" +
          response.data.county;
        this.taskParticularsData.address = response.data.address;
      });
    },
    //关闭按钮
    shutBtn(row) {
      this.stopForm.remark = "";
      this.shutPopUp = true;

      this.shutBtnsubmitId = row.id;
      // })
    },
    //关闭确认按钮
    shutBtnsubmit() {
      this.$refs["stopForm"].validate((valid) => {
        if (valid) {
          this.shutPopUp = false;

          shutOperation({
            id: this.shutBtnsubmitId,
            reasonClosure: this.stopForm.remark,
          }).then((response) => {
            this.getList();
            this.msgSuccess("关闭成功");
          });
        }
      });
    },
    // 跟进记录弹窗
    addFollow(row) {
      this.companyName = row.companyName;
      this.progressBarPercent = 0;
      this.followOpen = true;
      this.taskType = row.serpriceName;
      // this.tableArray.companyName=row.companyName
      this.recordData = row;
      followRecord({
        orderId: this.recordData.busirId,
        productId: this.recordData.id,
      }).then((response) => {
        this.judge = true;
        this.AccessoryOpenList = this.tableArray.label;
        this.tableArray = response.data.procedure;
        this.tableArrayBottom = response.data.log;
        this.tableArray.flowStatus = row.flowStatus; //审核状态
        this.progressBar = null;
        for (let key of this.tableArray) {
          if (key.completionStatus == 20) {
            (this.progressBar = this.progressBar + 1),
              (this.progressBarPercent =
                Math.round(
                  (this.progressBar / this.tableArray.length) * 10000
                ) / 100);
          }
        }
        for (let key of this.tableArray) {
          if (key.completionStatus == 20) {
            (this.progressBar = this.progressBar + 1), (this.judge = false);
            return (this.judge = false);
          }
        }
      });
    },
    // 点击添加步骤
    addStep: throttle(function () {
      this.tableArray.push({
        sort: this.tableArray.length + 1,
        completionStatus: 10,
      });
      this.noIdObj.addStepId = this.tableArray.length; //新增步骤的id
      this.labelList = [];
    }),
    //插入步骤
    addL(i) {
      let table = this.tableArray;
      let temp = {
        sort: "",
        performName: table.performName || "",
        deadline: table.deadline || "",
        completionStatus: 10,
      };
      this.noIdObj.addStepId = i; //新增步骤的id
      table.splice(i - 1, 0, temp);
      this.tableArray = table.map((item, index) => {
        item.sort = index + 1;

        return item;
      });
    },

    //删除
    deleteBtn(row) {
      if (this.tableArray.length == 1) {
        this.tableArray.splice(0, 1);
      } else {
        this.tableArray.splice(row.sort - 1, 1);
      }
      this.tableArray = this.tableArray.map((item, index) => {
        item.sort = index + 1;
        return item;
      });
      // let table = this.tableArray;
      // console.info(row)
      // let table = this.tableArray;
      // if (row.performName == "" || row.id == null) {
      //   console.info(this.tableArray)
      //   this.tableArray.splice(row.sort - 1, 1);
      //   console.info(this.tableArray)
      //   this.tableArray = table.map((item, index) => {
      //     item.sort = index + 1;
      //     return item;
      //   });
      // } else if (row.performName != "") {
      //   deleteLiaison({ id: row.id }).then(response => {
      //     this.tableArray = table.map((item, index) => {
      //       item.sort = index + 1;
      //       return item;
      //     });

      //     followRecord({
      //       orderId: this.recordData.busirId,
      //       productId: this.recordData.id
      //     }).then(response => {
      //       this.AccessoryOpenList = this.tableArray.label;
      //       this.tableArray = response.data.procedure;
      //       this.tableArrayBottom = response.data.log;
      //       this.tableArray.flowStatus = row.flowStatus; //审核状态
      //     });
      //   });
      // }
    },
    //步骤记录的保存按钮
    saveFile: throttle(function () {
      console.log(this.tableArray);
      console.log(this.recordData);
      console.log(this.noIdObj);
      for (let int of this.tableArray) {
        int.serpriceId = this.recordData.id;
        int.busirId = this.recordData.busirId;
        if (!int.label) {
          int.label = null;
        }
        // if (int.sort == this.noIdObj.addStepId) {
        //   int.label = this.noIdObj.label;
        // }
      }
      let object = {};
      object.param = this.tableArray;
      object.orderId = this.recordData.busirId;
      object.productId = this.recordData.id;

      interposition(object).then((response) => {
        followRecord({
          orderId: this.recordData.busirId,
          productId: this.recordData.id,
        }).then((response) => {
          this.msgSuccess("保存成功");
          this.followOpen = false;
          this.AccessoryOpenList = this.tableArray.label;
          this.tableArray = response.data.procedure;
          this.tableArrayBottom = response.data.log;
          // this.tableArray.flowStatus = row.flowStatus; //审核状态
        });
      });
    }),
    //所需附件
    requiredAccessory(row) {
      console.log(row);
      this.sortId = row;
      this.labelList = [];
      //  this.labelList=row.label
      let label = row.label;
      if (label != null && label != "" && label != undefined) {
        this.labelList = label.split(",");
        for (let item of this.labelList) {
          if (item == null || item == "") {
            this.labelList.splice(item, 1);
          }
        }
      }
      this.addLabelList.procedureId = row.id;
      this.AccessoryOpen = true;
    },
    // 删除标签
    handleClose(tag) {
      this.labelList.splice(this.labelList.indexOf(tag), 1);
      if (this.sortId.id != null) {
        removeLiaison({ label: tag, id: this.addLabelList.procedureId }).then(
          (response) => {
            return this.labelList;
          }
        );
      }
    },
    // 所需附件-输入框
    querySearch(queryString, cb) {
      this.LIST = false;
      // 调用 callback 返回建议列表的数据
      if (queryString) {
        AequiredAccessory({ keyword: queryString }).then((response) => {
          let arr = response.data;
          if (response.data.length == 0) {
            arr.push({
              name: "添加标签",
              label: queryString,
              add: true,
            });
            this.LIST = true;
          } else {
            arr.push({
              name: "添加标签",
              add: true,
            });
          }
          cb(arr);
        });
      } else {
        let arr = [];
        arr.push({
          name: "添加标签",
          label: queryString,
          add: true,
        });
        cb(arr);
      }
    },

    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return this.restaurants;
    },
    handleSelect(item) {
      // console.log(item);
    },
    handleIconClick(ev) {
      // console.log(ev);
    },
    // 添加标签
    addLabelUp() {
      this.addTagUp = true;
    },
    //新增标签提交按钮
    addLabelSubmit: throttle(function () {
      this.addTagUp = false;
      this.addLabelList.label = this.inputValue;
      // this.labelList.push(inputValue);
      this.labelList.push(this.addLabelList.label);
      addLabelLiaison(this.addLabelList).then((response) => {
        this.inputValue = null;
      });
    }),
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        // this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm: throttle(function () {
      let inputValue = this.inputValue;
      if (this.LIST == false) {
        if (inputValue) {
          this.labelList.push(inputValue);
        }
      }
      if (this.LIST == false) {
        AequiredAccessory({ keyword: this.inputValue }).then((response) => {
          this.inputVisible = false;
          this.inputValue = "";
        });
      }
    }),
    // 跟进记录-操作- 所需附件-提交按钮
    addLabelListSubmit: throttle(function () {
      let label = this.labelList.join(",");
      // for( let i of this.labelList){
      //     console.info(i)
      //     // label+=i+','
      //   //  arry.join(",")
      //      console.info(label)
      // }
      if (
        this.addLabelList.procedureId != null &&
        this.addLabelList.procedureId != undefined
      ) {
        updateExecutorLabel({
          labels: label,
          id: this.addLabelList.procedureId,
        }).then((response) => {
          this.AccessoryOpen = false;
          return this.restaurants;
        });
      }
      this.noIdObj.label = label; //添加步骤信息标签名没有id的数据
      this.AccessoryOpen = false;
      for (let index of this.tableArray) {
        if (index.sort == this.sortId.sort) {
          index.label = label;
        }
      }
    }),
    //跟进记录中-完成操作
    handleCom(row) {
      this.remarkForm.id = row.id;
      this.remarkOpen = true;
    },
    //完成-备注确定
    accomplish: throttle(function () {
      accomplishSubmit(this.remarkForm).then((response) => {
        this.remarkForm = {};
        this.remarkOpen = false;
      });
    }),
    // 任务进度条的文字
    format(percentage) {
      return "完成进度:" + percentage + "%";
    },
    // 任务冲突提交按钮
    misssubmitForm() {
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //     this.form.id = null;
      //   }
      // });
    },
    /** 查询客户信息列表 */
    getList() {
      console.info("查询客户信息列表");
      console.info(this.queryParams);
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.queryParams));

      data.clientType = data.clientType == "0" ? "" : data.clientType;

      if (data.flowStatus == 600) { //未分配
        data.flowStatus = null;
        this.flowStatusCut = 10;
        this.queryParams.flag = 10;
        data.flag = 10;
      } else if (data.flowStatus == 700) {   //已分配
        data.flag = 20;
        this.queryParams.flag = 20;
        this.flowStatusCut = 20;
        data.flowStatus = null;
      } else if (data.flowStatus == 30) {  //已完成
        data.flag = null;
        this.queryParams.flag = null;
        this.flowStatusCut = 30;
        data.flowStatus = 30;

      } else if (data.flowStatus == '10') {  //停止服务
        data.flag = null;
        this.queryParams.flag = null;
        this.flowStatusCut = 10;
        data.flowStatus = 10;

      }else{   //全部
        data.flag = null;
        this.queryParams.flag = null;
        this.flowStatusCut = 0;
        data.flowStatus = null;
      }
      console.info("查询客户信息列表111");
      console.info(this.queryParams);
      this.requestData = data
      // this.queryParams =  data
      workCompetentList(data).then((response) => {
        this.bankList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      (this.taskParticulars = false), //任务详情取消按钮
        (this.openCustomer = false); //新建客户取消按钮
      this.openOffAudit = false; //移交取消按钮
      this.orderReview = false; //审核取消按钮
      this.openApply = false; //申请取消按钮
      this.shutPopUp = false; //关闭的取消按钮
      this.dialogVisible = false;
      this.addTagUp = false; //新增标签取消按钮
      this.renewals = false;
      this.followOpen = false; //跟进记录
      this.auditData = {};
    },
    // 任务冲突取消按钮
    misscancel() {
      this.AccessoryOpen = false; //所需附件取消按钮
      this.taskMiss = false; //任务冲突取消按钮
      this.remarkOpen = false;
      this.uploadingOpen = false; //步骤记录取消按钮
    },
    // 任务冲突
    // miss() {
    //   this.reset();
    //   this.taskMiss = true;
    //   this.title = "任务冲突";
    // },
    //查看步骤记录
    uploading(row) {
      this.uploadingOpen = true;
      this.stepsToRecordObj = row;
      this.stepLabelList = row.label;
      if (this.stepLabelList != "") {
        this.stepLabelList = this.stepLabelList.split(",");
      } else {
        this.stepLabelList = [];
      }
      uploadingEcho({
        label: row.label,
        procedureId: row.id,
        companyId: this.recordData.id,
      }).then((response) => {
        this.stepsToRecordObj = response.data;
      });
      //     var s = row.label;
      // var arr = s.split(",");
      // this.recordList=arr
    },
    uploadSuccess(response, file, fileList) {
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
  },
  mounted() {
    this.restaurants = this.loadAll();
    // this.restaurants = this.restaurants11;
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: (state) => state.user,
    }),
  },
  watch: {
    // console.info(this.labelList)

    AccessoryOpen: {
      handler(n, o) {
        if (this.AccessoryOpen == false) {
          this.labelList = [];
        }
      },
      deep: true,
    },
  },
  created() {

    this.getCompanyList();
    // 检测输入框原有值并显示对应 label
    if (this.value || this.value == 0) {
      //初始值可能为0
      this.labelModel = this.queryTree(this.data, this.value);
    }
    // // 获取输入框宽度同步至树状菜单宽度
    this.$nextTick(() => {
      this.treeWidth = `${
        (this.width || this.$refs.input.$refs.input.clientWidth) - 24
      }px`;
    });
    this.roles = this.userInfo.roleCodes;
    //任务状态
    this.getDicts("task_state").then((res) => {
      this.taskStateList = res.data;
    });
    // this.getDicts("upload_type").then(res => {
    //   this.recordList = res.data;
    //   this.AccessoryOpenList = res.data;
    // });
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
// 99
.box1 {
  height: 180px;
  width: 200px;

  // background-color:black;
}
.choice {
  background: #00d595;
  width: 105px;
  height: 28px;
  text-align: center;
  color: #fff;
  line-height: 28px;
}
.draw-enter-active,
.draw-leave-active {
  transition: all 0.3s ease;
}
.box1 > ul,
.box1 > ul > li {
  transition: all 4s ease;
}
.draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
}
// 9
* {
  list-style: none;
}
// 任务详情
.task {
  .bottom {
    text-align: right;
  }
}
</style>
<style lang="scss">
.el-table td.is-center {
  .cell {
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    overflow: hidden;
  }
}
.offApply {
  .el-dialog {
    height: auto;
    .el-dialog__body {
      .el-form .el-input {
        width: 100%;
      }
      .el-form {
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .box {
    height: auto;
    // overflow-y: scroll;
    //    overflow:auto;
  }
  .bottom {
    text-align: right;
  }
}
.taskPopUp {
  .el-dialog {
    height: 161px;
    margin-top: 24vh !important;
  }
  .hint {
    margin-top: 7px;
    .icon {
      display: inline-block;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 22px;
      background: rgb(232, 170, 113);
      margin-right: 13px;
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
    margin-top: 19px;
    text-align: right;
  }
}
.el-table .fixed-width .red {
  color: #ef5465;
}
.task {
  .box-tax {
    .el-form-item__content {
      .el-input--small {
        .el-textarea__inner {
          min-height: 98px !important;
        }
      }
    }
  }
  .el-dialog {
    .el-dialog__body .el-form .el-select {
      width: 100%;
      .el-input {
        width: 100%;
      }
    }
    .el-dialog__body .el-form .el-input {
      width: 100%;
    }
  }
}
// 跟进记录
.follow {
  .el-dialog {
    background: #f5f6f7;
    .table_header {
      font-size: 16px;
      padding: 12px 0 20px 0;
    }
    .box_table {
      background: #ffffff;
      padding: 24px 32px;
      .box_table_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
        .table_left {
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        .table_right {
          display: flex;
          align-items: center;
          justify-content: end;
          .addbut {
            width: 97px;
            height: 28px;
            outline: none;
            text-align: center;
            background: #ecf2fc;
            border: 1px solid #b5c8f1;
            border-radius: 3px;
            font-size: 12px;
            line-height: 24px;
            color: #4977e0;
            margin-right: 5px;
          }
          .el-progress {
            width: 80px;
            display: flex;
            flex-direction: column;
            .el-progress-bar {
              padding-right: 0;
            }
            .el-progress__text {
              font-size: 12px !important;
              color: #565759;
              margin-top: 5px;
              margin-left: 0;
            }
          }
        }
      }
      .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 42px;
        line-height: 42px;
        color: #6e7073;
        font-size: 12px;
      }
      .el-table__body tr,
      .el-table__body td {
        padding: 0;
        height: 42px;
        line-height: 42px;
      }
    }
    .textclick {
      color: #4977e0;

      font-weight: 400;
      color: #4977e0;
      font-size: 13px;
      font-family: Microsoft YaHei;
      cursor: pointer;
    }
    .followShow {
      margin-top: 20px;
      background-color: #ffffff;
      // height: 232px;
      //       overflow-y: scroll;
      .followShow_title {
        display: flex;
        padding-bottom: 35px;
        padding: 32px;
        border-bottom: 1px solid #e6e7eb;
        .followShow_left {
          margin-right: 12px;
          .head {
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
        }
        .followShow_right {
          width: 100%;
          .top {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .name {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #3978e7;
              line-height: 24px;
              margin-right: 10px;
            }
            .time {
              font-size: 14px;
              font-family: Arial;
              font-weight: 400;
              color: #a1a2a6;
              line-height: 24px;
              margin-right: 13px;
            }
            .detail {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;
              line-height: 24px;
            }
          }
          .uploading {
            padding-top: 10px;
            padding-bottom: 14px;
            border-bottom: 1px solid #e6e7eb;

            .img {
              width: 96px;
              height: 39px;
            }
          }
          .step {
            padding-top: 14px;
            display: flex;
            .step-item {
              display: flex;
              flex-direction: column;
              margin-right: 52px;
              .step-item-top {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #a1a2a6;
                margin-bottom: 11px;
              }
              .step-item-bottom {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #565759;
              }
            }
          }
        }
      }
    }
  }
}
//上传
.uploading {
  .el-dialog {
    margin-top: 19vh !important;
    background: #f5f6f8;
  }
  .title {
    margin-bottom: 16px;
    height: 35px;
    background: #fdf6f0;
    border: 1px solid #faeee1;
    border-radius: 2px;
    .el-alert__title {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #6e7073;
      line-height: 22px;
    }
    .el-icon-close:before {
      content: "";
    }
  }
  .box {
    background: #ffffff;
    border-radius: 4px;
    padding: 0 32px;
    .box_time {
      padding: 24px 0;
      border-bottom: 1px solid #e6e7eb;
    }
    .box_on {
      display: flex;
      .box_on_time {
        position: relative;
        width: 35px;
        height: 132px;
        background: #3978e7;
        border-radius: 2px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
        margin-right: 20px;
        text-align: center;
        display: grid;
        div {
          width: 10px;
          align-self: center;
          justify-self: center;
        }
        &.box_on_time:before {
          content: "";
          position: absolute;
          left: 100%;
          top: 47%;
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-left: 4px solid #3978e7;
          border-right: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
      }
      .box_on_img {
        width: 180px;
        height: 132px;
        margin-left: 15px;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .box_on_change {
        margin-left: 17px;
        position: relative;
        .el-button {
          position: absolute;
          bottom: 0px;
          width: 55px;
          height: 32px;
          border: 1px solid #e6e7eb;
          border-radius: 3px;

          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #565759;
        }
      }
    }

    .remark {
      padding-top: 24px;
      padding-bottom: 24px;
      .tax {
        height: 100px;
        display: flex;
      }
      .tax_tit {
        margin-right: 5px;

        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #565759;
      }
      .input {
        width: 555px;
        height: 98px;
        .el-textarea__inner {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .button {
    text-align: right;
    margin-top: 24px;
  }
}
// 订单审核
.OrderReview {
  .el-dialog {
    border-radius: 4px;
    margin-top: 24vh !important ;
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
            padding-bottom: 23px;
            margin-bottom: 25px;
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
.orderParticulars {
  .el-dialog {
    margin-top: 24vh !important ;
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
.remark {
  .el-dialog .el-dialog__body .el-form {
    margin: 0;
  }
  .el-dialog .el-dialog__body {
    background: #ffffff;
  }
}
.remarkUp {
  .el-dialog {
    .el-dialog__body {
      padding-top: 22px;
    }
  }
}
//关闭
.shutPop {
  .el-dialog {
    margin-top: 24vh !important ;
    .el-dialog__body {
      padding-bottom: 23px;
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
      }
    }
  }
}
//所需附件
.required {
  .box {
    .box-inpt-box {
      .el-autocomplete {
        width: 156px;
      }
    }

    .pull-down-list {
      width: 156px;
      border: 1px solid #e6e7eb;

      ul {
        padding: 0px;
        margin: 7px 0;
        li {
          padding: 0 24px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #565759;
          line-height: 34px;
          &.ADD {
            font-size: 14px;
            color: #3978e7 !important;
          }
        }

        li:hover {
          background: #f8f9fb;
        }
      }
    }
  }
}
// 新增标签
.add-tally {
  .el-dialog {
    .el-dialog__body {
      .el-form {
        margin: 0px;
        .el-row {
          .add-name {
            .el-form-item {
              display: flex !important;
            }
          }
        }
      }
    }
  }
}
</style>
