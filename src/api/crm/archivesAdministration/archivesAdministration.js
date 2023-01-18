import request from "@/utils/request";

// 列表数据
export function queryListPage(data) {
  return request({
    url: "/hmkj-crm/archivesBox/queryListPage",
    method: "post",
    data: data,
    params: { pageNo: data.pageNo, pageSize: data.pageSize }
  });
}
// 获取客户信息（公司名称）
export function findClientList(data) {
  return request({
    url: "/hmkj-crm/archivesBox/findClientList",
    method: "get",
    params: data
  });
}
// 添加物品--选择公司后--调用详情
export function findBoxInArticleInImage(data) {
  return request({
    url: "/hmkj-crm/archivesBox/findBoxInArticleInImage",
    method: "post",
    data: data
  });
}
// 添加物品--校验档案编号
export function checkNumber(data) {
  return request({
    url: "/hmkj-crm/archivesBox/checkNumber",
    method: "get",
    params: data
  });
}
// 添加物品
export function add(data) {
  return request({
    url: "/hmkj-crm/archivesBox/add",
    method: "post",
    data: data
  });
}

// 部门
export function findDeptListByUserId(data={}) {
  return request({
    url: "/guns-cloud-system/entDept/findDeptListByUserId",
    method: "post",
    data: data
  });
}
// 移交
export function transfer(data) {
  return request({
    url: "/hmkj-crm/archivesBox/transfer",
    method: "post",
    data: data
  });
}
// 接收数据
export function receiveData(data) {
  return request({
    url: "/hmkj-crm/archivesBox/receiveData",
    method: "post",
    data: data
  });
}
// 接收-提交
export function receive(data) {
  return request({
    url: "/hmkj-crm/archivesBox/receive",
    method: "post",
    data: data
  });
}
// 交接记录
export function jJMXqueryListPage(data) {
  return request({
    url: "/hmkj-crm/archivesJoinRecord/queryListPage",
    method: "post",
    data: data,
    params: { pageNo: data.pageNo, pageSize: data.pageSize }
  });
}
// 物品交接详情
export function findOne(data) {
  return request({
    url: "/hmkj-crm/archivesJoinRecord/findOne",
    method: "post",
    data: data,
  });
}


