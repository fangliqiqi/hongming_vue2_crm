<template>
  <!-- set -->
  <div class="app-container set">
    <div class="search-vi">
      <!-- <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            trigger="manual"
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
              @click="showSearch = !showSearch"
              >筛选<i
                class="el-icon-s-operation el-icon--right"
              ></i> </el-button
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
      </el-row> -->
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>
    <div class="tabbar-vi">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="选项值设置" name="first">
          <div class="table-data" style="padding-left: 0px !important">
            <div
              style="
                display: flex;
                justify-content: flex-end;
                margin-bottom: 15px;
              "
            >
              <el-button type="warning" plain @click="handleExport"
                >导出</el-button
              >
              <el-button type="primary" plain @click="bulkImport"
                >导入</el-button
              >
              <el-button type="primary" @click="addExpenditureType(-1)"
                >新增</el-button
              >
              <!-- <el-button type="danger">删除</el-button> -->
              <el-tooltip
                class="item"
                effect="dark"
                content="刷新"
                placement="top"
              >
                <el-button
                  circle
                  icon="el-icon-refresh"
                  @click="getExpenditureType"
                  style="margin-left: 10px"
                />
              </el-tooltip>
            </div>
            <el-tabs tab-position="left" v-model="expenditure">
              <el-tab-pane label="支出类型" name="expenditure">
                <div class="table-data" style="margin-top: 0px; padding: 0px">
                  <el-table :data="expenditureList">
                    <!-- <el-table-column type="selection" width="55" /> -->
                    <el-table-column label="科目代码" prop="sort" />
                    <el-table-column label="科目名称" prop="accountName" />
                    <el-table-column label="科目类别" prop="accountCategory" />
                    <el-table-column label="余额方向" prop="balanceDirection" />
                    <el-table-column label="全名" prop="fullName" />
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          plain
                          @click="addExpenditureType(scope.row)"
                        >
                          新增
                        </el-button>
                        <el-button
                          type="warning"
                          plain
                          @click="modifyExpenditureType(scope.row)"
                        >
                          修改
                        </el-button>
                        <el-button
                          type="danger"
                          plain
                          @click="delExpenditureType(scope.row.id)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <pagination
                    v-show="total > 0"
                    :total="total"
                    :page.sync="queryParams.pageNo"
                    :limit.sync="queryParams.pageSize"
                    @pagination="getExpenditureType"
                  />
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="权限设置" name="second">
          <div class="table-data">
            <el-tabs tab-position="left">
              <el-tab-pane label="收款审核权限">
                <el-row>
                  <el-col :span="24" style="margin-bottom:27px"
                    ><div
                      style="
font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;
line-height: 24px;"
                    >
                      收付款账户
                    </div></el-col
                  >
                  <el-col :span="24" style="margin-bottom:96px"
                    ><div>
                      <el-checkbox-group
                        v-model="checkedCities"
                        @change="handleCheckedCitiesChange"
                      >
                        <el-checkbox
                          v-for="city in cities"
                          :label="city"
                          :key="city"
                          >{{ city }}</el-checkbox
                        >
                      </el-checkbox-group>
                    </div></el-col
                  >
                  <el-col :span="24">
                    <el-button
                      type="primary"
                      icon="el-icon-plus"
                      @click="addOption"
                      >添加选项</el-button
                    >
                    <el-button type="danger" plain>删除</el-button>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="收费数据导出">
                <el-row>
                  <el-col :span="24" style="margin-bottom:27px"
                    ><div
                      style="
font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;
line-height: 24px;"
                    >
                      收费数据导出
                    </div></el-col
                  >
                  <el-col :span="24" style="margin-bottom:96px"
                    ><div>
                      <el-checkbox-group
                        v-model="checkedCities"
                        @change="handleCheckedCitiesChange"
                      >
                        <el-checkbox
                          v-for="city in cities"
                          :label="city"
                          :key="city"
                          >{{ city }}</el-checkbox
                        >
                      </el-checkbox-group>
                    </div></el-col
                  >
                  <el-col :span="24">
                    <el-button type="primary" icon="el-icon-plus"
                      >添加选项</el-button
                    >
                    <el-button type="danger" plain>删除</el-button>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane> -->
        <!-- <el-tab-pane label="流程设置" name="third">
          <div class="table-data">
            <div class="step">
              <el-row>
                <el-col :span="24">
                  <div
                    style="
 padding-bottom:21px;
