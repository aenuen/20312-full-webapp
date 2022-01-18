export default [ // 详情页
  {
    path: '/detail/:pid',
    name: 'detail',
    props: true,
    component: require(/* webpackChunkName: 'detail' */ '@/views/detail').default
  }
]
