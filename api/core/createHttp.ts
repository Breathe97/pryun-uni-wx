import { env_Api } from './env'
console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:env_Api`, env_Api)
export const createHttp = (proxyObj = {}, interceptors = {}) => {
  // @ts-ignore 规避当文件类型为ts的错误检查
  let _interceptors = { request: (options, httpType = '') => options, response: (result, httpType = '') => result, ...interceptors } // 兼容js的写法

  // 处理请求地址
  const baseUrlSwitch = (url = '') => {
    // 如果传入的是正常url 则不需要任何处理
    let intactIndex = url.indexOf('://')
    if (intactIndex === 5) return url
    // 当前环境 develop:开发版 trial:体验版 release:正式版
    let envVersion = uni.getAccountInfoSync().miniProgram.envVersion
    // 只要不是正式版 就使用开发者指定环境
    if (envVersion !== 'release') {
      envVersion = env_Api
    }
    // 当前接口代理配置
    // @ts-ignore 规避当文件类型为ts的错误检查
    const baseUrlObj = proxyObj[env_Api]
    // 遍历所有代理 对当前ur
    for (let key in baseUrlObj) {
      let keyIndex = url.indexOf(key)
      if (keyIndex === 0) {
        // @ts-ignore 规避当文件类型为ts的错误检查
        url = url.replace(key, baseUrlObj[key])
      }
    }
    return url
  }

  // 转化url参数
  const urlQueryParams = (url = '', params = {}) => {
    let _result = []
    for (let key in params) {
      // @ts-ignore 规避当文件类型为ts的错误检查
      let value = params[key]
      // 去掉为空的参数
      if (['', undefined, null].indexOf(value) >= 0) {
        continue
      }
      // 如果值为对象
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      _result.push(key + '=' + value)
    }
    // 判断传入的url是否已存在参数
    const reg = /([^&?]*)=([^&]*)/g
    let paramsOriginalArr = url.match(reg) || [] // url上原本可能存在的参数 来判断下面拼接的时候是否需要加?
    let newParamsStr = _result.join('&')
    let prefix = paramsOriginalArr.length ? '&' : '?' // url参数的前缀 ? || & || ''
    if (!newParamsStr) {
      prefix = ''
    }
    const _url = `${url}${prefix}${newParamsStr}`
    return _url
  }

  // 初始化请求配置
  const initOptions = (options = {}, httpType = '') => {
    let _options = { method: '', url: '', params: {}, data: {}, ...options }
    let { method = '', url, params = {}, data = {} } = _options
    // post中不需要处理params和data
    // 只在get请求处理，如果传入params 则对data内容进行覆盖因为在uni中data会覆盖url上的参数,以此达到优先params
    if (method === 'GET' || method === 'get') {
      data = { ...data, ...params }
    }
    // 处理url
    {
      url = baseUrlSwitch(url) // 拿到真实的url
      url = urlQueryParams(url, params) // 尝试对_url增加query.params
      _options = { ...options, method, url, params, data } // 把上面处理的结果覆盖
    }
    _options = _interceptors.request(_options, httpType) // 请求前拦截器
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:_options`, _options);
    return _options
  }

  // 请求
  const request = (options = {}) => {
    options = initOptions(options, 'request')
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:options`, options)
    return new Promise((reslove, reject) => {
      // @ts-ignore 规避当文件类型为ts的错误检查
      uni.request({
        ...options,
        // @ts-ignore 规避当文件类型为ts的错误检查
        success: result => {
          try {
            result = _interceptors.response(result, 'request') // 请求后拦截器
            reslove(result)
          } catch (e) {
            // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:e`, e)
            reject(e)
          }
        },
        // @ts-ignore 规避当文件类型为ts的错误检查
        fail: err => reject(err) // 错误不处理 全部返回
      })
    })
  }

  // 上传
  const uploadFile = (options = {}) => {
    options = initOptions(options, 'uploadFile')
    return new Promise((reslove, reject) => {
      // @ts-ignore 规避当文件类型为ts的错误检查
      uni.uploadFile({
        ...options,
        // @ts-ignore 规避当文件类型为ts的错误检查
        success: result => {
          if (result.data && typeof (result.data) === "string") {
            result.data = JSON.parse(result.data) // 反序列化
          }
          try {
            result = _interceptors.response(result, 'uploadFile') // 请求后拦截器
            reslove(result)
          } catch (e) {
            // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:e`, e)
            reject(e)
          }
        },
        // @ts-ignore 规避当文件类型为ts的错误检查
        fail: err => reject(err) // 错误不处理 全部返回
      })
    })
  }

  return { request, uploadFile }
}
