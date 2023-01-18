<template>
  <div class="app-container onlyClass">
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
                      >待签字</el-radio
                    >
                    <el-radio v-model="queryParams.state" label="2"
                      >完成</el-radio
                    >
                    <el-radio v-model="queryParams.state" label="3"
                      >作废</el-radio
                    >
                    <!-- <el-radio v-model="queryParams.state" label="4"
                      >待签字</el-radio
                    > -->
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
          <el-input
            class="ml8"
            v-model="queryParams.companyName"
            placeholder="请输入公司名称或合同编号"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuerys"
          />
          <el-button size="small" type="primary" class="ml8" @click="blankAdd">
            <span>
              <i class="el-icon-plus"></i>
              新建空白合同
            </span>
          </el-button>
          <!-- <el-button
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
        <el-tab-pane label="空白合同" value="10" name="10"> </el-tab-pane>
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
      <el-form-item label="合同有效期" prop="validity">
        <el-input
          v-model="queryParams.validity"
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
          style="width: 100px"
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
        <el-table-column type="selection" width="55" align="left" />
        <!--        <el-table-column label="递增主键id" align="center" prop="id" />-->
        <el-table-column
          label="合同名称"
          align="left"
          prop="name"
          width="120"
        />
        <el-table-column
          label="公司名称"
          align="left"
          prop="companyName"
          min-width="120"
        />
        <el-table-column
          label="公司订单编号"
          align="left"
          prop="orderNo"
          width="180"
        />
        <!-- <el-table-column label="合同存储路径" align="left" prop="url"  width="110"/> -->
        <!-- <el-table-column label="合同编号" align="left" prop="controlNo" /> -->
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
        <!-- <el-table-column label="备注 " align="left" prop="remarks" /> -->
        <!--        <el-table-column label="删除开关标识" align="center" prop="delSwitch" :formatter="delSwitchFormat" />-->
        <el-table-column
          label="合同状态"
          align="right"
          width="150"
          class-name="small-padding fixed-width"
        >
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
          </template>
        </el-table-column>
        <el-table-column
          label="小程序二维码"
          width="130"
          align="center"
          class-name="small-padding fixed-width"
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
          width="150"
          align="center"
          class-name="small-padding fixed-width"
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

        <!-- <el-table-column label="免登录H5二维码" width="150" align="center" class-name="small-padding fixed-width" >
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.state==1"
              type="primary" plain
              icon="el-icon-picture-outline-round"
              @click="handleNoH5Code(scope.row)"
              v-hasPermi="['share:contract:edit']"
            >免登录H5二维码</el-button>
          </template>
        </el-table-column> -->

        <el-table-column
          label="合同有效期"
          align="left"
          prop="validity"
          width="100"
        >
          <template slot-scope="scope">
            <span>{{
              parseTime(scope.row.servicePeriodEnd, "{y}-{m}-{d}")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合同金额" align="left" prop="money" />
        <el-table-column
          label="签约时间"
          align="left"
          prop="signingDate"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.signingDate, "{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="签单人" align="left" prop="signBill">
        </el-table-column>
        <el-table-column width="140" label="审核状态" align="left">
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
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="scope">
            <div>
              <!-- <el-button
                type="text"
                style="color: #e6a23c"
                v-if="
                  (scope.row.orderType == 20 || scope.row.orderType == 30) &&
                  scope.row.successfulRenewal == ''
                "
                @click.native="renew(scope.row)"
                >续费
              </el-button> -->
              <el-button
                style="color: #67c23a"
                type="text"
                @click="openDetail(scope.row)"
                v-if="scope.row.nzAudit == 20 || scope.row.nzAudit == 10"
                >预览
              </el-button>
              <!-- <el-button
                style="color: #f56c6c"
                type="text"
                @click="handleCancel(scope.row)"
                v-if="scope.row.nzAudit == '' || scope.row.nzAudit == 30"
                >作废
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
          </el-col> </el-row
        ><el-row>
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
          </el-col> </el-row
        ><el-row :gutter="20">
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
          </el-col> </el-row
        ><el-row :gutter="20">
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
          </el-col> </el-row
        ><el-row :gutter="20">
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
          </el-col> </el-row
        ><el-row :gutter="20">
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
    </el-dialog>
    <!-- 空白合同新增 -->
    <el-dialog
      :title="blankTitle"
      :visible.sync="blankVisible"
      width="704px"
      append-to-body
      custom-class="order_dialogss"
    >
      <div>
        <div class="order_vi">
          <div class="bgfff flex-col">
            <el-form
              ref="orderForm"
              class="mt20 mb10"
              :model="blankForm"
              :rules="rules"
              size="small"
              label-position="top"
            >
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="签约公司">
                    <el-autocomplete
                      class="inline-input"
                      v-model="blankForm.companyName"
                      :fetch-suggestions="querySearch"
                      placeholder="请输入公司名称"
                      :trigger-on-focus="false"
                      @select="companySelect"
                    ></el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同类型">
                    <el-select
                      v-model="blankForm.companyName"
                      placeholder="请选择合同类型"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公章名称">
                    <el-select
                      v-model="blankForm.officialSealId"
                      placeholder="请选择公章名称"
                    >
                      <el-option
                        v-for="item in officialSealResults"
                        :key="item.id"
                        :label="item.officialSealName"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="合同金额">
                    <el-input
                      v-model="blankForm.money"
                      placeholder="请输入合同金额"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同签约时间">
                    <el-date-picker
                      v-model="blankForm.createDate"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同生效时间">
                    <el-date-picker
                      v-model="blankForm.servicePeriodStart"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="合同结束时间">
                    <el-date-picker
                      v-model="blankForm.servicePeriodEnd"
                      type="date"
                      placeholder="请选择合同结束时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="bgfff mt20 flex-col">
            <div class="title_vi">
              <span
                >服务项目 ({{
                  (blankForm.product && blankForm.product.length) || 0
                }})</span
              >
              <div>
                <el-button
                  type="primary"
                  plain
                  size="mini"
                  @click="addServeFun(20)"
                  >添加服务项目
                </el-button>
              </div>
            </div>
            <div>
              <el-table :data="blankForm.product">
                <el-table-column
                  prop="serpriceName"
                  label="服务项"
                ></el-table-column>
                <el-table-column
                  prop="price"
                  label="原价 (元/次)"
                ></el-table-column>
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
                <el-table-column prop="" label="" align="center" width="80">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="default"
                      icon="el-icon-edit-outline"
                      @click="updateServeFun(scope.row)"
                    ></el-button>
                    <el-button
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
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="nextStep">下一步 </el-button>
            <el-button @click="blankVisible = false">取消 </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--      新增服务项-->
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
        :model="blankForm"
        :rules="serveRules"
        ref="serveForm"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="服务名称" prop="serpriceId">
              <el-cascader
                v-model="blankForm.serpriceId"
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
            <el-form-item class="nolabel" label=".">
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
                v-model="blankForm.period"
                type="monthrange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                value-format="yyyy-MM-dd"
                @change="changeServiceTimes(blankForm.period)"
                :picker-options="serviceTime"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="服务时间" prop="period" v-else>
              <el-date-picker
                v-model="blankForm.period"
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
          <el-col :span="12" v-if="blankForm.isPresented == '20'">
            <el-form-item label="收费周期" prop="cycleType">
              <el-select v-model="blankForm.cycleType">
                <el-option
                  v-for="item in feesCycleList.filter((item) => {
                    return blankForm.serveType == 10
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
                v-model="blankForm.price"
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
          <el-col :span="12" v-if="blankForm.isPresented == '20'">
            <el-form-item
              label="实际单价"
              prop="moneyReceived"
              v-if="bookFeesType == 20"
            >
              <el-input
                class="yuanc"
                @change="handleBlur(10)"
                v-model.number="blankForm.moneyReceived"
                placeholder="请输入价格"
              ></el-input>
            </el-form-item>
            <el-form-item label="实际单价" prop="moneyReceived" v-else>
              <el-input
                class="yuanc"
                v-model.number="blankForm.moneyReceived"
                placeholder="请输入价格"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="serveShow = false">取消</el-button>
        <el-button type="primary" @click="addServe">保存</el-button>
      </div>
    </el-dialog>
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
          <el-col :span="10">
            <div class="sonBox">
              <span class="right4">审核人:</span>
              <span class="price">{{ orderParticularsList.nzAuditName }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 变更审核详情 -->
    <el-dialog
      title="审核详情"
      :visible.sync="changeAuditDetail"
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
          <el-col :span="10">
            <div class="sonBox">
              <span class="right4">审核人:</span>
              <span class="price">{{ orderParticularsList.nzAuditName }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--    新建服务项目  -->
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
    <!-- 查看详情 -->
    <edit-contract
      :visible.sync="contractShow"
      :orderId="detailId"
      :contractId="contractId"
      :order="detailForm"
    ></edit-contract>
    <!-- 续费 -->
    <renew-contract
      :visible.sync="renewals"
      :form="renewForm"
      :orderId="orderId"
    ></renew-contract>
  </div>
</template>

<script>
import {
  listMyContract,
  getXufeiContractInfo,
  selectMyClient,
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
import { selectProject, ServiceItem, AddConfirmService } from "@/api/crm/order";
import { isPromise, throttle } from "@/utils/hmt";
import RenewContract from "@/views/components/RenewContract";
import { mapGetters } from "vuex";
import pdfShow from "@/components/Pdf/show";
import EditContract from "@/views/components/EditContract";
export default {
  components: {
    pdfShow,
    EditContract,
    RenewContract,
  },
  name: "Contract",
  data() {
    var validateMinZero = (rule, value, callback) => {
      if (value > 0) {
        return callback();
      } else {
        return callback(new Error("价格必须大于0,请于赠送项目添加"));
      }
    };
    return {
      changeAuditDetail: false, //变更审核详情
      detailForm: {},
      contractShow: false,
      detailId: "", //订单详情id
      contractId: "", //续费合同id
      serviceTime: {
        shortcuts: [
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const current = new Date();
              let year = current.getFullYear();
              let month = current.getMonth();
              let start = new Date(year, month, "1");
              end.setTime(new Date(year, month + 3, 0));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const current = new Date();
              let year = current.getFullYear();
              let month = current.getMonth();
              let start = new Date(year, month, "1");
              end.setTime(new Date(year, month + 6, 0));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一年",
            onClick(picker) {
              // 结束日期
              const end = new Date();
              console.log(end);
              // 当前日期
              const current = new Date();
              console.log(current);
              let year = current.getFullYear();
              console.log(year); //2021
              let month = current.getMonth();
              console.log(month); //4
              // 开始日期
              let start = new Date(year, month, "1");
              end.setTime(new Date(year, month + 12, 0));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近两年",
            onClick(picker) {
              const end = new Date();
              const current = new Date();
              let year = current.getFullYear();
              let month = current.getMonth();
              let start = new Date(year, month, "1");
              end.setTime(new Date(year, month + 24, 0));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三年",
            onClick(picker) {
              const end = new Date();
              const current = new Date();
              let year = current.getFullYear();
              let month = current.getMonth();
              let start = new Date(year, month, "1");
              end.setTime(new Date(year, month + 36, 0));
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
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
      feesCycleList: [], //收费周期
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
      renewals: false, //续费合同显隐状态
      orderId: "", //续费合同id
      bookFees: 200, //账本费
      restaurants: [],
      company: [], //公司数据
      serviceForm: {
        name: "",
        price: null,
        businessType: "",
        parentId: "",
      }, //新增服务项目
      companyName: "", //签约公司
      blankForm: {}, //空白合同
      blankVisible: false, //空白合同遮罩层
      blankTitle: "新增空白合同", //空白合同标题
      proTypeList: [], //服务类型数据
      innertentAuditDetail: false,
      orderParticularsList: {},
      // 遮罩层
      loading: true,
      orderTypeactive: null,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,

      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      delSwitch: [],
      bookFeesType: 10, //是否为记账类型
      giftItems: true, //赠送项
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
        // sourceTypeLv:'0',
        contracttimeList: [],
        contractStartTime: null,
        contractEndTime: null,
        timeScreening: null,
        name: null,
        companyId: null,
        compayBusirId: null,
        url: null,
        controlNo: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        // sourceTypeLv:'',
        state: null,
        validity: null,
        money: null,
        signingDate: null,
        signBill: null,
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
      serviceList: [], //所属服务项
      pdfUrl: "",
      pdfShow: false,
      codeTitle: "",
      radio: "1",
      queryString: "",
      codeOpen: false,
      codeImg: "",
      hcodeTitle: "",
      hcodeOpen: false,
      hcodeImg: "",
      hcodeTitleno: "",
      officialSealResults: [], //公章数据
      hcodeOpenno: false,
      hcodeImgno: "",
      filePath: process.env.VUE_APP_FILE_API,
      contratTitle: null,
      contratOpen: false,
      serve: {},
      serveTitle: "添加服务项目",
      serveShow: false, //新增服务项
      contratForm: {},
      showDialog: false,
      renewForm: {},
    };
  },

  created() {
    this.getDicts("fees_cycle").then((res) => {
      this.feesCycleList = res.data;
    });
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
    //下一步生成电子合同
    nextStep() {},
    //保存服务项目
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
          serve.orderType = this.form.type;
          serve.startTime = serve.period[0];
          serve.endTime = serve.period[1];
          if (serve.isPresented == 10) {
            serve.moneyReceived = 0;
          }
          // console.info(serve)
          if (serve.id) {
            this.serveShow = false;
            updateServe(serve).then((res) => {
              this.getData();
            });
          } else {
            this.serveShow = false;
            if (serve.isPresented == 10) {
              addGiveSerprice(serve).then((res) => {
                if (res.code == 200) {
                  this.msgSuccess("提交成功！");
                  this.getData();
                }
              });
            } else {
              addBusirAndSerprice(serve).then((res) => {
                if (res.code == 200) {
                  this.msgSuccess("提交成功！");
                  this.getData();
                }
              });
            }
          }
        }
      });
    }),
    //提交新增服务项
    ConfirmService() {
      this.showDialog = false;
      AddConfirmService(this.serviceForm).then((res) => {
        if (res.code == 200) {
          this.msgSuccess("提交成功！");
          this.getProductTypeList();
        }
      });
    },
    //所属服务项
    serviceChange(row) {
      this.serviceList.forEach((item) => {
        if (item.id.indexOf(row) != -1) {
          this.serviceForm.businessType = item.businessType;
        }
      });
    },
    //主管审核详情
    innertentAuditDetailUp(row) {
      console.log(row);
      if (row.changeGeneralStatus) {
        this.changeAuditDetail = true;
        this.orderParticularsList = row;
      } else {
        this.orderParticularsList = row;
        this.innertentAuditDetail = true; //主管审核详情
      }
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
    //续签公司确认
    companySelect(e) {
      console.log(e);
      var id = e.name;
      getXufeiContractInfo({ id: id }).then((res) => {
        console.log(res);
        this.officialSealResults = res.data.officialSealResults || [];
      });
    },
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
      this.blankForm.serpriceName = proType.name;
      this.blankForm.accountType = proType.type;
      this.blankForm.price = proType.highestPrice
        ? proType.highestPrice
        : proType.price;
      if (this.blankForm.discountType == 10) {
        this.blankForm.moneyReceived = proType.price;
        this.blankForm.serveType = proType.type;
        this.blankForm.cycleType =
          proType.type == 10
            ? "100"
            : this.blankForm.cycleType == "100"
            ? "30"
            : this.blankForm.cycleType;
      }
      console.log(this.blankForm.moneyReceived);
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
    handleBlur(type, val) {
      // console.log(val);
      let obj2 = Object.assign({}, this.blankForm);
      if (this.bookFeesType == 20) {
        if (type == 10) {
          this.blankForm.moneyReceived = this.giftItems
            ? obj2.moneyReceived
            : this.blankForm.moneyReceived + this.bookFees;
        } else if (type == 20) {
          this.blankForm.moneyReceived = this.giftItems
            ? obj2.moneyReceived - this.bookFees
            : obj2.moneyReceived + this.bookFees;
        } else {
          this.blankForm.moneyReceived = obj2.moneyReceived;
        }
      } else if (this.bookFeesType != 20) {
        this.blankForm.moneyReceived = this.blankForm.price;
        // this.getProductTypeList();
      }
    },
    // 服务表单重置
    serveReset() {
      // this.blankForm = {
      //   id: null,
      //   busirId: this.form.id,
      //   companyId: this.form.companyId,
      //   serpriceId: null,
      //   serpriceName: null,
      //   cycleType: "30", //收费的周期(年,半年,季度,月)
      //   period: [], //收费的周期
      //   endTime: null, //产品结束的日期
      //   startTime: null, //产品开始的日期
      //   discountType: "10",
      //   isPresented: null, //是否为赠送
      //   price: null, //项目实际价格
      //   moneyReceived: null, //实收金额
      //   serveType: null, //服务类型
      // };
      this.blankForm = {
        cycleType: "30", //收费的周期(年,半年,季度,月)
        discountType: "10",
      };
      this.resetForm("serveForm");
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
    //获取产品类别列表
    getProductTypeList(row, cb) {
      console.log(row);
      let orderId = row && row.busirId;
      let data = { id: orderId || this.blankForm.id };
      if (row) {
        data.productId = row.id;
      }
      selectProject(data).then((res) => {
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
    //添加服务
    addServeFun(flag) {
      this.serveReset();
      this.serveShow = true;
      this.blankForm.isPresented = flag;
      this.getProductTypeList(flag);
    },
    querySearch(queryString, cb) {
      this.selectCompany(queryString, cb);
      //查询公司数据
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    //查询公司数据
    selectCompany(data, cb) {
      selectMyClient({ companyName: data }).then((res) => {
        if (res.data.rows) {
          var restaurants = res.data.rows.map((terminal) => {
            return {
              value: terminal.companyName,
              name: terminal.id,
            };
          });
        }
        console.log(restaurants);
        var results = data
          ? restaurants.filter(this.createFilter(data))
          : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      });
    },
    /** 查询业务订单合同列表 */
    getList() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      console.log(data);
      this.queryParams.contractStartTime = data.contracttimeList[0];
      this.queryParams.contractEndTime = data.contracttimeList[1];
      this.sourceTypeLvCut = this.queryParams.timeScreening || "";
      if (this.queryParams.timeScreening == "0") {
        this.queryParams.timeScreening = null;
      }
      console.log(this.queryParams);
      if (this.queryParams.timeScreening == "10") {
        this.queryParams.blankContractType = "10";
      } else {
        if (this.queryParams.blankContractType) {
          delete this.queryParams.blankContractType;
        }
      }
      listMyContract(this.queryParams).then((response) => {
        this.contractList = response.data.rows;
        this.contractList.map((items) => {
          items.name = items.name || "图片上传纸质合同";
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
      this.queryParams.timeScreening = this.sourceTypeLvCut;
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
        timeScreening: null,
        name: null,
        companyId: null,
        compayBusirId: null,
        url: null,
        controlNo: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        state: null,
        validity: null,
        companyName: "",
        money: null,
        signingDate: null,
        signBill: null,
      };
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增空白合同按钮操作 */
    blankAdd() {
      this.reset();
      this.blankVisible = true;
      this.blankTitle = "新增空白合同";
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加业务订单合同";
    },
    handleShow(row) {
      console.log(row);
      if (row.controlType == "HM") {
        this.pdfUrl = row.path || "";
        this.pdfShow = true;
      } else {
        getContractDetail({ id: row.id }).then((res) => {
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
          console.log(this.contratForm);
          this.contratTitle = "合同内容";
          this.contratOpen = true;
        });
      }
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getContract({ id: id }).then((response) => {
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
          return delContract({ id: ids });
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
    // 生成二维码
    handleCode(row) {
      // console.log(row)
      let id = row.id;
      // let id = '1394935582262874113'
      updateCode({ id: id }).then((res) => {
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
      updateH5Code({ id: id }).then((res) => {
        if (res.code == 200) {
          this.hcodeTitle = "合同编号:" + row.controlNo + "的H5二维码";
          this.hcodeOpen = true;
          this.hcodeImg = res.data;
        }
      });
    },
    // 生成免登录H5二维码
    handleNoH5Code(row) {
      console.log(row);
      let id = row.id;
      // let id = '1394935582262874113'
      updateNoH5Code({ id: id }).then((res) => {
        if (res.code == 200) {
          this.hcodeTitleno = "合同编号:" + row.controlNo + "的H5二维码";
          this.hcodeOpenno = true;
          this.hcodeImgno = res.data;
        }
      });
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
  },
};
</script>
<style lang="scss" scoped>
.code_img {
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/ .order_dialogss {
  background-color: #f5f6f8 !important;
  .dialog-footer {
    text-align: right;
    padding-top: 24px;
    margin-bottom: -8px;
  }
  .order_vi {
    height: calc(90vh - 260px - 36px);
    max-height: 100vh;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
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