font-size: 16px;
 border-bottom:1px solid #E6E7EB;margin-bottom:42px;"
                  >
                    支出设置
                  </div>
                </el-col>
              </el-row>
              <el-steps direction="vertical" :active="10">
                <el-step>
                  <template slot="title">
                    <div class="title_wrap">
                      <span class="left">提出支出申请</span>
                      <span class="right"
                        ><span>任何人都可以申请</span>
                        <div></div
                      ></span>
                    </div>
                  </template>
                </el-step>
                <el-step title="支出审核">
                  <template slot="title">
                    <div class="title_wrap">
                      <span class="left">支出审核</span>
                      <span class="right">
                        <span>可指定人员拥有支出审核权限</span>
                        <div class="tag-vi">
                          <el-tag
                            :key="tag"
                            v-for="tag in cusList"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)"
                            class="staff"
                          >
                            {{ tag }}
                          </el-tag>
                          <el-input
                            class="input-new-tag  addInput"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                          >
                          </el-input>
                          <el-button
                            class="button-new-tag"
                            size="small"
                            @click="showInput"
                            icon="el-icon-plus"
                            >添加人员
                          </el-button>
                        </div>
                      </span>
                    </div>
                  </template>
                </el-step>
                <el-step title="财务审核">
                  <template slot="title">
                    <div class="title_wrap">
                      <span class="left">财务审核</span>
                      <span class="right"
                        ><span>可指定人员拥有财务审核权限</span>
                        <div class="tag-vi">
                          <el-tag
                            :key="tag"
                            v-for="tag in cusList"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)"
                            class="staff"
                          >
                            {{ tag }}
                          </el-tag>
                          <el-input
                            class="input-new-tag addInput"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                          >
                          </el-input>
                          <el-button
                            class="button-new-tag"
                            size="small"
                            @click="showInput"
                            icon="el-icon-plus"
                            >添加人员
                          </el-button>
                        </div></span
                      >
                    </div>
                  </template>
                </el-step>
                <el-step title="出纳审核">
                  <template slot="title">
                    <div class="title_wrap">
                      <span class="left">出纳审核</span>
                      <span class="right"
                        ><span>可指定人员拥有出纳审核确认权限</span>
                        <div class="tag-vi">
                          <el-tag
                            :key="tag"
                            v-for="tag in cusList"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)"
                            class="staff"
                          >
                            {{ tag }}
                          </el-tag>
                          <el-input
                            class="input-new-tag addInput"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                          >
                          </el-input>
                          <el-button
                            class="button-new-tag"
                            size="small"
                            @click="showInput"
                            icon="el-icon-plus"
                            >添加人员
                          </el-button>
                        </div></span
                      >
                    </div>
                  </template>
                </el-step>
              </el-steps>
            </div>
          </div>
        </el-tab-pane> -->
        <el-tab-pane label="支付设置" name="fourth">
          <div
            class="table-data"
            style="
              display: flex;
              flex-direction: column;
              padding-right: 24px;
              padding-left: 24px;
            "
          >
            <div
              style="
                margin-bottom: 24px;
                display: flex;
                justify-content: space-between;
              "
            >
              <span>
                <el-button
                  round
                  :class="type == 10 ? 'bgBlue' : 'bgColor'"
                  type="primary"
                  @click="getPaymentPlan(10)"
                >
                  财税线
                </el-button>
                <el-button
                  round
                  :class="type == 20 ? 'bgBlue' : 'bgColor'"
                  type="primary"
                  @click="getPaymentPlan(20)"
                >
                  房产线
                </el-button>
                <el-button
                  round
                  :class="type == 30 ? 'bgBlue' : 'bgColor'"
                  type="primary"
                  @click="getPaymentPlan(30)"
                >
                  招聘线
                </el-button>
              </span>
              <span>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="addPaymentOptions"
                  circle
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletPatternPayment"
                  circle
                ></el-button>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="刷新"
                  placement="top"
                >
                  <el-button
                    circle
                    icon="el-icon-refresh"
                    @click="getPaymentPlan(10)"
                    style="margin-left: 10px"
                  />
                </el-tooltip>
              </span>
            </div>
            <div>
              <el-table
                class="slither"
                :data="companyList"
                @selection-change="handleSelectionChange"
                :height="tableHeight"
              >
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column
                  label="城市"
                  align="left"
                  width="150"
                  prop="cityCode"
                >
                  <template slot="header">
                    <div style="display: flex">
                      <span>城市</span>
                      <span
                        style="
                          display: flex;
                          flex-direction: column;
                          margin-left: 5px;
                        "
                        @click="sortChange"
                      >
                        <i
                          class="el-icon-caret-top"
                          :class="sortCheck == true ? 'Blue' : ''"
                        ></i>
                        <i
                          class="el-icon-caret-bottom"
                          :class="sortCheck == false ? 'Blue' : ''"
                        ></i>
                      </span>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    {{ scope.row.province }}{{ scope.row.city }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="支付方式"
                  align="left"
                  prop="patternPayment"
                  width="180"
                />
                <el-table-column
                  label="支付账号"
                  align="left"
                  prop="payAccount"
                  width="220"
                />
                <el-table-column label="户名" align="left" prop="accountName" />
                <el-table-column
                  label="开户行"
                  align="left"
                  prop="accountBank"
                />
                <el-table-column
                  label="支付二维码"
                  align="left"
                  prop="payUrl"
                  width="180"
                >
                  <template slot-scope="scope">
                    <el-button type="text" @click="PaymentQRCode(scope.row)">
                      支付二维码
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="费率"
                  align="left"
                  prop="currentRate"
                  width="150"
                />

                <el-table-column
                  label="操作"
                  class-name="small-padding fixed-width"
                  width="180px"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="modifyPaymentMethod(scope.row)"
                    >
                      修改
                    </el-button>
                    <el-button type="text" @click="delSingle(scope.row)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="queryParams.pageNo"
              :limit.sync="queryParams.pageSize"
              @pagination="getPaymentPlan(type)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="公章设置" name="five">
          <div
            class="table-data"
            style="
              display: flex;
              flex-direction: column;
              padding-right: 24px;
              padding-left: 24px;
            "
          >
            <div
              style="
                margin-bottom: 24px;
                display: flex;
                justify-content: space-between;
              "
            >
              <span>
                <!-- <el-button type="warning" @click="getPaymentPlan(10)">
                  修改
                </el-button> -->
                <el-button type="primary" @click="addOfficialSeal">
                  新增
                </el-button>
                <el-button type="danger" @click="batchDeletion">
                  批量删除
                </el-button>
              </span>
              <span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="刷新"
                  placement="top"
                >
                  <el-button
                    circle
                    icon="el-icon-refresh"
                    @click="getMarketOfficialSeal"
                    style="margin-left: 10px"
                  />
                </el-tooltip>
              </span>
            </div>
            <div>
              <el-table
                class="slither"
                :data="officialSealList"
                @selection-change="handleSelectionChange"
                :height="tableHeight"
              >
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column
                  label="公章名称"
                  align="left"
                  prop="officialSealName"
                />
                <el-table-column
                  label="所属公司"
                  align="left"
                  prop="companyName"
                />
                <el-table-column label="电子公章" align="left" prop="payUrl">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="openElectronicSeal(scope.row)"
                    >
                      电子公章
                    </el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  label="操作"
                  class-name="small-padding fixed-width"
                >
                  <template slot-scope="scope">
                    <el-button type="text" @click="modifySeal(scope.row)">
                      修改
                    </el-button>
                    <el-button type="text" @click="delSeal(scope.row)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <pagination
              v-show="officialSealTotal > 0"
              :total="officialSealTotal"
              :page.sync="queryParams.pageNo"
              :limit.sync="queryParams.pageSize"
              @pagination="getMarketOfficialSeal()"
            />
          </div>
        </el-tab-pane>



        <el-tab-pane label="净业绩设置" name="six">
          <div
            class="table-data"
            style="
              display: flex;
              flex-direction: column;
              padding-right: 24px;
              padding-left: 24px;
            "
          >
            <div
              style="
                margin-bottom: 24px;
              "
            >
                <div class="cais">财税钱</div> 
                <div class="chech">
                    <span>
                       <!-- <el-button type="warning" @click="changeNP">
                        修改
                      </el-button> -->
                      <el-button type="primary" @click="openOffPerformanceSeal">
                        新增
                      </el-button>
                      <el-button type="danger" @click="deleteNetPer">
                        删除
                      </el-button>
                    </span>
                    <span>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="刷新"
                        placement="top"
                      >
                        <el-button
                          circle
                          icon="el-icon-refresh"
                          @click="getNetPerformanceSeal"
                          style="margin-left: 10px"
                        />
                      </el-tooltip>
                    </span>

                </div>
            </div>
          
            <div>
              <el-table
                class="slither"
                :data="netPerformanceList"
                @selection-change="handleSelectionChange"
                :height="tableHeight"
              >
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column
                  label="类型"
                  align="left"
                  prop="officialSealName"
                />
                <el-table-column
                  label="适用项目"
                  align="left"
                  prop="companyName"
                />
                <el-table-column label="计算公式" align="left" prop="payUrl">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="openElectronicSeal(scope.row)"
                    >
                      电子公章
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  class-name="small-padding fixed-width"
                >
                
                  <template slot-scope="scope">
                      <el-button type="text" @click="DisableBtn(scope.row)">
                          禁用/停用
                      </el-button>
                       <el-button type="text" @click="changeNP(scope.row)">
                          修改
                       </el-button>
                  </template>

                </el-table-column>
              </el-table>
            </div>
            <pagination
              v-show="netPerformanceTotal > 0"
              :total="netPerformanceTotal"
              :page.sync="queryParams.pageNo"
              :limit.sync="queryParams.pageSize"
              @pagination="getMarketOfficialSeal()"
            />
          </div>
        </el-tab-pane>


      </el-tabs>
      <!-- <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery"/>
        </el-tooltip>
      </div> -->
      <!-- <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button
            size="mini"
            circle
            icon="el-icon-refresh"
            @click="handleQuery"
          />
        </el-tooltip>
      </div> -->
    </div>
    <!-- <div class="table-data">
      <el-tabs tab-position="left" >
        <el-tab-pane label="收付款账户">
          <el-row>
            <el-col :span="24" style="margin-bottom:27px"
              ><div
                style="
font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;
line-height: 24px;"
              >
                收付款账户
              </div></el-col>
            <el-col :span="24" style="margin-bottom:96px"
              ><div>
                <el-checkbox-group
                  v-model="checkedCities"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="city in cities"
                    :label="city"
                    :key="city"
                    >{{ city }}</el-checkbox
                  >
                </el-checkbox-group>
              </div></el-col
            >
            <el-col :span="24">
              <el-button type="primary" icon="el-icon-plus" @click="addOption">添加选项</el-button>
              <el-button type="danger" plain>删除</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="支出类型">
            <el-row>
            <el-col :span="24" style="margin-bottom:32px"
              ><div
                style="
font-size: 20px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #303133;
line-height: 24px;"
              >
                支出类型
              </div></el-col>
            <el-col :span="24" style="margin-bottom:96px"
              ><div>
                <el-checkbox-group
                  v-model="checkedCities"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="city in cities"
                    :label="city"
                    :key="city"
                    >{{ city }}</el-checkbox
                  >
                </el-checkbox-group>
              </div></el-col
            >
            <el-col :span="24">
              <el-button type="primary" icon="el-icon-plus">添加选项</el-button>
              <el-button type="danger" plain>删除</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      
    </div> -->
    <!-- 添加选项 -->
    <el-dialog
      title="添加选项"
      :visible.sync="OptionUp"
      width="422px"
      append-to-body
      class="OptionUp"
    >
      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="请输入选项名" class="tax">
              <el-input style="width: 122px" placeholder="请输入选项名" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增支出类型 -->
    <el-dialog
      :title="expenditureTitle"
      :visible.sync="expenditureShow"
      width="540px"
      append-to-body
    >
      <el-form
        :model="expenditureForm"
        ref="expenditureForm"
        label-position="left"
        label-width="100px"
      >
        <el-form-item
          label="上级科目"
          v-if="expenditureId != -1"
          prop="advancedSubjects"
        >
          <el-input
            style="width: 220px"
            v-model="expenditureForm.advancedSubjects"
            :readonly="true"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="科目代码" prop="accountCode">
          <el-input
            style="width: 220px"
            v-model="expenditureForm.accountCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="科目名称" prop="accountName">
          <el-input
            style="width: 220px"
            v-model="expenditureForm.accountName"
          ></el-input>
        </el-form-item>
        <el-form-item label="全名" prop="fullName">
          <el-input
            style="width: 220px"
            v-model="expenditureForm.fullName"
          ></el-input>
        </el-form-item>
        <el-form-item label="科目类别" prop="accountCategory">
          <el-radio-group v-model="expenditureForm.accountCategory">
            <el-radio label="流动资产">流动资产</el-radio>
            <el-radio label="非流动资产">非流动资产</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="余额方向" prop="balanceDirection">
          <el-radio-group v-model="expenditureForm.balanceDirection">
            <el-radio label="借">借</el-radio>
            <el-radio label="贷">贷</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        style="display: flex; justify-content: center"
      >
        <el-button
          type="primary"
          @click="confirmModification"
          v-if="expenditureTitle == '修改'"
          >确认修改</el-button
        >
        <el-button type="primary" @click="addExpenditure" v-else
          >确定</el-button
        >
        <el-button @click="expenditureShow = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 添加支付方式 -->
    <el-dialog
      :title="title"
      :visible.sync="paymentShow"
      width="568px"
      append-to-body
    >
      <el-form
        :model="paymentForm"
        :rules="paymentRules"
        ref="paymentForm"
        style="margin: 0px; padding-top: 5px"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="城市" prop="cityCode">
              <el-cascader
                placeholder="请选择信息所在地区"
                style="width: 100%"
                size="small"
                :options="areaOptions"
                v-model="paymentForm.cityCode"
                @change="handleRegionChange"
              >
              </el-cascader>
              <!-- <el-input
                v-model="paymentForm.city"
                placeholder="请输入城市"
                style="width:180px"
              /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付方式" prop="patternPayment">
              <el-input
                v-model="paymentForm.patternPayment"
                placeholder="请输入支付方式"
                style="width: 180px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付账号" prop="payAccount">
              <el-input
                v-model="paymentForm.payAccount"
                placeholder="请输入支付账号"
                style="width: 180px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户名" prop="accountName">
              <el-input
                v-model="paymentForm.accountName"
                placeholder="请输入户名"
                style="width: 180px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行" prop="accountBank">
              <el-input
                v-model="paymentForm.accountBank"
                placeholder="请输入开户行"
                style="width: 180px"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="费率" prop="currentRate" class="payment">
              <span class="feilv">%</span>
              <el-input
                v-model="paymentForm.currentRate"
                placeholder="请输入费率"
                style="width: 180px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="belongCompanyName" label="所属公司">
              <el-select
                v-model="paymentForm.belongCompanyName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in CompaniesList"
                  :key="item.companyId"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="bankType"
              label="是否为银行类"
              label-width="110px"
            >
              <el-radio-group v-model="paymentForm.bankType">
                <el-radio :label="10">是</el-radio>
                <el-radio :label="20">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二维码" prop="payUrl">
              <el-upload
                ref="uploadCharge"
                class="upload-file"
                :headers="headers"
                :action="uploadUrl"
                :data="{ type: 10 }"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="
                  (response, file, fileList) =>
                    uploadSuccess(response, file, fileList, 10)
                "
                multiple
                :limit="1"
                list-type="picture"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button icon="el-icon-upload2">上传附件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paymentShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addPaymentMethod"
          v-show="title == '新增支付方式'"
          >确 定</el-button
        >
        <el-button
          type="primary"
          @click="updatePaymentMethodList"
          v-show="title == '修改'"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 导入 -->
    <el-dialog
      title="导入"
      open
      :visible.sync="uploadingFile"
      width="516px"
      append-to-body
      class="uploadingFile"
    >
      <el-row>
        <el-col :span="24">
          <span class="title">模板下载:</span>
          <el-button style="padding: 0px; border: 0px" @click="downloadModule">
            <el-tag style="margin: 0px">下载</el-tag>
          </el-button>
        </el-col>
        <el-col :span="24" style="display: flex">
          <span class="title">上传文件:</span>
          <el-upload
            ref="importUpdateFile"
            class="upload-demo"
            :auto-upload="false"
            :action="importFileUrl"
            :headers="headers"
            :on-change="uploadingTrigger"
            :on-remove="handleRemove"
            accept=".xls,.xlsx"
            :file-list="importFileList"
          >
            <!-- :limit="1" -->
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              上传文件只能为excel文件，且为xlsx,xls格式
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="uploadingFile = false">取 消</el-button>
        <el-button type="primary" @click="submitFormUploading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 电子公章 -->
    <el-dialog
      title="电子公章"
      :visible.sync="imgfilesShow"
      width="516px"
      append-to-body
      class="paymentScreenshot"
    >
      <el-form label-position="labelPosition" class="chengjiao">
        <el-row>
          <div v-if="imgfiles.length != 0">
            <el-col
              :span="12"
              v-for="(item, index) in imgfiles"
              :key="index + 'm'"
            >
              <div class="img-box">
                <el-image
                  fit="cover"
                  style="width: 50%; margin-bottom: 10px"
                  :src="fileUrl + item"
                  :preview-src-list="
                    imgfiles.map((ite) => {
                      return fileUrl + ite;
                    })
                  "
                ></el-image>
              </div>
            </el-col>
          </div>
          <div class="oo" v-else>暂时还没有电子公章哦！</div>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgfilesShow = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="支付二维码"
      :visible.sync="QRCodeShow"
      width="516px"
      append-to-body
      class="paymentScreenshot"
    >
      <el-form label-position="labelPosition" class="chengjiao">
        <el-row>
          <el-col
            :span="12"
            v-for="(item, index) in QRCodeList"
            :key="index + 'm'"
          >
            <div class="img-box" v-if="QRCodeList.length != 0">
              <el-image
                fit="cover"
                style="width: 50%; margin-bottom: 10px"
                :src="fileUrl + item"
                :preview-src-list="
                  QRCodeList.map((ite) => {
                    return fileUrl + ite;
                  })
                "
              ></el-image>
            </div>
            <div class="oo" v-if="QRCodeList.length == []">
              暂时还没有二维码哦！
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="QRCodeShow = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="sealTitle"
      :visible.sync="OfficialSealShow"
      width="516px"
      append-to-body
      class="uploadingFile"
      center
    >
      <el-form
        ref="officialSealForm"
        :model="officialSealForm"
        label-position="labelPosition"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item prop="officialSealName" label="公章名称">
              <el-input
                style="width: 260px"
                v-model="officialSealForm.officialSealName"
                placeholder="请输入公章名称"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="firmName" label="所属公司">
              <el-select
                style="width: 260px"
                v-model="officialSealForm.companyId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in CompaniesList"
                  :key="item.companyId"
                  :label="item.name"
                  :value="item.companyId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="电子公章" prop="payUrl">
              <el-upload
                ref="uploadCharges"
                :headers="headers"
                :action="officialSealUploadUrl"
                :data="{ type: 10 }"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="
                  (response, file, officialSealFileList) =>
                    uploadSealSuccess(response, file, officialSealFileList, 10)
                "
                multiple
                :limit="1"
                list-type="picture"
                :on-exceed="handleExceed"
                :file-list="officialSealFileList"
              >
                <el-button icon="el-icon-upload2">上传附件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="OfficialSealShow = false">取 消</el-button>
          <el-button type="primary" @click="submitOfficialSeal"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

     <!-- 新增净业绩 -->
    <el-dialog
      :title="performanceTitle"
      :visible.sync="OffperformanceShow"
      width="516px"
      append-to-body
      class="uploadingFile"
      center
    >
      <el-form
        ref="offPerformanceForm"
        :model="offPerformanceForm"
        label-position="labelPosition"
        style="margin:0 0"
      >
        <el-row>
          <el-col :span="24" class="tsStyle">
            <el-form-item prop="officialSealName" label="类型">
              <el-input
                style="width: 80%"
                v-model="offPerformanceForm.officialSealName"
                placeholder="请输入类型"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"  class="tsStyleV">
        
              <el-form-item label="适用项目(可多选)" >
                <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event, 'permission')">展开/折叠</el-checkbox>
                <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event, 'permission')">全选/全不选</el-checkbox>
                <el-checkbox v-model="form.permissionCheckStrictly" @change="handleCheckedTreeConnect($event, 'permission')">父子联动</el-checkbox>
                <div style="max-height: 60vh;overflow: auto;">
                  <table width="100%">
                    <tr v-for="(val,key) in permissionTree" class="permission-tree">
                      <td>
                        <div class="permission-name">
                          <span>{{key}}</span>
                        </div>
                      </td>
                      <td>
                        <el-tree
                          :data="val"
                          :default-checked-keys="permissionKeys"
                          show-checkbox
                          default-expand-all
                          ref="permission"
                          node-key="resourceId"
                          :check-strictly="!form.permissionCheckStrictly"
                          empty-text="加载中，请稍后"
                          :props="defaultProps"
                        ></el-tree>
                      </td>
                    </tr>
                  </table>
                </div>
              </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="tsStyle">
              <el-form-item prop="officialSealName" label="设置公式">
                 <span class="formula">f(x)</span>
                 <span>sfdsf</span>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="OffperformanceShow = false">取 消</el-button>
          <el-button type="primary" @click="addOffPerformanceSeal"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

  <!-- 修改净业绩 -->
    <!-- <el-dialog
      :title="changeperformanceTitle"
      :visible.sync="OffChangeperformanceShow"
      width="516px"
      append-to-body
      class="uploadingFile"
      center
    >
      <el-form
        ref="offPerformanceForm"
        :model="offPerformanceForm"
        label-position="labelPosition"
      >
        <el-row>
          <el-col :span="24" class="tsStyle">
            <el-form-item prop="officialSealName" label="类型">
              <el-input
                style="width: 260px"
                v-model="offPerformanceForm.officialSealName"
                placeholder="请输入类型"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"  class="tsStyleV">
              <el-form-item label="适用项目(可多选)" >
                <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event, 'permission')">展开/折叠</el-checkbox>
                <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event, 'permission')">全选/全不选</el-checkbox>
                <el-checkbox v-model="form.permissionCheckStrictly" @change="handleCheckedTreeConnect($event, 'permission')">父子联动</el-checkbox>
                <div style="max-height: 60vh;overflow: auto;">
                  <table width="100%">
                    <tr v-for="(val,key) in permissionTree" class="permission-tree">
                      <td>
                        <div class="permission-name">
                          <span>{{key}}</span>
                        </div>
                      </td>
                      <td>
                        <el-tree
                          :data="val"
                          :default-checked-keys="permissionKeys"
                          show-checkbox
                          default-expand-all
                          ref="permission"
                          node-key="resourceId"
                          :check-strictly="!form.permissionCheckStrictly"
                          empty-text="加载中，请稍后"
                          :props="defaultProps"
                        ></el-tree>
                      </td>
                    </tr>
                  </table>
                </div>
              </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="tsStyle">
              <el-form-item prop="officialSealName" label="设置公式">
                 <span class="formula">f(x)</span>
                 <span>sfdsf</span>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="OffChangeperformanceShow = false">取 消</el-button>
          <el-button type="primary" @click="submitOfficialSeal"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog> -->





    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index: 2033"
      v-if="dialogVisible"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  payment,
  OfficialSealAdd, //新增公章
  findById, //公章详情
  marketOfficialSeal,//公章数据列表
  PackagePlatform,
  NewPaymentMethod, //新增支付方式
  delPaymentMethod, //删除支付方式
  updatePaymentMethod, //修改支付方式
  modifyPaymentMethod, //修改回显数据
  deleteSingle, //删除单条数据
  deleteSeal, //删除公章单条数据
  batchDeletion, //批量删除公章数据
} from "@/api/crm/houseProperty/setUp";
import {
  ChooseCompany,
  expenditureType,
  addExpenditure,
  delExpenditure,
  modifyExpenditure,
  modifyEcho,
  exportExpenses
} from "@/api/crm/privateLedger/set";

