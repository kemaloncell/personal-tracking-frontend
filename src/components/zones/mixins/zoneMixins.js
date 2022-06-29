import {mapActions, mapGetters} from 'vuex'

const zoneMixins = {
    data() {
        return {}
    },

    computed: {
        ...mapGetters({
            submitLoading: 'zones/submitLoading',
            loading: 'zones/loading',
            list: 'zones/list',
            listLoading: 'zones/loading',
            singleLoading: 'zones/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createZone: 'zones/create',
            updateZone: 'zones/update',
            getLiseZone: 'zones/getList',
            setPageZone: 'zones/setPage',
            deleteZone: 'zones/delete',
            getZonesSingle: 'zones/getSingle',
            multipleDeleteZone: 'zones/multipleDelete'
        }),


        async createSubmit(data) {
            try {
                await this.createZone(data)

                await this.$toast.add({
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
                //  await this.$router.push({name: 'CommonDemandsList'})
                /* await this.$emit('nextPage', {
                     formData: {City: this.City, name: this.name},
                     pageIndex: 0
                 }); */
            }
        },

        async udpateSubmit(data) {
            try {
                await this.updateZone({id: data.id, data})

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
                //await this.$router.push({name: 'CommonDemandsList'})
            }
        },

        async onDelete(val) {
            try {
                await this.deleteZone(val.id)

                this.$toast.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Çalışan silme başarılı !',
                    life: 3000
                })

                await this.getLiseZone()
            } catch {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Başarısız',
                    detail: 'Çalışan silme başarısız !',
                    life: 3000
                })
            }
        },

        async fileSubmit(req, type) {
            if (req.file) {
                await this.uploadFile(req.file)
            }
            if (this.type === 'CREATE') {
                await this.createSubmit(req, type)
            } else {
                await this.udpateSubmit(req)
            }
        },
    },


}

export default zoneMixins
