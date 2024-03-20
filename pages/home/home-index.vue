<template>
  <view class="pr-page">
    <pr-navbar title="" :isBack="false" :blurEffect="true" :autoTheme="false">
      <template v-slot:left>
        <leftAvatar :moreInfoShow="moreInfoShow" :userInfo="userInfo"></leftAvatar>
      </template>
    </pr-navbar>
    <view class="pr-body">
      <pr-card>
        <template v-slot:title>
          <view>
            <view class="title">PR云</view>
            <view class="search">
              <view style="margin-right: 6px">
                <pr-icon name="search" size="22" color="#5F5F5F"></pr-icon>
              </view>
              <pr-input v-model="inf.key" placeholder="搜索" type="text"></pr-input>
            </view>
            <view class="" style="height: 20px"></view>
          </view>
        </template>
        <pr-row-cell icon="" title="欢迎访问PR云社区!" value="" :arrow="false" :hover="false" border="none">
          <template v-slot:value>
            <button class="button-clear" open-type="share">
              <pr-icon name="share" size="32" color="#0097ff"></pr-icon>
            </button>
          </template>
        </pr-row-cell>
        <view class="statistical">
          <view class="statistical-item" @click="pageScrollTo('#a')">
            <view class="statistical-item-num" style="color: #0097ff">{{ list_a.length }}</view>
            <view class="statistical-item-text">基础组件</view>
          </view>
          <view class="statistical-span"></view>
          <view class="statistical-item" @click="pageScrollTo('#b')">
            <view class="statistical-item-num" style="color: #ea435c">{{ list_b.length }}</view>
            <view class="statistical-item-text">功能组件</view>
          </view>
          <view class="statistical-span"></view>
          <view class="statistical-item" @click="pageScrollTo('#c')">
            <view class="statistical-item-num" style="color: #64c367">{{ list_c.length }}</view>
            <view class="statistical-item-text">模板案例</view>
          </view>
        </view>
        <pr-row-cell icon="" title="" value="更新日志" :arrow="true" @click="toPage('/pages-system/renewLog/renewLog-index')">
          <template v-slot:title>
            <text>当前UI版本</text>
            <text style="color: #0097ff">1.0214</text>
          </template>
        </pr-row-cell>
        <pr-row-cell icon="" title="正在讨论" value="" :arrow="true" @click="modalShow = true">
          <template v-slot:value>
            <text style="color: #0097ff">138</text>
          </template>
        </pr-row-cell>
      </pr-card>
      <pr-card v-if="HasRole('super')">
        <pr-row-cell icon="" title="代办事项" value="" :arrow="true" border="none" @click="modalShow = true">
          <template v-slot:value>
            <text style="color: #0097ff">7</text>
          </template>
        </pr-row-cell>
      </pr-card>
      <view class="components-item">
        <view id="a" class="components-item-anchor" :style="[{ top: `-${options_navbar.navbarHeight}px` }]"></view>
        <pr-card title="基础组件">
          <template v-for="(item, index) in list_a" :key="index">
            <pr-row-cell :title="item.text" value="" :arrow="true" :border="index === 0 ? 'none' : 'top'" @click="item.path ? toPage(item.path) : (modalShow = true)">
              <template v-slot:icon>
                <pr-icon :name="item.icon" :bg="item.bg" :color="item.color" radius="6px"></pr-icon>
              </template>
            </pr-row-cell>
          </template>
        </pr-card>
      </view>
      <view class="components-item">
        <view id="b" class="components-item-anchor" :style="[{ top: `-${options_navbar.navbarHeight}px` }]"></view>
        <pr-card title="功能组件">
          <view id="b" style="position: relative" :style="[{ top: `-${options_navbar.navbarHeight}px` }]"></view>
          <template v-for="(item, index) in list_b" :key="index">
            <pr-row-cell icon="" :title="item.text" value="" :arrow="true" :border="index === 0 ? 'none' : 'top'" @click="item.path ? toPage(item.path) : (modalShow = true)">
              <template v-slot:icon>
                <pr-icon :name="item.icon" :bg="item.bg" :color="item.color" radius="6px"></pr-icon>
              </template>
            </pr-row-cell>
          </template>
        </pr-card>
      </view>
      <view class="components-item">
        <view id="c" class="components-item-anchor" :style="[{ top: `-${options_navbar.navbarHeight}px` }]"></view>
        <pr-card title="模板案例">
          <view id="c" style="position: relative" :style="[{ top: `-${options_navbar.navbarHeight}px` }]"></view>
          <template v-for="(item, index) in list_c" :key="index">
            <pr-row-cell icon="" :title="item.text" value="" :arrow="true" :border="index === 0 ? 'none' : 'top'" @click="item.path ? toPage(item.path) : (modalShow = true)">
              <template v-slot:icon>
                <pr-icon :name="item.icon" :bg="item.bg" :color="item.color" radius="6px"></pr-icon>
              </template>
            </pr-row-cell>
          </template>
        </pr-card>
      </view>
      <!-- 			<pr-card>
				<ad adpid="1177427658"></ad>
			</pr-card> -->
    </view>
    <view style="height: 20px"></view>
    <view class="safe-area-inset-bottom"></view>
    <pr-modal v-model="modalShow" :onlyTip="true" text="我们目前并没有开放此功能，你可以稍后再来看看。"></pr-modal>
  </view>
