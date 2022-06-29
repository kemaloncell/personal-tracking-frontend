import {BaseService} from '@/api/baseService'

class AreaOfZoneService extends BaseService {
    constructor() {
        super('zones')
    }

    async getAllList() {
        return await super.get('/')
    }

    async getById(id) {
        return await super.get(`/${id}`)

    }

    async createArea(data) {
        return await super.post(`/areas`, data)

    }

    async createZoneEmployee(data) {
        return await super.patch(`/zone-employees`, data)

    }

    async update({data, id}) {
        return super.patch(`/${id}`, data)

    }

    async delete(id) {
        return super.delete(`/${id}`)

    }


}

const areaOfZoneService = new AreaOfZoneService()

export {areaOfZoneService}
