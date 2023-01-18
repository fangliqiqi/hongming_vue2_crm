<script>

// import { getTree, getList } from '@/api/oa/organization'
import * as api from '@/api/oa/attendance/attendance'

import { formatDate,formatDay } from '@/utils/index'

export default {
  name: "dayList",
  components: { },
  props: {
    type: {
      type: Number | String,
      default: '1',
    },
  },
  data() {
    let _this = this; //在return 中使用this 必须前面先转换一下
    return {
      dateRange:[],// 添加日期
      // 日期快捷选项
      pickerOptions: {
        disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
      },
      queryForm:{
        pageNum: 1,
        pageSize: 10,
        useridlist:'', //需要获取打卡记录的用户列表 用户列表不超过100个
        starttime: "" ,//打卡记录的开始时间。
        endtime:"",//打卡记录的结束时间。

      },
      loading: false,
      total: 0,
      checkList: [], // 考勤列表
      treeData:[],//部门信息
      useridlist:[],// 考勤人员
      userid:'',
      olduserList:[],
      checkRecordTtype:[],
      checkExceptionType:[],
      checkLeaveType:[],
      checkOtstatus:[],
      department:null,//部门
      exceptionVisible:false,//打卡异常弹窗
      leaveVisible:false,//假勤详情弹窗
      exceptionList:[],
      leaveList:[],
      exceptionTitle:null,
      leaveTitle:null,
      defaultProps: {
        label: 'name',
        children: 'children',
        value:'id'
      },

    };
  },
  watch: {},
  computed: {},
  created() {
    this.getTree()
  },
  methods: {
    //获取部门信息
    getTree(){
      api.getdeptName().then(({ data }) => {
        this.treeData = this.handleTree(data)
      })

      // 字典  考勤打卡类型
      this.getDicts("check_record_type").then(res => {
        this.checkRecordTtype = res.data;
      })
      // 字典  考勤异常类型
      this.getDicts("check_exception_type").then(res => {
        this.checkExceptionType = res.data;
      })
      // // 字典  考勤假勤类型
      this.getDicts("check_leave_type").then(res => {
        this.checkLeaveType = res.data;
      })
      // 字典  考勤加班类型
      this.getDicts("check_ot_status").then(res => {
        this.checkOtstatus = res.data;
      })
    },

    // 字典翻译 考勤打卡类型
    recordTtypeFormat(row) {
      return this.selectDictLabel(this.checkRecordTtype, row.base_info.record_type);
    },
    // 字典翻译 考勤加班类型
    OtstatusFormat(row) {
      return this.selectDictLabel(this.checkOtstatus, row.ot_info.ot_status);
    },
    // 字典翻译 考勤异常类型
    exceptionTypeFormat(row) {
      return this.selectDictLabel(this.checkExceptionType, row.exception);
    },
    // // 字典翻译 考勤假勤类型
    leaveTtypeFormat(row) {
      return this.selectDictLabel(this.checkLeaveType, row.type);
    },

    // 时间格式转化 没有全局挂载所以要写个方法接收
    formatDate(row){
      return formatDate(row)
    },


    // 根据部门获取人员 同时头部价格全部人员的选择项
    getUsers(data){
      api.getuserId({department:data}).then(res=>{
        if(res.rows.length>0){
          let datas = [{userId:'000000',name:'全部人员'}]
          this.useridlist = datas.concat(res.rows)
          this.olduserList = res.rows
        }else{
          this.useridlist = []
        }
      })
    },
    // 部门搜索
    // remoteMethodt(query) {
    //   let that = this;
    //   if (query !== '') {
    //     // this.loading = true;
    //     setTimeout(() => {
    //       // this.loading = false;
    //       api.getdeptName({deptName:query}).then((res)=>{
    //         console.log(res)
    //         if(res.code==200){
    //           this.treeData = res.data||[];
    //         }
    //       }).catch((err)=>{

    //       })
    //     }, 200);
    //   } else {
    //      this.getTree()
    //   }
    // },
    // 选择部门
    handleChange(value){
      //选择部门同时清空考勤人员的内容
      if(this.queryForm.useridlist){
        this.userid = null
      }
      // console.log(value)
      let len = value.length-1
      this.department = value[len]
      this.getUsers(this.department)
    },
    // 考勤人员搜索
    // remoteMethods(query){
    //   let that = this;
    //   console.log(query)
    //   if (query !== '') {
    //     // this.loading = true;
    //     setTimeout(() => {
    //       // this.loading = false;
    //       api.getuserId({deptId:this.department,name:query}).then((res)=>{
    //         console.log(res)
    //         if(res.code==200){
    //           this.useridlist = res.rows||[];
    //         }
    //       }).catch((err)=>{

    //       })
    //     }, 200);
    //   } else {
    //     this.getUsers(this.department)
    //   }
    // },
    handleChanget(value){
      if(value=='000000'){
        var data = this.olduserList.map(items=>{
              return items.userId
          }).join(',')
         this.queryForm.useridlist = data;
      }else{
        this.queryForm.useridlist = value
      }
      // console.log(this.queryForm.useridlist)
    },
    // 获取日报考勤信息
     getList(){
       if(!this.queryForm.useridlist){
          this.$message({ showClose: true, message: '请选择考勤人员', type: "error" });
       } else if(!this.queryForm.starttime){
         this.$message({ showClose: true, message: '请选择考勤时间', type: "error" });
       }else{
          this.queryForm.endtime = this.queryForm.starttime;
          this.loading = true;
         api.getDayList(this.queryForm).then(res=>{
            this.checkList = res.data.data
            this.total = res.data.total
            this.loading = false
         }).catch(req=>{
           this.checkList = []
           this.total = 0
           this.loading = false
         })
       }
     },
    // 重置
    resetForm(){
      this.dateRange = [];
      this.$refs["queryForm"].resetFields();
      this.department = null
      this.queryForm = {
        pageNum: 1,
        pageSize: 10,
        useridlist:'', //需要获取打卡记录的用户列表 用户列表不超过100个
        starttime: "" ,//打卡记录的开始时间。
        endtime:"",//打卡记录的结束时间。
      }
      this.checkList = []
      this.total = 0
     },
     // 查看打卡异常
     Lookexception(row){
       this.exceptionTitle = row.base_info.name + '打卡异常详情'
       this.exceptionList = row.exception_infos
       this.exceptionVisible = true
     },
     //查看假勤详情
    LookLeaveType(row){
      // console.log(row)
      this.leaveTitle = row.base_info.name + '假勤详情'
      this.leaveVisible = true
      this.leaveList = row.sp_items
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
      <el-form-item label="考勤部门" prop="department" >
        <!-- <el-select
          v-model="department"
          filterable
          remote
          clearable
          style="width:200px"
          reserve-keyword
          placeholder="请输入考勤部门"
          :remote-method="remoteMethodt"
          @change="handleChange"
          >
          <el-option
            v-for="item in treeData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select> -->
         <el-cascader   :options="treeData" :props="defaultProps" @change="handleChange"  :show-all-levels="false"></el-cascader>
      </el-form-item>
      <el-form-item label="考勤人员" prop="userId">
        <el-select
          :disabled="!department"
          v-model="userid"
          filterable
          remote
          clearable
          style="width:200px"
          reserve-keyword
          placeholder="请选择考勤人员"
          @change="handleChanget"
          >
          <el-option
            v-for="item in useridlist"
            :key="item.userId"
            :label="item.name"
            :value="item.userId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考勤日期">
        <el-date-picker
          v-model="queryForm.starttime"
          type="date"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label=" ">
        <el-button
          v-hasPermi="['customerManage:customer:query']"
          type="primary"
          @click="getList"
          >查询</el-button
        >
        <el-button
          v-hasPermi="['customerManage:customer:query']"
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
      :data="checkList"
      tooltip-effect="dark"
      style="width:100%"
      v-loading="loading"
    >
      <el-table-column  prop="base_info.date" label="日期"  align="center">
        <template slot-scope="scope">
           <span>{{parseTime(scope.row.base_info.date, "{y}-{m}-{d} ")}}</span>
        </template>
      </el-table-column>
      <el-table-column  prop="base_info.name" label="员工名字"  align="center"></el-table-column>
      <el-table-column prop="base_info.departs_name" label="所在部门" align="center"></el-table-column>
      <el-table-column prop="base_info.record_type" label="记录类型" align="center" :formatter="recordTtypeFormat"></el-table-column>
      <el-table-column prop="summary_info.earliest_time" label="最早打卡时间" align="center"></el-table-column>
      <el-table-column prop="summary_info.lastest_time" label="最晚打卡时间" align="center"></el-table-column>
      <el-table-column prop="ot_info.ot_status" label="加班状态" align="center" :formatter="OtstatusFormat"></el-table-column>
      <el-table-column prop="summary_info.regular_work_sec" label="当日实际工作时长(h)" align="center">
        <template slot-scope='scope'>
          <span>{{scope.row.summary_info.regular_work_sec/3600}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="打卡异常状态" align="center">
        <template slot-scope='scope'>
          <el-button
            type="text"
            @click="Lookexception(scope.row)"
          >打卡异常情况
          </el-button>
        </template>
      </el-table-column>
      <el-table-column  label="假勤情况" align="center">
        <template slot-scope='scope'>
          <el-button
            type="text"
             @click="LookLeaveType(scope.row)"
          >假勤情况
          </el-button>
        </template>
      </el-table-column>
    </el-table>
   <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryForm.pageNum"
      :limit.sync="queryForm.pageSize"
      @pagination="getList()"
    />

    <!-- 打卡异常详情 -->
    <el-dialog
      :title="exceptionTitle"
      open
      :visible.sync="exceptionVisible"
      width="800px"
      append-to-body>
      <el-table
        :data="exceptionList"
        tooltip-effect="dark"
        style="width:100%"
      >
        <el-table-column  prop="exception" label="打卡异常类型"  align="center" :formatter="exceptionTypeFormat"></el-table-column>
        <el-table-column  prop="count" label="当日此异常的次数"  align="center" ></el-table-column>
        <el-table-column  prop="duration" label="当日此异常的时长(h)"  align="center" >
          <template slot-scope='scope'>
            <span>{{scope.row.duration/3600}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 假勤详情 -->
    <el-dialog
      :title="leaveTitle"
      open
      :visible.sync="leaveVisible"
      width="800px"
      append-to-body>
      <el-table
        :data="leaveList"
        tooltip-effect="dark"
        style="width:100%"
      >
        <!-- <el-table-column  prop="type" label="假勤类型"  align="center" :formatter="leaveTtypeFormat"></el-table-column> -->
         <el-table-column  prop="name" label="假勤名称"  align="center"></el-table-column>
        <el-table-column  prop="count" label="当日假勤次数"  align="center" ></el-table-column>
        <el-table-column  prop="duration" label="当日假勤时长(h)"  align="center">
          <template slot-scope='scope'>
            <span>{{scope.row.duration/3600}}</span>
          </template>
        </el-table-column>
      </el-table>
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
