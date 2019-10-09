/* app.js */
// 这个是基本的vue实例化的文件，在客户端和服务端都要引用

import Vue from 'vue'
import App from '@/App'
// import store from '@/store/index'
import { createStore } from '@/store/index'
// import router from './router'
import { createRouter } from '@/router/index'
import '@/assets/icon/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styl/base.styl'
import '@/assets/styl/resetElement.styl'
import Jquery from 'jquery'
import VueLazyLoad from 'vue-lazyload'
import Axios from 'axios'
import qs from 'qs'
// import elementui from 'element-ui'

Vue.config.productionTip = false
// Vue.use(elementui)

// Axios.defaults.withCredentials = true
// Axios.defaults.baseURL = 'http://10.202.2.112:60986/'
// Axios.defaults.baseURL = 'http://212.64.74.12:8060/'
Axios.defaults.baseURL = 'http://chenxiaoming.canteen.sundar.top:8060/'
Axios.interceptors.request.use(function (config) { // 请求的拦截器
  // console.log(config)
  if (!config.url.match('isformdata=0')) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (config.method === 'post') {
      config.data = qs.stringify({
        ...config.data
      })
    }
  }
  return config
}, function (error) {
  // loadinginstace.close()
  return Promise.reject(error)
})

Axios.interceptors.response.use(function (response) { // 响应的拦截器
  // 对响应数据做点什么
  if (response.data.err) {
    console.log(response.data)
    return Promise.reject(response)
  } else {
    return response
  }
}, function (error) {
  // 对响应错误做点什么
  const me = error.response.data.Message
  const str = 'Token'
  if (me.match(str)) { // 如果是token不正确，就转到登录页面
    new Vue().$message({ message: '登录过期，请重新登录，即将跳转到登录页面！！', duration: 2200 })
    setTimeout(() => {
      window.location.href = '#/login'
    }, 2000)
  }
  return Promise.reject(error)
})

Vue.use(VueLazyLoad, {
  loading: require('@/assets/imgs/loading.gif')
})

Vue.prototype.$axios = Axios
Vue.prototype.$jquery = Jquery

export function createApp () {
  const router = createRouter()
  const store = createStore()
  /* eslint-disable no-new */
  const newApp = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return { newApp, router, store }
}
