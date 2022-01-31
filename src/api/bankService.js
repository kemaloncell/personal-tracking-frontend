import {BaseService} from '@/api/baseService'
import RequestAuthorizationInterceptor from './interceptors/requestAuthorizationInterceptor'

class BankService extends BaseService {
    constructor() {
        const baseAPIUrl = process.env.VUE_APP_BASE_API
        super(baseAPIUrl + '/finance/common')
        this.authorizationInterceptorId = this.http.interceptors.request.use(
            RequestAuthorizationInterceptor
        )
    }

    async getAllList(parameters, data = {}) {
        const result = await super.post(
            `/list?page=${parameters.page}&size=${parameters.size}`,
            data
        )
        return result
    }

    async getById(id) {
        const result = await super.get(`?id=${id}`)
        return result
    }

    async create(data) {
        const result = super.post(`/`, data)
        return result
    }

    async delete(id) {
        const result = super.delete(`/?id=${id}`)
        return result
    }

    async multipleDelete(idList) {
        const result = await super.delete(`/multiple`, {data: {id: idList}})
        return result
    }

    async update({data, id}) {
        const result = super.put(`/?id=${id}`, data)
        return result
    }
}

const bankService = new BankService()

export {bankService}
