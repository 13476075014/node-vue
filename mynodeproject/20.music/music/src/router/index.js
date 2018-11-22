import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'

/* import Recommend from '@/components/recommend/recommend'
import Singer from '@/components/singer/singer'
import Rank from '@/components/rank/rank'
import Search from '@/components/search/search'
import singerDetail from '@/components/singer-detail/singer-detail'
import disc from '@/components/disc/disc'
import topList from '@/components/top-list/top-list'
import userCenter from '@/components/user-center/user-center' */

// 优化上面的组件异步懒加载
const Recommend = (resolve) => { // 这个是vue提供的结合webpack的import('..')语法实现
    import('@/components/recommend/recommend').then((recommend) => {
        resolve(recommend)
    })
}
const Singer = (resolve) => { // 这个是vue提供的结合webpack的import('..')语法实现
    import('@/components/singer/singer').then((recommend) => {
        resolve(recommend)
    })
}
const Rank = (resolve) => { // 这个是vue提供的结合webpack的import('..')语法实现
    import('@/components/rank/rank').then((recommend) => {
        resolve(recommend)
    })
}
const Search = (resolve) => { // 这个是vue提供的结合webpack的import('..')语法实现
    import('@/components/search/search').then((recommend) => {
        resolve(recommend)
    })
}
const singerDetail = (resolve) => { // 这个是vue提供的结合webpack的import('..')语法实现
    import('@/components/singer-detail/singer-detail').then((recommend) => {
        resolve(recommend)
    })
}
const disc = (resolve) => { // 这个是vue提供的结合webpack的import('..')语法实现
    import('@/components/disc/disc').then((recommend) => {
        resolve(recommend)
    })
}
const topList = (resolve) => { // 这个是vue提供的结合webpack的import('..')语法实现
    import('@/components/top-list/top-list').then((recommend) => {
        resolve(recommend)
    })
}
const userCenter = (resolve) => { // 这个是vue提供的结合webpack的import('..')语法实现
    import('@/components/user-center/user-center').then((recommend) => {
        resolve(recommend)
    })
}

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
        },
        {
            path: '/user',
            component: userCenter
        }

    ]
})
