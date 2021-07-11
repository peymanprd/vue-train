import API from '@/services/api'
import { isThere } from '@/utils/isThere'

export const namespaced = true

export const state = {
    products: [],
    candids: [],
}

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },

    ADD_PRODUCT(state, product) {
        let stateCandids = state.candids
        product.count = 1
        stateCandids.push(product)
        // console.log(product)
    },
}

export const actions = {
    async getProducts({ commit }) {
        // API.getProducts().then(({ data }) => commit('SET_PRODUCTS', data))
        try {
            let response = await API.getProducts()
            let products = response.data
            commit('SET_PRODUCTS', products)
            console.log('ejra shod!')
        } catch {
            console.log('Akh Akh Akhh!!!')
        }
    },

    addProduct({ commit, state }, product) {
        let stateCandids = state.candids
        let is = isThere(stateCandids, product.id)

        if (stateCandids.length <= 0) {
            commit('ADD_PRODUCT', product)
        } else {
            if (is.status) stateCandids[is.spot].count++
            else commit('ADD_PRODUCT', product)
        }

        localStorage.setItem('products', JSON.stringify(stateCandids))
    },
}

export const getters = {
    storeID: state => state.candids.length,
}
