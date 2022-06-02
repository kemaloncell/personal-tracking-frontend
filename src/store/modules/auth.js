import {authService} from '@/api/authService'
import {definitionsService} from "@/api/definitionsService";
//import { meService } from '@/api/meService'

const state = {
    userData: null,
    userDataLoading: null,
    otpValidationCode: null,
    otpCode: null,
    imageUrl: null,
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
    },

    SET_IMAGE_URL: function (state, imageUrl) {
        state.imageUrl = imageUrl
    }
}

const actions = {
    callMe: async function ({state, commit}) {
        try {
            if (!state.userData) {
                commit('SET_USER_DATA_LOADING', true)
                const {data} = await authService.me()
                commit('SET_USER', data)
                commit('SET_USER_DATA_LOADING', false)
            }
        } catch (err) {
            commit('SET_USER_DATA_LOADING', false)
            console.error(err)
            throw new Error('Me failed')
        }
    },


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

    sendForgotPasswordCode: async function ({commit}, changePasswordData) {
        try {
            console.log(changePasswordData, 'changePasswordData')
            //send tel no
            commit('SET_LOADING', true)
            const {data} = await authService.sendForgotPasswordCode(changePasswordData, this.otpValidationCode)
            this.otpValidationCode = data.data
            commit('SET_LOADING', false)
        } catch (err) {
            commit('SET_LOADING', false)
            console.error(err)
            throw new Error('Forgot password failed')
        }
    },


    callValidateOtp: async function ({commit}, otpData) {
        try {
            commit('SET_LOADING', true)
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
            const config = {headers: {'Content-Type': 'multipart/form-data'}};
            let photoForm = new FormData()
            photoForm.append('file', fileData)

            const {data} = await definitionsService.uploadFileRequest(photoForm, config)
            commit("SET_IMAGE_URL", data.data)
            commit('SET_LOADING', false)

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

    imageUrl: (state) => {
        console.log(state.imageUrl, 'gfet')
        return state.imageUrl
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
