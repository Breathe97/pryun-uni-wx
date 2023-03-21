<template>
	<view class="pr-page dynamic">
		<view class="dynamic-top">
			<pr-navbar :title="navbarOptions.title" :fixed="moreInfoShow" :fixedPerch="false" :theme="navbarOptions.theme" :blurEffect="navbarOptions.blurEffect"
				:customStyle="navbarOptions.customStyle"></pr-navbar>
			<view class="dynamic-top-bg"></view>
			<image class="dynamic-top-bg" src="@/static/img/company_top_bg.jpg" mode=""></image>
			<view class="dynamic-top-bg-filter"></view>
			<view class="top-info">
				<view class="top-info-name">PR云社区</view>
				<image class="top-info-avatar" :src="img_pryun" mode=""></image>
			</view>
		</view>
		<view class="list">
			<view style="height: 40rpx;"></view>
			<view class="list-item" v-for="(item, index) in messages.list || []" :key="index">
				<view class="list-item-border"></view>
				<image class="list-item-avatar" :src="item?.created_user?.avatar || img_pryun" mode=""></image>
				<view class="list-item-content">
					<view class="list-item-content-name">{{ item?.created_user?.nickname || '' }}</view>
					<view class="list-item-content-type">{{ item.title || '系统通知' }}</view>
					<view class="list-item-content-comment">
						<view class="list-item-content-comment-text">{{ item.comment || '' }}</view>
						<pr-icon name="arrow-right" size="16" color="#999999"></pr-icon>
					</view>
					<view class="list-item-other">
						<view class="list-item-other-time">{{ timeFrom(item.created_at) }}</view>
						<view v-if="item.project_title" class="list-item-other-lable">ꔷ {{ item.project_title }}</view>
					</view>
				</view>
			</view>
			<view style="height: 10px;"></view>
			<view class="safe-area-inset-bottom"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import img_pryun from '@/static/img/pryun.jpg'
	import api from '@/api'
	import { timeFrom } from '@/tools'
	import { onPullDownRefresh, onPageScroll } from "@dcloudio/uni-app"
	import { ref, watch } from 'vue'
	import type { Ref } from 'vue'
	// 监听主题是否发生变更
	uni.onThemeChange((res: any) => {
		let pages = getCurrentPages()
		// console.log(`------->日志输出pages:`, pages);
		// 防止手动变更状态栏时污染默认主题配置
		if (pages[pages.length - 1].route === 'pages-system/B-renew-log') {
			updateNavigationBarColor()
		}
	})

	// 页面滚动
	const moreInfoShow: Ref = ref(false)
	onPageScroll((e) => {
		// console.log(`------->日志输出e.scrollTop:`, e.scrollTop);
		moreInfoShow.value = e.scrollTop > 100 ? true : false
	})

	const navbarOptions: Ref = ref({
		title: '',
		theme: 'dark',
		blurEffect: false,
		customStyle: { 'background-color': 'rgba(248,248,248, 0)' }
	})

	// 更新状态栏颜色
	const updateNavigationBarColor = () => {
		const { theme = 'light' } = uni.getSystemInfoSync()
		let obj = {
			title: '',
			theme: 'dark',
			blurEffect: false,
			customStyle: { 'background-color': 'rgba(248,248,248, 0)' }
		}
		if (moreInfoShow.value) {
			obj = {
				title: '动态',
				theme: 'light',
				blurEffect: true,
				customStyle: { 'background-color': 'rgba(248,248,248, 0.9)' }
			}
			if (theme === 'dark') {
				obj.customStyle = { 'background-color': 'rgba(7,7,7, 0.9)' }
			}
		}
		// console.log(`------->日志输出navbarOptions.value:`, navbarOptions.value);
		navbarOptions.value = obj
		let color = '#000000'
		if (navbarOptions.value.theme === 'light') {
			color = theme === 'dark' ? '#ffffff' : '#000000'
		}
		if (navbarOptions.value.theme === 'dark') {
			color = theme === 'light' ? '#ffffff' : '#000000'
		}
		// console.log(`------->日志输出color:`, navbarOptions.value.theme, theme, color);
		// 设置状态栏颜色
		uni.setNavigationBarColor({ frontColor: color, backgroundColor: '', animation: { duration: 230, timingFunc: 'easeOut' } })
	}
	updateNavigationBarColor()
	watch(() => moreInfoShow.value, (a, b) => {
		updateNavigationBarColor()
	})

	let messages: Ref = ref([])
	const getData = async () => {
		let res = await api.messagesGet({ data: { size: 50 } })
		// 组件【】
		const list = [
			{ type: '新增', }
		]
		// console.log(`------->日志输出res:`, res);
		messages.value = res.data
		// messages.value = list
	}

	const init = () => {
		getData()
	}
	init()

	// 下拉刷新
	onPullDownRefresh(async () => {
		navbarOptions.value.title = '请稍后...'
		uni.vibrateShort({})
		await getData()
		await new Promise(a => setTimeout(() => a(true), 500))
		navbarOptions.value.title = ''
		uni.stopPullDownRefresh()
	})
</script>

<style scoped lang="scss">
	.dynamic {
		position: relative;
		width: 750rpx;

		.dynamic-top {
			position: relative;
			width: 750rpx;
			height: 640rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.dynamic-top-bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
			}

			.dynamic-top-bg-filter {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 2;
				background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.5) 100%);
			}

			.top-info {
				position: absolute;
				left: 0;
				bottom: -10px;
				padding-left: 16px;
				padding-right: 16px;
				box-sizing: border-box;
				width: 100%;
				height: 50px;
				z-index: 2;
				display: flex;
				align-items: flex-start;
				justify-content: flex-end;

				.top-info-name {
					margin-top: 10px;
					margin-right: 5px;
					color: #ffffff;
					font-size: 16px;
				}

				.top-info-avatar {
					padding: 8px;
					width: 60px;
					height: 60px;
					box-sizing: border-box;
					background-color: #ffffff;
					border-radius: 6px;
					box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
					overflow: hidden;
				}
			}
		}

		.list {
			.list-item {
				position: relative;
				padding: 16px 16px 5px;
				box-sizing: border-box;
				display: flex;
				align-items: flex-start;

				.list-item-border {
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 1px;
					background-color: rgba(229, 228, 233, 1);
					transition: all 230ms ease-out;
				}

				.list-item-avatar {
					flex-shrink: 0;
					width: 40px;
					height: 40px;
					border-radius: 6px;
				}

				.list-item-content {
					flex: 1;
					margin-left: 10px;

					.list-item-content-name {
						line-height: 24px;
					}

					.list-item-content-type {
						line-height: 24px;
						color: #0097ff;
					}

					.list-item-content-comment {
						margin-top: 5px;
						padding: 12px 16px;
						box-sizing: border-box;
						width: 100%;
						min-height: 44px;
						line-height: 20px;
						border-radius: 6px;
						background-color: rgba(255, 255, 255, 1);
						transition: all 230ms ease-out;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.list-item-content-comment-text {}
					}

					.list-item-other {
						line-height: 24px;
						color: #999999;
						font-size: 10px;
						display: flex;
						align-items: center;

						.list-item-other-lable {
							margin-left: 10px;
							color: #0097ff;
						}
					}
				}
			}
		}
	}

	@media (prefers-color-scheme: dark) {
		.dynamic {
			.list {
				.list-item {
					.list-item-border {
						background-color: rgba(34, 34, 35, 1);
					}

					.list-item-content {
						.list-item-content-comment {
							background-color: rgba(28, 28, 28, 1);
						}
					}
				}
			}
		}
	}
</style>
