<script>
import * as api from '@/api/oa/customer/group'

export default {
  name: 'GroupDetail',
  props: {
    // 添加标签显隐
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '查看群组详情',
    },
    list:{
      type: Array,
      default: function() {
     		return []
     	}
    },
    group:{
      type: Object,
      default: function() {
      	return {}
      }
    },
    total:{
      type: Number,
      default:0
    },
    queryPage:{
      type: Object,
      default: function() {
      	return {}
      }
    }
  },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非多个禁用
      multiple: true,
      // 总条数
      // total: 0,
      // 表格数据
      // list: [],
      // 群信息
      // group: {},
      // 查询参数
      // query: {
      //   pageNum: 1,
      //   pageSize: 10,
      //   groupId: undefined,
      //   memberName: undefined,
      // },
      memberName:null,
      joinScene: {
        1: '由成员邀请入群（直接邀请入群）',
        2: '由成员邀请入群（通过邀请链接入群）',
        3: '通过扫描群二维码入群',
      },
    }
  },
  created() {
    // this.group = this.$route.query
    // this.query.chatId = this.group.chatId
    // this.getList()
  },
  computed: {
    GroupDetail: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
  },
  methods: {
    getList(data){
     var datas = {
       pageNum:data.page||1,
       pageSize:data.limit||10,
       memberName:this.memberName
     }
    //  console.log(datas)
      this.$emit('getGroupDetail',datas)
    },
  },
}
</script>

<template>
 <el-dialog :title="title" :visible.sync="GroupDetail" >
    <div class="flex aic">
      <el-avatar
        :size="100"
        style="flex:0 0 100px"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      ></el-avatar>
      <div class="info-wrap">
        <div style="margin-bottom: 20px;">{{ group.groupName }}</div>
        <div class="info">
          群主：{{ group.groupLeaderName }} | 创建时间：{{ group.createTime }} |
          群公告：{{ group.notice || '未设置' }}
        </div>
      </div>
    </div>
    <el-input placeholder="请输入群成员" v-model="memberName" clearable style="margin: 20px auto;">
      <el-button slot="append" @click="getList" >查询</el-button>
    </el-input>
    <el-table
      v-loading="loading"
      :data="list"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="群成员" align="center" prop="memberName">
        <template slot-scope="scope">
          {{ scope.row.memberName }}
          <!-- <span
            :style="{color: scope.row.joinType == 1 ? '#4bde03' : '#f9a90b'}"
          >{{ ({1: '@微信', 2: '@企业微信'})[scope.row.joinType] }}</span>-->
          <!-- <i :class="['el-icon-s-custom', ({1: 'man', 2: 'woman'})[scope.row.gender]]"></i> -->
        </template>
      </el-table-column>
      <el-table-column
        label="进群时间"
        align="center"
        prop="joinTime"
        width="180"
      ></el-table-column>
      <el-table-column label="进群方式" align="center" prop="joinScene">
        <template slot-scope="scope">
          <span>{{ joinScene[scope.row.joinScene] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryPage.pageNum"
      :limit.sync="queryPage.pageSize"
      @pagination="getList"
    />
  </el-dialog>
</template>

<style lang="scss" scoped>
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
.el-input {
  display: table;
  width: 30%;
  margin: 40px auto;
}
.info-wrap {
  margin-left: 20px;
  .info {
    color: #aaa;
  }
}
</style>
