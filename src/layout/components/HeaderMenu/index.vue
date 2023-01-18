<template>
  <div class="menu-vi">
    <div class="menu-item-vi">
      <div class="menu-item" v-for="(item,index) in showRoutes" v-if="!item.hidden&&item.checked" :key="index"
           @click="toPage(item)" :class="{'active':activeMenu==(item.path==''?'/index':item.path)}">
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="menu-item" @click="showDialog=true">
      <span>更多</span><i class="el-icon-more" style="margin-left: 6px;color: #ffffff"></i>
    </div>
    <!-- <span style="display: inline-block;
    margin-top: 15px;
    position: absolute;
    right: 250px;">
        <el-select v-model="value" placeholder="请选择公司">
    <el-option
      v-for="item in 12"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
    </span> -->
    <el-dialog
      title="菜单管理"
      :visible.sync="showDialog"
      width="520px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div class="btn_vi" >
        <el-button class="btn" v-for="item in showRoutes"  @click.stop="checkRoute(item)" :type="item.checked?'primary':''" plain :icon="item.checked?'el-icon-success':'el-icon-error'">{{item.name}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'HeaderMenu',
    data(){
      return{
        value:'',
        checkRoutes:[],
        showDialog:false
      }
    },
    computed: {
      ...mapGetters([
        'permission_routes', 'sidebar'
      ]),
      //这里是这个用户
      showRoutes(){
        let routes = this.$store.getters.permission_routes||[];
        let checkRoutes = this.checkRoutes||[];
        if(checkRoutes.length>0){
          return routes.filter((item,index)=>{
            return !item.hidden;
          }).map((item,index)=>{
            item.id = item.id||'s1';
            if(checkRoutes.indexOf(item.id)!=-1){
              item.checked=true
            }else{
              item.checked=false
            }
            return item;
          })
        }else{
          return routes.filter((item,index)=>{
            return !item.hidden;
          }).map((item,index)=>{
            item.id = item.id||'s1';
            if(index<5){
              checkRoutes.push(item.id);
              item.checked=true
            }else{
              item.checked=false
            }
            return item;
          })
        }
      },
      activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        // console.info(route)
        let _path = path.split('/').map((item,index)=>{
          if(item==''){
            item = '/'
          }
          return index>1?'':item
        }).filter(item=>item!='').join('');
        this.$store.dispatch('app/changeMenu',_path);
        // console.info(_path)
        return _path;
      }

    },
    created() {
      this.checkRoutes = (localStorage.getItem("HeaderRoute")||'').split(',').filter(item=>(item!=''));
    },
    methods:{
      toPage(item){
        let _path = this.toPath(item);
        let route = this.$route;
        const { meta, path } = route;
        if(_path!=path){
          this.$router.push(_path)
        }
      },
      toPath(menu){
        // console.info(menu)
        if(menu.redirect){
          return '/'+menu.redirect
        }else{
          if(menu.children.length>0){
            return menu.path+'/'+menu.children[0].path
          }
          return menu.path
        }
      },
      checkRoute(item){
        console.info(item)
        let list = this.checkRoutes||[];
        if(item.checked){
          let index = list.indexOf(item.id);
          if (index > -1) {
            list.splice(index, 1);
          }
        }else{
          list.push(item.id)
        }
        this.checkRoutes = [...new Set(list)];
        localStorage.setItem('HeaderRoute',this.checkRoutes);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-vi {
    float: left;
    display: flex;
    /*flex-flow: wrap;*/
    height: 100%;
    margin-left: 0px;
    // max-width:calc(100vw - 239px - 232px);
     max-width:calc(100vw - 239px - 390px);
    width: 100%;
    .menu-item-vi{
      display: flex;
      height: 100%;
      max-width: calc(100% - 102px);
      overflow: hidden;
    }
    .menu-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 24px;
      padding-right: 24px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        background: #2243bf;
      }
      &.active{
        background: #2243bf;
      }
      span {
        font-weight: bold;
        font-size: 16px;
        color: #FFFFFF;
        white-space:nowrap;
      }
    }
  }
  .btn_vi{
    display: flex;
    flex-flow: wrap;
    .btn{
      margin: 6px;
    }
  }
</style>
