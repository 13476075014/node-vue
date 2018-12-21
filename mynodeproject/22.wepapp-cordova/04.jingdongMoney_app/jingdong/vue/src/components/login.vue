<template>
<transition name="slide">
  <div v-if="show" class="login">
    <my-head :title="headTitle"></my-head>
    <div class="content">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item style="" label="" prop="user">
          <el-input placeholder="用户名" class="user defaultInput" v-model="ruleForm2.user"></el-input>
        </el-form-item>
        <el-form-item class="passOut" prop="pass">
          <el-input placeholder="密码" class="pass defaultInput" type="password" v-model="ruleForm2.pass" autocomplete="off">
          </el-input>
          <span>忘记密码</span>
        </el-form-item>
        <el-form-item>
          <el-button :class='{btn:true,canUse:canUse}' type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button class="btn btn_reset" @click="resetForm('ruleForm2')">重置</el-button>
          <div class="moreLoginWay">
            <el-row>
              <el-col :span="12">
                短信验证登录
              </el-col>
              <el-col style="text-align:right;" :span="12">
                手机快速注册
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
      <div class="bottom">
          <el-row class="inner">
            <el-col class="left" :span="8">

            </el-col>
            <el-col class="center" :span="8">
              其他登录方式
            </el-col>
            <el-col class="left" :span="8">

            </el-col>
          </el-row>
          <div class="iconOut">
            <div class="left">
              <i class="icon iconfont">&#xe6b1;</i>
              <p>QQ</p>
            </div>
             <div class="right">
              <i class="icon iconfont">&#xe600;</i>
              <p>微信</p>
            </div>
          </div>
          <p class="contract">
            登录即代表您已同意<a href="">隐私政策</a>
          </p>
      </div>
    </div>
  </div>
</transition>

</template>

<script>
import MyHead from '@/base/head'

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
      headTitle: 'money登录',
      ruleForm2: {
        pass: '',
        user: ''
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
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证成功
          this.$router.push('/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
    MyHead
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styl/mixin'

.slide-enter-active
  transition all linear .5s
.slide-enter,.slide-leave-to
  opacity 0
.login
  padding 0 15px
  .content
    padding-top 45px
  .btn
    background rgb(251,181,179)
    border none
    border-radius 30px
    line-height 30px
    display block
    width 100%
    margin 0 auto
    &.canUse
      background #FB8986
    &.btn_reset
      margin-top 10px
      background white
      border 1px solid $color-text-light-red
      color $color-text-light-red
  .passOut
    position relative
    span
      position absolute
      right 0
      top 0
      border-left 1px solid rgb(222,222,222)
      padding 0px 20px
      padding-right 0
      line-height 20px
      margin-top 10px
  .moreLoginWay
    color $color-text-ll
  .bottom
    padding 0 15px
    padding-bottom 70px
    position fixed
    bottom 0
    left 0
    right 0
    .inner
      display flex
      align-items center
      font-size 12px
      text-align center
      color $color-text-ll
      line-height 30px
      .left
        height 1px
        background rgb(222,222,222)
    .iconOut
      padding-top 20px
      display flex
      text-align center
      justify-content center
      padding-bottom 30px
      .left
        color $color-text-ll
        margin-right 15px
        .icon
          color rgb(231,247,254)
          font-size 40px
      .right
        margin-left 15px
        color $color-text-ll
        .icon
          font-size 40px
          color rgb(230,248,240)
    .contract
      text-align center
      color $color-text-ll
      a
        color rgb(99,178,255)

</style>
