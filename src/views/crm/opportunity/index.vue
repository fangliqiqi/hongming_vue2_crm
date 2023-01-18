<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="客户名称" prop="clienteleName">
        <el-input
          v-model="queryParams.clienteleName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人电话" prop="customerPhone">
        <el-input
          v-model="queryParams.customerPhone"
          placeholder="请输入联系人电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入联系人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务描述" prop="categoryText">
        <el-input
          v-model="queryParams.categoryText"
          placeholder="请输入业务描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户来源" prop="customerSource">
        <el-input
          v-model="queryParams.customerSource"
          placeholder="请输入客户来源"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="跟进负责人" prop="followUser">
        <el-input
          v-model="queryParams.followUser"
          placeholder="请输入跟进负责人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="线索提交人" prop="threadUser">
        <el-input
          v-model="queryParams.threadUser"
          placeholder="请输入线索提交人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属部门" prop="deptName">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入所属部门"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="片区" prop="district">
        <el-input
          v-model="queryParams.district"
          placeholder="请输入片区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省" prop="prov">
        <el-input
          v-model="queryParams.prov"
          placeholder="请输入省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区" prop="county">
        <el-input
          v-model="queryParams.county"
          placeholder="请输入区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接收资源的用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入接收资源的用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理商用户id()" prop="receiveId">
        <el-input
          v-model="queryParams.receiveId"
          placeholder="请输入代理商用户id()"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理商接收信息时间" prop="receiveTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.receiveTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择代理商接收信息时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="再次跟进时间" prop="followTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.followTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择再次跟进时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="代理商确认信息的有效状态 " prop="agentState">
        <el-select
          v-model="queryParams.agentState"
          placeholder="请选择信息有效状态"
          clearable
          size="small"
        >
          <el-option
            v-for="item in agentState"
            :key="item.dictId"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="回访专员确认信息有效状态" prop="returnState">
        <el-select
          v-model="queryParams.returnState"
          placeholder="请选择信息有效状态"
          clearable
          size="small"
        >
          <el-option
            v-for="item in returnState"
            :key="item.dictId"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商机级别" prop="sourceTypeLv">
        <el-input
          v-model="queryParams.sourceTypeLv"
          placeholder="请输入商机级别"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商机类型id" prop="sourceTypeId">
        <el-input
          v-model="queryParams.sourceTypeId"
          placeholder="请输入商机类型id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- 商机状态 :10 成交, 20 未成交, 30 流放, 40 回收, 50 在公海 -->
      <el-form-item label="商机状态 " prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择商机状态"
          clearable
          size="small"
        >
          <el-option
            v-for="item in businessStatus"
            :key="item.dictId"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户的QQ" prop="customerQq">
        <el-input
          v-model="queryParams.customerQq"
          placeholder="请输入客户的QQ"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成交金额" prop="turnover">
        <el-input
          v-model="queryParams.turnover"
          placeholder="请输入成交金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户的微信" prop="customerWeixin">
        <el-input
          v-model="queryParams.customerWeixin"
          placeholder="请输入客户的微信"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="增值税类型" prop="taxType">
        <el-select
          v-model="queryParams.taxType"
          placeholder="请选择增值税类型"
          clearable
          size="small"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="addressDetail">
        <el-input
          v-model="queryParams.addressDetail"
          placeholder="请输入详细地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属部门id" prop="deptId">
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入所属部门id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:opportunity:add']"
          >新增</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:opportunity:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:opportunity:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="ConversionDeal"
          >转成交</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:opportunity:export']"
          >导出</el-button
        >
      </el-col>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button
            size="mini"
            circle
            icon="el-icon-refresh"
            @click="handleQuery"
          />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          :content="showSearch ? '隐藏搜索' : '显示搜索'"
          placement="top"
        >
          <el-button
            size="mini"
            circle
            icon="el-icon-search"
            @click="showSearch = !showSearch"
          />
        </el-tooltip>
      </div>
    </el-row>

    <el-table
      v-loading="loading"
      :data="opportunityList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="资源id" align="center" prop="id" />
      <el-table-column label="客户名称" align="center" prop="clienteleName" />
      <el-table-column label="联系人电话" align="center" prop="customerPhone" />
      <el-table-column label="联系人" align="center" prop="customerName" />
      <el-table-column label="业务描述" align="center" prop="categoryText" />
      <el-table-column label="客户来源" align="center" prop="customerSource" />
      <el-table-column label="跟进负责人" align="center" prop="followUser" />
      <el-table-column label="线索提交人" align="center" prop="threadUser" />
      <el-table-column label="所属部门" align="center" prop="deptName" />
      <el-table-column label="片区" align="center" prop="district" />
      <el-table-column label="省" align="center" prop="prov" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="区" align="center" prop="county" />
      <el-table-column label="接收资源的用户id" align="center" prop="userId" />
      <el-table-column label="代理商用户id()" align="center" prop="receiveId" />
      <el-table-column
        label="代理商接收信息时间"
        align="center"
        prop="receiveTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.receiveTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="再次跟进时间"
        align="center"
        prop="followTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.followTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="代理商确认信息的有效状态"
        align="center"
        prop="agentState"
        :formatter="agentStateFormat"
      />

      <el-table-column
        label="回访专员确认信息有效状态"
        align="center"
        prop="returnState"
        :formatter="returnStateFormat"
      />
      <el-table-column label="商机级别" align="center" prop="sourceTypeLv" />
      <el-table-column label="商机类型id" align="center" prop="sourceTypeId" />
      <el-table-column
        label="商机状态"
        align="center"
        prop="status"
        :formatter="businessStatusFormat"
      />
      <el-table-column label="客户的QQ" align="center" prop="customerQq" />
      <el-table-column label="成交金额" align="center" prop="turnover" />
      <el-table-column
        label="客户的微信"
        align="center"
        prop="customerWeixin"
      />
      <el-table-column label="备注" align="center" prop="remark" />

      <el-table-column label="增值税类型" align="center" prop="taxType" />
      <el-table-column label="详细地址" align="center" prop="addressDetail" />
      <el-table-column label="所属部门id" align="center" prop="deptId" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:opportunity:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:opportunity:remove']"
            >删除</el-button
          >
          <el-button size="mini" type="text" @click="exportImgfile"
            >批量导入</el-button
          >
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

    <!-- 转成交 -->
    <el-dialog
      title="转成交"
      :visible.sync="dialogVisible"
      width="704px"
      class="bargain"
    >
      <!-- <el-divider></el-divider> -->
      <el-steps :active="1" space="368px">
        <el-step title="商机信息补全"> </el-step>
        <el-step title="选择购买产品"></el-step>
        <el-step title="提交订单合同"></el-step>
      </el-steps>
      <el-divider></el-divider>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :label-position="labelPosition"
        label-width="80px"
        maxHeight="612px"
        class="chengjiao"
      >
        <el-row type="flex" justify="space-between">
          <el-col :span="7.5">
            <el-form-item label="商机名称" prop="clienteleName">
              <el-input
                v-model="form.clienteleName"
                placeholder="请输入商机名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7.5">
            <el-form-item label="联系人方式" prop="customerPhone">
              <el-input
                v-model="form.customerPhone"
                placeholder="请输入联系人方式"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7.5">
            <el-form-item label="商机类型" prop="sourceTypeId">
              <el-input
                v-model="form.sourceTypeId"
                placeholder="请输入商机类型"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7.5">
            <el-form-item label="商机名称" prop="clienteleName">
              <el-input
                v-model="form.clienteleName"
                placeholder="请输入商机名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7.5">
            <el-form-item label="联系人方式" prop="customerPhone">
              <el-input
                v-model="form.customerPhone"
                placeholder="请输入联系人方式"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7.5">
            <el-form-item label="商机类型" prop="sourceTypeId">
              <el-input
                v-model="form.sourceTypeId"
                placeholder="请输入商机类型"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7.5">
            <el-form-item label="商机名称" prop="clienteleName">
              <el-input
                v-model="form.clienteleName"
                placeholder="请输入商机名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7.5">
            <el-form-item label="联系人方式" prop="customerPhone">
              <el-input
                v-model="form.customerPhone"
                placeholder="请输入联系人方式"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7.5">
            <el-form-item label="商机类型" prop="sourceTypeId">
              <el-input
                v-model="form.sourceTypeId"
                placeholder="请输入商机类型"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <span class="daizhang"> 在其他公司代账</span>
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="详细地址" prop="district">
            <el-input v-model="form.district" placeholder="请选择行业分类" />
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="标签" prop="district">
            <div
              style="border:1px solid #E6E7EB; height:52px;line-height:52px;padding-left:10px"
            >
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <!-- <el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input> -->
              <el-button class="button-new-tag" size="small" @click="showInput"
                >+ 添加标签</el-button
              >
            </div>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row :gutter="20">
        <el-button  type="primary" @click="next"
          >下一步</el-button
        >
      </el-row>
    </el-dialog>

    <el-dialog
      title="转成交"
      :visible.sync="dialogVisibleTwo"
      width="704px"
      class="bargainTwo"
    >
      <!-- <el-divider></el-divider> -->
      <el-steps :active="2" space="368px">
        <el-step title="商机信息补全"> </el-step>
        <el-step title="选择购买产品"></el-step>
        <el-step title="提交订单合同"></el-step>
      </el-steps>
      <el-divider></el-divider>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :label-position="labelPosition"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <span> 工商注册</span>
              <span>选择并创建合同订单</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span>记账报税 </span>
               <span>选择并创建合同订单</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span> 小规模代理记账</span>
               <span>选择并创建合同订单</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <span> 一般纳税人记账报税</span>
               <span>选择并创建合同订单</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span> 工商变更</span>
               <span>选择并创建合同订单</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span> 小规模年收费</span>
               <span>选择并创建合同订单</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <span>自定义业务订单 </span>
               <span>选择并创建合同订单</span>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
      <el-row :gutter="20">
        
        <el-button   @click="back"
          >上一步</el-button
        >
      </el-row>
      </div> 
    </el-dialog>

    <!-- 添加或修改商机信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户名称" prop="clienteleName">
          <el-input v-model="form.clienteleName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="customerPhone">
          <el-input
            v-model="form.customerPhone"
            placeholder="请输入联系人电话"
          />
        </el-form-item>
        <el-form-item label="联系人" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="业务描述" prop="categoryText">
          <el-input v-model="form.categoryText" placeholder="请输入业务描述" />
        </el-form-item>
        <el-form-item label="客户来源" prop="customerSource">
          <el-input
            v-model="form.customerSource"
            placeholder="请输入客户来源"
          />
        </el-form-item>
        <el-form-item label="跟进负责人" prop="followUser">
          <el-input v-model="form.followUser" placeholder="请输入跟进负责人" />
        </el-form-item>
        <el-form-item label="线索提交人" prop="threadUser">
          <el-input v-model="form.threadUser" placeholder="请输入线索提交人" />
        </el-form-item>
        <el-form-item label="所属部门" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入所属部门" />
        </el-form-item>
        <el-form-item label="片区" prop="district">
          <el-input v-model="form.district" placeholder="请输入片区" />
        </el-form-item>
        <el-form-item label="省" prop="prov">
          <el-input v-model="form.prov" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model="form.city" placeholder="请输入市" />
        </el-form-item>
        <el-form-item label="区" prop="county">
          <el-input v-model="form.county" placeholder="请输入区" />
        </el-form-item>
        <el-form-item label="接收资源的用户id" prop="userId">
          <el-input
            v-model="form.userId"
            placeholder="请输入接收资源的用户id"
          />
        </el-form-item>
        <el-form-item label="代理商用户id()" prop="receiveId">
          <el-input
            v-model="form.receiveId"
            placeholder="请输入代理商用户id()"
          />
        </el-form-item>
        <el-form-item label="代理商接收信息时间" prop="receiveTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.receiveTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择代理商接收信息时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="再次跟进时间" prop="followTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.followTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择再次跟进时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="代理商确认信息的有效状态 " prop="agentState">
          <el-select
            v-model="form.agentState"
            placeholder="请选择信息有效状态"
            clearable
            size="small"
          >
            <el-option
              v-for="item in agentState"
              :key="item.dictId"
              :label="item.dictLabel"
              :value="item.dictCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="回访专员确认信息有效状态" prop="returnState">
          <el-select
            v-model="form.returnState"
            placeholder="请选择信息有效状态"
            clearable
            size="small"
          >
            <el-option
              v-for="item in returnState"
              :key="item.dictId"
              :label="item.dictLabel"
              :value="item.dictCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商机级别" prop="sourceTypeLv">
          <el-input v-model="form.sourceTypeLv" placeholder="请输入商机级别" />
        </el-form-item>
        <el-form-item label="商机类型id" prop="sourceTypeId">
          <el-input
            v-model="form.sourceTypeId"
            placeholder="请输入商机类型id"
          />
        </el-form-item>
        <el-form-item label="商机状态 ">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="item in returnState"
              :key="item.dictId"
              :label="item.dictLabel"
              :value="item.dictCode"
              >{{ item.dictLabel }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="客户的QQ" prop="customerQq">
          <el-input v-model="form.customerQq" placeholder="请输入客户的QQ" />
        </el-form-item>
        <el-form-item label="成交金额" prop="turnover">
          <el-input v-model="form.turnover" placeholder="请输入成交金额" />
        </el-form-item>
        <el-form-item label="客户的微信" prop="customerWeixin">
          <el-input
            v-model="form.customerWeixin"
            placeholder="请输入客户的微信"
          />
        </el-form-item>
        <el-form-item label="增值税类型">
          <el-select v-model="form.taxType" placeholder="请选择增值税类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressDetail">
          <el-input v-model="form.addressDetail" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="所属部门id" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入所属部门id" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOpportunity,
  getOpportunity,
  delOpportunity,
  addOpportunity,
  updateOpportunity,
  exportOpportunity,
  bulkImportOpportunity,
  ConversionDealOpportunity
} from "@/api/crm/opportunity";

