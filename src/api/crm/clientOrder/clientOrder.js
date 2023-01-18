import request from "@/utils/request";
//
// 订单列表
export function orderClientList(data) {
  return request({
    url: "/hmkj-crm/marketCompanyBusirUrgeReview/selectOrder",
    method: "post",
    data: data,
    params: { pageNo: data.pageNo, pageSize: data.pageSize }
  });
}
// 催审
export function orderRemind(data) {
  return request({
    url: "/hmkj-crm/marketCompanyBusirUrgeReview/orderRemind",
    method: "get",
    data: data,
    params: data
  });
}
// 撤销
export function revokeOrderRemind(data) {
  return request({
    url: "/hmkj-crm/marketCompanyBusirUrgeReview/revokeOrderRemind",
    method: "get",
    params: data
  });
}

export function getChargeInfo(data) {
  return request({
    url: "/hmkj-crm/marketCompanyBusirUrgeReview/finalDetails",
    method: "get",
    params: data
  });
}

export function updateCharge(data) {
  return request({
    url: "/hmkj-crm/marketCompanyBusirUrgeReview/finalPayment",
    method: "post",
    data: data
  });
}
