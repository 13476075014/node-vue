<template>
    <div class="tab">
        <!-- router 的 tag属性是去设置这个跳转标签转成哪种标签，下面就转成了div -->
        <router-link tag="div" class="tab-item" to="/recommend">
            <span class="tab-link">
                推荐
            </span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/singer">
            <span class="tab-link">
                歌手
            </span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
            <span class="tab-link">
                排行
            </span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/search">
            <span class="tab-link">
                搜索
            </span>
        </router-link>
    </div>
</template>

<script>
    export default{}
</script>

<style scoped lang="stylus">
/*css这里引入的时候用webpack里面配置的简写地址报错*/
@import "../../common/stylus/variable.styl"

.tab
  display flex
  height 44px
  line-height 44px
  font-size $font-size-medium
  .tab-item
    flex 1
    text-align center
    .tab-link
      padding-bottom 5px
      color $color-text-l
    &.router-link-active
      .tab-link
        color $color-theme
        border-bottom 2px solid $color-theme
</style>