import {
  addNetPerformance,//新增净业绩
  netPerformanceSeal,//净业绩列表
  deleteNetPer,//删除净业绩
  getApplicableItems,//获取适用项目 新增模态框
  changeNetPerformance, //修改回显数据
} from "@/api/crm/NetPerformance/set";

import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import Item from "../../../../layout/components/Sidebar/Item.vue";


import {getResourceList4Permission } from "@/api/system/role";



export default {
  components: { Item },
  name: "",

  data() {
    return {
        deptExpand: true,
        deptNodeAll: false,
        permissionTree: { }, //净业绩中，适用项目数据 适用项目(可多选)
        permissionCheckStrictly:false,
        permissionKeys:[],
        defaultProps: {
          children: "child",
          label: "name"
        },

     // 表单参数
      form: {},
      officialSealForm: {}, //公章新增修改表单数据
      officialSealList: [], //公章新增表格数据
      netPerformanceList:[],//净业绩数据
      netPerformanceTotal: 0,
      offPerformanceForm: {}, //净业绩新增修改表单数据

      headers: { Authorization: _getSessionStore(tokenKey) },
      uploadUrl:
        process.env.VUE_APP_BASE_API +
        "/hmkj-crm/marketCompbusiImgfile/fileUpload",
      officialSealUploadUrl:
        process.env.VUE_APP_BASE_API + "/hmkj-crm/marketCompbusiImgfile/upload",
      importFileUrl:
        process.env.VUE_APP_CRM_API +
        "/hmkj-crm/crmAccountantSubject/excelImport",
      fileUrl: process.env.VUE_APP_FILE_API,
      dialogImageUrl: "",
      dialogVisible: false,
      imgfilesShow: false,
      sealTitle: "",
      performanceTitle:'',
      changeperformanceTitle:'',
      fileList: [], //文件上传数据
      officialSealTotal: 0,
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      },
      cusList: ["刘静"],
      sortCheck: true,
      title: "",
      expenditureList: [], //支出类型列表
      expenditureForm: {
        accountCategory: "流动资产",
        balanceDirection: "借",
        accountCode: "",
        fullName: "",
        accountName: "",
      }, //支出类型弹出框表单
      uploadingFile: false, //导入弹出框
      importFileList: [], //导入数据
      officialSealFileList: [], //公章的上传图片列表
      expenditureTitle: "", //新增支出类型弹出框title
      expenditureShow: false, //新增支出类型弹出框
      expenditureId: null,
      showSearch: false, // 显示搜索条件
      radio: "1",
      companyList: [],
      CompaniesList: [],
      areaOptions: regionData, //区域数据
      //添加支付方式弹窗
      paymentShow: false,
      //添加支付方式表格
      paymentForm: {
        bankType: 10,
      },
      //支付二维码弹窗
      QRCodeShow: false,
      imgfiles: [], //电子公章图片
      //二维码图片
      QRCodeList: [],
      OfficialSealShow: false, //新增公章弹窗
      OffperformanceShow: false, //新增净业绩弹窗

       OffChangeperformanceShow: false, //修改净业绩弹窗

      type: null,
      ids: [],
      // 总条数
      total: 0,
      officialSealTotal: 0,
      sourceTypeLv: {},
      delSwitch: {},
      checkedCities: [],
      cities: ["上海", "北京", "广州", "深圳"],
      OptionUp: false, //添加选项
      activeName: "first",
      expenditure: "expenditure",
      inputVisible: false,
      inputValue: "1", //添加输入框值
      paymentRules: {
        cityCode: [
          { required: true, message: "城市不能为空", trigger: "blur" },
        ],
        patternPayment: [
          { required: true, message: "支付方式不能为空", trigger: "blur" },
        ],
        payAccount: [
          { required: true, message: "支付账号不能为空", trigger: "blur" },
          // { type: 'number', message: '支付账号必须为数字值'}
        ],
        accountName: [
          { required: true, message: "户名不能为空", trigger: "blur" },
        ],
        currentRate: [
          { required: true, message: "费率不能为空", trigger: "blur" },
          //  { type: 'number', message: '费率必须为数字值'}
        ],
        belongCompanyName: [
          { required: true, message: "所属公司不能为空", trigger: "blur" },
        ],
        bankType: [
          { required: true, message: "是否为银行类不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
  },
  methods: {
  //打开新增净业绩模态框
    openOffPerformanceSeal() {
      this.performanceTitle = "新增净业绩";
      this.offPerformanceForm = {};
       //这里写，后台传的下拉框里面的数据
      this.getListPermission();
      this.OffperformanceShow = true;
    },
      //修改净业绩
    changeNP(row) {
          this.performanceTitle = "修改净业绩";
          this.OffperformanceShow = true;
          this.getListPermission();
        changeNetPerformance({ id: row.id }).then((response) => {
          // this.offPerformanceForm = response.data;
          // this.offPerformanceForm.cityCode = JSON.parse(response.data.cityCode);
          // this.offPerformanceForm.payAccount = this.offPerformanceForm.payAccount;
          // this.offPerformanceForm.bankType = Number(response.data.bankType);
          // this.offPerformanceForm.currentRate = Number(this.offPerformanceForm.currentRate);
        });
    },
  //新增净业绩确定按钮
   addOffPerformanceSeal() {
      if (this.offPerformanceForm.companyId) {
        this.ApplicableItems.forEach((item) => {
          if (item.companyId == this.offPerformanceForm.companyId) {
            this.offPerformanceForm.companyName = item.name;
          }
        });
      }
      this.$refs["offPerformanceForm"].validate((valid) => {
        if (valid) {
          addNetPerformance(this.offPerformanceForm).then((response) => {
            this.getNetPerformanceSeal();
            this.OffperformanceShow = false;
             this.offPerformanceForm.officialSealName = "";
            this.offPerformanceForm.companyId = "";
            this.msgSuccess("添加成功");

          });
        }
      });
   },
    //删除净业绩
     deleteNetPer(){
        if (this.ids.length != 0) {
            this.$confirm("是否删除本条数据?", "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              deleteNetPer(this.ids).then((response) => {
                if (response.code == 200) {
                  this.msgSuccess("删除成功");
                  this.getMarketOfficialSeal();
                }
              });
            });
          } else {
            this.msgError("请选择要删除的数据");
          }
     },

    //净业绩查询列表
    getNetPerformanceSeal() {
      console.log('净业绩类型')
      this.loading = true;
      let queryParams = this.queryParams;
      // netPerformanceSeal(queryParams).then((response) => {
      //    console.log(response)
      //   this.netPerformanceList = response.data.rows;
      //   this.netPerformanceTotal = response.data.totalRows;
      // });
      this.loading = false;
    },
    // 禁用按钮
    DisableBtn(){

    },
   /** 查询//适用项目(可多选)树结构 */ /** 查询菜单树结构 */
    getListPermission() {
      //getApplicableItems(appId,roleId).then(response => {
          let appId =1;
          let roleId='1'    
         getResourceList4Permission(appId,roleId).then(response => {
             console.log(response)

        // console.info(response)
        // let permissions = response.data;
        // let arrKeys = [];
        // for(let key in permissions){
        //   // console.info(key)
        //   let temp = this.getBindKeys(permissions[key]);
        //   // console.info(temp)
        //   arrKeys = arrKeys.concat(temp)
        // }
        // // console.info(arrKeys)
        // this.permissionKeys = Array.from(new Set(arrKeys))
        // this.permissionTree = permissions;
        //   console.log(permissions)

      });
    },

   	// 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      if (type == 'permission') {
        this.$refs.permission.forEach((items,index)=>{
          let obj = this.permissionTree;
          let key = Object.keys(obj)[index];
          // console.info(obj[key])
          obj[key].forEach(item=>{
            items.store.nodesMap[item.resourceId].expanded = value;
          })
        })
      }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type == 'permission') {
        this.$refs.permission.forEach((item,index)=>{
          let obj = this.permissionTree;
          let key = Object.keys(obj)[index];
          item.setCheckedNodes(value ? obj[key]: []);
        })
      }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value, type) {
      // console.info(type)
      if (type == 'permission') {
        this.form.permissionCheckStrictly = value ? true: false;
      }
    },






    //修改公章
    modifySeal(row) {
      this.sealTitle = "修改公章";
      this.OfficialSealShow = true;
      console.log(row);
      ChooseCompany().then((response) => {
        this.CompaniesList = response.data;
      });
      findById({ id: row.id }).then((res) => {
        if (res.data.imgfiles) {
          try {
            // this.$nextTick((_) => {
            //   this.$refs.collectionUpload.clearFiles();
            // });
            this.officialSealFileList = res.data.imgfiles.map((item) => {
              return {
                url: this.fileUrl + item.url,
                name: item.name + "." + item.type,
                id: item.id,
              };
            });
          } catch (e) {}
        }
        console.log(this.officialSealFileList);
      });
      this.officialSealForm = row;
      this.CompaniesList.forEach((item) => {
        if (row.companyName == item.name) {
          this.officialSealForm.companyId = item.companyId;
        }
      });
      console.log(this.officialSealForm);
    },
    //打开电子公章
    openElectronicSeal(row) {
      findById({ id: row.id }).then((res) => {
        this.imgfiles = res.data.imgfiles;
        console.log(this.imgfiles);
        this.imgfilesShow = true;
      });
    },
    //新增公章确定按钮
    submitOfficialSeal() {
      if (this.officialSealForm.companyId) {
        this.CompaniesList.forEach((item) => {
          if (item.companyId == this.officialSealForm.companyId) {
            this.officialSealForm.companyName = item.name;
          }
        });
      }
      this.$refs["officialSealForm"].validate((valid) => {
        if (valid) {
          OfficialSealAdd(this.officialSealForm).then((response) => {
            this.getMarketOfficialSeal();
            this.OfficialSealShow = false;
            this.msgSuccess("添加成功");
            // this.officialSealForm.patternPayment = "";
            // this.officialSealForm.currentRate = "";
          });
        }
      });
    },
    //打开新增公章
    addOfficialSeal() {
      this.$nextTick(() => {
        this.$refs.uploadCharges.clearFiles();
      });
      this.sealTitle = "新增公章";
      this.officialSealForm = {};
      ChooseCompany().then((response) => {
        this.CompaniesList = response.data;
      });
      this.OfficialSealShow = true;
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.form = {
        appId:this.queryParams.appId||this.$store.getters.appId||'',
        roleId: undefined,
        roleName: undefined,
        roleCode: undefined,
        orderNo: 0,
        status: 1,
        roleDesc: undefined,
        branchId: '-1',
        roleType:5,
        companyId: this.queryParams.companyId||''
      };
      this.resetForm("form");
    },
    //新增支出类型
    addExpenditureType(val) {
      this.expenditureId = val;
      this.expenditureForm.accountName = "";
      this.expenditureForm.accountCategory = "流动资产";
      this.expenditureForm.balanceDirection = "借";
      this.expenditureForm.accountCode = "";
      this.expenditureForm.fullName = "";
      if (this.expenditureId == -1) {
        this.expenditureTitle = "新增主科目";
        this.expenditureForm.parentId = -1;
        this.expenditureForm.parentIds = "-1";
      } else {
        this.expenditureTitle = "新增";
        this.expenditureForm.advancedSubjects = val.accountName;
        this.expenditureForm.parentId = this.expenditureId.id;
        this.expenditureForm.parentIds = this.expenditureId.parentIds;
        this.expenditureForm.sort = this.expenditureId.sort;
      }
      this.expenditureShow = true;
    },
    //提交新增支出类型
    addExpenditure() {
      addExpenditure(this.expenditureForm).then((response) => {
        this.expenditureShow = false;
        this.getExpenditureType();
      });
    },
    //删除支出类型
    delExpenditureType(ids) {
      this.$confirm("是否确认删除此支出类型?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delExpenditure({ id: ids });
        })
        .then(() => {
          this.msgSuccess("删除成功");
          this.getExpenditureType();
        })
        .catch(function () {});
    },
    //修改支出类型
    modifyExpenditureType(val) {
      this.expenditureTitle = "修改";
      this.expenditureShow = true;
      if (val.parentId == -1) {
        this.expenditureId = -1;
      } else {
        this.expenditureId = val;
      }
      modifyEcho({ id: val.id }).then((response) => {
        this.expenditureForm = response.data;
      });
    },
    //提交修改支出类型
    confirmModification() {
      modifyExpenditure(this.expenditureForm).then((response) => {
        this.expenditureShow = false;
        this.getExpenditureType();
      });
    },
    //导出支出类型
    /** 导出按钮操作 */
    handleExport() {
      let fileUrl = process.env.VUE_APP_FILE_API;
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有服务项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportExpenses({});
        })
        .then((response) => {
          let filename = response.data.filename;
          let elink = document.createElement("a");
          elink.download = filename;
          elink.text = filename;
          elink.style.display = "none";
          elink.href = decodeURIComponent(fileUrl + "/download/" + filename);
          document.getElementById("app").appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        })
        .catch(function () {});
    },
    //导入
    bulkImport() {
      this.uploadingFile = true;
    },
    // 模板下载
    downloadModule() {
      // console.info('模板下载')
      window.location.href =
        process.env.VUE_APP_DOWN_API + "/crmAccountantSubject/excelTemplate";
    },
    // 上传文件时触发
    uploadingTrigger(file, importFileList) {
      if (importFileList.length > 1) {
        importFileList.splice(0, 1);
      }
    },

    // 上传确定按钮
    submitFormUploading() {
      this.$refs.importUpdateFile.submit();
    },
    //   重置
    resetQuery() {},
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.getList();
    },
    handleClick(tab, event) {
      if (tab.name == "fourth") {
        this.getPaymentPlan(10);
      } else if (tab.name == "five") {
        this.getMarketOfficialSeal();
      } else if (tab.name == "first") {
        this.getExpenditureType();
      } else if (tab.name == "six") {
        this.getNetPerformanceSeal();
      }
    },
    //公章设置
    getMarketOfficialSeal() {
      this.loading = true;
      let queryParams = this.queryParams;
      marketOfficialSeal(queryParams).then((response) => {
        this.officialSealList = response.data.rows;
        this.officialSealTotal = response.data.totalRows;
      });
      this.loading = false;
    },
    //支出类型
    getExpenditureType() {
      this.loading = true;
      let queryParams = this.queryParams;
      expenditureType(queryParams).then((response) => {
        this.expenditureList = response.data.rows;
        this.total = response.data.totalRows;
      });

      this.loading = false;
    },


    
    //支付设置
    getPaymentPlan(type) {
      this.type = type;
      this.queryParams.type = type;
      let queryParams = this.queryParams;
      (this.QRCodeList = []),
        payment(queryParams).then((response) => {
          this.companyList = response.data.rows;
          this.PaymentMethodList = response.data.rows;

          this.total = response.data.totalRows;
        });
    },
    //添加支付方式
    addPaymentOptions() {
      this.$nextTick(() => {
        this.$refs.uploadCharge.clearFiles();
      });
      ChooseCompany().then((response) => {
        this.CompaniesList = response.data;
      });
      this.paymentShow = true;
      this.title = "新增支付方式";
      this.paymentForm = {};
      this.paymentForm.type = this.type;
    },
    //删除支付方式
    deletPatternPayment() {
      if (this.ids.length != 0) {
        delPaymentMethod(this.ids).then((response) => {
          if (response.code == 200) {
            this.msgSuccess("删除成功");
            this.getPaymentPlan(this.type);
          }
        });
      } else {
        this.msgError("请选择要删除的数据");
      }
    },
    //批量删除公章数据
    batchDeletion() {
      if (this.ids.length != 0) {
        this.$confirm("是否删除本条数据?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          batchDeletion(this.ids).then((response) => {
            if (response.code == 200) {
              this.msgSuccess("删除成功");
              this.getMarketOfficialSeal();
            }
          });
        });
      } else {
        this.msgError("请选择要删除的数据");
      }
    },
    //删除公章单条数据
    delSeal(row) {
      this.$confirm("是否删除本条数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return deleteSeal({ id: row.id });
        })
        .then((response) => {
          if (response.code == 200) {
            this.msgSuccess("删除成功");
            this.getMarketOfficialSeal();
          }
        });
    },
    //删除单条数据
    delSingle(row) {
      this.$confirm("是否删除本条数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return deleteSingle({ id: row.id });
        })
        .then((response) => {
          this.getPaymentPlan(this.type);
        });
    },
    //排序
    sortChange() {
      this.sortCheck = !this.sortCheck;
      if (this.sortCheck == true) {
        this.queryParams.sortBy = "asc";
        this.getPaymentPlan(this.type);
      } else if (this.sortCheck == false) {
        this.queryParams.sortBy = "desc";
        this.getPaymentPlan(this.type);
      }
    },
    //提交新增支付方式
    addPaymentMethod() {
      this.CompaniesList.map((item) => {
        if (item.name == this.paymentForm.belongCompanyName) {
          return (this.paymentForm.belongCompanyId = item.companyId);
        }
      });
      this.$refs["paymentForm"].validate((valid) => {
        if (valid) {
          NewPaymentMethod(this.paymentForm).then((response) => {
            this.getPaymentPlan(this.type);
            this.paymentShow = false;
            this.paymentForm.patternPayment = "";
            this.paymentForm.currentRate = "";
          });
        }
      });
    },
    //修改回显
    modifyPaymentMethod(row) {
      this.title = "修改";
      this.paymentShow = true;
      ChooseCompany().then((response) => {
        this.CompaniesList = response.data;
      });
      modifyPaymentMethod({ id: row.id }).then((response) => {
        this.paymentForm = response.data;
        this.paymentForm.cityCode = JSON.parse(response.data.cityCode);
        this.paymentForm.payAccount = this.paymentForm.payAccount;
        this.paymentForm.bankType = Number(response.data.bankType);
        this.paymentForm.currentRate = Number(this.paymentForm.currentRate);
      });
    },
    //修改支付方式
    updatePaymentMethodList() {
      this.CompaniesList.map((item) => {
        if (item.name == this.paymentForm.belongCompanyName) {
          return (this.paymentForm.belongCompanyId = item.companyId);
        }
      });
      this.$refs["paymentForm"].validate((valid) => {
        if (valid) {
          updatePaymentMethod(this.paymentForm).then((response) => {
            this.paymentShow = false;
            this.getPaymentPlan(this.type);
          });
        }
      });
    },
    //支付二维码
    PaymentQRCode(row) {
      this.QRCodeShow = true;
      this.QRCodeList = [];
      if (row.payUrl == "") {
        this.QRCodeList = [];
      } else {
        this.QRCodeList.push(row.payUrl);
      }
    },
    handleRegionChange(value) {
      this.paymentForm.cityCode = value;
      let data = {
        district: value,
        province: CodeToText[value[0]],
        city: CodeToText[value[1]],
        county: CodeToText[value[2]],
      };
      this.paymentForm.province = data.province;
      this.paymentForm.city = data.city;
      this.paymentForm.county = data.county;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },

    //列表展示
    getList() {
      this.loading = false;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      //   checkForTheAuditList(data).then(response => {
      //     this.companyList = response.data.rows || [];
      //     this.total = response.data.totalRows;
      //     this.loading = false;
      //   });
    },
    // 添加选项
    addOption() {
      this.OptionUp = true;
    },
    // 取消按钮
    cancel() {
      this.OptionUp = false; //设置
      this.queryParams = {};
    },
    // 保存按钮
    submitForm() {
      this.OptionUp = false; //设置
      //
      // this.queryParams.status = this.queryParams.dispatchState;
      // let companyListRun = JSON.parse(JSON.stringify(this.queryParams));
      // this.queryParams = {};
      // OrderReview(companyListRun).then(response => {
      //   this.openOrderAudit = false;
      //   this.getList();
      // });
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(cb) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.cusList.push(inputValue);
        if (typeof cb == "function") {
          cb(this.cusList);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    closeViewer() {
      this.dialogVisible = false;
    },
    handleRemove(file, fileList) {
      delImg({
        id: file.response.data.id,
        companyId: file.response.data.companyId,
      }).then((res) => {
        let files = fileList
          .map((item) => {
            let temp = item.response;

            if (temp.code == 200) {
              return temp.data.id;
            } else {
              return undefined;
            }
          })
          .filter((item) => {
            return item != undefined;
          })
          .join(",");
        if (type == 10) {
          this.form.contractImg = files;
        } else if (type == 20) {
          this.form.paymentImg = files;
        } else if (type == 30) {
          this.form.userListImg = files;
        }
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);

      // delImg({ id: file.response.data.id }).then(response => {});
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //图片上传成功
    uploadSealSuccess(response, file, fileList, type) {
      this.ImageUrlList = fileList.map((ite) => {
        return ite.url;
      });
      console.log(file);
      console.log(response);
      this.officialSealForm.payUrl = "";
      this.officialSealForm.imgIds = response.data.id;
      let files = fileList
        .map((item) => {
          let temp = item.response;
          if (temp && temp.code == 200) {
            return (this.officialSealForm.payUrl = temp.data);
          } else {
            return undefined;
          }
        })
        .filter((item) => {
          return item != undefined;
        });
    },
    //图片上传成功
    uploadSuccess(response, file, fileList, type) {
      this.ImageUrlList = fileList.map((ite) => {
        return ite.url;
      });

      this.paymentForm.payUrl = "";
      let files = fileList
        .map((item) => {
          let temp = item.response;
          if (temp && temp.code == 200) {
            return (this.paymentForm.payUrl = temp.data);
          } else {
            return undefined;
          }
        })
        .filter((item) => {
          return item != undefined;
        });
    },
  },
  created() {
    this.getList();
    this.getExpenditureType();
  },
};
</script>

<style >
    .tsStyle .el-form-item__label{
       width: 20%;
    }
.tsStyleV .el-form-item__label{
       width: 20%;
       line-height: 20px;
}

  .formula{
     color:blue;
     font-size:14px;
  }
  .cais{
    width: 60px;
    height: 30px;
    background-color: blue;
    color: #fff;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    border-radius: 50px;
    float: left;
  }
  .chech{
   float:right;
  }

</style>
<style lang="scss">

.set {
  .table-data {
    padding-left: 0px;
    .el-tabs {
      .el-tabs__header {
        margin-right: 0px;
        .is-left {
          .el-tabs__nav-scroll {
            .el-tabs__nav {
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
        .el-tabs__nav-wrap::after {
          width: 0;
        }
      }
      .el-tabs__content {
        border-left: 1px solid #e6e7eb;
        .el-tab-pane {
          margin-left: 40px;
          padding-right: 0px;
        }
      }
    }
  }
  .tabbar-vi {
    .table-data {
      padding-left: 24px;
      padding-top: 18px;
      padding-bottom: 0px;
      .step {
        .title_wrap {
          display: flex;
          align-items: flex-start;
          margin-bottom: 30px;
        }
        .title_wrap .left {
          flex: 0 0 115px;
        }

        .title_wrap .right {
          font-size: 12px;
          flex: 1;
          padding-bottom: 39px;
          border-bottom: 1px solid #e6e7eb;
          .tag-vi {
            padding-top: 20px;
            .el-tag {
              margin-top: 0px;
              margin-bottom: 0px;
            }
          }
        }
        .el-step__icon.is-text {
          width: 24px;
          height: 24px;
          border: none;
          background: #4977e0;
          border-radius: 50%;
        }
        .el-step__icon-inner {
          color: #ffffff;
          font-weight: 400;
        }
        .el-step__title.is-finish {
          color: #565759;
        }
        .el-step__line-inner {
          border: 1px solid #e6e7eb;
        }
        .el-step {
          .is-vertical {
            display: flex;
            .el-step__title {
              padding-bottom: 10px;
              .title_wrap {
                .right {
                  .tag-vi {
                  }
                }
              }
            }
          }
          .addInput {
            width: 100px;
          }
        }
      }
    }
  }
}
.bgColor {
  border: 0px;
  background: #ccc;
  color: #fff;
  border-radius: 20px !important;
}
.bgBlue {
  background: rgb(58, 116, 240);
  color: #fff;
}
.Blue {
  color: rgb(58, 116, 240);
}
.payment {
  position: relative;
  .feilv {
    position: absolute;
    top: 3px;
    right: 15px;
    z-index: 99;
  }
}
.OptionUp {
  .el-dialog {
    margin-top: 30vh !important;

    border-radius: 4px;
  }
  .el-dialog__body {
    padding-bottom: 0px;
    .el-form {
      margin: 0px;
    }
  }
  .el-dialog__footer {
    padding-top: 0px;
  }
}
// 导入
.uploadingFile {
  .el-dialog {
    .el-dialog__body {
      padding: 14px 50px !important;

      .el-row {
        .el-col {
          margin: 10px 0px;

          .title {
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #565759;
            line-height: 34px;
            margin-right: 18px;
          }
        }
      }

      .dialog-footer {
        text-align: right;
        margin-top: 50px;
      }
    }
  }
}
</style>
