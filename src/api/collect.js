import axios from '@/utils/axios'
import qs from 'qs'

// 设置收藏 & 取消收藏
export const collectToggle = (data) => axios.post('/collect/toggle', data)

// 收藏列表
export const collectList = (params) => axios.get(`/collect/list?${qs.stringify(params)}`)
