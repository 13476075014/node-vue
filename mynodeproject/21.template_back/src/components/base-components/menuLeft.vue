<template>
  <div class="menuLeft" :class="fullScreen">
    <div class="inner">
      <scroll :data="tagData">
        <div>
          <p class="title">系统</p>
          <el-menu style="border-right:none;" text-color="white" :collapse-transition="collapsetransition"
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
          :collapse="isCollapse">
            <el-submenu v-for="(item,index) in tagData" :key="index" :index="index + ''" :popper-class="themeColor">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </template>
              <el-menu-item-group v-for="(item2,index2) in item.child" :key="index2">
                <el-menu-item @click="changeContent(item2.href,item2.text)" :data-href="item2.href" :index="index + '-' + (index2 + 1)">{{item2.text}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
// import {dealFoodMenu} from '@/assets/js/menu/leftMenu'
import Scroll from './scroll'
import {url} from '@/assets/js/config'
import {mapMutations, mapState} from 'vuex'
import { base } from '@/mixin/index'

  export default{
    mixins: [base],
    data () {
      return {
        collapsetransition:false,
        tagData:[
          {
            title:'主页',
            icon:'el-icon-setting',
            child:[
              {text:'主页', href:'/index/main-one'}
          ]
          },
          {
            title:'配置',
            icon:'el-icon-menu',
            child:[
              {text:'菜单配置', href:'/index/menu'},
              {text:'用户设置', href:'/index/main-two'},
              {text:'权限设置', href:'/index/main-three'}
          ]}

        ]
      }
    },
    created () {

    },
    mounted () {
      this.init()
    },
    props:{
      isCollapse:{
        type:Boolean,
        default:false
      },
      fullScreen:{
        type:String,
        default:'fullScreen'
      },
      themeColor:{
        type:String,
        default:'bg-black'
      }
    },
    methods: {
      init () {
        this.tagData = this.menu
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      changeContent (href, text) {
        let myUrl = url[href]
        if (!myUrl) {
          myUrl = `/index/baseTable?modulecode=${text}`
        } else {
          myUrl = `${myUrl}?modulecode=${text}`
        }
        this.$router.push(myUrl)
        this.$emit('addTag', href, text)
        this.setModulecode(text)
      },
      ...mapMutations({'setMenu':'SET_MENU', 'setModulecode':'SET_MODULECODE'})
    },
    computed:{
      ...mapState(['menu'])
    },
    components:{
      Scroll
    },
    watch:{
      menu (newval, oldval) {
        this.tagData = newval
      }
    }
  }

</script>

<style lang="stylus" scoped>
.menuLeft
  display flex
  &.fullScreen .inner
    flex 220px 0 0
  &.miniScreen .inner
    flex 65px 0 0
  .inner
    width 100%
    height 100%
    .title
      color white
      text-align center
      margin 0
      padding 0
      line-height 61px
    .el-menu-vertical-demo
      height calc(100% - 61px)
</style>
