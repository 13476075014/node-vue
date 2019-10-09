// vue的路由文件
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default function createRouter() { // 对外暴露这个路由函数
    let router = new VueRouter({
        mode: 'history', // 暂时不清楚加这个意义，好像是为了地址hash啥的
        routes: [{
                alias: '/', // alias别名配置，就是路由地址现在是显示的/，但实际访问的是path后面写的路径
                path: '/home',
                component: require('./routes/home.vue')
            },
            {
                path: '/animal',
                component: require('./routes/animal.vue')
            },
            {
                path: '/people',
                component: require('./routes/people.vue')
            }
        ]
    })

    return router
}