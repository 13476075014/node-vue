<!-- 排行榜的点开详情列表页面 -->

<template>
  <transition name="slide">
    <music-list
      v-if="songs.length > 0"
      :title="title"
      :bg-image="bgImage"
      :rank="rank"
      :songs = "songs">

    </music-list>
  </transition>
</template>

<script>
  import MusicList from '@/base/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getTopListDetail} from '@/api/rank'
  import {createSong} from '@/common/js/song_Class'

  export default{
    data () {
      return {
        songs:[],
        rank:true
      }
    },
    created () {
      this.getTopList(this.topList.id)
    },
    methods:{
      getTopList (id) {
        if (!this.topList.id) {
          this.$router.push({
            path:'/rank'
          })
          return false
        }
        var _this = this
        getTopListDetail(id).then(res => {
          console.log(res)
          this.songs = _this._normallizeSongs(res.songlist)
        })
      },
      _normallizeSongs (list) {
        let ret = []
        list.forEach(item => {
          const musicData = item.data
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components:{
      MusicList
    },
    computed:{
      title () {
        return this.topList.topTitle
      },
      bgImage () {
        return this.topList.picUrl
      },
      ...mapGetters(['topList'])
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-enter-active,.slide-leave-active
    transition all 0.3s ease
  .slide-enter,.slide-leave-to
    transform:translate3d(100%,0,0)
</style>
