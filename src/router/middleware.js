import router from './index'
import store from '../store/modules/auth'

router.beforeEach((to, from, next) => {
    const authenticatedUser = store.getters['/userToken']
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (requiresAuth && !authenticatedUser) next('login')
    else next()
})

router.beforeEach((to, from, next) => {
    const authenticatedUser = store.getters['/userToken']
    const notRequiresAuth = to.matched.some(
        (record) => record.meta.notRequiresAuth
    )

    if (notRequiresAuth && authenticatedUser) next('/')
    else next()
})
