// 这个文件是作为客户端的入口文件

import { createApp } from '../src/app2.js'

// 客户端的特定引导逻辑

const { app, router, store } = createApp() // 创建vue实例
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

// 绑定元素,假定的app.vue中根元素id是app
router.onReady(() => { // 为了异步加载组件，这里必须要等到路由准备好在挂载
    app.$mount('#app')
})