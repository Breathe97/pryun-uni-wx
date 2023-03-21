<template>
	<view @touchmove.stop="() => {}">
		<view class="pr-tabbar " :class="[{ 'backdrop-filter': blurEffect }]" :style="[Style, customStyle]">
			<view class="pr-tabbar-content" :class="[{ 'auto-theme': autoTheme }]" :style="[Style_content]">
				<template v-show="$slots['default']">
					<slot></slot>
				</template>
				<view v-if="!$slots['default']" class="content-item" hover-class="hover-class" hover-stay-time="100" v-for="(item, index) in list" :key="index" @click="selectClick(item, index)">
					<view class="content-item-icon" :style="[Style_icon_size]">
						<image class="content-item-icon-image" :style="[Style_icon(index, 'default')]" :src="item.icon" mode="aspectFit"></image>
						<image class="content-item-icon-image" :style="[Style_icon(index, 'active')]" :src="item.selectedIcon" mode="aspectFit"></image>
					</view>
					<view class="content-item-text" :style="[Style_text(index, item)]">{{ item.text }}</view>
				</view>
			</view>
			<!-- 底部安全距离占位 -->
			<view class="safe-area-inset-bottom"></view>
		</view>
		<view class="pr-tabbar-span" :class="[{ 'pr-tabbar-span-show': fixedPerch }]">
			<!-- 中间占位 -->
			<view :style="[Style_content]"></view>
			<!-- 底部安全距离占位 -->
			<view class="safe-area-inset-bottom"></view>
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
import { ref, computed } from 'vue'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
	// 默认状态
	modelValue: {
		type: [Number],
		default: 0
	},
	// 选项卡集合
	list: {
		type: [Array],
		default: [{ icon: '', selectedIcon: '', text: '', color: '', selectedColor: '' }]
	},
	// 自动主题
	autoTheme: {
		type: [Boolean],
		default: true
	},
	// 自定义样式
	customStyle: {
		type: [Object],
		default: {}
	},
	// 添加fixed的文本流占位
	fixedPerch: {
		type: [Boolean],
		default: true // 默认占用
	},
	// 高斯模糊
	blurEffect: {
		type: [Boolean],
		default: () => {
			return true
		}
	},
	// 默认高度
	height: {
		type: [String, Number],
		default: 60
	}
})
// 初始化
let options = ref({})
const init = async () => {
	// 首次获取保留
	if (!uni['$pr-tabbar']) {
		const { fontSizeSetting = 16 } = uni.getSystemInfoSync()
		uni['$pr-tabbar'] = { fontSize: fontSizeSetting }
	}
	options.value = uni['$pr-tabbar']
}
init()

// 选择菜单
const selectClick = (item: any, index: number) => {
	emit('update:modelValue', index)
	item.path && uni.switchTab({ url: item.path })
}

// 整体样式
const Style = computed(() => {
	let style = {}
	return style
})

// 中间高度
const Style_content = computed(() => {
	const { fontSize = 16 } = options.value
	let height = props.height * (fontSize / 16)
	let style = { height: `${height}px` }
	return style
})

// 图标选中样式
const Style_icon = computed(() => {
	return function(index, mode = 'default') {
		let style = { opacity: 0, transform: 'scale(0)' }
		if (mode === 'default' && index !== props.modelValue) {
			style['opacity'] = 1
			style['transform'] = 'scale(1)'
		}
		if (mode === 'active' && index === props.modelValue) {
			style['opacity'] = 1
			style['transform'] = 'scale(1)'
		}
		return style
	}
})

// 图标大小
const Style_icon_size = computed(() => {
	let style = {}
	let size = 24 * (options.value.fontSize / 16)
	style['width'] = `${size}px`
	style['height'] = `${size}px`
	return style
})

// 文字样式
const Style_text = computed(() => {
	return function(index: number, item = {}) {
		const { color = '#333333', selectedColor = '#d81e06' } = item
		let style = { color: color }
		if (index === props.modelValue) {
			style['color'] = item.selectedColor
		}
		// 字体大小
		let size = 12 * (options.value.fontSize / 16)
		style['font-size'] = `${size}px`
		return style
	}
})
</script>
<style scoped>
.pr-tabbar {
	position: fixed;
	left: 0;
	right: 0;
	margin: auto;
	bottom: 0;
	width: 100%;
	max-width: 800px;
	z-index: 99;
	/* overflow: hidden; */
	background-color: var(--color-pr-tabbar-bg, rgba(242, 241, 246, 0.5));
	transition: background-color 230ms ease-out;
}

.pr-tabbar-span {
	max-height: 0;
	transition: all 230ms ease-out;
}

.pr-tabbar-span-show {
	max-height: 200px;
}

.pr-tabbar-content {
	display: flex;
	justify-content: center;
	transition: all 230ms ease-out;
}

.content-item {
	box-sizing: border-box;
	flex: 1;
	min-width: 20%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transition: all 230ms ease-out;
}

.content-item-icon {
	position: relative;
	height: 24px;
	width: 24px;
}

.content-item-icon-image {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	opacity: 1;
	transition: all 230ms ease-out;
}

.content-item-text {
	font-size: 12px;
	color: #666666;
}

.hover-class {
	transform: scale(0.9);
}

.backdrop-filter {
	backdrop-filter: saturate(180%) blur(20px);
}

.safe-area-inset-bottom {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}

@media (prefers-color-scheme: dark) {
	.auto-theme .content-item {
		filter: invert(1) hue-rotate(180deg);
	}
}
</style>
