import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import moment from 'dayjs'
import { INIT_WEBSOCKET, SET_ISLOGIN, SET_TOKEN, SET_USER } from '@/store/mutation-types'
import { MessageBox } from 'mint-ui'

import detailRouter from './modules/detail'
import errorPageRouter from './modules/errorPage'
import homeRouter from './modules/home'
import hotRouter from './modules/hot'
import loginRouter from './modules/login'
import msgRouter from './modules/msg'
import newPostRouter from './modules/newPost'
import UserRouter from './modules/user'

Vue.use(VueRouter)

const routes = [
  ...detailRouter,
  ...errorPageRouter,
  ...homeRouter,
  ...hotRouter,
  ...loginRouter,
  ...msgRouter,
  ...newPostRouter,
  ...UserRouter
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active'
})

// 1. 基于角色的路由守卫
// 2. 组件级的权限控制 -> directive

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    // method 1
    // const payload = jwt.decode(token)
    // method 2
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 取localStorage里面缓存的token信息 + 用户信息
      // 8-24小时， refresh token 1个月
      store.commit('user/' + SET_TOKEN, token)
      store.commit('user/' + SET_USER, userInfo)
      store.commit('user/' + SET_ISLOGIN, true)
      if (!store.state.ws) {
        store.commit(INIT_WEBSOCKET, {})
      }
    } else {
      localStorage.clear()
    }
  }
  // to and from are Route Object,next() must be called to resolve the hook
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isLogin = store.state.user.isLogin
    // 需要用户登录的页面进行区别
    if (isLogin) {
      // 已经登录的状态
      // 权限判断，meta元数据
      next()
    } else {
      MessageBox.confirm('您还未登录，需要登录吗？').then((action) => {
        next('/signIn')
      }).catch((cancel) => {
      })
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
