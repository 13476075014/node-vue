<template>
  <div class="singer_detail">
    <loading id="load" v-if="!isload"></loading>
    <musicList
      v-if="songs.length>0"
     :songs="songs"
     :title="title"
     :bgImage="bgImage"
     >
     </musicList>
  </div>
</template>

<script>
import loading from '@/base/loading/loading'
import {mapGetters} from 'vuex'
import {getSingerDetail} from '@/api/singer.js'
import {ERR_OK} from '@/api/config.js'
import {createSong} from '@/common/js/song_Class.js'
import musicList from '@/base/music-list/music-list'

export default{
  data () {
    return {
      isload:false,
      songs:[]
    }
  },
  computed:{
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer' // 在getter.js中设置的获取这个state的名字
    ])
  },
  created () {
    this._getSingerDetail()
  },
  methods:{
    _getSingerDetail () {
       console.log(this.singer)
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
        getSingerDetail(this.singer.id).then(response => {
          if (response.code === ERR_OK) {
          this._normalizeSongs(response.data.list)
          }
        })
    },
    _normalizeSongs (list) { // 把数据处理一下，便于使用
    const _this = this
      let ret = []
      list.forEach((item, index) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
            ret[index].getVkeys().then(res => {
            })
              if (index == list.length - 1) {
                _this.songs = ret
                _this.isload = true
              }

           // getVkey(musicData.songmid).then(res => { // 得到vkey来拼接歌曲播放地址
              // musicData.url = `http://dl.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?vkey=${res.data.items[0].vkey}&fromtag=66`
              // 把封装好的构造函数在这里传参处理好后，直接push给ret
            // })
          }
      })
    }
  },
  components:{
    musicList,
    loading
  }
}
</script>

<style lang="stylus" scoped>
#load
  height 100vh
  position fixed
  top 0
  left 0
  background rgba(0,0,0,0.8)
  z-index 99999
</style>
