<!-- 这个是搜索页面的搜索输入框有内容的时候，出现的建议搜索项 -->

<template>
  <scroll class="suggest"
    :pullup="pullup"
    @scrollToEnd="scrollToEnd"
    :beforeScroll="beforeScroll"
    @beforeScroll="beforeToScroll"
    ref="scroll"
    :data="result">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item,index) in result" :key="index">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDFisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length>0" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import {search} from '@/api/search'
import {ERR_OK} from '@/api/config'
import {createSong} from '_common/js/song_Class'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import Singer from '_common/js/singer_Class'
import {mapMutations, mapActions} from 'vuex'
import NoResult from '@/base/no-result/no-result'

const TYPE_SINGER = 'singer'
  export default{
    data () {
      return {
        page:1, // 当前页数
        perpage:20, // 每一页的条数
        result:[],
        pullup:true, // 是否派发scroll的上拉加载刷新事件
        hasMore:true, // 是否还有更多数据
        beforeScroll:true // 开启scroll组件的beforescrollstart事件的监听
      }
    },
    props:{
      query:{
        type:String,
        default:''
      },
      showSinger:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      refresh () {
        this.$refs.scroll.refresh()
      },
      beforeToScroll () { // 开始滚动的监听事件
        this.$emit('beforeScroll')
      },
      search (isScroo) { // 搜索接口的访问
        /* eslint-disable no-eval */
        /* eslint-disable no-unused-vars */
        var _this = this
        search(this.query, this.page, this.showSinger, this.perpage).then(res => {
          function callback (res) {
            if (res.code == ERR_OK) {
              if (isScroo) { // 如果是上拉加载的话，就让当前的result和前面的合并
                _this.result = _this.result.concat(_this._genResult(res.data))
              } else {
                _this.result = _this._genResult(res.data)
              }
            _this.checkMore(res.data)
          }
          }
          eval(res)
        }).catch(e => {

        })
      },
      scrollToEnd () { // 上拉加载刷新的方法，是在scroll快滚到底的时候触发派发的
        if (!this.hasMore) {
          return false
        }
        this.page++
        this.search(true)
      },
      checkMore (data) { // 判断当前歌曲条数是否是所有的了和更改hasMore是否为真
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * this.perpage) > song.toltalnum) {
          this.hasMore = false
        }
      },
      _genResult (data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type:TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs (list) { // 对搜索的歌曲的格式调整
        let ret = []
        list.forEach(musicData => {
          if (musicData.songid && musicData.albumid) {
              ret.push(createSong(musicData))
          }
        })
        return ret
      },
      getIconClass (item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDFisplayName (item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name} - ${item.singer}`
        }
      },
      selectItem (item) {
        if (item.type == TYPE_SINGER) { // 如果是一个歌手列
            const singer = new Singer({
              id:item.singermid,
              name:item.singername
            })
            this.$router.push({
              path:`/search/${singer.id}`
            })
            this.singer = this.setSinger(singer) // 改变vuex
        } else {
          item.getVkeys().then(() => { // 先获取歌曲地址，再加入播放列表
             this.InsertSong(item) // 调用vuex的insertsong来插入歌曲
          })
        }
        this.$emit('select') // 派发事件处理vuex的searchHistory
      },
      ...mapMutations({
        setSinger : 'SET_SINGER' // 重置vuex的singer
      }),
      ...mapActions([
        'InsertSong'
      ])
    },
    watch:{
      query (newq) {
        if (!newq) {
          return false
        }
        this.page = 1 // 初始化当前页数
        this.$refs.scroll.scrollTo(0, 0, 0) // 初始化scroll的滚动高度
        this.search(false)
      }
    },
    components:{
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style lang="stylus" scoped>
@import "~_common/stylus/variable"
@import "~_common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
