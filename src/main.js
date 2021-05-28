import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../node_modules/bootstrap/scss/bootstrap.scss'
import 'bootstrap'


const app = createApp(App)
app.use(store)
    .use(router)
    .mount('#app')
