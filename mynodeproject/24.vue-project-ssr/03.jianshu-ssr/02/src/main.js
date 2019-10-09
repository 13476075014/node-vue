// 创建vue实例的引用文件
import Vue from 'vue'
import createRouter from './route'
import App from './app.vue'
import createStore from './store'

// 向外暴露一个工厂函数，用于创建新的vue实例
export function createApp() {
    const router = createRouter() // 路由
    const store = createStore() // vuex 的 store
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return app

}