<template>
  <div class="app-container ExternalMyAccount">
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
              <el-form-item label="是否切老户"  prop="companies">
                <el-radio-group v-model="queryParams.companies">
                  <el-radio
                    v-for="item in yesNoList"
                    :label="item.dictCode"
                    >{{ item.dictLabel }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
                <el-form-item label="收票日期" prop="ticketDate">
                  <el-date-picker
                    v-model="ticketDate"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="票据记录跟进时间"
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
          <el-input
            class="ml8"
            v-model="queryParams.companyName"
            placeholder="请输入客户名称"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuerys"
          />
          <!-- <el-dropdown
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAdd"
          >
            <span>
              <i class="el-icon-plus"></i>
              新建商机
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%" @click.native="bulkImport"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-button
            class="ml8"
            icon="el-icon-download"
            size="small"
            @click="handleExport"
            v-if="false"
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
      <el-tabs v-model="tabStatus" @tab-click="handleClick">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <el-tab-pane label="审核通过" value="20" name="20"></el-tab-pane>
        <el-tab-pane label="审核未通过" value="30" name="30"></el-tab-pane>
         <el-tab-pane label="停止服务客户" value="60" name="60"></el-tab-pane>
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
    <div class="table-data">
      <el-table
        v-loading="loading"
        :data="BusinessList"
        :height="tableHeight"
        @selection-change="handleSelectionChange"
        class="agentForm"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="服务项目" prop="serpriceName" />
        <el-table-column label="客户名称" prop="companyName">
          <template slot-scope="scope">
            <el-button type="text"
              :disabled="scope.row.flowStatus == 10"
              @click="showDrawer(scope.row)">{{
              scope.row.companyName
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="收票时间" sortable prop="ticketTime">
          <template slot-scope="scope">
            {{ parseTime(scope.row.ticketTime, "{y}-{m}-{d} ") }}
          </template>
        </el-table-column>
        <el-table-column label="记账时间" sortable prop="figureOutTime" />
        <el-table-column label="报税时间" sortable />

       <el-table-column label="派工信息" :formatter="dispatchingSortFormat"  width="340">
         <template slot-scope="scope">
           <el-row
             :gutter="2"
             class="dispatchSteps"
             type="flex"
             justify="space-between"
           >
            <!-- <el-col
               :span="6"
               :class="
                 scope.row.dispatchingSort.includes(10)
                   ? ' bgorange'
                   : 'bgDarkGrey'
               "
             >
               <div>业</div>
             </el-col> -->
             <el-col
               :span="6"
               :class="
                 scope.row.salesman
                   ? ' bgorange'
                   : 'bgDarkGrey'
               "
             >
               <div>业</div>
             </el-col>
              <div style="margin-right:2px">{{ scope.row.salesman }}</div>
            <!-- <el-col
               :span="6"
               :class="
                 scope.row.dispatchingSort.includes(20)
                   ? ' bgorange'
                   : 'bgDarkGrey'
               "
             >
               <div>客</div>
             </el-col> -->
             <el-col
               :span="6"
               :class="
                 scope.row.customerServiceName
                   ? ' bgorange'
                   : 'bgDarkGrey'
               "
             >
               <div>客</div>
             </el-col>
              <div style="margin-right:2px">{{ scope.row.customerServiceName }}</div>
           <!--  <el-col
               :span="6"
               :class="
                 scope.row.dispatchingSort.includes(30)
                   ? ' bgorange'
                   : 'bgDarkGrey'
               "
             >
               <div>账</div>

             </el-col> -->
             <el-col
               :span="6"
               :class="
                 scope.row.foreignAccountName
                   ? ' bgorange'
                   : 'bgDarkGrey'
               "
             >
               <div>账</div>

             </el-col>
              <div style="margin-right:2px">{{ scope.row.foreignAccountName }}</div>
            <!-- <el-col
               :span="6"
               :class="
                 scope.row.dispatchingSort.includes(40)
                   ? ' bgorange'
                   : 'bgDarkGrey'
               "
             >
               <div>税</div>
             </el-col> -->
             <el-col
               :span="6"
               :class="
                 scope.row.foreignAccountName
                   ? ' bgorange'
                   : 'bgDarkGrey'
               "
             >
               <div>税</div>
             </el-col>
             <div style="margin-right:2px">{{ scope.row.foreignAccountName }}</div>
           </el-row>
         </template>
       </el-table-column>
        <el-table-column label="票据记录" prop="dispatchState">
          <template slot-scope="scope">
						<el-badge :is-dot='scope.row.wzUnread==20' class="item">
              <el-button
              :disabled="scope.row.flowStatus == 10"
                v-if="!scope.row.pjAuditStatus"
                size="mini"
                type="text"
                style="color:#3978E7"
                @click="handleRecord(scope.row)"
                v-hasPermi="['share:bank:edit']"
                >票据记录
              </el-button>
              <el-button
              :disabled="scope.row.flowStatus == 10"
                v-if="scope.row.pjAuditStatus==20"
                size="mini"
                type="text"
                style="color:#67C23A"
                @click="handleRecord(scope.row)"
                v-hasPermi="['share:bank:edit']"
                >票据记录
              </el-button>
              <el-button
              :disabled="scope.row.flowStatus == 10"
                v-if="scope.row.pjAuditStatus==30"
                size="mini"
                type="text"
                style="color:red"
                @click="handleRecord(scope.row)"
                v-hasPermi="['share:bank:edit']"
                >票据记录
              </el-button>
						</el-badge>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="停止原因 "
          align="center"
          prop="reasonStopping"
        /> -->
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-col :span="24" v-if="scope.row.flowStatus == 10">
              <el-button
                type="primary"
                @click="seeWhy(scope.row.reasonStopping)"
              >
                查看原因
              </el-button>
            </el-col>
            <!-- <el-row>
              <el-col :span="scope.row.flowStatus=='10'?24:12">
                <el-button
                  type="text"
                  style="color:#3978E7"
                  size="mini"
                  @click="handleCollection(scope.row, billReceiptForm.year)"
                  v-hasPermi="['share:bank:edit']"
                  >收票</el-button
                >
              </el-col>
              <el-col :span="24" v-if="scope.row.flowStatus !== '10'" >
                <el-button
                  type="text"
                  style="color:#EF5465"
                  size="mini"
                  v-hasPermi="['share:bank:edit']"
                  @click="OutOfService(scope.row)"
                  >停止服务</el-button
                >
              </el-col>
            </el-row> -->
          </template>
        </el-table-column>
        <el-table-column class-name="table-control" width="100px">
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNo"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 收票 -->
    <!-- <el-dialog
      title="收票"
      :visible.sync="collection"
      width="500px"
      append-to-body
      class="ticketCollection"
      @close="handleShut"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <div style="font-size:16px">
            <i class="el-icon-school" style="margin-right:10px" />客户名称：{{
              companyName
            }}
          </div>
        </el-col>
      </el-row>
      <el-form
        ref="billReceiptForm"
        v-model="billReceiptForm"
        :rules="orderRules"
        :label-position="labelPosition"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="收票日期">
              <el-date-picker
                v-model="billReceiptForm.ticketDate"
                type="date"
                disabled
                placeholder="请选择收票日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="收票期间">
              <el-input-number
                v-model="billReceiptForm.year"
                class="calculator"
                :min="1900"
                :max="2100"
                @change="handlebillReceipt"
              ></el-input-number>

              <el-button
                v-for="item in monthList"
                :key="item.name + 'h'"
                @click="handleClickReceipt(item)"
                :class="{
                  bgyellow: item.status == 10,
                  bggreen: item.status == 20,
                  bgred: item.status == 30,
                  bggrey: item.status == 40
                }"
                >{{ item.name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div><span style="background:#2DD199"></span>已确认</div>
            <div><span style="background:#F3A35F"></span>待确认</div>
            <div><span style="background:#EF5465"></span>打回</div>
            <div><span style="background:#D2D3D6"></span>无需收票</div>
          </el-col>
        </el-row>
        <el-row
          :gutter="24"
          v-for="(item, index) in billReceiptForm.invoiceArr"
          :key="index + 'a'"
        >
          <el-col :span="9">
            <el-form-item :label="item.label">
              <el-input
                type="text"
                placeholder="请输入票数"
                v-model="item.invoiceMoney"
                :disabled="disInput"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额">
              <el-input
                placeholder="请输入金额"
                v-model="item.money"
                :disabled="disInput"
                type="text"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="税额">
              <el-input
                placeholder="请输入税额"
                v-model="item.taxAmount"
                :disabled="disInput"
                type="text"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="合计">
              <el-input
                v-model="sumNumber"
                :disabled="disInput"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额">
              <el-input
                v-model="sumMoney"
                :readonly="true"
                :disabled="disInput"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="税额">
              <el-input
                v-model="sumaMount"
                :disabled="disInput"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="快递单号">
              <el-input
                v-model="billReceiptForm.trackingNumber"
                :disabled="disInput"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4 }"
                v-model="billReceiptForm.remark"
                :disabled="disInput"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="border-top:1px solid #ccc;background:#fff;padding:28px 32px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="调整票据类型顺序" name="second">
            <div class="billType">
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
                v-else
                class="button-new-tag"
                size="small"
                @click="addTicket"
                icon="el-icon-plus"
                >添加
              </el-button>
              <div>
                <el-row>
                  <el-col
                    :span="12"
                    v-for="(item, index) in invoice"
                    :key="item.dictCode"
                  >
                    <el-checkbox-group
                      v-model="checkList"
                      @change="checkChange"
                    >
                      <el-checkbox :label="item.dictName" :disabled="disInput">
                        <span
                          >{{ index + 1 + "、" }}{{ item.dictName }}</span
                        ></el-checkbox
                      >
                    </el-checkbox-group>
                    <span
                      ><el-button
                        type="text"
                        @click="decline(index)"
                        :disabled="disInput"
                        ><i
                          :class="
                            index == invoice.length - 1 ? '' : 'el-icon-bottom'
                          "
                          style="font-weight:700"/></el-button
                      ><el-button
                        type="text"
                        @click="rise(index)"
                        :disabled="disInput"
                        ><i
                          style="font-weight:700"
                          :class="index == 0 ? '' : 'el-icon-top'"/></el-button
                    ></span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="receiptConfirmation">确定</el-button>
      </div>
    </el-dialog> -->

    <!-- 添加或修改基础字典对话框 -->
    <!-- <el-dialog
      :title="title"
      :visible.sync="adddistopen"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="dictionariesForm"
        :model="dictionariesForm"
        :rules="dictionariesRules"
        label-width="120px"
      >
        <el-form-item label="字典类型编码" prop="dictTypeCode">
          <el-input
            placeholder="请输入字典类型编码"
            disabled
            value="invoice"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典标签" prop="dictName">
          <el-input
            v-model="dictionariesForm.dictName"
            placeholder="请输入字典名称"
          />
        </el-form-item>
        <el-form-item label="字典键值" prop="dictCode">
          <el-input
            v-model="dictionariesForm.dictCode"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitdictForm">确 定</el-button>
        <el-button @click="dialogCancel">取 消</el-button>
      </div>
    </el-dialog> -->

    <!-- 收票详情 -->
    <!-- <el-dialog
      title="收票详情"
      :visible.sync="collectionD"
      width="500px"
      append-to-body
      class=" collectionDetails"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <div style="font-size:16px">
            <i class="el-icon-school" style="margin-right:10px" />客户名称：{{
              companyName
            }}
          </div>
        </el-col>
      </el-row>
      <el-form
        ref="billReceiptForm"
        v-model="billReceiptForm"
        :rules="orderRules"
        :label-position="labelPosition"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="收票日期">
              <el-date-picker
                v-model="billReceiptForm.ticketDate"
                type="date"
                disabled
                placeholder="请选择收票日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="收票期间">
              <el-input-number
                v-model="billReceiptForm.year"
                class="calculator"
                :min="1900"
                :max="2100"
                @change="handlebillReceipt"
              ></el-input-number>
              <el-button
                v-for="item in monthList"
                :key="item.name + 'c'"
                @click="handleClickReceipt(item)"
                :class="{
                  bgyellow: item.status == 10,
                  bggreen: item.status == 20,
                  bgred: item.status == 30,
                  bggrey: item.status == 40
                }"
                >{{ item.name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div><span style="background:#2DD199"></span>已确认</div>
            <div><span style="background:#F3A35F"></span>待确认</div>
            <div><span style="background:#EF5465"></span>打回</div>
            <div><span style="background:#D2D3D6"></span>无需收票</div>
          </el-col>
        </el-row>
        <el-row
          :gutter="24"
          v-for="(item, index) in billReceiptForm.invoiceArr"
          :key="index + 'b'"
        >
          <el-col :span="9">
            <el-form-item :label="item.label">
              <el-input
                type="text"
                placeholder="请输入票数"
                v-model="item.invoiceMoney"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额">
              <el-input
                placeholder="请输入金额"
                v-model="item.money"
                disabled
                type="text"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="税额">
              <el-input
                placeholder="请输入税额"
                v-model="item.taxAmount"
                disabled
                type="text"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="合计">
              <el-input
                v-model="sumNumber"
                disabled
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额">
              <el-input v-model="sumMoney" :readonly="true" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="税额">
              <el-input
                v-model="sumaMount"
                disabled
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="快递单号">
              <el-input
                v-model="billReceiptForm.trackingNumber"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-left:15px;padding-right:15px">
          <el-col :span="24" >
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4 }"
                v-model="billReceiptForm.remark"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="collectionD = false">取消</el-button>
        <el-button type="primary" @click="collectionD = false">确定</el-button>
      </div>
    </el-dialog> -->

    <!-- 订单审核 -->
    <el-dialog
      title="订单审核"
      :visible.sync="examine"
      width="500px"
      append-to-body
      class="orderReview"
    >
      <el-form ref="orderCheckFrom" :model="orderFrom" :rules="orderRules">
        <el-row :gutter="24">
          <el-col :span="12">
            <div style="font-size:16px">
              <i class="el-icon-school" style="margin-right:10px" />客户名称：{{
                orderFrom.companyName
              }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-divider></el-divider>
            <!-- <div>
              <i class="el-icon-warning" style="color:#F3A35F"> </i
              >点击不通过，必须填写备注，否则无法确认审核！
            </div> -->
          </el-col>
        </el-row>

        <!-- <el-row>
          <el-col>
            <el-form-item label="审核意见">
              <el-radio-group v-model="orderFrom.status">
                <el-radio
                  v-for="item in statusList"
                  :key="item.dictName"
                  :label="item.dictCode"
                  >{{ item.dictName }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col>
            <el-form-item label="审核备注" prop="remark">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5 }"
                v-model="orderFrom.remark"
                placeholder="请输入审核备注"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取消</el-button>
        <el-button type="primary" @click="confirmAudit">确认审核</el-button>
      </div>
    </el-dialog>

    <!-- 票据记录 -->
    <el-dialog
      title="票据记录"
      :visible.sync="billRecord"
      width="500px"
      append-to-body
      class="billRecord"
    >
      <el-form ref="billForm" :rules="orderRules">
        <div v-for="item in billRecordFrom" :key="item.createDate">
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
                        >
                          <el-image
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
                                style="cursor:pointer;color:#67C23A"
                                v-if="item.auditStatus == 20"
                                >{{ "通过" }}</span
                              >
                              <span
                                style="cursor:pointer;color:#EF5465"
                                v-if="item.auditStatus == 30"
                                >{{ "未通过" }}</span
                              >
                            </el-tooltip></span
                          >
                        </div>
                        <div>
                          <el-button
                            type="danger"
                            plain
                            size="mini"
                            @click="handleExamine(item)"
                            v-hasPermi="['share:bank:edit']"
                            :disabled="
                              item.auditStatus != 20 ||
                                roles.indexOf('boss') !== -1
                            "
                            >驳回</el-button
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
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirmAudit">确认审核</el-button>
      </div> -->
    </el-dialog>

    <!-- 停止服务 -->
    <el-dialog title="停止服务原因" :visible.sync="stopShow" width="30%">
      <el-input
        v-model="stopForm.remark"
        type="textarea"
        :rows="5"
        placeholder="请输入停止服务原因"
      >
      </el-input>
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
    <edit-drawer
      :visible.sync="drawerVisible"
      :companyId="companyId"
    ></edit-drawer>
  </div>
</template>

<script>
import { exportBank } from "@/api/crm/bank";

import { mapGetters } from "vuex";
import { mapState } from "vuex";
import EditDrawer from "@/views/components/EditDrawer";
import {
  foreignAccountQuery,
   TicketList,
  updateOutService,
  findPaperRecordsList,
  audit,
} from "../../../../api/crm/externalAccount/agencyService";

export default {
  name: "ExternalMyAccount",
  components: {
    EditDrawer
  },
  data() {
    var checkRemark = (rule, value, callback) => {
      // console.info(arguments);
      if (value === "" && this.orderFrom.status == 30) {
        callback(new Error("请输入审核备注"));
      } else {
        if (this.orderFrom.remark !== "") {
          this.$refs.orderCheckFrom.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      fileUrl: process.env.VUE_APP_FILE_API,
      list: [],
      monthList: [],
      checkList: [],
      inputVisible: false,
      inputValue: "",
      //   labelPositions: "top",
      //派工弹出
      //   dispatchDialog: false,
      ticketDate: [], //收票日期
      writeTime: [], //票据跟进记录
      activeName: "second",
      companyId: null,
      drawerVisible: false, //抽屉显示
      //收票列表
      ticketReceivingList: [],
      //停止服务原因
      stopShow: false,
      stopForm: {},
      //收票详情弹出
      collectionD: false,
      //收票状态
      ticketReceivingStatus: [],
      //   收票弹出
      collection: false,
      // 状态数据字典
      statusOptions: [],
      //收票
      invoice: [],
      disInput: true,
      stopReasonShow:false,//停止服务原因
      stopReason: "",

      companyName: "",
      //跟进记录弹出
      billRecord: false,
      //票据回显
      billRecordFrom: {},
      //跟进记录列表
      followRecord: {},
      //审核
      orderFrom: {},
      requiredFlag: false,
      //订单审核结果
      statusList: [],
      //表单对齐方式
      labelPosition: "right",
      //单选框默认选项
      radio: "20",
      //订单审核
      examine: false,
      //财务审核状态
      auditorState: [],
      //调度审核状态
      dispatchState: [],
      //项目
      marketBusirSerpriceResultList: [],
      //部门员工
      departmentStaff: [],
      //部门
      department: [],
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
      delSwitch: [],
      // 总条数
      total: 0,
      //收票列表展示
      billReceiptForm: {},
      ticketCollectionFrom: {},
      // 商机等级表格数据
      BusinessList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,

      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        wzAuditType:'0',
        flowStatus:null,
        bankName: null,
        companyName:'',
        bankAccountNumber: null,
        bankAddress: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        outerAccounting: null,
        sicketDate: null,
        eicketDate: null,
        sBillTime: null,
        eBillTime: null
      },

      // 表单参数
      form: {},
      //订单审核校验
      orderRules: {
        remark: [{ validator: checkRemark, trigger: "blur" }]
      },
      // 表单校验
      rules: {
        bankAccountNumber: [
          {
            required: true,
            message: "银行卡账号不能为空",
            trigger: "blur"
          }
        ],
        bankAddress: [
          {
            required: true,
            message: "开卡行地址不能为空",
            trigger: "blur"
          }
        ],
        bankName: [
          {
            required: true,
            message: "开户行不能为空",
            trigger: "blur"
          }
        ],
        companyId: [
          {
            required: true,
            message: "公司Id不能为空",
            trigger: "blur"
          }
        ],
        tabStatus:null,
        yesNoList: [],
      }
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: state => state.user
    }),
    //金额
    sumMoney() {
      let money = 0,
        invoiceArr = this.billReceiptForm.invoiceArr || [];
      invoiceArr.forEach(item => {
        money += Number(parseFloat(item.money) || 0);
      });

      return (this.billReceiptForm.amountTotal = money);
    },
    //票数
    sumNumber() {
      let invoiceMoney = 0,
        invoiceArr = this.billReceiptForm.invoiceArr || [];
      invoiceArr.forEach(item => {
        invoiceMoney += Number(parseFloat(item.invoiceMoney) || 0);
      });

      return (this.billReceiptForm.totalVotes = invoiceMoney);
    },
    //税额
    sumaMount() {
      let taxAmount = 0,
        invoiceArr = this.billReceiptForm.invoiceArr || [];
      invoiceArr.forEach(item => {
        taxAmount += Number(parseFloat(item.taxAmount) || 0);
      });

      return (this.billReceiptForm.taxAmountTotal = taxAmount);
    }
  },
  created() {

    this.roles = this.userInfo.roleCodes;

    this.getDicts("del_switch").then(res => {
      this.delSwitch = res.data;
    });
    //调度审核状态
    this.getDicts("dispatch_state").then(res => {
      this.dispatchStateList = res.data.slice(0, 3);
      this.dispatchState = res.data;
    });
    //财务审核状态
    this.getDicts("auditor_state").then(res => {
      this.auditorState = res.data;
    });
    //订单审核结果
    this.getDicts("order_review_results").then(res => {
      this.statusList = res.data;
    });
    //派工执行步骤
    this.getDicts("dispatching_sort").then(res => {
      this.dispatchingSort = res.data;
    });
    // 数据字典调用
    this.getDicts("sys_normal_disable").then(res => {
      this.statusOptions = res.data;
    });
    //收票
    this.getDicts("invoice").then(res => {
      this.invoice = res.data;
    });
    //收票状态
    this.getDicts("ticket_receiving_status").then(res => {
      this.ticketReceivingStatus = res.data;
    });
    this.getDicts("sys_yes_no").then(res => {
      this.yesNoList = res.data;
    });
    
    this.getList();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm); //当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    monthFun(row, year) {},
    /** 查询外账列表 */
    getList() {
      this.loading = true;
      let queryParams = JSON.parse(JSON.stringify(this.queryParams));
      console.log(this.tabStatus)
      if(this.tabStatus=='0'){
        queryParams.wzAuditType = null
        queryParams.flowStatus = null
      }else if(this.tabStatus=='20'){
        queryParams.wzAuditType = '20'
        queryParams.flowStatus = null
      }else if(this.tabStatus=='30'){
        queryParams.wzAuditType = '30'
        queryParams.flowStatus = null
      }else if(this.tabStatus=='60'){
        queryParams.wzAuditType = null
        queryParams.flowStatus = '10'
      }

      foreignAccountQuery(queryParams).then(response => {
        this.BusinessList = response.data.rows;
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    //审核
    handleExamine(row) {
      this.orderFrom = { id: row.id, status: "", remark: "" };
      this.examine = true;
    },
    //订单审核确定
    confirmAudit() {
      this.orderFrom.status = 30;
      this.$refs["orderCheckFrom"].validate(valid => {
        if (valid) {
          audit(this.orderFrom).then(response => {
            this.examine = false;
          });
          this.handleRecord(this.billRecordFrom);
          this.getList()
        }
      });
    },
    // handleShut() {
    //   this.$refs["billReceiptForm"].resetFields();
    //   this.monthList = [];
    // },
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

    // //派工
    // handleDispatch(row, rows) {
    //   this.dispatchDialog = true;
    //   this.title = "派工—";
    // },
    // handleInputConfirm() {
    //   let inputValue = this.inputValue;
    //   if (inputValue) {
    //     this.dynamicTags.push(inputValue);
    //   }
    //   this.inputVisible = false;
    //   this.inputValue = "";
    // },
    //收票
    // handleCollection(row, year) {
    //   this.collection = true;
    //   this.monthList = [];
    //   this.companyName = row.companyName;
    //   let mon = (new Date().getMonth() + 1).toString();
    //   mon = mon.length == 1 ? "0" + mon : mon;
    //   this.billReceiptForm = {
    //     busirId: row.busirId,
    //     companyId: row.companyId,
    //     serpriceId: row.busirId,
    //     year: new Date().getFullYear(),
    //     month: new Date().getMonth() + 1,
    //     ticketDate: new Date(),
    //     yearAndMonth: new Date().getFullYear() + mon,
    //     invoiceArr: row.invoicejson ? JSON.parse(row.invoicejson) : []
    //   };

    //   findReceiptList({
    //     busirId: row.busirId,
    //     serpriceId: row.busirId,
    //     companyId: row.companyId,
    //     yearAndMonth: this.billReceiptForm.yearAndMonth
    //   })
    //     .then(response => {
    //       this.billReceiptForm.invoiceArr = response.data.invoiceJson
    //         ? JSON.parse(response.data.invoiceJson)
    //         : [];
    //       this.billReceiptForm.invoiceArr.forEach(item => {
    //         this.checkList.push(item.label);
    //       });
    //       this.list = response.data.beforeStatus || [];
    //     })
    //     .then(() => {
    //       // console.log(this.list);
    //       for (let i = 1; i <= 12; i++) {
    //         let arr = this.list.filter(item => {
    //           if (i.length == 1) {
    //             i = "0" + i;
    //           }
    //           let years = JSON.stringify(item.startTicketDate).slice(5, 7);
    //           return i == years;
    //         });
    //         let temp = {
    //           name: i.length == 1 ? (i = "0" + i) : i,
    //           status: arr.length > 0 ? arr[0].status : ""
    //         };
    //         this.monthList.push(temp);
    //       }
    //       return this.monthList;
    //     });
    // },

    //点击年份查询收票列表
    // handlebillReceipt() {
    //   this.monthList = [];
    //   let mon = this.billReceiptForm.month.toString();
    //   mon = mon.length == 1 ? "0" + mon : mon;
    //   this.billReceiptForm.yearAndMonth =
    //     this.billReceiptForm.year.toString() + mon;
    //   if (
    //     (this.billReceiptForm.year == new Date().getFullYear() &&
    //       this.billReceiptForm.month == new Date().getMonth()) ||
    //     (this.billReceiptForm.year == new Date().getFullYear() - 1 &&
    //       this.billReceiptForm.month == 12)
    //   ) {
    //     this.disInput = false;
    //   } else {
    //     this.disInput = true;
    //   }
    //   this.billReceiptForm.invoiceArr = [];
    //   findReceiptList({
    //     busirId: this.billReceiptForm.busirId,
    //     serpriceId: this.billReceiptForm.serpriceId,
    //     companyId: this.billReceiptForm.companyId,
    //     yearAndMonth: this.billReceiptForm.yearAndMonth
    //   })
    //     .then(response => {
    //       this.billReceiptForm.invoiceArr = response.data.invoiceJson
    //         ? JSON.parse(response.data.invoiceJson)
    //         : [];
    //       this.billReceiptForm.invoiceArr.forEach(item => {
    //         this.checkList.push(item.label);
    //       });
    //       this.list = response.data.beforeStatus || [];
    //     })
    //     .then(() => {
    //       // console.log(this.list);
    //       for (let i = 1; i <= 12; i++) {
    //         let arr = this.list.filter(item => {
    //           if (i.length == 1) {
    //             i = "0" + i;
    //           }
    //           let years = JSON.stringify(item.startTicketDate).slice(5, 7);
    //           return i == years;
    //         });
    //         let temp = {
    //           name: i.length == 1 ? (i = "0" + i) : i,
    //           status: arr.length > 0 ? arr[0].status : ""
    //         };
    //         this.monthList.push(temp);
    //       }
    //       return this.monthList;
    //     });
    // },
    //点击月份查询售票列表
    // handleClickReceipt(item) {
    //   this.monthList = [];
    //   this.billReceiptForm.month = item.name;
    //   if (
    //     (this.billReceiptForm.year == new Date().getFullYear() &&
    //       this.billReceiptForm.month == new Date().getMonth()) ||
    //     (this.billReceiptForm.year == new Date().getFullYear() - 1 &&
    //       this.billReceiptForm.month == 12)
    //   ) {
    //     this.disInput = false;
    //   } else {
    //     this.disInput = true;
    //   }
    //   this.billReceiptForm.invoiceArr = [];
    //   let mon = item.name.toString();
    //   mon = mon.length == 1 ? "0" + mon : mon;
    //   this.billReceiptForm.yearAndMonth =
    //     this.billReceiptForm.year.toString() + mon;
    //   // console.log(this.billReceiptForm.yearAndMonth);
    //   findReceiptList({
    //     busirId: this.billReceiptForm.busirId,
    //     serpriceId: this.billReceiptForm.serpriceId,
    //     companyId: this.billReceiptForm.companyId,
    //     yearAndMonth: this.billReceiptForm.yearAndMonth
    //   })
    //     .then(response => {
    //       this.billReceiptForm.invoiceArr = response.data.invoiceJson
    //         ? JSON.parse(response.data.invoiceJson)
    //         : [];
    //       this.billReceiptForm.invoiceArr.forEach(item => {
    //         this.checkList.push(item.label);
    //       });
    //       this.list = response.data.beforeStatus || [];
    //     })
    //     .then(() => {
    //       // console.log(this.list);
    //       for (let i = 1; i <= 12; i++) {
    //         let arr = this.list.filter(item => {
    //           if (i.length == 1) {
    //             i = "0" + i;
    //           }
    //           let years = JSON.stringify(item.startTicketDate).slice(5, 7);
    //           return i == years;
    //         });
    //         let temp = {
    //           name: i.length == 1 ? (i = "0" + i) : i,
    //           status: arr.length > 0 ? arr[0].status : ""
    //         };
    //         this.monthList.push(temp);
    //       }
    //       return this.monthList;
    //     });
    // },
    //收票详情
    // detailedInformation(row) {
    //   this.collectionD = true;
    //   this.monthList = [];
    //   this.companyName = row.companyName;
    //   let mon = (new Date().getMonth() + 1).toString();

    //   mon = mon.length == 1 ? "0" + mon : mon;
    //   this.billReceiptForm = {
    //     busirId: row.busirId,
    //     companyId: row.companyId,
    //     serpriceId: row.busirId,
    //     year: new Date().getFullYear(),
    //     month: new Date().getMonth() + 1,
    //     ticketDate: new Date(),
    //     yearAndMonth: new Date().getFullYear() + mon,
    //     invoiceArr: row.invoicejson ? JSON.parse(row.invoicejson) : []
    //   };

    //   findReceiptList({
    //     busirId: row.busirId,
    //     serpriceId: row.busirId,
    //     companyId: row.companyId,
    //     yearAndMonth: this.billReceiptForm.yearAndMonth
    //   })
    //     .then(response => {
    //       this.billReceiptForm.invoiceArr = response.data.invoiceJson
    //         ? JSON.parse(response.data.invoiceJson)
    //         : [];
    //       this.billReceiptForm.invoiceArr.forEach(item => {
    //         this.checkList.push(item.label);
    //       });
    //       this.list = response.data.beforeStatus || [];
    //     })
    //     .then(() => {
    //       // console.log(this.list);
    //       for (let i = 1; i <= 12; i++) {
    //         let arr = this.list.filter(item => {
    //           if (i.length == 1) {
    //             i = "0" + i;
    //           }
    //           let years = JSON.stringify(item.startTicketDate).slice(5, 7);
    //           return i == years;
    //         });
    //         let temp = {
    //           name: i.length == 1 ? (i = "0" + i) : i,
    //           status: arr.length > 0 ? arr[0].status : ""
    //         };
    //         this.monthList.push(temp);
    //       }
    //       return this.monthList;
    //     });
    // },
    //排序
    //下降
    // decline(index) {
    //   let temp = this.invoice[index];
    //   this.$set(this.invoice, index, this.invoice[index + 1]);
    //   this.$set(this.invoice, index + 1, temp);
    // },
    //上升
    // rise(index) {
    //   let temp = this.invoice[index];
    //   this.$set(this.invoice, index, this.invoice[index - 1]);
    //   this.$set(this.invoice, index - 1, temp);
    // },
    //添加字典
    // addTicket() {
    //   this.dictionariesForm = {
    //     dictTypeCode: "invoice",
    //     status: 1,
    //     dictName: "",
    //     dictCode: ""
    //   };
    //   this.adddistopen = true;
    // },
    // //添加收票
    // receiptConfirmation() {
    //   this.billReceiptForm.ticketDate = this.billReceiptForm.ticketDate
    //     .toJSON()
    //     .split("T")[0];
    //   //  this.billReceiptForm.invoiceJson=[]

    //   this.billReceiptForm.invoiceJson = JSON.stringify(
    //     this.billReceiptForm.invoiceArr
    //   );
    //   let obj = Object.assign({}, this.billReceiptForm);

    //   delete obj.invoiceArr;
    //   delete obj.year;
    //   updateInvoiceRecord(obj).then(response => {});
    //   this.collection = false;
    //   this.checkList = [];
    //   this.$refs["billReceiptForm"].resetFields();
    //   this.monthList = [];
    // },
    // 字典信息提交
    // submitdictForm() {
    //   var data = {
    //     dictTypeCode: this.dictionariesForm.dictTypeCode
    //   };
    //   this.$refs["dictionariesForm"].validate(valid => {
    //     addData(this.dictionariesForm).then(response => {
    //       if (response.code == 200) {
    //         this.adddistopen = false;
    //         this.msgSuccess("新增成功");
    //         this.getDicts("invoice").then(res => {
    //           this.invoice = res.data;
    //         });
    //       }
    //     });
    //   });
    // },

    //票据记录
    handleRecord(row) {
      this.billRecord = true;
      findPaperRecordsList({ productId: row.busirId }).then(response => {
        this.billRecordFrom = response.data;
        this.billRecordFrom.busirId = row.busirId;
        this.getList()
      });
    },
    //停止服务
    // OutOfService(row) {
    //   this.stopShow = true;
    //   this.stopForm = {
    //     productId: row.busirId,
    //     remark: ""
    //   };
    // },
    cease() {
      if (this.stopForm.remark !== "") {
        this.stopShow = false;
        // console.log(this.stopForm);
        updateOutService(this.stopForm).then(response => {
          if (response.code === 200) {
            this.msgSuccess("停止服务成功");
          }
        });
        this.getList();
      } else {
        this.msgSuccess("请输入停止服务原因");
      }
    },
    //内层取消
    dialogCancel() {
      //审核
      this.examine = false;
      //新增字典
      // this.adddistopen = false;
      this.dictionariesForm = {
        dictTypeCode: "invoice",
        status: 1,
        dictName: "",
        dictCode: ""
      };
    },
    // 取消按钮
    cancel() {
      //停止服务
      this.stopShow = false;
      this.collection = false;
      this.checkList = [];
      this.$refs["billReceiptForm"].resetFields();
      this.monthList = [];
      //收票详情
      this.collectionD = false;
      //收票
      this.collection = false;
      //票据记录
      this.billRecord = false;

      this.open = false;
      this.reset();
    },
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
        delSwitch: null
      };
      this.resetForm("form");
    },
    //tab切换
    handleClick(tab) {
      if (tab.name == "20") {
        this.getList(); //审核通过
      } else if (tab.name == "30") {
        this.getList(); //审核未通过
      } else if (tab.name == "60") {
        this.getList();
      } else if (tab.name == "") {
        this.getList();
      } else if (tab.name == "100") {
        TicketList(this.queryParams).then(response => {
          this.ticketReceivingList = response.data.rows;
          this.total = response.data.totalRows;
          this.loading = false;
        });

        //收票
      }
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
      if (this.ticketDate) {
        if (this.ticketDate.length !== 0) {
          this.queryParams.sicketDate = this.ticketDate[0] + " 00:00:00";
          this.queryParams.eicketDate = this.ticketDate[1] + " 23:59:59";
        } else {
          this.queryParams.sicketDate = "";
          this.queryParams.eicketDate = "";
        }
      } else {
        this.queryParams.sicketDate = "";
        this.queryParams.eicketDate = "";
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;

      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      // TicketList(this.queryParams).then(response => {
      //   this.ticketReceivingList = response.data.rows;
      //   this.total = response.data.totalRows;
      //   this.loading = false;
      // });
      this.resetQuery();

      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        // companyId: null,
        companyName:'',
        bankName: null,
        bankAccountNumber: null,
        bankAddress: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        wzAuditType:'0',
        flowStatus:null,
        outerAccounting: null,
        sicketDate: null,
        eicketDate: null,
        sBillTime: null,
        eBillTime: null
      };
      this.writeTime = [];
      this.ticketDate = [];
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
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

    /** 删除按钮操作 */
    // handleDelete(row) {
    //   const ids = row.id || this.ids;
    //   this.$confirm(
    //     '是否确认删除公司银行开户信息编号为"' + ids + '"的数据项?',
    //     "警告",
    //     {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }
    //   )
    //     .then(function() {
    //       return;
    //     })
    //     .then(() => {
    //       this.getList();
    //       this.msgSuccess("删除成功");
    //     })
    //     .catch(function() {});
    // },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有公司银行开户信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportBank(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },

    //派工执行步骤
    dispatchingSortFormat(row) {
      return this.selectDictLabel(this.dispatchingSort, row.dispatchingSort);
    },
    ticketReceivingStatusFormat(row) {
      return this.selectDictLabel(this.ticketReceivingStatus, row.status);
    },

    // checkChange(val) {
    //   // console.info(arguments);

    //   let invoiceArr = this.billReceiptForm.invoiceArr;
    //   let tempArr = invoiceArr.map(item => {
    //     return item.label;
    //   });
    //   let invoice = [];
    //   val.forEach((item, index) => {
    //     let temp = {
    //       label: item,
    //       invoiceMoney: "",
    //       money: "",
    //       taxAmount: "",
    //       sort: index
    //     };
    //     if (tempArr.indexOf(item) != -1) {
    //       let obj = invoiceArr[tempArr.indexOf(item)];
    //       obj.sort = index;
    //       invoice.push(obj);
    //     } else {
    //       invoice.push(temp);
    //     }
    //   });
    //   this.billReceiptForm.invoiceArr = invoice;
    //   this.$forceUpdate();
    // }
  }
};
</script>
<style lang="scss">
//审核
.orderReview {
  .el-dialog .el-dialog__body {
    height: 284px;
    overflow: auto;
  }
  .el-dialog .el-dialog__footer {
    padding: 5px 24px;
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
            //TODO
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

            .el-image > img {
              width: 70px;
              height: 50px;
              margin-right: 10px;
            }
          }
          .touxiang {
            width: 32px;
            height: 32px;
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
  }
}
//跟进记录
.followUpList {
  .el-dialog {
    background: #f5f6f7;
    width: 704px !important;
    height: 662px !important;
    .el-dialog__body .el-form {
      margin: 0px !important;
    }

    .remind {
      margin-top: 20px;
      height: 486px !important;
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

      .business {
        height: 161px;
        display: flex;
        border-bottom: 1px solid #e6e7eb;
        padding-top: 32px;

        & > div {
          margin-left: 24px;
          display: flex;
          img {
            width: 32px;
            height: 32px;
          }
          div {
            margin-left: 16px;
            display: flex;
            flex-direction: column;

            span {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;

              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 24px;
            }
            span:nth-child(1) {
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
            span:nth-child(2) {
              font-family: Arial;
              color: #565759;
              margin-bottom: 12px;
              width: 500px;
            }
          }
        }
      }
    }
  }
}
//收票
.ticketCollection {
  .el-dialog {
    background: #f5f6f7;
    width: 704px !important;
    .el-dialog__body {
      height: 612px;
      overflow: auto;
      .el-form {
        background-color: #fff;
        margin: 0px;
        margin-top: 15px;
        padding: 28px 32px;
        .el-form-item {
          margin-bottom: 0px;
        }

        .el-row {
          padding-top: 10px;
          padding-bottom: 10px;
          .el-col {
            // text-align: right;
          }
          .el-textarea {
            width: 92%;
          }
          &:nth-child(1),
          &:nth-child(13) {
            .el-input {
              width: 284px;
            }
          }
          &:nth-child(2) {
            background: #fff !important;
          }
          &:nth-child(3) {
            .el-col {
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              div {
                margin-right: 18px;

                line-height: 24px;
                span {
                  display: inline-block;
                  margin-right: 6px;
                  width: 14px;
                  height: 14px;
                  border-radius: 2px;
                  vertical-align: middle;
                  margin-top: 0px;
                }
              }
            }
          }
          &:nth-child(4),
          &:nth-child(6),
          &:nth-child(8),
          &:nth-child(10),
          &:nth-child(12) {
            background: #f5f6f7;
          }
          &:nth-child(11) {
            .el-col {
              &:nth-child(1) {
                .el-input--small .el-input__inner {
                  margin-left: 12px;
                }
              }
            }
          }
          &:nth-child(12) {
            .el-col {
              &:nth-child(1) {
                .el-input--small .el-input__inner {
                  margin-left: 25px;
                }
              }
            }
          }
        }
        .el-button {
          margin-left: 2px;
          padding: 0;
          text-align: center;
          width: 28px;
          height: 28px;
          font-size: 14px;
          &:nth-child(1) {
            width: 118px;
            height: 32px;
            i {
              &:nth-child(1) {
                margin-right: 20px;
              }
              &:nth-child(2) {
                margin-left: 20px;
              }
            }
          }
        }
        .el-input {
          width: 110px;
        }
      }
    }
    .calculator {
      .el-icon-plus:before {
        content: "\e6e0";
        font-size: 14px;
      }
      .el-icon-minus:before {
        content: "\e6de";
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
        padding: 0px !important;
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
//收票详情
.collectionDetails {
  .calculator {
    .el-icon-plus:before {
      content: "\e6e0";
      font-size: 14px;
    }
    .el-icon-minus:before {
      content: "\e6de";
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
  .el-dialog {
    background: #f5f6f7;
    width: 704px !important;
    .el-dialog__body {
      height: 612px;
      overflow: auto;
      .el-form {
        background-color: #fff;
        margin: 0px;
        margin-top: 15px;
        padding: 28px 32px;
        .el-form-item {
          margin-bottom: 0px;
        }

        .el-row {
          padding-top: 10px;
          padding-bottom: 10px;
          .el-col {
            // text-align: right;
          }
          .el-textarea {
            width: 92%;
          }
          &:nth-child(1),
          &:nth-child(13) {
            .el-input {
              width: 284px;
            }
          }
          &:nth-child(2) {
            background: #fff !important;
          }
          &:nth-child(3) {
            .el-col {
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              div {
                margin-right: 18px;

                line-height: 24px;
                span {
                  display: inline-block;
                  margin-right: 6px;
                  width: 14px;
                  height: 14px;
                  border-radius: 2px;
                  vertical-align: middle;
                  margin-top: 0px;
                }
              }
            }
          }
          &:nth-child(4),
          &:nth-child(6),
          &:nth-child(8),
          &:nth-child(10),
          &:nth-child(12) {
            background: #f5f6f7;
          }
          &:nth-child(11) {
            .el-col {
              &:nth-child(1) {
                .el-input--small .el-input__inner {
                  margin-left: 12px;
                }
              }
            }
          }
          &:nth-child(12) {
            .el-col {
              &:nth-child(1) {
                .el-input--small .el-input__inner {
                  margin-left: 25px;
                }
              }
            }
          }
        }
        .el-button {
          margin-left: 2px;
          padding: 0;
          text-align: center;
          width: 28px;
          height: 28px;
          font-size: 14px;
          &:nth-child(1) {
            width: 118px;
            height: 32px;
            i {
              &:nth-child(1) {
                margin-right: 20px;
              }
              &:nth-child(2) {
                margin-left: 20px;
              }
            }
          }
        }
        .el-input {
          width: 110px;
        }
      }
    }
  }
}

//派工
// .Dispatch {
//     .el-form-item__label{
//         margin-bottom: 0px  !important;
//     }
//     .el-form-item__content{
//         margin-top: -12px;
//     }
//   .el-tag {
//     margin: 10px 2px 0 2px;
//   }
//   .button-new-tag {
//     height: 32px;
//     width: 92px;
//     border: 1px #e6e7eb dashed;
//     border-radius: 2px;
//     background: #ffffff;
//     box-sizing: border-box;
//     margin: 10px 2px 0 2px;
//   }
//   .input-new-tag {
//     height: 32px;
//     width: 92px;
//     box-sizing: border-box;
//     margin: 10px 2px 0 2px;

//   }
// }
//
.agentForm {
  .el-button--mini {
    padding: 3px 5px;
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
.search-popover {
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

 .el-badge__content.is-fixed{
     position: absolute;
     top: 4px !important;
     right: 10px;
     -webkit-transform: translateY(-50%) translateX(100%);
     transform: translateY(-50%) translateX(100%);
 }
</style>
<style lang="scss" scoped>
.bgorange {
  text-align: center;
  background: #faeee1;
  color: #f3a35f;
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
.bggrey {
  text-align: center;
  background: #d2d3d6;
  color: #fff;
}
.bgDarkGrey {
  text-align: center;
  background-color: #e6e7eb;
  color: #a1a2a6;
}
</style>
