import {employeeDocumentService} from '@/api/employeeDocumentService'
import {definitionsService} from "@/api/definitionsService";

const state = {
    employeeDocumentList: [],
    documentList: [],
    categoryList: [],
    pageInfo: {
        page: 0,
        size: 10
    },
    loading: false,
    singleLoading: false,
    submitLoading: false
}

const mutations = {
    SET_EMPLOYEE_DOCUMENT_LIST(state, data) {
        state.employeeDocumentList = data
    },

    SET_DOC_LIST(state, data) {
        state.documentList = data
    },

    SET_CATEGORY_LIST(state, data) {
        state.categoryList = data
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
    getAllCategoryList: async function ({commit}) {
        try {
            commit('SET_LOADING', true)
            const {data} = await employeeDocumentService.getAllCategoryList()
            commit('SET_CATEGORY_LIST', data.data)
        } catch (error) {
            console.log(error);
            throw new Error('List connection failed')
        } finally {
            commit('SET_LOADING', false)
        }
    },

    getAllDocTypeList: async function ({commit}) {
        try {
            commit('SET_LOADING', true)
            const {data} = await employeeDocumentService.getAllDocTypeList()
            commit('SET_DOC_LIST', data.data)
        } catch (error) {
            console.log(error);
            throw new Error('List connection failed')
        } finally {
            commit('SET_LOADING', false)
        }
    },


    getAllEmployeeDocList: async function ({commit}, id) {
        try {
            commit('SET_SINGLE_LOADING', true)
            const {data} = await employeeDocumentService.getAllEmployeeDocList(id)

            commit('SET_EMPLOYEE_DOCUMENT_LIST', data.data)
        } catch (err) {
            console.error(err)
            throw new Error('Single get connection failed')
        } finally {
            commit('SET_SINGLE_LOADING', false)
        }
    },

    getSingle: async function ({commit}, id) {
        try {
            commit('SET_SINGLE_LOADING', true)
            const {data} = await employeeDocumentService.getById(id)
            console.log(data.data, 'employeelist')
            commit('SET_LIST', data.data)
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
            await employeeDocumentService.create(data)
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
            await employeeDocumentService.delete(id)
            commit('SET_LOADING', false)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Delete connection failed')
        }
    },

    update: async function ({commit}, {data, id}) {
        try {
            commit('SET_SUBMIT_LOADING', true)
            await employeeDocumentService.update({data, id})
        } catch (err) {
            console.error(err)
            throw new Error('Create connection failed')
        } finally {
            commit('SET_SUBMIT_LOADING', false)
        }
    },


    uploadFile: async function ({commit}, fileData) {
        try {
            const config = {headers: {'Content-Type': 'multipart/form-data'}};
            let photoForm = new FormData()
            photoForm.append('file', fileData.file)
            commit('SET_LOADING', false)

            return await definitionsService.uploadFileRequest(photoForm, config)

        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Upload failed')
        }
    },


    setPage: async function ({commit, dispatch}, parameters) {
        commit('SET_PAGE_INFO', parameters)
        dispatch('getList')
    },

    multipleDelete: async function (_, idList) {
        try {
            await employeeDocumentService.multipleDelete(idList)
        } catch (err) {
            console.error(err)
            throw new Error('Multiple Delete inventories failed')
        }
    },
}

const getters = {

    categoryList: (state) => {
        return state.categoryList
    },


    employeeDocumentList: (state) => {
        return state.employeeDocumentList
    },


    documentList: (state) => {
        return state.documentList
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
