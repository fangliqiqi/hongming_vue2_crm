import request from "@/utils/request";
   // 一键去往云帐房
   export function circumscribedYZF(data) {
    return request({
      url:'/hmkj-crm/yzfInterface/getToken',
      method:'post',
      data:data,
      params: data
    })
  }