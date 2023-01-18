<template>
  <div class="app-container">
    <el-row>
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
                popper-class="search-popover-vi"
                placement="top-start"
                width="400"
                trigger="manual"
                v-model="showSearch"
              >
                <div class="search-popover">
                  <el-form :model="queryParams"
                           ref="queryForm"
                           :inline="true"
                           label-width="120px"
                           label-position="left">
                    <el-form-item label="岗位编码" prop="postCode">
                      <el-input
                        v-model="queryParams.postCode"
                        placeholder="请输入岗位编码"
                        clearable
                        size="small"
                        @keyup.enter.native="handleQuery"
                      />
                    </el-form-item>
                    <el-form-item label="岗位名称" prop="postName">
                      <el-input
                        v-model="queryParams.postName"
                        placeholder="请输入岗位名称"
                        clearable
                        size="small"
                        @keyup.enter.native="handleQuery"
                      />
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                      <el-select v-model="queryParams.status" placeholder="岗位状态" clearable size="small">
                        <el-option
                          v-for="dict in statusOptions"
                          :key="dict.dictValue"
                          :label="dict.dictLabel"
                          :value="dict.dictValue"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                  </el-form>
                  <div class="popover-footer">
                    <el-button size="small" @click="resetQuery">重置</el-button>
                    <el-button type="primary" size="small" @click="handleQuery"
                    >确认
                    </el-button
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
                v-model="queryParams.companyName"
                placeholder="请输入客户简称或表编号或税号"
                clearable
                size="small"
                style="width: 240px"
                suffix-icon="el-icon-search"
                @keyup.enter.native="handleQuery"
              />
              <el-button
                class="ml8"
                icon="el-icon-plus"
                type="primary"
                @click="handleAdd"
              >新增职务
              </el-button>
<!--              <el-button-->
<!--                class="ml8"-->
<!--                icon="el-icon-upload2"-->
<!--                size="small"-->
<!--                @click="handleExport"-->
<!--                v-hasPermi="['crm:log:export']"-->
<!--              >导出-->
<!--              </el-button>-->
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
                         :value="item.appId" :name="item.appId"></el-tab-pane>
          </el-tabs>
          <div class="top-right-btn">
            <el-tooltip class="item" effect="dark" content="刷新" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery"/>
            </el-tooltip>
          </div>
        </div>

        <div class="table-data">
          <el-table v-loading="loading" :data="postList" :height="tableHeight" :default-sort = "{prop: 'orderNo', order: 'ascending'}"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="岗位名称"  prop="dutyName"/>
<!--            <el-table-column label="岗位编号"  prop="dutyId"/>-->
            <el-table-column label="岗位编码"  prop="dutyCode"  width="200"/>
            <el-table-column label="简介"  prop="description" width="520"/>
            <el-table-column label="岗位排序"  prop="orderNo"/>

            <el-table-column label="状态"  prop="status" >
              <template slot-scope="scope">
                <el-tooltip :content="statusFormat(scope.row)" placement="top">
                  <el-switch v-model="scope.row.status"
                             active-color="#dcdfe6"
                             inactive-color="#3978e7"
                             :active-value="2"
                             :inactive-value="1"
                             @change="(val)=>switchChange({status:val,dutyId:scope.row.dutyId})"
                  >
                  </el-switch>
                </el-tooltip>
              </template>
            </el-table-column>
