<template>
  <!-- checkForTheAudit -->
  <div class="app-container">
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover popper-class="search-popover-vi" placement="top-start" width="400"    trigger="manual" v-model="showSearch">
            <div class="search-popover">
              <el-form :model="queryParams"  :visible.sync="showSearch" ref="queryForm" :inline="true" label-width="120px" label-position="left">


                 <el-form-item label="订单编号:" prop="orderNo">
                  <el-input
                    placeholder="请输入订单编号"
                    v-model="queryParams.orderNo"
                  ></el-input>
                </el-form-item>


                <el-form-item label="审核状态:">
                  <template>
                    <el-radio v-model="queryParams.advanceReviewerType" label="10">审核中</el-radio>
                    <el-radio v-model="queryParams.advanceReviewerType" label="20">审核成功</el-radio>
                    <el-radio v-model="queryParams.advanceReviewerType" label="30">审核失败</el-radio>
                  </template>
                </el-form-item>
                <el-form-item label="收款人:">
                  <el-input placeholder="请输入收款人" v-model="queryParams.advanceTollReviewer"></el-input>
                </el-form-item>
                <el-form-item label="审核时间:">
                  <el-date-picker v-model="queryParams.advanceReviewerTime" size="small" class="mw350"
                    value-format="yyyy-MM-dd" type="date" placeholder="开始日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="创建时间:">
                  <el-date-picker v-model="queryParams.createDate" size="small" class="mw350" value-format="yyyy-MM-dd"
                    type="date" placeholder="开始日期"></el-date-picker>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuerys">确认</el-button>
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search"  @click="showSearch = !showSearch">筛选</el-button>
          </el-popover>
          <el-input class="ml8" v-model="queryParams.keyword" placeholder="请输入公司名称" clearable size="small"
            style="width: 240px" suffix-icon="el-icon-search" @keyup.enter.native="handleQuerys" />
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
      <el-tabs v-model="queryParams.advanceReviewerType" @tab-click="handleTabQuery">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <el-tab-pane v-for="(item, index) in stateList" :key="item.dictCode" :label="item.dictName"
          :value="item.dictCode" :name="item.dictCode" v-if="index <= 2"></el-tab-pane>
      </el-tabs>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
      </div>
    </div>
    <div class="table-data">
      <el-table v-loading="loading" :data="companyList" @selection-change="handleSelectionChange"
        @row-click="handleRowFun" :height="tableHeight">
        <el-table-column type="selection" width="55" align="left" />
        <el-table-column label="公司名称" align="left" prop="companyName">
          <template slot-scope="scope">
            <el-button type="text" @click="showDrawer(scope.row)">{{
              scope.row.companyName
            }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="订单编号" align="left" prop="orderNo">
          <template slot-scope="scope">
            <el-button @click="editOrderFun(scope.row)" type="text">
              <span style="color: red" v-if="scope.row.expeditedType == 10">!!!</span>
              {{ scope.row.orderNo }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="left" prop="serpriceName" />
        <el-table-column label="实收金额" align="left" prop="actualPaymentAmount" />

        <el-table-column label="付款方式" align="left" prop="paymentMethod" />
        <el-table-column label="付款账户" align="left" prop="account" />
        <el-table-column label="付款截图" align="left">
          <template slot-scope="scope">
            <div style="
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #3978e7;
                line-height: 34px;
              " @click="paymentScreenshot(scope.row)">
              付款截图
            </div>
          </template>
        </el-table-column>
        <el-table-column label="付款时间" align="left" prop="advancePaymentTime" />
        <el-table-column label="收费负责人" align="left" prop="payingUserName" />
        <el-table-column label="收费审核状态" align="left" prop="state">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.state == 10">{{
              auditState(scope.row.state)
            }}</el-tag>
            <el-tag v-else-if="scope.row.state == 20">{{
              auditState(scope.row.state)
            }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.state == 30">{{
              auditState(scope.row.state)
            }}</el-tag>
            <span v-else>—————</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" prop="companyName">
          <template slot-scope="scope">
            <div v-if="scope.row.state == 20 || scope.row.state == 30">
              <el-button size="mini" type="text" @click="orderParticularsUp(scope.row)">查看详情</el-button>
            </div>
            <div v-if="scope.row.state == 10">
              <el-button size="mini" type="text" @click="orderAuditUp(scope.row)">审核</el-button>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          align="center"
          class-name="table-control"
          fixed="right"
          width="50"
        >
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
          </template> -->
        <!-- <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="clientData(scope.row)"
              v-hasPermi="['share:bank:edit']"
              >创建订单
            </el-button>
          </template> -->
        <!-- </el-table-column> -->
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </div>
    <!-- 付款截图 -->
    <el-dialog title="付款截图" :visible.sync="paymentScreenshotCondition" width="516px" append-to-body
      class="paymentScreenshot">
      <el-form label-position="labelPosition" class="chengjiao">
        <el-row>
          <el-col :span="12" v-for="(item, index) in paymentScreenshotList" :key="index + 'm'">
            <div class="img-box" v-if="paymentScreenshotList.length != 0">
              <el-image fit="cover" style="width:50%; margin-bottom:10px" :src="fileUrl + item.url" :preview-src-list="
                  paymentScreenshotList.map(ite => {
                    return fileUrl + ite.url;
                  })
                "></el-image>
              <!-- <img
                style="width: 50%; margin-bottom: 10px"
                :src="item.url"
                v-for="item in paymentScreenshotList"
                alt=""
                @click="amplificationImg"
              /> -->
            </div>
            <div class="oo" v-if="paymentScreenshotList.length == []">
              暂时还没有付款截图哦！
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="paymentScreenshotCondition = false">关闭</el-button>
        <!-- <el-button type="primary" @click="paymentScreenshotSubmitForm" v-if="roles.indexOf('boss') == -1">确认</el-button> -->
      </div>
    </el-dialog>
    <!-- <el-dialog
      :visible.sync="imgAmplification"
      style="z-index: 20010 !important"
    >
      <img
        :src="item.url"
        alt=""
        v-for="item in paymentScreenshotList"
        style="width: 100%"
      />
    </el-dialog> -->
    <!--  订单审核-->
    <el-dialog title="订单审核" :visible.sync="orderReview" width="516px" append-to-body class="OrderReview">
      <el-form label-position="labelPosition" class="chengjiao" :model="auditData">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="companyName">
              <i class="el-icon-office-building" style="margin-right: 9px"></i>
              <span>{{ queryParams.companyName }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="rowFather">
          <el-col :span="12">
            <el-form-item label="预收金额" style=" position: relative;">
              <span style=" position: absolute;
          top: 38px;
          right: 15px;
          z-index: 99;">元</span>
              <el-input v-model="auditData.amount" :disabled="true"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付时间">
              <el-date-picker v-model="auditData.paymentTime" type="date" placeholder="选择日期" :disabled="true">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款方式">
              <el-select v-model="auditData.paymentMethod" placeholder="请选择" :disabled="true">
                <el-option v-for="item in paymentMethodList" :key="item.dictCode" :label="item.dictLabel"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款账户">
              <el-input v-model="auditData.account" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="收费备注">
              <el-input type="textarea" autosize placeholder="请输入内容" v-model="auditData.chargeRemarks" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-for="(item, index) in collectionScreenshotList" :key="index + 'm'">
            <!-- <el-form-item label="收款截图"> -->
            <div style="margin-bottom:15px">付款截图</div>
            <div class="img-box" v-if="collectionScreenshotList.length != 0">
              <el-image fit="cover" style="width:50%; margin-bottom:10px" :src="fileUrl + item" :preview-src-list="
                  collectionScreenshotList.map(ite => {
                    return fileUrl + ite;
                  })
                "></el-image>
            </div>
            <!-- </el-form-item> -->
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-alert title="点击不通过，必须填写备注，否则无法确认审核!" type="warning" show-icon class="word">
            </el-alert>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="审核意见:" style="margin-left: 36px; margin-right: 34px; margin-top: 16px"
              prop="dispatchState">
              <el-radio v-model="auditData.dispatchState" label="20">通过</el-radio>
              <el-radio v-model="auditData.dispatchState" label="30">不通过</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="remarks">
            <el-form-item label="审核备注:" style="
                margin-left: 36px;
                margin-right: 34px;
                display: flex;
                align-items: flex-start;
              ">
              <el-input type="textarea" style="width: 325px; height: 98px" placeholder="请填写审核备注"
                v-model="auditData.auditorRemarks" />
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
    <el-dialog title="订单审核详情" :visible.sync="orderParticulars" width="516px" append-to-body class="orderParticulars">
      <el-form label-position="labelPosition" class="chengjiao">
        <el-row :gutter="20" class="name">
          <el-col :span="24">
            <div class="companyName">
              <i class="el-icon-office-building" style="margin-right: 9px"></i>
              <span>{{ auditData.companyName }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="62" class="form-box">
          <el-col :span="24">
            <div class="sonBox idea">
              <span class="right14">审核状态:</span>
              <el-radio v-model="radio" label="1" class="price" v-if="orderParticularsList.status == 20">
                通过</el-radio>
              <el-radio v-model="radio" label="1" class="price" v-else>
                未通过</el-radio>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="sonBox">
              <span class="right14">审核备注:</span>
              <span class="price">{{ orderParticularsList.remark }}</span>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="sonBox">
              <span class="right14">审核时间:</span>
              <span class="price">{{ orderParticularsList.time }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="sonBox">
              <span class="right14">审核人:</span>
              <span class="price">{{ orderParticularsList.name }}</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <edit-drawer :visible.sync="drawerVisible" :companyId="companyId"></edit-drawer>
    <!-- 订单七项 -->
    <edit-order :visible.sync="orderVisible" :orderId="orderId" :hidden-tab="hiddenTab"></edit-order>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import {
    mapGetters
  } from "vuex";
  import {
    checkForTheAuditList, //列表展示
    OrderReviewList,
    queryCondition, //查询列表
    lookParticulars, //订单申请详情
    findChargeList, //付款截图
    selectChargeVouchers
  } from "@/api/crm/checkForTheAudit/checkForTheAudit";
  import {
    selectReceiptReview
  } from "@/api/crm/paymentCollection/paymentCollection.js";
  import {
    getClient
  } from "@/api/crm/customer/customer";
  import EditDrawer from "@/views/components/EditDrawer";
  import EditOrder from "@/views/components/EditOrder"; //订单七项
  import NewOrder from "@/views/components/NewOrder";
  import {
    listOrder,
    getServeList
  } from "@/api/crm/order";
  import login_bfVue from "../../../login_bf.vue";

  export default {
    name: "",
    components: {
      EditDrawer,
      EditOrder,
      NewOrder
    },
    data() {
      return {
        fileUrl: process.env.VUE_APP_FILE_API,
        roles: [],
        loading: true, // 遮罩层
        total: 0,
        radio: "1",
        // clientType: [
        //   { dictName: "待审核订单" },
        //   { dictName: "审核通过" },
        //   { dictName: "审核未通过" }
        // ],
        companyId: null,
        showSearch: false, // 显示搜索条件
        drawerVisible: false, //抽屉显示
        orderReview: false, //订单审核
        orderParticulars: false, //订单审核详情
        paymentScreenshotCondition: false, //付款截图的弹窗
        sourceTypeLv: {},
        delSwitch: {},
        companyList: [],
        queryParams: {
          pageNo: 1,
          pageSize: 10,
          auditorRemarks: null,
          advanceReviewerType: '0', //审核状态
          advanceTollReviewer: null, //收款人
          advanceReviewerTime: null, //审核时间
          createDate: null //创建时间
        }, //订单审核
        auditData: {}, //审核数据
        orderParticularsList: {},
        stateList: [], //审核状态
        paymentMethodList: [], //付款方式
        stepIndex: 0,
        //查看订单显示
        orderVisible: false,
        orderId: "",
        hiddenTab: true,
        orderObj: null, //点击订单编号传的数据
        paymentScreenshotList: [], //付款截图回显数据
        collectionScreenshotList: [], //审核收款截图回显
        imgAmplification: false //付款截图图片放大
      };
    },
    computed: {
      ...mapGetters(["tableHeight"]),
      ...mapState({
        userInfo: state => state.user
      })
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        //因为当钩子执行前，组件实例还没被创建
        // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
        // console.log(vm);//当前组件的实例
        vm.resetQuery();
        vm.getList();
      });
    },
    methods: {
      //审核状态
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
        // this.resetQuery();
        this.getList();
      },
      //筛选重置按钮
      resetQuery() {
        this.resetForm("queryForm");
        this.$refs.queryForm.resetFields();
        this.queryParams = {
          pageNo: 1,
          pageSize: 10,
          auditorRemarks: null,
          advanceReviewerType: '0', //审核状态
          advanceTollReviewer: null, //收款人
          advanceReviewerTime: null, //审核时间
          createDate: null, //创建时间
          orderNo:""
        }; //订单审核
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id);
        this.single = selection.length !== 1;
        this.multiple = !selection.length;
      },
      // 付款截图
      paymentScreenshot(row) {
        this.paymentScreenshotCondition = true;
        findChargeList({
          id: row.id,
          identification: row.identification
        }).then(
          res => {
            this.paymentScreenshotList = res.data;
          }
        );
      },
      // 付款截图-图片放大
      amplificationImg() {
        this.imgAmplification = true;
      },
      getList() {
        this.loading = true;
        // this.queryParams.advanceReviewerType=this.queryParams.clientType;
        //  this.queryParams.advanceReviewerType=this.queryParams.dispatchState
        let data = JSON.parse(JSON.stringify(this.queryParams));
        data.state = data.state == "0" ? "" : data.state;
        data.advanceReviewerType =
          data.advanceReviewerType == "0" ? "" : data.advanceReviewerType;
        // data.clientType = data.clientType == "0" ? "" : data.clientType;
        selectReceiptReview(data).then(response => {
          this.companyList = response.data.rows || [];
          this.total = response.data.totalRows;
          this.loading = false;
        });
      },
      getOrderList(id) {
        listOrder({
          id: id
        }).then(res => {
          this.orderList = res.data || [] || "";
        });
      },
      //点击订单编号
      editOrderFun(row) {
        this.getOrderList(row.companyId);
        getServeList({
          id: row.busirId
        }).then(res => {
          this.$emit("editOrder", res.data);
          this.orderId = res.data.id;
          this.orderVisible = true;
          this.hiddenTab = false;
        });
      },
      //字典
      auditStateDictionaries(row) {
        return this.selectDictLabel(this.stateList, row.state);
      },
      // 付款方式
      paymentMethodDictionaries(row) {
        return this.selectDictLabel(this.paymentMethodList, row.paymentMethod);
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
        // this.queryParams.advanceReviewerType=this.queryParams.dispatchState
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
          // this.getContacts(row.id); //获取联系人
          // this.getOrderList(row.id);
          // this.getContractList(row.id); //合同
        }
      },
      getDetail(row, cb) {
        getClient({
          id: row.id
        }).then(response => {
          let data = response.data;
          try {
            data.userLabel = data.userLabel ? JSON.parse(data.userLabel) : [];
            data.district = data.district ? JSON.parse(data.district) : [];
          } catch (e) {}
          this.form = data;
          if (typeof cb == "function") {
            cb(response);
          }
        });
      },
      //抽屉
      showDrawer(row) {
        this.drawerVisible = true;
        this.companyId = Number(row.companyId);
        // this.companyId = row.companyId;
      },
      // 订单审核弹窗
      orderAuditUp(row) {
        this.collectionScreenshotList = [];
        this.orderReview = true;

        this.queryParams.companyName = row.companyName;
        let oderForm = {
          category: row.category,
          universalId: row.id
        };
        selectChargeVouchers({
          category: row.category,
          universalId: row.id
        }).then(response => {
          let data = response.data;
          this.auditData = data;

          this.collectionScreenshotList = data.internalAccountImages.map(ite => {
            return ite.url;
          });
          this.auditData.id = row.id;
          this.auditData.identification = row.identification;
        });
      },
      //订单审核详情弹窗
      orderParticularsUp(row) {
        this.orderParticulars = true;
        this.auditData.id = row.id;
        this.auditData.companyName = row.companyName;
        lookParticulars({
          id: row.id,
          type: row.identification
        }).then(
          response => {
            this.orderParticularsList = response.data;
          }
        );
      },
      // 取消按钮
      cancel() {
        this.paymentScreenshotCondition = false; //付款截图
        this.orderReview = false; //订单审核
        this.orderParticulars = false; //订单审核详情
        this.queryParams = {};
      },
      // 付款截图确定按钮
      paymentScreenshotSubmitForm() {
        this.paymentScreenshotCondition = false;
      },
      // 订单审核提交按钮
      submitForm() {
        this.orderParticulars = false; //订单审核详情
        //
        let companyForm = {
          id: this.auditData.id,
          status: this.auditData.dispatchState,
          type: this.auditData.identification,
          remark: this.auditData.auditorRemarks
        };
        // this.auditData.status = this.auditData.dispatchState;
        // this.auditData.type = this.queryParams.identification;
        // let companyListRun = JSON.parse(JSON.stringify(this.auditData));
        OrderReviewList(companyForm).then(response => {
        this.orderReview = false; //订单审核
          this.openOrderAudit = false;
          this.getList();
          this.auditData = {};
        });
      }
    },
    created() {
      this.roles = this.userInfo.roleCodes;
      this.getList();
      //审核状态
      this.getDicts("auditor_state").then(res => {
        this.stateList = res.data;
      });
      // 付款方式
      this.getDicts("payment_method").then(res => {
        this.paymentMethodList = res.data;
      });
    }
  };
</script>

<style lang="scss" scoped>
  .el-dialog {
    margin-top: 25vh !important;
  }

  // 付款截图
  .paymentScreenshot {
    .el-dialog {
      min-height: 375px;
      position: relative;

      .el-dialog__body {
        padding: 14px 28px 64px;

        .el-form {
          .el-row {
            .el-col {
              margin-top: 18px;

              .img-box {
                display: flex;
                flex-direction: column;
                align-items: center;

                // justify-content:center ;
                img {
                  width: 180px;
                  height: 132px;
                }

                span {
                  margin-top: 6px;
                  text-align: center;
                  font-size: 14px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #565759;
                  line-height: 24px;
                }
              }
            }
          }
        }
      }

      .el-dialog__footer {
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
    }
  }
</style>
<style lang="scss">
  // 订单审核
  .OrderReview {
    .el-dialog {
      border-radius: 4px;
      margin-top: 15vh !important;

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

  .rowFather {
    background-color: #f5f6f8;
    margin-bottom: 25px;
    padding-top: 15px;
    padding-left: 5px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
</style>
