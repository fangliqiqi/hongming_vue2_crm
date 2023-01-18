import request from '@/utils/request'


/*获取打卡记录数据*/

export function getList(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/clock/getcheckindata',
   method:'post',
   data
  })
}

/*获取打卡日报数据*/

export function getDayList(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/clock/getDayClockList',
   method: 'post',
   data:data
  })
}

/*获取打卡月报数据*/

export function getMonthList(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/clock/getcheckinMonthdata',
   method: 'post',
   data:data
  })
}

/*根据名称模糊查询企业微信组织架构相关列表  */
export function getdeptName(data) {
  return request({
   url: '/hmkj-weixinwork-oa/wecom/department/listPid',
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
