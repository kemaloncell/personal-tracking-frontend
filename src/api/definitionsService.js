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
        return await super.post(`/files`, {file}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

    async getAddress(typeId, id) {
        return await super.get(`/location/address/${typeId}/${id}`)
    }

    async createAddress(data) {
        return await super.post(`/location/address`, data)
    }

    async deleteAddress(id) {
        return await super.get(`/location/address/${id}`)
    }

    async getCityList() {
        return await super.get(`/location/city`)
    }

    async createCityList(data) {
        return await super.post(`/location/city`, data)
    }

    async deleteCity(id) {
        return await super.get(`/location/city/${id}`)
    }

    async getDistrictList(id) {
        return await super.get(`/location/district/${id}`)
    }

    async createDistrict(data) {
        return await super.post(`/location/district`, data)
    }

    async deleteDistrict(id) {
        return await super.post(`/location/district/${id}`)
    }

}

const definitionsService = new DefinitionsService()

export {definitionsService}
