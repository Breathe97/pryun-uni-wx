<template>
	<view class="pr-page">
		<pr-navbar :title="navbarTitle" :fixedPerch="true"></pr-navbar>
		<view class="pr-body">
			<pr-card>
				<pr-row-cell icon="" value="" :arrow="true" :border="Show_tips?'bottom':'none'" @click="toPage('/pages-system/user/user-details')">
					<template v-slot:icon>
						<image class="user-info-avatar" :src="userInfo.avatar || avatar_null" @error="userInfo.avatar = avatar_null" mode=""></image>
					</template>
					<template v-slot:title>
						<view class="user-info-right">
							<view class="user-info-nickname">
								<text class="user-info-nickname-text">{{ userInfo.nickname || '游客' }}</text>
							</view>
							<view class="user-info-comment">
								<text class="user-info-comment-text">{{ userInfo.comment || '暂无个人介绍~' }}</text>
							</view>
						</view>
					</template>
				</pr-row-cell>
				<template v-if="Show_tips">
					<pr-row-cell icon="" title="补充基本信息" value="" :arrow="true" border="none" @click="toPage('/pages-system/set/set-tip')">
						<template v-slot:value>
							<view class="tips-view">1</view>
						</template>
					</pr-row-cell>
				</template>
			</pr-card>
			<pr-card v-if="HasRole('super')" class="list">
				<pr-row-cell icon="" title="超级管理员" value="" :arrow="true" border="none" @click="toPage('/pages-system/superAdmin/superAdmin-index')">
					<template v-slot:icon>
						<pr-icon name="tool" bg="#EA435C" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card>
				<pr-row-cell icon="" title="订阅管理" value="" :arrow="true" border="none" @click="modalShow=true">
					<template v-slot:icon>
						<pr-icon name="star-fill" bg="#5756CD" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="与我相关" value="" :arrow="true" @click="modalShow=true">
					<template v-slot:icon>
						<pr-icon name="comment" bg="#0097ff" color="#ffffff" radius="6px"></pr-icon>
					</template>
					<template v-slot:value>
						<view class="tips-view">2</view>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="我的勋章" value="12" :arrow="true" @click="modalShow=true">
					<template v-slot:icon>
						<pr-icon name="badge" bg="#F09A39" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card>
				<pr-row-cell icon="" title="通用" value="" :arrow="true" border="none" @click="toSet('')">
					<template v-slot:icon>
						<pr-icon name="set" bg="#8D8D8F" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="外观" value="自动" :arrow="true" @click="toSet('exterior')">
					<template v-slot:icon>
						<pr-icon name="exterior" bg="#0097ff" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="触感反馈" value="开启" :arrow="true" @click="toSet('shock')">
					<template v-slot:icon>
						<pr-icon name="shock" bg="#aaaaff" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="清除缓存" value="" :arrow="true" @click="clearStorage">
					<template v-slot:icon>
						<pr-icon name="broom" bg="#F09A39" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="关于PR云" value="" :arrow="true" @click="toPage('/pages-system/about/about-index')">
					<template v-slot:icon>
						<pr-icon name="relation" bg="#64C367" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card>
				<pr-row-cell icon="" title="切换账号" value="" :arrow="true" border="none" @click="login">
					<template v-slot:icon>
						<pr-icon name="toggle" bg="#F09A39" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="注销登录" value="" :arrow="false" @click="logout">
					<template v-slot:icon>
						<pr-icon name="logout" bg="#E94C41" color="#ffffff" radius="6px"></pr-icon>
					</template>
				</pr-row-cell>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<view class="safe-area-inset-bottom"></view>
		<pr-loading v-model="loadingShow" title="请稍后"></pr-loading>
		<pr-modal v-model="modalShow" :onlyTip="true" text="我们目前并没有开放此功能，你可以稍后再来看看。"></pr-modal>
	</view>
</template>

