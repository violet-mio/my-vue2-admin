import Layout from '@/layout'
import { SORT_NO_ENUM } from '../constant'

export default {
  path: '/example',
  component: Layout,
  name: 'Example',
  meta: { title: 'Example', icon: 'el-icon-s-help' },
  redirect: { name: 'Table' },
  sortNo: SORT_NO_ENUM.TWO,

  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: { title: 'Table', icon: 'table' }
    },
    {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/tree/index'),
      meta: { title: 'Tree', icon: 'tree' }
    }
  ]
}