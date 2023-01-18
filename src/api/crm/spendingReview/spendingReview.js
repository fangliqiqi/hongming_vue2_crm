import request from "@/utils/request";

// 列表展示
export function expenditureAuditList(data) {
  return request({
    url: "/hmkj-crm/expenditureMarketCompanyBusir/queryExpenditureList",
    method: "post",
    data: data,
    params: { pageNo: data.pageNo, pageSize: data.pageSize }
  });
}
// 确认申请
export function affirmAudit(data) {
  return request({
    url: "/hmkj-crm/expenditureMarketCompanyBusir/auditExpenditure",
    method: "get",
    data: data,
    params: data
  });
}
// 支出审核查看详情
export function lookConsumptionParticulars(data) {
  return request({
    url: "/hmkj-crm/expenditureMarketCompanyBusir/auditDetailsExpend",
    method: "get",
    data: data,
    params: data
  });
}
