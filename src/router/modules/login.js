export default [
  { // 登录
    path: '/signIn',
    name: 'signIn',
    component: require(/* webpackChunkName: 'signIn' */ '@/views/login/signIn').default
  },
  { // 注册
    path: '/signUp',
    name: 'signUp',
    component: require(/* webpackChunkName: 'signUp' */ '@/views/login/signUp').default
  },
  { // 忘记密码
    path: '/forget',
    name: 'forget',
    component: require(/* webpackChunkName: 'forget' */ '@/views/login/forget').default
  }
]
