<!-- 这是一个搜索框组件，用在本项目的搜索页面 -->

<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" type="text" class="box" :placeholder="placeholder" v-model="query">
    <i v-show="query" class="icon-dismiss" @click="clear"></i>
  </div>
</template>

<script>
import {debounce} from '_common/js/util' // 引入去抖函数

  export default{
    props:{
      placeholder:{ // input搜索框的占位字
        type:String,
        default:'搜索歌曲、歌手'
      }
    },
    data () {
      return {
        query:''
      }
    },
    methods:{
      blur () {
        this.$refs.query.blur()
      },
      clear () {
        this.query = ''
      },
       setQuery (query) {
        this.query = query
      }
    },
    created () {
     /* this.$watch('query', (newq) => {
        this.$emit('query', newq)
      }) */
      this.$watch('query', debounce((newq) => {
        this.$emit('query', newq)
      }, 300)) // 防止在输入还没有完成就直接调用接口，浪费资源
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~_common/stylus/variable"

  .search-box
    display flex
    align-items center
    box-sizing border-box
    width 100%
    padding 0 6px
    height 40px
    background $color-highlight-background
    border-radius 6px
    .icon-search
      font-size 24px
      color $color-background
    .box
      flex 1
      margin 0 5px
      line-height 18px
      background $color-highlight-background
      color $color-text
      font-size $font-size-medium
      &::placeholder
        color $color-text-d
      .icon-dismiss
        font-size 16px
        color $color-background
</style>
