import request from "@/utils/request";
 //新增消息数量
  export function findUnreadMessage(data) {
    return request({
      url:'/hmkj-crm/crmMessageReceiving/findUnreadMessage',
      method:'get',
      params: data
    })
  }