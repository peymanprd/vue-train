import { createStore } from 'vuex'
import * as user from '@/store/modules/user'
import * as products from '@/store/modules/products'

export default createStore({
    modules: {
        user,
        products,
    },
    state: {
        isLoading: false,
    },
})
