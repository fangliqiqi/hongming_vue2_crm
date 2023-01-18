import request from '@/utils/request'

// 查询公司业务订单跟进记录列表
export function listFollow(data) {
  return request({
    url: '/hmkj-crm/marketCompbusiFollow/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询公司业务订单跟进记录详细
export function getFollow(data) {
  return request({
    url: `/hmkj-crm/marketCompbusiFollow/queryDetail?id=${data.id}` ,
    method: 'post',
    data: data
  })
}

// 新增公司业务订单跟进记录
export function addFollow(data) {
  return request({
    url: '/hmkj-crm/marketCompbusiFollow/add',
    method: 'post',
    data: data
  })
}

// 修改公司业务订单跟进记录
export function updateFollow(data) {
  return request({
    url: '/hmkj-crm/marketCompbusiFollow/update',
    method: 'post',
    data: data
  })
}

// 删除公司业务订单跟进记录
export function delFollow(data) {
  return request({
    url: `/hmkj-crm/marketCompbusiFollow/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出公司业务订单跟进记录
export function exportFollow(query) {
  return request({
    url: '/crm/follow/export',
    method: 'get',
    params: query
  })
}