</template>
<script setup lang="ts">
import leftAvatar from './components/left-avatar/left-avatar.vue'
import { toPage } from '@/common'
import { HasRole } from '@/common/computed'
import { Store } from '@/store'
import { onPageScroll, onShareAppMessage } from '@dcloudio/uni-app'
import { ref, computed, nextTick, onMounted } from 'vue'
import type { Ref } from 'vue'
console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:`)
const store = Store()
const modalShow = ref(false)
onShareAppMessage(() => {
  return { imageUrl: 'https://pryun.vip/img/pryun.jpg', path: 'pages/load/load-index' }
})

// 监听页面滚动
const moreInfoShow: Ref = ref(true)
setTimeout(() => {
  moreInfoShow.value = false
}, 1000)
onPageScroll((e) => {
  moreInfoShow.value = e.scrollTop > 100 ? true : false
})

const userInfo = computed(() => store.userInfo || {})

const list_a = ref([
  { text: '图标', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '/pages-components/icon/icon-index' },
  { text: '顶部导航栏', icon: 'home', bg: '#64C367', color: '#ffffff', path: '/pages-components/navbar/navbar-index' },
  { text: '底部标签栏', icon: 'tabbar', bg: '#5756CD', color: '#ffffff', path: '/pages-components/tabbar/tabbar-index' },
  { text: '列表行', icon: 'list', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '开关', icon: 'switch', bg: '#ff557f', color: '#E9E9E9', path: '' },
  { text: '输入框', icon: 'feedback', bg: '#ffaa7f', color: '#ffffff', path: '' },
  { text: '卡片', icon: 'card-fill', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '验证码', icon: 'privacy', bg: '#ffaa7f', color: '#ffffff', path: '' },
  { text: '选项卡(进行中)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '查看更多(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '评分(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '时间轴(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '滑动菜单(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '进度条(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '滑条(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '折叠面板(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '拖拽列表(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '浮动输入框(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '长按菜单(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '滚动通知(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
])
const list_b = ref([
  { text: '加载', icon: 'loading', bg: '#64C367', color: '#ffffff', path: '' },
  { text: '日历', icon: 'calendar', bg: '#F09A39', color: '#ffffff', path: '/pages-components/calendar/calendar-index' },
  { text: '对话框', icon: 'comment', bg: '#65c6f0', color: '#ffffff', path: '' },
  { text: '底部菜单栏', icon: 'applied', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '弹出层(进行中)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '压盖层(进行中)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '气泡框(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '消息框（计划）', icon: 'applied', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '表情选择(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
])
const list_c = ref([
  { text: '列表筛选(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '地区选择(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '图片剪切(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '腾讯地图(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '暗黑模式适配(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
  { text: '海报分享(计划)', icon: 'grass', bg: '#0097ff', color: '#ffffff', path: '' },
])

const inf = ref({
  key: '',
})

const options_navbar: Ref = ref({})
onMounted(() => {
  options_navbar.value = uni['$pr-navbar']
})

const init = async () => {
  await nextTick()
}
init()

const pageScrollTo = (id: any) => {
  uni.pageScrollTo({ selector: id })
}
</script>

<style scoped lang="scss">
.pr-body {
  .title {
    box-sizing: border-box;
    height: 70px;
    line-height: 70px;
    font-size: 32px;
    font-weight: bold;
  }

  .search {
    background-color: #e4e3e8;
    width: 100%;
    border-radius: 12px;
    height: 68rpx;
    max-height: 40px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    box-sizing: border-box;
    transition: all 230ms ease-out;
  }

  .statistical {
    position: relative;
    padding: 16px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    transition: all 230ms ease-out;

    .statistical-span {
      width: 1px;
      height: 30px;
      background-color: rgba(229, 228, 233, 1);
      transition: all 230ms ease-out;
    }

    .statistical-item {
      flex: 1;
      text-align: center;

      .statistical-item-num {
        font-size: 24px;
        font-weight: bold;
        line-height: 40px;
      }

      .statistical-item-text {
        line-height: 20px;
      }
    }
  }

  .components-item {
    position: relative;

    .components-item-anchor {
      position: relative;
    }
  }
}

@media (prefers-color-scheme: dark) {
  .pr-body {
    .search {
      background-color: rgba(28, 28, 28, 1);
    }

    .statistical {
      background-color: #1c1c1c;

      .statistical-span {
        background-color: rgba(58, 58, 58, 1);
      }
    }
  }
}
</style>
