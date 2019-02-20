// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'
import ElementUI from 'element-ui'
import Ele from 'element-ui/lib/theme-chalk/index.css'
import icon from '@/assets/stylus/icon.css'
import axios from 'axios'
import VueCountUp from 'vue-countupjs'
import { ipDetail } from '@/assets/js/config'
import qs from 'qs'
import { allNeed } from '@/mixin/index'

require('./assets/stylus/base')
require('./assets/stylus/theme')

Vue.use(ElementUI)
Vue.use(VueCountUp)
Vue.config.productionTip = false

axios.defaults.withCredentials = true
axios.defaults.baseURL = ipDetail.data_header
axios.interceptors.request.use(function(config) { // 请求的拦截器
    // console.log(config)
    if (config.url) {
        if (!config.url.match('isformdata=0')) {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            if (config.method === 'post') {
                config.data = qs.stringify({
                    ...config.data
                })
            }
        }
    }

    return config
}, function(error) {
    // loadinginstace.close()
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response) { // 响应拦截器
    if (response.data.err) {
        return Promise.reject(response)
    } else {
        return response
    }
}, function(error) {
    // 对响应错误做点什么
    // const me = error.response.data.Message
    if (error.response) {
        const me = error.response.data
        console.log(me)
        const str = '<!DOCTYPE html>'
        if (me.match(str)) { // 如果是token不正确，就转到登录页面
            new Vue().$message({ message: '登录过期，请重新登录，即将跳转到登录页面！！', duration: 2200 })
            setTimeout(() => {
                window.location.href = '#/'
            }, 2000)
        }
    }

    return Promise.reject(error)
})

Vue.prototype.$reqs = axios
    /* eslint-disable no-new */
new Vue({
    mixins: [allNeed],
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})