import {BaseService} from '@/api/baseService'

class DemandsService extends BaseService {
    constructor() {
        super('demands')
    }

    async getAllList() {
        return await super.get('/')
    }

    async getById(id) {
        return await super.get(`/${id}`)

    }

    async create(data) {
        console.log(data)
        return await super.post(`/`, data)

    }

    async update({data, id}) {
        return super.patch(`/${id}`, data)

    }

    async delete(id) {
        return super.delete(`/${id}`)

    }

    async multipleDelete(idList) {
        const result = await super.delete(`/multiple`, {data: {id: idList}})
        return result
    }


}

const demandsService = new DemandsService()

export {demandsService}
