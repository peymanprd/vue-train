import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

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
    const userPermision = store.getters['user/userPermision']
    if (to.name !== 'login' && !userPermision) next({ name: 'login' })
    else if (to.name === 'login' && userPermision) next(false)
    else next()
})

export default router
