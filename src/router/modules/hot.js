export default [
  {
    path: '/hot',
    name: 'hot',
    component: require(/* webpackChunkName: 'hot' */ '@/views/hot/hot/index').default,
    props: true,
    redirect: '/hot/hotPost', // 修复默认路由
    children: [
      {
        path: 'hotPost',
        name: 'hotPost',
        component: require(/* webpackChunkName: 'hotPost' */ '@/views/hot/post/index').default
      },
      {
        path: 'hotComment',
        name: 'hotComment',
        component: require(/* webpackChunkName: 'hotComment' */ '@/views/hot/comment/index').default
      },
      {
        path: 'hotSign',
        name: 'hotSign',
        component: require(/* webpackChunkName: 'hotSign' */ '@/views/hot/sign/index').default
      }
    ]
  }
]
