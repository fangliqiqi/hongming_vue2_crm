<template>
  <div class="app-container houseMyClients">
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
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
                <el-form-item label="客户名称/联系方式" prop="keyword">
                  <el-input
                    placeholder="请输入客户名称"
                    v-model="queryParams.keyword"
                    size="small"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item label="所属公司" prop="companyName">
                  <el-input
                    placeholder="请输入所属公司"
                    v-model="queryParams.companyName"
                    size="small"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item label="客户类型" prop="type" class="clientsLv">
                  <el-radio-group v-model="queryParams.type">
                    <el-radio
                      v-for="item in houseCustomerTypeList"
                      :key="item.dictCode"
                      :label="item.dictCode"
                    >
                      {{ item.dictName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <!--                <el-button type="success" size="small" @click="cancel">取消</el-button>-->
                <el-button size="small" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuerys"
                  >确认</el-button
                >
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search"
              >筛选
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.keyword"
            placeholder="请输入客户名称或联系方式"
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
            v-noRole="[
              'schedulingSupervisor',
              'dispatchClerks',
              'marketCompanyBusirInternalAccount'
            ]"
          >
            <span>
              <i class="el-icon-plus"></i>
              新增客户
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item
              >
              <!-- <el-dropdown-item style="width: 100%" @click.native="bulkImport"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item> -->
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
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.clientType" @tab-click="handleTabClick">
        <el-tab-pane label="全部客户" value="" name=""></el-tab-pane>
        <el-tab-pane label="即将到期用户" value="10" name="10"></el-tab-pane>
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

    <!-- 全部客户 -->
    <!-- 点击弹出侧边栏 -->
    <!-- @row-click="handleRowFun" -->

    <div class="table-data" v-show="queryParams.clientType != 10">
      <el-table
        class="slither"
        v-loading="loading"
        :data="clientsList"
        @selection-change="handleSelectionChange"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="资源id" align="center" prop="id" /> -->
        <el-table-column
          label="客户名称"
          align="left"
          prop="clientName"
          width="220"
        >
          <template slot-scope="scope">
            <div
              type="text"
              style="display:flex;align-items:center;line-height: 16px;"
            >
              <span style="color:#3978E7;"> {{ scope.row.clientName }}</span>
              <span class="newFather" v-if="advanceUpdate(scope.row)">
                <img
                  src="@/assets/image/new.png"
                  alt=""
                  style="width:38px;height: 13px; margin-left:4px;"
                />

                <span class="new">new</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="所属公司"
          align="left"
          prop="companyName"
          width="220"
        />
        <el-table-column
          label="联系方式"
          align="left"
          prop="phone"
          width="220"
        />
        <el-table-column label="客户标签" align="left" prop="label" width="220">
          <template slot-scope="scope">
            <el-tag
              size="min"
              :key="index"
              v-for="(tag, index) in scope.row.label || '[]'"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="客户类型"
          align="left"
          :formatter="houseCustomerTypeFormat"
          width="220"
        />

        <el-table-column
          label="所在区域"
          align="left"
          prop="region"
          width="200"
        />
        <el-table-column label="销售顾问" align="left" prop="sellDeptName" />
        <el-table-column
          label="操作"
          align="center"
          class-name="table-control"
          fixed="right"
          width="220"
        >
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="newOrders(scope.row)"
              v-hasPermi="['share:bank:edit']"
              >创建订单</el-button
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
    <!-- 即将到期用户户 -->
    <div class="table-data" v-show="queryParams.clientType == 10">
      <el-table
        class="slither"
        v-loading="loading"
        :data="clientsList"
        @selection-change="handleSelectionChange"
        @row-click="handleRowFun"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="资源id" align="center" prop="id" /> -->

        <el-table-column
          label="用户名称"
          align="left"
          prop="accountNumber"
          width="120"
        />
        <el-table-column
          label="客户名称"
          align="left"
          prop="clientName"
          width="120"
        />

        <el-table-column
          label="所属公司"
          align="left"
          prop="companyName"
          width="120"
        />
        <el-table-column
          label="联系方式"
          align="left"
          prop="phone"
          width="120"
        />

        <el-table-column
          label="所在区域"
          align="left"
          prop="region"
          width="150"
        />

        <el-table-column label="销售顾问" align="left" prop="createName" />
        <el-table-column
          label="创建时间"
          align="left"
          prop="openTime"
          width="150"
        />
        <el-table-column
          label="套餐名称"
          align="left"
          prop="packageName"
          width="150"
        />
        <el-table-column
          label="到期时间"
          align="left"
          prop="maturityTime"
          width="150"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name="table-control"
          fixed="right"
          width="120"
        >
          <template slot="header">
            <i class="el-icon-edit-outline"></i>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="ExpiringCustomersOrders(scope.row)"
              v-hasPermi="['share:bank:edit']"
              >创建订单</el-button
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

    <!-- 新增客户 -->
    <el-dialog
      title="新增客户"
      open
      :visible.sync="openCustomer"
      width="704px"
      class="addClients "
    >
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        :label-position="labelPosition"
        class="chengjiao"
      >
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="clientName">
              <el-input
                v-model="form.clientName"
                placeholder="请输入客户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="phone">
              <el-input
                maxlength="11"
                v-model="form.phone"
                placeholder="请输入联系方式"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属公司" prop="companyName">
              <el-input
                maxlength="11"
                v-model="form.companyName"
                placeholder="请输入所属公司"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属地区" prop="cityCode">
              <el-cascader
                placeholder="请选择所属地区"
                style="width: 100%"
                size="small"
                :options="areaOptions"
                v-model="form.cityCode"
                @change="handleRegionChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="客户标签" prop="label">
              <el-select
                class="mw222"
                multiple
                size="small"
                v-model="form.label"
                placeholder="请选择客户标签"
              >
                <el-option
                  v-for="item in UserlabelList"
                  :label="item.name"
                  :value="item.name"
                  :key="item.id + 'l'"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="安居客账号" prop="clientAjkAccounts">
              <el-input
                v-model="form.clientAjkAccounts"
                placeholder="请输入安居客账号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="58用户名" prop="clientSource">
              <el-input
                v-model="form.clientSource"
                placeholder="请输入58用户名"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="客户类型" prop=" type">
            <el-radio-group v-model="form.type">
              <el-radio
                v-for="item in houseCustomerTypeList"
                :key="item.dictCode"
                :label="item.dictCode"
              >
                {{ item.dictName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="销售顾问" prop="sellDeptName">
              <el-input
                maxlength="11"
                disabled
                v-model="form.sellDeptName"
                placeholder="请输入销售顾问"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售岗位" prop="sellPost">
              <el-input
                maxlength="11"
                disabled
                v-model="form.sellPost"
                placeholder="请输入销售岗位"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="declaration" type="warning">报单</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </el-dialog>
    <!-- 导入 -->
    <el-dialog
      title="导入"
      open
      :visible.sync="uploadingFile"
      width="516px"
      append-to-body
      class="uploadingFile"
    >
      <el-row>
        <el-col :span="24">
          <span class="title">模块下载:</span>
          <el-button style="padding:0px;border:0px;" @click="downloadModule">
            <el-tag style="margin:0px;">下载</el-tag>
          </el-button>
        </el-col>
        <el-col :span="24" style="display:flex">
          <span class="title">上传文件:</span>
          <el-upload
            ref="importUpdateFile"
            class="upload-demo"
            :auto-upload="false"
            :action="importFileUrl"
            :on-change="uploadingTrigger"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            accept=".xls,.xlsx"
            :on-exceed="handleExceed"
            :file-list="importFileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              上传文件只能为excel文件，且为xlsx,xls格式
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitFormUploading">确 定</el-button>
      </div>
    </el-dialog>
    <house-drawer
      ref="houseDrawer"
      :visible.sync="orderShow"
      :companyId="companyId"
      :settings="settings"
      @editOrder="editOrderFun"
    ></house-drawer>
    <create-house-order
      ref="createHouseOrder"
      :companyId="companyId"
      @changeShow="showAddOrUpdate"
      :houseOrderShow="houseOrderShow"
    ></create-house-order>
  </div>
</template>

<script>
import {
  houseClientList,
  addClient,
  Userlabel,
  ExpiringCustomersList
} from "@/api/crm/houseProperty/myClients";
import { mapGetters } from "vuex";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import EditOrder from "@/views/components/EditOrder";
import { throttle } from "@/utils/hmt";
import { getMapIndustry } from "@/api/crm/index"; //行业分类
import { mapState } from "vuex";
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import HouseDrawer from "@/views/components/HouseDrawer/index";
import CreateHouseOrder from "@/views/components/CreateHouseOrder/index";
export default {
  components: {
    HouseDrawer,
    EditOrder,
    CreateHouseOrder
  },
  name: "houseMyClients",
  data() {
    return {
      filePath: process.env.VUE_APP_FILE_API,
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload",
      importFileUrl:
        process.env.VUE_APP_CRM_API +
        "/hmkj-crm/resoBusinessOpportunity/bulkImport",
      //创建订单
      houseOrderShow: false,
      //新增客户弹出层
      openCustomer: false,
      uploadingFile: false, //上传
      orderVisible: false, //查看订单显示
      orderId: "",
      hiddenTab: true,
      labelPosition: "right",
      newOrderVisible: false, //新增订单
      dialogVisible: false, //
      dialogVisibleTwo: false,
      clientLv: null, //客户等级
      houseCustomerTypeList: [], //客户类型
      areaOptions: regionData, //区域数据
      inputVisible: false,
      PaymentTime: null,
      //客户标签
      UserlabelList: [],
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
      // 公司表格数据
      clientsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否抽屉弹出层
      orderShow: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        keyword: "",
        clientLv: null,
        linkman: null, //联系人
        createBy: null, //业务员
        companyId: null,
        remarks: null,
        province: null,
        city: null,
        county: null,
        companyName: "",
        clientType: '0',
      },
      //新增客户规则
      formRules: {
        clientName: [
          {
            required: true,
            message: "客户姓名不能为空",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "联系方式不能为空",
            trigger: "blur"
          }
        ],
        companyName: [
          {
            required: true,
            message: "所属公司不能为空",
            trigger: "blur"
          }
        ],
        cityCode: [
          {
            required: true,
            message: "所属地区不能为空",
            trigger: "blur"
          }
        ],
        label: [
          {
            required: true,
            message: "客户标签不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择客户类型",
            trigger: "change"
          }
        ]
      },
      // 表单参数
      form: {},
      settings: [{ icon: "el-icon-delete", lable: "删除", value: "1" }],
      load: false,
      activeOrder: "second",
      companyId: null,
      // 上传
      fileList: [],
      importFileList: [] //导入数据
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    // view: {
    //     get() {
    //       if (this.visible) {
    //         this.getData()
    //       }
    //     }
    // }
    ...mapState({
      userInfo: state => state.user
    })
  },
  watch: {
    orderShow: function(val, oldVal) {
      if (!val) {
        this.getList();
      }
    }
  },
  created() {
    //客户类型
    this.getDicts("house_customer_type").then(res => {
      this.houseCustomerTypeList = res.data;
    });
    this.getList();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm); //当前组件的实例
      vm.resetQuery();
      vm.getList();
    });
  },
  methods: {
    handleTabClick() {
      if (this.queryParams.clientType == 10) {
        this.getExpiringList();
      } else {
        this.getList();
      }
    },
    /** 查询全部客户信息列表 */
    getList() {
      this.loading = true;
      let queryParams = this.queryParams;
      //  this.clientsList=[]
      let data = JSON.parse(JSON.stringify(queryParams));
      data.clientType = data.clientType == "0" ? "" : data.clientType;
      houseClientList(data).then(response => {
        this.clientsList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    //查询即将到期客户
    getExpiringList() {
      this.loading = true;
      // this.clientsList=[]
      let queryParams = this.queryParams;
      let data = JSON.parse(JSON.stringify(queryParams));
      data.clientType = data.clientType == "0" ? "" : data.clientType;
      ExpiringCustomersList(data).then(response => {
        this.clientsList = response.data.rows || [];
        this.total = response.data.totalRows;
        this.loading = false;
      });
    },
    //new显示
    advanceUpdate(row) {
      var date = new Date();
      var month = Number(date.getMonth()) + 1;
      if (month < 10) {
        month = "0" + month;
      } else {
        return (month = month);
      }
      var day = Number(date.getDate());
      if (day < 10) {
        day = "0" + day;
      }
      var year = date.getFullYear();
      this.PaymentTime = [year, month, day].join("-");
      row.createTime = row.createTime.substr(0, 10);
      return this.PaymentTime.substr(0, 4) - row.createTime.substr(0, 4) == 0
        ? this.PaymentTime.substr(5, 2) - row.createTime.substr(5, 2) == 0
          ? this.PaymentTime.substr(8, 2) - row.createTime.substr(8, 2) <= 3 &&
            this.PaymentTime.substr(8, 2) - row.createTime.substr(8, 2) >= 0
            ? true
            : false
          : false
        : false;
    },

    //新增客户
    handleAddCustomer() {
      this.reset();
      this.openCustomer = true;
      this.title = "新增客户";
      this.form.sellDeptName = this.userInfo.name;
      Userlabel({ type: 20 }).then(response => {
        this.UserlabelList = [];
        response.data.forEach(item => {
          this.UserlabelList.push(item);
        });
      });
    },
    //新增订单
    newOrders(row) {
      this.companyId = row.id;
      this.houseOrderShow = true;
      let EchoForm = {
        clientId: row.id,
        clientType: row.type,
        clientName: row.clientName
      };
      this.$refs.createHouseOrder.handleOrderEcho(EchoForm);
    },
    //即将到期客户新建订单
    ExpiringCustomersOrders(row) {
      this.companyId = row.clientIdd;
      this.houseOrderShow = true;
      let EchoForm = {
        clientId: row.clientId,
        clientType: row.clientType,
        clientName: row.clientName
      };
      this.$refs.createHouseOrder.handleOrderEcho(EchoForm);
    },
    showAddOrUpdate(data) {
      if (data === "false") {
        this.houseOrderShow = false;
      } else {
        this.houseOrderShow = true;
      }
    },
    // 模块下载
    downloadModule() {
      // console.info("模块下载");
      // window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
      // window.location.href = baseURL + "/common/download";
    },
    // 上传
    // 上传文件时触发
    uploadingTrigger(file, importFileList) {
      if (importFileList.length > 1) {
        importFileList.splice(0, 1);
      }
    },
    handleRemove(file, importFileList) {
      // console.log(file, importFileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, importFileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + importFileList.length} 个文件`
      );
    },
    // 删除
    beforeRemove(file, fileList) {
      // console.info("确定移除");
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传确定按钮
    submitFormUploading() {
      this.$refs.importUpdateFile.submit();
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.dialogVisible = false;
      this.showSearch = false; //筛选取消按钮
      this.resetForm("queryForm");
      this.openCustomer = false; //新增客户取消按钮
      this.uploadingFile = false; //导入取消按钮
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        companyName: null,
        client: null, //编号
        companyId: null,
        createBy: null,
        remarks: null,
        clientLv: "10",
        vatCollection: "10",
        clientSource: null,
        type: "10"
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuerys(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      this.resetQuery();
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs.queryForm.resetFields();
      this.resetForm("queryForm");
      this.queryParams={
        pageNo: 1,
        pageSize: 10,
        keyword: "",
        clientLv: null,
        linkman: null, //联系人
        createBy: null, //业务员
        companyId: null,
        remarks: null,
        province: null,
        city: null,
        county: null,
        companyName: "",
        clientType: '0',
      };
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    handleRowFun(row, column, event) {
      if (
        column.property &&
        column.property != undefined &&
        column.property != "undefined"
      ) {
        this.reset();
        this.companyId = row.id;
        this.orderShow = true;
      }
    },
    //报单
    declaration: throttle(function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.id = null;
          addClient(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增客户成功");
              this.newOrders(response.data);
              this.openCustomer = false;
            }
          });
        }
      });
    }),

    // 客户提交按钮
    submitForm: throttle(function() {
      this.form.label = this.form.label.toString();
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.id = null;
          addClient(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增客户成功");
              this.openCustomer = false;
              this.getList();
            }
          });
        }
      });
    }),
    handleRegionChange(value) {
      this.form.cityCode = value;
      this.form.province = CodeToText[value[0]];
      this.form.city = CodeToText[value[1]];
      this.form.county = CodeToText[value[2]];
      this.form.region = this.form.province + this.form.city + this.form.county;
    },

    //导入
    bulkImport() {
      this.uploadingFile = true;
      // bulkImportOpportunity().then(reponse => {
      // });
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

    // 客户类型字典
    houseCustomerTypeFormat(row) {
      return this.selectDictLabel(this.houseCustomerTypeList, row.type);
    },
    editOrderFun(row) {
      this.orderId = row.id;
      this.orderVisible = true;
      this.hiddenTab = false;
    }
  }
};
</script>

