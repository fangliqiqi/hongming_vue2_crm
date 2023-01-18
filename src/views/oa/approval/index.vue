<script>

import { getTree, getList } from '@/api/oa/organization'
import * as api from '@/api/oa/approval/approval'


export default {
  components: { },
  props: {},
  data() {
    let _this = this; //在return 中使用this 必须前面先转换一下
    return {
      pickerMinDate:'',
      pickerMaxDate:'',
      dateRange:[],// 添加日期
      // 日期快捷选项
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          if(minDate){
            // console.log('开始日期')
              _this.pickerMinDate = minDate.getTime()
            }
          if (maxDate) {
            // console.log('结束日期')
             _this.pickerMinDate = ''
             _this.pickerMaxDate =  maxDate.getTime()
          }
        },
        disabledDate(time) {
           //限制31天之内  选择 同时不能是同一天
         if ( _this.pickerMinDate !== '') {
               const day30 = (31 - 1) * 24 * 3600 * 1000
               let maxTime = _this.pickerMinDate+ day30
               let minTime =  _this.pickerMinDate - day30;
               if (maxTime > new Date()) {
                 maxTime = new Date()
               }
               return time.getTime() > maxTime||time.getTime() < minTime||time.getTime()==_this.pickerMinDate
             }
          return time.getTime() > Date.now();    //只能选择今天之前的时间
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      year:new Date().getFullYear(),
      month:new Date().getMonth()+1,
      end:new Date(new Date().getFullYear(), new Date().getMonth() + 1,0).getDate(),
      queryForm:{
        cursor:0,
        size: 10,
        startTime: "" ,
        endTime:"",
        sp_status:'',//审批状态
        department:'',//部门
        creator:'',//申请人
        template_id:'',//审批模板id
      },
      loading: false,
      seachLoading:false,
      total: 0,
      approvalList: [], // 审批列表
      treeData:[],//部门信息
      approvalStatus:[],
      userid:'',
      useridlist:[],
      olduserList:[],
      spVisible:false,
      spTitle:null,
      spRecordList:[],//审批流程
      notifyerList:null,//抄送人id
      applyData:[],//审批申请数据
      comments:null	,//审批申请备注信息
      template:null,//审批模板信息
      templateTitle:null,
      templateVisible:false
    };
  },
  watch: {},
  computed: {},
  created() {

    this.getTree()
    this.getList()
    // 字典
    this.getDicts("oa_approval_status").then(res => {
      this.approvalStatus = res.data;
    })
  },
  methods: {
    //获取部门信息
    getTree(){
      getTree().then(res=>{
        this.treeData = res.data.filter(items=>items.id!=1)
      })
    },
    // 字典翻译
    approvalStatusFormat(row) {
      return this.selectDictLabel(this.approvalStatus, row.info.sp_status);
    },

    //根据部门获取人员
    getUsers(data){
      getList({department:data}).then(res=>{
        if(res.rows.length>0){
          this.useridlist = res.rows
          this.olduserList = res.rows
        }else{
          this.useridlist = []
        }
      })
    },
    // 部门搜索
    remoteMethodt(query) {
      let that = this;
      if (query !== '') {
        // this.seachLoading = true;
        setTimeout(() => {
          // this.seachLoading = false;
          api.getdeptName({deptName:query}).then((res)=>{
            // console.log(res)
            if(res.code==200){
              this.treeData = res.data||[];
            }
          }).catch((err)=>{

          })
        }, 200);
      } else {
         this.getTree()
      }
    },
    // 选择部门
    handleChange(value){
      //选择部门同时清空考勤人员的内容
      if(this.queryForm.creator){
        this.queryForm.creator = null
      }
      this.getUsers(value)
    },
    // 考勤人员搜索
    remoteMethods(query){
      let that = this;
      // console.log(query)
      if (query !== '') {
        // this.seachLoading = true;
        setTimeout(() => {
          // this.seachLoading = false;
          api.getuserId({deptId:this.queryForm.department,name:query}).then((res)=>{
            if(res.code==200){
              this.useridlist = res.rows||[];
            }
          }).catch((err)=>{

          })
        }, 200);
      } else {
        this.getUsers(this.queryForm.department)
      }
    },
    // 获取审批列表信息
     getList(){
       if (this.dateRange[0]) {
         this.queryForm.startTime = this.dateRange[0];
         this.queryForm.endTime = this.dateRange[1];
       } else {
         this.queryForm.endTime = this.year+'-'+this.month +'-'+this.end
         this.queryForm.startTime = this.year+'-'+this.month +'-'+ '01'
       }
      //  console.log(this.queryForm)
         this.loading = true;
         api.getList(this.queryForm).then(res=>{
            this.approvalList = res.data.data
            this.total = res.data.total||0
            this.loading = false
         }).catch(req=>{
           this.loading = false
           this.total = 0
           this.approvalList = []
         })
     },

    // 重置
    resetForm(){
      this.dateRange = [];
      this.$refs["queryForm"].resetFields();
      this.queryForm = {
       cursor: 1,
       size: 10,
       startTime: "" ,
       endTime:"",
       sp_status:'',
       department:'',
       creator:'',
       template_id:''
      }
      this.getList()
     },

     // 点击查看审批流程
     Lookapplyer(row){
      //  console.log(row)
       row.info.sp_record.map(items=>{
         if(items.sp_status==1){
           items.status='审批中'
         }else if(items.sp_status==2){
           items.status='已同意'
         }else if(items.sp_status==3){
           items.status='已驳回'
         }else if(items.sp_status==4){
           items.status='已转审'
         }else if(items.sp_status==11){
           items.status='已退回'
         }
       })
       this.spRecordList = row.info.sp_record
       if(row.info.notifyer.length>0){
         this.notifyerList = row.info.notifyer.map(items=>{
          return items.userid
        }).join(',')
       }
       this.applyData = row.info.apply_data.contents
       this.comments = row.info.comments
       this.spVisible = true
       this.spTitle = row.info.applyer.userid +'的'+row.info.sp_name+'请假审批'
     },
     // 查看模板信息
     LookTemplate(row){
      api.getTemplate(row.info.template_id).then(res=>{
        this.templateTitle= res.data.template_names[0].text
        this.templateVisible = true;
        this.template = res.data.template_content.controls
      })
     }
  }
};
</script>

