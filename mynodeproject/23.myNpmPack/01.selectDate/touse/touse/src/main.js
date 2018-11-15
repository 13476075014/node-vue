import Vue from 'vue'
import App from './App.vue'
//import vuePayPop from "vue-pay-pop"
//Vue.use(vuePayPop)
//console.log(vuePayPop)
import liuselectdate from 'liuselectdate'
Vue.use(liuselectdate)
console.log(liuselectdate)


new Vue({
    el: '#app',
    render: h => h(App)
})