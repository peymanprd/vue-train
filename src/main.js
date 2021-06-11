import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import state from '@/store/helpers'
import '../node_modules/bootstrap/dist/css/bootstrap.rtl.css'
// import '../node_modules/bootstrap/scss/bootstrap.scss'
import 'bootstrap'
import './assets/sass/main.sass'

const app = createApp(App)

if (localStorage.userCredit) state.isAuth = true

app.use(store)
    .use(router)
    .mount('#app')
