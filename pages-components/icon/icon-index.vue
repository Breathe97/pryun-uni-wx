<template>
	<view class="pr-page">
		<pr-navbar title="图标"></pr-navbar>
		<view class="pr-body">
			<pr-card>
				<view class="view-content">
					<pr-icon name="grass" :color="options['color']" :bg="options['bg']" :padding="options['padding']" :radius="options['radius']" :size="options['size']"></pr-icon>
				</view>
			</pr-card>
			<pr-card title="基础">
				<pr-row-cell icon="" title="自定义颜色" value="" :arrow="false" border="none" :hover="false">
					<template v-slot:value>
						<pr-switch @change="(e)=>options['color']=e?'#0097ff':''"></pr-switch>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="自定义背景颜色" value="" :arrow="false" border="top" :hover="false">
					<template v-slot:value>
						<pr-switch @change="(e)=>options['bg']=e?'#ffaa7f':''"></pr-switch>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="内边距" value="" :arrow="false" border="top" :hover="false">
					<template v-slot:value>
						<pr-switch @change="(e)=>options['padding']=e?'4px':''"></pr-switch>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="圆角" value="" :arrow="false" border="top" :hover="false">
					<template v-slot:value>
						<pr-switch @change="(e)=>options['radius']=e?'12px':''"></pr-switch>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="大小" value="" :arrow="false" border="top" :hover="false">
					<template v-slot:value>
						<pr-switch @change="(e)=>options['size']=e?'80':'50'"></pr-switch>
					</template>
				</pr-row-cell>
				<!-- 			<pr-row-cell icon="" title="自定义图标" value="" :arrow="false" border="top" :hover="false">
				<template v-slot:value>
					<pr-switch @change="(e)=>options['name']=e?'https://pryun.oss-cn-chengdu.aliyuncs.com/ydy/companies/logo/1654820750846_0F4A.jpg':'grass'"></pr-switch>
				</template>
			</pr-row-cell> -->
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<!-- <editor read-only></editor> -->
		<pr-tabbar v-model="tabbarIndex" :fixedPerch="true" :list="tabbar_list"></pr-tabbar>
	</view>
</template>

<script setup lang="ts">
	import { tabbar_list } from '@/pages-components/static/tabbar'
	import { ref, computed, watch } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'

	onLoad(() => {})

	const tabbarIndex = ref(0)
	const options = ref({
		fixed: false,
		fixedPerch: true,
		title: '导航栏',
		blurEffect: true,
		isBack: true,
		backHome: false,
		autoTheme: true,
		theme: 'light',
		size: '50',
		customStyle: {}
	})
	const aaa = (e) => {
		console.log(`------->日志输出e:`, e);
	}
</script>

<style scoped lang="scss">
	.view-content {
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		transition: all 230ms ease-out;
	}

	@media (prefers-color-scheme: dark) {
		.view-content {
			background-color: #1C1C1C;
		}
	}
</style>
