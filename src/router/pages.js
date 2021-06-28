import PagesContainerLayout from '@/PagesContainer'

import Home from '@/pages/home/index'
import HomeInfo from '@/pages/home-info/index'

// 前台页面路由
const pagesRoutes = {
  path: '/',
  component: PagesContainerLayout,
  // redirect: { name: 'Home' },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      hidden: true,
      meta: { noLogin: true, title: '首页' }
    },
    {
      path: '/home-info',
      name: 'HomeInfo',
      component: HomeInfo,
      hidden: true,
      meta: { noLogin: true, title: '消息中心' }
    }
  ]
}

export default pagesRoutes
