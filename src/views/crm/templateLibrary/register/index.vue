<template>
  <div class="register app-container">
    <div class="search-vi">
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>
    <div class="table-data">
      <el-tabs tab-position="left">
        <el-tab-pane label="公司注册">
          <el-row style="border-bottom: 1px solid #E6E7EB;">
            <el-col :span="24" >
              <span
                style="
font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;
line-height: 24px;"
                >公司注册
              </span>
              <div class="content-btnbox">
                <el-button plain>恢复初始化</el-button>
                <el-button type="danger" plain>删除</el-button>
                <el-button type="primary">保存</el-button>
              </div>
            </el-col>
          </el-row>
          <el-form class="content-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="项目名称">
                  <el-input placeholder="请输入项目名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业务类型">
                  <el-input placeholder="请输入业务类型" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="项目要求">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入业务类型"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="所需资料">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入业务类型"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" class="box_table">
                <el-col :span="24">
                  <div class="box_table_header">
                    <div class="table_left">
                      <i class="el-icon-s-operation "></i>
                      <span>税务备案</span>
                    </div>
                    <div class="table_right">
                      <el-button
                        type="primary"
                        plain
                        @click="addStep"
                        style="display: inline-block;margin-right:12px;"
                        >+ 添加步骤</el-button
                      >
                      <el-progress
                        :percentage="progressBarPercent"
                        :format="format"
                        :stroke-width="6"
                      ></el-progress>
                    </div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <el-table
                    style="width: 100%;display: grid;"
                    :data="tableArray"
                  >
                    <el-table-column
                      type="selection"
                      align="center"
                      style="grid-template-columns: 10%;"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="sort"
                      label="序号"
                      align="center"
                      min-width="50"
                    />
                    <el-table-column
                      label="步骤名"
                      align="left"
                      show-overflow-tooltip
                      prop="name"
                      min-width="454"
                    >
                      <template slot-scope="scope">
                        <el-tooltip
                          effect="dark"
                          :content="scope.row.name"
                          placement="top"
                        >
                          <el-input
                            type="text"
                            v-model="scope.row.name"
                            size="mini"
                          />
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="执行人"
                      align="left"
                      show-overflow-tooltip
                      prop="person"
                      min-width="98"
                    >
                      <template slot-scope="scope">
                        <el-tooltip
                          effect="dark"
                          :content="scope.row.name"
                          placement="top"
                        >
                          <el-input
                            type="text"
                            v-model="scope.row.name"
                            size="mini"
                          />
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      min-width="120"
                    >
                      <template slot-scope="scope">
                        <div
                          style="display: flex; justify-content:space-between;color:#4977E0;"
                          class="omg"
                        >
                          <div class="textclick" @click="interposition">
                            插入
                          </div>
                          <div class="textclick" @click="deleteStep(scope.row)">
                            删除
                          </div>
                          <div
                            class="textclick"
                            style="margin-right：8px; text-decoration: underline;color:#EF5465;"
                            @click="theAttachment"
                          >
                            所需附件
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-form-item label="项目成果">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入业务类型"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个体户注册">
          <el-row>
            <el-col :span="24" style="margin-bottom:23px">
              <span
                style="
