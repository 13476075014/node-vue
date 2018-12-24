<template>
<transition name="slide">
  <div v-if="show" class="login">
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
          <el-input placeholder="密码" class="pass defaultInput" type="password" v-model="ruleForm2.pass" autocomplete="off">
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
      this.canUse = false
      this.$refs[formName].resetFields()
    }
  },
  components: {

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
  .bg
    width 100%
    position fixed
    left 0
    top 0
    height 100vh
    z-index -1
    background url('../assets/imgs/bg9.jpg') center no-repeat
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
