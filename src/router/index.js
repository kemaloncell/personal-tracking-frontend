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
			name: 'dashboard',
			component: Dashboard
		},
		{
			path: '/user',
			name: 'user',
			component: UserList
		},
		{
			path: '/user/detail',
			name: 'userListDetail',
			component: UserListDetail
		},
		{
			path: '/user/test',
			name: 'userTest',
			component: UserTestList
		},
		{
			path: '/bank',
			name: 'bankListDetail',
			component: BankList
		},
		{
			path: '/bank/detail',
			name: 'bankListDetail',
			component: BankListDetail
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},

	]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
