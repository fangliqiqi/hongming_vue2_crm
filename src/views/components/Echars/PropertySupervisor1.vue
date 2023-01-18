<template>
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
      id="PropertySupervisor1"
      ref="PropertySupervisor1"
      style="height: calc(40vh); width:50%"
      class="zhaoshang"
    ></div>
  </div>
</template>
<script>
import { turnoverOfThisMonth } from "../../../api/crm/echars/echars";
import echarts from "../../../../node_modules/echarts";

export default {
  data() {
    name: "PropertySupervisor1";
    return {
      //年月
      valueTime: "",
      //本月成交额姓名
      salesman:[],
      //本月成交额
      turnover:[],
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
      this.PropertySupervisor1.resize();
    },
    //获取年月日
   async dateChange() {
     let myChart = echarts.init(
        document.getElementById("PropertySupervisor1")
      );
      var datejson = new Date(this.valueTime).toJSON();
      this.valueTime = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
         this.salesman=[];
        this.turnover=[];
         const response = await turnoverOfThisMonth({
       championDate: this.valueTime
      });
        response.data.forEach((item) => {
      this.salesman.push(item.name);
        this.turnover.push(item.price)
    });
       let option = {
        xAxis: [
        {
            type: 'category',
            data:this.salesman,
        }
    ],
        series: [
          {
             type: 'bar',
            data:this.turnover,
          },
        ],
      };
      myChart.setOption(option);
      
    },

   

    async getStar() {
      let myChart = echarts.init(
        document.getElementById("PropertySupervisor1")
      );

      const response = await turnoverOfThisMonth({
        championDate: this.valueTime
      });
      // console.log(response);
       response.data.forEach((item) => {
      this.salesman.push(item.name);
      this.turnover.push(item.price)

    });

     let option = {
   
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['本月成交额'],
        top:30
    },
    toolbox: {
        show: true,
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data:this.salesman,
        }
    ],
    yAxis: [
        
          {
            type: 'value',
            name: '本月成交额',
        },
        {
            type: 'value',
            name:'本月任务完成度'
        }
    ],
    series: [
        {
            name: '本月成交额',
            type: 'bar',
            data: this.turnover,
            
        },
      //  {
      //       name: '本月任务完成度',
      //       type: 'line',
      //       yAxisIndex: 1,
      //       data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      //   }
    ]
    };
     myChart.setOption(option)
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
