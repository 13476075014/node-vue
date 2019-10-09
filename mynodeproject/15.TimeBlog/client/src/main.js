// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' //使用elementui的时候，css需要单独的再引入一遍
import axios from 'axios'

Vue.config.productionTip = false


axios.defaults.withCredentials = true; //跨域保存session有用
//axios.defaults.baseURL = "http://47.96.65.156:3000";
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$reqs = axios;

Vue.use(elementui)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})