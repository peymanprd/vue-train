import API from '@/services/api'

export const namespaced = true

export const state = {
    products: [],
    candids: [],
}

export const mutations = {
    SET_PRODUCTS(state, data) {
        state.products = data
    },
    ADD_PRODUCT(state, product) {
        product.count = 1
        state.candids.push(product)
    },
}

export const actions = {
    getProducts({ commit }) {
        API.getProducts().then(({ data }) => commit('SET_PRODUCTS', data))
    },

    checkExistence({ state }, target) {
        let spot = -1
        let status = false
        // let checkID = target.id
        // let checkID_Unit = target.id && target.dNumberSelect
        // let checkID_Unit_Store = target.id && target.dNumberSelect && target.iStoreID
        // let checkID_Unit_Store_Barcode = target.id && target.dNumberSelect && target.iStoreID && target.barcode
        // let requireCondition = checkID
        // if(this.$LS.rowStore) {
        //     requireCondition = checkID_Unit_Store
        // }

        state.candids.some((item, index) => {
            if (item.id === target.id) {
                status = true
                spot = index
            }
        })
        return { spot: spot, status: status }
    },

    async addProduct({ commit, dispatch, state }, product) {
        if (state.candids.length <= 0) {
            commit('ADD_PRODUCT', product)
        } else {
            let existence = await dispatch('checkExistence', product)
            if (existence.status) {
                state.candids[existence.spot].count++
            } else {
                commit('ADD_PRODUCT', product)
            }
        }
    },
}

export const getters = {
    //...
}
