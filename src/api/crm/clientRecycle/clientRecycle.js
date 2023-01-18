import request from "@/utils/request";

// 客户列表
export function sourceClient(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssential/query/list/recyclebin",
    method: "post",
    data: data,
    params: { pageNo: data.pageNo, pageSize: data.pageSize }
  });
}
//还原
export function clientRestore(query) {
    return request({
      url: '/hmkj-crm/marketCompanyEssential/update/restore',
      method: 'post',
      params: query,
      
    })
  }
  //彻底删除
export function clientRecycleBinDelete (query) {
    return request({
      url: '/hmkj-crm/marketCompanyEssential/update/completely/cancel',
      method: 'post',
      params: query,
      
    })
  }