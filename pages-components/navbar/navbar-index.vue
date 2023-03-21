<template>
	<view class="pr-page">
		<pr-navbar :title="options['title']" :isBack="options['isBack']" :height="options['height']" :backHome="options['backHome']" :theme="options['theme']" :autoTheme="options['autoTheme']"
			:blurEffect="options['blurEffect']" :fixed="options['fixed']" :fixedPerch="options['fixedPerch']" :customStyle="options['customStyle']"></pr-navbar>
		<view class="pr-body">
			<pr-card title="标题">
				<pr-row-cell icon="" title="" value="" :arrow="false" border="none" :hover="false">
					<view style="width: 100%;">
						<pr-input v-model="options.title" placeholder="输入标题" type="text" :hold-keyboard="true">
						</pr-input>
					</view>
				</pr-row-cell>
			</pr-card>
			<pr-card title="基础" tip="fixed文本流占位需要开启fixed定位才生效。">
				<pr-row-cell icon="" title="返回按钮" value="" :arrow="false" border="none" :hover="false">
					<template v-slot:value>
						<pr-switch v-model="options.isBack"></pr-switch>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="fixed定位" value="" :arrow="false" border="top" :hover="false">
					<template v-slot:value>
						<pr-switch v-model="options.fixed"></pr-switch>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="fixed文本流占位" value="" :arrow="false" border="top" :hover="false">
					<template v-slot:value>
						<pr-switch v-model="options.fixedPerch"></pr-switch>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card title="主题" tip="根据手机主题自动切换状态栏主题。">
				<pr-row-cell icon="" title="light" value="" :arrow="false" border="none" :hover="false" @click="options['theme']='light'">
					<template v-slot:value>
						<pr-icon name="hook" :color="options.theme==='light'?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="dark" value="" :arrow="false" :hover="false" @click="options['theme']='dark'">
					<template v-slot:value>
						<pr-icon name="hook" :color="options.theme==='dark'?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="自动反转" value="" :arrow="false" :hover="false">
					<template v-slot:value>
						<pr-switch v-model="options.autoTheme"></pr-switch>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card title="进阶">
				<pr-row-cell icon="" title="首页按钮" value="" :arrow="false" border="none" :hover="false">
					<template v-slot:value>
						<pr-switch v-model="options.backHome"></pr-switch>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="高斯模糊" value="" :arrow="false" border="top" :hover="false">
					<template v-slot:value>
						<pr-switch v-model="options.blurEffect"></pr-switch>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card title="customStyle">
				<pr-row-cell icon="" title="自定义背景" value="" :arrow="false" border="none" :hover="false">
					<template v-slot:value>
						<pr-switch @change="(e)=>options['customStyle']=e?{ 'background-image': 'linear-gradient(20deg, rgba(255, 170, 127, 0.5), #ff55ff)' }:{}"></pr-switch>
					</template>
				</pr-row-cell>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<pr-tabbar v-model="tabbarIndex" :fixedPerch="true" :list="tabbar_list"></pr-tabbar>
	</view>
</template>

<script setup lang="ts">
	import { tabbar_list } from '@/pages-components/static/tabbar'
	import { ref, computed, watch } from 'vue'
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
		height: '44',
		customStyle: {}
	})
</script>

<style scoped lang="scss">

</style>
