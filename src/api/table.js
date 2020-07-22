import request from '@/utils/request'

export function getTableList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getTableDetail({ id, ...data }) {
  return request({
    url: `/vue-admin-template/table/list/${id}`,
    method: 'get',
    params: data
  })
}

export function updateTable({ id, ...data }) {
  return request({
    url: `/vue-admin-template/table/list/${id}/update`,
    method: 'put',
    params: data
  })
}
