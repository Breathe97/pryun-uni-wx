<template>
	<view class="pr-page index">
		<view class="page1" :class="[{ 'page1-hide':active }]" @click="active=true">
			<pr-navbar title="测试" theme="ligth" :customStyle="{ 'background-color': 'rgba(242,241,246, 0)' }"></pr-navbar>
			<view class="pr-body">
				<view style="height: 200px;background-color: #55aaff;display: flex;align-items: center;justify-content: center;">1</view>
				<view style="height: 200px;background-color: #55aaff;display: flex;align-items: center;justify-content: center;">2</view>
				<view style="height: 200px;background-color: #55aaff;display: flex;align-items: center;justify-content: center;">3</view>
				<view style="height: 200px;background-color: #55aaff;display: flex;align-items: center;justify-content: center;">4</view>
				<view style="height: 200px;background-color: #55aaff;display: flex;align-items: center;justify-content: center;">5</view>
				<view style="height: 200px;background-color: #55aaff;display: flex;align-items: center;justify-content: center;">6</view>
				<view class="safe-area-inset-bottom"></view>
			</view>
		</view>
		<view class="page2" :class="[{ 'page2-active':active }]" @click="active=false">
			<view class="title" :style="[Style_title]" style="">
				<view class="left" style="color: #0097ff;font-size: 16px;font-weight: bold;flex: 1;">完成</view>
				<view class="title-center-text" style="color: #ffffff;font-size: 18px;font-weight: bold;flex: 4;text-align: center;">标题</view>
				<view class="left" style="color: #0097ff;font-size: 16px;font-weight: bold;flex: 1;"></view>
			</view>
			<scroll-view style="height: 0;flex: 1;" scroll-y="true">
				<view style="height: 200px;background-color: #47778d;display: flex;align-items: center;justify-content: center;">1</view>
				<view style="height: 200px;background-color: #47778d;display: flex;align-items: center;justify-content: center;">2</view>
				<view style="height: 200px;background-color: #47778d;display: flex;align-items: center;justify-content: center;">3</view>
				<view style="height: 200px;background-color: #47778d;display: flex;align-items: center;justify-content: center;">4</view>
				<view style="height: 200px;background-color: #47778d;display: flex;align-items: center;justify-content: center;">5</view>
				<view style="height: 200px;background-color: #47778d;display: flex;align-items: center;justify-content: center;">6</view>
				<view class="safe-area-inset-bottom"></view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed, nextTick, onMounted } from 'vue'

	const active = ref(false)
	const options_navbar = ref({})
	onMounted(() => {
		options_navbar.value = uni['$pr-navbar']
	})
	const Style_title = computed(() => {
		const { offsetTop, navbarHeight, offsetbottom } = options_navbar.value
		let style = {}
		style['padding-top'] = `${offsetTop}px`
		style['padding-bottom'] = `${offsetbottom}px`
		return style
	})
</script>

<style scoped lang="scss">
	.index {
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #000000;

		.pr-body {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.page1 {
			height: 100vh;
			// background-color: rgba(28, 28, 28, 1);
			background-color: #ffffff;
			transition: all 500ms cubic-bezier(.26, .92, .75, .98);
			transform: scale(1);
			border-radius: 0;
			overflow-y: auto;
		}

		.page1-hide {
			border-radius: 12px;
			transform: scale(0.9);
			overflow: hidden;
		}

		.page2 {
			position: fixed;
			bottom: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: calc(100vh - 50px);
			z-index: 1;
			transform: translateY(100%);
			transition: all 500ms cubic-bezier(.26, .92, .75, .98);
			// background-color: rgba(28, 28, 28, 1);
			background-color: #ffffff;
			border-radius: 12px;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			.title {
				border-bottom: 1px solid rgba(55, 55, 57, 1);
				height: 50px;
				box-sizing: border-box;
				padding-top: 6px;
				padding-bottom: 12px;
				padding-left: 16px;
				padding-right: 16px;
				display: flex;
				align-items: center;
			}
		}

		.page2-active {
			transform: translateY(0);
			box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.1);
		}

	}

	@media (prefers-color-scheme: dark) {
		.index {}
	}
</style>
