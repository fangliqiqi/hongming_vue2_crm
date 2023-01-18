<template>
  <div class="wortSet app-container">
    <div class="search-vi">
      <!-- <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            v-model="showSearch"
          >
            <div class="search-popover ">
              <el-form
                :model="queryParams"
                ref="queryParams"
                :inline="true"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="套餐名称" prop="createBy">
                  <el-input
                    placeholder="请输入套餐名称"
                    style="width: 222px"
                    v-model="queryParams.createBy"
                    size="small"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="所属日期"
                  prop="createBy"
                  class="clientsLv"
                >
                  <el-date-picker
                    v-model="queryParams.createBy"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="所属小组" prop="createBy">
                  <el-input
                    placeholder="请输入所属公司"
                    style="width: 222px"
                    v-model="queryParams.createBy"
                    size="small"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item label="负责区域" prop="district">
                  <el-cascader
                    placeholder="请选择负责区域"
                    style="width: 222px"
                    size="small"
                    :options="areaOptions"
                    @change="handleRegionChange"
                  >
                  </el-cascader>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button type="cyan" size="small" @click="resetQuery"
                  >重置</el-button
                >
                <el-button type="primary" size="small" @click="handleQuery"
                  >确认</el-button
                >
              </div>
            </div>
            <el-button slot="reference" size="small"
              >筛选<i class="el-icon-s-operation el-icon--right"></i>
            </el-button>
          </el-popover>
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
      <el-tabs v-model="queryParams.condition" @tab-click="handleClick">
        <el-tab-pane label="套餐设置" value="10" name="detail"></el-tab-pane>
        <el-tab-pane
          label="提单员区域设置"
          value="20"
          name="third"
        ></el-tab-pane>
        <el-tab-pane
          label="团队与业绩设置"
          value="30"
          name="fourth"
        ></el-tab-pane>
        <el-tab-pane label="标签设置" value="40" name="firth"> </el-tab-pane>
        <el-tab-pane label="支付设置" value="50" name="sixth"> </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 套餐设置 -->
    <div class="table-data" v-if="queryParams.condition == 'detail'">
      <el-tabs
        tab-position="left"
        v-model="PackageType"
        @tab-click="PackageClick"
      >
        <el-tab-pane key="add" name="add">
          <div slot="label" class="PackagePlatform">
            <el-button type="text" @click="PackagePlatShow = true"
              ><i
                class="el-icon-plus"
                style="margin-right:5px"
              />新增套餐平台</el-button
            >
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="58同城" value="100" name="tongcheng">
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
                58同城
              </span>
              <div class="content-btnbox">
                <el-button type="primary" @click="addPackage"
                  ><i class="el-icon-plus"></i>添加套餐</el-button
                >
              </div>
            </el-col>
            <el-col :span="24" style="margin-bottom:96px">
              <div style="width:100%">
                <el-table
                  class="slither"
                  :data="companyList"
                  @selection-change="handleSelectionChange"
                  :height="tableHeight"
                >
                  <el-table-column label="序号" align="left" width="50" prop="id" />
                  <el-table-column
                    label="套餐名称"
                    align="left"
                    prop="packageName"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.packageName" size="small">
                      </el-input>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="套餐价格"
                    align="left"
                    width="150"
                    class="father"
                    prop="packagePrice"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packagePrice"
                        size="small"
                        style="width:72px"
                      >
                      </el-input>
                      <span class="son">元</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="套餐周期"
                    align="left"
                    prop="packagePeriod"
                    width="150"
                    class="father"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packagePeriod"
                        size="small"
                        style="width:72px"
                      >
                      </el-input>
                      <span class="son">个月</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="套餐价格"
                    align="left"
                    prop="packagePrice"
                    width="150"
                    class="father"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packagePrice"
                        size="small"
                        style="width:72px"
                      >
                      </el-input>
                      <span class="son">元</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template>
                      <el-button
                        size="mini"
                        type="text"
                        style="color:#EF5465"
                        @click="delPackage(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <pagination
                  v-show="total > 0"
                  :total="total"
                  :page.sync="queryParams.pageNo"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getData"
                />
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="安居客" value="200" name="anjuke">
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
                安居客
              </span>
              <div class="content-btnbox">
                <el-button type="primary" @click="addPackage"
                  ><i class="el-icon-plus"></i>添加套餐</el-button
                >
              </div>
            </el-col>
            <el-col :span="24" style="margin-bottom:96px">
              <div  style="width:100%">
                <el-table
                  class="slither"
                  :data="companyList"
                  @selection-change="handleSelectionChange"
                  :height="tableHeight"
                >
                  <el-table-column label="序号" align="left" width="50" prop="id" />
                  <el-table-column
                    label="套餐名称"
                    align="left"
                    prop="packageName"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.packageName" size="small">
                      </el-input>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="套餐价格"
                    align="left"
                    width="150"
                    prop="packagePrice"
                    class="father"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packagePrice"
                        size="small"
                        style="width:72px"
                      >
                      </el-input>
                      <span class="son">元</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="套餐周期"
                    align="left"
                    prop="packagePeriod"
                    width="150"
                    class="father"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packagePeriod"
                        size="small"
                        style="width:72px"
                      >
                      </el-input>
                      <span class="son">个月</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="套餐价格"
                    align="left"
                    prop="packagePrice"
                    width="150"
                    class="father"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packagePrice"
                        size="small"
                        style="width:72px"
                      >
                      </el-input>
                      <span class="son">元</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        style="color:#EF5465"
                        @click="delPackage(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <pagination
                class="aaa"
                  v-show="total > 0"
                  :total="total"
                  :page.sync="queryParams.pageNo"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getData"
                />
              </div>
            </el-col>
          </el-row>
        </el-tab-pane> -->
        <el-tab-pane
          v-for="item in PackageTypeList"
          :key="item.id"
          :label="item.name"
          :name="item.name"
          :value="item.value"
        >
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
                {{ item.name }}
              </span>
              <div class="content-btnbox">
                <el-button type="primary" @click="addPackage(item.value)"
                  ><i class="el-icon-plus"></i>添加套餐</el-button
                >
              </div>
            </el-col>
            <el-col :span="24" style="margin-bottom:96px">
              <div style="width:100%">
                <el-table
                  class="slither"
                  :data="companyList"
                  @selection-change="handleSelectionChange"
                  :height="tableHeight"
                >
                  <el-table-column
                    label="序号"
                    align="left"
                    width="50"
                    prop="id"
                  />
                  <el-table-column
                    label="套餐名称"
                    align="left"
                    prop="packageName"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packageName"
                        @change="
                          updatePackageForm({
                            packageName: $event,
                            id: scope.row.id
                          })
                        "
                        size="small"
                      >
                      </el-input>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="套餐价格"
                    align="left"
                    width="150"
                    class="father"
                    prop="packagePrice"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packagePrice"
                        @change="
                          updatePackageForm({
                            packagePrice: $event,
                            id: scope.row.id
                          })
                        "
                        size="small"
                        style="width:72px"
                      >
                      </el-input>
                      <span class="son">元</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="套餐周期"
                    align="left"
                    prop="packagePeriod"
                    width="150"
                    class="father"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packagePeriod"
                        @change="
                          updatePackageForm({
                            packagePeriod: $event,
                            id: scope.row.id
                          })
                        "
                        size="small"
                        style="width:72px"
                      >
                      </el-input>
                      <span class="son">个月</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="套餐价格"
                    align="left"
                    prop="packagePrice"
                    width="150"
                    class="father"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.packagePrice"
                        @change="
                          updatePackageForm({
                            packagePrice: $event,
                            id: scope.row.id
                          })
                        "
                        size="small"
                        style="width:72px"
                      >
                      </el-input>
                      <span class="son">元</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        style="color:#EF5465"
                        @click="delPackage(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <pagination
                  v-show="total > 0"
                  :total="total"
                  :page.sync="queryParams.pageNo"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getData"
                />
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 提单员区域设置 -->
    <div
      class="table-data"
      style="display: flex;
    flex-direction: column;padding-right:24px;padding-left:24px;"
      v-if="queryParams.condition == 'third'"
    >
      <div style="margin-bottom:24px">
        <el-button type="primary" @click="handleAddPerson"
          ><i class="el-icon-plus"></i>添加提单员</el-button
        >
      </div>
      <div>
        <el-table
          class="slither"
          :data="companyList"
          @selection-change="handleSelectionChange"
          :height="tableHeight"
        >
          <el-table-column label="序号" width="55" prop="id" align="left" />

          <el-table-column
            label="账号"
            align="left"
            prop="accounts"
            width="150"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.accounts" size="small"> </el-input>
            </template>
          </el-table-column>
          <el-table-column label="姓名" align="left" prop="name" width="150">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.name"
                size="small"
                style="width:82px"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="岗位" width="55" align="left" prop="post" />
          <el-table-column
            label="负责区域"
            align="center"
            width="400"
            prop="territory"
          >
            <template slot-scope="scope">
              <el-select
                placeholder="请选择"
                style="width:102px;margin-left:5px;"
                v-model="scope.row.territory"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span class="jia" @click="onAdd"
                ><i class="el-icon-plus"></i
              ></span>
              <span
                v-for="(item, i) of items"
                :key="i"
                style="margin-left:5px;margin-bottom:5px"
              >
                <el-select
                  placeholder="请选择"
                  style="width:102px;margin-left:5px;margin-bottom:5px"
                  v-model="items[i]"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <span class="jia" @click="onDel(i)"
                  ><i class="el-icon-minus"></i
                ></span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                style="color:#EF5465"
                @click="handleDel(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getData"
      />
    </div>
    <!-- 团队与业绩设置 -->
    <div class="table-data" v-if="queryParams.condition == 'fourth'">
      <el-tabs tab-position="left">
        <el-tab-pane label="组别">
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
                组别
              </span>
              <div class="content-btnbox">
                <el-button type="primary" @click="handleAddGroup"
                  ><i class="el-icon-plus"></i>新增组别</el-button
                >
              </div>
            </el-col>
            <el-col :span="24" style="margin-bottom:96px">
              <div class="table-data" style="width:100%">
                <el-table
                  class="slither"
                  :data="companyList"
                  @selection-change="handleSelectionChange"
                  :height="tableHeight"
                >
                  <el-table-column
                    label="名称"
                    align="center"
                    prop="name"
                    width="200"
                  />

                  <el-table-column label="所属月份" align="left" width="200">
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.name"
                        style="width:122px"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column label="任务量" align="left" width="200">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.name"
                        size="small"
                        style="width:122px"
                      >
                      </el-input>
                      <span class="Rmb">元</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" align="left">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleTask(scope.row)"
                        >指定任务</el-button
                      >
                      <el-button
                        size="mini"
                        type="text"
                        style="color:#EF5465"
                        @click="delGroup(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="人员">
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
                人员
              </span>
              <div class="content-btnbox">
                <el-button type="primary" @click="NewStaff"
                  ><i class="el-icon-plus"></i>新增人员</el-button
                >
              </div>
            </el-col>
            <el-col :span="24" style="margin-bottom:96px">
              <div class="table-data" style="width:100%">
                <el-table
                  class="slither"
                  :data="companyList"
                  @selection-change="handleSelectionChange"
                  :height="tableHeight"
                >
                  <el-table-column
                    label="姓名"
                    align="left"
                    prop="name"
                    width="100"
                  />

                  <el-table-column
                    label="岗位"
                    align="left"
                    width="100"
                    class="father"
                  />

                  <el-table-column
                    label="所属小组"
                    align="left"
                    prop="name"
                    width="150"
                    class="father"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-model="scope.row.name"
                        placeholder="请选择"
                        style="width:112px"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>

                  <el-table-column label="所属月份" align="left" width="150">
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.name"
                        style="width:112px"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column label="任务量" align="left" width="150">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.name"
                        size="small"
                        style="width:122px"
                      >
                      </el-input>
                      <span class="Rmb">元</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template>
                      <el-button
                        size="mini"
                        type="text"
                        style="color:#EF5465"
                        @click="delPeople(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 标签设置 -->
    <div
      class="table-data"
      style="display: flex;
      flex-direction: column;padding-right:24px;padding-left:24px; padding-top:32px"
      v-if="queryParams.condition == 'firth'"
    >
      <div>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleSelectionChange"
        >
          <el-checkbox
            v-for="(item, index) in companyList"
            :label="item"
            :key="index"
            style="margin-right:60px"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>

      <div style="margin-top:54px">
        <el-button type="primary" @click="addLabel"
          ><i class="el-icon-plus"></i>添加选项</el-button
        >
        <el-button type="danger" plain @click="delLabel">删除</el-button>
      </div>
    </div>
    <!-- 支付设置 -->
    <div
      class="table-data"
      style="display: flex;
    flex-direction: column;padding-right:24px;padding-left:24px;"
      v-if="queryParams.condition == 'sixth'"
    >
      <!-- <div style="margin-bottom:24px">
        <el-button type="primary" @click="addPaymentOptions"
          ><i class="el-icon-plus"></i>添加选项</el-button
        >
        <el-button type="danger" @click="deletPatternPayment" plain
          >删除</el-button
        >
      </div> -->
      <div>
        <el-table
          class="slither"
          :data="companyList"
          @selection-change="handleSelectionChange"
          :height="tableHeight"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="城市" align="left" width="180" prop="city" />
          <el-table-column
            label="支付方式"
            align="left"
            prop="patternPayment"
            width="180"
          />
          <el-table-column label="支付账号" align="left" prop="payAccount" />
          <el-table-column label="户名" align="left" prop="accountName" />
          <el-table-column
            label="开户行"
            align="left"
            prop="accountBank"
            width="240"
          />
          <el-table-column
            label="支付二维码"
            align="left"
            prop="payUrl"
            width="220"
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
            width="180"
          />
        </el-table>
      </div>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getData"
      />
    </div>

    <!-- 添加套餐对话框 -->
    <el-dialog
      title="添加套餐"
      :visible.sync="addPackageShow"
      width="516px"
      append-to-body
    >
      <el-form
        ref="addPackageForm"
        :model="addPackageForm"
        style="margin:0px;"
        label-position="left"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="套餐名称" prop=" packageName">
              <el-input
                v-model="addPackageForm.packageName"
                placeholder="请输入套餐名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="套餐价格"
              class="signingTime"
              prop="packagePrice"
            >
              <span class="yue">元</span>
              <el-input
                v-model="addPackageForm.packagePrice"
                placeholder="请输入套餐价格"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="套餐成本" class="signingTime" prop="costPrice">
              <span class="yue">元</span>
              <el-input
                v-model="addPackageForm.costPrice"
                placeholder="请输入套餐成本"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="套餐周期"
              class="signingTime"
              prop="packagePeriod"
            >
              <span class="yue"> 个月</span>
              <el-input
                v-model="addPackageForm.packagePeriod"
                placeholder="请输入套餐周期"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPackageShow = false">取 消</el-button>
        <el-button type="primary" @click="submitPackage">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增套餐平台 -->
    <el-dialog
      title="新增套餐平台"
      :visible.sync="PackagePlatShow"
      width="422px"
      append-to-body
    >
      <el-form :model="PackagePlatForm" style="margin:0px;padding-top:5px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="平台名称" prop="name">
              <el-input
                v-model="PackagePlatForm.name"
                placeholder="请输入平台名称"
                style="width:182px"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="PackagePlatShow = false">取 消</el-button>
        <el-button type="primary" @click="PackagePlatform">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加提单员 -->
    <el-dialog
      title="添加提单员"
      :visible.sync="addPersonShow"
      width="422px"
      append-to-body
    >
      <el-form :model="addPersonForm" style="margin:0px;padding-top:5px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="姓名/手机号/账号" prop="companyId">
              <el-input
                v-model="addPersonForm.packageName"
                placeholder="请输入"
                style="width:182px"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPersonShow = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
        <el-button type="primary" v-if="false">新建人员</el-button>
      </div>
    </el-dialog>

    <!-- 新增小组 -->
    <el-dialog
      title="新增小组"
      :visible.sync="addGgroupShow"
      width="422px"
      append-to-body
    >
      <el-form :model="addGgroupForm" style="margin:0px;padding-top:5px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="小组名称" prop="companyId">
              <el-input
                v-model="addGgroupForm.packageName"
                placeholder="请输入"
                style="width:182px"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGgroupShow = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!--制定任务  -->
    <el-dialog
      title="指定任务"
      :visible.sync="TaskShow"
      width="516px"
      append-to-body
    >
      <el-form
        ref="addPackageForm"
        :model="TaskForm"
        style="margin:0px;margin-bottom:60px;"
        label-position="left"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="所属月份" prop="companyId">
              <el-date-picker
                v-model="TaskForm.packageName"
                type="date"
                placeholder="请选择所属月份"
                value-format="yyyy-MM"
                format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="任务量">
              <el-input
                v-model="TaskForm.packagePeriod"
                placeholder="请输入任务量"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="TaskShow = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增人员 -->
    <el-dialog
      title="新增人员"
      :visible.sync="NewStaffShow"
      width="516px"
      append-to-body
    >
      <el-form
        :model="NewStaffForm"
        style="margin:0px;padding-top:5px;margin-bottom:60px;"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="姓名/手机号/账号" prop="companyId">
              <el-input
                v-model="NewStaffForm.packageName"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所属小组" prop="companyId">
              <el-select
                v-model="NewStaffForm.group"
                placeholder="请选择所属小组"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="NewStaffShow = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
        <el-button type="primary" v-if="false">新建人员</el-button>
      </div>
    </el-dialog>
    <!-- 添加支付方式 -->
    <el-dialog
      title="添加支付方式"
      :visible.sync="paymentShow"
      width="422px"
      append-to-body
    >
      <el-form
        :model="paymentForm"
        style="margin:0px;padding-top:5px"
        label-width="100px"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="支付方式" prop="companyId">
              <el-input
                v-model="paymentForm.patternPayment"
                placeholder="请输入支付方式"
                style="width:220px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="费率" prop="currentRate" class="payment">
              <span class="feilv">%</span>
              <el-input
                v-model="paymentForm.currentRate"
                placeholder="请输入费率"
                style="width:220px"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paymentShow = false">取 消</el-button>
        <el-button type="primary" @click="addPaymentMethod">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加标签 -->
    <el-dialog
      title="新增标签"
      :visible.sync="labelShow"
      width="422px"
      append-to-body
    >
      <el-form
        :model="labelForm"
        ref="labelForm"
        :rules="labelRules"
        style="margin:0px;padding-top:5px"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="标签名称" prop="name">
              <el-input
                v-model="labelForm.name"
                placeholder="请输入"
                style="width:182px"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="labelShow = false">取 消</el-button>
        <el-button type="primary" @click="Tagging">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 支付二维码 -->
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
                style="width:50%; margin-bottom:10px"
                :src="fileUrl + item.url"
                :preview-src-list="
                  QRCodeList.map(ite => {
                    return fileUrl + ite.url;
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import {
  PackageSettings,
  deletePackage, //删除套餐
  addPackagePlatform, //新增套餐平台
  addPackage, //添加新套餐
  updatePackage, //修改套餐
  payment,
  PackagePlatform,
  NewPaymentMethod, //新增支付方式
  delPaymentMethod, //删除支付方式
  updatePaymentMethod, //修改支付方式
  RegionalSettings, //提单员区域设置列表
  delBilllading, //删除提单员
  TagEcho, //标签列表回显
  deleteLabel //删除标签
} from "../../../../api/crm/houseProperty/setUp";
export default {
  data() {
    return {
      items: [],
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        condition: "detail"
      },
      loading: true, // 遮罩层
      // condition: 0,
      titleList: [{ name: "服务设置" }, { name: "项目设置" }],
      checkedCities: [],
      // label: ["58同城", "安居客"],
      //添加支付方式弹窗
      paymentShow: false,
      //添加支付方式表格
      paymentForm: {},
      //支付二维码弹窗
      QRCodeShow: false,
      //二维码图片
      QRCodeList: [],
      companyList: [],
      options: [],
      //区域数据
      areaOptions: regionData,
      // 显示搜索条件
      showSearch: false,
      //所在地区
      district: null,
      //添加套餐弹出框
      addPackageShow: false,
      //添加套餐
      addPackageForm: {},
      //添加套餐弹出框
      addPersonShow: false,
      //添加套餐
      addPersonForm: {},
      //添加套餐平台弹窗
      PackagePlatShow: false,
      //添加套餐平台
      PackagePlatForm: {},
      // 新增小组弹出框
      addGgroupShow: false,
      //新增小组
      addGgroupForm: {},
      //指定任务弹出框
      TaskShow: false,
      //指定任务
      TaskForm: {},
      //新增人员弹出框
      NewStaffShow: false,
      //新增人员
      NewStaffForm: {},
      //所属小组
      options: [],
      //新增标签弹窗
      labelShow: false,
      //新增标签表单
      labelForm: {},
      // 新增标签表单校验
      labelRules: {
        name: [
          {
            required: true,
            message: "标签名称不能为空",
            trigger: "blur"
          }
        ]
      },
      //支付方式
      PaymentMethodList: [],
      // 总条数
      total: 0,
      //套餐类型
      PackageType: "58 ",
      //套餐平台
      PackageTypeList: []
    };
  },
  computed: {
    ...mapGetters(["tableHeight"])
  },
  created() {
    // this.resetForm("queryParams");

    this.getData();
  },

  methods: {
    //tabs切换
    handleClick(tab, event) {
      if (tab.name == "detail") {
        this.getData();
      } else if (tab.name == "third") {
        this.getFileList();
      } else if (tab.name == "fourth") {
        this.getContract();
      } else if (tab.name == "firth") {
        this.getExpendList();
      } else if (tab.name == "sixth") {
        this.getPaymentPlan();
      }
    },
    //套餐设置tab切换
    PackageClick(tab, event) {
      let tem = null;
      this.PackageTypeList.forEach(item => {
        if (tab.label == item.name) {
          tem = item.value;
        }
      });
      this.companyList = [];
      let queryParams = this.queryParams;
      PackageSettings(queryParams).then(response => {
        response.data.rows.forEach(item => {
          if (tem == item.affiliationType) {
            this.companyList.push(item);
          }
        });
        this.total = response.data.totalRows;
      });

    },
    // 套餐设置
    getData() {

      let queryParams = this.queryParams;
      this.PackageTypeList = [];
      this.companyList = [];
      // 获取套餐平台
      PackagePlatform().then(response => {
        this.PackageTypeList = response.data;

        //套餐数据
        PackageSettings(queryParams).then(response => {
          response.data.rows.forEach(item => {
            if (this.PackageTypeList[0].value == item.affiliationType) {
              this.companyList.push(item);
            }
          });
          this.PackageType = "58";

          this.total = response.data.totalRows;
        });
      });
    },
    // 添加套餐
    addPackage(row) {
      this.addPackageForm.affiliationType = row;
      this.addPackageShow = true;
    },
    //提交新增套餐
    submitPackage() {
      addPackage(this.addPackageForm).then(response => {
        this.addPackageShow = false;
        this.getData();
      });
    },
    // 删除套餐
    delPackage(row) {
      let id = row.id;
      this.$confirm("是否确认彻底删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return deletePackage({ id: id }); //删除接口
        })
        .then(() => {
          this.getData();
          this.msgSuccess("彻底删除成功");

          //刷新列表
        });
    },
    //修改套餐
    updatePackageForm(row) {
      updatePackage(row).then(response => {
      });
    },
    //新增套餐平台
    PackagePlatform() {
      this.PackagePlatForm.type = 50;
      addPackagePlatform(this.PackagePlatForm).then(response => {
        this.PackagePlatShow = false;
        this.getData();
      });
    },

    //支付设置
    getPaymentPlan() {
      this.queryParams.type = 20;
      let queryParams = this.queryParams;
      // this.queryParams.condition = "50";
      payment(queryParams).then(response => {
        this.companyList = response.data.rows;
        this.PaymentMethodList = response.data.rows;
        this.total = response.data.totalRows;
      });
    },
    //添加支付方式
    addPaymentOptions() {
      this.paymentShow = true;
    },
    //删除支付方式
    deletPatternPayment() {
      delPaymentMethod(this.ids).then(response => {
        if (response.code == 200) {
          this.msgSuccess("删除成功");
          this.getPaymentPlan();
        }
      });
    },
    //提交新增支付方式
    addPaymentMethod() {
      NewPaymentMethod(this.paymentForm).then(response => {
        this.getPaymentPlan();
        this.paymentShow = false;
        this.paymentForm.patternPayment = "";
        this.paymentForm.currentRate = "";
      });
    },
  
    //支付二维码
    PaymentQRCode(row) {
      this.QRCodeList = [];
      this.QRCodeShow = true;
      this.QRCodeList.push(row.payUrl);
    },
    // 提单区域设置
    getFileList() {
      let queryParams = this.queryParams;
      // this.queryParams.condition = "20";
      RegionalSettings(queryParams).then(response => {
        this.companyList = response.data.rows;
        this.PaymentMethodList = response.data.rows;
        this.total = response.data.totalRows;
      });
    },
    //添加提单员
    handleAddPerson() {
      this.addPersonShow = true;
    },
    // 负责区域添加
    onAdd() {
      this.items.push("");
    },
    //负责区域删除
    onDel(index) {
      this.items.slice(index, 1);
    },

    //提单员删除
    handleDel(row) {
      let id = row.id;
      this.$confirm("是否确认彻底删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delBilllading({ id: id }); //删除接口
        })
        .then(() => {
          this.msgSuccess("彻底删除成功");
          this.getFileList();
          //刷新列表
        });
    },
    //标签
    getExpendList() {
      let queryParams = this.queryParams;
      // this.queryParams.condition = "40";
      TagEcho(queryParams).then(response => {
        this.companyList = response.data.rows;
        this.PaymentMethodList = response.data.rows;
        this.total = response.data.totalRows;
      });
    },
    //添加标签
    addLabel() {
      this.labelShow = true;
      this.labelForm = {};
    },
    //添加标签提交
    Tagging() {
      this.$refs["labelForm"].validate(valid => {
        if (valid) {
          this.labelForm.type = 20;
          addPackagePlatform(this.labelForm).then(response => {
            this.labelShow = false;
            this.getExpendList();
          });
        }
      });
    },

    //删除标签
    delLabel() {
      deleteLabel(this.ids).then(response => {
        if (response.code == 200) {
          this.msgSuccess("删除成功");
          this.getExpendList();
        }
      });
    },

    //团队与业绩
    getContract() {
      // this.queryParams.condition = "30";
    },
    // 新增小组
    handleAddGroup() {
      this.addGgroupShow = true;
    },
    //组别删除
    delGroup(row) {},
    //指定任务
    handleTask(row) {
      this.TaskShow = true;
    },
    //新增人员
    NewStaff() {
      this.NewStaffShow = true;
    },
    //人员删除
    delGroup(row) {},
    handleQuery() {},
  
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    //负责区域
    // handleRegionChange(value, type = 20) {
    //   if (type == 10) {
    //     this.queryParams.district = value;
    //     this.queryParams.province = CodeToText[value[0]];
    //     this.queryParams.city = CodeToText[value[1]];
    //     this.queryParams.county = CodeToText[value[2]];
    //   } else {
    //     this.form.district = value;
    //     this.form.province = CodeToText[value[0]];
    //     this.form.city = CodeToText[value[1]];
    //     this.form.county = CodeToText[value[2]];
    //   }
    // },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      // this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs.queryParams.resetFields();
      this.queryParams.condition = "detail";
      this.resetForm("queryParams");
    },
    getList() {
      // this.loading = false;
    }
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
    .is-left {
      width: 188px;
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
            .table-data {
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

.father {
  position: relative;
}
.son {
  position: absolute;
  left: 90px;
  top: 16px;
  font-size: 14px;
}
.Rmb {
  position: absolute;
  left: 102px;
  top: 17px;
  font-size: 14px;
}
.jia {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  line-height: 32px;
  background: #f8f9fb;
  border: 1px solid #e6e7eb;
  color: #6e7073;
}
.even {
  > :nth-child(2n + 1) {
    margin-right: 85px;
  }
}
.payment {
  position: relative;
  .feilv {
    position: absolute;
    top: 3px;
    right: 70px;
    z-index: 99;
  }
}

.signingTime {
  position: relative;
  .yue {
    position: absolute;
    top: 37px;
    right: 12px;
    z-index: 99;
  }
}
</style>
<style lang="scss">
.wortSet {
  // .search-popover .clientsLv .el-form-item__content,.el-input--small .el-input__inner{
  //   width: 220px;
  // }
  // .search-popover.el-input--small .el-input__inner{
  //   width: 220px !important;
  // }

  // .el-input--small .el-input__inner {
  // color: #d2d3d6;
  // }
  .el-checkbox__label {
    padding-left: 16px;
  }
  .el-tabs--left .el-tabs__header.is-left {
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
.PackagePlatform {
  color: #0659e3;
  width: 148px;
  height: 40px;
  border: 1px solid #e6e7eb;
  text-align: center;
  background: #f8f9fb;
}
</style>
