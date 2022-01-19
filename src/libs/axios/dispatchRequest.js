import HttpRequest from '../axios/HttpRequest'
import config from '../axios/config'
import qs from 'qs'
import needToken from './needToken'

const axios = new HttpRequest(config.baseUrl)
const dispatchRequest = (url, method, dataset = {}) => {
  const param = {
    url, method, [method === 'get' ? 'params' : 'data']: dataset, paramsSerializer: params => qs.stringify(params)
  }
  const token = needToken(url)
  if (token) {
    param.headers = {
      Authorization: token, 'Content-Type': 'application/json', 'cached-control': 'no-cache'
    }
  }
  return axios.request(param)
}

export { axios, dispatchRequest }
