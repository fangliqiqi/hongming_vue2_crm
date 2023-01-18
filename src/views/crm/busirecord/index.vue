<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" >
      <el-form-item label="个体户基础信息表id" prop="peopleId">
        <el-input
          v-model="queryParams.peopleId"
          placeholder="请输入个体户基础信息表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- 优惠金额(应收金额-实收金额) -->
      <el-form-item label="优惠金额" prop="discountAmount">
        <el-input
          v-model="queryParams.discountAmount"
          placeholder="请输入优惠金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- 收费周期(每年/每次) -->
      <el-form-item label="收费周期" prop="chargeCycle">
        <el-input
          v-model="queryParams.chargeCycle"
          placeholder="请输入收费周期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户姓名" prop="userNames">
        <el-input
          v-model="queryParams.userNames"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="userPhone">
        <el-input
          v-model="queryParams.userPhone"
          placeholder="请输入联系电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务开始时间" prop="startTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择服务开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="服务结束时间" prop="endTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择服务结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="签单人" prop="signSingle">
        <el-input
          v-model="queryParams.signSingle"
          placeholder="请输入签单人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="签单时间" prop="signTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.signTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择签单时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审核状态" prop="auditorState">
        <el-select v-model="queryParams.auditorState" placeholder="请选择审核状态 " clearable size="small">
          <el-option v-for="item in auditorState" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="审核人" prop="auditor">
        <el-input
          v-model="queryParams.auditor"
          placeholder="请输入审核人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核说明" prop="auditorRemarks">
        <el-input
          v-model="queryParams.auditorRemarks"
          placeholder="请输入审核说明"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核时间" prop="auditorTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.auditorTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择审核时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付状态" prop="payState">
       <el-select v-model="queryParams.payState" placeholder="请选择支付状态 " clearable size="small">
          <el-option v-for="item in payState" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderState">
        <el-select v-model="queryParams.orderState" placeholder="请选择订单状态 " clearable size="small">
          <el-option v-for="item in orderState" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="是否预付款" prop="advanceTypeyn">
        <el-select v-model="queryParams.advanceTypeyn" placeholder="请选择是否预付款 " clearable size="small">
          <el-option v-for="item in advanceTypeyn" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="预付款金额" prop="advanceMoney">
        <el-input
          v-model="queryParams.advanceMoney"
          placeholder="请输入预付款金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预付款时间" prop="advanceTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.advanceTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择预付款时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="尾款金额" prop="paymentAmount">
        <el-input
          v-model="queryParams.paymentAmount"
          placeholder="请输入尾款金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="尾款支付时间" prop="paymentTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.paymentTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择尾款支付时间">
        </el-date-picker>
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
          v-hasPermi="['share:busirecord:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:busirecord:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:busirecord:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:busirecord:export']"
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

    <el-table v-loading="loading" :data="busirecordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="个体户基础信息表id" align="center" prop="peopleId" />
      <el-table-column label="优惠金额" align="center" prop="discountAmount" />
      <el-table-column label="收费周期" align="center" prop="chargeCycle" />
      <el-table-column label="客户姓名" align="center" prop="userNames" />
      <el-table-column label="联系电话" align="center" prop="userPhone" />
      <el-table-column label="服务开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="签单人" align="center" prop="signSingle" />
      <el-table-column label="签单时间" align="center" prop="signTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="auditorState" :formatter="auditorStateFormat" />
      <el-table-column label="审核人" align="center" prop="auditor" />
      <el-table-column label="审核说明" align="center" prop="auditorRemarks" />
      <el-table-column label="审核时间" align="center" prop="auditorTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.auditorTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" align="center" prop="payState" :formatter="payStateFormat"/>
      <el-table-column label="订单状态" align="center" prop="orderState" :formatter="orderStateFormat"/>
      <el-table-column label="是否预付款" align="center" prop="advanceTypeyn" :formatter="advanceTypeynFormat" />
      <el-table-column label="预付款金额" align="center" prop="advanceMoney" />
      <el-table-column label="预付款时间" align="center" prop="advanceTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.advanceTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="尾款金额" align="center" prop="paymentAmount" />
      <el-table-column label="尾款支付时间" align="center" prop="paymentTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paymentTime, '{y}-{m}-{d}') }}</span>
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
            v-hasPermi="['share:busirecord:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:busirecord:remove']"
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

    <!-- 添加或修改个人业务工单（订单）对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="个体户基础信息表id" prop="peopleId">
          <el-input v-model="form.peopleId" placeholder="请输入个体户基础信息表id" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="优惠金额" prop="discountAmount">
          <el-input v-model="form.discountAmount" placeholder="请输入优惠金额" />
        </el-form-item>
        </el-col>
        </el-row> 
        <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="收费周期" prop="chargeCycle">
          <el-input v-model="form.chargeCycle" placeholder="请输入收费周期" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="客户姓名" prop="userNames">
          <el-input v-model="form.userNames" placeholder="请输入客户姓名" />
        </el-form-item>
        </el-col>
        </el-row> <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="联系电话" prop="userPhone">
          <el-input v-model="form.userPhone" placeholder="请输入联系电话" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="服务开始时间" prop="startTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择服务开始时间">
          </el-date-picker>
        </el-form-item>
        </el-col>
        </el-row> 
        <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="服务结束时间" prop="endTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择服务结束时间">
          </el-date-picker>
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="签单人" prop="signSingle">
          <el-input v-model="form.signSingle" placeholder="请输入签单人" />
        </el-form-item>
        </el-col>
        </el-row>
         <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="签单时间" prop="signTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.signTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择签单时间">
          </el-date-picker>
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="审核状态" prop="auditorState">
          <el-select v-model="form.auditorState" placeholder="请选择审核状态 " clearable size="small">
          <el-option v-for="item in auditorState" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
        </el-col>
        </el-row>
         <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="审核人" prop="auditor">
          <el-input v-model="form.auditor" placeholder="请输入审核人" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="审核说明" prop="auditorRemarks">
          <el-input v-model="form.auditorRemarks" placeholder="请输入审核说明" />
        </el-form-item>
        </el-col>
        </el-row>
         <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="审核时间" prop="auditorTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.auditorTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审核时间">
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="支付状态" prop="payState">
         <el-select v-model="form.payState" placeholder="请选择支付状态 " clearable size="small">
          <el-option v-for="item in payState" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
        </el-col>
        </el-row>
        
         <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="订单状态" prop="orderState">
         <el-select v-model="form.orderState" placeholder="请选择订单状态 " clearable size="small">
          <el-option v-for="item in orderState" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="是否预付款" prop="advanceTypeyn">
        <el-select v-model="form.advanceTypeyn" placeholder="请选择是否预付款 " clearable size="small">
          <el-option v-for="item in advanceTypeyn" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
        </el-col>
        </el-row>
         <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="预付款金额" prop="advanceMoney">
          <el-input v-model="form.advanceMoney" placeholder="请输入预付款金额" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="预付款时间" prop="advanceTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.advanceTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择预付款时间">
          </el-date-picker>
        </el-form-item>
        </el-col>
        </el-row>         
        <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="尾款金额" prop="paymentAmount">
          <el-input v-model="form.paymentAmount" placeholder="请输入尾款金额" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="尾款支付时间" prop="paymentTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.paymentTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择尾款支付时间">
          </el-date-picker>
        </el-form-item>
       </el-col>
       </el-row> 
       <el-row :gutter="10">
       <el-col :span="12">
        <el-form-item label="备注 " prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        </el-col><el-col :span="12">
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
import { listBusirecord, getBusirecord, delBusirecord, addBusirecord, updateBusirecord, exportBusirecord } from "@/api/crm/busirecord";

