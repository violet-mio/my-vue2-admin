import Layout from '@/layout'
import { SORT_NO_ENUM } from '../constant'

export default {
  path: '/goods',
  component: Layout,
  meta: { title: 'Goods', icon: 'table' },
  redirect: { name: 'GoodsList' },
  sortNo: SORT_NO_ENUM.SEVEN,

  children: [
    {
      path: 'list',
      name: 'GoodsList',
      component: () => import('@/views/goods/index'),
      meta: { title: 'GoodsList', icon: 'list' }
    },
    {
      path: 'add',
      name: 'AddGoods',
      component: () => import('@/views/goods/add'),
      meta: { title: 'AddGoods', icon: 'add', noCache: true }
    },
    {
      path: 'edit',
      name: 'EditGoods',
      component: () => import('@/views/goods/edit'),
      meta: { title: 'EditGoods', icon: 'edit', noCache: true },
      hidden: true
    }
  ]
}
