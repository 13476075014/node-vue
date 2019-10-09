<template>
  <div id="bottom">
    <div class="inner">
      <div v-for="(item,index) in result" :key="index">
        <img :src="item.src" alt="">
        <p>首页</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      result: [{src: require('../assets/imgs/mudoku.png')}, {src: require('../assets/imgs/mudoku.png')}, {src: require('../assets/imgs/mudoku.png')}, {src: require('../assets/imgs/mudoku.png')}, {src: require('../assets/imgs/mudoku.png')}]
    }
  }

}
</script>

<style lang="stylus" scoped>
#bottom
  position fixed
  bottom 0
  width 100%
  left 0
  background white
  .inner
    display flex
    align-items center
    text-align center
    padding 10px 0
    box-shadow -2px 0 50px 1px rgb(222,222,222)
    div
      flex 1 1 20%
      img
        width 30px
      p
        padding-top 10px
</style>
