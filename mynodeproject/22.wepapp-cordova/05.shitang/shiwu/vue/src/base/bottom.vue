<template>
  <div id="bottom">
    <div class="inner">
      <div @click="changeTab(index,item.path,item.text)" v-for="(item,index) in result" :class="{'active':index === index_active}" :key="index">
        <i class="iconfont" v-html="item.icon"></i>
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index_active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      result: [{text: '首页', icon: '&#xe691;', path: '/'}, {text: '点评', icon: '&#xe621;', path: '/rate'}, {text: '建议', icon: '&#xe62c;', path: '/suggest'}, {text: '我的', icon: '&#xe63d;', path: '/user'}]
    }
  },
  methods: {
    changeTab (index, path, text) {
      this.$emit('changeTab', index, path, text)
    }
  }

}
</script>

<style lang="stylus" scoped>
 @import '~@/assets/styl/mixin.styl'

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
      color rgb(178,178,178)
      &.active
        color $color-text-yellow
      i
        font-size 20px
      p
        padding-top 5px
        font-size 15px
</style>
