<template>
	<view>
		<view id="pr-icon" class="pr-icon" :style="[Style]">
			<text v-if="Icon_name" class="pr-icon-text" :class="[`pr-icon-${Icon_name}`]" :style="[Style_icon]"></text>
			<image v-else class="pr-icon-image" :style="[Style_icon]" :src="name"></image>
		</view>
	</view>
</template>
<script lang="ts">
	export default {
		options: {
			virtualHost: true //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定

		}
	}
</script>
<script lang="ts" setup>
	import zpIcon from './static/iconfont.json'

	import { computed } from 'vue'

	const props = defineProps({
		// 图标名称
		name: {
			type: [String],
			default: 'home'
		},
		// 图标颜色
		color: {
			type: [String],
			default: '#333333'
		},
		// 背景颜色
		bg: {
			type: [String],
			default: ''
		},
		// 内边距
		padding: {
			type: [String],
			default: ''
		},
		// 圆角
		radius: {
			type: [String],
			default: ''
		},
		// 图标大小 px
		size: {
			type: [String, Number],
			default: '30'
		}
	})

	// 返回字体图标 如果没有检索到当前字体图标则使用image渲染
	const Icon_name = computed(() => {
		let { glyphs = [] } = zpIcon as any
		let isIcon = glyphs.find((item: any) => item.font_class === props.name) || {}
		return isIcon.font_class
	})

	// 整体样式
	const Style = computed(() => {
		let size = Number(props.size) * 2
		let style: any = {
			width: `${size}rpx`,
			height: `${size}rpx`,
			'max-width': `${size * 0.6}px`,
			'max-height': `${size * 0.6}px`,
			'background-color': `${props.bg}`
		}
		if (props.radius) {
			style['border-radius'] = props.radius || '0'
		}
		if (props.bg) {
			style['padding'] = props.padding || '2px'
		}
		// console.log(`------->日志输出style:`, style);
		return style
	})
	// 动态生成图标的样式
	const Style_icon = computed(() => {
		let style = {
			'font-size': `${Number(props.size) * 0.8}px`,
			color: props.color
		}
		return style
	})
</script>

<style scoped>
	@import url('static/iconfont.css');

	.pr-icon {
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 230ms ease;
	}

	.pr-icon-text {
		font-family: prIcon;
		text-decoration: none;
		text-align: center;
		font-style: normal;
		transition: all 230ms ease;
	}

	.pr-icon-image {
		width: 100%;
		height: 100%;
	}

	.pr-icon-text:active {
		opacity: 0.5;
	}
</style>
