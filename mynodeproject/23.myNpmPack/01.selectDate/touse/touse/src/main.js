import Vue from 'vue'
import App from './App.vue'
import liuselectdate from 'liuselectdate'

Vue.use(liuselectdate)

new Vue({
  el: '#app',
  render: h => h(App)
})
