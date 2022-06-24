import {BaseService} from '@/api/baseService'

class OffDayDemandsService extends BaseService {
    constructor() {
        super('demands/off-days')
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
        return super.delete(`/${id}`)

    }


}

const offDayDemandsService = new OffDayDemandsService()

export {offDayDemandsService}
