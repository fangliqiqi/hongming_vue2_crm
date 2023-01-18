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
                  <el-select
                    v-model="queryParams.churnReason"
                    placeholder="请选择流失原因"
                  >
                    <el-option
                      v-for="item in reasonsList"
                      :label="item.dictLabel"
                      :key="item.dictCode"
                      :value="item.dictCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="提交人"
                  prop="churnApplicant"
                  v-if="roles.indexOf('accountExecutive') == -1"
                >
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
                    v-model="enteringTime"
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
      <el-tabs v-model="queryParams.churnType" @tab-click="handleQuerys">
        <el-tab-pane label="回收站"  name="20" value='20'></el-tab-pane>
        <!-- <el-tab-pane label="全部客户" value="0" name=""></el-tab-pane> -->
        <!-- <el-tab-pane
          v-for="(item, index) in clientTypeList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
          v-if="index >= 1 && index <= 2"
        ></el-tab-pane> -->
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
        :data="runList"
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
              {{ clientState(scope.row.delSwitch) }}
            </el-tag>
            <el-tag type="danger" v-if="scope.row.delSwitch == 40">
              {{ clientState(scope.row.delSwitch) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="删除人" align="left" prop="churnApplicant" />
        <el-table-column
          label="流失原因"
          align="left"
          prop="churnReason"
          :formatter="reasonsListFormat"
        />
        <el-table-column label="审核状态" align="left" prop="churnType">
          <template slot-scope="scope">
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
        <el-table-column label="审核人" align="left" prop="churnReviewer" />
        <el-table-column
          label="操作"
          align="left"
          class-name="small-padding fixed-width"
          min-width="110"
        >
          <template slot-scope="scope">
            <div style="display:flex;" v-if="scope.row.churnType == 10">
              <el-button
                size="mini"
                type="text"
                @click="orderAuditUp(scope.row.id)"
                >查看详情</el-button
              >
            </div>

            <div style="display:flex;" v-else-if="scope.row.churnType == 20">
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                @click="orderAuditUp(scope.row.id)"
                >查看详情</el-button
              >
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                class="recover"
                @click="recover(scope.row)"
                >恢复正常</el-button
              >
            </div>
            <div style="display:flex;" v-else-if="scope.row.churnType == 30">
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                @click="orderAuditUp(scope.row.id)"
                >查看详情</el-button
              >
            </div>
            <div style="display:flex;" v-else>
              <el-button
                size="mini"
                type="text"
                v-hasPermi="['crm:userlabel:edit']"
                @click="offAuditUp(scope.row)"
                >流失申请</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="left"
          class-name="table-control"
          fixed="right"
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
    <!-- 流失申请 -->
    <el-dialog
      title="流失申请"
      :visible.sync="openOffAudit"
      width="704px"
      append-to-body
      class="addCustomer businiss offApply"
    >
      <el-form
        ref="lossFrom"
        label-position="labelPosition"
        class="chengjiao"
        :rules="lossRules"
        :model="lossFrom"
      >
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="12">
            <el-form-item label="流失客户" prop="companyName">
              <el-input
                :readonly="true"
                placeholder="请输入客户名称"
                v-model="lossFrom.companyName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流失原因" prop="churnReason">
              <el-select
                v-model="lossFrom.churnReason"
                placeholder="请选择流失原因"
              >
                <el-option
                  v-for="item in reasonsList"
                  :label="item.dictLabel"
                  :key="item.dictCode"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="原因说明" class="tax" prop="churnDescription">
              <el-input
                type="textarea"
                style="width: 100%;height: 98px;"
                placeholder="请输入流失原因说明"
                v-model="lossFrom.churnDescription"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer bottom">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">提交申请</el-button>
      </div>
    </el-dialog>
    <!-- 查看详情 -->
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
              <span class="price">{{ companyList.churnReason }}</span>
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
        <el-row :gutter="0">
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
  runApplyList,
  runParticulars,
  runApply,
  runRecover //流失恢复
} from "@/api/crm/runApplyRecover/runApplyRecover";
import { throttle } from "@/utils/hmt";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      // ruleForm: { client: null, churnReason: null, churnDescription: null },
      roles: [],
      total: 0,
      radio: "1",
      showSearch: false, // 显示搜索条件
      churnTypeList: [
        { dictCode: 10, dictName: "正常" },
        { dictCode: 40, dictName: "流失" }
      ], //流失申请审核状态
      lossFrom: {},
      clientTypeCut:'',//切换状态值
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        delSwitch: null,
        id: null,
        churnReason: null, //流失原因
        churnApplicant: null, //提交人
        delSwitch: null, //审核状态
        applicationStart: "", //申请开始时间
        applicationEnd: "", //申请结束时间
        approveStart: "", //审核开始时间
        approveEnd: "", //审核结束时间
        churnType:'20'
        // clientType:"20"
      },
      enteringTime: null, //申请时间
      approveTimeList: null, //审核时间
      openApply: false, //申请弹出层
      clientType: [], //审核状态字典
      // sourceTypeLvList: [{ dictName: "审核通过" }, { dictName: "审核未通过" }], //客户类型字典
      delSwitchList: [], //客户状态
      name: "张三",
      bankList: [
        {
          delSwitch: "合肥市",
          taskType: "代理记账",
          lv: "操作",
          name: "张云雷"
        },
        {
          delSwitch: "合肥市",
          taskType: "代理记账",
          lv: "操作",
          name: "张云雷"
        }
      ],

      runList: [],
      //流失申请表单验证
      lossRules: {
        churnReason: [
          {
            required: true,
            message: "流失原因不能为空",
            trigger: "blur"
          }
        ],
        churnDescription: [
          {
            required: true,
            message: "流失原因说明不能为空",
            trigger: "blur"
          }
        ]
      },
      UprunApplyFrom: {}, //流失申请
      reasonsList: [], //流失原因
      companyList: {}, //查看详情
      contractForm: [{ signingDate: 11 }], //申请时间
      clientTypeList: [], //客户类型字典
      opinion: "汪汪队", //客户名称
      openOffAudit: false, //流失审核弹出层
      openOrderAudit: false, //订单审弹出层
      form: {} //查看详情参数
    };
  },
  created() {
    this.getList();
    this.roles = this.userInfo.roleCodes;
    this.getDicts("del_switch").then(res => {
      this.delSwitchList = res.data;
    });
    // clientTypeList
    this.getDicts("auditor_state").then(res => {
      this.clientTypeList = res.data;
    });
    //流失原因
    this.getDicts("reasons_for_loss").then(res => {
      this.reasonsList = res.data;
    });
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
    //表单重置
    reset() {
      this.form = {};
    },
    followReset() {
      this.UprunApplyFrom = {
        imageIds: null, //上传附件
        nextContent: null,
        nextDate: null,
        tempTime: null,
        nextFollowTime: null,
        type: null
      };
      this.$refs.upload.clearFiles();
      this.resetForm("followForm");
    },
    //字典
    //客户字典状态
    delSwitchFormat(row) {
      return this.selectDictLabel(this.delSwitchList, row.delSwitch);
    },
    //审核状态
    auditFormat(row) {
      return this.selectDictLabel(this.clientTypeList, row.churnType);
    },
    //客户状态
    clientState(data) {
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
      } else {
        return "审核中1";
      }
    },

    /** 导出按钮操作 */
    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.$confirm("是否确认导出所有公司银行开户信息数据项?", "警告", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(function() {
    //       window.location.href =
    //         process.env.VUE_APP_CRM_API +
    //         "/hmkj-crm/resoBusinessOpportunity/excelTemplate";
    //     })
    //     .catch(function() {});
    // },
    handleTableQuerys(e) {
      this.queryParams.applicationEnd = "";
      this.queryParams.applicationStart = "";
      this.queryParams.approveStart = "";
      this.queryParams.approveEnd = "";
      this.queryParams.churnReason = "";
      this.queryParams.churnApplicant = "";
      this.queryParams.delSwitch='';
       this.enteringTime = [];
      this.approveTimeList = [];
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      // this.queryParams.pageNum = 1;
      this.getList();
      // this.enteringTime = null;
      // this.approveTimeList = null;
    },
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      if (this.enteringTime) {
        if (this.enteringTime.length > 0) {
          this.queryParams.applicationStart =
            this.enteringTime[0] + " 00:00:00";
          this.queryParams.applicationEnd = this.enteringTime[1] + " 23:59:59";
        } else {
          this.queryParams.applicationEnd = "";
          this.queryParams.applicationStart = "";
        }
      } else {
        this.queryParams.applicationEnd = "";
        this.queryParams.applicationStart = "";
      }
      if (this.approveTimeList) {
        if (this.approveTimeList.length > 0) {
          this.queryParams.approveStart = this.approveTimeList[0] + " 00:00:00";
          this.queryParams.approveEnd = this.approveTimeList[1] + " 23:59:59";
        } else {
          this.queryParams.approveStart = "";
          this.queryParams.approveEnd = "";
        }
      } else {
        this.queryParams.approveStart = "";
        this.queryParams.approveEnd = "";
      }
      this.queryParams.pageNo = 1;
      // this.queryParams.pageNum = 1;
      this.getList();
      // this.enteringTime = null;
      // this.approveTimeList = null;
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.resetQuery();
      // this.queryParams.clientType=this.clientTypeCut
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.$refs.queryForm.resetFields();
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        delSwitch: null,
        id: null,
        churnReason: null, //流失原因
        churnApplicant: null, //提交人
        delSwitch: null, //审核状态
        // clientType:"20",
        churnType:'20',
        applicationStart: "", //申请开始时间
        applicationEnd: "", //申请结束时间
        approveStart: "", //审核开始时间
        approveEnd: "" //审核结束时间
      };
      this.enteringTime = [];
      this.approveTimeList = [];
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
    /** 查询客户信息列表 */
    getList() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      runApplyList(data).then(response => {
        this.runList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },

    // 流失申请
    offAuditUp(row) {
      console.log(row)
      this.reset();
      this.openOffAudit = true;
      this.title = "流失申请";
      this.lossFrom = {
        companyName: row.companyName,
        id: row.id,
        churnReason: "",
        churnDescription: ""
      };
      // this.lossFrom.companyName = row.companyName;
      // this.lossFrom.id = row.id;
      this.queryParams.id = row.id;
      this.queryParams.delSwitch = row.delSwitch;
    },
    // 查看详情

    orderAuditUp(id) {
      this.reset();
      this.openOrderAudit = true;
      this.title = "查看详情";
      //
      let data = JSON.parse(JSON.stringify(id));
      runParticulars({ id: data }).then(response => {
        this.companyList = response.data;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.showSearch = false; //筛选取消按钮
      this.resetForm("queryForm");
      this.openCustomer = false; //新建客户取消按钮
      this.openOffAudit = false; //流失审核取消按钮
      this.openApply = false; //申请取消按钮
      this.dialogVisible = false;
      this.renewals = false;
      //   this.enteringTime = null;
      // this.approveTimeList = null;
    },
    // 申请提交按钮
    submitForm() {
      delete this.lossFrom.companyName;
      this.$refs["lossFrom"].validate(valid => {
        if (valid) {
          runApply(this.lossFrom).then(response => {
            this.openOffAudit = false;
            this.getList();
          });
        }
      });
    },
    //恢复
    recover(row) {
      this.getList(),
        runRecover({ companyId: row.id }).then(response => {
          this.getList();
        });
    },
    //流失原因
    reasonsListFormat(row) {
      return this.selectDictLabel(this.reasonsList, row.churnReason);
    }
  },

  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: state => state.user
    })
  }
};
</script>

<style lang="scss">
.table-data {
  .el-table {
    .fixed-width {
      .recover {
        color: #2dd199;
      }
    }
  }
}
.apply {
  .box {
    height: 612px;
    overflow-y: scroll;
    overflow: auto;
  }
  .box::-webkit-scrollbar {
    display: none;
  }
  .el-dialog {
    background: #f5f6f8;
    .el-dialog__body .el-form {
      background: #ffffff;
      margin: 0px;
      margin-bottom: 20px;
      padding-top: 25px;
      padding-left: 32px;
      padding-right: 32px;
      padding-bottom: 14px;
      .el-input {
        width: 100%;
      }
      .el-select {
        width: 100%;
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
.offApply {
  .el-dialog {
    height: 662px;
    .el-dialog__body {
      .el-form {
        .el-input {
          width: 100%;
        }
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .el-textarea__inner {
    height: 100%;
  }
  .bottom {
    position: absolute;
    bottom: 16px;
    right: 24px;
  }
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
