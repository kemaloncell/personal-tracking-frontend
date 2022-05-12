import VueRouter from 'vue-router';
import store from '../store/modules/auth'

//Dashboard
import Dashboard from '@/components/Dashboard.vue';

//Finances
import PaymentList from '@/components/finances/PaymentList.vue'
import BalanceList from '@/components/finances/BalanceList.vue'
import VestingList from '@/components/finances/VestingList.vue'

//Employees
import EmployeeList from '@/components/employeeManagament/employeeManagamentList.vue'

//Customers
import CustomerList from '@/components/customerManagament/customerManagamentList.vue'

// Users
import UserList from '@/views/Users/UserList.vue'
import UserListDetail from '@/views/Users/UserListDetail.vue'


//Bank
import BankList from '@/views/Bank/BankList'
import BankListDetail from '@/views/Bank/BankListDetail'

//Login
import Login from '@/views/Auth/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/finances/payment',
        name: 'Payment',
        component: PaymentList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/finances/balance',
        name: 'Payment',
        component: BalanceList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/finances/vesting',
        name: 'Vesting',
        component: VestingList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/employee',
        name: 'Employee',
        component: EmployeeList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer',
        name: 'Customer',
        component: CustomerList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user',
        name: 'User',
        component: UserList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/:name/detail',
        name: 'UserDetail',
        component: UserListDetail,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/bank',
        name: 'BankList',
        component: BankList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/bank/:name/detail',
        name: 'BankListDetail',
        component: BankListDetail,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            notRequiresAuth: false
        }
    },


]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})


router.beforeEach((to, from, next) => {
    const authenticatedUser = store.state.userToken
    console.log(authenticatedUser, 'authenticatedUser')
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (requiresAuth && !authenticatedUser) next('/login')
    else next()
})

router.beforeEach((to, from, next) => {
    const authenticatedUser = store.state.userToken
    const notRequiresAuth = to.matched.some((record) => record.meta.notRequiresAuth)

    if (notRequiresAuth && authenticatedUser) next('/')
    else next()
})

export default router