<style lang="scss">
.houseMyClients {
  .type_item {
    width: 100%;
    height: 92px;
    border: 1px #e6e7eb solid;
    background-color: #f8f9fb;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    transition: all 0.4s;
    overflow: hidden;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    & > span {
      margin: 24px 20px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #565759;
    }
    .el-button {
      position: absolute;
      bottom: 0;
      width: 100%;
      transform: translateY(100%);
    }
    &:hover {
      border-color: #b5c8f1;
      background-color: #ecf2fc;
      & > span {
        color: #4977e0;
      }
      .el-button {
        transform: translateY(0);
      }
    }
  }
  //筛选
  .search-popover {
    .el-form-item__label {
      width: 128px !important;
    }
    .el-input__inner {
      width: 222px;
    }
    .clientsLv {
      .el-form-item__content {
        width: 100%;
      }
    }
  }
  // 导入
  .uploadingFile {
    .el-dialog {
      .el-dialog__body {
        padding: 14px 50px !important;
        .el-row {
          .el-col {
            margin: 10px 0px;
            .title {
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;
              line-height: 34px;
              margin-right: 18px;
            }
          }
        }
        .dialog-footer {
          text-align: right;
          margin-top: 50px;
        }
      }
    }
  }
  //新增客户
  .addClients {
    .el-dialog {
      height: 662px;
      .el-dialog__footer {
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
    }
  }
  .newFather {
    position: relative;
  }
  .new {
    position: absolute;
    top: -2px;
    right: 5px;
    color: #ffffff;
  }
}
</style>
