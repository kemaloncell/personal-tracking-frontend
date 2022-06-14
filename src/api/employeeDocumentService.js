import {BaseService} from '@/api/baseService'

class EmployeeDocumentService extends BaseService {
    constructor() {
        super('employee')
    }

    async getAllCategoryList() {
        return await super.get('/document-categories')
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

    async getAllEmployeeDocList(id) {
        return await super.get(`/documents/${id}`)
    }

    async create(data) {
        console.log(data)
        return await super.post(`/documents`, data)

    }

    async update({data, id}) {
        return super.patch(`documents/${id}`, data)

    }

    async delete(id) {
        return super.delete(`documents/${id}`)

    }


    async multipleDelete(idList) {
        const result = await super.delete(`/multiple`, {data: {id: idList}})
        return result
    }


}

const employeeDocumentService = new EmployeeDocumentService()

export {employeeDocumentService}
