import request from '@/utils/request'

// 查询部门列表
export function listDept(query) {
  return request({
    url: '/guns-cloud-system/entDept/queryList',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(query) {
  return request({
    url: '/guns-cloud-system/entDept/detail',
    method: 'get',
    params:query
  })
}

// 查询部门下拉树结构
export function treeselect(query) {
  return request({
    url: '/guns-cloud-system/entDept/queryDeptTree',
    method: 'get',
    params:query
  })
}

// 根据角色ID查询部门树结构
export function changeDeptStatus(query) {
  return request({
    url: '/guns-cloud-system/entDept/changeStatus',
    method: 'get',
    params:query
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/guns-cloud-system/entDept/add',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/guns-cloud-system/entDept/update',
    method: 'post',
    data: data
  })
}

// 删除部门
export function delDept(data) {
  return request({
    url: '/guns-cloud-system/entDept/delete',
    method: 'post',
    data: data
  })
}
