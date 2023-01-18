<template>
    <div class="check-box-vi" v-on:$attrs style="text-indent: 0pt;display: inline-flex;align-items: center;box-sizing: border-box;height: 12pt;" @click.stop="changeTap">
      <slot name="suffix"></slot>
      <svg v-if="checked" style="width: 12pt;height: 12pt;" t="1618827797466" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3067" width="200" height="200"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m0 682.666667H213.333333V213.333333h597.333334v597.333334zM767.573333 384l-60.16-60.586667-281.173333 281.173334-110.08-109.653334-60.586667 60.16 170.666667 170.24z" p-id="3068"></path></svg>
      <svg v-else style="width: 12pt;height: 12pt;" t="1618827807878" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="789" width="200" height="200"><path d="M810.666667 213.333333v597.333334H213.333333V213.333333h597.333334m0-85.333333H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z" p-id="790"></path></svg>
      <slot name="prefix"></slot>
      <slot></slot>
    </div>
</template>

<script>
  export default {
    props:{
      checked:{
        type:Boolean,
        default:false
      },
      readonly:{
        type:[Boolean,String],
        default(){
          let readonly = this.readonly;
          return readonly?true:false;
        }
      }
    },
    name: 'checkbox',
    model: {
      prop: 'checked',
      event: 'change'
    },
    methods:{
      changeTap(){
        if(this.readonly) return;
        // console.info(this.checked)
        let checked = !this.checked
        // console.info(checked)
        this.$emit('change',checked);
      }
    }
  }
</script>

<style scoped>
.check-box-vi{
  cursor: pointer;
}
</style>
