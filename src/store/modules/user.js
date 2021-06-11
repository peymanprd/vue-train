import axios from 'axios'
// import isAuth from '../store/helpers'

export const namespaced = true

export const state = {
    userResult: null,
}

export const mutations = {
    SET_USER_DATA(state, data) {
        state.userResult = data
        localStorage.setItem('userCredit', data.token)
    },
}

export const actions = {
    login({ commit }, userData) {
        axios
            .post('https://reqres.in/api/login', userData)
            .then(({ data }) => commit('SET_USER_DATA', data))
    },
    logout(state) {
        state.userResult = null
        localStorage.removeItem('userCredit')
    },
}

export const getters = {}
