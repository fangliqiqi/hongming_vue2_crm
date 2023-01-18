<style lang="scss" scoped>
	.app-container{
		padding: 10px 20px;
    background-color: #FFFFFF;
	}
</style>

<template>
  <div class="app-container">
    <el-tabs :value="active" type="card" style="margin-top: 10px;">
      <el-tab-pane label="员工考勤" name="1">
        <checkList ref="tab1" type="1" @total="totalChange"></checkList>
      </el-tab-pane>
      <el-tab-pane label="员工日报" name="2">
        <dayList ref="tab2" type="2" @total="totalChange"></dayList>
      </el-tab-pane>
      <el-tab-pane label="员工月报" name="3">
        <monthList ref="tab3" type="3" @total="totalChange"></monthList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import checkList from './components/checkList'
import dayList from './components/dayList'
import monthList from './components/monthList'

export default {
  name: 'Welcome',
  components: { checkList, dayList, monthList},
  props: {},
  data() {
    return {
      active: '1',
      total1: 0,
      total2: 0,
      total3: 0,
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    totalChange([type, total]) {
      this['total' + type] = total
    },
  },
}
</script>
