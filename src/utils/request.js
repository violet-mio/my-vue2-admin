import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { printSuccess, printError } from '@/utils/print'

const isDev = process.env.NODE_ENV !== 'production'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 请求超时时间5，单位毫秒
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 发起请求之前做一些操作
    if (store.getters.token) {
      // 请求中携带token
      // headers['X-Token']是一个自定义请求头，需要根据实际业务情况进行替换
      config.headers['X-Token'] = getToken()
    }
    isDev && printSuccess(`${config.method} ${config.url}`, true, { params: config.params || {}, query: config.query || {}, data: config.data || {}})
    return config
  },
  error => {
    // 打印错误信息
    isDev && printError(`${error.config.method} ${error.config.url}, ERROR: ${error} ---->`)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 通过自定义代码确定请求状态
   * 也可以通过HTTP状态码判断
   */
  response => {
    const res = response.data

    // 自定义状态码不是20000，认为请求异常
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5000
      })

      // 50008: 不合法的token; 50012: 其它地方登录; 50014: token过期;
      const tokenErrCodes = [50008, 50012, 50014]
      if (tokenErrCodes.includes(res.code)) {
        MessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            // 为了重新实例化vue-router对象 避免bug
            location.reload()
          })
        })
      }
      isDev && printError(`${response.config.method} ${response.config.url} CUSTOMER_ERROR_CODE: ${res.code}, ERROR_MESSAGE: ${res.message} ---->`, response)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      isDev && printSuccess(`${response.config.method} ${response.config.url}`, false, response)
      return res
    }
  },
  error => {
    isDev && printError(`${error.config.method} ${error.config.url}`, error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
