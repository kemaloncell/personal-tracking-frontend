import {definitionsService} from '@/api/definitionsService'
import {paymentsService} from '@/api/paymentsService'


const state = {
    cityList: [],
    districtList: [],
    taxOfficeList: []
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
