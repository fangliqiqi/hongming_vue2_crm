<template>
  <div class="step_vi">
    <div class="step_item" @click="stepTap(item,index)" v-for="(item,index) in stepList" :key="'s'+index" :class="{'pointer':itemClick,'is-process':stepIndex>=index}">
      <div>
        <span>{{index+1}}</span>
      </div>
      <div>
        <span v-html="item.name"></span>
        <div class="child" v-if="item.child&&item.child.length>0">
          <el-tag v-for="(ite,idx) in item.child" size="min" :type="ite.curr?'warning':'info'" :key="'s'+index+'c'+idx">
            {{ite.name}}
          </el-tag>
        </div>
      </div>
      <span></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Steper',
    props:{
      stepList:{
        type:Array,
        default(){
          return []
        }
      },
      active:{
        type: Number,
        default:0
      },
      itemClick:{
        type:Boolean,
        default:false
      }
    },
    computed:{
      stepIndex:{
        get(){
          return this.active
        },
        set(val){
          this.$emit('update:active',val)
        }
      }
    },
    methods:{
      stepTap:function(item,index) {
        if(this.itemClick){
          this.$emit('update:active',index)
        }
      }
    }

  }
</script>
<style lang="scss">
  .step_vi{
    .step_item{
      .child{
        margin-left: 4px;
        .el-tag{
          width: 24px;
          height: 20px;
          border-radius: 2px;
          padding: 0 !important;
          box-sizing: border-box;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .pointer{
    cursor: pointer;
  }
 
  .step_vi {
    background-color: #FFFFFF;
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    max-width: 100%;
    .step_item {
      flex-basis: 100%;
      z-index: 10;
      display: flex;
      align-items: center;
      margin-right: 8px;
      & > div:first-child {
        width: 20px;
        min-width: 20px;
        height: 20px;
        background: #E6E7EB;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          text-align: center;
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
      & > div:nth-child(2) {
        margin-left: 8px;
        display: flex;
        align-items: center;
        & > span {
          color: #565759;
          white-space: nowrap;
        }
        .child{
          display: flex;
          align-items: center;
        }
      }
      & > span {
        flex: 1;
        border-top: 1px solid #E6E7EB;
        max-height: 1px;
        margin-left: 8px;
        min-width: 12px;
      }
      &.is-process {
        & > div:first-child {
          background: #4977E0;
          
        }
        &>div:nth-child(2){
          &>span:first-child{
            color:#3978E7 ;
          }
        }
      }
      &:last-child {
        display: inline-flex;
        flex: auto;
        & > span {
          display: none;
        }
      }
    }
  }
  
</style>
