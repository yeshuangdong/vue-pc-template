import axios from 'axios'
import core from './procedure/core'
import { Message } from 'element-ui'
import { REQUEST_METHOD_POST, REQUEST_METHOD_GET } from '../common/const'
import cache from '../common/cache'

const defaultConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  module: '',
  timeout: 10000,
  validateStatus: function (status) {
    return true
  },
  withCredentials: true,
}

function Service() {
  let services = [...core]
  let _this = this
  let _http = axios.create(defaultConfig)

  // 添加请求拦截器
  _http.interceptors.request.use(
    config => {
      return config
    },
    error => {
      // 对请求错误做些什么
      console && console.log({ error })
      Promise.reject(error)
    }
  )

  _http.interceptors.response.use(
    response => {
      let { data: res, status: httpStatus } = response
      // http status 为 200，表示正确响应
      let { Result, ResultMessage } = res
      // 兼容新老框架
      if (Result === 0 || Result === 200) {
        return res
      } else {
        Message({ message: ResultMessage, type: 'error', duration: 5 * 1000 })
        return Promise.reject(res)
      }
    },
    // 服务器出现问题，无法给予正确的响应
    error => {
      Message({
        message: '发生异常错误,请刷新页面重试,或联系程序员',
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(error)
    }
  )

  services.forEach(item => {
    let { subUrl, name, method, cacheKey } = item
    _this[name] = params => {
      if (cacheKey) {
        // 表示缓存接口结果
        if (cache.cacheKey) {
          return Promise.resolve(cache.cacheKey)
        } else {
          return new Promise((resolve, reject) => {
            if (method === REQUEST_METHOD_GET) {
              _http
                .get(subUrl, { params: { ...params } })
                .then(res => {
                  cache.cacheKey = res
                  resolve(res)
                })
                .catch(err => {
                  reject(err)
                })
            } else {
              _http
                .post(subUrl, { ...params })
                .then(res => {
                  cache.cacheKey = res
                  resolve(res)
                })
                .catch(err => {
                  reject(err)
                })
            }
          })
        }
      } else {
        // 不缓存接口结果
        if (method === REQUEST_METHOD_GET) {
          return _http.get(subUrl, { params: { ...params } })
        }
        if (method === REQUEST_METHOD_POST) {
          return _http.post(subUrl, { ...params })
        }
      }
    }
  })
}

export default new Service()
