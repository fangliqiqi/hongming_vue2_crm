<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" >
      <el-form-item label="公司注册表单信息表id" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入公司注册表单信息表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司成员姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入公司成员姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input
          v-model="queryParams.age"
          placeholder="请输入年龄"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="请选择性别" clearable size="small">
           <el-option v-for="item in sex" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="职位" prop="positionId">
       <el-select v-model="queryParams.positionId" placeholder="请选择职位" clearable size="small">
           <el-option v-for="item in positionId" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="educationBackground">
        <el-select v-model="queryParams.educationBackground" placeholder="请选择学历" clearable size="small">
           <el-option v-for="item in educationBackground" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="占股比例" prop="ratioShare">
        <el-input
          v-model="queryParams.ratioShare"
          placeholder="请输入占股比例"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="持股金额" prop="ratioMoney">
        <el-input
          v-model="queryParams.ratioMoney"
          placeholder="请输入持股金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证号码" prop="cardId">
        <el-input
          v-model="queryParams.cardId"
          placeholder="请输入身份证号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input
          v-model="queryParams.mobile"
          placeholder="请输入手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="办公电话" prop="officePhone">
        <el-input
          v-model="queryParams.officePhone"
          placeholder="请输入办公电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信号" prop="wechatId">
        <el-input
          v-model="queryParams.wechatId"
          placeholder="请输入微信号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="QQ号码" prop="qqNumber">
        <el-input
          v-model="queryParams.qqNumber"
          placeholder="请输入QQ号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证正面照片url" prop="cardFront">
        <el-input
          v-model="queryParams.cardFront"
          placeholder="请输入身份证正面照片url"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证反面照片url" prop="cardReverse">
        <el-input
          v-model="queryParams.cardReverse"
          placeholder="请输入身份证反面照片url"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['share:personnel:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:personnel:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:personnel:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:personnel:export']"
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

    <el-table v-loading="loading" :data="personnelList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="公司注册表单信息表id" align="center" prop="companyId" />
      <el-table-column label="公司成员姓名" align="center" prop="name" />
      <el-table-column label="年龄" align="center" prop="age" />
      <el-table-column label="性别" align="center" prop="sex" :formatter="sexFormat" />
      <el-table-column label="职位" align="center" prop="positionId" :formatter="positionIdFormat" />
      <el-table-column label="学历" align="center" prop="educationBackground" :formatter="educationBackgroundFormat" />
      <el-table-column label="占股比例" align="center" prop="ratioShare" />
      <el-table-column label="持股金额" align="center" prop="ratioMoney" />
      <el-table-column label="身份证号码" align="center" prop="cardId" />
      <el-table-column label="手机号码" align="center" prop="mobile" />
      <el-table-column label="办公电话" align="center" prop="officePhone" />
      <el-table-column label="微信号" align="center" prop="wechatId" />
      <el-table-column label="QQ号码" align="center" prop="qqNumber" />
      <el-table-column label="身份证正面照片" align="center" prop="cardFront" />
      <el-table-column label="身份证反面照片" align="center" prop="cardReverse" />  
      <el-table-column label="备注 " align="center" prop="remarks" />
      <el-table-column label="删除开关标识" align="center" prop="delSwitch" :formatter="delSwitchFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:personnel:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:personnel:remove']"
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

    <!-- 添加或修改公司人员信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row :gutter="20">
       <el-col :span="12">
        <el-form-item label="公司注册表单信息表id" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司注册表单信息表id" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="公司成员姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入公司成员姓名" />
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option v-for="item in sex" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
          </el-select>
        </el-form-item>
        </el-col>
         </el-row><el-row :gutter="20">
        <el-col :span="12">
        <el-form-item label="职位" prop="positionId">
         <el-select v-model="form.positionId" placeholder="请选择职位" clearable size="small">
           <el-option v-for="item in positionId" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="学历" prop="educationBackground">
         <el-select v-model="form.educationBackground" placeholder="请选择学历" clearable size="small">
           <el-option v-for="item in educationBackground" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="20">
         <el-col :span="12">
        <el-form-item label="占股比例" prop="ratioShare">
          <el-input v-model="form.ratioShare" placeholder="请输入占股比例" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="持股金额" prop="ratioMoney">
          <el-input v-model="form.ratioMoney" placeholder="请输入持股金额" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="20">
         <el-col :span="12">
        <el-form-item label="身份证号码" prop="cardId">
          <el-input v-model="form.cardId" placeholder="请输入身份证号码" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号码" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="20">
         <el-col :span="12">
        <el-form-item label="办公电话" prop="officePhone">
          <el-input v-model="form.officePhone" placeholder="请输入办公电话" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="微信号" prop="wechatId">
          <el-input v-model="form.wechatId" placeholder="请输入微信号" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="20">
         <el-col :span="12">
        <el-form-item label="QQ号码" prop="qqNumber">
          <el-input v-model="form.qqNumber" placeholder="请输入QQ号码" />
        </el-form-item>
         </el-col><el-col :span="12">
        <el-form-item label="身份证正面照片url" prop="cardFront">
          <el-input v-model="form.cardFront" placeholder="请输入身份证正面照片url" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="20">
         <el-col :span="12">
        <el-form-item label="身份证反面照片url" prop="cardReverse">
          <el-input v-model="form.cardReverse" placeholder="请输入身份证反面照片url" />
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item label="备注 " prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容" />
        </el-form-item>
         </el-col>
          </el-row><el-row :gutter="20">
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
import { listPersonnel, getPersonnel, delPersonnel, addPersonnel, updatePersonnel, exportPersonnel } from "@/api/crm/personnel";

