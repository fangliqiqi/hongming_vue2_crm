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
            <div class="search-popover">
              <el-form
                :model="queryParams"
                ref="queryForm"
                :visible.sync="showSearch"
                :inline="true"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="客户名称" prop="companyName">
                  <el-input
                    v-model="queryParams.companyName"
                    placeholder="请输入客户名称"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>
                <el-form-item label="签约时间" prop="signingDate">
                  <el-date-picker
                    v-model="queryParams.signingDate"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择签约时间"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="到期时间" prop="contracttimeList">
                  <el-date-picker
                    v-model="queryParams.contracttimeList"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="合同状态:">
                  <template>
                    <el-radio v-model="queryParams.state" label="1"
                      >创建中</el-radio
                    >
                    <el-radio v-model="queryParams.state" label="2"
                      >完成</el-radio
                    >
                    <el-radio v-model="queryParams.state" label="3"
                      >作废</el-radio
                    >
                    <el-radio v-model="queryParams.state" label="4"
                      >待签字</el-radio
                    >
                  </template>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" type="cyan" @click="resetQuery"
                  >重置</el-button
                >
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认</el-button
                >
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search"
              >筛选</el-button
            >
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
              placeholder="组织架构"
            >
            </el-input>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.companyName"
            placeholder="请输入角色名称"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuerys"
          />
          <!-- <el-dropdown size="small" split-button type="primary" trigger="hover" class="ml8" @click="handleAdd">
            <span>
              <i class="el-icon-plus"></i>
              新建合同
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%" @click.native="bulkImport"><span><i
                class="el-icon-upload2"></i>导入</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            class="ml8"
            icon="el-icon-download"
            size="small"
            @click="handleExport"
            v-hasPermi="['share:contract:export']"
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
      <el-tabs v-model="queryParams.timeScreening" @tab-click="handleQuerys">
        <el-tab-pane label="全部合同" value="" name=""></el-tab-pane>
        <el-tab-pane label="近一个月到期合同" value="1" name="1"> </el-tab-pane>
        <el-tab-pane label="近三个月到期合同" value="3" name="3"> </el-tab-pane>
        <el-tab-pane label="近半年到期合同" value="6" name="6"> </el-tab-pane>
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
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="false">
      <el-form-item label="合同名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入合同名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司表id" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入公司表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司业务订单id" prop="compayBusirId">
        <el-input
          v-model="queryParams.compayBusirId"
          placeholder="请输入公司业务订单id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同存储路径" prop="url">
        <el-input
          v-model="queryParams.url"
          placeholder="请输入合同存储路径"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- 合同编号(固定格式生成。如：YZ20201125222222,字母代表合同类型+时间格式+6位随机数) -->
      <el-form-item label="合同编号" prop="controlNo">
        <el-input
          v-model="queryParams.controlNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="删除开关标识" prop="delSwitch">
        <el-select
          v-model="queryParams.delSwitch"
          placeholder="请选择删除开关标识 "
          clearable
          size="small"
        >
          <el-option
            v-for="item in delSwitch"
            :key="item.dictId"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="合同状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入合同状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同有效期" prop="servicePeriodEnd">
        <el-input
          v-model="queryParams.servicePeriodEnd"
          placeholder="请输入合同有效期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同金额" prop="money">
        <el-input
          v-model="queryParams.money"
          placeholder="请输入合同金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="签约时间" prop="signingDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.signingDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择签约时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="签单人" prop="signBill">
        <el-input
          v-model="queryParams.signBill"
          placeholder="请输入签单人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <div class="table-data">
      <el-table
        v-loading="loading"
        :data="contractList"
        :height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <!--        <el-table-column label="递增主键id" align="center" prop="id" />-->
        <el-table-column
          label="合同编号"
          align="left"
          prop="controlNo"
          min-width="160"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleShow(scope.row)">
              {{ scope.row.controlNo }}
            </el-button>
          </template>
        </el-table-column>
        <!--        <el-table-column label="合同名称" align="center" prop="name" />-->
        <el-table-column
          label="客户名称"
          align="left"
          prop="companyName"
          width="180"
        />
        <!-- <el-table-column label="公司业务订单编号" align="left" prop="orderNo" width="180" > -->
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
        <!--        <el-table-column label="合同有效期" align="center" prop="validity" >-->
        <!--          <template slot-scope="scope">-->
        <!--            <span>{{ parseTime(scope.row.validity, '{y}-{m}-{d}') }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column label="合同存储路径" align="center" prop="url" />-->

        <!-- <el-table-column label="创建时间" align="center" prop="createDate" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateDate" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column> -->
        <!--        <el-table-column label="备注 " align="center" prop="remarks" />-->
        <!--        <el-table-column label="删除开关标识" align="center" prop="delSwitch" :formatter="delSwitchFormat" />-->
        <!--        <el-table-column label="签单人" align="center" prop="signBill" />-->
        <el-table-column label="合同状态" align="right" min-width="100">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.state == 1"
              type="warning"
              plain
              @click="handleShow(scope.row)"
              v-hasPermi="['share:contract:edit']"
              >待签字</el-button
            >
            <el-button
              v-show="scope.row.state == 2"
              type="success"
              plain
              @click="handleShow(scope.row)"
              v-hasPermi="['share:contract:edit']"
              >已完成</el-button
            >
            <el-button
              v-show="scope.row.state == 3"
              type="info"
              plain
              @click="handleShow(scope.row)"
              v-hasPermi="['share:contract:edit']"
              >已作废</el-button
            >
            <el-button
              v-show="scope.row.state == '' || scope.row.state == 4"
              type="primary"
              plain
              v-hasPermi="['share:contract:edit']"
              >创建中</el-button
            >
            <!--            <el-button-->
            <!--              size="mini"-->
            <!--              type="text"-->
            <!--              icon="el-icon-edit"-->
            <!--              @click="handleUpdate(scope.row)"-->
            <!--              v-hasPermi="['share:contract:edit']"-->
            <!--            >修改</el-button>-->
            <!--            <el-button-->
            <!--              size="mini"-->
            <!--              type="text"-->
            <!--              icon="el-icon-delete"-->
            <!--              @click="handleDelete(scope.row)"-->
            <!--              v-hasPermi="['share:contract:remove']"-->
            <!--            >删除</el-button>-->
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
        <el-table-column
          label="审核状态"
          align="left"
          prop="nzAudit"
          width="120"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.nzAudit != ''">
              <el-tag
                type="warning"
                size="mini"
                v-if="scope.row.nzAudit == '10'"
              >
                {{ auditState(scope.row.nzAudit) }}
              </el-tag>
              <el-tag size="mini" v-if="scope.row.nzAudit == '20'">
                {{ auditState(scope.row.nzAudit) }}
              </el-tag>
              <el-tag
                type="danger"
                size="mini"
                v-if="scope.row.nzAudit == '30'"
              >
                {{ auditState(scope.row.nzAudit) }}
              </el-tag>
              <a
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
                v-if="scope.row.nzAudit == '20' || scope.row.nzAudit == '30'"
                >?</a
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
        <el-table-column label="操作" align="center" width="160" fixed="right">
          <template slot-scope="scope">
            <div>
              <!-- <div
                v-if="
                  scope.row.marketBusirSerprices.some(
                    (items) => items.accountType == 20
                  )
                "
              >
                <el-button
                  type="text"
                  style="color: #e6a23c"
                  v-if="
                    (scope.row.orderType == '20' ||
                      scope.row.orderType == '30') &&
                    scope.row.successfulRenewal == ''
                  "
                  @click.native="renew(scope.row)"
                  >续费
                </el-button>
              </div> -->
              <el-button
                style="color: #67c23a"
                type="text"
                @click="openDetail(scope.row)"
                v-if="scope.row.nzAudit == '20' || scope.row.nzAudit == '10'"
                >预览
              </el-button>
              <!-- <el-button
                style="color: #909399"
                type="text"
                @click="changeContractFun(scope.row)"
                v-if="scope.row.nzAudit == 20"
                >变更
              </el-button> -->
              <!-- <el-button
                style="color: #f56c6c"
                type="text"
                @click="handleCancel(scope.row)"
                v-if="scope.row.nzAudit == '' || scope.row.nzAudit == '30'"
                >作废
              </el-button> -->
              <!-- <el-button
                style="color: #409eff"
                v-if="scope.row.nzAudit == '' || scope.row.nzAudit == 30"
                type="text"
                @click="reviseContractFun(scope.row)"
                >修改合同
              </el-button> -->
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
    <!-- 添加或修改业务订单合同对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入合同名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司表id" prop="companyId">
              <el-input v-model="form.companyId" placeholder="请输入公司表id" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司业务订单id" prop="compayBusirId">
              <el-input
                v-model="form.compayBusirId"
                placeholder="请输入公司业务订单id"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同存储路径" prop="url">
              <el-input v-model="form.url" placeholder="请输入合同存储路径" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同编号" prop="controlNo">
              <el-input v-model="form.controlNo" placeholder="请输入合同编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注 " prop="remarks">
              <el-input
                v-model="form.remarks"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="删除开关标识" prop="delSwitch">
              <el-select
                v-model="form.delSwitch"
                placeholder="请选择删除开关标识 "
                clearable
                size="small"
              >
                <el-option
                  v-for="item in delSwitch"
                  :key="item.dictId"
                  :label="item.dictLabel"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同状态" prop="state">
              <el-input v-model="form.state" placeholder="请输入合同状态" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同有效期" prop="validity">
              <el-input
                v-model="form.validity"
                placeholder="请输入合同有效期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额" prop="money">
              <el-input v-model="form.money" placeholder="请输入合同金额" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="签约时间" prop="signingDate">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.signingDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择签约时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签单人" prop="signBill">
              <el-input v-model="form.signBill" placeholder="请输入签单人" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog> </el-dialog>
    <!-- 合同pdf -->
    <pdf-show :visible.sync="pdfShow" :url="pdfUrl"></pdf-show>
    <!-- 合同 -->
    <el-dialog
      :title="contratTitle"
      :visible.sync="contratOpen"
      width="800px"
      append-to-body
    >
      <el-form ref="contratForm" :model="contratForm">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="签约时间">
              <el-input v-model="contratForm.signingDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同生效期">
              <el-input v-model="contratForm.servicePeriodStart"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同停止时间">
              <el-input v-model="contratForm.servicePeriodEnd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额">
              <el-input v-model="contratForm.money + '元'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="合同附件">
              <div style="display: flex">
                <el-row :gutter="20">
                  <el-col
                    :span="8"
                    v-for="(item, index) in contratForm.images"
                    :key="index"
                  >
                    <el-image
                      :src="filePath + item"
                      :preview-src-list="
                        contratForm.images.map((ite) => {
                          return filePath + ite;
                        })
                      "
                    >
                    </el-image>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 订单 -->
    <edit-drawer
      ref="editDrawer"
      :visible.sync="drawerShow"
      :companyId="companyId"
      @editOrder="editOrderFun"
    >
    </edit-drawer>
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
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCode">下 载</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
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
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCode">下 载</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>
    <el-dialog
      :title="hcodeTitleno"
      :visible.sync="hcodeOpenno"
      width="800px"
      append-to-body
    >
      <div class="code_img">
        <img :src="hcodeImgno" alt="" />
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCode">下 载</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>
    <!-- 续费 -->
    <renew-contract
      :visible.sync="renewals"
      :form="renewForm"
      :orderId="orderId"
    ></renew-contract>
    <!-- 主管审核详情 -->
    <el-dialog
      title="主管审核详情"
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
                v-if="orderParticularsList.nzAudit == 10"
              >
                审核中
              </el-radio>
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.nzAudit == 20"
              >
                通过
              </el-radio>
              <el-radio
                v-model="radio"
                label="1"
                class="price"
                v-if="orderParticularsList.nzAudit == 30"
              >
                未通过
              </el-radio>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="sonBox">
              <span class="right14">审核备注:</span>
              <span class="price">{{
                orderParticularsList.nzAuditRemarks
              }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{ orderParticularsList.nzAuditTime }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{ orderParticularsList.nzAuditName }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 修改合同 -->
    <!-- <revise-contract
      :visible.sync="reviseContractJudge"
      :form="reviseContractForm"
      :orderId="orderId"
      :heText="heText"
    ></revise-contract> -->
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
                ref="multipleTable"
                :data="reviseContractForm.marketBusirSerprices"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <!-- <el-table-column
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
                </el-table-column> -->
                <el-table-column
                  type="selection"
                  align="center"
                  :selectable="
                    (row, index) => {
                      return !xufei && row.contractFlag != 10;
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
    <!-- 查看详情 -->
    <edit-contract
      :visible.sync="contractShow"
      :orderId="detailId"
      :contractId="contractId"
      :order="detailForm"
    ></edit-contract>
  </div>
</template>

<script>
import {
  listContract,
  getContract,
  delContract,
  addContract,
  updateContract,
  exportContract,
  updateCode,
  updateH5Code,
  updateNoH5Code,
  getContractDetail,
  fakeDelContract,
} from "@/api/crm/contract";
import {
  listOrder,
  selectNewContractParticulars, //修改合同的合同详情
  contractUpdate, ////修改合同的合同详情--提交
} from "@/api/crm/order";
import { contractProjectRenewalDetails } from "@/api/crm/customerService/agentAccount";
import { mapGetters } from "vuex";
import pdfShow from "@/components/Pdf/show";
import EditDrawer from "@/views/components/EditDrawer/index";
import RenewContract from "@/views/components/RenewContract";
// import ReviseContract from "@/views/components/ReviseContract";
import { tokenKey } from "@/settings";
import EditContract from "@/views/components/EditContract";
import { CompanyDepartmentPersonnel } from "@/api/crm/finance/customer";
import { _getSessionStore } from "@/utils/storage";
import { delImgfile } from "@/api/crm/companyImgfile";
export default {
  components: {
    pdfShow,
    EditDrawer,
    RenewContract,
    EditContract,
    // ReviseContract,
  },
  name: "Contract",
  data() {
    return {
      feesCycleList: [], //收费周期
      heText: "修改合同",
      fileUrl:
        process.env.VUE_APP_CRM_API + "/hmkj-crm/marketCompbusiImgfile/upload", //附件上传
      feesList: [],
      detailForm: {},
      headers: {
        Authorization: _getSessionStore(tokenKey),
      },
      xufei: "查看详情",
      contractShow: false,
      detailId: "", //订单详情id
      contractId: "", //续费合同id
      innertentAuditDetail: false, //主管审核详情
      reviseContractJudge: false, //修改合同判断值
      reviseContractForm: {}, //修改合同
      // 树状菜单显示状态
      showStatus: false,
      // 输入框宽度
      width: String,
      // 菜单宽度
      treeWidth: "auto",
      // 输入框显示值
      labelModel: "",
      // 实际请求传值
      valueModel: "0",
      // 公司树选项
      companyOptions: [],
      direction: "rtl",
      view: false,
      sourceTypeLvCut: "", //切换状态值
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      renewals: false, //续费合同显隐状态
      renewForm: {}, //续费合同绑定数据源
      orderId: "", //续费合同id
      // 显示搜索条件
      showSearch: false,
      delSwitch: [],
      // 总条数
      total: 0,
      // 业务订单合同表格数据
      contractList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        contracttimeList: [],
        contractStartTime: null,
        contractEndTime: null,
        // sourceTypeLv:'0',
        timeScreening: null,
        name: null,
        companyId: null,
        compayBusirId: null,
        companyName: "",
        url: null,
        controlNo: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        state: null,
        validity: null,
        money: null,
        signingDate: null,
        signBill: null,
        expire: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        companyId: [
          {
            required: true,
            message: "公司Id不能为空",
            trigger: "blur",
          },
        ],
        compayBusirId: [
          {
            required: true,
            message: "公司业务订单Id不能为空",
            trigger: "blur",
          },
        ],
        controlNo: [
          {
            required: true,
            message: "合同编号不能为空",
            trigger: "blur",
          },
        ],
        money: [
          {
            required: true,
            message: "合同金额不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "合同名称不能为空",
            trigger: "blur",
          },
        ],
        signBill: [
          {
            required: true,
            message: "签约人不能为空",
            trigger: "blur",
          },
        ],
        signingDate: [
          {
            required: true,
            message: "签约时间不能为空",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "合同状态不能为空",
            trigger: "blur",
          },
        ],
        url: [
          {
            required: true,
            message: "合同存储路径不能为空",
            trigger: "blur",
          },
        ],
        validity: [
          {
            required: true,
            message: "合同有效期不能为空",
            trigger: "blur",
          },
        ],
      },
      pdfUrl: "",
      changeData: {},
      pdfShow: false,
      companyId: null,
      drawerShow: false,
      codeTitle: "",
      codeOpen: false,
      codeImg: "",
      hcodeTitle: "",
      hcodeOpen: false,
      hcodeImg: "",
      hcodeTitleno: "",
      hcodeOpenno: false,
      hcodeImgno: "",
      radio: "1",
      filePath: process.env.VUE_APP_FILE_API,
      contratTitle: null,
      contratOpen: false,
      contratForm: {},
      orderParticularsList: {}, //审核详情数据
    };
  },
  created() {
    this.getCompanyList();
    this.getDicts("fees_cycle").then((res) => {
      this.feesCycleList = res.data;
    });
    // 检测输入框原有值并显示对应 label
    if (this.value || this.value == 0) {
      //初始值可能为0
      this.labelModel = this.queryTree(this.data, this.value);
    }

    this.getDicts("del_switch").then((res) => {
      this.delSwitch = res.data;
    });
    this.getList();
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    isNeiZhang() {
      return this.$store.getters.roleCodes.some((item) => {
        return (
          item == "marketCompanyBusirInternalAccount" ||
          item == "marketCompanyBusirInternalAccountClerk"
        );
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    // 修改合同-提交按钮
    contractSubmits() {
      let data = {
        id: this.reviseContractForm.id,
        // compayBusirId: this.orderId,
        controlNo: this.reviseContractForm.controlNo, //合同编号
        busirSerpriceIds: this.reviseContractForm.busirSerpriceIds, //服务项目的id (多个)
        companyId: this.reviseContractForm.companyId, //公司id
        money: this.reviseContractForm.money, //合同金额
        servicePeriodEnd: this.reviseContractForm.servicePeriodEnd,
        // signingDate: this.reviseContractForm.signingDate, //签约时间
        signingDate: this.reviseContractForm.signingDate,
        validity: this.reviseContractForm.validity, //合同生效期
        // evidenceAssociate: this.form.evidenceAssociate, //凭证交接: (10 邮寄, 20自取)
        imgfileIds: this.reviseContractForm.imgfileIds
          ? this.reviseContractForm.imgfileIds.toString()
          : "",
      };
      console.log(this.heText);
      if (this.heText == "变更合同") {
        data.changeType = 10;
        data.changeRemarks = this.reviseContractForm.changeRemarks || "";
        contractUpdate(data).then((res) => {
          this.reviseContractJudge = false;
          this.getList();
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
            this.getList();
            this.msgSuccess("提交成功");
            this.reviseContractJudge = false;
          });
        }
      }
    },
    //主管审核详情
    innertentAuditDetailUp(row) {
      this.orderParticularsList = row;
      this.innertentAuditDetail = true; //主管审核详情
    },
    //审核状态
    auditState(data) {
      if (data == 10) {
        return "待审核";
      } else if (data == 20) {
        return "审核成功";
      } else if (data == 30) {
        return "审核失败";
      }
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
          imgfileIds: this.reviseContractForm.imgfileIds
            ? this.reviseContractForm.imgfileIds.toString()
            : "",
        };
      });
    },
    getCompanyList() {
      CompanyDepartmentPersonnel({}).then((response) => {
        let companyOptions = response.data;
        this.companyOptions = companyOptions || [];
        this.getList();
      });
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
      delImgfile({ id: file.id }).then((res) => {
        this.msgSuccess("图片删除成功");
      });
    },
    handlePreview(file) {
      // console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibles = true;
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
    // 单击节点
    onClickNode(node) {
      this.queryParams.companyId = data.companyId;
      this.labelModel = node[this.props.label];
      this.valueModel = node[this.props.rowId];
      this.onCloseTree();
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
    handleNodeClick(data, checked) {
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
    // 树节点过滤方法
    filterNode(query, data) {
      if (!query) return true;
      return data[this.props.label].indexOf(query) !== -1;
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
    //续费合同
    renew(row) {
      this.renewForm.xufei = false;
      let rows = {
        id: row.id,
        renewType: row.renewType,
        xufei: this.renewForm.xufei,
      };
      this.renewForm = rows;
    },
    // 作废
    handleCancel(row) {
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
          this.getList();
          this.msgSuccess("作废成功");
        })
        .catch(function () {});
    },

    //打开续费合同
    openRenForm() {
      this.view = true;
    },
    /** 查询业务订单合同列表 */
    getList() {
      let data = JSON.parse(JSON.stringify(this.queryParams));
      this.queryParams.contractStartTime = data.contracttimeList[0];
      this.queryParams.contractEndTime = data.contracttimeList[1];
      this.sourceTypeLvCut = this.queryParams.timeScreening || "";
      if (this.queryParams.timeScreening == "0") {
        this.queryParams.timeScreening = null;
      }
      this.loading = true;
      listContract(this.queryParams).then((response) => {
        this.contractList = response.data.rows;
        this.contractList.map((items) => {
          items.controlType =
            items.controlNo.substring(0, 2) == "HM" ? "HM" : "HT";
        });

        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.codeOpen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        companyId: null,
        compayBusirId: null,
        url: null,
        controlNo: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        state: null,
        validity: null,
        money: null,
        signingDate: null,
        signBill: null,
      };
      this.resetForm("form");
    },
    updateDate(data) {
      updateContractAndSerprice(data).then((res) => {
        // console.info(res);
      });
    },
    handleTableQuery(e) {
      this.queryParams.companyName = "";
      this.queryParams.signingDate = "";
      this.queryParams.state = "";
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
      this.resetQuery();
      this.queryParams.pageNo = 1;
      this.queryParams.timeScreening = this.sourceTypeLvCut;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        contracttimeList: [],
        contractStartTime: null,
        contractEndTime: null,
        // sourceTypeLv:'0',
        timeScreening: null,
        name: null,
        companyId: null,
        compayBusirId: null,
        companyName: "",
        url: null,
        controlNo: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        state: null,
        validity: null,
        money: null,
        signingDate: null,
        signBill: null,
        expire: null,
      };
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加业务订单合同";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getContract({
        id: id,
      }).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改业务订单合同";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateContract(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addContract(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除业务订单合同编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delContract({
            id: ids,
          });
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有业务订单合同数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportContract(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
    delSwitchFormat(row) {
      return this.selectDictLabel(this.delSwitch, row.delSwitch);
    },
    // 查看订单信息
    orderShowFun(row) {
      this.companyId = row.companyId;
      this.$refs.editDrawer.editOrderFun(row);
    },
    editOrderFun() {},

    // 查看合同
    handleShow(row) {
      console.log(row);
      if (row.controlType == "HM") {
        this.pdfUrl = row.path || "";
        this.pdfShow = true;
      } else {
        getContractDetail({
          id: row.id,
        }).then((res) => {
          let images = [];
          this.contratForm = {
            signingDate: res.data.signingDate,
            servicePeriodEnd: res.data.servicePeriodEnd,
            servicePeriodStart: res.data.servicePeriodStart,
            money: res.data.money,
            images: [],
          };
          res.data.marketCompbusiImgfileResults.map((items) => {
            images.push(items.url);
          });
          this.contratForm.images = images;
          this.contratTitle = "合同内容";
          this.contratOpen = true;
        });
      }
    },
    // 生成二维码
    handleCode(row) {
      // console.log(row)
      let id = row.id;
      // let id = '1394935582262874113'
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
      // let id = '1394935582262874113'
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
    // 生成免登录H5二维码
    handleNoH5Code(row) {
      console.log(row);
      let id = row.id;
      // let id = '1394935582262874113'
      updateNoH5Code({
        id: id,
      }).then((res) => {
        if (res.code == 200) {
          this.hcodeTitleno = "合同编号:" + row.controlNo + "的H5二维码";
          this.hcodeOpenno = true;
          this.hcodeImgno = res.data;
        }
      });
    },
  },
};
</script>
<style lang='scss'>
.code_img {
  /* width: 100%;
    height: 500px; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.orderParticulars {
  .el-dialog {
    .el-dialog__body {
      padding-bottom: 50px;

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
