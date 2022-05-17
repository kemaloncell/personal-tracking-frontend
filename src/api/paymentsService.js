import {BaseService} from './baseService'

class PaymentsService extends BaseService {
    constructor() {
        super('/payments')
    }

    async getTaxOffice() {
        return await super.get(`/tax-offices`)
    }

    async getTaxOfficeById(id) {
        return await super.get(`/tax-offices/${id}`)
    }

    async createTaxOffice(id) {
        return await super.post(`/tax-offices/${id}`)
    }
}

const paymentsService = new PaymentsService()

export {paymentsService}
