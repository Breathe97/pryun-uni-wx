import { Store } from '@/store'
import { computed } from 'vue'

// 是否拥有某个角色
export const HasRole = computed(() => {
  const store = Store()
  const { roles = [] } = store.userInfo
  return function (role = '') {
    // console.log(`------->日志输出role:`, role);
    const index = roles.findIndex((item) => item.key === role)
    // console.log(`------->日志输出index:`,index);
    return index !== -1
  }
})

// 是否拥有某个权限
export const HasPermission = computed(() => {
  const store = Store()
  const { permissions = [] } = store.userInfo
  return function (permission = '') {
    // console.log(`------->日志输出permission:`, permission);
    const index = permissions.findIndex((item) => item.key === permission)
    return index !== -1
  }
})

// 底部加载提示
export const Tip_onReachBottom = computed(() => {
  return function (loading = false, total = 0, length = 0) {
    if (loading) return '加载中'
    if (total <= length) return '没有更多了'
    return ''
  }
})

// 是否选中
export const Is_selected = computed(() => {
  return function (list = [], val) {
    return list.includes(val)
  }
})
