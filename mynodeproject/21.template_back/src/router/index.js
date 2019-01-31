import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/content'
import Login from '@/components/login'
import mainOne from '@/components/main/main'
import mainTwo from '@/components/main/two'
import mainThree from '@/components/main/three'
import setMenu from '@/components/main/setMenu'
import baseTable from '@/components/main/baseTable'
import org from '@/components/main/org'
import role from '@/components/main/role'
import user from '@/components/main/user'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/index',
            component: Index,
            children: [{
                    path: 'main-one',
                    component: mainOne
                },
                {
                    path: 'main-two',
                    component: mainTwo
                },
                {
                    path: 'main-three',
                    component: mainThree
                },
                {
                    path: 'menu',
                    component: setMenu
                },
                {
                    path: 'org',
                    component: org
                },
                {
                    path: 'role',
                    component: role
                },
                {
                    path: 'user',
                    component: user
                },
                {
                    path: 'baseTable',
                    component: baseTable
                }
            ]
        }
    ]
})
