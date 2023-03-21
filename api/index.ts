import { request, uploadFile } from './http'

import users from './modules/users'
import roles from './modules/roles'
import permissions from './modules/permissions'
import messages from './modules/messages'
import companies from './modules/companies'
import projects from './modules/projects'
import forms from './modules/forms'
import formfields from './modules/formfields'

// 公用接口申明
const api = {
    // GET请求接收完整的uni.request.options 额外接收options.params, params>data>queryUrl
    getTest: (options = {}) => request({ method: 'GET', url: '/ydy-api/users-get?size=5', ...options, data: { size: 10, type: 'b' }, params: { size: 20, name: '123' } }),
    // 其他请求接收完整的uni.request.options 额外接收options.params, params>queryUrl
    postTest: (options = {}) => request({ method: 'POST', url: '/ydy-api/users-post?mode=a', ...options, params: { mode: 'b', type: 123 } }),
    // 通用接口
    ossProofGet: (options = {}) => request({ method: 'GET', url: '/api/oss-proof-get', ...options }),
    qrcodePost: (options = {}) => request({ method: 'POST', url: '/api/qrcode-post', ...options }),
    qrcodeGet: (options = {}) => request({ method: 'GET', url: '/api/qrcode-get', ...options }),
    qrcodePut: (options = {}) => request({ method: 'PUT', url: '/api/qrcode-put', ...options }),
    uploadFile: (options = {}) => uploadFile({ url: '/api/qrcode-put', ...options }),
    // 宝塔接口
    getSystemTota: (options = {}) => request({ method: 'POST', url: '/bt-api/system?action=GetSystemTota', ...options }),
    // 用户相关接口
    ...users,
    // 角色相关接口
    ...roles,
    // 权限相关接口
    ...permissions,
    // 消息相关接口
    ...messages,
    // 公司相关接口
    ...companies,
    // 项目相关接口
    ...projects,
    // 表单相关接口
    ...forms,
    // 表单字段相关接口
    ...formfields,
}
export default api
