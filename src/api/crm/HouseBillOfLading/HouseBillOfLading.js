import request from "@/utils/request";

//报单提单回显
export function findNotSubmitOrder(data) {
    return request({
        url: '/hmkj-crm/houproOrderDeclare/findNotSubmitOrder',
        method: 'post',
        data: data

    })
}

//提单提单回显
export function findOrderAttache(query) {
    return request({
        url: '/hmkj-crm/houproOrderDeclare/findOrderAttache',
        method: 'get',
        params: query

    })
}
//大客户用户列表下载
export function downloadAccount(query) {
    return request({
        url: '/hmkj-crm/houproOrderDeclare/downloadAccount',
        method: 'post',
        params: query
    })
}

//特殊审批提交
export function SpecialSubmission(data) {
    return request({
        url: '/hmkj-crm/houproOrderDeclare/applySpecialApproval',
        method: 'post',
        data: data

    })
}

//尾款回显
export function BalancePaymentEcho(query) {
    return request({
        url: '/hmkj-crm/houproOrderDeclare/selectFinalMoney',
        method: 'get',
        params: query
    })
}

//提交尾款
export function SubmitBalancePayment(data) {
    return request({
        url: '/hmkj-crm/houproOrderDeclare/collectBalancePayment',
        method: 'post',
        data: data

    })
}

//获得支付方式
export function PaymentMethod(data) {
    return request({
        url: '/hmkj-crm/houproPaymentSetting/queryList',
        method: 'post',
        data: data

    })
}

//提单审核提交
export function SubmitForReview(data) {
    return request({
        url: '/hmkj-crm/houproOrderDeclare/ladingOrderAttache',
        method: 'post',
        data: data

    })
}

//特殊审批回显
export function SpecialApproval(data) {
    return request({
        url: '/hmkj-crm/houproOrderDeclare/selectAuditStep',
        method: 'post',
        data: data

    })
}

//业务员提单修改回显
export function updateEcho(data) {
    return request({
        url: '/hmkj-crm/houproOrderDeclare/updateEcho',
        method: 'post',
        data: data

    })
}

//报单修改提交
export function ModifyOrder(data) {
    return request({
        url: '/hmkj-crm/houproOrderTaxation/add',
        method: 'post',
        data: data

    })
}