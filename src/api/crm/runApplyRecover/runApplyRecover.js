import request from "@/utils/request";
// 
// 列表展示
export function runApplyList(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssentialChurn/selectChurnCompany",
    method: "post",
    data: data,
    params: { pageNo: data.pageNo, pageSize: data.pageSize }
  });
}
// 查看详情
export function runParticulars(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssentialChurn/selectById",
    method: "get",
    params: data,
  });
}
// 流失申请
export function runApply(data) {
  return request({
    // url: "/hmkj-crm/marketCompanyEssential/churnUpdate",
    url:"/hmkj-crm/marketCompanyEssentialChurn/churnUpdate",
    method: "post",
    data: data,
    params: data
  });
}
//流失恢复
export function runRecover(data) {
  return request({
    url:"/hmkj-crm/marketCompanyEssentialChurn/backNormal",
    method: "get",
    data: data,
    params: data
  });
}