<script setup lang="ts">
	import avatar_null from '@/static/img/avatar_null.png'
	import api from '@/api'
	import { toPage } from '@/common'
	import { HasRole } from '@/common/computed'
	import { Store } from '@/store'
	import { ref, computed } from 'vue'
	import { onPullDownRefresh } from "@dcloudio/uni-app";
	import type { Ref } from 'vue'
	const store = Store()

	const modalShow = ref(false)

	const userInfo = computed(() => store.userInfo || {})
	console.log(`------->日志输出userInfo:`, userInfo);

	// 设置按钮
	const toSet = (mode = '') => {
		let set_title = ''
		let set_options = []
		let set_end_function = () => {
			uni.navigateBack()
		}
		switch (mode) {
			case 'set':
				set_title = '通用'
				break;
			case 'exterior':
				set_title = '主题'
				set_options = [
					// 组一
					{
						type: 'switch',
						tip: '暂不支持手动设置主题。',
						list: [
							{ title: '自动（跟随系统）', value: true, disabled: true },
						]
					},
				]
				// set_end_function = (e) => {
				// 	console.log(`------->日志输出e:`, e);
				// }
				break;
			case 'shock':
				set_title = '触感反馈'
				set_options = [
					// 组一
					{
						type: 'switch',
						tip: '为系统控制和互动提供触感反馈。',
						list: [
							{ title: '系统触感反馈', value: true, disabled: true },
						]
					},
				]
				// set_end_function = (e) => {
				// 	console.log(`------->日志输出e:`, e);
				// }
				break;
			default:
				break;
		}
		store.setOptions({ set_title, set_options, set_end_function })
	}

	// 注销
	const loadingShow: Ref = ref(false)
	const logout = async () => {
		loadingShow.value = true
		let res = await api.logout()
		let { code = 0, data = null, msg = '未知错误' } = res
		if (code !== 200) return
		await new Promise(a => setTimeout(() => a(true), 500))
		loadingShow.value = false
		uni.removeStorageSync('token')
		uni.reLaunch({ url: '/pages/load/load-index' })
	}

	// 登录
	const login = () => {
		uni.navigateTo({ url: '/pages-auth/login/login-index' })
	}

	// 下拉刷新
	const navbarTitle: Ref = ref('我的')
	onPullDownRefresh(async () => {
		navbarTitle.value = '请稍后...'
		uni.vibrateShort({})
		await store.usersGetInfo()
		await new Promise(a => setTimeout(() => a(true), 500))
		navbarTitle.value = '我的'
		uni.stopPullDownRefresh()
	})

	// 是否需要补充资料
	const Show_tips = computed(() => {
		let active = false
		const { nickname, mobile, username, email } = userInfo.value
		if (!nickname || !mobile || !username || !email) {
			active = true
		}
		return active
	})

	// 清理缓存
	const clearStorage = async () => {
		loadingShow.value = true
		// uni.clearStorageSync();
		await new Promise(a => setTimeout(() => a(true), 1000))
		loadingShow.value = false
		await new Promise(a => setTimeout(() => a(true), 300))
		uni.showToast({ title: '清理完成', icon: 'none' })
		// uni.reLaunch({ url: '/pages/load/load-index' })
	}
</script>

<style scoped lang="scss">
	.pr-body {

		.user-info-avatar {
			flex-shrink: 0;
			width: 54px;
			height: 54px;
			border-radius: 50%;
			margin: auto;
		}

		.user-info-right {
			margin-left: 10px;
			padding: 16rpx 0;
			flex: 1;
			overflow: hidden;

			.user-info-nickname {
				box-sizing: border-box;
				width: 100%;
				line-height: 24px;
				font-size: 18px;
				display: flex;
				align-items: center;

				.user-info-nickname-text {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}

			.user-info-comment {
				box-sizing: border-box;
				width: 100%;
				line-height: 16px;
				font-size: 12px;
				display: flex;
				align-items: center;

				.user-info-comment-text {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}
	}
</style>
