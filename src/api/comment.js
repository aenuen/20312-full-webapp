import axios from '@/utils/axios'

// 评论创建
export const commentCreate = (data) => axios.post('/comment/create', data)

export const commentMCreate = (data) => axios.post('/comment/mCreate', data)

// 评论更新
export const commentUpdate = (data) => axios.post('/comment/update', data)

// 设置最佳答案
export const commentSetBest = (data) => axios.post('/comment/setBest', data)

// 点赞/取消点赞
export const commentSetLike = (data) => axios.post('/comment/setLike', data)
