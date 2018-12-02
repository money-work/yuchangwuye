<template>
	<footer class="fixed-ft">
		<ul class="nav-sub">
			<li ref="home" v-bind:class="{current:selectTab=='paymentList'}" @click="show('paymentList')">
				<span>缴费列表</span>
			</li>
			<li ref="shop" v-bind:class="{current:selectTab=='paymentHistoryList'}" @click="show('paymentHistoryList')">
				<span>缴费历史</span>
			</li>
		</ul>
	</footer>
</template>

<script>
	import Vue from 'vue';
	import {mapGetters} from 'vuex';
	import * as actions from '../../store/mutation-types.js';

	export default {
		data() {
			return {}
		},
		computed: {
			// 客可以直接在<template> 中使用
			...mapGetters({
				selectTab: 'getSelectTab',
			}),
		},
		methods: {
			show(type) {
				var vm = this;
				this.$store.commit(actions.SELECT_TAB, type);
				switch (type) {
					case 'paymentList':
						vm.$router.push({name: 'paymentList'});
						break;
					case 'paymentHistoryList':
						vm.$router.push({name: 'paymentHistoryList'});
						break;

				}

			}
		}
	}

</script>
<style lang="scss" scoped>
	.fixed-ft {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: auto;
		z-index: 1000;
		height: 49px;
		border-top: 1px solid #f2f2f2;
		background: #fff;
		.nav-sub {
			width: 100%;
			display: flex;
			display: -webkit-flex;
			li {
				border-right: 1px solid #f2f2f2;
				flex: 1;
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				-moz-box-flex: 1;
				-ms-flex: 1;
				text-align: center;
				display: block;
				height: 48px;
				line-height: 44px;
				font-size: 10px;
				color: #999;
				position: relative;
				-ms-box-flex: 1;
				-o-box-flex: 1;
				box-flex: 1;
				/*padding: 6px 0 4px;*/
				&.current {
					color: #1B97FF;
				}
			}
		}
	}
</style>
