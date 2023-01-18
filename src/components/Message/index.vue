<template>
  <!-- <div> -->
  <div class="  right-menu-item" @click="messagePopUp">
    <!-- v-if="informationNumber!=0" -->
    <el-badge
      :value="informationNumber == 0 ? '' : informationNumber"
      class="badge"
    >
      <i class="el-icon-message-solid "></i>
    </el-badge>

    <el-dialog
      title="消息中心"
      width="704px"
      append-to-body
      custom-class="msg-vi"
      :visible.sync="messageCondition"
    >
      <div class="table-data message">
        <!-- @select='selectCall()' -->
        <el-table
          :data="messageList"
          @select="selectCall"
          @select-all="selectAll"
          v-loading="loading"
        >
          <!--  -->
          <el-table-column
            type="selection"
            width="55"
            align="center"
            prop="strId"
          />
          <el-table-column
            label="消息标题"
            align="center"
            width="110px"
            prop="title"
          >
            <template slot-scope="scope">
              <span
                style="display: inline-block;
        width: 7px;
        height: 7px;
        background: #EF5465; border-radius: 50%;margin-right:6px;"
                 v-if="scope.row.state == 10"
              ></span>

              <span
                :style="{
                  color: scope.row.state == 10 ? '#303133' : '#565759'
                }"
                style="white-space: pre-wrap  !important;"
                >{{ scope.row.title }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="消息内容" align="center" prop="msg">
            <template slot-scope="scope">
              <span
                :style="{
                  color: scope.row.state == 10 ? '#303133' : '#565759'
                }"
                style="white-space: pre-wrap  !important;"
                >{{ scope.row.msg }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            label="发送时间"
            align="center"
            width="140px"
            prop="sendDate"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  color: scope.row.state == 10 ? '#303133' : '#565759'
                }"
                >{{ scope.row.sendDate }}</span
              >
            </template>
          </el-table-column>
        </el-table>

        <div class="mt16 flex jcb aic">
        <el-button plain type="primary" @click="delerUp" :class="idList.length==0?'zhang':''">批量删除</el-button>
         <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNo"
            :limit.sync="queryParams.pageSize"
            @pagination="messagePopUp"
            style="width:500px"
          />
          </div>
      </div>
    </el-dialog>
    <!-- 批量删除 -->
    <el-dialog
      title="提示"
      :visible.sync="deleteCondition"
      width="422px"
      append-to-body
      class="task"
      style="margin-top:14vh;"
    >
      <el-row>
        <el-col :span="24">
          <span
            style="display: inline-block;width:22px;height:22px;background:rgb(243, 162, 96);color:#fff;margin-right:12px;border-radius:50%;text-align: center;line-height:22px;"
            >!</span
          ><span
            style="
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #565759;"
            >是否确定删除？</span
          >
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer bottom">
        <el-button @click="deleteCondition = !deleteCondition">取 消</el-button>
        <el-button type="primary" @click="batchDeleteUP">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  queryMongoDBListPage,
  deleteMongoDBByIds,
  findUnreadMessage,//消息未读条数
} from "@/api/crm/message/message";
export default {
  name: "information",
  props: {
    // queryParams:{
    //       type:Object,
    //       default:null
    // },
    informationNumber: Number
    // informationNumber.test = 'this is a test'
  },
  data() {
    return {
      messageList: [],
      total: 0,
      messageCondition: false, //消息弹窗
      idList: [],
      queryParams: {
        pageNo: 1,
        pageSize: 10
      },
      deleteCondition: false,
      loading:false,
    };
  },
  computed: {
    ...mapGetters(["tableHeight"]),
    newNotice() {
      return this.messageList.filter(item => {
        return item.new == true;
      });
    }
  },

  methods: {
    // 请求消息列表
    ask() {
      queryMongoDBListPage(this.queryParams).then(response => {
        
        this.messageList = response.data.rows;
        this.total = response.data.totalRows;
        // this.information()
        console.log('hahah')
        this.loading = false;

        // this.informationNumber=informationNumber
        // console.info('消息列表')
        // console.info(this.messageList)
        // console.info('状态' + this.informationNumber)
        // for (let item of this.messageList) {
        //   item.sendDate = item.sendDate.substring(0, 10);
        // }
      });
    },
    information(){
      findUnreadMessage().then(res=>{
        this.informationNumber=res.data
        console.log(this.informationNumber)
      })
    },
    messagePopUp() {
      this.idList = [];
      this.loading = true;
      this.messageCondition = true;
      this.ask();
    },

    //批量删除
    delerUp() {
      if(this.idList.length==0){
        // console.info('无' )
        // console.info(this.idList)
      }else{
        // console.info('有')
        // console.info( this.idList)
        this.deleteCondition = true;
      }

    },
    batchDeleteUP() {
      deleteMongoDBByIds(this.idList).then(response => {
        this.ask(), (this.deleteCondition = false);
        this.msgSuccess("删除成功");
      });
    },
    selectCall(row) {
      this.idList = [];
      for (let index of row) {
        this.idList.push(index.strId);
      }
    },
    selectAll(row) {
      this.idList=row
    }
  }
};
</script>

<style lang="scss">
.zhang{
  background-color: #f1f2f3  !important;
  color: #a1a2a6 !important;
  border-color: #f2f3f4 !important;
}
.right-menu-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #fff;
  vertical-align: text-bottom;
  .badge {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
  }
  &.hover-effect {
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
.msg-vi.el-dialog {
  .el-dialog__body {
    /*padding: 22px 24px 0px;*/
    .message {
      .el-table {
        .el-table__body-wrapper {
          /*&::-webkit-scrollbar {display:none}*/
          .el-table__body {
            width: 100%;
          }
        }
        th > .cell {
          color: #a1a2a6;

        }
      }
    }
  }
}
</style>
