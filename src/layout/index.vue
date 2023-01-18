<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container"/>
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" class="tags-view"/>
      </div>
      <app-main v-if="isRouterAlive"/>
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import { connectionSocket } from '@/utils/websocket'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  data(){
    return {
      webS:'',
      isRouterAlive: true
    }
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
        noSidebar: this.$route.meta.noSidebar,
        noTagsView: this.$route.meta.noTagsView||!this.needTagsView
      }
    }
  },
  mounted() {
    this.notifyFun()
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    notifyFun(){
      let that = this;
      // console.info(console)
      let user = this.$store.state.user;
      if(user.id){
        this.closeWebS()
        this.webS =  connectionSocket('/'+user.id,(msg)=>{
          // console.info(msg)
          if(msg.msg){
            this.$notify({
              title: msg.messageType==0?'系统消息':
                msg.messageType==10?'商机提示':
                  msg.messageType==20?'合作商商机更新':
                    msg.messageType==30?'活动购买':
                      msg.messageType==40?'业务下发':
                        msg.messageType==50?'资金预警':
                          msg.messageType==60?'商机预约':
                            msg.messageType==70?'添加合作商':
                              msg.messageType==80?'入账更新':
                                msg.messageType==90?'入账新增':
                                  msg.messageType==100?'会计审核':'',
              message: msg.msg,
              duration:18000,
              type: 'info',
              onClick:function(res) {
                // that.$router.push("/massage?t="+msg.messageType);
                this.close()
              }
            });
            // that.reload()
          }
        })
      }else{
        // this.connSockJS(null,(res)=>{
        //   console.info(res)
        //   this.$notify({
        //     title: '商机提示',
        //     message: res.data,
        //     duration:0,
        //     type: 'info'
        //   });
        // })
      }
    },
    closeWebS:function() {
      if(this.webS){
        this.webS.close();
      }
    },
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }
  .tags-view {
    transition: margin-left .28s;
    width: calc(100% - #{$sideBarWidth});
    margin-left:#{$sideBarWidth};
  }
  .hideSidebar .tags-view {
    width: calc(100% - 54px);
    margin-left:54px;
  }
  .noSidebar .tags-view {
    width: 100%;
    margin-left:0;
    display: none;
  }
  .mobile .fixed-header {
    width: 100%;
  }
</style>
