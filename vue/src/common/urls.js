const API = {
	production: '',
	development: '/rest/'
};
let apiUrl = "", token = "";
const urls = {
	//线上正式接口地址
	production: {
		login: apiUrl + '/rest/' + token + '/Java/item/queryItemDetailInfo/',
		getPaymentList: apiUrl + '/rest/' + token + '/Cart/Cart/getConfirmation/%7B%7D',
		getPaymentHistoryList: apiUrl + '/rest/' + token + '/Cart/Cart/getConfirmation/%7B%7D',
		getPaymentHistoryInfo: apiUrl + '/rest/' + token + '/Cart/Cart/getConfirmation/%7B%7D',
		getPaymentInfo: apiUrl + '/rest/' + token + '/Cart/Cart/getConfirmation/%7B%7D',
	},
	//Mock接口地址，方便调试
	development: {
		login: 'login/',
		getPaymentList: 'getPaymentList/',
		getPaymentHistoryList: 'getPaymentHistoryList/',
		getPaymentHistoryInfo: 'getPaymentHistoryInfo/',
		getPaymentInfo: 'getPaymentInfo/'
	}

};

const expUrl = urls[process.env.NODE_ENV]; //先默认为对应环境的url地址

if (process.env.NODE_ENV == 'development') {
	/*逻辑判断：在online模式下存在的url，若dev下不存在，则将其动态添加到目前的对象上；*/
	for (var key in urls.production) {

		if (!expUrl[key]) {
			expUrl[key] = urls.production[key];
		} else {
			expUrl[key] = API[process.env.NODE_ENV] + expUrl[key];
		}
	}
}
export default {
	...expUrl
}
