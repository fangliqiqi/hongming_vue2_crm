<template>
  <!-- onlinePayment -->
  <div class="app-container onlinePayment">
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            v-model="showSearch"
          >
            <div class="search-popover">
              <el-form
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="录入时间">
                  <el-date-picker
                    v-model="queryParams.enteringTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="跟进时间">
                  <el-date-picker
                    v-model="queryParams.followTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="成交时间">
                  <el-date-picker
                    v-model="queryParams.accomplishTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="商机等级" prop="sourceTypeLv">
                  <el-radio-group v-model="radio">
                    <el-radio
                      v-for="(item, index) in sourceTypeLv"
                      :key="item"
                      :label="index"
                      >{{ item }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="所在地区" prop="district">
                  <el-select
                    v-model="queryParams.delSwitch"
                    placeholder="请选择所在地区 "
                    clearable
                    size="small"
                    class="mw222"
                  >
                    <el-option
                      v-for="item in delSwitch"
                      :key="item.dictId"
                      :label="item.dictLabel"
                      :value="item.dictCode"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuery"
                  >确认</el-button
                >
              </div>
            </div>
            <el-button
              slot="reference"
              size="small"
              icon="el-icon-search"
              >筛选</el-button
          ></el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.companyName"
            placeholder="请输入客户简称或表编号或税号"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuery"
          />
        </el-col>
      </el-row>
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>
    <div class="table-data">
      <el-row class="title linear">
        <el-col :span="2">
          <div>
            <span
              style="
font-size: 16px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;"
              >在线支付</span
            >
          </div>
        </el-col>
        <el-col :span="22">
          <div>
            <div
              style="
font-size: 12px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #565759;"
            >
              <el-switch
                v-model="value1"
                active-text="开启（开启后，客户可通过账单链接进行在线支付)"
              >
              </el-switch>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="title">
        <el-col :span="2">
          <div>
            <span
              style="
font-size: 16px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;"
              >主账户</span
            >
          </div>
        </el-col>
        <el-col :span="22">
          <div>
            <span
              style="
font-size: 12px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #565759;"
              >请将公众号对应的企业账户配置在这，且当客户找不到入账账户时资金将自动入户到本账户</span
            >
          </div>
        </el-col>
      </el-row>
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="date" label="收账账户" width="180">
          </el-table-column>
          <el-table-column prop="name" label="备注信息" width="180">
          </el-table-column>
          <el-table-column prop="address" label="意向等级"> </el-table-column>
          <el-table-column prop="address" label="支付渠道"> </el-table-column>
          <el-table-column prop="address" label="银联商户号"> </el-table-column>
          <el-table-column prop="address" label="收款范围"> </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <el-button size="mini" type="text" @click="onlinePaymentSetUp"
              >设置</el-button
            >
          </el-table-column>
        </el-table>
      </template>
      <!-- 设置 -->
      <el-dialog
        title="在线支付账户设置"
        :visible.sync="setUp"
        width="516px"
        append-to-body
        class="setUp"
      >
        <el-form>
          <el-row>
            <el-col :span="24">
              <el-form-item label="收款账户名称" class="tax">
                <el-input style="width: 284px;" placeholder="请填写审核备注" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="账户备注信息" class="tax">
                <el-input
                  type="textarea"
                  :rows="4"
                  style="width: 284px;"
                  placeholder="请填写审核备注"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="银联商户号" class="tax">
                <el-input
                  style="width: 284px; margin-right:10px;"
                  placeholder="请输入银联商户号"/>
                
                 <el-button type="primary" plain style="margin-left：10px"
                  >验证</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="pay">
              <el-form-item label="启用在线支付">
                <el-switch
                  v-model="value1"
                  style="margin-right:10px"
                ></el-switch>
                <span>开启</span>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="label">
              <el-form-item label="收款范围">
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>

                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ 添加标签</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>

          <el-button type="primary" @click="submitForm">确认审核</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {
      value1: true,
      showSearch: false, // 显示搜索条件
      loading: true, // 遮罩层
      total: 0,
      radio: "1",
      queryParams: {},
      delSwitch: {},
      sourceTypeLv: {},
      tableData: [
        {
          date: "现金",
          name: "王小虎",
          address: "1"
        },
        {
          date: "支付宝",
          name: "王小虎",
          address: "1"
        },
        {
          date: "银行转账",
          name: "王小虎",
          address: "1"
        },
        {
          date: "微信支付",
          name: "王小虎",
          address: "1"
        },
        {
          date: "其他",
          name: "王小虎",
          address: "1"
        },
        {
          date: "银行账户",
          name: "王小虎",
          address: "1"
        }
      ],
      setUp: false, //设置
      //添加标签
      dynamicTags: ["个体账户"],
      inputVisible: false,
      inputValue: ""
    };
  },
  computed: {
    ...mapGetters(["tableHeight"])
  },
  methods: {
    //   重置
    resetQuery() {},
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 1;
      this.getList();
    },
    //列表展示
    getList() {
      this.loading = false;
      // console.info(this.queryParams);
      let data = JSON.parse(JSON.stringify(this.queryParams));
      //   checkForTheAuditList(data).then(response => {
      //     this.companyList = response.data.rows || [];
      //     this.total = response.data.totalRows;
      //     this.loading = false;
      //   });
    },
    //设置弹窗
    onlinePaymentSetUp() {
      this.setUp = true;
    },
    // 添加标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 取消按钮
    cancel() {
      this.setUp = false; //设置
      this.queryParams = {};
    },
    // 保存按钮
    submitForm() {
      this.setUp = false; //设置
      //
      // this.queryParams.status = this.queryParams.dispatchState;
      // let companyListRun = JSON.parse(JSON.stringify(this.queryParams));
      // this.queryParams = {};
      // OrderReview(companyListRun).then(response => {
      //   this.openOrderAudit = false;
      //   this.getList();
      // });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss">

  .setUp {
    .el-dialog {
      margin-top: 22vh !important;
      border-radius: 4px;
      .el-dialog__body {
        padding-top: 24px;
        padding-bottom: 7px;
        .el-form {
          margin: 0px;
          .el-row {
            .el-col {
              .tax {
                display: flex;
                margin-bottom: 14px;
              }
            }
          }
          .el-form-item__label {
            width: 97px;
          }
          .pay {
            .el-form-item {
              margin-bottom: 5px;
            }
          }
          .label {
            .el-form-item {
              display: flex;
              align-items: center;
              margin-bottom: 0px;
              .el-form-item__content {
                .el-tag--small {
                  margin-top: 0px;
                  margin-bottom: 0px;
                }
              }
            }
          }
        }
      }
    }
  }
  .onlinePayment {
  .table-data {
    padding-top: 0px;
    .title{
      padding-top: 19px;
      padding-bottom: 19px;
    }
    .linear{
      border-bottom: 1px solid #E6E7EB;
    }
  }
}
</style>
