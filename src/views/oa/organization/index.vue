<script>
import * as api from '@/api/oa/organization'

export default {
  name: 'Organization',
  components: {},
  props: {},
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        isActivate: '',
        department: '',
      },
      dateRange: [],
      treeData: [],
      userList: [],
      status: {
        0: '启用',
        1: '禁用',
        6: '离职',
      },
      statusActivate: {
        1: '已激活',
        2: '已禁用',
        4: '未激活',
        5: '退出企业',
        6: '删除',
      },
      total: 0,
      defaultProps: {
        label: 'name',
        children: 'children',
      },
      form: {},
      dialogVisible: false,
      disabled: false,
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      multipleSelection: [],
      formDepart: {},
      dialogVisibleDepart: false,
      dialogVisibleAvatar: false,
      queryImg: {
        pageNum: 1,
        pageSize: 20,
      },
      totalImg: 0,
      // 表单校验
      rules: Object.freeze({
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        userId: [{ required: true, message: '必填项', trigger: 'blur' }],
        department: [{ required: true, message: '必填项', trigger: 'blur' }],
        joinTime: [{ required: true, message: '必填项', trigger: 'blur' }],
        wxAccount: [{ required: true, message: '必填项', trigger: 'blur' }],
        email: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change'],
          },
        ],
        mobile: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur',
          },
        ],
      }),
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getTree()
    this.getList()
  },
  mounted() {},
  methods: {
    getTree() {
      api.getTree().then(({ data }) => {
        this.treeData = this.handleTree(data)
      })
    },
    getList(page) {
      // console.log(this.dateRange);
      if (this.dateRange[0]) {
        this.query.joinStartTime = this.dateRange[0]
        this.query.joinEndTime = this.dateRange[1]
      }
      page && (this.query.pageNum = page)
      this.loading = true
      api
        .getList(this.query)
        .then(({ rows, total }) => {
          this.userList = rows
          this.total = total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleNodeClick(data) {
      this.query.department = data.id == 1 ? '' : data.id
      this.getList(1)
    },
    edit(data, type) {
      this.form = Object.assign({}, data || { _new: true })
			// console.log(this.form.department)
      this.form.department=JSON.parse(this.form.department);
      // console.log(this.form.department)
      this.dialogVisible = true
      type || !data ? (this.disabled = false) : (this.disabled = true)
    },
    submit() {
      // console.log()
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.form))
          let str1 = form.department
          let str2 = form.isLeaderInDept
          let arr1 = []
          let arr2 = []
          arr1.push(str1)
          form.department = arr1
          arr2.push(str2)
          form.isLeaderInDept = arr2
          // console.log(form)
          api[form._new ? 'addUser' : 'updateUser'](form)
            .then(() => {
              this.msgSuccess('操作成功')
              this.dialogVisible = false
              this.getList(!this.form.id && 1)
            })
            .catch(() => {
              this.dialogVisible = false
            })
        }
      })
    },
    startOrStop(data) {
      // 0: 启用，1：禁用
      let params = {
        userId: data.userId,
        enable: data.enable == 1 ? 0 : 1,
      }
      api.startOrStop(params).then(() => {
        this.msgSuccess('操作成功')
        this.getList()
      })
    },
    /** 删除按钮操作 */
    remove(id) {
      // const operIds = id || this.ids + "";
      this.$confirm('是否确认删除吗?', '警告', {
        type: 'warning',
      })
        .then(function() {
          return api.remove(id)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    syncUser() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      api.syncUser().then(() => {
        loading.close()
        this.msgSuccess('操作成功')
        this.getList()
      })
    },
    batchImport() {},
    departEdit(data, type) {
      this.formDepart = Object.assign(
        {},
        type ? data : { parentId: data.id, pName: data.name }
      )
      this.dialogVisibleDepart = true
    },
    departRemove(id) {
      this.$confirm('是否确认删除吗?', '警告', {
        type: 'warning',
      })
        .then(function() {
          return api.removeDepart(id)
        })
        .then(() => {
          this.getTree()
          this.msgSuccess('删除成功')
        })
    },
    departSubmit() {
      api[this.formDepart.id ? 'updateDepart' : 'addDepart'](this.formDepart)
        .then(() => {
          this.msgSuccess('操作成功')
          this.dialogVisibleDepart = false
          this.getTree()
        })
        .catch(() => {
          this.dialogVisibleDepart = false
        })
    },
    showAvatarDialog() {
      this.dialogVisibleAvatar = true
      this.getImgList(1)
    },
    getImgList() {
      // todo get imgage list
    },
    submitAvatar() {
      this.form.avatarMediaid = g
    },
  },
}
</script>

