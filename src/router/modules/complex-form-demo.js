import Layout from '@/layout'
import { SORT_NO_ENUM } from '../constant'

export default {
  path: '/complex-form-demo',
  component: Layout,
  meta: { title: '复杂表单', icon: 'table' },
  redirect: { name: 'ComplexFormList' },
  sortNo: SORT_NO_ENUM.EIGHT,

  children: [
    {
      path: 'list',
      name: 'ComplexFormList',
      component: () => import('@/views/complex-form-demo/index'),
      meta: { title: '复杂表单列表', icon: 'list' }
    },
    {
      path: 'add',
      name: 'AddComplexForm',
      hidden: true,
      component: () => import('@/views/complex-form-demo/add'),
      meta: { title: '新增复杂表单', icon: 'add', noCache: true }
    },
    {
      path: 'edit',
      name: 'EditComplexForm',
      hidden: true,
      component: () => import('@/views/complex-form-demo/edit'),
      meta: { title: '编辑复杂表单', icon: 'edit', noCache: true }
    }
  ]
}
