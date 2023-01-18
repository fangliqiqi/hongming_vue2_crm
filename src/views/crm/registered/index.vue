<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" >
      <el-form-item label="注册资本" prop="registeredCapital">
        <el-input
          v-model="queryParams.registeredCapital"
          placeholder="请输入注册资本"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经营者学历" prop="operatorEducation">
       <el-select v-model="queryParams.operatorEducation" placeholder="请选择经营者学历" clearable size="small">
          <el-option v-for="item in operatorEducation" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码" prop="phoneNumber">
        <el-input
          v-model="queryParams.phoneNumber"
          placeholder="请输入手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房屋性质" prop="roomType">
        <el-select v-model="queryParams.roomType" placeholder="请选择房屋性质" clearable size="small">
          <el-option v-for="item in roomType" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
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
      <el-form-item label="注册时间" prop="registerTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.registerTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择注册时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="经营者身姓名" prop="proprName">
        <el-input
          v-model="queryParams.proprName"
          placeholder="请输入经营者身姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经营者身份证号码" prop="proprCardid">
        <el-input
          v-model="queryParams.proprCardid"
          placeholder="请输入经营者身份证号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经营者身份证正面" prop="proprCardidurlFront">
        <el-input
          v-model="queryParams.proprCardidurlFront"
          placeholder="请输入经营者身份证正面"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经营者身份证反面" prop="proprCardidurlContrary">
        <el-input
          v-model="queryParams.proprCardidurlContrary"
          placeholder="请输入经营者身份证反面"
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
      <el-form-item label="客户类型" prop="clientType">
        <el-select v-model="queryParams.clientType" placeholder="请选择客户类型" clearable size="small">
          <el-option v-for="item in clientType" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
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
          v-hasPermi="['share:registered:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:registered:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:registered:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:registered:export']"
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

    <el-table v-loading="loading" :data="registeredList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="备选名称" align="center" prop="alternativeName" />
      <el-table-column label="注册资本" align="center" prop="registeredCapital" />
      <el-table-column label="经营范围" align="center" prop="businessScope" />
      <el-table-column label="经营者学历" align="center" prop="operatorEducation" :formatter="operatorEducationFormat" />
      <el-table-column label="手机号码" align="center" prop="phoneNumber" />
      <el-table-column label="地址 " align="center" prop="address" />
      <el-table-column label="房屋性质" align="center" prop="roomType" />
      <el-table-column label="房主姓名" align="center" prop="ownersName" />
      <el-table-column label="房主身份证号码" align="center" prop="identityCardNumber" />
      <el-table-column label="注册时间" align="center" prop="registerTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.registerTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经营者身姓名" align="center" prop="proprName" />
      <el-table-column label="经营者身份证号码" align="center" prop="proprCardid" />
      <el-table-column label="经营者身份证正面" align="center" prop="proprCardidurlFront" />
      <el-table-column label="经营者身份证反面" align="center" prop="proprCardidurlContrary" />
      <el-table-column label="用户标签信息" align="center" prop="userlabelIds" />
      <el-table-column label="客户类型" align="center" prop="clientType" />
      
      <el-table-column label="备注 " align="center" prop="remarks" />
      <el-table-column label="删除开关标识" align="center" prop="delSwitch" :formatter="delSwitchFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:registered:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:registered:remove']"
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

    <!-- 添加或修改个体户基本信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="备选名称" prop="alternativeName">
          <el-input v-model="form.alternativeName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="注册资本" prop="registeredCapital">
          <el-input v-model="form.registeredCapital" placeholder="请输入注册资本" />
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
        <el-form-item label="经营范围" prop="businessScope">
          <el-input v-model="form.businessScope" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="经营者学历" prop="operatorEducation">
         <el-select v-model="form.operatorEducation" placeholder="请选择经营者学历">
               <el-option v-for="item in operatorEducation" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
          </el-select>
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入手机号码" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
        <el-form-item label="房屋性质">
          <el-select v-model="form.roomType" placeholder="请选择房屋性质">
               <el-option v-for="item in roomType" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
          </el-select>
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="房主姓名" prop="ownersName">
          <el-input v-model="form.ownersName" placeholder="请输入房主姓名" />
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
        <el-form-item label="房主身份证号码" prop="identityCardNumber">
          <el-input v-model="form.identityCardNumber" placeholder="请输入房主身份证号码" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="注册时间" prop="registerTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.registerTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择注册时间">
          </el-date-picker>
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
        <el-form-item label="经营者身姓名" prop="proprName">
          <el-input v-model="form.proprName" placeholder="请输入经营者身姓名" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="经营者身份证号码" prop="proprCardid">
          <el-input v-model="form.proprCardid" placeholder="请输入经营者身份证号码" />
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
        <el-form-item label="经营者身份证正面" prop="proprCardidurlFront">
          <el-input v-model="form.proprCardidurlFront" placeholder="请输入经营者身份证正面" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="经营者身份证反面" prop="proprCardidurlContrary">
          <el-input v-model="form.proprCardidurlContrary" placeholder="请输入经营者身份证反面" />
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
        <el-form-item label="用户标签信息" prop="userlabelIds">
          <el-input v-model="form.userlabelIds" placeholder="请输入用户标签信息" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="客户类型">
          <el-select v-model="form.clientType" placeholder="请选择客户类型">
              <el-option v-for="item in clientType" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
          </el-select>
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
      <!-- 备注 :省级需另外提供本人实名的银行卡号码 -->
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
import { listRegistered, getRegistered, delRegistered, addRegistered, updateRegistered, exportRegistered } from "@/api/crm/registered";

