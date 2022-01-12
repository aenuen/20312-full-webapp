import HttpRequest from './HttpRequest'
import { axiosConfig } from '@/config'

const axios = new HttpRequest(axiosConfig.baseUrl)

export default axios
