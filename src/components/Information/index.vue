<template>
  <!-- <div> -->
  <div class="  right-menu-item" @click="messagePopUp">
    <el-badge :value="12" class="badge">
      <i class="el-icon-message-solid "></i>
    </el-badge>
    <el-dialog
      title="消息中心"
      width="704px"
      append-to-body
      :visible.sync="messageCondition"
    >
      <div class="table-data message">
        <el-table :height="tableHeight">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="消息标题" align="center"  width="90px"/>
          <el-table-column label="消息内容" align="center"  />
          <el-table-column label="发送时间" align="center"  width="90px"/>
        </el-table>
      </div>
    </el-dialog>
  </div>
  <!--  -->

  <!-- </div> -->
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "information",
  data() {
    return {
      messageCondition: false //消息弹窗
    };
  },
  computed: {
    ...mapGetters(["tableHeight"])
  },
  methods: {
    messagePopUp() {
      // console.info("消息弹框");
      this.messageCondition = true;
    }
  }
};
</script>

<style lang="scss">
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
.el-dialog {
  height: 662px;
  .el-dialog__body{
      padding: 14px 24px 0px;
.message{
  height: 100%  !important;
  .el-table {
    height: 100%  !important;
    .el-table__body-wrapper{
      height: 100%  !important;
    }
  th > .cell{
  color:#A1A2A6;
  text-align: left;
}
  }
}
}
}

</style>
