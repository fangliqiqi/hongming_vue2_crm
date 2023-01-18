import request from '@/utils/request'

// 查询信息列表
export function CompanyBusir(data) {
  return request({
    url: '/hmkj-crm/dispatchMarketCompanyBusir/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}



//修改(设置)
export function update (data) {
    return request({
      url: '/hmkj-crm/dispatchMarketCompanyBusir/update',
      method: 'post',
      data: data,
      
    })
  }
