<!-- 排行榜的点开详情列表页面 -->

<template>
  <transition-group name="slide">
    <music-list
      :key="1"
      v-if="songs.length > 0"
      :title="title"
      :bg-image="bgImage"
      :rank="rank"
      :songs = "songs">

    </music-list>
    <div class="loading_wrap" v-if="!songs.length" :key="2">
      <loading></loading>
    </div>
  </transition-group>
</template>

<script>
  import MusicList from '@/base/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getTopListDetail} from '@/api/rank'
  import {createSong} from '@/common/js/song_Class'
  import loading from '@/base/loading/loading'

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
         // console.log(res)
          _this._normallizeSongs(res.songlist)
        })
      },
      _normallizeSongs (list) {
        const _this = this
        let ret = []
        list.forEach(item => {
          const musicData = item.data
          if (musicData.songid && musicData.albumid) {
            let song = createSong(musicData)
            song.getVkeys().then(() => {
              ret.push(song)
              if (item == list[(list.length - 1)]) {
                _this.songs = ret
              }
            })
            }
          })
      }
    },
    components:{
      MusicList,
      loading
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
.loading_wrap
  padding-top 50%
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background rgba(0,0,0,0.8)

  .slide-enter-active,.slide-leave-active
    transition all 0.3s ease
  .slide-enter,.slide-leave-to
    transform:translate3d(100%,0,0)

</style>
