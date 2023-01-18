import request from '@/utils/request'

// 查询个人业务工单（订单）列表
export function listBusirecord(data) {
  return request({
    url: '/hmkj-crm/marketPeopleBusirecord/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询个人业务工单（订单）详细
export function getBusirecord(data) {
  return request({
    url: `/hmkj-crm/marketPeopleBusirecord/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增个人业务工单（订单）
export function addBusirecord(data) {
  return request({
    url: '/hmkj-crm/marketPeopleBusirecord/add',
    method: 'post',
    data: data
  })
}

// 修改个人业务工单（订单）
export function updateBusirecord(data) {
  return request({
    url: '/hmkj-crm/marketPeopleBusirecord/update',
    method: 'post',
    data: data,
  })
}

// 删除个人业务工单（订单）
export function delBusirecord(data) {
  return request({
    url: `/hmkj-crm /marketPeopleBusirecord/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出个人业务工单（订单）
export function exportBusirecord(query) {
  return request({
    url: '/share/busirecord/export',
    method: 'get',
    params: query
  })
}