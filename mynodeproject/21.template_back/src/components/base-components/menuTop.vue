<template>
  <div class="menuTop">
    <div class="fl_wrap">
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <div class="fl_left" style="line-height:61px;padding-left:5px;" @click="toggleMenu">
          <i :class="changeMenuIcon"></i>
        </div>
        <el-menu-item  class="el-menu-item" index="2">订单管理</el-menu-item>
        <el-menu-item  class="el-menu-item fl_right" index="3">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              我的<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>基本资料</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <router-link to="/">
                <el-dropdown-item divided>
                退出
                </el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item class="el-menu-item fl_right" index="4"><i class="el-icon-bell"></i></el-menu-item>
        <el-menu-item class="el-menu-item fl_right" index="5" @click="changeTheme"><i class="iconfont icon-diaosebanpalette3"></i></el-menu-item>
      </el-menu>
    </div>

  <el-dialog title="主题更改" :modal-append-to-body="false" :visible.sync="dialogThemeVisible">
    <el-button @click="thmemColor('bg-blue')" type="primary" round>蓝色主题</el-button>
    <el-button @click="thmemColor('bg-black')" type="info" round>黑色主题</el-button>
  </el-dialog>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        dialogThemeVisible:false
      }
    },
    methods:{
      handleSelect (key, keyPath) {

      },
      toggleMenu () {
        this.$emit('changeIsCollapse')
      },
      changeTheme () {
        this.dialogThemeVisible = true
      },
      thmemColor (color) {
        this.$emit('changeTheme', color)
        this.dialogThemeVisible = false
      }
    },
    props:{
      changeMenuIcon:{
        type:String,
        default:'el-icon-d-arrow-left'
      }
    }
  }

</script>

<style lang="stylus" scoped>
.el-menu-item
  transition border linear .2s
  &:hover
    border-bottom 2px solid #409eff!important
  i
    font-size 20px
</style>
