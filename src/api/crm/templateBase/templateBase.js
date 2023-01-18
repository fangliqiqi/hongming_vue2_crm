import request from '@/utils/request'
// 模板库--注册列表信息
export function findSerpricePage(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/findSerpricePage',
        method: 'post',
        data: data,
    })
}
// 点击
export function findBySerpriceId(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/findBySerpriceId',
        method: 'get',
        params: data
    })
}
// 保存
export function templateUpdate(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/templateUpdate',
        method: 'post',
        data: data
    })
}
// 新增项目--所属服务项
export function selectByParent(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/selectByParent',
        method: 'post',
        data: data
    })
}
// 新增项目--提交
export function templateAdd(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/templateAdd',
        method: 'post',
        data: data
    })
}
// 项目模板--删除
export function deleteSerprice(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/deleteSerprice',
        method: 'get',
        params: data
    })
}
// 项目模板复原
export function recoverySerprice(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/recoverySerprice',
        method: 'get',
        params: data
    })
}

//项目模板大类删除
export function delProjectTemplate(query) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/deleteTopSerprice',
        method: 'get',
        params: query
    })
}

//修改项目模板
export function modifyProjectTemplate(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/updateFather',
        method: 'post',
        data: data
    })
}
//所属公司
export function ChooseCompany(query) {
    return request({
        url: '/guns-cloud-system/crmUserAuthority/selectSubsidiaryByCompanyId',
        method: 'get',
        params: query,

    })
}

//新增父级
export function Classification(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/addParent',
        method: 'post',
        data: data,

    })
}
//新增项目名称模糊搜索
export function entryName(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/selectByChildName',
        method: 'post',
        data: data,

    })
}

//搜索
export function searchName(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/findSerpricePage',
        method: 'post',
        data: data,

    })
}