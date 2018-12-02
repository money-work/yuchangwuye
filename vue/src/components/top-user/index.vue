<template>
	<header class="user-info">
		{{user.name}}
	</header>
</template>
<style lang="scss" scoped>
	.user-info {
		font-size: 18px;
		height: 60px;
		line-height: 60px;
	}
</style>
<script>
	import {sessionData} from '../../common/common';

	export default {
		data() {
			return {
				user: {
					"name": sessionData.get("userInfo") && sessionData.get("userInfo")[0].name
				}
			}
		}
	}


</script>