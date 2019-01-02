<!-- 这个是首页页面 -->
<template>
<transition name="slide">
  <div v-if="show" class="main" id="index">
    <div v-if="showLoad" ref="loading" class="loading_out">
      <loading :title="loadTitle" class="loading"></loading>
    </div>
    <my-head @back="back" :showArrow="showArrow" :title="headTitle">
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
            <el-menu-item @click="logout" index="2-1">
              退出
            </el-menu-item>
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
      <div class="pullOut">
        <pull ref="pull" :pullUpLoad="pullUpLoad" :hasradius="hasradius" @onPullingDown="onPullingDown" :items="items" class="pull">
          <p>{{nowDay}}</p>
          <p>{{nowWeek}}</p>
          <ul>
            <li @click="selectFood(item.ImageUrl,item.Name)" v-for="(item,index) in items" :key="index">
              {{item.Name}}
            </li>
          </ul>
        </pull>
      </div>
      <div class="sub">
        <el-button :class='{btn:true}' type="primary" @click="submitForm()">提交点评</el-button>
      </div>
    </div>
  <my-bottom :index_active="activebottom" @changeTab="changeTab"></my-bottom>
  <el-dialog
    title="填写评价"
    style="text-align:center"
    :show-close="showClose"
    :visible.sync="dialogVisible"
    :before-close="handleClose">
    <el-form status-icon class="demo-ruleForm" :rules="rateRules" ref="rateForm" :model="rateForm" label-width="0px">
      <el-form-item prop="productID">
        <el-select v-model="rateForm.productID" placeholder="请选择对哪道菜评价">
          <el-option :label="item.Name" :value="item.Id" v-for="(item,index) in items" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="Content">
        <el-input type="textarea" placeholder="请填写评价" rows="6" v-model="rateForm.Content"></el-input>
      </el-form-item>
      <el-form-item prop="star" label="对菜单评分：" label-width="100px">
        <el-rate
          style="height:auto;padding-top:11px;"
          class="star"
          v-model="rateForm.star">
        </el-rate>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitFormRate('rateForm')">确 定</el-button>
    </span>
  </el-dialog>
  <keep-alive>
    <router-view @changtab="changtab2"></router-view>
  </keep-alive>
  </div>
  </transition>
</template>

<script>
import myHead from '@/base/head'
import Carousel from '@/base/carousel'
import MyBottom from '@/base/bottom'
import pull from '@/base/scrollupAndDown' // 上拉加载，下拉刷新的组件
import {mapState, mapMutations} from 'vuex'
import {clearUserToken} from '@/store/cache'
import Loading from '@/base/loading'

export default {
  data () {
    var check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    return {
      activebottom: 0,
      activeIndex2: '1',
      collapse_transition: true,
      headTitle: '校园食堂',
      hasradius: true,
      showArrow: false,
      dialogVisible: false,
      showLoad: false,
      show: false,
      pullUpLoad: false, // 关闭上拉加载
      showClose: false,
      rateForm: {Content: '', star: 0, productID: ''},
      loadTitle: '正在退出',
      items: [],
      rateRules: {
        Content: [
          { validator: check, trigger: 'blur' }
        ],
        star: [
          { validator: check, trigger: 'blur' }
        ],
        productID: [
          { validator: check, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initItem()
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  methods: {
    initItem () { // 后台获取菜品数据
      this.$axios.get('api/APPProduct/GetTodayProductList').then(res => {
        console.log(res)
        if (res.data.Code === 1) { // 获取数据成功
          this.items = res.data.Data
        }
      }).catch(res => {
        this.$refs.pull.forceUpdate()
      })
    },
    onPullingDown () { // 下拉刷新
      setTimeout(() => {
        this.initItem()
      }, 1000)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    back () {
      this.headTitle = '校园食堂'
      this.showArrow = false
    },
    changeTab (index, path, text) { // 底部tab点击事件
      this.activebottom = index * 1
      this.$router.push('/index' + path)
      if (index === 0) {
        text = '校园食堂'
      }
      this.headTitle = text
    },
    changtab2 (index) { // 根据路由强制改变tab
      if (this.activebottom !== index * 1) {
        this.activebottom = index * 1
      }
    },
    logout () { // 退出事件
      // this.$router.push('/login')
      this.showLoad = true
      if (this.userToken) {
        this.$axios({
          method: 'post',
          url: 'api/AppLogin/Logout?token=' + this.userToken
        }).then(res => {
          if (res.data.Code === 1) {
            setTimeout(() => {
              this.showLoad = false
              this.setUserToken(clearUserToken())
              this.$router.push('/login')
            }, 1000)
          } else {
            setTimeout(() => {
              this.showLoad = false
              console.log(res.data.Message)
              this.$router.push('/login')
            }, 1000)
          }
        }).catch(res => {
          this.showLoad = false
          this.$alert('请求错误', {
            customClass: 'myConfirm'
          })
          this.$router.push('/login')
        })
      } else {
        this.$router.push('/login')
      }
    },
    selectFood (item, name) {
      this.headTitle = name
      this.showArrow = true
      this.$router.push({name: 'foodDetail', params: {img: item}})
    },
    submitForm () { // 提交点评
      this.dialogVisible = true
    },
    handleClose (done) {

    },
    submitFormRate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证成功
          this.$axios({
            method: 'get',
            url: `api/APPProduct/CommentProduct?productID=${this.rateForm.productID}&star=${this.rateForm.star}&Content=${this.rateForm.Content}&CanteenToken=${this.userToken}`
          }).then(res => {
            console.log(res)
            if (res.data.Code === 1) { // 验证成功
              this.$message({message: '操作成功', type: 'success'})
              this.dialogVisible = false
            } else {
              this.$message({message: res.data.Message, type: 'error'})
              this.dialogVisible = false
            }
            this.$refs['rateForm'].resetFields()
          }).catch(res => {
            this.$refs['rateForm'].resetFields()
            this.$alert('请求出错！！', {
              customClass: 'myConfirm'
            })
          })
        } else {
          this.$refs['rateForm'].resetFields()
          console.log('error submit!!')
          return false
        }
      })
    },
    ...mapMutations({
      'setUserToken': 'SET_USER_TOKEN'
    })
  },
  components: {
    MyBottom,
    pull,
    myHead,
    Carousel,
    Loading
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
    },
    ...mapState(['userToken'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styl/mixin'
.slide-enter-active
  transition all linear .2s
.slide-enter,.slide-leave-to
  opacity 0
.loading_out
    position fixed
    top 0
    bottom 0
    z-index 999
    background rgba(255,255,255,0.7)
    width 100%
    .loading
      height 100%
.content
  padding-top 45px
  height 100vh
  // background rgb(219,217,218)
  text-align center
  position relative
  .pullOut
    position: absolute
    left: 40px
    top: 160px
    right: 40px
    bottom: 120px
    // background rgb(242,242,242)
    background url('../assets/imgs/bg12.jpg') left no-repeat
    background-size cover
    border-radius 10px
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
      cursor pointer
</style>
