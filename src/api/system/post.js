import request from '@/utils/request'

// 查询岗位列表
export function listPost(data) {
  return request({
    url: '/guns-cloud-system/entDuty/queryList',
    method: 'post',
    data: data
  })
}

// 分页查询列表
export function listPostPage(data) {
  return request({
    url: '/guns-cloud-system/entDuty/queryListPage',
    method: 'post',
    data: data,
    params: {pageNo:data.pageNo,pageSize:data.pageSize }
  })
}

// 查询岗位详细
export function getPost(postId) {
  return request({
    url: '/guns-cloud-system/entDuty/detail',
    method: 'get',
    params: {dutyId:postId }
  })
}

// 新增岗位
export function addPost(data) {
  return request({
    url: '/guns-cloud-system/entDuty/add',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data) {
  return request({
    url: '/guns-cloud-system/entDuty/update',
    method: 'post',
    data: data
  })
}

// 删除岗位
export function delPost(data) {
  return request({
    url: '/guns-cloud-system/entDuty/delete',
    method: 'post',
    data: data
  })
}


// 禁用启用
export function changeStatusPost(data) {
  return request({
    url: '/guns-cloud-system/entDuty/changeStatus',
    method: 'get',
    params: data
  })
}

