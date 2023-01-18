<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/index')">
      <img src="@/assets/logo/mdwt_logo.png" />
    </div>
    <header-menu></header-menu>
    <!--    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>-->

    <div class="right-menu">
      
        <div class="circumscribed" @click="circumscribed">
          <!-- <router-link to="/yzf/indexYZF"> -->
          <el-button plain type="primary" v-if="userInfo.yunFalg==1" style="background-color: transparent;color:#fff;">一键去往云帐房</el-button>
          <!-- </router-link> -->

        </div>
      
      <template v-if="device !== 'mobile'">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <!--        <search id="header-search" class="right-menu-item"/>-->
        <!--  -->

        <!-- <div class="right-menu-item" @click="messagePopUp">
          <el-badge :value="12" class="badge">
            <i class="el-icon-message-solid "></i>
          </el-badge>
        </div> -->
        <message :informationNumber="informationNumber"></message>
        <!--        <el-tooltip content="文档地址" effect="dark" placement="bottom">-->
        <!--          <hmt-doc id="hmt-doc" class="right-menu-item hover-effect"/>-->
        <!--        </el-tooltip>-->

        <!--        <el-tooltip content="布局大小" effect="dark" placement="bottom">-->
        <!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--        </el-tooltip>-->
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <el-avatar size="small" :src="avatar" class="user-avatar"></el-avatar>
          <span class="user-name">{{ name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <!--          <el-dropdown-item @click.native="setting = true">-->
          <!--            <span>布局设置</span>-->
          <!--          </el-dropdown-item>-->
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {
  queryMongoDBListPage,
  findUnreadMessage, //新消息条数
  circumscribedYZF,//一键去往云帐房
} from "@/api/crm/message/message";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Message from "@/components/Message"; //消息
import Search from "@/components/HeaderSearch";
import HmtGit from "@/components/HMT/Git";
import HmtDoc from "@/components/HMT/Doc";
import HeaderMenu from "./HeaderMenu";
import { mapState } from "vuex";
export default {
  components: {
    Breadcrumb,
    Screenfull,
    SizeSelect,
    Search,
    HmtGit,
    HmtDoc,
    HeaderMenu,
    Message
  },
  data() {
    return {
      content:{},
      informationNumber: 0, //消息条数
      queryParams: {
        pageNo: 1,
        pageSize: 10
      }
      // total:0,
    };
  },
  created() {
    
    this.getList();
    console.info('全局变量')
      console.info(this.userInfo)
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "name"]),
     ...mapState({
      userInfo: state => state.user
    }),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val
        });
      }
    }
  },
  methods: {
    getList() {
      let data = JSON.parse(JSON.stringify(this.queryParams));
      findUnreadMessage().then(response => {
        this.informationNumber = response.data;

        // this.total = response.data.totalRows;
        // this.messageList = response.data.rows;
        // for(let item of this.messageList){
        //   item.updateTime=item.updateTime.substring(0,10);
        // }
      });
    },
    circumscribed() {
      
      circumscribedYZF({ userId: this.userInfo.id }).then(response => {
        this.content=response.data
        window.open(this.content.goYZFUrl,'yzf_name')
        // document.getElementById('yzfId').load(this.content.goYZFUrl,'_parent');
      });
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.reload();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(90deg, #3357df, #3860f4);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .circumscribed {
    display: inline-block;
    height: 100%;
    vertical-align: text-bottom;
    padding: 0 15px;
    height: 100%;
    font-size: 18px;
    color: #fff;
    // background-color: #66b1ff;
  }
  .logo {
    float: left;
    margin-left: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100% !important;
    cursor: pointer;
    min-width: 215px;
    img {
      max-width: 124px;
    }
  }
  .hamburger-container {
    line-height: 60px;
    height: 100%;
    float: left;
    fill: #ffffff;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 64px;

    &:focus {
      outline: none;
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

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 24px;
          height: 24px;
        }
        .user-name {
          cursor: pointer;
          font-size: 14px;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
