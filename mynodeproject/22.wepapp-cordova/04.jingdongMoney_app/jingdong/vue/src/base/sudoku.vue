<template>
  <div id="sudoku">
      <div class="inner" v-for="item in 8" :key="item">
        <img src="../assets/imgs/mudoku.png" alt="">
        <p>优惠券</p>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styl/mixin.styl'
  #sudoku
    display flex
    text-align center
    align-items center
    flex-wrap wrap
    .inner
      flex 1 1 25%
      img
        width 50px
        margin-top 20px
      p
        padding-top 10px
        color $color-text-ll
        font-size 13px
</style>
