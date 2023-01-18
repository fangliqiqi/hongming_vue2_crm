import request from '@/utils/request'
// 
// 查询个人业务订单附件列表
export function listImgfile(data) {
  return request({
    url: '/hmkj-crm/marketPeopbusirImgfile/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询个人业务订单附件详细
export function getImgfile(data) {
  return request({
    url: `/hmkj-crm/marketPeopbusirImgfile/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增个人业务订单附件
export function addImgfile(data) {
  return request({
    url: '/hmkj-crm/marketPeopbusirImgfile/add',
    method: 'post',
    data: data
  })
}

// 修改个人业务订单附件
export function updateImgfile(data) {
  return request({
    url: '/hmkj-crm/marketPeopbusirImgfile/update',
    method: 'post',
    data: data
  })
}

// 删除个人业务订单附件
export function delImgfile(data) {
  return request({
    url: `/hmkj-crm/marketPeopbusirImgfile/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出个人业务订单附件
export function exportImgfile(query) {
  return request({
    url: '/share/imgfile/export',
    method: 'get',
    params: query
  })
}