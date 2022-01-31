import {BaseService} from './baseService'
import RequestAuthorizationInterceptor from './interceptors/requestAuthorizationInterceptor'

class UserService extends BaseService {
    constructor() {
        const baseAPIUrl = process.env.VUE_APP_BASE_API
        super(baseAPIUrl + '/user')
        this.authorizationInterceptorId = this.http.interceptors.request.use(
            RequestAuthorizationInterceptor
        )
    }

    async login(data) {
        setTimeout(async () => {
            return await super.post('/login', data)
        }, 1000)
    }

    async register(data) {
        return await super.post('/signup', data)
    }

    async sendOtp(data) {
        return await super.post('/send/otp', data)
    }

    async validateOtp(data) {
        return await super.post('/validate/otp', data)
    }
}

const userService = new UserService()

export {userService}
