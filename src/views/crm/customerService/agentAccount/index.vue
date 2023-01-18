<template>
  <div class="app-container agentAccount">
    <!-- 首行搜索框 -->
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
              >
                <el-form-item label="客服" class="one" prop="service">
                  <el-input
                    placeholder="请输入"
                    v-model="queryParams.service"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="外账会计"
                  class="one"
                  prop="outerAccounting"
                >
                  <el-input
                    placeholder="请输入"
                    v-model="queryParams.outerAccounting"
                  ></el-input>
                </el-form-item>
                <el-form-item label="跟进日期" prop="followDate">
                  <el-date-picker
                    v-model="followDate"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item
                  label="票据记录上传日期"
                  class="two"
                  prop="writeTime"
                >
                  <el-date-picker
                    v-model="writeTime"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="省市区" prop="district">
                  <el-select
                    style="width:100px !important"
                    v-model="queryParams.province"
                    placeholder="所在省份"
                    @change="provinceChange"
                  >
                    <el-option
                      v-for="item in dataList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                      @click.native="getProvinceItem(item)"
                    >
                    </el-option>
                  </el-select>
                  <el-select
                    style="width:100px !important;margin-left:15px;"
                    v-model="queryParams.city"
                    placeholder="所在市"
                    @change="cityChange"
                  >
                    <el-option
                      v-for="item in cityList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                      @click.native="getCityItem(item)"
                    ></el-option>
                  </el-select>
                  <el-select
                    style="width:100px !important;margin-left:15px;"
                    v-model="queryParams.county"
                    placeholder="所在区"
                  >
                    <el-option
                      v-for="item in areaList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否切老户"  prop="companies">
                  <el-radio-group v-model="queryParams.companies">
                    <el-radio
                      v-for="item in yesNoList"
                      :label="item.dictCode"
                      >{{ item.dictLabel }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="纳税性质" prop="labelName">
                  <el-select v-model="queryParams.labelName">
                    <el-option
                      v-for="item in TaxNatureList"
                      :key="item.labelId"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
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
            style="width:100px !important;display: inline-block;margin-left:8px"
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
                children: 'companyStructures'
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
            placeholder="请输入角色名称"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuerys"
          />
          <el-dropdown
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAddCustomer"
            v-if="false"
          >
            <span>
              <i class="el-icon-plus"></i>
              新建客户
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%" @click.native="bulkImport"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
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
    <!-- 状态切换 -->
    <div class="tabbar-vi">
      <el-tabs v-model="tabStatus" @tab-click="handleClicks">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <el-tab-pane label="未分配" value="50" name="50"></el-tab-pane>
        <el-tab-pane label="已分配" value="20" name="20"></el-tab-pane>
        <el-tab-pane label="停止服务客户" value="10" name="10"></el-tab-pane>
        <!-- <el-tab-pane
          v-for="item in dispatchStateList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
        ></el-tab-pane> -->
        <!-- <el-tab-pane label="审核通过" value="20" name="20"> </el-tab-pane>
        <el-tab-pane label="审核未通过" value="30" name="30"></el-tab-pane>
        <el-tab-pane label="待审核服务" value="10" name="10"></el-tab-pane>
        <el-tab-pane
          label="未分配"
          value="40"
          name="40"
          v-if="roles.indexOf('customerServiceSupervisor') !== -1"
        ></el-tab-pane> -->
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

    <!-- 表格 -->
    <div class="account-table table-data">
      <el-table
        v-loading="loading"
        :data="BusinessList"
        :height="tableHeight"
        @selection-change="handleSelectionChange"
        class="agentForm"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column
          label="服务项目"
          align="left"
          prop="serpriceName"
          width="150"
        /> -->
        <el-table-column label="序号" align="left" prop="id" width="50" />
        <el-table-column label="公司名称" prop="companyName" width="220">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="scope.row.flowStatus == 10"
              @click="showDrawer(scope.row)"
              style="width:100%;text-align:left"
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
                  v-for="item in scope.row.crmIntermUserlabelResults"
                  :key="item.id"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <!-- <el-table-column width="380px">
          <template slot="header">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-input-number
                  v-model="queryParams.year"
                  class="calculator"
                  :min="1900"
                  :max="2100"
                  @change="getList"
                ></el-input-number>
              </el-col>
            </el-row>
            <el-row :gutter="24" class="colorBox">
              <el-col :span="8">
                <div><span style="background:#2DD199"></span>已确认</div>
              </el-col>
              <el-col :span="8">
                <div><span style="background:#F3A35F"></span>待确认</div>
              </el-col>
              <el-col :span="8">
                <div><span style="background:#EF5465"></span>未收费</div>
              </el-col>
            </el-row>
          </template>
          <template slot-scope="scope">
            <el-row class="statusMonth">
              <el-col
                :span="2"
                v-for="(item, index) in monthFun(scope.row, queryParams.year)"
                :key="index"
              >
                <div
                  style="text-align:center"
                  :class="
                    item.auditStatus == 20
                      ? 'bggreen'
                      : item.types == 30
                      ? ''
                      : item.auditStatus == 10
                      ? 'bgyellow'
                      : item.auditStatus == 30
                      ? 'bgred'
                      : item.state == 10
                      ? 'bgred'
                      : ''
                  "
                >
                  {{ item.name }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column> -->
        <el-table-column label="合同起始日期" width="180px">
          <template
            slot-scope="scope"
            v-if="scope.row.startTime != '' || scope.row.endTime != ''"
          >
            {{
              scope.row.endTime
                ? parseTime(scope.row.startTime, "{y}-{m}-{d} ") +
                  "—" +
                  parseTime(scope.row.endTime, "{y}-{m}-{d} ")
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="派工信息"
          align="center"
          :formatter="dispatchingSortFormat"
          width="340"
        >
          <template slot-scope="scope">
            <el-row
              :gutter="2"
              class="dispatchSteps"
              type="flex"
              justify="space-between"
            >
              <el-col
                :span="6"
                :class="
                  scope.row.createBy
                    ? ' bgorange'
                    : 'bggrey'
                "
              >
                <div>业</div>
              </el-col>
              <div style="margin-right:2px">{{ scope.row.createBy }}</div>
              <el-col
                :span="6"
                :class="
                  scope.row.customerServiceName
                    ? ' bgorange'
                    : 'bggrey'
                "
              >
                <div>客</div>
              </el-col>
              <div style="margin-right:2px">
                {{ scope.row.customerServiceName }}
              </div>
              <el-col
                :span="6"
                :class="
                  scope.row.foreignAccountName
                    ? ' bgorange'
                    : 'bggrey'
                "
              >
                <div>账</div>
              </el-col>
              <div style="margin-right:2px">
                {{ scope.row.foreignAccountName }}
              </div>
              <el-col
                :span="6"
                :class="
                  scope.row.foreignAccountName
                    ? ' bgorange'
                    : 'bggrey'
                "
              >
                <div>税</div>
              </el-col>
               <div style="margin-right:2px">
                {{ scope.row.foreignAccountName }}
              </div>
              <el-col :span="3"> </el-col>
            </el-row>
            <!-- <el-row :gutter="2" type="flex" justify="space-between">
              <el-col :span="6">
                {{ scope.row.createBy }}
              </el-col>
              <el-col :span="6">
                {{ scope.row.customerServiceName }}
              </el-col>
              <el-col :span="6">
                {{ scope.row.foreignAccountName }}
              </el-col>
              <el-col :span="6"> </el-col>
            </el-row> -->
          </template>
        </el-table-column>
        <el-table-column label="本期应收金额" prop="money" />
        <el-table-column label="跟进记录" prop="dispatchState" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :disabled="
                (scope.row.flowStatus == 10 && roles.indexOf('boss') == -1) ||
                  (scope.row.service == '' && roles.indexOf('boss') == -1)
              "
              @click="followUp(scope.row)"
              v-hasPermi="['share:bank:edit']"
              >跟进记录</el-button
            >
          </template>
        </el-table-column>

        <el-table-column label="票据记录" prop="dispatchState" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :disabled="
                (scope.row.flowStatus == 10 && roles.indexOf('boss') == -1) ||
                  (scope.row.service == '' && roles.indexOf('boss') == -1)
              "
              v-if="!scope.row.pjAuditStatus"
              style="color:#3978E7"
              @click="handleRecord(scope.row)"
              v-hasPermi="['share:bank:edit']"
              >票据记录</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="scope.row.pjAuditStatus==20"
              style="color:#67C23A"
              :disabled="
                (scope.row.flowStatus == 10 && roles.indexOf('boss') == -1) ||
                  (scope.row.service == '' && roles.indexOf('boss') == -1)
              "
              @click="handleRecord(scope.row)"
              v-hasPermi="['share:bank:edit']"
              >票据记录</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="scope.row.pjAuditStatus==30"
              style="color:red"
              :disabled="
                (scope.row.flowStatus == 10 && roles.indexOf('boss') == -1) ||
                 (scope.row.service == '' && roles.indexOf('boss') == -1)
              "
              @click="handleRecord(scope.row)"
              v-hasPermi="['share:bank:edit']"
              >票据记录</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="最近跟进时间" prop="recentlyTime" />

        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          width="180px"
        >
          <template slot-scope="scope">
            <el-row>
              <el-col :span="12" v-if="scope.row.flowStatus != 10">
                <el-button
                  type="text"
                  size="mini"
                  :class="scope.row.flowStatus == 10 ? 'active' : ''"
                  @click="handleDispatch(scope.row)"
                  v-if="roles.indexOf('customerServiceSupervisor') !== -1"
                  :disabled="scope.row.flowStatus == 10"
                  v-hasPermi="['share:bank:edit']"
                >
                  {{ scope.row.service == "" ? "派工" : "重新派工" }}</el-button
                >
              </el-col>

              <!-- v-if="
                    (roles.indexOf('customerServiceSupervisor') != -1 &&
                      scope.row.service == '') ||
                      (roles.indexOf('customerServiceClerk') != -1 &&
                        scope.row.serviceClerk == '')
                  " -->
              <el-col :span="12" v-if="scope.row.flowStatus != 10">
                <el-button
                  type="text"
                  size="mini"
                  :class="
                    (scope.row.flowStatus == 10 &&
                      roles.indexOf('boss') == -1) ||
                    (scope.row.service == '' && roles.indexOf('boss') == -1)
                      ? 'active'
                      : ''
                  "
                  :disabled="
                    (scope.row.flowStatus == 10 &&
                      roles.indexOf('boss') == -1) ||
                      (scope.row.service == '' && roles.indexOf('boss') == -1)
                  "
                  @click="handleCollection(scope.row)"
                  v-hasPermi="['share:bank:edit']"
                  >收费</el-button
                >
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-if="scope.row.flowStatus != 10">
                <el-button
                  type="text"
                  size="mini"
                  v-hasPermi="['share:bank:edit']"
                  @click="handleSign(scope.row.companyId,scope.row)"
                >
                  标记</el-button
                >
              </el-col>
              <el-col :span="12" v-if="scope.row.flowStatus != 10">
                <el-button
                  type="text"
                  style="color:#EF5465"
                  size="mini"
                  @click="OutOfService(scope.row)"
                  v-if="
                    scope.row.flowStatus == 20 && roles.indexOf('boss') == -1
                  "
                  v-hasPermi="['share:bank:edit']"
                  >停止服务</el-button
                >
              </el-col>
              <el-col :span="12" v-if="scope.row.flowStatus == 10">
                <el-button
                  type="success"
                  @click="handleActivation(scope.row.id)"
                >
                  激活
                </el-button>
              </el-col>
              <el-col :span="12" v-if="scope.row.flowStatus == 10">
                <el-button
                  type="primary"
                  @click="seeWhy(scope.row.reasonStopping)"
                >
                  查看原因
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column class-name="table-control" fixed="right" width="100px">
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
        v-if="queryParams.dispatchState !== '10'"
      />
    </div>
    <!-- 标记 -->
    <el-dialog
      title="标记"
      :visible.sync="signShow"
      width="705px"
      append-to-body
    >
      <el-row>
        <el-col :span="10">
          <div class="sign">
            <div>全部标签</div>
            <div style="height:404px;overflow:auto">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-checked-keys="departmentId"
                default-expand-all
                @check-change="handleCheckChange"
                :expand-on-click-node="false"
              >
                <span
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                  style="padding-right:10px;display:flex;justify-content:space-between;width: 100%;"
                >
                  <span v-show="!data.isEdit">
                    <span
                      :class="[data.id >= 99 ? 'slot-t-node--label' : '']"
                      >{{ node.label }}</span
                    >
                  </span>

                  <span v-show="data.isEdit">
                    <el-input
                      class="slot-t-input"
                      size="mini"
                      style="width:100px"
                      autofocus
                      v-model="data.label"
                      :ref="'slotTreeInput' + data.id"
                      @blur.stop="NodeBlur(node, data)"
                      @keydown.native.enter="NodeBlur(node, data)"
                    >
                    </el-input>
                  </span>

                  <span>
                    <i
                      v-if="node.level == 1"
                      class="el-icon-circle-plus-outline tagIcon"
                      @click="append(data)"
                      style="margin-left: 5px"
                    >
                    </i>
                    <i
                      class="el-icon-edit tagIcon"
                      @click="Edit(node, data)"
                      style="margin-left: 5px"
                    >
                    </i>
                    <i
                      class="el-icon-delete tagIcon"
                      @click="remove(node, data)"
                      style="margin-left: 5px"
                    >
                    </i>
                  </span>
                </span>
              </el-tree>
              <!-- 单选 -->
              <el-tree
                :data="treeData"
                show-checkbox
                node-key="id"
                ref="singleTree"
                :default-checked-keys="departId"
                default-expand-all
                @check-change="handleChange"
                :expand-on-click-node="false"
                :check-strictly="true"
                :props="prods"
              >
                <span
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                  style="padding-right:10px;display:flex;justify-content:space-between;width: 100%;"
                >
                  <span v-show="!data.isEdit">
                    <span
                      :class="[data.id >= 99 ? 'slot-t-node--label' : '']"
                      >{{ node.label }}</span
                    >
                  </span>

                  <span v-show="data.isEdit">
                    <el-input
                      class="slot-t-input"
                      size="mini"
                      style="width:100px"
                      autofocus
                      v-model="data.label"
                      :ref="'slotTreeInput' + data.id"
                      @blur.stop="NodeBlur(node, data)"
                      @keydown.native.enter="NodeBlur(node, data)"
                    >
                    </el-input>
                  </span>

                  <span>
                    <i
                      v-if="node.level == 1"
                      class="el-icon-circle-plus-outline tagIcon"
                      @click="treeAppend(data)"
                      style="margin-left: 5px"
                    >
                    </i>
                    <i
                      class="el-icon-edit tagIcon"
                      @click="treeEdit(node, data)"
                      style="margin-left: 5px"
                    >
                    </i>
                    <i
                      class="el-icon-delete tagIcon"
                      @click="treeRemove(node, data)"
                      style="margin-left: 5px"
                    >
                    </i>
                  </span>
                </span>
              </el-tree>
            </div>
            <div
              @click="addGroup"
              v-if="roles.indexOf('customerServiceClerk') == -1"
            >
              <i class="el-icon-plus"></i>新增组
            </div>
          </div>
        </el-col>
        <el-col
          :span="2"
          style=" text-align: center;
           line-height: 480px;color:#6E7073; "
        >
          <i class="el-icon-d-arrow-right"></i>
        </el-col>
        <el-col :span="10">
          <div class="sign">
            <div>已选标签</div>
            <div style="height:446px;">
              <div
                v-for="(item, index) in arr"
                :key="index"
                style=" padding:5px 15px 5px 15px;display:flex;justify-content:space-between"
              >
                <span>{{ item.label }} </span>
                <span>
                  <i
                    class="el-icon-delete tagIcon"
                    @click="setCheckedNodes(item, index)"
                    style="margin-left: 5px;cursor:pointer;"
                  >
                  </i>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="signShow = false">取消</el-button>
        <el-button type="primary" @click="getCheckedNodes()"  :disabled="action">确认</el-button>
      </div>
    </el-dialog>
    <!-- 新增标记组别 -->
    <el-dialog title="新增分组" :visible.sync="signGroupShow" width="505px">
      <el-input v-model="group"> </el-input>
      <div style="margin-top:10px;display:flex;">
        <span style="line-height:32px;margin-right:20px">选择方式:</span>
        <span>
          <el-radio-group v-model="singleChoice">
            <el-radio
              v-for="item in choiceModeList"
              :key="item.dictCode"
              :label="item.dictCode"
              :value="item.dictCode"
            >
              {{ item.dictName }}</el-radio
            >
          </el-radio-group>
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="signGroupShow = false">取消</el-button>
        <el-button type="primary" @click="newGroup">确认</el-button>
      </div>
    </el-dialog>

    <!-- 收费 -->
    <el-dialog
      title="收费详情"
      :visible.sync="collection"
      width="500px"
      append-to-body
      class="charge"
      @close="resetForm"
    >
      <el-dialog
        width="30%"
        title="修改回款计划"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form :model="paymentForm" ref="templateSelections" :rules="rules">
          <el-form-item label="服务项" prop="serpriceName">
            <el-input
              v-model="templateSelection.serpriceName"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="从几月开始修改" prop="payBackTime">
            <el-date-picker
              v-model="paymentForm.payBackTime"
              type="month"
              placeholder="请选择从几月开始修改"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收费周期" prop="cycleType">
            <el-select
              v-model="paymentForm.cycleType"
              placeholder="请选择收费周期"
            >
              <el-option
                v-for="item in feesCycleList"
                :label="item.dictLabel"
                :key="item.dictCode + 'j'"
                :value="item.dictCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCancel">取消</el-button>
          <el-button type="primary"

          @click="paymentCollection"
            >确认修改</el-button
          >
        </div>
      </el-dialog>

      <el-row :gutter="24">
        <el-col :span="24">
          <div class="tabbar-vi">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                label="收费登记"
                value=""
                name="first"
                class="feeRegistration"
              >
                <div>
                  <span>收费登记</span>
                  <el-button
                    type="primary"
                    plain
                    @click="modify"
                    :disabled="action"
                    v-if="
                      roles.indexOf('customerServiceSupervisor') !== -1
                        ? !(action == '')
                        : roles.indexOf('boss') == -1
                        ? true
                        : false
                    "
                    >修改回款计划</el-button
                  >
                </div>
                <div>
                  <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :data="feeRegistration"
                    show-summary
                    @selection-change="handlemultipleTableChange"
                    class="agentForm"
                  >
                    <!-- <el-table-column
                      type="selection"
                      width="55"
                      :selectable="checkSelectable"
                    /> -->
                    <!-- <el-table-column width="45">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.id"
                          v-model="radios"
                          :disabled="scope.row.state == 20"
                          @change.native="getCurrentRow(scope.row)"
                          >{{ " " }}
                        </el-radio>
                      </template>
                    </el-table-column>-->
                    <el-table-column label="服务项" prop="serpriceName" />
                    <el-table-column label="已收情况" width="100px">
                      <template slot-scope="scope">
                        <!-- <span
                          :class="scope.row.state == 20 ? 'danger' : 'error'">
                          {{ scope.row.state == 20 ? "待审核" : "未收" }}
                        </span> -->
                        <span
                          :class="
                            scope.row.auditStatus == 30
                              ? 'error'
                              : scope.row.auditStatus == 20
                              ? 'success'
                              : scope.row.auditStatus == 10
                              ? 'danger'
                              : scope.row.state == 10
                              ? 'error'
                              : ''
                          "
                        >
                          {{
                            scope.row.auditStatus == 30
                              ? "审核失败"
                              : scope.row.auditStatus == 20
                              ? "已收"
                              : scope.row.auditStatus == 10
                              ? "待审核"
                              : scope.row.state == 10
                              ? "未收"
                              : ""
                          }}
                        </span>
                        <span
                          style="display: inline-block; width: 14px;
                    height: 14px;text-align: center;
                    border-radius: 50%;
                    border: 1px solid #3978E7; color:#3978E7;font-size: 10px; margin-left:5px;
                    line-height: 12px;cursor:pointer;"
                          v-if="scope.row.auditStatus == 30"
                          @click="handleDetails(scope.row)"
                          >?</span
                        >
                      </template>
                    </el-table-column>
                    <el-table-column label="服务时间" prop="receiptTime">
                      <template slot-scope="scope">
                        {{ parseTime(scope.row.receiptTime, "{y}-{m}-{d}") }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="实际应收"
                      prop="currentRepaymentAmount"
                    />
                    <el-table-column
                      label="优惠金额"
                      prop="discountAmountTotal"
                    />
                    <el-table-column
                      label="已收金额"
                      prop="actualPaymentAmount"
                    />
                    <el-table-column label="未收金额" prop="amountInArear" />
                    <el-table-column label="登记人" prop="payingUserName" />
                  </el-table>
                </div>
                <div class="billOne">
                  <el-form
                    ref="templateSelection"
                    :model="templateSelection"
                    :rules="orderRules"
                  >
                    <el-row :gutter="24">
                      <!-- <el-col :span="12">
                        <el-form-item label="收款金额" prop="advanceActualAmount">
                          <el-input
                            v-model.number="templateSelection.advanceActualAmount"
                            type="text"
                            placeholder="请输入预收金额"
                          ></el-input>
                        </el-form-item>
                      </el-col> -->
                      <el-col :span="12">
                        <el-form-item label="付款方式" prop="patternPayment">
                          <el-select
                            v-model="templateSelection.paymentMethod"
                            @change="payment(templateSelection.paymentMethod)"
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
                            v-model="templateSelection.payCode"
                            @change="handleCityCodeChange"
                          >
                          </el-cascader>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="收款户名" prop="accountName">
                          <el-select
                            v-model="templateSelection.accountName"
                            @change="
                              accountNameChange(templateSelection.accountName)
                            "
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
                            v-model="templateSelection.account"
                            placeholder="请选择付款账户"
                            @change="selectPlatform(templateSelection.account)"
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
                      <el-col
                        :span="12"
                        v-if="templateSelection.bankType == 10"
                      >
                        <el-form-item label="开户行" prop="accountBank">
                          <el-select
                            v-model="templateSelection.accountBank"
                            placeholder="请选择开户行"
                            @change="BankChange(templateSelection.accountBank)"
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
                            v-model="templateSelection.account"
                            placeholder="请输入付款账户"
                          ></el-input>
                        </el-form-item>
                      </el-col> -->
                      <!-- </el-row>
                    <el-row> -->
                      <el-col :span="12">
                        <el-form-item label="支付时间" prop="practicalTime">
                          <!-- <template slot-scope="scope"> -->
                          <el-date-picker
                            v-model="templateSelection.practicalTime"
                            type="datetime"
                            @change="advanceUpdate"
                            placeholder="请选择支付时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                          >
                          </el-date-picker>
                          <!-- </template> -->
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="费用说明" prop="remarks">
                      <el-input
                        type="textarea"
                        v-model="templateSelection.remarks"
                        :rows="3"
                      ></el-input>
                    </el-form-item>

                    <el-form-item label="上传文件">
                      <el-upload
                        ref="uploadCharge"
                        class="upload-file"
                        :headers="headers"
                        :action="uploadUrl"
                        :data="{ type: 10 }"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="
                          (response, file, fileList) =>
                            uploadSuccess(response, file, fileList, 30)
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
                  </el-form>
                </div>
                <div class="dialog-footer">
                  <el-button @click="cancel">取消</el-button>
                  <el-button
                    type="primary"
                    :disabled="action"
                    @click="confirmCharge"
                    v-if="
                      roles.indexOf('customerServiceSupervisor') !== -1
                        ? !(action == '')
                        : roles.indexOf('boss') == -1
                        ? true
                        : false
                    "
                    >确认收费</el-button
                  >
                </div>
              </el-tab-pane>
              <el-tab-pane
                label="联系人"
                value=""
                name="second"
                class="contacts"
              >
                <edit-contact
                  :contactsList="contactList"
                  :pId="companyId"
                  :getContacts="getContacts"
                ></edit-contact>
              </el-tab-pane>

              <el-tab-pane label="合同" value="" name="third" class="contract">
                <div class="contract_vi">
                  <!-- 合同列表渲染 -->
                  <div class="contract_list">
                    <div class="child">
                      <div class="title">
                        <div class="link"></div>
                        <div class="font">
                          {{ "合同编号:" + contractList.controlNo }}
                        </div>
                        <el-button
                          type="warning"
                          @click.native="renew(contractList)"
                          size="mini"
                          plain
                          v-if="!(contractList.accountType == 10)"
                          :disabled="contractList.renewType == 10"
                          >续费</el-button
                        >
                      </div>
                      <el-row class="kind">
                        <el-col :span="10">
                          <div class="name">
                            <span
                              >签单人:
                              <span class="span">{{
                                contractList.createBy
                              }}</span></span
                            >
                            <span
                              >签约日期:<span class="span">{{
                                parseTime(
                                  contractList.signingDate,
                                  "{y}-{m}-{d}"
                                )
                              }}</span></span
                            >
                            <span
                              >合同有效期:<span class="span"
                                >{{
                                  parseTime(
                                    contractList.startTime,
                                    "{y}-{m}-{d}"
                                  )
                                }}至{{
                                  parseTime(contractList.endTime, "{y}-{m}-{d}")
                                }}
                              </span>
                            </span>
                          </div>
                        </el-col>
                        <el-col :span="10">
                          <div class="name">
                            <span
                              >服务项目:<span class="span">{{
                                contractList.serpriceName
                              }}</span></span
                            >
                            <span
                              >合同金额:<span class="color span"
                                >￥{{ contractList.money }}</span
                              ></span
                            >
                            <span
                              >收费周期:<span class="span">{{
                                contractList.cycleType == 10
                                  ? "按月收费"
                                  : contractList.cycleType == 20
                                  ? "按季度收费"
                                  : contractList.cycleType == 30
                                  ? "按半年收费"
                                  : contractList.cycleType == 40
                                  ? "按年收费"
                                  : ""
                              }}</span></span
                            >
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div class="name">
                            <span>合同照片</span>
                            <span
                              v-for="val in contractList.marketCompbusiImgfileResults"
                              :key="val.id"
                            >
                              <el-image
                                fit="cover"
                                :src="fileUrl + val.url"
                                :preview-src-list="
                                  contractList.marketCompbusiImgfileResults.map(
                                    ite => {
                                      return fileUrl + ite.url;
                                    }
                                  )
                                "
                              ></el-image>
                            </span>

                            <span></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-row :gutter="24">
                <el-col :span="8"> </el-col>
                <el-col :span="8"> </el-col>
                <el-col :span="8"> </el-col>
              </el-row>
              <el-tab-pane
                label="订单"
                value=""
                name="fourth"
                class="orderForm"
              >
                <div>
                  <div @click="newOrders()" style="cursor:pointer;">
                    <i class="el-icon-plus"></i>新增订单
                  </div>

                  <div>
                    <el-table v-loading="loading" :data="orderList">
                      <el-table-column label="订单编号" prop="orderNo" />
                      <el-table-column label="服务项目" prop="serpriceName" />
                      <el-table-column
                        label="订单状态"
                        :formatter="auditorStateFormat"
                      />

                      <el-table-column label="签单日期" prop="createDate" />

                      <el-table-column label="订单金额" prop="totalMoney" />
                      <el-table-column label="签单人" prop="createBy" />
                    </el-table>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 审核详情 -->
    <el-dialog
      title="财务审核详情"
      :visible.sync="AuditDetailShow"
      width="516px"
      append-to-body
      class="orderReview"
    >
      <el-form
        ref="auditDetailsForm"
        :model="auditDetailsForm"
        :rules="orderRules"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <div style="font-size:16px">
              <i class="el-icon-school" style="margin-right:10px" />客户名称：{{
                auditDetailsForm.companyName
              }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-divider></el-divider>
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
                v-if="auditDetailsForm.status == 20"
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
              <span class="price">{{ auditDetailsForm.remark }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{ auditDetailsForm.time }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{ auditDetailsForm.name }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="dialogCancel">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 跟进记录 -->
    <el-dialog
      title="跟进记录"
      :visible.sync="followUpShow"
      width="704px"
      append-to-body
      class="followUpStyle"
    >
      <!-- <el-dialog
        width="704px"
        title="添加跟进记录"
        :visible.sync="addTrackRecord"
        append-to-body
        @close="resetForm"
      > -->
      <div
        style="background:#fff;padding-left:24px;padding:24px;margin-bottom:20px"
      >
        <el-form :model="followForm" ref="followForm" :rules="followRules">
          <el-form-item label="本次跟进方式" prop="type">
            <el-select
              v-model="followForm.type"
              class="mw222"
              placeholder="请选择跟进方式"
            >
              <el-option
                v-for="item in followTypeList"
                :key="item.dictCode + 'a'"
                :label="item.dictName"
                :value="item.dictCode"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="本次跟进记录" prop="theContent">
            <el-input
              type="textarea"
              v-model="followForm.theContent"
              :rows="2"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传附件" prop="fileIds">
            <el-upload
              class="upload-file"
              ref="uploadFollow"
              :headers="headers"
              :action="uploadRecordUrl"
              :data="{ type: 40 }"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="
                (response, file, fileList) =>
                  uploadSuccess(response, file, fileList, 10)
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
          <el-form-item label="下次提醒时间" prop="nextDate">
            <el-row>
              <el-col :span="12">
                <el-date-picker
                  v-model="followForm.nextDate"
                  align="right"
                  type="datetime"
                  placeholder="请选择提醒时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="下次跟进内容" prop="nextContent">
            <el-input
              type="textarea"
              v-model="followForm.nextContent"
              :rows="2"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div style="display:flex;justify-content: flex-end;">
          <el-button @click="dialogCancel">取消</el-button>
          <el-button type="primary" @click="addNowFollow" :disabled="action">立即添加</el-button>
        </div>
      </div>
      <!-- </el-dialog> -->
      <el-row :gutter="24">
        <el-col :span="12">
          <div style="font-size:16px">
            <i class="el-icon-school" style="margin-right:10px" />
            客户名称：{{ form.companyName }}
          </div>
        </el-col>
      </el-row>
      <div class="followRecord">
        <!-- <div>  -->

        <!-- </div> -->
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="bgfff remind">
              <!-- <div class="addFollow">
                <el-button
                  class="add-button "
                  icon="el-icon-plus"
                  @click="addTo"
                  v-if="roles.indexOf('boss') == -1"
                  >添加跟进记录</el-button
                >
              </div> -->
              <div
                class="business"
                v-for="item in followRecord"
                :key="item.id + 'n'"
              >
                <div>
                  <img :src="item.url" />
                  <div>
                    <span
                      ><span style="color:#3978E7">{{ item.createBy }}</span
                      ><span
                        >通过{{
                          item.type == 10
                            ? "电话跟进"
                            : item.type == 20
                            ? "微信跟进"
                            : item.type == 30
                            ? "现场跟进"
                            : item.type == 40
                            ? "其他"
                            : ""
                        }}</span
                      ><span>{{ item.createDate }}</span></span
                    >
                    <span>{{ item.theContent }}</span>
                    <div class="imgStyle">
                      <span
                        v-for="val in item.recordImgParamList"
                        :key="val.id"
                      >
                        <el-image
                          fit="cover"
                          :src="fileUrl + val.url"
                          :preview-src-list="
                            item.recordImgParamList.map(ite => {
                              return fileUrl + ite.url;
                            })
                          "
                        />
                      </span>
                    </div>
                    <div class="businessBottom">
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
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirmAudit">确认审核</el-button>
      </div> -->
    </el-dialog>

    <!-- 停止服务 -->
    <el-dialog title="停止服务原因" :visible.sync="stopShow" width="30%">
      <el-form :model="stopForm" ref="stopForm" :rules="stopFormRules">
        <el-form-item prop="remark">
          <el-input
            v-model="stopForm.remark"
            type="textarea"
            :rows="5"
            placeholder="请输入停止服务原因"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="cease">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看停止服务原因 -->
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
    <!-- 票据记录 -->
    <el-dialog
      title="票据记录"
      :visible.sync="billRecord"
      width="500px"
      append-to-body
      class="billRecord"
      @close="resetForm"
    >
      <el-dialog
        width="50%"
        title="补充材料"
        class="billRecordinner"
        :visible.sync="supplementaryMaterials"
        append-to-body
      >
        <el-form :model="supplementaryForm" ref="supplementaryForm">
          <div
            v-for="(item, index) in supplementaryList"
            :key="index + 'm'"
            class="box-a"
          >
            <span class="delDutton">
              <i class="el-icon-circle-close " @click="delimg(item, index)"></i
            ></span>

            <el-image
              fit="cover"
              style="width:50%; margin-bottom:10px"
              :src="fileUrl + item.url"
              :preview-src-list="
                supplementaryList.map(ite => {
                  return fileUrl + ite.url;
                })
              "
            ></el-image>
          </div>
          <el-upload
            class="upload-file"
            ref="uploadBills"
            :headers="headers"
            :action="uploadUrl"
            :data="{ type: 10 }"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="
              (response, file, fileList) =>
                uploadSuccess(response, file, fileList, 50)
            "
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button>上传附件</el-button>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCancel">取消</el-button>
          <el-button type="primary" @click="affirm">确认</el-button>
        </div>
      </el-dialog>
      <el-form :model="billForm" ref="billForm" :rules="rules">
        <el-row :gutter="24">
          <el-col :span="24">
            <div style="font-size:16px">
              <i class="el-icon-school" style="margin-right:10px" />客户名称：{{
                billForm.companyName
              }}
            </div>
          </el-col>
        </el-row>
        <div class="billOne">
          <el-form-item label="客户名称" prop="companyName">
            <el-input v-model="billForm.companyName" disabled>{{
              billForm.companyName
            }}</el-input>
          </el-form-item>

          <el-form-item label="票据类型" prop="billType">
            <el-select
              v-model="billForm.billType"
              placeholder="请选择票据类型 "
              clearable
              size="small"
            >
              <el-option
                v-for="item in billType"
                :key="item.dictCode + 'e'"
                :value="item.dictName"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="任务内容" prop="remark">
            <el-input
              type="textarea"
              :rows="3"
              v-model="billForm.remark"
            ></el-input>
          </el-form-item>

          <el-form-item label="上传文件">
            <el-upload
              class="upload-file"
              ref="uploadBill"
              :headers="headers"
              :action="uploadUrl"
              :data="{ type: 10 }"
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
          <el-form-item>
            <el-button
              type="primary"
              @click="addNow"
              :disabled="action"
              v-if="
                roles.indexOf('customerServiceSupervisor') !== -1
                  ? !(action == '')
                  : roles.indexOf('boss') !== -1
                  ? false
                  : true
              "
              >立即添加</el-button
            >

            <el-button @click="resetBillForm">重置</el-button>
          </el-form-item>
        </div>
        <div v-for="item in billRecordFrom" :key="item.id">
          <el-row :gutter="24">
            <el-col :span="24">
              <div class="bgfff remind">
                <div class="business">
                  <div>
                    <img src="@/assets/image/blueLight.png" class="touxiang" />
                    <div>
                      <span
                        ><span style="color:#3978E7">{{ item.createBy }}</span
                        ><span>{{ item.createDate }}</span></span
                      >
                      <span>{{ item.remark }}</span>
                      <div class="imgStyle">
                        <span
                          v-for="val in item.crmBillImgResultList"
                          :key="val.id"
                          ><el-image
                            fit="cover"
                            :src="fileUrl + val.url"
                            :preview-src-list="
                              item.crmBillImgResultList.map(ite => {
                                return fileUrl + ite.url;
                              })
                            "
                          />
                        </span>
                      </div>
                      <div class="businessBottom">
                        <div>
                          <span>票据类型</span>
                          <span>{{ item.billType }}</span>
                        </div>
                        <div>
                          <span>审核结果</span>
                          <span
                            ><el-tooltip placement="bottom" effect="light">
                              <div slot="content">{{ item.auditRemark }}</div>
                              <span
                                style="cursor:pointer"
                                :class="
                                  item.auditStatus == 30
                                    ? 'error'
                                    : item.auditStatus == 20
                                    ? 'success'
                                    : item.auditStatus == 10
                                    ? 'danger'
                                    : ''
                                "
                                >{{
                                  item.auditStatus == 20
                                    ? "通过"
                                    : item.auditStatus == 30
                                    ? "未通过"
                                    : item.auditStatus == 10
                                    ? "待审核"
                                    : ""
                                }}</span
                              >
                            </el-tooltip></span
                          >
                        </div>
                        <div>
                          <el-button
                            type="primary"
                            plain
                            @click="supplement(item)"
                            v-if="
                              roles.indexOf('customerServiceSupervisor') !== -1
                                ? !(action == '')
                                  ? item.auditStatus == 30
                                    ? true
                                    : false
                                  : item.auditStatus == 30
                                : roles.indexOf('boss') == -1
                                ? item.auditStatus == 30
                                : false
                            "
                            >补充材料</el-button
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-dialog>

    <!-- 新增订单 -->
    <el-dialog
      title="新增订单--选择服务产品"
      :visible.sync="newOrderVisible"
      width="704px"
      class="newOrders"
    >
      <div class="el-icon-office-building mt10">
        {{ templateSelection.companyName }}
      </div>
      <el-divider></el-divider>
      <el-form
        ref="orderform"
        :model="form"
        :rules="rules"
        :label-position="labelPositions"
        label-width="80px"
        maxHeight="612px"
        class="chengjiao"
      >
        <div>
          <el-row :gutter="24">
            <el-col>
              <el-input
                v-model="proTypeName"
                placeholder="请输入服务产品"
                clearable
                size="small"
                style="width: 240px"
                suffix-icon="el-icon-search"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="请选择一个服务产品:">
                <el-row :gutter="20" style="margin-top: -10px">
                  <el-col v-for="item in proTypeOption" :span="8" :key="item.index">
                    <div class="type_item" @click="toOrderFun(item)">
                      <span>
                        {{ item.name }}
                      </span>
                      <el-button type="primary" size="mini">
                        选择并创建合同订单
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>

          <!--          <el-row :gutter="24">-->
          <!--            <el-col>-->
          <!--              <el-form-item label="创建新的服务产品:">-->
          <!--                <el-input v-model="form.district" placeholder="请选择行业分类" />-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->
          <!--          </el-row>-->
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取消 </el-button>
      </div>
    </el-dialog>

    <!-- 派工 -->
    <el-dialog
      :title="title"
      :visible.sync="dispatchDialog"
      width="500px"
      append-to-body
      class="orderAllocation"
      @close="handleShut"
    >
      <!-- <el-form ref="distributionForm" :model="distributionForm" :rules="rules">
        <el-row :gutter="14">
          <el-col :span="12">
            <el-form-item label="部门" prop="role">
              <el-row>
                <el-input
                  class="department"
                  :readonly="true"
                  v-model="kefu.role"
                  style="margin-bottom:10px; boder:none;"
                />
                <el-input
                  class="department"
                  :readonly="true"
                  v-model="waizhang.extRole"
                  style="margin-bottom:10px; boder:none;"
                />
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门人员" prop="userId">
              <el-row>
                <el-select
                  v-model="distributionForm.userId"
                  placeholder="请选择部门员工 "
                  clearable
                  size="small"
                  style="margin-bottom:10px;"
                >
                  <el-option
                    v-for="(item, index) in kefu"
                    :key="index + 'k'"
                    :value="item.userId"
                    :label="item.name"
                    @click.native="handleDepartment(item)"
                  />
                </el-select>

                <el-select
                  v-model="distributionForm.extUserId"
                  placeholder="请选择部门员工 "
                  clearable
                  size="small"
                  style="margin-bottom:10px;"
                >
                  <el-option
                    v-for="(item, index) in waizhang"
                    :key="index + 'k'"
                    :value="item.userId"
                    :label="item.name"
                    @click.native="handleDepartments(item)"
                  />
                </el-select>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form> -->

      <el-form
        ref="distributionForm"
        :model="distributionForm"
        :rules="rules"
        style="margin:0px !important;"
      >
        <el-row :gutter="14">
          <el-col :span="12">
            <el-form-item label="部门">
              <el-row>
                <el-popover
                  ref="popover"
                  style="width:222px !important;display: inline-block;margin-bottom:10px"
                  placement="bottom-start"
                  trigger="click"
                >
                  <el-tree
                    :data="kfDeptOptions"
                    ref="deptTree"
                    show-checkbox
                    node-key="deptId"
                    check-strictly
                    :props="{
                      emitPath: false,
                      checkStrictly: true,
                      label: 'deptName',
                      value: 'deptId',
                      children: 'children'
                    }"
                    @check-change="handleNodeClick"
                  ></el-tree>

                  <el-input
                    slot="reference"
                    ref="input"
                    v-model="distributionForm.role"
                    clearable
                    suffix-icon="el-icon-arrow-down"
                    placeholder="请选择部门"
                  >
                  </el-input>
                </el-popover>
                <!-- <el-cascader
                  v-model="distributionForm.role"
                  :props="{
                    emitPath: false,
                    checkStrictly: true,
                    label: 'deptName',
                    value: 'deptId',
                    children: 'children'
                  }"
                  style="margin-bottom:8px"
                  :options="kfDeptOptions"
                  @change="kfDeptChange"
                ></el-cascader> -->
                <el-popover
                  ref="popover"
                  style="width:222px !important;display: inline-block;"
                  placement="bottom-start"
                  trigger="click"
                >
                  <el-tree
                    :data="wzDeptOptions"
                    ref="roleTree"
                    show-checkbox
                    node-key="deptId"
                    check-strictly
                    :props="{
                      emitPath: false,
                      checkStrictly: true,
                      label: 'deptName',
                      value: 'deptId',
                      children: 'children'
                    }"
                    @check-change="handleDeptClick"
                  ></el-tree>

                  <el-input
                    slot="reference"
                    ref="input"
                    v-model="distributionForm.extRole"
                    clearable
                    suffix-icon="el-icon-arrow-down"
                    placeholder="请选择部门"
                  >
                  </el-input>
                </el-popover>
                <!-- <el-cascader
                  v-model="distributionForm.extRole"
                  :props="{
                    emitPath: false,
                    checkStrictly: true,
                    label: 'deptName',
                    value: 'deptId',
                    children: 'children'
                  }"
                  :options="wzDeptOptions"
                  @change="wzDeptChange"
                ></el-cascader> -->
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门人员" prop="userId">
              <el-select
                v-model="distributionForm.userName"
                placeholder="请选择部门员工 "
                clearable
                size="small"
                style="margin-bottom:8px"
              >
                <!-- @change="handleDepartment" -->
                <el-option
                  v-for="(item, index) in kfDepartmentStaff"
                  :key="index + 'k'"
                  :value="item.name"
                  :label="item.name"
                />
              </el-select>
              <el-select
                v-model="distributionForm.extUserName"
                placeholder="请选择部门员工 "
                clearable
                size="small"
                style="margin-bottom:10px;"
                @change="handleDepartments"
              >
                <el-option
                  v-for="(item, index) in wzDepartmentStaff"
                  :key="index + 'k'"
                  :value="item.name"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="DispatchSubmitForm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增客户 -->
    <el-dialog
      title="新增客户"
      open
      :visible.sync="openCustomer"
      width="704px"
      append-to-body
      class="addCustomer businiss"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="customerRules"
        :label-position="labelPosition"
        class="chengjiao"
      >
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="companyName">
              <el-input
                v-model="form.companyName"
                placeholder="请输入客户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人方式" prop="linkmanPhone">
              <el-input
                v-model="form.linkmanPhone"
                placeholder="请输入联系人方式"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户类型" prop="clientType">
              <el-select v-model="form.clientType" placeholder="请选择客户类型">
                <el-option
                  v-for="item in clientType"
                  :label="item.dictName"
                  :value="item.dictCode"
                  :key="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="客户等级" prop="clientLv">
              <el-select
                class="mw222"
                size="small"
                v-model="form.clientLv"
                placeholder="请选择客户等级"
              >
                <el-option
                  v-for="item in clientLvList"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="增值税" prop="vatCollection">
              <el-select
                v-model="form.vatCollection"
                placeholder="请选择增值税类型"
              >
                <el-option
                  v-for="item in vatTypeList"
                  :label="item.dictName"
                  :value="item.dictCode"
                  :key="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在地区" prop="district">
              <el-cascader
                placeholder="请选择信息所在地区"
                style="width: 100%"
                size="small"
                :options="areaOptions"
                v-model="form.district"
                @change="handleRegionChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="行业分类" prop="industryName">
              <el-cascader
                class="mw100"
                v-model="form.industryName"
                :options="industryMap"
                :props="{ label: 'name', value: 'id', children: 'broadList' }"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户来源" prop="clientSource">
              <el-select
                v-model="form.clientSource"
                placeholder="请选择客户来源"
                ><el-option
                  v-for="item in clientSourceList"
                  :label="item.dictName"
                  :value="item.dictCode"
                  :key="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
        </el-row>
        <!-- 是都在其他公司代账 -->
        <!-- <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="在其他公司代账:" prop="companies">
              <el-radio
                v-for="item in yesNoList"
                v-model="form.companies"
                :key="item.dictCode"
                :label="item.dictCode"
                >{{ item.dictLabel }}</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input
                v-model="form.address"
                style="width: 592px;"
                placeholder="请输入详细地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="标签" prop="userlabelIds">
              <div class="tag-vi">
                <el-tag
                  :key="tag"
                  v-for="tag in form.userlabelIds"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加标签
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <edit-order
      :visible.sync="orderVisible"
      :orderId="orderId"
      :hidden-tab="hiddenTab"
    ></edit-order>
    <edit-drawer
      :visible.sync="drawerVisible"
      :companyId="companyId"
    ></edit-drawer>
    <renew-contract
      :visible.sync="renewals"
      :renewForm="renewForm"
    ></renew-contract>

    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index:2033;"
      v-if="dialogVisible"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
  </div>
</template>

<script>
let id = 1000;
import { mapGetters } from "vuex";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import { CompanyDepartmentPersonnel } from "@/api/crm/finance/customer";
import {
  TaxNature //纳税性质
} from "@/api/crm/finance/myClient";
import { mapState } from "vuex";
import { addClient } from "@/api/crm/customer/customer";
import { throttle } from "@/utils/hmt";
import { getIntermSerpriceList } from "@/api/crm/intermSerprice";
import { addOrder } from "@/api/crm/order";
import { audit } from "../../../../api/crm/businessScheduling/orderReview";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import EditOrder from "@/views/components/EditOrder";
import EditContact from "@/views/components/EditContact";
import EditDrawer from "@/views/components/EditDrawer";
import { getMapIndustry } from "@/api/crm/index"; //行业分类
import RenewContract from "@/views/components/RenewContract";
import {
  BusirSerprice,
  stopService,
  findReturnedMoney,
  MarketBusirSerpriceCharge,
  updateReturned,
  findPaperRecordsList,
  addPaperRecords,
  allocation,
  getPersonnelList,
  delImg,
  replenishMaterials,
  findBillList,
  FollowRecord,
  addFollowRecord,
  FileByCompanyId,
  selectOrderBySerpriceId,
  contractProjectRenewalDetails,
  auditDetailsDisplay,
  MarkEcho,
  checkLabel,
  addLabel,
  delLabel,
  updateLabel,
  exportD,
  Department,
  Staff,
  activation
} from "../../../../api/crm/customerService/agentAccount";
import {
  GetPaymentMethod,
  GetAccountNumber
} from "@/api/crm/createHouseOrder/createHouseOrder";
import Item from "../../../../layout/components/Sidebar/Item.vue";
export default {
  components: {
    EditOrder,
    EditContact,
    EditDrawer,
    RenewContract,
    ElImageViewer,
    Item
  },
  name: "agentAccount",
  props: {
    // 接收绑定参数
    value: {
      required: false,
      default: -1
    },
    // 输入框宽度
    width: String,
    // 输入框占位符
    placeholder: {
      type: String,
      required: false,
      default: "组织架构"
    }
  },
  data() {
    var checkRemark = (rule, value, callback) => {
      if (value === "" && this.orderFrom.status == 30) {
        callback(new Error("请输入审核备注"));
      } else {
        if (this.orderFrom.remark !== "") {
          this.$refs.orderCheckFrom.validateField("checkPass");
        }
        callback();
      }
    };
    const data = [];
    const treeData = [];
    return {
      data: [],
      treeData: [],
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [], //文件上传数据
      headers: { Authorization: _getSessionStore(tokenKey) },
      fileUrl: process.env.VUE_APP_FILE_API,
      uploadUrl: process.env.VUE_APP_BASE_API + "/hmkj-crm/crmBillImg/upload",
      uploadRecordUrl:
        process.env.VUE_APP_BASE_API + "/hmkj-crm/crmRecordImg/upload",
      followDate: [], //跟进时间
      writeTime: [], //票据记录上传日期
      radios: "",
      signId: null,
      dataList: regionData, //下拉菜单数据 存的是所有的数据
      cityList: [], //存储所有的市 和区
      areaList: [], //存储所i有的区
      //支付户名
      accountNameList: [],
      //开户行
      bankOfDepositList: [],
      PaymentNameList: [],
      //新增小组
      group: "",
      //支付类型
      houproPaymentSettingList: [],
      //支付账号
      CollectioAccountList: [],
      //展示选中的小组
      arr: [],
      arrp: [],
      //选中的标签
      departmentId: [],
      departId: [],
      //角色
      roles: [],
      flag: null,
      inputVisible: false,
      //是否分工
      action: "123",
      //标记弹出框
      signShow: false,
      //新增标记组别
      signGroupShow: false,
      //标记新增小组是否单选
      singleChoice: "10",
      //新增客户弹出层
      openCustomer: false,
      industryMap: [], //行业分类
      yesNoList: [],
      choiceModeList: [],
      TaxNatureList: [], //纳税性质
      clientSourceList: [], //客户来源
      vatTypeList: [], //增值税类型
      clientType: [], //客户类型字典
      clientLvList: [], //客户等级字典
      drawerVisible: false, //抽屉显示
      //财务审核详情框
      AuditDetailShow: false,
      //财务审核详情
      auditDetailsForm: {},
      //收费登记确认收费列表
      templateSelection: {},
      labelPositions: "top",
      //派工弹出
      dispatchDialog: false,
      activeName: "first",
      //停止服务原因
      stopShow: false,
      //查看停止服务原因
      stopReasonShow: false,
      stopReason: "",
      stopForm: {},
      //特殊审批状态
      specialApproval: [],
      //订单展示
      orderList: [],
      //联系人列表
      contactList: [],
      //新增联系人列表
      addContactsForm: {},
      //跟进记录弹出
      followUpShow: false,
      //跟进记录列表
      followRecord: {},
      //添加的跟进记录列表
      followForm: {
        classify: 30,
        type: "",
        theContent: "",
        nextDate: "",
        nextContent: ""
      },
      //添加跟进记录
      addTrackRecord: false,
      //续费弹出
      renewals: false,
      //收款弹出
      renewShow: false,
      //续费表单
      renewForm: {},
      //合同数据
      contractList: [],
      //新增订单
      newOrderVisible: false,
      //产品类型数据
      proTypeList: [],
      //查看订单显示
      orderVisible: false,
      orderId: "",
      hiddenTab: true,
      //区域数据
      areaOptions: regionData,
      innerVisible: false,
      //   收费弹出
      collection: false,
      //收费支付时间
      PaymentTime: "",
      //收费状态
      collectionStatus: [],
      feesCycleList: [], //收费周期
      //票据记录弹出
      billRecord: false,
      //补充材料表单
      supplementaryForm: { imageIds: null },
      supplementaryList: [],
      //补充材料
      supplementaryMaterials: false,
      //新增票据记录
      billForm: {},
      //票据回显
      billRecordFrom: {},
      //审核
      orderFrom: {},
      requiredFlag: false,
      //票据类型
      billType: [],
      //表单对齐方式
      labelPosition: "right",
      //单选框默认选项
      radio: "1",
      //调度审核状态
      dispatchState: [],
      //内账审核状态
      auditorState: [],
      //付款方式
      paymentMethod: [],
      //派工执行步骤
      dispatchingSort: [],
      //项目
      marketBusirSerpriceResultList: [],
      //部门员工
      departmentStaff: [],
      kfDepartmentStaff: [],
      wzDepartmentStaff: [],
      kfDeptOptions: [],
      wzDeptOptions: [],
      departmentList: [],
      //部门
      department: [],
      //分配参数
      distributionForm: {
        orderId: null,
        userId: null,
        role: null,
        userName: null,
        productId: null,
        roleCode: null,
        extUserId: null, //外账ID
        extUserName: null, //外账用户名字
        extRole: null, //外账部门名称
        extRoleCode: null ,//外账执行人角色
        tabStatus:'0'
      },
      //客服
      kefu: [],
      //外账
      waizhang: [],
      //跟进分类
      classify: [],
      //跟进方式
      followTypeList: [],
      //修改回款计划
      paymentForm: {
        cycleType: "",
        payBackTime: ""
      },
      //审核状态字典
      dispatchStateList: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      //新增票据数据
      billList: {},
      // 总条数
      total: 0,
      // 商机等级表格数据
      BusinessList: [],
      // 弹出层标题
      title: "",
      //收费登记列表
      feeRegistration: [],
      //公司id
      companyId: null,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        companyId: null,
        bankName: null,
        accountType: "", //服务类别
        bankAccountNumber: null,
        bankAddress: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        year: new Date().getFullYear(),
        kfAuditType: null,
        flowStatus: null,
        service: "",
        area: "",
        county: "",
        outerAccounting: "",
        kFFirmId: "",
        kFDeptId: "",
        kFUserId: "",
        sFollowTime: null,
        eFollowTime: null,
        sBillTime: null,
        eBillTime: null
      },

      // 表单参数
      form: {},
      //停止服务校验
      stopFormRules: {
        remark: [
          {
            required: true,
            message: "停止原因不能为空",
            trigger: "blur"
          }
        ]
      },
      //订单审核校验
      orderRules: {
        remark: [
          {
            message: "审核备注不能为空",
            trigger: "blur"
          }
        ],
        paymentMethod: [
          {
            required: true,
            message: "收款方式不能为空",
            trigger: "change"
          }
        ],
        account: [
          {
            required: true,
            message: "收款账户不能为空",
            trigger: "blur"
          }
          // { type: 'number', message: '收款账户必须为数字'}
        ],
        practicalTime: [
          {
            required: true,
            message: "支付时间不能为空",
            trigger: "change"
          }
        ],
        remarks: [
          {
            required: true,
            message: "费用备注不能为空",
            trigger: "blur"
          }
        ]
      },
      //跟进记录表单验证
      followRules: {
        type: [
          {
            required: true,
            message: "跟进方式不能为空",
            trigger: "change"
          }
        ],
        theContent: [
          {
            required: true,
            message: "本次跟进记录不能为空",
            trigger: "blur"
          }
        ],
        nextDate: [
          {
            required: true,
            message: "下次提醒时间不能为空",
            trigger: "change"
          }
        ],
        nextContent: [
          {
            required: true,
            message: "下次跟进内容不能为空",
            trigger: "blur"
          }
        ]
      },
      // 表单校验
      rules: {
        serpriceName: [
          {
            required: true,
            message: "服务项不能为空",
            trigger: "blur"
          }
        ],
        payBackTime: [
          {
            required: true,
            message: "每月收费时间不能为空",
            trigger: "blur"
          }
        ],
        cycleType: [
          {
            required: true,
            message: "收费周期不能为空",
            trigger: "blur"
          }
        ],
        controlNo: [
          {
            required: true,
            message: "合同编号不能为空",
            trigger: "blur"
          }
        ],
        takeTime: [
          {
            required: true,
            message: "合同生效期不能为空",
            trigger: "blur"
          }
        ],
        renewPrice: [
          {
            required: true,
            message: "合同金额不能为空",
            trigger: "blur"
          }
        ],

        paymentMethod: [
          {
            required: true,
            message: "收款方式不能为空",
            trigger: "blur"
          }
        ],
        accountsReceivable: [
          {
            required: true,
            message: "收款账户不能为空",
            trigger: "blur"
          }
        ],
        chargeNotes: [
          {
            required: true,
            message: "收款备注不能为空",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "任务内容不能为空",
            trigger: "blur"
          }
        ],
        billType: [
          {
            required: true,
            message: "票据类型不能为空",
            trigger: "blur"
          }
        ],
        // companyName: [
        //   {
        //     required: true,
        //     message: "公司名称不能为空",
        //     trigger: "blur"
        //   }
        // ],
        // role: [
        //   {
        //     required: true,
        //     message: "部门不能为空",
        //     trigger: "blur"
        //   }
        // ],
        userName: [
          {
            required: true,
            message: "部门员工为空",
            trigger: "blur"
          }
        ]
      },
      //新增客户表单验证
      customerRules: {
        companyName: [
          {
            required: true,
            message: "客户名称不能为空",
            trigger: "blur"
          }
        ],
        clientType: [
          {
            required: true,
            message: "客户类型不能为空",
            trigger: "blur"
          }
        ],
        // city: [
        //   {
        //     required: true,
        //     message: "所在地不能为空",
        //     trigger: "blur"
        //   }
        // ],
        clientSource: [
          {
            required: true,
            message: "客户来源不能为空",
            trigger: "blur"
          }
        ],

        industryName: [
          {
            required: true,
            message: "行业分类不能为空",
            trigger: "blur"
          }
        ],
        district: [
          {
            required: true,
            message: "信息所在地不能为空",
            trigger: "blur"
          }
        ]
      },
      proTypeName: "",
      proTypeOption: [],
      prods: {
        disabled: (data, node) => {
          // console.info(data, node)
          return data.children && data.children.length > 0 ? true : false;
        }
      },
      singleChecked: [],
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
      // rowAction:false//分配过的数据 只能看不能进行操作
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: state => state.user
    })
  },
  watch: {
    renewals: function(val, oldVal) {
      if (!val) {
        this.getContract(this.templateSelection.id); //合同
      }
    },
    billRecord(val) {
      !val &&
        setTimeout(() => {
          this.$refs["billForm"].resetFields();
        }, 0);
    },
    collection(val) {
      !val &&
        setTimeout(() => {
          this.$refs["templateSelection"].resetFields();
        }, 0);
    }
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
      this.treeWidth = `${(this.width ||
        this.$refs.input.$refs.input.clientWidth) - 24}px`;
    });
    //调度审核状态
    this.getDicts("dispatch_state").then(res => {
      this.dispatchStateList = res.data.slice(0, 3);
      this.dispatchState = res.data;
    });

    this.getDicts("sys_yes_no").then(res => {
      this.yesNoList = res.data;
    });
    this.getDicts("choice_mode").then(res => {
      this.choiceModeList = res.data;
    });

    //增值税类型
    this.getDicts("vat_type").then(res => {
      this.vatTypeList = res.data;
    });
    this.getDicts("opportunity_type").then(res => {
      this.clientType = res.data;
    });
    //客户来源
    this.getDicts("business_from").then(res => {
      this.clientSourceList = res.data;
    });

    this.queryParams.appId = this.$store.getters.appId + "";
    getMapIndustry().then(res => {
      this.industryMap = res.data;
    }); //行业分类
    //内账审核状态
    this.getDicts("auditor_state").then(res => {
      this.auditorState = res.data;
    });
    //特殊审批状态
    this.getDicts("special_approval").then(res => {
      this.specialApproval = res.data;
    });
    //客户等级
    this.getDicts("customer_rating").then(res => {
      this.clientLvList = res.data;
    });
    //订单审核结果
    this.getDicts("order_review_results").then(res => {
      this.statusList = res.data;
    });
    //收款方式
    this.getDicts("payment_method").then(res => {
      this.paymentMethod = res.data;
    });
    //收费状态
    this.getDicts("collection_status").then(res => {
      this.collectionStatus = res.data;
    });

    //收费周期
    this.getDicts("fees_cycle").then(res => {
      this.feesCycleList = res.data;
    });

    //派工执行步骤
    this.getDicts("dispatching_sort").then(res => {
      this.dispatchingSort = res.data;
    });

    //票据类型
    this.getDicts("bill_type").then(res => {
      this.billType = res.data;
    });
    //跟进分类
    this.getDicts("classify").then(res => {
      this.classify = res.data;
    });
    //跟进方式
    this.getDicts("follow_type").then(res => {
      this.followTypeList = res.data;
    });

    this.roles = this.userInfo.roleCodes;
    if (this.roles.indexOf("customerServiceSupervisor") != -1) {
      this.flag = true;
    } else if (this.roles.indexOf("customerServiceClerk") != -1) {
      this.flag = false;
    } else {
      this.flag = null;
    }

    this.getList();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm); //当前组件的实例
      // vm.resetQuery();
      vm.handleQuery();
      vm.queryParams.flowStatus = "0";
      setTimeout(function() {
        vm.queryParams.flowStatus = null;
        console.info(vm.queryParams);
        vm.$forceUpdate();
      }, 5000);
      vm.$forceUpdate();
      // vm.getList();
    });
  },
  methods: {
    tableRowClassName(row) {
      if (row.row.flowStatus == "10") {
        return "warning-row";
      }
      return "";
    },

    closeViewer() {
      this.dialogVisible = false;
    },
    // 取出来所有的市
    getProvinceItem(item) {
      this.cityList = item.children;
    },
    provinceChange() {
      this.cityList = [];
      this.areaList = [];
      this.queryParams.city = "";
      this.queryParams.county = "";
    },
    // 取出来所有的区
    getCityItem(item) {
      this.areaList = item.children;
    },
    cityChange() {
      this.queryParams.county = "";
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getCompanyList() {
      CompanyDepartmentPersonnel({}).then(response => {
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
          this.queryParams.kFFirmId = "";
          this.queryParams.kFUserId = "";
          this.queryParams.kFDeptId = data.deptId;
          this.getList();
          this.showStatus = false;
        } else if (data.companyId == "" && data.deptId == "") {
          this.queryParams.kFFirmId = "";
          this.queryParams.kFDeptId = "";
          this.queryParams.kFUserId = data.id;
          // console.log(this.queryParams);
          this.getList();
        } else {
          this.queryParams.kFUserId = "";
          this.queryParams.kFDeptId = "";
          this.queryParams.kFFirmId = data.companyId;
          // console.log(this.queryParams);
          this.getList();
        }
      }
      let option = this.companyOptions;
      this.setOrganizationTreeCheck(option, data.id, checked);
    },

    setOrganizationTreeCheck(data, id, checked) {
      data.forEach(item => {
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
      console.info('单击节点')
      console.info(node)
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
      const fa = parentId => {
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
      const fa = list => {
        list.map(e => {
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
    /** 查询商机信息列表 */
    getList() {
      this.loading = true;
      let queryParams = JSON.parse(JSON.stringify(this.queryParams));
      console.log(this.tabStatus)
      if(this.tabStatus=='0'){
        queryParams.flowStatus = null
        queryParams.kfDistribution = null
      }else if(this.tabStatus=='50'){
        queryParams.flowStatus = null
        queryParams.kfDistribution = '20'
      }else if(this.tabStatus=='10'){
        queryParams.flowStatus ='10'
        queryParams.kfDistribution = null
      }else if(this.tabStatus=='20'){
         queryParams.flowStatus = null
        queryParams.kfDistribution = '10'
      }

      BusirSerprice(queryParams).then(response => {
        this.BusinessList = response.data.rows;
        this.total = response.data.totalRows;
        this.loading = false;
      });
      TaxNature().then(response => {
        this.TaxNatureList = [];
        response.data.forEach(item => {
          item.child.forEach(ite => {
            let tem = {};
            tem.labelId = ite.id;
            tem.name = ite.name;
            this.TaxNatureList.push(tem);
          });
        });
      });
    },
    //激活
    handleActivation(ids) {
      activation({ id: ids }).then(response => {
        this.getList();
      });
    },
    //查看停止服务原因
    seeWhy(val) {
      this.stopReasonShow = true;
      this.stopReason = val;
    },
    //标记回显
    handleSign(e,row) {
      console.log(e)
      console.log(row)
      this.action = row.action;
      this.signShow = true;
      this.signId =e;
      this.departmentId = [];
      this.departId = [];
      this.arrp = [];
      this.arr = [];
      MarkEcho({ companyId: e }).then(response => {
        let temp = {};
        let tep = {};
        this.data = [];
        this.treeData = [];
        response.data.forEach(item => {
          if (item.checkType == 10) {
            temp = {};
            temp.label = item.name;
            temp.id = item.id;
            temp.selectedType = item.selectedType;
            temp.isEdit = false;
            temp.children = [];
            item.child.forEach(ite => {
              tep = {};
              tep.label = ite.name;
              tep.id = ite.id;
              tep.selectedType = ite.selectedType;
              tep.isEdit = false;

              temp.children.push(tep);
            });
            this.data.push(temp);
          } else if (item.checkType == 20) {
            temp = {};
            temp.label = item.name;
            temp.id = item.id;
            temp.selectedType = item.selectedType;
            temp.isEdit = false;
            temp.children = [];
            item.child.forEach(ite => {
              tep = {};
              tep.label = ite.name;
              tep.id = ite.id;
              tep.selectedType = ite.selectedType;
              tep.isEdit = false;

              temp.children.push(tep);
            });
            this.treeData.push(temp);
          }
        });

        this.data.forEach(item => {
          item.children.forEach(ite => {
            if (ite.selectedType == 10) {
              this.departmentId.push(ite.id);
              this.arr.push(ite);
            }
          });
        });
        this.treeData.forEach(item => {
          item.children.forEach(ite => {
            if (ite.selectedType == 10) {
              this.departId.push(ite.id);
              this.arr.push(ite);
            }
          });
        });
      });
      // console.log(this.arr);
    },

    //修改
    NodeBlur(Node, data) {
      if (data.label.length === 0) {
        this.$message.error("菜单名不可为空！");
        return false;
      } else {
        if (data.isEdit) {
          this.$set(data, "isEdit", false);
        }

        this.$nextTick(() => {
          this.$refs["slotTreeInput" + data.id].$refs.input.focus();
          updateLabel({
            name: data.label,
            id: data.id,
            parentId: data.parentId
          }).then(response => {
            // console.log(response);

            response.data.forEach(item => {
              let temp = {};
              item.child.forEach(ite => {
                temp.id = ite.id;
                temp.label = ite.name;
              });
            });
          });
        });
      }
    },

    //标记添加
    append(data) {
      // console.log(data);
      const newChild = {
        id: id++,
        label: "新标签",
        isEdit: false,
        children: []
      };
      if (!data.children) {
        this.$set(dataS, "children", []);
      }
      data.children.push(newChild);

      addLabel({
        parentId: data.id,
        name: newChild.label
      }).then(response => {
        this.handleSign(this.signId);
      });
    },
    //单选添加
    treeAppend(data) {
      const newChild = {
        id: id++,
        label: "新标签",
        isEdit: false,
        children: []
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      addLabel({
        parentId: data.id,
        name: newChild.label
      }).then(response => {
        this.handleSign(this.signId);
      });
    },
    //标记新增组别
    addGroup() {
      this.signGroupShow = true;
      this.singleChoice = "10";
    },
    //确认新增小组
    newGroup() {
      // console.log(this.signId);
      addLabel({
        name: this.group,
        parentId: -1,
        checkType: this.singleChoice
      }).then(response => {
        this.signGroupShow = false;
        this.handleSign(this.signId);
      });
      // this.handleSign(this.signId);
    },
    //标记编辑
    Edit(node, data) {
      data.isEdit = true;

      if (data.label.length === 0) {
        this.$message.error("菜单名不可为空！");

        return false;
      }
    },
    //单选标记编辑
    treeEdit(node, data) {
      data.isEdit = true;

      if (data.label.length === 0) {
        this.$message.error("菜单名不可为空！");

        return false;
      }
    },

    //标记删除
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      let labelId = null;
      if (children.findIndex(d => d.id === data.id)) {
        labelId = data.id;
      }
      delLabel({ id: labelId }).then(response => {
        // console.log(response);
      });
    },
    //单选标记删除
    treeRemove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      let labelId = null;
      if (children.findIndex(d => d.id === data.id)) {
        labelId = data.id;
      }
      delLabel({ id: labelId }).then(response => {
        // console.log(response);
        this.handleSign(this.signId);
      });
    },
    //已选标签页面删除标签选中
    setCheckedNodes(row, i) {
      let that = this;
      // this.arr.forEach(item => {
      //   if (item.id == row.id) {
      //     this.arr.splice(i, 1);
      //     console.log(this.arr);
      //   }
      // });
      this.data.forEach(item => {
        item.children.forEach(ite => {
          if (ite.id == row.id) {
            that.departmentId.splice(i, 1);
            this.arr.splice(i, 1);
            this.$refs.tree.setCheckedKeys(that.departmentId);
          }
        });
      });
      this.treeData.forEach(item => {
        item.children.forEach(ite => {
          if (ite.id == row.id) {
            this.departId.splice(i, 1);
            this.$refs.singleTree.setCheckedKeys(that.departId);
            this.arr.splice(i, 1);
          }
        });
      });

      this.$forceUpdate();
    },

    //选择框变化
    handleCheckChange(data, checked, indeterminate) {
      var rad = "";
      var rac = "";
      var ridsa = this.$refs.tree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsb = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      var ridsc = this.$refs.singleTree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsd = this.$refs.singleTree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      // console.log(ridsb);
      this.arr = [];
      let arrp = [];
      let arr = [];
      ridsb.forEach(ids => {
        let b = {};
        //获取选中的所有的父级id
        rad += "," + ids.id;
        if (ids.children) {
          arrp.push(ids.id);
        }
        b.label = ids.label;
        b.id = ids.id;
        arr.push(b);
      });
      let acc = [];
      ridsd.forEach(ids => {
        let a = {};
        //获取选中的所有的父级id
        rac += "," + ids.id;
        if (ids.children) {
          acc.push(ids.id);
        }
        a.label = ids.label;
        a.id = ids.id;
        arr.push(a);
      });
      arr = [...new Set(arr)]; // 数组去重
      arr.forEach((item, i) => {
        arrp.forEach(ite => {
          if (item.id == ite) {
            arr.splice(i, 1);
          }
        });
        acc.forEach(ite => {
          if (item.id == ite) {
            arr.splice(i, 1);
          }
        });
      });
      this.arr = arr;
      this.departmentId = this.$refs.tree.getCheckedKeys();
    },

    //单选选择框变化
    handleChange(data, checked, indeterminate) {
      let temp = this.singleChecked || [];
      this.treeData.forEach(items => {
        if (
          items.children.some(item => {
            return data.id == item.id;
          })
        ) {
          items.children.forEach(item => {
            // console.info(item.id)
            if (checked && temp.indexOf(item.id) != -1) {
              temp = temp.filter(ite => {
                return ite != item.id;
              });
            } else if (data.id == item.id && checked) {
              temp.push(item.id);
            } else if (checked) {
              temp = temp.filter(ite => {
                return ite != item.id;
              });
            }
            // console.info('temp'+temp)
          });
        }
      });
      // console.info(temp);
      this.singleChecked = temp;
      this.$refs.singleTree.setCheckedKeys(temp);

      var rad = "";
      var rac = "";
      var ridsa = this.$refs.tree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsb = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      var ridsc = this.$refs.singleTree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsd = this.$refs.singleTree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      // console.log(ridsb);
      this.arr = [];
      let arrp = [];
      let arr = [];
      ridsb.forEach(ids => {
        let b = {};
        //获取选中的所有的父级id
        rad += "," + ids.id;
        if (ids.children) {
          arrp.push(ids.id);
        }
        b.label = ids.label;
        b.id = ids.id;
        arr.push(b);
      });
      let acc = [];
      ridsd.forEach(ids => {
        let a = {};
        //获取选中的所有的父级id
        rac += "," + ids.id;
        if (ids.children) {
          acc.push(ids.id);
        }
        a.label = ids.label;
        a.id = ids.id;
        arr.push(a);
      });
      arr = [...new Set(arr)]; // 数组去重
      arr.forEach((item, i) => {
        arrp.forEach(ite => {
          if (item.id == ite) {
            arr.splice(i, 1);
          }
        });
        acc.forEach(ite => {
          if (item.id == ite) {
            arr.splice(i, 1);
          }
        });
      });
      this.arr = arr;
      this.departId = this.$refs.tree.getCheckedKeys();
    },

    //确认客户标签选择
    getCheckedNodes() {
      var rad = "";
      var rac = "";
      var ridsa = this.$refs.tree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsb = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      var ridsc = this.$refs.singleTree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsd = this.$refs.singleTree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      let arrp = [];
      ridsb.forEach(ids => {
        //获取选中的所有的父级id
        rad += "," + ids.id;
        if (ids.children) {
          arrp.push(ids.id);
        }
      });
      let acc = [];
      ridsd.forEach(ids => {
        //获取选中的所有的父级id
        rac += "," + ids.id;
        if (ids.children) {
          acc.push(ids.id);
        }
      });

      rad = rad.substr(1); // 删除字符串前面的','
      rac = rac.substr(1); // 删除字符串前面的','
      var rids = rad + "," + ridsa + "," + rac + "," + ridsc;
      var arr = rids.split(","); //  把字符串转换成数组
      arr = [...new Set(arr)]; // 数组去重

      let tem = [];
      arr.forEach((item, i) => {
        arrp.forEach(ite => {
          if (ite == item) {
            arr.splice(i, 1);
          }
        });
      });
      arr.forEach((item, i) => {
        let c = {};
        c.companyId = this.signId;
        c.companyLabel = item;
        tem.push(c);
      });

      checkLabel({ companyId: this.signId, labelParams: tem }).then(
        response => {
          // console.log(response);
          this.signShow = false;
        }
      );
    },

    //新增客户
    handleAddCustomer() {
      this.reset();
      this.openCustomer = true;
      this.title = "新增客户";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 客户提交按钮
    submitForm: throttle(function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.id = null;
          addClient(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增客户成功");
              this.openCustomer = false;
              this.getList();
            }
          });
        }
      });
    }),
    //审核
    handleExamine(row) {
      this.orderFrom = { id: row.id, status: "", remark: "" };
    },
    //订单审核确定
    confirmAudit() {
      this.$refs["orderCheckFrom"].validate(valid => {
        if (valid) {
          audit(this.orderFrom).then(response => {});
        }
      });
    },
    //抽屉
    showDrawer(row) {
      this.drawerVisible = true;
      this.companyId = row.companyId;
    },
    //派工
    handleDispatch(row) {
      this.distributionForm = {
        orderId: null,
        userId: "",
        role: "",
        userName: "",
        productId: null,
        roleCode: null,
        extUserId: "", //外账ID
        extUserName: null, //外账用户名字
        extRole: "", //外账部门名称
        extRoleCode: null //外账执行人角色
      };
      this.kfDepartmentStaff = [];
      this.wzDepartmentStaff = [];
      this.kfDeptOptions = [];
      this.wzDeptOptions = [];
      this.title = "派工—" + row.companyName;
      this.distributionForm.productId = row.id;
      this.distributionForm.orderId = row.busirId;
      if (row.service == "") {
        this.dispatchDialog = true;
        // entDept(this.queryParams).then(response => {
        //   var tep = response.data;
        //   for (var a in tep) {
        //     if (tep.hasOwnProperty(a)) {
        //       this.department.push(a);
        //     }
        //   }
        //   this.kefu = tep[Object.keys(tep)[0]];
        //   this.kefu.forEach(item => {
        //     item.role = this.department[0];
        //   });
        //   this.kefu.role = this.department[0];
        //   if (this.kefu.length > 0 && false) {
        //     this.distributionForm.userId = this.kefu[0].userId;
        //     this.distributionForm.userName = this.kefu[0].name;
        //     this.distributionForm.role = this.kefu[0].role;
        //     this.distributionForm.roleCode = this.kefu[0].roleCode;
        //   }

        //   this.waizhang = tep[Object.keys(tep)[1]];
        //   this.waizhang.forEach(item => {
        //     item.extRole = this.department[1];
        //   });
        //   this.waizhang.extRole = this.department[1];
        //   if (this.waizhang.length > 0) {
        //     this.distributionForm.extUserId = this.waizhang[0].userId;
        //     this.distributionForm.extUserName = this.waizhang[0].name;
        //     this.distributionForm.extRole = this.waizhang[0].extRole;
        //     this.distributionForm.extRoleCode = this.waizhang[0].roleCode;
        //   }
        // });
        Department({}).then(response => {
          let tempArr = [];
          let kfList = this.handleTree(
            response.data.kfDept,
            "deptId",
            "parentId"
          );
          let wzList = this.handleTree(
            response.data.wzDept,
            "deptId",
            "parentId"
          );
          this.departmentList = (response.data.wzDept || []).concat(
            response.data.kfDept
          );
          // tempArr = tempArr.concat(kfList);
          // tempArr =  tempArr.concat(wzList);
          this.kfDeptOptions = kfList;
          (this.distributionForm.role = this.kfDeptOptions[0].deptName),
            Staff({
              abbreviation: "KFB",
              deptId: this.kfDeptOptions[0].deptId
            }).then(response => {
              this.kfDepartmentStaff = response.data;
              this.distributionForm.userName = this.kfDepartmentStaff[0].name;
            });
          this.wzDeptOptions = wzList;
          this.distributionForm.extRole = this.wzDeptOptions[0].deptName;
          Staff({
            abbreviation: "WZB",
            deptId: this.wzDeptOptions[0].deptId
          }).then(response => {
            this.wzDepartmentStaff = response.data;
            this.distributionForm.extUserName = this.wzDepartmentStaff[0].name;
          });
        });
      } else {
        this.$confirm("是否重新分配?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.dispatchDialog = true;
            this.distributionForm = {
              orderId: null,
              userId: null,
              role: null,
              userName: null,
              productId: null,
              roleCode: null,
              extUserId: null, //外账ID
              extUserName: null, //外账用户名字
              extRole: null, //外账部门名称
              extRoleCode: null //外账执行人角色
            };
            this.distributionForm.productId = row.id;
            this.distributionForm.orderId = row.busirId;
            return Department({});
          })
          .then(response => {
            // let tempArr = [];
            let kfList = this.handleTree(
              response.data.kfDept,
              "deptId",
              "parentId"
            );
            let wzList = this.handleTree(
              response.data.wzDept,
              "deptId",
              "parentId"
            );
            this.departmentList = (response.data.wzDept || []).concat(
              response.data.kfDept
            );
            // tempArr = tempArr.concat(kfList);
            // tempArr =  tempArr.concat(wzList);
            // console.info(tempArr);
            // this.deptOptions = tempArr;
            this.kfDeptOptions = kfList;
            this.kfDepartmentStaff = [];

            this.distributionForm.userName = "";
            (this.distributionForm.role = this.kfDeptOptions[0].deptName),
              Staff({
                abbreviation: "KFB",
                deptId: this.kfDeptOptions[0].deptId
              }).then(response => {
                this.kfDepartmentStaff = response.data;
                this.distributionForm.userName = this.kfDepartmentStaff[0].name;
              });
            this.wzDeptOptions = wzList;
            this.wzDepartmentStaff = [];
            this.distributionForm.extUserName = "";
            this.distributionForm.extRole = this.wzDeptOptions[0].deptName;
            Staff({
              abbreviation: "WZB",
              deptId: this.wzDeptOptions[0].deptId
            }).then(response => {
              this.wzDepartmentStaff = response.data;
              this.distributionForm.extUserName = this.wzDepartmentStaff[0].name;
            });
          });
      }
    },
    handleNodeClick(data, checked) {
      // console.log(arguments);
      if (checked) {
        this.kfDeptChange(data.deptId);
        this.distributionForm.role = data.deptName;
        //  this.distributionForm.userName= "";
      }
      let option = this.kfDeptOptions;
      this.setTreeCheck(option, data.deptId, checked);
    },

    setTreeCheck(data, id, checked) {
      // console.info(arguments);
      data.forEach(item => {
        if (item.deptId == id || !checked) {
          // this.$refs.deptTree.setChecked(data.deptId,true,false)
        } else {
          this.$refs.deptTree.setChecked(item.deptId, false, false);
        }
        if (item.children && item.children.length > 0) {
          this.setTreeCheck(item.children, id, checked);
        }
      });
    },
    // 隐藏树状菜单
    onCloseTree() {
      this.$refs.popover.showPopper = false;
    },

    handleDeptClick(data, checked) {
      if (checked) {
        this.wzDeptChange(data.deptId);
        this.distributionForm.extRole = data.deptName;
      }
      let option = this.wzDeptOptions;
      this.setDeptCheck(option, data.deptId, checked);
    },
    setDeptCheck(data, id, checked) {
      // console.info(arguments);
      data.forEach(item => {
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
    currentChange() {
      // console.log(arguments);
    },
    kfDeptChange(val) {
      this.kfDepartmentStaff = [];
      // this.distributionForm.role = "";
      this.distributionForm.userName = "";
      // console.log(val);
      Staff({ abbreviation: "KFB", deptId: val }).then(response => {
        this.kfDepartmentStaff = response.data;
        // console.log(this.kfDepartmentStaff);
      });
    },
    wzDeptChange(val) {
      this.wzDepartmentStaff = [];
      this.distributionForm.extUserName = "";
      // this.distributionForm.extRole = "";
      Staff({ abbreviation: "WZB", deptId: val }).then(response => {
        this.wzDepartmentStaff = response.data;
      });
    },
    //部门选择
    // departmentMembers(row) {
    //   let deptId = row.deptId;
    //   this.distributionForm.deptName = row.deptShortName;
    //   this.distributionForm.role = row.deptName;

    //   entUser({ deptId: deptId, deptName: row.deptShortName }).then(
    //     response => {
    //       this.departmentStaff = response.data;
    //     }
    //   );
    // },
    //获取部门员工id
    //客服

    handleDepartment(val) {
      // console.log(val);
      this.kfDepartmentStaff.forEach(item => {
        if (item.userName == val) {
          this.distributionForm.userId = item.userId;
          this.distributionForm.userName = item.name;
          this.distributionForm.roleCode = item.roleCode;
          this.distributionForm.kfDeptId = item.deptId;
          this.distributionForm.kfCompanyId = item.companyId;
        }
      });
    },
    //外账
    handleDepartments(val) {
      this.wzDepartmentStaff.forEach(item => {
        if (item.name == val) {
          this.distributionForm.extUserId = item.userId;
          this.distributionForm.extUserName = item.name;
          this.distributionForm.extRoleCode = item.roleCode;
          this.distributionForm.wzDeptId = item.deptId;
          this.distributionForm.wzCompanyId = item.companyId;
        }
      });
    },

    // userNameChange(){},

    //派工提交
    DispatchSubmitForm: throttle(function() {
      this.$refs["distributionForm"].validate(valid => {
        if (valid) {
          this.departmentList.forEach(item => {
            if (item.deptName == this.distributionForm.role) {
              this.distributionForm.kfDeptId = item.deptId;
            }
            if (item.deptName == this.distributionForm.extRole) {
              this.distributionForm.wzDeptId = item.deptId;
            }
          });
          this.kfDepartmentStaff.forEach(item => {
            if (item.name == this.distributionForm.userName) {
              this.distributionForm.userId = item.userId;
              this.distributionForm.roleCode = item.roleCode;
              this.distributionForm.kfCompanyId = item.companyId;
            }
          });
          this.wzDepartmentStaff.forEach(item => {
            if (item.name == this.distributionForm.extUserName) {
              this.distributionForm.extUserId = item.userId;
              this.distributionForm.extRoleCode = item.roleCode;
              this.distributionForm.wzCompanyId = item.companyId;
            }
          });
          allocation(this.distributionForm).then(response => {
            if (response.code == 200) {
              this.$message.success("派工成功");
            }
            this.getList();
            this.dispatchDialog = false;

            //   this.distributionForm.role = "";
            // this.distributionForm.userId = "";
            // this.distributionForm.extUserId = "";
            // this.distributionForm.extRole = "";
            // this.kfDepartmentStaff = [];
            // this.wzDepartmentStaff = [];
            // this.kfDeptOptions = [];
            // this.wzDeptOptions = [];
          });
        }
      });
    }),
    //收费
    handleCollection(row) {
      this.collection = true;
      this.action = row.action;

      (this.radios = ""), (this.companyId = row.companyId);
      this.activeName = "first";
      this.templateSelection = {
        serpriceName: row.serpriceName,
        companyName: row.companyName,
        id: row.id,
        companyId: row.companyId,
        busirId: row.busirId,
        busirSerpriceId: row.id
      };
      this.auditDetailsForm.companyName = row.companyName;
      this.$nextTick(() => {
        this.$refs.uploadCharge.clearFiles();
      });
      this.handlefindReturned(this.templateSelection.busirSerpriceId);
    },

    handlefindReturned(row) {
      this.houproPaymentSettingList = [];
      //收费登记
      findReturnedMoney({ id: row }).then(response => {
        this.feeRegistration = response.data.returnedMoney;
        this.templateSelection.payCode = JSON.parse(
          response.data.payEntityList[0].cityCode
        );
        response.data.payEntityList.forEach(item => {
          let arr = {};
          arr.patternPayment = item.patternPayment;
          arr.id = item.id;
          this.houproPaymentSettingList.push(arr);
        });
      });
    },

    //选择项目收费
    getCurrentRow(row) {
      this.templateSelection.id = this.ids;
      this.receiptTime = row.receiptTime;
    },
    //确认收费
    confirmCharge() {
      this.$refs["templateSelection"].validate(valid => {
        if (valid) {
          MarketBusirSerpriceCharge(this.templateSelection).then(response => {
            this.$nextTick(() => {
              this.$refs.uploadCharge.clearFiles();
              this.$refs["templateSelection"].resetFields();
              this.radios = "";
            });
            this.handlefindReturned(this.templateSelection.busirSerpriceId);
            this.getList();
          });
        }
      });
    },
    //财务审核详情
    handleDetails(row) {
      this.AuditDetailShow = true;
      auditDetailsDisplay({ id: row.id }).then(response => {
        this.auditDetailsForm = response.data;
        this.auditDetailsForm.companyName = this.templateSelection.companyName;
      });
    },
    //确认收费支付时间
    advanceUpdate() {
      var date = new Date();
      var month = Number(date.getMonth()) + 1;
      if (month < 10) {
        month = "0" + month;
      } else {
        return (month = month);
      }
      // console.log(month);
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
      if (this.templateSelection.practicalTime > this.PaymentTime) {
        this.msgError("支付时间不能大于当前时间");
        return (this.templateSelection.practicalTime = "");
      }
    },
    //修改回款计划按钮
    modify() {
      this.innerVisible = true;
      this.paymentForm = {
        cycleType: "",
        payBackTime: "",
        id: this.templateSelection.id,
        serpriceName: this.templateSelection.serpriceName
      };
    },
    //修改回款计划提交
    paymentCollection() {
      // this.paymentForm.cycleType = this.paymentForm.sourceTypeId;
      this.paymentForm.id = this.templateSelection.number;
      this.$refs["templateSelections"].validate(valid => {
        if (valid) {
          updateReturned(this.paymentForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改回款计划成功");
            }
            this.innerVisible = false;
          });
        }
      });
    },
    getContacts(row) {
      //联系人
      getPersonnelList({ companyId: this.companyId }).then(response => {
        this.contactList = response.data;
      });
    },
    handleRemove(file, fileList) {
      delImg({
        id: file.response.data.id,
        companyId: file.response.data.companyId
      }).then(res => {
        this.followForm.imageIds = fileList
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
      });
    },
    handlePreview(file) {},
    previewImg(list) {
      return list.map(item => {
        return this.filePath + item.url;
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);

      // delImg({ id: file.response.data.id }).then(response => {});
    },

    //获取合同列表
    getContract(id) {
      FileByCompanyId({ id: id }).then(response => {
        this.contractList = response.data;
      });
    },
    //合同续费
    renew(row) {
      if (row.renewType == "30") {
        contractProjectRenewalDetails({
          id: row.renewId,
          renewType: row.renewType
        }).then(response => {
          this.renewals = true;
          this.renewForm = response.data;
          this.renewForm.contractFileIds = "";
          this.renewForm.contractId = row.id;
          this.renewForm.contractNumber = row.controlNo;
          this.renewForm.takeEffectTime = row.takeTime;
          this.renewForm.renewStartingTime = row.takeTime;
          this.renewForm.marketCompbusiImgfileResults =
            row.marketCompbusiImgfileResults;
        });
      } else {
        this.renewals = true;
        this.renewForm = row;
        this.renewForm.contractFileIds = "";
        this.renewForm.contractId = row.id;
        this.renewForm.contractNumber = row.controlNo;
        this.renewForm.takeEffectTime = row.takeTime;
        this.renewForm.renewStartingTime = row.takeTime;
      }
    },

    //订单展示
    getOrder(id) {
      let arr;
      selectOrderBySerpriceId({ id: id }).then(response => {
        this.orderList = response.data;
      });
    },
    //添加订单
    //新增订单
    newOrders(row) {
      if (row) {
        this.form = row;
      }
      this.newOrderVisible = true;
      this.getProductTypeList();
    },
    //添加合同
    addContract() {},
    //选择产品
    //选择产品
    toOrderFun(row) {
      //订单类型：10 代账 20 非代账
      let data = {
        type: row.type,
        companyId: this.templateSelection.companyId,
        serpriceId: row.id
      };
      addOrder(data).then(res => {
        this.orderId = res.data.id;
        this.hiddenTab = true;
        this.orderVisible = true;
      });
    },
    //获取产品类别列表
    getProductTypeList() {
      getIntermSerpriceList({}).then(res => {
        this.proTypeList = res.data;
        this.proTypeOption = res.data;
      });
    },
    //票据记录
    handleRecord(row) {
      this.action = row.action;
      this.billRecord = true;
      this.billForm = {
        serpriceId: row.id,
        id: row.id,
        companyName: row.companyName,
        busirId: row.busirId,
        billType: "",
        remark: ""
      };
      this.$nextTick(() => {
        this.$refs.uploadBill.clearFiles();
      });

      findPaperRecordsList({ productId: this.billForm.id }).then(response => {
        this.billRecordFrom = response.data;
      });
    },
    //补充材料回显
    supplement(row) {
      this.supplementaryMaterials = true;
      this.supplementaryForm.id = row.id;
      let arr = [];
      this.$nextTick(() => {
        this.$refs.uploadBills.clearFiles();
      });
      findBillList({ id: row.id }).then(response => {
        this.supplementaryList = response.data;
        if (response.data.length == 0) {
          this.supplementaryForm.arrIds = response.data;
        } else {
          response.data.forEach(item => {
            arr.push(item.id);
          });

          this.supplementaryForm.arrIds = arr;
        }
      });
    },
    //补充票据记录提交
    affirm() {
      if (this.supplementaryForm.imageIds == null) {
        // if(this.supplementaryForm.arrIds.length==0){
        //   this.supplementaryForm.imageIds=null
        // }  else{
        this.supplementaryForm.imageIds = this.supplementaryForm.arrIds.join();
        // }
      } else {
        this.supplementaryForm.imageIds =
          this.supplementaryForm.imageIds +
          "," +
          this.supplementaryForm.arrIds.join(",");
      }

      this.$refs["supplementaryForm"].validate(valid => {
        if (valid) {
          replenishMaterials({
            id: this.supplementaryForm.id,
            imageIds: this.supplementaryForm.imageIds
          }).then(response => {
            this.supplementaryMaterials = false;
            this.handleRecord(this.billForm);
          });
        }
      });
    },
    //补充票据图片删除
    delimg(row, index) {
      this.supplementaryList.splice(index, 1);
      delImg({ id: row.id }).then(response => {});
    },
    //新增票据记录
    addNow() {
      delete this.billForm.id;
      this.$refs["billForm"].validate(valid => {
        if (valid) {
          addPaperRecords(this.billForm).then(response => {
            if (response.code == 200) {
              this.billForm.billType = "";
              this.billForm.remark = "";
              this.billForm.imageIds = "";
              this.$nextTick(() => {
                this.$refs.uploadBill.clearFiles();
              }),
                this.$message.success("新增票据成功");
              findPaperRecordsList({
                productId: this.billForm.serpriceId
              }).then(response => {
                this.billRecordFrom = response.data;
              });
            }
          });
        }
      });
    },
    //票据记录重置
    resetBillForm() {
      this.billForm.billType = "";
      this.billForm.remark = "";
      this.$nextTick(() => {
        this.$refs.uploadBill.clearFiles();
      });
    },

    //tab切换
    handleClick(tab) {
      if (tab.name == "first") {
        this.handlefindReturned(this.templateSelection.id); //收费登记
      } else if (tab.name == "second") {
        this.getContacts(this.templateSelection.id); //获取联系人
      } else if (tab.name == "third") {
        this.getContract(this.templateSelection.id); //合同
      } else if (tab.name == "fourth") {
        this.getOrder(this.templateSelection.id); //订单
      }
    },

    //跟进记录
    followUp(row) {
      this.followUpShow = true;
      this.form = row;

      this.followForm = {
        id: this.form.id,
        companyId: this.form.companyId,
        serpriceId: this.form.id,
        classify: 30,
        theContent: "",
        nextDate: "",
        nextContent: "",
        type: ""
      };

      FollowRecord({ id: this.followForm.id, classify: 30 }).then(response => {
        this.followRecord = response.data;
      });
    },
    //添加跟进记录
    addTo() {
      this.addTrackRecord = true;
      this.$nextTick(() => {
        this.$refs["followForm"].resetFields();
      });
      this.followForm = {
        // id: this.form.id,
        companyId: this.form.companyId,
        serpriceId: this.form.id,
        classify: 30,
        theContent: "",
        nextDate: "",
        nextContent: "",
        type: ""
      };
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
        this.followForm.imageIds = files;
      } else if (type == 20) {
      } else if (type == 30) {
        this.templateSelection.imageIds = files;
      } else if (type == 40) {
        this.billForm.imageIds = files;
      } else if (type == 50) {
        this.supplementaryForm.imageIds = files;
      } else if (type == 60) {
      }
    },
    //新增跟进记录提交
    addNowFollow() {
      this.$refs["followForm"].validate(valid => {
        if (valid) {
          addFollowRecord(this.followForm).then(response => {
            if (response.code == 200) {
              this.addTrackRecord = false;
              this.$nextTick(() => {
                this.$refs.uploadFollow.clearFiles();
              }),
                this.$message.success("新增跟进记录成功");
              this.followUp(this.form);
            }
          });
        }
      });
    },
    //停用服务
    OutOfService(row) {
      this.stopShow = true;
      this.$nextTick(() => {
        this.$refs["stopForm"].resetFields();
      });

      this.stopForm = {
        id: row.id,
        remark: ""
      };
    },
    cease() {
      this.$refs["stopForm"].validate(valid => {
        if (valid) {
          stopService(this.stopForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("停止服务成功");
              this.stopShow = false;
            }
            this.getList();
          });
        }
      });
    },
    //dialog关闭清空数据
    handleShut() {
      // this.$refs['distributionForm'].resetFields();
      this.departmentStaff = [];
      this.department = [];
    },
    //内层dialog取消
    dialogCancel() {
      //修改回款计划
      this.innerVisible = false;
      //添加跟进记录
      this.addTrackRecord = false;
      //补充票据记录
      this.supplementaryMaterials = false;
      //续费
      this.renewals = false;
      //新增订单
      this.newOrderVisible = false;
      //财务审核结果详情
      this.AuditDetailShow = false;
    },
    // 取消按钮
    cancel() {
      this.stopShow = false;
      //跟进记录
      this.followUpShow = false;

      this.departmentStaff = [];
      this.department = [];
      //收费
      this.collection = false;
      //票据记录
      this.billRecord = false;
      this.dispatchDialog = false;

      this.reset();
    },
    //dialog关闭重置表单
    resetForm() {},
    // 表单重置
    reset() {
      this.form = {
        id: null,
        companyId: null,
        bankName: null,
        bankAccountNumber: null,
        bankAddress: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null,
        district: null
      };

      this.billRecordFrom;

      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      if (this.writeTime) {
        if (this.writeTime.length !== 0) {
          this.queryParams.sBillTime = this.writeTime[0] + " 00:00:00";
          this.queryParams.eBillTime = this.writeTime[1] + " 23:59:59";
        } else {
          this.queryParams.sBillTime = "";
          this.queryParams.eBillTime = "";
        }
      } else {
        this.queryParams.sBillTime = "";
        this.queryParams.eBillTime = "";
      }

      if (this.followDate) {
        if (this.followDate.length !== 0) {
          this.queryParams.sFollowTime = this.followDate[0] + " 00:00:00";
          this.queryParams.eFollowTime = this.followDate[1] + " 23:59:59";
        } else {
          this.queryParams.sFollowTime = "";
          this.queryParams.eFollowTime = "";
        }
      } else {
        this.queryParams.sFollowTime = "";
        this.queryParams.eFollowTime = "";
      }

      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.getList();
    },
    //tab切换
    handleClicks(tab) {
      console.log(tab.name)
      if (tab.name == "10") {
        this.getList(); //审核通过
      }else if (tab.name == "50") {
        this.getList(); //未分配
      }else if (tab.name == 20) {
        this.getList();//已分配
      }else if (tab.name == "") {
        this.getList();
      }
    },

    handleTableQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams = {};
      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.queryParams.keyword = "";
      this.labelModel = "";
      this.queryParams.sFollowTime = "";
      this.queryParams.eFollowTime = "";
      this.queryParams.sFollowTime = "";
      this.queryParams.eFollowTime = "";
      this.followDate = [];
      this.writeTime = [];
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      // if (e.keyCode != 13) {
      //   this.showSearch = false;
      // }
      console.info(this.queryParams);
      this.resetQuery();
      this.labelModel = "";
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        flowStatus: null,
        kfDistribution:null,
        companyId: null,
        bankName: null,
        accountType: "", //服务类别
        bankAccountNumber: null,
        bankAddress: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        year: new Date().getFullYear(),
        kfAuditType: null,
        service: "",
        area: "",
        county: "",
        outerAccounting: "",
        kFFirmId: "",
        kFDeptId: "",
        kFUserId: "",
        sFollowTime: null,
        eFollowTime: null,
        sBillTime: null,
        eBillTime: null,
        keyword: null,
        labelName: null
      };
      this.resetForm("queryForm");
      this.followDate = [];
      this.writeTime = [];
      // this.handleQuery();
    },
    //收费登记多选框数据
    handlemultipleTableChange(selection) {
      this.ids = selection.map(item => item.id);
      this.templateSelection.serIds = this.ids;
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
      // console.log(this.templateSelection.id);
    },

    checkSelectable(row) {
      return (
        (row.state == 10 || row.auditStatus == 30) &&
        row.auditStatus != 20 &&
        row.auditStatus != 10
      );
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
      // console.log(this.templateSelection.id);
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
    },

    /** 导出按钮操作 */
    handleExport() {
      let fileUrl = process.env.VUE_APP_FILE_API;
      const queryParams = this.queryParams;
      var data = {
        customerServiceExportType: 10,
        service:queryParams.service || "",
        kFUserId: queryParams.kFUserId || "",
        city: queryParams.city || "",
        county: queryParams.county || "",
        province: queryParams.province || "",
        eBillTime: queryParams.eBillTime || "",
        eFollowTime: queryParams.eFollowTime || "",
        keyword: queryParams.keyword || "",
        labelName: queryParams.labelName || "",
        outerAccounting: queryParams.outerAccounting || "",
        sBillTime: queryParams.sBillTime || "",
        sFollowTime: queryParams.sFollowTime || ""
      };
      this.$confirm("是否确认导出所有服务项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportD(data);
        })
        .then(response => {
          let filename = response.data.filename;
          let elink = document.createElement("a");
          elink.download = filename;
          elink.text = filename;
          elink.style.display = "none";
          elink.href = decodeURIComponent(fileUrl + "/download/" + filename);
          // console.info(elink);
          document.getElementById("app").appendChild(elink);
          // console.info(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        })
        .catch(function() {});
    },
    //收款所属区域
    handleCityCodeChange(value) {
      this.CollectioAccountList = [];
      this.bankOfDepositList = [];
      this.houproPaymentSettingList = [];
      this.accountNameList = [];
      (this.templateSelection.accountBank = ""),
        (this.templateSelection.paymentTerm = ""),
        (this.templateSelection.account = ""),
        (this.templateSelection.accountName = "");
      this.templateSelection.paymentMethod = "";
      this.templateSelection.payCode = value;
      this.templateSelection.payProvince = CodeToText[value[0]];
      this.templateSelection.payCity = CodeToText[value[1]];
      this.templateSelection.payCounty = CodeToText[value[2]];
      this.templateSelection.region =
        this.templateSelection.payProvince +
        this.templateSelection.payCity +
        this.templateSelection.payCounty;

      GetPaymentMethod({
        type: 10,
        province: this.templateSelection.payProvince,
        city: this.templateSelection.payCity
      }).then(response => {
        this.houproPaymentSettingList = response.data;
      });
    },
    //收款方式
    payment(val) {
      let paymentId = "";
      this.templateSelection.account = "";
      (this.templateSelection.accountBank = ""),
        (this.templateSelection.accountName = "");
      this.houproPaymentSettingList.forEach(item => {
        if (this.templateSelection.paymentMethod == item.patternPayment) {
          paymentId = item.id;
          this.templateSelection.bankType = item.bankType;
        }
      });
      this.CollectioAccountList = [];
      this.bankOfDepositList = [];
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
        // console.log(this.accountNameList);
      });
    },
    //收款用户
    accountNameChange(val) {
      this.templateSelection.account = "";
      this.templateSelection.accountBank = "";
      this.CollectioAccountList = [];
      this.bankOfDepositList = [];
      this.PaymentNameList.forEach(item => {
        if (
          item.accountName == val &&
          item.patternPayment == this.templateSelection.paymentMethod
        ) {
          this.CollectioAccountList.push(item);
          this.bankOfDepositList.push(item);
        }
      });
    },
    //收款账户下拉框强制刷新
    selectPlatform(val) {
      this.$forceUpdate(); //强制更新
      this.bankOfDepositList.forEach(item => {
        if (val == item.payAccount) {
          this.templateSelection.accountBank = item.accountBank;
        }
      });
    },
    //开户行
    BankChange(val) {
      this.$forceUpdate();
      this.CollectioAccountList.forEach(item => {
        if (val == item.accountBank) {
          this.templateSelection.account = item.payAccount;
        }
      });
    },

    handleRegionChange(value, type = 20) {
      if (type == 10) {
        this.queryParams.district = value;
        this.queryParams.province = CodeToText[value[0]];
        this.queryParams.city = CodeToText[value[1]];
        this.queryParams.county = CodeToText[value[2]];
      } else {
        this.form.district = value;
        this.form.province = CodeToText[value[0]];
        this.form.city = CodeToText[value[1]];
        this.form.county = CodeToText[value[2]];
      }
    },
    //订单审核结果
    auditorStateFormat(row) {
      return this.selectDictLabel(this.auditorState, row.auditorState);
    },
    //派工执行步骤
    dispatchingSortFormat(row) {
      return this.selectDictLabel(this.dispatchingSort, row.dispatchingSort);
    },
    monthFun(row, year) {
      let list = row.servMoneyPlanListResult || [];
      let monthList = [];
      for (let i = 1; i <= 12; i++) {
        let arr = list.filter(item => {
          if (item) {
            let sm = parseInt(item.sTime.split("-")[1]);
            let sy = parseInt(item.sTime.split("-")[0]);
            let em = parseInt(item.eTime.split("-")[1]);
            let ey = parseInt(item.eTime.split("-")[0]);
            return sy < ey
              ? sy == year
                ? sm <= i
                : em >= i
              : sm <= i && em > i;
          }
        });
        let temp = {
          name: i,
          state: arr.length > 0 ? arr[0].states : "",
          types: arr.length > 0 ? arr[0].types : "",
          auditStatus: arr.length > 0 ? arr[0].auditStatus : ""
        };
        monthList.push(temp);
      }
      return monthList;
    }
  }
};
</script>
<style lang="scss">
// .agentAccount{
//表格表头
.account-table {
  .el-table th .cell {
    .calculator {
      .el-icon-plus:before {
        content: "\e791";
        font-size: 14px;
      }
      .el-icon-minus:before {
        content: "\e792";
        font-size: 14px;
      }
      .el-input-number__decrease,
      .el-input-number__increase {
        background: transparent !important;
      }
      .el-input-number__increase {
        border-left: 0px solid transparent;
      }
      .el-input-number__decrease {
        border-right: 0px solid transparent;
      }
      .el-input__inner {
        border: 0px solid transparent;
        background: transparent;
      }
    }
    .colorBox {
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 5px;
        border-radius: 2px;
      }
    }
  }
  .statusMonth {
    .el-col-2 {
      width: 24px;
      height: 24px;
      font-size: 12px;
      border: 1px solid #e6e7eb !important;
      border-radius: 2px;
      margin-right: 5px;
    }
  }
  .dispatchSteps {
    .el-col-6 {
      width: 24px;
      height: 24px;
      font-size: 12px;
      border: 1px solid #e6e7eb !important;
      border-radius: 2px;
      margin-right: 5px;
    }
  }
}

