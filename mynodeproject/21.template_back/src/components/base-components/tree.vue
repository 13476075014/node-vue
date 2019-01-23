<template>
  <div>
    <el-tree
      class="filter-tree"
      :data="data2"
      default-expand-all
      show-checkbox
      @check="handleCheckChange"
      ref="tree2">
    </el-tree>

  </div>
</template>

<script>
import {dealMenu} from '@/assets/js/menu/methods'
export default {
  data () {
    return {
       data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }]
    }
  },
  created () {
    // console.log(dealMenu())
    this.data2 = dealMenu()
  },
  methods:{
    handleCheckChange (data, checked) {
        // console.log(data, checked)
      }
  }
}
</script>

<style lang="stylus" scoped>
.filter-tree
  background rgb(222,222,222)
  height 300px
</style>
