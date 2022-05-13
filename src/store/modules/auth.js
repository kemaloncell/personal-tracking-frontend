import {authService} from '@/api/authService'
//import { meService } from '@/api/meService'

const state = {
    userData: null,
    userDataLoading: null,
    userToken: localStorage.getItem('id_token'),
    loading: false
}

const mutations = {
    SET_TOKEN: function (state, token) {
        state.userToken = token
    },

    SET_USER: function (state, data) {
        state.userData = data
    },

    SET_LOADING: function (state, isLoading) {
        state.loading = isLoading
    },

    SET_USER_DATA_LOADING: function (state, isLoading) {
        state.userDataLoading = isLoading
    }
}

const actions = {

    callLogin: async function ({commit}, loginData) {
        try {
            commit('SET_LOADING', true)
            const {data} = await authService.login(loginData)
            const token = data.tokens.access_token

            localStorage.setItem('id_token', token)
            commit('SET_TOKEN', token)
            commit('SET_LOADING', false)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Login failed')
        }
    },

    callLogout: async function ({commit}) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)

        localStorage.removeItem('id_token')
    },

    callChangePassword: async function ({commit}, changePasswordData) {
        console.log('callChangePassword', changePasswordData)
        try {
            commit('SET_LOADING', true)
            const {data} = await authService.changePassword(changePasswordData)
            console.log('callChangePassword', data)
            commit('SET_LOADING', false)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Change password failed')
        }
    }
}

const getters = {
    loading: (state) => {
        return state.loading
    },

    userData: (state) => {
        return state.userData
    },

    userDataLoading: (state) => {
        return state.userDataLoading
    },

    userToken: (state) => {
        return state.userToken
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