<!--            <el-table-column label="创建时间" align="center" prop="createTime" width="180">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ parseTime(scope.row.createTime) }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="120">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:post:edit']"
                >修改
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['system:post:remove']"
                >删除
                </el-button>
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
        </div>
      </el-col>
    </el-row>


    <!-- 添加或修改岗位对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="704px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="公司" prop="companyId">
              <el-cascader
                class="mw100"
                v-model="form.companyId"
                :props="{ emitPath:false,checkStrictly: true,label:'name',value:'companyId' }"
                placeholder="选择公司"
                :options="companyOptions"
                filterable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位名称" prop="dutyName">
              <el-input v-model="form.dutyName" placeholder="请输入岗位名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="orderNo">
              <el-input-number v-model="form.orderNo" controls-position="right" :min="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="简介" prop="description">
              <el-input v-model="form.description" type="textarea" placeholder="请输入内容"/>
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
  import { listPost, getPost, delPost, addPost, updatePost, listPostPage, changeStatusPost } from '@/api/system/post'
  import { listCompany } from '@/api/system/company'
  import { mapGetters,mapState } from 'vuex'
  import { isPromise, throttle } from '@/utils/hmt'
  export default {
    name: 'Post',
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
        //公司名称
        companyName: '',
        // 公司树选项
        companyOptions: [],
        // 总条数
        total: 0,
        // 岗位表格数据
        postList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 状态数据字典
        statusOptions: [],
        // 查询参数
        queryParams: {
          pageNo: 1,
          pageSize: 10,
          postCode: undefined,
          postName: undefined,
          status: undefined,
          appId: this.$store.getters.appId
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          dutyName: [
            { required: true, message: '岗位名称不能为空', trigger: 'blur' }
          ],
          dutyCode: [
            { required: true, message: '岗位编码不能为空', trigger: 'blur' }
          ],
          companyId: [
            { required: true, message: '公司不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      companyName(val) {
        this.$refs.tree.filter(val)
      }
    },
    computed:{
      ...mapGetters(['tableHeight']),
      isAddCom: function() {
        return isPromise('/guns-cloud-system/entCompany/queryParentCompany')
      },
       ...mapState({
      userInfo: state => state.user
    })
    },
    created() {
      this.roles = this.userInfo.roleCodes;
      this.getDicts('sys_normal_disable').then(response => {
        this.statusOptions = response.data
      })
      this.getCompanyList()
    },
    methods: {
      /** 查询岗位列表 */
      getList() {
        this.loading = true
        listPostPage(this.queryParams).then(response => {
          this.postList = response.data.rows
          this.total = response.data.totalRows
          this.loading = false
        })
      },
      getCompanyList() {
        listCompany({ name: this.companyName, appId: this.queryParams.appId }).then(response => {
          let companyOptions = this.handleTree(response.data, 'companyId', 'parentId')
          if (companyOptions.length > 0) {
            this.queryParams.companyId = companyOptions[0].companyId
            this.$refs.tree.setCurrentKey(this.queryParams.companyId)
          } else {
            this.queryParams.companyId = ''
          }
          if (this.roles.indexOf("admin") != -1) {
            companyOptions.unshift({ companyId: '-1', name: '主公司' })
          }
          this.companyOptions = companyOptions || []
          this.getList()
        })
      },
      // 岗位状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status)
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          dutyId: '',
          dutyCode: '',
          dutyName: '',
          branchId: '',
          companyId: '',
          orderNo: 0,
          status: 1,
          description: ''
        }
        this.resetForm('form')
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNo = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.postId)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title = '添加岗位'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const postId = row.dutyId || this.ids
        getPost(postId).then(response => {
          this.form = response.data
          this.open = true
          this.title = '修改岗位'
        })
      },
      /** 提交按钮 */
      submitForm: throttle(function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.dutyId) {
              updatePost(this.form).then(response => {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              })
            } else {
              addPost(this.form).then(response => {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              })
            }
          }
        })
      }),
      /** 删除按钮操作 */
      handleDelete(row) {
        const postIds = row.dutyId || this.ids
        this.$confirm('是否确认删除岗位"' + row.dutyName+ '"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delPost({dutyId:postIds})
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('system/post/export', {
          ...this.queryParams
        }, `post_${new Date().getTime()}.xlsx`)
      },
      // 筛选节点
      filterNode(value, data) {
        // console.info(data)
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      // 节点单击事件
      handleNodeClick(data) {
        this.queryParams.companyId = data.companyId
        this.getList()
      },
      switchChange(data){
        changeStatusPost(data)
      }
    }
  }
</script>
