import {log, urls, updateHtmltitle, setPiaoNiuQuery, sessionData} from '@/common/common';


let config = {};
let u = navigator.userAgent;
let city;
//基于外部刷新

config.install = function (Vue, options) {

	// Vue.prototype.domain = '';
	window.Vue = Vue;
	//混合 包括全局路由控制的响应逻辑等
	Vue.mixin({
		created() {
		},
		beforeRouteLeave(to, from, next) {
			next(true);
		},
		//全局路由钩子，非详情页，禁用分享，更新title
		beforeRouteEnter(to, from, next) {
			let title = '绑定物业';

			switch (to.name) {
				case 'login':
					title = '绑定物业';
					break;
				case 'paymentList':
					title = '缴费列表';
					break;
				case 'paymentHistoryList':
					title = '缴费历史列表';
					break;
				case 'payment':
					title = '缴费页面';
					break;
				case 'paymentHistoryInfo':
					title = '缴费历史详情';
					break;
			}

			next(vm => {
				window.vm = vm;
				if (to.name !== 'index' && to.name !== '/' && to.name !== "index.php") {
					if (!sessionData.get("token")) {
						vm.$router.push({name: 'login'});
					}
				}

				// vm.customComponentList = {
				// 	'footerComponent': require('@/components/footer/footer.vue'),
				// };

				if (title) {
					updateHtmltitle(title)
				}
			});
		}
	});

	//刷新页面
	Vue.prototype.reloadPage = function () {
		location.reload();
	};
	//更新标题
	Vue.prototype.updateTitle = function () {
		updateHtmltitle(localData.get('itemInfo').itemTitle || '', staticUri + '/src/images/pic.png');
	};

	Vue.prototype.getQueryString = function (name) {
		var reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.href.match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
};


export default config;