//合同
.contract_vi {
  background-color: #ffffff;
  height: auto;
  padding-bottom: 0px;
  .add-button {
    max-width: 100%;
    width: calc(100% - 64px);
    border: 1px #e6e7eb dashed;
    margin: 32px 32px 10px 32px;
  }
  .contract_list {
    margin-top: 12px;
    border-top: 1px solid #e6e7eb;
    padding-left: 32px;
    padding-right: 32px;
    :nth-child(1).child {
      border: 0px;
    }
    .child {
      padding-top: 37px;
      padding-bottom: 23px;
      border-top: 1px dashed #e6e7eb;
      .title {
        display: flex;
        align-items: center;
        .link {
          width: 3px;
          height: 17px;
          margin-right: 10px;
          background: #3978e7;
        }
        .font {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #3a3b3d;
          margin-right: 16px;
        }
      }
      .kind {
        margin-top: 16px;
        .name {
          display: flex;
          flex-direction: column;
          span {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #6e7073;
            line-height: 32px;
            .span {
              margin-left: 15px;
            }
            .color {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #3978e7;
              line-height: 34px;
            }
          }
          .el-image{
&>img {
            height: 39px;
            width: 96px;
            // background: pink;
          }
          }

        }
      }
    }
  }
}
//跟进记录
.followUpStyle {
  .el-dialog {
    background: #f5f6f7;
    width: 704px !important;
    height: 662px !important;
    .el-dialog__body {
      overflow: auto;
      height: 92%;
    }
    .el-dialog__body .el-form {
      margin: 0px !important;
    }
    .followRecord {
      .remind {
        margin-top: 20px;
        max-height: 486px !important;
        overflow: auto !important;
        ul {
          height: 161px;
          // padding: 24px 0 23px 24px;
          padding-left: 24px;
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          li {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #565759;
            list-style: none;
          }
          li:before {
            content: "\2022"; //圆点
            color: #3978e7; //颜色
            font-size: 16px; //大小
          }
        }
        .addFollow {
          padding: 32px;
          .add-button {
            width: 100% !important;
          }
        }

        .business {
          display: flex;
          border-bottom: 1px solid #e6e7eb;
          padding-top: 32px;
          & > div {
            margin-left: 24px;
            display: flex;
            width: 100%;
            > div:not([class^="el-image-viewer"]) {
              margin-left: 16px;
              display: flex;
              flex-direction: column;
              width: 100%;
              padding-right: 32px;
              span:not([class^="el-image-viewer"]) {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #565759;

                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 24px;
              }
              span:nth-child(1):not([class^="el-image-viewer"]) {
                font-family: Arial;
                margin-bottom: 12px;
                span {
                  &:nth-child(2),
                  &:nth-child(3) {
                    color: #d2d3d6;
                  }
                  &:nth-child(2) {
                    margin-left: 10px;
                    margin-right: 10px;
                  }
                }
              }
              span:nth-child(2):not([class^="el-image-viewer"]) {
                font-family: Arial;
                color: #565759;
                margin-bottom: 12px;
                // width: 500px;
              }
            }
            .imgStyle {
              display: flex;
              flex-direction: row;
            }
            .el-image > img {
              width: 70px;
              height: 50px;
              margin-right: 10px;
            }
          }

          .businessBottom {
            display: flex;
            flex-direction: row !important;
            border-top: 1px dashed #e6e7eb;
            margin-left: 0px !important;
            margin-top: 16px;
            padding-top: 16px;

            > div {
              margin-left: 0px !important;
              margin-right: 53px;
              display: flex;
              flex-direction: column;
              &:nth-child(1),
              &:nth-child(2) {
                span {
                  &:nth-child(1) {
                    color: #a1a2a6;
                  }
                }
              }
            }
            .el-button {
              width: 80px;
              height: 28px;
              padding: 0px !important;
            }
          }
        }
      }
    }
  }
}
//票据记录
.billRecord {
  .el-dialog {
    background: #f5f6f7;
    width: 704px !important;

    .el-dialog__body {
      height: 662px !important;
      overflow: auto;
    }
    .el-dialog__body .el-form {
      margin: 0px !important;
      .el-select {
        width: 280px !important;
      }
    }

    .remind {
      margin-top: 20px;
      > ul {
        // height: 161px;
        // padding: 24px 0 23px 24px;
        padding-left: 24px;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        li {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #565759;
          list-style: none;
        }
        li:before {
          content: "\2022"; //圆点
          color: #3978e7; //颜色
          font-size: 16px; //大小
        }
      }
      .business {
        height: 230px;
        display: flex;
        border-bottom: 1px solid #e6e7eb;
        align-items: center;

        & > div {
          margin-left: 24px;
          display: flex;
          > div:not([class^="el-image-viewer"]) {
            margin-left: 6px;
            display: flex;
            flex-direction: column;

            span:not([class^="el-image-viewer"]) {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 24px;
            }
            span:nth-child(1):not([class^="el-image-viewer"]) {
              font-family: Arial;

              span {
                &:nth-child(2),
                &:nth-child(3) {
                  color: #d2d3d6;
                }
                &:nth-child(2) {
                  margin-left: 10px;
                  margin-right: 10px;
                }
              }
            }
            span:nth-child(2):not([class^="el-image-viewer"]) {
              font-family: Arial;
              color: #565759;
            }
          }
          .imgStyle {
            display: flex;
            flex-direction: row;
            > span {
              margin-right: 10px;
            }
          }
          .touxiang {
            width: 32px;
            height: 32px;
          }
          .el-image > img {
            width: 70px;
            height: 50px;
            margin-right: 10px;
          }
        }
        .businessBottom {
          display: flex;
          flex-direction: row !important;
          border-top: 1px dashed #e6e7eb;
          margin-left: 0px !important;
          margin-top: 16px;
          padding-top: 16px;

          & > div {
            margin-left: 0px !important;
            margin-right: 53px;
            display: flex;
            flex-direction: column;
            &:nth-child(1),
            &:nth-child(2) {
              span {
                &:nth-child(1) {
                  color: #a1a2a6;
                }
              }
            }
          }
          .el-button {
            width: 80px;
            height: 28px;
            padding: 0px !important;
          }
        }
      }
    }
    .billOne {
      background-color: #fff;
      margin-top: 25px;
      padding: 32px 0px 32px 24px;
      .el-input {
        width: 280px !important;
      }
      .el-textarea {
        width: 530px !important;
      }
      .el-form-item {
        .el-form-item__label {
          width: 85px;
          text-align: right;
        }
        &:last-child {
          padding-left: 67px;
        }
      }
    }
  }
}
.billRecordinner {
  .el-dialog__body {
    height: 662px;
    overflow: auto;
  }

  .box-a {
    position: relative;
    text-align: center;
    .delDutton {
      position: absolute;
      top: 5px;
      right: 26%;
      z-index: 1999;
      color: #000;
      cursor: pointer;
    }
  }
}
//收费
.charge {
  .el-dialog {
    background: #f5f6f7;
    width: 854px !important;
    .el-dialog__body {
      height: 612px;
      overflow: auto;
      .el-tabs__nav-wrap {
        background-color: #fff;

        .el-tabs__nav-scroll {
          margin: 0px 32px;
          .el-tabs__nav {
            height: 56px;
            line-height: 56px;
          }
        }
      }
      //收费登记
      .feeRegistration {
        // background-color: #fff;
        margin-top: 5px;
        > div {
          &:nth-child(1) {
            background-color: #fff;
            height: 54px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 32px;
            border-bottom: 1px solid #ccc;
            &:nth-child(1) {
              font-size: 16px;
              font-weight: bold;
            }
          }
          &:nth-child(2) {
            padding: 24px 32px 20px 32px;
            background-color: #fff;
          }
        }
        .billOne {
          background-color: #fff;
          margin-top: 25px;
          padding-top: 24px;
          padding-bottom: 24px;
          .el-form-item--small.el-form-item {
            &:nth-child(3) {
              margin-bottom: 30px !important;
            }
          }
          .el-input {
            width: 280px !important;
          }
          .el-textarea {
            width: 560px !important;
          }

          .el-button:nth-child(1) {
            width: 92px !important;
          }
          .el-button:nth-child(1) i:nth-child(1) {
            margin-right: 0px !important;
          }
        }
        .dialog-footer {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          border-radius: 3px;
        }
      }

      //合同
      .contract {
        > div {
          background-color: #fff;
        }
      }
    }

    .billType {
      border: 1px solid #e6e7eb;
      text-align: center;
      .el-tag {
        margin: 10px 2px 0 2px;
      }
      .button-new-tag {
        height: 32px;
        width: 542px;
        border: 1px #e6e7eb dashed;
        border-radius: 2px;
        background: #ffffff;
        box-sizing: border-box;

        margin: 24px 0;
      }
      .input-new-tag {
        height: 32px;
        width: 92px;
        box-sizing: border-box;
        margin: 10px 2px 0 2px;
      }
      .el-row {
        text-align: left !important;
        line-height: 32px;
        height: 32px;
        background: #f5f6f7;
        border-top: 1px solid #e6e7eb;
        .el-col {
          padding-left: 24px;
          padding-right: 10px;
          height: 100%;
          display: flex;
          justify-content: space-between;

          &:nth-child(odd) {
            border-right: 1px solid #e6e7eb;
          }
          span {
            &:nth-child(1) {
              font-size: 12px;
            }
            i {
              display: inline-block;
              width: 14px;
              height: 14px;
              &:nth-child(1) {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
//财务审核详情
.orderReview {
  .el-dialog .el-dialog__body {
    height: 284px;
    overflow: auto;
  }
  .el-dialog .el-dialog__footer {
    padding: 15px 24px;
  }
  .el-form {
    margin: 0 !important;
    .el-row {
      &:nth-child(2) {
        margin-bottom: 14px;
        .el-divider--horizontal {
          margin-bottom: 9px;
        }

        div {
          &:nth-child(2) {
            background: #fdf6f0;
            border: 1px solid #faeee1;
            height: 34px;
            padding-left: 16px;
            line-height: 34px;
            font-size: 12px;
            i {
              font-size: 16px;
              margin-right: 10px;
              line-height: 34px;
            }
          }
        }
      }
      &:nth-child(3),
      &:nth-child(4) {
        margin-left: 20px !important;
        margin-right: 20px !important;
      }
      &:nth-child(4) {
        .el-textarea {
          width: 80% !important;
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
//订单
.orderForm {
  > div {
    background-color: #fff;
    padding: 32px 32px 28px 32px;
    > div {
      &:nth-child(1) {
        height: 32px;
        border: 1px dashed #e6e7eb;
        margin-bottom: 22px;
        // text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        i {
          margin-right: 10px;
        }
      }
    }
  }
}

//新增订单
.type_item {
  width: 100%;
  height: 92px;
  border: 1px #e6e7eb solid;
  background-color: #f8f9fb;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  overflow: hidden;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  & > span {
    margin: 24px 20px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #565759;
  }
  .el-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
  }
  &:hover {
    border-color: #b5c8f1;
    background-color: #ecf2fc;
    & > span {
      color: #4977e0;
    }
    .el-button {
      transform: translateY(0);
    }
  }
}

//分配
.orderAllocation {
  font-weight: 400;
  color: #565759;
  .el-dialog {
    width: 500px !important;
    // height: 208px;
    margin-top: 30vh !important;
    .el-dialog__body {
      padding: 20px 24px 0 24px !important;
      .el-form {
        margin: 0px !important;
        .el-input {
          width: 222px !important;
        }
        .department {
          .el-input__inner {
            border: 0px;
            padding-left: 0px;
          }
        }
        .el-select {
          width: 222px !important;
        }
      }
    }
    .el-dialog__footer {
      padding: 6px 24px 16px 24px;
    }
  }
}

.agentForm {
  .el-button--mini {
    padding: 3px 5px;
  }
}
.search-popover {
  .el-form {
    .one {
      .el-input--small {
        width: calc(100% + 38px);
      }
    }
    .two {
      .el-form-item__label {
        width: 100% !important;
      }
    }
  }
}
.warning-row td {
  background-color: #ebeef5 !important;
}
.active {
  color: #c0c4cc !important;
}
.success {
  color: #67c23a !important;
}
.danger {
  color: #f3a35f !important;
}
.error {
  color: #f56c6c !important;
}

//标记
.sign {
  border: 1px solid #ccc;
  > div:first-child {
    height: 36px;
    font-size: 16px;
    padding-left: 15px;
    line-height: 36px;
    border-bottom: 1px solid #e6e7eb;
    background: #f8f9fb;
  }
  > div:nth-child(3) {
    height: 42px;
    text-align: center;
    line-height: 42px;
    color: #3978e7;
    font-size: 16px;
    border-top: 1px solid #e6e7eb;
    background: #f8f9fb;
    > i {
      margin-right: 8px;
    }
  }
  .el-dialog .el-dialog__footer {
    border-top: 1px solid #e6e7eb !important;
  }
  .tagIcon {
    margin-left: 5px;
  }
  .el-icon-delete:before,
  .el-icon-edit:before,
  .el-icon-circle-plus-outline:before {
    font-size: 16px;
  }
}
// }
</style>

<style lang="scss" scoped>
.choice {
  background: #00d595;
  width: 105px;
  height: 28px;
  text-align: center;
  color: #fff;
  line-height: 28px;
}
.bgred {
  text-align: center;
  background: #ef5465;
  color: #fff;
}
.bggreen {
  text-align: center;
  background: #2dd199;
  color: #fff;
}
.bgyellow {
  text-align: center;
  background: #f3a35f;
  color: #fff;
}
.bgorange {
  text-align: center;
  background: #faeee1;
  color: #f3a35f;
}
.bggrey {
  text-align: center;
  background-color: #e6e7eb;
  color: #a1a2a6;
}
</style>
