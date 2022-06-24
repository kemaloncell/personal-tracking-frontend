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
                status: null,
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

        async createSubmit(data) {
            try {
                delete data.documentPath
                delete data.createdAt
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
                await this.$router.push({name: 'CommonDemandsList'})
            }
        },

        async udpateSubmit(data) {
            try {
                delete data.documentPath
                delete data.createdAt
                await this.updateCommonDemands({id: data.id, data})

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
                await this.$router.push({name: 'CommonDemandsList'})
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

                await this.getListCommonDemands()
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
                description: null,
                documentPath: null,
                isDemand: null,
                status: null,
            }
        },
    },

}

export default commonDemandsMixins
