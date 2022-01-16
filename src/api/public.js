import axios from '@/utils/axios'
import qs from 'qs'
import store from '@/store'

// 获取验证码图片
export const publicCaptcha = (sid) => axios.get('/public/captcha', { params: { sid } })

// 获取帖子列表
export const publicPostList = (option) => axios.get('/public/postList?' + qs.stringify(option))

// 获取本周热议列表
export const publicPostTopWeek = () => axios.get('/public/postTopWeek')

// 链接列表
export const publicLinkList = (params) => axios.get('/public/linkList?' + qs.stringify(params))

// 帖子详情
export const publicPostDetail = (params) => {
  const token = store.state.user.token
  const headers = token ? { headers: { Authorization: 'Bearer ' + token } } : {}
  return axios.get('/public/postDetail?' + qs.stringify(params), headers)
}

// 帖子评论列表
export const publicCommentList = (params) => axios.get('/public/commentList?' + qs.stringify(params))

// 最近评论
export const publicCommentLately = (params) => axios.get(`/public/comment/lately?${qs.stringify(params)}`)
