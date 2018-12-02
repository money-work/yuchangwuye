//这是缴费列表
import Vue from 'vue';
import userInfo from '../../components/top-user/index.vue';
import footerComponent from '../../components/footer/footer.vue';
import {Collapse} from 'vue-antd-ui';
import {ajax, sessionData, urls} from "../../common/common";
import {mapGetters} from 'vuex';
import * as actions from '../../store/mutation-types.js';

export default {
	data() {
		return {
			paymentList: []
		}
	},
	computed: {
		// 客可以直接在<template> 中使用
		...mapGetters({
			selectTab: 'getSelectTab',
		}),
	},
	components: {userInfo, footerComponent, "ACollapse": Collapse, "ACollapsePanel": Collapse.Panel},
	created() {
		this.$store.commit(actions.SELECT_TAB, 'paymentList');
	},
	mounted() {
		this.$nextTick(function () {
			this.getPaymentList();
		});
	},
	methods: {
		getPaymentList() {
			ajax(urls.getPaymentList).then(json => {
				this.paymentList = json.data;
			}).catch(() => {
			});
		},
		showPaymentInfo(item) {
			vm.$router.push({name: 'paymentInfo', query: {id: item.id}});
		}
	}
}