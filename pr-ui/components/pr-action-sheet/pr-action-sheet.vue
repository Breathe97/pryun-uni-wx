<template>
	<view>
		<view class="pr-action-sheet" :class="[{ 'pr-action-sheet-show':modelValue }]" @touchmove.stop="()=>{}" @click.stop="emit('update:modelValue', false)">
			<view class="pr-action-sheet-content" :class="[{ 'pr-action-sheet-content-show':modelValue }]">
				<view class="pr-action-sheet-content-card">
					<view v-if="tip" class="pr-action-sheet-content-item pr-action-sheet-content-item-tip">{{ tip }}</view>
					<template v-for="(item,index) in options" :key="index">
						<view v-if="index!==0 || tip" class="pr-action-sheet-content-border"></view>
						<view class="pr-action-sheet-content-item" :style="[item.style]" hover-class="hover-class" hover-stay-time="100" @click="click(index)">{{ item.text }}</view>
					</template>
				</view>
				<view style="height: 8px;"></view>
				<view class="pr-action-sheet-content-card pr-action-sheet-content-card-close">
					<view class="pr-action-sheet-content-item" hover-class="hover-class" hover-stay-time="100" @click="emit('update:modelValue', false)">取消</view>
				</view>
				<view style="min-height: 8px;">
					<!-- 底部安全距离占位 -->
					<view class="safe-area-inset-bottom"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, nextTick } from 'vue'
	const emit = defineEmits(['update:modelValue', 'click'])

	defineProps({
		// 默认状态
		modelValue: {
			type: [Boolean],
			default: false
		},
		// 说明
		tip: {
			type: [String],
			default: ''
		},
		// 选项
		options: {
			type: [Array],
			default: [
				{ text: '拍摄', style: { color: '#0097ff', 'font-weight': 'bold' } },
				{ text: '从相册选择', style: { color: '#0097ff' } },
				{ text: '忽略设备', style: { color: '#D45B52' } },
			]
		}
	})

	// 后加载
	const show = ref(false)
	const init = async () => {
		await nextTick()
		show.value = true
	}
	init()

	const click = (index) => {
		emit('update:modelValue', false)
		emit('click', index)
	}
</script>

<style scoped>
	.pr-action-sheet {
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: var(--color-mask, rgba(58, 58, 58, 0.5));
		pointer-events: none;
		opacity: 0;
		z-index: 100;
		transition: all 230ms ease-out;
	}

	.pr-action-sheet-show {
		opacity: 1;
		pointer-events: all;
	}

	.pr-action-sheet-content {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 0;
		padding: 0 8px;
		box-sizing: border-box;
		width: 100%;
		max-width: 800px;
		transform: translateY(100%);
		transition: all 230ms ease-out;
	}

	.pr-action-sheet-content-show {
		transform: translateY(0);
	}

	.pr-action-sheet-content-card {
		border-radius: 12px;
		overflow: hidden;
		background-color: var(--color-pr-action-sheet-bg, rgba(255, 255, 255, 0.8));
		backdrop-filter: saturate(180%) blur(20px);
		transition: all 230ms ease-out;
		display: flex;
		flex-direction: column;
	}

	.pr-action-sheet-content-border {
		height: 1px;
		transform: scaleY(0.5);
		background-color: var(--color-pr-action-sheet-active, rgba(130, 130, 130, 0.3));
		transition: all 230ms ease-out;
	}

	.pr-action-sheet-content-card-close {
		background-color: var(--color-pr-action-sheet-bg-close, rgba(255, 255, 255, 0.9));
		font-weight: bold;
	}

	.pr-action-sheet-content-item {
		position: relative;
		padding: 12px 16px;
		box-sizing: border-box;
		width: 100%;
		min-height: 50px;
		letter-spacing: 1px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: var(--color-blue, rgba(0, 151, 255, 1.0));
	}

	.pr-action-sheet-content-item-tip {
		font-size: 12px;
		line-height: 20px;
		color: var(--color-gray, rgba(142, 142, 147, 1.0));
		text-align: center;
	}

	.hover-class {
		background-color: var(--color-pr-action-sheet-active, rgba(130, 130, 130, 0.3));
		z-index: 9;
		transition: all 230ms ease-out;
	}

	.safe-area-inset-bottom {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
