import {BaseService} from '@/api/baseService'

class SupplierService extends BaseService {
    constructor() {
        super('connection/seller')
    }

    async getAllList() {
        return await super.get('/')
    }

    async getById(id) {
        return await super.get(`?id=${id}`)

    }

    async create(data) {
        return super.post(`/`, data)

    }

    async update({data, id}) {
        return super.put(`/?id=${id}`, data)

    }

    async delete(id) {
        return super.delete(`/${id}`)

    }

    async multipleDelete(idList) {
        const result = await super.delete(`/multiple`, {data: {id: idList}})
        return result
    }


}

const supplierService = new SupplierService()

export {supplierService}
