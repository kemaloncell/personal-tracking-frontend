import VueRouter from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';

// Users
import UserList from '@/views/Users/UserList.vue'
import UserListDetail from '@/views/Users/UserListDetail.vue'
import UserTestList from '@/views/Users/UserTestList'

//Bank
import BankList from '@/views/Bank/BankList'
import BankListDetail from '@/views/Bank/BankListDetail'

//Login
import Login from '@/views/Auth/Login.vue'

const routes = [
		{
			path: '/',
			name: 'Dashboard',
			component: Dashboard
		},
		{
			path: '/user',
			name: 'User',
			component: UserList,
			props: true,
		},
		{
			path: '/user/:name/detail',
			name:'UserDetail',
			component: UserListDetail,
			props: true,
		},
		{
			path: '/user/test',
			name: 'UserTest',
			component: UserTestList
		},
		{
			path: '/bank',
			name: 'BankList',
			component: BankList
		},
		{
			path: '/bank/detail',
			name: 'BankListDetail',
			component: BankListDetail
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},

	]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
