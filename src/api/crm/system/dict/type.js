import request from '@/utils/request'
import HttpConstant from '@/utils/HttpConstant'

// 查询字典类型列表
export function getDictTypeList(query) {
  return request({
    url: '/guns-cloud-system/dictType/getDictTypeList',
    method: 'post',
    data: query,
    params: query
  })
}

// 查询字典类型详情
export function queryDictTypeDetail(query) {
  return request({
    url: '/guns-cloud-system/dictType/queryDictTypeDetail',
    method: 'get',
    params: query
  })
}

// 修改字典类型
export function updateDictType(data) {
  return request({
    url: '/guns-cloud-system/dictType/updateDictType',
    method: 'post',
    data: data
  })
}

// 修改字典状态
// export function updateStatus(query) {
//   return request({
//     url: '/guns-cloud-system/dictType/updateStatus',
//     method: 'post',
//     params: query,
//     type:HttpConstant.FORM_DATA_REQ
//   })
// }

// 删除字典类型
export function deleteDictType(query) {
  return request({
    url: '/guns-cloud-system/dictType/deleteDictType',
    method: 'post',
    params:query,
    type:HttpConstant.FORM_DATA_REQ
  })
}


// 新增字典类型
export function addDictType(data) {
  return request({
    url: '/guns-cloud-system/dictType/addDictType',
    method: 'post',
    data: data
  })
}

// code检查
export function checkCode(data) {
  return request({
    url: '/guns-cloud-system/dictType/checkCode',
    method: 'post',
    data: data
  })
}

