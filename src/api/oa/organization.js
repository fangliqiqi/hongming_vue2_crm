import request from '@/utils/request'
// const service = window.CONFIG.services.wecom + '/department'
// const serviceUser = window.CONFIG.services.wecom + '/user'

/**
 * 获取所有部门
 * @param {*} params
 * {
  "id": "部门id ",
  "name": "部门名称",
  "parentId": "父节点id "
}
 */
export function getTree(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/department/list',
   method: 'get',
   params:data
  })
}


/**
 * 更新部门
 * @param {*} params
 * {
  "id": "部门id ",
  "name": "部门名称",
  "parentId": "父节点id "
}
*/
export function updateDepart(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/department/edit',
   method: 'post',
   data: data
  })
}

/**
 * 新增部门
 * @param {Object} data
 *  * {
  "name": "部门名称",
  "parentId": "父节点id "
}
 */
export function addDepart(data) {
  return request({
    url: "/hmkj-weixinwork-oa/wecom/department/add",
    method: 'post',
    data:data
  })
}

export function removeDepart(ids){
  return request({
    url: "/hmkj-weixinwork-oa/wecom/department/"+ids,
    method: 'get',
  })
}

/**
 * 获取通讯录人员列表
 * @param {*} params
 * {
    "pageNum": "当前页",
    "pageSize": "当前页显示条数",
    "name": "姓名",
    "userId": "账号",
    "mobile": "手机号",
    "beginTime": "开始时间",
    "endTime": "结束时间",
    "isActivate": "是否激活（1:是；2:否）该字段主要表示当前信息是否同步微信 ",
    "department": "根据组织id获取,获取通讯录人员"
}
 */
export function getList(data) {
  return request({
    url: "/hmkj-weixinwork-oa/wecom/user/list",
   method: 'get',
   params: data
  })
}

/**
 * 根据ID获取通讯录人员详情
 * @param {String} id
 */
export function getUserDetail(userId) {
  return request({
    url: "/hmkj-weixinwork-oa/wecom/user/"+userId,
    method: 'get',
  })
}

/**
 * 新增用户
 * @param {Object} data
 */
export function addUser(data) {
  return request({
    url: "/hmkj-weixinwork-oa/wecom/user/add",
    method: 'post',
    data:data,
  })
}

/**
 * 更新用户
 * @param {*} data
 * {
    "avatarMediaid": "用户头像,该值来自素材库",
    "name": "姓名",
    "alias": "昵称",
    "userId": "账号",
    "gender": "性别。（默认）1表示男性，2表示女性",
    "mobile": "手机号",
    "email": "邮箱",
    "wxAccount": "个人微信号",
    "department": "用户所属部门id,[1,2]",
    "position": "职务",
    "isLeaderInDept": "个数必须和参数department的个数一致，表示在所在的部门内是否为上级。1表示为上级,0表示普通成员(非上级)",
    "joinTime": "入职时间",
    "enable": "是否启用(1表示启用成员，0表示禁用成员)",
    "idCard": "身份证号",
    "qqAccount": "QQ号",
    "telephone": "座机",
    "address": "地址",
    "birthday": "生日",
    "isActivate": "是否激活（1:是；2:否）该字段主要表示当前信息是否同步微信",
    "id": "主键"
}
 */
export function updateUser(data) {
  return request({
    url: "/hmkj-weixinwork-oa/wecom/user/updateEditUser",
    method: 'post',
    data:data,
  })
}

/**
 * 启用禁用用户 true：启用 false：禁用
 * @param {*} data
 * {
    "id": "通讯录客户ID",
    "enable": "启用禁用用户 true：启用 false：禁用"
}
 */
export function startOrStop(data) {
  return request({
    url: '/hmkj-weixinwork-oa/wecom/use/startOrStop',
    method: 'post',
    data: data
  })
}

/**
 * 用户删除接口
 * @param {*} userId
 */
export function remove(userId) {
  return request({
    url: "/hmkj-weixinwork-oa/wecom/user/del/"+userId,
    method: 'get',
  })
}

/**
 * 同步成员
 */
export function syncUser(data) {
  return request({
   url: "/hmkj-weixinwork-oa/wecom/user/synchWeUser",
   method: 'get',
   params: data
  })
}
