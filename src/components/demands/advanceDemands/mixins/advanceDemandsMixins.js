import {mapActions, mapGetters} from 'vuex'

const advanceDemandsMixins = {
    data() {
        return {
            selectedItems: [],
            formData: {
                demandDate: null,
                reason: 'reason constant',
                detail: null,
                amount: null,
                requestStatus: null,
                Employee: null,
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

        async createSubmit(data) {
            try {
                delete this.formData.createdAt

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
                await this.$router.push({name: 'AdvanceDemandsList'})
            }
        },

        async udpateSubmit(data) {
            try {
                delete this.formData.createdAt
                await this.updateAdvanceDemands({id: data.id, data})

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
                await this.$router.push({name: 'AdvanceDemandsList'})

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


        onSelection(val) {
            this.selectedItems = val.map((item) => item.id)
        },
        resetForm() {
            this.formData = {
                demandDate: null,
                reason: 'reason constant',
                detail: null,
                amount: null,
                requestStatus: null,
                Employee: null,
            }
        },
    },

}

export default advanceDemandsMixins
