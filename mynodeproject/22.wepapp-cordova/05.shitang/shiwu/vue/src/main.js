// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import router from './router'
import '@/assets/icon/iconfont.css'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styl/base.styl'
import '@/assets/styl/base.css'
import VueLazyLoad from 'vue-lazyload'
import Axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false

// Axios.defaults.withCredentials = true
Axios.defaults.baseURL = 'http://localhost:60986/'
Axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config
}, function (error) {
  // loadinginstace.close()
  return Promise.reject(error)
})

Vue.use(elementui)
Vue.use(VueLazyLoad, {
  loading: require('@/assets/imgs/loading.gif')
})

Vue.prototype.$axios = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
