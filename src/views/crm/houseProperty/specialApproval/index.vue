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
                :visible.sync="showSearch"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
                :model="queryParams"
              >
                <el-form-item label="申请时间:" prop="createDate">
                   <el-date-picker
                    v-model="createDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="申请人:" prop="createBy">
                  <el-input
                    placeholder="请输入申请人"
                    v-model="queryParams.createBy"
                  ></el-input>
                </el-form-item>

                <el-form-item label="审核状态:" prop="clientType">
                  <template>
                    <el-radio v-model="queryParams.clientType" label="5"
                      >待审核</el-radio
                    >
                    <el-radio v-model="queryParams.clientType" label="20"
                      >审核成功</el-radio
                    >
                    <el-radio v-model="queryParams.clientType" label="30"
                      >审核失败</el-radio
                    >
                  </template>
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
            v-model="queryParams.keyword"
            placeholder="请输入所属公司"
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
      <el-tabs v-model="queryParams.clientType" @tab-click="handleQuerys">
        <el-tab-pane label="全部任务" value="全部任务" name=""></el-tab-pane>
        <el-tab-pane label="待审核订单" value="5" name="5"></el-tab-pane>
        <!-- <el-tab-pane label="审核中" value="10" name="10"></el-tab-pane> -->
        <el-tab-pane label="审核通过" value="20" name="20"></el-tab-pane>
        <el-tab-pane label="审核未通过" value="30" name="30"></el-tab-pane>
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
        <el-table-column label="申请人" align="left" prop="proposer" />
        <el-table-column label="申请时间" align="left" prop="applyTime" />
        <el-table-column
          label="审核状态"
          align="left"
          prop="auditStatusSalesman"
          v-if="roles.indexOf('salesmanEstate') != -1"
        >
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.auditStatusSalesman == 5">
              待审核
            </el-tag>
            <el-tag v-if="scope.row.auditStatusSalesman == 10" @click="toAudit">
              审核中
            </el-tag>
            <el-tag type="success" v-if="scope.row.auditStatusSalesman == 20">
              审核通过
            </el-tag>
            <el-tag type="danger" v-if="scope.row.auditStatusSalesman == 30">
              审核未通过
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          label="审核状态"
          align="left"
          prop="auditStatus"
        >
          <template slot-scope="scope">
            <el-tag
              type="warning"
              v-if="scope.row.auditStatus == 10 || scope.row.auditStatus == ''"
              @click="toAudit"
            >
              待审核
            </el-tag>
            <el-tag v-if="scope.row.auditStatus == 20">
              审核通过
            </el-tag>
            <el-tag type="danger" v-if="scope.row.auditStatus == 30">
              审核未通过
            </el-tag>
          </template>
        </el-table-column>

        <!-- <el-table-column label="审核人" align="center" /> -->
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
              v-if="
                (roles.indexOf('salesmanSupervisorEstate') !== -1 &&
                  (scope.row.auditStatus == 10 ||
                    scope.row.auditStatus == '')) ||
                  (roles.indexOf('boss') !== -1 &&
                    (scope.row.auditStatus == 10 ||
                      scope.row.auditStatus == '')) ||
                  (roles.indexOf('bossManager') !== -1 &&
                    (scope.row.auditStatus == 10 ||
                      scope.row.auditStatus == ''))
              "
              >审核</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="scope.row.auditStatus == 20 || scope.row.auditStatus == 30"
              @click="handleViewDetails(scope.row)"
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
import HouseSpecial from "../../../components/HouseSpecial/index";
import {
  SpeciaOrder,
  SupervisorAuditEcho
} from "../../../../api/crm/houseProperty/specialApproval";
import { mapState } from "vuex";
export default {
  name: "specialApproval",
  components: {
    HouseSpecial
  },
  data() {
    return {
      total: 10,
      createDate:[],//筛选申请时间
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        appId: "",
        beginTime:'',
        endTime :'',
        clientType:'0',
        keyword:'',
      },
      auditStatusList: [], //审核状态
      loading: true, // 遮罩层
      showSearch: false, // 显示搜索条件
      areaOptions: regionData, //区域数据
      companyList: [],
      toAuditState: false, //待审核状态条件
      HouseSpecialShow: false, // 审核
      roles: [] //角色
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
    this.queryParams.appId = this.$store.getters.appId + "";
  },
   beforeRouteEnter(to, from, next){
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    getList() {
      this.loading = true;
      let queryParams = this.queryParams;
      let data = JSON.parse(JSON.stringify(queryParams));
      data.clientType = data.clientType == "0" ? "" : data.clientType;
      SpeciaOrder(data)
        .then(response => {
          this.companyList = response.data.rows;
      
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //审核
    handleExamine(row) {
      this.HouseSpecialShow = true;
      row.details = 20;
      this.$refs.HouseSpecial.echo(row);
    },
    //查看详情
    handleViewDetails(row) {
      this.HouseSpecialShow = true;
      row.details = 10;
      this.$refs.HouseSpecial.echo(row);
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
this.queryParams={
        pageNo: 1,
        pageSize: 10,
        appId: "",
        beginTime:'',
        endTime :'',
        clientType: '0',
        keyword:'',
      };
      this.createDate=[]
    },
    /** 筛选按钮操作 */
    handleQuerys: throttle(function(e) {
      // this.showSearch = true
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
      if(this.createDate){
          if (this.createDate.length !== 0) {
          this.queryParams.beginTime = this.createDate[0]+ " 00:00:00";
          this.queryParams.endTime = this.createDate[1]+ " 23:59:59";
        }else{
          this.queryParams.beginTime ='';
this.queryParams.endTime = '';
        }
      }else{
          this.queryParams.beginTime ='';
this.queryParams.endTime = '';
        }
       this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.getList();
    }),
    /** 筛选按钮操作 */
    handleQuery: throttle(function(e) {
      // this.showSearch = true
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
      this.resetQuery()
      this.getList();
    }),
    // 地区
    handleRegionChange(value) {},
    // 多选框
    handleSelectionChange(selection) {
      // console.info(selection);
    },
    // 待审核状态弹窗
    toAudit() {
      this.toAuditState = true;
    },
    //  审核状态字典
    auditStatusListDictionaries(row) {
      return this.selectDictLabel(this.auditStatusList, row.audit);
    }
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

.special-approval {
}
</style>
