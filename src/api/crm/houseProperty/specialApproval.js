// import request from "../clientRecycle/node_modules/@/utils/request";
import request from "@/utils/request";

// 特殊审批列表
export function SpeciaOrder(data) {
    return request({
        url: "/hmkj-crm/houproBalancePayment/queryLeadPageList",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}

//审核回显
export function SupervisorAuditEcho(query) {
    return request({
        url: "/hmkj-crm/houproBalancePayment/selectAuditRecord",
        method: "get",
        params: query,
    });
}