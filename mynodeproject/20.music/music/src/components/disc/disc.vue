<!-- 这个页面是推荐页面点击的详情页面 -->

<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" v-if="songs.length>0"></music-list>
  </transition>
</template>

<script>
import MusicList from '@/base/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
import {createSong} from '_common/js/song_Class'

export default{
  data () {
    return {
      songs:[]
    }
  },
  components:{
    MusicList
  },
  computed:{
    title () {
      return this.disc.dissname
    },
    bgImage () {
      return this.disc.imgurl
    },
    ...mapGetters(['disc'])
  },
  created () {
    this.getSongList()
  },
  methods:{
    getSongList () {
      const _this = this
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
      }
      /* eslint-disable */
      getSongList(this.disc.dissid).then((res) => {
        function jsonCallback (data) {
          if(data.code === ERR_OK){
            _this.songs = _this._normalizeSongs(data.cdlist[0].songlist)
          }else{
            console.log("recommend-disc-getSongList方法请求错误")
          }
        }
        eval(res)
      })
    },
    _normalizeSongs(list){ // 处理数据格式等
      let ret = []
      list.forEach((item) => {
        if(item.songid && item.albumid){
          ret.push(createSong(item))
        }
      })
      return ret
    }
  }
}

</script>

<style lang="stylus" scoped>
  .slide-enter-active,.slider-leave-active
    transition all linear .3s
  .slide-enter,.slide-leave-to
    transform translate3d(100%,0,0)
</style>
