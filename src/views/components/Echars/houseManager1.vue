<template>
    <div class="bar">
       <!-- 年月日选择 -->
    <div>
      <el-date-picker
        v-model="valueTime"
        type="monthrange"
        format="yyyy-MM "
        value-format="yyyy-MM"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        @change="dateChange"
      >
      </el-date-picker>
    </div>
        <!-- 日折线图 -->
        <div id="houseManager1"  ref="houseManager1" style="height: calc(40vh); width:50%" class="zhaoshang"></div>
    </div>
</template>
<script >
import echarts from "../../../../node_modules/echarts";
import { customerData } from "../../../api/crm/echars/echars";
export default{
    
data(){
    name:'houseManager1'
    return {
         //年月
      valueTime: "",
      //开始时间
      sTime: "",
      //结束时间
      eTime: "",
       //查询展示的时间（x轴）
      queryTime: [],
      //客户数据
      customerList:[],
      count:[],
      Time:[]
    }
},
created(){
    var date = new Date();
    this.valueTime = date.toLocaleDateString();
    this.valueTime = this.valueTime.replace(/\//g, "-");
},

mounted(){
    this.$nextTick(() => {
      this.getStar();
    });

},


methods:{
    resize() {
      this.houseManager1.resize();
    },
 //获取年月日
    async dateChange() {
      let myChart = echarts.init(document.getElementById("houseManager1"));

    this.sTime = this.valueTime[0]
    this.eTime = this.valueTime[1]
this.queryTime = [];
    let tep = {}
          this.customerList=[] 
     const response = await customerData({ startDate: this.sTime,endDate:this.eTime})

    response.data.forEach(item=>{
tep = {}
     this.queryTime = [];
     this.customerList.push(item.businessType)
     tep = {}
     item.supervisors.forEach(ite=>{
       this.queryTime.push(ite.dateKey)
       
     })
     tep.name=item.businessType
     tep.type="line"
     tep.data = item.supervisors.map(val=>{
       return val.clientQuantity
     })
    this.count.push(tep)
   
    });
      let option = {
   xAxis: {
      data: this.queryTime
    },
   series: this.count
 }
  myChart.setOption(option);
    },
  

async  getStar(){
     let myChart = echarts.init(document.getElementById("houseManager1"));
   
     const response = await customerData({
         startDate: this.sTime,endDate:this.eTime
     })
     let temp = {}
     this.customerList=[]
      response.data.forEach(item=>{
     temp = {}
     this.queryTime = [];
     this.customerList.push(item.businessType)
     temp = {}
     item.supervisors.forEach(ite=>{
       this.queryTime.push(ite.dateKey)
       
     })
     temp.name=item.businessType
     temp.type="line"
     temp.data = item.supervisors.map(val=>{
       return val.clientQuantity
     })
    this.count.push(temp)
   
    })
    let option = {
    
     legend: {
       top:20,
        data:this.customerList
    },
     grid: {
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: this.queryTime
    },
    yAxis: {
        type: 'value'
    },
    series:this.count
};
     myChart.setOption(option)
}
},
beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    // off(window, "resize", this.resize);
  }




}
    

</script>
<style scoped>
.box {
  position: relative;
  padding: 0 !important;
  border: 0px !important;
}

.zhaoshang {
  position: absolute;
  top: 57px;
  left: 0px;
  /* border: 1px solid #000; */
}
</style>