import Layout from '@/layout'
import { SORT_NO_ENUM } from '../constant'

export default {
  path: '/upload-video',
  component: Layout,
  redirect: { name: 'UploadVideo' },
  sortNo: SORT_NO_ENUM.FOUR,

  children: [
    {
      path: 'index',
      name: 'UploadVideo',
      component: () => import('@/views/upload-video/index'),
      meta: { title: 'UploadVideo', icon: 'el-icon-video-camera-solid' }
    }
  ]
}