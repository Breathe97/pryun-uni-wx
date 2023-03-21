import api from '@/api'
import { defineStore } from 'pinia'

export const Store = defineStore('counter', {
	state: () => {
		return {
			userInfo: {}, // 用户信息
			tem_list: [], // 临时列表（支持其他页面对该列表数据的更新）
			set_title: '', // 设置页面标题
			set_options: [], // 设置详细参数
			set_end_function: () => { } // 设置页面结束后执行的方法
		}
	},
	actions: {
		// 设置临时列表 
		setTemList(list = []) {
			this['tem_list'] = list
		},
		// 移除临时列表的某一项
		removeTemList(_id) {
			if (!_id || this['tem_list'].length === 0) return
			let _index = this['tem_list'].findIndex(item => item._id === _id)
			this['tem_list'].splice(_index, 1)
		},
		// 更新临时列表
		updateTemList(_id, key, val) {
			if (!_id || !key || this['tem_list'].length === 0) return
			let _index = this['tem_list'].findIndex(item => item._id === _id)
			let obj = this['tem_list'][_index]
			obj[key] = val
			this['tem_list'].splice(_index, 1, obj)
		},
		// 设置参数
		setOptions({ set_title, set_options, set_end_function }) {
			if (!set_title) {
				set_title = '设置'
			}
			// 不存在时使用示例参数
			if (!set_options || set_options.length === 0) {
				set_options = [
					// 输入框
					{
						type: 'input',
						list: [
							{ title: 'Breathe的主题配置一', value: '', type: 'text' },
						]
					},
					// 开关
					{
						type: 'switch',
						list: [
							{ title: '自动（跟随系统）', value: false },
						]
					},
					// 选择
					{
						type: 'select',
						tip: '选择主题并应用到程序选择主题并应用到程序选择主题并应用到程序选择主题并应用到程序。',
						list: [
							{ title: '默认', value: true },
							{ title: '暗黑', value: false },
							{ title: '激光红', value: false },
							{ title: '天空蓝', value: false },
						]
					},
				]
			}
			if (!set_end_function) {
				set_end_function = (e) => {
					console.log(`------->默认的set_end_function，e:`, e);
				}
			}
			this['set_title'] = set_title
			this['set_options'] = set_options
			this['set_end_function'] = set_end_function
			const { type, path } = set_options[0]
			// 如果是希望去动态列表选择内容 就跳转到指定页面
			if (set_options.length === 1 && type === 'select-list') return uni.navigateTo({ url: path })
			uni.navigateTo({ url: '/pages-system/set/set-options' })
		},
		// 同步本地数据
		async syncStore() { },
		// 获取用户信息
		async usersGetInfo() {
			try {
				let _res = {}
				// 获取用户信息
				_res = await api.usersGetInfo()
				let { code = 0, data = null, msg = '未知错误' } = _res
				if (code !== 200) {
					throw (msg)
					return
				}
				this['userInfo'] = data
			} catch (e) {
				throw (e)
			}
		}
	},
}) 
