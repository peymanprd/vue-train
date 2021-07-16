import API from '@/services/api'
import { isThere } from '@/utils/isThere'

export const namespaced = true

const mediatorState = () => {
    return {
        products: [],
    }
}

const initState = () => {
    return {
        iType: 0,
        iProductID: 0,
        iStoreID: 0,
        products: [],
    }
}

export const state = {
    fType: 0,
    mediator: [],
    facture: [],
}

const fTypesCount = 12

for (let i = 0; i <= fTypesCount; i++) {
    state.mediator.push(mediatorState())
    state.facture.push(initState())
}

export const mutations = {
    // reset facture
    RESET_FACTURE(state) {
        Object.assign(state.facture[state.fType], initState())
    },

    SET_FACTURE_TYPE(state, factureType) {
        state.fType = factureType
    },

    SET_PRODUCTS(state, products) {
        state.mediator[state.fType].products = products
    },

    ADD_PRODUCT(state, product) {
        const factureProducts = state.facture[state.fType].products
        const is = isThere(factureProducts, product.id)

        if (factureProducts.length <= 0) {
            factureProducts.push(product)
        } else {
            if (is.status) factureProducts[is.spot].count++
            else factureProducts.push(product)
        }

        localStorage.setItem(
            `products#${state.fType}`,
            JSON.stringify(factureProducts)
        )
    },
}

export const actions = {
    resetFacture({ commit }) {
        commit('RESET_FACTURE')
    },

    setFactureType({ commit }, factureType) {
        commit('SET_FACTURE_TYPE', factureType)
    },

    async getProducts({ commit }) {
        commit('LOADING_', null, { root: true })
        try {
            let response = await API.getProducts(1, 5)
            let products = response.data
            commit('SET_PRODUCTS', products)
            commit('LOADING_', null, { root: true })
        } catch {}
    },

    addProduct({ commit }, product) {
        commit('ADD_PRODUCT', product)
    },
}

export const getters = {}
