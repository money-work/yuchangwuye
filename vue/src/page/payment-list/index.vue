<template>
	<div class="page payment-list-page">
		<userInfo></userInfo>
		<div class="payment-list-content">
			<div class="owner-information">我的房产</div>
			<div class="payment-list-collapse ">
				<template v-if="paymentList.length > 0">
					<a-collapse defaultActiveKey="1" accordion :bordered="false" style="background-color: #f2f5f8;">
						<template v-for="(item, index) in paymentList">
							<a-collapse-panel :header="item.name" :key="index" :disabled='false'>
								<p v-for="(room, key) in item.homes"  @click="showPaymentInfo(item)">
									{{room.floor}}{{room.unit}}{{room.room}}
								</p>
							</a-collapse-panel>
						</template>
					</a-collapse>
				</template>
			</div>
		</div>
		<footerComponent></footerComponent>
	</div>
</template>
<style scoped lang="scss">
	@import "./index.scss";
</style>
<script lang="babel" src="./index.js"></script>