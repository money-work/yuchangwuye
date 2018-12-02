import Vue from 'vue';
import {isObject, search2json, json2search, getParameterByName} from '../util/util';
import urls from './urls';

// import {alert} from '../components/layer';

const ajax = function (url, options, backUrl) {
	options = options || {};
	options.url = url;
	//mock
	// if(options.jsonParams && process.env.NODE_ENV !== 'development'){
	if (options.jsonParams) {
		let strParam = '';
		if (typeof options.jsonParams == 'string') {
			strParam = options.jsonParams;
		} else if (isObject(options.jsonParams)) {
			strParam = JSON.stringify(options.jsonParams);
		}
		strParam = encodeURIComponent(strParam);
		options.url += strParam;
		if (backUrl) {
			options.url += backUrl;
		}
	}
	
	let defaultErrorMsg = '出错啦!';
	return new Promise((resolve, reject) => {
		Vue.http(options).then(res => {
			if (!res.ok) reject({message: defaultErrorMsg});
			res.json().then(json => {

				//php  接口
				if (typeof json.error !== 'undefined' && json.error == 0) {
					resolve(json);
				} else if (typeof json.code !== 'undefined' && json.code == 200) {
					resolve(json);
				}
				else if (json.code === 302) {

					// debugger;
					if (!options.useHooker) {
						if (json.message != '') {
							alert(json.message, {
								callback: () => {
									window.location.href = json.data;
								}
							})
						} else {
							window.location.href = json.data;
						}
					} else {
						reject(json);
					}

				}
				else {
					reject(json);
				}
			}).catch(err => {
				reject({message: defaultErrorMsg});
			})
		}).catch(err => {
			reject({message: defaultErrorMsg});
		})
	});
};
/**
 * 设置｜获取 | 删除 本地数据
 */
const localData = {
	set: function (k, v) {
		if (!k && !v) {
			return null;
		}
		try {
			localStorage.setItem(k, JSON.stringify(v));
		} catch (e) {
		}
	},
	get: function (k) {
		var json = localStorage.getItem(k);
		if (json) {
			json = JSON.parse(json);
		}
		return json;
	},
	remove: function (k) {
		localStorage.removeItem(k);
	},
	clear: function () {
		localStorage.clear();
	}
};


/**
 * 设置｜获取 | 删除 本地数据
 */
const sessionData = {
	set: function (k, v) {
		if (!k && !v) {
			return null;
		}
		try {
			sessionStorage.setItem(k, JSON.stringify(v));
		} catch (e) {
		}
	},
	get: function (k) {
		return JSON.parse(sessionStorage.getItem(k));
	},
	remove: function (k) {
		sessionStorage.removeItem(k);
	},
	clear: function () {
		sessionStorage.clear();
	}
};


/**
 * 设置｜获取 cookie
 */
const cookieData = {
	get: function (c_name) {
		if (document.cookie.length > 0) {
			var c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				var c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return decodeURI(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	/**
	 * @param c_name  String cookie-name
	 * @param value String cookie-value
	 * @param time  String cookie-time [ s20 | m20 | 1h | 1d ] －> 分别设置为[ 20毫秒 ｜ 20分钟 ｜ 1小时 ｜ 1天 ]
	 * @param domian String domain
	 * @param path   String domain-path
	 */
	set: function (c_name, value, time, domain, path) {

		var getSec = function (_t) {
			var str1 = _t.substring(1, _t.length) * 1;
			var str2 = _t.substring(0, 1);
			if (str2 == 's') {
				return str1 * 1000;
			}
			else if (str2 == 'm') {
				return str1 * 60 * 1000;
			}
			else if (str2 == 'h') {
				return str1 * 60 * 60 * 1000;
			}
			else if (str2 == 'd') {
				return str1 * 24 * 60 * 60 * 1000;
			}
		};

		var expTime = typeof time == 'string' ? getSec(time) : null;
		if (expTime) {
			var exdate = new Date();
			exdate.setTime(exdate.getTime() + expTime);
		}

		domain = domain || '';
		path = path || '/';
		document.cookie = c_name + "=" + encodeURI(value) +
			((expTime == null) ? "" : ";expires=" + exdate.toGMTString()) + ';domain=' + domain + ';path=' + path;
	},
	clear: function (c_name, domain) {
		domain = domain || '';
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = c_name + "=''; expires=" + date.toGMTString() + ';domain=' + domain;
	}
};

const log = function () {
	if (process.env.NODE_ENV == 'development' && console) {
		console.log.apply(console, arguments);
	}
};
const updateHtmltitle = function (title, source) {
	document.title = title;
};

const setPiaoNiuQuery = (path, cityCode = 0) => {
	let wesaiToken = token;
	let wesaiUserId = window.curUserId;

	let pathSearchObj = path.split('?')[1] ? search2json(path.split('?')[1]) : {};

	let env = '';
	if (location.hostname.indexOf('dev') >= 0) {
		env = 'dev';
	} else if (location.hostname.indexOf('test') >= 0) {
		env = 'test';
	} else if (location.hostname.indexOf('pre') >= 0) {
		env = 'pre';
	}

	if (process.env.SPACE === 'wshybrid') {
		cityCode = getParameterByName('cityCode') || '';
		wesaiToken = getParameterByName('token') || '';
		wesaiUserId = getParameterByName('curUserId') || '';
	}

	Object.assign(pathSearchObj, {
		wesai: 1,
		noAppLink: true,
		env: env,
		cityCode,
		wesaiToken,
		wesaiUserId,
	});

	if (process.env.SPACE === 'wechat') {
		let queryMaoYanOpenId = window.queryMaoYanOpenId || '';
		let queryCityCode = window.queryCityCode || 0;

		Object.assign(pathSearchObj, {
			maoYanOpenId: queryMaoYanOpenId,
			cityCode: queryCityCode,
		});
	}

	return path.split('?')[0] + '?' + json2search(pathSearchObj);
};

const extendQuery = (path, query = {}) => {
	let pathSearchObj = path.split('?')[1] ? search2json(path.split('?')[1]) : {};

	Object.assign(pathSearchObj, query);

	return path.split('?')[0] + '?' + json2search(pathSearchObj);
};

export {
	ajax,
	urls,
	localData,
	cookieData,
	updateHtmltitle,
	log,
	sessionData,
	setPiaoNiuQuery,
	extendQuery
}
