<template>
<!-- 个人业务管理       公司税务信息表 -->

  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" >
      <el-form-item label="税务注册地址" prop="registrationAddss">
        <el-input
          v-model="queryParams.registrationAddss"
          placeholder="请输入税务注册地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主管税务机关" prop="authoritiesCharge">
        <el-input
          v-model="queryParams.authoritiesCharge"
          placeholder="请输入主管税务机关"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="税务机关地址" prop="authorityAddss">
        <el-input
          v-model="queryParams.authorityAddss"
          placeholder="请输入税务机关地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="税务专管员id" prop="taxCollector">
        <el-input
          v-model="queryParams.taxCollector"
          placeholder="请输入税务专管员id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="税务专员联系方式" prop="taxPhone">
        <el-input
          v-model="queryParams.taxPhone"
          placeholder="请输入税务专员联系方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="财务代表专员" prop="financeAttache">
        <el-input
          v-model="queryParams.financeAttache"
          placeholder="请输入财务代表专员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="财务代表证件号" prop="financeAttacheNumber">
        <el-input
          v-model="queryParams.financeAttacheNumber"
          placeholder="请输入财务代表证件号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纳税性质(ids）多个" prop="taxNature">
        <el-input
          v-model="queryParams.taxNature"
          placeholder="请输入纳税性质(ids）多个"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纳税识别号" prop="taxIdentificationNumber">
        <el-input
          v-model="queryParams.taxIdentificationNumber"
          placeholder="请输入纳税识别号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纳税区域(省)" prop="taxAreaProvince">
        <el-input
          v-model="queryParams.taxAreaProvince"
          placeholder="请输入纳税区域(省)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纳税区域(市)" prop="taxAreaCity">
        <el-input
          v-model="queryParams.taxAreaCity"
          placeholder="请输入纳税区域(市)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纳税区域(区县)" prop="taxAreaCounty">
        <el-input
          v-model="queryParams.taxAreaCounty"
          placeholder="请输入纳税区域(区县)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实名(网报)账号" prop="realNameAccount">
        <el-input
          v-model="queryParams.realNameAccount"
          placeholder="请输入实名(网报)账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实名(网报)密码" prop="realNamePwd">
        <el-input
          v-model="queryParams.realNamePwd"
          placeholder="请输入实名(网报)密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="税务登录账号" prop="taxationId">
        <el-input
          v-model="queryParams.taxationId"
          placeholder="请输入税务登录账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="税务登录密码" prop="taxationPwd">
        <el-input
          v-model="queryParams.taxationPwd"
          placeholder="请输入税务登录密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="个税实名账号" prop="individualAccount">
        <el-input
          v-model="queryParams.individualAccount"
          placeholder="请输入个税实名账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="个税实名密码" prop="individualPwd">
        <el-input
          v-model="queryParams.individualPwd"
          placeholder="请输入个税实名密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- 是否有税控盘(10.否，20.是) -->
      <el-form-item label="是否有税控盘" prop="controlYn">
        <el-select v-model="queryParams.controlYn" placeholder="请选择核定税种 " clearable size="small">
          <el-option v-for="item in controlYn" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="个税申报密码" prop="incomeTaxPwd">
        <el-input
          v-model="queryParams.incomeTaxPwd"
          placeholder="请输入个税申报密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="社保账号" prop="socialSecAccount">
        <el-input
          v-model="queryParams.socialSecAccount"
          placeholder="请输入社保账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="社保密码" prop="socialSecPwd">
        <el-input
          v-model="queryParams.socialSecPwd"
          placeholder="请输入社保密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公积金账号" prop="providentAccount">
        <el-input
          v-model="queryParams.providentAccount"
          placeholder="请输入公积金账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公积金密码" prop="providentPwd">
        <el-input
          v-model="queryParams.providentPwd"
          placeholder="请输入公积金密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="核定税种" prop="checkRatifyTaxes">
       <el-select v-model="queryParams.checkRatifyTaxes" placeholder="请选择核定税种 " clearable size="small">
          <el-option v-for="item in checkRatifyTaxes" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="删除开关标识" prop="delSwitch">
       <el-select v-model="queryParams.delSwitch" placeholder="请选择删除开关标识 " clearable size="small">
          <el-option v-for="item in delSwitch" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['share:infor:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:infor:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:infor:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:infor:export']"
        >导出</el-button>
      </el-col>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>
      </div>
    </el-row>

    <el-table v-loading="loading" :data="inforList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键自增id" align="center" prop="id" />
      <el-table-column label="主键自增id" align="center" prop="companyId" />
      <el-table-column label="税务注册地址" align="center" prop="registrationAddss" />
      <el-table-column label="主管税务机关" align="center" prop="authoritiesCharge" />
      <el-table-column label="税务机关地址" align="center" prop="authorityAddss" />
      <el-table-column label="税务专管员id" align="center" prop="taxCollector" />
      <el-table-column label="税务专员联系方式" align="center" prop="taxPhone" />
      <el-table-column label="财务代表专员" align="center" prop="financeAttache" />
      <el-table-column label="财务代表证件号" align="center" prop="financeAttacheNumber" />
      <el-table-column label="纳税性质(ids）多个" align="center" prop="taxNature" />
      <el-table-column label="纳税识别号" align="center" prop="taxIdentificationNumber" />
      <el-table-column label="纳税区域(省)" align="center" prop="taxAreaProvince" />
      <el-table-column label="纳税区域(市)" align="center" prop="taxAreaCity" />
      <el-table-column label="纳税区域(区县)" align="center" prop="taxAreaCounty" />
      <el-table-column label="实名(网报)账号" align="center" prop="realNameAccount" />
      <el-table-column label="实名(网报)密码" align="center" prop="realNamePwd" />
      <el-table-column label="税务登录账号" align="center" prop="taxationId" />
      <el-table-column label="税务登录密码" align="center" prop="taxationPwd" />
      <el-table-column label="个税实名账号" align="center" prop="individualAccount" />
      <el-table-column label="个税实名密码" align="center" prop="individualPwd" />
      <el-table-column label="是否有税控盘(10.否，20.是)" align="center" prop="controlYn" />
      <el-table-column label="个税申报密码" align="center" prop="incomeTaxPwd" />
      <el-table-column label="社保账号" align="center" prop="socialSecAccount" />
      <el-table-column label="社保密码" align="center" prop="socialSecPwd" />
      <el-table-column label="公积金账号" align="center" prop="providentAccount" />
      <el-table-column label="公积金密码" align="center" prop="providentPwd" />
      <el-table-column label="核定税种" align="center" prop="checkRatifyTaxes" />
      <el-table-column label="创建时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注 " align="center" prop="remarks" />
      <el-table-column label="删除开关标识" align="center" prop="delSwitch"  :formatter="delSwitchFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:infor:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:infor:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNo"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改公司税务信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="税务注册地址" prop="registrationAddss">
          <el-input v-model="form.registrationAddss" placeholder="请输入税务注册地址" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="主管税务机关" prop="authoritiesCharge">
          <el-input v-model="form.authoritiesCharge" placeholder="请输入主管税务机关" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="税务机关地址" prop="authorityAddss">
          <el-input v-model="form.authorityAddss" placeholder="请输入税务机关地址" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="税务专管员id" prop="taxCollector">
          <el-input v-model="form.taxCollector" placeholder="请输入税务专管员id" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="税务专员联系方式" prop="taxPhone">
          <el-input v-model="form.taxPhone" placeholder="请输入税务专员联系方式" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="财务代表专员" prop="financeAttache">
          <el-input v-model="form.financeAttache" placeholder="请输入财务代表专员" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="财务代表证件号" prop="financeAttacheNumber">
          <el-input v-model="form.financeAttacheNumber" placeholder="请输入财务代表证件号" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="纳税性质(ids）多个" prop="taxNature">
          <el-input v-model="form.taxNature" placeholder="请输入纳税性质(ids）多个" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="纳税识别号" prop="taxIdentificationNumber">
          <el-input v-model="form.taxIdentificationNumber" placeholder="请输入纳税识别号" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="纳税区域(省)" prop="taxAreaProvince">
          <el-input v-model="form.taxAreaProvince" placeholder="请输入纳税区域(省)" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="纳税区域(市)" prop="taxAreaCity">
          <el-input v-model="form.taxAreaCity" placeholder="请输入纳税区域(市)" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="纳税区域(区县)" prop="taxAreaCounty">
          <el-input v-model="form.taxAreaCounty" placeholder="请输入纳税区域(区县)" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="实名(网报)账号" prop="realNameAccount">
          <el-input v-model="form.realNameAccount" placeholder="请输入实名(网报)账号" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="实名(网报)密码" prop="realNamePwd">
          <el-input v-model="form.realNamePwd" placeholder="请输入实名(网报)密码" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="税务登录账号" prop="taxationId">
          <el-input v-model="form.taxationId" placeholder="请输入税务登录账号" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="税务登录密码" prop="taxationPwd">
          <el-input v-model="form.taxationPwd" placeholder="请输入税务登录密码" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="个税实名账号" prop="individualAccount">
          <el-input v-model="form.individualAccount" placeholder="请输入个税实名账号" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="个税实名密码" prop="individualPwd">
          <el-input v-model="form.individualPwd" placeholder="请输入个税实名密码" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="是否有税控盘(10.否，20.是)" prop="controlYn">
         <el-select v-model="form.controlYn" placeholder="请选择核定税种 " clearable size="small">
          <el-option v-for="item in controlYn" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="个税申报密码" prop="incomeTaxPwd">
          <el-input v-model="form.incomeTaxPwd" placeholder="请输入个税申报密码" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="社保账号" prop="socialSecAccount">
          <el-input v-model="form.socialSecAccount" placeholder="请输入社保账号" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="社保密码" prop="socialSecPwd">
          <el-input v-model="form.socialSecPwd" placeholder="请输入社保密码" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="公积金账号" prop="providentAccount">
          <el-input v-model="form.providentAccount" placeholder="请输入公积金账号" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="公积金密码" prop="providentPwd">
          <el-input v-model="form.providentPwd" placeholder="请输入公积金密码" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="核定税种" prop="checkRatifyTaxes">
         <el-select v-model="form.checkRatifyTaxes" placeholder="请选择核定税种 " clearable size="small">
          <el-option v-for="item in checkRatifyTaxes" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
         </el-col><el-col :span="12">
        
        <el-form-item label="备注 " prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="10">
         <el-col :span="12">
        <el-form-item label="删除开关标识" prop="delSwitch">
         <el-select v-model="form.delSwitch" placeholder="请选择删除开关标识 " clearable size="small">
          <el-option v-for="item in delSwitch" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
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
import { listInfor, getInfor, delInfor, addInfor, updateInfor, exportInfor } from "@/api/crm/taxInfor";

