import Vue from 'vue';
import userInfo from '../../components/top-user/index.vue';
import {ajax, sessionData, urls} from "../../common/common";
//这是缴费历史详情
export default {
	data() {
		return {
			paymentHistoryInfo: [],
			paymentHistoryInfoId: ""
		}
	},
	components: {userInfo},
	mounted() {
		this.paymentHistoryInfoId = this.$route.query["id"] || '';
		this.$nextTick(function () {
			this.getPaymentHistoryInfo();
		});
	},
	methods: {
		getPaymentHistoryInfo() {
			// ajax(urls.getPaymentHistoryInfo, {
			// 	jsonParams: this.paymentHistoryInfoId
			// }).then(json => {
			// 	this.paymentHistoryInfo = json.data;
			// }).catch(() => {
			// });
			ajax(urls.getPaymentHistoryInfo).then(json => {
				this.paymentHistoryInfo = json.data[0];
			}).catch(() => {
			});
		}
	}
}