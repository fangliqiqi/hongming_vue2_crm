
import request from '@/utils/request'

// 查询产品信息表
export function getIntermSerpriceList(data) {
  return request({
    url: '/hmkj-crm/marketCompanyEssential/selectIntermSerprice',
    method: 'get',
    params: data,
  })
}

///新增产品信息
export function addIntermSerprice(data) {
  return request({
    url: '/hmkj-crm/crmIntermSerprice/add',
    method: 'post',
    data: data,
  })
}
