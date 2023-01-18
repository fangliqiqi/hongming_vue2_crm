<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" >
      <el-form-item label="公司业务工单表id" prop="companyBusirecordId">
        <el-input
          v-model="queryParams.companyBusirecordId"
          placeholder="请输入公司业务工单表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司表id" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入公司表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务名称" prop="serprceName">
        <el-input
          v-model="queryParams.serprceName"
          placeholder="请输入业务名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系客户姓名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入联系客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户联系电话" prop="userPhone">
        <el-input
          v-model="queryParams.userPhone"
          placeholder="请输入客户联系电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="跟进记录说明" prop="recordDeclaration">
        <el-input
          v-model="queryParams.recordDeclaration"
          placeholder="请输入跟进记录说明"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下次跟进时间" prop="nextFollowTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.nextFollowTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择下次跟进时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="跟进人id" prop="recordUserId">
        <el-input
          v-model="queryParams.recordUserId"
          placeholder="请输入跟进人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="创建时间" prop="createDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.createDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.updateDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择更新时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="删除开关标识" prop="delSwitch">
        <!-- <el-input
          v-model="queryParams.delSwitch"
          placeholder="请输入删除开关标识"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        /> -->
          <el-select v-model="queryParams.delSwitch" placeholder="请选择删除开关标识 " clearable size="small">
          <el-option v-for="item in delSwitch" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="跟进类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择跟进类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
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
          v-hasPermi="['crm:follow:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['crm:follow:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['crm:follow:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm:follow:export']"
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

    <el-table v-loading="loading" :data="followList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="公司业务工单表id" align="center" prop="companyBusirecordId" />
      <el-table-column label="公司表id" align="center" prop="companyId" />
      <el-table-column label="业务名称" align="center" prop="serprceName" />
      <el-table-column label="联系客户姓名" align="center" prop="userName" />
      <el-table-column label="客户联系电话" align="center" prop="userPhone" />
      <el-table-column label="跟进记录说明" align="center" prop="recordDeclaration" />
      <el-table-column label="下次跟进时间" align="center" prop="nextFollowTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.nextFollowTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="跟进人id" align="center" prop="recordUserId" />
      <!-- <el-table-column label="创建时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="备注 " align="center" prop="remarks" />
      <el-table-column label="删除开关标识" align="center" prop="delSwitch" :formatter="delSwitchFormat" />
      <!-- <el-table-column label="跟进类型" align="center" prop="type" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm:follow:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm:follow:remove']"
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

    <!-- 添加或修改公司业务订单跟进记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="22">
          <el-col :span="12">
        <el-form-item label="公司业务工单表id" prop="companyBusirecordId">
          <el-input v-model="form.companyBusirecordId" placeholder="请输入公司业务工单表id" />
        </el-form-item>
        </el-col>
         <el-col :span="12">
        <el-form-item label="公司表id" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司表id" />
        </el-form-item>
        </el-col>
        </el-row>
         <el-row :gutter="22"> 
           <el-col :span="12">
        <el-form-item label="业务名称" prop="serprceName">
          <el-input v-model="form.serprceName" placeholder="请输入业务名称" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="客户姓名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入客户姓名" />
        </el-form-item>
        </el-col>
        </el-row>
           <el-row :gutter="22">
             <el-col :span="12">
        <el-form-item label="客户电话" prop="userPhone">
          <el-input v-model="form.userPhone" placeholder="请输入客户电话" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="跟进记录" prop="recordDeclaration">
          <el-input v-model="form.recordDeclaration" placeholder="请输入跟进记录" />
        </el-form-item>
        </el-col>
        </el-row>
             <el-row :gutter="22"> 
               <el-col :span="12">
        <el-form-item label="下次跟进时间" prop="nextFollowTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.nextFollowTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择下次跟进时间">
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="删除开关标识" prop="delSwitch">
            <el-select v-model="form.delSwitch" placeholder="请选择删除开关标识 " clearable size="small">
          <el-option v-for="item in delSwitch" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
       
        </el-col>
        </el-row>
           <el-row >
             
        <el-form-item label="备注 " prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        </el-row>
          <el-row>
        <el-col :span="12">
        <el-form-item label="跟进人id" prop="recordUserId">
          <el-input v-model="form.recordUserId" placeholder="请输入跟进人id" />
        </el-form-item>
        </el-col>
        </el-row>
        <!-- <el-form-item label="跟进类型">
          <el-select v-model="form.type" placeholder="请选择跟进类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listFollow, getFollow, delFollow, addFollow, updateFollow, exportFollow } from "@/api/crm/follow";
//公司订单跟进记录
export default {
  name: "Follow",
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
      delSwitch:[],
      // 公司业务订单跟进记录表格数据
      followList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize:10,
        companyBusirecordId: null,
        companyId: null,
        serprceName: null,
        userName: null,
        userPhone: null,
        recordDeclaration: null,
        nextFollowTime: null,
        recordUserId: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        type: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        companyId:[
          {
            required:true,message:'公司Id不能为空',trigger:'blur' 
          }
        ],
        recordDeclaration:[
          {
            required:true,message:'跟进记录不能为空',trigger:'blur' 
          }
        ],
         serprceName:[
          {
            required:true,message:'业务名称不能为空',trigger:'blur' 
          }
        ],
        userName:[
          {
            required:true,message:'客户姓名不能为空',trigger:'blur' 
          }
        ],
         userPhone:[
          {
            required:true,message:'客户电话不能为空',trigger:'blur' 
          }
        ],
      }
    };
  },
  created() {
     this.getDicts('del_switch').then(res=>{
      this.delSwitch = res.data
    })
    this.getList();
  },
  methods: {
    /** 查询公司业务订单跟进记录列表 */
    getList() {
      this.loading = true;
      listFollow(this.queryParams).then(response => {
        this.followList = response.data.rows;
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
        companyBusirecordId: null,
        companyId: null,
        serprceName: null,
        userName: null,
        userPhone: null,
        recordDeclaration: null,
        nextFollowTime: null,
        recordUserId: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        type: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公司业务订单跟进记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFollow({id:id}).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公司业务订单跟进记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFollow(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addFollow(this.form).then(response => {
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
      this.$confirm('是否确认删除公司业务订单跟进记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFollow({id:ids});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有公司业务订单跟进记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFollow(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    delSwitchFormat(row){
      return this.selectDictLabel(this.delSwitch,row.delSwitch)
    },
  }
};
</script>
