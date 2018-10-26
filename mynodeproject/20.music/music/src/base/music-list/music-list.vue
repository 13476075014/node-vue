<!-- 这个是歌手详情页的模板 , 推荐点开的详情页-->

<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn" @click="playRandomList">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="bglayer"></div>
    <scroll
      :top="scrollTop"
      :listenScroll="listenScroll"
      @scroll="myscroll"
      :probeType="probeType"
      v-if="songs.length>0"
      :data="songs"
      class="list"
      ref="list">
      <div class="song-list-wrapper">
        <song-list
          :songs="songs"
          :rank="rank"
          @select="selectItem">
        </song-list>
      </div>
    </scroll>
    <div class="loading-container" v-show="!songs.length>0">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import loading from '@/base/loading/loading'
import scroll from '@/base/scroll/scroll'
import songList from '@/base/song-list/song-list'
import {mapActions} from 'vuex'
import {playlistMixin} from '_common/js/mixin'

  export default{
    mixins:[playlistMixin],
    data:function () {
      return {
        scrollTop:'0px',
        REMAIN_HEIGHT:60, // 滚动的时候最高只能到的位置，就是留出头部图片的高度
        probeType:3, // 实时监控scroll滚动事件
        listenScroll:true // 要不要监听滚动，true的话，就会派发scroll事件
      }
    },
    props:{
      bgImage:{ // 背景图片
        type:String,
        default:''
      },
      songs:{// 歌曲
        type:Array,
        default:function () {
          return []
        }
      },
      title:{ // 歌曲标题
        type:String,
        default:''
      },
      rank:{
        type:Boolean,
        default:false
      }
    },
    computed:{
      bgStyle () {
        return `background-image:url(${this.bgImage})`
      }
    },
    methods:{
      myscroll (pos) { // 滚动的实时事件
         this.scrollY = pos.y // 获取滚动的y高度
          if (pos.y >= -(this.maxscroll)) { // 实现往上滑的时候遮盖图片一部分的效果
            this.$refs.playBtn.style.display = ''
            this.$refs.bgImage.style.zIndex = '-1'
            this.$refs.bgImage.style.paddingTop = '70%'
            this.$refs.bglayer.style.transform = `translate(0,${pos.y}px)` // 让有一种整体网上遮盖一点
         } else {
            // 图片的效果
          this.$refs.playBtn.style.display = 'none'
          this.$refs.bgImage.style.zIndex = '10'
          this.$refs.bgImage.style.paddingTop = `${this.REMAIN_HEIGHT}px`
         }

         if (pos.y >= 0) { // 向下拉的时候出现图片放大的效果
          let scaleImg = 1 + Math.abs(pos.y / parseInt(this.scrollTop))
          this.$refs.bgImage.style.transform = `scale(${scaleImg})`
          // this.$refs.bgImage.style.filter = 'none'
         } else {
           // this.$refs.bgImage.style.filter = 'blur(2px)'
         }
      },
      back () { // 返回按钮事件
        this.$router.back()
      },
      selectItem (song, index) {
          this.selectPlay({
            song:this.songs,
            index:index
          }) // 调用在action中定义的方法，来重定义全局数据
      },
      playRandomList () {
        this.randomPlay({list:this.songs})
      },
      handlePlaylist (playlist) { // 通过mixin处理如果底部有小音乐播放器，被遮住的问题
        const bottom = playlist.length > 0 ? '60px' : ''
        if (this.songs.length > 0) {
           this.$refs.list.$el.style.bottom = bottom
           this.$refs.list.refresh() // 刷新scroll组件
        }
      },
      ...mapActions(['selectPlay', 'randomPlay'])
    },
    mounted () {
      if (this.songs.length > 0) {
         this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
        this.scrollTop = `${this.$refs.bgImage.clientHeight}px`
        this.maxscroll = parseInt(this.scrollTop) - this.REMAIN_HEIGHT
      }
    },
    components:{
      scroll,
      songList,
      loading
    }
  }
</script>

<style lang="stylus" scoped>
@import "~_common/stylus/variable"
@import "~_common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