export default {
  name: "Opportunity",
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      radio: "1",
      labelPosition: "top",
      dialogVisible: false,
      dialogVisibleTwo: false,
      agentState: [],
      returnState: [],
      businessStatus: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 商机信息表格数据
      opportunityList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        clienteleName: null,
        customerPhone: null,
        customerName: null,
        categoryText: null,
        customerSource: null,
        followUser: null,
        threadUser: null,
        deptName: null,
        district: null,
        prov: null,
        city: null,
        county: null,
        userId: null,
        receiveId: null,
        receiveTime: null,
        followTime: null,
        agentState: null,
        returnState: null,
        sourceTypeLv: null,
        sourceTypeId: null,
        status: null,
        customerQq: null,
        turnover: null,
        customerWeixin: null,
        delSwitch: null,
        taxType: null,
        addressDetail: null,
        deptId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        clienteleName: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        customerSource: [
          { required: true, message: "客户来源不能为空", trigger: "blur" }
        ],
        prov: [{ required: true, message: "省不能为空", trigger: "blur" }],
        city: [{ required: true, message: "市不能为空", trigger: "blur" }],
        receiveTime: [
          {
            required: true,
            message: "代理商接收信息时间不能为空",
            trigger: "blur"
          }
        ],
        agentState: [
          {
            required: true,
            message: "代理商确认信息的有效状态 不能为空",
            trigger: "blur"
          }
        ],
        returnState: [
          {
            required: true,
            message: "回访专员确认信息有效状态不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getDicts("agent_state").then(res => {
      this.agentState = res.data;
    });
    this.getDicts("return_state").then(res => {
      this.returnState = res.data;
    });
    this.getDicts("business_status").then(res => {
      this.businessStatus = res.data;
    });
    this.getDicts("img_type").then(res => {
      this.type = res.data;
    });

    this.getList();
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
      this.dialogVisible = false;
      this.dialogVisibleTwo = true;
    },
    back(){
       if (this.active-- < 2) this.active = 0;
      this.dialogVisible =  true;
      this.dialogVisibleTwo = false;
    },
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
    //转成交
    ConversionDeal() {
      this.dialogVisible = true;
    },
    /** 查询商机信息列表 */
    getList() {
      this.loading = true;
      listOpportunity(this.queryParams).then(response => {
        this.opportunityList = response.data.rows;
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        clienteleName: null,
        customerPhone: null,
        customerName: null,
        categoryText: null,
        customerSource: null,
        followUser: null,
        threadUser: null,
        deptName: null,
        district: null,
        prov: null,
        city: null,
        county: null,
        userId: null,
        receiveId: null,
        receiveTime: null,
        followTime: null,
        agentState: null,
        returnState: null,
        sourceTypeLv: null,
        sourceTypeId: null,
        status: "0",
        customerQq: null,
        turnover: null,
        customerWeixin: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delSwitch: null,
        taxType: null,
        addressDetail: null,
        deptId: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
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
      this.title = "添加商机信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getOpportunity({ id: id }).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商机信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOpportunity(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addOpportunity(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除商机信息编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delOpportunity({ id: ids });
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    //批量导入
    exportImgfile() {
      bulkImportOpportunity().then(response => {
        // console.log(111);
      });
    },

    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有商机信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportOpportunity(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    businessStatusFormat(row) {
      return this.selectDictLabel(this.businessStatus, row.status);
    },
    returnStateFormat(row) {
      return this.selectDictLabel(this.returnState, row.returnState);
    },
    agentStateFormat(row) {
      return this.selectDictLabel(this.agentState, row.agentState);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
<style lang="scss">
.bargain {
  .el-dialog__body {
    max-height: 612px;
    overflow: auto;
  }
  .el-step {
    position: relative;
    margin-right: 10px !important;
    &:last-child {
      flex-basis: 150px !important;
    }
  }

  .el-form {
    padding-right: 20px;
    padding-left: 20px;
  }
  .el-row {
    .el-form-item__label {
      padding-bottom: 0px !important;
    }
    &:nth-child(4) {
      margin: 3px 0px 10px 0px !important;
      .daizhang {
        font-size: 12px;
        margin-right: 28px;
      }
    }
    &:nth-child(5) {
      margin: 0px !important;
      .el-form-item {
        margin-bottom: 16px;
      }
    }
    &:nth-child(6) {
      margin: 0px !important;
    }
  }
  .el-button--medium {
    width: 67px;
    height: 32px;
    margin-top: 0px !important;
    float: right;
    padding: 0;   
line-height: 24px;
    text-align: center;
    font-size: 12px;
  }
  .el-dialog__body {
    border-top: 1px solid #e6e7eb;
    padding-left: 24px;
    padding-right: 24px;
  }
  .el-step__main {
    position: absolute;
    top: 0;
    left: 24px;
  }
  .el-step__title {
    line-height: 24px;
    background: #fff;
    padding-left: 4px;
    padding-right: 9px;
    font-size: 14px;
    white-space: nowrap;
  }
}
.bargainTwo {
  .el-dialog{
  height: 662px;
  position: relative;
  }

  .el-step {
    position: relative;
    margin-right: 10px !important;
    &:last-child {
      flex-basis: 150px !important;
    }
  }

  .el-form {
    padding-right:36px;
    padding-left:36px;
  }
  .el-row {
    .el-form-item__label {
      padding-bottom: 0px !important;
    }
    .el-col {
      div {
        box-sizing: border-box;
        height: 92px;
        display: flex;
        padding: 0px !important;
        flex-direction: column;
        // justify-content:space-between;
        border: 1px solid #e6e7eb;
        border-radius: 2px;
        margin-bottom: 20px;
        background: #f8f9fb;
        span {
          &:first-child {
            margin: 24px 0 0 20px;
          }
          &:last-child {
            width: 100%;
            height: 28px;
            background: #4977e0;
            color: #ffffff;
            text-align: center;
            line-height: 28px;
            display: none;

          }
        }
      }
       &:hover{
      div{
      background: #ECF2FC;
      justify-content:space-between;
      span{
        &:first-child{
          color:#4977E0;
        }
 &:last-child{
 display:block;
      } 
      }     
      }
    }
    }
    // &:nth-child(4) {
    //   margin: 3px 0px 10px 0px !important;
    //   .daizhang {
    //     font-size: 12px;
    //     margin-right: 28px;
    //   }
    // }
    // &:nth-child(5) {
    //   margin: 0px !important;
    //   .el-form-item {
    //     margin-bottom: 16px;
    //   }
    // }
    // &:nth-child(4) {
    //   margin: 0px !important;
    // }
  }
  
  .el-dialog__footer{
position:absolute;
bottom: 0;
display: flex;
flex-direction:row-reverse;
width: 100%;
padding-bottom:16px ;
padding-right:24px ;
 .el-button--medium {
    width: 67px;
    height: 32px;
    margin-top: 0px !important;
    margin-right:12px ;
    padding: 0;   
    line-height: 24px;
    text-align: center;
    font-size: 12px;
  }
  }
  .el-dialog__body {
    border-top: 1px solid #e6e7eb;
    padding-left: 24px;
    padding-right: 24px;
  }
  .el-step__main {
    position: absolute;
    top: 0;
    left: 24px;
  }
  .el-step__title {
    line-height: 24px;
    background: #fff;
    padding-left: 4px;
    padding-right: 9px;
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>
