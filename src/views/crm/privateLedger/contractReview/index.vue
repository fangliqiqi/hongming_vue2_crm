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
      <el-tabs v-model="carryIndex" @tab-click="handleQuerys">
        <el-tab-pane label="全部合同" value="1" name="1"></el-tab-pane>
        <el-tab-pane label="变更审核" value="2" name="2"> </el-tab-pane>
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
        <el-table-column
          label="客户名称"
          align="left"
          prop="companyName"
          width="180"
        />
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
        <!-- <el-table-column
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
        </el-table-column> -->
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
            <div v-if="carryIndex == 1">
              <el-button
                v-show="scope.row.nzAudit == 10"
                type="warning"
                plain
                v-hasPermi="['share:contract:edit']"
                >审核中</el-button
              >
              <el-button
                v-show="scope.row.nzAudit == 20"
                plain
                type="primary"
                v-hasPermi="['share:contract:edit']"
                >审核成功</el-button
              >
              <el-button
                v-show="scope.row.nzAudit == 30"
                type="danger"
                plain
                v-hasPermi="['share:contract:edit']"
                >审核失败</el-button
              >
            </div>
            <div v-else>
              <el-button
                v-show="scope.row.nzChange == 10"
                type="warning"
                plain
                v-hasPermi="['share:contract:edit']"
                >审核中</el-button
              >
              <el-button
                v-show="scope.row.nzChange == 20"
                type="primary"
                plain
                v-hasPermi="['share:contract:edit']"
                >审核成功</el-button
              >
              <el-button
                v-show="scope.row.nzChange == 30"
                type="danger"
                plain
                v-hasPermi="['share:contract:edit']"
                >审核失败</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <div v-if="carryIndex == 1">
              <el-button type="text" @click.native="openDetail(scope.row)">
                {{ scope.row.nzAudit == "10" ? "审核" : "审核详情" }}
              </el-button>
            </div>
            <div v-else>
              <el-button type="text" @click.native="openDetails(scope.row)">
                {{ scope.row.nzChange == "10" ? "审核" : "审核详情" }}
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

          <el-col :span="24">
            <el-form-item label="关联服务项">
              <el-table
                :row-style="{ height: '50px' }"
                :header-cell-style="{ height: '42px' }"
                ref="table"
                :data="contratForm.marketBusirSerprices"
                tooltip-effect="dark"
                style="width: 100%"
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
                <el-table-column label="收费周期" width="90" prop="cycleType">
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
                      >
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
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
    <!-- 合同订单审核 -->
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
          <el-col v-if="carryIndex == 2" :span="12">
            <el-form-item label="申请理由">
              <el-input
                type="textarea"
                style="width: 440px; height: 50px"
                placeholder="请填写申请理由"
                v-model="auditData.changeApplication"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
                <el-radio value="20" label="20">通过</el-radio>
                <el-radio value="30" label="30">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20"> </el-row>
        <el-row :gutter="20">
          <el-col v-if="carryIndex == 1" :span="24" class="remarks">
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
                v-model="auditData.nzAuditRemarks"
              />
            </el-form-item>
          </el-col>
          <el-col v-else :span="24" class="remarks">
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
                v-model="auditData.nzChangeRemarks"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shenHeCancel">取 消</el-button>
        <el-button
          v-if="carryIndex == 1"
          :disabled="auditData.nzAudit !== '10'"
          type="primary"
          @click="shenHeSubmitForm"
          >确认审核</el-button
        >
        <el-button
          v-else
          :disabled="auditData.nzChange !== '10'"
          type="primary"
          @click="shenHeSubmitForms"
          >确认审核</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectContractReviewList, //合同审核列表
  selecctChangeListPage, //变更审核列表
  contractReview,
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
  nzChangeListPage, //变更审核列表
  nzChangeAudit, //确认边更审核
} from "@/api/crm/runProposer/runProposer"; //流失审核
import { contractProjectRenewalDetails } from "@/api/crm/customerService/agentAccount";
import { mapGetters } from "vuex";
import pdfShow from "@/components/Pdf/show";
import EditDrawer from "@/views/components/EditDrawer/index";
import RenewContract from "@/views/components/RenewContract";
import { CompanyDepartmentPersonnel } from "@/api/crm/finance/customer";
import {
  selectNewContractParticulars, //查看合同详情
} from "@/api/crm/order";

