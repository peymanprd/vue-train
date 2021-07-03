import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        component: () => import('../Layouts/AppLayout.vue'),
        meta: { isAuth: true },
        children: [
            {
                path: '',
                name: 'About',
                component: () => import('../views/About.vue'),
            },
            {
                path: 'store',
                name: 'store',
                component: () => import('../views/Store.vue'),
            },
            {
                path: 'test',
                name: 'test',
                component: () => import('../views/test.vue'),
            },
            {
                path: 'intest',
                name: 'intest',
                component: () => import('../views/Intest.vue'),
            },
        ],
    },
    {
        path: '/login',
        component: () => import('../Layouts/PublicLayout.vue'),
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('../views/login.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const userCredit = !!localStorage.userCredit
    if (to.matched.some(record => record.meta.isAuth) && !userCredit)
        next({ name: 'login' })
    if (to.name === 'login' && userCredit) next({ name: 'About' })
    else next()
})

export default router
