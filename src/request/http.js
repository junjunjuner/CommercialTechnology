import Vue from 'vue'
import axios from 'axios'

// 请求次数
axios.defaults.retry = 4
// 请求的间隙
axios.defaults.retryDelay = 1000
// 响应时间
// axios.defaults.timeout = 5 * 1000
// axios.defaults.timeout = 5000
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 静态资源
Vue.prototype.$static = ''

// 配置接口地址
// axios.defaults.baseURL = 'http://10.2.10.167:5050'
axios.defaults.baseURL = 'http://172.28.171.101:3333'
// 发送请求
export function post (url, params, config) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err.data)
        }
      )
      .catch(err => {
        reject(err.data)
      })
  })
}
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(res => { resolve(res.data) })
      .catch(err => { reject(err.data) })
  })
}
