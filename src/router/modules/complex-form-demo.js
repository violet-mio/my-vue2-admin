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
    }
  ]
}