export default {
  name: "Registered",
  data() {
    return {
      operatorEducation:[],
       delSwitch:[],
      clientType:[],
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
      // 个体户基本信息表格数据
      registeredList: [],
      roomType:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize:10,
        alternativeName: null,
        registeredCapital: null,
        businessScope: null,
        operatorEducation: null,
        phoneNumber: null,
        address: null,
        roomType: null,
        ownersName: null,
        identityCardNumber: null,
        registerTime: null,
        proprName: null,
        proprCardid: null,
        proprCardidurlFront: null,
        proprCardidurlContrary: null,
        userlabelIds: null,
        clientType: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        alternativeName: [
          { required: true, message: "备选名称（注册名称）不能为空", trigger: "blur" }
        ],
         phoneNumber: [
          { required: true, message: "备选名称（注册名称）不能为空", trigger: "blur" }
        ],

      }
    };
  },
  created() {
     this.getDicts('room_type').then(res=>{
      this.roomType = res.data
    }),
     this.getDicts('client_type').then(res=>{
      this.clientType = res.data
    }),
      this.getDicts('del_switch').then(res=>{
      this.delSwitch = res.data
    }),
     this.getDicts('operator_education').then(res=>{
      this.operatorEducation = res.data
    }),
    this.getList();
  },
  methods: {
    /** 查询个体户基本信息列表 */
    getList() {
      this.loading = true;
      listRegistered(this.queryParams).then(response => {
        this.registeredList = response.data.rows;
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
        alternativeName: null,
        registeredCapital: null,
        businessScope: null,
        operatorEducation: null,
        phoneNumber: null,
        address: null,
        roomType: null,
        ownersName: null,
        identityCardNumber: null,
        registerTime: null,
        proprName: null,
        proprCardid: null,
        proprCardidurlFront: null,
        proprCardidurlContrary: null,
        userlabelIds: null,
        clientType: null,
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
      this.title = "添加个体户基本信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRegistered({id:id}).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改个体户基本信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRegistered(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addRegistered(this.form).then(response => {
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
      this.$confirm('是否确认删除个体户基本信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRegistered({id:ids});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有个体户基本信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportRegistered(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
     roomTypeFormat(row){
      return this.selectDictLabel(this.type,row.roomType)
    },
    clientTypeFormat(row){
      return this.selectDictLabel(this.type,row.clientType)
    },
      delSwitchFormat(row){
      return this.selectDictLabel(this.delSwitch,row.delSwitch)
    },
    operatorEducationFormat(row){
      return this.selectDictLabel(this.operatorEducation,row.operatorEducation)
    },
  }
};
</script>
