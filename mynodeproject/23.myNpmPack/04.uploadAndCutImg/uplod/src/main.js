import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'  //使用elementui的时候，css需要单独的再引入一遍

Vue.prototype.$req = axios
var a=2

Vue.use(ElementUI);
new Vue({
  el: '#app',
  render: h => h(App)
})
