// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */ //这样禁止eslint监测这个文件
import 'babel-polyfill'
import fastclick from 'fastclick'
//import _runtime from 'babel-runtime'
import '_common/stylus/index.styl'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'



fastclick.attach(document.body) //处理页面dom点击的延时问题

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})