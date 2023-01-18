<template>
  <div class="app-container">
     <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="4">
          <el-popover
            placement="top-start"
            width="400"
            trigger="manual"
            v-model="showSearch"
          >
            <div class="search-popover">
              <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
                <el-form-item label="标签键值" prop="value">
                  <el-input
                    v-model="queryParams.value"
                    placeholder="请输入标签键值"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>
                <el-form-item label="标签级别" prop="lv">
                  <el-select v-model="queryParams.lv" placeholder="请选择标签级别" clearable size="small">
                    <el-option  v-for="item in labelLevel" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode" />
                  </el-select>
                </el-form-item>
                <el-form-item label="标签名称" prop="name">
                  <el-input
                    v-model="queryParams.name"
                    placeholder="请输入标签名称"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>
                <el-form-item label="标签类型" prop="type">
                  <el-select v-model="queryParams.type" placeholder="请选择标签类型" clearable size="small">
                    <el-option  v-for="item in labelType" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode" />
                  </el-select>
                </el-form-item>
                <el-form-item label="录入时间" >
                  <el-time-picker
                    is-range
                    v-model="value1"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </el-form-item>
                <!-- <el-form-item label="方法名称" prop="method">
                  <el-input
                    v-model="queryParams.method"
                    placeholder="请输入方法名称"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>

                <el-form-item label="操作类别" prop="operatorType">
                  <el-select v-model="queryParams.operatorType" placeholder="请选择操作类别" clearable size="small">
                    <el-option v-for="item in operatorType" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode" />
                  </el-select>
                </el-form-item> -->

                <el-form-item>
                  <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                  <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" type="primary" @click="handleQuery">确 定</el-button>
                <el-button size="small" @click="showSearch = false">取 消</el-button>
              </div>
            </div>
            <el-button slot="reference" size="small"  icon="el-icon-search" @click="showSearch = !showSearch"  >筛选</el-button>
          </el-popover>

        </el-col>
        <el-col :span="20">
          <el-dropdown size="small" split-button type="primary" trigger="click"  @click="handleAdd" v-hasPermi="['crm:log:add']">
            <span>
              <i class="el-icon-plus"></i>
              新建
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%"><span><i class="el-icon-upload2"></i>导入</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            icon="el-icon-download"
            size="small"
            @click="handleExport"
            v-hasPermi="['crm:log:export']"
          >导出</el-button>
        </el-col>
      </el-row>
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>

<div class="tabbar-vi">
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
      </div>
    </div>
    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['crm:userlabel:add']"
          >新增</el-button
        >
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['crm:userlabel:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['crm:userlabel:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm:userlabel:export']"
        >导出</el-button>
      </el-col> -->
      <!-- <div class="top-right-btn">
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
    </el-row> -->

   <div class="table-data">
      <el-table
       :height="tableHeight"
      v-loading="loading"
      :data="userlabelList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="标签键值" align="center" prop="value" />
      <el-table-column
        label="标签级别"
        align="center"
        prop="lv"
        :formatter="labelLevelFormat"
      />
      <el-table-column label="标签名称" align="center" prop="name" />
      <el-table-column
        label="标签类型"
        align="center"
        prop="type"
        :formatter="labelTypeFormat"
      />
      <el-table-column label="备注 " align="center" prop="remarks" />
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
            v-hasPermi="['crm:userlabel:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm:userlabel:remove']"
            >删除</el-button
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
   </div>



    <!-- 添加或修改用户标签对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标签键值" prop="value">
          <el-input v-model="form.value" placeholder="请输入标签键值" />
        </el-form-item>
        <el-form-item label="标签级别" prop="lv">
          <el-select
            v-model="form.lv"
            placeholder="请选择标签级别"
            clearable
            size="small"
          >
            <el-option
              v-for="item in labelLevel"
              :key="item.dictId"
              :label="item.dictLabel"
              :value="item.dictCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item label="标签类型" prop="type">
          <el-select
            v-model="form.type"
            placeholder="请选择标签类型"
            clearable
            size="small"
          >
            <el-option
              v-for="item in labelType"
              :key="item.dictId"
              :label="item.dictLabel"
              :value="item.dictCode"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="备注 " prop="remarks">
          <el-input
            v-model="form.remarks"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <!-- <el-form-item label="删除开关标识" prop="delSwitch">
          <el-input v-model="form.delSwitch" placeholder="请输入删除开关标识" />
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
import {mapGetters} from 'vuex'
import {
  listUserlabel,
  getUserlabel,
  delUserlabel,
  addUserlabel,
  updateUserlabel,
  exportUserlabel
} from "@/api/crm/userlabel";

export default {
  name: "Userlabel",
  data() {
    return {
      value1:'',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 用户标签表格数据
      userlabelList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        value: null,
        lv: null,
        name: null,
        type: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        value: [
          {
            required: true,
            message: "标签键值不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "标签名称不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择标签类型",
            trigger: "blur"
          }
        ]
      },
      labelLevel: [],
      labelType: []
    };
  },
    computed:{
    ...mapGetters(['tableHeight'])
  },
  created() {
    this.getDicts("user_label_level").then(res => {
      this.labelLevel = res.data;
    });
    this.getDicts("user_type").then(res => {
      this.labelType = res.data;
    });
    this.getList();
  },
  methods: {
    /** 查询用户标签列表 */
    getList() {
      this.loading = true;
      listUserlabel(this.queryParams).then(response => {
        this.userlabelList = response.data.rows;
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
        value: null,
        lv: null,
        name: null,
        type: null,
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
      this.title = "添加用户标签";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getUserlabel({ id: row.id }).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户标签";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUserlabel(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addUserlabel(this.form).then(response => {
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
      this.$confirm(
        '是否确认删除用户标签名称为"' + row.name + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delUserlabel({ id: row.id });
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
      this.$confirm("是否确认导出所有用户标签数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportUserlabel(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    labelLevelFormat(row) {
      return this.selectDictLabel(this.labelLevel, row.lv);
    },
    labelTypeFormat(row) {
      return this.selectDictLabel(this.labelType, row.type);
    }
  }
};
</script>
