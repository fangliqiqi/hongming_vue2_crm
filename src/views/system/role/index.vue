<template>
  <div class="app-container">
    <el-row>
      <!--公司数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="companyName"
            placeholder="请输入公司名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 0px;width: 100%"
          />
        </div>
        <div class="tree-container">
          <el-tree
            :data="companyOptions"
            :props="{
                label: 'name',
                children: 'children'
              }"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            node-key="companyId"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <div class="search-vi">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-popover
                placement="top-start"
                popper-class="search-popover-vi"
                width="400"
                trigger="manual"
                v-model="showSearch"
              >
                <div class="search-popover">
                  <el-form :model="queryParams" ref="queryForm"  :inline="true" label-position="left" label-width="120px">
                    <el-form-item label="应用名称" prop="appId">
                      <el-select v-model="queryParams.appId" placeholder="请选择应用名称" class="mw222">
                        <el-option
                          v-for="item in $store.getters.myApps"
                          :key="item.appId"
                          :label="item.appName"
                          :value="item.appId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleName">
                      <el-input
                        v-model="queryParams.roleName"
                        placeholder="请输入角色名称"
                        clearable
                        size="small"
                        class="mw222"
                        @keyup.enter.native="handleQuery"
                      />
                    </el-form-item>

                    <el-form-item label="权限字符" prop="roleCode">
                      <el-input
                        v-model="queryParams.roleCode"
                        placeholder="请输入权限字符"
                        clearable
                        size="small"
                        class="mw222"
                        @keyup.enter.native="handleQuery"
                      />
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                      <el-select
                        v-model="queryParams.status"
                        placeholder="角色状态"
                        clearable
                        size="small"
                        class="mw222"
                      >
                        <el-option
                          v-for="dict in statusOptions"
                          :key="dict.dictValue"
                          :label="dict.dictLabel"
                          :value="dict.dictValue"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <el-date-picker
                        v-model="dateRange"
                        size="small"
                        class="mw350"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      ></el-date-picker>
                    </el-form-item>
                  </el-form>
                  <div class="popover-footer">
                    <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
                    <el-button type="cyan" icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
                    <el-button size="small" @click="showSearch = false">取 消</el-button>
                  </div>
                </div>
                <el-button slot="reference" size="small"  icon="el-icon-search" @click="showSearch = !showSearch"  >筛选</el-button>
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
              <el-button
                class="ml8"
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="handleAdd"
                v-hasPermi="['crm:log:add']"
              >新增角色</el-button>
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
          <el-tabs v-model="queryParams.appId" @tab-click="handleQuery">
            <el-tab-pane v-for="item in $store.getters.myApps"
                         :key="item.appId"
                         :label="item.appName"
                         :value="item.appId"  :name="item.appId"></el-tab-pane>
          </el-tabs>
          <div class="top-right-btn">
            <el-tooltip class="item" effect="dark" content="刷新" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
            </el-tooltip>
          </div>
        </div>
        <div class="table-data">
          <el-table :height="tableHeight" v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="角色编号" prop="roleId" width="120" />
            <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
            <el-table-column label="权限字符" prop="roleCode" :show-overflow-tooltip="true" width="150" />
            <el-table-column label="显示顺序" prop="orderNo" width="100" />
            <el-table-column label="状态" align="center" width="100">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="2"
                  @change="handleStatusChange(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="220">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                >修改</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-circle-check"
                  @click="handleDataScope(scope.row)"
                >数据权限</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </div>
      </el-col>
    </el-row>


    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="704px" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="应用名称" prop="appId">
              <el-select v-model="form.appId" placeholder="请选择应用名称" :disabled="!!form.roleId">
                <el-option
                  v-for="item in $store.getters.myApps"
                  :key="item.appId"
                  :label="item.appName"
                  :value="item.appId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所属公司" prop="companyId">
              <el-cascader
                class="mw100"
                v-model="form.companyId"
                :props="{ emitPath:false,checkStrictly: true,label:'name',value:'companyId' }"
                placeholder="选择所属公司"
                :options="companyOptions"
                filterable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入角色名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色类型" prop="roleType">
              <el-select v-model="form.roleType">
                <el-option v-for="item in roleTypeOptions" :key="item.dictCode" :value="item.dictValue" :label="item.dictLabel"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="权限字符" prop="roleCode">
              <el-input v-model="form.roleCode" placeholder="请输入权限字符" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色顺序" prop="orderNo">
              <el-input-number v-model="form.orderNo" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.roleDesc" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色数据权限对话框 -->
    <el-dialog :title="title" :visible.sync="openDataScope" width="1152px" append-to-body>
      <el-form :model="form" >
        <el-form-item label="数据权限" >
          <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event, 'permission')">展开/折叠</el-checkbox>
          <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event, 'permission')">全选/全不选</el-checkbox>
          <el-checkbox v-model="form.permissionCheckStrictly" @change="handleCheckedTreeConnect($event, 'permission')">父子联动</el-checkbox>
          <div style="max-height: 60vh;overflow: auto;">
            <table width="100%">
              <tr v-for="(val,key) in permissionTree" class="permission-tree">
                <td>
                  <div class="permission-name">
                    <span>{{key}}</span>
                  </div>
                </td>
                <td>
                  <el-tree
                    :data="val"
                    :default-checked-keys="permissionKeys"
                    show-checkbox
                    default-expand-all
                    ref="permission"
                    node-key="resourceId"
                    :check-strictly="!form.permissionCheckStrictly"
                    @node-click="changeFun"
                    empty-text="加载中，请稍后"
                    :props="defaultProps"
                  ></el-tree>
                </td>
              </tr>
            </table>
          </div>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDataScope">确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRole,listRolePage, getRole, delRole,branchDelRole, addRole, updateRole, dataScope, changeRoleStatus,getResourceList4Permission,permissionBindResource } from "@/api/system/role";
  import { mapGetters,mapState } from 'vuex'
