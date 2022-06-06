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

//Employees Documents
import EmployeeDocumentList from '@/views/Employees/EmployeesDocuments.vue'

//Customers
import CustomerList from '@/views/Customers/Customers.vue'

//Demands
import DemandsList from '@/views/Demands/Demands.vue'
import CommonDemandsList from '@/views/Demands/CommonDemands.vue'
import AdvanceDemands from '@/views/Demands/AdvanceDemands.vue'

//Suppliers
import SupplierList from '@/views/Suppliers/Supplier.vue'

//Fields
import FieldList from '@/views/Fields/Fields.vue'

//Shifts
import ShiftList from '@/views/Shifts/Shifts.vue'

//Auth
import Login from '@/components/auth/Login.vue'
import ForgotPassword from '@/components/auth/ForgotPassword.vue'
import ForgotPasswordSecond from '@/components/auth/ForgotPasswordSecond.vue'
import CommonDemandList from "@/components/demands/CommonDemandsList";

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
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            notRequiresAuth: false
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
            notRequiresAuth: false
        }
    },
    {
        path: '/forgot-password-code',
        name: 'ForgotPasswordSecond',
        component: ForgotPasswordSecond,
        meta: {
            notRequiresAuth: false
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
        path: '/demands/offdays',
        name: 'Demands',
        component: DemandsList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/demands/common-offdays',
        name: 'CommonDemands',
        component: CommonDemandsList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/demands/advance',
        name: 'AdvanceDemands',
        component: AdvanceDemands,
        props: true,
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
        path: '/employees/:id',
        name: 'Document',
        component: EmployeeDocumentList,
        props: true,
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
