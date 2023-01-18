<template>
<el-dialog width="800pt"
           title="PDF预览"
           custom-class="pdf-dialog"
           :visible.sync="pdfVisible"
           :close-on-click-modal="false"
           :close-on-press-escape="false">
<!--  <pdf  :src="pdfUrl"> </pdf>-->
  <div style="width: 100%;height: 86vh">
    <iframe :src="pdfUrl" frameborder="0" style="width: 100%; height: 100%"></iframe>
  </div>

</el-dialog>
</template>

<script>
  import pdf from 'vue-pdf'
  export default {
    name: 'pdfShow',
    components:{
      pdf
    },
    props:{
      visible:{
        type:Boolean,
        default:false
      },
      url:{
        type: String,
        required:true,
        default: ''
      }
    },
    computed: {
      pdfVisible: {
        get() {
          if(this.visible){
            // this.initData()
          }
          return this.visible;
        },
        set(val) {
          this.$emit("update:visible", val);
        }
      },
      pdfUrl(){
        return process.env.VUE_APP_CRM_API + this.url;
      }
    },
  }
</script>

<style lang="scss">
  .pdf-dialog{
    margin-top: 3vh !important;
  }
</style>
