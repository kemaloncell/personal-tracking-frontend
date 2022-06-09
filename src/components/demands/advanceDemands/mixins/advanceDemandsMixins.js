import {mapActions, mapGetters} from 'vuex'

const advanceDemandsMixins = {
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
            submitLoading: 'advanceDemands/submitLoading',
            loading: 'advanceDemands/loading',
            list: 'advanceDemands/list',
            listLoading: 'advanceDemands/loading',
            singleLoading: 'advanceDemands/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createAdvanceDemands: 'advanceDemands/create',
            updateAdvanceDemands: 'advanceDemands/update',
            getListAdvanceDemands: 'advanceDemands/getList',
            getSingleAdvanceDemands: 'advanceDemands/getSingle',
            deleteAdvanceDemands: 'advanceDemands/delete',
        }),

        async createSubmit(data, type) {
            try {
                await this.createAdvanceDemands(data)

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

                this.getListAdvanceDemands()
            }
        },

        async udpateSubmit(data) {
            try {
                await this.updateAdvanceDemands({id: this.updateId, data})

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
                this.getListAdvanceDemands()
                this.closeModal()
            }
        },

        async onDelete(val) {
            try {
                await this.deleteAdvanceDemands(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan silme başarılı !',
                    life: 3000
                })

                this.getListAdvanceDemands()
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
                description: null,
                documentPath: null,
                isDemand: null,
            }
        },
    },

}

export default advanceDemandsMixins
