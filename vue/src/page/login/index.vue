<template>
	<div class="login-content">
		<div class="owner-information">业主信息</div>
		<div class="form-content">
			<a-form>
				<a-form-item
						label='姓名:'
						:labelCol="formItemLayout.labelCol"
						:wrapperCol="formItemLayout.wrapperCol"
				>
					<a-input ref="name" v-model.trim="formData.name" placeholder='请输入姓名'/>
				</a-form-item>
				<a-form-item
						label='身份证号:'
						:labelCol="formItemLayout.labelCol"
						:wrapperCol="formItemLayout.wrapperCol"
				>
					<a-input ref="idCardNo" v-model.trim="formData.idCardNo" placeholder='请输入身份证号'/>
				</a-form-item>
				<a-form-item
						label='手机号:'
						:labelCol="formItemLayout.labelCol"
						:wrapperCol="formItemLayout.wrapperCol"
				>
					<a-input ref="mobile" v-model.trim="formData.phone" placeholder='请输入手机号'/>
				</a-form-item>
				<a-form-item
						:wrapperCol="buttonItemLayout.wrapperCol"
				>
					<a-button type='primary' :loading="iconLoading" @click="login">注册</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>
<style lang="scss">
	@import "./index.scss";
</style>
<script lang="babel" src="./index.js"></script>