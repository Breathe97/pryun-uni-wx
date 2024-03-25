<template>
  <view class="pr-navbar" :class="[{ 'pr-navbar-fixed': fixed }, `pr-navbar-${theme}`, { 'backdrop-filter': props['blurEffect'] }]" :style="[customStyle]" @click="pageScrollTo" @touchmove.stop="() => {}">
    <!-- 状态栏占位 -->
    <view class="pr-navbar-status-bar" :style="[Style_statusBar]"></view>
    <view v-if="$slots['default']" class="pr-navbar-content" :style="[Style_content]"><slot name="default"></slot></view>
    <view v-else class="pr-navbar-content" :class="[{ 'auto-theme': autoTheme }]" :style="[Style_content]">
      <view class="content-title" :style="[Style_title, Style_fontSize]">
        <view v-if="$slots['title']" class="content-title-text"><slot name="title"></slot></view>
        <view v-else class="content-title-text">{{ title }}</view>
      </view>
      <view v-if="$slots['left']" class="content-left" :style="[Style_content]"><slot name="left"></slot></view>
      <view v-else-if="isBack" class="content-left" :style="[Style_content]">
        <view class="content-left-icons" :class="[{ 'content-left-show-home': backHome }]" :style="[Style_title, backHome && Style_showHome]">
          <view class="content-left-icons-icon" hover-class="hover-class" :style="[Style_icon_size]" @click.stop="back"><image class="content-left-icons-icon-image" :src="icons.back" mode=""></image></view>
          <template v-if="backHome">
            <view class="content-left-icons-span"></view>
            <view class="content-left-icons-icon" hover-class="hover-class" :style="[Style_icon_size]" @click="backToHome"><image class="content-left-icons-icon-image" :src="icons.home" mode=""></image></view>
          </template>
        </view>
      </view>
      <slot v-else name="left"></slot>
      <view v-if="$slots['right']" class="content-right" :style="[Style_content, Style_menuButton]"><slot name="right"></slot></view>
    </view>
  </view>
  <view class="pr-navbar-span" :class="[{ 'pr-navbar-span-show': fixed && fixedPerch }]">
    <!-- 状态栏占位 -->
    <view :style="[Style_statusBar]"></view>
    <!-- 中间占位 -->
    <view :style="[Style_content, Style_title]"></view>
  </view>
</template>
<script lang="ts">
export default {
  options: {
    virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
  },
}
</script>
<script setup lang="ts">
import { icons } from './static/icons.js'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

const props = defineProps({
  // fixed布局
  fixed: {
    type: [Boolean],
    default: false, // 默认禁用
  },
  // 添加fixed的文本流占位
  fixedPerch: {
    type: [Boolean],
    default: true, // 默认占用
  },
  // 高斯模糊
  blurEffect: {
    type: [Boolean],
    default: true,
  },
  // 主题
  theme: {
    type: [String],
    default: 'light',
  },
  // 自动主题
  autoTheme: {
    type: [Boolean],
    default: true,
  },
  // 标题
  title: {
    type: [String],
    default: '',
  },
  // 返回按钮
  isBack: {
    type: [Boolean],
    default: true,
  },
  // 返回的路径 根据路径来判断显示的左上角按钮
  backPath: {
    type: [String],
    default: '',
  },
  // 显示首页按钮
  backHome: {
    type: [Boolean],
    default: false,
  },
  // 自定义返回事件
  customBack: {
    type: [Function],
    default: null,
  },
  // 自定义样式
  customStyle: {
    type: [Object],
    default: {},
  },
})

