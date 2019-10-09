<!-- 这个是一个公用的列表组件  歌手列表，推荐列表等-->
<template>
  <scroll :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType" ref="listview" class="listView" v-if="data.length>0" :data="data">
    <ul>
      <li v-for="(group,index) in data" class="list-group" ref="listGroup" :key="index">
        <h2 class="list-group-title">
          {{group.title}}
        </h2>
        <ul>
          <li v-for="(item,index2) in group.items" :key="index2" class="list-group-item" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li class="item" @click="shortcutListSelect(index)" v-for="(item,index) in shortcutList" :class="{'current':currentIndex == index}" :key="index">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'

export default{
  data () {
    return {
      currentIndex:0,
      allListHeight:[]
    }
  },
  props:{
    data:{
      type:Array,
      default: function () {
        return []
      }
    },
    probeType:{
      type:Number,
      default:3
    },
    listenScroll:{
      type:Boolean,
      default:true
    }
  },
  created () {
   // console.log(this.shortcutList)
  },
  mounted () {
    this.computedHeight()
  },
  components:{
    Scroll,
    loading
  },
  methods:{
    selectItem (item) { // 选中歌曲播放事件
      this.$emit('selectItem', item)
    },
    scroll (pos) { // scroll事件
       const _this = this
       this.allListHeight.forEach((item, index) => {
        if (-pos.y < _this.allListHeight[0]) {
          _this.currentIndex = 0
          return false
        }
        if (-pos.y > item && -pos.y < _this.allListHeight[index + 1]) {
          _this.currentIndex = index + 1
        }
      })
      // this.$emit('scroll', pos)
    },
    computedHeight () { // 计算和保存每个组列表的高度
      const _this = this
      const listGroup = this.$refs.listGroup
      let singerListHeight = 0
      this.$nextTick(function () {
        listGroup.forEach(item => {
        singerListHeight += parseInt(item.clientHeight)
        _this.allListHeight.push(singerListHeight)
      })
      // console.log(_this.allListHeight)
      })
    },
    shortcutListSelect (index) {
      this.currentIndex = index
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
    },
    refresh () {
      this.$refs.listview.refresh()
    }
  },
  computed:{
    // 这个数据是右边的导航栏的数组
    shortcutList () {
      // 通过es6的map方法来循环这个数组，返回一个新数组
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  watch:{
    data (newdata) {
        this.computedHeight()
    }
  }
}
</script>

<style lang="stylus" scoped>
 @import "~_common/stylus/variable.styl"

  .listView
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
