<template>
	<view class="pr-page">
		<pr-navbar :title="store.set_title" :fixedPerch="true"></pr-navbar>
		<view class="pr-body">
			<template v-for="(item,index) in set_options" :key="index">
				<pr-card :tip="item.tip">
					<template v-for="(options,options_index) in item.list" :key="options_index">
						<template v-if="item.type==='input'">
							<pr-row-cell icon="" title="" value="" :arrow="false" :border="options_index===0?'none':'top'" :hover="false">
								<view style="width: 100%;">
									<pr-input v-model="options.title" :focus="true" :placeholder="options.placeholder" :hold-keyboard="true" :type="options.type" @confirm="set_end_function">
									</pr-input>
								</view>
							</pr-row-cell>
						</template>
						<template v-else-if="item.type==='switch'">
							<pr-row-cell icon="" :title="options.title" :value="item.type" :arrow="false" :border="options_index===0?'none':'top'" :hover="false">
								<template v-slot:value>
									<pr-switch v-model="options.value" :disabled="options.disabled"></pr-switch>
								</template>
							</pr-row-cell>
						</template>
						<template v-else-if="item.type==='select'">
							<pr-row-cell icon="" :title="options.title" :value="item.type" :arrow="false" :border="options_index===0?'none':'top'" @click="select(item.list,options_index)">
								<template v-slot:value>
									<pr-icon name="hook" :color="options.value?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
								</template>
							</pr-row-cell>
						</template>
					</template>
				</pr-card>
			</template>
		</view>
		<view style="height: 20px;"></view>
		<pr-tabbar :fixedPerch="true" :blurEffect="false" :customStyle="{ 'background-color':'rgba(255,255,255,0)' }">
			<view style="padding: 8px 20px;width: 100%;">
				<pr-button @click="set_end_function">
					<text>完成</text>
				</pr-button>
			</view>
		</pr-tabbar>
	</view>
</template>

<script setup lang="ts">
	import { Store } from '@/store'
	import { ref } from 'vue'
	import type { Ref } from 'vue'

	const store = Store()

	// 设置页面的详细参数
	const set_options: Ref = ref([])
	set_options.value = store.set_options
	// console.log(`------->日志输出set_options.value:`, set_options.value);

	// 完成
	const set_end_function = () => {
		store.set_end_function(set_options.value)
	}

	// 选择
	const select = (list, index) => {
		for (let i = 0; i < list.length; i++) {
			list[i].value = index === i
		}
		// 选择后直接触发完成
		set_end_function()
	}
</script>

<style scoped lang="scss">
</style>
