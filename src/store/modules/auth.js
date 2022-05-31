import {authService} from '@/api/authService'
//import { meService } from '@/api/meService'

const state = {
    userData: null,
    userDataLoading: null,
    otpValidationCode: null,
    otpCode: null,
    userToken: localStorage.getItem('id_token'),
    loading: false
}

const mutations = {
    SET_TOKEN: function (state, token) {
        state.userToken = token
    },

    SET_USER: function (state, data) {
        state.userData = data
    },

    SET_LOADING: function (state, isLoading) {
        state.loading = isLoading
    },

    SET_OTP_CODE: function (state, otpCode) {
        state.otpCode = otpCode
    },

    SET_USER_DATA_LOADING: function (state, isLoading) {
        state.userDataLoading = isLoading
    }
}

const actions = {

    callLogin: async function ({commit}, loginData) {
        try {
            commit('SET_LOADING', true)
            const {data} = await authService.login(loginData)
            const token = data.data.tokens.access_token
            localStorage.setItem('id_token', token)
            commit('SET_TOKEN', token)
            commit('SET_LOADING', false)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Login failed')
        }
    },

    callLogout: async function ({commit}) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)

        localStorage.removeItem('id_token')
    },

    callForgotPassword: async function ({commit}, changePasswordData) {
        try {
            console.log(changePasswordData, 'changePasswordData')
            //send tel no
            commit('SET_LOADING', true)
            const {data} = await authService.forgotPassword(changePasswordData)
            this.otpValidationCode = data.data
            commit('SET_LOADING', false)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Forgot password failed')
        }
    },

    callSendOtp: async function ({commit}, otpData) {
        try {
            commit('SET_LOADING', true)
            const result = await authService.sendOtp(otpData)
            commit('SET_LOADING', false)
            return result
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Send OTP failed')
        }
    },

    callValidateOtp: async function ({commit}, otpData) {
        try {
            commit('SET_LOADING', true)
            //this.otpCode = otpData
            commit('SET_OTP_CODE', otpData)
            await authService.validateOtp({code: otpData}, this.otpValidationCode)
            commit('SET_LOADING', false)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Validate OTP failed')
        }
    },


    callChangePassword: async function ({commit}, changePasswordData) {
        try {
            //email ile
            commit('SET_LOADING', true)
            const {data} = await authService.changePassword(changePasswordData)
            return data
            commit('SET_LOADING', false)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Change password failed')
        }
    },

    callUploadFile: async function ({commit}, fileData) {
        try {
            commit('SET_LOADING', true)
            const photoForm = new FormData()
            console.log(fileData, 'file data in store')
            photoForm.append('file', fileData)

            commit('SET_LOADING', false)

            return await authService.uploadFileRequest({
                file: photoForm
            })


        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Upload failed')
        }
    }
}

const getters = {
    loading: (state) => {
        return state.loading
    },

    userData: (state) => {
        return state.userData
    },

    userDataLoading: (state) => {
        return state.userDataLoading
    },

    userToken: (state) => {
        return state.userToken
    },

    otpCode: (state) => {
        return state.otpCode
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
