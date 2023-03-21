// 格式化时间
export const timeFormat = (dateTime = null, fmt = 'yyyy-mm-dd') => {
	if (!dateTime) return ''
	// 时间戳
	if (dateTime.length === 10 || dateTime.length === 13) {
		dateTime = Number(dateTime)
	}
	let date = new Date(dateTime)
	let ret
	let opt = {
		'y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月
		'd+': date.getDate().toString(), // 日
		'h+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		's+': date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	}
	for (let k in opt) {
		ret = new RegExp('(' + k + ')').exec(fmt)
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
		};
	}
	return fmt
}
// 格式化时间 多久以前
export const timeFrom = (timestamp = null, format = 'yyyy-mm-dd') => {
	if (!timestamp) return ''
	timestamp = parseInt(timestamp)
	// 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
	if (timestamp.toString().length == 10) timestamp *= 1000
	var timer = (new Date()).getTime() - timestamp
	timer = parseInt(timer / 1000)
	// 如果小于5分钟,则返回"刚刚",其他以此类推
	let tips = ''
	switch (true) {
		case timer < 300:
			tips = '刚刚'
			break
		case timer >= 300 && timer < 3600:
			tips = parseInt(timer / 60) + '分钟前'
			break
		case timer >= 3600 && timer < 86400:
			tips = parseInt(timer / 3600) + '小时前'
			break
		case timer >= 86400 && timer < 2592000:
			tips = parseInt(timer / 86400) + '天前'
			break
		default:
			// 如果format为false，则无论什么时间戳，都显示xx之前
			if (format === false) {
				if (timer >= 2592000 && timer < 365 * 86400) {
					tips = parseInt(timer / (86400 * 30)) + '个月前'
				} else {
					tips = parseInt(timer / (86400 * 365)) + '年前'
				}
			} else {
				tips = timeFormat(timestamp, format)
			}
	}
	return tips
}
// 随机生成uuid
export const uuid = (len = 16, radix = 16) => {
	let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
	let uuid = [],
		i
	radix = radix || chars.length
	if (len) {
		// Compact form
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
	} else {
		// rfc4122, version 4 form
		let r
		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
		uuid[14] = '4'
		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
			}
		}
	}
	return uuid.join('')
}
// ArrayBuffer转16进度字符串
export const ab2hex = (buffer = null) => {
	const hexArr = Array.prototype.map.call(
		new Uint8Array(buffer),
		function(bit) {
			return ('00' + bit.toString(16)).slice(-2)
		}
	)
	// console.log(hexArr.join(''))
	return hexArr.join('').toUpperCase()
}
// 16进度字符串转ArrayBuffer
export const hex2ab = (str = '') => {
	let buffer = new ArrayBuffer(str.length * 0.5)
	let dataView = new DataView(buffer)
	for (let i = 0; i < str.length; i++) {
		if (i % 2 === 0) {
			dataView.setUint8(i * 0.5, parseInt(str.slice(i, i + 2), 16))
		}
	}
	return buffer
}
//十六进制转ASCII码
export const hex2str = (hexCharCodeStr = '') => {
	let trimedStr = hexCharCodeStr.trim()
	let rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
	let len = rawStr.length
	if (len % 2 !== 0) {
		console.log('存在非法字符')
		return '*'
	}
	let curCharCode
	let resultStr = []
	for (let i = 0; i < len; i = i + 2) {
		curCharCode = parseInt(rawStr.substr(i, 2), 16)
		resultStr.push(String.fromCharCode(curCharCode))
	}
	// console.log(hexCharCodeStr, trimedStr, rawStr, resultStr.join(''))
	return resultStr.join('')
}
// 短划线转换驼峰
export const line2hump = (str = '') => {
	return str.replace(/\-(\w)/g, function(all, letter) {
		return letter.toUpperCase()
	})
}
// 驼峰转换短横线
export const hump2line = (str = '') => {
	return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
// 去除首尾空格
export const trim = (str = '') => {
	return str.replace(/(^\s*)|(\s*$)/g, '')
}
