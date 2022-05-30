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

    async forgotPassword(data) {
        return await super.post('/forgot-password', data)
    }

    async sendOtp(data) {
        return await super.post('/send/otp', data)
    }

    async validateOtp(data, id) {
        console.log(data, id, 'service')
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
