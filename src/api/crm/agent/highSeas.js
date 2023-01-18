import request from '@/utils/request'

// 查询商机信息列表
export function BusinessOpportunity(data) {
  return request({
    url: '/hmkj-crm/publicResoBusinessOpportunity/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}
// 新增客户信息
export function addOpportunity(data) {
  return request({
    url: '/hmkj-crm/resoBusinessOpportunity/add',
    method: 'post',
    data: data
  })
}


//抢单
export function vieForCommercial(query) {
  return request({
    url: '/hmkj-crm/publicResoBusinessOpportunity/vieForCommercial',
    method: 'get',
    params: query,
    
  })
}
