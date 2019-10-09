// 这个是客户端和服务器端的路由文件

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//为了服务器端能保持没人客户请求的都是新的实例，所以这里暴露一个工厂函数
export function createRouter() {
    return new Router({
        mode: 'history', // 改变地址模式，这里就是可以被服务端识别的地址，而不是hash的
        routes: [{
            path: '/',
            components: () =>
                import ('../components/Bar.vue') // 异步加载组件
        }, {
            path: '/Foo/:id',
            componnet: () =>
                import ('../components/Foo.vue')
        }]
    })
}