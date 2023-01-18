<template>
  <div class="app-container">
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
              <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true" label-position="left"
                       label-width="120px">
                <el-form-item label="类型编码" prop="dictTypeCode">
                  <el-input
                    v-model="queryParams.dictTypeCode"
                    placeholder="字典类型编码"
                    clearable
                    size="small"
                    class="mw222"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>
                <el-form-item label="字典名称" prop="dictTypeName">
                  <el-input
                    v-model="queryParams.dictTypeName"
                    placeholder="字典名称"
                    clearable
                    size="small"
                    class="mw222"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>

                <!-- <el-form-item label="权限字符" prop="roleCode">
                  <el-input
                    v-model="queryParams.roleCode"
                    placeholder="请输入权限字符"
                    clearable
                    size="small"
                    class="mw222"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item> -->
                <el-form-item label="字典状态" prop="status">
                  <el-select
                    v-model="queryParams.status"
                    placeholder="状态"
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
              </el-form>
              <div class="popover-footer">
                <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
                <el-button type="cyan" icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
                <el-button size="small" @click="showSearch = false">取 消</el-button>
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search" @click="showSearch = !showSearch">筛选
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.dictTypeName"
            placeholder="请输入字典名称"
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
          >新增
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
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery"/>
        </el-tooltip>
      </div>
    </div>

    <div class="table-data">
      <el-table :height="tableHeight" v-loading="loading" :data="sysDictTypeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column label="id" align="center" prop="dictTypeId"/>
        <el-table-column label="字典名称" align="center" prop="dictTypeName"/>
        <!-- <el-table-column label="类型" align="center" prop="dictTypeClass" /> -->
        <el-table-column label="字典类型编码" align="center" prop="dictTypeCode">
          <template slot-scope="scope">
            <el-button type="text" class="link-type" @click="handleDistdata(scope.row)">{{scope.row.dictTypeCode}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="字典描述" align="center" prop="dictTypeDesc"/>
        <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
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


    <!-- 添加或修改字典类型对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="字典名称" prop="dictTypeName">
          <el-input v-model="form.dictTypeName" placeholder="请输入字典名称"/>
        </el-form-item>
        <el-form-item label="字典类型编码" prop="dictTypeCode">
          <el-input v-model="form.dictTypeCode" placeholder="请输入字典类型编码"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictName}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字典描述" prop="dictTypeDesc">
          <el-input v-model="form.dictTypeDesc" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 字典数据弹窗 -->
    <el-dialog title="字典数据信息" :visible.sync="dictopen" width="70%" append-to-body :close-on-click-modal='false'>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdddict"
          >新增
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdatedict"
          >修改
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDeletedict"
          >删除
          </el-button>
        </el-col>
      </el-row>

      <el-table  :data="sysDictList" @selection-change="handleSelectionChange" :default-sort="{prop:'orderNo'}">
