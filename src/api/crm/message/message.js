import request from "@/utils/request";
 //消息列表

  export function queryMongoDBListPage(data) {
    return request({
      url:'/hmkj-message/messageReceiving/queryMongoDBListPage',
      method:'post',
      data:data,
      params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
  }
  //消息
  export function findUnreadMessage(data) {
    return request({
      url:'/hmkj-message/messageReceiving/findUnreadMessage',
      method:'get',
      // data:data,
      params:data
      // params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
  }
  // 删除
  export function deleteMongoDBByIds(data) {
    return request({
      url:'/hmkj-message/messageReceiving/deleteMongoDBByIds',
      method:'post',
      data:data,
    })
  }
 // 一键去往云帐房
 export function circumscribedYZF(data) {
  return request({
    url:'/hmkj-crm/yzfInterface/getToken',
    method:'post',
    data:data,
    params: data
  })
}

