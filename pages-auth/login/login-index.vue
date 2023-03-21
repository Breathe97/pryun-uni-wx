<template>
	<view class="pr-page login">
		<view class="content-top">
			<pr-navbar title="" :fixedPerch="false" :blurEffect="false" theme="dark" :autoTheme="false" :customStyle="{ 'background-color': 'rgba(0, 122, 255, 0)' }"></pr-navbar>
			<view class="content-top-title">登录</view>
			<view class="content-top-tip">Welcome back</view>
			<view class="content-top-image"></view>
			<view class="content-top-image " :style="[{ 'background-image': `url(${wave})` }]"></view>
			<!-- 			<view class="content-top-image " :style="[{ 'background-image':`url(${'https://7463-tcb-7yhvblzno3zdntme1b856-5d1e8e-1304001577.tcb.qcloud.la/wave.gif'})` }]"></view> -->
		</view>
		<view class="content-form">
			<view class="content-form-row">
				<view class="content-form-row-title">{{ inf.mode === 'login' ? '账号' : '手机号码' }}</view>
				<view class="content-form-row-input">
					<pr-input v-if="inf.mode === 'login'" v-model="inf.account" type="text" placeholder="用户名/手机号/邮箱" :maxlength="20"></pr-input>
					<pr-input v-else v-model="inf.mobile" type="number" placeholder="输入手机号" :maxlength="11"></pr-input>
				</view>
			</view>
			<view class="content-form-row">
				<view class="content-form-row-title">{{ inf.mode === 'login' ? '密码' : '验证码' }}</view>
				<view class="content-form-row-input">
					<pr-input v-if="inf.mode === 'login'" v-model="inf.password" type="password" placeholder="输入用户密码" :maxlength="20"></pr-input>
					<view v-else class="content-form-row-input-smsCode">
						<view class="content-form-row-input-smsCode-left-input">
							<pr-input v-model="inf.smsCode" type="number" placeholder="输入6位验证码" :maxlength="6"></pr-input>
						</view>
						<view class="content-form-row-input-smsCode-left-btn" :class="[{ 'content-form-row-input-smsCode-left-btn-no': !is_smsCode }]">
							<pr-verification-code v-model="is_smsCode" key="login" :interval="60" :getCode="sendSmsCode"></pr-verification-code>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content-menus">
			<view class="content-menus-item">
				<text v-if="inf.mode === 'login'" @click="inf.mode = 'loginBySms'">验证码登录</text>
				<text v-else @click="inf.mode = 'login'">密码登录</text>
			</view>
			<view class="content-menus-item">
				<text v-if="inf.mode === 'login'" @click="modalShow = true">忘记密码？</text>
				<text v-else @click="modalShow = true">收不到验证码？</text>
			</view>
		</view>
		<view class="content-complete"><view class="content-complete-btn" @click="login(inf.mode)">立即登录</view></view>
		<view class="content-other">
			<view class="content-other-title">
				<view class="content-other-title-span"></view>
				<view class="content-other-title-text">其他</view>
				<view class="content-other-title-span"></view>
			</view>
			<view class="content-other-list">
				<button class="button-clear" type="default" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="content-other-list-item" src="@/pages-auth/static/icons/weixin.png" mode=""></image>
				</button>
			</view>
		</view>
		<view class="content-tip">
			<view class="content-tip-text">
				<text>登录使用就代表同意</text>
				<text style="color: rgba(0, 122, 255, 1);" @click="toPage('/pages-auth/privacyAgreement/privacyAgreement-index')">《PR云用户协议》</text>
			</view>
		</view>
		<view style="height: 40px;"></view>
		<view class="safe-area-inset-bottom"></view>
		<pr-loading v-model="loadingShow" :title="loadingShowText"></pr-loading>
		<pr-modal v-model="modalShow" :onlyTip="true" text="我们目前并没有开放此功能，你可以稍后再来看看。"></pr-modal>
	</view>
</template>

<script lang="ts" setup>
import api from '@/api'
import md5 from '@/tools/md5'
import wave from '@/pages-auth/static/imgs/wave.gif'
import { toPage, uploadFile } from '@/common'
import { Store } from '@/store'
import { ref } from 'vue'
import type { Ref } from 'vue'
const store = Store()
const modalShow = ref(false)
const is_smsCode = ref(true) // 是否可以发送验证码
// 登录
const loadingShowText: Ref = ref('')
const loadingShow: Ref = ref(false)
let inf: Ref = ref({
	"mode": "login",
	"account": "",
	"password": "",
	"mobile": "",
	"smsCode": "",
	"encryptedData": "",
	"iv": "",
	"js_code": ""
})
const login = async (mode = 'login', e: any) => {
	loadingShowText.value = '正在登录'
	loadingShow.value = true
	const { account, password, mobile, smsCode } = JSON.parse(JSON.stringify(inf.value))
	let _inf = {} // 登录参数
	switch (mode) {
		// 账号密码登录
		case 'login': {
			_inf = { mode: 'login', account, password: md5(password) }
			break;
		}
		// 手机号验证码快捷登录
		case 'loginBySms': {
			_inf = { mode: 'loginBySms', mobile, smsCode }
			break;
		}
		// 微信快捷登录
		case 'loginByWeixin': {
			// console.log(`------->日志输出e:`, e);
			// 获取用户信息
			try {
				let res: any = await uni.login({}) // 获取code
				let { code } = res
				// 上传头像
				_inf = { mode: 'loginByWeixin', js_code: code, avatar: '', nickName: '微信用户' }
			} catch (e) {
				console.log(`------->日志输出e:`, e);
				//TODO handle the exception
				loadingShow.value = false
				uni.showToast({ title: '授权失败', icon: 'none' })
				return
			}
			break;
		}
	}
	// 登录
	try {
		// console.log(`------->日志输出_inf:`, _inf);
		let _res = await api.login({ data: _inf })
		await new Promise(a => setTimeout(() => a(true), 500))
		loadingShow.value = false
		let { code = 0, data, msg = '异常错误' } = _res
		if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
		// 登录成功
		let token = data.token
		uni.setStorageSync('token', token)
		// 获取用户信息
		await store.usersGetInfo()
		// 如果是微信登录需要更新用户头像
		if (mode === 'loginByWeixin') {
			const { avatarUrl } = e
			let avatar = await uploadFile(avatarUrl, 'pryun/avatars/') // 上传到oss
			let inf = { _id: store.userInfo._id, avatar }
			await api.usersPut({ data: inf }) // 更新数据
			// 获取用户信息
			await store.usersGetInfo()
		}
		uni.navigateBack()
		uni.$emit('$login')
	} catch (e) {
		console.log(`------->日志输出e:`, e);
		uni.showToast({ title: '异常错误', icon: 'none' })
	}
}

