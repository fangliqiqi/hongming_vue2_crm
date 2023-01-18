<template>
  <div class="app-container workHandover">
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
              <el-form-item label="客户经理" prop="createBy" v-if="roles.indexOf('accountExecutive')==-1">
                <el-input
                 placeholder="请输入客户经理名称"
                        v-model="queryParams.createBy"
                        class="mw222"
                        size="small">
                </el-input>
              </el-form-item>
              <el-form-item label="内帐" prop="nzDept">
                <el-input
                 placeholder="请输入内帐员名称"
                        v-model="queryParams.nzDept"
                        class="mw222"
                        size="small">
                </el-input>
              </el-form-item>
              <el-form-item label="调度员" prop="ddDept">
                <el-input
                 placeholder="请输入调度员名称"
                        v-model="queryParams.ddDept"
                        class="mw222"
                        size="small">
                </el-input>
              </el-form-item>
              <el-form-item label="外勤专员" prop="wqDept">
                <el-input
                 placeholder="请输入外勤专员名称"
                        v-model="queryParams.wqDept"
                        class="mw222"
                        size="small">
                </el-input>
              </el-form-item>
              <el-form-item label="客服专员" prop="kfDept">
                <el-input
                 placeholder="请输入客服专员名称"
                        v-model="queryParams.kfDept"
                        class="mw222"
                        size="small">
                </el-input>
              </el-form-item>
              <el-form-item label="外账" prop="wzDept">
                <el-input
                 placeholder="请输入外账员名称"
                        v-model="queryParams.wzDept"
                        class="mw222"
                        size="small">
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="联系人" prop="linkman">
                <el-input
                 placeholder="请输入联系人名称"
                        v-model="queryParams.linkman"
                        class="mw222"
                        size="small">
                </el-input>
              </el-form-item>
              <el-form-item label="客户等级" prop="clientLv">
                  <el-radio-group v-model="queryParams.clientLv">
                    <el-radio v-for="item in clientLvList" :key="item.dictCode" :label="item.dictCode">
                      {{item.dictName}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="所在地区" prop="district">
                  <el-cascader
                  placeholder="请选择信息所在地区"
                  style="width: 100%"
                  size="small"
                  :options="areaOptions"
                  v-model="queryParams.district"
                  @change="handleRegionChange">
                </el-cascader>
                </el-form-item>
                <el-form-item label="增值税类型" prop="vatCollection">
                  <el-radio-group v-model="queryParams.vatCollection">
                    <el-radio v-for="item in vatTypeList" :key="item.dictCode" :label="item.dictCode">
                      {{item.dictName}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                 <el-form-item label="客户类型" prop="clientType">
                  <el-radio-group v-model="queryParams.clientType">
                    <el-radio v-for="item in clientType" :key="item.dictCode" :label="item.dictCode">
                      {{item.dictName}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item> -->
              </el-form>
              <div class="popover-footer">
                <el-button type="success" size="small" @click="cancel">取消</el-button>
                <el-button type="warning" size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认</el-button>


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
            v-model="queryParams.keyword"
            placeholder="请输入客户简称或表编号或税号"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuerys"
          />
          <el-dropdown
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAddCustomer"
            v-if="false"
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
            v-if="false"
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
    <div class="table-data">
        <el-table
          :data="bankList"
          @selection-change="handleSelectionChange"
          :height="tableHeight"
        >
          <el-table-column type="selection" width="55" align="left" />
          <el-table-column label="客户名称" align="left"  prop="companyName"/>
          <el-table-column label="订单编号" align="left" prop="orderNo"/>
          <el-table-column label="项目名称" align="left" prop="serpriceName"/>
          <el-table-column label="客户经理" align="left" prop="createBy"/>
          <el-table-column label="内帐" align="left" prop="nzDept" />
          <el-table-column label="调度员" align="left" prop="ddDept"/>
          <el-table-column label="外勤专员" align="left" prop="wqDept" />
          <el-table-column label="客服专员" align="left" prop="kfDept" />
          <el-table-column label="外账" align="left" prop="wzDept" />
          <el-table-column label="其他专员" align="left" prop=""/>
          <!-- <el-table-column
            label="操作"
            align="center"
            class-name="table-control"
            fixed="right"
          > -->
            <!-- <template slot="header">
              <i class="el-icon-edit-outline"></i>
            </template> -->
            <!-- <template slot-scope="scope"> -->
              <!-- <el-button
                size="mini"
                type="text"
                @click="clientData(scope.row)"
                v-hasPermi="['share:bank:edit']"
                >创建订单
              </el-button> -->
              <!-- <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['share:bank:edit']"
            >修改</el-button> -->
            <!-- </template> -->
          <!-- </el-table-column> -->
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
      open
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
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import { mapState } from "vuex";
import{runApplyList,//列表展示
}from "@/api/crm/workHandover/workHandover";
 import { throttle } from '@/utils/hmt'
export default {
  name: "Agent",
  data() {
    return {

      view: false, // 是否抽屉弹出层
      roles:[],
      showSearch: false,// 显示搜索条件
      total: 0,// 总条数
      clientLvList: [], //客户等级字典
      vatTypeList: [], //增值税类型
         inputVisible: false,
         labelPosition: "top",
         sourceTypeLvList: [],//客户类型字典
      openCustomer: false,//新增客户弹出层
      loading: true, // 遮罩层
      areaOptions: regionData, //区域数据
      // 公司银行开户信息表格数据
      bankList: [],
      clientType: [{dictName:"a"},{dictName:"b"}], //客户类型字典
      open: false,// 是否显示弹出层
      renewals: false,
       // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        clientType: null,
        createBy:null,//业务专员
        nzDept:null,//内帐专员
        ddDept:null,//调度员
        wqDept:null,//外勤专员
        kfDept:null,//客服专员
        wzDept:null,//外账专员
        },
    };
  },
  watch:{
    view: function (val, oldVal) {
      if(!val){
        this.getList()
      }
    },
  },
   beforeRouteEnter(to, from, next){
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm);//当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
     //客户等级字典
    clientLvFormat(row) {
      return this.selectDictLabel(this.clientLvList, row.clientLv);
    },
    //列表展示
    getList() {
      let data = JSON.parse(JSON.stringify(this.queryParams));
      // data.clientType = data.clientType == "0" ? "" : data.clientType;
      // let data=this.queryParams
      runApplyList(data).then(response => {
        this.bankList=response.data.rows;
        this.total = response.data.totalRows;
      })
    },

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
    handleQuerys:throttle(function(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageNum = 1;
      this.getList();
    }),
    /** 搜索按钮操作 */
    handleQuery:throttle(function(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.queryParams.pageNum = 1;
      this.getList();
      this.resetForm("queryForm");
    }),
    /** 重置按钮操作 */
    resetQuery() {
        this.resetForm("queryForm");
        this.$refs.queryForm.resetFields()
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
      this.showSearch=false;//筛选取消按钮
      this.resetForm("queryForm");
    },
    // 表单重置
    reset() {},
  },
  computed: {
    ...mapGetters(["tableHeight"]),
        ...mapState({
      userInfo: state => state.user
    })
  },
   created() {
      this.getList();
      this.roles = this.userInfo.roleCodes;
         this.getDicts('source_type_lv').then(res => {
        this.sourceTypeLvList = res.data
      })
      //客户等级
    this.getDicts("customer_rating").then(res => {
      this.clientLvList = res.data;
    });
     //增值税类型
    this.getDicts("vat_type").then(res => {
      this.vatTypeList = res.data;
    });
    },

};
</script>

<style lang="scss">
// .app-container .table-data .el-table .el-table__fixed-right th.table-control {
//     display: flex;
//     flex-direction:row-reverse;
//     .cell{
//     margin-left:0px
// }
// }
</style>
