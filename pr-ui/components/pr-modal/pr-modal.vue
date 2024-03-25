<template>
    <view v-if="visiable">
        <view class="pr-modal" :class="[{ 'pr-modal-show': modelValue }]" @touchmove.stop.prevent="() => {}">
            <view class="pr-modal-content" :class="[{ 'pr-modal-content-show': modelValue }]">
                <view class="pr-modal-content-title">{{ title }}</view>
                <view class="pr-modal-content-text">{{ text }}</view>
                <view class="pr-modal-content-options">
                    <view class="pr-modal-content-options-top-border"></view>
                    <template v-if="onlyTip">
                        <view class="pr-modal-content-options-item" style="color: #0097ff; font-weight: bold" hover-class="hover-class" hover-stay-time="100" @click="click(0)">确定</view>
                    </template>
                    <template v-else v-for="(item, index) in options" :key="index">
                        <view v-if="index !== 0" class="pr-modal-content-options-span"></view>
                        <view class="pr-modal-content-options-item" hover-class="hover-class" hover-stay-time="100" :style="[item.style]" @click="click(index)">{{ item.text }} </view>
                    </template>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
const emit = defineEmits(['update:modelValue', 'click'])

const props = defineProps({
    // 默认状态
    modelValue: {
        type: [Boolean],
        default: false,
    },
    // 标题
    title: {
        type: [String],
        default: '提示',
    },
    // 文本
    text: {
        type: [String],
        default: '此操作存在一定的风险，确定要这样做吗？',
    },
    // 只提示
    onlyTip: {
        type: [Boolean],
        default: false,
    },
    // 自动主题
    autoTheme: {
        type: [Boolean],
        default: true,
    },
    // 选项
    options: {
        type: [Array],
        default: [
            { text: '取消', style: { color: '#0097ff' } },
            { text: '确定', style: { color: '#0097ff', 'font-weight': 'bold' } },
        ],
    },
})

// 后加载
const visiable = ref(false)
const init = async () => {
    await nextTick()
    visiable.value = true
}
init()

const click = (index: number) => {
    emit('update:modelValue', false)
    emit('click', index)
}
</script>

<style scoped>
.pr-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-mask, rgba(58, 58, 58, 0.5));
    pointer-events: none;
    opacity: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 230ms ease-out;
}

.pr-modal-show {
    opacity: 1;
    pointer-events: all;
}

@keyframes transform-show {
    from {
        transform: scale(1.2);
    }

    to {
        transform: scale(1);
    }
}

.pr-modal-content {
    box-sizing: border-box;
    width: 280px;
    opacity: 0;
    transition: all 230ms ease-out;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--color-pr-modal-bg, rgba(229, 229, 234, 0.7));
    backdrop-filter: saturate(180%) blur(20px);
}

.pr-modal-content-show {
    opacity: 1;
    animation-name: transform-show;
    animation-duration: 230ms;
    animation-timing-function: ease-out;
    animation-delay: 0s;
    animation-iteration-count: 1;
}

.pr-modal-content-title {
    padding: 20px 20px 0 20px;
    height: 50px;
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.pr-modal-content-text {
    padding: 0 20px 20px 20px;
    font-size: 14px;
    text-align: center;
}

.pr-modal-content-options {
    position: relative;
    display: flex;
}

.pr-modal-content-options-item {
    position: relative;
    flex: 1;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 230ms ease-out;
}

.pr-modal-content-options-top-border {
    position: absolute;
    top: -1px;
    width: 100%;
    height: 1px;
    background-color: var(--color-pr-modal-active, rgba(107, 107, 107, 0.3));
}

.pr-modal-content-options-span {
    width: 1px;
    height: 44px;
    background-color: var(--color-pr-modal-active, rgba(107, 107, 107, 0.3));
}

.hover-class {
    background-color: var(--color-pr-modal-active, rgba(107, 107, 107, 0.3));
    z-index: 9;
}
</style>
