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
                this.$router.push({name: 'Demands'})
            }
        },

        async udpateSubmit(data) {
            try {
                await this.updateOffDayDemands({id: this.updateId, data})

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
                await this.getListOffDayDemands()
            }
        },

        async onDelete(val) {
            try {
                await this.deleteOffDayDemands(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan silme başarılı !',
                    life: 3000
                })

                await this.getListOffDayDemands()
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

export default offDayDemandsMixins
