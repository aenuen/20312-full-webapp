export default [
  {
    path: '/msg/:type',
    name: 'msg',
    props: true,
    meta: { requiresAuth: true },
    component: import(/* webpackChunkName: 'msg' */ '@/views/msg')
  }
]
