<template>
	<div class="backlogin">
		<div id="can"></div>
      <div class="login_box">
          <div class="title">后台登录</div>
          <div>
              <input class="myinput username" type="text" placeholder="手机号/用户名" v-model="username" />
          </div>
          <div>
              <input @keyup.13="login" class="myinput password" type="password" placeholder="口令" v-model="password" />
          </div>
          <!--极客验证的使用-->
            <div>
              <div id="captcha">
              <p id="wait" class="show">正在加载验证码......</p>
          </div>
      </div>

      <div class="login_other">
          <a href="javascript:;">找回密码</a>
          <input type="checkbox" id="remenberme" /><label for="remenberme">记住我</label>
      </div>
      <!--<button :disabled="disablebtn" class="login" @click="login">{{loginText}}</button>-->
      <button :disabled="disablebtn" class="login" id="btn">{{loginText}}</button>
      </div>
  </div>
</template>

<script>
import snow from '@/assets/js/snow' // 这里是引进用到的登录页的背景效果的插件
import '../assets/js/jquery-1.9.0.js'
import '../assets/js/gt.js'
import sli from '../assets/js/slider.js'

export default {
  name: 'backlogin',
  data () {
    return {
      username: 'admin2' /* TODO:先预存测试值，以免手动输入 */,
      password: '123456',
      disablebtn: false,
      loginText: '登录',
      checked: true
    }
  },
  mounted: function () {
    var can = document.querySelector('#can')
    snow.a(can) // 这里是调用上面的背景效果插件的a方法，并且传参数，来选择要把canvas放到哪个标签里面
  },
  created: function () {
    sli(this)
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 60px;
  box-shadow: 0 1px 5px rgba(13, 62, 73, 0.2);
}
.header img {
  width: 170px;
  margin-top: 12px;
  margin-left: 15px;
  float: left;
}
.header span {
  float: left;
  color: #566a80;
  margin: 21px 0 0 20px;
}
.login_box {
  width: 320px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
}
.login_box .myinput {
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
.login_box .myinput:focus {
  border: 1px solid #4289dc;
}
.login_other {
  overflow: hidden;
}

.login_other a {
  float: right;
  color: #727f8f;
}
.login_other a:hover {
  color: #273444;
}
.login_other input,
.login_other label {
  float: left;
  color: #727f8f;
}
.login_other input {
  margin: 4px 5px 0 0;
}
.login {
  box-sizing: border-box;
  border: none 0;
  height: 44px;
  line-height: 44px;
  width: 100%;
  background: #4187db;
  font-size: 16px;
  border-radius: 3px;
  margin-right: 40px;
  transition: all 0.5s ease;
  cursor: pointer;
  outline: none;
  color: #fff;
  margin-top: 15px;
}
.login:hover {
  background: #2668b5;
}
.login[disabled] {
  opacity: 0.8;
}
.login[disabled]:hover {
  background: #4187db;
}
.title {
  color: #273444;
  font-size: 1.5em;
  text-align: center;
  margin: 0 0 20px 0;
}

@media only screen and (max-width: 768px) {
  .login_box {
    width: 280px;
    margin: 50px auto;
  }
}

#captcha {
  width: 100% !important;
  display: inline-block;
}

#wait {
  text-align: left;
  color: #666;
  margin: 0;
}
</style>
