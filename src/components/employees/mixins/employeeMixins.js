import {mapActions, mapGetters} from 'vuex'

const employeeMixin = {
    data() {
        return {
            selectedItems: [],
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
            createEmployee: 'employee/create',
            updateEmployee: 'employee/update',
            getListEmployee: 'employee/getList',
            setPageEmployee: 'employee/setPage',
            deleteEmployee: 'employee/delete',
            getEmployeeSingle: 'employee/getSingle',
        }),


        async createSubmit(data, type) {
            try {
                await this.createEmployee(data)

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
                if (type === 0) {
                    this.closeModal()
                }

                this.getListEmployee()
            }
        },

        async udpateSubmit(data) {
            try {
                console.log(data, 'data', 'id ', this.updateId)
                await this.updateEmployee({id: this.updateId, data})

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
                this.getListEmployee()
                this.closeModal()
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
            }
        },

        async onUpdate(val) {
            this.updateId = val.id
            const item = await this.getEmployeeSingle(this.updateId)
            this.defaultValues = item.data
            this.formData.taxOffice = item.data.TaxOffice
            this.formType = 'UPDATE'
            this.displayModal = true
        },

        onSelection(val) {
            this.selectedItems = val.map((item) => item.id)
        },
        resetForm() {
            this.formData = {
                name: null,
                identityNumber: null,
                surname: null,
                phone: null,
                birthDate: null,
                status: null,
            }
        },
    },

}

export default employeeMixin
