import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const isAllowed = (to, from, next) => {
    console.log(to.meta.area + ' & type is : ' + to.meta.type)
    next()
}

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
                meta: { area: 'person', type: 'Read' },
                beforeEnter: [isAllowed],
            },
            {
                path: 'facture/store',
                name: 'facture-store',
                component: () => import('../views/Store.vue'),
                props: { type: Number(1), label: 'foroosh' },
            },
            {
                path: 'facture/order',
                name: 'facture-order',
                component: () => import('../views/Store.vue'),
                props: { type: Number(12), label: 'sefaresh' },
            },
            {
                path: 'test',
                name: 'test',
                meta: { area: 'factor', type: 'Write' },
                component: () => import('../views/test.vue'),
                beforeEnter: [isAllowed],
            },
            {
                path: 'intest',
                name: 'intest',
                meta: { area: 'income', type: 'Access' },
                component: () => import('../views/Intest.vue'),
                beforeEnter: [isAllowed],
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
    else next()
})

export default router
