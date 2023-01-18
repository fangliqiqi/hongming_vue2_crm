<template>
  <div class="wortSet app-container">
    <div class="search-vi">
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>
    <div class="tabbar-vi">
      <el-tabs @tab-click="handleQuery">
        <el-tab-pane
          label="全部客户"
          value="全部客户"
          name="全部客户"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-data">
      <el-tabs tab-position="left">
        <el-tab-pane label="服务设置">
          <el-row>
            <el-col :span="24" style="margin-bottom:23px">
              <span
                style="
font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;
line-height: 24px;"
              >
                服务设置
              </span>
              <div class="content-btnbox">
                <el-input
                  placeholder="请输入服务名称"
                  suffix-icon="el-icon-search"
                  style="el-input"
                ></el-input>
                <el-button type="primary"
                  ><i class="el-icon-plus"></i>添加选项</el-button
                >
                <el-button type="danger" plain>删除</el-button>
              </div>
            </el-col>
            <el-col :span="24" style="margin-bottom:96px">
              <div>
                <el-checkbox-group
                  v-model="checkedCities"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="(city, index) in cities"
                    :label="city"
                    :key="index"
                    >{{ city }}</el-checkbox
                  >
                </el-checkbox-group>
              </div></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="项目设置">
          <el-row>
            <el-col :span="24" style="margin-bottom:23px">
              <span
                style="
font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;
line-height: 24px;"
              >
                项目设置
              </span>
              <div class="content-btnbox">
                <el-input
                  placeholder="请输入服务名称"
                  suffix-icon="el-icon-search"
                  style="el-input"
                ></el-input>
                <el-button type="primary"
                  ><i class="el-icon-plus"></i>添加选项</el-button
                >
                <el-button type="danger" plain>删除</el-button>
              </div>
            </el-col>
            <el-col :span="24" style="margin-bottom:96px">
              <div class="table-data" style="width:100%">
      <el-table
        :data="companyList"
        @selection-change="handleSelectionChange"
        @row-click="handleRowFun"
        :height="tableHeight"
      >
     <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="项目名称" align="left" prop="name" />

         <el-table-column label="关联的服务项" align="center">
           <template slot-scope="scope">
             <el-select v-model="scope.row.name" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
           </template>
         </el-table-column>
          <el-table-column label="项目最低价格" align="left"  prop="name"/>
           <el-table-column label="项目最高价格" align="left" prop="name"/>
      </el-table>
        </div>
              </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const cityOptions = [
  "注册",
  "变更",
  "注销",
  "税务异常",
  "工商异常",
  "广州1",
  "深圳1",
  "北京1",
  "广州1",
  "深圳1",
  "北京1",
  "广州1",
  "深圳"
];
export default {
  data() {
    return {
      loading: true, // 遮罩层
      condition: 0,
      titleList: [{ name: "服务设置" }, { name: "项目设置" }],
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      companyList: [{ name: "张云雷" }, { name: "张云雷" }, { name: "张云雷" }],
      options: []
    };
  },
  computed: {
    ...mapGetters(["tableHeight"])
  },
  methods: {
    handleQuery() {},
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    handleRowFun() {},
    getList() {
      // this.loading = false;
    },
    handleCheckedCitiesChange() {}
  }
};
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin-right: 0px;
}
.wortSet .table-data {
  height: calc(100% - 104px);
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  display: flex;
  .el-tabs--left {

    .is-left{width: 188px;
     .el-tabs__nav-wrap {
          .el-tabs__nav-scroll {
            .el-tabs__nav {
              width: 188px;
              .el-tabs__item {
                height: 40px;
                text-align: left;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #565759;
                line-height: 40px;
              }
              .is-active {
                background: #f3f6ff;
                height: 40px;
                width: 195px;

                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #0659e3;
                text-align: left;
              }
            }
          }
        }
        }
      .el-tabs__content {
        .el-tab-pane {
          .el-row {
            .el-col {
              display: flex;
              justify-content: space-between;
               padding: 0 24px 0 30px;
              .content-btnbox {
                display: flex;
                .el-input {
                  width: 280px;
                  height: 32px;
                }
                .el-button {
                  margin-left: 8px;
                }
              }
              .table-data{
                margin: 0;
                padding-top: 0px;
              }
              .el-checkbox-group {
        margin-right: -60px;
        overflow: hidden;
        .el-checkbox {
          float: left;
          height: 35px;
          line-height: 35px;
          padding-right: 60px;
          box-sizing: border-box;
          background-clip: content-box;
        }
      }
            }
          }
        }
      }
    }

}
</style>
<style lang="scss">
.wortSet {
  .el-input--small .el-input__inner {
    color: #d2d3d6;
  }
  .el-checkbox__label {
    padding-left: 16px;
  }
  .el-tabs--left .el-tabs__header.is-left{
    width: 195px;
    .el-tabs__nav-wrap{
      .el-tabs__nav-scroll{
        .el-tabs__nav{
          .el-tabs__item{
            text-align: left;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>
