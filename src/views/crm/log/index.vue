<template>
  <div class="app-container">
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            trigger="manual"
            v-model="showSearch"
          >
            <div class="search-popover">
              <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px" label-position="left">
                <el-form-item label="业务类型" prop="businessType">
                  <el-select class="mw222" v-model="queryParams.businessType" placeholder="请选择业务类型" clearable size="small">
                    <el-option  v-for="item in businessType" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode" />
                  </el-select>
                </el-form-item>
                <el-form-item label="录入时间" >
                  <el-time-picker
                    is-range
                    size="small"
                    class="mw350"
                    v-model="queryParams.operTime"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </el-form-item>
                <el-form-item label="方法名称" prop="method">
                  <el-input
                    class="mw222"
                    v-model="queryParams.method"
                    placeholder="请输入方法名称"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>

                <el-form-item label="操作类别" prop="operatorType">
                  <el-select v-model="queryParams.operatorType" placeholder="请选择操作类别" clearable size="small" class="mw222">
                    <el-option v-for="item in operatorType" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode" />
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" type="cyan" @click="resetQuery">重置</el-button>
                <el-button size="small" type="primary" @click="handleQuery">确 定</el-button>
                <el-button size="small" @click="showSearch = false">取 消</el-button>
              </div>
            </div>
            <el-button slot="reference" size="small"  icon="el-icon-search" @click="showSearch = !showSearch"  >筛选</el-button>
          </el-popover>

          <el-input
            class="ml8"
            v-model="queryParams.method"
            placeholder="请输入方法名称"
            clearable
            style="width: 240px"
            size="small"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuery"
          />
          <el-button
            class="ml8"
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
      <el-tabs v-model="queryParams.operatorType" @tab-click="handleQuery">
        <el-tab-pane v-for="item in operatorType" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"  :name="item.dictCode"></el-tab-pane>
      </el-tabs>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
      </div>
    </div>
    <table-data v-loading="loading" :data="agentList" :columns = "userColJson" :total="total" :page.sync="queryParams" :control="{buttons:[{name:'转成交',type:'danger',func:handleQuery}]}"></table-data>
<!--    <div class="table-data">-->
<!--      <el-table :height="tableHeight"  v-loading="loading" :data="logList" @selection-change="handleSelectionChange"  >-->
<!--        <el-table-column type="selection" width="55" align="center"  />-->
<!--        <el-table-column label="公司表id" align="center" prop="companyId"  width="120"/>-->
<!--        <el-table-column label="日志主键" align="center" prop="operId"  width="120" />-->
<!--        <el-table-column label="模块标题" align="center" prop="title"  width="320" />-->
<!--        <el-table-column label="业务类型" align="center" prop="businessType" :formatter="businessTypeFormat"  width="120" />-->
<!--        <el-table-column label="方法名称" align="center" width="220" >-->
<!--          <template slot-scope="scope">-->
<!--            <el-popover-->
<!--              placement="bottom-start"-->
<!--              width="220"-->
<!--              trigger="hover"-->
<!--              :content="scope.row.method">-->
<!--              <span slot="reference" class="wsn">{{scope.row.method}}</span>-->
<!--            </el-popover>-->
<!--          </template>-->
<!--        </el-table-column>-->

