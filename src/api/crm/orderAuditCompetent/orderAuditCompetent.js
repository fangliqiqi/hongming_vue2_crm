import request from "@/utils/request";

// 列表展示
export function orderAuditBeList(data) {
    return request({
        url: "/hmkj-crm/marketCompanyBusirSupervisorReview/selectOrderReviewList",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}

// 查看详情
export function viewDetails(query) {
    return request({
        url: "/hmkj-crm/marketCompanyBusirSupervisorReview/detailsShow",
        method: "get",
        params: query
    });
}
// 订单审核主管
export function orderAuditSubmit(data) {
    return request({
        url: "/hmkj-crm/marketCompanyBusirSupervisorReview/orderReview",
        method: "post",
        data: data,
        params: data
    });
}