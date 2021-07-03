import request from '@/utils/request'

export function getComplexFormList(params) {
  return request({
    url: '/complex-form-demo/list',
    params
  })
}
