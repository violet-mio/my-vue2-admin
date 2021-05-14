import Layout from '@/layout'
import { SORT_NO_ENUM } from '../constant'

export default   {
  path: '/multi-select',
  component: Layout,
  meta: { title: 'multi-select', icon: 'el-icon-s-marketing' },
  redirect: { name: 'MultiSelectList' },
  sortNo: SORT_NO_ENUM.EIGHT,

  children: [
    {
      path: 'list',
      name: 'MultiSelectList',
      component: () => import('@/views/multi-select/index'),
      meta: { title: 'MultiSelectList', icon: 'list' }
    },
    {
      path: 'add',
      name: 'AddMultiSelectDetail',
      component: () => import('@/views/multi-select/add'),
      meta: { title: 'AddMultiSelectDetail', icon: 'edit', noCache: true },
      hidden: true
    },
    {
      path: 'edit',
      name: 'EditMultiSelectDetail',
      component: () => import('@/views/multi-select/edit'),
      meta: { title: 'EditMultiSelectDetail', icon: 'edit', noCache: true },
      hidden: true
    },
  ]
}
