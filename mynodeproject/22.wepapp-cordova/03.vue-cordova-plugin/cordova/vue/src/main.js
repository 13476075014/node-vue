// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
document.addEventListener('deviceready', function () { // 给整个文件添加一个设备准备好的事件，在cordova中触发
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}, false)
