import request from '@/utils/request'

// 查询公司银行开户信息列表
export function listBank(data) {
  return request({
    url: '/hmkj-crm/marketCompanyBank/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询公司银行开户信息详细
export function getBank(data) {
  return request({
    url: `/hmkj-crm/marketCompanyBank/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增公司银行开户信息
export function addBank(data) {
  return request({
    url: '/hmkj-crm/marketCompanyBank/add',
    method: 'post',
    data: data
  })
}

// 修改公司银行开户信息
export function updateBank(data) {
  return request({
    url: '/hmkj-crm/marketCompanyBank/update',
    method: 'post',
    data: data
  })
}

// 删除公司银行开户信息
export function delBank(data) {
  return request({
    url: `/hmkj-crm/marketCompanyBank/delete?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 导出公司银行开户信息
export function exportBank(query) {
  return request({
    url: '/share/bank/export',
    method: 'get',
    params: query
  })
}