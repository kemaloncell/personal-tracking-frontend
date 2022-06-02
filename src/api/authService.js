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
        return await super.post('/signup', data)
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

    async uploadFileRequest({file}) {

        return await super.patch(`/photo`, file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

}

const authService = new AuthService()

export {authService}
