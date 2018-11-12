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
        <search-box ref="searchBox" @query="search" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <Switches @switchItem="switchItem" :switches="switches" :currentIndex="currentIndex"></Switches>
        <div class="list-wrapper">
          <!-- 最近播放 -->
          <scroll ref="songList" class="list-scroll" v-if="currentIndex === 0" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>

          </scroll>
          <!-- 搜索历史 -->
          <scroll ref="searchList" class="list-scroll" v-if="currentIndex === 1" :data="searchHistory">
            <div class="list-inner">
              <searchList
               @deleteOneSH="deleteOneSH"
               @selectSearchHistory="selectSearchHistory"
               :searches="searchHistory">

              </searchList>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest
        :query="query"
        ref="suggest"
        @beforeScroll="beforeScroll"
        @select="saveSearch"></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
  import SearchBox from '@/base/search-box/search-box' // 搜索输入框组件
  import Switches from '@/base/switches/switches' // tab组件
  import Suggest from '@/components/suggest/suggest' // 搜索结果组件
  import Scroll from '@/base/scroll/scroll'
  import SongList from '@/base/song-list/song-list'
  import {mapActions, mapGetters} from 'vuex'
  import Song from '_common/js/song_Class'
  import SearchList from '@/base/search-list/search-list'
  import {searchMixin} from '_common/js/mixin'
  import TopTip from '@/base/top-tip/top-tip'
 /* import {ERR_OK} from '@/api/config'
  import {getHotKey} from '@/api/search'
  import Suggest from '@/components/suggest/suggest'
  import {mapActions, mapGetters} from 'vuex'
  import SearchList from '@/base/search-list/search-list'
  import Confirm from '@/base/confirm/confirm'
  import Scroll from '@/base/scroll/scroll'
  import {playlistMixin} from '_common/js/mixin' */

  export default{
    mixins:[searchMixin],
    data () {
      return {
        showFlag:false,
        query:'',
        currentIndex:0,
        switches:[{'name':'最近播放'}, {'name':'搜索历史'}]
      }
    },
    methods:{
      show () {
        this.showFlag = true
        setTimeout(() => { // 刷新scroll组件，重新计算高度
          if (this.currentIndex === 0) {
            this.$refs.songList.refresh()
          } else {
            this.$refs.searchList.refresh()
          }
        }, 20)
      },
      hide () {
        this.showFlag = false
      },
      search (query) { // 输入搜索框的回调监听事件函数
        this.query = query
      },
      switchItem (index) { // tab组件的高亮切换
        this.currentIndex = index
      },
      selectSong (song, index) {
        if (index != 0) {
          const newsong = new Song(song)
          this.InsertSong(newsong)
          this.showTip()
          /* const newsong = createSong(song, 'yes')
          newsong.getVkeys().then(res => {
             this.InsertSong(newsong) // 在action中定义的插入歌曲到当前播放列表的方法
          }) */
        }
      },
      showTip () {
        this.$refs.topTip.show()
      },
      ...mapActions(['InsertSong'])
    },
    computed:{
      ...mapGetters(['playHistory', 'searchHistory'])
    },
    components:{
      SearchBox,
      Suggest,
      Switches,
      Scroll,
      SongList,
      SearchList,
      TopTip
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