<template>
  <div class="page app-container">
    <el-form
      ref="queryForm"
      :inline="true"
      :model="queryForm"
      label-width="100px"
      class="top-search"
      size="small"
    >
      <el-form-item label="审批部门" prop="department" >
        <el-select
          v-model="queryForm.department"
          filterable
          remote
          clearable
          style="width:200px"
          reserve-keyword
          placeholder="请输入审批部门"
          :remote-method="remoteMethodt"
          @change="handleChange"
          >
          <el-option
            v-for="item in treeData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批提交人员" prop="userId">
        <el-select
          :disabled="!queryForm.department"
          v-model="queryForm.creator"
          filterable
          remote
          clearable
          style="width:200px"
          reserve-keyword
          placeholder="请选择审批提交人员"
          :remote-method="remoteMethods"
          >
          <el-option
            v-for="item in useridlist"
            :key="item.userId"
            :label="item.name"
            :value="item.userId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批日期">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="审批状态" prop="opencheckindatatype">
        <el-select v-model="queryForm.opencheckindatatype" clearable placeholder="请选择审批状态">
            <el-option
              v-for="item in approvalStatus"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button
          type="primary"
          @click="getList"
          >查询</el-button
        >
        <el-button
          type="info"
          @click="resetForm()"
          >重置</el-button
        >
        <!-- <el-button
          v-hasPermi="['customerManage:customer:export']"
          type="cyan"
          @click="exportCustomer"
          >导出列表</el-button
        > -->
      </el-form-item>
    </el-form>

   <el-table
      ref="multipleTable"
      :data="approvalList"
      tooltip-effect="dark"
      style="width:100%;"
      v-loading="loading"
    >
      <el-table-column  prop="info.sp_no" label="审批编号"  align="center"></el-table-column>
      <el-table-column prop="info.sp_name" label="审批名称" align="center"></el-table-column>
      <el-table-column prop="info.sp_status" label="审批状态" align="center" :formatter="approvalStatusFormat"></el-table-column>
      <el-table-column prop="info.applyer.userid" label="申请人userid" align="center"></el-table-column>
      <el-table-column prop="info.applyer.partyid" label="申请人所在部门id" align="center"></el-table-column>
      <el-table-column prop="info.template_id" label="模板id" align="center"></el-table-column>
      <el-table-column  label="审批流程" align="center">
        <template slot-scope='scope'>
          <el-button
            type="text"
            @click="Lookapplyer(scope.row)"
          >查看审批流程
          </el-button>
        </template>
      </el-table-column>
      <el-table-column  label="模板信息" align="center">
        <template slot-scope='scope'>
          <el-button
            type="text"
            @click="LookTemplate(scope.row)"
          >查看模板信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryForm.cursor"
      :limit.sync="queryForm.size"
      @pagination="getList()"
    />

  <el-dialog
    :title="spTitle"
    open
    :visible.sync="spVisible"
    width="800px"
    append-to-body>
    <el-timeline style='margin-top: 10px;margin-bottom: 10px;'>
      <el-timeline-item
        v-for="(activity, index) in spRecordList"
        :hide-timestamp='false'
        type='primary '
        :key="index">
        {{activity.status}}
        <div v-for='(item,index) in activity.details' style="margin-top: 8px;">
          <span>分支节点审批人：{{item.approver.userid}}</span>；
          <span>审批意见：{{item.speech||'无'}}</span>；
          <span>审批时间：{{parseTime(item.sptime, "{y}-{m}-{d} {h}:{m}:{s}")}}</span>
        </div>
      </el-timeline-item>
    </el-timeline>
    <el-row>
      <el-col :span="4">
        抄送人：
      </el-col>
      <el-col :span="20">
        {{notifyerList||'无'}}
      </el-col>
    </el-row>
    <div style="margin-top:12px;">
      <el-row>
        <el-col :span="4">
          备注信息：
        </el-col>
        <el-col :span="20" v-show="!comments">
          无
        </el-col>
        <el-col :span="20" v-if="comments">
          <span>备注人：{{comments.commentUserInfo.userid}}</span>；
          <span>备注文本内容{{comments.commentcontent}}</span>
          <span>备注时间：{{parseTime(comments.commenttime, "{y}-{m}-{d} {h}:{m}:{s} ")}}</span>
        </el-col>
      </el-row>
    </div>
  </el-dialog>

  <el-dialog
    title="模板详情"
    open
    :visible.sync="templateVisible"
    width="800px"
    append-to-body>
   <el-timeline style='margin-top: 10px;margin-bottom: 10px;'>
      <el-timeline-item
        v-for="(item, index) in template"
        :hide-timestamp='false'
        type='primary '
        :key="index">
        {{item.property.title[0].text}}
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
 .app-container{
   padding: 10px 20px;
 }

.tag-input {
  width: 240px;
  display: flex;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  align-items: center;
  padding: 0 15px;
  overflow: hidden;
  height: 32px;
  .tag-place {
    color: #bbb;
    font-size: 14px;
  }
}
.mid-action {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  background: #fff;
  .total {
    background-color: rgba(65, 133, 244, 0.1);
    border: 1px solid rgba(65, 133, 244, 0.2);
    border-radius: 3px;
    font-size: 14px;
    min-height: 32px;
    line-height: 32px;
    padding: 0 12px;
    color: #606266;
  }
  .num {
    color: #00f;
  }
}
.el-icon-s-custom {
  font-size: 16px;
  margin-left: 4px;
  color: #999;
  &.man {
    color: #13a2e8;
  }
  &.woman {
    color: #f753b2;
  }
}
.bfc-d + .bfc-d .el-checkbox:first-child {
  margin-left: 10px;
}
</style>
