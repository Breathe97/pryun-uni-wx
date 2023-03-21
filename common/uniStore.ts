export default {
	set: (key, val) => {
		// 判断key是否有.
		let keyArr = key.split('.')
		if (keyArr.length === 1) return uni.setStorageSync(key, val)
		const startKey = keyArr[0] // 开始的key
		const endKey = keyArr[keyArr.length - 1] // 最后的key
		keyArr.splice(0, 1) // 去掉数组第一个key
		let oldInfo = uni.getStorageSync(startKey) || {} // 原来的值
		let obj = oldInfo // 临时接收数据
		let interrupt = null // 中断的key
		let _keyArr = [] // 新建属性
		let _obj = null // 如果新增则需要用到它
		for (let [index, _key] of keyArr.entries()) {
			// 只有obj里面有_key这个属性才可以修改，否则就是新增
			if (typeof(obj) === 'object' && obj[_key] && typeof(obj[_key]) === 'object') {
				if (index === keyArr.length - 1) continue
				obj = obj[_key]
			} else {
				if (!interrupt) {
					interrupt = _key
				}
				// 不是对象需要创建当前key ,并且obj 等于后面所有添加的内容
				_keyArr.push(_key)
			}
		}
		// 遍历创建添加内容
		for (let [index, key] of _keyArr.reverse().entries()) {
			if (index === 0) {
				_obj = {
					[key]: val
				}
			} else {
				_obj = {
					[key]: _obj
				}
			}
		}
		// 如果第一个就不是一个对象，直接赋值
		if (typeof(oldInfo) !== 'object') {
			oldInfo = _obj
			uni.setStorageSync(startKey, oldInfo)
			return
		}
		// 如果是中间赋值
		if (interrupt) {
			obj[interrupt] = _obj[interrupt]
		} else {
			// 正常修改
			obj[endKey] = val
		}
		uni.setStorageSync(startKey, oldInfo)
	},
	get: (key) => {
		let keyArr = key.split('.')
		let val = uni.getStorageSync(keyArr[0])
		keyArr.splice(0, 1) // 去掉数组第一个key
		// 遍历取值
		for (let _key of keyArr) {
			val = val[_key]
		}
		return val
	}
}
