import request from '@/utils/request'

// 查询职位职级名称列表
export function listPosition(data) {
  return request({
    url: '/hmkj-crm/crmIntermPosition/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询职位职级名称详细
export function getPosition(data) {
  return request({
    url: `/hmkj-crm/crmIntermPosition/queryDetail?id=${data.id}` ,
    method: 'post',
    data: data
  })
}

// 新增职位职级名称
export function addPosition(data) {
  return request({
    url: '/hmkj-crm/crmIntermPosition/add',
    method: 'post',
    data: data
  })
}

// 修改职位职级名称
export function updatePosition(data) {
  return request({
    url: '/crmIntermPosition/update',
    method: 'post',
    data: data
  })
}

// 删除职位职级名称
export function delPosition(data) {
  return request({
    url:`/hmkj-crm/crmIntermPosition/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出职位职级名称
export function exportPosition(query) {
  return request({
    url: '/share/position/export',
    method: 'get',
    params: query
  })
}