// 初始化
let options: Ref = ref({})
const init = async () => {
  let navbar_options = uni['$pr-navbar']
  // 获取一次节约性能
  if (!navbar_options) {
    await new Promise((a) => setTimeout(() => a(true), 0)) // 防止胶囊属性获取不正常
    const { statusBarHeight = 20, fontSizeSetting = 16 } = uni.getSystemInfoSync()
    const _statusBarHeight = Math.max(20, statusBarHeight) // 兼容h5与上边距
    let _menuButtonInfo: any = {}
    // 其他端获取不到胶囊跳过
    try {
      const _menuButtonInfo = uni.getMenuButtonBoundingClientRect()
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:_menuButtonInfo`, _menuButtonInfo);
    } catch (e) {
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:e`, e)
    }
    const { height = 32, top = 0 } = _menuButtonInfo
    // 计算胶囊上下差值
    let offsetTop = top - statusBarHeight
    let offsetbottom = 40 - height
    offsetbottom = Math.max(offsetbottom, offsetTop) // 最小等于上方高度
    let navbarHeight = statusBarHeight + height + offsetTop + offsetbottom
    navbar_options = { statusBarHeight: _statusBarHeight, fontSize: fontSizeSetting, menuButtonInfo: _menuButtonInfo, offsetTop, offsetbottom, navbarHeight }
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:navbar_options`, navbar_options);
    uni['$pr-navbar'] = navbar_options
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:uni['$pr-navbar']`, uni);
  }
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:navbar_options`, navbar_options)
  options.value = navbar_options
}
init()

// 返回
const back: Function = () => {
  // 自定义返回事件
  if (props.customBack) return props.customBack()
  // 默认返回上一页
  if (!props.backPath) return uni.navigateBack()
  // 根据backPath，来返回到指定页面
  let pages = getCurrentPages()
  // 查询指定页面的index
  let index = pages.findIndex((page) => `/${page.route}`.includes(props.backPath))
  if (index === -1.0) return uni.redirectTo({ url: props.backPath })
  uni.navigateBack({ delta: pages.length - index - 1 })
}

// 返回到首页
const backToHome = () => {
  let pages = getCurrentPages()
  uni.navigateBack({ delta: pages.length - 1 })
}

const pageScrollTo = () => {
  uni.pageScrollTo({ scrollTop: 0, duration: 230 })
}

// 状态栏字体大小
const Style_fontSize = computed(() => {
  let style = { 'font-size': `${options.value.fontSize}px` }
  return style
})

// 图标大小
const Style_icon_size = computed(() => {
  let style: any = {}
  let size = 24 * (options.value.fontSize / 16)
  style['width'] = `${size}px`
  style['height'] = `${size}px`
  return style
})

// 状态栏高度 占位
const Style_statusBar = computed(() => {
  let style = { height: `${options.value.statusBarHeight}px` }
  return style
})

// 中间内容样式
const Style_content = computed(() => {
  const { offsetTop = 0, offsetbottom = 0 } = options.value
  let style = { 'padding-top': `${offsetTop}px`, 'padding-bottom': `${offsetbottom}px` }
  return style
})

// 标题高度
const Style_title = computed(() => {
  const { height = 32 } = options.value.menuButtonInfo || {}
  let style = { height: `${height}px` }
  return style
})

// 胶囊占位
const Style_menuButton = computed(() => {
  const { width = 0 } = options.value.menuButtonInfo || {}
  let style = { 'padding-right': `${width + 16}px` }
  return style
})

// 显示首页时胶囊样式
const Style_showHome = computed(() => {
  const { height = 32 } = options.value.menuButtonInfo || {}
  let style = { 'border-radius': `${height / 2}px` }
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:style`, style)
  return style
})
</script>
<style scoped>
.pr-navbar {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: var(--color-pr-navbar-bg, rgba(242, 241, 246, 0.5));
  transition: all 230ms ease-out;
}

.pr-navbar-fixed {
  position: fixed;
}

.pr-navbar-span {
  width: 750rpx;
  max-height: 0;
  height: 0;
  overflow: hidden;
  transition: all 230ms ease-out;
}

.pr-navbar-span-show {
  height: auto;
  max-height: 200px;
}

.pr-navbar-status-bar {
  width: 750rpx;
}

.pr-navbar-content {
  position: relative;
  width: 750rpx;
}

.pr-navbar-dark .pr-navbar-content {
  filter: invert(1) hue-rotate(180deg);
}

.content-title {
  padding-left: 200rpx;
  padding-right: 200rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-title-text {
  color: var(--color-text, rgba(0, 0, 0, 1));
  font-weight: bold;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-align: center;
  word-break: break-all;
}

.content-left {
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-left-icons {
  display: flex;
  align-items: center;
  transition: all 230ms ease-out;
}

.content-left .hover-class {
  opacity: 0.5;
}

.content-left-show-home {
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 16px;
  border: 0.5px solid;
  border-color: var(--color-pr-navbar-border, rgba(232, 231, 236, 1));
  box-sizing: border-box;
  background-color: #ffffff;
}

.content-left-icons-span {
  margin-left: 10px;
  margin-right: 10px;
  width: 1px;
  border-radius: 0.5px;
  height: 50%;
  background-color: var(--color-pr-navbar-border, rgba(232, 231, 236, 1));
}

.content-left-icons-icon {
  width: 24px;
  height: 24px;
}

.content-left-icons-icon-image {
  width: 100%;
  height: 100%;
}

.content-right {
  position: absolute;
  top: 0;
  right: 0;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.backdrop-filter {
  backdrop-filter: saturate(180%) blur(20px);
}

/* 适配自动暗黑 */
@media (prefers-color-scheme: dark) {
  .auto-theme .content-left-icons {
    filter: invert(1) hue-rotate(180deg);
  }

  .auto-theme .content-title-text {
    color: var(--color-text-dark, rgba(255, 255, 255, 1));
  }

  .auto-theme .content-left-show-home {
    border-color: var(--color-pr-navbar-border, rgba(189, 189, 189, 1));
  }

  .auto-theme .content-left-icons-span {
    background-color: var(--color-pr-navbar-border, rgba(189, 189, 189, 1));
  }
}
</style>
