import {mapActions, mapGetters} from 'vuex'

const supplierMixin = {
    data() {
        return {
            selectedItems: [],
            formData: {
                address: {
                    address: null,
                    postalCode: null,
                    city: null,
                    district: null,
                    phone: null,
                    faxNumber: null,
                },
                seller: {
                    title: null,
                    identityNumber: null,
                    isCorporate: 'TUZEL',
                    taxOffice: null,
                },
                authPerson: {
                    name: '',
                    phone: '',
                    email: '',
                },
            },
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'supplier/submitLoading',
            loading: 'supplier/loading',
            list: 'supplier/list',
            listLoading: 'supplier/loading',
            singleLoading: 'supplier/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createSupplier: 'supplier/create',
            updateSupplier: 'supplier/update',
            getListSupplier: 'supplier/getList',
            getSingleSupplier: 'supplier/getSingle',
            deleteSupplier: 'supplier/delete',
        }),

        async createSubmit(data, type) {
            try {
                await this.createSupplier(data)

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

                this.getListSupplier()
            }
        },

        async udpateSubmit(data) {
            try {
                await this.updateSupplier({id: this.updateId, data})

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
                this.getListSupplier()
                this.closeModal()
            }
        },

        async onDelete(val) {
            try {
                await this.deleteSupplier(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan silme başarılı !',
                    life: 3000
                })

                this.getListSupplier()
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
            const item = await this.getSingleSupplier(this.updateId)
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
                title: null,
                identityNumber: null,
                isCorporate: null,
                taxOffice: null,
                address: null,
                phoneNumber: null,
            }
        },
    },

}

export default supplierMixin
