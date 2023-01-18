import request from '@/utils/request'

// 房产订单列表
export function selectHPOrderTaxationList(data) {
    return request({
        url: '/hmkj-crm/canopyMarketCompanyBusir/selectHPOrderTaxationList',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

//审核回显
export function selectAuditRecord(query) {
    return request({
        url: '/hmkj-crm/canopyMarketCompanyBusir/selectAuditRecord',
        method: 'get',
        params: query,
    })
}

//审核
export function auditToExamine(data) {
    return request({
        url: '/hmkj-crm/canopyMarketCompanyBusir/auditHPOrderTaxation',
        method: 'post',
        data: data,
    })
}

//审核详情
export function AuditDetails(query) {
    return request({
        url: '/hmkj-crm/canopyMarketCompanyBusir/selectAuditDetailsRecord',
        method: 'get',
        params: query,
    })
}