export default {
  name: "Infor",
  data() {
    return {
       controlYn:[],
    checkRatifyTaxes:[],
      delSwitch:[],
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
      // 公司税务信息表格数据
      inforList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize:10,
        companyId: null,
        registrationAddss: null,
        authoritiesCharge: null,
        authorityAddss: null,
        taxCollector: null,
        taxPhone: null,
        financeAttache: null,
        financeAttacheNumber: null,
        taxNature: null,
        taxIdentificationNumber: null,
        taxAreaProvince: null,
        taxAreaCity: null,
        taxAreaCounty: null,
        realNameAccount: null,
        realNamePwd: null,
        taxationId: null,
        taxationPwd: null,
        individualAccount: null,
        individualPwd: null,
        controlYn: null,
        incomeTaxPwd: null,
        socialSecAccount: null,
        socialSecPwd: null,
        providentAccount: null,
        providentPwd: null,
        checkRatifyTaxes: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
         authoritiesCharge:[
          {
            required:true,message:'主管税务机关不能为空',trigger:'blur' 
          }
        ],
         authorityAddss:[
          {
            required:true,message:'税务机关地址不能为空',trigger:'blur' 
          }
        ],
         companyId:[
          {
            required:true,message:'公司表ID不能为空',trigger:'blur' 
          }
        ],
          registrationAddss:[
          {
            required:true,message:'税务注册地址不能为空',trigger:'blur' 
          }
        ],
         taxIdentificationNumber:[
          {
            required:true,message:'纳税识别号不能为空',trigger:'blur' 
          }
        ],
      }
    };
  },
  created() {
         this.getDicts('del_switch').then(res=>{
      this.delSwitch = res.data
    }),
    this.getDicts('check_ratify_taxes').then(res=>{
      this.checkRatifyTaxes= res.data
    }),
     this.getDicts('contro_i_yn').then(res=>{
      this.controlYn= res.data
    }),
    
    this.getList();
  },
  methods: {
    /** 查询公司税务信息列表 */
    getList() {
      this.loading = true;
      listInfor(this.queryParams).then(response => {
        this.inforList = response.data.rows;
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
        companyId: null,
        registrationAddss: null,
        authoritiesCharge: null,
        authorityAddss: null,
        taxCollector: null,
        taxPhone: null,
        financeAttache: null,
        financeAttacheNumber: null,
        taxNature: null,
        taxIdentificationNumber: null,
        taxAreaProvince: null,
        taxAreaCity: null,
        taxAreaCounty: null,
        realNameAccount: null,
        realNamePwd: null,
        taxationId: null,
        taxationPwd: null,
        individualAccount: null,
        individualPwd: null,
        controlYn: null,
        incomeTaxPwd: null,
        socialSecAccount: null,
        socialSecPwd: null,
        providentAccount: null,
        providentPwd: null,
        checkRatifyTaxes: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null,
        delSwitch: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公司税务信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInfor({id:id}).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公司税务信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInfor(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addInfor(this.form).then(response => {
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
      this.$confirm('是否确认删除公司税务信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInfor({id:ids});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有公司税务信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportInfor(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
     delSwitchFormat(row){
      return this.selectDictLabel(this.delSwitch,row.delSwitch)
    },
    checkRatifyTaxesFormat(row){
      return this.selectDictLabel(this.checkRatifyTaxes,row.checkRatifyTaxes)
    },
    controlYnFormat(row){
      return this.selectDictLabel(this.controlYn,row.controlYn)
    },
   
  }
};
</script>
