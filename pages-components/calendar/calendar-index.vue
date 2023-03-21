<template>
	<view class="pr-page">
		<pr-navbar title="日历"></pr-navbar>
		<view class="pr-body">
			<pr-card title="模式">
				<pr-row-cell icon="" title="单选" value="" :arrow="false" border="none" :hover="false" @click="options['mode']='radio'">
					<template v-slot:value>
						<pr-icon name="hook" :color="options['mode']==='radio'?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="多选" value="" :arrow="false" border="top" :hover="false" @click="options['mode']='multiple'">
					<template v-slot:value>
						<pr-icon name="hook" :color="options['mode']==='multiple'?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="区间单选" value="" :arrow="false" border="top" :hover="false" @click="options['mode']='interval-radio'">
					<template v-slot:value>
						<pr-icon name="hook" :color="options['mode']==='interval-radio'?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="区间多选" value="" :arrow="false" border="top" :hover="false" @click="options['mode']='interval-multiple'">
					<template v-slot:value>
						<pr-icon name="hook" :color="options['mode']==='interval-multiple'?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card title="时间选择">
				<pr-row-cell icon="" title="关闭" value="" :arrow="false" border="none" :hover="false" @click="options['time']=''">
					<template v-slot:value>
						<pr-icon name="hook" :color="options['time']===''?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="小时" value="" :arrow="false" border="top" :hover="false" @click="options['time']='h'">
					<template v-slot:value>
						<pr-icon name="hook" :color="options['time']==='h'?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="分钟" value="" :arrow="false" border="top" :hover="false" @click="options['time']='m'">
					<template v-slot:value>
						<pr-icon name="hook" :color="options['time']==='m'?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
				<pr-row-cell icon="" title="秒钟" value="" :arrow="false" border="top" :hover="false" @click="options['time']='s'">
					<template v-slot:value>
						<pr-icon name="hook" :color="options['time']==='s'?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
					</template>
				</pr-row-cell>
			</pr-card>
			<pr-card>
				<pr-row-cell icon="" title="预览" value="" :arrow="false" border="none" :hover="false">
					<template v-slot:value>
						<pr-switch v-model="calendarShow"></pr-switch>
					</template>
				</pr-row-cell>
			</pr-card>
		</view>
		<view style="height: 20px;"></view>
		<pr-calendar v-model="calendarShow" :mode="options['mode']" :time="options['time']"></pr-calendar>
		<pr-tabbar v-model="tabbarIndex" :fixedPerch="true" :list="tabbar_list"></pr-tabbar>
	</view>
</template>

<script setup lang="ts">
	import { tabbar_list } from '@/pages-components/static/tabbar'
	import { ref, computed } from 'vue'

	const tabbarIndex = ref(0)
	const options = ref({
		mode: 'radio',
		time: '',
	})
	const calendarShow = ref(false)
</script>

<style scoped lang="scss">
</style>
