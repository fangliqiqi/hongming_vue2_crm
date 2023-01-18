<template>
  <div class="HouseSpecial">
    <!-- 特殊审批 -->
    <el-dialog
      width="516px"
      title="特殊审批"
      @close="handleClose"
      :visible.sync="showDialog"
    >
      <div class="step-vi">
        <!-- :step-list="[{name:'<span v-for="item instepList">{{item}}+"审批"</span>'}
            { name: '<span>创建<br/>审批</span>' },
            { name: '<span>主管/经理<br/>审核</span>' },
            { name: '<span>总经理<br/>审批</span>' },
            { name: '<span>财务<br/>审批</span>' }
          ]" -->
        <steper :step-list="stepList" :active="stepStatus"></steper>
      </div>
      <div class="special">
        <el-form
          :inline="true"
          class="specialForm"
          :model="form"
          ref="specialForm"
          :rules="specialRules"
          :label-position="labelPosition"
        >
          <el-row class="child">
            <el-col :span="24">
              <el-form-item label="申请理由:" prop="reason">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  placeholder="请输入申请理由"
                  v-model="form.reason"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="申请人:"  prop="applicant" class="applicant">
                <el-input v-model="form.applicant"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-table :data="companyList" class="companyList">
                <el-table-column label="审核人" align="left">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.auditName != ''"
                    m
                  >
                    {{ scope.row.templateName + "-" + scope.row.auditName }}
                  </template>
                </el-table-column>
                <el-table-column label="审核意见" align="left" prop="status">
                  <template slot-scope="scope">
                    <el-tag
                      style="height: 22px !important;line-height: 22px !important;
    margin: 0px;"
                      v-if="scope.row.status == 20"
                    >
                      审核通过
                    </el-tag>
                    <el-tag
                      type="danger"
                      style="height: 22px !important;line-height: 22px !important;
    margin: 0px;"
                      v-if="scope.row.status == 30"
                    >
                      审核未通过
                    </el-tag>
                    <span style="margin-left:15px">{{ scope.row.reason }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row v-if="details == 20">
            <el-col :span="24">
              <!-- <el-divider></el-divider> -->
              <div class="Tips">
                <i class="el-icon-warning" style="color:#F3A35F"> </i
                >点击不通过，必须填写备注，否则无法确认审核！
              </div>
            </el-col>

            <el-col :span="24">
              <el-form-item label="审核意见" prop="status">
                <el-radio-group v-model="form.status" style="width:200px">
                  <el-radio
                    v-for="item in statusList"
                    :key="item.dictName"
                    :label="item.dictCode" 
                    >{{ item.dictName }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="审核备注" prop="remark">
                <el-input
                  style="width:330px"
                  type="textarea"
                  :autosize="{ minRows: 5 }"
                  placeholder="请输入审核备注"
                  v-model="form.remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="footer">
         <el-button type="primary" @click="showDialog = false" v-if="details==10"
          >确认</el-button
        >
        <el-button @click="showDialog = false"  v-if="details==20">取 消</el-button>
        <el-button type="primary" @click="ConfirmationAudit" v-if="details==20"
          >确认审核</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  SupervisorAuditEcho,
  SupervisorAuditSubmission
} from "../../../api/crm/HouseSpecial/index";
import { AuditDetails,auditToExamine } from "../../../api/crm/privateLedger/realEstateAudit";
export default {
  name: "HouseSpecial",
  props: {
    HouseSpecialShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkRemark = (rule, value, callback) => {
      // console.info(arguments);
      if (value === "" && this.form.status == 30) {
        callback(new Error("请输入审核备注"));
      } else {
        if (this.form.remark !== "") {
          this.$refs.specialForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      type:null,
      roles: [],
      houseId: null,
      form: {},
      neizhang:'',
      details: null,
      //审核步骤
      stepList: [],
      stepStatus: null,
      //特殊审批表格
      companyList: [],
      //表单标题对齐方式
      labelPosition: "right",
      // 步骤条
      active: 1,
      //审批弹出框
      showDialog: false,
      //审核意见
      statusList: [],
      //订单审核校验
      specialRules: {
        status:[
           { required: true, message: '请选择审核意见', trigger: 'change' }
        ],
        remark: [{ validator: checkRemark, trigger: "blur" }]
      }
    };
  },
  watch: {
    HouseSpecialShow(oldVal, newVal) {
      this.showDialog = this.HouseSpecialShow;
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user
    })
  },
  created() {
    this.roles = this.userInfo.name;
    //订单审核结果
    this.getDicts("order_review_results").then(res => {
      this.statusList = res.data;
    });
  },
  methods: {
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("changeShow", "false");
    },
    //审核回显
    echo(row) {
      this.houseId = row.id;
      this.type = row.type
      this.stepList = [{ name: "创建审批" }];
      this.details = row.details;
      this.neizhang = row.neizhang ||''
      this.companyList = [];
      if(row.secretLedger==10){
          AuditDetails({ id: row.id, type: row.type }).then(response => {
            this.form = response.data;
        response.data.flow.forEach((item, i) => {
          let arr = {};
          arr.name = item.templateName + "审批";
          this.stepList.push(arr);
          this.companyList.push(item);
          if(item.status!=''){
           this.stepStatus = i + 1; 
          }
         else if (item.lightUp ==1) {
            this.stepStatus = i + 1;
          }
        });
        })
      }else{
      
      SupervisorAuditEcho({ id: row.id }).then(response => {
        this.form = response.data;
        response.data.flow.forEach((item, i) => {
          let arr = {};
          arr.name = item.templateName + "审批";
          this.stepList.push(arr);
          this.companyList.push(item);
          if(item.status!=''){
           this.stepStatus = i + 1; 
          }
         else if (item.lightUp ==1) {
            this.stepStatus = i + 1;
          }
        });
      });
}
    },

    //查看审核详情
    Auditdetails(row) {
      this.stepList = [{ name: "创建审批" }];
      this.companyList = [];
      AuditDetails({ id: row.id, type: row.type }).then(response => {
        this.form = response.data;
        response.data.flow.forEach(item => {
          let arr = {};
          arr.name = item.templateName + "审批";
          this.stepList.push(arr);
          this.companyList.push(item);
        });
      });
    },
    //主管提交审核
    ConfirmationAudit() {
      this.$refs["specialForm"].validate(valid => {
          if (valid) {
            if(this.neizhang=='yes'){
  auditToExamine({
             id: this.houseId,
        remark: this.form.remark,
        status: this.form.status,
        type:this.type
          }).then(response => {
            this.showDialog = false;
            this.$parent.getList();
          });
            }else{
                SupervisorAuditSubmission({
        id: this.houseId,
        remark: this.form.remark,
        status: this.form.status,
        type:this.type
      }).then(item => {
        this.showDialog = false;
        this.$parent.getList();
      });
            }
    
      }
      })
    },
    //  审核状态字典
    auditStatusListDictionaries(row) {
      return this.selectDictLabel(this.auditStatusList, row.audit);
    }
  }
};
</script>
<style lang="scss" scoped>
.step_vi {
  padding: 0px !important;
}
</style>
<style lang="scss">
.HouseSpecial {
  .Tips {
    border: 1px solid #faeee1;
    padding-left: 16px;
    height: 34px;
    line-height: 34px;
    border-radius: 2px;
    background: #fdf6f0;
    margin-bottom: 12px;
    margin-top: 20px;
  }
  .child {
    background: #f5f6f8;
    padding: 30px 30px 30px 32px;

    .el-form-item__label {
      color: #a1a2a6 !important;
      padding-right: 0px !important;
      width: 66px;
    }
    .el-textarea__inner {
      border: transparent;
    }
    .el-input__inner,
    .el-textarea__inner {
      background: transparent;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
  }
  .companyList {
    .el-table__header-wrapper th,
    .el-table__fixed-header-wrapper th {
      background: #e8eaed !important;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #6e7073;
    }
    .el-table__empty-block {
      background: #f5f6f8;
    }
  }
  .special {
    margin-top: 20px;
    // border-top: 1px solid #ccc;
    padding-top: 25px;
    .el-form {
      margin-left: 0px !important;
      margin-right: 0px !important;
      .el-form-item__content {
        width: 330px;
      }
    }
    .applicant {
      .el-form-item__content {
        width: 220px;
        .el-input__inner {
          border: 0px;
        }
      }
    }
  }
  .steps {
    width: 510px;
    margin: auto;
    .el-step__line {
      margin-right: 4px;
      margin-left: 65px;
      width: 48px;
    }
    .el-step__head .is-finish {
      .el-step__icon.is-text {
        background-color: #4977e0 !important;
        color: #fff !important;
      }
      .el-step__title {
        color: #4977e0 !important;
      }
    }
    .el-step__head.is-wait {
      .el-step__icon.is-text {
        background-color: #e6e7eb;
        color: #fff;
      }
      .el-step__title {
        color: #565759 !important;
      }
    }
    .el-steps {
      display: flex;
      :nth-child(1) {
        flex-basis: 0px !important;
        flex: 2;
        .el-step__main {
          width: 30px;
        }
      }
      :nth-child(2) {
        flex-basis: 0 !important;
        flex: 2.8;
        .el-step__main {
          width: 64px;
        }
        .el-step__line {
          margin-left: 98px;
        }
      }
      :nth-child(3) {
        flex-basis: 0 !important;
        flex: 2.5;
        .el-step__main {
          width: 43px;
        }
        .el-step__line {
          margin-left: 80px;
        }
      }
      :nth-child(4) {
        flex-basis: 0 !important;
        flex: 2;
        .el-step__main {
          width: 30px;
        }
      }
      .el-step__icon.is-text {
        border: 1px solid;
      }

      .el-step__main {
        position: absolute;
        top: 0px;
        left: 30px;
        .el-step__title {
          font-size: 14px;
          line-height: 17px;
          color: #565759;
        }
      }
      .el-step .is-horizontal {
        :nth-child(4) {
          flex-basis: 0px !important;
        }
      }
    }
  }
}
</style>
