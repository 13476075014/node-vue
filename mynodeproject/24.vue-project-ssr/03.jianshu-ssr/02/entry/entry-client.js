import { createApp } from '../src/main'

const app = createApp()

// 同步服务器端更改的vuex让值一致
if (window.__INITIAL_STATE__) {
    app.$store.replaceState(window.__INITIAL_STATE__)
}

window.onload = function() {
    app.$mount('#app') //在页面加载完了之后再绑定在dom上
}