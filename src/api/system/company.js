import request from '@/utils/request'

// 分页查询列表
export function listCompanyPage(query) {
  return request({
    url: '/guns-cloud-system/entCompany/queryListPage',
    method: 'get',
    params: query
  })
}

// 查询公司列表
export function listCompany(data) {
  return request({
    url: '/guns-cloud-system/entCompany/queryList',
    method: 'post',
    data: data
  })
}

// 获取公司详情
export function getCompany(id) {
  return request({
    url: '/guns-cloud-system/entCompany/detail',
    method: 'get',
    params: {companyId:id}
  })
}

// 查询公司树
export function treeCompanySelect(data) {
  return request({
    url: '/guns-cloud-system/entCompany/queryCompTree',
    method: 'get',
    params: data
  })
}

// 新增部门
export function addCompany(data) {
  return request({
    url: '/guns-cloud-system/entCompany/add',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateCompany(data) {
  return request({
    url: '/guns-cloud-system/entCompany/update',
    method: 'post',
    data: data
  })
}

// 删除公司
export function delCompany(data) {
  return request({
    url: '/guns-cloud-system/entCompany/delete',
    method: 'post',
    data:data
  })
}

// 新增部门
export function changeCompanyStatus(data) {
  return request({
    url: '/guns-cloud-system/entCompany/changeStatus',
    method: 'get',
    params: data
  })
}
//校验公司名称是否存在
export function checkCompanyName(data) {
  return request({
    url:'/guns-cloud-system/entCompany/checkName',
    method: 'get',
    params: data
  })

}


//公司员工列表
export function getCompanyUserList(data) {
  return request({
    url:'/guns-cloud-system/entCompany/queryCompanyUserList',
    method: 'post',
    params: data
  })

}
