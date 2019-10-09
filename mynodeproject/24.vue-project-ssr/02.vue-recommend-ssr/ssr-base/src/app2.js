// 这个文件是我们应用程序的通用入口文件

import Vue from 'vue'
import App from './app.vue'
import { createRouter } from './router/router'
import { createStore } from './store/store'
import { sync } from 'vuex-router-sync'

// 导出一个工程函数，用于创建新的应用程序，router和store实例
export function createApp() {

    //创建router实例
    const router = createRouter()
        //创建store实例
    const store = createStore()

    //同步路由状态到store
    sync(store, router) // 这里暂时不懂为啥要这样

    const app = new Vue({
        router, // 注入路由
        store, //注入vuex
        render: h => h(App)
    })
    return { app, router, store }
}