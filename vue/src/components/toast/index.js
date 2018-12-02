import Vue from 'vue';
import toastComponent from './toast.vue';
import {merge} from '../../util/util';
var toastInstance;
var defaultSetting = {
	toasttext    : '',
	duration  : 3000,
	
};
/**
 * 警告框，alert("我的提示框");  alert({title:"提示标题",content:"提示语",custom:"<div>自定义区域</div>"})
 * @param content
 * @param settings
 */
export default function (content, settings) {
	if(typeof content == "string"){
		if(!settings){
			settings = {};
		}
		settings.toasttext = content;
	}
	if (!toastInstance) {
		let _confirm = Vue.extend(toastComponent);
		let _settings = merge(defaultSetting, settings);
		toastInstance = new _confirm({
			el       : document.createElement('div'),
			propsData: _settings
		});
		// document.querySelector('.page').after(toastInstance.$el);
		document.body.appendChild(toastInstance.$el);
	}

	toastInstance.propsData = merge(defaultSetting, settings);
	toastInstance.show(content);
}