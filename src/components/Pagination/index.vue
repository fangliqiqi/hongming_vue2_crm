<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: ' prev, pager, next,sizes, jumper, ->, total, slot'
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
 
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      //  console.log("条数");
       this.$emit('update:page', 1)
      this.$emit('pagination', { page: 1, limit: val })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    },
    handleCurrentChange(val) {
        // console.log("页数");

      this.$emit('pagination', { page: val, limit: this.pageSize })
     
    }
  }
   
    
  
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  height: 64px;
  box-sizing: border-box;
  padding: 0 !important;
  margin: 0 !important;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
}
.pagination-container.hidden {
  display: none;
}
</style>
<style lang="scss">
  .pagination-container{
    .el-pagination{
      .el-pagination__rightwrapper{
        display: flex;
        flex-direction: row;
        align-items: center;
        .el-pagination__total{
          height: 24px;
          line-height: 24px;
        }
      }
      span:not([class*=suffix]), button{
        height: 24px;
      }
      .el-pagination__sizes{
        display: inline-flex;
        flex-direction: row;
        align-items: center;
      }
      .el-pagination__jump{
        display: inline-flex;
        flex-direction: row;
        align-items: center;
      }
    }
    .el-pager{
      li{
        box-sizing: border-box;
        font-weight: 400 !important;
        width: 24px;
        height: 24px;
        max-width: 24px;
        max-height: 24px;
        min-width: 24px;
        line-height: 24px;
        border-radius: 2px !important;
        margin:0 3px;
      }
      .more::before{
        line-height: 28px;
      }

      .number{
        border: 1px transparent solid !important;
        font-size: 14px !important;
        color: #6E7073 !important;
        &.active{
          border: 1px #3978E7 solid !important;
          color: #3978E7 !important;
        }
        &:hover{
          color: #3978E7 !important;
        }
      }
    }
    .btn-prev,
    .btn-next{
      height: 24px !important;
      line-height: 24px !important;
    }
  }

</style>
