import request from '@/utils/request'

// 查询个体户基本信息列表
export function listRegistered(data) {
  return request({
    url: '/hmkj-crm/marketPeopleRegistered/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询个体户基本信息详细
export function getRegistered(data) {
  return request({
    url: `/hmkj-crm/marketPeopleRegistered/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增个体户基本信息
export function addRegistered(data) {
  return request({
    url: '/hmkj-crm/marketPeopleRegistered/add',
    method: 'post',
    data: data
  })
}

// 修改个体户基本信息
export function updateRegistered(data) {
  return request({
    url: '/hmkj-crm/marketPeopleRegistered/update',
    method: 'post',
    data: data
  })
}

// 删除个体户基本信息
export function delRegistered(data) {
  return request({
    url: `/hmkj-crm/marketPeopleRegistered/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出个体户基本信息
export function exportRegistered(query) {
  return request({
    url: '/share/registered/export',
    method: 'get',
    params: query
  })
}