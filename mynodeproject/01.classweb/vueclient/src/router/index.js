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


Vue.use(Router)

export default new Router({
  routes: [
    {
			path:'/',
			name:'Login',
			component:Login
    },{
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
              path: 'indexContent', //首页统计
                component: indexContent
            },{
              path: 'adminList', //后台用户
                component: adminList
            },{
              path: 'studentList', //学员用户
                component: studentList
            },{
               path: 'my',           //测试的
               component: my
            },{
               path: 'upload',           //测试的
               component: upload
            }
            ,{
               path: '*',           //其他路径都跳转到首页
                redirect: 'indexContent'
            }
    	]
    }
  ]
})