import { listCompany } from "@/api/system/company";
import { isPromise, throttle } from '@/utils/hmt'
export default {
  name: "Role",
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
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
	    menuExpand: false,
      menuNodeAll: false,
      deptExpand: true,
      deptNodeAll: false,
      permissionCheckStrictly:false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      //
      roleTypeOptions:[],
      // 数据范围选项
      dataScopeOptions: [
        {
          value: "1",
          label: "全部数据权限"
        },
        {
          value: "2",
          label: "自定数据权限"
        },
        {
          value: "3",
          label: "本部门数据权限"
        },
        {
          value: "4",
          label: "本部门及以下数据权限"
        },
        {
          value: "5",
          label: "仅本人数据权限"
        }
      ],
      companyId:'',
      // 菜单列表
      companyOptions:[],
      companyName:'',
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      //permissionKeys
      permissionKeys:[],
      //权限列表
      permissionTree: { },
      // 查询参数
      queryParams: {
        appId:'',
        pageNum: 1,
        pageSize: 10,
        roleName: '',
        roleCode: '',
        status: '',
        companyId: '',
        roleDesc: ""
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "child",
        label: "name"
      },
      // 表单校验
      rules: {
        appId:[
          { required: true, message: "应用名称不能为空", trigger: "blur" }
        ],
        companyId:[
          { required: true, message: "所属公司不能为空", trigger: "blur" }
        ],
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleCode: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleType: [
          { required: true, message: "角色类型不能为空", trigger: "blur" }
        ],
        orderNo: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    companyName(val) {
      this.$refs.tree.filter(val);
    }
  },
  
  computed:{
    ...mapGetters(['tableHeight']),
   ...mapState({
      userInfo: state => state.user
    }),
    isAddCom: function() {
      return isPromise('/guns-cloud-system/entCompany/queryParentCompany')
    },
  },
  created() {
    this.roles = this.userInfo.roleCodes;
    this.getCompanyList();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
      // console.log(this.statusOptions)
    });
    this.getDicts("role_type").then(response => {
      this.roleTypeOptions = response.data;
    });
    this.queryParams.appId = this.$store.getters.appId+'';
  },
  methods: {
    changeFun(){
      // console.info(arguments)
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      let data = this.queryParams;
      this.companyId = data.companyId
      listRolePage(data).then(
        response => {
          // console.log(response.data.rows)
          this.roleList = response.data.rows;
          this.total = response.data.totalRows;
          this.loading = false;
        }
      );
    },
    getCompanyList(){
      listCompany({name:this.companyName,appId: this.queryParams.appId}).then(response => {
        let companyOptions = this.handleTree(response.data, "companyId","parentId");
        if(companyOptions.length>0){
          this.queryParams.companyId = companyOptions[0].companyId;
          this.$refs.tree.setCurrentKey(this.queryParams.companyId)
        }else{
          this.queryParams.companyId = ''
        }
        if (this.roles.indexOf("admin") != -1) {
          companyOptions.unshift({ companyId: '-1', name: '主公司' })
        }
        this.companyOptions = companyOptions||[];
        // console.info(this.companyOptions)
        this.getList();
      });
    },
    getBindKeys(permissions){
      let that = this;
      let arr =[];
      permissions.forEach(item=>{
        if(item.child&&item.child.length>0){
          // console.info('item.child')
          arr = arr.concat(that.getBindKeys(item.child));
          // console.info(arr)
        }
        if(item.isBindResource){
          arr.push(item.resourceId);
        }
      })
      return arr.filter(item=>item!=undefined)
    },
    /** 查询菜单树结构 */
    getResourceListPermission(appId,roleId) {
      console.log(appId)
           console.log(roleId)

      getResourceList4Permission(appId,roleId).then(response => {
        // console.info(response)
        let permissions = response.data;
        let arrKeys = [];
        for(let key in permissions){
          // console.info(key)
          let temp = this.getBindKeys(permissions[key]);
          // console.info(temp)
          arrKeys = arrKeys.concat(temp)
        }
        // console.info(arrKeys)
        this.permissionKeys = Array.from(new Set(arrKeys))
        this.permissionTree = permissions;

          console.log(permissions)


      });
    },
    // 筛选节点
    filterNode(value, data) {
      // console.info(data)
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      // console.info(data)
      this.queryParams.companyId = data.companyId;
      this.getList();
    },
    /** 查询部门树结构 */
    getDeptTreeselect() {
      deptTreeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      // 目前被选中的部门节点
      let checkedKeys = this.$refs.dept.getCheckedKeys();
      // 半选中的部门节点
      let halfCheckedKeys = this.$refs.dept.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    // 所有权限节点
    getPermissionAllCheckedKeys(){
      // 目前被选中的部门节点
      // console.info(this.$refs)
      let checkedKeys = [];
      let halfCheckedKeys = [];
      this.$refs.permission.map(item=>{
        checkedKeys =  checkedKeys.concat(item.getCheckedKeys())
        // 半选中的部门节点
        halfCheckedKeys =  halfCheckedKeys.concat(item.getHalfCheckedKeys())
      })
      // console.info(checkedKeys)
      // console.info(halfCheckedKeys)
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    /** 根据角色ID查询菜单树结构 */
    getRoleMenuTreeselect(roleId) {
      return roleMenuTreeselect(roleId).then(response => {
        this.menuOptions = response.menus;
        return response;
      });
    },
    /** 根据角色ID查询部门树结构 */
    getRoleDeptTreeselect(roleId) {
      return roleDeptTreeselect(roleId).then(response => {
        this.deptOptions = response.depts;
        return response;
      });
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === "1" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeRoleStatus({roleId:row.roleId,status:row.status});
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.status === "1" ? "2" : "1";
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.form = {
        appId:this.queryParams.appId||this.$store.getters.appId||'',
        roleId: undefined,
        roleName: undefined,
        roleCode: undefined,
        orderNo: 0,
        status: 1,
        roleDesc: undefined,
        branchId: '-1',
        roleType:5,
        companyId: this.queryParams.companyId||''
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if(e.keyCode!=13){
        this.showSearch = false
      }
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
	// 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      if (type == 'permission') {
        this.$refs.permission.forEach((items,index)=>{
          let obj = this.permissionTree;
          let key = Object.keys(obj)[index];
          // console.info(obj[key])
          obj[key].forEach(item=>{
            items.store.nodesMap[item.resourceId].expanded = value;
          })
        })
      }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type == 'permission') {
        this.$refs.permission.forEach((item,index)=>{
          let obj = this.permissionTree;
          let key = Object.keys(obj)[index];
          item.setCheckedNodes(value ? obj[key]: []);
        })
      }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value, type) {
      // console.info(type)
      if (type == 'permission') {
        this.form.permissionCheckStrictly = value ? true: false;
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      // this.getMenuTreeselect();
      this.open = true;
      this.title = "添加角色";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const roleId = row.roleId || this.ids
      // const roleMenu = this.getRoleMenuTreeselect(roleId);
      getRole({ roleId:roleId }).then(response => {
        let data = response.data;
        data.appId = data.appId+'';
        this.form = data;
        this.open = true;
        // this.$nextTick(() => {
        //   roleMenu.then(res => {
        //     this.$refs.menu.setCheckedKeys(res.checkedKeys);
        //   });
        // });
        this.title = "修改角色";
      });
    },
    /** 分配数据权限操作 */
    handleDataScope(row) {
      this.reset();
      this.form.roleId = row.roleId;
      this.form.appId = row.appId;
      const roleDeptTreeselect = this.getResourceListPermission(row.appId,row.roleId);
      this.openDataScope = true
      this.permissionCheckStrictly=false;
      // getRole(row.roleId).then(response => {
      //   this.form = response.data;
      //   this.openDataScope = true;
      //   this.$nextTick(() => {
      //     roleDeptTreeselect.then(res => {
      //       this.$refs.dept.setCheckedKeys(res.checkedKeys);
      //     });
      //   });
      //   this.title = "分配数据权限";
      // });
    },
    /** 提交按钮 */
    submitForm: throttle( function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != undefined) {
            // this.form.menuIds = this.getMenuAllCheckedKeys();
            updateRole(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            // this.form.menuIds = this.getMenuAllCheckedKeys();
            addRole(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    }),
    /** 提交按钮（数据权限） */
    submitDataScope: function() {
      if (this.form.roleId != undefined) {
        this.form.resourceIds = this.getPermissionAllCheckedKeys();
        // console.info(this.form)
        permissionBindResource(this.form).then(response => {
          this.msgSuccess("修改成功");
          this.openDataScope = false;
          this.getList();
        });
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const companyId = this.companyId
      // console.log(this.companyId);
      const roleIds = row.roleId || this.ids;
      this.$confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return branchDelRole({roleId:roleIds,companyId:companyId});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/role/export', {
        ...this.queryParams
      }, `role_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style lang="scss">
  .permission-tree{

    &>td{
      padding-left: 8px;
      border:1px #eee solid;
      margin: 8px 0;
      border-radius: 4px;
      padding-bottom: 4px;
      vertical-align: top;
    }
    .permission-name{
      white-space: nowrap;
      padding-right: 8px;
    }
    /*.el-tree{*/
    /*  width: 100%;*/
    /*  display: flex;*/
    /*  flex-direction: column;*/
    /*  &>.el-tree-nodes{*/
    /*    display: flex;*/
    /*    &>.el-tree-node__content{*/
    /*      min-width: 280px;*/
    /*    }*/
    /*    &>.el-tree-node__childrens{*/
    /*      display: flex;*/
    /*      flex-flow: wrap;*/
    /*      border:1px #eee solid;*/
    /*      border-radius: 4px;*/
    /*      &>.el-tree-node{*/
    /*        min-width: 25%;*/
    /*      }*/
    /*    }*/
    /*  }*/
    /*}*/
  }
</style>
