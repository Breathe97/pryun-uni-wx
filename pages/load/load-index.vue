<template>
	<view class="pr-page load" :class="[{ 'load-show': visiable }]">
		<pr-navbar :isBack="false" title="" :fixed="true" :fixedPerch="false" :blurEffect="false" :customStyle="{ 'background-color': 'rgba(0, 122, 255, 0)' }"></pr-navbar>
		<view class="load-top">
			<view class="load-top-logo">
				<image class="load-top-logo-image" src="@/static/icons/logo.svg" mode=""></image>
			</view>
			<view class="load-top-image" :style="[{ 'background-image': `url(${imgs['wave']})` }]"></view>
		</view>
		<view class="load-bottom safe-area-inset-bottom">
			<view>
				<view class="title">PR云</view>
				<view class="describe">一个前端开发者的云社区。</view>
			</view>
			<view class="join" @click="login">
				<view class="join-btn">立即加入</view>
			</view>
			<image class="blob-haikei" :src="imgs['blob-haikei']" mode="widthFix"></image>
		</view>
		<pr-loading v-model="loadingShow" title="请稍后"></pr-loading>
	</view>
</template>

<script setup lang="ts">
	import md5 from '@/tools/md5'
	import { Store } from '@/store'
	import { nextTick, ref } from 'vue'
	const store = Store()
	const props = defineProps({
		// 0不显示欢迎页 1直接显示欢迎页
		mode: {
			type: [String],
			default: '0'
		}
	})

	md5() // 解决主包代码提示检查

	const imgs = {
		wave: 'data:image/svg+xml;base64,PHN2ZyBpZD0idmlzdWFsIiB2aWV3Qm94PSIwIDAgNzUwIDMwMCIgd2lkdGg9Ijc1MCIgaGVpZ2h0PSIzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSI+PHBhdGggZD0iTTAgMTMxTDkuNyAxMjUuOEMxOS4zIDEyMC43IDM4LjcgMTEwLjMgNTcuOCAxMTJDNzcgMTEzLjcgOTYgMTI3LjMgMTE1LjIgMTQyLjNDMTM0LjMgMTU3LjMgMTUzLjcgMTczLjcgMTczIDE3OUMxOTIuMyAxODQuMyAyMTEuNyAxNzguNyAyMzAuOCAxNzRDMjUwIDE2OS4zIDI2OSAxNjUuNyAyODguMiAxNjguM0MzMDcuMyAxNzEgMzI2LjcgMTgwIDM0NiAxODQuMkMzNjUuMyAxODguMyAzODQuNyAxODcuNyA0MDQgMTk4LjNDNDIzLjMgMjA5IDQ0Mi43IDIzMSA0NjEuOCAyNDIuM0M0ODEgMjUzLjcgNTAwIDI1NC4zIDUxOS4yIDI1MUM1MzguMyAyNDcuNyA1NTcuNyAyNDAuMyA1NzcgMjM0QzU5Ni4zIDIyNy43IDYxNS43IDIyMi4zIDYzNC44IDIxMkM2NTQgMjAxLjcgNjczIDE4Ni4zIDY5Mi4yIDE3MUM3MTEuMyAxNTUuNyA3MzAuNyAxNDAuMyA3NDAuMyAxMzIuN0w3NTAgMTI1TDc1MCAzMDFMNzQwLjMgMzAxQzczMC43IDMwMSA3MTEuMyAzMDEgNjkyLjIgMzAxQzY3MyAzMDEgNjU0IDMwMSA2MzQuOCAzMDFDNjE1LjcgMzAxIDU5Ni4zIDMwMSA1NzcgMzAxQzU1Ny43IDMwMSA1MzguMyAzMDEgNTE5LjIgMzAxQzUwMCAzMDEgNDgxIDMwMSA0NjEuOCAzMDFDNDQyLjcgMzAxIDQyMy4zIDMwMSA0MDQgMzAxQzM4NC43IDMwMSAzNjUuMyAzMDEgMzQ2IDMwMUMzMjYuNyAzMDEgMzA3LjMgMzAxIDI4OC4yIDMwMUMyNjkgMzAxIDI1MCAzMDEgMjMwLjggMzAxQzIxMS43IDMwMSAxOTIuMyAzMDEgMTczIDMwMUMxNTMuNyAzMDEgMTM0LjMgMzAxIDExNS4yIDMwMUM5NiAzMDEgNzcgMzAxIDU3LjggMzAxQzM4LjcgMzAxIDE5LjMgMzAxIDkuNyAzMDFMMCAzMDFaIiBmaWxsPSIjZmZmZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjwvcGF0aD48L3N2Zz4=',
		'blob-haikei': 'data:image/svg+xml;base64,PHN2ZyBpZD0idmlzdWFsIiB2aWV3Qm94PSIwIDAgOTAwIDkwMCIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI5MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDY0Ljg5MjE4OTY4Njg5NjUzIDQ1MS4wOTIzOTMzNTY5MTA3KSI+PHBhdGggZD0iTTE4NS4yIC0xMjQuN0MyMjIuOSAtMTAwLjQgMjI0LjUgLTI0LjQgMjAxIDMyLjZDMTc3LjQgODkuNyAxMjguNiAxMjcuNyA4NC44IDEzMS44QzQxIDEzNS45IDIuMiAxMDUuOSAtNjUuOSA5MC44Qy0xMzQuMSA3NS43IC0yMzEuNiA3NS40IC0yNDQuNyA0Ny40Qy0yNTcuOSAxOS4zIC0xODYuOCAtMzYuNSAtMTMyIC02NC43Qy03Ny4xIC05Mi45IC0zOC42IC05My40IDE3LjYgLTEwNy41QzczLjggLTEyMS41IDE0Ny41IC0xNDkgMTg1LjIgLTEyNC43IiBmaWxsPSIjMDA5N2ZmIj48L3BhdGg+PC9nPjwvc3ZnPg=='
	}

	// 登录
	const loadingShow = ref(false)
	const login = () => {
		uni.navigateTo({ url: '/pages-auth/login/login-index' })
		uni.$once('$login', async () => {
			loadingShow.value = true
			await new Promise(a => setTimeout(() => a(true), 1000))
			uni.redirectTo({ url: '/pages/home/home-index' })
			loadingShow.value = false
		})
	}

	// 初始化
	const visiable = ref(false)
	const show_mode = ref('0')
	const init = async () => {
		if (props['mode'] === '1') {
			show_mode.value = '1'
		} else {
			// 获取用户信息
			try {
				await store.usersGetInfo()
				uni.redirectTo({ url: '/pages/home/home-index' })
			} catch (e) {
				show_mode.value = '1'
			}
		}
		await nextTick()
		await new Promise(a => setTimeout(() => a(true), 300))
		visiable.value = true
	}
	init()
