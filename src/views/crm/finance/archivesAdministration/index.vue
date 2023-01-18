<template>
  <div class="app-container archivesAdministration">
    <!-- 档案管理 -->
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <!-- <el-popover
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
                v-if="specialApprovalsType==10"
              >
                <el-form-item label="审核人:" prop="approverName">
                  <el-input
                    placeholder="请输入审核人名称"
                    v-model="queryParams.approverName"
                  ></el-input>
                </el-form-item>
                
              </el-form>
              <div class="popover-footer">
                <el-button type="cyan" size="small" @click="resetQuery"
                  >重置</el-button
                >
                <el-button type="primary" size="small" @click="filtrate"
                  >确认</el-button
                >
              </div>
            </div> 
          <el-button slot="reference" size="small" icon="el-icon-search"
              >筛选
            </el-button>
          </el-popover> -->
          <el-input
            class="ml8"
            v-model="queryParams.keyword"
            placeholder="请输入公司名称"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="search"
          />
          <el-button
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAddCustomer"
          >
            <span>
              <i class="el-icon-plus"></i>
              新增物品
            </span>
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
      <el-tabs @tab-click="onTabsJudge">
        <el-tab-pane label="物品库存明细" value="" name=""></el-tab-pane>
        <el-tab-pane label="交接记录" value="20" name="20"></el-tab-pane>
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
    <!-- 物品库存明细 -->
    <div class="table-data" v-if="tabsJudge == ''">
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
          label="客户名称"
          align="center"
          prop="companyName"
          min-width="200"
        />
        <el-table-column
          label="档案编号"
          align="center"
          prop="fileNumber"
          min-width="200"
        >
          <template slot-scope="scope">
            <div style="color: #3c7ae7" @click="wPKCMXNumber(scope.row)">
              {{ scope.row.fileNumber }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="物品数量"
          align="center"
          prop="amount"
          min-width="200"
        />
        <el-table-column
          label="操作"
          align="center"
          prop="amount"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-if="scope.row.status == 10"
              @click="onReception(scope.row)"
              >接收</el-button
            >
            <el-button
              type="success"
              v-if="scope.row.status == 20"
              @click="YiJiao(scope.row)"
              >移交</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="kCMXgetList"
      />
    </div>
    <!-- 交接记录 -->
    <div class="table-data" v-if="tabsJudge == 20">
      <el-table
        class="slither"
        v-loading="loading"
        :data="recordOfShifList"
        @row-click="handleRowFun"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="客户名称"
          align="center"
          prop="companyName"
          min-width="150"
        />
        <el-table-column
          label="档案编号"
          align="center"
          prop="fileNumber"
          min-width="130"
        >
          <template slot-scope="scope">
            <div style="color: #3c7ae7" @click="jJJLXQNumber(scope.row)">
              {{ scope.row.fileNumber }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="物品数量"
          align="center"
          prop="amount"
          min-width="100"
        />
        <el-table-column
          label="移交人"
          align="center"
          prop="transferUserName"
          min-width="130"
        >
          <template slot-scope="scope">
            {{ scope.row.transferUserName }}
          </template>
        </el-table-column>
        <el-table-column
          label="接收人"
          align="center"
          prop="receiveUserName"
          min-width="130"
        />
        <el-table-column
          label="移交时间"
          align="center"
          prop="transferUserTime"
          min-width="160"
        />
        <el-table-column
          label="移交类型"
          align="center"
          prop="hdType"
          min-width="130"
        >
          <template slot-scope="scope">
            {{ scope.row.hdType == 10 ? "内部移交" : "" }}
            {{ scope.row.hdType == 20 ? "收到入库" : "" }}
            {{ scope.row.hdType == 30 ? "归还客户" : "" }}
          </template>
        </el-table-column>
        <el-table-column
          label="接收时间"
          align="center"
          prop="receiveTime"
          min-width="160"
        />
        <el-table-column
          label="快递单号"
          align="center"
          prop="trackingNumber"
          min-width="200"
        />
        <el-table-column
          label="确认状态"
          align="center"
          prop="confirmStatus"
          min-width="100"
          ><template slot-scope="scope">
            <el-button type="warning" v-if="scope.row.confirmStatus == 10"
              >待确定</el-button
            >
            <el-button type="success" v-if="scope.row.confirmStatus == 20"
              >确定</el-button
            >
            <el-button type="info" v-if="scope.row.confirmStatus == 30"
              >撤回</el-button
            >
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          align="left"
          prop="amount"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-if="scope.row.status == 10"
              @click="onReception(scope.row)"
              >接收</el-button
            >
            <el-button
              type="success"
              v-if="scope.row.status == 20"
              @click="YiJiao(scope.row)"
              >移交</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="JJJLgetList"
      />
    </div>
    <!-- 新增物品 -->
    <el-dialog
      title="新增物品"
      open
      class="addCustomer businiss"
      width="704px"
      :visible.sync="newGoods"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="addForm"
        :rules="rules"
        :label-position="labelPosition"
        class="chengjiao"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-select
                v-model="addCompanyName.label"
                filterable
                remote
                reserve-keyword
                placeholder="请选择"
                :loading="loading"
                :remote-method="remoteMethod"
              >
                <!-- @change='remoteMethod' -->
                <!--:loading-text='addCompanyName.label' -->
                <el-option
                  v-for="item in companyNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交接类型" prop="hdTypeName">
              <el-input
                v-model="addForm.hdTypeName"
                placeholder="请输入交接类型"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="档案编号" prop="fileNumber">
              <el-input
                v-model="addForm.fileNumber"
                placeholder="请输入档案编号"
                @change="verifyFileMark"
                :disabled="newDABH"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div
              style="
                display: flex;
                justify-content: flex-end;
                margin-bottom: 10px;
              "
            >
              <el-button type="primary" @click="addLine">添加物品</el-button>
              <el-button type="danger" @click="removeNew">删除物品</el-button>
            </div>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="addForm.articleResultList"
              height="250"
              border
              style="width: 100%"
              class="archivesAdministrationTableBox"
              @selection-change="handleSelectionChangeNEW"
            >
              <el-table-column
                :selectable="isDisabled"
                type="selection"
                width="55"
                align="center"
              />
              <el-table-column prop="number" label="序号" width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="物品名称"
                show-overflow-tooltip
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
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="物品数量">
                <template slot-scope="scope">
                  <el-input
                    type="text"
                    oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                    v-model.number="scope.row.amount"
                    size="mini"
                    :disabled="scope.row.id ? true : false"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.remark"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.remark"
                      size="mini"
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24">
            <div class="title">交接附件表</div>
            <div class="uploading">
              <!-- <div class="imageList" > -->
              <div
                class="imageListChild"
                v-for="(item, index) in imageList"
                :key="index"
              >
                <div class="delete" @click="deleteImg(item, index)">
                  <i class="el-icon-delete"></i>
                </div>
                <el-image
                  :src="fileUrl + item"
                  fit="fill"
                  @click="openImgBig"
                  :preview-src-list="
                    imageList.map((ite) => {
                      return fileUrl + ite;
                    })
                  "
                ></el-image>
                <!-- </div> -->
              </div>
              <div style="margin-top: 10px">
                <!-- 交接表附件 -->
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-change="handleChange"
                  :on-remove="handleRemove"
                  :headers="headers"
                  list-type="picture-card"
                >
                  <!-- :file-list="fileList" -->
                  点击上传
                  <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div
              style="display: flex; justify-content: flex-end; margin-top: 10px"
            >
              <el-button @click="cancel">取消</el-button>
              <el-button type="primary" @click="addSubmit">确定</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 移交 -->
    <el-dialog
      title="移交"
      open
      class="addCustomer businiss"
      width="704px"
      :visible.sync="handOverJudge"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="handOverForm"
        :rules="rules"
        :label-position="labelPosition"
        class="chengjiao"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-input
                v-model="handOverForm.companyName"
                placeholder="请输入档案编号"
                @change="verifyFileMark"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交接类型" prop="hdTypeName">
              <el-select
                v-model="hdTypeNameOBJ"
                placeholder="请选择"
                @change="YiJiaoHdType"
              >
                <el-option
                  v-for="item in hdTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="档案编号" prop="fileNumber">
              <el-input
                v-model="handOverForm.fileNumber"
                placeholder="请输入档案编号"
                @change="verifyFileMark"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-table
              ref="dataTable"
              :data="handOverArticleResultList"
              height="250"
              border
              style="width: 100%"
              class="archivesAdministrationTableBox"
              @selection-change="handOverHandleSelectionChange"
            >
              <el-table-column
                :selectable="handOverIsDisabled"
                type="selection"
                width="55"
                align="center"
              />
              <el-table-column prop="number" label="序号" width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="物品名称"
                show-overflow-tooltip
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
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="物品数量">
                <template slot-scope="scope">
                  <el-input
                    type="text"
                    v-model.number="scope.row.amount"
                    size="mini"
                    :disabled="scope.row.id ? true : false"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.remark"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.remark"
                      size="mini"
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="holderUserName" label="持有人">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.holderUserName"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.holderUserName"
                      size="mini"
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12" v-if="hdTypeNameOBJ.value == '30'">
            <el-form-item label="快递单号" prop="trackingNumber">
              <el-input
                v-model="handOverForm.trackingNumber"
                placeholder="请输入快递单号"
              />
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12" > -->
          <el-col
            :span="12"
            v-if="hdTypeNameOBJ.value == 0 || hdTypeNameOBJ.value == '10'"
          >
            <el-form-item label="移交部门">
              <el-select
                v-model="departmentOBJ"
                placeholder="请选择"
                @change="YiJiaoDepartmentType"
              >
                <el-option
                  v-for="item in departmentList"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item> </el-col
          ><el-col
            :span="12"
            v-if="hdTypeNameOBJ.value == 0 || hdTypeNameOBJ.value == '10'"
          >
            <el-form-item label="移交人员">
              <el-select
                v-model="departmentStaffOBJ"
                placeholder="请选择"
                @change="YiJiaoDepartmentStaffType"
              >
                <el-option
                  v-for="item in departmentStaff"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="title">交接附件表</div>
            <div class="uploading">
              <div
                class="imageListChild"
                v-for="(item, index) in handOverImageList"
                :key="index"
              >
                <div class="delete" @click="handOverDeleteImg(item, index)">
                  <i class="el-icon-delete"></i>
                </div>
                <el-image
                  :src="fileUrl + item"
                  fit="fill"
                  :preview-src-list="
                    imageList.map((ite) => {
                      return fileUrl + ite;
                    })
                  "
                ></el-image>
              </div>
              <div style="margin-top: 10px">
                <!-- 交接表附件 -->
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-change="handOverHandleChange"
                  :headers="headers"
                  list-type="picture-card"
                >
                  <!-- :file-list="fileList" -->
                  点击上传
                  <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div
              style="display: flex; justify-content: flex-end; margin-top: 10px"
            >
              <el-button @click="cancel">取消</el-button>
              <!-- <el-button type="primary" @click="handOverSubmit" v-if="yJJudge">确定</el-button> -->
              <el-button
                type="primary"
                @click="handOverSubmit"
                v-if="handOverForm.userType == '10'"
                >确定</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 接收 -->
    <el-dialog
      title="接收"
      open
      class="addCustomer businiss"
      width="704px"
      :visible.sync="receptionJudge"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="receptionForm"
        :rules="rules"
        :label-position="labelPosition"
        class="chengjiao"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-input
                v-model="receptionForm.companyName"
                placeholder="请输入档案编号"
                @change="verifyFileMark"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交接类型">
              <el-input
                v-model="receptionHdType"
                placeholder="请输入交接类型"
                @change="verifyFileMark"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="档案编号" prop="fileNumber">
              <el-input
                v-model="receptionForm.fileNumber"
                placeholder="请输入档案编号"
                @change="verifyFileMark"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="receptionArticleResultList"
              height="250"
              border
              style="width: 100%"
              class="archivesAdministrationTableBox"
              @selection-change="receptionHandleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="number" label="序号" width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="物品名称"
                show-overflow-tooltip
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
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="物品数量">
                <template slot-scope="scope">
                  <el-input
                    type="text"
                    v-model.number="scope.row.amount"
                    size="mini"
                    :disabled="scope.row.id ? true : false"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="拒收原因">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.remark"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.remark"
                      size="mini"
                      :disabled="false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="holderUserName" label="持有人">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.holderUserName"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.holderUserName"
                      size="mini"
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24">
            <div class="title">交接附件表</div>
            <div class="uploading">
              <div
                class="imageListChild"
                v-for="(item, index) in receptionImageList"
                :key="index"
              >
                <div class="delete" @click="receptionDeleteImg(item, index)">
                  <i class="el-icon-delete"></i>
                </div>
                <el-image
                  :src="fileUrl + item"
                  fit="fill"
                  @click="openImgBig"
                  :preview-src-list="
                    imageList.map((ite) => {
                      return fileUrl + ite;
                    })
                  "
                ></el-image>
              </div>
              <div style="margin-top: 10px">
                <!-- 交接表附件 -->
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-change="receptionHandleChange"
                  :headers="headers"
                  list-type="picture-card"
                >
                  <!-- :file-list="fileList" -->
                  点击上传
                  <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div
              style="display: flex; justify-content: flex-end; margin-top: 10px"
            >
              <el-button @click="cancel">取消</el-button>
              <el-button type="primary" @click="receptionSubmit"
                >确定</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--物品库存明细---档案详情  -->
    <el-dialog
      title="档案详情"
      open
      class="addCustomer businiss"
      width="730px"
      :visible.sync="wPKCMXJudge"
      append-to-body
      :close-on-click-modal="true"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="wPKMXDetailForm"
        :rules="rules"
        :label-position="labelPosition"
        class="chengjiao"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-input
                v-model="wPKMXDetailForm.companyName"
                placeholder="请输入档案编号"
                @change="verifyFileMark"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="档案编号" prop="fileNumber">
              <el-input
                v-model="wPKMXDetailForm.fileNumber"
                placeholder="请输入档案编号"
                @change="verifyFileMark"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="wPKMXDetailForm.articleResultList"
              height="250"
              border
              style="width: 100%"
              class="archivesAdministrationTableBox"
              @selection-change="receptionHandleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="number" label="序号" width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="物品名称"
                show-overflow-tooltip
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
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="物品数量">
                <template slot-scope="scope">
                  <el-input
                    type="text"
                    v-model.number="scope.row.amount"
                    size="mini"
                    :disabled="scope.row.id ? true : false"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.remark"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.remark"
                      size="mini"
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="holderUserName" label="持有人">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.holderUserName"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.holderUserName"
                      size="mini"
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="receiveTime" label="接收时间" width="170">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.receiveTime"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.receiveTime"
                      size="mini"
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24">
            <div class="title">交接附件表</div>
            <div class="uploading">
              <div
                @click="openImgBig"
                class="imageListChild"
                v-for="(item, index) in wPKMXDetailForm.imageResultList"
                :key="index"
              >
                <el-image
                  :src="fileUrl + item.url"
                  fit="fill"
                  :preview-src-list="
                    imageList.map((ite) => {
                      return fileUrl + ite;
                    })
                  "
                ></el-image>
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div
              style="display: flex; justify-content: flex-end; margin-top: 10px"
            >
              <el-button @click="cancel">取消</el-button>
              <el-button type="primary" @click="cancel">确定</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-image-viewer
        style="z-index: 2033"
        v-if="dialogVisible"
        :on-close="closeViewer"
        :url-list="imageResultList"
      />
    </el-dialog>
    <!-- 移交记录详情 -->
    <el-dialog
      title="移交记录详情"
      open
      class="addCustomer businiss"
      width="704px"
      :visible.sync="yJJLXQJudge"
      append-to-body
      :close-on-click-modal="true"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="wPKMXDetailForm"
        :rules="rules"
        :label-position="labelPosition"
        class="chengjiao"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-input
                v-model="wPKMXDetailForm.companyName"
                placeholder="请输入档案编号"
                @change="verifyFileMark"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="档案编号" prop="fileNumber">
              <el-input
                v-model="wPKMXDetailForm.fileNumber"
                placeholder="请输入档案编号"
                @change="verifyFileMark"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="wPKMXDetailForm.articleResultList"
              height="250"
              border
              style="width: 100%"
              class="archivesAdministrationTableBox"
              @selection-change="receptionHandleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="number" label="序号" width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="物品名称"
                show-overflow-tooltip
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
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="物品数量">
                <template slot-scope="scope">
                  <el-input
                    type="text"
                    v-model.number="scope.row.amount"
                    size="mini"
                    :disabled="scope.row.id ? true : false"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.remark"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.remark"
                      size="mini"
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="receiveType" label="接收状态">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    :content="scope.row.receiveType"
                    placement="top"
                  >
                    <el-input
                      type="text"
                      v-model="scope.row.receiveType"
                      size="mini"
                      :disabled="scope.row.id ? true : false"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24">
            <div class="title">交接附件表</div>
            <div class="uploading">
              <div
                class="imageListChild"
                v-for="(item, index) in wPKMXDetailForm.imageResultList"
                :key="index"
              >
                <el-image
                  :src="fileUrl + item.url"
                  fit="fill"
                  @click="openImgBig"
                  :preview-src-list="
                    imageList.map((ite) => {
                      return fileUrl + ite;
                    })
                  "
                ></el-image>
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div
              style="display: flex; justify-content: flex-end; margin-top: 10px"
            >
              <el-button @click="yJJLXQJudge = false">取消</el-button>
              <el-button type="primary" @click="yJJLXQJudge = false"
                >确定</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import {
  queryListPage,
  findClientList, //获取客户信息（公司名称）
  findBoxInArticleInImage,
  checkNumber, // 添加物品--校验档案编号
  add, //新增档案
  findDeptListByUserId, //部门
  transfer, //移交
  receiveData, //接收数据
  receive, //接收
  jJMXqueryListPage, //交接记录
  findOne, //物品交接详情
} from "@/api/crm/archivesAdministration/archivesAdministration";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  name: "archivesAdministration",
  components: {
    ElImageViewer,
  },
  data() {
    return {
      loading: false, //新增物品=>公司名称默认判断值
      yJJudge: false, //是否能移交
      wPKCMXJudge: false, //物品库存明细---档案详情
      wPKMXDetailForm: {}, //物品库存明细---档案详情数据
      yJJLXQJudge: false, //移交记录详情
      total: 0, //总条数
      tabsJudge: "", //
      dialogVisible: false, //图片放大
      handOverForm: {}, //移交数据
      handOverArticleResultList: [], //移交物品--所有的物品数据
      hdTypeNameOBJ: { value: 0 }, //移交的交接类型数据
      handOverImageList: [], //移交图片List
      handOverImageIds: [], //移交图片id
      departmentList: [], //部门
      departmentStaff: [], //部门人员
      departmentStaffOBJ: {}, //部门人员选择后
      departmentOBJ: {}, //移交--选择部门后
      handOverJudge: false, //移交判断
      receptionJudge: false, //接收判断
      receptionForm: {}, //接收--
      receptionHdType: "", //接受交接类型
      receptionArticleResultList: [], //接受-全部物品数据
      receptionImageList: [], //接受-附件表数据展示
      receptionIdList: [], //接受-附件表数据id
      fileUrl: process.env.VUE_APP_FILE_API,
      addCompanyName: {}, //新增物品的公司id
      newDABH: false, //新增物品档案编号校验
      labelPosition: "top",
      newGoods: false, //新增物品弹框
      companyNameList: [], //公司名称
      pitchOnNewList: [], //新增物品多选框选中
      addForm: {
        hdTypeName: "收到入库",
        hdType: 10,
        articleResultList: [],
      }, //新增物品
      loading: false, // 遮罩层
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      }, //筛选
      // showSearch: [],
      showSearch: false,
      companyList: [], //档案管理数据
      recordOfShifList: [], //交接记录数据
      // 表单校验
      rules: {
        companyName: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur",
          },
        ],
      },

      hdTypeOptions: [
        {
          value: "10",
          label: "内部移交",
        },
        {
          value: "30",
          label: "归还客户",
        },
      ],
      imageResultList:[],
      imageIds: [], //上传图片的id
      imageList: [], //上传图片url
      uploadUrl:
        process.env.VUE_APP_BASE_API + "/hmkj-crm/archivesImage/upload",
      headers: { Authorization: _getSessionStore(tokenKey) },
      fileList: [],
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
  },
  created() {
    this.kCMXgetList();
  },
  watch: {
    addCompanyName: {
      handler(n, o) {
        var tath = this;
        if (tath.addCompanyName.label != undefined) {
          // tath.newCompanyDetail({
          //   companyId: tath.addCompanyName.value,
          //   companyName: tath.addCompanyName.label
          // });
          tath.newCompanyDetail({ companyId: tath.addCompanyName.label.value });
        }
      },

      deep: true,
    },
  },
  mounted() {
    this.restaurants = this.companyNameList;
  },
  methods: {
    // 图片放大
    openImgBig() {
      console.log(this.handOverImageList)
      this.dialogVisible = true;
    },
    //关闭图片放大
    closeViewer() {
      this.dialogVisible = false;
    },
    // 库存明细列表
    kCMXgetList() {
      this.companyList = [];
      let data = JSON.parse(JSON.stringify(this.queryParams));
      queryListPage(data).then((response) => {
        this.companyList = response.data.rows;
        this.total = response.data.totalRows;
      });
    },
    // 交接记录
    JJJLgetList() {
      // this.recordOfShifList=[]

      jJMXqueryListPage(this.queryParams).then((response) => {
        this.recordOfShifList = response.data.rows;
        this.total = response.data.totalRows;
      });
    },
    // 切换
    onTabsJudge(e) {
      this.queryParams.pageNo = 1;
      this.tabsJudge = e.name || "";
      if (e.name == "") {
        this.kCMXgetList();
      } else if (e.name == 20) {
        this.JJJLgetList();
      }
    },
    // 物品库存明细-订单编号
    wPKCMXNumber(row) {
      this.wPKCMXJudge = true;
      findBoxInArticleInImage({ id: row.id }).then((response) => {
        this.wPKMXDetailForm = response.data || {};
        this.imageResultList = response.data.imageResultList.map(item=>{
          return item.url
        })
      });
    },
    // 交接记录--订单编号
    jJJLXQNumber(row) {
      this.yJJLXQJudge = true;
      findOne({ id: row.id }).then((response) => {
        response.data.articleResultList.forEach((item, index) => {
          if (item.receiveType == "10") {
            return (item.receiveType = "已接收");
          } else if (item.receiveType == "20") {
            return (item.receiveType = "未接收");
          }
        });
        this.wPKMXDetailForm = response.data;
      });
    },
    // 点击移交
    YiJiao(row) {
      var tath = this;
      this.hdTypeNameOBJ = this.hdTypeOptions[0];
      if (row.userType == "10") {
        this.yJJudge = true;
        this.handOverForm.hdType = this.hdTypeOptions[0].value;
      } else if (row.userType == "20") {
        this.yJJudge = false;
      }
      // this.hdTypeNameOBJ = { value: 0 };
      this.handOverImageIds = [];
      this.handOverImageList = [];
      this.departmentOBJ = { value: 0 };
      this.departmentStaffOBJ = { value: 0 };
      (this.departmentList = []), //部门
        (this.departmentStaff = []), //部门人员
        findBoxInArticleInImage({ id: row.id }).then((response) => {
          this.handOverJudge = true;
          this.handOverForm = response.data;
          this.handOverArticleResultList = response.data.articleResultList;
          tath.$nextTick(() => {
            this.handOverArticleResultList.forEach((item, index) => {
              tath.$refs.dataTable.toggleAllSelection(item, true);
              // tath.$refs.dataTable.toggleRowSelection(item,true);
            });
          });
          response.data.imageResultList.forEach((item, index) => {
            this.handOverImageList.push(item.url);
            this.handOverImageIds.push(item.id);
          });
        });
      // 部门请求数据
      findDeptListByUserId().then((response) => {
        response.data.forEach((item, index) => {
          this.departmentList.push({
            value: item.deptId,
            label: item.deptName,
            childList: item.entDeptResults,
          });
        });
      });
    },
    // 移交--交接类型
    YiJiaoHdType() {
      this.departmentOBJ = {};
      this.handOverForm.hdType = this.hdTypeNameOBJ.value;
      this.departmentOBJ = { value: 0 };
      this.departmentStaffOBJ = { value: 0 };
    },
    // 移交-部门选择
    YiJiaoDepartmentType() {
      this.departmentStaff = [];
      this.handOverForm.deptId = this.departmentOBJ.value;
      this.departmentOBJ.childList.forEach((item, index) => {
        let userIdList = item.userIds.split(",");
        let userNamesList = item.userNames.split(",");
        userIdList.forEach((itemS, indexS) => {
          this.departmentStaff.push({
            value: itemS,
            label: userNamesList[indexS],
          });
        });
      });
    },
    // 部门人员选择后
    YiJiaoDepartmentStaffType() {
      this.handOverForm.userId = this.departmentStaffOBJ.value;
      this.handOverForm.userName = this.departmentStaffOBJ.label;
    },

    // 移交-物品是否能选择判断
    handOverIsDisabled(row) {
      if (row.check == "20") {
        return 0;
      } else if (row.check == "10") {
        return 1;
      }
    },
    // 移交--删除图片
    handOverDeleteImg(item, index) {
      this.handOverImageIds.splice(index, 1);
      this.handOverImageList.splice(index, 1);
    },
    //移交-- 上传-交接表附件
    handOverHandleChange(file, fileList) {
      if (file.response) {
        this.handOverImageIds.push(file.response.data.id);
        this.handOverImageList.push(file.response.data.url);
      }
      this.fileList = fileList.slice(-3);
      //  imageList
    },
    // 移交物品-多选框
    handOverHandleSelectionChange(selection) {
      this.pitchOnNewList = selection;
      this.handOverForm.articleResultList = selection;
    },
    // 移交表单提交
    handOverSubmit() {
      var judge = false;
      this.handOverForm.imageResultList = [];
      this.handOverForm.imageIds = this.handOverImageIds.toString();
      if (this.pitchOnNewList.length == 0) {
        this.$message.error("请选择移交物品。");
      } else if (this.hdTypeNameOBJ == {} || this.hdTypeNameOBJ.value == 0) {
        this.$message.error("请选择交接类型");
      } else if (this.hdTypeNameOBJ.value == "10") {
        if (this.departmentOBJ == {} || this.departmentOBJ.value == 0) {
          this.$message.error("请选择部门");
        } else if (
          this.departmentStaffOBJ == {} ||
          this.departmentStaffOBJ.value == 0
        ) {
          this.$message.error("请选择部门人员");
        } else {
          judge = true;
        }
      } else if (this.hdTypeNameOBJ.value == "30") {
        if (
          this.handOverForm.trackingNumber == undefined ||
          this.handOverForm.trackingNumber == ""
        ) {
          this.$message.error("请输入快递单号");
        } else {
          judge = true;
        }
      }
      if (judge) {
        this.handOverForm.repeat = "";
        // this.hdTypeNameOBJ.hdType=this.hdTypeNameOBJ.value
        this.$set(this.handOverForm, "hdType", this.hdTypeNameOBJ.value);
        transfer(this.handOverForm).then((response) => {
          if (response.code == 200) {
            if (response.data.code == 996007) {
              this.$confirm(response.data.mes, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  this.handOverForm.repeat = 10;
                  transfer(this.handOverForm).then((res) => {
                    this.handOverJudge = false;
                    this.kCMXgetList();
                    this.$message({
                      message: "移交成功",
                      type: "success",
                    });
                    this.handOverForm.repeat = "";
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消移交",
                  });
                });
            } else {
              this.handOverJudge = false;
              this.kCMXgetList();
              this.$message({
                message: "移交成功",
                type: "success",
              });
            }
          } else {
            this.$message.error("抱歉移交失败");
          }
        });
      }
    },
    // 接收
    onReception(row) {
      this.receptionJudge = true;
      this.receptionImageList = [];
      this.receptionIdList = [];
      receiveData({ id: row.id }).then((response) => {
        if (response.data.hdType == "10") {
          this.receptionHdType = "内部移交";
        } else if (response.data.hdType == "20") {
          this.receptionHdType = "收到入库";
        } else if (response.data.hdType == "30") {
          this.receptionHdType = "归还客户";
        }
        response.data.imageResultList.forEach((item, index) => {
          this.receptionImageList.push(item.url);
          this.receptionIdList.push(item.id);
        });
        this.receptionArticleResultList = response.data.articleResultList;

        this.receptionForm = response.data;
      });
    },
    // 数组对象方法排序
    sortByKey(array, key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    // 接受物品--多选框
    receptionHandleSelectionChange(selection) {
      this.sortByKey(selection, "number");
      var ju = 0;
      this.receptionArticleResultList.forEach((item, index) => {
        selection.forEach((itemS, indexS) => {
          if (item.id == selection[ju].id) {
            if (selection.length >= 2) {
              ju = index;
            }
            return (item.check = 10);
          } else {
            if (selection.length >= 2) {
              ju = index;
            }

            return (item.check = 20);
          }
        });
      });
      this.receptionForm.articleResultList = this.receptionArticleResultList;
    },
    // 接受--删除图片
    receptionDeleteImg(item, index) {
      this.receptionIdList.splice(index, 1);
      this.receptionImageList.splice(index, 1);
    },
    // 接受--上传-交接附件表
    receptionHandleChange(file, fileList) {
      if (file.response) {
        this.receptionIdList.push(file.response.data.id);
        this.receptionImageList.push(file.response.data.url);
      }
      // this.fileList = fileList.slice(-3);
    },
    // 接受--提交表单
    receptionSubmit() {
      this.receptionForm.imageIds = this.receptionIdList.toString();
      receive(this.receptionForm).then((response) => {
        if (response.code == "200") {
          this.receptionJudge = false;
          this.kCMXgetList();
          this.$message({
            message: "接受成功",
            type: "success",
          });
        } else {
          this.$message.error("接受失败！");
        }
      });
    },
    // 新增物品多选-禁用判断
    isDisabled(row) {
      if (row.id) {
        return 0;
      }
      return 1;
    },
    // 添加物品-删除图片
    deleteImg(item, index) {
      this.imageIds.splice(index, 1);
      this.imageList.splice(index, 1);
    },
    // 搜索框
    search() {
      // if (this.specialApprovalsType  == 10) {
      //   this.getList();
      // } else if (this.specialApprovalsType  == 20) {
      //   this.getListLS();
      // } else if (this.specialApprovalsType  == 30) {
      //   this.getListHT();
      // }
      this.queryParams.pageNo = 1;
      this.kCMXgetList();
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      // if (e.keyCode != 13) {
      //   this.showSearch = false;
      // }
      // this.resetQuery();
      // this.queryParams.clientType=this.clientTypeCut
      // this.getList();
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
      };
      if (this.tabsJudge == 20) {
        this.JJJLgetList();
      } else {
        this.kCMXgetList();
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // this.ids = selection.map(item => item.id);
      // this.single = selection.length !== 1;
      // this.multiple = !selection.length;
    },
    // 新增物品-多选框
    handleSelectionChangeNEW(selection) {
      // this.ids = selection.map(item => item.id);
      // this.single = selection.length !== 1;
      // this.multiple = !selection.length;
      this.pitchOnNewList = selection;
      // var int[]
      //       for(int i=0;i<selection.length;i++){
      //             System.out.print(a[i]+"  ");
      //             }
    },
    handleRowFun(row, column, event) {
      // if (
      //   column.property &&
      //   column.property != undefined &&
      //   column.property != "undefined"
      // ) {
      //   this.reset();
      //   this.companyId = row.id;
      //   this.view = true;
      // }
    },
    //新增物品
    handleAddCustomer(data) {
      this.addForm = {
        hdTypeName: "收到入库",
        companyName: "",
        hdType: 10,
        articleResultList: [],
      };
      this.addCompanyName = {};
      this.newGoods = true;
      this.newDABH = false;
      var companyNameList = [];
      // this.addForm.articleResultList = [];
      this.imageIds = [];
      this.imageList = [];
      findClientList({ companyName: data.companyName }).then((response) => {
        response.data.forEach((element) => {
          companyNameList.push({
            value: element.id,
            label: element.companyName,
          });
        });
        this.companyNameList = companyNameList;
        console.info("公司名称");
        console.info(companyNameList);
        this.loading = false;
      });
    },

    // 远程搜索
    remoteMethod(query) {
      this.addCompanyName = { label: query, value: "" };
      this.addForm.companyName = query;
      if (query !== "") {
        this.loading = true;
        this.handleAddCustomer({ companyName: query });
      }
      console.info("远程搜索");
      console.info(query);
      console.info(this.addCompanyName.label);
    },
    // 新增物品--选择公司名称后-请求详情接口
    newCompanyDetail(data) {
      this.imageList = [];
      this.imageIds = [];
      findBoxInArticleInImage(data).then((response) => {
        if (response.data.fileNumber != "") {
          this.newDABH = true;
          this.addForm.fileNumber = response.data.fileNumber;
        } else {
          this.newDABH = false;
        }
        this.addForm = response.data;
        (this.addForm.hdType = 10),
          (this.addForm.hdTypeName = "收到入库"),
          (this.addForm.companyId = data.companyId);
        this.addForm.companyName = data.companyName;
        response.data.imageResultList.forEach((item, index) => {
          this.imageList.push(item.url);
          this.imageIds.push(item.id);
        });
        // }
        // this.imageList.push()
      });
    },
    // 新增物品--校验档案编号
    verifyFileMark(e) {
      checkNumber({ fileNumber: e }).then((response) => {
        if (response.code == 500) {
          this.$message({
            message: response.message,
            type: "warning",
          });
        }
      });
    },
    // 新增物品---添加物品行
    addLine() {
      this.addForm.articleResultList.push({
        number: this.addForm.articleResultList.length + 1,
      });
    },
    // 上传-交接表附件
    handleChange(file, fileList) {
      if (file.response) {
        this.imageIds.push(file.response.data.id);
        this.imageList.push(file.response.data.url);
        console.log(this.imageList);
      }
      this.fileList = fileList.slice(-3);
    },
    // 新增物品---删除
    removeNew() {
      var judge = this.pitchOnNewList.length;
      if (this.pitchOnNewList.length == 0) {
        this.$message({
          message: "请选择需要删除的物品",
          type: "warning",
        });
      } else {
        this.pitchOnNewList.forEach((item, index) => {
          this.addForm.articleResultList.splice(item.number - 1, 1);
          judge = judge - 1;
          if (judge == 0) {
            this.addForm.articleResultList.forEach((item, index) => {
              return (item.number = index + 1);
            });
            this.pitchOnNewList = [];
            this.$message({
              message: "删除成功",
              type: "success",
            });
          }
        });
      }
      // else{
      //   this.$message({
      //         message: "删除成功",
      //         type: "success"
      //       });
      // }
    },
    // 删除上传文件
    handleRemove(file, fileList) {
      this.imageIds = [];
      if (fileList != []) {
        fileList.forEach((item, index) => {
          this.imageIds.push(item.response.data.id);
        });
      }
    },
    // 新增物品-提交
    addSubmit() {
      // this.addForm.hdType=10;//交接类型 (10 内部移交, 20 收到入库, 30 归还客户)
      this.addForm.companyName = this.addCompanyName.label.label;
      this.addForm.imageIds = this.imageIds.toString();
      var judgeNum = 0;

      if (this.addForm.articleResultList.length > 0) {
        this.addForm.articleResultList.forEach((item, index) => {
          if (item.name == undefined || item.name == "") {
            this.$message({
              message: "请输入物品名称",
              type: "warning",
            });
          } else if (item.amount == undefined || item.amount == "") {
            this.$message({
              message: "请输入物品数量",
              type: "warning",
            });
          } else {
            judgeNum++;
          }
        });
      }
      if (judgeNum == this.addForm.articleResultList.length) {
        add(this.addForm).then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "新增成功",
              type: "success",
            });
            this.addForm = {
              hdTypeName: "收到入库",
              companyName: "",
              hdType: 10,
            };
            this.kCMXgetList();
            this.imageList = [];
            this.addCompanyName = {};
            this.newGoods = false;
            this.newDABH = false;
          }
        });
      }
    },
    //取消按钮
    cancel() {
      this.newGoods = false;
      this.newDABH = false;
      this.handOverJudge = false;
      this.receptionJudge = false;
      this.wPKCMXJudge = false;
      this.addForm = {
        hdTypeName: "收到入库",
        companyName: "",
      };
      this.imageList = [];
      this.addCompanyName = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.archivesAdministration {
}
</style>
<style lang="scss" scoped>
.archivesAdministrationTableBox {
  // max-height: 300px;
  .el-table__body-wrapper {
    // .el-tooltip {
    .el-input__inner {
      border: 0px !important;
      background: transparent;
    }
    // }
  }
}
.addCustomer {
  .title {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #565759;
    padding-bottom: 0;
    margin-top: 10px;
    line-height: 32px;
  }
  .uploading {
    display: flex;
    flex-wrap: wrap;
    // .imageList{
    //   display: flex;
    //   margin-top: 10px;
    .upload-demo {
      display: flex;
      flex-direction: column;
    }
    .imageListChild {
      width: 148px !important;
      height: 148px !important;
      margin-right: 10px;
      margin-top: 10px;
      position: relative;
      .delete {
        position: absolute;

        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;
        background: rgba(0, 0, 0, 0.4);
        > i {
          font-size: 30px;
          color: #fff;
        }
      }
      .el-image {
        width: 100%;
        height: 100%;
      }
      // }
    }
    .imageListChild:hover {
      .delete {
        display: flex;
      }
    }
    //     .imageListChild:hover{
    //       &:before {
    //   content: "X";
    //   z-index: 99;
    //   position: absolute;
    //   right: 45%;
    //   top: 45%;
    // }
    // }
    .upload-demo {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .el-upload-list {
    display: none !important;
  }
}
</style>
