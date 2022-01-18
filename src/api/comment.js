import Dispatch from '@/libs/axios/dispatch'

export const commentDispatch = new Dispatch({
  mCreate: ['/comment/mCreate', 'post'], // 评论创建
  update: ['/comment/update', 'post'], // 评论更新
  setLike: ['/comment/setLike', 'post'] // 点赞&&取消点赞
})
