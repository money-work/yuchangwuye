var path = require('path');

var login = require(path.join(__dirname, 'db/login.json'));
var getPaymentList = require(path.join(__dirname, 'db/getPaymentList.json'));
var getPaymentHistoryList = require(path.join(__dirname, 'db/getPaymentHistoryList.json'));
var getPaymentHistoryInfo = require(path.join(__dirname, 'db/getPaymentHistoryInfo.json'));
var getPaymentInfo = require(path.join(__dirname, 'db/getPaymentInfo.json'));

module.exports = function () {
	return {
		"login": login,
		"getPaymentList": getPaymentList,
		"getPaymentHistoryList": getPaymentHistoryList,
		"getPaymentHistoryInfo": getPaymentHistoryInfo,
		"getPaymentInfo": getPaymentInfo,
	}
};
