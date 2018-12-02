<template>
    <layer :show="showLayer">
        <div slot="custom" v-html="custom"></div>
        <div slot="title">{{title}}</div>
        <div slot="content">{{content}}</div>
        <div slot="customContent" v-html="customContent"></div>
        <div slot="bottomBtn">
            <a class="ok" :href="linkUrl" @click="callback">{{alertText}}</a>
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
				showLayer: false,
				title    : '',
				content  : '',
				custom   : '',
				linkUrl  : '',
                customContent   : '',
				alertText: '我知道了',
                callback : ()=>{

                }
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
				this.customContent = setting.customContent;
				this.custom = setting.custom;
				this.linkUrl = setting.linkUrl||'javascript:void(0)';
				if(setting.alertText)this.alertText = setting.alertText;
				if (setting.callback) {
					this.callback = ()=>{
						this.showLayer = false;
						setting.callback();
					}
				} else {
					this.callback = () => {
						this.showLayer = false;
					}
				}
			},
            show(){
	            this.showLayer = true;
            }
		},
		mounted(){

		},
		components: {
			layer,
		}
	}
</script>
