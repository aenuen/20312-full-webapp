import Dispatch from '@/libs/axios/dispatch'
import axios from '@/libs/axios'
import qs from 'qs'

export const postDispatch = new Dispatch({
  mCreate: ['/post/mCreate', 'post'], // 发表帖子
  update: ['/post/update', 'post'], // 编辑帖子
  delete: ['/post/delete', 'post'], // 删除帖子
  history: ['/post/history', 'get'] // 浏览记录
})

// 我的帖子列表
export const postMyPost = (data) => axios.get('/post/myPost?' + qs.stringify(data))
