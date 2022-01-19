import axios from '@/libs/axios'
import qs from 'qs'
import store from '@/store'
import Dispatch from '@/libs/axios/dispatch'

export const publicDispatch = new Dispatch({
  captcha: ['/public/captcha', 'get'], // 验证码图片
  postList: ['/public/postList', 'get'], // 帖子列表
  postTopWeek: ['/public/postTopWeek', 'get'], // 周热议列表
  linkList: ['/public/linkList', 'get'], // 链接列表
  commentLately: ['/public/commentLately', 'get'], // 链接列表
  postHot: ['/public/postHot', 'get'], // 热门帖子
  commentHot: ['/public/commentHot', 'get'], // 热门评论
  signHot: ['/public/signHot', 'get'] // 热门签到
})

// 帖子详情
export const publicPostDetail = (params) => {
  const token = store.state.user.token
  const headers = token ? { headers: { Authorization: 'Bearer ' + token } } : {}
  return axios.get('/public/postDetail?' + qs.stringify(params), headers)
}

// 帖子评论列表
export const publicCommentList = (params) => axios.get('/public/commentList?' + qs.stringify(params))
