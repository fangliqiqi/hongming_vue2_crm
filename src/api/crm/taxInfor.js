import request from '@/utils/request'

// 查询公司税务信息列表
export function listInfor(data) {
  return request({
    url: '/hmkj-crm/marketTaxInfor/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询公司税务信息详细
export function getInfor(data) {
  return request({
    url: `/hmkj-crm/marketTaxInfor/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增公司税务信息
export function addInfor(data) {
  return request({
    url: '/hmkj-crm/marketTaxInfor/add',
    method: 'post',
    data: data
  })
}

// 修改公司税务信息
export function updateInfor(data) {
  return request({
    url: '/hmkj-crm/marketTaxInfor/update',
    method: 'post',
    data: data
  })
}

// 删除公司税务信息
export function delInfor(data) {
  return request({
    url: `/hmkj-crm/marketTaxInfor/delete?id=${data.id}` ,
    method: 'post',
    data: data
  })
}

// 导出公司税务信息
export function exportInfor(query) {
  return request({
    url: '/share/infor/export',
    method: 'get',
    params: query
  })
}