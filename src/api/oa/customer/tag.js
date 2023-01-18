import request from '@/utils/request'

// 客户标签

/**
 * 标签列表获取
 * {
    "pageNum": "当前页",
    "pageSize": "每页显示条数",
    "gourpName": "标签组名"
}
 */
export function getList(data) {
  return request({
    url:'/hmkj-weixinwork-oa/wecom/group/list',
    method: 'get',
    params:data
  })
}

/**
 * 新增客户标签
 * @param {Object} data
{
    "gourpName": "标签组名称",
    "weTags": [{
        "name": "标签名"
    }]
}
 */
export function add(data) {
  return request({
    url:'/hmkj-weixinwork-oa/wecom/group',
    method: 'post',
    data:data,
  })
}

/**
 * 客户标签编辑
 * @param {*} data
{
    "id": "主键",
    "gourpName": "标签分组名",
    "weTags": [{
        "id": "标签id",
        "groupId": "标签组id",
        "name": "标签名",
        "status": "标签状态，如果编辑的时候删除标签，只需要把该字段设置为1"
    }]
}
 */
export function update(data) {
  return request({
    url:'/hmkj-weixinwork-oa/wecom/group',
    method: 'PUT',
    data:data,
  })
}

/**
 * 标签批量删除接口
 * @param {*} ids
 */
export function remove(ids) {
  return request({
    url:'/hmkj-weixinwork-oa/wecom/group/'+ids,
    method: 'DELETE',
  })
}

/**
 * 同步标签
 */
export function syncTag(data) {
  return request({
    url:'/hmkj-weixinwork-oa/wecom/group/synchWeTags',
    method: 'GET',
    params:data,
  })
}
