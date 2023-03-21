<template>
	<view>
		<view class="pr-verification-code" @click="start">{{ Text }}</view>
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
	import { ref, computed, onBeforeUnmount } from 'vue'
	const emit = defineEmits(['update:modelValue'])
	const props = defineProps({
		// 默认状态
		modelValue: {
			type: [Boolean],
			default: true
		},
		// 唯一标识
		key: {
			type: [String],
			default: 'pr-verification-code'
		},
		text: {
			type: [String],
			default: '获取验证码'
		},
		contentText: {
			type: [String],
			default: '重新获取$s'
		},
		endText: {
			type: [String],
			default: '再次获取'
		},
		// 获取验证码执行的方法
		getCode: {
			type: [Function],
			default: () => {}
		},
		// 间隔时间
		interval: {
			type: [Number, String],
			default: 60
		},
		// 自定义样式
		customStyle: {
			type: [Object],
			default: {}
		}
	})

	const time = ref(-1)
	let timer = 0
	const setTimer = (interval) => {
		if (interval <= 0) return
		emit('update:modelValue', false)
		time.value = interval

		timer = setInterval(() => {
			time.value -= 1
			// console.log(`------->日志输出time.value:`, time.value);
			if (time.value === 0) {
				emit('update:modelValue', true)
				return clearInterval(timer)
			}
		}, 1000)
		let end_time = new Date().getTime() + 1000 * time.value
		uni.setStorageSync(`pr-verification-code-${props['key']}`, end_time) // 保存结束时间戳到本地
	}

	onBeforeUnmount(() => {
		timer && clearInterval(timer)
	})

	// 获取验证码
	const start = async () => {
		if (time.value > 0) return
		try {
			const getCode = props['getCode']
			await getCode()
		} catch (e) {
			emit('update:modelValue', true)
			return
		}
		setTimer(props['interval'])
	}

	const init = async () => {
		// 获取code
		let end_time = uni.getStorageSync(`pr-verification-code-${props['key']}`)
		if (end_time) {
			let now = new Date().getTime()
			let _time = parseInt((end_time - now) / 1000)
			_time = Math.max(-1, _time)
			setTimer(_time)
		}
	}
	init()

	const Text = computed(() => {
		let str = props['text']
		if (time.value > 0) {
			str = props['contentText']
		}
		if (time.value === 0) {
			str = props['endText']
		}
		str = str.replace('$', time.value)
		return str
	})
</script>
<style scoped>

</style>
