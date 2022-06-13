import {BaseService} from '@/api/baseService'

class EmployeeDocumentService extends BaseService {
    constructor() {
        super('employee')
    }

    async getAllCategoryList() {
        return await super.get('/document-cateogories')
    }

    async getAllDocTypeList() {
        return await super.get('/document-types')
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

const employeeDocumentService = new EmployeeDocumentService()

export {employeeDocumentService}
