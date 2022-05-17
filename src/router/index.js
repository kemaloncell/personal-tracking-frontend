import VueRouter from 'vue-router';
import store from '../store/modules/auth'

//Dashboard
import Dashboard from '@/components/Dashboard.vue';

//Acount
import Profile from '@/components/auth/Profile.vue';

//Finances
import PaymentList from '@/views/Finances/Payment.vue'
import BalanceList from '@/views/Finances/Balance.vue'
import VestingList from '@/views/Finances/Vesting.vue'

//Employees
import EmployeeList from '@/views/Employees/Employees.vue'

//Customers
import CustomerList from '@/views/Customers/Customers.vue'

//Suppliers
import SupplierList from '@/views/Suppliers/Supplier.vue'

//Fields
import FieldList from '@/views/Fields/Fields.vue'

//Shifts
import ShiftList from '@/views/Shifts/Shifts.vue'

// Users
import UserList from '@/views/Users/UserList.vue'
import UserListDetail from '@/views/Users/UserListDetail.vue'


//Bank
import BankList from '@/views/Bank/BankList'
import BankListDetail from '@/views/Bank/BankListDetail'

//Login
import Login from '@/components/auth/Login.vue'

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
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/finances/payments',
        name: 'Payment',
        component: PaymentList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/finances/balances',
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
        path: '/employees',
        name: 'Employee',
        component: EmployeeList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customers',
        name: 'Customer',
        component: CustomerList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/suppliers',
        name: 'Supplier',
        component: SupplierList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/fields',
        name: 'Field',
        component: FieldList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/shifts',
        name: 'Shift',
        component: ShiftList,
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
