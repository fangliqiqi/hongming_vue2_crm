<template>
    <div class="has-hamburger" :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in permissionRoutes"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                    :parent-path="parPath"
                />
            </el-menu>
        </el-scrollbar>
      <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
                 @toggleClick="toggleSideBar"/>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";
import Hamburger from '@/components/Hamburger'

export default {
  data(){
    return {
      parPath:''
    }
  },
    components: { Hamburger,SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["permission_routes", "sidebar",'curMenu']),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        },
      permissionRoutes(){
         let conlist = this.permission_routes;
         let cur = this.curMenu;


         let childList = conlist.filter(item=>{
           return  item.path == cur
         })

        if(childList.length>0){
          this.parPath = childList[0].path
        }else{
          this.parPath = '';
        }
        return childList.length>0?childList[0].children:childList;
      }

    },
  methods:{
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
  }
};
</script>
<style lang="scss" scoped>
  .hamburger-container {
    width: 100%;
    line-height: 50px;
    height: 50px;
    float: left;
    fill: #355be9;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  &:hover {
     background: rgba(0, 0, 0, .025)
   }
  }
</style>
