import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import './plugin/primeVue'

import router from './router/index';
import store from './store'

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
