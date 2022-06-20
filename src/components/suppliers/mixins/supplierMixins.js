import {mapActions, mapGetters} from 'vuex'

const supplierMixin = {
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

        async createSubmit(data) {
            try {
                await this.createSupplier(data)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Tedarikçi ekleme başarılı !',
                    life: 3000
                })
            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Tedarikçi ekleme başarısız !',
                    life: 3000
                })
            } finally {
                /*if (type === 0) {
                    this.closeModal()
                }

                this.getListSupplier() */
                await this.$router.push({name: 'Supplier'})

            }
        },

        async udpateSubmit(data) {
            console.log(data, 'data')
            try {
                await this.updateSupplier({id: data.id, data})

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
                await this.$router.push({name: 'Supplier'})
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

                await this.$router.push({name: 'Supplier'})

            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Çalışan silme başarısız !',
                    life: 3000
                })
            }
        },


        onSelection(val) {
            this.selectedItems = val.map((item) => item.id)
        },
        resetForm() {
            this.formData = {
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
            }
        },
    },

}

export default supplierMixin
