import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'
Vue.use(VueRouter)
import Home from '../views/home.vue'
import User from '../views/user.vue'
import Main from '../views/main.vue'
import Mall from '../views/mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
const routes = [
    {
        // 主路由
        path: '/',
        component: Main,
        name: 'home',
        redirect: '/home',
        // 子路由
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home
            },
            {
                path: '/user',
                name: 'user',
                component: User
            },
            {
                path: '/mall',
                name: 'mall',
                component: Mall
            },
            {
                path: '/pageone',
                name: 'pageone',
                component: PageOne
            },
            {
                path: '/pagetwo',
                name: 'pagetwo',
                component: PageTwo
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login

    }

]
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
// 全局前置导航守卫
router.beforeEach((to, from, next) => {
    // ...
    // 判断token存不存在
    const token = Cookie.get('token')
    if (!token && to.name !== 'login') {
        next({
            name: 'login',

        })
    } else if (token && to.name === 'login') {
        next({
            name: 'home',
        })
    } else {
        next()
    }
})
export default router
