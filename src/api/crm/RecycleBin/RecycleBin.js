import request from "@/utils/request";

// 客户列表
export function sourceClient(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssentialRecyclebin/query/list/recyclebin",
    method: "post",
    data: data,
    params: { pageNo: data.pageNo, pageSize: data.pageSize }
  });
}
//还原
export function clientRestore(query) {
    return request({
      url: '/hmkj-crm/marketCompanyEssentialRecyclebin/update/restore',
      method: 'get',
      params: query,

    })
  }
  //彻底删除
export function clientRecycleBinDelete (query) {
    return request({
      url: '/hmkj-crm/marketCompanyEssentialRecyclebin/update/completely/cancel',
      method: 'get',
      params: query,

    })
  }

//存入订单回收站
export function updateOrderRecycleBin(query) {
  return request({
    url: '/hmkj-crm/marketCompanyEssentialRecyclebin/updateOrderRecycleBin',
    method: 'get',
    params: query,
  })
}

// 订单列表
export function RecycleBinOrderListPage(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssentialRecyclebin/queryOrderListRecycleBin",
    method: "post",
    data: data,
    params: { pageNo: data.pageNo, pageSize: data.pageSize }
  });
}
//订单还原
export function restoreOrder(query) {
  return request({
    url: '/hmkj-crm/marketCompanyEssentialRecyclebin/restoreOrder',
    method: 'get',
    params: query,
  })
}
//订单删除
export function deleteOrderRecycleBin(query) {
  return request({
    url: '/hmkj-crm/marketCompanyEssentialRecyclebin/deleteOrderRecycleBin',
    method: 'get',
    params: query,
  })
}
