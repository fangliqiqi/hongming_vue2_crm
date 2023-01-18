import request from '@/utils/request'

// 科目余额
export function getListKemuYe(data) {
  return request({
    url: '/hmkj-crm/yzfInterface/getListKemuYe',
    method: 'post',
    data: data,
    // params: data,
    // params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}
// 总账
export function getListKmZongZhangs(data) {
    return request({
      url: '/hmkj-crm/yzfInterface/getListKmZongZhangs',
      method: 'post',
      data: data,

    })
  }
  // 明细账
export function getListKmMxzs(data) {
    return request({
      url: '/hmkj-crm/yzfInterface/getListKmMxzs',
      method: 'post',
      data: data,
  
    })
  }
    // 凭证汇总
export function getListPzhz(data) {
  return request({
    url: '/hmkj-crm/yzfInterface/getListPzhz',
    method: 'post',
    data: data,

  })
}