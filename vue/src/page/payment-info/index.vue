<template>
	<div class="page payment-info-page">
		<userInfo></userInfo>
		<div class="payment-content">
			<div class="owner-information">
				<p class="room-title">{{paymentInfo.name}}</p>
				<p class="room-content">
					{{paymentInfo.floor}}—{{paymentInfo.unit}}—{{paymentInfo.room}}
				</p>
			</div>
			<div class="payment-list-content">
				<div class="payment-list-title">
					<h1>缴费明细</h1>
					<div class="checkbox-all">
						<a-checkbox
								:indeterminate="indeterminate"
								@change="onCheckAllChange"
								:checked="checkAll"
						>
							全选
						</a-checkbox>
					</div>
				</div>
				<a-checkbox-group class="checkbox-group" v-model="checkedList" @change="onChange">
					<ul>
						<li v-for="(item, index) in paymentInfo.info">
							<a-checkbox class="checkbox-content" :value="item.id">
								<div class="info-content">
									<div>
										<span class="info-title">{{item.name}}:</span>
										<span>{{item.money}}</span>
									</div>
									<div>
										<span class="info-title">日期:</span>
										<span>{{item.date}}</span>
									</div>
								</div>
							</a-checkbox>
						</li>
					</ul>
				</a-checkbox-group>
				<div class="statistics-content">
					<label>合计:</label>
					<span>{{allMoney}}</span>
					<a-button class="oper-btn" type="primary" :loading="iconLoading" @click="pay">
						缴费
					</a-button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	@import "./index.scss";
</style>
<script lang="babel" src="./index.js"></script>