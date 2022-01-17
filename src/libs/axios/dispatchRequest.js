import HttpRequest from '../axios/HttpRequest'
import config from '../axios/config'
import qs from 'qs'
import { publicPath } from 'plugins-methods'
import store from '@/store'

const axios = new HttpRequest(config.baseUrl)
const dispatchRequest = (url, method, dataset = {}) => {
  const param = {
    url: url,
    method: method,
    [method === 'get' ? 'params' : 'data']: dataset,
    paramsSerializer: params => qs.stringify(params)
  }
  let needToken = false
  publicPath.map((path) => {
    needToken = needToken || path.test(config.url)
  })
  const token = store.state.user.token
  if (!needToken && token) {
    param.headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      'cached-control': 'no-cache'
    }
  }
  return axios.request(param)
}

export { axios, dispatchRequest }
