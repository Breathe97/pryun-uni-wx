<template>
	<view>
		<view class="pr-row-cell" :hover-class="hover?'hover-class':''" hover-stay-time="100" :customStyle="[customStyle]" @click="click" @touchstart="touchstart" @touchend="touchend">
			<view class="pr-row-cell-height"></view>
			<view v-if="$slots['icon'] || icon" class="pr-row-cell-icon">
				<slot name="icon"></slot>
			</view>
			<view v-else-if="icon" class="pr-row-cell-icon">
				<image class="pr-row-cell-icon-image dark-filter-invert" :src="icon" mode="aspectFill"></image>
			</view>
			<slot v-else name="icon"></slot>
			<view class="pr-row-cell-content">
				<view v-if="border==='top'" class="pr-row-cell-content-border pr-row-cell-content-border-top"></view>
				<view v-if="border==='bottom'" class="pr-row-cell-content-border pr-row-cell-content-border-bottom"></view>
				<template v-show="$slots['default']">
					<slot></slot>
				</template>
				<view class="pr-row-cell-title" :class="[{'pr-row-cell-slot':$slots['title']}]">
					<template v-if="$slots['title']">
						<slot name="title"></slot>
					</template>
					<template v-else-if="title">
						<view class="pr-row-cell-title-text">{{ title }}</view>
					</template>
					<template v-else>
						<slot name="title"></slot>
					</template>
				</view>
				<view class="pr-row-cell-value" :class="[{'pr-row-cell-slot':$slots['value']}]">
					<template v-if="$slots['value']">
						<slot name="value"></slot>
					</template>
					<template v-else-if="value">
						<text class="pr-row-cell-value-text">{{ value }}</text>
					</template>
					<template v-else>
						<slot name="value"></slot>
					</template>
				</view>
				<template v-if="arrow">
					<image class="pr-row-cell-arrow-right dark-filter-invert" :src="icons['arrow-right']"></image>
				</template>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
	export default {
		options: {
			virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
		}
	}
</script>
<script setup lang="ts">
	import { icons } from './static/icons.js'
	const emit = defineEmits(['click'])
	const props = defineProps({
		// 图标
		icon: {
			type: [String],
			default: ''
		},
		// 标题
		title: {
			type: [String, Number],
			default: '标题'
		},
		// 内容
		value: {
			type: [String, Number],
			default: ''
		},
		// 按压反馈
		hover: {
			type: [Boolean],
			default: true
		},
		// 按压复制
		touchCopy: {
			type: [Boolean],
			default: false
		},
		// 自定义复制内容
		customCopyValue: {
			type: [String],
			default: ''
		},
		// 边框 top bottom none
		border: {
			type: [String],
			default: 'top'
		},
		// 右边箭头
		arrow: {
			type: [Boolean],
			default: true
		},
		// 自定义样式
		customStyle: {
			type: [Object],
			default: {}
		},
	})

	// 按下
	let timer = 0
	const touchstart = () => {
		if (!props['touchCopy']) return
		timer = setTimeout(() => {
			// 设置剪切板内容
			uni.setClipboardData({
				data: props['customCopyValue'] || `${props['value']}` || `${props['title']}`,
				success: function() {
					uni.vibrateShort({});
					uni.showToast({ title: '已复制内容', icon: 'none' })
				}
			});
		}, 1000)
	}

	// 松开
	const touchend = () => {
		timer && clearTimeout(timer)
	}

	// 点击
	const click = () => {
		emit('click')
	}
</script>
<style scoped>
	.pr-row-cell {
		position: relative;
		padding-left: 16px;
		padding-top: 7px;
		padding-bottom: 7px;
		box-sizing: border-box;
		width: 100%;
		min-height: 44px;
		background-color: var(--color-pr-row-cell-bg, rgba(255, 255, 255, 1.0));
		transition: all 230ms ease-out;
		display: flex;
		align-items: stretch;
	}

	.pr-row-cell-height {
		height: 60rpx;
		max-height: 36px;
	}

	.pr-row-cell-icon {
		margin-right: 16px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
	}

	.pr-row-cell-icon-image {
		width: 60rpx;
		height: 60rpx;
		max-width: 36px;
		max-height: 36px;
		transition: all 230ms ease-out;
	}

	.pr-row-cell-content {
		position: relative;
		padding-right: 16px;
		box-sizing: border-box;
		width: 0;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.pr-row-cell-slot {
		height: auto;
		max-height: none;
	}

	.pr-row-cell-content-border {
		position: absolute;
		left: 0;
		width: 100%;
		height: 1px;
		transform: scaleY(0.5);
		background-color: var(--color-pr-row-cell-active, rgba(229, 229, 234, 1.0));
		z-index: 1;
		transition: all 230ms ease-out;
	}

	.pr-row-cell-content-border-top {
		top: -8px;
	}

	.pr-row-cell-content-border-bottom {
		bottom: -8px;
	}

	.pr-row-cell-title {
		width: fit-content;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	.pr-row-cell-title-text {
		box-sizing: border-box;
		padding: 6px 0;
		line-height: 1;
		word-break: break-all;
	}

	.pr-row-cell-value {
		flex: 1;
		color: rgba(142, 142, 147, 1.0);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		overflow: hidden;
		word-break: break-all;
	}

	.pr-row-cell-value-text {
		margin-left: 10px;
		padding: 6px 0;
		box-sizing: border-box;
		line-height: 1;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.pr-row-cell-arrow-right {
		margin-left: 10px;
		flex-shrink: 0;
		width: 14px;
		height: 14px;
		opacity: 0.5;
	}

	.hover-class {
		background-color: var(--color-pr-row-cell-active, rgba(229, 229, 234, 1.0));
		box-shadow: 0 0 1px 1px var(--color-pr-row-cell-active, rgba(229, 229, 234, 1.0));
		z-index: 9;
	}
</style>
