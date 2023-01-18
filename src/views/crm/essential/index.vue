<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="注册资本" prop="registeredCapital">
        <el-input
          v-model="queryParams.registeredCapital"
          placeholder="请输入注册资本"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="企业税号" prop="enterpriseNumber">
        <el-input
          v-model="queryParams.enterpriseNumber"
          placeholder="请输入企业税号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="全国统一信用编码" prop="creditCode">
        <el-input
          v-model="queryParams.creditCode"
          placeholder="请输入全国统一信用编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行业分类" prop="industryName">
        <el-input
          v-model="queryParams.industryName"
          placeholder="请输入行业分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房屋性质" prop="roomType">
        <el-select
          v-model="queryParams.roomType"
          placeholder="请选择房屋性质"
          clearable
          size="small"
        >
          <el-option
            v-for="item in roomType"
            :key="item.dictId"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="房主姓名" prop="ownersName">
        <el-input
          v-model="queryParams.ownersName"
          placeholder="请输入房主姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房主身份证号码" prop="identityCardNumber">
        <el-input
          v-model="queryParams.identityCardNumber"
          placeholder="请输入房主身份证号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经营状况" prop="operateState">
        <!-- <el-input
          v-model="queryParams.operateState"
          placeholder="请输入经营状况(10.注册，20.在营，30.存续，40.注销)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        /> -->
        <el-select
          v-model="queryParams.operateState"
          placeholder="请输入经营状况 "
          clearable
          size="small"
        >
          <el-option
            v-for="item in operateState"
            :key="item.dictId"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input
          v-model="queryParams.country"
          placeholder="请输入国家"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省" prop="province">
        <el-input
          v-model="queryParams.province"
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
      <el-form-item label="县/辖区" prop="county">
        <el-input
          v-model="queryParams.county"
          placeholder="请输入县/辖区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- 公司类型，存入字典做标签 这里存入实际类型名称 如 -->
      <el-form-item label="公司类型" prop="companyType">
        <el-select
          v-model="queryParams.companyType"
          placeholder="请选择公司类型"
          clearable
          size="small"
        >
          <el-option
            v-for="item in companyType"
            :key="item.dictId"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户类型" prop="clientType">
        <el-select
          v-model="queryParams.clientType"
          placeholder="请选择客户类型"
          clearable
          size="small"
        >
          <el-option
            v-for="item in clientType"
            :key="item.dictId"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户编号" prop="client">
        <el-input
          v-model="queryParams.client"
          placeholder="请输入客户编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户等级" prop="clientLv">
        <el-input
          v-model="queryParams.clientLv"
          placeholder="请输入客户等级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户来源备注" prop="clientSource">
        <el-input
          v-model="queryParams.clientSource"
          placeholder="请输入客户来源备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户标签信息" prop="userlabelIds">
        <el-input
          v-model="queryParams.userlabelIds"
          placeholder="请输入用户标签信息"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="注册时间" prop="registerTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.registerTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择注册时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.createDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.updateDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择更新时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="删除开关标识" prop="delSwitch">
        <el-select
          v-model="queryParams.delSwitch"
          placeholder="请选择删除开关标识 "
          clearable
          size="small"
        >
          <el-option
            v-for="item in delSwitch"
            :key="item.dictId"
            :label="item.dictLabel"
            :value="item.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="意见度" prop="opinion">
        <el-input
          v-model="queryParams.opinion"
          placeholder="请输入意见度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否在其他公司代账" prop="companies">
        <el-input
          v-model="queryParams.companies"
          placeholder="请输入是否在其他公司代账"
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
          v-hasPermi="['share:essential:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <!-- <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:essential:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:essential:remove']"
        >删除</el-button> -->
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:essential:export']"
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
      :data="essentialList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="是否在其他公司代账" align="center" prop="id" />
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column
        label="注册资本"
        align="center"
        prop="registeredCapital"
      />
      <el-table-column
        label="企业税号"
        align="center"
        prop="enterpriseNumber"
      />
      <el-table-column
        label="全国统一信用编码"
        align="center"
        prop="creditCode"
      />
      <el-table-column label="经营范围" align="center" prop="businessScope" />
      <el-table-column label="行业分类" align="center" prop="industryName" />
      <el-table-column label="房屋性质" align="center" prop="roomType" />
      <el-table-column label="房主姓名" align="center" prop="ownersName" />
      <el-table-column
        label="房主身份证号码"
        align="center"
        prop="identityCardNumber"
      />
      <el-table-column
        label="经营状况"
        align="center"
        prop="operateState"
        :formatter="operateStateFormat"
      />
      <el-table-column label="国家" align="center" prop="country" />
      <el-table-column label="省" align="center" prop="province" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="县/辖区" align="center" prop="county" />
      <el-table-column label="公司详细地址" align="center" prop="address" />
      <el-table-column
        label="公司类型"
        align="center"
        prop="companyType"
        :formatter="companyTypeFormat"
      />
      <el-table-column
        label="客户类型"
        align="center"
        prop="clientType"
        :formatter="clientTypeFormat"
      />
      <el-table-column label="客户编号" align="center" prop="client" />
      <el-table-column label="客户等级" align="center" prop="clientLv" />
      <el-table-column
        label="客户来源备注"
        align="center"
        prop="clientSource"
      />
      <el-table-column
        label="用户标签信息"
        align="center"
        prop="userlabelIds"
      />
      <el-table-column
        label="注册时间"
        align="center"
        prop="registerTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.registerTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createDate"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateDate"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <!-- 备注 :省级需另外提供本人实名的银行卡号码 -->
      <el-table-column label="备注 " align="center" prop="remarks" />
      <el-table-column label="删除开关标识" align="center" prop="delSwitch" :formatter="delSwitchFormat"/>
      <el-table-column label="意见度" align="center" prop="opinion" />
      <el-table-column
        label="是否在其他公司代账"
        align="center"
        prop="companies"
      />
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
            v-hasPermi="['share:essential:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:essential:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改公司基本信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-input
                v-model="form.companyName"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册资本" prop="registeredCapital">
              <el-input
                v-model="form.registeredCapital"
                placeholder="请输入注册资本"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业税号" prop="enterpriseNumber">
              <el-input
                v-model="form.enterpriseNumber"
                placeholder="请输入企业税号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="全国统一信用编码" prop="creditCode">
              <el-input
                v-model="form.creditCode"
                placeholder="请输入全国统一信用编码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="经营范围" prop="businessScope">
              <el-input
                v-model="form.businessScope"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行业分类" prop="industryName">
              <el-input
                v-model="form.industryName"
                placeholder="请输入行业分类"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房屋性质">
              <el-select v-model="form.roomType" placeholder="请选择房屋性质">
                <el-option
                  v-for="item in roomType"
                  :key="item.dictId"
                  :label="item.dictLabel"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房主姓名" prop="ownersName">
              <el-input
                v-model="form.ownersName"
                placeholder="请输入房主姓名"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房主身份证号码" prop="identityCardNumber">
              <el-input
                v-model="form.identityCardNumber"
                placeholder="请输入房主身份证号码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经营状况" prop="operateState">
              <!-- <el-input v-model="form.operateState" placeholder="请输入经营状况(10.注册，20.在营，30.存续，40.注销)" /> -->
              <el-select
                v-model="form.operateState"
                placeholder="请输入经营状况 "
                clearable
                size="small"
              >
                <el-option
                  v-for="item in operateState"
                  :key="item.dictId"
                  :label="item.dictLabel"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="国家" prop="country">
              <el-input v-model="form.country" placeholder="请输入国家" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="省" prop="province">
              <el-input v-model="form.province" placeholder="请输入省" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="市" prop="city">
              <el-input v-model="form.city" placeholder="请输入市" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="县/辖区" prop="county">
              <el-input v-model="form.county" placeholder="请输入县/辖区" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公司详细地址" prop="address">
              <el-input
                v-model="form.address"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司类型">
              <el-select
                v-model="form.companyType"
                placeholder="请选择公司类型"
              >
                <el-option
                  v-for="item in companyType"
                  :key="item.dictId"
                  :label="item.dictLabel"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户类型">
              <el-select v-model="form.clientType" placeholder="请选择客户类型">
                <el-option
                  v-for="item in clientType"
                  :key="item.dictId"
                  :label="item.dictLabel"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户编号" prop="client">
              <el-input v-model="form.client" placeholder="请输入客户编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户等级" prop="clientLv">
              <el-input v-model="form.clientLv" placeholder="请输入客户等级" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户来源备注" prop="clientSource">
              <el-input
                v-model="form.clientSource"
                placeholder="请输入客户来源备注"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户标签信息" prop="userlabelIds">
              <el-input
                v-model="form.userlabelIds"
                placeholder="请输入用户标签信息"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册时间" prop="registerTime">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.registerTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择注册时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="备注 " prop="remarks">
              <el-input
                v-model="form.remarks"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="删除开关标识" prop="delSwitch">
              <el-input
                v-model="form.delSwitch"
                placeholder="请输入删除开关标识"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="意见度" prop="opinion">
              <el-input v-model="form.opinion" placeholder="请输入意见度" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否在其他公司代账" prop="companies">
              <el-input
                v-model="form.companies"
                placeholder="请输入是否在其他公司代账"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
  listEssential,
  getEssential,
  delEssential,
  addEssential,
  updateEssential,
  exportEssential
} from "@/api/crm/essential";

