import request from '@/utils/request'
//获取应用平台列表
export function getAppSelect(data) {
  return request({
    url: '/guns-cloud-system/app/getAppSelect',
    method: 'get',
    params:data
  })
}

