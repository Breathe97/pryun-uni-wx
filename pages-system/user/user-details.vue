<template>
	<view class="pr-page">
		<pr-navbar :title="moreInfoShow?userInfo.nickname || '个人资料':''" :fixedPerch="true"></pr-navbar>
		<view class="pr-body">
			<pr-card>
				<template v-slot:title>
					<view class="title">{{ userInfo.nickname ? `${userInfo.nickname}的`:'' }}个人资料</view>
				</template>
				<button class="button-clear" type="default" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<pr-row-cell icon="" title="头像" value="" :arrow="false" border="none">
						<template v-slot:value>
							<image class="user-info-avatar" :src="userInfo.avatar || avatar_null" @error="userInfo.avatar = avatar_null" mode=""></image>
						</template>
					</pr-row-cell>
				</button>
				<pr-row-cell icon="" title="昵称" :value="userInfo.nickname" :arrow="true" @click="toSet('1')"></pr-row-cell>
				<pr-row-cell icon="" title="用户名" :value="userInfo.username" :arrow="HasRole('super')" :touch-copy="true" @click="toSet('2')"></pr-row-cell>
				<pr-row-cell v-if="userInfo.mobile || HasRole('super')" icon="" title="手机号" :value="userInfo.mobile" :arrow="true" :touch-copy="true" @click="toSet('3')">
				</pr-row-cell>
				<pr-row-cell v-if="userInfo.email || HasRole('super')" icon="" title="电子邮箱" :value="userInfo.email" :arrow="true" :touch-copy="true" @click="toSet('4')"></pr-row-cell>
				<pr-row-cell icon="" title="性别" :value="Sex(userInfo.sex)" :arrow="true" @click="toSet('5')"></pr-row-cell>
				<pr-row-cell icon="" title="个性签名" :value="userInfo.comment || '未设置个性签名'" :arrow="true" :touch-copy="true" @click="toSet('6')"></pr-row-cell>
			</pr-card>
			<pr-card title="组织">
				<pr-row-cell icon="" title="公司" value="" :arrow="HasRole('super')" border="none" @click="toSet('companies')">
					<template v-slot:value>
						<view class="text-line-1" style="margin-left: 10px;">
							<text v-if="!userInfo.companies || userInfo.companies.length===0">未加入公司</text>
							<text v-else-if="userInfo.companies.length===1">{{ userInfo.companies[0].name }}</text>
							<text v-else>{{ `已加入${userInfo?.companies.length}个公司` }}</text>
						</view>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card title="权限">
				<pr-row-cell icon="" title="角色" :arrow="HasRole('super')" border="none" @click="toSet('roles')">
					<template v-slot:value>
						<view class="text-line-1" style="margin-left: 10px;">
							<text v-if="!userInfo.roles || userInfo.roles.length===0">无</text>
							<text v-else-if="userInfo.roles.length===1">{{ userInfo.roles[0].name }}</text>
							<text v-else>{{ `${userInfo?.roles.length}个角色` }}</text>
						</view>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="状态" :value="Status(userInfo.status)" :arrow="HasRole('super')" @click="toSet('7')"></pr-row-cell>
			</pr-card>
			<pr-card v-if="HasRole('super')" tip="允许在多个客户端登录的数量">
				<pr-row-cell icon="" title="多端登录" :value="userInfo.headstart_num" :arrow="HasRole('super')" border="none" @click="toSet('8')"></pr-row-cell>
			</pr-card>
			<pr-card title="第三方账号">
				<pr-row-cell icon="" title="QQ" value="" :arrow="false" border="none" @click="modalShow()">
					<template v-slot:value>
						<view>
							<text v-if="false" style="color: #0097ff;">已绑定</text>
							<text v-else>未绑定</text>
						</view>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="微信" value="" :arrow="false" @click="modalShow()">
					<template v-slot:value>
						<view>
							<text v-if="userInfo.openid" style="color: #0097ff;">已绑定</text>
							<text v-else>未绑定</text>
						</view>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card title="其他信息">
				<pr-row-cell icon="" title="注册时间" :value="timeFormat(userInfo.register_date,'yyyy-mm-dd hh:MM:ss')" :arrow="false" border="none" :touch-copy="true"></pr-row-cell>
				<pr-row-cell icon="" title="注册IP地址" :value="userInfo.register_ip" :arrow="false" :touch-copy="true"></pr-row-cell>
				<pr-row-cell icon="" title="最后登录时间" :value="timeFormat(userInfo.last_login_date,'yyyy-mm-dd hh:MM:ss')" :arrow="false" :touch-copy="true"></pr-row-cell>
				<pr-row-cell icon="" title="最后登录IP地址" :value="userInfo.last_login_ip" :arrow="false" :touch-copy="true"></pr-row-cell>
				<pr-row-cell icon="" title="最后活跃时间" :value="timeFrom(userInfo.last_active_date,'yyyy-mm-dd hh:MM:ss')" :arrow="false" :touch-copy="true"></pr-row-cell>
				<pr-row-cell icon="" title="最后活跃IP地址" :value="userInfo.last_active_ip" :arrow="false" :touch-copy="true"></pr-row-cell>
			</pr-card>
			<pr-card>
				<pr-row-cell icon="" title="" value="" :arrow="false" border="none" @click="modalShow('')">
					<template v-slot:title>
						<view style="color: #0097ff;">重置密码</view>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card v-if="HasRole('super')" tip="移除并销毁该账号相关的所有数据。">
				<pr-row-cell icon="" title="" value="" :arrow="false" border="none" @click="modalShow('del')">
					<template v-slot:title>
						<view style="color: #D94E49;">注销此账户</view>
					</template>
				</pr-row-cell>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<view class="safe-area-inset-bottom"></view>
		<pr-loading v-model="loadingOptions.show" title="请稍后"></pr-loading>
		<pr-modal v-model="modalOptions.show" :onlyTip="modalOptions.onlyTip" :text="modalOptions.text" @click="e=>usersDelete(500,e)"></pr-modal>
		<pr-action-sheet v-model="actionSheetOptions.show" :tip="actionSheetOptions.tip" :options="actionSheetOptions.options" @click="actionSheetSelect"></pr-action-sheet>
	</view>
