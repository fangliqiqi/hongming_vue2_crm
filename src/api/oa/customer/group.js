import request from '@/utils/request'


/**
 * 客户群列表
 * @param {*} data
 * {
 * pageNum:
pageSize:
groupName:
beginTime:
endTime:}
 */
export function getList(data) {
  return request({
    url:'/hmkj-weixinwork-oa/wecom/group/chat/list',
    method: 'GET',
    params:data,
  })
}

/**
 * 群成员列表
 * @param {*} params
 * {
  "groupId": "群id",
  "memberName": "成员名称",
  "pageNum": "",
  "pageSize": ""
}
 */
export function getMembers(data) {
  return request({
    url:'/hmkj-weixinwork-oa/wecom/group/chat/members',
    method: 'GET',
    params:data,
  })
}

/**
 * 客户群同步接口
 */
export function sync(data) {
  return request({
    url: '/hmkj-weixinwork-oa/wecom/group/chat/synchWeGroup',
    method: 'GET',
    params:data,
  })
}

/**
 * 客户群导出
 */
export function syc(data) {
  return request({
    url: '/hmkj-weixinwork-oa/wecom/group/chat/synchWeGroup',
    method: 'GET',
    params:data,
  })
}
