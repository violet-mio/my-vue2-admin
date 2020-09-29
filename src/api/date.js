import request from '@/utils/request'


export function getDateList() {
  return request({
    url: '/date/list',
    method: 'get'
  })
}
export function getDateDetail() {
  return request({
    url: '/date',
    method: 'get'
  })
}

export function createDate(data) {
  return request({
    url: '/date',
    method: 'post',
    data
  })
}

export function updateDate(data) {
  return request({
    url: '/date',
    method: 'put',
    data
  })
}
