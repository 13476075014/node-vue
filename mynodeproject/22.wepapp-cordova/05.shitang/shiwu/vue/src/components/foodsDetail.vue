<template>
<transition name="leftIn">
    <div class="foodDetail" v-if="show">
      <no-result v-if="showNoResult" title="暂时没有上传图片"></no-result>
      <scroll :data="results">
          <ul>
            <li v-for="(item,index) in results" :key="index">
              <img :src="item.src" alt="找不到图片">
            </li>
          </ul>
      </scroll>
    </div>
</transition>
</template>

<script>
import Scroll from '@/base/scroll' // 封装的scroll
import noResult from '@/base/no-result'

export default {
  data () {
    return {
      show: {
        type: Boolean,
        default: false
      },
      results: [],
      showNoResult: false

    }
  },
  created () {
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      const arr = [{src: 'http://212.64.74.12/' + this.$route.params.img}]
      this.results = arr
      if (!this.results.length > 0) {
        this.showNoResult = true
      }
    }
  },
  components: {
    Scroll,
    noResult
  },
  watch: {

  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin'

.leftIn-enter-active
  transition all linear .2s
.leftIn-enter,.leftIn-leave-to
  transform translateX(100%)
.foodDetail
  position fixed
  top 45px
  bottom 60px
  left 0
  width 100%
  z-index 99
  background rgb(244,244,244)
  color $color-text-l
  text-align center
  overflow hidden
  img
    width 100%
</style>
