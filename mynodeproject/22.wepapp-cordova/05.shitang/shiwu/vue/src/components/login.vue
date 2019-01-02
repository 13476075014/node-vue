<template>
<transition name="slide">
  <div v-if="show" class="login">
    <div v-if="showLoad" ref="loading" class="loading_out">
      <loading class="loading"></loading>
    </div>
    <div class="bg"></div>
    <div class="content">
      <div class="top">
        <div class="img">
          <img src="../assets/imgs/bar1.jpg" alt="">
        </div>
        <p>校园食堂</p>
      </div>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item style="" label="" prop="user">
          <i class="iconfont">&#xe63d;</i>
          <el-input placeholder="用户名" class="user defaultInput" v-model="ruleForm2.user"></el-input>
        </el-form-item>
        <el-form-item class="passOut" prop="pass">
          <i class="iconfont">&#xe63b;</i>
          <el-input placeholder="密码" class="pass defaultInput" type="password" v-model="ruleForm2.pass">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button :class='{btn:true,canUse:canUse}' type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button class="btn btn_reset" @click="resetForm('ruleForm2')">重置</el-button>
          <!-- <div class="moreLoginWay">
            <el-row>
              <el-col :span="12">
                短信验证登录
              </el-col>
              <el-col style="text-align:right;" :span="12">
                手机快速注册
              </el-col>
            </el-row>
          </div> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</transition>

</template>

<script>
import Loading from '@/base/loading'
import {mapMutations} from 'vuex'

export default {
  data () {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!this.ruleForm2.user) {
        this.ruleForm2.pass = ''
        callback(new Error('请先输入用户名'))
      } else if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        this.canUse = true
        callback()
      }
    }
    return {
      show: false,
      canUse: false,
      showLoad: false,
      ruleForm2: {
        pass: '123321',
        user: 'Sundar'
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.ruleForm2.user && this.ruleForm2.pass) {
      this.canUse = true
    }
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证成功
          this.showLoad = true
          this.$axios({
            method: 'post',
            url: 'api/AppLogin/Login',
            data: {
              'Account': this.ruleForm2.user,
              'Password': this.ruleForm2.pass
            }
          }).then(res => {
            // console.log(res)
            if (res.data.Code === 1) { // 验证成功
              this.setUserToken(res.data.Data)
              setTimeout(() => { // 为了有登录请求的样式，这里做个延时
                this.showLoad = false
                this.$router.push('/index')
              }, 1000)
            } else {
              this.$alert(res.Message, {customClass: 'myConfirm'})
            }
          }).catch(res => {
            this.showLoad = false
            this.$alert('请求出错！！', {
              customClass: 'myConfirm'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.canUse = false
      this.$refs[formName].resetFields()
    },
    ...mapMutations({
      'setUserToken': 'SET_USER_TOKEN'
    })
  },
  components: {
    Loading
  },
  watch: {
    'ruleForm2.pass' (val) {
      // console.log(val)
      if (val.pass && val.user) {
        this.canUse = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styl/mixin'

.slide-enter-active
  transition all linear .2s
.slide-enter,.slide-leave-to
  opacity 0
.login
  .loading_out
    position fixed
    top 0
    bottom 0
    z-index 999
    background rgba(255,255,255,0.7)
    width 100%
    .loading
      height 100%
  .bg
    width 100%
    position fixed
    left 0
    top 0
    height 100vh
    z-index -1
    background url('~@/assets/imgs/bg9.jpg') center no-repeat
    background-size cover
    filter blur(4px)
  .content
    padding-top 45px
    height 100vh
    background rgba(0,0,0,0.3)
    .top
      text-align center
      color white
      .img
        border-radius 100%
        height 84px
        width 84px
        margin 0 auto
        overflow hidden
        border 2px solid rgb(244,244,244)
        text-align center
        img
          width 80px
          height 80px
          padding 5px
          border-radius 100%
      p
        margin-top 10px
        font-weight 900
        font-size 20px
    .demo-ruleForm
      padding 40px
  .btn
    background rgb(255,217,74)
    border none
    border-radius 15px
    line-height 15px
    display block
    width 100%
    margin 0 auto
    margin-top 30px
    padding 8px
    opacity 0.8
    &.canUse
      opacity 1
    &.btn_reset
      opacity 1
      margin-top 10px
      background white
      border 1px solid $color-text-yellow
      color $color-text-yellow
  .passOut
    position relative
  .moreLoginWay
    color $color-text-ll
  .iconfont
    position absolute
    left 0
    top 0
    color white

</style>
