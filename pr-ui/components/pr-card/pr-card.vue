<template>
	<view class="pr-card">
		<slot v-if="$slots['title']" name="title"></slot>
		<view v-else-if="!$slots['title']" class="pr-card-title">
			<view v-if="title" class="pr-card-title-text">{{ title }}</view>
		</view>
		<slot v-else name="title"></slot>
		<view class="pr-card-content">
			<slot></slot>
		</view>
		<slot v-if="$slots['tip']" name="tip"></slot>
		<view v-else-if="!$slots['tip']" class="pr-card-tip">
			<view v-if="tip" class="pr-card-tip-text">{{ tip }}</view>
		</view>
		<slot v-else name="tip"></slot>
	</view>
</template>

<script lang="ts">
	export default {
		options: {
			virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
		}
	}
</script>

<script lang="ts" setup>
	const emit = defineEmits(['click'])
	defineProps({
		// 图标
		icon: {
			type: [String],
			default: ''
		},
		// 标题
		title: {
			type: [String],
			default: ''
		},
		// 提示
		tip: {
			type: [String],
			default: ''
		},
		// 自定义样式
		customStyle: {
			type: [Object],
			default: {}
		},
	})
</script>
<style scoped>
	.pr-card {
		position: relative;
	}

	.pr-card-title {
		padding: 0 16px;
		padding-top: 16px;
		box-sizing: border-box;
		min-height: 32px;
		color: var(--color-gray, rgba(142, 142, 147, 1.0));
	}

	.pr-card-title-text {
		padding-top: 8px;
		padding-bottom: 8px;
		box-sizing: border-box;
		min-height: 32px;
		line-height: 16px;
		font-size: 12px;
	}

	.pr-card-content {
		border-radius: 12px;
		overflow: hidden;
	}

	.pr-card-tip {
		padding: 0 16px;
		box-sizing: border-box;
		color: var(--color-gray, rgba(142, 142, 147, 1.0));
	}

	.pr-card-tip-text {
		padding-top: 8px;
		padding-bottom: 8px;
		box-sizing: border-box;
		min-height: 32px;
		line-height: 16px;
		font-size: 12px;
	}
</style>
