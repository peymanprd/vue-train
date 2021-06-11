import axios from 'axios'

export const namespaced = true

export const state = {
    userResult: null,
}

export const mutations = {
    SET_USER_DATA(state, data) {
        state.userResult = data
        localStorage.setItem('userCredit', data.token)
    },
    CLEAR_USER_DATA() {
        localStorage.removeItem('userCredit')
        location.reload()
    },
}

export const actions = {
    login({ commit }, userData) {
        axios
            .post('https://reqres.in/api/login', userData)
            .then(({ data }) => commit('SET_USER_DATA', data))
    },
    logout({ commit }) {
        commit('CLEAR_USER_DATA')
    },
}

export const getters = {
    userPermision(state) {
        return !!state.userResult
    },
}
