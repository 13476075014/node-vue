<!-- 排行榜页面 -->

<template>
    <div class="rank" ref="rank">
      <Scroll class="toplist" :data="topList" ref="scroll">
        <ul>
          <li class="item" v-for="(item,index) in topList" :key="index" @click="selectItem(item)">
            <div class="icon">
              <img src="" width="100" height="100" alt="" v-lazy="item.picUrl">
            </div>
            <ul class="songlist">
              <li class="song" v-for="(song,index2) in item.songList" :key="index2">
                <span>{{index + 1}}</span>
                <span>{{song.songname}} - {{song.singername}}</span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="loading-container" v-show="!topList">
          <Loading></Loading>
        </div>
      </Scroll>
      <router-view></router-view>
    </div>
</template>

<script>
  import {getTopList} from '@/api/rank'
  import {ERR_OK} from '@/api/config'
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'
  import {playlistMixin} from '_common/js/mixin'
  import {mapMutations} from 'vuex'

  export default{
    mixins:[playlistMixin],
    data () {
      return {
        topList:[]
      }
    },
    created () {
      this.getTopList()
    },
    methods:{
      getTopList () {
        var _this = this
        /* eslint-disable */
        getTopList().then(res => {
          function MusicJsonCallback (data) {
            if(ERR_OK == data.code){
              _this.topList = data.data.topList // 赋值topList
            }
          }
          eval(res)
        }).catch(e => {
          console.log('rank--getTopList--error')
        })
      },
      handlePlaylist(playlist){
        const bottom = playlist.length ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item){ // 点击列表跳到子页面详情页
        this.setTopList(item)
        this.$router.push({
          path:`/rank/${item.id}`
        })
      },
      ...mapMutations({
        setTopList:'SET_TOPLIST' // 获取到设置toplist的方法
      })
    },
    computed:{

    },
    components:{
      Scroll,
      Loading
    }
  }

</script>

<style scoped lang="stylus">
  @import "~_common/stylus/variable"
  @import "~_common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    background $color-background
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