</template>

<script setup lang="ts">
	import avatar_null from '@/static/img/avatar_null.png'
	import api from '@/api'
	import { toPage, overload, uploadFile } from '@/common'
	import { timeFormat, timeFrom, uuid } from '@/tools'
	import { Store } from '@/store'
	import { HasRole } from '@/common/computed'
	import { onLoad, onPageScroll } from "@dcloudio/uni-app";
	import { ref, computed } from 'vue'
	import type { Ref } from 'vue'
	const store = Store()

	const userInfo: Ref = ref({ companies: [], roles: [] })

	const loadingOptions: Ref = ref({ show: false })

	// 底部菜单
	const actionSheetOptions: Ref = ref({
		show: false,
		tip: '同步你的微信头像和昵称，解除绑定并不会销毁已存在的头像和昵称。',
		options: [
			{ text: '立即绑定', style: { color: '#0097ff', 'font-weight': 'bold' } },
			{ text: '解除绑定', style: { color: '#D45B52' } },
		]
	})
	const actionSheetShow = (mode) => {
		switch (mode) {
			case '':
				break;
			default:
				actionSheetOptions.value.options = [
					{ text: userInfo.value.openid ? '同步资料' : '立即绑定', style: { color: '#0097ff', 'font-weight': 'bold' } },
					{ text: '解除绑定', style: { color: '#D45B52' } },
				]
				break;
		}
		actionSheetOptions.value.show = true
	}
	const usersInfoSync = async (_inf, delay = 500) => {
		try {
			let _res = await api.usersInfoSync({ data: _inf })
			await new Promise(a => setTimeout(() => a(true), delay))
			let { code = 0, data, msg = '异常错误' } = _res
			if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
			uni.showToast({ title: '更新成功', icon: 'none' })
			await store.usersGetInfo() // 重新请求
			get_data() // 刷新用户数据
		} catch (e) {
			console.log(`------->日志输出e:`, e);
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
	}
	// 底部菜单选择
	const actionSheetSelect = async (e) => {
		switch (e) {
			// 同步资料
			case 0: {
				loadingOptions.value.show = true
				// 获取用户信息
				try {
					const [_res, _res2]: any = await Promise.all([uni.login({}), uni.getUserProfile({ desc: '同步您的资料。' })])
					const { code } = _res
					const { encryptedData, iv } = _res2
					const _inf = { encryptedData, iv, js_code: code }
					await usersInfoSync(_inf)
				} catch (e) {
					console.log(`------->日志输出e:`, e);
					uni.showToast({ title: '授权失败', icon: 'none' })
				}
				loadingOptions.value.show = false
				break;
			}
			default:
				break;
		}
	}



	// 监听页面滚动
	const moreInfoShow: Ref = ref(false)
	onPageScroll((e) => {
		// console.log(`------->日志输出e:`, e);
		moreInfoShow.value = e.scrollTop > 50 ? true : false
	})

	// 获取数据
	const inf: Ref = ref({ _id: '' })

	const get_data = async (page = 1, delay = 0) => {
		inf.value.page = page
		let _inf = JSON.parse(JSON.stringify(inf.value))
		// 没有id表示当前用户
		if (!_inf._id) {
			userInfo.value = store.userInfo
			return
		}
		try {
			let _res = {}
			await new Promise(a => setTimeout(() => a(true), delay))
			// console.log(`------->日志输出_inf:`, _inf);
			_res = await api.usersGetInfo({ data: _inf }) // 请求数据
			// console.log(`------->日志输出_res:`, _res);
			let { code = 0, data, msg = '异常错误' }: any = _res
			if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
			userInfo.value = data
		} catch (e) {
			console.log(`------->日志输出e:`, e);
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
	}

	// 初始化
	onLoad((query) => {
		inf.value._id = query.id
		get_data()
	})

	// 修改用户数据
	const usersPut = async (_inf, back = true, updateKey = '') => {
		try {
			let _res = await api.usersPut({ data: _inf }) // 更新数据
			let { code = 0, data, msg = '异常错误' } = _res
			if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
			// 如果是自己的账号
			if (userInfo.value._id === store.userInfo._id) {
				await store.usersGetInfo() // 刷新用户数据
			}
			back && uni.navigateBack()
			await get_data() // 重载当前页面数据
			store.updateTemList(userInfo.value._id, updateKey, userInfo.value[updateKey])
		} catch (e) {
			console.log(`------->日志输出e:`, e);
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
	}

	// 提示框
	const modalOptions: Ref = ref({ show: false, text: '', onlyTip: false })
	const modalShow = (mode = '') => {
		switch (mode) {
			case 'del':
				modalOptions.value.onlyTip = false
				modalOptions.value.text = '确定要注销并删除该用户的所有信息吗？该操作不可恢复。'
				break;
			default:
				modalOptions.value.onlyTip = true
				modalOptions.value.text = '我们目前并没有开放此功能，你可以稍后再来看看。'
				break;
		}
		modalOptions.value.show = true
	}

	// 删除用户
	const usersDelete = async (delay = 0, index) => {
		if (index !== 1) return
		loadingOptions.value.show = true
		try {
			let _inf = { ids: [userInfo.value._id] }
			let _res = {}
			await new Promise(a => setTimeout(() => a(true), delay))
			_res = await api.usersDelete({ data: _inf }) // 更新数据
			let { code = 0, data, msg = '异常错误' }: any = _res
			if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
			uni.showToast({ title: '删除成功', icon: 'none' })
			store.removeTemList(userInfo.value._id) // 对上级页面的数据进行更新
			uni.navigateBack()
		} catch (e) {
			console.log(`------->日志输出e:`, e);
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
		loadingOptions.value.show = false
	}

	// 修改头像
	const onChooseAvatar = async (e: any) => {
		const { avatarUrl = '' } = e.detail
		// 上传图片
		uni.showLoading({ title: '正在上传' })
		await new Promise(a => setTimeout(() => a(true), 500))
		let avatar = await uploadFile(avatarUrl, 'pryun/avatars/')
		// 修改资料
		let inf = { _id: userInfo.value._id, avatar }
		usersPut(inf, false, 'avatar')
		uni.showToast({ title: '修改成功', icon: 'none' })
	}

	// 设置按钮
	const toSet = async (mode = '') => {
		let set_title = ''
		let set_options = []
		let set_end_function: any = () => {}
		switch (mode) {
			case '1':
				set_title = '昵称'
				set_options = [{
					type: 'input',
					tip: '输入一个新的昵称，它将优先对外展示为你的名字。',
					list: [
						{ title: userInfo.value.nickname, value: '', placeholder: '输入一个新的昵称', type: 'nickname' },
					]
				}]
				set_end_function = (e) => {
					// console.log(`------->日志输出e:`, e);
					let nickname = e[0].list[0].title
					let inf = { _id: userInfo.value._id, nickname }
					usersPut(inf, true, 'nickname')
				}
				break;
			case '2':
				if (!HasRole.value('super')) return
				set_title = '用户名'
				set_options = [{
					type: 'input',
					tip: '请不要填写微信或其他私密账号，当前用户名仅作为当前系统的唯一标识。',
					list: [
						{ title: userInfo.value.username, value: '', placeholder: '输入内容', type: 'text' },
					]
				}]
				set_end_function = (e) => {
					// console.log(`------->日志输出e:`, e);
					let username = e[0].list[0].title
					let inf = { _id: userInfo.value._id, username }
					usersPut(inf)
				}
				break;
			case '3':
				set_title = '手机号'
				set_options = [{
					type: 'input',
					tip: '填写您的联系方式，如果你忘记密码，这将是一种找回方式。',
					list: [
						{ title: userInfo.value.mobile, value: '', placeholder: '设置您的手机号', type: 'text', pattern: [0 - 9] },
					]
				}]
				set_end_function = (e) => {
					// console.log(`------->日志输出e:`, e);
					let mobile = e[0].list[0].title
					let inf = { _id: userInfo.value._id, mobile }
					usersPut(inf)
				}
				break;
			case '4':
				set_title = '电子邮箱'
				set_options = [{
					type: 'input',
					tip: '填写您的电子邮箱，如果你忘记密码，这将是一种找回方式。',
					list: [
						{ title: userInfo.value.email, value: '', placeholder: '设置您的电子邮箱', type: 'text' },
					]
				}]
				set_end_function = (e) => {
					// console.log(`------->日志输出e:`, e);
					let email = e[0].list[0].title
					let inf = { _id: userInfo.value._id, email }
					usersPut(inf)
				}
				break;
			case '5':
				set_title = '性别'
				set_options = [{
					type: 'select',
					tip: '设置性别将有利于推送你感兴趣的通知。',
					list: [
						{ title: '隐藏', value: false },
						{ title: '男', value: false },
						{ title: '女', value: false },
					]
				}]
				set_options[0].list[userInfo.value.sex].value = true
				set_end_function = (e) => {
					let sex = e[0].list.findIndex(item => item.value)
					let inf = { _id: userInfo.value._id, sex }
					usersPut(inf)
				}
				break;
			case '6':
				set_title = '签名'
				set_options = [{
					type: 'input',
					tip: '设置专属的个性签名，它将对外展示，以便于其他人更加轻松了解到你。',
					list: [
						{ title: userInfo.value.comment, value: '', placeholder: '输入内容', type: 'textarea' },
					]
				}]
				set_end_function = (e) => {
					// console.log(`------->日志输出e:`, e);
					let comment = e[0].list[0].title
					let inf = { _id: userInfo.value._id, comment }
					usersPut(inf)
				}
				break;
			case '7':
				if (!HasRole.value('super')) return
				set_title = '状态'
				set_options = [{
					type: 'select',
					tip: '请确保你的操作正确，否则将可能出现意料之外的结果。',
					list: [
						{ title: '正常', value: false },
						{ title: '禁用', value: false },
						{ title: '审核中', value: false },
						{ title: '审核拒绝', value: false },
					]
				}]
				set_options[0].list[userInfo.value.status].value = true
				set_end_function = (e) => {
					let status = e[0].list.findIndex(item => item.value)
					let inf = { _id: userInfo.value._id, status }
					usersPut(inf)
				}
				break;
			case '8':
				if (!HasRole.value('super')) return
				set_title = '终端数量'
				set_options = [{
					type: 'input',
					list: [
						{ title: userInfo.value.headstart_num, value: '', placeholder: '输入支持的登录终端数量', type: 'text' },
					]
				}]
				set_end_function = (e) => {
					// console.log(`------->日志输出e:`, e);
					let headstart_num = e[0].list[0].title
					let inf = { _id: userInfo.value._id, headstart_num }
					usersPut(inf)
				}
				break;
			case 'roles':
				if (!HasRole.value('super')) return
				set_title = '角色'
				set_options = [{
					type: 'select-list',
					path: '/pages-system/role/role-select',
					list: Array.from(userInfo.value.roles, (item: any) => item.key),
				}]
				set_end_function = (e: any) => {
					// console.log(`------->日志输出e:`, e);
					let roles = e
					let inf = { _id: userInfo.value._id, roles }
					usersPut(inf)
				}
				break;
			case 'companies':
				if (!HasRole.value('super')) return
				set_title = '公司'
				set_options = [{
					type: 'select-list',
					path: '/pages-system/companie/companie-select',
					list: Array.from(userInfo.value.companies, (item: any) => item._id),
				}]
				set_end_function = (e) => {
					// console.log(`------->日志输出e:`, e);
					let companies = e
					let inf = { _id: userInfo.value._id, companies }
					usersPut(inf)
				}
				break;
		}
		store.setOptions({ set_title, set_options, set_end_function })
	}

	const Sex = computed(() => {
		return function(sex = 0) {
			let str = ''
			switch (sex) {
				case 0:
					str = '未知'
					break;
				case 1:
					str = '男'
					break;
				case 2:
					str = '女'
					break;
			}
			return str
		}
	})
	const Status = computed(() => {
		return function(val = 0) {
			let str = ''
			switch (val) {
				case 0:
					str = '正常'
					break;
				case 1:
					str = '禁用'
					break;
				case 2:
					str = '审核中'
					break;
				case 3:
					str = '审核拒绝'
					break;
			}
			return str
		}
	})
</script>

<style scoped lang="scss">
	.pr-body {
		.title {
			padding: 10px 16px;
			line-height: 30px;
			font-size: 20px;
			font-weight: bold;
		}

		.user-info-avatar {
			margin-top: 10px;
			margin-bottom: 10px;
			width: 54px;
			height: 54px;
			border-radius: 50%;
		}
	}
</style>
