<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="资料名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入资料名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片文件类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择图片文件类型" clearable size="small">
         <el-option v-for="item in type" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
      </el-form-item>
      <el-form-item label="图片文件属类型" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入图片文件属类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片文件编码" prop="encoding">
        <el-input
          v-model="queryParams.encoding"
          placeholder="请输入图片文件编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联表id" prop="associationId">
        <el-input
          v-model="queryParams.associationId"
          placeholder="请输入关联表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联表名称标识" prop="tableNameBs">
        <el-input
          v-model="queryParams.tableNameBs"
          placeholder="请输入关联表名称标识"
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
          v-hasPermi="['share:imgandfile:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:imgandfile:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:imgandfile:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:imgandfile:export']"
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

    <el-table v-loading="loading" :data="imgandfileList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="资料名称" align="center" prop="name" />
      <el-table-column label="文件资料存储的全路径" align="center" prop="url" />
      <el-table-column label="图片文件类型" align="center" prop="type" :formatter="typeFormat"/>
      <el-table-column label="图片文件属类型" align="center" prop="state" />
      <el-table-column label="图片文件编码" align="center" prop="encoding" />
      <el-table-column label="关联表id" align="center" prop="associationId" />
      <el-table-column label="关联表名称标识" align="center" prop="tableNameBs" />
     
      <el-table-column label="备注 " align="center" prop="remarks" />
      <el-table-column label="删除开关标识" align="center" prop="delSwitch"  :formatter="delSwitchFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:imgandfile:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:imgandfile:remove']"
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

    <!-- 添加或修改图片资料资源对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="资料名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入资料名称" />
        </el-form-item>
        </el-col> <el-col :span="12">
        <el-form-item label="文件资料存储的全路径" prop="url">
          <el-input v-model="form.url" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        </el-col>
         </el-row> <el-row :gutter="10"> 
        <el-col :span="12">
        <el-form-item label="图片文件类型">
           <el-select v-model="form.type" placeholder="请选择图片文件类型">
             <el-option v-for="item in type" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
          </el-select>
        </el-form-item>
        </el-col> <el-col :span="12">
        <el-form-item label="图片文件属类型" prop="state">
          <el-input v-model="form.state" placeholder="请输入图片文件属类型" />
        </el-form-item>
        </el-col> 
         </el-row> <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="图片文件编码" prop="encoding">
          <el-input v-model="form.encoding" placeholder="请输入图片文件编码" />
        </el-form-item>
        </el-col> <el-col :span="12">
        <el-form-item label="关联表id" prop="associationId">
          <el-input v-model="form.associationId" placeholder="请输入关联表id" />
        </el-form-item>
        </el-col> 
         </el-row> <el-row :gutter="10">
        <el-col :span="12">
        <el-form-item label="关联表名称标识" prop="tableNameBs">
          <el-input v-model="form.tableNameBs" placeholder="请输入关联表名称标识" />
        </el-form-item>
       </el-col> <el-col :span="12">
         <el-form-item label="删除开关标识" prop="delSwitch">
          <el-select v-model="form.delSwitch" placeholder="请选择删除开关标识 " clearable size="small">
          <el-option v-for="item in delSwitch" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
        </el-form-item>
        </el-col> 
         </el-row> <el-row :gutter="10">
        <el-col :span="12">
         <el-form-item label="备注 " prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容" />
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
import { listImgandfile, getImgandfile, delImgandfile, addImgandfile, updateImgandfile, exportImgandfile } from "@/api/crm/imgandfile";

export default {
  name: "Imgandfile",
  data() {
    return {
      type:[],
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
      // 图片资料资源表格数据
      imgandfileList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize:10,
        name: null,
        url: null,
        type: null,
        state: null,
        encoding: null,
        associationId: null,
        tableNameBs: null,
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
          // 资料名称（如：合同图片，付款凭证，资料名称等）不能为空
          { required: true, message: "资料名称不能为空", trigger: "blur" }
        ],
        type: [
          // 图片文件类型（jpg png  ftp 等）存储是键入图片文件后缀不能为空
          { required: true, message: "图片文件类型存储是键入图片文件后缀不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
      this.getDicts('del_switch').then(res=>{
      this.delSwitch = res.data
    }),
      this.getDicts('img_type').then(res=>{
      this.type= res.data
    })
    this.getList();
  },
  methods: {
    /** 查询图片资料资源列表 */
    getList() {
      this.loading = true;
      listImgandfile(this.queryParams).then(response => {
        this.imgandfileList = response.data.rows;
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
        name: null,
        url: null,
        type: null,
        state: null,
        encoding: null,
        associationId: null,
        tableNameBs: null,
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
      this.title = "添加图片资料资源";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getImgandfile({id:id}).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改图片资料资源";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateImgandfile(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addImgandfile(this.form).then(response => {
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
      this.$confirm('是否确认删除图片资料资源编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delImgandfile({id:ids});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有图片资料资源数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportImgandfile(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
     delSwitchFormat(row){
      return this.selectDictLabel(this.delSwitch,row.delSwitch)
    },
     typeFormat(row){
      return this.selectDictLabel(this.type,row.type)
    },
  }
};
</script>
