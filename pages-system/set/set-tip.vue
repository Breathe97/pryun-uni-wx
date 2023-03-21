<template>
	<view class="pr-page">
		<pr-navbar title="提示" :fixedPerch="true"></pr-navbar>
		<view class="pr-body">
			<pr-card>
				<pr-row-cell title="" value="" :arrow="false" border="none">
					<template v-slot:title>
						<view class="tip-content">
							<view class="tip-content-title">完善个人信息</view>
							<view class="tip-content-text">如果你完成了我们必须的资料，那么在接下来的使用中你会更加顺畅。放心，PR云很注重用户隐私。</view>
						</view>
					</template>
				</pr-row-cell>
				<pr-row-cell title="" value="" :arrow="false" @click="toPage('/pages-system/user/user-details')">
					<template v-slot:title>
						<view style="color: #0097ff;">现在就去</view>
					</template>
				</pr-row-cell>
				<pr-row-cell title="" value="" :arrow="false" @click="back">
					<template v-slot:title>
						<view style="color: #0097ff;">好</view>
					</template>
				</pr-row-cell>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup lang="ts">
	import { toPage } from '@/common'
	import { ref } from 'vue'

	// 返回
	const back = () => {
		uni.navigateBack()
	}
</script>

<style scoped lang="scss">
	.tip-content {
		padding-top: 8px;
		padding-bottom: 8px;

		.tip-content-title {
			line-height: 40px;
			font-weight: bold;
		}

		.tip-content-text {}
	}

	@media (prefers-color-scheme: dark) {
		.tip-content {
			// background-color: rgba(28, 28, 28, 1);
		}
	}
</style>
