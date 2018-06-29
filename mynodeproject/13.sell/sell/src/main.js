// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import Ele from 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false

axios.defaults.withCredentials = true; //跨域保存session有用

Vue.prototype.$reqs = axios;



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})