<template>
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
            <!-- 筛选弹框 -->
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


                <el-form-item label="审核状态:" prop="status">
                  <template>
                    <el-radio v-model="queryParams.status" label="10"
                      >待审核</el-radio
                    >
                    <el-radio v-model="queryParams.status" label="20"
                      >审核成功</el-radio
                    >
                    <el-radio v-model="queryParams.status" label="30"
                      >审核失败</el-radio
                    >
                  </template>
                </el-form-item>
                <el-form-item label="收款人:" prop="payUserName">
                  <el-input
                    placeholder="请输入收款人"
                    v-model="queryParams.payUserName"
                  ></el-input>
                </el-form-item>

                <el-form-item label="审核时间:" prop="reviewTime">
                  <el-date-picker
                    v-model="queryParams.reviewTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="开始日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="创建时间:" prop="createTime">
                  <el-date-picker
                    v-model="queryParams.createTime"
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
              @click="showSearch = !showSearch"
              >筛选<i class="el-icon-s-operation el-icon--right"></i>
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            placeholder="请输入所属公司
            "
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



    
    <!-- 任务列表 -->
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.status" @tab-click="handleQuerys">
        <el-tab-pane label="全部任务" value="全部任务" name=""></el-tab-pane>
        <el-tab-pane
          label="待审核订单"
          value="待审核订单"
          name="10"
        ></el-tab-pane>
        <el-tab-pane label="审核通过" value="审核通过" name="20"></el-tab-pane>
        <el-tab-pane
          label="审核未通过"
          value="审核未通过"
          name="30"
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
        :height="tableHeight"
      >
        <!-- @row-click="handleRowFun" -->
        <el-table-column type="selection" width="55" align="left" />
        <el-table-column label="订单编号" align="left" prop="orderNo" />
        <el-table-column label="客户名称" align="left" prop="clientName" />
        <el-table-column label="所属公司" align="left" prop="companyName" />
        <el-table-column label="应收金额" align="left" prop="receivable" />
        <el-table-column label="已收金额" align="left" prop="receipts" />
        <el-table-column label="收款方式" align="left" prop="manner" />
        <el-table-column label="收款截图" align="left" prop="images">
          <template slot-scope="scope">
            <el-button type="text" @click="screenshot(scope.row)">
              收款截图
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="left" prop="auditStatus">
          <template slot-scope="scope">
            <el-tag
              type="warning"
              v-if="scope.row.auditStatus == 10"
              @click="toAudit"
            >
              {{ "待审核" }}
            </el-tag>
            <el-tag v-if="scope.row.auditStatus == 20">
              {{ "审核通过" }}
            </el-tag>
            <el-tag type="danger" v-if="scope.row.auditStatus == 30">
              {{ "审核未通过" }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="left"
          class-name="table-control"
          fixed="right"
          width="220"
        >
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleExamine(scope.row)"
              v-if="roles.indexOf('marketCompanyBusirInternalAccount') !== -1"
              :disabled="
                scope.row.auditStatus == 20 || scope.row.auditStatus == 30
              "
              >审核</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="viewDetails(scope.row)"
              v-if="scope.row.auditStatus == 20 || scope.row.auditStatus == 30"
              >查看详情</el-button
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

    <!-- 付款截图 -->
    <el-dialog
      width="500px"
      title="付款截图"
      class="billRecordinners"
      :visible.sync="supplementaryMaterials"
    >
      <el-row :gutter="24">
        <el-col
          :span="12"
          v-for="(item, index) in imgList"
          :key="index + 'm'"
          class="box-a"
        >
          <div>
            <el-image
              fit="cover"
              style="width:50%; margin-bottom:10px"
              :src="fileUrl + item"
              :preview-src-list="
                imgList.map(ite => {
                  return fileUrl + ite;
                })
              "
            ></el-image>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" type="primary">关闭</el-button>
        <!-- <el-button type="primary">确认</el-button> -->
      </div>
    </el-dialog>
    <!-- 审核结果展示 -->
    <el-dialog
      title="订单审核详情"
      :visible.sync="result"
      width="500px"
      append-to-body
      class="toExamine"
    >
      <el-form
        ref="auditDetailsForm"
        label-width="82px"
        :model="auditDetailsForm"
        class="auditDetailsForm"
      >
        <el-row
          :gutter="24"
          style="   
              border-bottom: 1px solid #E6E7EB;
              margin-bottom: 24px;"
        >
          <el-col :span="24" style="padding-left:0px">
            <el-form-item prop="companyName">
              <template>
                <div style="font-size:16px">
                  <i class="el-icon-school" style="margin-right:10px" />{{
                    auditDetailsForm.name
                  }}
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-left:20px;padding-right:20px">
          <el-col :span="24">
            <el-form-item label="审核意见：" prop="status">
              <template>
                <el-tag
                  v-if="auditDetailsForm.status == 20"
                  style="height: 22px !important;line-height: 22px !important;
    margin: 0px;"
                  >审核通过</el-tag
                >
                <el-tag
                  type="danger"
                  v-if="auditDetailsForm.status == 30"
                  style="height: 22px !important;line-height: 22px !important;
    margin: 0px;"
                  >审核未通过</el-tag
                >
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核备注：" prop="remark">
              <template>
                {{ auditDetailsForm.remark }}
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核时间：" prop="time">
              <template>
                {{ auditDetailsForm.time }}
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核人：" prop="name">
              <template>
                {{ auditDetailsForm.name }}
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <house-modify
      ref="HouseModify"
      @changeShow="showHouseModify"
      :houseModifyShow="houseModifyShow"
    >
    </house-modify>
    <house-special
      ref="HouseSpecial"
      @changeShow="showHouseSpecial"
      :HouseSpecialShow="HouseSpecialShow"
    >
    </house-special>
  </div>
</template>

<script>
import { throttle } from "@/utils/hmt";
import { mapGetters } from "vuex";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import {
  selectHPOrderTaxationList,
  AuditDetails
} from "../../../../api/crm/privateLedger/realEstateAudit";
import HouseModify from "../../../components/HouseModify/index";
import HouseSpecial from "../../../components/HouseSpecial/index";
import { mapState } from "vuex";
export default {
  components: {
    HouseModify,
    HouseSpecial
  },
  data() {
    return {
      fileUrl: process.env.VUE_APP_FILE_API,
      total: 10,
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        status: '0',
        payUserName: "",
        reviewTime: "",
        createTime: ""
      },
      roles: [],
      auditStatusList: [], //审核状态
      loading: true, // 遮罩层
      showSearch: false, // 显示搜索条件
      areaOptions: regionData, //区域数据
      companyList: [],
      toAuditState: false, //待审核状态条件
      imgList: [], //付款截图
      supplementaryMaterials: false, //付款截图弹框
      houseModifyShow: false, //订单详情
      result: false, //订单审核详情弹出框
      auditDetailsForm: {}, //订单审核详情表单
      HouseSpecialShow: false, // 审核
      //单选框默认选项
      radio: "1"
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: state => state.user
    })
  },
  created() {
    this.roles = this.userInfo.roleCodes;
    this.getList();
    // 审核状态
    this.getDicts("audit_status").then(res => {
      this.auditStatusList = res.data;
    });
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
    getList() {
      this.loading = true;
      let queryParams = this.queryParams;
      queryParams.district =
        queryParams.district &&
        queryParams.district.length > 0 &&
        queryParams.district[0]
          ? queryParams.district
          : null;
      let data = JSON.parse(JSON.stringify(queryParams));
      data.status = data.status== "0" ? "" : data.status;
      selectHPOrderTaxationList(data).then(response => {
        this.companyList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    screenshot(row) {
      this.supplementaryMaterials = true;
      this.imgList = [];
      if (row.houproImgfileList != []) {
        row.houproImgfileList.forEach(item => {
          this.imgList.push(item.url);
        });
      }
    },
    //审核
    handleExamine(row) {
      row.details = 20;
      row.neizhang = "yes";
      if (row.type == "20") {
        this.HouseSpecialShow = true;
        this.$refs.HouseSpecial.echo(row);
      } else {
        this.houseModifyShow = true;
        this.$refs.HouseModify.echo(row);
      }
    },
    showHouseSpecial(data) {
      if (data === "false") {
        this.HouseSpecialShow = false;
      } else {
        this.HouseSpecialShow = true;
      }
    },
    showHouseModify(data) {
      if (data === "false") {
        this.houseModifyShow = false;
      } else {
        this.houseModifyShow = true;
      }
    },
    //查看详情
    viewDetails(row) {
      if (row.type == 20) {
        this.HouseSpecialShow = true;
        //10为查看详情
        row.details = 10;
        //内账查看详情
        row.secretLedger = 10;
        this.$refs.HouseSpecial.echo(row);
      } else {
        this.result = true;
        AuditDetails({ id: row.id, type: row.type }).then(response => {
          this.auditDetailsForm = response.data;
        });
      }
    },
    showHouseSpecial(data) {
      if (data === "false") {
        this.HouseSpecialShow = false;
      } else {
        this.HouseSpecialShow = true;
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
       this.resetForm("queryForm");
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        status: '0',
        payUserName: "",
        reviewTime: "",
        createTime: "",
        orderNo:""
      };
    },
    handleQuerys(e) {
      // this.showSearch = true
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.getList();
    },
    /** 筛选按钮操作 */
    handleQuery(e) {
      // this.showSearch = true
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
      this.getList();
    },
    cancel() {
      this.supplementaryMaterials = false;
    },
    // 地区
    handleRegionChange(value) {},
    // 多选框
    handleSelectionChange(selection) {
      // console.info(selection);
    },
    // 待审核状态弹窗
    toAudit() {
      this.toAuditState = true;
    }
  },

  //  审核状态字典
  auditStatusListDictionaries(row) {
    return this.selectDictLabel(this.auditStatusList, row.auditStatus);
  }
};
</script>

<style lang="scss" scoped>
.tettle-left {
  text-align: right;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #565759;
  line-height: 24px;
  white-space: nowrap;
}
.tettle-right {
  text-align: left;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #565759;
  line-height: 24px;
}
.billRecordinners {
  .el-dialog__body {
    height: 310px !important;
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
// 审核
.toExamine {
  // .el-dialog .el-dialog__body {
  //   height: 284px;
  //   overflow: auto;
  // }
  .auditDetailsForm {
    margin: 0px !important;
  }
  // .el-dialog .el-dialog__footer {
  //   padding: 15px 24px;
  // }
}
</style>
