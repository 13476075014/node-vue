import Vue from 'vue'
import App from './App.vue'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);
// 上传的时候不能漏传了dist

new Vue({
    el: '#app',
    render: h => h(App)
})