<template>
  <div class="app-container application-approval">
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
              >
                <el-form-item label="创建时间">
                  <el-date-picker
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="完成时间">
                  <el-date-picker
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="截止时间">
                  <el-date-picker
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="所在地区">
                  <el-cascader
                    placeholder="请选择信息所在地区"
                    style="width: 100%"
                    size="small"
                    :options="areaOptions"
                    @change="handleRegionChange"
                  >
                  </el-cascader>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuery"
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
            placeholder="请输入客户简称或表编号或税号"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuery"
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
      <el-tabs v-model="queryParams.clientType" @tab-click="handleQuery">
        <el-tab-pane label="全部任务" value="全部任务" name=""></el-tab-pane>
        <el-tab-pane label="待审核订单" value="10" name="10"></el-tab-pane>
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
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="订单编号" align="center" prop="name" />
        <el-table-column label="客户名称" align="center" prop="clientName" />
        <el-table-column label="所属公司" align="center" prop="companyName" />
        <el-table-column label="申请人" align="center" />
        <el-table-column label="申请时间" align="center" />
        <el-table-column
          label="审核状态"
          align="center"
          prop="audit"
          :formatter="auditStatusListDictionaries"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.audit == 10" @click="toAudit">
              {{ TaskState(scope.row.audit) }}
            </el-tag>
            <el-tag type="success" v-if="scope.row.audit == 20">
              {{ TaskState(scope.row.audit) }}
            </el-tag>
            <el-tag type="danger" v-if="scope.row.audit == 30">
              {{ TaskState(scope.row.audit) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审核人" align="center" />
        <el-table-column
          label="操作"
          align="center"
          class-name="table-control"
          fixed="right"
          width="220"
        >
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="text" @click="handleExamine(scope.row)"
              >审核</el-button
            > -->
            <el-button size="mini" type="text">查看详情</el-button>
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
import { SpeciaOrder } from "../../../../api/crm/houseProperty/specialApproval";
export default {
  name: "applicationApproval",
  components: {
    HouseSpecial
  },
  data() {
    return {
      total: 10,
      queryParams: {
        pageNo: 1,
        pageSize: 10
      },
      auditStatusList: [], //审核状态
      loading: true, // 遮罩层
      showSearch: false, // 显示搜索条件
      areaOptions: regionData, //区域数据
      companyList: [],
      toAuditState: false, //待审核状态条件
      HouseSpecialShow: false // 审核
    };
  },
  computed: {
    ...mapGetters(["tableHeight"])
  },
  created() {
    this.getList();
    // 审核状态
    this.getDicts("audit_status").then(res => {
      this.auditStatusList = res.data;
    });
  },
  methods: {
    //字典
    //  审核状态字典
    auditStatusListDictionaries(row) {
      return this.selectDictLabel(this.auditStatusList, row.audit);
    },
    //审核状态
    TaskState(data) {
      if (data == 10) {
        return "待审核";
      } else if (data == 20) {
        return "审核通过";
      } else if (data == 30) {
        return "审核未通过";
      } else if (data == 40) {
        return "";
      }
    },

    getList() {
      this.loading = true;
      let queryParams = this.queryParams;
      let data = JSON.parse(JSON.stringify(queryParams));
      data.clientType = data.clientType == "0" ? "" : data.clientType;
      SpeciaOrder(data).then(response => {
        this.companyList = response.data.rows;
      });
    },
    //审核
    handleExamine(row) {
      this.HouseSpecialShow = true;
      // this.$refs.HouseSpecial.echo(row);
    },
    showHouseSpecial(data) {
      if (data === "false") {
        this.HouseSpecialShow = false;
      } else {
        this.HouseSpecialShow = true;
      }
    },
    /** 重置按钮操作 */
    resetQuery() {},
    /** 筛选按钮操作 */
    handleQuery: throttle(function(e) {
      // this.showSearch = true
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
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
</style>
