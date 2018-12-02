import Vue from 'vue';
import {localData, ajax, urls, sessionData} from '../../common/common';
import {Form, Button, Input} from 'vue-antd-ui';
import {alert} from "../../components/layer";
import toast from "../../components/toast";
import {check18IDCard} from "../../util/util";

export default {
	data() {
		return {
			formLayout: 'horizontal',
			formItemLayout: {
				labelCol: {span: 4},
				wrapperCol: {span: 14},
			},
			buttonItemLayout: {
				wrapperCol: {span: 14, offset: 0}
			},
			iconLoading: false,
			formData: {
				"name": "",
				"idCardNo": "",
				"phone": ""
			}
		}
	},

	components: {
		"AForm": Form,
		"AButton": Button,
		"AFormItem": Form.Item,
		"AInput": Input
	},
	mounted() {
	},
	methods: {
		login() {
			let vm = this;


			if (this.iconLoading) {
				return;
			}

			if (!vm.formData.name) {
				toast('请输入业主姓名');
				this.$refs.name.focus();
				return false;
			}

			if (!vm.formData.idCardNo || !check18IDCard(true, vm.formData.idCardNo)) {
				toast("请填写正确的身份证号码");
				this.$refs.idCardNo.focus();
				return false;
			}
			if (!/^1\d{10}$/.test(vm.formData.phone)) {
				toast('请输入正确的手机号');
				this.$refs.mobile.focus();
				return false;
			}
			this.iconLoading = true;

			ajax(urls.login, {
				jsonParams: vm.formData
			}).then(json => {
				this.iconLoading = false;
				sessionData.set("userInfo", json.data);
				sessionData.set("token", json.token);
				vm.$router.push({name: 'paymentList'});
			}).catch(() => {
				alert("登录失败，请重试");
			});
		}
	},
}