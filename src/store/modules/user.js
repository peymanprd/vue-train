import API from '@/services/api'
import { apiClient } from '@/services/api'
import router from '@/router/index'

export const namespaced = true

export const state = {
    userResult: null,
}

export const mutations = {
    SET_USER_DATA(state, data) {
        state.userResult = data
        localStorage.setItem('userCredit', data.access_token)
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    },
    CLEAR_USER_DATA() {
        localStorage.clear()
        location.reload()
    },
}

export const actions = {
    async login({ commit }, userData) {
        await API.login(userData).then(({ data }) => {
            commit('SET_USER_DATA', data)
            router.push({ name: 'About' })
        })
    },
    async logout({ commit }) {
        await commit('CLEAR_USER_DATA')
    },
}

export const getters = {
    userPermision(state) {
        return !!state.userResult
    },
}
