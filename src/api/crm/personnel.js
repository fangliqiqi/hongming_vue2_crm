import request from '@/utils/request'

// 查询公司人员信息列表
export function listPersonnel(data) {
  return request({
    url: '/hmkj-crm/marketCompanyPersonnel/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询公司人员信息详细
export function getPersonnel(data) {
  return request({
    url:  `/hmkj-crm/marketCompanyPersonnel/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增公司人员信息
export function addPersonnel(data) {
  return request({
    url: '/hmkj-crm/marketCompanyPersonnel/add',
    method: 'post',
    data: data
  })
}

// 修改公司人员信息
export function updatePersonnel(data) {
  return request({
    url: '/hmkj-crm/marketCompanyPersonnel/update',
    method: 'post',
    data: data
  })
}

// 删除公司人员信息
export function delPersonnel(data) {
  return request({
    url:  `/hmkj-crm/marketCompanyPersonnel/delete?id=${data.id}&companyId=${data.companyId}`,
    method: 'post',
    data: data
  })
}

// 导出公司人员信息
export function exportPersonnel(query) {
  return request({
    url: '/share/personnel/export',
    method: 'get',
    params: query
  })
}