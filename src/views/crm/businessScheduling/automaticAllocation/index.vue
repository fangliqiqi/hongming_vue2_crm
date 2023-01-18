<template>
  <div class="app-container"  v-if="false">
    <!-- 首行搜索框 -->
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
               <el-form
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="审核时间" prop="enteringTime">
                  <el-date-picker
                    v-model="queryParams.enteringTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="调度审核状态" prop="dispatchState">
                  <el-radio-group  v-model="queryParams.dispatchState" >
                    <el-radio
                      v-for="item in dispatchStateList"
                      :key="item.dictId"
                      :label="item.dictCode"
                      :value="item.dictCode"
                    > {{item.dictLabel}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="审核财务" prop="financeName">
                  <el-input placeholder="请输入"  v-model="queryParams.financeName">

                  </el-input>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small"  @click="resetQuery"
                  >重置</el-button
                >
                <el-button type="primary" size="small" @click="handleQuery"
                  >确认</el-button
                >
              
              </div>
            </div>
            <el-button
              slot="reference"
              size="small"
              icon="el-icon-search"
              @click="showSearch = !showSearch"
              >筛选
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.roleName"
            placeholder="请输入角色名称"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuery"
          />
          <!-- <el-dropdown
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAdd"
          >
            <span>
              <i class="el-icon-plus"></i>
              新建商机
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%" @click.native="bulkImport"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-button
            class="ml8"
            icon="el-icon-download"
            size="small"
            @click="handleExport"
            v-if="false"
            v-hasPermi="['crm:log:export']"
            >导出
          </el-button>
        </el-col>
      </el-row>
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>
    <!--  -->
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.sourceTypeLv" @tab-click="handleQuery">
           <el-tab-pane
          label="外勤人员设置"
          value="" name=""></el-tab-pane>
        <!-- <el-tab-pane
          v-for="item in sourceTypeLvList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
        ></el-tab-pane> -->
      </el-tabs>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button
            size="mini"
            circle
            icon="el-icon-refresh"
            @click="handleQuery"
          />
        </el-tooltip>
      </div>
    </div>

    <!-- 表格 -->
<div class="table-data">
    <el-table
      v-loading="loading"
      :data="BusinessList"
      :height="tableHeight"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="外勤人员" align="center" prop="createBy" />
      <el-table-column label="服务范围" align="center" prop="type" />
      <el-table-column label="任务类型" align="center" prop="discountAmount" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
          
            @click="handleSet(scope.row)"
            v-hasPermi="['share:bank:remove']"
            >设置</el-button
          >
        </template>
      </el-table-column>
       
    </el-table>
</div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNo"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 设置 -->
    <el-dialog title="设置" :visible.sync="open" width="500px" append-to-body class="Set">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :label-position="labelPosition">
              <el-row :gutter="24">
                  <el-col :span="12">
        <el-form-item label="外勤人员" prop="">
          <el-input v-model="form.bankAddress" placeholder="请输入外勤人员" />
        </el-form-item>
                  </el-col>

     <el-col :span="12">
        <el-form-item label="服务范围" prop="district">
                <el-cascader
                  placeholder="请选择服务范围"
                  style="width: 100%"
                  size="small"
                  :options="areaOptions"
                  v-model="form.district"
                  @change="handleRegionChange">

                </el-cascader>
              </el-form-item>
                  </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
         <el-form-item label="服务任务类型" prop="delSwitch">
          <el-select
            v-model="form.delSwitch"
            placeholder="请输入价格"
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
            </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirmationAudit">确认审核</el-button>
        
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { 
  delBank,
  updateBank,
  exportBank
} from "@/api/crm/bank";
import { mapGetters } from 'vuex'

import { CompanyBusir,update } from "../../../../api/crm/businessScheduling/automaticAllocation";
 /*获取省市区信息*/
  import {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode
  } from 'element-china-area-data'
export default {
  name: "automaticAllocation",
  data() {
    return {
         areaOptions: regionData,//区域数据
        //设置弹出框表单
        labelPosition:'top',
      sourceTypeLvList: [], //商机等级字典
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
      delSwitch: [],
      // 总条数
      total: 0,
      // 商机等级表格数据
      BusinessList: [],
      // 弹出层标题
      title: "",
       //审核状态字典
      dispatchStateList: [],
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        companyId: null,
        bankName: null,
        bankAccountNumber: null,
        bankAddress: null,
        createDate: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        financeName:null,
        sDispatchTime:null,
        eDispatchTime:null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
   computed: {
      ...mapGetters(['tableHeight'])
    },
  created() {
    this.getDicts("del_switch").then(res => {
      this.delSwitch = res.data;
    });
     //调度审核状态
    this.getDicts("dispatch_state").then(res => {
      this.dispatchStateList = res.data.slice(0, 3);
 
    });
    this.getList();
  },
  methods: {
    /** 查询商机信息列表 */
    getList() {
      this.loading = true;
     CompanyBusir(this.queryParams).then(response => {
        this.BusinessList = response.data.rows;
      // console.log(response.data.rows);
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
 
    //设置
    handleSet(row){
        let id = row.id
        this.open = true
        

    },
    //确认审核
    confirmationAudit(row){

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
        bankName: null,
        bankAccountNumber: null,
        bankAddress: null,
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
    handleQuery(e) {
      if (e.keyCode != 13) {
          this.showSearch = false
        }
      
   if(this.queryParams. enteringTime){
 if(this.queryParams. enteringTime.length !==0){
   this.queryParams.sDispatchTime = this.queryParams. enteringTime[0]
     this.queryParams.eDispatchTime = this.queryParams. enteringTime[1]
     delete this.queryParams. enteringTime
 }
 }

    this.queryParams.pageNo = 1;
      this.getList();
Object.assign(
        this.$data.queryParams,
        this.$options.data().queryParams
      );
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
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      update({ id: row.id }).then(response => {
        this.form = response.data;
        this.open = true;  
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            update(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            // addBank(this.form).then(response => {
            //   if (response.code === 200) {
            //     this.msgSuccess("新增成功");
            //     this.open = false;
            //     this.getList();
            //   }
            // });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除公司银行开户信息编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delBank({ id: ids });
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
      this.$confirm("是否确认导出所有公司银行开户信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportBank(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    delSwitchFormat(row) {
      return this.selectDictLabel(this.delSwitch, row.delSwitch);
    },
      handleRegionChange(value) {
        this.form.district = value
        this.form.prov = CodeToText[value[0]]
        this.form.city = CodeToText[value[1]]
        this.form.county = CodeToText[value[2]]
      },
  }
};
</script>
<style lang="scss">
.Set{
    .el-dialog{
      margin-top: 25vh !important;
        height: 375px;  
        width: 516px !important;     
font-weight: 400;
color: #565759;
display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-dialog__body{
      margin-top: -50px;
    }
        .el-form{
            margin: 0;
            .el-input{
                width: 222px !important;
            }
            .el-select{
         width: 222px !important;
       
      }
        }
    }
}

</style>