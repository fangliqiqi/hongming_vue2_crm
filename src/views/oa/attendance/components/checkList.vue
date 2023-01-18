<script>

// import { getTree, getList } from '@/api/oa/organization'
import * as api from '@/api/oa/attendance/attendance'

import { formatDate } from '@/utils/index'

export default {
  name: "Customer",
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
           //限制30天之内  选择 同时不能是同一天
         if ( _this.pickerMinDate !== '') {
               const day30 = (30 - 1) * 24 * 3600 * 1000
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
      queryForm:{
        pageNum: 1,
        pageSize: 10,
        useridlist:'', //需要获取打卡记录的用户列表 用户列表不超过100个
        starttime: "" ,//打卡记录的开始时间。
        endtime:"",//打卡记录的结束时间。
        opencheckindatatype:3//打卡类型。1：上下班打卡；2：外出打卡；3：全部打卡
      }, // 搜索框
      loading: false,
      seachLoading:false,
      total: 0,
      checkList: [], // 考勤列表
      treeData:[],//部门信息
      userid:'',
      useridlist:[],// 考勤人员
      olduserList:[],
      checkTypeList:[  //1：上下班打卡；2：外出打卡；3：全部打卡
        {id:1,name:'上下班打卡'},
        {id:2,name:'外出打卡'},
        {id:3,name:'全部打卡'}
      ],
      department:null,
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
    //     setTimeout(() => {
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
    //     // this.seachLoading = true;
    //     setTimeout(() => {
    //       // this.seachLoading = false;
    //       api.getuserId({deptId:this.department,name:query}).then((res)=>{
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
    },
    // 获取考勤信息
     getList(){
       if(!this.queryForm.useridlist){
          this.$message({ showClose: true, message: '请选择考勤人员', type: "error" });
       } else if(!this.dateRange[0]){
         this.$message({ showClose: true, message: '请选择考勤时间', type: "error" });
       }else{
          this.queryForm.starttime = this.dateRange[0];
          this.queryForm.endtime = this.dateRange[1];
          this.loading = true;
         api.getList(this.queryForm).then(res=>{
            this.checkList = res.data.data
            this.total = res.data.total
            this.loading = false
         }).catch(req=>{
           this.loading = false
           this.total = 0
            this.checkList = []
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
        opencheckindatatype:3//打卡类型。1：上下班打卡；2：外出打卡；3：全部打卡
      }
      this.checkList = []
     },
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
      <el-form-item label="考勤类型" prop="opencheckindatatype">
        <el-select v-model="queryForm.opencheckindatatype" clearable placeholder="请选择考勤类型">
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label-width="80px">
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
      style="width:100%;"
      v-loading="loading"
    >
      <el-table-column  prop="userid" label="员工名称"  align="center"></el-table-column>
      <el-table-column prop="checkin_type" label="打卡类型" align="center"></el-table-column>
      <el-table-column prop="exception_type" label="异常类型" align="center"></el-table-column>
      <el-table-column prop="checkin_time" label="打卡时间" align="center" :formatter='row=>formatDate(row.checkin_time)'/>
      <el-table-column prop="location_title" label="打卡地点" align="center"></el-table-column>
      <el-table-column prop="sch_checkin_time" label="标准打卡时间" align="center" :formatter='row=>formatDate(row.sch_checkin_time)'></el-table-column>
       <el-table-column prop="notes" label="打卡备注" align="center"></el-table-column>
    </el-table>
   <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryForm.pageNum"
      :limit.sync="queryForm.pageSize"
      @pagination="getList()"
    />
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
