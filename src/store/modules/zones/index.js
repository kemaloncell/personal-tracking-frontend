import {zoneService} from '@/api/zoneService'
import {areaOfZoneService} from '@/api/areaOfZoneService'

const state = {
    list: [],
    pageInfo: {
        page: 0,
        size: 10
    },
    loading: false,
    singleLoading: false,
    submitLoading: false
}

const mutations = {
    SET_LIST(state, data) {
        state.list = data
    },

    SET_LOADING(state, isLoading) {
        state.loading = isLoading
    },

    SET_SINGLE_LOADING(state, isLoading) {
        state.singleLoading = isLoading
    },

    SET_SUBMIT_LOADING(state, isLoading) {
        state.submitLoading = isLoading
    },

    SET_PAGE_INFO(state, page) {
        state.pageInfo = page
    },
}

const actions = {
    getList: async function ({commit}) {
        try {
            commit('SET_LOADING', true)
            const {data} = await zoneService.getAllList()
            commit('SET_LIST', data.data)
        } catch (error) {
            console.log(error);
            throw new Error('List connection failed')
        } finally {
            commit('SET_LOADING', false)
        }
    },

    getSingle: async function ({commit}, id) {
        try {
            commit('SET_SINGLE_LOADING', true)
            const {data} = await zoneService.getById(id)
            return data
        } catch (err) {
            console.error(err)
            throw new Error('Single get connection failed')
        } finally {
            commit('SET_SINGLE_LOADING', false)
        }
    },

    create: async function ({commit}, data) {
        try {
            commit('SET_SUBMIT_LOADING', true)
            if (data.city) {
                const zoneData = {
                    name: data.firstname,
                    City: data.city,
                }
                console.log(zoneData, 'zoneData')
                await zoneService.create(zoneData).then(
                    (response) => {
                        console.log(response)
                        if (data.district) {
                            const areaData = {
                                name: data.areaAuthName,
                                District: data.district,
                                // zoneId: response.data.id,
                                Zone: {
                                    id: response.data.data.id,
                                    name: data.firstname,
                                    City: data.city,
                                },
                                latitude: data.latitude,
                                longitude: data.longitude,
                            }
                            console.log(areaData, 'areaData')
                            areaOfZoneService.createArea(areaData)
                        }
                        if (data.employee) {
                            const employeeData = {
                                isActive: true,
                                Employee: data.employee,
                                Zone: {
                                    id: response.data.data.id,
                                    name: data.firstname,
                                },
                            }
                            console.log(employeeData, 'employeeData')
                            areaOfZoneService.createZoneEmployee(employeeData)
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })
            }
            //    await zoneService.create(data)

            /*  if (data.city) {
                  const newData = {
                      name: data.firstname,
                      City: data.city,
                  }
                  await this.createZone(newData)
              }
              if (data.district) {
                  const newData = {
                      name: data.areaAuthName,
                      District: data.district,
                      Zone: {
                          name: data.firstname,
                          City: data.city,
                      },
                      latitude: data.latitude,
                      longitude: data.longitude,
                  }
                  await this.createArea(newData)
              }
              if (data.employee) {
                  const newData = {
                      isActive: true,
                      Employee: data.employee,
                      Zone: {
                          name: data.firstname,
                          City: data.city,
                      },
                  }
                  await this.createZoneEmployee(newData)
              } */

        } catch (err) {
            console.error(err)
            throw new Error('Create connection failed')
        } finally {
            commit('SET_SUBMIT_LOADING', false)
        }
    },

    createArea: async function ({commit}, data) {
        try {
            commit('SET_SUBMIT_LOADING', true)
            await areaOfZoneService.createArea(data)
        } catch (err) {
            console.error(err)
            throw new Error('Create connection failed')
        } finally {
            commit('SET_SUBMIT_LOADING', false)
        }
    },

    createZoneEmployee: async function ({commit}, data) {
        try {
            commit('SET_SUBMIT_LOADING', true)
            await areaOfZoneService.createZoneEmployee(data)
        } catch (err) {
            console.error(err)
            throw new Error('Create connection failed')
        } finally {
            commit('SET_SUBMIT_LOADING', false)
        }
    },

    delete: async function ({commit}, id) {
        try {
            commit('SET_LOADING', true)
            await zoneService.delete(id)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Delete connection failed')
        }
    },

    update: async function ({commit}, {data, id}) {
        try {
            commit('SET_SUBMIT_LOADING', true)
            await zoneService.update({data, id})
        } catch (err) {
            console.error(err)
            throw new Error('Create connection failed')
        } finally {
            commit('SET_SUBMIT_LOADING', false)
        }
    },

    setPage: async function ({commit, dispatch}, parameters) {
        commit('SET_PAGE_INFO', parameters)
        dispatch('getList')
    },

    multipleDelete: async function (_, idList) {
        try {
            await zoneService.multipleDelete(idList)
        } catch (err) {
            console.error(err)
            throw new Error('Multiple Delete inventories failed')
        }
    },
}

const getters = {
    list: (state) => {
        return state.list
    },

    loading: (state) => {
        return state.loading
    },

    submitLoading: (state) => {
        return state.submitLoading
    },

    singleLoading: (state) => {
        return state.singleLoading
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
