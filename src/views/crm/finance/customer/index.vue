<template>
  <div class="app-container">
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
                <el-form-item label="业务员" prop="createBy">
                  <el-input
                    placeholder="请输入业务员名称"
                    v-model="queryParams.createBy"
                    class="mw222"
                    size="small"
                  >
                  </el-input>
                </el-form-item>
                <!-- <el-form-item label="联系人" prop="linkman">
                  <el-input
                    placeholder="请输入联系人名称"
                    v-model="queryParams.linkman"
                    class="mw222"
                    size="small"
                  >
                  </el-input>
                </el-form-item> -->
                <el-form-item label="客户等级" prop="clientLv">
                  <el-radio-group v-model="queryParams.clientLv">
                    <el-radio
                      v-for="item in clientLvList"
                      :key="item.dictCode "
                      :label="item.dictCode"
                    >
                      {{ item.dictName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="省市区" prop="district">
                  <el-select
                    style="width:100px"
                    v-model="queryParams.province"
                    placeholder="所在省份"
                    @change="provinceChange"
                  >
                    <el-option
                      v-for="item in dataList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                      @click.native="getProvinceItem(item)"
                    >
                    </el-option>
                  </el-select>
                  <el-select
                    style="width:100px;margin-left:15px;"
                    v-model="queryParams.city"
                    placeholder="所在市"
                    @change="cityChange"
                  >
                    <el-option
                      v-for="item in cityList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                      @click.native="getCityItem(item)"
                    ></el-option>
                  </el-select>
                  <el-select
                    style="width:100px;margin-left:15px;"
                    v-model="queryParams.county"
                    placeholder="所在区"
                  >
                    <el-option
                      v-for="item in areaList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="所在地区" prop="district">
                  <el-cascader
                    placeholder="请选择信息所在地区"
                    class="mw222"
                    size="small"
                    :options="areaOptions"
                    v-model="queryParams.district"
                    @change="val => handleRegionChange(val, 10)"
                  >
                  </el-cascader>
                </el-form-item> -->
                <!-- <el-form-item label="状态">
                  <el-select v-model="queryParams.value" placeholder="请选择">
                    <el-option
                      v-for="item in stateList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="标记">
                  <el-input
                    style="width:230px;"
                    v-model="queryParams.labelName"
                    placeholder="请输入标记"
                  ></el-input>
                </el-form-item> -->
                <el-form-item label="纳税性质" prop="labelName">
                  <el-select v-model="queryParams.labelName">
                    <el-option
                      v-for="item in TaxNatureList"
                      :key="item.labelId"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否切老户"  prop="companies">
                  <el-radio-group v-model="queryParams.companies">
                    <el-radio
                      v-for="item in yesNoList"
                      :label="item.dictCode"
                      >{{ item.dictLabel }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="开始创建时间" prop="labelName">
                  <el-date-picker
                    v-model="queryParams.creationStartTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择开始创建时间"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="结束创建时间" prop="labelName">
                  <el-date-picker
                    v-model="queryParams.creationEndTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择创建时间"
                  >
                  </el-date-picker>
                </el-form-item>
                <!--                 <el-form-item label="客户类型" prop="clientType">-->
                <!--                  <el-radio-group v-model="queryParams.clientType">-->
                <!--                    <el-radio v-for="item in clientType" :key="item.dictCode" :label="item.dictCode">-->
                <!--                      {{item.dictName}}-->
                <!--                    </el-radio>-->
                <!--                  </el-radio-group>-->
                <!--                </el-form-item>-->
              </el-form>
              <div class="popover-footer">
                <!--                <el-button type="success" size="small" @click="cancel">取消</el-button>-->
                <el-button type="cyan" size="small" @click="resetQuery"
                  >重置</el-button
                >
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认</el-button
                >
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search"
              >筛选
            </el-button>
          </el-popover>

          <el-popover
            ref="popover"
            style="width:100px !important;display: inline-block;margin-left:8px"
            placement="bottom-start"
            trigger="click"
            @show="onShowPopover"
            @hide="onHidePopover"
          >
            <el-tree
              node-key="id"
              ref="deptTree"
              class="select-tree"
              highlight-current
              show-checkbox
              check-strictly
              :style="`min-width: ${treeWidth}`"
              :data="companyOptions"
              :props="{
                label: 'name',
                children: 'companyStructures'
              }"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              :default-expand-all="false"
              @node-click="onClickNode"
              @check-change="handleNodeClick"
            >
            </el-tree>
            <el-input
              slot="reference"
              ref="input"
              v-model="labelModel"
              clearable
              :style="`width: ${width}px`"
              :class="{ rotate: showStatus }"
              suffix-icon="el-icon-arrow-down"
              :placeholder="placeholder"
            >
            </el-input>
          </el-popover>

          <el-input
            class="ml8"
            v-model="queryParams.companyName"
            placeholder="请输入客户简称或表编号或税号"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuerys"
          />
         <!-- <el-dropdown
            v-if="roles.indexOf('accountExecutiveSupervisor') == -1"
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAddCustomer"
            v-noRole="[
              'dispatchClerks',
              'marketCompanyBusirInternalAccount'
            ]"
          >
            <span>
              <i class="el-icon-plus"></i>
              新建客户
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item
              >

            </el-dropdown-menu>
          </el-dropdown> -->

          <el-button
            class="ml8"
            icon="el-icon-upload2"
            size="small"
            @click="handleExport"
            v-hasPermi="['crm:log:export']"
            >导出
          </el-button>
        </el-col>
      </el-row>
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>
    <!--  -->
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.clientType" @tab-click="handleQuerys">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <el-tab-pane
          v-for="item in clientType"
          :key="item.dictCode "
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
        ></el-tab-pane>
        <el-tab-pane label="即将到期客户" value="400" name="400"></el-tab-pane>
        <el-tab-pane label="欠费客户" value="500" name="500"></el-tab-pane>
      </el-tabs>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button
            size="mini"
            circle
            icon="el-icon-refresh"
            @click="handleQuery"
          />
        </el-tooltip>
      </div>
    </div>

    <div
      class="table-data"
      v-show="queryParams.clientType != 400 && queryParams.clientType != 500"
    >
      <el-table
        class="slither"
        v-loading="loading"
        :data="companyList"
        @selection-change="handleSelectionChange"
        @row-click="handleRowFun"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="center" />

        <el-table-column
          label="公司名称"
          align="left"
          prop="companyName"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" :disabled="!scope.row.newAccount"  effect="dark" content="切老户" placement="top">
              <div>{{ scope.row.companyName }}</div>
            </el-tooltip>
            <el-dropdown
              v-if="scope.row.crmIntermUserlabels != ''"
              trigger="click"
              class="choice"
            >
              <span class="el-dropdown-link">
                {{ scope.row.crmIntermUserlabels[0].name
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in scope.row.crmIntermUserlabels"
                  :key="index"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-select
              v-model="scope.row.vatCollection"
              class="choice"
               readonly
              :placeholder="scope.row.crmIntermUserlabels[0].name"
              v-if="scope.row.crmIntermUserlabels != ''"
            >
              <el-option
                v-for="item in scope.row.crmIntermUserlabels"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              />
            </el-select> -->
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="客户编号"
          align="left"
          prop="client"
          width="220"
        /> -->
        <el-table-column
          label="社会信用代码"
          align="left"
          prop="creditCode"
          min-width="200"
        />
        <el-table-column
          label="联系方式"
          align="left"
          prop="linkmanPhone"
          min-width="200"
        />
        <el-table-column
          label="客户经理"
          prop="createBy"
          align="left"
          min-width="200"
        />
         <el-table-column
          label="客户创建时间"
          align="left"
          prop="createDate"
          min-width="200"
        />
        <!-- <el-table-column
          label="客户类型"
          align="left"
          prop="clientType"
          :formatter="firmTypeFormat"
        /> -->
        <!-- <el-table-column
          label="用户标签信息"
          align="left"
          prop="userlabelIds"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-tag
              size="min"
              :key="tag"
              v-for="tag in JSON.parse(scope.row.userlabelIds || '[]')"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          label="客户等级"
          align="left"
          prop="clientLv"
          :formatter="clientLvFormat"
        /> -->
        <!-- <el-table-column label="联系人" align="left" prop="linkman" />
         -->
        <el-table-column
          label="所属区域"
          align="left"
          prop="province"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.province }} {{ scope.row.city }} {{ scope.row.county }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="公司详情地址"
          align="left"
          prop="address"
          min-width="250"
        /> -->
        <!-- <el-table-column
          label="经营范围"
          align="left"
          prop="businessScope"
          min-width="100"
        /> -->

        <!-- <el-table-column
          label="全国统一信用编码"
          align="left"
          prop="creditCode"
          min-width="200"
        /> -->
        <!-- <el-table-column
          label="企业税号"
          align="left"
          prop="enterpriseNumber"
          min-width="200"
        /> -->
        <!-- <el-table-column
          label="行业分类"
          align="left"
          prop="industryName"
          :formatter="industryFun"
          min-width="200"
        >
        </el-table-column> -->
        <el-table-column
          label="业务简介"
          align="left"
          prop="categoryText"
          min-width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <!-- <el-table-column
          label="客户来源"
          align="left"
          prop="clientSource"
          :formatter="businessFromFormat"
          min-width="80"
        /> -->
        <!-- <el-table-column
          label="在其他公司代账"
          align="left"
          prop="companies"
          :formatter="
            row => {
              return selectDictLabel(yesNoList, row.companies);
            }
          "
          min-width="120"
        /> -->
        <!-- <el-table-column
          label="意向度"
          align="left"
          prop="opinion"
          min-width="100"
        /> -->
        <!-- <el-table-column
          label="备注"
          align="left"
          prop="remarks"
          min-width="200"
        /> -->
        <el-table-column
          label="操作"
          align="center"
          class-name="table-control"
          fixed="right"
          width="220"
        >
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
          </template>
          <template slot-scope="scope">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-button
                 :disabled="scope.row.churnType == 10"
                  size="mini"
                  type="primary"
                  @click="newOrders(scope.row)"
                  v-hasPermi="['share:bank:edit']"
                  >创建订单</el-button
                >
              </el-col>
              <el-col :span="12">
                <el-button
                 :disabled="scope.row.churnType == 10"
                  type="primary"
                  size="mini"
                  v-hasPermi="['share:bank:edit']"
                  @click="handleSign(scope.row.id)"
                >
                  标记</el-button
                >
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <!-- 即将到期客户 -->
    <div class="table-data" v-show="queryParams.clientType == 400">
      <el-table
        class="slither"
        v-loading="loading"
        :data="expireList"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="客户名称"
          align="left"
          prop="companyName"
          width="180"
        >
          <!-- <template slot-scope="scope">
            <div>{{ scope.row.companyName }}</div>

            <el-dropdown
              v-if="scope.row.crmIntermUserlabels != ''"
              class="choice"
            >
              <span class="el-dropdown-link">
                {{ scope.row.crmIntermUserlabels[0].name }}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in scope.row.crmIntermUserlabels"
                  :key="index"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template> -->
        </el-table-column>
        <el-table-column
          label="项目名称"
          align="left"
          prop="serpriceName"
          width="180"
        />
        <el-table-column label="收费负责人" align="left" prop="name" />
        <el-table-column
          label="收费周期"
          align="left"
          prop="cycleType"
          width="180"
          :formatter="cycleTypeFormat"
        />
        <el-table-column label="合同有效期" align="left" width="300">
          <template slot-scope="scope">
            {{
              parseTime(scope.row.startTime, "{y}-{m}-{d}") +
                " — " +
                parseTime(scope.row.endTime, "{y}-{m}-{d}")
            }}
          </template>
        </el-table-column>

        <el-table-column
          label="到期时间"
          align="left"
          prop="endTime"
          min-width="100"
        />
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <!-- 欠费客户 -->
    <div class="table-data" v-show="queryParams.clientType == 500">
      <el-table
        class="slither"
        v-loading="loading"
        :data="arrearsList"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="客户名称"
          align="left"
          prop="companyName"
          width="180"
        >
       <template slot-scope="scope">
            <div>{{ scope.row.companyName }}</div>
            <!-- <el-dropdown
              v-if="scope.row.crmIntermUserlabels != ''"
              trigger="click"
              class="choice"
            >
              <span class="el-dropdown-link">
                {{ scope.row.crmIntermUserlabels[0].name
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in scope.row.crmIntermUserlabels"
                  :key="index"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown> -->
          </template>
        </el-table-column>
        <el-table-column
          label="项目名称"
          align="left"
          prop="serpriceName"
          width="180"
        />
        <el-table-column label="收费负责人" align="left" prop="name" />
        <el-table-column label="收费状态" align="left" prop="state">
          <el-tag type="danger">
            {{ "欠费" }}
          </el-tag>
        </el-table-column>
        <el-table-column
          label="本期应收"
          align="left"
          prop="amountReceivable"
        />
        <el-table-column label="代账费已收至" align="left" prop="finishTime" />
        <el-table-column
          label="收费周期"
          align="left"
          prop="cycleType"
          width="180"
          :formatter="cycleTypeFormat"
        />
        <el-table-column label="最近收费时间" align="left" prop="lastTime" />
        <el-table-column
          label="到期时间"
          align="left"
          prop="expireDate"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ parseTime(scope.row.expireDate, "{y}-{m}-{d}") }}
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <!-- 新增客户 -->
    <el-dialog
      title="新增客户"
      open
      :visible.sync="openCustomer"
      width="704px"
      append-to-body
      class="addCustomer businiss"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :label-position="labelPosition"
        class="chengjiao"
      >
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="公司名称" prop="companyName">
              <el-input
                v-model="form.companyName"
                placeholder="请输入公司名称"
                @blur="inquireCompany"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称" prop="linkman">
              <el-input v-model="form.linkman" placeholder="请输入客户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人方式" prop="linkmanPhone">
              <el-input
                maxlength="11"
                v-model="form.linkmanPhone"
                placeholder="请输入联系人方式"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户类型" prop="clientType">
              <el-select v-model="form.clientType" placeholder="请选择客户类型">
                <el-option
                  v-for="item in clientType"
                  :label="item.dictName"
                  :value="item.dictCode"
                  :key="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- </el-row>

        <el-row type="flex" justify="space-between" :gutter="24"> -->
          <el-col :span="8">
            <el-form-item label="客户等级" prop="clientLv">
              <el-select
                class="mw222"
                size="small"
                v-model="form.clientLv"
                placeholder="请选择客户等级"
              >
                <el-option
                  v-for="item in clientLvList"
                  :label="item.dictName"
                  :value="item.dictCode"
                  :key="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税性质" prop="labelId">
              <el-select v-model="form.labelId" placeholder="请选择纳税性质">
                <el-option
                  v-for="item in TaxNatureList"
                  :label="item.name"
                  :value="item.labelId"
                  :key="item.labelId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在地区" prop="district">
              <el-cascader
                placeholder="请选择信息所在地区"
                style="width: 100%"
                size="small"
                :options="areaOptions"
                v-model="form.district"
                @change="handleRegionChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <!-- </el-row>
        <el-row type="flex" justify="space-between" :gutter="24"> -->
          <el-col :span="8">
            <el-form-item label="行业分类" prop="industryName">
              <el-cascader
                class="mw100"
                v-model="form.industryName"
                :options="industryMap"
                filterable
                :props="{ label: 'name', value: 'id', children: 'broadList' }"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户来源" prop="clientSource">
              <el-select
                v-model="form.clientSource"
                placeholder="请选择客户来源"
                ><el-option
                  v-for="item in clientSourceList"
                  :label="item.dictName"
                  :value="item.dictCode"
                  :key="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
        </el-row>
        <!-- 其他公司代账 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="是否切老户:" prop="companies">
              <el-radio
                v-for="item in yesNoList"
                v-model="form.companies"
                :label="item.dictCode"
                :key="item.dictCode"
                >{{ item.dictLabel }}</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input
                v-model="form.address"
                style="width: 592px;"
                placeholder="请输入详细地址"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="业务描述" prop="categoryText">
              <el-input
                v-model="form.categoryText"
                style="width: 592px;"
                placeholder="请填写业务描述"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="标签" prop="userlabelIds">
              <div class="tag-vi">
                <el-tag
                  :key="index"
                  v-for="(tag,index) in form.userlabelIds"
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
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加标签
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
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
          <span class="title">模块下载:</span>
          <el-button style="padding:0px;border:0px;" @click="downloadModule">
            <el-tag style="margin:0px;">下载</el-tag>
          </el-button>
        </el-col>
        <el-col :span="24" style="display:flex">
          <span class="title">上传文件:</span>
          <el-upload
            ref="importUpdateFile"
            class="upload-demo"
            :auto-upload="false"
            :action="importFileUrl"
            :on-change="uploadingTrigger"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            accept=".xls,.xlsx"
            :on-exceed="handleExceed"
            :file-list="importFileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              上传文件只能为excel文件，且为xlsx,xls格式
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitFormUploading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 标记 -->
    <el-dialog
      title="标记"
      :visible.sync="signShow"
      width="705px"
      append-to-body
    >
      <el-row>
        <el-col :span="10">
          <div class="sign">
            <div>全部标签</div>
            <div style="height:446px;overflow:auto">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-checked-keys="departmentId"
                default-expand-all
                @check-change="handleCheckChange"
                :expand-on-click-node="false"
              >
                <span
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                  style="padding-right:10px;display:flex;justify-content:space-between;width: 100%;"
                >
                  <span v-show="!data.isEdit">
                    <span
                      :class="[data.id >= 99 ? 'slot-t-node--label' : '']"
                      >{{ node.label }}</span
                    >
                  </span>

                  <span v-show="data.isEdit">
                    <el-input
                      class="slot-t-input"
                      size="mini"
                      style="width:100px"
                      autofocus
                      v-model="data.label"
                      :ref="'slotTreeInput' + data.id"
                      @blur.stop="NodeBlur(node, data)"
                      @keydown.native.enter="NodeBlur(node, data)"
                    >
                    </el-input>
                  </span>

                  <!-- <span>
                    <i
                      v-if="node.level == 1"
                      class="el-icon-circle-plus-outline tagIcon"
                      @click="append(data)"
                      style="margin-left: 5px"
                    >
                    </i>
                    <i
                      class="el-icon-edit tagIcon"
                      @click="Edit(node, data)"
                      style="margin-left: 5px"
                    >
                    </i>
                    <i
                      class="el-icon-delete tagIcon"
                      @click="remove(node, data)"
                      style="margin-left: 5px"
                    >
                    </i>
                  </span> -->
                </span>
              </el-tree>
              <!-- 单选 -->
              <el-tree
                :data="treeData"
                show-checkbox
                node-key="id"
                ref="singleTree"
                :default-checked-keys="departId"
                default-expand-all
                @check-change="handleChange"
                :expand-on-click-node="false"
                :check-strictly="true"
                :props="prods"
              >
                <span
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                  style="padding-right:10px;display:flex;justify-content:space-between;width: 100%;"
                >
                  <span v-show="!data.isEdit">
                    <span
                      :class="[data.id >= 99 ? 'slot-t-node--label' : '']"
                      >{{ node.label }}</span
                    >
                  </span>

                  <span v-show="data.isEdit">
                    <el-input
                      class="slot-t-input"
                      size="mini"
                      style="width:100px"
                      autofocus
                      v-model="data.label"
                      :ref="'slotTreeInput' + data.id"
                      @blur.stop="NodeBlur(node, data)"
                      @keydown.native.enter="NodeBlur(node, data)"
                    >
                    </el-input>
                  </span>

                  <!-- <span>
                    <i
                      v-if="node.level == 1"
                      class="el-icon-circle-plus-outline tagIcon"
                      @click="treeAppend(data)"
                      style="margin-left: 5px"
                    >
                    </i>
                    <i
                      class="el-icon-edit tagIcon"
                      @click="treeEdit(node, data)"
                      style="margin-left: 5px"
                    >
                    </i>
                    <i
                      class="el-icon-delete tagIcon"
                      @click="treeRemove(node, data)"
                      style="margin-left: 5px"
                    >
                    </i>
                  </span> -->
                </span>
              </el-tree>
            </div>
            <!-- <div
              @click="addGroup"
              v-if="roles.indexOf('customerServiceClerk') == -1"
            >
              <i class="el-icon-plus"></i>新增组
            </div> -->
          </div>
        </el-col>
        <el-col
          :span="2"
          style=" text-align: center;
           line-height: 480px;color:#6E7073; "
        >
          <i class="el-icon-d-arrow-right"></i>
        </el-col>
        <el-col :span="10">
          <div class="sign">
            <div>已选标签</div>
            <div style="height:446px;">
              <div
                v-for="(item, index) in arr"
                :key="index"
                style=" padding:5px 15px 5px 15px;display:flex;justify-content:space-between"
              >
                <span>{{ item.label }} </span>
                <span>
                  <i
                    class="el-icon-delete tagIcon"
                    @click="setCheckedNodes(item, index)"
                    style="margin-left: 5px;cursor:pointer;"
                  >
                  </i>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="signShow = false">取消</el-button>
        <el-button type="primary" @click="getCheckedNodes()">确认</el-button>
      </div>
    </el-dialog>
    <!-- 新增标记组别 -->
    <el-dialog title="新增分组" :visible.sync="signGroupShow" width="505px">
      <el-input v-model="group"> </el-input>
      <div style="margin-top:10px;display:flex;">
        <span style="line-height:32px;margin-right:20px">选择方式:</span>
        <span>
          <el-radio-group v-model="singleChoice">
            <el-radio
              v-for="item in choiceModeList"
              :key="item.dictCode"
              :label="item.dictCode"
              :value="item.dictCode"
            >
              {{ item.dictName }}</el-radio
            >
          </el-radio-group>
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="signGroupShow = false">取消</el-button>
        <el-button type="primary" @click="newGroup">确认</el-button>
      </div>
    </el-dialog>
    <!-- 查看创建订单 -->
    <!-- <edit-order :visible.sync="orderVisible" :orderId="orderId" :hidden-tab="hiddenTab"></edit-order> -->
    <!--    <edit-contract :visible.sync="open" :orderId="orderId"></edit-contract>-->
    <edit-drawer
      ref="editDrawer"
      :visible.sync="view"
      :companyId="companyId"
      :settings="settings"
      @editOrder="editOrderFun"
    ></edit-drawer>

  </div>
</template>

<script>
import {
  listClient,
  addClient,
  delClient,
  getClient,
  alterClient, //修改客户信息
  entrepreneurMessageLiaison,
  ExpiringCustomers, //即将到期客户
  CustomerInArrears, //欠费客户
  TaxNature, //纳税性质
  exportCustomer
} from "@/api/crm/customer/customer";
import { mapGetters } from "vuex";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import EditOrder from "@/views/components/EditOrder";
import { throttle } from "@/utils/hmt";
import { getMapIndustry } from "@/api/crm/index"; //行业分类
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import EditDrawer from "@/views/components/EditDrawer/index";
import { mapState } from "vuex";
import login_bfVue from "../../../login_bf.vue";
import {
  MarkEcho,
  checkLabel,
  addLabel,
  delLabel,
  updateLabel
} from "../../../../api/crm/customerService/agentAccount";
import { CompanyDepartmentPersonnel } from "../../../../api/crm/finance/customer";
import { listCompany } from "@/api/system/company";
export default {
  components: {
    EditDrawer,
    EditOrder
  },
  name: "Customer",
  props: {
    // 接收绑定参数
    value: {
      required: false,
      default: -1
    },
    // 输入框宽度
    width: String,
    // 输入框占位符
    placeholder: {
      type: String,
      required: false,
      default: "组织架构"
    }
  },
  data() {
    const data = [];
    const treeData = [];
    return {
      // 树状菜单显示状态
      showStatus: false,
      // 菜单宽度
      treeWidth: "auto",
      // 输入框显示值
      labelModel: "",
      // 实际请求传值
      valueModel: "0",
      // 公司树选项
      companyOptions: [],

      filePath: process.env.VUE_APP_FILE_API,
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload",
      importFileUrl:
        process.env.VUE_APP_CRM_API +
        "/hmkj-crm/resoBusinessOpportunity/bulkImport",
      signId: null,
      data: [],
      data: JSON.parse(JSON.stringify(data)),
      //树形控件回显数据
      treeData: [],
      treeData: JSON.parse(JSON.stringify(treeData)),
      ImageUrlList: [],
      //新增小组
      group: "",
      stateList: [
        { label: "正常", value: 10 },
        { label: "流失", value: 20 }
      ],
      //展示选中的小组
      arr: [],
      arrp: [],
      //选中的标签
      departmentId: [],
      departId: [],
      //标记弹出框
      signShow: false,
      //新增标记组别
      signGroupShow: false,
      //标记新增小组是否单选
      singleChoice: null,
      //即将到期客户列表
      expireList: [],
      //欠费客户列表
      arrearsList: [],
      //收费周期
      cycleTypeList: [],
      //新增客户弹出层
      openCustomer: false,
      uploadingFile: false, //上传
      dialogProject: false,
      orderVisible: false, //查看订单显示
      proTypeList: [], //产品类型数据
      proTypeOption: [],
      orderId: "",
      hiddenTab: true,
      requestData:{},//导出的参数列表
      stepIndex: 0,
      dynamicTags: [],
      labelPosition: "top",
      sourceTypeLv: [],
      orderTypeList: [], //订单状态
      clientLvList: [], //客户等级字典
      radio: "1",
      newOrderVisible: false, //新增订单
      dialogVisible: false, //
      dialogVisibleTwo: false,
      clientLv: null, //客户等级
      clientType: [], //客户类型字典
      vatTypeList: [], //增值税类型
      TaxNatureList: [], //纳税性质
      CustomerTaxList: [], //客户纳税性质展示
      industryMap: [], //行业分类
      clientSourceList: [], //客户来源
      dataList: regionData, //下拉菜单数据 存的是所有的数据
      cityList: [], //存储所有的市 和区
      areaList: [], //存储所i有的区
      areaOptions: regionData, //区域数据
      enterpriseMessageList: {}, //企业信息
      marketTaxInforResultList: {}, //企业信息-税务信息
      bankResultList: {}, //银行
      personnelResultsList: [], //股东
      contactsList: [], //联系人数据
      contractList: [{ controlNo: 11 }, { controlNo: 22 }, { controlNo: 33 }], //合同数据
      signingDate: null, //签约日期
      headers: { Authorization: _getSessionStore(tokenKey) },
      inputVisible: false,
      inputValue: "",
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      dadeIds: [], //合同
      // 非多个禁用
      dateMultiple: true,
      // 显示搜索条件
      dadeShowSearch: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      delSwitch: [],
      // 总条数
      total: 0,
      yesNoList: [],
      choiceModeList: [],
      // 公司表格数据
      companyList: [],
      //订单表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否抽屉弹出层
      view: false,
      // 状态数据字典
      statusOptions: [],
      clientTypeCut:'',//切换状态值
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        type:20,
        clientType:'0',
        clientLv: null,
        linkman: null, //联系人
        district: null, //所在地区
        createBy: null, //业务员
        companyId: null,
        deptId: null,
        firm: null,
        id: null,
        firmId:'',
        createId:'',
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        accomplishTime: null,
        followTime: null,
        enteringTime: null,
        appId: "",
        area: "",
        county: "",
        companyName: "",
        roleName: null,
        province:'',
      city:'',
      labelName:'',
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // clienteleName: [
        //   {
        //     required: true,
        //     message: "公司名称不能为空",
        //     trigger: "blur"
        //   }
        // ],
        companyName: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur"
          }
        ],
        // clientType: [
        //   {
        //     required: true,
        //     message: "客户类型不能为空",
        //     trigger: "blur"
        //   }
        // ],
        city: [
          {
            required: true,
            message: "所在地不能为空",
            trigger: "blur"
          }
        ],

        companyId: [
          {
            required: true,
            message: "公司Id不能为空",
            trigger: "blur"
          }
        ],
        linkmanPhone: [
          {
            required: true,
            message: "联系方式不能为空",
            trigger: "blur"
          }
        ],

        industryName: [
          {
            required: true,
            message: "行业分类不能为空",
            trigger: "blur"
          }
        ],
        district: [
          {
            required: true,
            message: "信息所在地不能为空",
            trigger: "blur"
          }
        ]
      },

      settings: [{ icon: "el-icon-position", lable: "流失申请", value: "1" }],
      load: false,
      stepIndex: 0,
      activeOrder: "second",
      companyId: null,
      // 上传
      fileList: [],
      importFileList: [], //导入数据
      prods: {
        disabled: (data, node) => {
          // console.info(data, node)
          return data.children && data.children.length > 0 ? true : false;
        }
      },
      singleChecked: [],

    };
  },
  computed: {
    // 是否为树状结构数据
    dataType() {
      const jsonStr = JSON.stringify(this.options);
      return jsonStr.indexOf(this.props.children) !== -1;
    },
    // 若非树状结构，则转化为树状结构数据
    data() {
      return this.dataType ? this.options : this.switchTree();
    },
    // ————————————————
    // 版权声明：本文为CSDN博主「一路从容」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    // 原文链接：https://blog.csdn.net/qq_41042845/article/details/93609707

    ...mapGetters(["tableHeight"]),
    // view: {
    //     get() {
    //       if (this.visible) {
    //         this.getData()
    //       }
    //     }
    // }
    ...mapState({
      userInfo: state => state.user
    })
  },
  watch: {
    view: function(val, oldVal) {
      if (!val) {
        this.getList();
      }
    }
  },
  created() {
    this.getCompanyList();
    // 检测输入框原有值并显示对应 label
    if (this.value || this.value == 0) {
      //初始值可能为0
      this.labelModel = this.queryTree(this.data, this.value);
    }
    // // 获取输入框宽度同步至树状菜单宽度
    this.$nextTick(() => {
      this.treeWidth = `${(this.width ||
        this.$refs.input.$refs.input.clientWidth) - 24}px`;
    });
    // ————————————————
    // 版权声明：本文为CSDN博主「一路从容」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    // 原文链接：https://blog.csdn.net/qq_41042845/article/details/93609707

    this.roles = this.userInfo.roleCodes;
    this.getDicts("del_switch").then(res => {
      this.delSwitch = res.data;
    });
    this.getDicts("choice_mode").then(res => {
      this.choiceModeList = res.data;
    });

    this.getDicts("sys_yes_no").then(res => {
      this.yesNoList = res.data;
    });
    //收费周期
    this.getDicts("fees_cycle").then(res => {
      this.cycleTypeList = res.data;
    });

    //增值税类型
    this.getDicts("vat_type").then(res => {
      this.vatTypeList = res.data;
    });
    //客户来源
    this.getDicts("business_from").then(res => {
      this.clientSourceList = res.data;
    });

    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("order_state").then(res => {
      this.orderTypeList = res.data;
    });
    //客户等级
    this.getDicts("customer_rating").then(res => {
      this.clientLvList = res.data;
    });
    //客户类型
    this.getDicts("opportunity_type").then(res => {
      this.clientType = res.data;
    });
    this.getList();
    this.queryParams.appId = this.$store.getters.appId + "";
    getMapIndustry().then(res => {
      this.industryMap = res.data;
    }); //行业分类
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      console.info(to, from);
      if (
        to.path == "/financeCustomer/customerList" &&
        from.path == "/index" &&
        to.query.add == "true"
      ) {
        vm.handleAddCustomer();
      }
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    // 查询公司
    inquireCompany(e) {
      this.form.keywordCompanyNameFlag=10
      listClient({ clientName: this.form.companyName,keywordCompanyNameFlag:10 }).then(response => {
         this.form.keywordCompanyNameFlag=''
        if (response.data.rows[0]) {
          this.form = response.data.rows[0];
          var ppp = this.form.industryName
            .replace("]", "")
            .replace("[", "")
            .split(",");
          var industryName = [];
          ppp.forEach((item, index) => {
            industryName.push(Number(item));
          });
          this.form.industryName = industryName;
          if(response.data.rows[0].crmIntermUserlabels.length!=0){
          this.form.labelId = response.data.rows[0].crmIntermUserlabels[0].id;
          }
          var arr = [];
          arr.push(TextToCode[response.data.rows[0].province].code);
          arr.push(
            TextToCode[response.data.rows[0].province][
              response.data.rows[0].city
            ].code
          );
          arr.push(
            TextToCode[response.data.rows[0].province][
              response.data.rows[0].city
            ][response.data.rows[0].county].code
          );
          this.form.district = arr;
        }
      });
    },
    getCompanyList() {
      CompanyDepartmentPersonnel({}).then(response => {
        let companyOptions = response.data;
        this.companyOptions = companyOptions || [];
        this.getList();
      });
    },

    handleNodeClick(data, checked) {
      if (checked) {
        this.labelModel = data.name;
        if (data.deptId != "") {
          this.queryParams.firmId = "";
          this.queryParams.createId = "";
          this.queryParams.deptId = data.deptId;
          this.getList();
          this.showStatus = false;
        } else if (data.companyId == "" && data.deptId == "") {
          this.queryParams.firmId = "";
          this.queryParams.deptId = "";
          this.queryParams.createId = data.id;
          this.getList();
        } else {
          this.queryParams.createId = "";
          this.queryParams.deptId = "";
          this.queryParams.firmId = data.companyId;
          this.getList();
        }
      }
      let option = this.companyOptions;
      this.setTreeCheck(option, data.id, checked);
    },

    setTreeCheck(data, id, checked) {
      data.forEach(item => {
        if (item.id == id || !checked) {
          // this.$refs.deptTree.setChecked(data.deptId,true,false)
        } else {
          this.$refs.deptTree.setChecked(item.id, false, false);
        }
        if (item.companyStructures && item.companyStructures.length > 0) {
          this.setTreeCheck(item.companyStructures, id, checked);
        }
      });
    },
    // 单击节点
    onClickNode(node) {
      this.queryParams.companyId = data.companyId;
      this.labelModel = node[this.props.label];
      this.valueModel = node[this.props.rowId];
      this.onCloseTree();
    },
    // 偏平数组转化为树状层级结构
    switchTree() {
      return this.cleanChildren(this.buildTree(this.options, "0"));
    },
    // 隐藏树状菜单
    onCloseTree() {
      this.$refs.popover.showPopper = false;
    },
    // 显示时触发
    onShowPopover() {
      this.showStatus = true;
      this.$refs.deptTree.filter(false);
    },
    // 隐藏时触发
    onHidePopover() {
      this.showStatus = false;
      this.$emit("selected", this.valueModel);
    },
    // 树节点过滤方法
    filterNode(query, data) {
      if (!query) return true;
      return data[this.props.label].indexOf(query) !== -1;
    },

    // 搜索树状数据中的 ID
    queryTree(tree, id) {
      let stark = [];
      stark = stark.concat(tree);
      while (stark.length) {
        const temp = stark.shift();
        if (temp[this.props.children]) {
          stark = stark.concat(temp[this.props.children]);
        }
        if (temp[this.props.rowId] === id) {
          return temp[this.props.label];
        }
      }
      return "";
    },
    // 将一维的扁平数组转换为多层级对象
    buildTree(data, id = "0") {
      const fa = parentId => {
        const temp = [];
        for (let i = 0; i < data.length; i++) {
          const n = data[i];
          if (n[this.props.parent] === parentId) {
            n.children = fa(n.rowGuid);
            temp.push(n);
          }
        }
        return temp;
      };
      return fa(id);
    },
    // 清除空 children项
    cleanChildren(data) {
      const fa = list => {
        list.map(e => {
          if (e.children.length) {
            fa(e.children);
          } else {
            delete e.children;
          }
          return e;
        });
        return list;
      };
      return fa(data);
    },


    // 取出来所有的市
    getProvinceItem(item) {
      this.cityList = item.children;
    },
    provinceChange() {
      this.cityList = [];
      this.areaList = [];
      this.queryParams.city = "";
      this.queryParams.county = "";
    },
    // 取出来所有的区
    getCityItem(item) {
      this.areaList = item.children;
    },
    cityChange() {
      this.queryParams.county = "";
    },
    //新增客户
    handleAddCustomer() {
      this.reset();
      this.openCustomer = true;
      this.title = "新增客户";

      console.info(this.form)
    },
    //添加项目
    addProject() {
      this.dialogProject = true;
    },
    //新增订单
    newOrders(row) {
      if (row.province == "" || row.county == "" || row.city == "") {
        this.reset();
        this.companyId = row.id;
        this.view = true;
      } else {
        this.companyId = row.id;
        this.$refs.editDrawer.newOrders(row);
      }
    },
    // 模块下载
    downloadModule() {
      // console.info("模块下载");
      // window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
      // window.location.href = baseURL + "/common/download";
    },
    // 上传
    // 上传文件时触发
    uploadingTrigger(file, importFileList) {
      if (importFileList.length > 1) {
        importFileList.splice(0, 1);
      }
    },
    handleRemove(file, importFileList) {
      // console.log(file, importFileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, importFileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + importFileList.length} 个文件`
      );
    },
    // 删除
    beforeRemove(file, fileList) {
      // console.info("确定移除");
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传确定按钮
    submitFormUploading() {
      this.$refs.importUpdateFile.submit();
    },
    //
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    /** 查询客户信息列表 */
    getList() {
      this.loading = true;
      let queryParams = this.queryParams;
      queryParams.district =
        queryParams.district &&
        queryParams.district.length > 0 &&
        queryParams.district[0]
          ? queryParams.district
          : null;
      let data = JSON.parse(JSON.stringify(queryParams));
      data.clientType = data.clientType == "0" ? null : data.clientType;
      this.clientTypeCut=data.clientType == "0" ? null : data.clientType;
      this.requestData = data
      if (data.clientType != 400 && data.clientType != 500) {
        listClient(data).then(response => {
          // console.log(data);
          this.companyList = response.data.rows || [];
          this.total = response.data.totalRows;
          this.loading = false;
        });
      } else if (data.clientType == 400) {
        ExpiringCustomers(data).then(response => {
          this.expireList = response.data.rows || [];
          this.total = response.data.totalRows;
          this.loading = false;
        });
      } else if (data.clientType == 500) {
        CustomerInArrears(data).then(response => {
          this.arrearsList = response.data.rows || [];
          this.total = response.data.totalRows;
          this.loading = false;
        });
      }
      TaxNature().then(response => {
        this.TaxNatureList = [];
        response.data.forEach(item => {
          item.child.forEach(ite => {
            let tem = {};
            tem.labelId = ite.id;
            tem.name = ite.name;
            this.TaxNatureList.push(tem);
          });
        });
      });
    },
    //标记回显
    handleSign(row) {
      this.signShow = true;
      this.signId = row;
      this.departmentId = [];
      this.departId = [];
      this.arrp = [];
      this.arr = [];
      MarkEcho({ companyId: row }).then(response => {
        let temp = {};
        let tep = {};
        this.data = [];
        this.treeData = [];
        response.data.forEach(item => {
          if (item.checkType == 10) {
            temp = {};
            temp.label = item.name;
            temp.id = item.id;
            temp.selectedType = item.selectedType;
            temp.isEdit = false;
            temp.children = [];
            item.child.forEach(ite => {
              tep = {};
              tep.label = ite.name;
              tep.id = ite.id;
              tep.selectedType = ite.selectedType;
              tep.isEdit = false;

              temp.children.push(tep);
            });
            this.data.push(temp);
          } else if (item.checkType == 20) {
            temp = {};
            temp.label = item.name;
            temp.id = item.id;
            temp.selectedType = item.selectedType;
            temp.isEdit = false;
            temp.children = [];
            item.child.forEach(ite => {
              tep = {};
              tep.label = ite.name;
              tep.id = ite.id;
              tep.selectedType = ite.selectedType;
              tep.isEdit = false;

              temp.children.push(tep);
            });
            this.treeData.push(temp);
          }
        });

        this.data.forEach(item => {
          item.children.forEach(ite => {
            if (ite.selectedType == 10) {
              this.departmentId.push(ite.id);
              this.arr.push(ite);
            }
          });
        });
        this.treeData.forEach(item => {
          item.children.forEach(ite => {
            if (ite.selectedType == 10) {
              this.departId.push(ite.id);
              this.arr.push(ite);
            }
          });
        });
      });
    },

    //修改
    NodeBlur(Node, data) {
      if (data.label.length === 0) {
        this.$message.error("菜单名不可为空！");
        return false;
      } else {
        if (data.isEdit) {
          this.$set(data, "isEdit", false);
        }

        this.$nextTick(() => {
          this.$refs["slotTreeInput" + data.id].$refs.input.focus();
          updateLabel({ name: data.label, id: data.id }).then(response => {
            // console.log(response);

            response.data.forEach(item => {
              let temp = {};
              item.child.forEach(ite => {
                temp.id = ite.id;
                temp.label = ite.name;
              });
            });
          });
        });
      }
    },

    //标记添加
    append(data) {
      // console.log(data);
      const newChild = {
        id: id++,
        label: "新标签",
        isEdit: false,
        children: []
      };
      if (!data.children) {
        this.$set(dataS, "children", []);
      }
      data.children.push(newChild);

      addLabel({
        parentId: data.id,
        name: newChild.label
      }).then(response => {
        this.handleSign(this.signId);
      });
    },
    //单选添加
    treeAppend(data) {
      const newChild = {
        id: id++,
        label: "新标签",
        isEdit: false,
        children: []
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      addLabel({
        parentId: data.id,
        name: newChild.label
      }).then(response => {
        this.handleSign(this.signId);
      });
    },
    //标记新增组别
    addGroup() {
      this.signGroupShow = true;
    },
    //确认新增小组
    newGroup() {
      // console.log(this.signId);
      addLabel({
        name: this.group,
        parentId: -1,
        checkType: this.singleChoice
      }).then(response => {
        this.signGroupShow = false;
      });
      this.handleSign(this.signId);
    },
    //标记编辑
    Edit(node, data) {
      data.isEdit = true;

      if (data.label.length === 0) {
        this.$message.error("菜单名不可为空！");

        return false;
      }
    },
    //单选标记编辑
    treeEdit(node, data) {
      data.isEdit = true;

      if (data.label.length === 0) {
        this.$message.error("菜单名不可为空！");

        return false;
      }
    },

    //标记删除
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      let labelId = null;
      if (children.findIndex(d => d.id === data.id)) {
        labelId = data.id;
      }
      delLabel({ id: labelId }).then(response => {
        // console.log(response);
      });
    },
    //单选标记删除
    treeRemove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      let labelId = null;
      if (children.findIndex(d => d.id === data.id)) {
        labelId = data.id;
      }
      delLabel({ id: labelId }).then(response => {
        // console.log(response);
      });
    },
    //已选标签页面删除标签选中
    setCheckedNodes(row, i) {
      let that = this;
      // this.arr.forEach(item => {
      //   if (item.id == row.id) {
      //     this.arr.splice(i, 1);
      //     console.log(this.arr);
      //   }
      // });
      this.data.forEach(item => {
        item.children.forEach(ite => {
          if (ite.id == row.id) {
            that.departmentId.splice(i, 1);
            this.arr.splice(i, 1);
            this.$refs.tree.setCheckedKeys(that.departmentId);
          }
        });
      });
      this.treeData.forEach(item => {
        item.children.forEach(ite => {
          if (ite.id == row.id) {
            this.departId.splice(i, 1);
            this.$refs.singleTree.setCheckedKeys(that.departId);
            this.arr.splice(i, 1);
          }
        });
      });

      this.$forceUpdate();
    },

    //选择框变化
    handleCheckChange(data, checked, indeterminate) {
      var rad = "";
      var rac = "";
      var ridsa = this.$refs.tree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsb = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      var ridsc = this.$refs.singleTree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsd = this.$refs.singleTree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      // console.log(ridsb);
      this.arr = [];
      let arrp = [];
      let arr = [];
      ridsb.forEach(ids => {
        let b = {};
        //获取选中的所有的父级id
        rad += "," + ids.id;
        if (ids.children) {
          arrp.push(ids.id);
        }
        b.label = ids.label;
        b.id = ids.id;
        arr.push(b);
      });
      let acc = [];
      ridsd.forEach(ids => {
        let a = {};
        //获取选中的所有的父级id
        rac += "," + ids.id;
        if (ids.children) {
          acc.push(ids.id);
        }
        a.label = ids.label;
        a.id = ids.id;
        arr.push(a);
      });
      arr = [...new Set(arr)]; // 数组去重
      arr.forEach((item, i) => {
        arrp.forEach(ite => {
          if (item.id == ite) {
            arr.splice(i, 1);
          }
        });
        acc.forEach(ite => {
          if (item.id == ite) {
            arr.splice(i, 1);
          }
        });
      });
      this.arr = arr;
      this.departmentId = this.$refs.tree.getCheckedKeys();
    },

    //单选选择框变化
    handleChange(data, checked, indeterminate) {
      // console.info(arguments);
      // console.info(this.treeData);
      let temp = this.singleChecked || [];
      // console.info(temp);
      this.treeData.forEach(items => {
        if (
          items.children.some(item => {
            return data.id == item.id;
          })
        ) {
          items.children.forEach(item => {
            // console.info(item.id)
            if (checked && temp.indexOf(item.id) != -1) {
              temp = temp.filter(ite => {
                return ite != item.id;
              });
            } else if (data.id == item.id && checked) {
              temp.push(item.id);
            } else if (checked) {
              temp = temp.filter(ite => {
                return ite != item.id;
              });
            }
            // console.info('temp'+temp)
          });
        }
      });
      // console.info(temp);
      this.singleChecked = temp;
      this.$refs.singleTree.setCheckedKeys(temp);

      var rad = "";
      var rac = "";
      var ridsa = this.$refs.tree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsb = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      var ridsc = this.$refs.singleTree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsd = this.$refs.singleTree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      // console.log(ridsb);
      this.arr = [];
      let arrp = [];
      let arr = [];
      ridsb.forEach(ids => {
        let b = {};
        //获取选中的所有的父级id
        rad += "," + ids.id;
        if (ids.children) {
          arrp.push(ids.id);
        }
        b.label = ids.label;
        b.id = ids.id;
        arr.push(b);
      });
      let acc = [];
      ridsd.forEach(ids => {
        let a = {};
        //获取选中的所有的父级id
        rac += "," + ids.id;
        if (ids.children) {
          acc.push(ids.id);
        }
        a.label = ids.label;
        a.id = ids.id;
        arr.push(a);
      });
      arr = [...new Set(arr)]; // 数组去重
      arr.forEach((item, i) => {
        arrp.forEach(ite => {
          if (item.id == ite) {
            arr.splice(i, 1);
          }
        });
        acc.forEach(ite => {
          if (item.id == ite) {
            arr.splice(i, 1);
          }
        });
      });
      this.arr = arr;
    },

    //确认客户标签选择
    getCheckedNodes() {
      var rad = "";
      var rac = "";
      var ridsa = this.$refs.tree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsb = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      var ridsc = this.$refs.singleTree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsd = this.$refs.singleTree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      let arrp = [];
      ridsb.forEach(ids => {
        //获取选中的所有的父级id
        rad += "," + ids.id;
        if (ids.children) {
          arrp.push(ids.id);
        }
      });
      let acc = [];
      ridsd.forEach(ids => {
        //获取选中的所有的父级id
        rac += "," + ids.id;
        if (ids.children) {
          acc.push(ids.id);
        }
      });

      rad = rad.substr(1); // 删除字符串前面的','
      rac = rac.substr(1); // 删除字符串前面的','
      var rids = rad + "," + ridsa + "," + rac + "," + ridsc;
      var arr = rids.split(","); //  把字符串转换成数组
      arr = [...new Set(arr)]; // 数组去重

      let tem = [];
      arr.forEach((item, i) => {
        arrp.forEach(ite => {
          if (ite == item) {
            arr.splice(i, 1);
          }
        });
      });
      arr.forEach((item, i) => {
        let c = {};
        c.companyId = this.signId;
        c.companyLabel = item;
        tem.push(c);
      });

      checkLabel({ companyId: this.signId, labelParams: tem }).then(
        response => {
          // console.log(response);
          this.signShow = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.dialogVisible = false;
      this.showSearch = false; //筛选取消按钮
      this.resetForm("queryForm");
      this.openCustomer = false; //新增客户取消按钮
      this.uploadingFile = false; //导入取消按钮
    },
    // 表单重置
    reset() {
      this.form = {
        appId: this.queryParams.appId || this.$store.getters.appId || "",
        id: null,
        companyName: null,
        client: null, //编号
        companyType: null,
        enterpriseNumber: null, //企业税号
        companyId: null,
        bankAccountNumber: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        clientLv: "10",
        clientType: "10",
        lableId: "",
        district: null,
        industryName: null, //行业分类
        clienteleName: null,
        clientSource: null,
        companies: "20",
        userlabelIds: []
      };
      this.resetForm("form");
    },
    followReset() {
      this.followForm = {
        imageIds: null, //上传附件
        nextContent: null,
        nextDate: null,
        tempTime: null,
        nextFollowTime: null,
        companyId: null, //添加跟进记录id
        theContent: null, //本次跟进记录
        type: null
      };
      this.$refs.upload.clearFiles();
      this.resetForm("followForm");
    },
    handleTableQuery(e) {
       this.queryParams.county= "";
      this.queryParams.province= "";
      this.queryParams.city= "";
      this.queryParams.clientLv='';
      this.queryParams.labelName='';
      this.queryParams.createBy='';
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
        this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.getList();

    },
    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
       this.queryParams.pageNo = 1;
      this.queryParams.pageSize = 10;
      this.getList();

    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.resetQuery();
      this.queryParams.clientType=this.clientTypeCut
         this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs.queryForm.resetFields();
      this.resetForm("queryForm");
      this.queryParams= {
        pageNo: 1,
        pageSize: 10,
        type:20,
        clientType:this.clientTypeCut,
        clientLv: null,
        linkman: null, //联系人
        district: null, //所在地区
        createBy: null, //业务员
        companyId: null,
        deptId: null,
        firm: null,
        id: null,
        firmId:'',
        createId:'',
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        accomplishTime: null,
        followTime: null,
        enteringTime: null,
        appId: "",
        area: "",
        county: "",
        companyName: "",
        roleName: null,
        clientType:"0",
        province:'',
        city:'',
        labelName:'',
      },
      this.cityList = [];
      this.areaList = [];
      this.labelName = "";

      // this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      //   this.title = "新增客户";
    },

 handleRowClick(row, column, event) {
      if (
        column.property &&
        column.property != undefined &&
        column.property != "undefined"
      ) {
        this.reset();
        this.companyId = row.companyId;
        this.view = true;
      }
    },
    handleRowFun(row, column, event) {
      if (
        column.property &&
        column.property != undefined &&
        column.property != "undefined"
      ) {
        this.reset();
        this.companyId = row.id;
        if (row.churnType !== '10') {
          this.view = true;
        }else{
          this.view = false;

        }
      }
    },
    // getDetail(row, cb) {
    //   getClient({ id: row.id }).then(response => {
    //     let data = response.data;
    //     if (data) {
    //       try {
    //         data.userlabelIds = data.userlabelIds
    //           ? JSON.parse(data.userlabelIds)
    //           : [];
    //         if (data.district) {
    //           data.district = JSON.parse(data.district);
    //         } else {
    //           let arr = [];
    //           try {
    //             arr.push(TextToCode[data.province].code);
    //             arr.push(TextToCode[data.province][data.city].code);
    //             arr.push(
    //               TextToCode[data.province][data.city][data.county].code
    //             );
    //           } catch (e) {
    //             // console.info(e);
    //           }
    //           data.district = arr;
    //         }
    //       } catch (e) {
    //         // console.info(e);
    //       }
    //       this.form = data;
    //       if (typeof cb == "function") {
    //         cb(response);
    //       }
    //     }
    //   });
    // },

    // 客户提交按钮
    submitForm: throttle(function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.id = null;
          addClient(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增客户成功");
              this.openCustomer = false;
              this.getList();
            }
          });
        }
      });
    }),
    //修改
    updateForm(data) {
      // data.id = this.form.id;
      alterClient(data).then(response => {
        if (response.code === 200) {
        }
      });
    },
    //即将到期修改
    expireUpdateForm(data) {
      data.id = data.companyId;
      alterClient(data).then(response => {
        if (response.code === 200) {
        }
      });
    },

    handleRegionChange(value, type = 20) {
      if (type == 10) {
        this.queryParams.district = value;
        this.queryParams.province = CodeToText[value[0]];
        this.queryParams.city = CodeToText[value[1]];
        this.queryParams.county = CodeToText[value[2]];
      } else {
        this.form.district = value;
        this.form.province = CodeToText[value[0]];
        this.form.city = CodeToText[value[1]];
        this.form.county = CodeToText[value[2]];
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm("是否确认此删除客户信息?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delClient({ id: ids });
        })
        .then(() => {
          this.view = false;
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },

    //导入
    bulkImport() {
      this.uploadingFile = true;
      // bulkImportOpportunity().then(reponse => {
      // });
    },
    /** 导出按钮操作 */
    handleExport() {
      let fileUrl = process.env.VUE_APP_FILE_API;
      const queryParams = this.requestData;
      queryParams.exportType = 10
      delete queryParams.pageSize
      delete queryParams.pageNo
      // console.info('导出按钮操作11')
      //   console.info(queryParams)
      //   var data = {
      //   exportType: 10,
      //   createId: queryParams.createId || "",
      //    companyName: queryParams.companyName || "",
      //    city: queryParams.city || "",
      //   county: queryParams.county || "",
      //   province: queryParams.province || "",
      //   createBy:queryParams.createBy || "",
      //   creationEndTime:queryParams.creationEndTime || "",
      //   creationStartTime:queryParams.creationStartTime || "",
      //    labelName: queryParams.labelName || "",
      // };
      this.$confirm("是否确认导出所有客户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportCustomer(queryParams);
        })
        .then(response => {
          // console.info(response);
          let filename = response.data.filename;
          let elink = document.createElement("a");
          elink.download = filename;
          elink.text = filename;
          elink.style.display = "none";
          window.open(decodeURIComponent(fileUrl + "/download/" + filename),"_blank")
          // elink.href = decodeURIComponent(fileUrl + "/download/" + filename);
          document.getElementById("app").appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        })
        .catch(function() {});
    },
    //客户等级字典
    clientLvFormat(row) {
      return this.selectDictLabel(this.clientLvList, row.clientLv);
    },
    //客户来源分类字典
    businessFromFormat(row) {
      return this.selectDictLabel(this.clientSourceList, row.clientSource);
    },
    // 客户类型字典
    firmTypeFormat(row) {
      return this.selectDictLabel(this.clientType, row.clientType);
    },
    //收费周期字典
    cycleTypeFormat(row) {
      return this.selectDictLabel(this.cycleTypeList, row.cycleType);
    },

    handleInputConfirm(cb) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.userlabelIds.push(inputValue);
        if (typeof cb == "function") {
          cb(this.form.userlabelIds);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleClose(tag, cb) {
      this.form.userlabelIds.splice(this.form.userlabelIds.indexOf(tag), 1);
      if (typeof cb == "function") {
        cb(this.form.userlabelIds);
      }
    },
    handleClicks() {},

    // command: function(command) {
    //   //删除客户
    //   if (command == "1") {
    //     this.handleDelete(this.form);
    //   }
    // },

    editOrderFun(row) {
      this.orderId = row.id;
      this.orderVisible = true;
      this.hiddenTab = false;
    },
    //企业信息
    entrepreneurMessageList(id) {
      entrepreneurMessageLiaison({ id: id, classify: 20 }).then(response => {
        this.enterpriseMessageList = response.data;
        this.marketTaxInforResultList = response.data.marketTaxInforResult;
        this.bankResultList = response.data.bankResult;
        this.personnelResultsList = response.data.personnelResults; //股东
        // console.info(this.enterpriseMessageList);
        // console.info(this.personnelResultsList);
      });
    },
    //行业分类
    industryFun(row) {
      let name = "";
      let industryArr =
        row.industryName && typeof row.industryName == "string"
          ? JSON.parse(row.industryName)
          : row.industryName;
      let nameArr = this.industryMap.filter(item => {
        return item.id == industryArr[0];
      });
      if (nameArr.length > 0) {
        let broadList = nameArr[0].broadList.filter(item => {
          return item.id == industryArr[1];
        });
        name =
          nameArr[0].name +
          (broadList.length > 0 ? " - " + broadList[0].name : "");
      }
      return name;
    }
  }
};
</script>

