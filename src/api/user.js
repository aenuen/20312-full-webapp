import Dispatch from '@/libs/axios/dispatch'

export const userDispatch = new Dispatch({
  password: ['/user/password', 'post'], // 更新密码
  sign: ['/user/sign', 'post'], // 用户签到
  info: ['/user/info', 'post'], // 用户信息
  basic: ['/user/basic', 'post'], // 更新用户基本资料
  email: ['/user/email', 'post'], // 更新用户电子邮箱
  avatar: ['/user/avatar', 'post'], // 更新用户头像
  count: ['/user/count', 'get'] // 用户统计
})
