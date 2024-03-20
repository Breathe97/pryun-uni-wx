import { request } from '../core/http'

// 权限相关接口
const api = {
  permissionsPost: (options = {}) => request({ method: 'POST', url: '/api/permissions-post', ...options }),
  permissionsDelete: (options = {}) => request({ method: 'DELETE', url: '/api/permissions-delete', ...options }),
  permissionsGet: (options = {}) => request({ method: 'GET', url: '/api/permissions-get', ...options }),
  permissionsPut: (options = {}) => request({ method: 'PUT', url: '/api/permissions-put', ...options }),
  permissionsGetInfo: (options = {}) => request({ method: 'GET', url: '/api/permissions-get-info', ...options }),
  permissionsGetGenerated: (options = {}) => request({ method: 'GET', url: '/api/permissions-get-generated', ...options }),
}
export default api
