import {BaseService} from '@/api/baseService'

class CommonDemandsService extends BaseService {
    constructor() {
        super('demand')
    }

    async getAllList() {
        return await super.get('/')
    }

    async getById(id) {
        return await super.get(`/${id}`)

    }

    async create(data) {
        return await super.post(`/`, data)

    }

    async update({data, id}) {
        return super.patch(`/${id}`, data)

    }

    async delete(id) {
        console.log("del", id)
        return super.delete(`/${id}`)

    }


}

const commonDemandsService = new CommonDemandsService()

export {commonDemandsService}
