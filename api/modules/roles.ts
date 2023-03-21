import { request } from '../http'

// 角色相关接口
const api = {
    rolesPost: (options = {}) => request({ method: 'POST', url: '/api/roles-post', ...options }),
    rolesDelete: (options = {}) => request({ method: 'DELETE', url: '/api/roles-delete', ...options }),
    rolesGet: (options = {}) => request({ method: 'GET', url: '/api/roles-get', ...options }),
    rolesPut: (options = {}) => request({ method: 'PUT', url: '/api/roles-put', ...options }),
    rolesGetInfo: (options = {}) => request({ method: 'GET', url: '/api/roles-get-info', ...options }),
}
export default api
