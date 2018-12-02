import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import zh_CN from 'vue-antd-ui/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'vue-antd-ui';
import 'moment/locale/zh-cn';
import Vuex from 'vuex';
import store from '@/store';
import VueResource from 'vue-resource';

require('../baseCss/base.scss');

Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.prototype.zh_CN = zh_CN;
Vue.component(LocaleProvider.name, LocaleProvider);

const mapObj = {
	'login': r => require.ensure([], () => r(require('@/page/login/index.vue')), 'login'),
	'paymentList': r => require.ensure([], () => r(require('@/page/payment-list/index.vue')), 'paymentList'),
	'paymentHistoryList': r => require.ensure([], () => r(require('@/page/payment-history-list/index.vue')), 'paymentHistoryList'),
	'paymentHistoryInfo': r => require.ensure([], () => r(require('@/page/payment-history-info/index.vue')), 'paymentHistoryInfo'),
	'paymentInfo': r => require.ensure([], () => r(require('@/page/payment-info/index.vue')), 'paymentInfo'),
};
const router = new Router({
	mode: 'history',
	base: '/',
	routes: [
		{
			path: "/",
			name: 'login',
			component: mapObj.login
		},
		{
			path: '/paymentList',
			name: 'paymentList',
			component: mapObj.paymentList
		},
		{
			path: '/paymentHistoryList',
			name: 'paymentHistoryList',
			component: mapObj.paymentHistoryList
		},
		{
			path: '/paymentHistoryInfo',
			name: 'paymentHistoryInfo',
			component: mapObj.paymentHistoryInfo
		},
		{
			path: '/paymentInfo',
			name: 'paymentInfo',
			component: mapObj.paymentInfo
		},
		// {
		// 	path: '*',
		// 	name: 'other',
		// 	component: mapObj.notFound
		// }
	]
});
import config from './config';

Vue.use(config);

Vue.config.productionTip = true;
const app = new Vue({
	el: '#app',
	store,
	router: router,
	components: {App},
	template: '<App/>',
	// render: h => h('router-view')
});
/* eslint-disable no-new */
// new Vue({
// 	el: '#app',
// 	router,
// 	components: {App},
// 	template: '<App/>'
// })