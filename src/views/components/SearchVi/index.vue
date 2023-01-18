<template>
  <div class="search_vi">
    <div class="slot_vi">
      <slot></slot>
    </div>
    <div class="msgbox_vi">
      <label>公告</label>
      <div class="msg_vi">
        这里是一条消息，后面也是一条消息，消息轮播这里是...
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchVi'
  }
</script>

<style lang="scss" scoped>
  .search_vi {
    min-height: 56px;
    width: 100%;
    background: #FFFFFF;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-left: 24px;
    .slot_vi {
      min-width: 50%;
      display: flex;
      align-items: center;
     }
    .msgbox_vi {
      max-width: 50%;
      flex: 1;
      height: 32px;
      background: #F8F9FB;
      border-radius: 3px;
      display: flex;
      align-items: center;
      margin-left: 24px;
      margin-right: 24px;
      &>label {
         margin-left: 15px;
         margin-right: 12px;
         color: #3978E7;
         font-size: 16px;
         font-family: YouSheBiaoTiHei;
       }
      .msg_vi {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #6E7073;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
