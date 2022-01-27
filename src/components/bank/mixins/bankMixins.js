import { mapActions, mapGetters } from 'vuex'

const bankMixin = {
    data() {
        return {
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'bank/submitLoading',
            loading: 'bank/loading',
            list: 'bank/list',
            listLoading: 'bank/loading',
            singleLoading: 'bank/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createBank: 'bank/create',
            updateBank: 'bank/update',
            getListBank: 'bank/getList',
            setPageBank: 'bank/setPage',
            deleteBank: 'bank/delete',
            getUsersSingle: 'bank/getSingle',
            multipleDeleteBank: 'bank/multipleDelete'
        }),
    },

}

export default bankMixin
