<!-- 这个是公用的播放组件 -->

<template>
  <div class="player" v-if="playList.length > 0">
    <!-- 正常的全屏的播放器 -->
    <transition name="normal">
     <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.image" width="100%" height="100%" alt="">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="currentSong.singer"></h2>
      </div>
      <div class="middle" ref="middle"
        @touchstart.prevent="middleTouchstart"
        @touchmove.prevent="middleTouchmove"
        @touchend="middleTouchend">
        <div class="middle-l" ref="middleLeft">
          <div class="cd-wrapper">
            <div class="cd" :class="cdCls">
              <img class="image" :src="currentSong.image" alt="">
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">
              {{playingLyric}}
            </div>
          </div>
        </div>
        <!-- 歌词部分 -->
        <Scroll class="middle-r" ref="lyricList" v-if="currentLyric" :data="currentLyric.lines">
          <div class="lyric-wrapper">
            <div v-if="currentLyric">
              <p :class="{'current':currentLineNum == indexText}" class="text" ref="lyricLine" v-for="(line,indexText) in currentLyric.lines" :key="indexText">
                {{line.txt}}
              </p>
            </div>
          </div>
        </Scroll>
      </div>
      <!-- 切换唱片背景图片，和歌词展示页面的小点 -->
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot" :class="{'active':currentShow === 'cd'}"></span>
          <span class="dot" :class="{'active':currentShow === 'lyric'}"></span>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l">{{format(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progressBar @percentChange="percentChange" :percent="percent"></progressBar>
          </div>
          <span class="time time-r">{{format(currentSong.duration)}}</span>
        </div>
        <div class="operators">
          <div class="icon i-left" @click="changeMode">
            <i :class="iconMode"></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon i-center" @click="togglePlaying" :class="disableCls">
            <i :class="playIcon"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon" ></i>
          </div>

        </div>
      </div>
    </div>
    </transition>

    <!-- 缩小的播放器 -->
    <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="openFullScreen">
      <div class="icon">
        <img :class="cdCls" :src="currentSong.image" width="40" height="40" alt="">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer"></p>
      </div>
      <div class="control" @click.stop="togglePlaying" :class="disableCls">
        <progressCircle :radius="32" :percent="percent">
          <i class="icon-mini" :class="miniIcon"></i>
        </progressCircle>
      </div>
      <div class="control" @click.stop="show">
        <i class="icon-playlist"></i>
      </div>
    </div>
    </transition>

<!-- 这个是点击已有播放列表的时候弹出来的，播放歌曲列表页面 -->
    <playlist ref="playList"></playlist>

    <audio ref="audio" @ended="end" @timeupdate="updateTime" @canplay="canplay" @error="audioError" :src="currentSong.url"></audio>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {playMode} from '_common/js/config'
