import {demandsMessageService} from '@/api/demandsMessageService'

const state = {
    list: [],
    pageInfo: {
        page: 0,
        size: 10
    },
    loading: false,
    singleLoading: false,
    submitLoading: false
}

const mutations = {
    SET_LIST(state, data) {
        state.list = data
    },

    SET_LOADING(state, isLoading) {
        state.loading = isLoading
    },

    SET_SINGLE_LOADING(state, isLoading) {
        state.singleLoading = isLoading
    },

    SET_SUBMIT_LOADING(state, isLoading) {
        state.submitLoading = isLoading
    },

    SET_PAGE_INFO(state, page) {
        state.pageInfo = page
    },
}

const actions = {
    getList: async function ({commit}) {
        try {
            commit('SET_LOADING', true)
            const {data} = await demandsMessageService.getAllList()
            console.log("data", data)
            commit('SET_LIST', data.data)
        } catch (error) {
            console.log(error);
            throw new Error('List connection failed')
        } finally {
            commit('SET_LOADING', false)
        }
    },

    create: async function ({commit}, data) {
        try {
            commit('SET_SUBMIT_LOADING', true)
            await demandsMessageService.create(data)
        } catch (err) {
            console.error(err)
            throw new Error('Create connection failed')
        } finally {
            commit('SET_SUBMIT_LOADING', false)
        }
    },

    delete: async function ({commit}, id) {
        try {
            commit('SET_LOADING', true)
            await demandsMessageService.delete(id)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Delete connection failed')
        }
    },

}

const getters = {
    list: (state) => {
        return state.list
    },

    loading: (state) => {
        return state.loading
    },

    submitLoading: (state) => {
        return state.submitLoading
    },

    singleLoading: (state) => {
        return state.singleLoading
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
