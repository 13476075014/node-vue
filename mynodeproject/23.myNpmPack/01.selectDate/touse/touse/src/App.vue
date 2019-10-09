<template>
  <div id="app">
    <!--
      如何使用自己上面封装发布到npm上的liuselectdate.js这个选择日期插件
        1.下载 安装liuselectdate ： npm install liuselectdate --save;
        2.在main.js中引用：
          import Vue from 'vue'
          import liuselectdate from 'liuselectdate'

          Vue.use(liuselectdate) ;
        3.直接到组件在需要用的地方使用：
          <liuselectdate></liuselectdate>
     -->
     <liuselectdate :option="option"></liuselectdate>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      option:{}
    }
  },
  components:{
  }
}
</script>

<style>

</style>
