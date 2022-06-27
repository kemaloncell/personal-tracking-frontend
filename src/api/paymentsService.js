import {BaseService} from './baseService'

class PaymentsService extends BaseService {
    constructor() {
        super('/payments')
    }

    async getTaxOffice() {
        return await super.get(`/tax-offices`)
    }
    
}

const paymentsService = new PaymentsService()

export {paymentsService}
