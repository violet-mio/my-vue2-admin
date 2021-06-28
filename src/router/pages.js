import PagesLayout from '@/PagesLayout'

// 前台页面路由
export default {
  path: '/',
  component: PagesLayout,
  children: [{
    path: '/home',
    name: 'Home',
    // 设置别名，代替'/'重定向到/home时, 因为使用'/'重定向到'/home', 无法预渲染/home内容到dist/index.html中
    // 之所以这么做，是想所有前台页面的外层组件都是PagesLayout
    alias: '/',
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
  }]
}
