// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Ele from 'element-ui/lib/theme-chalk/index.css'
import icon from '@/assets/stylus/icon.css'
import axios from 'axios'
import VueCountUp from 'vue-countupjs'

require('./assets/stylus/base')
require('./assets/stylus/theme')

Vue.use(ElementUI)
Vue.use(VueCountUp)
Vue.config.productionTip = false

Vue.prototype.$reqs = axios
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})