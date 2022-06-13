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
                documentPath: 'document.pdf',
            },
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'employeeDocument/submitLoading',
            loading: 'employeeDocument/loading',
            list: 'employeeDocument/list',
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

                this.getListEmployeeDocument(data.employeeId)
            }
        },

        async udpateSubmit(data) {
            delete data.file
            console.log(data, 'data')
            console.log(this.docTypeId, 'docTypeId')
            try {
                await this.updateEmployeeDocument({id: data.EmployeeDocumentType.id, data})

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
                this.getListEmployeeDocument(data.employeeId)
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

                this.getListEmployeeDocument(val.employeeId)
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
            this.docTypeId = val.EmployeeDocumentType.id
            this.defaultValues = val
            this.formType = 'UPDATE'
            this.displayModal = true
        },

        onSelection(val) {
            this.selectedItems = val.map((item) => item.id)
        },


        async fileSubmit(req, type) {
            if (req.file) {
                console.log(req.file, 'req mixed')
                await this.uploadFile(req.file)
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
