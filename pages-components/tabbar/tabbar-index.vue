<template>
	<view class="pr-page">
		<pr-navbar title="底部标签栏"></pr-navbar>
		<view class="pr-body">
			<pr-card title="基础" tip="">
				<pr-row-cell icon="" title="fixed文本流占位" value="" :arrow="false" border="top" :hover="false">
					<template v-slot:value>
						<pr-switch v-model="options.fixedPerch"></pr-switch>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card title="进阶">
				<pr-row-cell icon="" title="高斯模糊" value="" :arrow="false" border="top" :hover="false">
					<template v-slot:value>
						<pr-switch v-model="options.blurEffect"></pr-switch>
					</template>
				</pr-row-cell>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<pr-tabbar v-model="tabbarIndex" :blurEffect="options['blurEffect']" :fixedPerch="options['fixedPerch']" :list="tabbar_list"></pr-tabbar>
	</view>
</template>

<script setup lang="ts">
	import { tabbar_list } from '@/pages-components/static/tabbar'
	import { ref, computed } from 'vue'

	const tabbarIndex = ref(0)
	const options = ref({
		fixedPerch: true,
		blurEffect: true,
		height: '44'
	})
</script>

<style scoped lang="scss">
</style>
