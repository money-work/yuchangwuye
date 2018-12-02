<template>
    <layer :show="showLayer">
        <div slot="custom" v-html="custom"></div>
        <div slot="title">{{title|lang}}</div>
        <div slot="content">{{content|lang}}</div>
        <div slot="customContent" v-html="customContent"></div>
        <div slot="bottomBtn" class="confirm-btn">
            <a class="cancel" @click="cancelCallback">{{cancelText | lang}}</a>
            <a class="ok" @click="confirmCallback">{{confirmText | lang}}</a>
        </div>
    </layer>
</template>
<style>

</style>
<script type="text/babel">
	import layer from './layer.vue'
	export default{
		data(){
			return {
				showLayer      : false,
				title          : '',
				content        : '',
				custom         : '',
				customContent  : '',
				cancelCallback : ()=>{},
				cancelText     : '',
				confirmCallback: ()=>{},
				confirmText    : '',
			}
		},
		props     : ['settings', 'show'],
		watch     : {
			settings: {
				handler: function (setting) {
					this.resetSetting(setting);
				}
			},
			show    : function (show) {
				this.showLayer = show;
			}
		},
		created(){
			this.resetSetting();
		},
		methods   : {
			resetSetting(setting = this.settings){
				this.title = setting.title;
				this.content = setting.content;
				this.custom = setting.custom;
				this.customContent = setting.customContent;
				this.cancelCallback = setting.cancelCallback;
				this.cancelText = setting.cancelText;
				this.confirmCallback = setting.confirmCallback;
				this.confirmText = setting.confirmText;


			},
            close(){
				this.showLayer = false;
            }
		},
		mounted(){

		},
		components: {
			layer,
		}
	}
</script>
