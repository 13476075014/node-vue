<!-- better-scroll 封装的上拉加载下拉刷新组件 -->
<!-- 这个是封装的公用的scroll滚动组件 -->

<template>
  <div class="scroll" ref="wrapper">

    <!-- scroll的内容地方  -->
    <div class="scroll-content">

      <!-- 这里动态传入内容  -->
      <div ref="scroll_main" class="scroll_slot">
        <slot></slot>
      </div>

      <!-- 上拉加载的内容 -->
      <div class="pullup-wrapper" v-if="pullUpLoad">
        <div class="before-trigger" v-if="!isPullUpLoad">
          <span>{{pullUpTxt}}</span>
        </div>
        <div class="after-trigger" v-else>
          <loading></loading>
        </div>
      </div>

      <!-- 下拉刷新内容 -->
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Loading from './base/gw_loading.vue' // 加载动画
  import Bubble from './base/gw_bubble.vue' // 气泡
  import { getRect } from './js/gw_dom' // 封装的方法

  export default{
    data(){
      return {
        isPullUpLoad:false,
        pullUpLoad:false,
        initPullDownTop:-50, // 设置一个初始的下拉加载的绝对头部定位
        pullDownStyle:'top:-50px',
        refreshTxt:'加载成功',
        pullUpTxt:'加载成功',
        beforePullDown:true, //是否还没有出发下拉加载
        isPullingDown:false, //正在触发进行下拉加载事件
        bubbleY:0 // 下拉加载中要用到的下拉的高度
      }
    },
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
      pullDownRefresh:{ // 上拉加载
        type:null,
        default:function(){
          return false
        }
      },
      pulldown:{ // 下拉刷新
        type:Boolean,
        default:false
      },
      pullup:{ // 下拉刷新
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
        const _this = this
        if (!this.$refs.wrapper) {
          return true
        }
        if (this.$refs.scroll_main && (this.pullDownRefresh || this.pullUpLoad)) {
          this.$refs.scroll_main.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType:this.probeType
          ,click:this.click
          ,pullDownRefresh:this.pullDownRefresh
        })
        if (this.listenScroll) {
          let _this = this
          _this.scroll.on('scroll', (pos) => {
            _this.$emit('scroll', pos)
          })
        }

        //下拉刷新的处理
        if(this.pullDownRefresh){
          this.scroll.on('pullingDown',() =>{
            this.beforePullDown = false
            this.isPullingDown = true
            this.$emit('pullingDown') // 对外暴露方法处理刷新数据
          })

          this.scroll.on('scroll',(pos) => {
            if(this.beforePullDown){
              this.bubbleY = Math.max(0,pos.y)
            }else{
              this.bubbleY = 0
            }

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
      forceUpdate(dirty) { // 下拉没有新数据就执行这个方法
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            setTimeout(() => {
              this.beforePullDown = true
              this.refresh()
            }, 300)
          }, 600)
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
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
    components:{
      Bubble,
      Loading
    },
    watch:{
      data () { // 如果数据有变化的时候重新刷新scroll,重新计算高度之类的
        setTimeout(() => {
          this.forceUpdate(true)
        }, 20)
      },
      top () { // 动态改变scroll的高度的时候，也让scroll刷新
         this.refresh()
      }
    }

  }
</script>

<style lang="stylus" scoped>
  .scroll
    height 100%
    width 100%
    overflow hidden
    *
      margin 0
      padding 0
      text-align center
    .scroll-content
      position relative
      .pulldown-wrapper
        position absolute
        left 0
        width 100%
      .scroll_slot
        background rgb(212,212,212)

</style>
