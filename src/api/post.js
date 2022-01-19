import Dispatch from '@/libs/axios/dispatch'
import axios from '@/libs/axios'
import qs from 'qs'

export const postDispatch = new Dispatch({
  mCreate: ['/post/mCreate', 'post'], // 发表帖子
  update: ['/post/update', 'post'], // 编辑帖子
  delete: ['/post/delete', 'post'], // 删除帖子
  historyDelete: ['/post/historyDelete', 'post'] // 删除帖子
})

// 我的帖子列表
export const postMyPost = (params) => axios.get('/post/myPost?' + qs.stringify(params))

// 帖子浏览记录
export const postHistory = (params) => axios.get('/post/history?' + qs.stringify(params))
