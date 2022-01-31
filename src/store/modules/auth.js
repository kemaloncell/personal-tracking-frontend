import { authService } from '@/api/authService'
//import { meService } from '@/api/meService'

const state = {
  userData: null,
  userDataLoading: null,
  userToken: localStorage.getItem('musavirToken'),
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
  callMe: async function ({ state, commit }) {
    try {
      if (!state.userData) {
        commit('SET_USER_DATA_LOADING', true)
        const { data } = await meService.me()
        commit('SET_USER', data)
        commit('SET_USER_DATA_LOADING', false)
      }
    } catch (err) {
      commit('SET_USER_DATA_LOADING', false)
      console.error(err)
      throw new Error('Me failed')
    }
  },

  callLogin: async function ({ commit }, loginData) {
    try {
      commit('SET_LOADING', true)
      const { data } = await authService.login(loginData)
      const token = data.accessToken

      localStorage.setItem('musavirToken', token)
      commit('SET_TOKEN', token)
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_LOADING', false)
      console.error(err)
      throw new Error('Login failed')
    }
  },

  callLogout: async function ({ commit }) {
    commit('SET_TOKEN', null)
    commit('SET_USER', null)

    localStorage.removeItem('musavirToken')
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
