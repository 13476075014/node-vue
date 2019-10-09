
<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- keep-alive 这个标签里面包裹的东西，能缓存里面的dom，就不用在tag切换的时候去重新刷新数据，导致资源浪费，和体验感不好的情况 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import Tab from '@/components/tab/tab'
import player from '@/components/player/player'

export default {
  name: 'App',
  components:{
    MHeader:MHeader,
    Tab:Tab,
    player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/variable"

#app
  min-height 100vh
  color $color-theme
  background $color-background
</style>
