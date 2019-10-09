// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/icon/iconfont.css'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styl/base.styl'
import '@/assets/styl/base.css'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(elementui)
Vue.use(VueLazyLoad, {
  loading: require('@/assets/imgs/loading.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
