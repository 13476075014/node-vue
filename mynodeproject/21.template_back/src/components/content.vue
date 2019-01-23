<template>
  <div class="wrap" ref="wrap">
    <menuLeft @addTag="addTag" id="left"
    :themeColor="themeColor"
    :fullScreen="fullScreen"
    :class="themeColor"
    :isCollapse="isCollapse">
    </menuLeft>
    <div id="center">
      <menuTop id="top"
      :changeMenuIcon="changeMenuIcon"
      :class="[fullScreen,themeColor]"
       @changeTheme="changeTheme"
       @changeIsCollapse="changeIsCollapse">
       </menuTop>
      <div class="menuLand" :class="themeColor">
        <div class="leftMenu">
          <router-link
            v-for="(tag,index2) in dynamicTags"
            :key="index2"
            :to="tag.href">
            <el-tag
              @click.native="tagClick(index2)"
              :closable="index2 === 0 ? false : true"
              class="el-tag"
              :class="[tag.icon,dynamicTags_active_index === index2 ? 'active' : '']"
              :disable-transitions="false"
              @close="handleClose(tag)">

              {{tag.text}}

            </el-tag>
          </router-link>
        </div>
      </div>
      <keep-alive>
        <router-view ref="myRouter" class="contentView"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import menuTop from '@/components/base-components/menuTop'
import menuLeft from '@/components/base-components/menuLeft'
const fullScreenWidth = 1000

  export default{
    data () {
      return {
        dynamicTags: [{text:'主页', href:'/index/main-one', icon:'el-icon-edit'}],
        isCollapse:true,
        dynamicTags_active_index:0,
        themeColor:'bg-black'
      }
    },
    mounted () {
      this.fitAddress()
    },
    activated () {
      alert(1)
    },
    methods:{
      changeIsCollapse () {
        this.isCollapse = !this.isCollapse
      },
      changeTheme (color) {
        this.themeColor = color
      },
      handleClose (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        this.dynamicTags_active_index = 0
         this.$nextTick(() => {
           this.$router.push('/index/main-one')
        })
      },
      addTag (href, text) { // 添加头部tag
        const index = this.dynamicTags.findIndex(function (item) {
          return item.href == href
        })
        const length = this.dynamicTags.length
        let nowIndex = length
        if (index < 0) {
          this.$set(this.dynamicTags, length, {text:text, href:href})
        } else {
          nowIndex = this.dynamicTags.findIndex(function (item) {
              return item.href == href
            })
        }
        this.dynamicTags_active_index = nowIndex
        const wrapW = this.$refs.wrap.clientWidth
        if (wrapW <= fullScreenWidth) {
          this.isCollapse = true
        }
      },
      tagClick (index) {
        this.dynamicTags_active_index = index
      },
      fitAddress () {
        const allPath = {'/index/menu':'菜单配置'}
        const path = this.$route.path
        this.addTag(path, allPath[path])
      }
    },
    computed:{
      fullScreen () {
        return !this.isCollapse ? 'fullScreen' : 'miniScreen'
      },
      changeMenuIcon () {
        return !this.isCollapse ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'
      }
    },
    components:{
      menuLeft,
      menuTop
    },
    watch:{

    }
  }

</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable'

  .wrap
    display flex
    height 100vh
    background rgb(242,242,242)
    #left
      overflow hidden
      transition all linear .2s
      min-height 100vh
      &.fullScreen
        flex 220px 0 0
      &.miniScreen
        flex 65px 0 0
    #center
      flex 1
      max-width 100%
      .contentView
        margin 15px
        padding 15px
        background white
        box-sizing border-box
        min-height calc(100% - 133px)
    .menuLand
      background white
      margin-top $top-height px
      line-height 40px
      height 40px
      box-sizing border-box
      border-bottom 1px solid $light-border-color
      .el-tag
        box-sizing border-box
        height 40px
        line-height 40px
        border-radius 0
        background none
        border none
        border-right 1px solid $light-border-color
        color $main-text-color
        &.active
          background rgb(233,233,233)
    #top
      transition left linear .2s
      position fixed
      top 0
      left 220px
      right 0
      height $top-height px
      background white
      z-index 9999
      &.miniScreen
        left 65px

@media screen and (max-width : 1000px){
  #left{
    width 100%
    background rgba(0,0,0,0.4)
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 999
    display none
    }
  #left.fullScreen{
    display flex
  }
  .wrap #top{
    left 0px
  }
  .wrap #top.miniScreen{
    left 0
  }
  .wrap #top.fullScreen{
    left 220px
  }
}
</style>
