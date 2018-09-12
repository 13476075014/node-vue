<template>
  <div class="singer_detail">
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
import {mapGetters} from 'vuex'
import {getSingerDetail} from '@/api/singer.js'
import {ERR_OK} from '@/api/config.js'
import {createSong} from '@/common/js/song_Class.js'
import musicList from '@/base/music-list/music-list'

export default{
  data () {
    return {
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
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
        getSingerDetail(this.singer.id).then(response => {
          if (response.code === ERR_OK) {
            this.songs = this._normalizeSongs(response.data.list)
            console.log(this.songs)
          }
        })
    },
    _normalizeSongs (list) { // 把数据处理一下，便于使用
      let ret = []
      list.forEach((item, index) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            // 把封装好的构造函数在这里传参处理好后，直接push给ret
            ret.push(createSong(musicData))
          }
      })
      return ret
    }
  },
  components:{
    musicList
  }
}
</script>

<style lang="stylus" scoped>

</style>
