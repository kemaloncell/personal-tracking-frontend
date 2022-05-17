import {mapActions, mapGetters} from 'vuex'

const supplierMixin = {
    data() {
        return {}
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

        async createSubmit(data, type) {
            try {
                await this.createSupplier(data)

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
                if (type === 0) {
                    this.closeModal()
                }

                this.getListSupplier()
            }
        },

        async udpateSubmit(data) {
            try {
                await this.updateSupplier({id: this.updateId, data})

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
                this.getListSupplier()
                this.closeModal()
            }
        }
    },

}

export default supplierMixin
