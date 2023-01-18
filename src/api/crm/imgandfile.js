import request from '@/utils/request'

// 查询图片资料资源列表
export function listImgandfile(data) {
  return request({
    url: '/hmkj-crm/share/imgandfile/list',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询图片资料资源详细
export function getImgandfile(data) {
  return request({
    url: `/hmkj-crm/share/imgandfile?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增图片资料资源
export function addImgandfile(data) {
  return request({
    url: '/hmkj-crm/share/imgandfile',
    method: 'post',
    data: data
  })
}

// 修改图片资料资源
export function updateImgandfile(data) {
  return request({
    url: '/hmkj-crm/share/imgandfile',
    method: 'post',
    data: data
  })
}

// 删除图片资料资源
export function delImgandfile(data) {
  return request({
    url: `/hmkj-crm/share/imgandfile?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出图片资料资源
export function exportImgandfile(query) {
  return request({
    url: '/share/imgandfile/export',
    method: 'get',
    params: query
  })
}