import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router/index'
// import { sign, getParamsUrl } from '@/utils/sing'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

//请求拦截
service.interceptors.request.use(
  config => {
    /* 加密请求 */
    // let lastUrl = config.url
    // if (config.method === 'get') {
    //   lastUrl = getParamsUrl(config.url, config.params,true)
    // }
    // config.url = getParamsUrl(config.url, { sign: sign(lastUrl, 'imageq_spider_J0nTGBPq06O0si') })
    if (store.getters.token) {
      config.headers['X-SSO-TOKEN'] = getToken()
      // config.headers['X-Resign-Value']='imageq_spider_xxxx'
    }
    // if (config.ContentType) {
    //   config.headers['Content-Type'] = 'application/json'
    // }
    return config
  },
  error => {
    //请求错误处理
    Promise.reject(error)
  }
)
//响应拦截
service.interceptors.response.use(
  response => {
    if (response.data.errorcode !== 0) {
        Notification.error({
        title: response.data.msg ? response.data.msg : '请联系管理员'
      })
      if (response.data.errorcode === -1002) {
        store.dispatch('user/resetToken').then(() => {
          router.currentRoute.path !== '/login' &&
            router.push({
              path: '/login'
            })
        })
      }
      // console.error(response.data)
      return Promise.reject(response)
    }
    return Promise.resolve(response.data)
  },
  error => {
    // router.push('/login')
    return Promise.reject(error)
  }
)

export default service //暴露axios实例
