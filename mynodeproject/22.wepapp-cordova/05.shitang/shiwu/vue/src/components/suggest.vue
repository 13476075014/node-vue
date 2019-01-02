<template>
<transition name="leftIn">
  <div class="suggest" v-if="show">
    建议
  </div>
</transition>
</template>

<script>
export default {
  data () {
    return {
      show: {
        type: Boolean,
        default: false
      }
    }
  },
  created () {
    this.$emit('changtab', '2')
    setTimeout(() => {
      this.show = true
    }, 20)
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin'

.leftIn-enter-active
  transition all linear .2s
.leftIn-enter,.leftIn-leave-to
  transform translateX(100%)
.suggest
  position fixed
  top 45px
  bottom 60px
  left 0
  width 100%
  z-index 99
  background rgb(244,244,244)
  color $color-text-l
  text-align center
</style>
