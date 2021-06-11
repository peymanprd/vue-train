import { createStore } from 'vuex'
import API from '@/services/api'
import * as user from '@/store/modules/user'

export default createStore({
    modules: {
        user,
    },
    state: {
        allUsers: null,
        takUser: null,
    },
    mutations: {
        SET_USERS(state, users) {
            state.allUsers = users
            localStorage.setItem('users', JSON.stringify(users))
        },
        SET_USER(state, user) {
            state.takUser = user
        },
    },
    actions: {
        getUsers({ commit }) {
            API.getUsers().then(({ data }) => commit('SET_USERS', data))
        },
        editUser({ commit }, user) {
            commit('SET_USER', user)
        },
    },
})
