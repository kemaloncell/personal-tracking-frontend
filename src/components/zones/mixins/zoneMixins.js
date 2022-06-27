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
    },

}

export default zoneMixins