<style lang="scss">
  // 改变简介换行
   .el-tooltip__popper{max-width: 400px}

.type_item {
  width: 100%;
  height: 92px;
  border: 1px #e6e7eb solid;
  background-color: #f8f9fb;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  overflow: hidden;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  & > span {
    margin: 24px 20px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #565759;
  }
  .el-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
  }
  &:hover {
    border-color: #b5c8f1;
    background-color: #ecf2fc;
    & > span {
      color: #4977e0;
    }
    .el-button {
      transform: translateY(0);
    }
  }
}
//标记
.sign {
  border: 1px solid #ccc;
  > div:first-child {
    height: 36px;
    font-size: 16px;
    padding-left: 15px;
    line-height: 36px;
    border-bottom: 1px solid #e6e7eb;
    background: #f8f9fb;
  }
  > div:nth-child(3) {
    height: 42px;
    text-align: center;
    line-height: 42px;
    color: #3978e7;
    font-size: 16px;
    border-top: 1px solid #e6e7eb;
    background: #f8f9fb;
    > i {
      margin-right: 8px;
    }
  }
  .el-dialog .el-dialog__footer {
    border-top: 1px solid #e6e7eb !important;
  }
  .tagIcon {
    margin-left: 5px;
  }
  .el-icon-delete:before,
  .el-icon-edit:before,
  .el-icon-circle-plus-outline:before {
    font-size: 16px;
  }
}
.choice {
  background: #00d595;
  width: 105px;
  height: 28px;
  text-align: center;
  color: #fff;
  line-height: 28px;
  // .el-input .el-select__caret {
  //   color: #fff;
  // }
  // .el-icon-arrow-up:before {
  //   content: "\e78f";
  // }
  // .el-input--small .el-input__inner {

  //   height: 22px;
  //   border: 4px;
  //   font-size: 12px;
  //   border: 0px;

  // }
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
.offApply {
  .el-dialog {
    height: 662px;
    .el-dialog__body {
      .el-form {
        .el-input {
          width: 100%;
        }
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .el-textarea__inner {
    height: 100%;
  }
  .bottom {
    position: absolute;
    bottom: 16px;
    right: 24px;
  }
}
</style>
