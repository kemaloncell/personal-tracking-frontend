import { BaseService } from './baseService'
import RequestAuthorizationInterceptor from './interceptors/requestAuthorizationInterceptor'
// import ResponseErrorCheckInterceptor from './interceptors/responseErrorCheckInterceptor'

class UserService extends BaseService {
    constructor() {
        const baseAPIUrl = process.env.VUE_APP_BASE_API
        super(baseAPIUrl + '/user')
        this.authorizationInterceptorId = this.http.interceptors.request.use(
            RequestAuthorizationInterceptor
        )
    }

    async login(data) {
        return await super.post('/login', data)
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

export { userService }
