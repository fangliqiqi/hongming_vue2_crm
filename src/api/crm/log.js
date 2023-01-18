import request from '@/utils/request'

// 查询日志列表
export function listLog(data) {
  return request({
    url: '/hmkj-crm/crmIntermLogin/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询日志详细
export function getLog(data) {
  return request({
    url: `/hmkj-crm/crmIntermLogin/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增日志
export function addLog(data) {
  return request({
    url: '/hmkj-crm/crmIntermLogin/add',
    method: 'post',
    data: data
  })
}

// 修改日志
export function updateLog(data) {
  return request({
    url: '/hmkj-crm/crmIntermLogin/update',
    method: 'post',
    data: data
  })
}

// 删除日志
export function delLog(data) {
  return request({
    url: `/hmkj-crm/crmIntermLogin/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出日志
export function exportLog(query) {
  return request({
    url: '/crm/login/export',
    method: 'get',
    params: query
  })
}