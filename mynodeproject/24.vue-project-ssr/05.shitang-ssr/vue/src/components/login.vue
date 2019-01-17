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
        <p>智慧食堂</p>
      </div>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm loginform">
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
          <!-- <el-button class="btn btn_reset" @click="resetForm('ruleForm2')">重置</el-button> -->
          <el-button class="btn btn_reset" @click="signUp">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 注册 -->
    <el-dialog
    title="注册"
    style="text-align:center"
    :show-close="showClose"
    :visible.sync="dialogVisible">
    <el-form status-icon class="demo-ruleForm signupForm" :rules="signUpFormRules" ref="signUpForm" :model="signUpForm" label-width="70px">
      <el-form-item prop="Sex" label="性别：">
        <el-select v-model="signUpForm.Sex" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="Account" label="用户名：">
        <el-input type="text" placeholder="请填写用户名" v-model="signUpForm.Account"></el-input>
      </el-form-item>
      <el-form-item prop="Password" label="密码：">
        <el-input type="password" placeholder="请填写密码" v-model="signUpForm.Password"></el-input>
      </el-form-item>
      <el-form-item prop="Name" label="姓名：">
        <el-input type="text" placeholder="请填写姓名" v-model="signUpForm.Name"></el-input>
      </el-form-item>
      <el-form-item prop="Mobile" label="手机号：">
        <el-input type="text" placeholder="请填写手机号" v-model="signUpForm.Mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer text-center">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitsignUpForm('signUpForm')">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</transition>

</template>

<script>
import Loading from '@/base/loading'
import {mapMutations, mapState} from 'vuex'

export default {
  data () {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
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
      showClose: false,
      dialogVisible: false,
      ruleForm2: {
        pass: '', // '123321',
        user: '' // 'Sundar'
      },
      signUpForm: {Sex: '0', Account: '', Password: '', Name: '', Mobile: ''},
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'change' }
        ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ]
      },
      signUpFormRules: { // 注册表的验证
        Account: [{ validator: checkUser, trigger: 'blur' }],
        Password: [{ validator: checkUser, trigger: 'blur' }]
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
    submitForm (formName) { // 登录接口
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
            if (res.data.Code === 1) { // 验证成功
              this.setUserToken(res.data.Data)
              setTimeout(() => { // 为了有登录请求的样式，这里做个延时
                this.showLoad = false
                this.$router.push('/index')
              }, 1000)
            } else {
              this.resetForm(formName)
              this.showLoad = false
              this.$alert(res.data.Message, {customClass: 'myConfirm'})
            }
          }).catch(res => {
            this.resetForm(formName)
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
    resetForm (formName) { // 重置表格数据
      this.canUse = false
      this.$refs[formName].resetFields()
    },
    signUp () { // 注册
      this.dialogVisible = true
    },
    submitsignUpForm (form) { // 注册接口
      this.$axios.post(`api/AppUser/Add?CanteenToken=${this.userToken}`, {...this.signUpForm}).then(res => {
        console.log(res)
        if (res.data.Code === 1) { // 注册成功
          this.dialogVisible = false
          this.$message({message: '注册成功，可以用此账号登录啦！！', type: 'success'})
        } else {
          this.$alert(res.data.data.Message, {customClass: 'myConfirm'})
        }
      }).catch(res => {

      })
    },
    ...mapMutations({
      'setUserToken': 'SET_USER_TOKEN'
    })
  },
  computed: {
    ...mapState(['userToken'])
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
  .iconfont
    position absolute
    left 0
    top 0
    color white

</style>