<template>
  <div class="page app-container">
    <el-form
      class="top-search"
      :model="query"
      ref="queryForm"
      :inline="true"
      label-width="100px"
    >
      <el-form-item label="账号/姓名/手机号" label-width="120px" prop="title">
        <el-input v-model="query.name" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker
          v-model="dateRange"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="激活状态">
        <el-select v-model="query.isActivate">
          <el-option label="已激活" :value="1"></el-option>
          <el-option label="未激活" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-button
          v-hasPermi="['contacts:organization:query']"
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="getList(1)"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <div class="ar mb15">
      <el-button
        v-hasPermi="['contacts:organization:sync']"
        type="primary"
        icon="el-icon-refresh"
        size="mini"
        @click="syncUser"
        >同步成员</el-button
      >
      <el-button
        v-hasPermi="['contacts:organization:import']"
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="batchImport"
        >批量导入</el-button
      >
      <!-- <el-button
        v-hasPermi="['contacts:organization:addMember']"
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="edit()"
        >添加成员</el-button
      > -->
    </div>
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="5" :xs="24">
        <div class="head-container">
          <!-- <div>部门架构</div> -->
          <!-- :filter-node-method="filterNode" -->
          <el-tree
            :data="treeData"
            :props="defaultProps"
            :expand-on-click-node="false"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          >
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span class="fr">
                <i
                  class="el-icon-edit"
                  title="编辑"
                  v-hasPermi="['contacts:organization:editDep']"
                  v-if="node.level !== 1"
                  @click.stop="departEdit(data, 1)"
                ></i>
                <i
                  class="el-icon-plus"
                  title="添加"
                  v-hasPermi="['contacts:organization:addDep']"
                  @click.stop="departEdit(data, 0)"
                ></i>
                <i
                  class="el-icon-minus"
                  title="删除"
                  v-hasPermi="['contacts:organization:removeDep']"
                  v-if="node.level !== 1"
                  @click.stop="departRemove(data.id)"
                ></i>
              </span>
            </div>
          </el-tree>
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="19" :xs="24">
        <el-table
          v-loading="loading"
          :data="userList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            label="姓名"
            align="center"
            prop="name"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="性别" align="center" prop="gender">
            <template slot-scope="scope">{{
              scope.row.gender === 1 ? '男' : '女'
            }}</template>
          </el-table-column>
          <el-table-column label="职务" align="center" prop="position" />
          <el-table-column label="手机号" align="center" prop="mobile" />
          <el-table-column
            label="入职时间"
            align="center"
            prop="joinTime"
            width="160"
          >
            <!-- <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>-->
          </el-table-column>
          <el-table-column label="状态" align="center" prop="isActivate">
            <template slot-scope="scope">{{
              statusActivate[scope.row.isActivate]
            }}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                v-hasPermi="['contacts:organization:view']"
                type="text"
                @click="edit(scope.row, 0)"
                >查看</el-button
              >
              <el-button
                v-hasPermi="['contacts:organization:setStatus']"
                v-if="scope.row.userId !== 1 && scope.row.enable < 2"
                type="text"
                @click="startOrStop(scope.row)"
                >{{ status[scope.row.enable] }}</el-button
              >
              <el-button
                v-if="scope.row.enable < 2"
                v-hasPermi="['contacts:organization:edit']"
                type="text"
                @click="edit(scope.row, 1)"
                >编辑</el-button
              >
              <el-button
                v-if="scope.row.enable < 2"
                v-hasPermi="['contacts:organization:remove']"
                @click="remove(scope.row.userId)"
                type="text"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <pagination
           v-show="total > 0"
          :total="total"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getList()"
        />
      </el-col>
    </el-row>

    <!-- 人员弹窗 -->
    <el-dialog
      :title="(form.id ? (disabled ? '查看' : '修改') : '添加') + '成员'"
      :visible.sync="dialogVisible"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <!-- <el-upload action :show-file-list="false" :on-success="d" :before-upload="d">
            <img v-if="form.avatarMediaid" :src="form.avatarMediaid" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>-->
          <div class="avatar-wrap ac" @click="showAvatarDialog">
            <img
              class="avatar"
              v-if="form.avatarMediaid"
              :src="form.avatarMediaid"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon cc"></i>
          </div>
        </el-col>
        <el-col :span="16">
          <el-form
            ref="form"
            label-position="right"
            :model="form"
            :rules="rules"
            label-width="80px"
            :disabled="disabled"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input
                v-model="form.alias"
                placeholder="可在新闻公告应用的生日祝福等场景使用"
              ></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="userId">
              <el-input
                :disabled="form.id"
                v-model="form.userId"
                placeholder="成员唯一标识，不支持更改，不支持中文"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="name">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input v-model="form.wxAccount"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="department">
              <el-cascader
                v-model="form.department"
                :options="treeData"
                :show-all-levels="false"
                :props="{
                  expandTrigger: 'hover',
                  checkStrictly: true,
                  /** multiple: true,*/ emitPath: false,
                  value: 'id',
                  label:'name',
                }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="职位">
              <el-input v-model="form.position"></el-input>
            </el-form-item>
            <el-form-item label="身份">
              <el-radio-group v-model="form.isLeaderInDept">
                <el-radio :label="0">普通成员</el-radio>
                <el-radio :label="1">上级</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="入职时间">
              <el-date-picker
                v-model="form.joinTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="身份证">
              <el-input v-model="form.idCard"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input v-model="form.qqAccount"></el-input>
            </el-form-item>
            <el-form-item label="座机">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker
                v-model="form.birthday"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder
              ></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="备注">
              <el-input type="textarea" v-model="model"></el-input>
            </el-form-item>-->
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 部门弹窗 -->
    <el-dialog
      :title="(formDepart.id ? '修改' : '添加') + '部门'"
      :visible.sync="dialogVisibleDepart"
    >
      <el-form :model="formDepart" :label-width="80">
        <el-form-item label="部门名称">
          <el-input v-model="formDepart.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" v-if="formDepart.pName">
          <el-input disabled v-model="formDepart.pName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisibleDepart = false">取 消</el-button>
        <el-button type="primary" @click="departSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 选择头像弹窗 -->
    <el-dialog :visible.sync="dialogVisibleAvatar">
      <div slot="title" class="fxbw aic">
        <span>选择头像</span>
        <el-pagination
          class="mr20"
          @current-change="getImgList"
          :current-page="queryImg.pageNum"
          :page-size="queryImg.pageSize"
          layout="total, prev, pager, next"
          :total="totalImg"
        ></el-pagination>
      </div>
      <el-radio-group class="img-wrap" v-model="form.avatarMediaid">
        <el-radio :label="3" v-for="(item, index) in 20" :key="index">
          <!-- <img class="img-li" src="~@/assets/image/login-background.png" alt /> -->
        </el-radio>
      </el-radio-group>
      <div slot="footer">
        <el-button @click="dialogVisibleAvatar = false">取 消</el-button>
        <el-button type="primary" @click="submitAvatar">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

  .page{
    padding: 16px 24px 24px;
  }
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.avatar-wrap {
  height: 200px;
  border: 1px solid #eee;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}
.avatar {
  height: 100%;
}
.avatar-uploader-icon {
  font-size: 58px;
  color: #ddd;
}
.img-wrap {
  height: 340px;
  overflow: auto;
  /deep/.el-radio__input {
    position: absolute;
    right: 0;
  }
}
.img-li {
  width: 115px;
  height: 160px;
}
</style>
