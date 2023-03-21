<template>
	<view class="pr-page">
		<pr-navbar title="新增字段" :fixedPerch="true"></pr-navbar>
		<view class="pr-body">
			<pr-card title="名称">
				<pr-row-cell icon="" title="" value="" :arrow="false" border="none" :hover="false">
					<view style="width: 100%;">
						<pr-input v-model="inf.name" type="text" :hold-keyboard="true">
						</pr-input>
					</view>
				</pr-row-cell>
			</pr-card>
			<pr-card title="唯一标识">
				<pr-row-cell icon="" title="" value="" :arrow="false" border="none" :hover="false">
					<view style="width: 100%;">
						<pr-input v-model="inf.key" type="text" :hold-keyboard="true">
						</pr-input>
					</view>
				</pr-row-cell>
			</pr-card>
			<pr-card title="备注">
				<pr-row-cell icon="" title="" value="" :arrow="false" border="none" :hover="false">
					<view style="width: 100%;">
						<pr-input v-model="inf.comment" type="textarea" :hold-keyboard="true">
						</pr-input>
					</view>
				</pr-row-cell>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<pr-tabbar :fixedPerch="true" :blurEffect="false" :customStyle="{ 'background-color':'rgba(255,255,255,0)' }">
			<view style="padding: 8px 20px;width: 100%;">
				<pr-button @click="ok(500)">
					<text>完成</text>
				</pr-button>
			</view>
		</pr-tabbar>
		<pr-loading v-model="loading" title="请稍后"></pr-loading>
	</view>
</template>

<script setup lang="ts">
	import api from '@/api'
	import { overload } from '@/common'
	import { ref } from 'vue'
	import type { Ref } from 'vue'

	const loading: Ref = ref(false)

	// 完成
	const inf: Ref = ref({
		name: '',
		key: '',
		comment: ''
	})
	const ok = async (delay = 0) => {
		let _inf = JSON.parse(JSON.stringify(inf.value))
		let _res = {}
		loading.value = true
		await new Promise(a => setTimeout(() => a(true), delay))
		try {
			_res = await api.formfieldsPost({ data: _inf }) // 请求数据
			// console.log(`------->日志输出_res:`, _res);
		} catch (e) {
			console.log(`------->日志输出e:`, e);
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
		loading.value = false
		let { code = 0, data, msg = '异常错误' }: any = _res
		if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
		uni.showToast({ title: '添加成功', icon: 'none' })
		overload() // 返回并重载上一页面
	}
</script>

<style scoped lang="scss">
	.pr-body {}
</style>
