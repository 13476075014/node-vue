<template>
  <div>
    <el-tree
      class="filter-tree"
      :data="treeDate"
      default-expand-all
      show-checkbox
      @check="handleCheckChange"
      ref="tree2">
    </el-tree>

  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props:{
    treeDate:{
      type:Array,
      default:function () {
        return []
      }
    }
  },
  created () {
    // console.log(dealMenu())
  },
  methods:{
    handleCheckChange (data, checked) {
        this.$emit('handleTreeCheck', data, checked)
      }
  }
}
</script>

<style lang="stylus" scoped>
.filter-tree
  background rgb(222,222,222)
  height 300px
</style>
