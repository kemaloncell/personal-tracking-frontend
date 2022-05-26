import {mapActions, mapGetters} from 'vuex'

const customerMixin = {
    data() {
        return {
            selectedItems: [],
            formData: {
                title: null,
                identityNumber: null,
                isCorporate: "TUZEL",
                TaxOffice: null,
                Address: {
                    title: "şahıs şirketi",
                    address: null,
                    postalCode: null,
                    City: null,
                    District: null,
                    phone: "",
                    phone2: "",
                    faxNumber: "",
                },
                AuthPerson: {
                    name: null,
                    phone: "",
                    mail: null,
                },
            },
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'customer/submitLoading',
            loading: 'customer/loading',
            list: 'customer/list',
            listLoading: 'customer/loading',
            singleLoading: 'customer/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createCustomer: 'customer/create',
            updateCustomer: 'customer/update',
            getListCustomer: 'customer/getList',
            setPageCustomer: 'customer/setPage',
            deleteCustomer: 'customer/delete',
            getCustomerSingle: 'customer/getSingle',
            multipleDeleteCustomer: 'customer/multipleDelete'
        }),
        async createSubmit(data, type) {
            try {
                await this.createCustomer(data)

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
                console.log(data, 'data', 'id ', this.updateId)
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
                TaxOffice: null,
                Address: {
                    title: null,
                    address: null,
                    postalCode: null,
                    City: null,
                    District: null,
                    phone: "",
                    phone2: "",
                    faxNumber: "",
                },
                AuthPerson: {
                    name: null,
                    phone: "",
                    mail: null,
                },
            }
        },
    },

}

export default customerMixin
