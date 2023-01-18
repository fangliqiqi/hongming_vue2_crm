import request from "@/utils/request";
// 
// 列表展示
export function entrepreneurMessageList(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssential/businessQueryDetail",
    method: "get",
    data: data,
    params: data
  });
}
// 修改工商信息
export function updateAndContact(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssential/updateAndContact",
    method: "post",
    data: data,
  });
}
// 修改股东信息
export function updateEmployee(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssential/updateEmployee",
    method: "post",
    data: data,
  });
}
// 新增股东
export function linkmanDelete(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssential/linkmanDelete",
    method: "get",
    data: data,
    params: data
  });
}
// 删除股东
export function addEmployee(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssential/addEmployee",
    method: "post",
    data: data,
  });
}
// 修改税务
export function updateTaxation(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssential/updateTaxation",
    method: "post",
    data: data,
  });
}
// 修改银行
export function updateBank(data) {
  return request({
    url: "/hmkj-crm/marketCompanyEssential/updateBank",
    method: "post",
    data: data,
  });
}