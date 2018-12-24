<!-- 这个是首页页面 -->
<template>
<transition name="slide">
  <div v-if="show" class="main" id="index">
    <my-head :showArrow="showArrow" :title="headTitle">
      <div>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          @select="handleSelect"
          mode="horizontal"
          menu-trigger="click"
          :collapse-transition="collapse_transition"
          >
          <el-submenu @click.stop index="1">
            <template slot="title">
               <i class="el-icon-more"></i>
            </template>
            <router-link to="/login">
              <el-menu-item index="2-1">
                退出
              </el-menu-item>
            </router-link>
            <el-menu-item index="2-2">首页</el-menu-item>
            <router-link to="/index/user">
              <el-menu-item index="2-3">个人中心</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>

      </div>
    </my-head>
    <div class="content">
      <div class="bg"></div>
      <carousel></carousel>
      <pull class="pull">
        <p>{{nowDay}}</p>
        <p>{{nowWeek}}</p>
        <ul>
          <li v-for="(item,index) in 8" :key="index">
            {{item + "rouroruoru"}}
          </li>
        </ul>
      </pull>
      <div class="sub">
        <el-button :class='{btn:true}' type="primary" @click="submitForm('ruleForm2')">提交点评</el-button>
      </div>
    </div>
  <my-bottom :index_active="activebottom" @changeTab="changeTab"></my-bottom>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  </div>
  </transition>
</template>

<script>
import myHead from '@/base/head'
import Carousel from '@/base/carousel'
import MyBottom from '@/base/bottom'
import pull from '@/base/scrollupAndDown' // 上拉加载，下拉刷新的组件

export default {
  data () {
    return {
      activebottom: 0,
      activeIndex2: '1',
      collapse_transition: true,
      headTitle: '校园食堂',
      showArrow: false,
      show: false
    }
  },
  created () {
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    changeTab (index, path, text) {
      this.activebottom = index * 1
      this.$router.push('/index' + path)
      if (index === 0) {
        text = '校园食堂'
      }
      this.headTitle = text
    }
  },
  components: {
    MyBottom,
    pull,
    myHead,
    Carousel
  },
  computed: {
    nowDay () {
      let da = new Date()
      return `${da.getFullYear()} - ${da.getMonth() + 1} - ${da.getDate()}`
    },
    nowWeek () {
      let da = new Date().getDay()
      switch (da) {
        case 1 :
          da = '星期一'
          break
        case 2 :
          da = '星期二'
          break
        case 3 :
          da = '星期三'
          break
        case 4:
          da = '星期四'
          break
        case 5:
          da = '星期五'
          break
        case 6:
          da = '星期六'
          break
        case 0:
          da = '星期天'
          break
      }
      return `${da}`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styl/mixin'
.slide-enter-active
  transition all linear .5s
.slide-enter,.slide-leave-to
  opacity 0
.content
  padding-top 45px
  height 100vh
  // background rgb(219,217,218)
  text-align center
  position relative
  .bg
    background url('../assets/imgs/bg2.jpg') center no-repeat
    background-size corver
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    filter blur(5px)
  .sub
    position absolute
    bottom 80px
    width 100%
    text-align center
    .btn
      background $color-text-yellow
      color white
      border none
      line-height 25px
      padding 2px 40px
  .pull
    padding-top 0px
    p
      padding-top 5px
  ul
    padding 0 30px
    li
      margin-top 10px
      background white
      border-radius 5px
      line-height 30px
</style>
