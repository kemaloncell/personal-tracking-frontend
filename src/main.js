import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import './plugin/primeVue'
import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';

import router from './router/index';
import store from './store'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(VueFileAgent)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
