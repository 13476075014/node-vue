// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import Ele from 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import swip from 'swiper/dist/css/swiper.css'
import router from './router'
import axios from 'axios'



Vue.config.productionTip = false;

//axios的基本设置：
axios.defaults.withCredentials = true ;//设置跨域保存session
axios.defaults.baseURL = "http://localhost:3000" ; //设置需要数据传输的后台网址的基础路径

//把axios绑在VUE身上，在后面组件中使用起来更方便
Vue.prototype.$reqs = axios;



Vue.use(VueAwesomeSwiper);
Vue.use(ElementUI);




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
