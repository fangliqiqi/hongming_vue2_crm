<template>
  <div class="yunzhangfang">
    <div class="company_vi mt20 bgfff">
      <div class="title_vi">
        <span>云帐房信息</span>
      </div>
      <el-form label-position="top">
        <el-row :gutter="22">
          <el-col :span="6">
            <div style=" text-align: center;" @click="km">
              <el-button type="primary">科目余额</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <div style=" text-align: center;">
              <el-button type="primary" @click="zhongzhang">总账</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <div style=" text-align: center;">
              <el-button type="primary" @click="mingxizhang">明细帐</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <div style=" text-align: center;">
              <el-button type="primary" @click="pingzhenghuizong"
                >凭证汇总</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 科目余额 -->
    <el-dialog
      custom-class="order_dialog"
      width="80%"
      title="科目余额"
      :visible.sync="courseBalanceJudge"
    >
      <div class="filtrate">
        <el-select
          v-model="value"
          placeholder="请选择"
          class="right10"
          style="width:160px;"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="filtrate_time right10" @click="filtrate" ref="main">
          <strong>{{
            this.qJTimeListKeMuYuE[0]
              ? this.qJTimeListKeMuYuE[0] +
                "年第" +
                this.qJTimeListKeMuYuE[1] +
                "期"
              : "请选择"
          }}</strong>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-button
          icon="el-icon-refresh-right"
          style="font-size: 22px; padding:0px 10px; margin-right:30px;"
          @click="km"
        ></el-button>
        <el-checkbox-group
          v-model="checkList"
          style="display: flex;
    align-items: center;"
        >
          <el-checkbox
            label="显示本年累计"
            v-model="yunzhangfangform.wbnljbxs"
            @change="xianshibennianLj"
          ></el-checkbox>
          <el-checkbox
            label="显示核算项目明显"
            v-model="yunzhangfangform.sfxsfzhs"
            @change="xianshishenhexiangmuMX"
          ></el-checkbox>
        </el-checkbox-group>
        <div class="print">
          <el-button type="primary" @click="printFun('kemuyue')"
            >打印<i class="el-icon-warning"></i
          ></el-button>
        </div>
        <!-- 筛选 -->
        <div v-if="filtrateJudge" class="shaixuanBox" id="shaixuanBox">
          <el-form>
            <el-form-item>
              <!-- label="会计期间：" -->
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">会计期间:</el-col>
                <el-col :span="8">
                  <el-date-picker
                    value-format="yyyy-M"
                    v-model="hjqjStartTimeKMYE"
                    type="month"
                    placeholder="选择月"
                    @change="hjqjStartTimeObtainKMYE"
                  >
                  </el-date-picker>
                </el-col>
                <el-col class="line" :span="1">至</el-col>
                <el-col :span="8">
                  <el-date-picker
                    value-format="yyyy-M"
                    v-model="hjqjStartTimeKMYE"
                    type="month"
                    placeholder="选择月"
                    @change="hjqjStartTimeObtainKMYE"
                  >
                  </el-date-picker>
                </el-col>
                <el-col
                  class="line"
                  :span="1"
                  style="    display: flex;
    align-items: center;
    height: 30px;"
                >
                  <i class="el-icon-time" style="font-size:22px;"></i>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">起始科目:</el-col>
                <el-col :span="11">
                  <el-input
                    v-model="yunzhangfangform.qskmBm"
                    placeholder="请输入起始科目编号"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">结束科目:</el-col>
                <el-col :span="11">
                  <el-input
                    v-model="yunzhangfangform.jzkmBm"
                    placeholder="请输入结束科目编号"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">科目级次:</el-col>
                <el-col :span="5">
                  <div class="kemujici">
                    <span>{{ yunzhangfangform.qskmcj }}</span>
                    <div class="kemujici-right">
                      <el-button
                        icon="el-icon-caret-top"
                        @click="plusStart(1)"
                      ></el-button>
                      <el-button
                        icon="el-icon-caret-bottom"
                        @click="subtractStart(1)"
                      ></el-button>
                    </div>
                  </div>
                </el-col>
                <el-col class="line" :span="1">至</el-col>
                <el-col :span="5">
                  <div class="kemujici">
                    <span>{{ yunzhangfangform.jzkmcj }}</span>
                    <div class="kemujici-right">
                      <el-button
                        icon="el-icon-caret-top"
                        @click="plusStart(2)"
                      ></el-button>
                      <el-button
                        icon="el-icon-caret-bottom"
                        @click="subtractStart(2)"
                      ></el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div slot="footer" class="footer">
            <el-button @click="reset">重 置</el-button>
            <el-button type="primary" @click="submit('kemuyue')"
              >确 定</el-button
            >
          </div>
        </div>
      </div>

      <el-table :data="KemuYeData" fit id="KemuYeData_dom">
        <el-table-column
          property="date"
          label="科目编码"
          min-width="100"
          align="center"
          prop="kmbm"
        ></el-table-column>
        <el-table-column
          property="name"
          label="科目名称"
          width="180"
          align="center"
          prop="kmmc"
        ></el-table-column>
        <el-table-column property="address" label="期初余额" align="center">
          <el-table-column
            prop="qcJf"
            label="借方"
            min-width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="qcDf"
            label="贷方"
            min-width="100"
            align="center"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column property="address" label="本期发生额" align="center">
          <el-table-column
            prop="bqJf"
            label="借方"
            min-width="110"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bqDf"
            label="贷方"
            min-width="110"
            align="center"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          property="address"
          label="本年累计发生额"
          align="center"
        >
          <el-table-column
            prop="bnljJf"
            label="借方"
            min-width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bnljDf"
            label="贷方"
            min-width="100"
            align="center"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column property="address" label="期末余额" align="center">
          <el-table-column
            prop="qmJf"
            label="借方"
            min-width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="qmDf"
            label="贷方"
            min-width="100"
            align="center"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 总账 -->
    <el-dialog
      custom-class="order_dialog"
      width="80%"
      title="总账"
      :visible.sync="zongzhangJudge"
    >
      <div class="filtrate">
        <strong
          style=" margin-right: 10px;
    font-size: 14px;
    line-height: 30px;"
          >总账</strong
        >
        <div class="filtrate_time right10" @click="filtrate" ref="main">
          <strong>{{
            this.qJTimeListZongZhang[0]
              ? this.qJTimeListZongZhang[0] +
                "年第" +
                this.qJTimeListZongZhang[1] +
                "期"
              : "请选择"
          }}</strong>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-button
          icon="el-icon-refresh-right"
          style="font-size: 22px; padding:0px 10px; margin-right:30px;"
          @click="zhongzhang"
        ></el-button>
        <div class="print">
          <el-button type="primary" @click="printFun('zongzhang')"
            >打印<i class="el-icon-warning"></i
          ></el-button>
        </div>

        <!-- 筛选 -->
        <div
          v-if="filtrateJudgeZONGZ"
          class="shaixuanBox"
          style="left:38px;"
          id="shaixuanBoxZONGZ"
        >
          <el-form>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">会计期间:</el-col>
                <el-col :span="8">
                  <el-date-picker
                    value-format="yyyy-M"
                    v-model="hjqjStartTimeZZ"
                    type="month"
                    placeholder="选择月"
                    @change="hjqjStartTimeObtainZZ"
                  >
                  </el-date-picker>
                </el-col>
                <el-col class="line" :span="1">至</el-col>
                <el-col :span="8">
                  <el-date-picker
                    value-format="yyyy-M"
                    v-model="hjqjStartTimeZZ"
                    type="month"
                    placeholder="选择月"
                    @change="hjqjStartTimeObtainZZ"
                  >
                  </el-date-picker>
                </el-col>
                <el-col
                  class="line"
                  :span="1"
                  style="    display: flex;
    align-items: center;
    height: 30px;"
                >
                  <i class="el-icon-time" style="font-size:22px;"></i>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">起始科目:</el-col>
                <el-col :span="11">
                  <el-input
                    v-model="yunzhangfangform.qskmBm"
                    placeholder="请输入起始科目编号"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">结束科目:</el-col>
                <el-col :span="11">
                  <el-input
                    v-model="yunzhangfangform.jzkmBm"
                    placeholder="请输入结束科目编号"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">科目级次:</el-col>
                <el-col :span="5">
                  <div class="kemujici">
                    <span>{{ yunzhangfangform.qskmcj }}</span>
                    <div class="kemujici-right">
                      <el-button
                        icon="el-icon-caret-top"
                        @click="plusStart(1)"
                      ></el-button>
                      <el-button
                        icon="el-icon-caret-bottom"
                        @click="subtractStart(1)"
                      ></el-button>
                    </div>
                  </div>
                </el-col>
                <el-col class="line" :span="1">至</el-col>
                <el-col :span="5">
                  <div class="kemujici">
                    <span>{{ yunzhangfangform.jzkmcj }}</span>
                    <div class="kemujici-right">
                      <el-button
                        icon="el-icon-caret-top"
                        @click="plusStart(2)"
                      ></el-button>
                      <el-button
                        icon="el-icon-caret-bottom"
                        @click="subtractStart(2)"
                      ></el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div slot="footer" class="footer">
            <el-button @click="reset">重 置</el-button>
            <el-button type="primary" @click="submit('zongzhang')"
              >确 定</el-button
            >
          </div>
        </div>
      </div>
      <el-table
        :data="ZongZhangsData"
        border
        :span-method="objectSpanMethod"
        id="ZongZhangData_dom"
      >
        <el-table-column
          property="date"
          label="科目编码"
          min-width="150"
          align="center"
          prop="kmbm"
        ></el-table-column>
        <el-table-column
          property="date"
          label="科目名称"
          min-width="150"
          align="center"
          prop="kmmc"
        ></el-table-column>
        <el-table-column
          property="date"
          label="期间"
          min-width="150"
          align="center"
          prop="kjnd"
        >
          <template slot-scope="scope">
            {{ scope.row.kjnd ? scope.row.kjnd + "-" : ""
            }}{{ scope.row.kjqj || "" }}
          </template>
        </el-table-column>
        <el-table-column
          property="date"
          label="摘要"
          min-width="150"
          align="center"
          prop="zy"
        >
        </el-table-column>
        <el-table-column
          property="date"
          label="借方"
          min-width="150"
          align="center"
          prop="jf"
        ></el-table-column>
        <el-table-column
          property="date"
          label="贷方"
          min-width="150"
          align="center"
          prop="df"
        ></el-table-column>
        <el-table-column
          property="date"
          label="方向"
          min-width="150"
          align="center"
          prop="kmfx"
        ></el-table-column>
        <el-table-column
          property="date"
          label="余额"
          min-width="150"
          align="center"
          prop="ye"
        ></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 明细帐 -->
    <el-dialog
      custom-class="order_dialog"
      width="1200px"
      title="明细帐"
      :visible.sync="mingxizhangJudge"
      :data="mingxizhangData"
      class="mingxizhang"
    >
      <div class="filtrate">
        <el-select
          v-model="value"
          placeholder="请选择"
          class="right10"
          style="width:160px;"
        >
          <el-option
            v-for="item in mingxizhangOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="filtrate_time right10" @click="filtrate" ref="main">
          <strong>{{
            this.qJTimeListMingXiZhang[0]
              ? this.qJTimeListMingXiZhang[0] +
                "年第" +
                this.qJTimeListMingXiZhang[1] +
                "期"
              : "请选择"
          }}</strong>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-button
          icon="el-icon-refresh-right"
          style="font-size: 22px; padding:0px 10px; margin-right:30px;"
          @click="refresh('mingxizhang')"
        ></el-button>
        <!-- 筛选 -->
        <div
          v-if="filtrateJudgeMINGXIZ"
          class="shaixuanBox"
          id="shaixuanBoxMINGXIZ"
        >
          <el-form>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">会计期间:</el-col>
                <el-col :span="8">
                  <el-date-picker
                    value-format="yyyy-M"
                    v-model="hjqjStartTimeMXZ"
                    type="month"
                    placeholder="选择月"
                    @change="hjqjStartTimeObtainMXZ"
                  >
                  </el-date-picker>
                </el-col>
                <el-col class="line" :span="1">至</el-col>
                <el-col :span="8">
                  <el-date-picker
                    value-format="yyyy-M"
                    v-model="hjqjStartTimeMXZ"
                    type="month"
                    placeholder="选择月"
                    @change="hjqjStartTimeObtainMXZ"
                  >
                  </el-date-picker>
                </el-col>
                <el-col
                  class="line"
                  :span="1"
                  style="    display: flex;
    align-items: center;
    height: 30px;"
                >
                  <i class="el-icon-time" style="font-size:22px;"></i>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">起始科目:</el-col>
                <el-col :span="11">
                  <el-input
                    v-model="yunzhangfangform.qskmBm"
                    placeholder="请输入起始科目编号"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">结束科目:</el-col>
                <el-col :span="11">
                  <el-input
                    v-model="yunzhangfangform.jzkmBm"
                    placeholder="请输入结束科目编号"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">科目级次:</el-col>
                <el-col :span="5">
                  <div class="kemujici">
                    <span>{{ yunzhangfangform.qskmcj }}</span>
                    <div class="kemujici-right">
                      <el-button
                        icon="el-icon-caret-top"
                        @click="plusStart(1)"
                      ></el-button>
                      <el-button
                        icon="el-icon-caret-bottom"
                        @click="subtractStart(1)"
                      ></el-button>
                    </div>
                  </div>
                </el-col>
                <el-col class="line" :span="1">至</el-col>
                <el-col :span="5">
                  <div class="kemujici">
                    <span>{{ yunzhangfangform.jzkmcj }}</span>
                    <div class="kemujici-right">
                      <el-button
                        icon="el-icon-caret-top"
                        @click="plusStart(2)"
                      ></el-button>
                      <el-button
                        icon="el-icon-caret-bottom"
                        @click="subtractStart(2)"
                      ></el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div slot="footer" class="footer">
            <el-button @click="reset">重 置</el-button>
            <el-button type="primary" @click="submit('mingxizhang')"
              >确 定</el-button
            >
          </div>
        </div>
      </div>
      <el-row>
        <el-col :span="leftSpan">
          <div class="kmTitle">
            <strong v-if="rightSpan != 1"
              >科目：{{ seekCondition.id || ""
              }}{{ seekCondition.name || "" }}</strong
            >
          </div>

          <el-table :data="mingxizhangData" border>
            <el-table-column
              property="date"
              label="日期"
              width="150"
              align="center"
              prop="date"
            ></el-table-column>
            <el-table-column
              property="date"
              label="凭证字号"
              width="150"
              align="center"
              prop="pzzh"
            ></el-table-column>
            <el-table-column
              property="date"
              label="摘要"
              width="150"
              align="center"
              prop="zy"
            ></el-table-column>
            <el-table-column
              property="date"
              label="借方"
              width="158"
              align="center"
              prop="jf"
            ></el-table-column>
            <el-table-column
              property="date"
              label="贷方"
              width="160"
              align="center"
              prop="df"
            ></el-table-column>
            <el-table-column
              property="date"
              label="方向"
              width="160"
              align="center"
              prop="kmfx"
            ></el-table-column>

            <el-table-column
              property="date"
              label="余额"
              width="160"
              align="center"
              prop="ye"
            ></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="rightSpan">
          <div class="lmmingxi_left">
            <div class="lmmingxi_left_title">
              <strong v-if="rightSpan != 1"
                >科目：{{ seekCondition.id || ""
                }}{{ seekCondition.name || "" }}</strong
              >
              <!-- <i class="el-icon-d-arrow-right" @click="leftSpan=23,rightSpan=1"></i> -->
              <i class="el-icon-d-arrow-right" @click="cutRight"></i>
            </div>
            <el-select
              v-model="seekNum"
              placeholder="请选择"
              @change="selectChange"
              v-if="rightSpan != 1"
            >
              <el-option
                v-for="item in seekList"
                :key="item.id"
                :label="item.label"
                :value="item.child"
              >
              </el-option>
            </el-select>
            <div
              v-for="(item, index) in showSeekList"
              :key="index"
              class="traversalBox"
              v-if="rightSpan != 1"
            >
              <div class="traversalBox_conten">
                <div class="sanjiao"></div>
                <i
                  class="el-icon-folder-opened"
                  @click="clickCondition(item)"
                ></i>
                <div
                  class="traversalBox_conten_name"
                  @click="clickCondition(item)"
                >
                  {{ item.id }}{{ item.name }}
                </div>
              </div>
              <div
                v-if="item.child"
                v-for="(items, indexs) in item.child"
                :key="indexs"
                class="traversalBox_child"
              >
                <i class="el-icon-document" @click="clickCondition(items)"></i>
                <div
                  class="traversalBox_conten_name"
                  @click="clickCondition(items)"
                >
                  {{ items.id }}{{ items.name }}
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 凭证汇总 -->
    <el-dialog
      custom-class="order_dialog"
      width="80%"
      title="凭证汇总"
      :visible.sync="pingzhenghuizongJudge"
    >
      <div class="filtrate">
        <div class="filtrate_time right10" @click="filtrate">
          <strong>{{
            this.qJTimeListPingZhengHuiZong[0]
              ? this.qJTimeListPingZhengHuiZong[0] +
                "年第" +
                this.qJTimeListPingZhengHuiZong[1] +
                "期"
              : "请选择"
          }}</strong>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-button
          icon="el-icon-refresh-right"
          style="font-size: 22px; padding:0px 10px; margin-right:30px;"
          @click="refresh('pingzhenghuizong')"
        ></el-button>
        <div class="font">
          凭证总张数：{{ pingzhenghuizongData.pzs || 0 }}张 附件总张数：{{
            pingzhenghuizongData.fjs || 0
          }}张
        </div>
        <div class="print">
          <el-button type="primary" @click="printFun('pingzhenghuizong')"
            >打印<i class="el-icon-warning"></i
          ></el-button>
        </div>
        <!-- <el-radio v-model="wbnljbxs" label="1">显示本年累计</el-radio>
      <el-radio v-model="radio" label="1">显示核算项目明显</el-radio> -->
        <!-- 筛选 -->
        <div
          v-if="filtrateJudgePINGZHENGHUIZ"
          class="shaixuanBox"
          style="left:0px;"
          id="shaixuanBoxPINGZHENGHUIZ"
        >
          <el-form>
            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">会计期间:</el-col>
                <el-col :span="8">
                  <el-date-picker
                    value-format="yyyy-M"
                    v-model="hjqjStartTimePZHZ"
                    type="month"
                    placeholder="选择月"
                    @change="hjqjStartTimeObtainPZHZ"
                  >
                  </el-date-picker>
                </el-col>
                <el-col class="line" :span="1">至</el-col>
                <el-col :span="8">
                  <el-date-picker
                    value-format="yyyy-M"
                    v-model="hjqjStartTimePZHZ"
                    type="month"
                    placeholder="选择月"
                    @change="hjqjStartTimeObtainPZHZ"
                  >
                  </el-date-picker>
                </el-col>
                <el-col
                  class="line"
                  :span="1"
                  style="    display: flex;
    align-items: center;
    height: 30px;"
                >
                  <i class="el-icon-time" style="font-size:22px;"></i>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item>
              <el-row :gutter="10" style="line-height: 32px;">
                <el-col class="line" :span="4">科目级次:</el-col>
                <el-col :span="5">
                  <div class="kemujici">
                    <span>{{ yunzhangfangform.qskmcj }}</span>
                    <div class="kemujici-right">
                      <el-button
                        icon="el-icon-caret-top"
                        @click="plusStart(1)"
                      ></el-button>
                      <el-button
                        icon="el-icon-caret-bottom"
                        @click="subtractStart(1)"
                      ></el-button>
                    </div>
                  </div>
                </el-col>
                <el-col class="line" :span="1">至</el-col>
                <el-col :span="5">
                  <div class="kemujici">
                    <span>{{ yunzhangfangform.jzkmcj }}</span>
                    <div class="kemujici-right">
                      <el-button
                        icon="el-icon-caret-top"
                        @click="plusStart(2)"
                      ></el-button>
                      <el-button
                        icon="el-icon-caret-bottom"
                        @click="subtractStart(2)"
                      ></el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div slot="footer" class="footer">
            <el-button @click="reset">重 置</el-button>
            <el-button type="primary" @click="submit('pingzhenghuizong')"
              >确 定</el-button
            >
          </div>
        </div>
      </div>
      <el-table
        :data="pingzhenghuizongData.pzhzList"
        border
        class="pingzhenghuizong"
        id="PingZhengHuiZongData_dom"
      >
        <el-table-column
          property="date"
          label="科目编码"
          min-width="180"
          align="center"
          prop="kmbm"
          style="color:pink;"
        ></el-table-column>
        <el-table-column
          property="date"
          label="科目名称"
          min-width="170"
          align="center"
          prop="kmmc"
        ></el-table-column>
        <el-table-column
          property="date"
          label="借方金额"
          min-width="170"
          align="center"
          prop="jf"
        ></el-table-column>
        <el-table-column
          property="date"
          label="贷方金额"
          min-width="170"
          align="center"
          prop="df"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import CourseBalance from "./courseBalance.vue"; //科目余额
