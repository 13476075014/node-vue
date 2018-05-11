import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import index_one from '@/components/index_one'
import moregoods from '@/components/moregoods'
import service_index from '@/components/service_index'
import user from '@/components/littleComponent/services/user'
import hotgoods from '@/components/littleComponent/services/user'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/', //登录页面
            name: 'login',
            component: login
        },
        {
            path: '/service_index', //后台数据管理页面
            name: 'service_index',
            component: service_index,
            children: [{
                    path: 'one', //登录页面
                    name: 'user',
                    component: user
                },
                {
                    path: 'two', //登录页面
                    name: 'hotgoods',
                    component: hotgoods
                }
            ]
        },
        {
            path: '/register', //注册页面
            name: 'register',
            component: register
        },
        {
            path: '/index_one', //首页
            name: 'index_one',
            component: index_one
        },
        {
            path: '/moregoods', //更多商品页面
            name: 'moregoods',
            component: moregoods
        },
        {
            path: '*', //其他路径都跳转到首页
            redirect: 'index_one'
        }
    ]
});