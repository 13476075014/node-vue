<!-- 这个是公用的头部提示框 -->

<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlagTopTip">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default{
    data () {
      return {
        showFlagTopTip:false // 是否展示这个提示框
      }
    },
    methods:{
      show () {
        this.showFlagTopTip = true
        setTimeout(() => {
          this.showFlagTopTip = false
        }, 1000)
      },
      hide () {
        this.showFlagTopTip = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~_common/stylus/variable'

  .top-tip
    position fixed
    top 0
    width 100%
    z-index 500
    background $color-dialog-background
    &.drop-enter-active,&.drop-leave-active
      transition all 0.3s
    &.drop-enter,&.drop-leave-to
      transform translate3d(0,-100%,0)

</style>
