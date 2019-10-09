<!-- 这个是头部的导航头模板 -->

<template>
  <div class="head">
    <el-row>
      <el-col style="min-height:1px;" :span="5" class="left">
        <i @click="goBack" v-show="showArrow" class="el-icon-arrow-left"></i>
      </el-col>
      <el-col :span="14">
        {{title}}
      </el-col>
      <el-col :span="5">
        <slot></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '111'
    },
    showArrow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack () {
      this.$emit('back')
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styl/mixin"

.head
  position fixed
  top 0
  width 100%
  margin-bottom 45px
  text-align center
  background white
  color $color-text-l
  line-height 45px
  font-size 20px
  color $color-text-l
  z-index 5
  .left
    text-align left
    font-size 22px
    i
      font-weight 900
</style>
