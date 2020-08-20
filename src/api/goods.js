import request from '@/utils/request'

export function getGoods(params) {
  return request({
    url: '/goods/list',
    method: 'get',
    params
  })
}

export function getGoodsDetail(id) {
  return request({
    url: `/goods/list/${id}`,
    method: 'get'
  })
}

export function createGoods(data) {
  return request({
    url: '/goods/list',
    method: 'post',
    data
  })
}

export function updateGoods(data) {
  return request({
    url: '/goods/list',
    method: 'put',
    data
  })
}