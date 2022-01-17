import HttpRequest from './HttpRequest'
import config from './config'

const axios = new HttpRequest(config.baseUrl)

export default axios
