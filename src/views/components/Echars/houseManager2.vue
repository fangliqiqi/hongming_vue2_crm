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

      <!-- <el-date-picker
        v-model="valueTime"
        type="month"
        placeholder="选择月"
        @change="dateChange"
      >
      </el-date-picker> -->
    </div>
    <div
      id="houseManager2"
      ref="houseManager2"
      style="height: calc(40vh); width:50%;position:absolute;right:0px;"
      class="zhaoshang"
    ></div>
  </div>
</template>
<script>
import { orderData } from "../../../api/crm/echars/echars";
import echarts from "../../../../node_modules/echarts";

export default {
  data() {
    name: "houseManager2";
    return {
      //年月
      valueTime: "",
      //开始时间
      sTime: "",
      //结束时间
      eTime: "",
      //查询展示的时间（x轴）
      queryTime: [],
      //月售套餐数
      monthlyPackages: [],
      //月提套餐数
      billOfLadingList:[],
      //本月成交额
      turnover: []
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
      this.houseManager2.resize();
    },
    //获取年月日
    async dateChange() {
      let myChart = echarts.init(document.getElementById("houseManager2"));

    this.sTime = this.valueTime[0]
    this.eTime = this.valueTime[1]

      this.queryTime = [];
      this.monthlyPackages=[]
      this.billOfLadingList = []
      const response = await orderData({
         startDate: this.sTime,endDate:this.eTime
      });
      response.data.forEach(item => {
        this.queryTime.push(item.salePackage);
        this.monthlyPackages.push(item.salePackage)
        this.billOfLadingList.push(item.billOfLading)
        // this.turnover.push(item.price)
      });
      let option = {
        xAxis: [
          {
            type: "category",
            data: this.queryTime
          }
        ],
        series: [
          {
            // data: total
          },
          {
            // data: monthTotal
          }
        ]
      };
      myChart.setOption(option);
    },

    async getStar() {
      let myChart = echarts.init(document.getElementById("houseManager2"));

      const response = await orderData({
           startDate: this.sTime,endDate:this.eTime
      });
         response.data.forEach((item) => {
        this.queryTime.push(item.dateKey);
        this.monthlyPackages.push(item.salePackage)
        this.billOfLadingList.push(item.billOfLading)
        // this.turnover.push(item.price)

      });

      let option = {
        title: {
        
          left: "left",
          top: 10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          //  left:'50%',
          top: 30,
          data: ["月售套餐数", "月提套餐数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: 100,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.queryTime
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "月售套餐数",
            type: "bar",
            data: this.monthlyPackages
          },
          {
            name: "月提套餐数",
            type: "bar",
            data: this.billOfLadingList
          }
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
  /* border: 1px solid #000; */
}
</style>
