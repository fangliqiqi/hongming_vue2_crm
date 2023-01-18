import request from '@/utils/request'

export function ChooseCompany(query) {
    return request({
        url: '/guns-cloud-system/crmUserAuthority/selectSubsidiaryByCompanyId',
        method: 'get',
        params: query,

    })
}

//支出类型分页列表
export function expenditureType(data) {
    return request({
        url: '/hmkj-crm/crmAccountantSubject/queryListPage',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

//新增支出方式
export function addExpenditure(data) {
    return request({
        url: '/hmkj-crm/crmAccountantSubject/addExpenditure',
        method: 'post',
        data: data,
    })
}
//删除支出类型
export function delExpenditure(query) {
    return request({
        url: '/hmkj-crm/crmAccountantSubject/delete',
        method: 'get',
        params: query,
    })
}

//修改支出类型
export function modifyExpenditure(data) {
    return request({
        url: '/hmkj-crm/crmAccountantSubject/update',
        method: 'post',
        data: data,
    })
}

//修改支出类型回显接口
export function modifyEcho(query) {
    return request({
        url: '/hmkj-crm/crmAccountantSubject/queryDetail',
        method: 'get',
        params: query,
    })
}

//支出类型导出
export function exportExpenses(data) {
    return request({
        url: '/hmkj-crm/crmAccountantSubject/excelExport',
        method: 'post',
        data: data,
    })
}