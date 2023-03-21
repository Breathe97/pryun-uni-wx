<template>
	<view class="navbar-left">
		<view class="navbar-avatar" :class="[{ 'navbar-avatar-hide':moreInfoShow }]" @click.stop="toPage('/pages-system/set/set-index')">
			<image class="navbar-avatar-image" :src="userInfo.avatar || avatar_null" @error="userInfo.avatar = avatar_null" mode="heightFix">
			</image>
		</view>
		<view class="navbar-moreInfo" :class="[{ 'navbar-moreInfo-show':moreInfoShow }]">
			<text class="navbar-moreInfo-nickname">{{ userInfo.nickname || '游客' }}</text>
			<text> ，{{ DayString }}</text>
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
	import avatar_null from '@/static/img/avatar_null.png'
	import { toPage } from '@/common'
	import { ref, computed } from 'vue'

	const props = defineProps({
		// 显示头像
		moreInfoShow: {
			type: [Boolean],
			default: false
		},
		// 用户信息
		userInfo: {
			type: [Object],
			default: {}
		},
	})

	const now = ref(0) // 当前时间
	const init = async () => {
		now.value = new Date().getTime()
		setInterval(() => {
			now.value = new Date().getTime()
		}, 1000)
	}
	init()
	// 计算当前时间的状态  凌晨 早上 中午 下午 晚上
	const DayString = computed(() => {
		let h = new Date(now.value).getHours()
		let str = ''
		if ([0, 1, 2, 3, 4, 5].includes(h)) {
			str = '夜深了~'
		}
		if ([6, 7, 8, 9].includes(h)) {
			str = '早上好~'
		}
		if ([10, 11].includes(h)) {
			str = '上午好~'
		}
		if ([12].includes(h)) {
			str = '中午好~'
		}
		if ([13, 14, 15, 16, 17, 18, 19].includes(h)) {
			str = '下午好~'
		}
		if ([20, 21, 22, 23].includes(h)) {
			str = '晚上好~'
		}
		return str
	})
</script>

<style scoped lang="scss">
	.navbar-left {
		position: relative;
		height: 100%;

		.navbar-avatar {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			opacity: 1;
			z-index: 2;
			transition: all 230ms ease-out;

			.navbar-avatar-image {
				width: 100%;
				min-width: 32px;
				height: 100%;
				border-radius: 50%;
				overflow: hidden;
				background-color: #ffffff;
			}
		}

		.navbar-avatar-hide {
			opacity: 0;
			pointer-events: none;
		}

		.navbar-moreInfo {
			width: 100%;
			height: 100%;
			font-size: 15px;
			display: flex;
			align-items: center;
			transition: all 230ms ease-out;
			opacity: 0;
			z-index: 1;
			color: #000000;

			.navbar-moreInfo-nickname {
				max-width: 50%;
				color: #0097FF;
				font-weight: bold;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

		}

		.navbar-moreInfo-show {
			opacity: 1;
		}
	}

	@media (prefers-color-scheme: dark) {
		.navbar-left {
			.navbar-moreInfo {
				color: #ffffff;
			}
		}
	}
</style>
