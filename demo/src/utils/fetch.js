import axios from 'axios'
import store from '../store'
import Utils from '../utils'
import qs from 'qs'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000, // 请求超时时间
  // 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise
  validateStatus: function (status) {
    return true
  }
})
// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] =  store.getters.token;
  // }
  // 服务端接口版本
  // eslint-disable-next-line
  // config.headers['apiVersion'] = __apiVersion__
  if (!config.params) {
    config.params = {}
  }
  // 请求结束后，是否自动关闭loading
  config.autoCloseLoading = !config.params.noLoading

  // 开启
  if (!config.params.noLoading) {
    Utils.tools.showLoading()
  }
  delete config.params.noLoading
  if (config.params.acceptError) {
    config.acceptError = true
    delete config.params.acceptError
  }
  if ((config.method + '').toLocaleLowerCase() == 'post') {
    // post 参数是否需要序列化
    if (config.params.needStringify) {
      delete config.params.needStringify
      config.data = qs.stringify(config.params)
    } else {
      config.data = config.params
    }
    config.params = {}
  }
  // 生产模式
  if (Utils.app.env === 'production') {
    config.url = config.prodUrl || ((config.prodHost || '') + config.url)
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.config.autoCloseLoading) {
      Utils.tools.hiddenLoading()
    }
    // 默认的正常状态返回码
    if (response.status >= 200 && response.status < 300) {
      let getResData = response.config.getResData

      if (!response.data || (response.data && response.data.code != 0)) {
        if (response.config.acceptError) {
          return returnData(response, getResData)
        }
        goSystemError(response.data.msg)
        throw returnData(response, getResData)
      } else {
        return returnData(response, getResData)
      }
    } else {
      if (response.config.acceptError) {
        return Promise.resolve({
          code: 'ERROR',
          msg: response.statusText
        })
      } else {
        goSystemError()
      }
    }
  },
  (error) => {
    // console.log(service.acceptError);
    if (!window.navigator.onLine) {
      error.message = '网络异常，请检查网络设置'
    }
    Utils.tools.hiddenLoading()
    goSystemError(error.message)
    return Promise.reject(error)
  }
)

// 跳转统一的错误页面
function goSystemError (msg = '程序猿gg正在加紧修复，请稍后访问') {
  store.commit('setError', {
    msg,
    show: true
  })
}

function returnData (response, isResponse) {
  return isResponse ? response : (response.data || {})
}

export default service
