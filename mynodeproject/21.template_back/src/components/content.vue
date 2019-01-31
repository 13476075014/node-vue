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
            <template
              v-for="(tag,index2) in dynamicTags"
              >
              <el-tag
                :key="index2"
                @click.native="tagClick(index2)"
                :closable="index2 === 0 ? false : true"
                class="el-tag"
                :class="[tag.icon,dynamicTags_active_index === index2 ? 'active' : '']"
                :disable-transitions="false"
                @close="handleClose(tag)">

                {{tag.text}}

              </el-tag>
            </template>
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
import {url, apiMenuAuthQuery} from '@/assets/js/config'
import {mapMutations} from 'vuex'

const fullScreenWidth = 1000

  export default{
    data () {
      return {
        dynamicTags: [{text:'主页', href:'/index/main-one', icon:'el-icon-edit'}],
        isCollapse:false,
        dynamicTags_active_index:0,
        themeColor:'bg-black'
      }
    },
    created () {
      this.init()
    },
    mounted () {
      this.fitAddress()
    },
    activated () {
      // alert(1)
    },
    methods:{
      init () {

      },
      changeIsCollapse () {
        this.isCollapse = !this.isCollapse
      },
      changeTheme (color) {
        this.themeColor = color
      },
      handleClose (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        this.dynamicTags_active_index = 0
        this.$router.push('/index/main-one')
      },
      addTag (href, text) { // 添加头部tag
        const index = this.dynamicTags.findIndex(function (item) { // 看现在tag里面有没有
          return item.text == text
        })
        const length = this.dynamicTags.length
        let nowIndex = length
        if (index < 0) { // 现在tag没有的话，就加进去
          this.$set(this.dynamicTags, length, {text:text, href:href})
        } else { // 有的话
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
        let myUrl = url[this.dynamicTags[index]['href']]
        const text = this.dynamicTags[index]['text']
        this.setModulecode(text)
        if (!myUrl) {
          myUrl = `/index/baseTable?modulecode=${text}`
        } else {
           myUrl = `${myUrl}?modulecode=${text}`
        }
        this.$router.push(myUrl)
        this.dynamicTags_active_index = index
      },
      fitAddress () {
        const path = this.$route.path
        if (path == '/index/main-one') {
          return false
        }
        const text = this.$route.query.modulecode
        this.addTag(apiMenuAuthQuery[text].href, text)
      },
       ...mapMutations({'setModulecode':'SET_MODULECODE'})
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
    overflow hidden
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
      box-sizing border-box
      overflow hidden
      .contentView
        width 100%
        padding 15px
        box-sizing border-box
        height calc(100% - 103px)
    .menuLand
      // margin-top $top-height px
      line-height 40px
      height 40px
      box-sizing border-box
      border-bottom 1px solid $light-border-color
      background white
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
      // position fixed
      // top 0
      // left 220px
      // right 0
      height $top-height px
      background white
      // z-index 9999
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
