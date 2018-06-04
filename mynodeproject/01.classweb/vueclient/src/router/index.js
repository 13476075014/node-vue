import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import backIndex from '@/components/backIndex'
import courseList from '@/components/courseList'
import indexContent from '@/components/indexContent'
import adminList from '@/components/adminList'
import studentList from '@/components/studentList'
import courseEdit from '@/components/courseEdit'
import my from '@/components/my'
import upload from '@/components/upload'
import limit from '@/components/limit'
import email from '@/components/email'
import swiper from '@/components/swiper'
import upanddown from '@/components/upAndDown'
import myueditor from '@/components/myueditor'


//三级页面
import goods_detail from '@/components/detail/goods_detail'
import goods from '@/components/detail/goods'
import user from '@/components/detail/user'


Vue.use(Router)

export default new Router({
  routes: [
    {
			path:'/',
			name:'Login',
			component:Login
    }
//  {
//			path:'/',
//			name:'backIndex',
//			component:backIndex
//  }
    ,{
    	path:'/backIndex',
    	name:'backIndex',
    	component:backIndex,
    	children:[
    		 {
              path: 'courseList', //课程列表
			        component: courseList
            },{
              path: 'courseEdit/:sysId', //编辑课程
              component: courseEdit
            },{
              path: 'myueditor', //编辑课程
              component: myueditor
            },{
              path: 'upanddown', //编辑课程
              component: upanddown
            },{
              path: 'indexContent', //首页统计
                component: indexContent
            },{
              path: 'adminList', //后台用户
                component: adminList
            },{
              path: 'studentList', //学员用户
              component: studentList
            },{
               path: 'goods_detail/:_id',  //商品详情
               name:"goods",
               component: goods_detail
            },{
               path: 'my',           //测试的
               component: my
            },{
               path: 'swiper',           //测试的
               component: swiper
            },{
               path: 'email',           //测试的
               component: email
            },{
               path: 'upload',           //测试的
               component: upload
            },{
               path: 'limit',           //测试的
               component: limit,
               children:[
               		{path:'one',
               		component:user},
               		{path:'two',
               		component:goods},
               		{
			               path: '/',           //其他路径都跳转到首页
			               component:user
			            }
               ]
            }
            ,{
               path: '*',           //其他路径都跳转到首页
                redirect: 'indexContent'
            }
    	]
    }
  ]
})
