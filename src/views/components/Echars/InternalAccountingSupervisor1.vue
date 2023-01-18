<template>
<!-- 内账首页饼图 -->
  <div class="bar">
    <!-- 年月日选择 -->
    <div>
      <el-date-picker
        v-model="valueTime"
        type="month"
        placeholder="选择月"
        @change="dateChange"
      >
      </el-date-picker>
    </div>
    <div
      id="InternalAccountingSupervisor1"
      ref="InternalAccountingSupervisor1"
      style="height: calc(40vh); width:100%"
      class="zhaoshang"
    ></div>
  </div>
</template>
<script>
import {totalRevenue } from "../../../api/crm/echars/echars";
import echarts from "../../../../node_modules/echarts";

export default {
  data() {
    name: "InternalAccountingSupervisor1";
    return {
      //年月
      valueTime: "",
   //财税客户
   totalRevenueList:[],
    //房产客户
    houseCustomerList:[]
    };
   
  },
  created() {
    var date = new Date();
    this.valueTime = date.toLocaleDateString();
    this.valueTime = this.valueTime.replace(/\//g, "-");
    // console.log(this.valueTime);
  },

  mounted() {
    this.$nextTick(() => {
      this.getStar();
    });
  },

  methods: {
    resize() {
      this.InternalAccountingSupervisor1.resize();
    },
    //获取年月日
    async dateChange() {
      let myChart = echarts.init(document.getElementById("InternalAccountingSupervisor1"));
      var datejson = new Date(this.valueTime).toJSON();
      this.valueTime = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      this.totalRevenueList = [];
      this.houseCustomerList=[];
      const response = await totalRevenue({
        month: this.valueTime
      });
    let tep = {}
     response.data.customerRevenueList.forEach(item=>{
        //  console.log(item);
tep = {}
tep.value = item.income
tep.name =  item.companyName
this.totalRevenueList.push(tep)
     })
       response.data.housePieChart.forEach(item=>{
tep = {}
tep.value = item.income
tep.name =  item.companyName

this.houseCustomerList.push(tep)
     })
      let option = {
        
        series: [
          {
            type: "pie",
            data: this.totalRevenueList
          },
          {
             type: "pie",
            data: this.houseCustomerList
          }
        ]
      };
      myChart.setOption(option);
    },

    async getStar() {
      let myChart = echarts.init(document.getElementById("InternalAccountingSupervisor1"));

      const response = await totalRevenue({
        month: this.valueTime
      });
      // console.log(response);
      let temp = {}
     response.data.customerRevenueList.forEach(item=>{
temp = {}
temp.value = item.income
temp.name =  item.companyName

this.totalRevenueList.push(temp)
     })
      response.data.housePieChart.forEach(item=>{
temp = {}
temp.value = item.income
temp.name =  item.companyName

this.houseCustomerList.push(temp)
     })

      let option = {
        title: [
          {
        subtext: '财税客户收入统计',
        left: '25%',
        top: '3%',
        textAlign: 'center',
         subtextStyle:{
            fontSize:18,
            color:'#000000',
        },
        
    }, {
        subtext: '房产客户收入统计',
        left: '70%',
        top: '3%',
        textAlign: 'center',
           subtextStyle:{
            fontSize:18,
            color:'#000000',
        },
    }, 
        ],
        
        toolbox: {
          show: true
        },
        calculable: true,
       
        series: [
          {
        type: 'pie',
        radius: '70%',
        center: ['25%', '55%'],
        data: this.totalRevenueList,
    }, {
        type: 'pie',
        radius: '70%',
        center: ['70%', '55%'],
        data: this.houseCustomerList,
       
    },
          
        ]
      };
      myChart.setOption(option);
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    // off(window, "resize", this.resize);
  }
};
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
