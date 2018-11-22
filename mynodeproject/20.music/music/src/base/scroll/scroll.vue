<!-- 这个是封装的公用的scroll滚动组件 -->

<template>
  <div class="scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default{
    props:{
      top:{
        type:String,
        default:function () {
          return '0px'
        }
      },
      probeType:{// 监听哪种滚动方式，快速，慢速等等
      /* 默认值 0 ：不派发scroll事件；
                1：会非实时，就是在屏幕滑动超过一定时间后，派发scroll事件；
                2：会在屏幕滑动的过程中实时派发scroll事件；
                3：不仅在屏幕滑动的时候会实时的派发滚动事件，而且在momentnum滚动动画运行过程中实时派发scroll事件 */
        type:Number,
        default:1
      },
      click:{// 是否派发点击事件
        type:Boolean,
        default:true
      },
      data:{// 里面的数据，需要init的
        type:Array,
        default:null
      },
      listenScroll:{// 要不要监听滚动事件
        type:Boolean,
        default:false
      },
      pullup:{ // 上拉加载
        type:Boolean,
        default:false
      },
      beforeScroll:{
        type:Boolean,
        default:false
      }

    },
    mounted () {
      this._initScroll()
    },
    methods:{
      _initScroll () {
        if (!this.$refs.wrapper) {
          return true
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType:this.probeType,
          click:this.click
        })
        if (this.listenScroll) {
          let _this = this
          _this.scroll.on('scroll', (pos) => {
            _this.$emit('scroll', pos)
          })
        }
        if (this.pullup) { // 如果开启上拉加载
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= this.scroll.maxScrollY + 50) { // 在块滚到底部的时候去触发加载事件
              this.$emit('scrollToEnd')
            }
          })
        }
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () { // 刷新数据
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch:{
      data () { // 如果数据有变化的时候重新刷新scroll,重新计算高度之类的
        this.refresh()
      },
      top () { // 动态改变scroll的高度的时候，也让scroll刷新
         this.refresh()
      }
    }

  }
</script>

<style lang="stylus" scoped>

</style>
