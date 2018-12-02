import Vue from 'vue';
import confirmComponent from './confirm.vue';
import alertComponent from './alert.vue';
import adLayerComponent from './adLayer.vue';
import {merge} from '../../util/util';
var alertInstance;
var alertDefault = {
	title    : '提示',
	content  : '',
	customContent  : '',
	alertText: '我知道了',
	callback : function () {
		alertInstance.show = false;
	}
};
/**
 * 警告框，alert("我的提示框");  alert({title:"提示标题",content:"提示语",custom:"<div>自定义区域</div>"})
 * @param content
 * @param settings
 */
const alert = function (content, settings) {
	if(typeof content == "object"){
		if(!settings){
			settings = content;
		}else{
			settings = merge(content, settings);
		}
	}else if(typeof content == "string"){
		if(!settings){
			settings = {};
		}
		settings.content = content;
	}
	// if (!alertInstance) {
		var _confirm = Vue.extend(alertComponent);
		var _settings = merge(alertDefault, settings);
		alertInstance = new _confirm({
			el       : document.createElement('div'),
			propsData: {
				settings: _settings,
				show    : false
			}
		});
	/*let page = document.querySelector('.page');
	if(page){

		// document.body.insertBefore(page, alertInstance.$el);
		page.parentNode.appendChild(alertInstance.$el);
	}else{

		document.body.appendChild(alertInstance.$el);
	}*/
	document.body.appendChild(alertInstance.$el);


	// }

	alertInstance.settings = merge(alertDefault, settings);
	alertInstance.show();
}

var adLayerInstance;
const adLayer = function (ad, options = {}) {
	if(!ad){return;}
    // if (!alertInstance) {
    var _adLayer = Vue.extend(adLayerComponent);
    adLayerInstance = new _adLayer({
        el       : document.createElement('div'),
        propsData: {
            ad: ad,
	        opts:options,
            needTitle:false,
            needContent:false,
        }
    });
    document.body.appendChild(adLayerInstance.$el);
    adLayerInstance.show();
}

var confirmInstance;
var confirmDefault = {
	title          : '提示',
	content        : '',
	customContent  : '',
	confirmText    : '确定',
	cancelText     : '取消',
	confirmCallback: function () {
		confirmInstance.close();
	},
	cancelCallback : function () {
		confirmInstance.close();
	}
};
/**
 * confirm confirm({
 * title:"标题",
 * content:"内容",
 * //断言，用于判断是否执行下一步，如果返回值为false则调用catch，如果为出则调用then回调函数
 * assert:function(){
 *      return true;
 *  }
 * }).then(()=>{
 * //点击确定函数
 * }).catch(()=>{
 * //点击取消回调函数
 * })
 * @param settings
 * @returns {Promise}
 */
const confirm = function (content, settings) {

	if(typeof content == "object"){
		if(!settings){
			settings = content;
		}else{
			settings = merge(content, settings);
		}
	}else if (typeof content == "string"){
		if(!settings){
			settings = {
				content:content
			};
		}else{
			settings.content = content
		}
	}
	// if (!confirmInstance) {
		let _confirm = Vue.extend(confirmComponent);
		let _settings = merge(confirmDefault, settings);
		confirmInstance = new _confirm({
			el       : document.createElement('div'),
			propsData: {
				settings: _settings,
				show    : false
			}
		});
		// document.querySelector('.page').after(confirmInstance.$el);
	document.body.appendChild(confirmInstance.$el);
	// }
	return new Promise((resolve, reject) => {
		confirmInstance.settings = merge(confirmDefault, settings);
		confirmInstance.show = true;
		confirmInstance.settings.confirmCallback = function () {
			var assert = false;
			if (typeof settings.assert == 'function') {
				assert = settings.assert();
			} else if (typeof settings.assert == 'boolean') {
				assert = settings.assert;
			} else {
				assert = true;
			}
			if (assert) {
				confirmInstance.show = false;
				if (settings.confirmCallback) {
					settings.confirmCallback();
				}
				resolve()
			} else {
				reject();
			}


		}
		confirmInstance.settings.cancelCallback = function () {
			confirmInstance.show = false;
			if (settings.cancelCallback) {
				settings.cancelCallback();
			}
			reject();
		}

	})
}
//在confirm基础上增加断言。用于阻断执行下一步
const prompt = function (settings) {
	if (typeof settings.assert == 'undefined') {
		settings.assert = true;
	}
	return confirm(settings);
}
export{
	alert,
    adLayer,
	confirm,
	prompt
}
