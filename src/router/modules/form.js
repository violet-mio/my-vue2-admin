import Layout from '@/layout'
import { SORT_NO_ENUM } from '../constant'

export default   {
  path: '/form',
  component: Layout,
  redirect: { name: 'Form' },
  sortNo: SORT_NO_ENUM.THREE,

  children: [
    {
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: { title: 'Form', icon: 'form' }
    }
  ]
}