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
              <el-form :model="queryParams"
                       ref="queryForm"
                       :inline="true"
                       label-width="120px"
                       label-position="left">
                <el-form-item label="职位职称" prop="value">
                  <el-select v-model="queryParams.value" placeholder="请选择键值" clearable size="small">
                    <el-option v-for="item in position" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                  <el-input
                    v-model="queryParams.name"
                    placeholder="请输入名称"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>
                <el-form-item label="删除开关标识" label-width="100px" prop="delSwitch">
                  <el-select v-model="queryParams.delSwitch" placeholder="请选择删除开关标识 " clearable size="small">
                    <el-option v-for="item in delSwitch" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"/>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                  <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                </el-form-item>

              </el-form>
              <el-form
                :model="queryParams"
                ref="queryForm"
                :inline="true"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="录入时间">
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

                <el-form-item label="跟进时间">
                  <el-date-picker
                    v-model="queryParams.followTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="成交时间">
                  <el-date-picker
                    v-model="queryParams.accomplishTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="商机等级" prop="sourceTypeLv">
                  <!-- <el-input
                    class="mw222"
                    v-model="queryParams.bankAddress"
                    placeholder="请输入开卡行地址"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"
                  /> -->
                  <el-radio-group v-model="radio">
                    <el-radio
                      v-for="(item, index) in sourceTypeLv"
                      :key="item"
                      :label="index"
                    >{{ item }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="所在地区" prop="district">
                  <el-select
                    v-model="queryParams.delSwitch"
                    placeholder="请选择所在地区 "
                    clearable
                    size="small"
                    class="mw222"
                  >
                    <el-option
                      v-for="item in delSwitch"
                      :key="item.dictId"
                      :label="item.dictLabel"
                      :value="item.dictCode"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" @click="resetQuery">重置</el-button>
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
      <el-tabs v-model="queryParams.clientType" @tab-click="handleQuery">
        <el-tab-pane label="全部" value="" name=""></el-tab-pane>
        <el-tab-pane
          v-for="item in clientType"
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
      <el-table v-loading="loading" :data="positionList" :height="tableHeight" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"/>
<!--        <el-table-column label="主键id" align="center" prop="id"/>-->
        <el-table-column label="职位职称" align="center" prop="value" :formatter="positionFormat"/>
        <el-table-column label="名称" align="center" prop="name"/>
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
        <el-table-column label="备注 " align="center" prop="remarks"/>
        <el-table-column label="删除开关标识" align="center" prop="delSwitch" :formatter="delSwitchFormat"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['share:position:edit']"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['share:position:remove']"
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
    <!-- 添加或修改职位职级名称对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="职级名称 " prop="value">
          <el-select v-model="form.value" placeholder="请选择键值 ">
            <el-option v-for="item in position" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"/>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
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
        </el-form-item>
        <el-form-item label="备注 " prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="删除开关标识" prop="delSwitch">
          <el-select v-model="form.delSwitch" placeholder="请选择键值 ">
            <el-option v-for="item in delSwitch" :key="item.dictId" :label="item.dictLabel" :value="item.dictCode"/>
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
  import {
    listPosition,
    getPosition,
    delPosition,
    addPosition,
    updatePosition,
    exportPosition
  } from '@/api/crm/position'
  import { mapGetters } from 'vuex'
  //职位职级
  export default {
    name: 'Position',
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
        delSwitch: [],
        position: [],
        // 职位职级名称表格数据
        positionList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNo: 1,
          pageSize: 10,
          value: null,
          name: null,
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
              required: true, message: '职级名称不能为空', trigger: 'blur'
            }
          ],
          name: [
            {
              required: true, message: '职位名称不能为空', trigger: 'blur'
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters(["tableHeight"])
    },
    created() {
      this.getDicts('position_value').then(res => {
        this.position = res.data
      }),
        this.getDicts('del_switch').then(res => {
          this.delSwitch = res.data
        })
      this.getList()
    },
    methods: {
      /** 查询职位职级名称列表 */
      getList() {
        this.loading = true
        listPosition(this.queryParams).then(response => {

          this.positionList = response.data.rows
          this.total = response.data.totalRows
          this.loading = false
        })
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          value: null,
          name: null,
          createBy: null,
          createDate: null,
          updateBy: null,
          updateDate: null,
          remarks: null,
          delSwitch: null
        }
        this.resetForm('form')
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },

      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title = '添加职位职级名称'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const id = row.id || this.ids
        getPosition({ id: id }).then(response => {
          this.form = response.data
          this.open = true
          this.title = '修改职位职级名称'
        })
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updatePosition(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                }
              })
            } else {
              addPosition(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('新增成功')
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
        const ids = row.id || this.ids
        this.$confirm('是否确认删除职位职级名称编号为"' + ids + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delPosition({ id: ids })
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams
        this.$confirm('是否确认导出所有职位职级名称数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return exportPosition(queryParams)
        }).then(response => {
          this.download(response.msg)
        }).catch(function() {
        })
      },
      positionFormat(row) {
        return this.selectDictLabel(this.position, row.value)
      },
      delSwitchFormat(row) {
        return this.selectDictLabel(this.delSwitch, row.delSwitch)
      }

    }
  }
</script>
