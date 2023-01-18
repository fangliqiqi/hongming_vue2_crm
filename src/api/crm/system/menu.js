import request from '@/utils/request'

// 查询菜单列表
export function listMenu(query) {
  return request({
    url: '/guns-cloud-system/menu/list',
    method: 'post',
    params: query,
    data:query
  })
}

// 查询菜单详细
export function getMenu(query) {
  return request({
    url: '/guns-cloud-system/menu/getMenuDetail',
    method: 'get',
    params:query
  })
}

// e
export function treeselect() {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/guns-cloud-system/menu/add',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/guns-cloud-system/menu/update',
    method: 'post',
    data: data
  })
}

// 删除菜单
export function delMenu(data) {
  return request({
    url: '/guns-cloud-system/menu/delete',
    method: 'get',
    params:data
  })
}
//启用禁用菜单
export function changeStatus(data) {
  return request({
    url: '/guns-cloud-system/menu/changeStatus',
    method: 'get',
    params:data
  })
}
