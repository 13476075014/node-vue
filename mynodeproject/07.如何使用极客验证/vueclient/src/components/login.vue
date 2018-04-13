<template>
  <div class="login">
    <h1>滑动模式</h1>
    <form id="form">
        <div>
            <label for="username">用户名：</label>
            <input class="inp" id="username" type="text" value="用户名">
        </div>
        <br>
        <div>
            <label for="password">密码：</label>
            <input class="inp" id="password" type="password" value="123456">
        </div>
        <br>
        <div>
            <label>完成验证：</label>
            <div id="captcha">
                <p id="wait" class="show">正在加载验证码......</p>
            </div>
        </div>
        <br>
        <div id="btn" class="btn">提交</div>
    </form>
  </div>
</template>

<script>
import jqu from "../../static/js/jquery-2.1.0.js" ; //在验证插件里面有用到jquery方便对节点的操作
import gt from "../../static/js/gt.js" ;//用于加载id对应的验证码库，并支持宕机模式 * 暴露 initGeetest 进行验证码的初始化
import slid from "../../static/js/slider.js" ; //页面对接口的调用



export default {
  name: 'login',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
            margin: 50px 0;
            text-align: center;
            font-family: "PingFangSC-Regular", "Open Sans", Arial, "Hiragino Sans GB", "Microsoft YaHei", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
        }

        .inp {
            border: 1px solid #cccccc;
            border-radius: 2px;
            padding: 0 10px;
            width: 278px;
            height: 40px;
            font-size: 18px;
        }

        .btn {
            display: inline-block;
            box-sizing: border-box;
            border: 1px solid #cccccc;
            border-radius: 2px;
            width: 100px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #666;
            cursor: pointer;
            background: white linear-gradient(180deg, #ffffff 0%, #f3f3f3 100%);
        }

        .btn:hover {
            background: white linear-gradient(0deg, #ffffff 0%, #f3f3f3 100%)
        }

        #captcha {
            width: 300px;
            display: inline-block;
        }

        label {
            vertical-align: top;
            display: inline-block;
            width: 80px;
            text-align: right;
        }

        #wait {
            text-align: left;
            color: #666;
            margin: 0;
        }
</style>
