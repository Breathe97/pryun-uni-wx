<template>
	<view class="pr-button" hover-class="hover-class" hover-stay-time="100" @click="emit('click')">
		<slot></slot>
	</view>
</template>
<script lang="ts">
	export default {
		options: {
			virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
		}
	}
</script>
<script lang="ts" setup>
	const emit = defineEmits(['click'])
</script>

<style scoped>
	.pr-button {
		width: 100%;
		height: 44px;
		border-radius: 12px;
		background-color: var(--color-blue, rgba(0, 151, 255, 1.0));
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: saturate(180%) blur(20px);
		transition: all 230ms ease-out;
	}

	.hover-class {
		background-color: var(--color-gray, rgba(142, 142, 147, 1.0));
	}
</style>
