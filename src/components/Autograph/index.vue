<template>
    <div class="autograph_cl">
      <el-dialog :visible.sync="show" custom-class="sign_cl" width="100%" :close-on-click-modal="false" title="签名">
        <el-row >
          <el-col style="border: 1px #eee solid;">
            <VueSignaturePad
              id="signature"
              width="100%"
              height="300px"
              ref="signaturePad"
              :options="options"
            />
          </el-col>
        </el-row>
        <div style="display: flex;align-items: center;margin-top: 6pt;justify-content: flex-end;">
          <el-button  @click="undo">撤退</el-button>
          <el-button type="primary"  @click="save">确认</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    props:{
      visible: {
        type: Boolean,
        default:false
      },
      signInfo:{
        type:String,
        default: ''
      }
    },
    name: 'Autograph',
    data: () => ({
      options: {
        penColor: "#010101"
      }
    }),
    computed:{
      show:{
        get() {
          if(this.visible){
            this.signInfo = '';
          }
          return this.visible
        },
        set(val) {
          this.$emit('update:visible', val)
        }
      }
    },
    methods: {
      undo() {

        this.$refs.signaturePad.undoSignature();
      },
      save() {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        // alert("Open DevTools see the save data.");
        // console.log(isEmpty);
        // console.log(data);
        if(isEmpty){
          this.msgError('签名为空不能保存')
        }else{
          this.$emit('signInfo', data)
          this.show = false
          this.$refs.signaturePad.clearSignature();
        }

      },
    }
  }
</script>

<style lang="scss">
  .autograph_cl{
    .sign_cl{
      max-width: 720px;

    }
  }

</style>
