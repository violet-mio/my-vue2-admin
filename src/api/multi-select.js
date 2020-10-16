import request from '@/utils/request'

export function getPositionList() {
  return request({
    url: '/position/list',
    method: 'get',
  })
}

export function createPosition(data) {
  return request({
    url: '/position/list',
    method: 'post',
    data
  })
}

export function updatePosition(data) {
  return request({
    url: '/position/list',
    method: 'put',
    data
  })
}


export function getPositionDetail(id) {
  return request({
    url: `/position/${id}`,
    method: 'get'
  })
}

export function getAreaOptions() {
  return request({
    url: `/position/area/options`,
    method: 'get'
  })
}

export function getSecondAreaOptions(id) {
  return request({
    url: `/position/second-area/options`,
    method: 'get',
    params: { id }
  })
}

export function getServiceOptions(id) {
  return request({
    url: `/position/service/options`,
    method: 'get',
    params: { id }
  })
}

