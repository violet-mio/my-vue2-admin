import request from '@/utils/request'

export function getWorkbenchNews() {
  return request({
    url: '/workbench/news'
  })
}
