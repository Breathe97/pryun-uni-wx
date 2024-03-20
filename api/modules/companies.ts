import { request } from '../core/http'

// 公司相关接口
const api = {
  companiesPost: (options = {}) => request({ method: 'POST', url: '/api/companies-post', ...options }),
  companiesDelete: (options = {}) => request({ method: 'DELETE', url: '/api/companies-delete', ...options }),
  companiesGet: (options = {}) => request({ method: 'GET', url: '/api/companies-get', ...options }),
  companiesPut: (options = {}) => request({ method: 'PUT', url: '/api/companies-put', ...options }),
  companiesGetInfo: (options = {}) => request({ method: 'GET', url: '/api/companies-get-info', ...options }),
}
export default api