export default {
  name: "Personnel",
  data() {
    return {
      positionId:[],
      educationBackground:[],
      sex:[],
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
      // 公司人员信息表格数据
      personnelList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize:10,
        companyId: null,
        name: null,
        age: null,
        sex: null,
        positionId: null,
        educationBackground: null,
        ratioShare: null,
        ratioMoney: null,
        cardId: null,
        mobile: null,
        officePhone: null,
        wechatId: null,
        qqNumber: null,
        cardFront: null,
        cardReverse: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "公司成员姓名不能为空", trigger: "blur" }
        ],
        positionId: [
          { required: true, message: "职位不能为空", trigger: "blur" }
        ],
        cardId: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" }
        ],
        cardFront: [
          { required: true, message: "身份证正面照片不能为空", trigger: "blur" }
        ],
        cardReverse: [
          { required: true, message: "身份证反面照片不能为空", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号码不能为空", trigger: "blur" }
        ],
        officePhone: [
          { required: true, message: "办公电话不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getDicts('del_switch').then(res=>{
      this.delSwitch = res.data
    }),
     this.getDicts('sex').then(res=>{
      this.sex = res.data
    }),
     this.getDicts('positionId').then(res=>{
      this.positionId = res.data
    }),
    this.getDicts('education_background').then(res=>{
      this.educationBackground = res.data
    }),
    
    this.getList();
  },
  methods: {
    /** 查询公司人员信息列表 */
    getList() {
      this.loading = true;
      listPersonnel(this.queryParams).then(response => {
        this.personnelList = response.data.rows;
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
        name: null,
        age: null,
        sex: null,
        positionId: null,
        educationBackground: null,
        ratioShare: null,
        ratioMoney: null,
        cardId: null,
        mobile: null,
        officePhone: null,
        wechatId: null,
        qqNumber: null,
        cardFront: null,
        cardReverse: null,
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
      this.title = "添加公司人员信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPersonnel({id:id}).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公司人员信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePersonnel(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addPersonnel(this.form).then(response => {
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
      this.$confirm('是否确认删除公司人员信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPersonnel({id:ids,companyId:row.companyId});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有公司人员信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPersonnel(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
     delSwitchFormat(row){
      return this.selectDictLabel(this.delSwitch,row.delSwitch)
    },
     sexFormat(row){
      return this.selectDictLabel(this.sex,row.sex)
    },
    positionIdFormat(row){
      return this.selectDictLabel(this.positionId,row.positionId)
    },
    educationBackgroundFormat(row){
      return this.selectDictLabel(this.educationBackground,row.educationBackground)
    },
  }
};
</script>
