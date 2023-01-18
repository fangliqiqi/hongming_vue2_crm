<template>
  <div class="bar">
    <!-- 年月日选择 -->
    <div>
      <el-date-picker
        v-model="year"
        type="year"
        placeholder="选择年"
        format="yyyy"
        value-format="yyyy"
        @change="dateChange"
      >
      </el-date-picker>
    </div>
    <div
      id="boss3"
      ref="boss3"
      style="height: calc(40vh); width:100%"
      class="zhaoshang"
    ></div>
  </div>
</template>
<script>
import { customerChurn } from "../../../api/crm/echars/echars";
import echarts from "../../../../node_modules/echarts";

export default {
  data() {
    name: "boss3";
    return {
      //年份
      year: "",
      //查询展示的时间（x轴）
      queryTime: [],
      //收入
     Income: [],
     dateYear:'',
      //收入类别
      incomeCategory: []
    };
  },
  created() {
    var date = new Date();
    this.dateYear = date.getFullYear();
  },

  mounted() {
    this.$nextTick(() => {
      this.getStar();
    });
  },

  methods: {
    resize() {
      this.boss3.resize();
    },
    //获取年份
    async dateChange() {
      let myChart = echarts.init(document.getElementById("boss3"));
      this.incomeCategory = [];
      this.Income=[];
      this.queryTime = [];
       this.dateYear = this.year
      const response = await customerChurn({
        year: this.year
      });
      let tep = {};
      response.data.forEach(item => {
        tep = {};
        this.incomeCategory.push(item.clientType);
        this.queryTime = [];
        item.list.forEach(ite => {
          this.queryTime.push(ite.dateKey);
        });
        tep.name= item.clientType
        tep.type = 'bar'
        tep.stack='收入'
        tep.data = item.list.map(val=>{
          return val.clientQuantity
        })
        this.Income.push(tep)
      });
      let option = {
          title: {
          text:this.dateYear +'年代账客户增长流失客户',
        },
        xAxis: [
          {
            type: "category",
            data: this.queryTime
          }
        ],
        series:this.Income
      };
      myChart.setOption(option);
    },

    async getStar() {
      let myChart = echarts.init(document.getElementById("boss3"));
      this.incomeCategory = [];
      const response = await customerChurn({
        year: this.year
      });
      let temp = {};
      response.data.forEach(item => {
        temp = {};
        this.incomeCategory.push(item.clientType);
        this.queryTime = [];
        item.list.forEach(ite => {
          this.queryTime.push(ite.dateKey);
        });
        temp.name= item.clientType
        temp.type = 'bar'
        temp.stack='收入'
        temp.data = item.list.map(val=>{
          return val.clientQuantity
        })
        this.Income.push(temp)
      });

      let option = {
  
        title: {
          text:this.dateYear +'年代账客户增长流失客户',
          subtext: '单位：户',
         top:10,
         left:'center',
         bottom: 10,
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
         bottom: 10,
          data: this.incomeCategory
        },
        grid: {
          bottom: "10%",
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
        series:this.Income
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
  top: 514px;
  left: 0;
  /* right: -50px; */
  /* border: 1px solid #000; */
}
</style>
