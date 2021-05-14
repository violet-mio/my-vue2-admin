import Layout from '@/layout'
import { SORT_NO_ENUM } from '../constant'

export default {
  path: '/charts',
  component: Layout,
  alwaysShow: true,
  meta: { title: 'Charts', icon: 'chart' },
  redirect: { name: 'LineCharts' },
  sortNo: SORT_NO_ENUM.NINE,

  children: [
    {
      path: 'line-charts',
      name: 'LineCharts',
      component: () => import('@/views/charts/line-charts'),
      meta: { title: 'LineCharts' }
    }
  ]
}