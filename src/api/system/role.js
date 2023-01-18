import request from '@/utils/request'

// 查询角色列表
export function listRolePage(query) {
  return request({
    url: '/guns-cloud-system/role/page',
    method: 'post',
    data: query,
    params:{pageNo:query.pageNum,pageSize:query.pageSize}
  })
}
// 查询角色列表
export function listRole(query) {
  return request({
    url: '/guns-cloud-system/role/list',
    method: 'get',
    params: query
  })
}
// 查询角色详细
export function getRole(data) {
  return request({
    url: '/guns-cloud-system/role/detail',
    method: 'get',
    params:data
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/guns-cloud-system/role/add',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/guns-cloud-system/role/update',
    method: 'post',
    data: data
  })
}

// 查询角色分配的权限
export function dataScope(data) {
  return request({
    url: '/guns-cloud-system/role/permissions',
    method: 'get',
    params: data
  })
}

// 获取用户所有资源列表
export function dataAllScope() {
  return request({
    url: '/guns-cloud-system/role/getAllResPermissions',
    method: 'get',
  })
}

// 获取用户所有资源的url列表
export function dataAllScopeUrl() {
  return request({
    url: '/guns-cloud-system/role/getAllResPermissionUrls',
    method: 'get',
  })
}

// 角色状态修改
export function changeRoleStatus(data) {
  return request({
    url: '/guns-cloud-system/role/status',
    method: 'post',
    data: data
  })
}

// 删除角色
export function delRole(data) {
  return request({
    url: '/guns-cloud-system/role/delete',
    method: 'post',
    data: data
  })
}

// 门店删除默认角色
export function branchDelRole(data) {
  return request({
    url: '/guns-cloud-system/role/branchDeleteRole',
    method: 'post',
    data: data
  })
}

//校验角色名称,参数:roleId,branchId,roleName
export function checkName(data) {
  return request({
    url: '/guns-cloud-system/role/validate/name',
    method: 'post',
    data: data
  })
}

//校验角色编码
export function checkCode(data) {
  return request({
    url: '/guns-cloud-system/role/validate/code',
    method: 'post',
    data: data
  })
}

//查询个人角色信息
export function checkUserCode(accountId) {
  let query = {
    accountId:accountId
  }
  return request({
    url: '/guns-cloud-system/role/selectRoleByAccountId',
    method: 'get',
    params: query
  })
}

//获取权限资源列表
export function getResourceList4Permission(appId,roleId) {
  let query = {
    appId:appId,
    roleId:roleId
  }
  return request({
    url: '/guns-cloud-system/permission/getResourceList4Permission',
    method: 'get',
    params: query
  })
}

//获取权限资源列表
export function permissionBindResource(jsonObject) {
  return request({
    url: '/guns-cloud-system/permission/permissionBindResource',
    method: 'post',
    data: jsonObject
  })
}
