import request from '@/utils/request'
//
// 查询公司业务订单附件列表
export function listImgfile(data) {
  return request({
    url: '/hmkj-crm/marketCompbusiImgfile/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询公司业务订单附件详细
export function getImgfile(data) {
  return request({
    url: `/hmkj-crm/marketCompbusiImgfile/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}
//
// 新增公司业务订单附件
export function addImgfile(data) {
  return request({
    url: '/hmkj-crm/marketCompbusiImgfile/add',
    method: 'post',
    data: data
  })
}

// 修改公司业务订单附件
export function updateImgfile(data) {
  return request({
    url: '/hmkj-crm/marketCompbusiImgfile/update',
    method: 'post',
    data: data
  })
}

// 删除公司业务订单附件
export function delImgfile(data) {
  return request({
    url: `/hmkj-crm/marketCompbusiImgfile/delete`,
    method: 'get',
    params: data
  })
}

// 导出公司业务订单附件
export function exportImgfile(query) {
  return request({
    url: '/share/imgfile/export',
    method: 'get',
    params: query
  })
}
