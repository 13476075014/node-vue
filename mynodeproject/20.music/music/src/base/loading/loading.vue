<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~_common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    display flex
    align-items center
    justify-content center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
