export default [
  { // 404页面
    path: '/404',
    name: '404',
    component: require(/* webpackChunkName: 'user' */ '@/views/errorPage/404/index').default
  },
  { // 找不到相应页面跳转404
    path: '*',
    redirect: '/404'
  }
]
