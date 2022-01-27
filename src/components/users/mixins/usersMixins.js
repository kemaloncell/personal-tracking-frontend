import { mapActions, mapGetters } from 'vuex'

const usersMixin = {
    data() {
        return {
        }
    },

    computed: {
        ...mapGetters({
            submitLoading: 'users/submitLoading',
            loading: 'users/loading',
            list: 'users/list',
            listLoading: 'users/loading',
            singleLoading: 'users/singleLoading'
        }),
    },

    methods: {
        ...mapActions({
            createUsers: 'users/create',
            updateUsers: 'users/update',
            getListUsers: 'users/getList',
            setPageUsers: 'users/setPage',
            deleteUsers: 'users/delete',
            getUsersSingle: 'users/getSingle',
            multipleDeleteUsers: 'users/multipleDelete'
        }),
    },

}

export default usersMixin
