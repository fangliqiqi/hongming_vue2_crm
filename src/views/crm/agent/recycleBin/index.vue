<template>
  <div class="app-container">
    <!-- 首行搜索框 -->
    <div class="search-vi">
      <!-- <el-row :gutter="24">
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
                  <el-radio-group v-model="queryParams.sourceTypeLv">
                    <el-radio
                      v-for="item in sourceTypeLvList"
                      :key="item.dictCode"
                      :label="item.dictCode"
                    >
                      {{ item.dictCode }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="所在地区" prop="district">
                  <el-select
                    v-model="BusinessList.delSwitch"
                    placeholder="请选择删除开关标识 "
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
                <el-button size="small" type="cyan" @click="resetQuery"
                >重置
                </el-button
                >
                <el-button type="primary" size="small" @click="handleQuery"
                >确认
                </el-button
                >
                <el-button size="small" @click="showSearch = false"
                >取 消
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
            v-model="queryParams.roleName"
            placeholder="请输入角色名称"
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
            @click="handleAdd"
            v-if="false"
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
          </el-dropdown>
          <el-button
            class="ml8"
            icon="el-icon-download"
            size="small"
            @click="handleExport"
            v-hasPermi="['crm:log:export']"
            v-if="false"
          >导出
          </el-button>
        </el-col>
      </el-row> -->
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>
    <!-- 商机等级 -->
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.sourceTypeLv" @tab-click="handleQuery">
      <el-tab-pane
          label="全部商机"
          value="" name=""></el-tab-pane>
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

    <!-- 表格 -->
    <div class="table-data">
      <el-table
        v-loading="loading"
        :data="BusinessList"
        :height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="left"/>
        <el-table-column label="商机名称" align="left" prop="clienteleName"/>
        <el-table-column label="删除人" align="left" prop="deletePerson"></el-table-column>
        <el-table-column label="跟进负责人" align="left" prop="createBy"/>
        <el-table-column label="商机来源" align="left" prop=" customerSource" :formatter="recycleSy"></el-table-column>
        <el-table-column label="最近跟进时间" align="left" prop="updateTime"/>
        <el-table-column label="意向产品" align="left" prop="sourceTypeLv"/>
        <el-table-column label="商机创建时间 " align="left" prop="createTime"/>
        <el-table-column align="left" class-name="table-control" fixed="right" width="120px">
          <template slot="header">
            <span>操作</span>
            <div class="edit">
              <i class="el-icon-edit-outline"></i>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="color:#3978E7"
              @click="handleRestore(scope.row)"
              v-hasPermi="['share:bank:edit']"
            >还原
            </el-button
            >
            <el-button
              size="mini"
              type="text"
              style="color:#EF5465"
              @click="handleCompletelyDelet(scope.row)"
              v-hasPermi="['share:bank:remove']"
            >彻底删除
            </el-button
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


    <!-- 添加或修改公司银行开户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司表id" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司表id"/>
        </el-form-item>
        <el-form-item label="开户行" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入开户行"/>
        </el-form-item>
        <el-form-item label="银行卡帐号" prop="bankAccountNumber">
          <el-input
            v-model="form.bankAccountNumber"
            placeholder="请输入银行卡帐号"
          />
        </el-form-item>
        <el-form-item label="开卡行地址" prop="bankAddress">
          <el-input v-model="form.bankAddress" placeholder="请输入开卡行地址"/>
        </el-form-item>
        <!-- <el-form-item label="创建时间" prop="createDate">
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
        </el-form-item> -->
        <el-form-item label="备注 " prop="remarks">
          <el-input
            v-model="form.remarks"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="删除开关标识" prop="delSwitch">
          <el-select
            v-model="form.delSwitch"
            placeholder="请选择删除开关标识 "
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
    listBank,
    getBank,
    delBank,
    addBank,
    updateBank,
    exportBank
  } from '@/api/crm/bank'
  import { mapGetters } from 'vuex'

  import { BusinessRecycleBin, restore, RecycleBinDelete } from '../../../../api/crm/agent/recycleBin'

  export default {
    name: 'Agent',
    data() {
      return {
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
        title: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNo: 1,
          pageSize: 10,
          sourceTypeLv:null,
          companyId: null,
          bankName: null,
          bankAccountNumber: null,
          bankAddress: null,
          createDate: null,
          updateDate: null,
          remarks: null,
          delSwitch: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          bankAccountNumber: [
            {
              required: true,
              message: '银行卡账号不能为空',
              trigger: 'blur'
            }
          ],
          bankAddress: [
            {
              required: true,
              message: '开卡行地址不能为空',
              trigger: 'blur'
            }
          ],
          bankName: [
            {
              required: true,
              message: '开户行不能为空',
              trigger: 'blur'
            }
          ],
          companyId: [
            {
              required: true,
              message: '公司Id不能为空',
              trigger: 'blur'
            }
          ]
        },
        recycleBinList:[]
      }
    },
    computed: {
      ...mapGetters(['tableHeight'])
    },
    created() {
      this.getDicts('del_switch').then(res => {
        this.delSwitch = res.data
      })
      // 商机来源
       this.getDicts("business_from").then(res => {
        this.recycleBinList = res.data;
        console.log(this.recycleBinList);
      });
      //商机等级
      this.getDicts('source_type_lv').then(res => {
        this.sourceTypeLvList = res.data
      })
      this.getList()
    },
    methods: {
      // 商机来源
      recycleSy(row){
        return this.selectDictLabel(this.recycleBinList, row.customerSource);
      },
      /** 查询商机信息列表 */
      getList() {
        this.loading = true
        let data = JSON.parse(JSON.stringify(this.queryParams))
        data.sourceTypeLv = data.sourceTypeLv == '0' ? null : data.sourceTypeLv
        BusinessRecycleBin(data).then(response => {
          // console.info(response)
          // console.info(data)
          this.BusinessList = response.data.rows
          console.log(this.BusinessList);
          this.total = response.data.totalRows
          this.loading = false
        })
      },
      //还原
      handleRestore(row) {
        let id = row.id
        restore({ id: id }).then(response => {

        })
        this.getList()
        this.msgSuccess('还原成功')
      },
      //彻底删除
      handleCompletelyDelet(row) {
        let id = row.id
        this.$confirm('是否确认彻底删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return RecycleBinDelete({ id: id })
        }).then(() => {
          this.msgSuccess('彻底删除成功')
          this.getList()
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
        }
        this.resetForm('form')
      },
      /** 搜索按钮操作 */
      handleQuery(e) {
        if (e.keyCode != 13) {
          this.showSearch = false
        }
         if (this.queryParams.enteringTime) {
        if (this.queryParams.enteringTime.length !== 0) {
          this.queryParams.enteringStartTime = this.queryParams.enteringTime[0];
          this.queryParams.enteringEndTime = this.queryParams.enteringTime[1];
          delete this.queryParams.enteringTime;
        }
      }
      if (this.queryParams.followTime) {
        if (this.queryParams.followTime.length !== 0) {
          this.queryParams.followStartTime = this.queryParams.followTime[0];
          this.queryParams.followEndTime = this.queryParams.followTime[1];
          delete this.queryParams.followTime;
        }
      }
      if (this.queryParams.accomplishTime) {
        if (this.queryParams.accomplishTime.length !== 0) {
          this.queryParams.accomplishStartTime = this.queryParams.accomplishTime[0];
          this.queryParams.accomplishEndTime = this.queryParams.accomplishTime[1];
          delete this.queryParams.accomplishTime;
        }
      }
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
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title = '添加公司银行开户信息'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const id = row.id || this.ids
        getBank({ id: row.id }).then(response => {
          this.form = response.data
          this.open = true
          this.title = '修改公司银行开户信息'
        })
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateBank(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                }
              })
            } else {
              addBank(this.form).then(response => {
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
        this.$confirm(
          '是否确认删除公司银行开户信息编号为"' + ids + '"的数据项?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(function() {
            return delBank({ id: ids })
          })
          .then(() => {
            this.getList()
            this.msgSuccess('删除成功')
          })
          .catch(function() {
          })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams
        this.$confirm('是否确认导出所有公司银行开户信息数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(function() {
            return exportBank(queryParams)
          })
          .then(response => {
            this.download(response.msg)
          })
          .catch(function() {
          })
      },
      delSwitchFormat(row) {
        return this.selectDictLabel(this.delSwitch, row.delSwitch)
      }
    }
  }
</script>
