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
            getSingleCustomer: 'customer/getSingle',
            multipleDeleteCustomer: 'customer/multipleDelete',
            callRegister: 'auth/callRegister',
        }),
        async createSubmit(data, accountType) {
            try {
                accountType ? await this.callRegister(data) : await this.createCustomer(data)

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
                await this.$router.push({name: 'Customer'})
            }
        },

        async udpateSubmit(data) {
            try {
                await this.updateCustomer({id: data.id, data})

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
                await this.$router.push({name: 'Customer'})
            }
        },

        async onDelete(val) {
            try {
                await this.deleteCustomer(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan silme başarılı !',
                    life: 3000
                })
                this.getListCustomer()
            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Çalışan silme başarısız !',
                    life: 3000
                })
            } finally {
                await this.$router.push({name: 'Customer'})
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

export default customerMixin
