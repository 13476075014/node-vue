import Vue from 'vue'
import App from './App.vue'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

new Vue({
    el: '#app',
    render: h => h(App)
})