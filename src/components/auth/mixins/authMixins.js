import {mapActions, mapGetters} from 'vuex'
import {email, required} from "vuelidate/lib/validators";

const authMixin = {
    data() {
        return {
            email: null,
            password: null,
            changePassword: null,
            submitStatus: null,
            submitted: false,
            isUserExist: true
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
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

        async login() {
            this.$v.$touch()
            this.submitted = true
            if (!this.$v.$invalid) {
                try {
                    this.submitStatus = true
                    await this.callLogin({
                        email: this.email,
                        password: this.password
                    })
                    this.isUserExist = true
                    this.$router.push('/')
                } catch {
                    console.error('login err')
                    this.isUserExist = false
                }
            }
        },

        async logout() {
            try {
                await this.callLogout();
                this.$router.push('/login')
            } catch {
                console.error('logout err')
            }
        },
        async onChangePasword() {
            try {
                await this.callChangePassword({
                    password: this.changePassword
                })
            } catch {
                console.error('logout err')
            }
        },
        async onUpload(req) {
            try {
                if (req[0].file) {
                    console.log(req[0], 'req')
                    await this.callUploadFile(req[0].file)
                    console.log(req[0].headers, 'headers')
                }
            } catch {
                console.error('upload err')
            }
        },
    },
}

export default authMixin
