<template>
  <!-- spendingReview -->
  <div class="app-container special-approval">
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
                :visible.sync="showSearch"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
              >

              <el-form-item label="订单编号:" prop="orderNo">
                  <el-input
                    placeholder="请输入订单编号"
                    v-model="queryParams.orderNo"
                  ></el-input>
                </el-form-item>


                <el-form-item label="审核状态:">
                  <template>
                    <el-radio v-model="queryParams.reviewerType" label="10">审核中</el-radio>
                    <el-radio v-model="queryParams.reviewerType" label="20">审核成功</el-radio>
                    <el-radio v-model="queryParams.reviewerType" label="30">审核失败</el-radio>
                  </template>
                </el-form-item>


                <el-form-item label="审核时间:" prop="reviewTime">
                  <el-date-picker
                    v-model="queryParams.reviewerTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="开始日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="创建时间:" prop="createDate">
                  <el-date-picker
                    v-model="queryParams.createDate"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="开始日期"
                  ></el-date-picker>
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
              icon="el-icon-search"
              @click="showSearch = !showSearch"
              >筛选 </el-button
          ></el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.keyword"
            placeholder="请输入公司名称"
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
      <el-tabs v-model="queryParams.reviewerType" @tab-click="handleTabQuery">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <el-tab-pane
          v-for="(item,index) in reviewerTypeList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
          v-if="index<=2"
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
        @row-click="handleRowFun"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="left" />
        <el-table-column label="支出编号" align="left" prop="expendNumber" />
        <el-table-column label="支出类型" align="left" prop="expendName" />
        <el-table-column
          label="客户名称"
          align="left"
          prop="companyName"
        /><!--  -->

        <el-table-column
          label="关联合同订单"
          align="left"
          prop="contractId"
        />
        <el-table-column label="支出金额" align="left" prop="expendMoney" />
        <el-table-column label="付款方式" align="left" prop="paymentWay" />
        <el-table-column label="付款账户" align="left" prop="payeeAccount" />
        <el-table-column label="付款时间" align="left" prop="paymentTime" />
        <el-table-column
          label="收费审核状态"
          align="left"
          prop="reviewerType"
          :formatter="auditStateDictionaries"
          >
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.reviewerType == 10">{{
              auditState(scope.row.reviewerType)
            }}</el-tag>
            <el-tag v-else-if="scope.row.reviewerType == 20">{{
              auditState(scope.row.reviewerType)
            }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.reviewerType == 30">{{
              auditState(scope.row.reviewerType)
            }}</el-tag>
            <span v-else>—————</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" prop="companyName">
          <template slot-scope="scope">
            <div v-if="scope.row.reviewerType != 10">
              <el-button
                size="mini"
                type="text"
                @click="orderParticularsUp(scope.row)"
                >查看详情</el-button
              >
            </div>
            <div v-if="scope.row.reviewerType == 10">
              <el-button
                size="mini"
                type="text"
                @click="orderAuditUp(scope.row)"
                :disabled='scope.row.giveAwayType == "" ? false : true '
                >审核</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          class-name="table-control"
          fixed="right"
          width="50"
        >
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
    <!-- 审核 -->
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
              <i class="el-icon-office-building" style="margin-right:9px"></i>
              <span>{{queryParams.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-alert
              title="ss!"
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
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="remarks">
            <el-form-item
              label="点击不通过，必须填写备注，否则无法确认审核！:"
              style="margin-left:36px;margin-right:34px;display:flex; align-items: flex-start;"
            >
              <el-input
                type="textarea"
                style="width: 325px;height: 98px;"
                placeholder="请填写审核备注"
                v-model="auditData.remark"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button type="primary" @click="submitForm" v-if="roles.indexOf('boss') == -1">确认审核</el-button>
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
                label="20"
                class="price"
                v-if="orderParticularsList.reviewerType == 20"
              >
                通过</el-radio
              >
              <el-radio v-model="radio" label="30" class="price" v-else>
                未通过</el-radio
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="sonBox">
              <span class="right14">审核备注:</span>
              <span class="price">{{
                orderParticularsList.reviewerRemarks
              }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{ orderParticularsList.reviewerTime }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{ orderParticularsList.reviewerName }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import {
  expenditureAuditList, //列表展示
  affirmAudit, //审核
  lookConsumptionParticulars //支出审核查看详情
} from "@/api/crm/spendingReview/spendingReview";
export default {
  name: "",
  data() {
    return {
      showSearch: false, // 显示搜索条件
      loading: true, // 遮罩层
      total: 0,
      radio: "20",
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        reviewerType:'0',//审核状态
        reviewerTime:null,//审核时间
        createDate:null,//创建时间
      },
     
      delSwitch: {},
      sourceTypeLv: {},
      // clientType: [
      //   { dictName: "待审核订单" },
      //   { dictName: "审核通过" },
      //   { dictName: "审核未通过" }
      // ],
      companyList: [],
       auditData: {}, //审核数据
      reviewerTypeList: [], //审核状态
      orderReview: false, //订单审核
      orderParticulars: false, //审核详情
      orderParticularsList: {}
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: state => state.user
    })
  },
   beforeRouteEnter(to, from, next){
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      // vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    //   重置
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams={
        pageNo: 1,
        pageSize: 10,
        reviewerType:'0',//审核状态
        reviewerTime:null,//审核时间
        createDate:null,//创建时间
        orderNo:""
      };

    },
     /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.getList();

    },
      handleTabQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
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
      this.getList();
    },
    getList() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      data.reviewerType = data.reviewerType == "0" ? "" : data.reviewerType;
      expenditureAuditList(data).then(response => {
        this.companyList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    //字典
    auditStateDictionaries(row) {
      return this.selectDictLabel(this.reviewerTypeList, row.reviewerType);
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
    handleRowFun(row, column, event) {
      // console.info(column.property);
    },
    // 订单审核弹窗
    orderAuditUp(row) {
      this.orderReview = true;
      this.auditData.id = row.id;
      this.auditData.identification = row.identification;
      this.queryParams.companyName=row.companyName
    },
    // 取消按钮
    cancel() {
      this.orderReview = false; //订单审核
      this.orderParticulars = false; //订单审核详情
      this.auditData = {};
      this.showSearch = false; //筛选
      this.queryParams={}
    },
    // 订单审核提交按钮
    submitForm() {
      this.orderParticulars = false; //订单审核详情
      this.auditData.status = this.auditData.dispatchState;
      let companyListRun = JSON.parse(JSON.stringify(this.auditData));
      affirmAudit(companyListRun).then(response => {
        this.orderReview = false; //订单审核
        this.getList();
        this.openOrderAudit = false;
      });
    },
    //订单审核详情弹窗
    orderParticularsUp(row) {
      this.orderParticulars = true;
      this.auditData.id = row.id;
      this.auditData.companyName = row.companyName;
      lookConsumptionParticulars({ id: row.id }).then(response => {
        this.orderParticularsList = response.data;
      });
    }
  },
  created() {
    this.getList();
    //审核状态
    this.getDicts("auditor_state").then(res => {
      this.reviewerTypeList = res.data;
    });
    this.roles = this.userInfo.roleCodes;
  }
};
</script>

<style lang="scss">
// 订单审核
.OrderReview {
  .el-dialog {
    border-radius: 4px;
    margin-top: 25vh !important ;
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
