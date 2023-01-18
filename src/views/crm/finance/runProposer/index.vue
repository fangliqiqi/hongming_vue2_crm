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
            <div class="search-popover">
              <el-form
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
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
              </el-form>
              <div class="popover-footer">
                <el-button type="success" size="small" @click="cancel"
                  >取消</el-button
                >
                <el-button type="warning" size="small" @click="resetQuery"
                  >重置</el-button
                >
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认</el-button
                >
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

          <el-dropdown
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            v-if="false"
            @click="handleAddCustomer"
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

          <!-- 导出 -->
          <el-button
            class="ml8"
            icon="el-icon-upload2"
            size="small"
            @click="handleExport"
            v-hasPermi="['crm:log:export']"
            v-if="false"
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
    <!-- 客户列表渲染 -->
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.clientType" @tab-click="handleQuerys">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <el-tab-pane
          v-for="(item, index) in delSwitchList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
          v-if="index <= 2"
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
        :data="bankList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="left" />
        <el-table-column label="客户名称" align="left" prop="companyName" />
        <el-table-column label="客户编号" align="left" prop="client" />
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
        <el-table-column label="审核人" align="left" prop="churnReviewer" />
        <el-table-column
          label="操作"
          align="left"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.delSwitch == 10"
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']"
              @click="auditUp(scope.row.id)"
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
        :rules="rules"
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
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="注册资本" prop="registeredCapital">
              <el-input
                v-model="form.registeredCapital"
                placeholder="请输入注册资本"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="意向度" prop="opinion">
              <el-select v-model="form.opinion" placeholder="请选择意向度">
                <el-option
                  v-for="item in opinionList"
                  :label="item.dictName"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="增值税" prop="taxType">
              <el-select v-model="form.taxType" placeholder="请选择增值税类型">
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
              <el-select
                v-model="form.industryName"
                placeholder="请选择行业分类"
              >
                <el-option
                  v-for="item in industryNameList"
                  :label="item.dictName"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商机来源" prop="clientSource">
              <el-select
                v-model="form.clientSource"
                :disabled="!!form.clientSource"
                placeholder="请选择商机来源"
                ><el-option
                  v-for="item in clientSourceList"
                  :label="item.dictName"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
        </el-row>
        <!-- 其他公司代账 -->
        <!-- <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="在其他公司代账:" prop="companies">
              <el-radio v-model="form.companies" label="是">是</el-radio>
              <el-radio v-model="form.companies" label="否">否</el-radio>
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

        <el-button type="primary" @click="addSubmitForm">确 定</el-button>
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
      <el-form  label-width="85px"
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
          <el-col :span="24" style="margin-top:16px">
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
                item.dictCode==companyList.churnReason?item.dictName: ''}}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 申请人 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top:16px">
            <el-form-item label="申请人" class="tax">
              <div class="left">
              <span>{{ companyList.churnApplicant }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 申请时间 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top:16px">
            <el-form-item label="申请时间" class="tax">
              <div class="left">
              <span>{{ companyList.applicantTime }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 申请备注 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top:16px">
            <el-form-item label="申请备注"  class="tax" >
              <div class="left">
              {{ companyList.churnDescription }}
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 警告框 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 10px;" class="tax">
              <el-alert title="点击不通过，必须填写备注，否则无法确认审核!" type="warning" show-icon  style="width:400px;height:35px;margin-top: 16px;">
              </el-alert>
          </el-col>
        </el-row>
        <!-- 审核意见 -->
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 16px;"> 
            <el-form-item
              label="审核意见:"
              style="margin-left:36px;margin-right:34px;"
            >
              <el-radio label="20" v-model="companyList.churnType">通过</el-radio>
              <el-radio label="30" v-model="companyList.churnType"
                >不通过</el-radio
              >
              <!-- {{ auditState(companyList.churnType) }} -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="margin-top: 10px;">
            <el-form-item label="审核备注" style="margin-left:36px;margin-right:34px;">
              <el-input
                type="textarea"
                style="width: 330px;height: 120px;"
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
        <el-button type="primary" @click="submitForm">确认</el-button>
      </div>
    </el-dialog>
    <!-- 查看流失申请 -->
    <el-dialog
      title="查看流失申请"
      :visible.sync="openOrderAudit"
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
              <span class="price" v-for="item in reasonsList" :key="item.dictCode">{{ 
                item.dictCode==companyList.churnReason?item.dictName: ''}}</span>
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
          <el-col :span="12" style="margin-bottom: 0px;">
            <div class="companyName">
              <span class="right14">申请人:</span>
              <span>{{ companyList.churnApplicant }}</span>
            </div>
          </el-col>
          <el-col :span="12" style="margin-bottom: 0px;">
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
line-height: 22px !important;"
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
        <el-button @click="openOrderAudit = false">取 消</el-button>

        <el-button type="primary" @click="openOrderAudit = false"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  runApplyBeList,
  runAudit,
  addClient,
  runParticulars
} from "@/api/crm/runProposer/runProposer";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import { throttle } from "@/utils/hmt";
export default {
  name: "",
  data() {
    return {
      custom: 0,
      total: 0,
      radio: "1",
      sourceTypeLv: ["通过", "不通过"],
      labelPosition: "top",
      inputVisible: false,
      inputValue: "",
      showSearch: false, // 显示搜索条件
      form: {}, // 表单参数
      vatTypeList: [], //增值税类型
      opinionList: [], //意向度
      industryNameList: [], //行业分类
      clientSourceList: [], //客户来源
      churnTypeList: [
        { dictCode: 10, dictName: "正常" },
        { dictCode: 40, dictName: "流失" }
      ], //流失申请审核状态
       reasonsList:[],//流失原因
      // 查询参数
      queryParams: {
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
        delSwitch: null //审核状态
      },
      approveTimeList: null, //订单审核时间
      applicationTimeList: null, //申请时间
      auditData: {
        id: null,
        churnType: null,
        reviewerRemarks: null
      }, //审核数据
      clientType: [], //客户类型字典
      delSwitchList: [], //审核状态字典
      areaOptions: regionData, //区域数据
      openCustomer: false, //新增客户弹出层
      openOffAudit: false, //流失审核弹出层
      openOrderAudit: false, //申请详情
      bankList: [],
      name: "张三",
      companyList: {
        id: null,
        churnType:null,
      },
      // 表单校验
      rules: {
        clienteleName: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur"
          }
        ],
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
        city: [
          {
            required: true,
            message: "所在地不能为空",
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
        clientSource: [
          {
            required: true,
            message: "商机来源不能为空",
            trigger: "blur"
          }
        ],

        industryName: [
          {
            required: true,
            message: "行业分类不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    view: function(val, oldVal) {
      if (!val) {
        this.getList();
      }
    },
    orderVisible: function(val, oldVal) {
      if (!val) {
        this.getOrderList(this.form.id);
        this.newOrderVisible = false;
      }
    }
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
    //审核状态
    auditState(data) {
      if (data == 10) {
        return "审核中";
      } else if (data == 20) {
        return "审核成功";
      } else if (data == 30) {
        return "审核失败";
      }
    },
    //字典
    //客户字典状态
    delSwitchFormat(row) {
      return this.selectDictLabel(this.delSwitchList, row.delSwitch);
    },
    //新增客户
    handleAddCustomer() {
      this.reset();
      this.openCustomer = true;
      this.title = "新增客户";
    },
    //添加标签
    handleInputCallback() {
      this.handleInputConfirm(res => {
        this.updateForm({ userlabelIds: res });
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
      this.handleClose(tag, res => {
        this.updateForm({ userlabelIds: res });
      });
    },
    handleClose(tag, cb) {
      this.form.userlabelIds.splice(this.form.userlabelIds.indexOf(tag), 1);
      if (typeof cb == "function") {
        cb(this.form.userlabelIds);
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有公司银行开户信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          window.location.href =
            process.env.VUE_APP_CRM_API +
            "/hmkj-crm/resoBusinessOpportunity/excelTemplate";
        })
        .catch(function() {});
    },
    handleTableQuery(e) {
      this.queryParams.applicationStart = "";
      this.queryParams.applicationEnd = "";
      this.queryParams.approveStart = "";
      this.queryParams.approveEnd = "";
      this.queryParams.churnApplicant = "";
      this.queryParams.churnReason = "";
      this.queryParams.delSwitch = "";
      this.applicationTimeList = null;
      this.approveTimeList = null;
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageNum = 10;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
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
      } else {
        this.queryParams.approveStart = "";
        this.queryParams.approveEnd = "";
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageNum = 10;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.resetQuery();
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      // 查询参数
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
        delSwitch: null //审核状态
      };
      this.$refs.queryForm.resetFields();
      this.applicationTimeList = null;
      this.approveTimeList = null;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    handleRegionChange(value) {
      this.form.district = CodeToText[value[0]];
      this.form.province = CodeToText[value[0]];
      this.form.city = CodeToText[value[1]];
      this.form.county = CodeToText[value[2]];
    },
    //新增客户提交按钮
    addSubmitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.id = null;
          addClient(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增商机成功");
              this.openCustomer = false;
              this.getList();
            }
          });
        }
      });
    },
    /** 查询信息列表 */
    getList() {
      this.loading = true;
      this.queryParams.churnType = this.queryParams.clientType;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      //churnType
      data.clientType = data.clientType == "0" ? "" : data.clientType;
      data.churnType = data.churnType == "0" ? "" : data.churnType;
      runApplyBeList(data).then(response => {
        this.bankList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.showSearch = false; //筛选取消按钮
      this.resetForm("queryForm");
      this.openOffAudit = false; //流失审核取消按钮
      this.openCustomer = false; //新增客户取消按钮
      this.openOrderAudit = false; //申请详情
    },
    // 流失审核
    // auditUps(id){

    // },
    auditUp(id) {
      this.reset();
      this.openOffAudit = true;
      this.title = "流失审核";
      let data = JSON.parse(JSON.stringify(id));
      runParticulars({ companyId: data }).then(response => {
        this.companyList = response.data;
        console.log(response.data);
      });
    },
    // 查看详情
    // 查看流失申请
    orderAuditUp(id) {
      this.reset();
      this.custom = 0;
      this.openOrderAudit = true;
      this.title = "查看详情";
      let data = JSON.parse(JSON.stringify(id));
      runParticulars({ companyId: data }).then(response => {
        this.companyList = response.data;
        console.log(response.data);
      });
    },
    ordersAuditUp(id) {
      this.reset();
      this.custom = this.custom + 1;
      this.openOrderAudit = true;
      this.title = "查看详情";
      //
      let data = JSON.parse(JSON.stringify(id));
      runParticulars({ companyId: data }).then(response => {
        this.companyList = response.data;
        console.log(response.data);
      });
    },
    
    // 客户提交按钮
    //  流失审核提交按钮
    submitForm() {
      let companyListRun = this.companyList;
      if(companyListRun.reviewerRemarks==''){
        return  this.$message.error('必须填写审核备注!');
      }
      runAudit(companyListRun).then(response => {
        this.openOffAudit = false;
      });
      this.getList();
    },
    // 表单重置
    reset() {
      this.form = {
        userlabelIds: []
      };
    },
    //行业分类字典
    industryNameFormat(row) {
      return this.selectDictLabel(this.industryNameList, row.industryName);
    },
    //客户来源分类字典
    businessFromFormat(row) {
      return this.selectDictLabel(this.clientSourceList, row.clientSource);
    }
  },
  computed: {
    ...mapGetters(["tableHeight"])
  },
  created() {
    this.getList();
    this.getDicts("source_type_lv").then(res => {
      this.opinionList = res.data;
    });
    // 行业分类
    this.getDicts("business_from").then(res => {
      this.industryNameList = res.data;
    });
    //客户来源
    this.getDicts("business_from").then(res => {
      this.clientSourceList = res.data;
    });
    //客户类型
    this.getDicts("opportunity_type").then(res => {
      this.clientType = res.data;
    });
    //增值税类型
    this.getDicts("vat_type").then(res => {
      this.vatTypeList = res.data;
    });
    this.getDicts("auditor_state").then(res => {
      this.delSwitchList = res.data;
    });
      //流失原因
    this.getDicts("reasons_for_loss").then(res => {
      this.reasonsList = res.data;
      console.log(this.reasonsList);
    });
  
  }
};
</script>

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
.el-form-item__content .left{
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
