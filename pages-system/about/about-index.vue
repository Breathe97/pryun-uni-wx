<template>
	<view class="pr-page">
		<pr-navbar title="关于"></pr-navbar>
		<view style="flex: 1;"></view>
		<view class="pr-body">
			<view style="height: 40px;"></view>
			<view class="logo">
				<image class="logo-image" src="@/pages-system/static/icons/grass.svg" mode=""></image>
			</view>
			<view class="title">PR云社区</view>
			<!-- <view class="lable">一个前端开发者的云社区。</view> -->
			<view class="version">
				<view class="version-text">Version {{ info.version || '0.9.7' }}</view>
				<view v-if="info.envVersion" class="envVersion">{{ info.envVersion }}</view>
			</view>
			<view style="height: 60px;"></view>
			<pr-card>
				<pr-row-cell icon="" title="更新日志" value="" border="bottom" :arrow="true" @click="modalShow = true"></pr-row-cell>
				<button class="button-clear" hover-class="none" open-type="openSetting">
					<pr-row-cell icon="" title="隐私权限" value="" border="bottom" :arrow="true"></pr-row-cell>
				</button>
				<button class="button-clear" hover-class="none" open-type="feedback">
					<pr-row-cell icon="" title="反馈" value="" border="bottom" :arrow="true"></pr-row-cell>
				</button>
				<button class="button-clear" hover-class="none" open-type="contact">
					<pr-row-cell icon="" title="帮助" value="" border="none" :arrow="true"></pr-row-cell>
				</button>
			</pr-card>
		</view>
		<view style="flex: 1;"></view>
		<view class="tip"><text @click="toPage('/pages-auth/privacyAgreement/privacyAgreement-index')">《PR云用户隐私协议》</text></view>
		<view class="tip" style="color: rgba(149, 149, 149, 0.5);">Copyright ◎2022 PR云. All Rights Reserved.</view>
		<view style="height: 20px;"></view>
		<view class="safe-area-inset-bottom"></view>
		<pr-modal v-model="modalShow" :onlyTip="true" text="我们目前并没有开放此功能，你可以稍后再来看看。"></pr-modal>
	</view>
</template>

<script setup lang="ts">
	import { toPage } from '@/common'
	import { ref, computed } from 'vue'
	import type { Ref } from 'vue'

	const modalShow: Ref = ref(false)
	const info: Ref = ref({})
	const init = () => {
		const { miniProgram } = uni.getAccountInfoSync();
		info.value = miniProgram
		// console.log(`------->日志输出info.value:`, info.value);
	}
	init()
</script>

<style scoped lang="scss">
	.pr-body {
		padding: 0 40px;

		.logo {
			width: 100%;
			height: 160px;
			display: flex;
			align-items: center;
			justify-content: center;

			.logo-image {
				width: 120px;
				height: 120px;
			}
		}

		.title {
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.lable {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.version {
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;

			.envVersion {
				margin-left: 10px;
				color: #ffffff;
				padding: 2px 8px;
				border-radius: 6px;
				background-color: #0097ff;
			}
		}
	}

	.tip {
		width: 100%;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: rgba(0, 151, 255, 1);
	}

	@media (prefers-color-scheme: dark) {
		.about {}
	}
</style>
