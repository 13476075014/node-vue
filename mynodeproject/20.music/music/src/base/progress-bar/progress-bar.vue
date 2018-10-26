<!-- 这个是封装的进度条模板 -->
<template>
  <div class="progress-bar" ref="progressBar" @click="gotoPlay">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <!-- @touchstart.prevent:加上prevent是为了阻止浏览器的默认事件 -->
      <div class="progress-btn-wrapper"
       ref="progressBtn"
       @touchstart.prevent="progressTouchStart"
       @touchmove.prevent="progressTouchMove"
       @touchend="progressTouchEnd"
       >
        <div class="progress-btn"></div>
      </div>

    </div>
  </div>
</template>

<script>
import {prefixStyle} from '_common/js/dom'

const transiform = prefixStyle('transform')
const progressBtnWidth = 16
  export default{
    props:{
      percent:{
        type:Number,
        default:0
      }
    },
    created () {
      this.touch = {}
    },
    methods:{
      progressClick () {

      },
      progressTouchStart (e) { // 进度条的小坨坨的触摸开始事件
        this.touch.initiated = true // 保存状态
        this.touch.startX = e.touches[0].pageX // 触摸点的横坐标
        this.touch.left = this.$refs.progress.clientWidth // 触摸点的横坐标偏移值
      },
      progressTouchMove (e) { // 进度条的小坨坨的触摸在滑动事件
        if (!this.touch.initiated) {
          return false
        }
        const deltax = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltax))
        this._offset(offsetWidth)
      },
      _offset (offsetWidth) { // 改变进度条和小坨坨的位置
        this.$refs.progress.style.width = `${offsetWidth}px` // 动态改变进度条进度的长
        this.$refs.progressBtn.style[transiform] = `translate3d(${offsetWidth}px,0,0)`
      },
      progressTouchEnd (e) { // 进度条的小坨坨的触摸结束事件
        this.touch.initiated = false
        this._triggerPercent()
      },
      _triggerPercent () {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // 进度条的总长度
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      gotoPlay (e) { // 进度条的点击事件，让歌曲进度到点击的位置
        this._offset(e.offsetX)
        this._triggerPercent()
      }
    },
    watch:{
      percent (newper) {
        if (newper >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // 进度条的总长度
          const offsetWidth = newper * barWidth // 当前进度的宽度
          this._offset(offsetWidth)
        }
      }
    }

  }
</script>

<style lang="stylus" scoped>
  @import '~_common/stylus/variable'

  .progress-bar
    height 30px
    .bar-inner
      position relative
      top 13px
      height 4px
      background rgb(0,0,0,0.3)
      .progress
        position absolute
        height 100%
        background $color-theme
      .progress-btn-wrapper
        position absolute
        left -8px
        top -13px
        width 30px
        height 30px
        .progress-btn
          position relative
          top 7px
          left 7px
          box-sizing border-box
          width 16px
          height 16px
          border 3px solid $color-text
          border-radius 50%
          background $color-theme
</style>
