import {mapActions, mapGetters} from 'vuex'

const authMixin = {
    data() {
        return {
            submitStatus: null,
            submitted: false,
            isUserExist: true
        }
    },


    computed: {
        ...mapGetters({
            loading: 'auth/loading',
            userDataLoading: 'auth/userDataLoading',
            userData: 'auth/userData',
            userToken: 'auth/userToken',
        }),
    },

    methods: {
        ...mapActions({
            callLogin: 'auth/callLogin',
            callLogout: 'auth/callLogout',
            callChangePassword: 'auth/callChangePassword',
            callUploadFile: 'auth/callUploadFile',
        }),


    },
}

export default authMixin
