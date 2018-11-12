<template>
    <div class="recommend" ref="recommend">
      <scroll :data="discList" v-if="discList.length >0" class="recommend-content" ref="recScroll">
        <div>
          <!-- 为了防止slider组件里面在没有数据的时候就被加载，导致里面一些dom没有就执行了方法，所以用下面的v-if的方法，来保证执行这个组件的时候是有数据的 -->
          <div class="slider-wrapper" v-if="recommends.length > 0">
            <slider>
              <div class="sliderinner" v-for="(item,index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="">
                </a>
              </div>
            </slider>
          </div>

          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
              <ul>
                <li v-for="(item,index) in discList" class="item" :key="index" @click="selectItem(item)">
                  <div class="icon">
                    <!-- 下面使用的vue-lazyload这个插件的v-lazy的指令来代替src让图片延时加载 -->
                    <img alt="" v-lazy="item.imgurl">
                  </div>
                  <div class="text">
                    <h2 class="name" v-html="item.creator.name"></h2>
                    <p class="desc" v-html="item.dissname"></p>
                  </div>
                </li>
              </ul>

          </div>
        </div>
      </scroll>
      <loading class="loading" v-if="showLoading"></loading>
      <router-view>

      </router-view>
    </div>
</template>

<script>
/* eslint-disable */
// _api是在webpack里面自己配置的目录地址的简写
import {getRecommend, getDiscList} from '_api/recommend.js'
import {ERR_OK} from '_api/config'
import Slider from '@/base/slider/slider'
import scroll from '@/base/scroll/scroll'
import {playlistMixin} from '_common/js/mixin'
import {mapMutations} from 'vuex'
import Loading from '@/base/loading/loading'

export default{
  mixins:[playlistMixin],
  data () {
    return {
      recommends:[],
      discList:[],
      showLoading:true
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods:{
    _getRecommend () { // 得到推荐页面的轮播图数据
      var _this = this
      getRecommend().then((res) => {
        // res.code === ERR_OK 就是没有出现错误
        if (res.code === ERR_OK) {
          _this.recommends = res.data.slider
        } else {
          console.log('内部错误')
        }
      }).catch((e) => {
          console.log(e)
      })
    },
    _getDiscList () { // 得到推荐页面的歌单页面
       var _this = this
      getDiscList().then((res) => {
        function MusicJsonCallback (data) {//因为后台返回的是一个字符串类型的回调函数，所以写一个同名函数，在eval后会调用这个函数。
          if (ERR_OK === data.code) {
            _this.discList =data.data.list
            _this.showLoading = false
          } else {
            console.log('内部错误')
          }
        }
        eval(res)  //因为不知道为什么这里后台返回的是字符串类型的回调函数 ‘MusicJsonCallback (......)’  ,所以用eval来执行以下这个回调函数，就可以调用上面我们自己写的同名的函数；

      }).catch((e) => {
          console.log(e)
      })
    },
     handlePlaylist (playlist) { // 通过mixin处理如果底部有小音乐播放器，被遮住的问题
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        if(this.discList.length > 0){
           console.log(this.$refs.recScroll)
          this.$refs.recScroll.refresh() // 刷新scroll组件
        }
      },
      selectItem(item){ // 展开推荐详情
        this.$router.push({
          path: `/recommend/${item.dissid}` // 跳转路由
        })
        this.setDisc(item) // 改变vuex中disc的值
      },
      ...mapMutations({
        setDisc:'SET_DISC'
      })
  },
  components:{
    Slider,
    scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus">
@import "~_common/stylus/variable.styl"

.recommend
  position fixed
  left 0
  right 0
  top 88px
  bottom 0
  background $color-background
  .loading
    position fixed
    top 0
    bottom 0
    left 0
    background $color-background
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
          img
            width 100%
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
</style>
