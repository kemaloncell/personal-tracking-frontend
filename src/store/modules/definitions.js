import {definitionsService} from '@/api/definitionsService'
import {paymentsService} from '@/api/paymentsService'


const state = {
    cityList: [],
    districtList: [],
    taxOfficeList: [],
    employeeList: [],
    employeeTypeList: [],
    educationTypeList: [],
    employeeDocumentList: [],
    roleList: [],
}

const mutations = {
    SET_CITY_LIST(state, item) {
        state.cityList = item
    },

    SET_DISTRICT_LIST(state, item) {
        state.districtList = item
    },

    SET_TAXOFFICE_LIST(state, item) {
        state.taxOfficeList = item
    },

    SET_EMPLOYEE_LIST(state, item) {
        state.employeeList = item
    },

    SET_EMPLOYEETYPE_LIST(state, item) {
        state.employeeTypeList = item
    },

    SET_EDUCATIONTYPE_LIST(state, item) {
        state.educationTypeList = item
    },

    SET_EMPLOYEE_DOCUMENT_LIST(state, item) {
        state.employeeDocumentList = item
    },

    SET_ROLE_LIST(state, item) {
        state.roleList = item
    },

}

const actions = {
    callCityList: async function ({commit}) {
        try {
            const {data} = await definitionsService.getCityList()
            commit('SET_CITY_LIST', data.data)
        } catch (err) {
            console.error(err)
            throw new Error('City list get connection failed')
        }
    },

    callDistrictList: async function ({commit}, id) {
        try {
            const {data} = await definitionsService.getDistrictList(id)
            commit('SET_DISTRICT_LIST', data.data)
        } catch (err) {
            console.error(err)
            throw new Error('District list get connection failed')
        }
    },

    callTaxOffice: async function ({commit}) {
        try {
            const {data} = await paymentsService.getTaxOffice()
            commit('SET_TAXOFFICE_LIST', data.data)
        } catch (err) {
            console.error(err)
            throw new Error('Tax office list get connection failed')
        }
    },

    callEmployee: async function ({commit}) {
        try {
            const {data} = await definitionsService.getEmployeeList()
            commit('SET_EMPLOYEE_LIST', data.data)
        } catch (err) {
            console.error(err)
            throw new Error('Employee type list get connection failed')
        }
    },

    callEmployeeType: async function ({commit}) {
        try {
            const {data} = await definitionsService.getEmployeeTypeList()
            commit('SET_EMPLOYEETYPE_LIST', data.data)
        } catch (err) {
            console.error(err)
            throw new Error('Employee type list get connection failed')
        }
    },
    callEducationType: async function ({commit}) {
        try {
            const {data} = await definitionsService.getEducationTypeList()
            commit('SET_EDUCATIONTYPE_LIST', data.data)
        } catch (err) {
            console.error(err)
            throw new Error('Education type list get connection failed')
        }
    },

    callEmployeeDocumentList: async function ({commit}) {
        try {
            const {data} = await definitionsService.getEmployeeDocumentList()
            commit('SET_EMPLOYEE_DOCUMENT_LIST', data.data)
        } catch (err) {
            console.error(err)
            throw new Error('Education type list get connection failed')
        }
    },

    callRoleList: async function ({commit}) {
        try {
            const {data} = await definitionsService.getRoleList()
            commit('SET_ROLE_LIST', data.data)
        } catch (err) {
            console.error(err)
            throw new Error('Role type list get connection failed')
        }
    },
}

const getters = {
    cityList: (state) => {
        return state.cityList
    },

    districtList: (state) => {
        return state.districtList
    },

    taxOfficeList: (state) => {
        return state.taxOfficeList
    },

    employeeList: (state) => {
        return state.employeeList
    },

    employeeTypeList: (state) => {
        return state.employeeTypeList
    },
    educationTypeList: (state) => {
        return state.educationTypeList
    },
    employeeDocumentList: (state) => {
        return state.employeeDocumentList
    },

    roleList: (state) => {
        return state.roleList
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
