<template>
  <view @click.stop="() => {}" @touchmove.stop="() => {}">
    <view class="pr-switch" :class="[{ 'pr-switch-active': active }, { 'pr-switch-disabled': disabled }]" @click="change">
      <view class="pr-switch-left-span"></view>
      <view class="pr-switch-round" hover-class="hover-class" hover-stay-time="100"></view>
      <view class="pr-switch-right-span"></view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  // 默认状态
  modelValue: {
    type: [Boolean, String, Number, Object],
    default: false,
  },
  // 开启时的值
  on: {
    type: [Boolean, String, Number, Object],
    default: true,
  },
  // 关闭时的值
  off: {
    type: [Boolean, String, Number, Object],
    default: false,
  },
  // 禁用
  disabled: {
    type: [Boolean],
    default: false,
  },
  // 自定义样式
  customStyle: {
    type: [Object],
    default: {},
  },
})

const active: Ref = ref(false)

const change = () => {
  // #ifdef MP-WEIXIN
  uni.vibrateShort({}) // 只有微信小程序的震动舒服
  // #endif
  active.value = !active.value
  emit('update:modelValue', active.value)
  emit('change', active.value)
}
watch(
  () => props['modelValue'],
  (a) => {
    active.value = a
  },
  { immediate: true }
)
</script>
<style scoped>
.pr-switch {
  position: relative;
  padding: 2px;
  box-sizing: border-box;
  width: 50px;
  height: 30px;
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--color-gray5, rgba(233, 233, 233, 1));
  transition: all 230ms ease-out;
  display: flex;
  align-items: center;
}

.pr-switch-active {
  background-color: var(--color-green, rgba(52, 199, 89, 1));
}

.pr-switch-left-span {
  flex: 0;
  transition: all 230ms ease;
}

.pr-switch-right-span {
  flex: 1;
  transition: all 230ms ease;
}

.pr-switch-round {
  position: relative;
  left: 0;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: #ffffff;
  transition: all 230ms ease;
}

.pr-switch-active .pr-switch-left-span {
  flex: 1;
}

.pr-switch-active .pr-switch-right-span {
  flex: 0;
}

.hover-class {
  width: 75%;
}

.pr-switch-disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
