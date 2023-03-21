<template>
	<view class="pr-input">
		<template v-if="type === 'textarea'">
			<textarea class="pr-input-content" style="height: 90px;padding-bottom: 10px;" :disable-default-padding="true" :value="input_val" :show-confirm-bar="false" :maxlength="maxlength" :pattern="pattern" confirm-type="done" placeholder="" :hold-keyboard="holdKeyboard" :focus="focus" @input="input" @confirm="confirm"></textarea>
			<text v-if="!input_val" class="textarea-placeholder">{{ placeholder }}</text>
			<view v-if="type === 'textarea'" class="pr-input-length">
				<view>
					<text>{{ input_val.length }}</text>
					<text>/{{ maxlength }}</text>
				</view>
			</view>
		</template>
		<template v-else-if="type">
			<input class="pr-input-content" :value="input_val" :type="type" :maxlength="maxlength" :pattern="pattern" :placeholder="placeholder" :hold-keyboard="holdKeyboard" :focus="focus" @input="input" @confirm="confirm" />
			<view class="pr-input-clear" :class="[{ 'pr-input-clear-show': input_val }]" @click="clear">
				<view class="pr-input-clear-icon"><image class="pr-input-clear-icon-image" :src="icons['cross']" mode=""></image></view>
			</view>
		</template>
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
import { icons } from './static/icons.js'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits(['update:modelValue', 'confirm'])

const props = defineProps({
	// 默认状态
	modelValue: {
		required:true,
		type: [String],
		default: ''
	},
	// 聚焦时，点击页面的时候不收起键盘
	holdKeyboard: {
		type: [Boolean],
		default: false
	},
	// 聚焦
	focus: {
		type: [Boolean],
		default: false
	},
	// 最大输入长度
	maxlength: {
		type: [Number],
		default: 200
	},
	// 输入框为空时占位符
	placeholder: {
		type: [String],
		default: '请输入内容'
	},
	// input 的类型
	type: {
		type: [String],
		default: ''
	},
	// 规则
	pattern: {
		type: [String, Array],
		default: ''
	},
})

const input_val: Ref = ref('')
input_val.value = props['modelValue']

// 清除
const clear = () => {
	emit('update:modelValue', '')
}

// 修改外层v-model的值
const input = (e: any) => {
	const maxlength = props['maxlength']
	let val = e.detail.value
	if (val.length >= maxlength) {
		val = val.slice(0, maxlength)
	}
	emit('update:modelValue', val)
}

// 完成
const confirm = () => {
	emit('confirm', input_val.value)
}

watch(() => props['modelValue'], (a) => {
	input_val.value = a
})
</script>

<style scoped>
.pr-input {
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
}

.pr-input-content {
	position: relative;
	flex: 1;
	word-wrap: break-all;
}

.textarea-placeholder {
	position: absolute;
	top: 0;
	line-height: 1;
}

.pr-input-clear {
	padding-left: 8px;
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 230ms ease;
}

.pr-input-clear-show {
	opacity: 1;
}

.pr-input-length {
	position: absolute;
	bottom: 0;
	right: 0;
	height: 20px;
	font-size: 10px;
	color: var(--color-gray, rgba(142, 142, 147, 1));
	width: fit-content;
	display: flex;
	justify-content: flex-end;
}

.pr-input-clear-icon {
	box-sizing: border-box;
	width: 14px;
	height: 14px;
	border-radius: 50%;
	background-color: var(--color-gray, rgba(142, 142, 147, 1));
	display: flex;
	align-items: center;
	justify-content: center;
	line-height: 1;
	transition: all 230ms ease-out;
}

.pr-input-clear-icon-image {
	width: 10px;
	height: 10px;
	transition: all 230ms ease-out;
	transform: scale(0.8);
	filter: var(--color-reverse);
}
</style>
