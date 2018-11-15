import Vue from 'vue'
import App from './App.vue'
//import vuePayPop from "vue-pay-pop"
//Vue.use(vuePayPop)
//console.log(vuePayPop)
import liuselect from 'liuselectdate'
Vue.use(liuselect)
console.log(liuselect)


new Vue({
    el: '#app',
    render: h => h(App)
})