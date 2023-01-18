import request from '@/utils/request'

// 查询商机信息列表
export function listOpportunity(data) {
  return request({
    url: '/hmkj-crm/marketBusirSerprice/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

// 查询商机信息详细
export function getOpportunity(data) {
  return request({
    url:`/hmkj-crm/resoBusinessOpportunity/queryDetail?id=${data.id}`,
    method: 'post',
    data: data
  })
}

// 新增商机信息
export function addOpportunity(data) {
  return request({
    url: '/hmkj-crm/resoBusinessOpportunity/add',
    method: 'post',
    data: data
  })
}

// 修改商机信息
export function updateOpportunity(data) {
  return request({
    url: '/hmkj-crm/resoBusinessOpportunity/update',
    method: 'post',
    data: data
  })
}

// 删除商机信息
export function delOpportunity(data) {
  return request({
    url: `/hmkj-crm/resoBusinessOpportunity/fakeDelete?id=${data.id}
    `,
    method: 'post',
    data: data
  })
}

// 导出商机信息
export function exportOpportunity(query) {
  return request({
    url: '/share/opportunity/export',
    method: 'get',
    params: query
  })
}

//批量导入
export function bulkImportOpportunity(data) {
  return request({
    url: `/hmkj-crm/resoBusinessOpportunity/bulkImport`,
    method: 'post',
    data: data
  })
}

//商机转成交
// export function ConversionDealOpportunity(query) {
//   return request({
//     url: '/hmkj-crm/resoBusinessOpportunity/ConversionDeal',
//     method: 'get',
//     params: query
//   })
// }
export function getOpportunityFootprintList(id) {
  return request({
    url:'/hmkj-crm/crmIntermLogin/getOpportunityFootprintList',
    method:'post',
    params:{opportunityId:id}
  })

}
