let _templet = function (template, data) {
	return template.replace(/#\{(.+?)\}/ig, function () {
		let key = arguments[1].replace(/\s/ig, '');
		let ret = arguments[0];
		let list = key.split('||');
		for (let i = 0, len = list.length; i < len; i += 1) {
			if (/^default:.*$/.test(list[i])) {
				ret = list[i].replace(/^default:/, '');
				break;
			}
			else if (data[list[i]] !== undefined) {
				ret = data[list[i]];
				break;
			}
		}
		return ret;
	});
};
let _lang = function (template, data) {
	return template.replace(/#L\{((.*?)(?:[^\\]))\}/ig, function () {
		let key = arguments[1];
		let ret;
		if (data && !!data[key]) {
			ret = data[key];
		} else {
			ret = key;
		}
		return ret;
	});
};
let language = 'zh-cn';
let langObj = {};//require('source/i18n/en-us.js');

import Vue from 'vue';
import {localData} from "./common";
window.Vue = Vue;
Vue.filter('lang', function (val) {

	return Vue.lang(val);
});
function loadLanguageFile(lang){
	if(lang == 'en-us'){
		require.ensure(['source/i18n/en-us.js'], function (require) {
			langObj = require('source/i18n/en-us.js');
		}, 'language.en-us');
	}

}
if(localData.get('language') == 'en-us'){
	loadLanguageFile('en-us');
	language = 'en-us'
}
export const changeLanguage = function (lang) {
	if(lang == 'en-us'){
		loadLanguageFile(lang);
	}
	localData.set('language', lang);
	language = lang;
}
export const lang = function (temp, data = {}) {
	if (temp.indexOf('#L') < 0 && temp.length>0) {
		temp = `#L{${temp}}`;
	}
	let _LANG = language == 'en-us' ? langObj : {};
	let str = _lang(temp, _LANG);
	str = str.replace(/\\}/ig, '}');
	if (data) {
		str = _templet(str, data);
	}
	return str;
}