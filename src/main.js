import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/bootstrap/dist/css/bootstrap.rtl.css'
// import '../node_modules/bootstrap/scss/bootstrap.scss'
import 'bootstrap'
import './assets/sass/main.sass'

const app = createApp(App)

const data = !!localStorage.userCredit
if (data) {
    store.commit('user/SET_USER_DATA', {
        token: String(localStorage.userCredit),
    })
}

import xhr from './services/xhrs/user'
console.log(xhr)

app.use(store)
    .use(router)
    .mount('#app')
