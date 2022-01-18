export default [
  { // 新增帖子
    path: '/newPost',
    name: 'newPost',
    meta: { requiresAuth: true },
    component: require(/* webpackChunkName: 'newPost' */ '@/views/newPost').default
  }
]
