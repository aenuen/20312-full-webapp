export default [
  {
    path: '/hot',
    name: 'hot',
    component: import(/* webpackChunkName: 'hot' */ '@/views/hot'),
    props: true,
    redirect: '/hot/hotPost', // 修复默认路由
    children: [
      {
        path: 'hotPost',
        name: 'hotPost',
        component: require(/* webpackChunkName: 'hotPost' */ '@/views/hot/post').default
      },
      {
        path: 'hotComment',
        name: 'hotComment',
        component: require(/* webpackChunkName: 'hotComment' */ '@/views/hot/comments').default
      },
      {
        path: 'hotSign',
        name: 'hotSign',
        component: require(/* webpackChunkName: 'hotSign' */ '@/views/hot/sign').default
      }
    ]
  }
]
