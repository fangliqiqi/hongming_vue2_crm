import request from '@/utils/request'
// const service = window.CONFIG.services.wecom + '/tlp'

/**
 * 获取欢迎语列表
 * @param {*} params
{
    "pageNum": "当前页",
    "pageSize": "每页显示条数",
    "welcomeMsg": "欢迎语关键词",
    "welcomeMsgTplType": " 欢迎语模板类型:1:员工欢迎语;2:部门员工欢迎语;3:客户群欢迎语"
}
 */
export function getList(data) {
  return request({
    url: '/hmkj-weixinwork-oa/wecom/tlp/list',
    method:'GET',
    params:data,
  })
}

/**
 * 根据欢迎语模板id获取模板使用范围
 * @param {*} id
 */
export function getScop(id) {
  return request({
    url: '/hmkj-weixinwork-oa/wecom/tlp/scop/'+id,
    method:'GET',
  })
}

/**
 * 编辑欢迎语模板
 * @param {*} data
{
  "id": "主键",
  "mediaId": "素材的id",
  "welcomeMsg": "欢迎语",
  "welcomeMsgTplType": "欢迎语模板类型:1:员工欢迎语;2:部门员工欢迎语;3:客户群欢迎语",
  "weMsgTlpScopes": [
    {
      "useUserId": "使用人员id"
    }
  ]
}
 */
export function update(data) {
  return request({
    url: '/hmkj-weixinwork-oa/wecom/tlp',
    method:'PUT',
    data:data,
  })
}

/**
 * 新增欢迎语模板
 * @param {*} data
{
    "welcomeMsg": "欢迎语",
    "mediaId": "素材的id",
    "welcomeMsgTplType": "欢迎语模板类型:1:员工欢迎语;2:部门员工欢迎语;3:客户群欢迎语 ",
    "weMsgTlpScopes": {
        "useUserId": "使用人的id"
    }
}
 */
export function add(data) {
  return request({
    url: '/hmkj-weixinwork-oa/wecom/tlp/add',
    method: 'POST',
    data:data,
  })
}
// 获取欢迎语模板详细信息
export function getDetail(id) {
  return request({
    url: '/hmkj-weixinwork-oa/wecom/tlp/scop/'+id,
    method: 'GET',
  })
}
/**
 * 删除欢迎语
 * @param {*} ids
 */
export function remove(ids) {
  return request({
    url: '/hmkj-weixinwork-oa/wecom/tlp/'+ids,
    method: 'DELETE',
  })
}