import {
  getListKemuYe,
  getListKmZongZhangs, //总账
  getListKmMxzs, //明细账
  getListPzhz //凭证汇总
} from "@/api/crm/yunzhangfang/yunzhangfang";
import { mapState } from "vuex";
export default {
  components: {
    CourseBalance
  },
  props: {
    qyid: {
      type: [String, Number, Object],
      default: () => {
        return {};
      }
    }
  },
  name: "yunzhangfang",
  data() {
    return {
      // choiceJudge:'',//筛选时间判断
      leftSpan: 20,
      rightSpan: 4,
      cutRightValue: 1, //切换right是否显示判断值
      Judge: 1, //科目余额
      ZZJudge: 1, //总账
      MXZJudge: 1, //明细账
      PZHZJudge: 1, //凭证汇总
      checkList: ["选中且禁用", "显示本年累计"],
      filtrateJudge: false, //筛选条件
      filtrateJudgeZONGZ: false, //总账筛选条件
      filtrateJudgeMINGXIZ: false, //明细账筛选条件
      filtrateJudgePINGZHENGHUIZ: false, //凭证汇总筛选条件
      courseBalanceJudge: false, //科目余额判断条件
      zongzhangJudge: false, //总账判断条件
      mingxizhangJudge: false, //明细帐判断条件
      pingzhenghuizongJudge: false, //凭证汇总判断条件
      KemuYeData: [],
      ZongZhangsData: [],
      mingxizhangData: [], //明细帐
      pingzhenghuizongData: [], //凭证汇总
      hjqjStartTimeList: "", //开始
      hjqjEndTimeList: "", //结束
      hjqjStartTimeKMYE: "", //科目余额筛选-会计时间
      hjqjStartTimeZZ: "", //总账-筛选--会计期间
      hjqjStartTimeMXZ: "", //明细账--会计期间
      hjqjStartTimePZHZ: "", //凭证汇总--会计期间
      qJTimeList: [],
      qJTimeListKeMuYuE: [], //科目余额-会计期间
      qJTimeListZongZhang: [], //总账-会计期间
      qJTimeListMingXiZhang: [], //明细账--会计期间
      qJTimeListPingZhengHuiZong: [], //凭证汇总---会计期间
      // 请求数据
      yunzhangfangform: {
        // pageNo: 1,
        // pageSize: 10,
        jzkmcj: "",
        qskmcj: "",
        bzid: 0,
        endKjnd: 2021,//关联云帐房接口通了以后清空
        endKjqj: 6,//关联云帐房接口通了以后清空
        qyid: this.qyid,
        sfxsfzhs: false,
        sfzhbwb: true,
        startKjnd: 2021,//关联云帐房接口通了以后清空
        startKjqj: 6,//关联云帐房接口通了以后清空
        wbnljbxs: true,

        wfsebxs: false,
        wyebxs: false
      },
      options: [
        {
          value: "选项1",
          label: "科目余额表"
        },
        {
          value: "选项2",
          label: "数量金额科目余额表"
        }
      ],
      mingxizhangOptions: [
        {
          value: "选项1",
          label: "明细账"
        },
        {
          value: "选项2",
          label: "数量金额明细账"
        }
      ],
      value: "",
      numl: 1,
      numl2: 2,
      wbnljbxs: false,
      radio: "1",
      seekList: [
      ],
      seekNum: "",
      showSeekList: [],
      seekCondition: "", //点击条件值
      seekListBox: []
    };
  },
  created() {
    // this.gitList()
    // document.addEventListener("click", myFunction);
  },
  mounted() {
    document.addEventListener("click", this.bodyCloseMenus);
    document.addEventListener("click", this.bodyCloseMenusZONGZ);
    document.addEventListener("click", this.bodyCloseMenusMINGXIZ);
    document.addEventListener("click", this.bodyCloseMenusPINGZHENGHUIZONG);
  },
  computed: {
    // ...mapGetters(["sidebar", "avatar", "device", "name"]),
    ...mapState({
      // userInfo: state => state.user
      userInfo: state => state
    })
  },
  methods: {
    // 科目余额
    bodyCloseMenus(e) {
      var _con = document.getElementById("shaixuanBox");
      // console.info("科目余额全局点击判断");
      // console.info(this.Judge);
      // console.info(e);
      // console.info(_con.contains(e.target));
      if (this.Judge == 1) {
        if (_con) {
          if (!_con.contains(e.target)) {
            this.filtrateJudge = false;
            // this.Judge=1
          }
        }
      } else {
        // this.Judge++;
        this.filtrateJudge = true;
        this.Judge = 1;
      }
    },
    // 总帐
    bodyCloseMenusZONGZ(e) {
      var _con = document.getElementById("shaixuanBoxZONGZ");
      if (this.ZZJudge == 1) {
        if (_con) {
          if (!_con.contains(e.target)) {
            this.filtrateJudgeZONGZ = false;
            // this.ZZJudge=1
          }
        }
      } else {
        // this.ZZJudge++;
        this.filtrateJudgeZONGZ = true;
        this.ZZJudge = 1;
      }
    },
    // 明细账
    // MXZJudge
    bodyCloseMenusMINGXIZ(e) {
      var _con = document.getElementById("shaixuanBoxMINGXIZ");
      if (this.MXZJudge == 1) {
        if (_con) {
          if (!_con.contains(e.target)) {
            this.filtrateJudgeMINGXIZ = false;
            // this.MXZJudge=1
          }
        }
      } else {
        // this.MXZJudge++;
        this.filtrateJudgeZONGZ = true;
        this.MXZJudge = 1;
      }
    },
    // 凭证汇总
    bodyCloseMenusPINGZHENGHUIZONG(e) {
      var _con = document.getElementById("shaixuanBoxPINGZHENGHUIZ");
      if (this.PZHZJudge == 1) {
        if (_con) {
          if (!_con.contains(e.target)) {
            this.filtrateJudgePINGZHENGHUIZ = false;
            // this.PZHZJudge=1
            // this.PZHZJudge++;
          }
        }
      } else {
        this.filtrateJudgePINGZHENGHUIZ = true;
        // this.PZHZJudge++;
        this.PZHZJudge = 1;
      }
    },
    hjqjStartTimeObtain(e) {
      this.hjqjStartTimeList = e;
      this.qJTimeList = e.split("-");
    },
    // 科目余额-筛选-会计期间
    hjqjStartTimeObtainKMYE(e) {
      this.hjqjStartTimeKMYE = e;
      this.qJTimeListKeMuYuE = e.split("-");
    },
    // 总账-筛选-会计期间
    hjqjStartTimeObtainZZ(e) {
      this.hjqjStartTimeZZ = e;
      this.qJTimeListZongZhang = e.split("-");
    },
    // 明细账-筛选-会计期间
    hjqjStartTimeObtainMXZ(e) {
      this.hjqjStartTimeMXZ = e;
      this.qJTimeListMingXiZhang = e.split("-");
    },
    //凭证汇总-筛选-会计期间
    hjqjStartTimeObtainPZHZ(e) {
      this.hjqjStartTimePZHZ = e;
      this.qJTimeListPingZhengHuiZong = e.split("-");
    },
    // 显示本年累计
    xianshibennianLj() {
      this.yunzhangfangform.wbnljbxs = !this.yunzhangfangform.wbnljbxs;
      this.km();
    },
    // 显示审核项目明细
    xianshishenhexiangmuMX() {
      this.yunzhangfangform.sfxsfzhs = !this.yunzhangfangform.sfxsfzhs;
      this.km();
    },
    // 表单清空
    empty() {
      this.yunzhangfangform = {
        jzkmcj: "",
        qskmcj: "",
        bzid: 0,
        endKjnd: 2021,
        endKjqj: 5,
        qyid: "",
        sfxsfzhs: false,
        sfzhbwb: true,
        startKjnd: 2021,
        startKjqj: 5,
        wbnljbxs: false,
        wfsebxs: false,
        wyebxs: false
      };
      // this.hjqjStartTimeList = ""; //开始
      this.hjqjEndTimeList = ""; //结束
      // this.qJTimeList=[];
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    plusStart(sum) {
      if (sum == 1) {
        this.numl++;
        this.yunzhangfangform.qskmcj++;
      } else {
        this.numl2++;
        this.yunzhangfangform.jzkmcj++;
      }
    },
    subtractStart(sum) {
      if (sum == 1) {
        if (this.numl == 0) {
          this.numl = 0;
          this.yunzhangfangform.qskmcj = 0;
        } else {
          this.numl--;
          this.yunzhangfangform.qskmcj--;
        }
      } else {
        if (this.numl2 == 0) {
          this.numl2 = 0;
          this.yunzhangfangform.jzkmcj = 0;
        } else {
          this.numl2--;
          this.yunzhangfangform.jzkmcj--;
        }
      }
    },
    reset() {
      this.yunzhangfangform = {
        jzkmcj: 0,
        qskmcj: 0,
        bzid: 0,
        endKjnd: "",
        endKjqj: "",
        qyid: null,
        sfxsfzhs: false,
        sfzhbwb: true,
        startKjnd: "",
        startKjqj: "",
        wbnljbxs: false,
        wfsebxs: false,
        wyebxs: false
      };
      // this.hjqjStartTimeList = ""; //开始
      this.hjqjEndTimeList = ""; //结束
    },
    filtrate() {
      console.info("筛选啦");
      // this.filtrateJudge = true;
      //
      this.filtrateJudge = !this.filtrateJudge;
      this.filtrateJudgeZONGZ = !this.filtrateJudgeZONGZ;
      this.filtrateJudgeMINGXIZ = !this.filtrateJudgeMINGXIZ;
      this.filtrateJudgePINGZHENGHUIZ = !this.filtrateJudgePINGZHENGHUIZ;
      //  this.filtrateJudge = true;
      // this.filtrateJudgeZONGZ = true;
      // this.filtrateJudgeMINGXIZ = true;
      // this.filtrateJudgePINGZHENGHUIZ=true;
      this.Judge++;
      this.ZZJudge++;
      this.MXZJudge++;
      this.PZHZJudge++;
      // this.filtrateJudgeMINGXIZ = false;
      // this.filtrateJudgeZONGZ = false;
      // this.filtrateJudge = false;
      this.yunzhangfangform.jzkmcj = 0;
      this.yunzhangfangform.qskmcj = 0;
      this.hjqjEndTimeList = ""; //结束
    },
    submit(name) {
      if (this.yunzhangfangform.jzkmcj == 0) {
        this.yunzhangfangform.jzkmcj = "";
      }
      if (this.yunzhangfangform.qskmcj == 0) {
        this.yunzhangfangform.qskmcj = "";
      }
      if (name == "kemuyue") {
        this.yunzhangfangform.startKjnd = this.qJTimeListKeMuYuE[0];
        this.yunzhangfangform.startKjqj = this.qJTimeListKeMuYuE[1];
        this.yunzhangfangform.endKjnd = this.qJTimeListKeMuYuE[0];
        this.yunzhangfangform.endKjqj = this.qJTimeListKeMuYuE[1];
        this.km();
      }
      if (name == "zongzhang") {
        console.info("总账---");
        console.info(this.yunzhangfangform);
        this.yunzhangfangform.startKjnd = this.qJTimeListZongZhang[0];
        this.yunzhangfangform.startKjqj = this.qJTimeListZongZhang[1];
        this.yunzhangfangform.endKjnd = this.qJTimeListZongZhang[0];
        this.yunzhangfangform.endKjqj = this.qJTimeListZongZhang[1];
        this.zhongzhang();
      }
      if (name == "mingxizhang") {
        this.yunzhangfangform.startKjnd = this.qJTimeListMingXiZhang[0];
        this.yunzhangfangform.startKjqj = this.qJTimeListMingXiZhang[1];
        this.yunzhangfangform.endKjnd = this.qJTimeListMingXiZhang[0];
        this.yunzhangfangform.endKjqj = this.qJTimeListMingXiZhang[1];
        this.mingxizhang();
      }
      if (name == "pingzhenghuizong") {
        this.yunzhangfangform.startKjnd = this.qJTimeListPingZhengHuiZong[0];
        this.yunzhangfangform.startKjqj = this.qJTimeListPingZhengHuiZong[1];
        this.yunzhangfangform.endKjnd = this.qJTimeListPingZhengHuiZong[0];
        this.yunzhangfangform.endKjqj = this.qJTimeListPingZhengHuiZong[1];
        this.pingzhenghuizong();
      }
      this.empty();
      this.filtrateJudge = false;
      this.filtrateJudgeZONGZ = false;
      this.filtrateJudgeMINGXIZ = false;
      this.filtrateJudgePINGZHENGHUIZ = false;
    },
    // 科目余额
    km() {
      this.courseBalanceJudge = true;
      console.info("科目余额请求接口");
      console.info(this.Judge);
      this.Judge = 1;
      this.filtrateJudge = false;
      console.info(this.yunzhangfangform);
      getListKemuYe(this.yunzhangfangform).then(response => {
        console.info(response);
        this.KemuYeData = response.data;
      });
    },
    // 总账
    zhongzhang() {
      this.yunzhangfangform.sfxsfzhs = "";
      this.yunzhangfangform.wbnljbxs = "";
      this.yunzhangfangform.wbnljbxs = "";
      this.yunzhangfangform.wfsebxs = "";
      this.yunzhangfangform.wyebxs = "";
      this.yunzhangfangform.bzid = "";
      // this.yunzhangfangform = {
      //   sfzhbwb: true,
      //   endKjnd: 2021,
      //   endKjqj: 5,
      //   qyid: "846772989331415041",
      //   startKjnd: 2021,
      //   startKjqj: 5
      // };
      this.zongzhangJudge = true;
      this.ZZJudge = 1;
      this.filtrateJudgeZONGZ = false;
      console.info("总账请求接口");
      console.info(this.Judge);
      getListKmZongZhangs(this.yunzhangfangform).then(response => {
        // this.ZongZhangsData=response.data
        var data = [];
        response.data.forEach(element => {
          element.childrenList.forEach(item => {
            if (item.kmfx == 1) {
              item.kmfx = "借";
            } else if (item.kmfx == 0) {
              item.kmfx = "平";
            } else if (item.kmfx == -1) {
              item.kmfx = "贷";
            }
            data.push(item);
          });
        });
        this.ZongZhangsData = data;
      });
    },
    // 明细账
    mingxizhang() {
      this.yunzhangfangform.sfxsfzhs = "";
      this.yunzhangfangform.wbnljbxs = "";
      this.yunzhangfangform.wbnljbxs = "";
      this.yunzhangfangform.wfsebxs = "";
      this.yunzhangfangform.wyebxs = "";
      this.yunzhangfangform.bzid = "";
      this.mingxizhangJudge = true;
      this.MXZJudge = 1;
      this.filtrateJudgeMINGXIZ = false;
      getListKmMxzs(this.yunzhangfangform).then(response => {
        // this.mingxizhangData = response.data;
        var data = [];
        // seekList
        var seekList = [];
        var seekListBox = [];
        // 展示条件
        var showSeekList = [];
        response.data.forEach((element, index) => {
          console.info("循环啦啦啦");
          console.info(element);
          seekListBox.push({ id: element.sjkmbm, child: element.childrenList });
          console.info(seekListBox);
          seekList.push({
            label: element.sjkmbm + element.kmqc,
            child: {
              id: element.sjkmbm,
              name: element.kmqc
            },
            value: "选项" + (Number(seekList.length) + Number(1))
          });
          seekList.push({
            label: element.kmbm + element.kmmc,
            child: { id: element.kmbm, name: element.kmmc },
            value: "选项" + (Number(seekList.length) + Number(1))
          });

          if (element.childrenList != []) {
            showSeekList.push({
              id: element.sjkmbm,
              name: element.kmqc,
              child: [{ id: element.kmbm, name: element.kmmc }]
            });
          } else {
            showSeekList.push({
              id: element.sjkmbm,
              name: element.kmqc,
              child: []
            });
          }
          element.childrenList.forEach(item => {
            if (item.kmfx == 1) {
              item.kmfx = "借";
            } else if (item.kmfx == 0) {
              item.kmfx = "平";
            } else if (item.kmfx == -1) {
              item.kmfx = "贷";
            }
            data.push(item);
          });
        });
        this.seekCondition = showSeekList[0];
        this.seekList = seekList;
        this.showSeekList = showSeekList;
        this.seekListBox = seekListBox;
        // this.mingxizhangData = data;
        this.mingxizhangData = seekListBox[0].child;
        console.info("循环啦啦啦---展示");
        console.info(this.seekCondition);
        console.info(seekListBox);
        console.info(showSeekList[0].child);
      });
    },
    // 凭证汇总
    pingzhenghuizong() {
      this.pingzhenghuizongJudge = true;
      this.filtrateJudgePINGZHENGHUIZ = false;
      console.info("凭证汇总");
      console.info(this.pingzhenghuizongJudge);
      this.PZHZJudge = 1;
      getListPzhz(this.yunzhangfangform).then(response => {
        this.pingzhenghuizongData = response.data;
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 1) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    // left搜索条件
    clickCondition(item) {
      this.seekCondition = item;
      this.yunzhangfangform.id = item.id;
      this.seekListBox.forEach((items, index) => {
        //  if(items.id==item.id){
        if (items.id == item.id || items.child[0].kmbm == item.id) {
          return (this.mingxizhangData = items.child);
        }
      });
    },
    selectChange(item) {
      this.seekNum = item.id + item.name;
      this.seekCondition = item;
      this.yunzhangfangform.id = item.id;
      this.seekListBox.forEach((items, index) => {
        if (items.id == item.id || items.child[0].kmbm == item.id) {
          return (this.mingxizhangData = items.child);
        }
      });
    },
    // 刷新
    refresh(name) {
      this.yunzhangfangform = {
        endKjnd: 2021,
        endKjqj: 5,
        // qyid: "846772989331415041",
        qyid:"",
        startKjnd: 2021,
        startKjqj: 5
      };
      if (name == "pingzhenghuizong") {
        this.qJTimeListPingZhengHuiZong = [];
        this.pingzhenghuizong();
      } else if (name == "mingxizhang") {
        console.info("刷新");
        this.qJTimeListMingXiZhang = [];
        this.mingxizhang();
      }
    },
    // 切换right选择栏
    cutRight() {
      console.info("切换right选择栏");
      this.cutRightValue++;
      if (this.cutRightValue % 2 == 0) {
        console.info("切换right选择栏----关闭");
        console.info(this.cutRightValue);
        this.leftSpan = 23;
        this.rightSpan = 1;
      } else {
        console.info("切换right选择栏----打开");
        console.info(this.cutRightValue);
        this.leftSpan = 20;
        this.rightSpan = 4;
      }
    },
    // 打印
    printFun(name) {
      // let obj = document.getElementById("KemuYeData_dom");
      var obj = null;
      if (name == "kemuyue") {
        obj = document.getElementById("KemuYeData_dom");
      } else if (name == "zongzhang") {
        obj = document.getElementById("ZongZhangData_dom");
      } else if (name == "pingzhenghuizong") {
        obj = document.getElementById("PingZhengHuiZongData_dom");
      }
      console.info("打印");
      console.info(obj);
      var docStr = obj.innerHTML;
      var newWindow = window.open("打印窗口", "_blank");
      newWindow.document.write(docStr);
      newWindow.document.close();
      newWindow.print();
      newWindow.close();
    }
  }
};
</script>
<style lang="scss">
.v-modal {
  background-color: transparent;
  z-index: 2000 !important;
}
.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5);
}

.yunzhangfang {
  .mingxizhang {
    .el-table {
      margin-top: 0px;
    }
  }

  .pingzhenghuizong {
    td:nth-child(1) {
      .cell {
        color: #60c7d0 !important;
      }
    }
  }
  .el-table__body-wrapper {
    max-height: 500px;
    overflow: auto;
  }
  .order_dialog .el-table {
    // border-right: 1px solid #e6e7eb;
  }

  .el-table .cell {
    line-height: 28px;
  }
  .order_dialog {
    min-height: 600px;
  }
  .order_dialog .el-table .el-table__header-wrapper th.is-leaf {
    border-bottom: 1px solid #e6e7eb;
    border-right: 1px solid #e6e7eb;
  }
  .el-table__body-wrapper {
    width: calc(100% - -17px);
  }
}
</style>
<style scoped lang="scss">
.yunzhangfang {
  .filtrate {
    margin-left: 32px;
    margin-right: 32px;
    display: flex;
    position: relative;
    .right10 {
      margin-right: 10px;
    }
    .filtrate_time {
      width: 160px;
      border-radius: 2px;
      border: 1px solid #dcdfe6;
      height: 32px;
      line-height: 32px;
      padding-left: 15px;
      // padding-right: 30px;
      padding-right: 4px;
      display: flex;
      justify-content: space-between;
      // position: relative;
      i {
        line-height: 30px;
      }
      strong {
        font-size: 14px;
        color: #555;
      }
    }
    .shaixuanBox {
      width: 500px;
      height: 400px;
      padding: 0 20px;
      border: 1px solid #dcdfe6;
      position: absolute;
      top: 31px;
      left: 170px;
      background-color: #fff;
      z-index: 2;
      .kemujici {
        border: 1px solid #dcdfe6;
        padding-left: 5px;
        display: flex;
        justify-content: space-between;
        .kemujici-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .el-button--small {
            padding: 1px 0px;
          }
          .el-button {
            margin: 0px;
          }
        }
      }
      .footer {
        position: absolute;
        bottom: 10px;
        right: 30px;
      }
    }
  }
  .font {
    text-align: center;
    line-height: 32px;
  }
  .kmTitle {
    line-height: 30px;
    font-size: 14px;
    font-weight: bold;
    color: #60c7d0;
    margin-top: 24px;
    margin-left: 32px;
  }
  .print {
    position: absolute;
    right: 0px;
    i {
      margin-left: 5px;
    }
  }
  .lmmingxi_left {
    padding-top: 24px;
    .lmmingxi_left_title {
      padding: 3px 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #e7ecf1;
      > strong {
        font-size: 14px;
        font-weight: bold;
        color: #60c7d0;
        height: 24px;
        line-height: 24px;
      }
      > i {
        color: #60c7d0;
      }
    }
    .traversalBox {
      .traversalBox_conten {
        display: flex;
        align-items: center;
        line-height: 24px;
        position: relative;
        .sanjiao {
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-bottom: 6px solid #262626;
          margin-right: 5px;
          // position: absolute;
          // left: 0px;
          // bottom: 0px;
        }
        > i {
          margin-right: 5px;
          color: #f6d19b;
        }
        .traversalBox_conten_name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .traversalBox_child {
        display: flex;
        align-items: center;
        padding-left: 15px;
        line-height: 24px;
        > i {
          margin-right: 5px;
          color: #f6d19b;
        }
        .traversalBox_conten_name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
