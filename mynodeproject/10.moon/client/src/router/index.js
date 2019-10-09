import Vue from 'vue'
import Router from 'vue-router'


import login from '@/components/login'
import register from '@/components/register'
import index_one from '@/components/index_one'
import moregoods from '@/components/moregoods'
import goods_show from '@/components/goods_show'
import membercenter from '@/components/memberCenter'
import shopCar from '@/components/shopCar'
import service_index from '@/components/service_index'
import user from '@/components/littleComponent/services/user'
import hotgoods from '@/components/littleComponent/services/user'
import makeup_goods from '@/components/littleComponent/services/makeupGoods'

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
                    path: 'one', //用户表
                    name: 'user',
                    component: user
                },
                {
                    path: 'two', //热门商品表
                    name: 'hotgoods',
                    component: hotgoods
                },
                {
                    path: 'three', //热门商品表
                    name: 'makeupGoods',
                    component: makeup_goods
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
            path: '/shopCar', //更多商品页面
            name: 'shopCar',
            component: shopCar
        },
        {
            path: '/goods_show', //更多商品页面
            name: 'goods_show',
            component: goods_show
        },
        {
            path: '/membercenter', //更多商品页面
            name: 'membercenter',
            component: membercenter
        },
        {
            path: '*', //其他路径都跳转到首页
            redirect: 'index_one'
        }
    ]
});