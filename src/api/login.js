import Dispatch from '@/libs/axios/dispatch'

export default new Dispatch({
  signIn: ['/login/signIn', 'post'], // 登录
  signUp: ['/login/signUp', 'post'], // 注册
  findCode: ['/post/findCode', 'post'], // 找回密码
  findPassword: ['/post/findPassword', 'post'] // 找回密码
})