export default {
  name: "Busirecord",
  data() {
    return {
      advanceTypeyn:[],
      auditorState:[],
      payState:[],
      orderState:[],
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
      // 个人业务工单（订单）表格数据
      busirecordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize:10,
        peopleId: null,
        discountAmount: null,
        chargeCycle: null,
        userNames: null,
        userPhone: null,
        startTime: null,
        endTime: null,
        signSingle: null,
        signTime: null,
        auditorState: null,
        auditor: null,
        auditorRemarks: null,
        auditorTime: null,
        payState: null,
        orderState: null,
        advanceTypeyn: null,
        advanceMoney: null,
        advanceTime: null,
        paymentAmount: null,
        paymentTime: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
         chargeCycle:[
          {
            required:true,message:'收费周期不能为空',trigger:'blur' 
          }
        ],
         discountAmount:[
          {
            required:true,message:'优惠金额不能为空',trigger:'blur' 
          }
        ],
         startTime:[
          {
            required:true,message:'服务开始时间不能为空',trigger:'blur' 
          }
        ],
         userNames:[
          {
            required:true,message:'客户姓名不能为空',trigger:'blur' 
          }
        ],
         userPhone:[
          {
            required:true,message:'联系电话不能为空',trigger:'blur' 
          }
        ],
      }
    };
  },
  created() {
     this.getDicts('del_switch').then(res=>{
      this.delSwitch = res.data
    }),
     this.getDicts('order_state').then(res=>{
      this.orderState = res.data
    }),
    this.getDicts('auditor_state').then(res=>{
      this.auditorState = res.data
    }),
    this.getDicts('advance_typeyn').then(res=>{
      this.advanceTypeyn = res.data
    }),
    
   
    
    this.getList();
  },
  methods: {
    /** 查询个人业务工单（订单）列表 */
    getList() {
      this.loading = true;
      listBusirecord(this.queryParams).then(response => {
        this.busirecordList = response.data.rows;
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
        peopleId: null,
        discountAmount: null,
        chargeCycle: null,
        userNames: null,
        userPhone: null,
        startTime: null,
        endTime: null,
        signSingle: null,
        signTime: null,
        auditorState: null,
        auditor: null,
        auditorRemarks: null,
        auditorTime: null,
        payState: null,
        orderState: null,
        advanceTypeyn: null,
        advanceMoney: null,
        advanceTime: null,
        paymentAmount: null,
        paymentTime: null,
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
      this.title = "添加个人业务工单（订单）";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBusirecord({id:id}).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改个人业务工单（订单）";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBusirecord(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addBusirecord(this.form).then(response => {
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
      this.$confirm('是否确认删除个人业务工单（订单）编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delBusirecord({id:ids});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有个人业务工单（订单）数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportBusirecord(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    delSwitchFormat(row){
      return this.selectDictLabel(this.delSwitch,row.delSwitch)
    },
    orderStateFormat(row){
      return this.selectDictLabel(this.orderState,row.orderState)
    },
      auditorStateFormat(row){
      return this.selectDictLabel(this.auditorState,row.auditorState)
    },
     payStateFormat(row){
      return this.selectDictLabel(this.payState,row.payState)
    },
    advanceTypeynFormat(row){
      return this.selectDictLabel(this.advanceTypeyn,row.advanceTypeyn)
    },
    
  }
};
</script>
