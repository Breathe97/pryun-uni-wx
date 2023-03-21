import api from '@/api'
import { uuid } from '@/tools'
// 跳转页面
export const toPage = (url = '') => {
  if (!url) return uni.showToast({ title: '暂未开发', icon: 'none' })
  uni.navigateTo({ url })
}

// 返回上一页并且重载
export const overload = (delta = 1) => {
  const pages = getCurrentPages()
  const prePage = pages[pages.length - delta - 1]
  prePage.onLoad()
  uni.navigateBack({ delta })
}

export const uploadFile = (filePath = '', ossPath = 'pryun/') => {
  return new Promise(async (resolve, reject) => {
    try {
      // 请求上传凭证
      let _res: any = await api.ossProofGet()
      const { code = 0, msg, data = {} } = _res
      if (code !== 200) {
        return uni.showToast({ title: msg || '未知错误', icon: 'none' })
      }
      let { url, OSSAccessKeyId, SecurityToken, policy, signature } = data.stsPass // 得到上传凭证
      let extension = filePath.substring(filePath.lastIndexOf('.'))
      let key = `${ossPath}${new Date().getTime()}_${uuid(4, 16)}${extension}` // 文件名 ( uuid随机命名 )
      let formData = { key, success_action_status: 200, OSSAccessKeyId, policy, signature, 'x-oss-security-token': SecurityToken }
      // 开始上传

      {
        let _res: any = await uni.uploadFile({ url, filePath, name: 'file', formData })
        if (_res.statusCode !== 200) return uni.showToast({ title: _res.msg || 'OSS错误', icon: 'none' })
        let fileUrl = `${url}/${key}` // 得到最终网络地址
        resolve(fileUrl)
      }
    } catch (e) {
      //TODO handle the exception
      reject(e)
    }
  })
}
