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
              title: msg.messageType==0?'????????????':
                msg.messageType==10?'????????????':
                  msg.messageType==20?'?????????????????????':
                    msg.messageType==30?'????????????':
                      msg.messageType==40?'????????????':
                        msg.messageType==50?'????????????':
                          msg.messageType==60?'????????????':
                            msg.messageType==70?'???????????????':
                              msg.messageType==80?'????????????':
                                msg.messageType==90?'????????????':
                                  msg.messageType==100?'????????????':'',
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
        //     title: '????????????',
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
      this.isRouterAlive = false;            //????????????
      this.$nextTick(function () {
        this.isRouterAlive = true;         //?????????
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
