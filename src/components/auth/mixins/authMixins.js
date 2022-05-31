import {mapActions, mapGetters} from 'vuex'

const authMixin = {
    data() {
        return {
            submitStatus: null,
            submitted: false,
            isUserExist: true,
            displayOtpModal: false,
        }
    },


    computed: {
        ...mapGetters({
            loading: 'auth/loading',
            userDataLoading: 'auth/userDataLoading',
            userData: 'auth/userData',
            userToken: 'auth/userToken',
            otpCode: 'auth/otpCode',
        }),
    },

    methods: {
        ...mapActions({
            callLogin: 'auth/callLogin',
            callLogout: 'auth/callLogout',
            callChangePassword: 'auth/callChangePassword', // email
            callForgotPassword: 'auth/callForgotPassword',// phone
            callSendOtp: 'auth/callSendOtp',
            callValidateOtp: 'auth/callValidateOtp',
            callUploadFile: 'auth/callUploadFile',
        }),


    },
}

export default authMixin
