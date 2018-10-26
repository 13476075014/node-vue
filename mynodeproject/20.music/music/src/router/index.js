import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'

import Recommend from '@/components/recommend/recommend'
import Singer from '@/components/singer/singer'
import Rank from '@/components/rank/rank'
import Search from '@/components/search/search'
import singerDetail from '@/components/singer-detail/singer-detail'
import disc from '@/components/disc/disc'
import topList from '@/components/top-list/top-list'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/recommend'
    }, {
        path: '/recommend',
        name: 'Recommend',
        component: Recommend,
        children: [{
            path: ':id',
            component: disc
        }]
    }, {
        path: '/singer',
        component: Singer,
        children: [{
            path: ':id',
            component: singerDetail
        }]
    }, {
        path: '/rank',
        component: Rank,
        children: [{
            path: ':id',
            component: topList
        }]
    }, {
        path: '/search',
        component: Search,
        children: [{
            path: ':id',
            component: singerDetail
        }]
    }]
})
