import Vue from 'vue'
import App from './App.vue'
import vuePayPop from "vue-pay-pop"
//Vue.use(vuePayPop)
//import Liuselectdate from 'liuselectdate@1.0.5'

//Vue.use(Liuselectdate)
console.log(vuePayPop)
new Vue({
    el: '#app',
    render: h => h(App)
})