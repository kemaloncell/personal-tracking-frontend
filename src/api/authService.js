import {BaseService} from './baseService'

class AuthService extends BaseService {
    constructor() {
        super('users')
    }

    async me() {
        return await super.get('/me')
    }

    async login(data) {
        return await super.post('/login', data)
    }

    async register(data) {
        return await super.post('/register', data)
    }

    async forgotPassword(data) {
        return await super.post(`/forgot-password`, data)
    }

    async sendForgotPasswordCode(data, id) {
        return await super.put(`/forgot-password/${id}`, data)
    }

    async validateOtp(data, id) {
        return await super.post(`/validate-password/${id}`, data)
    }

    async changePassword(data) {
        //email ile
        return await super.post('/change-password', data)
    }

}

const authService = new AuthService()

export {authService}
