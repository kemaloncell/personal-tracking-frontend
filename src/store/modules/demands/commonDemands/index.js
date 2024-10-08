import {commonDemandsService} from '@/api/commonDemandsService'

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
            const {data} = await commonDemandsService.getAllList()
            commit('SET_LIST', data.data)
        } catch (error) {
            console.log(error);
            throw new Error('List connection failed')
        } finally {
            commit('SET_LOADING', false)
        }
    },

    getSingle: async function ({commit}, id) {
        try {
            commit('SET_SINGLE_LOADING', true)
            const {data} = await commonDemandsService.getById(id)
            return data
        } catch (err) {
            console.error(err)
            throw new Error('Single get connection failed')
        } finally {
            commit('SET_SINGLE_LOADING', false)
        }
    },

    create: async function ({commit}, data) {
        try {
            commit('SET_SUBMIT_LOADING', true)
            await commonDemandsService.create(data)
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
            await commonDemandsService.delete(id)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Delete connection failed')
        }
    },

    update: async function ({commit}, {data, id}) {
        try {
            commit('SET_SUBMIT_LOADING', true)
            await commonDemandsService.update({data, id})
        } catch (err) {
            console.error(err)
            throw new Error('Create connection failed')
        } finally {
            commit('SET_SUBMIT_LOADING', false)
        }
    },

    setPage: async function ({commit, dispatch}, parameters) {
        commit('SET_PAGE_INFO', parameters)
        dispatch('getList')
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
