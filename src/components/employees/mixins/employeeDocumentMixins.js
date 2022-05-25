import {mapActions, mapGetters} from 'vuex'

const employeeDocumentMixin = {
    data() {
        return {
            selectedItems: [],
            fileRecordsForUpload: [],
            file: null,
            formData: {
                employeeId: this.$route.params.id,
                EmployeeDocumentType: null,
                detail: null,
                issueDate: null,
                expiryDate: null,
                valid: null,
            },
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'employeeDocument/submitLoading',
            loading: 'employeeDocument/loading',
            list: 'employeeDocument/list',
            documentList: 'employeeDocument/documentList',
            listLoading: 'employeeDocument/loading',
            singleLoading: 'employeeDocument/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createEmployeeDocument: 'employeeDocument/create',
            updateEmployeeDocument: 'employeeDocument/update',
            getListEmployeeDocument: 'employeeDocument/getList',
            getEmployeeDocumentSingle: 'employeeDocument/getSingle',
            setPageEmployeeDocument: 'employeeDocument/setPage',
            deleteEmployeeDocument: 'employeeDocument/delete',
            getEmployeeSingle: 'employeeDocument/getSingle',
            uploadFiles: 'employeeDocument/uploadFile',
        }),


        async createSubmit(data, type) {
            delete data.file
            try {
                await this.createEmployeeDocument(data)

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

                this.getListEmployeeDocument()
            }
        },

        async udpateSubmit(data) {
            delete data.file
            try {
                await this.updateEmployeeDocument({id: this.updateId, data})

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
                this.getListEmployeeDocument()
                this.closeModal()
            }
        },

        async onDelete(val) {
            try {
                await this.deleteEmployeeDocument(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan silme başarılı !',
                    life: 3000
                })

                this.getListEmployeeDocument()
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


        async fileSubmit(req, type) {
            if (req.file.file) {
                await this.uploadFile(req.file.file)
            }

            if (this.formType === 'CREATE') {
                this.createSubmit(req, type)
            } else {
                this.udpateSubmit(req)
            }
        },


        resetForm() {
            this.formData = {}
            this.file = null
        },
    },

}

export default employeeDocumentMixin
