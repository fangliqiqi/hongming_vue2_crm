import request from '@/utils/request'

// 查询信息列表
export function CompanyBusir(data) {
  return request({
    url: '/hmkj-crm/dispatchMarketCompanyBusir/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

//分配查询部门
export function entDept(data) {
  return request({
    url: '/guns-cloud-system/entDept/queryList',
    method: 'post',
    data: data,
  })
}

//根据部门获取用户下拉列表
export function entUser(query) {
  return request({
   url: '/guns-cloud-system/entUser/findUserList',
   method: 'get',
   params: query,
})
}

//分配
export function allocation(data) {
  return request({
   url: '/hmkj-crm/dispatchMarketCompanyBusir/allocation',
   method: 'post',
   data: data,
})
}

//审核
export function audit(query) {
  return request({
   url: '/hmkj-crm/dispatchMarketCompanyBusir/audit',
   method: 'get',
   params: query,
})
}

//查询审核详情
export function auditDetails(query) {
  return request({
   url: '/hmkj-crm/dispatchMarketCompanyBusir/auditDetails',
   method: 'get',
   params: query,
})
}

// 获取移交接收人员信息
export function companyTreeByRole(data) {
  return request({
   url: '/guns-cloud-system/entCompany/companyTreeByRole',
   method: 'post',
   data: data,
})
}

// 移交操作

export function transfer(query) {
  return request({
   url: '/hmkj-crm/dispatchMarketCompanyBusir/transfer',
   method: 'get',
   params: query,
})
}
