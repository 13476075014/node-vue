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
                  <el-input placeholder="密码必须是由数字，字母组成的6位" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pass2">
                  <el-input type="password" placeholder="输入前面设置的密码" v-model="ruleForm2.pass2" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="email" label="邮箱" auto-complete="off">
                  <el-input type="text" v-model="ruleForm2.email"></el-input>
                </el-form-item> -->
                <el-form-item prop="phone" label="手机号" auto-complete="off">
                  <el-input placeholder="输入有效的手机号码" type="text" v-model="ruleForm2.phone"></el-input>
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
    var zz = /^\d{6}$/;
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(zz.test(value)){
          callback();
        } else {
          callback(new Error('必须是6位的密码'));
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
          // email:'',
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
          // email:[
          //   {required:true,message:'请输入邮箱',trigger:'blur'},
          //   { validator: checkName, trigger: 'blur' }
          // ],
          phone:[
            {required:true,message:'请输入正确手机号',trigger:'blur'} //简单的验证
          ]
        }
      };
    },
    methods: {
      submitForm(formName) { //注册按钮的点击
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {//验证成功
                if(_this.checked){ //同意了一些协议后才让注册
                     _this.$reqs.post('/users/register',{user:_this.ruleForm2}).then(result =>{
                        if(result.data.success){
                              _this.$message({message:"注册成功", type:'success'});
                              _this.$router.push('/');
                        }else{
                            _this.$message({message:result.data.err, type:'error'});
                        }
                      }).catch(err =>{
                            console.log(err);
                      })
                }else{ //没有点击同意协议
                      _this.$message({'message':"必须同意用户协议才可以进行验证",type:'error'})
                }

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
    .login_inner{background:white;padding:20px calc(10% + 50px) 40px;border:1px solid rgb(200,200,200);}
    .login_inner .login_btn{margin-bottom:25px;}
    .login_more{text-align: left;}
    .login_more .remerber{margin-left:80px;}
    .login_more p{font-size:14px;text-align: left;padding-left:80px;}
</style>


