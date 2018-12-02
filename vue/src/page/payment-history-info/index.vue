<template>
	<div class="page payment-history-info-page">
		<userInfo></userInfo>
		<div class="payment-content">
			<div class="owner-information">
				<p class="room-title">{{paymentHistoryInfo.name}}</p>
				<p class="room-content">
					{{paymentHistoryInfo.floor}}—{{paymentHistoryInfo.unit}}—{{paymentHistoryInfo.room}}
				</p>
			</div>
			<div class="payment-list-content">
				<h1>缴费明细</h1>
				<ul>
					<li v-for="(item, index) in paymentHistoryInfo.info">
						<div>
							<span class="info-title">{{item.name}}:</span>
							<span>{{item.money}}</span>
						</div>
						<div>
							<span class="info-title">日期:</span>
							<span>{{item.date}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	@import "./index.scss";
</style>
<script lang="babel" src="./index.js"></script>