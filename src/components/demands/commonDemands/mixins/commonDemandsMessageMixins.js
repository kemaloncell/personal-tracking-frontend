import {mapActions, mapGetters} from 'vuex'

const commonDemandsMessageMixins = {
    data() {
        return {
            formData: {
                description: null,
                demandId: null,
                documentPath: null,
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
            uploadFile: 'employeeDocument/uploadFile',
        }),

        async createSubmit(data) {
            console.log(data, 'mixsn')
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
                await this.$router.push({name: 'CommonDemandsList'})
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

                await this.getListCommonDemandsMessage()
            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Çalışan silme başarısız !',
                    life: 3000
                })
            }
        },

        async fileSubmit(req) {
            if (req.file) {
                await this.uploadFile(req.file)
            }
            if (this.type === 'CREATE') {
                await this.createSubmit(req)
            } else {
                await this.udpateSubmit(req)
            }
        },

    },

}

export default commonDemandsMessageMixins
