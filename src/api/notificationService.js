import {BaseService} from '@/api/baseService'

class NotificationService extends BaseService {
    constructor() {
        super('notifications')
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


}

const notificationService = new NotificationService()

export {notificationService}
