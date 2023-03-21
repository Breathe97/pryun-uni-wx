<template>
	<view v-if="show">
		<view class="pr-loading" :class="[{ 'pr-loading-show': modelValue }]" @touchmove.stop="()=>{}">
			<view class="pr-loading-mask"></view>
			<view class="pr-loading-content">
				<image class="pr-loading-content-icon" :src="icons.loading" mode=""></image>
				<view class="pr-loading-content-title">{{ title || '请稍后' }}</view>
			</view>
		</view>
	</view>
</template>
<script lang="ts" setup>
	import { icons } from './static/icons.js'
	import { ref, nextTick } from 'vue'

	defineProps({
		// 默认状态
		modelValue: {
			type: [Boolean],
			default: false
		},
		title: {
			type: [String],
			default: '请稍后'
		},
	})

	// 后加载
	const show = ref(false)
	const init = async () => {
		await nextTick()
		show.value = true
	}
	init()
</script>
<style scoped>
	.pr-loading {
		position: fixed;
		left: 0;
		top: 0;
		width: 750rpx;
		height: 100vh;
		z-index: 100;
		opacity: 0;
		pointer-events: none;
		transition: all 230ms ease-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pr-loading-show {
		opacity: 1;
		pointer-events: auto;
	}

	.pr-loading-mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: var(--color-mask, rgba(58, 58, 58, 0.5));
		z-index: 1;
	}

	.pr-loading-content {
		width: 250rpx;
		height: 250rpx;
		max-height: 160px;
		max-width: 160px;
		background-color: var(--color-pr-loading-bg, rgba(255, 255, 255, 0.7));
		border-radius: 12px;
		z-index: 9;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transform: scale(0.7);
		transition: all 230ms cubic-bezier(.41, 1.01, .67, 1.15);
		backdrop-filter: saturate(180%) blur(20px);
	}

	.pr-loading-show .pr-loading-content {
		transform: scale(1);
	}

	.pr-loading-content-icon {
		width: 70rpx;
		height: 70rpx;
		max-height: 50px;
		max-width: 50px;
	}

	.pr-loading-content-title {
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
