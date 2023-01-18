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
      id="ForeignAccountSupervisor1"
      ref="ForeignAccountSupervisor1"
      style="height: calc(40vh); width:100%"
      class="zhaoshang"
    ></div>
  </div>
</template>
<script>
import { CustomerService } from "../../../api/crm/echars/echars";
import echarts from "../../../../node_modules/echarts";

export default {
  data() {
    name: "ForeignAccountSupervisor1";
    return {
      //年月
      valueTime: "",
      CustomerClassification: ['欠费客户','新签客户','增值客户'],
      CustomerClassificationList:[],
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
      this.ForeignAccountSupervisor1.resize();
    },
    //获取年月日
    async dateChange() {
      let myChart = echarts.init(document.getElementById("ForeignAccountSupervisor1"));
      var datejson = new Date(this.valueTime).toJSON();
      this.valueTime = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      this.CustomerClassificationList = [];
      const response = await CustomerService({
        date: this.valueTime
      });
      this.CustomerClassificationList.push(response.data.arrearsCustomersCount);
      this.CustomerClassificationList.push(response.data.appreciationCompany);
      this.CustomerClassificationList.push(response.data.newSignCompany);

      let option = {
        xAxis: [
          {
            type: "category",
            data:this.CustomerClassification
          }
        ],
        series: [
          {
            type: "bar",
            data: this.CustomerClassificationList
          }
        ]
      };
      myChart.setOption(option);
    },

    async getStar() {
      let myChart = echarts.init(document.getElementById("ForeignAccountSupervisor1"));

      const response = await CustomerService({
        date: this.valueTime
      });
      this.CustomerClassificationList.push(response.data.arrearsCustomersCount);
      this.CustomerClassificationList.push(response.data.appreciationCompany);
      this.CustomerClassificationList.push(response.data.newSignCompany);

      let option = {
        title: {
          text: "年服务客户数",
          left: "center",
          top: 10
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["客户数"],
          bottom: 10
        },
        toolbox: {
          show: true
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.CustomerClassification
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            data:  this.CustomerClassificationList
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