font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;
line-height: 24px;"
                >个体户注册
              </span>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 所需附件 -->
    <el-dialog
      title="所需附件"
      :visible.sync="theAttachmentState"
      width="516px"
      append-to-body
    >
      <div style="padding-bottom:40px; padding-top:30px;">
        <el-tag
          :key="tag.id"
          v-for="tag in labelList"
          closable
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <div v-if="inputVisible" class="box-inpt-box">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @keyup.enter.native="handleInputConfirm()"
            value-key="label"
            class="seek-frame"
            :autofocus="true"
            @select="handleSelect"
          >
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="handleIconClick"
            >
            </i>
            <template slot-scope="{ item }">
              <div class="name" v-if="item.add" @click="addLabelUp">
                <i class="el-icon-plus"></i>
                {{ item.name }}
              </div>
              <div class="name" v-else>{{ item.label }}</div>
            </template>
          </el-autocomplete>
        </div>
        <div v-else>
          <el-button class="button-new-tag" size="small" @click="showInput"
            >+ 添加所需附件</el-button
          >
        </div>
      </div>
      <div style="margin-top：30px;text-align: right; ">
        <el-button @click="theAttachmentState = !theAttachmentState"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="theAttachmentState = !theAttachmentState"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findSerpricePage
} from "@/api/crm/register/register";
import { throttle } from "@/utils/hmt";
export default {
  name: "register",
  data() {
    return {
      progressBarPercent: 30,
      theAttachmentState: false,
      inputVisible: false,
      inputValue: null,
      addTagUp: false, //新增标签
      tableArray: [
        { name: "代理记账", sort: "步骤1", person: "张云雷" },
        { name: "代理记账", sort: "步骤2", person: "张云雷" }
      ],
      labelList: ["张云雷", "探水清河"]
    };
  },
  computed: {},
   watch: {
      view: function(val, oldVal) {
        if (!val) {
          this.getList()
        }
      }
   },
   created() {
     this.getList()
   },
  methods: {
    // 列表信息
    getList(){
      findSerpricePage({}).then(response=>{
        // console.info(response)
      })
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 添加步骤
    addStep() {
      this.tableArray.push({
        name: "公司注册",
        sort: "步骤" + (this.tableArray.length + 1)
      });
      return this.tableArray;
    },
    // 插入步骤
    interposition() {},
    // 删除步骤
    deleteStep(row) {
      // console.info(row);
    },
    // 任务进度条的文字
    format(percentage) {
      return "完成进度:" + percentage + "%";
    },
    // 所需附件
    theAttachment() {
      // console.info("所需附件");
      this.theAttachmentState = true;
    },
    // 添加所需附件
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        // this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm: throttle(function() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.labelList.push(inputValue);
      }
    }),
    handleIconClick(ev) {
      // console.log(ev);
    },
    // 所需附件-输入框
    querySearch(queryString, cb) {
      this.LIST = false;
      // 调用 callback 返回建议列表的数据
      if (queryString) {
        AequiredAccessory({ keyword: queryString }).then(response => {
          let arr = response.data;
          if (response.data.length == 0) {
            arr.push({
              name: "添加标签",
              label: queryString,
              add: true
            });
            this.LIST = true;
          } else {
            arr.push({
              name: "添加标签",
              add: true
            });
          }
          cb(arr);
        });
      } else {
        let arr = [];
        arr.push({
          name: "添加标签",
          label: queryString,
          add: true
        });
        cb(arr);
      }
    },
    // 添加标签
    addLabelUp() {
      this.addTagUp = true;
    },
    handleSelect(item) {
      // console.log(item);
    }
  }
};
</script>
<style lang="scss" scoped>
.register .table-data {
  height: calc(100% - 104px);
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  display: flex;
  .left {
    width: 195px;
    .el-menu-vertical-demo {
      height: 100%;
    }
    .el-menu {
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }
    }
  }
  .content {
    width: calc(100% - 194px);
    overflow: hidden;
    .content-title {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e6e7eb;
      padding: 0 40px;

      .content-headline {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        padding-top: 6px;
      }

    }
    // .content-content {
    //   padding: 27px 40px 20px;
    //   height: calc(100vh - 40px);
    //   text-align: center;
    //   overflow-y: scroll;
    // }
    // .content-content::-webkit-scrollbar {
    //   display: none;
    // }
  }
}
.el-tabs {
  .el-tabs__content {
    .el-tab-pane {
      height: 100%;
      .el-row {

        .el-col {
          display: flex;
          justify-content: space-between;
          padding: 0 24px 8px 40px;
        }
      }
      .content-content {
      padding: 27px 0px 20px;
      height: calc(100% - 40px);
      text-align: center;
      overflow-y: scroll;
    }
    .content-content::-webkit-scrollbar {
      display: none;
    }
      .el-form {

        .el-row {
          .el-col {
            .el-form-item--small.el-form-item{
              width: 100%;
            }
            }
            .box_table {
              width: 100%;
              background: #ffffff;
              padding: 24px 0 24px;
              display: flex;
              flex-wrap: wrap;
              .el-col {
                .box_table_header {
                  width: 100%;
                  display: flex;
                  justify-content:space-between;
                  align-items: center;
                  margin-bottom: 18px;
                  .table_left {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                  }
                  .table_right {
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    .addbut {
                      width: 97px;
                      height: 28px;
                      outline: none;
                      text-align: center;
                      background: #ecf2fc;
                      border: 1px solid #b5c8f1;
                      border-radius: 3px;
                      font-size: 12px;
                      line-height: 24px;
                      color: #4977e0;
                      margin-right: 5px;
                    }
                    .el-progress {
                      width: 87px;
                      display: flex;
                      flex-direction: column;
                      color: pink;

                    }
                  }
                }
                .el-table__header tr,
                .el-table__header th {
                  padding: 0;
                  height: 42px;
                  line-height: 42px;
                  color: #6e7073;
                  font-size: 12px;
                }
                .el-table__body tr,
                .el-table__body td {
                  padding: 0;
                  height: 42px;
                  line-height: 42px;
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
.register {
  .table-data {
    .el-tabs {
      width: 100%;
      .el-tabs__header.is-left {
        width: 195px;
        .el-tabs__nav-wrap {
          .el-tabs__nav-scroll {
            .el-tabs__nav {
              .el-tabs__item {
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
  }
  .el-tabs__content {
    height: 100%;}
    .el-tabs--left .el-tabs__header.is-left{
      margin-right: 0px;
    }
}
.el-progress-bar{
  padding-right: 0 !important;
}
.el-progress__text {
          white-space: nowrap;
          font-size: 12px;
          color: #565759;
          margin-top: 5px;
          margin-left: 0;
        }


</style>
