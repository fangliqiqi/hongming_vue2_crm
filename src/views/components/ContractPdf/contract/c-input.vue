<template>
  <div class="input-vi" style="text-indent:0pt;display: inline-block;cursor:pointer;"  @click="showInput">
    <textarea v-if ="inputShow&&type=='textarea'" ref="input" style="width: 100%;height: 100%"  v-model="value" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></textarea>
    <input :maxlength="max" style="outline: none;border: none;max-width: 100%;height: 100%" ref="input"  :type="type=='input'?'text':type"  v-model="value" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" v-else-if ="inputShow&&type!='textarea'" />
    <span style="display: inline-flex;padding:0 4pt;width: 100%;font-size: 9pt;" v-else :style="{'white-space': wrap||type=='textarea'?'pre-wrap':'nowrap'}">{{value}}</span>
  </div>
</template>

<script>
import index from '../../../../components/Autograph/index.vue';
  export default {
  components: { index },
    name: 'c-input',
    props:{
      value:{
        type:[String,Number],
        default:null
      },
      max:{
        type:Number,
        default: 99999
      },
      type:{
        type:String,
        default:'input'
      },
      wrap:{
        type:[String,Boolean],
        default(){
          let wrap = this.wrap;
          // console.info(wrap)
          return wrap?true:false;
        }
      },
      readonly:{
        type:[Boolean,String],
        default(){
          let readonly = this.readonly;
          return readonly?true:false;
        }
      }
    },
    data(){
      return{
        inputShow:false
      }
    },
    model:{
      prop: 'value',
      event: 'input'
    },
    methods:{
      showInput(type) {
        if(this.readonly) return;
        this.inputShow = !this.inputShow;
        this.$nextTick(_ => {
          this.$refs['input'].focus();
        });
      },
      handleInputConfirm() {
        this.inputShow = !this.inputShow;
        this.$emit('input',this.value);
      }
    }
  }
</script>

<style scoped>

</style>
