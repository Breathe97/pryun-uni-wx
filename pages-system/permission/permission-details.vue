<template>
	<view class="pr-page">
		<pr-navbar title="详情" :fixedPerch="true"></pr-navbar>
		<view class="pr-body">
			<pr-card>
				<pr-row-cell icon="" title="名称" :value="details.name" :arrow="true" :touch-copy="true" border="none" @click="toSet('name')"></pr-row-cell>
				<pr-row-cell icon="" title="备注" :value="details.comment || ''" :arrow="true" :touch-copy="true" @click="toSet('comment')"></pr-row-cell>
				<pr-row-cell icon="" title="创建者" :value="details.created_user?.nickname" :arrow="true" :touch-copy="true"
					@click="toPage(`/pages-system/user/user-details?id=${details.created_user._id}`)">
				</pr-row-cell>
			</pr-card>
			<pr-card>
				<pr-row-cell icon="" title="唯一标识" :value="details.key" :arrow="false" border="none" :touch-copy="true"></pr-row-cell>
			</pr-card>
			<pr-card title="其他信息">
				<pr-row-cell icon="" title="创建时间" :value="timeFormat(details.created_at,'yyyy-mm-dd hh:MM:ss')" :arrow="false" border="none" :touch-copy="true"></pr-row-cell>
				<pr-row-cell icon="" title="创建IP地址" :value="details.created_ip" :arrow="false" :touch-copy="true"></pr-row-cell>
			</pr-card>
			<pr-card tip="确保你的意图正确,否则将会发生意想不到的错误。">
				<pr-row-cell icon="" title="" value="" :arrow="false" border="none" @click="modalShow=true">
					<template v-slot:title>
						<view style="color: #D94E49;">删除</view>
					</template>
				</pr-row-cell>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<view class="safe-area-inset-bottom"></view>
		<pr-loading v-model="loadingShow" title="请稍后"></pr-loading>
		<pr-modal v-model="modalShow" @click="e=>del(500,e)"></pr-modal>
	</view>
</template>

<script setup lang="ts">
	import api from '@/api'
	import { toPage, overload } from '@/common'
	import { timeFormat } from '@/tools'
	import { Store } from '@/store'
	import { onLoad } from "@dcloudio/uni-app";
	import { ref } from 'vue'
	import type { Ref } from 'vue'

	const store = Store()

	const loadingShow: Ref = ref(false)
	const modalShow: Ref = ref(false)

	// 获取详情
	const inf: Ref = ref({ _id: '' })
	const details: Ref = ref({})
	const get_details = async () => {
		let _inf = JSON.parse(JSON.stringify(inf.value))
		let _res = {}
		try {
			_res = await api.permissionsGetInfo({ data: _inf })
			// console.log(`------->日志输出_res:`, _res);
		} catch (e) {
			console.log(`------->日志输出e:`, e);
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
		let { code = 0, data, msg = '异常错误' }: any = _res
		if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
		details.value = data
	}

	// 初始化
	onLoad((query) => {
		// console.log(`------->日志输出query:`, query);
		inf.value._id = query.id
		get_details()
	})

	// 修改数据
	const permissionsPut = async (_inf, updateKey = '') => {
		try {
			let _res = {}
			_res = await api.permissionsPut({ data: _inf }) // 更新数据
			let { code = 0, data, msg = '异常错误' }: any = _res
			if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
			uni.navigateBack()
			await get_details() // 重载当前页面数据
			store.updateTemList(details.value._id, updateKey, details.value[updateKey])
		} catch (e) {
			console.log(`------->日志输出e:`, e);
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
	}

	// 删除
	const del = async (delay = 0, index) => {
		if (index !== 1) return
		loadingShow.value = true
		try {
			let _inf = { ids: [details.value._id] }
			let _res = {}
			await new Promise(a => setTimeout(() => a(true), delay))
			_res = await api.permissionsDelete({ data: _inf }) // 更新数据
			let { code = 0, data, msg = '异常错误' }: any = _res
			if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
			uni.showToast({ title: '删除成功', icon: 'none' })
			store.removeTemList(details.value._id) // 对上级页面的数据进行更新
			uni.navigateBack()
		} catch (e) {
			console.log(`------->日志输出e:`, e);
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
		loadingShow.value = false
	}

	// 设置按钮
	const toSet = (mode = '') => {
		let set_title = ''
		let set_options = []
		let set_end_function: any = () => {}
		switch (mode) {
			case 'name':
				set_title = '名称'
				set_options = [{
					type: 'input',
					list: [
						{ title: details.value.name, value: '', placeholder: '输入内容', type: 'text' },
					]
				}]
				set_end_function = (e) => {
					// console.log(`------->日志输出e:`, e);
					let name = e[0].list[0].title
					let inf = { _id: details.value._id, name }
					permissionsPut(inf, 'name')
				}
				break;
			case 'comment':
				set_title = '备注'
				set_options = [{
					type: 'input',
					list: [
						{ title: details.value.comment, value: '', placeholder: '输入内容', type: 'textarea' },
					]
				}]
				set_end_function = (e) => {
					// console.log(`------->日志输出e:`, e);
					let comment = e[0].list[0].title
					let inf = { _id: details.value._id, comment }
					permissionsPut(inf)
				}
				break;
		}
		store.setOptions({ set_title, set_options, set_end_function })
	}
</script>

<style scoped lang="scss">
	.pr-body {}
</style>
