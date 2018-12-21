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
      <carousel></carousel>
      <sudoku></sudoku>
    </div>
  <my-bottom></my-bottom>
  <router-view></router-view>
  </div>
  </transition>
</template>

<script>
import myHead from '@/base/head'
import Carousel from '@/base/carousel'
import Sudoku from '@/base/sudoku'
import MyBottom from '@/base/bottom'

export default {
  data () {
    return {
      activeIndex2: '1',
      collapse_transition: true,
      headTitle: 'money金融',
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
    }
  },
  components: {
    myHead,
    Carousel,
    Sudoku,
    MyBottom
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active
  transition all linear .5s
.slide-enter,.slide-leave-to
  opacity 0
.content
  padding-top 45px
</style>
