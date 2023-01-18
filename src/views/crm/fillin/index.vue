<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" >
      <el-form-item label="公司业务工单表id" prop="busirecordId">
        <el-input
          v-model="queryParams.busirecordId"
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
      <el-form-item label="补款金额" prop="fillingMoney">
        <el-input
          v-model="queryParams.fillingMoney"
          placeholder="请输入补款金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="补款人id" prop="fillingUserId">
        <el-input
          v-model="queryParams.fillingUserId"
          placeholder="请输入补款人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="补款人姓名" prop="fillingName">
        <el-input
          v-model="queryParams.fillingName"
          placeholder="请输入补款人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="补款人手机号" prop="fillingPhone">
        <el-input
          v-model="queryParams.fillingPhone"
          placeholder="请输入补款人手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="补款支付状态" prop="fillingState">
        <el-input
          v-model="queryParams.fillingState"
          placeholder="请输入补款支付状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="补款支付成功时间" prop="fillingTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.fillingTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择补款支付成功时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="补款订单号" prop="fillingNumber">
        <el-input
          v-model="queryParams.fillingNumber"
          placeholder="请输入补款订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="录单员姓名" prop="singlesName">
        <el-input
          v-model="queryParams.singlesName"
          placeholder="请输入录单员姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="录单员手机号码" prop="singlesPhone">
        <el-input
          v-model="queryParams.singlesPhone"
          placeholder="请输入录单员手机号码"
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
      <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="queryParams.remarks"
          placeholder="请输入备注"
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
          v-hasPermi="['share:fillin:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['share:fillin:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['share:fillin:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['share:fillin:export']"
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

    <el-table v-loading="loading" :data="fillinList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="公司业务工单表id" align="center" prop="busirecordId" />
      <el-table-column label="公司表id" align="center" prop="companyId" />
      <el-table-column label="补款金额" align="center" prop="fillingMoney" />
      <el-table-column label="补款人id" align="center" prop="fillingUserId" />
      <el-table-column label="补款人姓名" align="center" prop="fillingName" />
      <el-table-column label="补款人手机号" align="center" prop="fillingPhone" />
      <el-table-column label="补款支付状态" align="center" prop="fillingState" />
      <el-table-column label="补款支付成功时间" align="center" prop="fillingTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fillingTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="补款订单号" align="center" prop="fillingNumber" />
      <el-table-column label="录单员姓名" align="center" prop="singlesName" />
      <el-table-column label="录单员手机号码" align="center" prop="singlesPhone" />
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
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column label="删除开关标识" align="center" prop="delSwitch"  :formatter="delSwitchFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['share:fillin:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['share:fillin:remove']"
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

    <!-- 添加或修改工单补款记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司业务工单表id" prop="busirecordId">
          <el-input v-model="form.busirecordId" placeholder="请输入公司业务工单表id" />
        </el-form-item>
        <el-form-item label="公司表id" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司表id" />
        </el-form-item>
        <el-form-item label="补款金额" prop="fillingMoney">
          <el-input v-model="form.fillingMoney" placeholder="请输入补款金额" />
        </el-form-item>
        <el-form-item label="补款人id" prop="fillingUserId">
          <el-input v-model="form.fillingUserId" placeholder="请输入补款人id" />
        </el-form-item>
        <el-form-item label="补款人姓名" prop="fillingName">
          <el-input v-model="form.fillingName" placeholder="请输入补款人姓名" />
        </el-form-item>
        <el-form-item label="补款人手机号" prop="fillingPhone">
          <el-input v-model="form.fillingPhone" placeholder="请输入补款人手机号" />
        </el-form-item>
        <el-form-item label="补款支付状态" prop="fillingState">
          <el-input v-model="form.fillingState" placeholder="请输入补款支付状态" />
        </el-form-item>
        <el-form-item label="补款支付成功时间" prop="fillingTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.fillingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择补款支付成功时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="补款订单号" prop="fillingNumber">
          <el-input v-model="form.fillingNumber" placeholder="请输入补款订单号" />
        </el-form-item>
        <el-form-item label="录单员姓名" prop="singlesName">
          <el-input v-model="form.singlesName" placeholder="请输入录单员姓名" />
        </el-form-item>
        <el-form-item label="录单员手机号码" prop="singlesPhone">
          <el-input v-model="form.singlesPhone" placeholder="请输入录单员手机号码" />
        </el-form-item>
        <!-- <el-form-item label="创建时间" prop="createDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="删除开关标识" prop="delSwitch">
          <el-select v-model="form.delSwitch" placeholder="请选择删除开关标识 " clearable size="small">
          <el-option v-for="item in delSwitch" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  />
        </el-select>
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
import { listFillin, getFillin, delFillin, addFillin, updateFillin, exportFillin } from "@/api/crm/fillin";

export default {
  name: "Fillin",
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
      delSwitch:[],
      // 总条数
      total: 0,
      // 工单补款记录表格数据
      fillinList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize:10,
        busirecordId: null,
        companyId: null,
        fillingMoney: null,
        fillingUserId: null,
        fillingName: null,
        fillingPhone: null,
        fillingState: null,
        fillingTime: null,
        fillingNumber: null,
        singlesName: null,
        singlesPhone: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        busirecordId: [
          { required: true, message: "公司业务工单表id不能为空", trigger: "blur" }
        ],
        fillingMoney: [
          { required: true, message: "补款金额不能为空", trigger: "blur" }
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
    /** 查询工单补款记录列表 */
    getList() {
      this.loading = true;
      listFillin(this.queryParams).then(response => {
        this.fillinList = response.data.rows;
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
        busirecordId: null,
        companyId: null,
        fillingMoney: null,
        fillingUserId: null,
        fillingName: null,
        fillingPhone: null,
        fillingState: null,
        fillingTime: null,
        fillingNumber: null,
        singlesName: null,
        singlesPhone: null,
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
      this.title = "添加工单补款记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFillin({id:id}).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工单补款记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFillin(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addFillin(this.form).then(response => {
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
      this.$confirm('是否确认删除工单补款记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFillin({id:ids});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有工单补款记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFillin(queryParams);
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
