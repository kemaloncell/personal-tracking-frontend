import Vue from 'vue'
import Vuex from 'vuex'

//auth
import auth from './modules/auth'

//suppliers
import supplier from './modules/suppliers'

//customer
import customer from './modules/customers'

//employees
import employee from './modules/employees'

//employeeDocuments
import employeeDocument from './modules/employeeDocument'

//definitions
import definitions from './modules/definitions'

//notifications
import notifications from './modules/notifications'

//Demands
import advanceDemands from './modules/demands/advanceDemands'
import offDayDemands from './modules/demands/OffDayDemands'
import commonDemands from './modules/demands/commonDemands'
import commonDemandsMessage from './modules/demands/commonDemands/commonDemandsMessage'

//Zones
import zones from './modules/zones'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        supplier,
        employee,
        customer,
        employeeDocument,
        definitions,
        notifications,
        commonDemands,
        commonDemandsMessage,
        offDayDemands,
        advanceDemands,
        zones
    }
})
