import Vue from 'vue'
import Router from 'vue-router'
import { getUserToken } from '../store/cache'
// import HelloWorld from '@/components/HelloWorld'
// import Main from '@/components/main'
// import Login from '@/components/login'
// import User from '@/components/user'
// import Rate from '@/components/rate'
// import Suggest from '@/components/suggest'
// import FoodDetail from '@/components/foodsDetail'
// import pull from '@/base/scrollupAndDown'

Vue.use(Router)

const Main = () =>
    import('@/components/main')
const Login = () =>
    import('@/components/login')
const Rate = () =>
    import('@/components/rate')
const User = () =>
    import('@/components/user')
const Suggest = () =>
    import('@/components/suggest')
const FoodDetail = () =>
    import('@/components/foodsDetail')
const pull = () =>
    import('@/base/scrollupAndDown')

const hasToken = getUserToken().length > 0 ? Main : Login // 如果有token就是已经登录过了不需要在登陆

export default new Router({
  routes: [{
    path: '/',
    component: hasToken
  }, {
    path: '/index',
    name: 'main',
    component: Main,
    children: [{
      path: 'user',
      component: User
    }, {
      path: 'rate',
      component: Rate
    }, {
      path: 'suggest',
      component: Suggest
    }, {
      name: 'foodDetail',
      path: 'foodDetail',
      component: FoodDetail
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/pull',
    component: pull
  }]
})
