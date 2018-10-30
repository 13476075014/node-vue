<!-- 这个是在播放歌曲列表点击添加歌曲后出现的页面 -->
<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <!-- 索框部分 -->
      <div class="search-box-wrapper">
        <search-box @query="search" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut"></div>
      <div class="search-result"></div>
    </div>
  </transition>
</template>

<script>
  import SearchBox from '@/base/search-box/search-box'
 /* import {ERR_OK} from '@/api/config'
  import {getHotKey} from '@/api/search'
  import Suggest from '@/components/suggest/suggest'
  import {mapActions, mapGetters} from 'vuex'
  import SearchList from '@/base/search-list/search-list'
  import Confirm from '@/base/confirm/confirm'
  import Scroll from '@/base/scroll/scroll'
  import {playlistMixin} from '_common/js/mixin' */

  export default{
    data () {
      return {
        showFlag:false
      }
    },
    methods:{
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      search () { // 输入搜索框的回调监听事件函数

      }
    },
    components:{
      SearchBox
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~_common/stylus/variable"
  @import "~_common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>
