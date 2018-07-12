<!--注册页面-->

<template>
	<div class="backlogin">
		<div id="can"></div>
    <el-form :model="ruleForm2" :ref="ruleForm2" status-icon :rules="rules2" label-width="100px" class="demo-ruleForm" style="width:400px;margin:10px auto;background:rgba(255,255,255,0.8);padding:30px;">
      <div class="title">注册</div>
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input type="file" v-model="ruleForm2.avatar"></el-input>
      </el-form-item>
      <el-form-item label="个性签名" prop="description">
        <el-input type="text" v-model="ruleForm2.description"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm2.gender" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm2)">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>

   </el-form>
  </div>
</template>

<script>
	import snow from "../../static/snow.js" ; //这里是引进用到的登录页的背景效果的插件


	export default {
      name: 'backlogin',
      data () {
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
      var need = (rule,value,callback) => {
        if(value === ""){
          callback(new Error("内容不能为空"))
        }else{
          callback();
        }
      };
      var pass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        options:[{label:"男",value:"m"},{label:"女",value:"f"},{label:"保密",value:"x"}],
        ruleForm2: {
          password: '',
          checkPass: '',
          name:"",
          gender:"",
          description:"",
          avatar:""
        },
        rules2: {
          name:[
            { validator: checkName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass:[
            { validator: pass2, trigger: 'blur' }
          ],
          gender:[
            { validator: need, trigger: 'blur' }
          ],
          description:[
            { validator: need, trigger: 'blur' }
          ],
          avatar:[
            { validator: need, trigger: 'blur' }
          ]
        }
      };

      },
      mounted:function(){
      	var can = document.querySelector('#can');
    	snow.a(can); //这里是调用上面的背景效果插件的a方法，并且传参数，来选择要把canvas放到哪个标签里面

      },
      created:function(){

      },
      methods:{
          submitForm(ruleForm2){//注册按钮点击事件
            var _this = this;
            this.$refs[ruleForm2].validate((valid) => {
              if(valid){//前端校验成功
                    _this.$reqs.post("/users/signup",{user:ruleForm2}).then(function(result){
                        if(result.data.state > 0){
                          _this.$message = {message:"成功,一秒后跳转到登录页面",type:"error"};
                          setTimeout(function(){
                            _this.$router.push("/");
                          },1000)

                        }
                    })

              }else{
                  _this.$message={message:"请按照规范来填写信息",type:"error"}
              }

            })

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header{
        height: 60px;
        box-shadow: 0 1px 5px rgba(13,62,73,0.2) ;
    }
    .header img{
        width: 170px;
        margin-top: 12px;
        margin-left: 15px;
        float: left;
    }
    .header span{
        float: left;
        color: #566a80;
        margin: 21px 0 0 20px;
    }
    .login_box{
        width: 320px;
        margin: 50px auto;
        padding:20px;
        background:rgba(255,255,255,0.7);
    }
    .login_box .myinput{
        width: 100%;
        border: 1px solid #cad3de;
        height: 40px;
        line-height: 40px;
        margin: 5px 0 10px;
        border-radius: 3px;
        padding: 0 10px;
        outline: none;
        box-sizing: border-box;
    }
    .login_box .myinput:focus{
        border: 1px solid #4289dc;
    }
    .login_other{
        overflow: hidden;
    }

    .login_other a{
        float: right;
        color: #727f8f;
    }
    .login_other a:hover{
        color: #273444;
    }
    .login_other input, .login_other label{
        float: left;
        color: #727f8f;
    }
    .login_other input{
        margin: 4px 5px 0 0;
    }
    .login{
        box-sizing: border-box;
        border: none 0;
        height: 44px;
        line-height: 44px;
        width: 100%;
        background:#4187db;
        font-size: 16px;
        border-radius: 3px;
        margin-right: 40px;
        transition: all 0.5s ease;
        cursor: pointer;
        outline: none;
        color: #fff;
        margin-top: 15px;
    }
    .login:hover{
        background: #2668b5;
    }
    .login[disabled]{
        opacity: 0.8;
    }
    .login[disabled]:hover{
        background:#4187db;
    }
    .title{
        color: #273444;
        font-size: 1.5em;
        text-align: center;
        margin: 0 0 20px 0;
    }

    @media only screen and (max-width: 768px) {
        .login_box{
            width: 280px;
            margin: 50px auto;
        }
    }

     #captcha {
            width: 100%!important;
            display: inline-block;
        }

     #wait {
            text-align: left;
            color: #666;
            margin: 0;
        }


</style>
