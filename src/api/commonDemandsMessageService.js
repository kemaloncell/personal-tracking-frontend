import {BaseService} from '@/api/baseService'

class CommonDemandsMessageService extends BaseService {
    constructor() {
        super('demand-message')
    }

    async getAllList(id) {
        return await super.get(`/${id}`)
    }


    async create(data) {
        console.log(data)
        return await super.post(`/`, data)

    }

    async delete(id) {
        return super.delete(`/${id}`)

    }


}

const commonDemandsMessageService = new CommonDemandsMessageService()

export {commonDemandsMessageService}
