// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  //使用elementui的时候，css需要单独的再引入一遍
import router from './router'
import axios from 'axios';//引入axios组件
//import * as custom from './common/filters/custom'  //引入全局过滤器


//Object.keys(custom).forEach(key =>{ //重定义过滤器
//	Vue.filter(key, custom[key])
//})



Vue.config.productionTip = false

axios.defaults.withCredentials=true;  //跨域保存session有用
axios.defaults.baseURL = "http://localhost:3000"; //打包的时候直接删掉，默认基础路径在这里配置
//将 axios 赋值给 Vue，方便在子组件里面使用
Vue.prototype.$reqs = axios;

Vue.use(ElementUI);







/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

