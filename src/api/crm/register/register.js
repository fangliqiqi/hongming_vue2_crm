import request from '@/utils/request'
// 模板库--注册列表信息
export function findSerpricePage(data) {
    return request({
      url: '/hmkj-crm/crmIntermSerprice/findSerpricePage',
      method: 'post',
      data: data,
    })
  }