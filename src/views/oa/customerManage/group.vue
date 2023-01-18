<script>
import * as api from '@/api/oa/customer/group'
import GroupDetail from "@/components/groupDetail";
export default {
  name: 'Group',
  components: { GroupDetail },
  data() {
    return {
      // 查询参数
      query: {
        pageNum: 1,
        pageSize:10,
        groupName: undefined,
        beginTime: undefined,
        endTime: undefined,
      },
      // 日期范围
      dateRange: [],
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      dialogVisibleDetail:false,//群组显隐
      groupList:[],//群组表格数组
      groupQuery: {
        pageNum: 1,
        pageSize: 10,
        chatId: undefined,
        memberName: undefined,
      },
      groupObj:{},
      groupTotal:0,
      // groupPage:{
      //   pageNum: 1,
      //   pageSize: 10,
      //   chatId: undefined,
      //   memberName: undefined,
      // }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询 */
    getList(page) {
      if (this.dateRange[0]) {
        this.query.beginTime = this.dateRange[0]
        this.query.endTime = this.dateRange[1]
      } else {
        this.query.beginTime = ''
        this.query.endTime = ''
      }
      page && (this.query.pageNum = page)
      this.loading = true
      api
        .getList(this.query)
        .then(({ rows, total }) => {
          this.list = rows
          this.total = +total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.$refs['queryForm'].resetFields()
      this.getList()
    },
    sync() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      api.sync().then((r) => {
        loading.close()
        this.msgSuccess('后台开始同步数据，请稍后关注进度')
      })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.multiple = !selection.length
    },
    /** 导出按钮操作 */
    handleExport() {
      // const query = this.query;
      // this.$confirm("是否确认导出所有数据项?", "警告", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(function () {
      //     return exportOperlog(query);
      //   })
      //   .then((response) => {
      //     this.download(response.msg);
      //   })
      //   .catch(function () {});
    },
    // 查看群组详情
    getDetail(){
      api.getMembers(this.groupQuery).then((response) => {
          this.groupList = response.rows
          this.groupTotal = response.total
        })
    },
    LookDetail(e){
    //  console.log(e)
     this.groupObj = e
     this.groupQuery.chatId = e.chatId;
     // console.log(this.groupQuery)
     this.getDetail()
     this.dialogVisibleDetail = true
    },
    getGroupDetail(data){
      // console.log(data)
      this.groupQuery.pageNum = data.pageNum,
      this.groupQuery.pageSize = data.pageSize,
      this.groupQuery.memberName = data.memberName
      this.getDetail()
    }
  },
}
</script>

<template>
  <div class="app-container">
    <el-form
      :model="query"
      ref="queryForm"
      :inline="true"
      class="top-search"
      label-width="80px"
    >
      <el-form-item label="群名" prop="groupName">
        <el-input
          v-model="query.groupName"
          placeholder="请输入群名"
          clearable
        />
      </el-form-item>
      <el-form-item label="群主" prop="groupLeader">
        <el-input
          v-model="query.groupLeader"
          placeholder="请输入群主"
          clearable
        />
      </el-form-item>
      <el-form-item label="创建日期">
        <el-date-picker
          v-model="dateRange"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label=" ">
        <el-button
          v-hasPermi="['customerManage:group:query']"
          type="primary"
          @click="getList(1)"
          >查询</el-button
        >
        <el-button
          v-hasPermi="['customerManage:group:query']"
          type="info"
          @click="resetQuery"
          >重置</el-button
        >
        <!-- <el-button
          v-hasPermi="['customerManage:group:export']"
          type="cyan"
          @click="handleExport"
          >导出列表</el-button
        > -->
      </el-form-item>
    </el-form>

    <div class="mid-action">
      <div class="total">
        <!-- 己选
        <span class="num">{{total}}</span> 个客户群-->
        <span>
          <!-- 最近更新：2020-08-25 06:35:00，同步
          <span class="num">{{total}}</span> 条信息 ，-->
          共
          <span class="num">{{ total }}</span> 个客户群
        </span>
      </div>
      <div>
        <el-button
          v-hasPermi="['customerManage:group:sync']"
          type="primary"
          size="mini"
          icon="el-icon-refresh"
          @click="sync"
          >同步客户群</el-button
        >
      </div>
    </div>

    <el-table
      v-loading="loading"
      :data="list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="群名" align="center" prop="groupName" />
      <el-table-column label="群人数" align="center" prop="memberNum" />
      <el-table-column label="群主" align="center" prop="groupLeaderName" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
             @click="LookDetail(scope.row)"
            v-hasPermi="['customerManage:group:view']"
            >查看详情</el-button
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
    <!-- 群相亲组件 -->
    <GroupDetail
     :visible.sync="dialogVisibleDetail"
     :group="groupObj"
     :list="groupList"
     :total='groupTotal'
     :queryPage = 'groupQuery'
     @getGroupDetail='getGroupDetail'
    />

  </div>
</template>

<style lang="scss" scoped>
  .app-container{
    padding: 10px 20px;
  }
.mid-action {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  align-items: center;
  .total {
    background-color: rgba(65, 133, 244, 0.1);
    border: 1px solid rgba(65, 133, 244, 0.2);
    border-radius: 3px;
    font-size: 14px;
    min-height: 32px;
    line-height: 32px;
    padding: 0 12px;
    color: #606266;
  }
  .num {
    color: #00f;
  }
}
</style>
