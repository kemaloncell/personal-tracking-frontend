import {mapActions, mapGetters} from 'vuex'

const employeeMixin = {
    data() {
        return {
            selectedItems: [],
            email: null,
            formData: {
                name: null,
                surname: null,
                phone: null,
                birthDate: null,
                tcNumber: null,
                EducationLevel: null,
                EmployeeType: null,
                status: 1,
            },
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'employee/submitLoading',
            loading: 'employee/loading',
            list: 'employee/list',
            listLoading: 'employee/loading',
            singleLoading: 'employee/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            callRegister: 'auth/callRegister',
            createEmployee: 'employee/create',
            updateEmployee: 'employee/update',
            getListEmployee: 'employee/getList',
            setPageEmployee: 'employee/setPage',
            deleteEmployee: 'employee/delete',
            getEmployeeSingle: 'employee/getSingle',
        }),


        async createSubmit(data, accountType) {

            try {
                accountType ? await this.callRegister(data) : await this.createEmployee(data)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan ekleme başarılı !',
                    life: 3000
                })
            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Çalışan ekleme başarısız !',
                    life: 3000
                })
            } finally {
                await this.$router.push({name: 'Employee'})
            }

        },

        async udpateSubmit(data) {
            try {
                await this.updateEmployee({id: data.id, data})

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan güncelleme başarılı !',
                    life: 3000
                })
            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Çalışan güncelleme başarısız !',
                    life: 3000
                })
            } finally {
                await this.$router.push({name: 'Employee'})
            }
        },

        async onDelete(val) {
            try {
                await this.deleteEmployee(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan silme başarılı !',
                    life: 3000
                })

                this.getListEmployee()
            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Çalışan silme başarısız !',
                    life: 3000
                })
            } finally {
                await this.$router.push({name: 'Employee'})
            }
        },

        onSelection(val) {
            this.selectedItems = val.map((item) => item.id)
        },
        resetForm() {
            this.formData = {
                name: null,
                tcNumber: null,
                surname: null,
                phone: null,
                birthDate: null,
                status: 1,
            }
        },
    },
}

export default employeeMixin
