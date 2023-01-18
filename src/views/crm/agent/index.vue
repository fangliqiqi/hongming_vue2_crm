<template>
  <div class="app-container">
    <!--  搜索框  -->
    <search-vi>
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

            <!-- <el-form-item label="成交时间">
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
            </el-form-item> -->

            <!--                <el-form-item label="商机等级" prop="sourceTypeLv">-->
            <!--                  <el-radio-group v-model="queryParams.sourceTypeLv">-->
            <!--                    <el-radio v-for="item in sourceTypeLvList" :key="item.dictCode" :label="item.dictCode">-->
            <!--                      {{item.dictCode}}-->
            <!--                    </el-radio>-->
            <!--                  </el-radio-group>-->
            <!--                </el-form-item>-->

            <el-form-item label="所在地区" prop="district">
              <el-cascader
                placeholder="请选择信息所在地区"
                style="width: 100%"
                class="mw222"
                size="small"
                :options="areaOptions"
                v-model="queryParams.district"
              >
              </el-cascader>
            </el-form-item>
          </el-form>
          <div class="popover-footer">
            <el-button size="small" type="cyan" @click="resetQuery"
              >重置</el-button
            >
            <el-button type="primary" size="small" @click="handleQuerys"
              >确认</el-button
            >
          </div>
        </div>
        <el-button slot="reference" size="small" icon="el-icon-search"
          >筛选</el-button
        >
      </el-popover>
      <el-popover
        ref="popover"
        style="width:100px !important;display: inline-block;margin-left:8px"
        placement="bottom-start"
        trigger="click"
        @show="onShowPopover"
        @hide="onHidePopover"
        v-if="roles.indexOf('accountExecutive') == -1"
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
        v-model="queryParams.clienteleName"
        placeholder="请输入角色名称"
        clearable
        size="small"
        style="width: 240px"
        suffix-icon="el-icon-search"
        @keyup.enter.native="handleQuerys"
      />
      <el-dropdown
        size="small"
        split-button
        type="primary"
        trigger="hover"
        class="ml8"
        @click="handleAdd"
      >
        <span>
          <i class="el-icon-plus"></i>
          新建商机
        </span>
        <el-dropdown-menu slot="dropdown" style="width: 124px">
          <el-dropdown-item style="width: 100%" @click.native="bulkImport"
            ><span><i class="el-icon-upload2"></i>导入</span></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        class="ml8"
        icon="el-icon-download"
        size="small"
        @click="handleExport"
        v-hasPermi="['crm:log:export']"
        >导出
      </el-button>
    </search-vi>
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.sourceTypeLv" @tab-click="handleQuerys">
        <el-tab-pane label="全部商机" value="" name=""></el-tab-pane>
        <el-tab-pane
          v-for="item in sourceTypeLvList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
        ></el-tab-pane>
        <el-tab-pane label="今日待跟进商机" value="10" name="10"></el-tab-pane>
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
    <div class="table-data">
      <el-table
        v-loading="loading"
        :data="bankList"
        class="slither"
        @selection-change="handleSelectionChange"
        @row-click="handleRowFun"
        :height="tableHeight"
      >
        <!--        <el-table-column type="selection" width="55" align="center"/>-->
        <!--        <el-table-column label="资源id" align="center" prop="id"/>-->
        <el-table-column
          label="客户名称"
          align="left"
          prop="clienteleName"
          min-width="180"
        />
        <el-table-column
          label="客户类型"
          align="left"
          prop="sourceType"
          min-width="180"
          :formatter="
            row => selectDictLabel(opportunityTypeList, row.sourceType)
          "
        />
        <el-table-column
          label="标签"
          align="left"
          prop="userlabelIds"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-tag
              size="min"
              :key="tag"
              v-for="tag in JSON.parse(scope.row.userLabel || '[]')"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="服务顾问"
          align="left"
          prop="createBy"
          min-width="120"
        />
        <el-table-column
          label="意向度"
          align="left"
          prop="sourceTypeLv"
          min-width="120"
        />
        <el-table-column
          label="联系人"
          align="left"
          prop="customerName"
          min-width="120"
        />
        <el-table-column
          label="联系电话"
          align="left"
          prop="customerPhone"
          min-width="120"
        />
        <el-table-column
          label="行业分类"
          align="left"
          prop="category"
          :formatter="industryFun"
          min-width="200"
        />
        <el-table-column
          label="业务描述"
          align="left"
          prop="categoryText"
          min-width="200"
        />
        <el-table-column label="所属区域" align="left" min-width="220">
          <template slot-scope="scope">
            <span
              >{{ scope.row.prov }} {{ scope.row.city }}
              {{ scope.row.county }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          label="客户来源"
          align="left"
          prop="customerSource"
          :formatter="
            row => selectDictLabel(businessFromList, row.customerSource)
          "
          min-width="120"
        />
        <el-table-column
          label="客户等级"
          align="left"
          prop="customerLevel"
          min-width="120"
          :formatter="
            row => selectDictLabel(customerRatingList, row.customerLevel)
          "
        />
        <el-table-column
          label="纳税性质"
          align="left"
          prop="taxType"
          :formatter="taxTypeFormat"
          min-width="120"
        />
        <el-table-column
          label="详细地址"
          align="left"
          prop="addressDetail"
          min-width="120"
        />
        <el-table-column
          label="备注 "
          align="left"
          prop="remarks"
          min-width="220"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name="table-control"
          fixed="right"
          width="100px"
        >
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="ConversionDeal(scope.row)"
              v-hasPermi="['share:bank:edit']"
              >转成交
            </el-button>
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitFormUploading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增商机对话框//转成交 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="704px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="step-vi" v-if="dialogVisible">
        <steper
          :step-list="[
            { name: '商机信息补全' },
            { name: '选择购买产品' },
            { name: '提交订单合同' }
          ]"
          :active.sync="stepIndex"
        ></steper>
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <template v-if="stepIndex == 0">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="客户名称" prop="clienteleName">
                <el-input
                  v-model="form.clienteleName"
                  placeholder="请输入客户名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式" prop="customerPhone">
                <el-input
                  v-model="form.customerPhone"
                  placeholder="请输入联系人方式"
                  :maxlength="11"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户类型" prop="sourceType">
                <el-select
                  v-model="form.sourceType"
                  placeholder="请选择客户类型"
                >
                  <el-option
                    v-for="item in opportunityTypeList"
                    :label="item.dictName"
                    :value="item.dictCode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="意向度" prop="sourceTypeLv">
                <el-select
                  v-model="form.sourceTypeLv"
                  placeholder="请选择意向度"
                >
                  <el-option
                    v-for="item in sourceTypeLvList"
                    :label="item.dictName"
                    :value="item.dictCode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纳税性质" prop="taxType">
                <el-select v-model="form.taxType" placeholder="请选择纳税性质">
                  <el-option
                    v-for="item in vatTypeList"
                    :label="item.dictName"
                    :value="item.dictCode"
                    :key="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="所在地区"
                prop="district"
                :rules="
                  this.title == '转成交'
                    ? rules.district
                    : [{ required: false }]
                "
              >
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
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="客户来源" prop="customerSource">
                <el-select
                  v-model="form.customerSource"
                  placeholder="请选择客户来源"
                >
                  <el-option
                    v-for="item in businessFromList"
                    :label="item.dictName"
                    :value="item.dictCode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="行业分类" prop="category">
                <el-cascader
                  class="mw100"
                  filterable
                  :show-all-levels="false"
                  v-model="form.category"
                  :options="industryMap"
                  :props="{ label: 'name', value: 'id', children: 'broadList' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        <!-- 是否在其他公司代账 -->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item
                label="在其他公司代账:"
                prop="isOtherFirmGeneration"
              >
                <el-radio v-model="form.isOtherFirmGeneration" label="1"
                  >是</el-radio
                >
                <el-radio v-model="form.isOtherFirmGeneration" label="2"
                  >否</el-radio
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="详细地址" prop="addressDetail">
                <el-input
                  v-model="form.addressDetail"
                  style="width: 592px;"
                  placeholder="请填写详细地址"
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
              <el-form-item label="标签" prop="userLabel">
                <div class="tag-vi">
                  <el-tag
                    :key="tag"
                    v-for="tag in form.userLabel"
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
                    icon="el-icon-plus"
                    >添加标签
                  </el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <div class="product-vi" v-show="stepIndex == 1">
          <el-row>
            <el-col :span="12">
              <el-form-item label="产品名称" prop="proTypeName">
                <el-input
                  v-model="proTypeName"
                  placeholder="请输入产品名称"
                  prefix-icon="el-icon-search"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="product-list">
            <el-row :gutter="20" style="margin-top: -20px">
              <el-col v-for="item in proTypeOption" :span="8">
                <div class="type_item" @click="toDealForm(item)">
                  <span>
                    {{ item.name }}
                  </span>
                  <el-button type="primary" size="mini">
                    选择并创建合同订单
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="dialogVisible && stepIndex == 0"
      >
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
        v-else-if="dialogVisible && stepIndex == 1"
      >
        <el-button @click="back">上一步</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 创建订单 -->
    <edit-order
      :visible.sync="orderTypeVisible"
      :orderId="orderId"
    ></edit-order>
    <!--  查看商机  -->
    <drawer
      :visible.sync="view"
      title="商机"
      :settings="settings"
      :command="command"
    >
      <div class="agent_vi">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="足迹" name="first">
            <div class="footprint_list">
              <ul
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
              >
                <li v-for="item in footprintList" class="list-item">
                  <span class="time">{{
                    parseTime(item.operTime, "{y}-{m}-{d} {h}:{i}")
                  }}</span>
                  <span class="name">{{ item.operName }}</span>
                  <span class="text">{{ item.title }}</span>
                </li>
              </ul>
              <p v-if="loading">加载中...</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商机信息" name="second">
            <div class="businiss_info">
              <div class="relation_company">
                <img src="@/assets/image/logo.png" />
                <div>
                  <!--                  <span>安徽泓铭网络科技有限公司</span>-->
                  <el-input
                    type="text"
                    v-model="form.clienteleName"
                    class="name"
                    size="small"
                    @change="updateForm({ clienteleName: $event })"
                  ></el-input>
                  <el-button type="primary" size="small" plain
                    >关联企业1家</el-button
                  >
                </div>
              </div>
              <el-form
                label-position="top"
                size="small"
                :inline="true"
                :model="form"
              >
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="客户编号">
                      <el-input
                        class="mw222"
                        size="small"
                        v-model="form.id"
                        :disabled="!!form.id"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="企业税号">
                      <el-input
                        class="mw222"
                        size="small"
                        v-model="form.corporateNumber"
                        @change="updateForm({ corporateNumber: $event })"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="服务顾问">
                      <el-input
                        class="mw222"
                        size="small"
                        v-model="form.createBy"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纳税性质">
                      <el-select
                        v-model="form.taxType"
                        placeholder="请选择纳税性质"
                        size="small"
                        class="mw222"
                        @change="updateForm({ taxType: $event })"
                      >
                        <el-option
                          v-for="item in vatTypeList"
                          :label="item.dictName"
                          :value="item.dictCode"
                          :key="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系人">
                      <el-input
                        class="mw222"
                        size="small"
                        v-model="form.customerName"
                        @change="updateForm({ customerName: $event })"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系方式">
                      <el-input
                        class="mw222"
                        size="small"
                        v-model="form.customerPhone"
                        :maxlength="11"
                        @change="updateForm({ customerPhone: $event })"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="行业分类">
                      <el-cascader
                        class="mw222"
                        :show-all-levels="false"
                        v-model="form.category"
                        :options="industryMap"
                        :props="{
                          label: 'name',
                          value: 'id',
                          children: 'broadList'
                        }"
                        @change="updateForm({ category: $event })"
                      ></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="所在地区">
                      <el-cascader
                        placeholder="请选择信息所在地区"
                        class="mw222"
                        size="small"
                        :options="areaOptions"
                        v-model="form.district"
                        @change="handleAreaChange"
                      >
                      </el-cascader>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="详细地址">
                      <el-input
                        type="textarea"
                        v-model="form.addressDetail"
                        class="mw222"
                        size="small"
                        @change="updateForm({ addressDetail: $event })"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="业务描述">
                      <el-input
                        type="textarea"
                        v-model="form.categoryText"
                        class="mw222"
                        size="small"
                        @change="updateForm({ categoryText: $event })"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户类型">
                      <el-select
                        class="mw222"
                        v-model="form.sourceType"
                        placeholder="请选择客户类型"
                        @change="updateForm({ sourceType: $event })"
                      >
                        <el-option
                          v-for="item in opportunityTypeList"
                          :label="item.dictName"
                          :value="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户状态">
                      <el-select
                        class="mw222"
                        v-model="form.status"
                        :disabled="true"
                      >
                        <el-option
                          v-for="item in businessStatus"
                          :label="item.dictName"
                          :value="item.dictCode"
                          :key="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="客户等级">
                      <el-select
                        class="mw222"
                        size="small"
                        v-model="form.customerLevel"
                        @change="updateForm({ customerLevel: $event })"
                        placeholder="请选择客户等级"
                      >
                        <el-option
                          v-for="item in customerRatingList"
                          :label="item.dictName"
                          :value="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="意向度">
                      <el-select
                        class="mw222"
                        size="small"
                        v-model="form.sourceTypeLv"
                        @change="updateForm({ sourceTypeLv: $event })"
                        placeholder="请选择意向度"
                      >
                        <el-option
                          v-for="item in sourceTypeLvList"
                          :label="item.dictName"
                          :value="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户来源">
                      <el-select
                        class="mw222"
                        size="small"
                        v-model="form.customerSource"
                        @change="updateForm({ customerSource: $event })"
                        :disabled="!!form.customerSource"
                        placeholder="请选择客户来源"
                      >
                        <el-option
                          v-for="item in businessFromList"
                          :label="item.dictName"
                          :value="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户标签">
                      <div class="tag-vi mw222">
                        <el-tag
                          :key="tag"
                          v-for="tag in form.userLabel"
                          closable
                          :disable-transitions="false"
                          @close="handleCloseCallback(tag)"
                        >
                          {{ tag }}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputCallback"
                          @blur="handleInputCallback"
                        >
                        </el-input>
                        <el-button
                          v-else
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="跟进记录" name="third">
            <div class="follow_list">
              <el-row>
                <el-col :span="24">
                  <el-button
                    class="add-button"
                    size="small"
                    icon="el-icon-plus"
                    @click="addFollow"
                    >添加跟进记录</el-button
                  >
                </el-col>
              </el-row>
              <el-form
                :model="followForm"
                :rules="followRules"
                :inline="true"
                ref="followForm"
                label-width="108px"
                v-show="addFollowShow"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="本次跟进方式" prop="type">
                      <el-select
                        v-model="followForm.type"
                        class="mw222"
                        placeholder="请选择跟进方式"
                      >
                        <el-option
                          v-for="item in followTypeList"
                          :label="item.dictName"
                          :value="item.dictCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="本次跟进记录" prop="theContent">
                      <el-input
                        type="textarea"
                        v-model="followForm.theContent"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="上传附件">
                      <el-upload
                        ref="upload"
                        class="upload-file"
                        :headers="headers"
                        :action="uploadUrl"
                        :data="{ type: 10 }"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-success="uploadSuccess"
                        :on-exceed="handleExceed"
                        list-type="picture"
                        :file-list="fileList"
                      >
                        <el-button icon="el-icon-upload2" size="small"
                          >点击上传</el-button
                        >
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="flex aic">
                    <el-form-item label="下次提醒时间" prop="tempDate">
                      <el-date-picker
                        style="width: 174px"
                        v-model="followForm.tempDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <span class="ml8 mr10 mb18" style="color:#303133">-</span>
                    <el-form-item label="" prop="tempTime">
                      <el-time-select
                        style="width: 174px"
                        v-model="followForm.tempTime"
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30'
                        }"
                        placeholder="选择时间"
                      >
                      </el-time-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="下次跟进内容" prop="nextContent">
                      <el-input
                        type="textarea"
                        v-model="followForm.nextContent"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label=" " class="mt8">
                      <el-button type="primary" @click="followFormSubmit"
                        >立即添加</el-button
                      >
                      <el-button @click="followReset">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-row style="margin-top: 12px;">
                <el-col>
                  <div v-for="item in followList" class="follow_item">
                    <img src="" />
                    <div>
                      <div class="info_vi">
                        <span>{{ item.createBy }}</span>
                        <span v-show="!!item.type"
                          >通过{{ followTypeFormat(item) }}</span
                        >
                        <span>{{ item.createDate }}</span>
                      </div>
                      <span>{{ item.theContent }}</span>
                      <div class="img_vi">
                        <el-image
                          class="img"
                          v-for="img in item.recordImgParamList"
                          :src="filePath + img.url"
                          :preview-src-list="
                            previewImg(item.recordImgParamList)
                          "
                        >
                        </el-image>
                        <!--                        <img class="img" v-for="img in item.recordImgParamList" :src="filePath+img.url">-->
                      </div>
                      <div class="next_vi">
                        <div>
                          <span>下次跟进时间</span>
                          <span>{{ item.nextDate }}</span>
                        </div>
                        <div>
                          <span>下次跟进内容</span>
                          <span>{{ item.nextContent }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="'联系人(' + (contactsList.length || 0) + ')'"
            name="fourth"
          >
            <div class="contacts_vi">
              <el-row :gutter="20">
                <el-col :span="12" v-for="item in contactsList">
                  <div class="contacts_item">
                    <div class="title">
                      <div>
                        <!-- 图片 -->
                        <img src="" />
                        <!-- 输入框 -->
                        <el-input
                          class="name"
                          v-model="item.name"
                          placeholder="请填写姓名"
                          @change="updateContactFun({ name: $event }, item)"
                        ></el-input>
                      </div>
                      <el-button
                        type="danger"
                        plain
                        @click="delContactFun(item)"
                        >删除</el-button
                      >
                    </div>
                    <el-form
                      label-width="40px"
                      label-position="left"
                      :inline="true"
                    >
                      <el-form-item label="职位">
                        <el-input
                          v-model="item.positionName"
                          placeholder="请填写职位"
                          @change="
                            updateContactFun({ positionName: $event }, item)
                          "
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="手机">
                        <el-input
                          v-model="item.phone"
                          placeholder="请填写手机"
                          maxlength="11"
                          @change="updateContactFun({ phone: $event }, item)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="电话">
                        <el-input
                          v-model="item.tel"
                          placeholder="请填写电话"
                          @change="updateContactFun({ tel: $event }, item)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="微信">
                        <el-input
                          v-model="item.vx"
                          placeholder="请填写微信"
                          @change="updateContactFun({ vx: $event }, item)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="QQ">
                        <el-input
                          v-model="item.qq"
                          placeholder="请填写QQ"
                          @change="updateContactFun({ qq: $event }, item)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱">
                        <el-input
                          v-model="item.email"
                          placeholder="请填写邮箱"
                          @change="updateContactFun({ email: $event }, item)"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="contacts_add" @click="addContactFun">
                    <div>
                      <span></span>
                      <span></span>
                    </div>
                    <span>新增联系人</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="企业信息" name="fiveth" v-if="false">
            <edit-company></edit-company>
          </el-tab-pane>
        </el-tabs>
      </div>
    </drawer>
    <!-- 移交 -->
    <el-dialog title="移交商机" :visible.sync="transferVisible" width="420px">
      <el-form
        label-position="top"
        size="small"
        ref="distributionForm"
        :model="distributionForm"
        :rules="rules"
      >
        <el-row :gutter="14">
          <!-- <el-col :span="12">
            <el-form-item label="部门">
              <el-select
                v-model="distributionForm.role"
                placeholder="请选择部门 "
                clearable
                size="small"
                @change="departmentMembers"
              >
                <el-option
                  v-for="item in departmentList"
                  :key="item.deptId"
                  :value="item.deptId"
                  :label="item.deptName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人名" prop="userId">
              <el-select
                v-model="distributionForm.userId"
                placeholder="请选择部门员工 "
                clearable
                @change="DepartmentStaffChange"
                size="small"
              >
                <el-option
                  v-for="(item,index) in departmentStaff"
                  :key="index + 'k'"
                  :label="item.name"
                  :value="item.userId"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="部门">
              <el-row>
                <el-cascader
                  v-model="distributionForm.role"
                  :props="{
                    emitPath: false,
                    checkStrictly: true,
                    label: 'deptName',
                    value: 'deptId',
                    children: 'children'
                  }"
                  style="margin-bottom:8px"
                  :options="wxDeptOptions"
                  @change="wxDeptChange"
                ></el-cascader>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门人员" prop="userId">
              <el-select
                v-model="distributionForm.userId"
                placeholder="请选择部门员工 "
                clearable
                size="small"
                style="margin-bottom:8px"
                @change="handleDepartment"
              >
                <el-option
                  v-for="(item, index) in wxDepartmentStaff"
                  :key="index + 'k'"
                  :value="item.userId"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="transferVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTransfer">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index:2033;"
      v-if="imgVisible"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import {
  listOpportunity,
  getOpportunity,
  delOpportunity,
  addOpportunity,
  updateOpportunity,
  exportOpportunity,
  bulkImportOpportunity,
  ConversionDealOpportunity,
  getFollowRecordList,
  addFollowRecord,
  getContactsList,
  delContact,
  addContact,
  updateContact,
  toMareLiberum,
  handOverBusiness,
  delRecordImg
} from "@/api/crm/agent/agent";
import {
  entDept,
  entUser,
  allocation,
  Department,
  Staff
} from "../../../api/crm/customerService/agentAccount";
import { getOpportunityFootprintList } from "@/api/crm/customer/customer";
import { getMapIndustry } from "@/api/crm/index";
import { getIntermSerpriceList } from "@/api/crm/intermSerprice";
import { mapGetters } from "vuex";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import EditOrder from "@/views/components/EditOrder";
import EditCompany from "@/views/components/EditCompany";
import { CompanyDepartmentPersonnel } from "@/api/crm/finance/customer";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import { throttle } from "@/utils/hmt";
import { addOrder, updateOrder } from "@/api/crm/order";
import { mapState } from "vuex";
import SearchVi from "../../components/SearchVi/index";
export default {
  components: {
    SearchVi,
    EditOrder,
    EditCompany,
    ElImageViewer
  },
  name: "Agent",
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
    var validateDistrict = (rule, value, callback) => {
      // console.info(value)
      if (this.dialogVisible && (!value || value.length == 0)) {
        return callback(new Error("所在区域不能为空"));
      } else {
        callback();
      }
    };
    return {
      companyIds:null,
      ImageUrlList: [],
      roles: [],
      dialogImageUrl: "",
      imgVisible: false,
      userColJson: [],
      filePath: process.env.VUE_APP_FILE_API,
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload",
      importFileUrl:
        process.env.VUE_APP_CRM_API +
        "/hmkj-crm/resoBusinessOpportunity/bulkImport",
      dynamicTags: [],
      agentState: [],
      returnState: [],
      businessStatus: [],
      sourceTypeLvList: [], //意向度字典
      opportunityTypeList: [], //商机类型字典
      vatTypeList: [], //纳税性质字典
      businessFromList: [], //商机来源字典
      areaOptions: regionData, //区域数据
      customerRatingList: [], //客户等级字典
      followTypeList: [], //跟进方式字典
      fileList: [], //文件上传数据
      importFileList: [], //导入数据
      contactsList: [], //联系人数据
      proTypeList: [], //产品类型数据
      industryMap: [], //行业分类数据
      headers: { Authorization: _getSessionStore(tokenKey) },
      inputVisible: false,
      inputValue: "",
      dialogVisible: false,
      dialogVisibleTwo: false,
      addFollowShow: false,
      transferVisible: false, //移交商机
      //部门员工
      departmentStaff: [],
      //部门
      departmentList: [],
      wxDeptOptions: [],
      wxDepartmentStaff: [],
      //分配参数
      distributionForm: {
        deptName: null,
        userId: null,
        id: null
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      delSwitch: [],
      // 总条数
      total: 0,
      // 公司银行开户信息表格数据
      bankList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否抽屉弹出层
      view: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        clienteleName: null,
        companyId: null,
        bankName: null,
        bankAccountNumber: null,
        bankAddress: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        accomplishTime: null,
        followTime: null,
        enteringTime: null,
        sourceTypeLv: null,
        district: []
      },
      // 表单参数
      form: {},
      //跟进记录表单参数
      followForm: {},
      // 表单校验
      rules: {
        clienteleName: [
          {
            required: true,
            message: "商机名称不能为空",
            trigger: "blur"
          }
        ],
        customerPhone: [
          {
            required: true,
            message: "联系方式不能为空",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "行业分类不能为空",
            trigger: "blur"
          }
        ],

        // customerSource: [{
        //   required: true, message: '商机来源不能为空', trigger: 'blur'
        // }
        // ],
        userId: [
          {
            required: true,
            message: "移交用户不能为空",
            trigger: "blur"
          }
        ],
        district: [
          { required: true, validator: validateDistrict, trigger: "blur" }
        ]
      },
      followRules: {
        nextContent: [
          {
            required: true,
            message: "下次跟进内容不能为空",
            trigger: "blur"
          }
        ],
        tempDate: [
          {
            required: true,
            message: "下次跟进日期不能为空",
            trigger: "blur"
          }
        ],
        tempTime: [
          {
            required: true,
            message: "请输入具体的时刻",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择跟进方式",
            trigger: "blur"
          }
        ]
      },
      settings: [
        { icon: "el-icon-delete", lable: "删除商机", value: "1" },
        { icon: "el-icon-news", lable: "移交商机", value: "2" },
        { icon: "el-icon-link", lable: "释放商机", value: "3" }
      ],
      followList: [],
      footprintList: [],
      load: false,
      stepIndex: 0,
      activeName: "first",
      orderTypeVisible: false,
      orderId: "",
      orderForm: {},
      orderRules: {},
      companyId: "",
      employeeId: "",
      handOverUserId: "",
      uploadingFile: false, //上传
      proTypeOption: [],
      proTypeName: "",
      // 树状菜单显示状态
      showStatus: false,
      // 菜单宽度
      treeWidth: "auto",
      // 输入框显示值
      labelModel: "",
      // 实际请求传值
      valueModel: "0",
      // 公司树选项
      companyOptions: []
    };
  },
  watch: {
    view: function(val, oldVal) {
      if (!val) {
        this.getList();
      }
    },
    proTypeName(val) {
      this.proTypeOption = this.proTypeList.filter(item => {
        return item.name.indexOf(val) != -1;
      });
    }
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    ...mapState({
      userInfo: state => state.user
    })
  },
  created() {
    this.getCompanyList();
    this.roles = this.userInfo.roleCodes;
    this.getDicts("del_switch").then(res => {
      this.delSwitch = res.data;
    });
    this.getDicts("agent_state").then(res => {
      this.agentState = res.data;
    });
    this.getDicts("return_state").then(res => {
      this.returnState = res.data;
    });
    this.getDicts("business_status").then(res => {
      this.businessStatus = res.data;
    });
    this.getDicts("source_type_lv").then(res => {
      this.sourceTypeLvList = res.data;
    });
    //商机类型
    this.getDicts("opportunity_type").then(res => {
      this.opportunityTypeList = res.data;
    });
    //纳税性质
    this.getDicts("vat_type").then(res => {
      this.vatTypeList = res.data;
    });
    this.getDicts("business_from").then(res => {
      this.businessFromList = res.data.filter(item => {
        return item.dictCode != 50;
      });
      // console.info(this.businessFromList)
    });
    //客户等级
    this.getDicts("customer_rating").then(res => {
      this.customerRatingList = res.data;
    });
    //跟进方式
    this.getDicts("follow_type").then(res => {
      this.followTypeList = res.data;
    });
    this.getList();
    getMapIndustry().then(res => {
      this.industryMap = res.data;
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.info(to, from);
      if (
        to.path == "/agent/agentList" &&
        from.path == "/index" &&
        to.query.add == "true"
      ) {
        vm.handleAdd();
      }
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    closeViewer() {
      this.imgVisible = false;
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgVisible = true;
    },
    next() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.stepIndex++ > 1) this.stepIndex = 1;
        }
      });
    },
    back() {
      if (this.stepIndex-- < 0) this.stepIndex = 0;
    },
    getCompanyList() {
      CompanyDepartmentPersonnel({}).then(response => {
        // console.log(response.data);
        let companyOptions = response.data;
        this.companyOptions = companyOptions || [];
        this.getList();
      });
    },
    handleNodeClick(data, checked) {
      // console.log(data);
      if (checked) {
        this.labelModel = data.name;
        if (data.deptId != "") {
          this.queryParams.companyId = "";
          this.queryParams.createId = "";
          this.queryParams.deptId = data.deptId;
          this.getList();
          this.showStatus = false;
        } else if (data.companyId == "" && data.deptId == "") {
          this.queryParams.companyId = "";
          this.queryParams.deptId = "";
          this.queryParams.createId = data.id;
          //  console.log(this.queryParams);
          this.getList();
        } else {
          this.queryParams.createId = "";
          this.queryParams.deptId = "";
          this.queryParams.companyId = data.companyId;
          //  console.log(this.queryParams);
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
    // 取消按钮
    cancel() {
      this.open = false;
      this.uploadingFile = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        customerName: null,
        customerPhone: null,
        sourceType: "10",
        sourceTypeLv: "C",
        taxType: null,
        city: null,
        prov: null,
        county: null,
        customerSource: null,
        addressDetail: null,
        agentState: null,
        categoryText: null,
        customerWeixin: null,
        customerQq: null,
        district: null,
        isOtherFirmGeneration: "2",
        userLabel: [],
        customerLevel: "10",
        category: null,
        customerRating: null,
        corporateNumber: null
      };
      this.resetForm("form");
    },
    followReset() {
      this.followForm = {
        imageIds: null,
        nextContent: null,
        classify: 10,
        nextDate: null,
        tempTime: null,
        tempDate: null,
        rboId: null,
        theContent: null,
        type: null
      };
      this.$refs.upload.clearFiles();
      this.resetForm("followForm");
    },

    //移交商机
    handleDispatch(row) {
      this.distributionForm.role = "";
      this.distributionForm.userId = "";
      this.wxDepartmentStaff = [];
      Department({}).then(response => {
        let tempArr = [];
        let wxList = this.handleTree(
          response.data.wxDept,
          "deptId",
          "parentId"
        );
        this.departmentList = response.data.wxDept || [];
        this.wxDeptOptions = wxList;
      });
    },
    wxDeptChange(val) {
      this.wxDepartmentStaff = [];
      this.distributionForm.userId = "";
      this.wxDeptOptions.forEach(item => {});
      Staff({ abbreviation: "WXB", deptId: val }).then(response => {
        this.wxDepartmentStaff = response.data;
        this.companyIds=this.wxDepartmentStaff.companyId
      });
    },

    handleDepartment(val) {
      this.wxDepartmentStaff.forEach(item => {
        if (item.userId == val) {
          this.distributionForm.createId = item.userId;
          this.distributionForm.createBy = item.name;
          this.distributionForm.roleCode = item.roleCode;
          this.distributionForm.deptId = item.deptId;
          this.distributionForm.deptName = item.deptName;
        }
      });
    },
    //部门选择
    // departmentMembers(deptId) {
    //   let deptArr = this.departmentList.filter(item => {
    //     return item.deptId == deptId
    //   })
    //   let deptName = deptArr && deptArr.length > 0 ? deptArr[0].deptShortName : ''
    //   if (deptId && deptName) {
    //     entUser({ deptId: deptId, deptName: deptName }).then(response => {
    //       this.departmentStaff = response.data
    //       this.distributionForm.deptName = deptName
    //     })
    //   } else {
    //     this.departmentStaff = []
    //   }

    // },
    //转成交
    ConversionDeal(row) {
      this.getDetail(row.id, () => {
        this.stepIndex = 0;
        this.dialogVisible = true;
        this.open = true;
        this.title = "转成交";
        this.orderId = "";
        this.getProductTypeList();
      });
    },
    //转成交
    toDealForm: throttle(function(row) {
      let data = JSON.parse(JSON.stringify(this.form));
      data.employeeId = this.employeeId || ""; //商机信息转客户信息，生成客户信息数据
      data.companyId = this.companyId || "";
      if (data.status == 10) {
        this.msgError("商机已转成交");
      } else {
        ConversionDealOpportunity(data).then(response => {
          this.employeeId = response.data.employeeId;
          this.companyId = response.data.companyId;
          this.toOrderFun(row);
        });
      }
    }),
    //生成订单
    toOrderFun(row) {
      //订单类型：10 非代账 20 代账
      let data = {
        serpriceId: row.id,
        type: row.type,
        companyId: this.companyId
      };
      if (this.orderId) {
        data.id = this.orderId;
        updateOrder(data).then(res => {
          this.orderId = res.data.id;
          this.orderTypeVisible = true;
          this.dialogVisible = false;
          this.open = false;
          this.getList();
        });
      } else {
        addOrder(data).then(res => {
          this.orderId = res.data.id;
          this.orderTypeVisible = true;
          this.dialogVisible = false;
          this.open = false;
          this.getList();
        });
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputCallback() {
      this.handleInputConfirm(res => {
        this.updateForm({ userLabel: res });
      });
    },
    handleInputConfirm(cb) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.userLabel.push(inputValue);
        if (typeof cb == "function") {
          cb(this.form.userLabel);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleCloseCallback(tag) {
      this.handleClose(tag, res => {
        this.updateForm({ userLabel: res });
      });
    },
    handleClose(tag, cb) {
      this.form.userLabel.splice(this.form.userLabel.indexOf(tag), 1);
      if (typeof cb == "function") {
        cb(this.form.userLabel);
      }
    },
    /** 查询商机信息列表 */
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
      data.sourceTypeLv = data.sourceTypeLv == "0" ? null : data.sourceTypeLv;
      if (data.enteringTime) {
        data.enteringStartTime = data.enteringTime[0] + " 00:00:00";
        data.enteringEndTime = data.enteringTime[1] + " 23:59:59";
        data.enteringTime = null;
      } else {
        data.enteringTime = null;
      }
      if (data.followTime) {
        data.followStartTime = data.followTime[0] + " 00:00:00";
        data.followEndTime = data.followTime[1] + " 23:59:59";
        data.followTime = null;
      } else {
        data.followTime = null;
      }
      if (data.accomplishTime) {
        data.accomplishStartTime = data.accomplishTime[0] + " 00:00:00";
        data.accomplishEndTime = data.accomplishTime[1] + " 23:59:59";
        data.accomplishTime = null;
      } else {
        data.accomplishTime = null;
      }
      listOpportunity(data).then(response => {
        this.bankList = response.data.rows;
        // console.info(data)
        // console.info(this.bankList)
        this.total = response.data.totalRows;
        let userColStr = response.data.userColumnCustomJson;
        if (typeof userColStr == "string") {
          this.userColJson = JSON.parse(userColStr) || [];
        }
        this.loading = false;
      });
    },
    //足迹列表
    getFootprintList(id) {
      getOpportunityFootprintList(id, 10).then(response => {
        this.footprintList = response.data;
      });
    },
    //跟进记录
    getFollowList(id) {
      getFollowRecordList({ id: id, classify: 10 }).then(response => {
        this.followList = response.data;
        // console.info(this.followList)
      });
    },
    //联系人
    getContacts(id) {
      getContactsList({ opportunityId: id }).then(response => {
        this.contactsList = response.data;
      });
    },
    //获取产品类别列表
    getProductTypeList() {
      getIntermSerpriceList({}).then(res => {
        this.proTypeList = res.data;
        this.proTypeOption = res.data;
        // console.info(res)
      });
    },
    addContactFun() {
      let item = {
        email: "",
        id: null,
        name: "",
        opportunityId: this.form.id,
        phone: "",
        positionName: "",
        qq: "",
        remark: "",
        tel: "",
        vx: ""
      };
      this.contactsList.push(item);
    },
    updateContactFun(data, row) {
      data.opportunityId = this.form.id;
      if (!row.name) {
        this.msgError("联系人姓名不能为空");
      } else if (!row.id) {
        addContact(data).then(res => {
          this.msgSuccess("新增联系人成功");
          this.getContacts(this.form.id);
        });
      } else {
        data.id = row.id;
        updateContact(data).then(res => {
          this.getContacts(this.form.id);
        });
      }
    },
    delContactFun(row) {
      if (row.id) {
        this.$confirm("是否确认删除该联系人?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(function() {
            return delContact({ id: row.id });
          })
          .then(() => {
            this.getContacts(this.form.id);
            this.msgSuccess("删除成功");
          })
          .catch(function() {});
      } else {
        this.contactsList.splice(this.contactsList.indexOf(row), 1);
      }
    },
    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e && e.keyCode != 13) {
        this.showSearch = false;
      }
      this.resetQuery();
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery(e) {
      this.resetForm("queryForm");
      this.queryParams.enteringTime = null;
      this.queryParams.followTime = null;
      this.queryParams.accomplishTime = null;
      // this.handleQuery(e)
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
      this.dialogVisible = false;
      this.stepIndex = 0;
      this.title = "新增商机";
    },
    handleRowFun(row, column, event) {
      if (
        column.property &&
        column.property != undefined &&
        column.property != "undefined"
      ) {
        this.reset();
        this.contactsList = [];
        this.footprintList = [];
        this.followList = [];
        this.distributionForm.id = row.id;
        this.distributionForm.firmName = row.clienteleName;
        this.getDetail(row.id, () => {
          this.activeName = "second";
          this.stepIndex = 0;
          this.view = true;
          this.title = "商机";
        });
        this.getContacts(row.id);
      }
    },
    getDetail(id, cb) {
      getOpportunity({ id: id }).then(response => {
        let data = response.data;
        try {
          data.userLabel = data.userLabel ? JSON.parse(data.userLabel) : [];
          data.district = data.district ? JSON.parse(data.district) : [];
          data.category = data.category ? JSON.parse(data.category) : [];
        } catch (e) {
          // console.info(e)
        }
        this.form = data;
        if (typeof cb == "function") {
          cb(response);
        }
      });
    },
    //tab切换
    handleClick(tab) {
      if (tab.name == "first") {
        this.getFootprintList(this.form.id);
      } else if (tab.name == "second") {
        this.getDetail(this.form.id);
      } else if (tab.name == "third") {
        this.getFollowList(this.form.id);
      } else if (tab.name == "fourth") {
        this.getContacts(this.form.id); //获取联系人
      } else if (tab.name == "fiveth") {
      }
    },
    /** 新增商机提交按钮 */
    submitForm: throttle(function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.id = null;
          addOpportunity(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增商机成功");
              this.open = false;
              this.getList();
            }
          });
        }
      });
    }),
    //修改
    updateForm(data) {
      // console.info(arguments)
      data.id = this.form.id;
      // console.info(data)
      updateOpportunity(data).then(response => {
        // console.info(response)
      });
    },
    //修改
    handleAreaChange(value) {
      this.form.district = value;
      let data = {
        district: value,
        prov: CodeToText[value[0]],
        city: CodeToText[value[1]],
        county: CodeToText[value[2]]
      };
      this.form.prov = data.prov;
      this.form.city = data.city;
      this.form.county = data.county;
      this.updateForm(data);
    },
    command: function(command) {
      //删除商机
      if (command == "1") {
        const ids = this.form.id;
        this.$confirm("是否确认删除该商机信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(function() {
            return delOpportunity({ id: ids });
          })
          .then(() => {
            this.getList();
            this.view = false;
            this.msgSuccess("删除成功");
          })
          .catch(function() {});
      } else if (command == "2") {
        //移交商机
        this.transferVisible = true;
        this.handleDispatch();
      } else if (command == "3") {
        //释放商机
        const ids = this.form.id;
        this.$confirm("是否确定释放该条商机？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(function() {
            return toMareLiberum({ id: ids });
          })
          .then(() => {
            this.getList();
            this.view = false;
            this.msgSuccess("释放成功");
          })
          .catch(function() {});
      }
    },
    DepartmentStaffChange() {
      this.departmentStaff.forEach(item => {
        if (item.userId == this.distributionForm.userId) {
          this.distributionForm.name = item.name;
        }
      });
    },
    //移交提交
    submitTransfer: throttle(function() {
      this.$refs["distributionForm"].validate(valid => {
        if (valid) {
          handOverBusiness(this.distributionForm).then(response => {
            this.transferVisible = false;
            this.departmentStaff = [];
            this.departmentList = [];
            this.getList();
          });
        }
      });
    }),

    //导入
    bulkImport() {
      this.uploadingFile = true;
    },
    // 模板下载
    downloadModule() {
      // console.info('模板下载')
      window.location.href =
        process.env.VUE_APP_DOWN_API + "/resoBusinessOpportunity/excelTemplate";
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
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出此商机信息?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          window.location.href =
            process.env.VUE_APP_DOWN_API +
            "/resoBusinessOpportunity/excelTemplate";
        })
        .catch(function() {});
    },

    delSwitchFormat(row) {
      return this.selectDictLabel(this.delSwitch, row.delSwitch);
    },
    businessStatusFormat(row) {
      return this.selectDictLabel(this.businessStatus, row.status);
    },
    returnStateFormat(row) {
      return this.selectDictLabel(this.returnState, row.returnState);
    },
    agentStateFormat(row) {
      return this.selectDictLabel(this.agentState, row.agentState);
    },
    businessFromFormat(row) {
      return this.selectDictLabel(this.businessFromList, row.customerSource);
    },
    taxTypeFormat(row) {
      return this.selectDictLabel(this.vatTypeList, row.taxType);
    },
    followTypeFormat(row) {
      // console.info(this.followTypeList)
      return this.selectDictLabel(this.followTypeList, row.type);
    },
    handleRegionChange(value) {
      this.form.district = value;
      this.form.prov = CodeToText[value[0]];
      this.form.city = CodeToText[value[1]];
      this.form.county = CodeToText[value[2]];
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      delRecordImg({ id: file.response.data.id }).then(res => {
        this.followForm.imageIds = fileList
          .map(item => {
            let temp = item.response;
            // console.info(temp)
            if (temp.code == 200) {
              return temp.data.id;
            } else {
              return undefined;
            }
          })
          .filter(item => {
            return item != undefined;
          })
          .join(",");
      });
    },
    handlePreview(file) {
      // console.log(file)
    },
    previewImg(list) {
      return list.map(item => {
        return this.filePath + item.url;
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      // console.info(arguments)
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadSuccess(response, file, fileList) {
      this.ImageUrlList = fileList.map(ite => {
        return ite.url;
      });
      // console.info(arguments)
      // console.info(this.followForm)
      this.followForm.imageIds = fileList
        .map(item => {
          let temp = item.response;
          // console.info(temp)
          if (temp.code == 200) {
            return temp.data.id;
          } else {
            return undefined;
          }
        })
        .filter(item => {
          return item != undefined;
        })
        .join(",");
      // console.info(this.followForm)
    },
    addFollow() {
      this.addFollowShow = !this.addFollowShow;
      this.followReset();
    },
    /** 新增商机提交按钮 */
    followFormSubmit: throttle(function() {
      this.$refs["followForm"].validate(valid => {
        if (valid) {
          this.followForm.rboId = this.form.id;
          this.followForm.classify = 10;
          this.followForm.nextDate =
            this.followForm.tempDate + " " + this.followForm.tempTime;
          addFollowRecord(this.followForm).then(response => {
            if (response.code == 200) {
              this.msgSuccess("新增跟进成功");
              this.addFollowShow = false;
              this.getFollowList(this.form.id);
              this.followReset();
            }
          });
        }
      });
    }),
    //行业分类
    industryFun(row) {
      let name = "";
      let industryArr =
        row.category && typeof row.category == "string"
          ? JSON.parse(row.category)
          : row.category;
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
<style lang="scss" scoped>
.step-vi {
  display: flex;
  height: 70px;
  align-items: center;
  border-bottom: 1px solid #e6e7eb;
  margin-top: -14px;
  margin-bottom: 20px;

  & > * {
    width: 100%;
  }
}

.product-vi {
  .product-list {
    min-height: 320px;
    height: 50vh;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
<style lang="scss">
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

  & > span {
    margin: 24px 20px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #565759;
  }

  .el-button {
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

.relation_company {
  .name {
    margin-left: -12px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    color: #303133;

    .el-input__inner {
      border-color: transparent !important;
    }
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
