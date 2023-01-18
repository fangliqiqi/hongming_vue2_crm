import request from '@/utils/request'

// 查询用户标签列表
export function listUserlabel(data) {
  return request({
    url: '/hmkj-crm/crmIntermUserlabel/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询用户标签详细
export function getUserlabel(data) {
  return request({
    url: `/hmkj-crm/crmIntermUserlabel/queryDetail?id=${data.id}`,
    method: 'post',
    data:data
  })
}

// 新增用户标签
export function addUserlabel(data) {
  return request({
    url: '/hmkj-crm/crmIntermUserlabel/add',
    method: 'post',
    data: data
  })
}

// 修改用户标签
export function updateUserlabel(data) {
  return request({
    url: '/hmkj-crm/crmIntermUserlabel/update',
    method: 'post',
    data: data
  })
}

// 删除用户标签
export function delUserlabel(data) {
  return request({
    url:` /hmkj-crm/crmIntermUserlabel/delete?id=${data.id}`,
    method: 'post',
    data:data
  })
}

// 导出用户标签
export function exportUserlabel(query) {
  return request({
    url: '/crm/userlabel/export',
    method: 'get',
    params: query
  })
}