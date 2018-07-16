import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import signup from '@/components/signup'
import index from '@/components/index'
import content from '@/components/content'
import detail from '@/components/detail'
import myArtical from '@/components/myArtical'
import artical_write from '@/components/artical_write'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'login',
        component: login
    }, {
        path: '/signup',
        name: 'signup',
        component: signup
    }, {
        path: "/index",
        name: "index",
        component: index,
        children: [{
            path: "content",
            component: content
        }, {
            path: "artical_detail/:id",
            component: detail
        }, {
            path: "artical_write/:userid",
            component: artical_write
        }, {
            path: "myArtical",
            component: myArtical
        }]
    }]
})