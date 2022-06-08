import {mapActions, mapGetters} from 'vuex'

const commonDemandsMixins = {
    data() {
        return {
            selectedItems: [],
            formData: {
                title: null,
                description: null,
                documentPath: null,
                isDemand: null,
            },
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'commonDemands/submitLoading',
            loading: 'commonDemands/loading',
            list: 'commonDemands/list',
            listLoading: 'commonDemands/loading',
            singleLoading: 'commonDemands/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createCommonDemands: 'commonDemands/create',
            updateCommonDemands: 'commonDemands/update',
            getListCommonDemands: 'commonDemands/getList',
            getSingleCommonDemands: 'commonDemands/getSingle',
            deleteCommonDemands: 'commonDemands/delete',
        }),

        async createSubmit(data, type) {
            try {
                await this.createCommonDemands(data)

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
                if (type === 0) {
                    this.closeModal()
                }

                this.getListCommonDemands()
            }
        },

        async udpateSubmit(data) {
            try {
                await this.updateCommonDemands({id: this.updateId, data})

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
                this.getListCommonDemands()
                this.closeModal()
            }
        },

        async onDelete(val) {
            try {
                await this.deleteCommonDemands(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan silme başarılı !',
                    life: 3000
                })

                this.getListCommonDemands()
            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Çalışan silme başarısız !',
                    life: 3000
                })
            }
        },

        async onMessage(val) {
            this.defaultValues = val
            this.formType = 'MESSAGE'
            this.displayModal = true
        },

        async onUpdate(val) {
            this.defaultValues = val
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

export default commonDemandsMixins
