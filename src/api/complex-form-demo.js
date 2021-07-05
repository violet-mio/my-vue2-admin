import request from '@/utils/request'

export function getComplexFormList(params) {
  return request({
    url: '/complex-form-demo/list',
    params
  })
}

export function createComplexForm(data) {
  return request({
    url: '/complex-form-demo/add',
    method: 'post',
    data
  })
}

export function updateCompleForm(data) {
  return request({
    url: `/complex-form-demo/update`,
    method: 'put',
    data
  })
}

export function getComplexForm(params) {
  return request({
    url: '/complex-form-demo/detail',
    params
  })
}

export function getAdTypes(params) {
  return request({
    url: '/complex-form-demo/adtype/options',
    params
  })
}

export function getAdSpecs(params) {
  return request({
    url: '/complex-form-demo/adspec/options',
    params
  })
}
