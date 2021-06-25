import axios from 'axios'
import router from '@/router/index'
export const namespaced = true

export const state = {
    userResult: null,
}

export const mutations = {
    SET_USER_DATA(state, data) {
        state.userResult = data
        localStorage.setItem('userCredit', data.token)
        axios.defaults.headers.common['token'] = data.token
    },
    CLEAR_USER_DATA() {
        localStorage.removeItem('userCredit')
        location.reload()
    },
}

export const actions = {
    async login({ commit }, userData) {
        await axios
            .post('https://reqres.in/api/login', userData)
            .then(({ data }) => {
                commit('SET_USER_DATA', data)
                router.push({ name: 'Home' })
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
