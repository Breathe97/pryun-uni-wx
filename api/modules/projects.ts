import { request } from '../core/http'

// 项目相关接口
const api = {
  projectsPost: (options = {}) => request({ method: 'POST', url: '/api/projects-post', ...options }),
  projectsDelete: (options = {}) => request({ method: 'DELETE', url: '/api/projects-delete', ...options }),
  projectsGet: (options = {}) => request({ method: 'GET', url: '/api/projects-get', ...options }),
  projectsPut: (options = {}) => request({ method: 'PUT', url: '/api/projects-put', ...options }),
  projectsGetInfo: (options = {}) => request({ method: 'GET', url: '/api/projects-get-info', ...options }),
  projectsGetJoin: (options = {}) => request({ method: 'GET', url: '/api/projects-get-join', ...options }),
  projectsCourtsDelete: (options = {}) => request({ method: 'DELETE', url: '/api/projects-courts-delete', ...options }),
  projectsCourtsGet: (options = {}) => request({ method: 'GET', url: '/api/projects-courts-get', ...options }),
  projectsCourtsGetInfo: (options = {}) => request({ method: 'GET', url: '/api/projects-courts-get-info', ...options }),
  projectsCourtsGetSurplus: (options = {}) => request({ method: 'GET', url: '/api/projects-courts-get-surplus', ...options }),
}
export default api
