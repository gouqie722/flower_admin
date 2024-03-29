import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
import { getToken, removeToken, removeRoles, removeName, removeAvatar } from './auth'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: 'http://39.108.186.101:3000',
  timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    // 如果有token 就携带tokon
    if (token) {
      // config.headers['Authorization'] = 'Bearer__' + token
      config.headers['token'] = token;
    }
    // 加上取消请求
    config.cancelToken = new axios.CancelToken((cancel) => {
      if (Array.isArray(window.axiosCancelTokenList)) {
        window.axiosCancelTokenList.push(cancel)
      } else {
        window.axiosCancelTokenList = [cancel]
      }
    })
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log('响应拦截', response);
    // if (response.data.code !== 0) {
    //   ElMessage({
    //     type: 'error',
    //     message: response.data.msg,
    //   })
    // }
    const { code } = response.data;
    if (code === 500) {
      ElMessage({
        type: 'error',
        message: response.data.msg,
      });
      return {};
    }
    if (code === 403) {
      removeToken();
      removeRoles()
      removeName()
      removeAvatar()
      router.push('/login');
      return;
    } else if (code === 100001) {
      return response.data;
    }
    return response.data.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken()
      removeRoles()
      removeName()
      removeAvatar()
      location.reload()
    }
    ElMessage({
      type: 'error',
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default service
