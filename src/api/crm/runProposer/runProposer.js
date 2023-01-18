import request from "@/utils/request";

// 列表展示
export function runApplyBeList(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssentialChurn/selectChurnNotReview",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 列表展示
export function zgChangeAudit(data) {
    return request({
        url: "/hmkj-crm/contractChangeReview/zgChangeAudit",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 列表展示
export function nzChangeAudit(data) {
    return request({
        url: "/hmkj-crm/contractChangeReview/nzChangeAudit",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 变更列表展示(内账)
export function nzChangeListPage(data) {
    return request({
        url: "/hmkj-crm/contractChangeReview/nzChangeListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 变更列表展示(主管)
export function zgChangeListPageList(data) {
    return request({
        url: "/hmkj-crm/contractChangeReview/zgChangeListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
//流失审核
// 确认申请
export function runAudit(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssentialChurn/churnReview",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 查看详情
export function runParticulars(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssentialChurn/applicationDetails",
        method: "get",
        params: data,
    });
}
// 新增客户
export function addClient(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/add",
        method: "post",
        data: data,
    });
}