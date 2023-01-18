import request from "@/utils/request";

// 对账审核列表展示
export function checkForTheAuditList(data) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 续费审核列表展示
export function selectRenew(data) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/selectRenew",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}

// 对账审核订单审核提交按钮
export function OrderReviewList(query) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/audit",
        method: "get",
        params: query,
    });
}
// 续费审核订审核提交按钮
export function renewAudit(query) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/renewAudit",
        method: "get",
        params: query,
    });
}
// 查看订单审核详情
export function lookParticulars(data) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/auditDetails",
        method: "get",
        params: data,
    });
}
// 付款截图
export function findChargeList(data) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/findChargeList",
        method: "get",
        params: data,
    });
}

//审核回显数据
export function selectChargeVouchers(data) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/selectChargeVouchers",
        method: "post",
        data: data,
    });
}