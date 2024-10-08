import {mapActions, mapGetters} from 'vuex'

const offDayDemandsMixins = {
    data() {
        return {
            selectedItems: [],
            formData: {
                beginDate: null,
                endDate: null,
                reason: 'reason constant',
                detail: null,
                requestStatus: null,
                offDayPeriod: null,
                Employee: null,
            },
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'offDayDemands/submitLoading',
            loading: 'offDayDemands/loading',
            list: 'offDayDemands/list',
            listLoading: 'offDayDemands/loading',
            singleLoading: 'offDayDemands/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createOffDayDemands: 'offDayDemands/create',
            updateOffDayDemands: 'offDayDemands/update',
            getListOffDayDemands: 'offDayDemands/getList',
            getSingleOffDayDemands: 'offDayDemands/getSingle',
            deleteOffDayDemands: 'offDayDemands/delete',
        }),

        async createSubmit(data) {
            try {
                delete this.formData.createdAt
                await this.createOffDayDemands(data)

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
                await this.$router.push({name: 'Demands'})
            }
        },

        async udpateSubmit(data) {
            try {
                delete this.formData.createdAt
                await this.updateOffDayDemands({id: this.updateId, data})

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'İzin güncelleme başarılı !',
                    life: 3000
                })
            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'İzin güncelleme başarısız !',
                    life: 3000
                })
            } finally {
                await this.$router.push({name: 'Demands'})
            }
        },

        async onDelete(val) {
            try {
                await this.deleteOffDayDemands(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'İzin silme başarılı !',
                    life: 3000
                })


            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'İzin silme başarısız !',
                    life: 3000
                })
            } finally {
                await this.getListOffDayDemands()
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
                beginDate: null,
                endDate: null,
                reason: 'reason constant',
                detail: null,
                requestStatus: null,
                offDayPeriod: null,
                Employee: null,
            }
        },
    },

}

export default offDayDemandsMixins
