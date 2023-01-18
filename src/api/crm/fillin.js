import request from '@/utils/request'

// 查询工单补款记录列表
export function listFillin(data) {
  return request({
    url: '/hmkj-crm/marketBusirecordFillin/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询工单补款记录详细
export function getFillin(data) {
  return request({
    url: `/hmkj-crm/marketBusirecordFillin/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增工单补款记录
export function addFillin(data) {
  return request({
    url: '/hmkj-crm/marketBusirecordFillin/add',
    method: 'post',
    data: data
  })
}

// 修改工单补款记录
export function updateFillin(data) {
  return request({
    url: '/hmkj-crm/marketBusirecordFillin/update',
    method: 'post',
    data: data
  })
}

// 删除工单补款记录
export function delFillin(query) {
  return request({
    url:`/hmkj-crm/marketBusirecordFillin/delete?id=${query.id}`,
    method: 'get',
  
  })
}

// 导出工单补款记录
export function exportFillin(query) {
  return request({
    url: '/share/fillin/export',
    method: 'get',
    params: query
  })
}