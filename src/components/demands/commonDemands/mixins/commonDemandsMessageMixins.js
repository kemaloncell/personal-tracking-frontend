import {mapActions, mapGetters} from 'vuex'

const commonDemandsMessageMixins = {
    data() {
        return {
            formData: {
                description: null,
                demandId: null,
                documentPath: null,
                messageId: null
            },
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'commonDemandsMessage/submitLoading',
            loading: 'commonDemandsMessage/loading',
            list: 'commonDemandsMessage/list',
            listLoading: 'commonDemandsMessage/loading',
            singleLoading: 'commonDemandsMessage/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createCommonDemandsMessage: 'commonDemandsMessage/create',
            getListCommonDemandsMessage: 'commonDemandsMessage/getList',
            deleteCommonDemandsMessage: 'commonDemandsMessage/delete',
        }),

        async createSubmit(data, type) {
            try {
                await this.createCommonDemandsMessage(data)

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

                this.getListCommonDemandsMessage()
            }
        },


        async onDelete(val) {
            try {
                await this.deleteCommonDemandsMessage(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan silme başarılı !',
                    life: 3000
                })

                this.getListCommonDemandsMessage()
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


    },

}

export default commonDemandsMessageMixins
