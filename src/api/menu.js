import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/guns-cloud-system/menu/getLeftMenuList',
    method: 'get'
  })
}
//获取父级菜单列表
export function getSelectMenuTreeList(data) {
  return request({
    url: '/guns-cloud-system/menu/getSelectMenuTreeList',
    method: 'get',
    params:data
  })
}

//获取资源下拉列表
export function getResourceSelectList(data) {
  return request({
    url: '/guns-cloud-system/resource/getResourceSelectList',
    method: 'get',
    params:data
  })
}
// 获取资源列表
export function getResourceList(data) {
  return request({
    url: '/guns-cloud-system/resource/list',
    method: 'get',
    params:data
  })
}


