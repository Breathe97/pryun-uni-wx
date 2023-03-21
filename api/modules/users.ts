import { request } from '../http'

// 用户相关接口
const api = {
    usersPost: (options = {}) => request({ method: 'POST', url: '/api/users-post', ...options }),
    usersDelete: (options = {}) => request({ method: 'DELETE', url: '/api/users-delete', ...options }),
    usersGet: (options = {}) => request({ method: 'GET', url: '/api/users-get', ...options }),
    usersPut: (options = {}) => request({ method: 'PUT', url: '/api/users-put', ...options }),
    usersGetInfo: (options = {}) => request({ method: 'GET', url: '/api/users-get-info', ...options }),
    sendSmsCode: (options = {}) => request({ method: 'POST', url: '/api/users-sendSmsCode', ...options }),
    login: (options = {}) => request({ method: 'POST', url: '/api/users-login', ...options }),
    logout: (options = {}) => request({ method: 'GET', url: '/api/users-logout', ...options }),
    usersInfoSync: (options = {}) => request({ method: 'POST', url: '/api/users-info-sync', ...options }),
    usersTest: (options = {}) => request({ method: 'POST', url: '/api/users-test-...options', ...options }),
}
export default api
