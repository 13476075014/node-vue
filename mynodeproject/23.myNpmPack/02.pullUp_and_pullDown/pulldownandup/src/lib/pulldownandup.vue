<template>
  <div id="pulldownandup">
     <scroll class="suggest"
      :pullup="pullup"
      :pulldown="pulldown"
      @scrollToEnd="scrollToEnd"
      :beforeScroll="beforeScroll"
      @beforeScroll="beforeToScroll"
      @pullingDown="onPullingDown"
      :pullDownRefresh="pullDownRefreshObj"
      ref="scroll"
      :data="result">
      <ul class="suggest-list">
        <loading ref="loadtop" id="loadtop" v-show="hasMore2" :title="loadTitle2"></loading>
        <li class="suggest-item" v-for="(item,index) in result" :key="index">
          <p>{{item.username}}</p>
        </li>
        <loading v-show="hasMore" :title="loadTitle"></loading>
      </ul>
      <div v-show="!hasMore && !result.length>0" class="no-result-wrapper">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/lib/base/new_scroll'
import Loading from '@/lib/base/loading'
import NoResult from '@/lib/base/no-result'
import {ratings} from '@/lib/data'

export default{
  props:{
      options:{ // 对外接受参数
        type:Object,
        default:function(){
          return {}
        }
      }
    },
  data () {
      return {
        loadTitle:"正在加载",
        loadTitle2:"正在刷新",
        page:this.options.page | 1, // 当前页数
        perpage:this.options.perpage | 20, // 每一页的条数
        result:[],
        pullup:true, // 是否派发scroll的上拉加载刷新事件
        pulldown:true,
        hasMore2:false,
        hasMore:true, // 是否还有更多数据
        beforeScroll:true ,// 开启scroll组件的beforescrollstart事件的监听
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
      }
    },
  created(){
      this.exampledata = ratings.data
      this.getLocalDate(false)
    },
  methods:{
    scrollToTopEnd(){ // 下拉刷新
      console.log(1)
      this.$refs.scroll.scrollTo(0,0)
      this.hasMore2 = true
      setTimeout(() => {
      this.getLocalDate(false).then(() => {
          this.loadTitle2 = "刷新成功"
          setTimeout(() => {
            this.hasMore2 = false
            this.loadTitle2 = "正在刷新"
          },1000)
      })
    },1000)

    },
    onPullingDown(){
      this.hasMore2 = true
      setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.result.unshift({username:"0000000"})
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 2000)
    },
    beforeToScroll(){ // 开始滚动的监听事件让input失去焦点
        //this.$refs.searchBox.blur() // 让滚动的时候让input失去焦点，让键盘下去
      },
      search (isScroo) { // 搜索接口的访问
        /* eslint-disable no-eval */
        /* eslint-disable no-unused-vars */
        var _this = this

      },
    getLocalDate(isScroo){ // 测试用的，本地获取数据
        if(isScroo){
          const arr = this.exampledata.slice((this.page - 1)*this.perpage,this.page*this.perpage)
          this.result = this.result.concat(arr)
          this.checkMore()
        }else{
          this.result = this.exampledata.slice(0,this.perpage)
          return Promise.resolve()
        }
        this.$refs.scroll.refresh()

      },
    scrollToEnd(){ // 上拉加载刷新的方法，是在scroll快滚到底的时候触发派发的
      if (!this.hasMore) {
        return false
      }
      this.page = this.page + 1
      //this.search(true)
      this.getLocalDate(true)
    },
    checkMore(){ // 判断当前歌曲条数是否是所有的了和更改hasMore是否为真
        if (this.result.length && this.exampledata.length && this.result.length >= this.exampledata.length) {
          this.hasMore = false
        }
    }
  },
  components:{
    Scroll,
    Loading,
    NoResult
  },
  computed:{
     pullDownRefreshObj: function () { // 设置scroll的下拉刷新，默认是false,里面可配置项，threshold:设置顶部下拉的距离，stop:回弹的停留时间
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      }
  },
  watch:{
    result(){
      setTimeout(() => {
        this.$refs.scroll.refresh()
      },20)

    }
  }

}

</script>

<style lang="stylus" scoped>
#pulldownandup
  height 100%
  .suggest
    height 100%
    overflow hidden
    ul
      min-height 100%

</style>