import {shuffle} from '_common/js/util'
import progressBar from '@/base/progress-bar/progress-bar'
import progressCircle from '@/base/progress-circle/progress-circle'
import Lyric from 'lyric-parser' // 歌词解析的插件
import Scroll from '@/base/scroll/scroll'
import {prefixStyle} from '_common/js/dom'
import Playlist from '@/components/playList/playList'
import {playerMixin} from '_common/js/mixin'
const mytransform = prefixStyle('transform')

  export default{
    mixins:[playerMixin],
    data () {
      return {
        songReady:false, // 控制是否可以切换歌曲
        currentTime:0,
        currentLyric:null, // 当前歌曲歌词
        currentLineNum:0, // 当前歌词播放的txt所在的行
        currentShow:'cd', // 控制当前是展示的唱片背景还是歌词的小点样式
        playingLyric:'' // 背景部分展示的一条当前播放歌词
      }
    },
    mounted () {
      // this.$refs.audio.volume = 0.2
    },
    created () {
      this.touch = {}
    },
    computed:{
      cdCls () {
        return this.playing ? 'play' : 'pause'
      },
      disableCls () { // 控制歌曲切换的是否可以点击的样式
        return this.songReady ? '' : 'disable'
      },
      playIcon () { // 控制放大版本的播放按钮的播放图标还是暂停图标
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon () { // 动态展示播放模式的图标
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      percent () { // 当前播放的进度百分比
        return this.currentTime / this.currentSong.duration
      }
    },
    methods:{
      back () {
        this.setFullScreen(false) // 关闭全屏
      },
      togglePlaying () { // 改变播放状态
        this.setPlayState(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      openFullScreen () { // 打开全屏
        this.setFullScreen(true)
      },
      canplay () {
        this.songReady = true
      },
      audioError () {
        this.songReady = false
      },
      changeMode () { // 改变当前播放模式后，改变播放列表等
        const mode = (this.mode + 1) % 3 // 通过取余3来循环三种播放的状态
        this.setPlayMode(mode)
        let list = null
        if (mode == playMode.random) {
          list = shuffle(this.sequenceList) // 把播放的列表打乱
        } else {
          list = this.sequenceList
        }
        this.resetCurrentSong(list) // 重置当前播放歌曲的下标
        this.setPlayList(list) // 通过vuex改变播放列表
      },
      resetCurrentSong (list) { // 重置当前播放歌曲
          let index = list.findIndex((item) => { // arr.findIndex是es6的语法，找到满足条件的数组下标index
            return item.id === this.currentSong.id
          })
          this.setCurrentIndex(index)
      },
      next () { // 下一曲
          if (!this.songReady) { // 防止歌曲没有ready的时候连续切换歌曲
            return false
          }
          if (this.playList.length == 1) {
            this.loop()
          } else {
             let index = this.currentIndex + 1
            if (index === this.playList.length) { // 当超过最后一首歌，就放第一首歌
              index = 0
            }
            this.setCurrentIndex(index) // 修改index
          }
          this.songReady = false
      },
      prev () { // 上一曲
         if (!this.songReady) { // 防止歌曲没有ready的时候连续切换歌曲
            return false
          }
           if (this.playList.length == 1) { // 如果只有一首歌的时候，处理歌词出现异常
            this.loop()
          } else {
            let index = this.currentIndex - 1
            if (index === -1) { // 已经是第一首了
              index = this.playList.length - 1
            }
            this.setCurrentIndex(index) // 修改index
          }
          this.songReady = false
      },
      percentChange (percent) { // 进度条拉动事件
         let duration = this.currentSong.duration // 总时长
         this.$refs.audio.currentTime = duration * percent
         if (!this.playing) {
          this.togglePlaying()
         }
         if (this.currentLyric) { // 处理拖动歌曲进度条的时候，歌词的对应问题
           const currentTime = duration * percent
           this.currentLyric.seek(currentTime * 1000)
         }
      },
      updateTime (e) { // 这个是audio标签自带的方法,可以的到歌曲的进度
          // this.currentTime = 0
           this.currentTime = e.target.currentTime
      },
      end () { // audio的内置事件，歌曲播放完了触发这个事件
        if (this.mode === playMode.loop) {
          this.loop()
        } else { // 如果当前播放模式不是循环播放就跳到下一首歌曲
          this.next()
        }
      },
      loop () { // 循环播放的话当前歌曲播放完毕触发的事件
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        if (this.currentLyric) {
          this.currentLyric.seek(0) // 重置到0
        }
      },
      format (interval) { // 处理播放进度
          interval = interval | 0 // 这个是位运算符中的或，相当于向下取整
          let munite = interval / 60 | 0 // 得到分的数字，除以60然后取整
          let second = interval % 60 // 得到秒的数字，不能被60整除的余数都是秒
          second = this.addZero(second)
          return `${munite} : ${second}`
      },
      addZero (num, n = 2) { // 处理数据，补位到n个小数，这里默认是两位小数
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      getLyric () {
        this.currentSong.getLyrics().then(lyric => {
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
          this.currentLineNum = 0
        }).catch(() => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
      },
      handleLyric ({lineNum, txt}) { // 回调方法，当歌词改变的时候，触发这个，返回当前播放歌词行数，和当前歌词
       this.currentLineNum = lineNum
          if (lineNum > 5) {
            let lineEl = this.$refs.lyricLine[lineNum - 5]
            this.$refs.lyricList.scrollToElement(lineEl, 1000)
          } else {
            this.$refs.lyricList.scrollTo(0, 0, 0)
          }
          this.playingLyric = txt // 改变当前播放歌词
      },
      middleTouchstart (e) { // 中间部分的左右滑动展示歌词或者唱片背景=
        this.touch.initiated = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
        this.touch.percent = this.currentShow === 'cd' ? 0 : 1
      },
      middleTouchmove (e) { // 中间部分的左右滑动展示歌词或者唱片背景
        let middleOpacity // 透明度
        if (!this.touch.initiated) {
          return false
        }
        const touch = e.touches[0]
        const delatX = touch.pageX - this.touch.startX
        const delatY = touch.pageY - this.touch.startY
        if (Math.abs(delatY) > Math.abs(delatX)) {
          return false
        }
        const left = this.currentShow == 'cd' ? 0 : -window.innerWidth // 需要移动的起始位置
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + delatX)) // 在触摸滑动的时候，需要滑动的
        // 设置保存一个比率，如果超过10%就在触摸结束后让其位置到想要的位置
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.lyricList.$el.style[mytransform] = 'translate3d(' + offsetWidth + 'px,0,0)'
        middleOpacity = 1 - this.touch.percent
        this.$refs.middleLeft.style.opacity = middleOpacity
        // console.log(this.$refs.lyricList.$el, width)
      },
      middleTouchend () { // 中间部分的左右滑动展示歌词或者唱片背景
        let offsetWidth // 偏移量
        let middleOpacity // 透明度
        if (this.currentShow === 'cd') {
          if (this.touch.percent >= 0.1) {
            offsetWidth = -window.innerWidth
            this.currentShow = 'lyric'
            middleOpacity = 0
          } else {
            offsetWidth = 0
            middleOpacity = 1
          }
        } else {
           if (this.touch.percent <= 0.9) {
            offsetWidth = 0
            this.currentShow = 'cd'
            middleOpacity = 1
          } else {
            offsetWidth = -window.innerWidth
            middleOpacity = 0
          }
        }
        this.$refs.lyricList.$el.style[mytransform] = 'translate3d(' + offsetWidth + 'px,0,0)'
        this.$refs.middleLeft.style.opacity = middleOpacity
        this.touch.initiated = false
      },
      show () {
        this.$refs.playList.show()
      },
      ...mapMutations({
        setFullScreen:'SET_FULL_SCREEN' // 重命名更改屏幕是否全屏的vuex的mutations的方法
      })
    },
    watch:{
      currentSong (newsong, oldsong) {
        if (!newsong) {
          return false
        }
         if (oldsong && newsong.id == oldsong.id) { // 在切换歌曲播放模式的时候，current送的index是有变化的，所以会触发这个watch,为了不让其触发，加上这个条件看当前歌曲有没有变
          return false
        }
        if (this.currentLyric) { // 切换歌的时候让其先暂停
          this.currentLyric.stop()
        }
        let _this = this
        this.$nextTick(() => { // 为防止src变化的时候dom还没有渲染好，就没有play报错
          this.setPlayState(true)
          _this.$refs.audio.play() // 当currentSong变化时，就自动播放这个歌
           _this.getLyric()
        })
      },
      playing (newplaying) { // 监听playing状态来决定是要播放还是要暂停
      if (!this.currentSong) {
          return false
        }
        this.$nextTick(() => {
          const audio = this.$refs.audio
          newplaying ? audio.play() : audio.pause()
        })
      },
      currentTime (newtime) {
        if (!this.currentSong) {
          return false
        }
        if (newtime >= this.currentSong.duration) {
          // this.next()
          // this.$refs.audio.play()
        }
      }
    },
    components:{
      progressBar,
      progressCircle,
      Scroll,
      Playlist
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~_common/stylus/variable"
  @import "~_common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          transition transform linear .2s
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 40px
            line-height: 30px
            width: 40px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
