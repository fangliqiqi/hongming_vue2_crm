import request from '@/utils/request'

// 查询字典数据列表
export function getDictList(query) {
  return request({
    url: '/guns-cloud-system/dict/getDictList',
    method: 'post',
    data:query
  })
}

// 查询字典数据列表 分页
export function getDictPage(query) {
  return request({
    url: '/guns-cloud-system/dict/getDictPage',
    method: 'post',
    data:query,
    params: query
  })
}

// 根据字典类型code 获取所有字典
export function getDictListByTypeCode(dictType) {
  return request({
    url: '/guns-cloud-system/dict/getDictListByTypeCode',
    method: 'post',
    data:query
  })
}

// 根据字典类型code获取树形字典列表
export function getDictTreeList(dictType) {
  return request({
    url: '/guns-cloud-system/dict/getDictTreeList',
    method: 'post',
    data:query
  })
}

// 查询字典数据详情
export function queryDictDetail(query) {
  return request({
    url: '/guns-cloud-system/dict/queryDictDetail',
    method: 'get',
    params: query
  })
}

// 根据字典类型code和父编码获取下级字典
export function getListByTypeCodeAndPCode(dictType) {
  return request({
    url: '/guns-cloud-system/dict/getListByTypeCodeAndPCode',
    method: 'post',
    data:query
  })
}


// 新增字典数据
export function addData(data) {
  return request({
    url: '/guns-cloud-system/dict/addDict',
    method: 'post',
    data: data
  })
}

// code检查
export function checkCode(data) {
  return request({
    url: '/guns-cloud-system/dict/checkCode',
    method: 'post',
    data: data
  })
}


// 修改字典数据
export function updateDict(query) {
  return request({
    url: '/guns-cloud-system/dict/updateDict',
    method: 'post',
    data: query
  })
}

// 删除字典数据
export function deleteDict(query) {
  return request({
    url: '/guns-cloud-system/dict/deleteDict',
    method: 'post',
    params:query
  })
}

// 更新字典数据
export function updateDictStatus(query) {
  return request({
    url: '/guns-cloud-system/dict/updateDictStatus',
    method: 'post',
    data:query
  })
}

// 根据字典类型查询字典数据信息
export function getDictArr(query) {
  return request({
    url: '/guns-cloud-system/dict/getDictListByTypeCode',
    method: 'post',
    params:query
  })
}
