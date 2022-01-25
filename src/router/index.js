import VueRouter from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';

// Connections
import ConnectionHome from '@/views/Connections/Home.vue'

// Products
import InventoryHome from '@/views/Products/Home.vue'

// Finances
import FinancesHome from '@/views/Finances/Home.vue'

// Invoices
import InvoicesHome from '@/views/Invoices/Home.vue'

// Reports
import ReportsHome from '@/views/Reports/Home.vue'


const routes = [
		{
			path: '/',
			name: 'dashboard',
			component: Dashboard
		},{
			path: '/products',
			name: 'products',
			component: InventoryHome
		},{
			path: '/invoices',
			name: 'invoices',
			component: InvoicesHome
		},{
			path: '/connections',
			name: 'connections',
			component: ConnectionHome
		},{
			path: '/finances',
			name: 'finances',
			component: FinancesHome
		},{
			path: '/reports',
			name: 'reports',
			component: ReportsHome
		},
	]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
