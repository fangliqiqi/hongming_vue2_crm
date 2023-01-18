// import request from "../clientRecycle/node_modules/@/utils/request";
import request from "@/utils/request";

//审核回显
export function SupervisorAuditEcho(query) {
    return request({
        url: "/hmkj-crm/houproBalancePayment/selectAuditRecord",
        method: "get",
        params: query,
    });
}


//主管审核提交
export function SupervisorAuditSubmission(data) {
    return request({
        url: "/hmkj-crm/houproBalancePayment/auditHPOrderTaxation",
        method: "post",
        data: data,
    });
}