import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../node_modules/bootstrap/dist/css/bootstrap.rtl.css'
// import '../node_modules/bootstrap/scss/bootstrap.scss'
import 'bootstrap'
import './assets/sass/main.sass'

const app = createApp(App)

import { userClient } from '@/services/api'

app.use(store)
    .use(router)
    .mount('#app')

app.mixin({
    created() {
        console.log('[created] ' + this.$options.name)
        const data = !!localStorage.userCredit
        if (data) {
            store.commit('user/SET_USER_DATA', {
                access_token: String(localStorage.userCredit),
            })
        }

        userClient.interceptors.response.use(
            response => response,
            error => {
                if (error) {
                    store.dispatch('user/logout')
                }
                return Promise.reject(error)
            }
        )
    },
})
