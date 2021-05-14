import Layout from '@/layout'
import { SORT_NO_ENUM } from '../constant'

export default   {
  path: 'external-link',
  component: Layout,
  redirect: { name: 'UploadVideo' },
  sortNo: SORT_NO_ENUM.SIX,

  children: [
    {
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: { title: 'External Link', icon: 'link' }
    }
  ]
}