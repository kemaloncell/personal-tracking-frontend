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


import CustomerTabPage from "@/components/customers/CustomerTabPage";

//Demands
import DemandsList from '@/views/Demands/OffDayDemands.vue'
import DemandsCreate from '@/components/demands/offDayDemands/OffDayDemandsForm.vue'
import DemandsUpdate from '@/components/demands/offDayDemands/OffDayDemandsForm.vue'
// common demands
import CommonDemandsList from '@/views/Demands/CommonDemands.vue'
import CommonDemandsTabPage from "@/components/demands/commonDemands/CommonDemandsTabPage.vue";
//advance demands
import AdvanceDemandsList from '@/views/Demands/AdvanceDemands.vue'
import AdvanceDemandsCreate from '@/components/demands/advanceDemands/AdvanceDemandsForm.vue'
import AdvanceDemandsUpdate from '@/components/demands/advanceDemands/AdvanceDemandsForm.vue'

//Suppliers
import SupplierList from '@/views/Suppliers/Supplier.vue'
import SupplierCreate from '@/components/suppliers/SuppliersForm.vue'
import SupplierUpdate from '@/components/suppliers/SuppliersForm.vue'

//Zones
import ZoneList from '@/views/Zones/Zone.vue'
import ZoneCreate from '@/components/zones/ZoneForm.vue'
//import ZoneUpdate from '@/components/zones/ZoneForm.vue'

//zones stpes
import Confirmation from "@/components/zones/zoneSteps/Confirmation.vue";
import EmployeeCreate from "@/components/zones/zoneSteps/EmployeeCreate.vue";
import ZoneFormCreate from "@/components/zones/zoneSteps/ZoneCreate.vue";
import AreaCreate from "@/components/zones/zoneSteps/AreaCreate.vue";

//Shifts
import ShiftList from '@/views/Shifts/Shifts.vue'

//Auth
import Login from '@/components/auth/Login.vue'
import ForgotPassword from '@/components/auth/ForgotPassword.vue'
import ForgotPasswordSecond from '@/components/auth/ForgotPasswordSecond.vue'


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
        path: '/demands/off-days',
        name: 'Demands',
        component: DemandsList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/demands/off-day',
        name: 'DemandsCreate',
        component: DemandsCreate,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/demands/off-day/:id',
        name: 'DemandsUpdate',
        component: DemandsUpdate,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/demands/common-off-days',
        name: 'CommonDemandsList',
        component: CommonDemandsList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/demands/common-off-day/detail',
        name: 'CommonDemandsTabPage',
        component: CommonDemandsTabPage,
        props: true,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/demands/advances',
        name: 'AdvanceDemandsList',
        component: AdvanceDemandsList,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/demands/advance',
        name: 'AdvanceDemandsCreate',
        component: AdvanceDemandsCreate,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/demands/advance/:id',
        name: 'AdvanceDemandsUpdate',
        component: AdvanceDemandsUpdate,
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
        path: '/employees/document/:id',
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
        path: '/customer-detail',
        name: 'CustomerTabPage',
        component: CustomerTabPage,
        props: true,
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
        path: '/supplier',
        name: 'SupplierCreate',
        component: SupplierCreate,
        props: true,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/suppliers/:id',
        name: 'SupplierUpdate',
        component: SupplierUpdate,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/zones',
        name: 'ZoneList',
        component: ZoneList,
        props: true,
        meta: {
            requiresAuth: true
        },

    },
    {
        path: '/zone',
        name: 'ZoneCreate',
        component: ZoneCreate,
        props: true,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'create',
                component: ZoneFormCreate,
                props: true,
                meta: {
                    requiresAuth: true
                },

            },
            {
                path: 'area-create',
                component: AreaCreate,
                props: true,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: 'employee-create',
                component: EmployeeCreate,
                props: true,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: 'confirmation',
                component: Confirmation,
                props: true,
                meta: {
                    requiresAuth: true
                },
            }
        ]

    },

    /*  {
          path: '/zones/:id',
          name: 'ZoneUpdate',
          component: ZoneUpdate,
          props: true,
          meta: {
              requiresAuth: true
          }
      }, */
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