<!--        <el-table-column type="selection" width="55" align="center"/>-->
        <el-table-column label="字典id" align="center" prop="dictId"/>
        <!-- <el-table-column label="字典类型编码" align="center" prop="dictTypeCode" /> -->
        <el-table-column label="字典标签" align="center" prop="dictName"/>
        <el-table-column label="字典键值" align="center" prop="dictCode"/>
        <!-- <el-table-column label="简称" align="center" prop="dictShortName" /> -->
        <!-- <el-table-column label="字典简拼" align="center" prop="dictShortCode" /> -->
        <!-- <el-table-column label="上级代码id" align="center" prop="parentId" /> -->
        <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>
        <el-table-column label="排序" align="center" prop="orderNo"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdatedict(scope.row)"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDeletedict(scope.row)"
            >删除
            </el-button>
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

      <!-- 添加或修改基础字典对话框 -->
      <el-dialog :title="title" :visible.sync="adddistopen" width="600px" append-to-body :close-on-click-modal='false'>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="字典类型编码" prop="dictTypeCode">
            <el-input v-model="form.dictTypeCode" placeholder="请输入字典类型编码" disabled/>
          </el-form-item>
          <el-form-item label="字典标签" prop="dictName">
            <el-input v-model="form.dictName" placeholder="请输入字典名称"/>
          </el-form-item>
          <el-form-item label="字典键值" prop="dictCode">
            <el-input v-model="form.dictCode" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictValue"
              >{{dict.dictName}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序" prop="orderNo">
            <el-input-number v-model="form.orderNo" placeholder="请输入排序"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitdictForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDictTypeList,
    updateDictType,
    updateStatus,
    deleteDictType,
    addDictType,
    checkCode,
    queryDictTypeDetail
  } from '@/api/system/dict/type'
  import { getDictPage, addData, updateDict, deleteDict, queryDictDetail } from '@/api/system/dict/data'
  import { mapGetters } from 'vuex'


  export default {
    name: 'SysDictType',
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
        // 字典类型表格数据
        sysDictTypeList: [],
        // 基础字典表格数据
        sysDictList: [],
        // 状态数据字典
        statusOptions: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNo: 1,
          pageSize: 10,
          dictTypeClass: null,
          dictTypeCode: null,
          dictTypeName: null,
          dictTypeDesc: null,
          status: null,
          appCode: null,
          orderNo: null,
          createUser: null,
          updateUser: null

        },
        // 表单参数
        form: {},
        dictData: {},
        dictopen: false,
        adddistopen: false,
        // 表单校验
        rules: {
          dictTypeCode: [
            { required: true, message: '字典类型编码不能为空', trigger: 'blur' }
          ],
          dictTypeName: [
            { required: true, message: '字典类型名称不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态1：启用 2：禁用 不能为空', trigger: 'blur' }
          ],
          dictName: [
            { required: true, message: '数据名称不能为空', trigger: 'blur' }
          ],
          dictCode: [
            { required: true, message: '数据编码不能为空', trigger: 'blur' }
          ],
          orderNo: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    computed:{
      ...mapGetters(['tableHeight'])
    },
    created() {
      this.getList()
      // 数据字典调用
      this.getDicts('sys_normal_disable').then(res => {
        this.statusOptions = res.data
      })
    },
    methods: {
      /** 查询字典类型列表 */
      getList() {
        this.loading = true
        getDictTypeList(this.queryParams).then(response => {
          // console.log(response)
          // console.log(response.data.rows)
          this.sysDictTypeList = response.data.rows
          this.total = response.data.totalRows
          this.loading = false
        })
      },

      // 字典状态字典翻译
      statusFormat(row, column) {
        // console.log(row)
        return this.selectDictLabel(this.statusOptions, row.status)
      },

      // 取消按钮
      cancel() {
        this.open = false
        this.adddistopen = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          dictTypeId: null,
          dictTypeClass: null,
          dictTypeCode: null,
          dictTypeName: null,
          dictTypeDesc: null,
          status: 1,
          appCode: null,
          orderNo: null,
          createUser: null,
          createTime: null,
          updateUser: null,
          updateTime: null,
          delFlag: null,
          dictId: null,
          dictCode: null,
          dictName: null,
          dictShortName: null,
          dictShortCode: null,
          parentId: null
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
        this.ids = selection.map(item => item.dictTypeId)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title = '添加字典类型'
      },

      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const dictTypeId = row.dictTypeId || this.ids
        queryDictTypeDetail({ dictTypeId: dictTypeId }).then(response => {
          this.form = response.data
          // console.log(this.form)
          this.open = true
          this.title = '修改字典类型'
        })
      },

      /** 提交按钮 */
      submitForm() {
        // console.log(this.form)
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.dictTypeId != null) {
              updateDictType(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.reset()
                  this.getList()
                  this.open = false

                }
              })
            } else {
              addDictType(this.form).then(response => {
                // console.log(response)
                if (response.code === 200) {
                  this.msgSuccess('新增成功')
                  this.reset()
                  this.open = false
                  this.getList()
                }
              })
            }
          }
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const dictTypeIds = row.dictTypeId || this.ids
        this.$confirm('是否确认删除字典类型编号为"' + dictTypeIds + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return deleteDictType({ dictTypeId: dictTypeIds })
        }).then(res => {
          this.msgSuccess('删除成功')
          this.getList()
        }).catch(function() {
        })
      },

      /* ---------字典数据操作----------- **/

      // 获取字典信息数据
      getDictlist(value) {
        getDictPage(value).then(res => {
          // console.log(res)
          if (res.code == 200) {
            this.sysDictList = res.data.rows
            this.total = res.data.totalRows
          }
        })
      },

      // 字典信息 大的弹窗窗口
      handleDistdata(row) {
        this.dictData = row
        this.reset()
        this.dictopen = true
        this.getDictlist(row)
      },

      // 字典信息新增弹窗
      handleAdddict() {
        this.reset()
        this.adddistopen = true
        this.title = '新增字典数据'
        this.form.dictTypeCode = this.dictData.dictTypeCode
      },

      // 修改按钮
      handleUpdatedict(row) {
        // console.log(row)
        const dictId = row.dictId || this.ids
        queryDictDetail({ dictId: dictId }).then(response => {
          this.form = response.data
          // console.log(this.form)
          // console.log(response)
          this.adddistopen = true
          this.title = '修改字典数据'
        })
      },

      // 字典信息提交
      submitdictForm() {
        // console.log(this.form)
        var data = {
          dictTypeCode: this.form.dictTypeCode
        }
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.dictId != null) {
              updateDict(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.getDictlist(data)
                  this.reset()
                  this.adddistopen = false
                }
              })
            } else {
              addData(this.form).then(response => {
                // console.log(response)
                if (response.code == 200) {
                  this.msgSuccess('新增成功')
                  this.getDictlist(data)

                  this.adddistopen = false
                }
              })
            }
          }
        })
      },

      // 字典信息删除
      handleDeletedict(row) {
        // console.log(row)
        const dictId = row.dictId
        var data = {
          dictTypeCode: row.dictTypeCode
        }
        this.$confirm('是否确认删除字典类型编号为"' + dictId + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return deleteDict({ dictId: dictId })
        }).then(res => {
          this.msgSuccess('删除成功')
          this.getDictlist(data)
        }).catch(function() {
        })
      }

      /** 导出按钮操作 */
      // handleExport() {
      //   const queryParams = this.queryParams;
      //   this.$confirm('是否确认导出所有字典类型数据项?', "警告", {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //       type: "warning"
      //     }).then(function() {
      //       return exportSysDictType(queryParams);
      //     }).then(response => {
      //       this.download(response.msg);
      //     }).catch(function() {});
      // }
    }
  }
</script>
<style>


</style>
