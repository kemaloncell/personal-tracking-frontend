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

//employees
import employee from './modules/employees'

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
        definitions
    }
})