export default {
  components: {
    pdfShow,
    EditDrawer,
    RenewContract,
  },
  name: "ContractReview",
  data() {
    return {
      // 树状菜单显示状态
      showStatus: false,
      auditData: {}, //合同审核弹出窗表单
      // 输入框宽度
      width: String,
      // 菜单宽度
      treeWidth: "auto",
      // 输入框显示值
      labelModel: "",
      // 实际请求传值
      valueModel: "0",
      collectionScreenshotList: [], //审核收款截图回显
      orderReview: false,
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
      carryIndex: "1", //切换的时候
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        contracttimeList: [],
        contractStartTime: null,
        contractEndTime: null,
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
      pdfShow: false,
      companyId: null,
      drawerShow: false,
      codeTitle: "",
      hcodeTitle: "",
      codeOpen: false,
      codeImg: "",
      hcodeImg: "",
      hcodeOpen: false,
      hcodeTitleno: "",
      orderParticularsList: {},
      innertentAuditDetail: false,
      hcodeOpenno: false,
      hcodeImgno: "",
      filePath: process.env.VUE_APP_FILE_API,
      contratTitle: null,
      contratOpen: false,
      contratForm: {},
      nzAudit: "20", //审核是否通过
    };
  },
  created() {
    this.getCompanyList();
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
    // 查看合同
    handleShow(row) {
      console.log(row);
      if (row.dzContractType == "10" || row.dzContractType == 10) {
        this.pdfUrl = row.path || "";
        this.pdfShow = true;
      } else {
        selectNewContractParticulars({
          id: row.id,
        }).then((res) => {
          let images = [];
          this.contratForm = {
            signingDate: res.data.signingDate,
            servicePeriodEnd: res.data.servicePeriodEnd,
            servicePeriodStart: res.data.servicePeriodStart,
            money: res.data.money,
            images: [],
            marketBusirSerprices:res.data.marketBusirSerprices
          };
          res.data.marketCompbusiImgfileResults.map((items) => {
            images.push(items.url);
          });
          this.contratForm.images = images;
          console.log(this.contratForm);
          this.contratTitle = "合同内容";
          this.contratOpen = true;
        });
      }
    },
    //合同订单确认审核
    shenHeSubmitForm() {
      let companyForm = {
        id: this.auditData.id,
        nzAudit: this.nzAudit,
        nzAuditRemarks: this.auditData.nzAuditRemarks,
        changeApplication: this.auditData.changeApplication,
      };
      contractReview(companyForm).then((response) => {
        if (response.code == 200) {
          this.msgSuccess("提交成功！");
          this.orderReview = false; //订单审核
          this.getList();
          this.auditData = {};
        }
      });
    },
    //合同订单确认审核
    shenHeSubmitForms() {
      let companyForm = {
        id: this.auditData.ccrId,
        nzChange: this.nzAudit,
        nzChangeRemarks: this.auditData.nzChangeRemarks,
      };
      nzChangeAudit(companyForm).then((response) => {
        if (response.code == 200) {
          this.msgSuccess("提交成功！");
          this.orderReview = false; //订单审核
          this.getList();
          this.auditData = {};
        }
      });
    },
    shenHeCancel() {
      this.orderReview = false;
    },
    //合同订单审核
    openDetail(row) {
      this.auditData = row;
      this.orderReview = true;
      if (row.nzAudit == "10") {
        this.nzAudit = "";
      } else {
        this.nzAudit = row.nzAudit;
      }
      console.log(11111);
      console.log(row);
      console.log(this.nzAudit);
    },
    //合同订单审核
    openDetails(row) {
      this.auditData = row;
      this.orderReview = true;
      if (row.nzChange == "10") {
        this.nzAudit = "";
      } else {
        this.nzAudit = row.nzChange;
      }
      console.log(222222);
      console.log(row);
      console.log(this.nzAudit);
    },
    getCompanyList() {
      CompanyDepartmentPersonnel({}).then((response) => {
        let companyOptions = response.data;
        this.companyOptions = companyOptions || [];
        this.getList();
      });
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

    //打开续费合同
    openRenForm() {
      this.view = true;
    },
    /** 查询业务订单合同列表 */
    getList() {
      let data = JSON.parse(JSON.stringify(this.queryParams));
      console.log(data);
      this.queryParams.contractStartTime = data.contracttimeList[0];
      this.queryParams.contractEndTime = data.contracttimeList[1];
      this.loading = true;
      if (this.carryIndex == "1") {
        selectContractReviewList(this.queryParams).then((response) => {
          this.contractList = response.data.records || [];
          if (this.contractList) {
            this.contractList.map((items) => {
              items.controlType =
                items.controlNo.substring(0, 2) == "HT" ? "HT" : "HM";
            });
          }
          this.total = response.data.total || 0;
          this.loading = false;
        });
      } else {
        nzChangeListPage(this.queryParams).then((response) => {
          this.contractList = response.data.rows || [];
          if (this.contractList) {
            this.contractList.map((items) => {
              items.controlType =
                items.controlNo.substring(0, 2) == "HT" ? "HT" : "HM";
            });
          }
          this.total = response.data.total || 0;
          this.loading = false;
        });
      }
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
.code_img {
  /* width: 100%;
    height: 500px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
