<!-- 轮播图公用组件 -->
<!-- 使用方法：在调用的时候组件里写类似下面这样
  <div class="sliderinner" v-for="(item,index) in recommends" :key="index">
      <a :href="item.linkUrl">
       <img :src="item.picUrl" alt="">
      </a>
  </div> -->

<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from '_common/js/dom.js'
  export default{
    data () {
      return {
        dots:[],
        currentPageIndex:0 // 当前第几页\
      }
    },
    mounted () {
      // setTimeout(() => {
        this._setSliderWidth(false)
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
        const _this = this
        window.addEventListener('resize', () => {
          if (!this.slider) {
            return false
          }
          _this._setSliderWidth(true)
        })

      // }, 10)// 这里写20毫秒是因为，浏览器去渲染完成的时间最少是17毫秒一般,但我这里写了会出现页面闪动一下
    },
    props:{
      loop:{// 是否轮播
        type:Boolean,
        default:true
      },
      autoPlay:{// 是否自动轮播
        type:Boolean,
        default:true
      },
      interval:{// 自动轮播的间隔
        type:Number,
        default:4000
      }
    },
    methods:{
      _setSliderWidth (isresize) { // 设置轮播里面的宽度，来正常能滚动
        const childGroup = this.$refs.sliderGroup.children // 这里获得的是一个object类型
        var groupWidth = 0
        const sliderWidth = this.$refs.slider.clientWidth
        for (var i = 0; i < childGroup.length; i++) {
          // 1.给每一个里面的滑动的加上一个下面写好样式的class
          addClass(childGroup[i], 'slider-item')
          // 2.给每一个item设置宽度
          childGroup[i].style.width = sliderWidth + 'px'
          // 3.给总的group的宽度都加上一个sliderWidth
          groupWidth += sliderWidth
        }
        if (this.loop && !isresize) { // 如果开启了无缝循环就需要额外加两个item，所以宽度再加两个
                                        // 如果是在窗口宽度改变调用的这个函数，就已经是有加的两个dom了不需要在额外加上两个宽度，在循环的时候就已经加上了相当于
          groupWidth += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = groupWidth + 'px'
      },
      _initSlider () {
         var _this = this
        this.slider = new BScroll(this.$refs.slider, {
          scrollX:true, // 横向滚动
          scrollY:false,
          momentum:false, // 是否有惯性效果
          snap:{
            loop:this.loop,
            threshold:0.1,
            speed:400
          }
        })

        // 让下面的小点跟着改变
        this.slider.on('scrollEnd', () => {
          var pageIndex = this.slider.getCurrentPage().pageX // 获取到当前滑动显示的元素下标
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            clearTimeout(_this.timer)
            _this._play()
          }
        })
      },
      _initDots () {
        var length = this.$refs.sliderGroup.children.length
        this.dots = new Array(length)
      },
      _play () { // 封装的自动轮播的方法
        this.timer = setTimeout(() => {
          // 下面这个是1.0版本之前的写法
          // this.slider.goToPage(pageIndex, 0, 400) // 0是Y方向的的页数，400是X方向轮播花的时间
          // 下面这个是新版本的写法，更方便点
          this.slider.next()
        }, this.interval)
      }
    },
    computed:{
      winWidth () {
        return window.innerWidth
      }
    },
    watch:{
      winWidth (neww, oldw) {
        alert(neww)
      }
    }
  }
</script>

<style scoped lang="stylus">
@import "../../common/stylus/variable"

 .slider
    min-height: 1px
    position relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        cursor pointer
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
