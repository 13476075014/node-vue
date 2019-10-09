<template>
  <div id="login">
    <el-row>
      <el-col :span="10" :offset="7">
          <div class="login_inner">
              <el-button-group class="login_btn">
                <el-button type="info">
                  <router-link to="/" style="color:white;">登陆</router-link>
                </el-button>
                <el-button type="default">
                   <router-link to="/register">注册</router-link>
                </el-button>
              </el-button-group>

              <el-form style="border-bottom:1px solid rgb(213,213,213);margin-bottom:20px;" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                  <el-input type="text" class="username" v-model="ruleForm2.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" class="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                 <!--极客验证的使用-->
                <div>
                    <div id="captcha">
                      <p id="wait" class="show">正在加载验证码......</p>
                    </div>
                </div>

                <div class="login_more">
                  <el-checkbox v-model="checked" class="remerber">记住密码</el-checkbox>
                  <a href="">忘记密码？</a>
                  <!-- <p>短信验证码登陆</p> -->
                </div>

                <el-form-item class="login_submit">
                  <el-button type="primary" id="btn">登录</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>

              <div style="text-align:left;" class="login_other">
                    其他登录： <img src='../assets/images/login_05.png' alt=""> <img src='../assets/images/login_06.png' alt=""> <img src='../assets/images/login_04.png' alt="">
              </div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import jqu from "../assets/js/jquery-1.9.0.js" ;
	import gt from "../assets/js/gt.js" ;  //极客验证的包
	import sli from "../assets/js/slider.js" ;  //极客验证的包


export default {
  name:"login",
  data() {
      var validatePass = (rule, value, callback) => { //表单密码的验证
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var checkName= (rule,value,callback) =>{//表单用户名的验证
          if(value === ""){
            callback(new Error('请输入用户名'));
          }else{
            callback();
          }
      };
      return {
        checked:false,
        ruleForm2: {//表单里面的字段
          pass: '',
          checkPass: '',
          username:""
        },
        rules2: {
          username:[
            { validator: checkName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },





  methods: {
    //登录的放在了slider.js里面；
      resetForm(formName) {//重置表单
        this.$refs[formName].resetFields();
      }
    },
  created:function(){//调用极客验证里面的方法，来进行验证和登录请求
    sli(this);
  }
}
</script>

<style scoped>
     #login{border-bottom:5px solid rgb(241,241,241);padding:80px 0 40px;background:url('../assets/images/login_03.png')left top no-repeat;background-size:cover;}
    .login_inner{background:white;padding:20px calc(15% + 50px) 40px;border:1px solid rgb(200,200,200);}
    .login_inner .login_btn{margin-bottom:25px;}
    .login_other img{width:30px;height:15px;}
    .login_more{text-align: left;margin-bottom:15px;}
    .login_more .remerber{margin-left:80px;}
    .login_more a{float:right;font-size:14px;color:crimson;}
    .login_more p{font-size:14px;text-align: left;padding-left:80px;}
</style>


