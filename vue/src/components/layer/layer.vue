<template>
    <div class="page-layer" v-if="showLayer" @click="outerClick">
        <transition-group name="fade"
                          v-on:before-enter="beforeEnter"
                          v-on:after-leave="afterLeave"
        >
            <div class="layer" ref="layerMask"  :key="1" v-if="showLayerTimer">

            </div>

            <div :key="2" class="layer-outer">
                <transition name="bounce">
                    <div class="layer-wrapper" v-if="showLayerTimer">
                        <div class="layer-custom">
                            <slot name="custom"></slot>
                        </div>
                        <div v-if="showTitle"  class="layer-title">
                            <slot name="title"></slot>
                        </div>
                        <div v-if="showContent" class="layer-content">
                            <slot name="content"></slot>
                            <slot name="customContent"></slot>
                        </div>
                        <div class="layer-bottom-btn" v-if="showBtns">
                            <slot name="bottomBtn"></slot>
                        </div>
                        <slot name="layer-ad"></slot>
                    </div>
                </transition>
            </div>


        </transition-group>
    </div>

</template>
<style lang="scss" >
    @import './layer.scss';
</style>
<script type="text/babel">
	export default{
		data(){
			return {
				showLayer:false,
				showLayerTimer:false,
				showBtns : true,
                showTitle:true,
                showContent:true

            }
		},
        watch:{
			'show':{
				handler:function (show) {
					this.showLayerFun(show);
				}
            }
        },
        created(){

        },
        methods:{
        	showLayerFun(show){
		        var page = document.getElementsByClassName('page');
		        if(show){

			        this.showLayer = show;
			        this.showBtns = !!this.$slots.bottomBtn;
					if(typeof this.needTitle !== 'undefined')this.showTitle = this.needTitle;
                    if(typeof this.needContent !== 'undefined')this.showContent = this.needContent;
			        setTimeout(()=>{
				        if(page.length>0)page[0].classList.add("page-filter");
				        this.showLayerTimer = show;
			        }, 500);
		        }else{
			        this.showLayerTimer = show;
			        if(page.length>0)page[0].classList.remove("page-filter");
			        setTimeout(()=>{
				        this.showLayer = show;
			        }, 500);
		        }
            },
	        outerClick(e){
	        	if(this.useOuterClick && this.$refs.layerMask == e.target){
			        this.useOuterClick();
                }
            },
			beforeEnter: () => {

			},
	        afterLeave: () => {
                console.log('afterLeave');
			}
        },
        props:['show', 'useOuterClick','needTitle','needContent'],
		components: {
        }
	}
</script>
