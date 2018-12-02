<template>
    <transition name="toast">
        <div v-if="showStatus" class="toast font-normal">
            <div class="toast-text">{{toasttext}}</div>
        </div>
    </transition>
</template>
<script type="text/babel">
	export default{
		data(){
			return {
				showStatus:false
            }
        },
		props:{
			//是否显示提示
			toastshow:{
				type:Boolean,
				required: false,
				default:function(){
					return false;
				}
			},
			//提示的内容
			toasttext:{
				type:String,
				required: false,
				default:function(){
					return 'no message';
				}
			},
			//显示的时间
			duration: {
				type: Number,
				default:3000,//默认3秒
				required:false
			}
		},
        methods:{
	        show(val){
	        	this.showStatus = true;
	        	this.toasttext = val;
		        if (this._timeout) clearTimeout(this._timeout)
		        if (!!this.duration) {
//			        this.showStatus = false;
			        this._timeout = setTimeout(()=> this.showStatus = false, this.duration)
		        }
            }
        },
		watch:{
			toastshow(val){

				if (this._timeout) clearTimeout(this._timeout)
                console.log(val, this.duration);
				if (val && !!this.duration) {
					this.showStatus = val;
					this._timeout = setTimeout(()=> this.showStatus = false, this.duration)
				}
			}
		}
	}
</script>
<style scoped>
    .toast{
        position:absolute;
        font-size:12px;
        left:0%;
        top:30%;
        display:block;
        width:100%;
        height:auto;
        text-align:center;


        z-index:100;
        transform:scale(1);

        transition: all .3s ease;
    }
    .toast .toast-text{
        border-radius:6px;
        margin:auto;
        padding:5px 10px;
        color:white;
        display:inline-block;
        background-color:rgba(0,0,0,0.5);
    }
    .toast-enter-active{
        opacity:0;
        transform:scale(0.1);
    }
    .toast-leave-active{
        opacity:0;
        transform:scale(0.1);
    }
</style>