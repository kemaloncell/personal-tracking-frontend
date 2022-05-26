import {BaseService} from './baseService'

class DefinitionsService extends BaseService {
    constructor() {
        super('/')

    }

    async getEmployeeTypeList() {
        return await super.get(`/employee/types`)
    }

    async getEducationTypeList() {
        return await super.get(`/variables/education-levels`)
    }

    async getEmployeeDocumentList() {
        return await super.get(`/employee/document-types`)
    }

    async uploadFileRequest(file) {
        console.log(file, 'geldi file defination')
        return await super.post(`/files`, file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

    async getCityList() {
        return await super.get(`/location/city`)
    }

    async getDistrictList(id) {
        return await super.get(`/location/district/${id}`)
    }

}

const definitionsService = new DefinitionsService()

export {definitionsService}
