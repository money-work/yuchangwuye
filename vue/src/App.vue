<template>
	<a-locale-provider :locale="zh_CN">
		<div id="app">
			<router-view/>
		</div>
	</a-locale-provider>
</template>

<script>
	export default {
		name: 'App'
	}
</script>