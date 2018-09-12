<template>
    <div class="singer">
      <listView
      :data="singerList"
      @selectItem="selectSinger"
      v-if="singerList.length
      > 0"></listView>
      <router-view></router-view>
    </div>
</template>

<script>
import {getSingerList} from '@/api/singer.js'
import {ERR_OK} from '@/api/config.js'
import SingerClass from '_common/js/singer_Class'
import listView from '@/base/listView/listView'
import {mapMutations} from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default{
  data () {
    return {
      singerList:[]
    }
  },
  mounted () {
    this._getSingerList()
  },
  methods:{
    _getSingerList () {
      getSingerList().then((response) => {
        if (response.code === ERR_OK) {
          this.singerList = response.data.list
         this.singerList = this._normalizeSinger(response.data.list)
        }
          // console.log(this.singerList)
        // console.log(this._normalizeSinger(response.data.list))
      })
    },
    _normalizeSinger (list) {
      // 取10条数据放到热门里面
      let map = {
        hot:{// 热门里面的数据
          title:HOT_NAME,
          items:[]
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          // new SingerClass()是在common里面写的公用的class类，用来减少一些重复性书写
          map.hot.items.push(new SingerClass({id:item.Fsinger_mid, name:item.Fsinger_name}))
        }
         // 按照index的A-Z来排序放到二维数组里面
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title:key,
            items:[]
          }
        }
        // 在把数据放到各自属于的A-Z中 放id name avatar字段
        map[key].items.push(new SingerClass({id:item.Fsinger_mid, name:item.Fsinger_name}))
      })
       // 把map放到数组里面，并且进行排序处理
      let hot = []
      let ret = []
      for (let key in map) {
        if (map[key].title.match(/^[a-zA-Z]$/)) { // a-z
          ret.push(map[key]) // 这样就组成了一个a-z的二维数组
        } else if (map[key].title === HOT_NAME) {
          hot.push(map[key])
        }
      }
      // 把数组ret按照a-z来排序
      ret.sort((a, b) => {
        // a.title.charCodeAt(0) 获取到前一个的title的第1个的unico编码值
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // es6 语法合并两个数组，变成一个数组
      return hot.concat(ret)
     },
   // 用es6的这种语法糖，来把vuex的mutation的方法，绑到vue上
    selectSinger (singer) { // 点击歌手详情展示详细页的方法
      this.$router.push({path:`/singer/${singer.id}`})
      this.setSinger(singer) // 用的vuex的方法，通过...这样的语法糖，让这些方法直接可以这样使用
    },
    ...mapMutations({
      setSinger:'SET_SINGER'
    })},
  components:{
    listView
  },
  computed:{

  }
}
</script>

<style scoped lang="stylus">
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