</script>

<style lang="scss" scoped>
	.load {
		height: 100vh;
		opacity: 0;
		visibility: hidden;
		width: 0;

		.load-top {
			position: relative;
			box-sizing: border-box;
			width: 100%;
			flex: 1;
			background-color: #0097ff;
			display: flex;
			align-items: center;
			justify-content: center;

			.load-top-logo {
				border-radius: 12px;
				box-sizing: border-box;
				width: 160rpx;
				height: 160rpx;
				max-width: 120px;
				max-height: 120px;
				z-index: 9;

				.load-top-logo-image {
					width: 100%;
					height: 100%;
				}
			}

			.load-top-image {
				position: absolute;
				bottom: -4px;
				width: 100%;
				height: 50%;
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position: center bottom;
			}
		}

		.load-bottom {
			padding: 40px 0;
			box-sizing: border-box;
			width: 100%;
			height: 50%;
			background-color: #ffffff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				box-sizing: border-box;
				width: 100%;
				font-size: 32px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #000000;
			}

			.describe {
				box-sizing: border-box;
				font-size: 16px;
				color: #666666;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.join {
				margin-top: 60px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;

				.join-btn {
					padding: 0 20px;
					box-sizing: border-box;
					width: fit-content;
					border-radius: 12px;
					height: 44px;
					// max-height: 80px;
					font-size: 16px;
					background-color: #0097ff;
					color: #ffffff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.blob-haikei {
				position: absolute;
				right: 20rpx;
				bottom: 20rpx;
				width: 100px;
			}
		}
	}

	.load-show {
		opacity: 1;
		visibility: visible;
		width: auto;
	}

	@media (prefers-color-scheme: dark) {
		.load {
			.scroll {
				background-image: linear-gradient(to bottom, #3f3f3f, #191919);
			}

			.load-top-bg {
				filter: invert(0.9) hue-rotate(180deg);
			}

			.load-top {
				background-color: #3f3f3f;

				.load-top-logo {
					// filter: invert(0.1) hue-rotate(180deg);
				}

				.load-top-image {
					filter: invert(0.9) hue-rotate(180deg);
				}
			}

			.load-bottom {
				// filter: grayscale(100%);
				background-color: #191919;

				.title {
					color: #ffffff;
				}
			}
		}
	}
</style>
