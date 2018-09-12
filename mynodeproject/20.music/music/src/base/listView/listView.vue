<!-- 这个是一个公用的列表组件 -->
<template>
  <scroll ref="listview" class="listView" v-if="data.length>0" :data="data">
    <ul>
      <li v-for="(group,index) in data" class="list-group" :key="index">
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
        <li class="item" v-for="(item,index) in shortcutList" :key="index">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll'

export default{
  data () {
    return {

    }
  },
  props:{
    data:{
      type:Array,
      default: function () {
        return []
      }
    }
  },
  created () {
   // console.log(this.shortcutList)
  },
  components:{
    Scroll
  },
  methods:{
    selectItem (item) {
      this.$emit('selectItem', item)
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
