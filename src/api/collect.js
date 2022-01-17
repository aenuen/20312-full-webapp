import axios from '@/libs/axios'
import qs from 'qs'
import Dispatch from '@/libs/axios/dispatch'

// 收藏列表
export const collectList = (params) => axios.get(`/collect/list?${qs.stringify(params)}`)

export const collectDispatch = new Dispatch({
  toggle: ['/collect/toggle', 'post'] // 收藏&&取消收藏
})
