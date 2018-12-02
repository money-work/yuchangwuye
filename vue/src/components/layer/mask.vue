<template>
    <transation name="fade">
        <div class="mask" v-if="showMask">
            <slot name="content"></slot>
        </div>
    </transation>

</template>
<style>
    .mask{
        position:fixed;
        left:0;
        top:0;
        bottom:0;
        right:0;
        background:rgba(0,0,0,.5);
        z-index:999;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 2s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
<script>
    export default{
        data(){
            return{
	            showMask:false
            }
        },
        props:['show'],
        watch:{
        	'show':{
        		handler:function (show) {
                    this.showMask = show;
		        }
            }
        },
        components:{
        }
    }
</script>
