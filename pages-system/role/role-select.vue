<template>
  <view class="pr-page">
    <pr-navbar title="角色" :fixedPerch="true"></pr-navbar>
    <view class="pr-body">
      <pr-card>
        <pr-row-cell icon="" title="" value="" :arrow="false" border="none" :touch-copy="true" @click="toPage('')">
          <template v-slot:title>
            <view style="color: #0097ff;">已选{{ select_list.length }}</view>
          </template>
        </pr-row-cell>
      </pr-card>
      <pr-card :title="`共计（${res.total}），上次加载耗时${res.elapsed||'??'}`" :tip="Tip_onReachBottom(loading,res.total,res.list.length,res.elapsed)">
        <template v-for="(item,index) in res.list" :key="index">
          <pr-row-cell icon="" :title="item.name" value="" :arrow="false" :border="index===0?'none':'top'" @click="select(item.key)">
            <template v-slot:value>
              <pr-icon name="hook" :color="Is_selected(select_list,item.key)?'#0097ff':'rgba(0,0,0,0)'"></pr-icon>
            </template>
          </pr-row-cell>
        </template>
      </pr-card>
    </view>
    <view style="height: 20px;"></view>
    <pr-tabbar :fixedPerch="true" :blurEffect="false" :customStyle="{ 'background-color':'rgba(255,255,255,0)' }">
      <view style="padding: 8px 20px;width: 100%;">
        <pr-button @click="set_end_function">
          <text>完成</text>
        </pr-button>
      </view>
    </pr-tabbar>
  </view>
</template>

<script setup lang="ts">
  import api from '@/api'
  import { Tip_onReachBottom, Is_selected } from '@/common/computed'
  import { toPage } from '@/common'
  import { Store } from '@/store'
  import { onLoad, onReachBottom } from "@dcloudio/uni-app";
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  const store = Store()

  const loading : Ref = ref(false)

  // 获取列表
  const inf : any = ref({ page: 1, size: 50, key: '' })
  const res : any = ref({ total: 0, list: [] })
  const get_list = async (delay = 0, page = 1) => {
    inf.value.page = page
    let _inf = JSON.parse(JSON.stringify(inf.value))
    let _res = {}
    loading.value = true
    await new Promise(a => setTimeout(() => a(true), delay))
    try {
      // console.log(`------->日志输出_inf:`, _inf);
      _res = await api.rolesGet({ data: _inf }) // 请求数据
      // console.log(`------->日志输出_res:`, _res);
    } catch (e) {
      console.log(`------->日志输出e:`, e);
      uni.showToast({ title: '异常错误', icon: 'none' })
    }
    let { elapsed, code = 0, data, msg = '异常错误' } : any = _res
    if (code !== 200) return uni.showToast({ title: msg, icon: 'none' })
    res.value.total = data.total
    res.value.list = page === 1 ? data.list : [...res.value.list, ...data.list]
    res.value.elapsed = elapsed
    loading.value = false
  }

  // 初始化
  onLoad(() => {
    get_list()
  })

  // 底部加载
  onReachBottom(async () => {
    let length = res.value.list.length
    let total = res.value.total
    if (length >= total || loading.value) return
    await get_list(500, inf.value.page + 1)
  })

  // 设置页面的详细参数
  const set_options : Ref = ref([])
  set_options.value = store.set_options
  // console.log(`------->日志输出set_options.value:`, set_options.value);

  // 选中列表
  const select_list : Ref = ref([])
  select_list.value = set_options.value[0].list

  // 完成
  const set_end_function = () => {
    store.set_end_function(select_list.value)
  }

  // 选择
  const select = (key) => {
    let index = select_list.value.findIndex(item => item === key)
    // 未被选中
    if (index === -1) {
      select_list.value.push(key)
      return
    }
    select_list.value.splice(index, 1)
  }
</script>

<style scoped lang="scss">
  .pr-body {}
</style>