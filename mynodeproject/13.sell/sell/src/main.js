// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import Ele from 'element-ui/lib/theme-chalk/index.css'

require("./assets/css/icon_style.css");

//import mini from '@/common/stylus/mixin.styl'  //这里如果直接引入styl文件，会在页面中失效不能用，好像是在这里引入会被直接变异成css，不能在别的模板中引用一些函数啥的

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