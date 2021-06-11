import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import state from '@/store/helpers'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/store',
        name: 'store',
        component: () => import('../views/Store.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && state.isAuth === false) next({ name: 'login' })
    else if (to.name === 'login' && state.isAuth === true) next(false)
    else next()
})

export default router