export default {
  name: "Essential",
  data() {
    return {
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
      // 公司基本信息表格数据
      essentialList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      companyType: [],
      clientType: [],
      roomType: [],
      delSwitch: [],
      operateState: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyName: null,
        registeredCapital: null,
        enterpriseNumber: null,
        creditCode: null,
        businessScope: null,
        industryName: null,
        roomType: null,
        ownersName: null,
        identityCardNumber: null,
        operateState: null,
        country: null,
        province: null,
        city: null,
        county: null,
        address: null,
        companyType: null,
        clientType: null,
        client: null,
        clientLv: null,
        clientSource: null,
        userlabelIds: null,
        registerTime: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        opinion: null,
        companies: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        address: [
          { required: true, message: "公司地址不能为空", trigger: "blur" }
        ],
        businessScope: [
          { required: true, message: "经营范围不能为空", trigger: "blur" }
        ],
        client: [
          { required: true, message: "客户编号不能为空", trigger: "blur" }
        ],
        clientType: [
          { required: true, message: "客户类型不能为空", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" }
        ],
        companyType: [
          { required: true, message: "公司类型不能为空", trigger: "blur" }
        ],
        province: [{ required: true, message: "省不能为空", trigger: "blur" }],
        city: [{ required: true, message: "市不能为空", trigger: "blur" }],
        county: [
          { required: true, message: "县/辖区不能为空", trigger: "blur" }
        ],
        creditCode: [
          {
            required: true,
            message: "全国统一信用编码不能为空",
            trigger: "blur"
          }
        ],
        enterpriseNumber: [
          { required: true, message: "企业税号不能为空", trigger: "blur" }
        ],
        industryName: [
          { required: true, message: "行业分类不能为空", trigger: "blur" }
        ],
        operateState: [
          { required: true, message: "经营状况不能为空", trigger: "blur" }
        ],
        registeredCapital: [
          { required: true, message: "注册资本不能为空", trigger: "blur" }
        ],
        roomType: [
          { required: true, message: "房屋性质不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getDicts("operate_state").then(res => {
      this.operateState = res.data;
    });
    this.getDicts("del_switch").then(res => {
      this.delSwitch = res.data;
    });
    this.getDicts("room_type").then(res => { 
      this.roomType = res.data;
    });
    this.getDicts("client_type").then(res => {
      this.clientType = res.data;
    });
    this.getDicts("company_type").then(res => {
      this.companyType = res.data;
    });

    this.getList();
  },
  methods: {
    /** 查询公司基本信息列表 */
    getList() {
      this.loading = true;
      listEssential(this.queryParams).then(response => {
        this.essentialList = response.data.rows;
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
        companyName: null,
        registeredCapital: null,
        enterpriseNumber: null,
        creditCode: null,
        businessScope: null,
        industryName: null,
        roomType: null,
        ownersName: null,
        identityCardNumber: null,
        operateState: null,
        country: null,
        province: null,
        city: null,
        county: null,
        address: null,
        companyType: null,
        clientType: null,
        client: null,
        clientLv: null,
        clientSource: null,
        userlabelIds: null,
        registerTime: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        opinion: null,
        companies: null
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
      this.title = "添加公司基本信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getEssential({id:row.id}).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公司基本信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateEssential(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addEssential(this.form).then(response => {
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
        '是否确认删除公司基本信息编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delEssential({id:ids});
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有公司基本信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportEssential(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    operateStateFormat(row) {
      return this.selectDictLabel(this.operateState, row.operateState);
    },
    delSwitchFormat(row) {
      return this.selectDictLabel(this.delSwitch, row.delSwitch);
    },
    roomTypeFormat(row) {
      return this.selectDictLabel(this.roomType, row.roomType);
    },
    clientTypeFormat(row) {
      return this.selectDictLabel(this.clientType, row.clientType);
    },
    companyTypeFormat(row) {
      return this.selectDictLabel(this.companyType, row.companyType);
    }
  }
};
</script>
