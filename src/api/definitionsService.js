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

    async uploadFileRequest(file, config) {
        console.log(file, 'son yol api kısmında data')
        console.log(config, 'son yol api kısmında config')
        return await super.post(`/files`, file, config)

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
