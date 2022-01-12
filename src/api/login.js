import axios from '@/utils/axios'

// 发送找回密码的邮件
export const loginFindCode = (option) => axios.post('/login/findCode', { ...option })

// 找回密码
export const loginFindPassword = (option) => axios.post('/login/findPassword', { ...option })

// 登录
export const loginSignIn = (loginInfo) => axios.post('/login/signIn', { ...loginInfo })

// 注册
export const loginSignUp = (registerInfo) => axios.post('/login/signUp', { ...registerInfo })