const onChooseAvatar = (e: any) => {
	const { avatarUrl = '' } = e.detail
	login('loginByWeixin', { avatarUrl })
}
// 发送验证码
const sendSmsCode = () => {
	return new Promise(async (resolve, reject) => {
		loadingShowText.value = '请稍后'
		loadingShow.value = true
		let _res = {}
		try {
			// console.log(`------->日志输出_inf:`, _inf);
			_res = await api.sendSmsCode({ data: inf.value })
		} catch (e) {
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
		await new Promise(a => setTimeout(() => a(true), 500))
		loadingShow.value = false
		let { code = 0, data, msg = '异常错误' } = _res as any
		if (code !== 200) {
			uni.showToast({ title: msg, icon: 'none' })
			return reject(false)
		}
		uni.showToast({ title: '验证码已发送，请注意查收。', icon: 'none' })
		resolve(true)
	})
}

const init = async () => {

}
init()
</script>

<style lang="scss" scoped>
.login {
	position: relative;
	width: 100%;
	min-height: 100vh;
	overflow: hidden;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
}

.content-top {
	position: relative;
	padding: 0 100rpx 100rpx;
	box-sizing: border-box;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	background-image: linear-gradient(to bottom, rgba(0, 122, 255, 1), rgba(0, 151, 255, 1));

	.content-top-title {
		margin-top: 100rpx;
		position: relative;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		color: #ffffff;
		font-size: 48rpx;
		z-index: 9;
	}

	.content-top-tip {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		color: #ffffff;
		font-size: 36rpx;
		z-index: 9;
	}

	.content-top-image {
		position: absolute;
		bottom: -4px;
		width: 100%;
		height: 100px;
		mix-blend-mode: screen;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: center bottom;
	}
}

.content-form {
	padding-top: 40px;
	width: 100%;

	.content-form-row {
		padding-top: 40rpx;
		padding-left: 100rpx;
		padding-right: 100rpx;
		box-sizing: border-box;
		width: 100%;

		.content-form-row-title {
			height: 30rpx;
			display: flex;
			align-items: center;
		}

		.content-form-row-input {
			padding-top: 10px;
			padding-bottom: 10px;
			box-sizing: border-box;
			width: 100%;
			height: 40px;
			border-bottom: 1px solid rgba(128, 128, 128, 0.1);

			.content-form-row-input-smsCode {
				display: flex;
				align-items: center;

				.content-form-row-input-smsCode-left-input {
					flex: 1;
				}

				.content-form-row-input-smsCode-left-btn {
					margin-left: 10px;
					background-color: aqua;
					height: 28px;
					padding: 0 10px;
					border-radius: 6px;
					display: flex;
					align-items: center;
					color: #ffffff;
					background-color: #0097ff;
					font-size: 12px;
				}

				.content-form-row-input-smsCode-left-btn-no {
					background-color: #8d8d8f;
					opacity: 0.5;
				}
			}
		}
	}
}

.content-menus {
	padding-left: 100rpx;
	padding-right: 100rpx;
	box-sizing: border-box;
	width: 100%;
	height: 80rpx;
	max-height: 80px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.content-menus-item {
	}
}

.content-complete {
	margin-top: 60rpx;
	padding-left: 100rpx;
	padding-right: 100rpx;
	box-sizing: border-box;
	width: 100%;

	.content-complete-btn {
		width: 100%;
		height: 44px;
		color: #ffffff;
		border-radius: 12px;
		background-color: rgba(0, 151, 255, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.content-other {
	margin-top: 60rpx;
	padding-left: 100rpx;
	padding-right: 100rpx;
	box-sizing: border-box;
	width: 100%;

	.content-other-title {
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;

		.content-other-title-span {
			flex: 1;
			height: 1px;
			background-color: rgba(128, 128, 128, 0.1);
		}

		.content-other-title-text {
			padding-left: 40rpx;
			padding-right: 40rpx;
			flex-shrink: 0;
		}
	}

	.content-other-list {
		padding-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.content-other-list-item {
			width: 40px;
			height: 40px;
			background-color: #ffffff;
			border-radius: 50%;
		}
	}
}

.content-tip {
	margin-top: 60rpx;
	padding-left: 100rpx;
	padding-right: 100rpx;

	.content-tip-text {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
	}
}

@media (prefers-color-scheme: dark) {
	.login {
		background-color: #1c1c1c;

		.content-top {
			background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0px, rgba(0, 0, 0, 1) 85%, rgba(28, 28, 28, 1));

			.content-top-image {
				mix-blend-mode: multiply;
			}
		}
	}
}
</style>
