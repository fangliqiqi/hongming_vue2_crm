import request from '@/utils/request'

//外账代账服务列表展示
export function foreignAccountQueryList(data) {
    return request({
        url: '/hmkj-crm/foreignAccount/findListDivide',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}
//外账我的代账列表展示
export function foreignAccountQuery(data) {
    return request({
        url: '/hmkj-crm/foreignAccount/findListDivideYour',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}
//收票列表展示
export function TicketList(data) {
    return request({
        url: '/hmkj-crm/foreignAccount/findReceiptList',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}


//停止服务
export function updateOutService(query) {
    return request({
        url: '/hmkj-crm/foreignAccount/updateOutService',
        method: 'get',
        params: query
    })
}
//票据列表
export function findPaperRecordsList(query) {
    return request({
        url: '/hmkj-crm/foreignAccount/findPaperRecordsList',
        method: 'get',
        params: query
    })
}

//审核
export function audit(query) {
    return request({
        url: '/hmkj-crm/foreignAccount/audit',
        method: 'get',
        params: query
    })
}


//收票按钮列表展示
export function findReceiptList(data) {
    return request({
        url: '/hmkj-crm/externalInvoiceRecord/queryDetail',
        method: 'post',
        params: data
    })
}


//修改收票
export function updateInvoiceRecord(data) {
    return request({
        url: '/hmkj-crm/externalInvoiceRecord/add',
        method: 'post',
        data: data
    })
}

//分配提交按钮
export function distribution(data) {
    return request({
        url: '/hmkj-crm/foreignAccount/foreignDistribution',
        method: 'post',
        data: data
    })
}

//分配部门
export function Department(data) {
    return request({
        url: '/guns-cloud-system/entDept/findDeptList',
        method: 'post',
        data: data
    })
}

//分配员工
export function Staff(query) {
    return request({
        url: '/guns-cloud-system/entDept/findForeignAccountUserListByDeptId',
        method: 'get',
        params: query
    })
}