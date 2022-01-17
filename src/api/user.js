import axios from '@/libs/axios'
import qs from 'qs'

// 用户签到
export const userSign = () => axios.get('/user/sign')

// 用户统计
export const userCount = (params) => axios.get(`/user/count?${qs.stringify(params)}`)

// 用户信息
export const userInfo = (params) => axios.get('/user/info?' + qs.stringify(params))

// 更新用户基本资料
export const userBasic = (data) => axios.post('/user/basic', data)

// 更新用户电子邮箱
export const userEmail = (data) => axios.post('/user/email', data)

// 更新用户头像
export const userAvatar = (data) => axios.post('/user/avatar', data)

// 更新用户基本资料
export const updateUserInfo = (data) => axios.post('/user/basic', data)

// 确认修改用户名
export const updateUsername = (data) => axios.get('/public/resetEmail?' + qs.stringify(data))

// 修改用户密码
export const changePasswd = (data) => axios.post('/user/changePassword', { ...data })

// 获取收藏列表
export const getCollect = (data) => axios.get('/user/collect?' + qs.stringify(data))

// 获取发表的文章列表
export const getPostListByUid = (data) => axios.get('/user/post?' + qs.stringify(data))

// 获取用户最近的发表文章列表
export const getPostPublic = (data) => axios.get('/public/latestPost?' + qs.stringify(data))

// 删除指定文章列表
export const deletePostByUid = (data) => axios.get('/user/deletePost?' + qs.stringify(data))

// 获取用户的基本信息
export const getInfo = (data) => axios.get('/public/info?' + qs.stringify(data))

// 获取用户最近评论列表
export const getCommentList = (data) => axios.get('/public/latestComment?' + qs.stringify(data))

// 获取用户未读消息
export const getMsg = (data) => axios.get('/user/getmsg?' + qs.stringify(data))

// 获取用户未读消息
export const getHands = (data) => axios.get('/user/getHands?' + qs.stringify(data))

// 设置用户未读消息
export const setMsg = (data) => axios.get('/user/setmsg?' + qs.stringify(data))

// 取得用户个人中心的统计信息
export const getMyCount = (data) => axios.get('/user/wxUserCount?' + qs.stringify(data))

// 用户最近动态
export const getMyRecent = (data) => axios.get('/user/wxUserRecent')