<!--        <el-table-column label="请求方式" align="center" prop="requestMethod"  width="120" />-->
<!--        <el-table-column label="操作类别" align="center" prop="operatorType" :formatter="operatorTypeFormat"  width="120"/>-->
<!--        <el-table-column label="操作人员" align="center" prop="operName"  width="120"/>-->
<!--        <el-table-column label="部门名称" align="center" prop="deptName" width="120" />-->
<!--        <el-table-column label="请求URL" align="center" prop="operUrl"  width="320"/>-->
<!--        <el-table-column label="主机地址" align="center" prop="operIp"  width="120"/>-->
<!--        <el-table-column label="操作地点" align="center" prop="operLocation" width="120" />-->
<!--        <el-table-column label="请求参数" align="center"  width="240">-->
<!--          <template slot-scope="scope">-->
<!--            <el-popover-->
<!--              placement="bottom-start"-->
<!--              width="220"-->
<!--              trigger="hover"-->
<!--              :content="scope.row.operParam">-->
<!--              <span slot="reference" class="wsn">{{scope.row.operParam}}</span>-->
<!--            </el-popover>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="返回参数" align="center" width="220" >-->
<!--          <template slot-scope="scope">-->
<!--            <el-popover-->
<!--              placement="bottom-start"-->
<!--              width="220"-->
<!--              trigger="hover"-->
<!--              :content="scope.row.jsonResult">-->
<!--              <span slot="reference" class="wsn">{{scope.row.jsonResult}}</span>-->
<!--            </el-popover>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="操作状态" align="center" prop="status" :formatter="operationStatusFormat"  width="120" />-->
<!--        <el-table-column label="错误消息" align="center" prop="errorMsg"  width="120"/>-->
<!--        <el-table-column label="操作时间" align="center" prop="operTime" width="180">-->
<!--          <template slot-scope="scope">-->
<!--            <span>{{ parseTime(scope.row.operTime, '{y}-{m}-{d}') }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--&lt;!&ndash;        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="200">&ndash;&gt;-->
<!--&lt;!&ndash;          <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button&ndash;&gt;-->
<!--&lt;!&ndash;              size="mini"&ndash;&gt;-->
<!--&lt;!&ndash;              type="text"&ndash;&gt;-->
<!--&lt;!&ndash;              icon="el-icon-edit"&ndash;&gt;-->
<!--&lt;!&ndash;              @click="handleUpdate(scope.row)"&ndash;&gt;-->
<!--&lt;!&ndash;              v-hasPermi="['crm:log:edit']"&ndash;&gt;-->
<!--&lt;!&ndash;            >修改</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button&ndash;&gt;-->
<!--&lt;!&ndash;              size="mini"&ndash;&gt;-->
<!--&lt;!&ndash;              type="text"&ndash;&gt;-->
<!--&lt;!&ndash;              icon="el-icon-delete"&ndash;&gt;-->
<!--&lt;!&ndash;              @click="handleDelete(scope.row)"&ndash;&gt;-->
<!--&lt;!&ndash;              v-hasPermi="['crm:log:remove']"&ndash;&gt;-->
<!--&lt;!&ndash;            >删除</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-table-column>&ndash;&gt;-->
<!--      </el-table>-->

<!--      <pagination-->
<!--        v-show="total>0"-->
<!--        :total="total"-->
<!--        :page.sync="queryParams.pageNo"-->
<!--        :limit.sync="queryParams.pageSize"-->
<!--        @pagination="getList"-->
<!--      />-->
<!--    </div>-->



    <!-- 添加或修改日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="公司表id" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司表id" />
        </el-form-item>
        <el-form-item label="模块标题" prop="title">
          <el-input v-model="form.title" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
        <el-form-item label="业务类型">
          <el-select v-model="form.businessType" placeholder="请选择业务类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="方法名称" prop="method">
          <el-input v-model="form.method" placeholder="请输入方法名称" />
        </el-form-item>
        <!-- <el-form-item label="请求方式" prop="requestMethod">
          <el-input v-model="form.requestMethod" placeholder="请输入请求方式" />
        </el-form-item> -->
        <el-form-item label="操作类别">
          <el-select v-model="form.operatorType" placeholder="请选择操作类别">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="操作人员" prop="operName">
          <el-input v-model="form.operName" placeholder="请输入操作人员" />
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入部门名称" />
        </el-form-item> -->
        <!-- <el-form-item label="请求URL" prop="operUrl">
          <el-input v-model="form.operUrl" placeholder="请输入请求URL" />
        </el-form-item>
        <el-form-item label="主机地址" prop="operIp">
          <el-input v-model="form.operIp" placeholder="请输入主机地址" />
        </el-form-item>
        <el-form-item label="操作地点" prop="operLocation">
          <el-input v-model="form.operLocation" placeholder="请输入操作地点" />
        </el-form-item> -->
        <el-form-item label="请求参数" prop="operParam">
          <el-input v-model="form.operParam" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="返回参数" prop="jsonResult">
          <el-input v-model="form.jsonResult" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <!-- <el-form-item label="操作状态">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="错误消息" prop="errorMsg">
          <el-input v-model="form.errorMsg" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="操作时间" prop="operTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.operTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择操作时间">
          </el-date-picker>
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
import { listLog, getLog, delLog, addLog, updateLog, exportLog } from "@/api/crm/log";
import {
  listOpportunity,
} from '@/api/crm/agent/agent'

import {mapGetters} from 'vuex'
export default {
  name: "Log",
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
      showSearch: false,
      activeName:'first',
      // 总条数
      total: 0,
      // 日志表格数据
      logList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize:10,
        companyId: null,
        title: null,
        businessType: null,
        method: null,
        requestMethod: null,
        operatorType: null,
        operName: null,
        deptName: null,
        operUrl: null,
        operIp: null,
        operLocation: null,
        operParam: null,
        jsonResult: null,
        status: null,
        errorMsg: null,
        operTime: null
      },
      operatorType:[],
      businessType:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      agentList:[],
      userColJson:[]
    };
  },
  computed:{
    ...mapGetters(['tableHeight'])
  },
  created() {
    this.getDicts('business_type').then(res=>{
      this.businessType = res.data
    })
     this.getDicts('operator_type').then(res=>{
      this.operatorType = res.data
    })
    this.getDicts('operation_status').then(res=>{
      this.operationStatus = res.data
    })
    this.getList();
  },
  methods: {
    /** 查询日志列表 */
    getList() {
      this.loading = true;
      // listLog(this.queryParams).then(response => {
      //   console.log(response.data);
      //   this.logList = response.data.rows;
      //   this.total = response.data.totalRows;
      //   this.loading = false;
      // });
      listOpportunity(this.queryParams).then(response => {
        this.agentList = response.data.rows
        this.total = response.data.totalRows
        let userColStr = response.data.userColumnCustomJson;
        if ( typeof userColStr == 'string') {
          this.userColJson = JSON.parse(userColStr)||[];
        }
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        companyId: null,
        operId: null,
        title: null,
        businessType: null,
        method: null,
        requestMethod: null,
        operatorType: null,
        operName: null,
        deptName: null,
        operUrl: null,
        operIp: null,
        operLocation: null,
        operParam: null,
        jsonResult: null,
        status: 0,
        errorMsg: null,
        operTime: null
      };
      this.resetForm("form");
    },
    /** 切换搜索操作 */
    handleClick(){
      // console.info(arguments)
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
      this.ids = selection.map(item => item.operId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const operId = row.operId || this.ids
      getLog({id:operId}).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.operId != null) {
            updateLog(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addLog(this.form).then(response => {
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
      const operIds = row.operId || this.ids;
      this.$confirm('是否确认删除日志编号为"' + operIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLog({id:operIds});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有日志数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportLog(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
       businessTypeFormat(row){
      return this.selectDictLabel(this.businessType,row.businessType)
    },
     operatorTypeFormat(row){
      return this.selectDictLabel(this.operatorType,row.operatorType)
    },
    operationStatusFormat(row){
      return this.selectDictLabel(this.operationStatus,row.operationStatus)
    },

  }
};
</script>
<style scoped>
.wsn{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
</style>
