import {BaseService} from './baseService'

class AuthService extends BaseService {
    constructor() {
        super('users')
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

const authService = new AuthService()

export {authService}
