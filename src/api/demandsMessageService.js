import {BaseService} from '@/api/baseService'

class DemandsMessageService extends BaseService {
    constructor() {
        super('demand-message')
    }

    async getAllList() {
        return await super.get('/')
    }


    async create(data) {
        console.log(data)
        return await super.post(`/`, data)

    }

    async delete(id) {
        return super.delete(`/${id}`)

    }


}

const demandsMessageService = new DemandsMessageService()

export {demandsMessageService}
