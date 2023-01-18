import request from '@/utils/request'


/*获取审批单号*/

export function getList(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/approval/getapprovalinfo',
   method:'GET',
   params:data
  })
}

/*查询审批详情*/

export function getApprovaldetail(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/approval/getapprovaldetail',
   method: 'post',
   data:data
  })
}

/*查询模板详情*/

export function getTemplate(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/approval/getcheckinMonthdata',
   method: 'post',
   data:data
  })
}

/*根据名称模糊查询企业微信组织架构相关列表   deptName*/
export function getdeptName(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/department/listByName',
   method: 'get',
   params:data
  })
}

/*根据部门和名称模糊查询查询通讯录相关客户列表  deptId  name*/
export function getuserId(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/user/listByName',
   method:'get',
   params:data
  })
}
