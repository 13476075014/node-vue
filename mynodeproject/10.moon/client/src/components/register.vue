<template>
  <div id="login">
    <el-row>
      <el-col :span="10" :offset="7">
          <div class="login_inner">
              <el-button-group class="login_btn">
                <el-button type="defult">
                  <router-link to="/">登陆</router-link>
                </el-button>
                <el-button type="info">
                   <router-link to="/register" style="color:white;">注册</router-link>
                </el-button>
              </el-button-group>

              <el-form style="margin-bottom:20px;" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="95px" class="demo-ruleForm">
                <el-form-item label="用户名设置" prop="username">
                  <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码设置" prop="pass">
                  <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pass2">
                  <el-input type="password2" v-model="ruleForm2.pass2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱" auto-complete="off">
                  <el-input type="text" v-model="ruleForm2.email"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号" auto-complete="off">
                  <el-input type="text" v-model="ruleForm2.phone"></el-input>
                </el-form-item>

                <div class="login_more">
                  <el-checkbox v-model="checked" class="remerber">《******协议》</el-checkbox>
                  <p>您必须统一会员协议，才可以注册</p>
                </div>
                <el-form-item class="login_submit">
                  <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"register",
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var checkName= (rule,value,callback) =>{
          if(value === ""){
            callback(new Error('请输入用户名'));
          }else{
            callback();
          }
      };
      var pass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        checked:false,
        ruleForm2: {
          email:'',
          pass: '',
          pass2: '',
          username:"",
          phone:""
        },
        rules2: {
          username:[
            { validator: checkName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass2:[
            { validator: pass2, trigger: 'blur' }
          ],
          email:[
            {required:true,message:'请输入邮箱',trigger:'blur'},
            { validator: checkName, trigger: 'blur' }
          ],
          phone:[
            {required:true,message:'请输入正确手机号',trigger:'blur'},
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) { //注册按钮的点击
        this.$refs[formName].validate((valid) => {
          if (valid) {//验证成功
            var user = {};
            user.username = this.ruleForm2.username;
            user.password = this.ruleForm2.pass;
            user.phone = this.ruleForm2.phone;
            user.email = this.ruleForm2.email;
          } else {//验证失败
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
     #login{border-bottom:5px solid rgb(241,241,241);padding:80px 0 40px;background:url('../assets/images/login_03.png')left top no-repeat;background-size:cover;}
    .login_inner{background:white;padding:20px calc(15% + 50px) 40px;border:1px solid rgb(200,200,200);}
    .login_inner .login_btn{margin-bottom:25px;}
    .login_more{text-align: left;}
    .login_more .remerber{margin-left:80px;}
    .login_more p{font-size:14px;text-align: left;padding-left:80px;}
</style>


