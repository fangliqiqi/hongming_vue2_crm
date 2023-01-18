import request from '@/utils/request'

// 查询公司业务工单（订单）列表
export function listBusir(data) {
  return request({
    url: '/hmkj-crm/marketCompanyBusir/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询公司业务工单（订单）详细
export function getBusir(data) {
  return request({
    url: `/hmkj-crm/marketCompanyBusir/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增公司业务工单（订单）
export function addBusir(data) {
  return request({
    url: '/hmkj-crm/marketCompanyBusir/add',
    method: 'post',
    data: data
  })
}

// 修改公司业务工单（订单）
export function updateBusir(data) {
  return request({
    url: '/hmkj-crm/marketCompanyBusir/update',
    method: 'post',
    data: data
  })
}

// 删除公司业务工单（订单）
export function delBusir(data) {
  return request({
    url: `/hmkj-crm/marketCompanyBusir/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出公司业务工单（订单）
export function exportBusir(query) {
  return request({
    url: '/share/busir/export',
    method: 'get',
    params: query
  })
}
