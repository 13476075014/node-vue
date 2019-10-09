<template>
  <div class="simple-scroll-demo">
    <div class="scroll-list-wrap">
      <scroll ref="scroll"
              :data="items"
              :scrollbar="scrollbarObj"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(startY)"
              @pullingDown="onPullingDown"
              @pullingUp="onPullingUp">
          <!-- <ul class="list-content">
            <li @click="clickItem($event,item)" class="list-item" v-for="(item,index) in items" :key="index">{{item}}</li>
          </ul> -->
          <slot></slot>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import Scroll from '@/base/scroll' // 封装的scroll
import { ease } from '@/assets/js/ease' // 动画

export default {
  data () {
    return {
      scrollbar: false, // 滚动条
      scrollbarFade: true,
      pullDownRefresh: true, // 下拉刷新配置
      pullDownRefreshThreshold: 90, // 下拉刷新离顶部多少触发
      pullDownRefreshStop: 50, // 下拉刷新停留在哪里多久
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载成功',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      startY: 0,
      scrollToX: 0,
      scrollToY: -200,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
      items: [],
      itemIndex: 0
    }
  },
  created () {

  },
  components: {
    Scroll
  },
  watch: {
    scrollbarObj: {
      handler () {
        this.rebuildScroll()
      },
      deep: true
    },
    pullDownRefreshObj: {
      handler () {
        this.rebuildScroll()
      },
      deep: true
    },
    pullUpLoadObj: {
      handler () {
        this.rebuildScroll()
      },
      deep: true
    },
    startY () {
      this.rebuildScroll()
    }
  },
  computed: {
    scrollbarObj: function () { // 这个是配置scroll是否开启滚动条
      return this.scrollbar ? {fade: this.scrollbarFade} : false
    },
    pullDownRefreshObj: function () { // 设置scroll的下拉刷新，默认是false,里面可配置项，threshold:设置顶部下拉的距离，stop:回弹的停留时间
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop),
        txt: '刷新成功'
      } : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
      } : false
    }
  },
  methods: {
    // clickItem (e, item) {
    //   console.log(e)
    //   this.$emit('click', item)
    // },
    scrollTo () {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, ease[this.scrollToEasing])
    },
    onPullingDown () {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift('第几' + +new Date())
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 2000)
    },
    onPullingUp () {
      // 更新数据
      console.log('pulling up and load data')
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = []
          for (let i = 0; i < 10; i++) {
            newPage.push('normalScrollListPage.previousTxt' + ++this.itemIndex + 'normalScrollListPage.followingTxt')
          }
          // this.items = this.items.concat(newPage)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1500)
    },
    rebuildScroll () {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/assets/styl/mixin.styl"
    .simple-scroll-demo
      position: absolute
      left: 0
      top: 45px
      right: 0
      bottom: 78px
      @media screen and (min-width: 42rem)
        flex: 0 0 23rem
      @media screen and (max-width: 42rem)
        flex: 0 0 100%
        /*margin-bottom: 1rem*/
      .scroll-list-wrap
        position relative
        @media screen and (min-width: 42rem)
          /*height: 30rem*/
          height: 100%
        @media screen and (max-width: 42rem)
          /*height: 26rem*/
          height: 100%
        border: none
        transform: rotate(0deg)
        overflow: hidden
</style>
