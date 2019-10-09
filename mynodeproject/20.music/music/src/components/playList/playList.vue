<!-- 这个是歌曲列表的页面 -->
<template>
  <transition name="list-fade">
    <div class="playlist" v-show="playlistShowFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i> <!-- 调换播放模式 -->
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"> <!-- 清空播放列表 -->
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll ref="listContentScroll" class="list-content" :data="sequenceList">
          <transition-group name="list" tag="ul">
            <li class="item" ref="listItem" @click="selectItem(item,index)" v-for="(item,index) in sequenceList" :key="index">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i class="icon" :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click.stop="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
    <!-- 弹出层组件 -->
    <confirm @confirm="confirmClear" @cancel="cancelConfirm" :showFlag="showFlag" ref="confirm" title="是否清空播放列表？" confirmBtnText="清空"></confirm>
    <!-- 添加歌曲页面 -->
    <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script>
import {mapActions} from 'vuex'
import Scroll from '@/base/scroll/scroll'
import {playMode} from '_common/js/config'
import Confirm from '@/base/confirm/confirm'
import {playerMixin} from '_common/js/mixin'
import AddSong from '@/components/add-song/add-song'

  export default{
    mixins:[playerMixin],
    data () {
      return {
        playlistShowFlag:false,
        showFlag:false // 是否展示确认弹出框
      }
    },
    methods:{
      show () {
        this.playlistShowFlag = true
        setTimeout(() => { // 在show之前data已经变化了那时的refresh没有意义，因为是display:none的，在show之后的dom都展示完之后，在进行refresh操作，让scroll重新计算高度
          this.$refs.listContentScroll.refresh()
          this.scrollToCurrent(this.currentSong)
        }, 20)
      },
      hide () {
        this.playlistShowFlag = false
      },
      getCurrentIcon (item) { // 加当前播放歌曲的样式
        if (this.currentSong.id === item.id) {
          return 'icon-play'
        }
        return ''
      },
      selectItem (item, index) { // 换歌
        if (this.mode == playMode.random) {
          index = this.playList.findIndex(item2 => {
            return item2.id === item.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayState(true)
      },
      scrollToCurrent (currentSong) {
        const index = this.sequenceList.findIndex((item) => {
          return item.id === currentSong.id
        })
        const lis = this.$refs.listItem
        this.$refs.listContentScroll.scrollToElement(lis[index], 300)
      },
      deleteOne (item) {
        this.deleteSong(item)
        if (!this.playList.length) {
          this.hide()
        }
      },
      showConfirm () {
        this.showFlag = true
      },
      confirmClear () { // 点击确认清空按钮
        this.clearSongList()
        this.showFlag = false
      },
      cancelConfirm () {
        this.showFlag = false
      },
      addSong () {
        this.$refs.addSong.show()
      },
      ...mapActions(['deleteSong', 'clearSongList'])
    },
    computed:{
      modeText () {
         return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
      }
    },
    watch:{
      currentSong (newSong, oldSong) {
        if (!this.playlistShowFlag || newSong.id === oldSong.id || !newSong) {
          return false
        }
        this.scrollToCurrent(newSong)
      }
    },
    components:{
      Scroll,
      Confirm,
      AddSong
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~_common/stylus/variable"
  @import "~_common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.2s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
