import { request } from '../http'

// 消息相关接口
const api = {
    messagesGet: (options = {}) => request({ method: 'GET', url: '/api/messages-get', ...options }),
}
export default api
