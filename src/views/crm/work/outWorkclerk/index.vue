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
            <!-- 筛选弹框 -->
            <div class="search-popover">
              <el-form
                :visible.sync="showSearch"
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="创建时间">
                  <el-date-picker
                    v-model="dateCreatedList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="完成时间">
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

                <el-form-item label="截止时间">
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
                  <el-input style="width:199px;" v-model="queryParams.labelName" placeholder="请输入标记"></el-input>

                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认</el-button
                >
              </div>
            </div>
            <el-button
              slot="reference"
              size="small"
              @click="showSearch = !showSearch"
              >筛选<i class="el-icon-s-operation el-icon--right"></i>
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
      <el-tabs v-model="flowStatus" @tab-click="handleTabQuery">
        <el-tab-pane label="全部任务" value="全部任务" name=""></el-tab-pane>
        <el-tab-pane
          v-for="item in taskStateList"
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
    <div class="table-data">
      <el-table
        v-loading="loading"
        :data="companyList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <!-- @row-click="handleRowFun" -->
        <el-table-column type="selection" width="55" align="left" />
        <el-table-column label="任务类型" align="left" prop="serpriceName" />
        <el-table-column label="客户名称" align="left" prop="companyName">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="showDrawer(scope.row)"
              style="width:100%"
              >{{ scope.row.companyName }}</el-button
            >

            <!-- <div>{{ scope.row.companyName }}</div> -->
            <el-dropdown
              v-if="scope.row.crmIntermUserlabelResults != ''"
              class="choice"
              trigger="click"
            >
              <span class="el-dropdown-link">
                {{ scope.row.crmIntermUserlabelResults[0].name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in scope.row.crmIntermUserlabelResults"
                  :key="item.id"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>
        <el-table-column label="任务内容" align="left" prop="remarks">
          <template slot-scope="scope">
            <span style="color:#3978E7" @click="taskParticularsUp(scope.row)">查看任务内容</span>
          </template>
        </el-table-column>
        <el-table-column label="指派人" align="left" prop="assigner" />
        <el-table-column label="执行人" align="left" prop="executor" />
        <el-table-column label="任务状态" align="left" prop="flowStatus">
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
            <span>{{ parseTime(scope.row.createDate, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截止日期" align="left" prop="truncationTime">
          <template slot-scope="scope">
            <span>{{
              parseTime(scope.row.truncationTime, "{y}-{m}-{d}  {h}:{i}:{s}")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="完成日期" align="left" prop="figureOutTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.figureOutTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
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
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.flowStatus != 10">
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                @click="addFollow(scope.row)"
                >跟进</el-button
              >
              <el-button
                size="mini"
                type="text"
                disabled
                v-hasPermi="['crm:userlabel:edit']"
                style="color:#A1A2A6;"
                v-if="scope.row.allocationId == 20||scope.row.flowStatus == 30||scope.row.wqAuditType==10"
                >移交</el-button>

              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                @click="offAuditUp(scope.row), executor(scope.row)"
                v-if="scope.row.flowStatus != 30&&scope.row.wqAuditType!=10&&scope.row.allocationId == 10"
                >移交</el-button>
              <!-- <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                @click="offAuditUp(scope.row), executor(scope.row)"
                v-if="!(scope.row.flowStatus == 30)?true:scope.row.allocationId = ''"
                >移交</el-button> -->
              <br />
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                v-if="(scope.row.wqAuditType != 20&&scope.row.wqAuditType != 10)&&(scope.row.flowStatus!=30&&scope.row.allocationId==10)&&roles.indexOf('boss') == -1"
                @click="operationaCcomplish(scope.row)"
                >完成</el-button>
              <!-- v-if="scope.row.flowStatus!=30&&scope.row.allocationId==''" -->
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                style="color:#A1A2A6;"
                v-if="
                  (scope.row.flowStatus == 30 &&
                    scope.row.allocationId == 20) ||
                    scope.row.wqAuditType == 20||scope.row.wqAuditType == 10||roles.indexOf('boss') != -1">

                完成</el-button
              >
              <!-- v-if="scope.row.flowStatus==30||scope.row.allocationId!=''" -->
              <!-- <el-button  size="mini" type="text" style="color:#A1A2A6;">完成</el-button> -->
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:remove']"
                v-if="
                  scope.row.wqAuditType == 20 || scope.row.wqAuditType == 30
                "
                @click="orderParticularsUp(scope.row)"
                >查看详情</el-button
              >
            </div>
            <div v-if="scope.row.flowStatus == 10">
              <el-button size="mini" type="text" style="color:#A1A2A6;"
                >跟进</el-button
              >
              <el-button size="mini" type="text" style="color:#A1A2A6;"
                >移交</el-button
              ><br />
              <el-button size="mini" type="text" style="color:#A1A2A6;"
                >完成</el-button
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="left"
          class-name="table-control" >
         <!-- fixed="right" -->
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
          </template>
          <!-- <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="clientData(scope.row)"
                v-hasPermi="['share:bank:edit']"
                >创建订单
              </el-button>
            </template> -->
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
        <el-form ref="form" label-position="labelPosition" class="chengjiao">
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
                  style="width: 100%;"
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
              <el-form-item label="任务内容" class="tax box-tax">
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
              <el-form-item label="截至时间" prop="tempDate">
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
          <!-- <el-button @click="miss">任务冲突</el-button> -->
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm" v-if="roles.indexOf('boss') == -1">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 跟进记录 -->
    <el-dialog
      title="跟进记录"
      :visible.sync="followOpen"
      width="704px"
      append-to-body
      class=" businiss offApply follow"
    >
     <!-- :before-close="beforeClose" -->
      <div class="box">
        <div class="table_header">
          <i class="el-icon-s-data mr10"></i>
          <span>{{ companyName }}</span>
        </div>
        <div class="box_table">
          <div class="box_table_header">
            <div class="table_left">
              <i class="el-icon-s-operation "></i>
              <span>{{taskType}}</span>
            </div>
            <div class="table_right">
              <!-- <button class="addbut">+ 添加步骤</button> -->
              <el-progress
                :percentage="percentage"
                :format="format"
                :stroke-width="6"
              ></el-progress>
            </div>
          </div>
          <el-table
            style="width: 100%"
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="50">
            </el-table-column>
            <el-table-column
              prop="sort"
              label="序号"
              align="center"
              width="60"
            />
            <el-table-column
              prop="performName"
              label="步骤名"
              align="left"
              show-overflow-tooltip
              width="160"
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
            <el-table-column prop="execUserName" label="执行人" width="100">
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
            <el-table-column label="操作" width="50" align="center">
              <template slot-scope="scope">
                <div
                  v-if="scope.row.completionStatus == 20||allocationId==20"
                  class="textclick"
                  style="color:#A1A2A6;"
                >
                  完成
                </div>
                <div
                  class="textclick"
                  @click="handleCom(scope.row)"
                  v-if="scope.row.completionStatus == 10&&roles.indexOf('boss') == -1&&allocationId!=20"
                >
                  完成
                </div>
              </template>
            </el-table-column>
            <el-table-column label="步骤记录" width="70" align="center">
              <template slot-scope="scope">
                <div style="font-size: 26px;" @click="uploading(scope.row)">
                  <i class="el-icon-upload"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="截止日期"
              align="center"
              prop="deadline"
              width="100"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="followShow">
          <div class="followShow_title" v-for="item in tableDataBottom">
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
                <span v-for="ite in item.crmRecordImgList" :key="ite.id">
                  <el-image :src="ite.url" fit="cover" class="img"  :preview-src-list="item.crmRecordImgList.map(ite=> {return ite.url})"></el-image>
                </span>
              </div>
              <div class="step">
                <div class="step-item">
                  <span class="step-item-top">完成步骤</span>
                  <span class="step-item-bottom">{{
                    item.accomplishStep
                  }}</span>
                </div>
                <div class="step-item" v-if="item.accomplishTime!=''">
                  <span class="step-item-top">完成时间</span>
                  <span class="step-item-bottom">{{
                    item.accomplishTime
                  }}</span>
                </div>
                <div class="step-item">
                  <span class="step-item-top">截至时间</span>
                  <span class="step-item-bottom">{{ item.deadline }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <i class="el-icon-office-building" style="margin-right:9px"></i>
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
                v-if="orderParticularsList.wqAuditType == 20"
              >
                通过</el-radio
              >
              <el-radio v-model="radio" label="1" class="price" v-else>
                未通过</el-radio
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="sonBox">
              <span class="right14">审核备注:</span>
              <span class="price">{{
                orderParticularsList.wqAuditRemark
              }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{ orderParticularsList.wqAuditTime }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{ orderParticularsList.wqAuditName }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 完成备注 -->
    <el-dialog
      title="备注"
      :modal-append-to-body="false"
      :visible.sync="remarkOpen"
      width="422px"
      append-to-body
      class=" taskPopUp  remark remarkUp"
    >
      <el-alert title="完成时间已超时请填写备注信息" type="warning" show-icon>
      </el-alert>
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
        <el-button type="primary" @click="fulfillRemark">确定</el-button>
      </div>
    </el-dialog>
    <!-- 移交 -->
    <el-dialog
      title="移交"
      :visible.sync="openOffAudit"
      width="704px"
      append-to-body
      top="100px"
      :data="handOverList"
      class="addCustomer businiss offApply"
    >
      <div class="box">
        <el-form
          ref="handOverForm"
          :rules="rules"
          label-position="labelPosition"
          class="chengjiao"
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
                  style="width: 100%;"
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
                  style="width: 100%;"
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
                disabled
                  style="width: 100%;"
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
                <el-cascader
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
                ></el-cascader>

            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="执行人">
              <el-select
                placeholder="请选择执行人"
                  v-model="departmentStaff.name"
                clearable
                size="small"
                style="margin-bottom:10px;"
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
          <el-button @click="miss">任务冲突</el-button>
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="handOversubmitForm(handOverList.id)" v-if="roles.indexOf('boss') == -1"
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
        <el-button type="primary" @click="misssubmitForm" v-if="roles.indexOf('boss') == -1">确定</el-button>
      </div>
    </el-dialog>
    <!-- 上传 - 步骤记录-->
    <el-dialog
      title="步骤记录"
      :visible.sync="uploadingOpen"
      width="704px"

      append-to-body
      v-model="uploadList"
      class="addCustomer businiss offApply uploading "
    >
      <el-alert
        title="提示：文件可上传jpg、png、jpeg、doc、docx、xls、xlsx、pdf类型文件，每次上传不超过2M!"
        type="warning"
        show-icon
        class="title"
      >
      </el-alert>
      <div class="box">
        <div
          class="box_on box_time"
          v-for="(item, index) in labelList"
          :key="index"
          v-if="labelList.length>0"
          >
          <div class="box_on_time">
            <div>{{ item }}</div>
          </div>
          <div class="imgBox" v-for="(omg,index) in imgeList" :key="index">
            <div  v-if="omg.label == item&&omg.id!=null">
              <img
                :src="omg.url"
                alt=""
                style=" display: inline-block;  width: 180px; height: 132px;"/>
                <div class="deleteShadow" v-if="submitCondition!=20&&submitCondition!=10"><i class="el-icon-delete-solid"  @click="deleteImg(omg.id)"></i></div>
            </div>
          </div>
          <el-upload
            list-type="picture-card"
            ref="uploadFrom"
            class="upload-vi"
            :class="{ noneCss: disabled != true }"
            :headers="headers"
            :action="uploadUrl"
            :data="{ type: 50, label: item }"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="
              (response, file, fileList) =>
                uploadSuccess(response, file, fileList, index) "
            multiple
            :limit="2"
            :file-list="fileList"
            v-if="submitCondition!=20&&submitCondition!=10"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible" style="z-index: 20010 !important;">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog> -->
        </div>
        <el-row :gutter="20" class="remark">
          <el-col :span="24">
            <div class="tax">
              <div class="tax_tit">备注</div>
              <el-input
                class="input"
                type="this.uploadList.remarks"
                :rows="2"
                placeholder="这是一段话，讲的是任务内容这是一段话，讲的是任务内容这是一段话，讲的"
                v-model="uploadList.remarks"
              >
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="button">
        <el-button @click='cancel'>取 消</el-button>
        <el-button type="primary" @click="submitImg" v-if="submitCondition!=20&&submitCondition!=10&&roles.indexOf('boss') == -1&&allocationId!=20">确定</el-button>
      </div>
    </el-dialog>

    <edit-drawer
      :visible.sync="drawerVisible"
      :companyId="companyId"
      :isown = 'isown'
    ></edit-drawer>

    <!-- 图片放大 -->
      <el-image-viewer
      style="z-index:3000;"
           v-if="dialogVisible"
           :on-close="closeViewer"
           :url-list="ImageUrlList" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import { mapGetters } from "vuex";
import { tokenKey } from "@/settings";
import { _getSessionStore } from "@/utils/storage";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import {
  workclerkList,
  performData, //完成
  lookTaskConsumptionParticulars, //任务详情
  lookConsumptionParticulars, //查看详情
  followRecord, //跟进记录
  followRecordFulfill, //跟进记录- 操作-完成
  uploadingEcho, //跟进记录- 上传步骤记录回显
  imageUpload, //跟进记录- 上传-图片上传
  imageDelete,//删除图片
  uploadingSubmit, //跟进记录- 步骤记录提交
  handOver, //移交回显
  handOverSubmit, //移交提交
  entDept, //分配查询部门
  entUser, //根据部门获取用户下拉列表
  exportD
} from "@/api/crm/outWorkclerk/outWorkclerk";
import {
  Department,
  Staff
} from "../../../../api/crm/externalAccount/agencyService";
import EditDrawer from "@/views/components/EditDrawer";
import { throttle } from "@/utils/hmt";
export default {
  components: {
    EditDrawer,
    ElImageViewer
  },
  data() {
    return {
      allocationId:'',
      roles: [],
      total: 0,
      opinion: "汪汪队", //客户名称
      // tabs 的选项
      // 表单内容
      // bankList: [
      //     {id:1,tasTtype:'税务办案',customerName :'安徽光明顶有限公司',taskDefinition:'国税局备案',designatePeo:'大领导',
      //     performer:'小职员', taskStatus:'进行中',creationTime:'2020-12-02',deadline:'2020-12-12',finishTime:'2020-12-10' },
      //     {id:2,tasTtype:'税务办案',customerName :'安徽光明顶有限公司',taskDefinition:'国税局备案',designatePeo:'大领导',
      //     performer:'小职员', taskStatus:'进行中',creationTime:'2020-12-02',deadline:'2020-12-12',finishTime:'2020-12-10' }
      //   ],
      companyId: null,
      isown:null,
       kfDepartmentStaff: [],
      wqDepartmentStaff: [],
      kfDeptOptions: [],
      wqDeptOptions: [],
      departmentList: [],
      drawerVisible: false, //抽屉显示
      // 显示搜索条件
      showSearch: false,
      //移交表单验证
      rules: {
        // truncationTime: [
        //   {
        //     required: true,
        //     message: "截至时间不能为空",
        //     trigger: "blur"
        //   }
        // ]
      },
      areaOptions: regionData, //区域数据
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        clientType: null,
        flowStatus: '0', //审核状态
        enteringTime: null, // 上传
        startTime: null, //创建日期开始时间
        endTime: null, //创建日期结束时间
        finishStartTime: null, //完成日期开始时间
        finishEndTime: null, //完成日期结束时间
        abortStartTime: null, //截至日期开始时间
        abortEndTime: null, //截至日期结束时间
        province: null, //省
        city: null, //市
        county: null //区
      },
      flowStatus:'0',
      district: null, //所在地区
      deadlineList: null, //筛选截至日期
      labelName:'',//筛选标记
      accomplishDataList: null, //筛选完成日期
      dateCreatedList: null, //筛选创建日期
      delSwitch: [],
      companyList: [],
      sourceTypeLv: [], //商机等级
      loading: true, // 遮罩层
      taskParticulars: false, //任务详情弹出层
      radio: "1",
      reviewerTypeList: [], //审核状态
      performerlist: [{ value: "张三" }],
      sourceTypeLv: [{ dictName: "1" }, { dictName: "2" }], //任务类型
      clientType: "6",
      openOffAudit: false, //移交弹出层
      screenOff: false, //筛选弹出层
      taskMiss: false, //任务冲突
      // 移交的表单 信息
      offForm: { customerName: "哇哈哈哈哈" },
      // 跟进记录弹出层
      followOpen: false,
      // 跟进记录的表格
      tableData: [],
      companyName: null, //公司名称
      // 完成备注弹出层
      remarkOpen: false,
      uploadingOpen: false, //上传取消按钮
      requestData:{},
      remarkForm: {
        code: null
      },
      clientTypeList: [{ dictName: "a" }, { dictName: "b" }], //客户类型字典
      textarea: "张云雷",
      handOverList: {}, //移交回显列表
      //分配参数
      distributionForm: {
        orderId: null,
        userId: null,
        role: null,
        productId: null
      },
      handOverForm: {
        truncationTime: null,
        remark: null,
        userName: null
      }, //移交提交表
      department: [], //执行人部门
      departmentStaff: [], //执行人
      auditData: {
        companyName: null
      }, //审核数据
      orderParticulars: false, //审核详情
      orderParticularsList: {},
      tableDataBottom: {},
      updateStepsList: {
        wqAuditName: null,
        label: null
      }, //步骤记录
      recordList: [], //记录
      taskStateList: [], //任务状态
      taskParticularsData: {
        handOver: null,
        region: null
      }, //任务详情
      labelList: [], //标签名称label
      uploadList: {
        imgeIds: {} //上传图片id拼接
      }, //步骤记录提交数据
      // 上传
      filePath: process.env.VUE_APP_FILE_API,
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload",
      headers: { Authorization: _getSessionStore(tokenKey) },
      fileList: [], //文件上传数据
       ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: true,
      progressBar: null, //完成进度
      judge: false, //完成按钮的条件判断
      recordData: {}, //跟进记录接口传值
      fileArr: [],
      imgeList: [],//上传图片
      submitCondition:null,//根据完成按钮判断是否可以提交
      taskType:''
    };
  },
   beforeRouteEnter(to, from, next){
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    //字典
    //  审核状态字典
    auditStateDictionaries(row) {
      return this.selectDictLabel(this.reviewerTypeList, row);
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
        return "暂停";
      }
    },
    //任务状态
    TaskState(data) {
      if (data == 10) {
        return "关闭";
      } else if (data == 20) {
        return "进行中";
      } else if (data == 30) {
        return "完成";
      } else if (data == 40) {
        return "暂停";
      }
    },
    getList() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.queryParams))
      // console.log(data.flowStatus);
      data.flowStatus = data.flowStatus == "0" ? "" : data.flowStatus;
      // console.log(data.flowStatus);
      this.requestData = data
      workclerkList(data).then(response => {
        this.total = response.data.totalRows;
        this.companyList = response.data.rows;
        this.loading = false;
      });
    },

    // 任务详情
    taskParticularsUp(row) {
      this.reset();

      this.taskParticulars = true;
      this.title = "任务详情";
      lookTaskConsumptionParticulars({ id: row.id }).then(response => {
        this.taskParticularsData = response.data;
        this.taskParticularsData.region =
          response.data.province +
          "-" +
          response.data.city +
          "-" +
          response.data.county;
        this.taskParticularsData.address =
          response.data.address;
      });
    },
    //抽屉
    showDrawer(row) {
      console.log(row);
      this.drawerVisible = true;
      this.companyId = row.companyId;
      this.isown = row.wqCustomerCreatorType;
      console.log(this.isown);
    },
    //表单重置
    reset() {
      //  this.resetForm("queryForm");
    },
    handleRegionChange(value) {
      this.district = value;
      this.queryParams.province = CodeToText[value[0]];
      this.queryParams.city = CodeToText[value[1]];
      this.queryParams.county = CodeToText[value[2]];
    },
    handleTabQuery(e){
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.flowStatus = this.flowStatus
      this.queryParams.pageNo = 1;
      this.getList();
    },
     /** 筛选按钮操作 */
    handleQuerys(e) {
      if (e&&e.keyCode != 13) {
        this.showSearch = false;
      }
      // 筛选条件
      if (this.dateCreatedList != null) {
        this.queryParams.startTime = this.dateCreatedList[0] + " 00:00:00";
        this.queryParams.endTime = this.dateCreatedList[1] + " 23:59:59";

      }else {
          this.queryParams.startTime = "";
          this.queryParams.endTime = "";
        }

      if (this.accomplishDataList != null) {
        this.queryParams.finishStartTime =
          this.accomplishDataList[0] + " 00:00:00";
        this.queryParams.finishEndTime =
          this.accomplishDataList[1] + " 23:59:59";
      }else {
          this.queryParams.finishStartTime = "";
          this.queryParams.finishEndTime = "";
        }

      if (this.deadlineList != null) {
        this.queryParams.abortStartTime = this.deadlineList[0] + " 00:00:00";
        this.queryParams.abortEndTime = this.deadlineList[1] + " 23:59:59";
      }else {
        this.queryParams.abortStartTime = "";
        this.queryParams.abortEndTime = "";
      }

      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.getList();
       this.labelName='';
    },
    /** 筛选按钮操作 */
    handleQuery(e) {
      if (e&&e.keyCode != 13) {
        this.showSearch = false;
      }
        console.log(this.flowStatus)
       this.queryParams.flowStatus = this.flowStatus
       // this.resetQuery();
       this.getList();
    },
      /** 导出按钮操作 */
    handleExport() {
      let fileUrl = process.env.VUE_APP_FILE_API;
      const queryParams = this.requestData;
      delete queryParams.pageNo
      delete queryParams.pageSize
      this.$confirm("是否确认导出所有服务项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportD(queryParams);
        })
        .then(response => {
          let filename = response.data.filename;
          let elink = document.createElement("a");
          elink.download = filename;
          elink.text = filename;
          elink.style.display = "none";
           window.open(decodeURIComponent(fileUrl + "/download/" + filename),'_blank');
          // elink.href = decodeURIComponent(fileUrl + "/download/" + filename);
          document.getElementById("app").appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        })
        .catch(function() {});
    },
    //tab 切换
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams ={
        pageNo: 1,
        pageSize: 10,
        clientType: null,
        flowStatus: '0', //审核状态
        enteringTime: null, // 上传
        startTime: null, //创建日期开始时间
        endTime: null, //创建日期结束时间
        finishStartTime: null, //完成日期开始时间
        finishEndTime: null, //完成日期结束时间
        abortStartTime: null, //截至日期开始时间
        abortEndTime: null, //截至日期结束时间
        province: null, //省
        city: null, //市
        county: null //区
      };
       this.labelName='';
      this.district = []
      this.deadlineList = null; //筛选截至日期
        this.accomplishDataList = null; //筛选完成日期
        this.dateCreatedList = null; //筛选创建日期
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    // 移交
    offAuditUp(row) {
      this.handOverForm = {};
      this.reset();
      this.openOffAudit = true;
      this.title = "移交";
      this.department.companyName='';
      this.departmentStaff.name=''
      //
      let id = row.id;
      handOver({ productId: row.id }).then(response => {
        this.handOverList = response.data;
        // if(){}
        this.handOverList.region =
          response.data.province +
          "-" +
          response.data.city +
          "-" +
          response.data.county;
        this.handOverList.address =
          response.data.address;
           this.handOverForm.truncationTime = response.data.truncationTime;
      });
    },
      wqDeptChange(val) {
      this.wqDepartmentStaff = [];
      this.handOverForm.extUserId = "";
      this.handOverForm.extRole = "";
      Staff({ abbreviation: "WQB", deptId: val }).then(response => {
        this.wqDepartmentStaff = response.data;
      });
    },

    handleDepartments(val) {
      this.$forceUpdate()
      this.wqDepartmentStaff.forEach(item => {
        if (item.userId == val) {
          this.handOverForm.userId = item.userId;
          this.handOverForm.userName = item.name;
          this.handOverForm.roleCode = item.roleCode;
          this.handOverForm.deptId = item.deptId;
          this.handOverForm.firmId = item.companyId;
        }
      });
    },
    //执行人
    executor(row) {
      this.distributionForm.productId = row.id;
      this.distributionForm.orderId = row.busirId;
        Department({}).then(response => {
          let wqList = this.handleTree(
            response.data.wqbDept,
            "deptId",
            "parentId"
          );
          this.departmentList = response.data.wqbDept;
          this.wqDeptOptions = wqList;
        });
    },
    //部门选择
    // executorMembers(row) {
    //   this.departmentStaff.name = ''
    //   this.handOverForm.userId = '';
    //   this.handOverForm.userName = '';
    //    this.handOverForm.deptId = ''
    //   this.handOverForm.firmId = ''
    //    this.handOverForm.roleCode = ''
    //   let deptId = row.deptId;
    //   this.distributionForm.role = row.deptName;
    //   entUser({ deptId: deptId,deptName:row.deptShortName}).then(response => {
    //     this.departmentStaff = response.data;

    //   });
    // },
    //执行人选择
    // executor1(item) {
    //   this.distributionForm.userId = item.userId;
    //   this.handOverForm.userId = item.userId;
    //   this.handOverForm.userName = item.name;
    //    this.handOverForm.deptId = item.deptId
    //   this.handOverForm.firmId = item.companyId
    //    this.handOverForm.roleCode = item.roleCode
    // },
    //移交提交按钮
    handOversubmitForm(id) {
      this.handOverForm.id = id;
      this.$refs["handOverForm"].validate(valid => {
        if (valid) {
          handOverSubmit(this.handOverForm).then(response => {
            this.handOverForm = {};
            this.openOffAudit = false;
            this.getList();
            this.msgSuccess("移交成功");
          });
        }
      });
    },
    //操作完成
    operationaCcomplish: throttle(function(row) {
      performData({ id: row.id }).then(response => {
        this.getList();
      });
    }),
    // 跟进记录弹窗
    addFollow(row) {
      this.judge = false;
      this.followOpen = true;
      this.allocationId=row.allocationId
      this.companyName = row.companyName;
      this.taskType = row.serpriceName
      this.updateStepsList.companyId = row.companyId;
      this.recordData = row;
      this.submitCondition=row.wqAuditType
      // this.updateStepsList.label=response.data.procedure.label
      followRecord({
        orderId: this.recordData.busirId,
        id: this.recordData.id
      }).then(response => {
        this.tableData = response.data.procedure;
        this.tableDataBottom = response.data.log;
        this.progressBar = null;
        for (let key of this.tableData) {
          if (key.completionStatus == 20) {
            // completionStatus
            this.progressBar = this.progressBar + 1;

            if (this.progressBar == this.tableData.length) {
              this.judge = true;
              return (this.judge = true);
            }
          }
        }
      });
    },
    //完成操作
    handleCom(row) {
      this.remarkForm.id = row.id;
      followRecordFulfill({ id: row.id }).then(response => {
        if (response.data.code == 444) {
          this.remarkOpen = true;
        }
        followRecord({
          orderId: this.recordData.busirId,
          id: this.recordData.id
        }).then(response => {
          this.tableData = response.data.procedure;
          this.tableDataBottom = response.data.log;
        });
      });
    },
    //跟进记录- 操作-完成
    fulfillRemark() {
      let data = this.remarkForm;
      followRecordFulfill(data).then(response => {
        this.remarkOpen = false;
        this.remarkForm = {};
      });
      followRecord({
        orderId: this.recordData.busirId,
        id: this.recordData.id
      }).then(response => {
        this.tableData = response.data.procedure;
        this.tableDataBottom = response.data.log;
      });
    },
    //
    submitForm() {
      this.taskParticulars = false; //任务详情取消按钮
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //     this.form.id = null;
      //     addClient(this.form).then(response => {
      //       if (response.code === 200) {
      //         this.msgSuccess("移交成功");
      //         this.open = false;
      //         this.getList();
      //       }
      //     });
      //   }
      // });
    },

    // 任务冲突提交按钮
    misssubmitForm() {
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //     this.form.id = null;
      //   }
      // });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.openCustomer = false; //新建客户取消按钮
      this.openOffAudit = false; //流失审核取消按钮
      this.showSearch = false; //筛选取消按钮
      this.openApply = false; //申请取消按钮
      this.taskParticulars = false; //任务详情取消按钮
      this.dialogVisible = false;
      this.uploadingOpen = false; //步骤记录取消按钮
      this.renewals = false;
    },
    // 任务冲突取消按钮
    misscancel() {
      this.taskMiss = false; //任务冲突取消按钮
      this.remarkOpen = false;
      this.uploadingOpen = false; //上传取消按钮
    },
    // 任务冲突
    miss() {
      this.reset();
      this.taskMiss = true;
      this.title = "任务冲突";
    },

    //订单审核详情弹窗
    orderParticularsUp(row) {
      this.orderParticulars = true;
      this.auditData.id = row.id;
      this.auditData.companyName = row.companyName;

      lookConsumptionParticulars({ id: row.id }).then(response => {
        this.orderParticularsList = response.data;
      });
    },
    //点击步骤记录
    uploading(row) {
      this.fileArr=[]
      this.imgeList=[]

          console.log(row)


      const mainImg = this.$refs.uploadFrom;
      if (mainImg && mainImg.length) {
        mainImg.forEach(item => {
          // item.uploadFiles.length = 0;
          item.clearFiles();
        });
      }
      // this.labelList = this.labelList.split(",");
      if (row.label!= '') {
        this.labelList = row.label.split(",");

        for(let index of this.labelList ){
          this.imgeList.push({label:index})
          this.fileArr.push(index)
        }
        //  this.imgeList=this.labelList;
      }else{
        this.labelList=[]
      }
      this.uploadingOpen = true;
      this.updateStepsList.procedureId = row.id;
      this.updateStepsList.label = row.label;
      uploadingEcho(this.updateStepsList).then(response => {

         console.log(response.data)

        this.uploadList = response.data;
        // this.imgeList = response.data.crmRecordImgList; //回显上传的图片
        for(let box of response.data.crmRecordImgList ){
            this.imgeList.forEach((item,index)=>{
          if(item.label==box.label){
            this.imgeList[index]=box
          }
            })
        }
        if(response.data.crmRecordImgList.length!=0){
          for(let index of response.data.crmRecordImgList){
            this.fileArr.forEach((itemSon,indexSon)=>{
              if(itemSon==index.label){
                this.fileArr[indexSon]=index.id
              }
            })
        }
        }

      });
    // console.log(this.labelList);
    },
    handleRowFun(row, column, event) {
      if (
        column.property &&
        column.property != undefined &&
        column.property != "undefined"
      ) {
        this.getDetail(row, () => {
          this.stepIndex = 0;
          this.activeName = "second";
          this.view = true;
          this.title = "客户资料";
        });
      }
    },
    // 步骤记录里删除图片
    deleteImg(id){
      imageDelete({id:id}).then(response => {
        this.fileArr.forEach((item,index)=>{
          if(item==id){
            this.fileArr.splice( index, 1);
          }

        })
        uploadingEcho(this.updateStepsList).then(response => {
        this.uploadList = response.data;
        this.imgeList = response.data.crmRecordImgList; //回显上传的图片
      });
      })
    },
    // 上传附件
    uploadSuccess(response, file, fileList, index) {
      this.ImageUrlList = fileList.map(ite => {
        return ite.url;
      });

      this.fileArr[index] = fileList
        .map(item => {
          let temp = item.response;
          if (temp.code == 200) {
            return parseInt(temp.data.id);
          } else {
            return undefined;
          }
        })
        .filter(item => {
          return item != undefined;
        });
    },
    // 上传的确认按钮
    submitImg() {
      let tempArr = [];
      this.fileArr.forEach(item => {
        if(parseFloat(item).toString() != "NaN"){
          // console.info('不是字符串'  + item)
          tempArr = tempArr.concat(item);

        }else{
          // console.info('测试字符串' + item)
        }

      });
      tempArr = Array.from(new Set(tempArr));
      this.uploadList.imgeIds = tempArr.join(",");
      if(this.uploadList.crmRecordImgList==''){
          this.uploadList.crmRecordImgList=[]
      }
      uploadingSubmit(this.uploadList).then(response => {
        this.uploadingOpen = false;
        uploadingEcho(this.updateStepsList).then(response => {
          this.uploadList = response.data;
          this.imgeList = response.data.crmRecordImgList;
        });

        const mainImg = this.$refs.uploadFrom;
        if (mainImg && mainImg.length) {
          mainImg.forEach(item => {
            // item.uploadFiles.length = 0;
            item.clearFiles();
          });
        }
        followRecord({
          orderId: this.recordData.busirId,
          id: this.recordData.id
        }).then(response => {
          this.tableData = response.data.procedure;
          this.tableDataBottom = response.data.log;
        });
      });
    },
    // 删除上传图片
    handleRemove(file, fileList) {
      // delRecordImg({ id: file.response.data.id }).then((res) => {
      //   this.uploadList.imgeIds +=
      //     fileList
      //       .map((item) => {
      //         let temp = item.response;
      //         if (temp.code == 200) {
      //           return temp.data.id;
      //         } else {
      //           return undefined;
      //         }
      //       })
      //       .filter((item) => {
      //         return item != undefined;
      //       }) + ",";
      // });
    },
      closeViewer(){
      this.dialogVisible = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
        this.dialogVisible = true;

    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeClose(done) {
      this.getList();
      done();
    },
    // 任务进度条的文字
    format(percentage) {
      return `完成进度:${percentage}%`;
    }
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: state => state.user
    }),
    percentage() {
      let a = 0;
      this.tableData.forEach((item, index) => {
        if (item.completionStatus == 20) {
          return a++;
        }
      });
      if (a == 0) {
        return a;
      }
      return parseInt((a / this.tableData.length) * 100);
    }
  },
  created() {
    this.roles = this.userInfo.roleCodes;
    this.getDicts("auditor_state").then(res => {
      this.reviewerTypeList = res.data;
    });
    this.getDicts("upload_type").then(res => {
      this.recordList = res.data;
    });
    // 任务状态
    this.getDicts("task_state").then(res => {
      this.taskStateList = res.data;
    });
    this.getList();
    this.queryParams.appId = this.$store.getters.appId + "";
  }
};
</script>

<style  lang="scss" scoped>
.choice {
  background: #00d595;
  width: 105px;
  height: 28px;
  text-align: center;
  color: #fff;
  line-height: 28px;
}

</style>
<style lang="scss">
.noneCss {
  display: none;
}

// 任务详情
.task {
  .bottom {
    text-align: right;
  }
}
.el-table td.is-center {
  .cell {
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    overflow: hidden;
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
              width: 105% !important;
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
      font-size: 14px;
      cursor: pointer;
    }
    .followShow {
      margin-top: 20px;
      background-color: #ffffff;

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
            border-bottom: 1px dashed #e6e7eb;
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
.remark {
  .el-dialog .el-dialog__body .el-form {
    margin: 0;
    margin-top: 10px;
  }
  .el-dialog .el-dialog__body {
    background: #ffffff;
  }
}
.offApply {
  .el-dialog {
    height: auto;
    .el-dialog__body {
      //  height: 711px;
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
  }
  .bottom {
    text-align: right;
  }
}
.taskPopUp {
  .el-dialog {
    height: 161px;
    margin-top: 30vh !important;
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
.remarkUp {
  .el-dialog {
    .el-dialog__body {
      padding-top: 22px;

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
      // display: flex;
      // flex-direction: column;
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
      .imgBox{
        position: relative;
        .deleteShadow{
           position: absolute;
           top: 0px;
          left: 0px;
          margin: auto;
          width: 180px;
          height: 132px;

          background: rgba(0, 0, 0, 0.5);
          display:none;
          text-align: center;
          line-height: 132px;
          i{
            font-size: 28px;
              color: #f5f6f7;
          }
        }
        &:hover{
          .deleteShadow{
            display: block;

          }
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
.el-upload--picture-card {
  width: 180px;
  height: 132px;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 180px;
  height: 132px;
}
// .el-upload-list--picture-card .el-upload-list__item {
//   display: none;
// }
// 查看详情
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
