<template>
    <layer :show="showLayer" :needTitle="needTitle" :needContent="needContent">
        <div slot="layer-ad"  class="showNoticeAd" @click="hide" :style="{'width':(opts.width|| 260)+'px','height':(opts.height||235)+'px'}">
            <a :href="ad.task_url" class="hrefAd">
                <div class="modalAd" :style="{'background-image':'url('+ ad.ad_img + ')','width':(opts.width|| 260)+'px','height':(opts.height||180)+'px'}"></div>
                <!--<div class="adDesc" v-if="ad.ad_desc">{{ad.ad_desc}}</div>-->
            </a>
            <img class="close" src="./x.png" @click="hide">
        </div>
    </layer>
</template>
<style  lang="scss" scoped>
    .s-mask {
        background-color: #666;
        position: absolute;
        z-index: 1002;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        opacity: 0.5;
        filter: alpha(opacity=50);
        -moz-opacity: 0.5;
        display: block;
    }
    .showNoticeAd{
        position: absolute;
        z-index: 1003;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        /*width: 260px;*/
        /*height:235px;*/
        text-align:center;
    }
    .hrefAd {
        display: block;
    }
    .modalAd{
        /*width:260px;*/
        /*height:180px;*/
        z-index: 1003;
        background: #ffffff center center;
        background-size: cover;
        border-radius: 6px;

    }
    .adDesc{
        background-color: white;
    }
    .close{
        margin-top: 15px;
        width:30px;
        height:30px;
        z-index: 1003;
    }

</style>


<script type="text/babel">
    import Vue from 'vue';
    import layer from '../layer/layer.vue';
	import {sessionData} from '../../common/common';

    export default {
        data(){
            return {
                showLayer: false
            }
        },
        props:['ad','needTitle','needContent','opts'],
        components: {
            layer,
        },
        created(){
            this.resetSetting();
        },
        methods: {
            resetSetting(){
                this.showLayer=false;
            },
            hide:function(){
				sessionData.set("adLayer", "isClickHide");
                this.showLayer=false;
            },
            show(){
                this.showLayer = true;
            }

        }

    }
</script>