import { request } from '../http'

// 表单字段相关接口
const api = {
    formfieldsPost: (options = {}) => request({ method: 'POST', url: '/api/formfields-post', ...options }),
    formfieldsDelete: (options = {}) => request({ method: 'DELETE', url: '/api/formfields-delete', ...options }),
    formfieldsGet: (options = {}) => request({ method: 'GET', url: '/api/formfields-get', ...options }),
    formfieldsPut: (options = {}) => request({ method: 'PUT', url: '/api/formfields-put', ...options }),
    formfieldsGetInfo: (options = {}) => request({ method: 'GET', url: '/api/formfields-get-info', ...options }),
}
export default api
