export default [
  { // 用户中心
    path: '/user',
    name: 'user',
    component: require(/* webpackChunkName: 'user' */ '@/views/user/user/index').default
  },
  { // 修改设置
    path: '/passwd',
    name: 'passwd',
    meta: { requiresAuth: true },
    component: require(/* webpackChunkName: 'passwd' */ '@/views/user/passwd').default
  },
  { // 修改设置
    path: '/settings',
    name: 'settings',
    meta: { requiresAuth: true },
    component: require(/* webpackChunkName: 'settings' */ '@/views/user/settings').default
  },
  { // 个人主页
    path: '/center',
    name: 'center',
    meta: { requiresAuth: true },
    component: require(/* webpackChunkName: 'center' */ '@/views/user/center/index').default
  },
  { // 签到中心
    path: '/sign',
    name: 'sign',
    meta: { requiresAuth: true },
    component: require(/* webpackChunkName: 'sign' */ '@/views/user/sign/index').default
  },
  { // 我的收藏
    path: '/myCollect',
    name: 'myCollect',
    meta: { requiresAuth: true },
    component: require(/* webpackChunkName: 'myCollect' */ '@/views/user/myCollect').default
  },
  { // 我的帖子
    path: '/myPost',
    name: 'myPost',
    meta: { requiresAuth: true },
    component: require(/* webpackChunkName: 'myPost' */ '@/views/user/myPost/index').default
  },
  { // 我的浏览记录
    path: '/myHistory',
    name: 'myHistory',
    meta: { requiresAuth: true },
    component: require(/* webpackChunkName: 'myHistory' */ '@/views/user/myhistory').default
  }
]
