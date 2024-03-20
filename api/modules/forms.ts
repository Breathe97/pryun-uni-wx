import { request } from '../core/http'

// 表单相关接口
const api = {
  formsPost: (options = {}) => request({ method: 'POST', url: '/api/forms-post', ...options }),
  formsDelete: (options = {}) => request({ method: 'DELETE', url: '/api/forms-delete', ...options }),
  formsQueryPost: (options = {}) => request({ method: 'POST', url: '/api/forms-query-post', ...options }),
  formsPut: (options = {}) => request({ method: 'PUT', url: '/api/forms-put', ...options }),
  formsExportConfirmation: (options = {}) => request({ method: 'POST', url: '/api/forms-export-confirmation', ...options }),
  formsExportPost: (options = {}) => request({ method: 'POST', url: '/api/forms-export-post', ...options }),
  formsExportGet: (options = {}) => request({ method: 'GET', url: '/api/forms-export-get', ...options }),
}
export default api
