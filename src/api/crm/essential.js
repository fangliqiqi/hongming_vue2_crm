import request from '@/utils/request'

// 查询公司基本信息列表
export function listEssential(data) {
  return request({
    url: '/hmkj-crm/marketCompanyEssential/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询公司基本信息详细
export function getEssential(data) {
  return request({
    url: `/hmkj-crm/marketCompanyEssential/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增公司基本信息
export function addEssential(data) {
  return request({
    url: '/hmkj-crm/marketCompanyEssential/add',
    method: 'post',
    data: data
  })
}

// 修改公司基本信息
export function updateEssential(data) {
  return request({
    url: '/hmkj-crm/marketCompanyEssential/update',
    method: 'post',
    data: data
  })
}

// 删除公司基本信息
export function delEssential(data) {
  return request({
    url: `/hmkj-crm/marketCompanyEssential/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出公司基本信息
export function exportEssential(query) {
  return request({
    url: '/share/essential/export',
    method: 'get',
    params: query
  })
}