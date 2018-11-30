// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */ //这样禁止eslint监测这个文件
import 'babel-polyfill'
import fastclick from 'fastclick'
import '_common/stylus/index.styl'
import Vue from 'vue'
import App from './App'
import router from './router'
//import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import store from './store'



fastclick.attach(document.body) //处理页面dom点击的延时问题

Vue.config.productionTip = false

//axios.defaults.withCredentials = true // 打包要用到
//axios.defaults.baseURL = "http://10.202.2.112:9000" // 打包要用到

Vue.use(VueLazyLoad, {
    loading: require('_common/image/default.png')
})


/* eslint-disable no-new */
const el = new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App/>'
    })
    //console.log(el)