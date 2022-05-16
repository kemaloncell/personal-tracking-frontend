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

    async changePassword(data) {
        return await super.post('/change-password', data)
    }

    async uploadFileRequest({file}) {
        console.log(file, 'service')

        return await super.patch(`/photo`, file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

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
