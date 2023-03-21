<template>
	<view class="pr-page">
		<pr-navbar title="超级管理员"></pr-navbar>
		<view class="pr-body">
			<pr-card title="数据库">
				<pr-row-cell icon="" title="用户管理" value="" :arrow="true" border="none" @click="toPage('/pages-system/user/user-list')"></pr-row-cell>
				<pr-row-cell icon="" title="角色管理" value="" :arrow="true" @click="toPage('/pages-system/role/role-list')"></pr-row-cell>
				<pr-row-cell icon="" title="权限管理" value="" :arrow="true" @click="toPage('/pages-system/permission/permission-list')"></pr-row-cell>
			</pr-card>
			<pr-card>
				<pr-row-cell icon="" title="公司管理" value="" :arrow="true" border="none" @click="toPage('/pages-system/companie/companie-list')"></pr-row-cell>
				<pr-row-cell icon="" title="字段管理" value="" :arrow="true" @click="toPage('/pages-system/formfield/formfield-list')"></pr-row-cell>
				<pr-row-cell icon="" title="日志管理" value="" :arrow="true" @click="toPage('')"></pr-row-cell>
			</pr-card>
			<pr-card title="测试">
				<pr-row-cell icon="" title="开发者实验室" value="" :arrow="true" border="none" @click="toPage('/pages-test/home/home-index')"></pr-row-cell>
				<pr-row-cell icon="" title="" value="" :arrow="false" border="top" @click="userTest('add')">
					<template v-slot:title>
						<view style="color: #0097ff;">增加1W条用户测试数据</view>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="" value="" :arrow="false" border="top" @click="userTest('del')">
					<template v-slot:title>
						<view style="color: #E94C41;">删除1W条用户测试数据</view>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card title="其他" tip="收集异常崩溃信息,以提高程序的稳定性。">
				<pr-row-cell icon="" title="网络环境" value="" :arrow="true" border="none" @click="toPage('')"></pr-row-cell>
				<pr-row-cell icon="" title="压力测试" value="" :arrow="true" @click="toPage('')"></pr-row-cell>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<view class="safe-area-inset-bottom"></view>
		<pr-loading v-model="loadingShow" title="请稍后"></pr-loading>
	</view>
</template>

<script setup lang="ts">
	import api from '@/api'
	import { toPage } from '@/common'
	import { Store } from '@/store'
	import { ref, computed } from 'vue'
	import type { Ref } from 'vue'
	const store = Store()
	const loadingShow: Ref = ref(false)

	const svgs = {
		'circle-scatter-haikei': 'data:image/svg+xml;base64,PHN2ZyBpZD0idmlzdWFsIiB2aWV3Qm94PSIwIDAgOTAwIDkwMCIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI5MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSI+PGcgZmlsbD0iIzAwOTdmZiI+PGNpcmNsZSByPSIxMzEiIGN4PSIyMDciIGN5PSIxNzciPjwvY2lyY2xlPjxjaXJjbGUgcj0iMjUiIGN4PSIxNjAiIGN5PSI2NDMiPjwvY2lyY2xlPjxjaXJjbGUgcj0iMTAzIiBjeD0iNjQ5IiBjeT0iMzMzIj48L2NpcmNsZT48Y2lyY2xlIHI9IjYyIiBjeD0iNTI2IiBjeT0iNzQ3Ij48L2NpcmNsZT48Y2lyY2xlIHI9IjQ3IiBjeD0iMzQ1IiBjeT0iNDM2Ij48L2NpcmNsZT48Y2lyY2xlIHI9IjM1IiBjeD0iNzUyIiBjeT0iNTc4Ij48L2NpcmNsZT48L2c+PC9zdmc+'
	}

	const userInfo = computed(() => store.userInfo || {})

	// 测试数据
	const userTest = async (mode) => {
		loadingShow.value = true
		let _res = await api.usersTest({ data: { mode, num: 1 } })
		loadingShow.value = false
		uni.showToast({ title: _res.msg, icon: 'none' })
	}

	// 设置按钮
	const toSet = (mode = '') => {
		let set_title = ''
		let set_options = []
		let set_end_function: any = () => {}

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
				set_end_function = (e) => {
					console.log(`------->日志输出e:`, e);
				}
				break;
			case 'shock':
				set_title = '触感反馈'
				set_options = [
					// 组一
					{
						type: 'switch',
						tip: '为系统控制和互动提供触感反馈。',
						list: [
							{ title: '系统触感反馈', value: true, disabled: false },
						]
					},
				]
				set_end_function = (e) => {
					console.log(`------->日志输出e:`, e);
				}
				break;
			default:
				break;
		}
		store.setOptions({ set_title, set_options, set_end_function })

	}
</script>

<style scoped lang="scss">
	.pr-body {}
</style>
