import { mapActions, mapGetters } from 'vuex'

const usersMixin = {
    data() {
        return {
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'products/submitLoading',
            list: 'products/list',
            listLoading: 'products/loading',
            singleLoading: 'products/singleLoading',
            exportLoading: 'products/exportLoading',
            allStoreList: 'inventories/allStoreList',
            allCategoryList: 'inventories/allCategoryList'
        }),
    },

    methods: {
        ...mapActions({
            create: 'products/create',
            update: 'products/update',
            getList: 'products/getList',
            setPage: 'products/setPage',
            delete: 'products/delete',
            getSingle: 'products/getSingle',
            downloadExcel: 'products/downloadExcel',
            downloadPDF: 'products/downloadPDF',
            downloadCSV: 'products/downloadCSV',
            getAllStoreList: 'inventories/getAllStoreList',
            getAllCategoryList: 'inventories/getAllCategoryList'
        }),
    },

    created() {
        this.getList()
    }
}

export default usersMixin
