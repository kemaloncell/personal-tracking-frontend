import {mapActions, mapGetters} from 'vuex'

const employeeDocumentMixin = {
    data() {
        return {
            selectedItems: [],
            fileRecordsForUpload: [],
            formData: {
                employeeId: this.$route.params.id,
                issueDate: null,
                expiryDate: null,
                file: null,
                EmployeeDocumentType: null,
                detail: null,
                documentPath: 'https://jr-securityplus.s3.amazonaws.com/1655295830766-1654160230724-resim.jpeg',
            },
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'employeeDocument/submitLoading',
            loading: 'employeeDocument/loading',
            categoryList: 'employeeDocument/categoryList',
            documentList: 'employeeDocument/documentList',
            employeeDocumentList: 'employeeDocument/employeeDocumentList',
            listLoading: 'employeeDocument/loading',
            singleLoading: 'employeeDocument/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createEmployeeDocument: 'employeeDocument/create',
            updateEmployeeDocument: 'employeeDocument/update',
            getAllCategoryList: 'employeeDocument/getAllCategoryList',
            getAllDocTypeList: 'employeeDocument/getAllDocTypeList',
            getAllEmployeeDocList: 'employeeDocument/getAllEmployeeDocList',
            deleteEmployeeDocument: 'employeeDocument/delete',
            getEmployeeSingle: 'employeeDocument/getSingle',
            uploadFile: 'employeeDocument/uploadFile',
        }),


        async createSubmit(data) {
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
                await this.getAllEmployeeDocList(data.employeeId)
            }
        },

        async udpateSubmit(data) {
            delete data.file
            try {
                await this.updateEmployeeDocument({id: data.id, data})

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
                await this.getAllEmployeeDocList(data.employeeId)
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

            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Çalışan silme başarısız !',
                    life: 3000
                })
            } finally {
                this.getAllEmployeeDocList(val.employeeId)
            }
        },

        async onUpdate(val) {
            this.displayTab = false
            this.defaultValues = val
            this.formType = 'UPDATE'
        },

        onSelection(val) {
            this.selectedItems = val.map((item) => item.id)
        },


        async fileSubmit(req, type) {
            if (req.file) {
                await this.uploadFile(req.file)
            }
            if (this.type === 'CREATE') {
                await this.createSubmit(req, type)
            } else {
                await this.udpateSubmit(req)
            }
        },


        resetForm() {
            this.formData = {}
            this.file = null
        },
    },

}

export default employeeDocumentMixin
