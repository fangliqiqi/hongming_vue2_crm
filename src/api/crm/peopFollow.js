import request from '@/utils/request'

// 查询个人业务工单跟进记录列表
export function listFollow(data) {
  return request({
    url: '/hmkj-crm/marketPeopbusirFollow/queryListPage',
    method: 'post',
    data: data
  })
}

// 查询个人业务工单跟进记录详细
export function getFollow(data) {
  return request({
    url: `/hmkj-crm/marketPeopbusirFollow/queryDetail?id=${data.id}`,
    method: 'get'
  })
}

// 新增个人业务工单跟进记录
export function addFollow(data) {
  return request({
    url: '/hmkj-crm/marketPeopbusirFollow/add',
    method: 'post',
    data: data
  })
}

// 修改个人业务工单跟进记录
export function updateFollow(data) {
  return request({
    url: '/hmkj-crm/marketPeopbusirFollow/update',
    method: 'post',
    data: data
  })
}

// 删除个人业务工单跟进记录
export function delFollow(data) {
  return request({
    url: `/hmkj-crm/marketPeopbusirFollow/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出个人业务工单跟进记录
export function exportFollow(query) {
  return request({
    url: '/share/follow/export',
    method: 'get',
    params: query
  })
}