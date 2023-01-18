<template>
  <div class="app-container ">
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            trigger="manual"
          >
          <!-- 筛选 -->
            <div class="search-popover">
              <el-form
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="68px"
              >
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
                  <el-select
                    v-model="queryParams.lv"
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
                  <el-input
                    v-model="queryParams.name"
                    placeholder="请输入标签名称"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>
                <el-form-item label="标签类型" prop="type">
                  <el-select
                    v-model="queryParams.type"
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
                <el-form-item label="录入时间">
                  <el-time-picker
                    is-range
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                  >
                  </el-time-picker>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" type="primary" @click="handleQuery"
                  >确 定</el-button
                >
                <el-button size="small" @click="showSearch = false"
                  >取 消</el-button
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
            placeholder="请输入客户简称或表编号或税号"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuery"
          />
          <el-dropdown
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAddCustomer"
          >
            <span>
              <i class="el-icon-plus"></i>
              新建客户
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%" @click.native="bulkImport"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            class="ml8"
            icon="el-icon-upload2"
            size="small"
            @click="handleExport"
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
    <!-- 客户信息列表 -->
    <div class="tabbar-vi">
      <el-tabs  @tab-click="handleQuery">
        <el-tab-pane label="全部客户" value="全部客户" name=""></el-tab-pane>
          <el-tab-pane
          v-for="item in sourceTypeLvList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
        ></el-tab-pane>
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
    <div class="table-data">
        <el-table
          :data="companyList"
          @selection-change="handleSelectionChange"
          :height="tableHeight"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="客户名称" align="center" prop="name"/>
          <el-table-column label="订单编号" align="center" prop="name"/>
          <el-table-column label="服务项" align="center" prop="name"/>
          <el-table-column label="审核人" align="center" prop="name"/>
          <el-table-column label="审核职位" align="center" prop="name"/>
          <el-table-column label="审核状态" align="center" prop="name"/>
          <el-table-column label="审核结果" align="center" prop="name"/>
          <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template>
            <el-button
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']"
              >催审</el-button >
               <el-button
              size="mini"
              type="text"
              v-hasPermi="['crm:userlabel:edit']" 
              class="red"
              >撤销</el-button >
          </template>
        </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="table-control"
            fixed="right"
          >
            <template slot="header">
              <i class="el-icon-edit-outline"></i>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="clientData(scope.row)"
                v-hasPermi="['share:bank:edit']"
                >创建订单
              </el-button>
              <!-- <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['share:bank:edit']"
            >修改</el-button> -->
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
     <!-- 新增客户 -->
    <el-dialog
      title="新增客户"
      :visible.sync="openCustomer"
      width="704px"
      append-to-body
      class="addCustomer businiss"
    >
      <el-form
        ref="form"
        label-position="labelPosition"
        class="chengjiao"
      >
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="客户名称" >
              <el-input
                placeholder="请输入客户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人方式">
              <el-input
                placeholder="请输入联系人方式"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户类型">
              <el-select  placeholder="请选择客户类型">
                <el-option
                  v-for="item in clientType"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="意向度">
              <el-select placeholder="请选择意向度">
                <el-option
                  label="请选择意向度"
                  value="请选择意向度"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="增值税">
              <el-select placeholder="请选择增值税类型">
                <el-option
                  label="请选择增值税类型"
                  value="请选择增值税类型"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在地区">
              <el-cascader
                placeholder="请选择信息所在地区"
                style="width: 100%"
                size="small"
                :options="areaOptions"
                @change="handleRegionChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="行业分类">
              <el-select
                placeholder="请选择行业分类"
              >
                <el-option
                  label="请选择行业分类"
                  value="请选择行业分类"
                />

                <!-- <el-option label="请选择商机类型" value="" /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8"> </el-col> -->
          <el-col :span="8">
            <el-form-item label="商机来源" >
              <el-select
                placeholder="请选择商机来源"
                ><el-option
                  label="请选择商机来源"
                  value="请选择商机来源"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
        </el-row>
        <!-- 其他公司代账 -->
        <!-- <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="在其他公司代账:">
              <el-radio label="是">是</el-radio>
              <el-radio label="否">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="详细地址">
              <el-input
                style="width: 592px;"
                placeholder="请输入详细地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="标签" >
              <div class="tag-vi">
                <el-tag
                  key="tag"
                  closable
                  :disable-transitions="false"
                >11
                  <!-- {{ tag }} -->
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加标签
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  orderClientList,

} from "@/api/crm/clientOrder/clientOrder";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  name: "Agent",
  data() {
    return {
       // 总条数
      total: 0,
         inputVisible: false,
         labelPosition: "top",
         labelLevel: [{ dictCode: "A" }], //级别标签
         labelType: [{ dictName: "a" }, { dictName: "b" }],
        //  sourceTypeLvList: [{dictCode:'待审核订单'}],//审核状态
      openCustomer: false,//新增客户弹出层
      loading: true, // 遮罩层
      areaOptions: regionData, //区域数据
      // 公司银行开户信息表格数据
      // bankList: [
      //   {
      //     delSwitch: "合肥市",
      //     taskType: "代理记账",
      //     lv: "操作",
      //     name: "张云雷"
      //   },
      //   {
      //     delSwitch: "合肥市",
      //     taskType: "代理记账",
      //     lv: "操作",
      //     name: "张云雷"
      //   }
      // ],
      companyList:[],
      sourceTypeLvList:[],
      // clientType:  [{dictName:"待审核订单"},{dictName:"审核通过"},{dictName:"审核未通过"},{dictName:"特殊审批"}], //客户类型字典
      clientType:[],
      // 查询参数
      queryParams: {
        clientType: null
      },
      open: false,// 是否显示弹出层
      renewals: false,
    };
  },
  methods: {
    //新增客户
    handleAddCustomer() {
      this.reset();
      this.openCustomer = true;
      this.title = "新增客户";
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
          window.location.href =
            process.env.VUE_APP_CRM_API +
            "/hmkj-crm/resoBusinessOpportunity/excelTemplate";
        })
        .catch(function() {});
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      //   this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
        handleRegionChange(value) {
      this.form.district = CodeToText[value[0]];
      this.form.province = CodeToText[value[0]];
      this.form.city = CodeToText[value[1]];
      this.form.county = CodeToText[value[2]];
    },
       // 客户提交按钮
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.id = null;
          addClient(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增商机成功");
              this.open = false;
              this.getList();
            }
          });
        }
      });
    },
      showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
 // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.openCustomer = false;//新增客户取消按钮
      this.renewals = false;
    },
     /** 查询商机信息列表 */
    getList() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.queryParams));
      data.clientType = data.clientType == "0" ? "" : data.clientType;
      orderClientList(data).then(response => {
        this.companyList = response.data.rows;
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    // 表单重置
    reset() {},
  },
  computed: {
    ...mapGetters(["tableHeight"])
  },
   created() {
         this.getDicts('source_type_lv').then(res => {
        this.sourceTypeLvList = res.data
      })
         this.getList();
    },
};
</script>

<style lang="scss">
.el-table .fixed-width {
  .el-button--mini{
&.red{
  color: #EF5465;
}
}

}
</style>
