<template>
  <div class="app-container workHandover">
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
              </el-form>
              <div class="popover-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button size="small" @click="resetQuery">重置</el-button>
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
      <el-tabs  
        v-model="queryParams.specialApprovalsType"
         @tab-click="handleQuerys"
      >
        <el-tab-pane label="全部订单" value="" name=""></el-tab-pane>
        <el-tab-pane
          v-for="(item, index) in sourceTypeLvList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
          v-if="index < 3"
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
    <div class="table-data" >
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
        />
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
              style="display:flex;align-items:center;line-height: 16px;"
            >
              <img
                src="@/assets/image/orderAuditCompetent/ji.png"
                alt=""
                style="width: 24px;height: 16px; margin-right:4px;"
                v-if="scope.row.expeditedType == 10"
              />
              <span style="color:#3978E7;"> {{ scope.row.orderNo }}</span>
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
        <el-table-column label="申请人" align="left" prop="specialApplicant" />
        <el-table-column
          label="申请时间"
          align="left"
          prop="specialTime"
          min-width="200"
        />
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
        <el-table-column label="审核人" align="left" prop="approverName" />
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
              style="margin-left:36px;margin-right:34px;margin-top: 16px;"
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
                style="width: 330px;height: 98px;"
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
    <edit-drawer
      ref="editDrawer"
      :visible.sync="drawerShow"
      :companyId="companyId"
      @editOrder="editOrderFun"
    ></edit-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  orderAuditBeList, //订单审核主管列表
  viewDetails, //查看详情
  orderAuditSubmit //订单审核
} from "@/api/crm/orderAuditCompetent/orderAuditCompetent";
import EditDrawer from "@/views/components/EditDrawer/index";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  name: "Agent",
  components: {
    EditDrawer
  },
  data() {
    return {
      drawerShow: false,
      // 总条数
      total: 0,
      inputVisible: false,
      labelPosition: "top",
      sourceTypeLvList: [], //客户类型字典
      showSearch: false, // 显示搜索条件
      openOrderAudit: false, //审核弹出层
      openApply: false, //申请弹出层
      openAudit: false, //审核弹出层
      loading: true, // 遮罩层
      areaOptions: regionData, //区域数据
      // 公司银行开户信息表格数据
      bankList: [],
      viewDetailsList: [], //查看详情
      clientTypeList: [{ dictName: "a" }, { dictName: "b" }], //客户类型字典
      // 查询参数
      queryParams: {
         pageNo: 1,
          pageSize: 10,
        clientType: null,
        specialApprovalsType:"0",
        approverName: null, //审核人名称
        specialStartDate: "", //审核开始时间
        specialEndDate: "" //审核结束时间
      },
      specialStartTimeList: null, //审核时间
      auditObj: [], //审核对象
      open: false, // 是否显示弹出层
      dialogVisible: false,
      renewals: false,
      contractForm: [{ signingDate: 11 }], //申请时间
      opinion: "汪汪队", //客户名称
      auditData: {
        reexamination: null //审核备注
      }, //审核数据
      companyId: ""
    };
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
    //字典
    auditStateDictionaries(row) {
      return this.selectDictLabel(this.sourceTypeLvList, row.orderState);
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

    /** 查询客户信息列表 */
    getList() {
      this.loading = true;
      this.queryParams.reviewerType = this.queryParams.clientType;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      data.specialApprovalsType = data.specialApprovalsType == "0" ?null: data.specialApprovalsType;
      orderAuditBeList(data).then(response => {
        this.bankList = response.data.rows;
        this.total = response.data.totalRows;
        // console.info(response);
        this.loading = false;
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
      orderAuditSubmit(companyListRun).then(response => {
        this.openOrderAudit = false;
        this.getList();
      });
      this.openOrderAudit = false;

      this.$refs["form"].validate(valid => {
        if (valid) {
          // this.form.id = null;
          // addClient(this.form).then(response => {
          //   if (response.code === 200) {
          //     this.msgSuccess("新增商机成功");
          //     this.open = false;
          //     this.getList();
          //   }
          // });
        }
      });
    },
    // 申请详情
    applyUp(row) {
      this.reset();
      this.openApply = true;
      this.title = "特殊申请审批";
      // this.auditUp()
      //

      let id = row.id;
      viewDetails({ orderId: row.id }).then(response => {
        this.viewDetailsList = response.data;
      });
    },
    handleTableQuery(e) {
      this.queryParams.specialStartDate = "";
      this.queryParams.specialEndDate = "";
      this.queryParams.approverName = "";
      this.specialStartTimeList = null;
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      if (this.specialStartTimeList) {
        this.queryParams.specialStartDate =
          this.specialStartTimeList[0] + " 00:00:00";
        this.queryParams.specialEndDate =
          this.specialStartTimeList[1] + " 23:59:59";
      } else {
        this.queryParams.specialStartDate = "";
        this.queryParams.specialEndDate = "";
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
      this.resetQuery();
      this.queryParams = {
         pageNo: 1,
          pageSize: 10,
        clientType: null,
        specialApprovalsType:'0',
        approverName: null, //审核人名称
        specialStartDate: "", //审核开始时间
        specialEndDate: "" //审核结束时间
      };
        this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.$refs.queryForm.resetFields();
      this.queryParams = {
        pageNo: 1,
          pageSize: 10,
        clientType: null,
        specialApprovalsType:'0',
        approverName: null, //审核人名称
        specialStartDate: "", //审核开始时间
        specialEndDate: "" //审核结束时间
      };
        this.specialStartTimeList = null;
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
      this.openOrderAudit = false; //审核取消按钮
      this.openApply = false; //申请取消按钮
      this.dialogVisible = false;
      this.renewals = false;
      this.showSearch = false; //筛选
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
    editOrderFun() {},
    orderShowFun(row) {
      this.companyId = row.companyId;
      this.$refs.editDrawer.editOrderFun(row);
    },
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
    // 表单重置
    reset() {}
  },
  computed: {
    ...mapGetters(["tableHeight"])
  },
  created() {
    //审核状态
    this.getDicts("auditor_state").then(res => {
      this.sourceTypeLvList = res.data;
    });
    this.getList();
  }
};
</script>

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
