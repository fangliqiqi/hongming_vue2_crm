<template>
  <div class="app-container myRenewal">
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
                <el-form-item label="合同编号" class="one" prop="controlNo">
                  <el-input
                    placeholder="请输入"
                    v-model="queryParams.controlNo"
                  ></el-input>
                </el-form-item>
                <el-form-item label="客户名称" class="one" prop="companyName">
                  <el-input
                    placeholder="请输入"
                    v-model="queryParams.companyName"
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item label="到期时间" prop="signingDate">
                 <el-date-picker
                   v-model="queryParams.recycleTimeList"
                   size="small"
                   class="mw350"
                   value-format="yyyy-MM-dd"
                   type="daterange"
                   range-separator="-"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期"
                 ></el-date-picker>
                </el-form-item> -->
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
            v-if="false"
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
      <el-tabs v-model="queryParams.kfAuditType" @tab-click="handleQuerys">
       <!-- <el-tab-pane label="合同即将到期客户" value="400" name="400">
          <div class="account-table table-data">
            <el-table
              class="agentForm"
              v-loading="loading"
              :data="expireList"
              @selection-change="handleSelectionChange"
              @row-click="handleRowFun"
              :height="tableHeight"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                label="合同编号"
                align="left"
                prop="controlNo"
                width="180"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="showDrawer(scope.row)"
                    style="width:100%;text-align:left"
                    >{{ scope.row.controlNo }}</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="客户名称"
                align="left"
                prop="companyName"
                width="180"
              />
              <el-table-column label="关联订单号" align="left" prop="orderNo" />
              <el-table-column
                label="合同金额"
                align="left"
                prop="money"
                width="120"
              />
              <el-table-column label="合同开始时间" align="left" width="180">
                <template slot-scope="scope">
                  {{
                    parseTime(
                      scope.row.servicePeriodStart,
                      "{y}-{m}-{d} {h}:{i}:{s}"
                    ) || ""
                  }}
                </template>
              </el-table-column>

              <el-table-column label="合同结束时间" align="left" width="180">
                <template slot-scope="scope">
                  {{
                    parseTime(
                      scope.row.servicePeriodEnd,
                      "{y}-{m}-{d} {h}:{i}:{s}"
                    ) || ""
                  }}
                </template>
              </el-table-column>
              <el-table-column label="合同签约时间" align="left" width="180">
                <template slot-scope="scope">
                  {{
                    parseTime(
                      scope.row.signingDate,
                      "{y}-{m}-{d} {h}:{i}:{s}"
                    ) || ""
                  }}
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
        </el-tab-pane> -->
        <el-tab-pane
          label="近一个月到期合同"
          value="1" name="1">
         </el-tab-pane>
         <el-tab-pane
           label="近三个月到期合同"
           value="3" name="3">
          </el-tab-pane>
          <el-tab-pane
            label="近半年到期合同"
            value="6" name="6">
           </el-tab-pane>
          <el-tab-pane
            label="合同过期客户"
            value="500" name="500">
           </el-tab-pane>
       <!-- <el-tab-pane label="合同过期客户" value="500" name="500">
          <div class="account-table table-data">
            <el-table
              class="agentForm"
              v-loading="loading"
              :data="arrearsList"
              @selection-change="handleSelectionChange"
              @row-click="handleRowFun"
              :height="tableHeight"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                label="合同编号"
                align="left"
                prop="controlNo"
                width="180"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="showDrawer(scope.row)"
                    style="width:100%;text-align:left"
                    >{{ scope.row.controlNo }}</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="客户名称"
                align="left"
                prop="companyName"
                width="180"
              />
              <el-table-column label="关联订单号" align="left" prop="orderNo" />
              <el-table-column
                label="合同金额"
                align="left"
                prop="money"
                width="120"
              />
              <el-table-column label="合同开始时间" align="left" width="180">
                <template slot-scope="scope">
                  {{
                    parseTime(
                      scope.row.servicePeriodStart,
                      "{y}-{m}-{d} {h}:{i}:{s}"
                    ) || ""
                  }}
                </template>
              </el-table-column>

              <el-table-column label="合同结束时间" align="left" width="180">
                <template slot-scope="scope">
                  {{
                    parseTime(
                      scope.row.servicePeriodEnd,
                      "{y}-{m}-{d} {h}:{i}:{s}"
                    ) || ""
                  }}
                </template>
              </el-table-column>
              <el-table-column label="合同签约时间" align="left" width="180">
                <template slot-scope="scope">
                  {{
                    parseTime(
                      scope.row.signingDate,
                      "{y}-{m}-{d} {h}:{i}:{s}"
                    ) || ""
                  }}
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
        </el-tab-pane> -->
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
      <div class="account-table table-data">
        <el-table
          class="agentForm"
          v-loading="loading"
          :data="arrearsList"
          @selection-change="handleSelectionChange"
          @row-click="handleRowFun"
          :height="tableHeight"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="合同编号"
            align="left"
            prop="controlNo"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="showDrawer(scope.row)"
                style="width:100%;text-align:left"
                >{{ scope.row.controlNo }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            label="客户名称"
            align="left"
            prop="companyName"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="showDrawerRight(scope.row)"
                style="width: 100%; text-align: left"
                >{{ scope.row.companyName }}</el-button
              >
            </template>
          </el-table-column>

          <el-table-column label="关联订单号" align="left" prop="orderNo" />
          <el-table-column
            label="合同金额"
            align="left"
            prop="money"
            width="120"
          />
          <el-table-column label="合同开始时间" align="left" width="180">
            <template slot-scope="scope">
              {{
                parseTime(
                  scope.row.servicePeriodStart,
                  "{y}-{m}-{d} {h}:{i}:{s}"
                ) || ""
              }}
            </template>
          </el-table-column>

          <el-table-column label="合同结束时间" align="left" width="180">
            <template slot-scope="scope">
              {{
                parseTime(
                  scope.row.servicePeriodEnd,
                  "{y}-{m}-{d} {h}:{i}:{s}"
                ) || ""
              }}
            </template>
          </el-table-column>
          <el-table-column label="合同签约时间" align="left" width="180">
            <template slot-scope="scope">
              {{
                parseTime(
                  scope.row.signingDate,
                  "{y}-{m}-{d} {h}:{i}:{s}"
                ) || ""
              }}
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

    </div>
    <edit-order
      :visible.sync="orderVisible"
      :orderId="orderId"
      :hidden-tab="hiddenTab"
    ></edit-order>
    <edit-drawer
      :visible.sync="drawerVisible"
      :companyId="companyId"
    ></edit-drawer>

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
import { mapGetters } from "vuex";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
/*获取省市区信息*/
import { mapState } from "vuex";
import { _getSessionStore } from "@/utils/storage";
import EditOrder from "@/views/components/EditOrder";
import EditContact from "@/views/components/EditContact";
import EditDrawer from "@/views/components/EditDrawer";
import RenewContract from "@/views/components/RenewContract";
import {
  ExpiringCustomers,
  CustomerInArrears
} from "../../../../api/crm/customerService/agentAccount";
export default {
  components: {
    EditOrder,
    EditContact,
    EditDrawer,
    RenewContract,
    ElImageViewer
  },
  name: "myRenewal",
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
      data: JSON.parse(JSON.stringify(data)),
      //树形控件回显数据
      treeData: [],
      treeData: JSON.parse(JSON.stringify(treeData)),
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      //即将到期客户列表
      expireList: [],
      //欠费客户列表
      arrearsList: [],
      //展示选中的小组
      arr: [],
      //角色
      roles: [],
      flag: null,
      drawerVisible: false, //抽屉显示
      //查看订单显示
      orderVisible: false,
      orderId: "",
      hiddenTab: true,
      //审核
      orderFrom: {},
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
      // 总条数
      total: 0,
      //公司id
      companyId: null,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        companyId: null,
        remarks: null,
        kfAuditType: "1",
        timeScreening:null,
        service: null,
        type: 10,
        controlNo: "",
        companyName: "",
        outerAccounting: null
      },
      // 表单参数
      form: {}
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: state => state.user
    })
  },
  watch: {},

  created() {
    this.queryParams.appId = this.$store.getters.appId + "";
    //订单审核结果
    this.getDicts("order_review_results").then(res => {
      this.statusList = res.data;
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
      vm.resetQuery();
      vm.getList();
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
    handleRowFun(row, column, event) {
    //   if (
    //     column.property &&
    //     column.property != undefined &&
    //     column.property != "undefined"
    //   ) {
    //     this.reset();
    //     this.companyId = row.id;
    //     this.view = true;
    //   }
    },

    /** 查询商机信息列表 */
    getList() {
      this.loading = true;
      let queryParams = JSON.parse(JSON.stringify(this.queryParams));

      if (queryParams.kfAuditType != 500) {
        this.queryParams.timeScreening = queryParams.kfAuditType
        ExpiringCustomers(this.queryParams).then(response => {
          this.arrearsList = response.data.records || [];
          this.total = response.data.total;
          this.loading = false;
        });
      } else if (queryParams.kfAuditType == "500") {
        this.queryParams.timeScreening = null
        CustomerInArrears(this.queryParams).then(response => {
          this.arrearsList = response.data.records || [];
          this.total = response.data.total;
          this.loading = false;
        });
      }
    },

    //抽屉
    showDrawer(row) {
      this.drawerVisible = true; 
      this.companyId = row.companyId;
    },
    //dialog关闭重置表单
    resetForm() {},
    // 客户资料抽屉
    showDrawerRight(row){
      this.drawerVisible = true;
      this.companyId = row.companyId;
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
        district: null
      };
      this.resetForm("form");
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
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        companyId: null,
        remarks: null,
        kfAuditType: "1",
        timeScreening:null,
        service: null,
        type: 10,
        controlNo: "",
        companyName: "",
        outerAccounting: null
      };
      this.labelName = "";
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

    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有公司银行开户信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          // return exportBank(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    }
  }
};
</script>
<style lang="scss">
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
</style>
