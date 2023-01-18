<template>
    <div class="table-data">
      <el-table :data="tableData" v-loading="loading"  style="width: 100%"  @selection-change="handleSelectionChange"  @row-click="handleRowFun" :height="tableHeight+(total>0?0:40)">
        <el-table-column v-for="(items,index) in tableColums"
                         :align="items.align"
                         :class-name="items.clazz"
                         :fixed="items.fixed"
                         :min-width="items.minWidth"
                         :width="items.width"
                         :label="items.label"
        >
          <template slot-scope="scope">
            {{scope.row[items.prop]}}
          </template>
        </el-table-column>
        <el-table-column  :align="controlColum.align" class-name="table-control"  :fixed="controlColum.fixed" :min-width="controlColum.minWidth"
                         :width="controlColum.width" >
          <template slot="header">
            <span >{{controlColum.label}}</span>
            <div class="edit" v-if="controlColum.edit" @click="columnEdit">
              <i class="el-icon-edit-outline"></i>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button
              v-for="item in controlColum.buttons"
              :size="item.size"
              :type="item.type"
              @click="item.func(scope.row)"
              v-hasPermi="['share:bank:edit']"
            >{{item.name}}
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="pageNo"
        :limit.sync="pageSize"
        @pagination="getList"
      />

      <el-dialog :visible.sync="columnEditShow" width="520px" custom-class="dialog-vi" title="自定义列">
        <div class="">
          <div class="title">
            <span></span>
            <span></span>
          </div>
          <div class="" style="border:1px #f00 solid;min-height: 40px">
            <draggable class="wrapper" v-model="checkCol"  :options="{group:{name: 'tableColum'},sort: true}"
                       @start="onStart"
                       @end="onEnd"
                       :move = "onMove"
                       animation="300" >
              <transition-group>
                <div v-for="item in checkCol" :key="item.name" class="item">
                  <p>{{item}}</p>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="" style="border:1px #ff0 solid;min-height: 40px">
          <div class="title">
            <span></span>
            <span></span>
          </div>
          <div class="">
            <draggable class="wrapper" v-model="unCheckCol" :options="{group:{name: 'tableColum'},sort: true}" @start="onStart" @end="onUnEnd" :move = "onMove" animation="300" >
              <transition-group>
                <div v-for="item in unCheckCol" :key="item.name" class="item">
                  <p>{{item}}</p>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import vuedraggable from 'vuedraggable'
  export default {
    name: 'TableData',
    components: {draggable:vuedraggable},
    props:{
      data: { type:[Array,String],
        default(){
          return [];
        }
      },
      columns:{
        type: [Array,String],
        default() {
          return [];
        }
      },
      control:{
        type:Object,
        default(){
          return {}
        }
      },
      loading:{
        type:Boolean,
        default:false
      },
      page:{
        type:Object,
        default(){
          return {}
        }
      },
      total:{
        type:[String, Number],
        default:0
      }
    },
    data(){
      return {
        columnEditShow:false,
        moveId:null,
        checkCol: [],
        unCheckCol: [],
        tableColumArr:[{ name:'1',sort:1,isCheck:true },{ name:'2',sort:2,isCheck:true },{ name:'3',sort:3,isCheck:true },{ name:'4',sort:4 },{ name:'5',sort:5 },{ name:'6',sort:6 },{ name:'7',sort:7 },{ name:'8',sort:8 },{ name:'9',sort:9 },{ name:'10',sort:10 }]
      }
    },
    computed:{
      ...mapGetters(['tableHeight']),
      tableData(){
        return this.data
      },
      tableColums(){
        let columns =this.columns.map(item=>{
          let label = '',prop='';
          for(let key in item){
            if(key!='sort'){
              prop = key;
              label = item[key]
            }
          }
          item.prop = prop
          item.label = label
          return item;
        })
        return columns.map(item=>{
          item.fixed=item.fixed?item.fixed:false;
          item.minWidth = item.minWidth||'80px';
          item.width = item.width||'auto';
          item.label = item.label||'';
          item.align = item.align||'left';
          item.clazz = item.clazz||'';
          item.prop = item.prop||'';
          item.sort = item.sort||1000;
          return item;
        }).sort((a,b)=>{
          var x = 'sort'//要排序字段
          if (a[x] < b[x]) {
            return -1
          }
          if (a[x] > b[x]) {
            return 1
          }
          return 0;
        });
      },
      controlColum(){
        let control = this.control;
        control.fixed=control.fixed?control.fixed:false;
        control.minWidth = control.minWidth||'100px';
        control.width = control.width||'100px';
        control.edit = control.edit===false?false:true;
        control.label = control.label||'';
        control.align = control.align||'center';
        control.clazz = control.clazz||'';
        if(control.buttons&&control.buttons instanceof Array){
          control.buttons = control.buttons.map(item=>{
            item.size = item.size||'mini';
            item.type = item.type||'danger';
            item.func = item.func||function() {

            }
            return item;
          });
        }else{
          control.buttons = [];
        }
        return control
      },
      pageNo:{
        get(){
          return this.page.pageNo||1;
        },
        set(val){
          this.$emit(':update',val)
        }
      },
      pageSize:{
        get(){
          return this.page.pageSize||10;
        },
        set(val){
          this.$emit(':update',val)
        }
      },


    },
    methods:{
// 多选框选中数据
      handleSelectionChange(selection) {
        let ids = selection.map(item => item.id)
        let single = selection.length !== 1
        let multiple = !selection.length
        this.$emit('selectionChange',ids, single, multiple);
      },
      handleRowFun(row, column, event) {
        if (column.property && column.property != undefined && column.property != 'undefined') {
          this.$emit('rowClick',row, column, event)
        }
      },
      columnEdit(){
        // console.info(arguments)
        let checkCol = [],
          unCheckCol = [];
        this.tableColumArr.forEach(item=>{
          if(item.isCheck == true){
            checkCol.push(item)
          }else{
            unCheckCol.push(item)
          }
        });
        this.checkCol = checkCol;
        this.unCheckCol = unCheckCol;
        this.columnEditShow=true;
      },
      getList(){
        this.$emit('getList',this.pageNo,this.pageSize);
      },
      columnTab(funcName,row){
        this.$emit(funcName,row);
      },
      onStart(e){
        // console.info(e)

      },
      onEnd(e){
        // this.checkCol.splice(e.newDraggableIndex, 1)
        this.checkCol= this.checkCol.map((item,index)=>{
          item.sort = index
          item.isCheck = true
          return item
        })
        this.unCheckCol= this.unCheckCol.map((item,index)=>{
          item.sort = index
          item.isCheck = false
          return item
        })
      },
      onUnEnd(e,type){
        // this.unCheckCol.splice(e.newDraggableIndex, 1)
        this.checkCol= this.checkCol.map((item,index)=>{
          item.sort = index
          item.isCheck = true
          return item
        })
        this.unCheckCol= this.unCheckCol.map((item,index)=>{
          item.sort = index
          item.isCheck = false
          return item
        })
      },
      onMove(e,originalEvent){
        //console.info(e.relatedContext)
        this.moveId=e.relatedContext.element.name;
      }
    }
  }
</script>

<style lang="scss">
.dialog-vi{
  margin-top: 0px!important;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  .wrapper{
    min-height: 20px;
  }
}
</style>
