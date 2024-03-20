import { createHttp } from './core'

// 根据需要配置不同的代理
const proxyObj = {
  // 开发版
  develop: {
    // '/api': 'http://127.0.0.1:7001',
    '/api': 'https://api.pryun.vip',
    '/ydy-api': 'https://ydy.pryun.vip'
  },
  // 体验版
  trial: {
    // '/api': 'http://127.0.0.1:7001',
    '/api': 'https://api.pryun.vip',
    '/ydy-api': 'https://ydy.pryun.vip'
  },
  // 正式版
  release: {
    '/api': 'https://api.pryun.vip',
    '/ydy-api': 'https://ydy-api.pryun.vip'
  }
}

// 拦截器
const interceptors = {
  // 请求前
  request: (options = {}, httpType = '') => {
    let _options = { header: {}, ...options } // 这样写的目的是js、ts通用
    let token = uni.getStorageSync('token') || '' // 全局token
    let _header = { token } // 处理后header

    // uploadFile的处理
    if (httpType === 'uploadFile') {
    }

    _options.header = { ..._header, ..._options.header } // 合并并且优先选择传入的header
    return _options
  },
  // 请求后 成功才会执行 失败会直接进入api.apiName().catch() 可以主动抛出一个错误
  response: (result = {}, httpType = '') => {
    let _result = { statusCode: 0, data: { code: 0 }, ...result }
    let { statusCode = 0, data } = _result
    if (statusCode !== 200) {
      uni.showToast({ title: '服务器繁忙', icon: 'none' })
      throw _result // 抛出异常错误
    }
    // 服务器响应成功
    const { code = 0 } = data
    // 身份信息异常
    if (code === -1000) return uni.redirectTo({ url: '/pages/load/load-index?mode=1' })
    // 正常请求
    return data
  }
}

// 创建请求实例
const { request, uploadFile } = createHttp(proxyObj, interceptors)
export { request, uploadFile }
