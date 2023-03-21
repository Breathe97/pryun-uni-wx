<template>
	<view class="pr-page">
		<pr-navbar title="用户" :fixedPerch="true"></pr-navbar>
		<view class="pr-body">
			<pr-card>
				<pr-row-cell icon="" title="" value="" :arrow="true" border="none" @click="toPage('/pages-system/user/user-add')">
					<template v-slot:title>
						<view style="color: #0097ff;">添加</view>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="" value="" :arrow="false" border="top" :hover="false">
					<view style="width: 100%;">
						<pr-input v-model="inf.key" type="text" placeholder="搜索用户" :hold-keyboard="true">
						</pr-input>
					</view>
				</pr-row-cell>
			</pr-card>
			<pr-card :title="`共计（${res.total}），上次加载耗时${res.elapsed||'??'}`" :tip="Tip_onReachBottom(loading,res.total,list.length,res.elapsed)">
				<template v-for="(item,index) in list" :key="index">
					<pr-row-cell icon="" :title="item.nickname" :arrow="true" :border="index===0?'none':'top'" @click="toPage(`/pages-system/user/user-details?id=${item._id}`)">
						<template v-slot:icon>
							<pr-icon :name="item.avatar || avatar_null" radius="6px"></pr-icon>
						</template>
					</pr-row-cell>
				</template>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script lang="ts" setup>
	import avatar_null from '@/static/img/avatar_null.png'
	import api from '@/api'
	import { Store } from '@/store'
	import { Tip_onReachBottom } from '@/common/computed'
	import { toPage } from '@/common'
	import { onLoad, onReachBottom } from "@dcloudio/uni-app";
	import { ref, watch, computed } from 'vue'
	import type { Ref } from 'vue'

	const store = Store()

	const list = computed(() => store.tem_list)

	// 获取数据
	const inf: Ref = ref({ end_id: '', size: 50, key: '' })
	const res: any = ref({ total: 0, list: [] })
	const loading: Ref = ref(false)
	const get_list = async (delay = 0, end_id = '') => {
		loading.value = true
		try {
			inf.value.end_id = end_id
			let _inf = JSON.parse(JSON.stringify(inf.value))
			let _res = {}
			await new Promise(a => setTimeout(() => a(true), delay))
			// console.log(`------->日志输出_inf:`, _inf);
			_res = await api.usersGet({ data: _inf }) // 请求数据
			// console.log(`------->日志输出_res:`, _res);
			let { code = 0, data, msg = '异常错误' }: any = _res
			if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
			res.value.total = data.total
			res.value.elapsed = data.elapsed
			let _list = end_id ? [...list.value, ...data.list] : data.list
			store.setTemList(_list)
		} catch (e) {
			console.log(`------->日志输出e:`, e);
			uni.showToast({ title: '异常错误', icon: 'none' })
		}
		loading.value = false
	}

	// 初始化
	const init = () => {
		store.setTemList([])
		get_list()
	}
	onLoad(() => {
		init()
	})
	// 底部加载
	onReachBottom(async () => {
		let length = list.value.length
		let total = res.value.total
		if (length >= total || loading.value) return
		await get_list(500, list.value[length - 1]._id)
	})

	watch(() => inf.value.key, () => init())
</script>

<style scoped lang="scss">
	.pr-body {

		.user-info-avatar {
			width: 54px;
			height: 54px;
			border-radius: 50%;
		}

		.user-info-right {
			margin-left: 10px;
			flex: 1;

			.user-info-nickname {
				margin-top: 16px;
				box-sizing: border-box;
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 18px;
			}

			.user-info-comment {
				margin-bottom: 16px;
				box-sizing: border-box;
				width: 100%;
				font-size: 12px;
				display: flex;
				align-items: center;
			}
		}

		.tips-view {
			width: 24px;
			height: 24px;
			background-color: #E94C41;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
		}
	}
</style>
