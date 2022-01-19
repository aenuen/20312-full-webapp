export default [
  {
    path: '',
    name: 'home',
    redirect: '/index', // 修复默认路由
    component: require(/* webpackChunkName: 'home' */ '@/views/home').default,
    children: [
      {
        path: '/index',
        name: 'index',
        component: require(/* webpackChunkName: 'catalog' */ '@/views/home/catalog.vue').default
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        props: true,
        component: require(/* webpackChunkName: 'catalog' */ '@/views/home/catalog.vue').default
      }
    ]
  }
]
