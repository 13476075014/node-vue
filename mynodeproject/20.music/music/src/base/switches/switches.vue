<!-- 这个页面是公用的类似tab标题栏的页面 -->
<template>
  <ul class="switches">
    <li class="switch-item"  v-for="(item,index) in switches" :key="index" :class="{'active':index === currentIndex}" @click="switchItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
  export default{
    props:{
      switches:{
        type:Array,
        default:function () {
          return []
        }
      },
      currentIndex:{
        type:Number,
        default:0
      }
    },
    methods:{
      switchItem (index) {
        this.$emit('switchItem', index)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~_common/stylus/variable"

  .switches
    display: flex
    align-items: center
    width: 240px
    margin: 0 auto
    border: 1px solid $color-highlight-background
    border-radius: 5px
    .switch-item
      flex: 1
      padding: 8px
      text-align: center
      font-size: $font-size-medium
      color: $color-text-d
      &.active
        background: $color-highlight-background
        color: $color-text
</style>
