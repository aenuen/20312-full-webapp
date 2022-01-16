import { SET_HIDE, SET_ISLOGIN, SET_MSG, SET_SID, SET_TOKEN, SET_USER } from '@/store/mutation-types'
import { publicCaptcha } from '@/api/public'
import { loginSignIn } from '@/api/login'
import { v4 as uuid } from 'uuid'
import { updateUserInfo, userSign } from '@/api/user'

export default {
  namespaced: true,
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isHide: false
  },
  mutations: {
    [SET_SID] (state, value) { // 设置SID
      state.sid = value
    },
    [SET_TOKEN] (state, value) { // 设置TOKEN
      state.token = value
      localStorage.setItem('token', value)
    },
    [SET_USER] (state, value) { // 设置用户的基本信息
      if (value === '') return
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(value)) // 存储用户的基本信息
    },
    [SET_ISLOGIN] (state, value) { // 设置isLogin的状态
      state.isLogin = value
    },
    [SET_HIDE] (state, value) { // 设置container的状态
      state.isHide = value
    },
    [SET_MSG] (state, value) { // 设置消息
      state.num = value
    }
  },
  getters: {
    user: (state) => state.userInfo,
    isLogin: (state) => state.isLogin,
    token: (state) => state.token,
    sid: (state) => state.sid,
    isHide: (state) => state.isHide
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    },
    async captcha ({ commit }) { // 获取图片验证码
      let sid = ''
      if (localStorage.getItem('sid')) {
        sid = localStorage.getItem('sid')
      } else {
        sid = uuid()
        localStorage.setItem('sid', sid)
      }
      commit('SET_SID', sid) // 更改app中的sid，全局vuex
      return publicCaptcha(sid)
    },
    async login ({ commit, state }, payload) { // 登录
      const result = await loginSignIn({
        ...payload,
        sid: state.sid
      })
      const { code, data, token } = result
      if (code === 200 && token) {
        data.email = payload.email
        commit('SET_TOKEN', token)
        commit('SET_USER', data)
        commit('SET_ISLOGIN', true)
      }
      return result
    },
    // 签到
    async signX ({ commit, state }) {
      const { userInfo } = state
      const result = await userSign()
      const { integral, count, lastSign } = result
      userInfo.integral = integral
      userInfo.count = count
      userInfo.lastSign = lastSign
      userInfo.isSign = true
      commit(SET_USER, userInfo)
      return result
    },
    // 更新用户信息
    async updateUserInfoX ({ commit, state }, form) {
      const result = await updateUserInfo(form)
      const { code } = result
      if (code === 200) {
        const { userInfo } = state
        Object.keys(form).forEach(key => {
          userInfo[key] = form[key]
        })
        commit(SET_USER, userInfo) // 更新本地缓存中的 userInfo
      }
      return result
    }
  }
}
