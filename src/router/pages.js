// 前台页面路由
export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/index'),
    hidden: true,
    meta: { noLogin: true, title: '首页' }
  },
  {
    path: '/home-info',
    name: 'HomeInfo',
    component: () => import('@/pages/home-info/index'),
    hidden: true,
    meta: { noLogin: true, title: '消息中心' }
  }
]

