import Vue from 'vue'
import Vuex from 'vuex'

//auth
import auth from './modules/auth'


//users
import users from './modules/users'
//banks
import bank from './modules/bank'

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

Vue.use(Vuex)


export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        users,
        bank,
        auth,
        supplier,
        employee,
        customer,
        employeeDocument,
        definitions
    }
})
