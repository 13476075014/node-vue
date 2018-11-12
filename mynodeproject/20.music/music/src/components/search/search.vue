<template>
    <div class="search">
      <!-- 头部搜索框部分 -->
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @query="onQueryChange"></search-box>
      </div>
      <!-- 热门搜索框部分 -->
      <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
        <scroll class="shortcut" ref="shortcutScroll" :data="shortcur">
          <div>
            <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                <li @click="addQuery(item.k)" class="item" v-for='(item,index) in hotKey' :key="index">
                  <span>{{item.k}}</span>
                </li>
              </ul>
            </div>
            <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear" @click="showConfirm">
                  <i class="icon-clear"></i>
                </span>
              </h1>
              <search-list
                @selectSearchHistory="selectSearchHistory"
                @deleteOneSH="deleteOneSH"
                :searches="searchHistory">
              </search-list>
            </div>
          </div>
        </scroll>
      </div>
      <!-- 搜索结果部分 -->
      <div class="search-result" ref="searchResult" v-show="query">
        <suggest :query="query" ref="suggest" @beforeScroll="beforeScroll" @select="saveSearch"></suggest>
      </div>
      <confirm
        ref="confirm"
        :showFlag="showFlagConfirm"
        :title="confirmText"
        @cancel="cancel"
        @confirm="confirm"
        confirmBtnText="清空">
      </confirm>
      <router-view></router-view>
    </div>
</template>

<script>
  import SearchBox from '@/base/search-box/search-box'
  import {ERR_OK} from '@/api/config'
  import {getHotKey} from '@/api/search'
  import Suggest from '@/components/suggest/suggest'
  import {mapActions, mapGetters} from 'vuex'
  import SearchList from '@/base/search-list/search-list'
  import Confirm from '@/base/confirm/confirm'
  import Scroll from '@/base/scroll/scroll'
  import {playlistMixin, searchMixin} from '_common/js/mixin'

  export default{
    mixins:[playlistMixin, searchMixin],
    data () {
      return {
        hotKey:[],
        confirmText: '是否清空所有搜索历史',
        showFlagConfirm: false // 是否展示弹出提示框
      }
    },
    created () {
      this.getHotKey()
    },
    methods:{
      handlePlaylist (playlist) { // mixin中的处理滚动top的函数
        const bottom = playlist.length > 0 ? '60px' : '0'
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcutScroll.refresh()
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
      },
      getHotKey () {
        getHotKey().then(res => {
          if (res.code == ERR_OK) { // 请求成功
              this.hotKey = res.data.hotkey.slice(0, 10)
          }
        }).catch(e => {

        })
      },
      showConfirm () { // 确人提示框
        this.showFlagConfirm = true
      },
        cancel () { // 确认框的取消按钮点击事件
            this.showFlagConfirm = false
        },
      confirm () { // 确认框的确认点击事件
        this.showFlagConfirm = false
        this.clearSearchHistory() // 执行清空的事件
      },
      clearSearchHistory () {
        this.clearSearchHistory()
      },
      ...mapActions(['clearSearchHistory'])
    },
    computed:{
      shortcur () {
        return this.hotKey.concat(this.searchHistory) // 把搜索的两个变量合并到一个数组里面，方便观察其有没有更改，需不需要refresh我们的scroll组件
      },
      ...mapGetters(['searchHistory'])
    },
    watch:{
      query (newq) { // 为了解决在搜索的时候这个搜索历史界面是被display:none掉的，所以并不会刷新scroll,导致不能滚动，所以在这里watch这个query
        if (!newq) {
          setTimeout(() => {
            this.$refs.shortcutScroll.refresh() // 手动刷新scroll，在dom显示后
          }, 20)
        }
      }
    },
    components:{
      SearchBox,
      Suggest,
      SearchList,
      Confirm,
      Scroll
    }
  }
</script>

<style scoped lang="stylus">
  @import '~_common/stylus/variable'
  @import '~_common/stylus/mixin'

  .search
    padding 20px
    .search-box-wrapper
      margin: 0px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 0px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px 0 0
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
      left 0
</style>
