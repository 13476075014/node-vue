<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <!-- 内层
          width：真正显示在页面上的宽度
          height:真正显示在屏幕上的高度
          viewBox：画的物体的可见面积
          r：半径 cx:x轴坐标 cy:y轴坐标
          stroke-dasharray:要画的周长
          stroke-dashoffset:相对上面的总周长，画的时候的偏移量，就是要画多少周长 -->
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
    <!-- 外层 -->
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
  export default{
    props:{
      radius:{
         type:Number,
         default:100
      },
      percent:{
        type:Number,
        default:0
      }
    },
    data () {
      return {
        dashArray:Math.PI * 50 * 2 // 周长
      }
    },
    computed:{
      dashOffset () {
        return (1 - this.percent) * this.dashArray
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "~_common/stylus/variable"

.progress-circle
  position relative
  circle
    stroke-width 8px
    transform-origin center
    &.progress-background
      transform scale(0.9)
      stroke $color-theme-d
    &.progress-bar
      transform scale(0.9) rotate(-90deg)
      stroke $color-theme

</style>
