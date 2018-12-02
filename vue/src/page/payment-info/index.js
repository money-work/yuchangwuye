//这是缴费页面
import Vue from 'vue';
import userInfo from '../../components/top-user/index.vue';
import {ajax, sessionData, urls} from "../../common/common";
import {Button, Checkbox} from 'vue-antd-ui';
import toast from "../../components/toast";

export default {
	data() {
		return {
			paymentInfo: [],
			paymentInfoId: "",
			checkedList: [],
			plainOptions: [],
			indeterminate: true,
			checkAll: false,
			iconLoading: false,
			allMoney: "0.0"
		}
	},
	components: {
		userInfo,
		"AButton": Button,
		"ACheckbox": Checkbox,
		"ACheckboxGroup": Checkbox.Group
	},
	mounted() {
		this.paymentInfoId = this.$route.query["id"] || '';
		this.$nextTick(function () {
			this.getPaymentInfo();
		});
	},
	methods: {
		getPaymentInfo() {
			let vm = this;
			// ajax(urls.getPaymentHistoryInfo, {
			// 	jsonParams: this.paymentHistoryInfoId
			// }).then(json => {
			// 	this.paymentInfo = json.data;
			// }).catch(() => {
			// });
			ajax(urls.getPaymentInfo).then(json => {
				this.paymentInfo = json.data[0];
				this.paymentInfo.info.map(function (item) {
					vm.plainOptions.push(item.id);
				})
			}).catch(() => {
			});
		},
		changeMoney() {
			let vm = this;
			this.allMoney = "0.0";
			this.checkedList.map(function (item) {
				vm.paymentInfo.info.map(function (info) {

					if (info.id == item) {
						vm.allMoney = parseFloat(vm.allMoney);
						vm.allMoney += parseFloat(info.money);
					}
				});
			});
			this.allMoney = this.allMoney + "";
		},
		onChange(checkedList) {
			this.indeterminate = !!checkedList.length && (checkedList.length < this.plainOptions.length)
			this.checkAll = checkedList.length === this.plainOptions.length;
			this.changeMoney();

		},
		onCheckAllChange(e) {
			let vm = this;
			Object.assign(this, {
				checkedList: e.target.checked ? vm.plainOptions : [],
				indeterminate: false,
				checkAll: e.target.checked,
			});
			this.changeMoney();
		},
		pay() {
			if (this.iconLoading) {
				return;
			}

			if (this.checkedList.length <= 0) {
				toast('请选择缴费项');
				return;
			}

			this.iconLoading = true;
		}
	}
}