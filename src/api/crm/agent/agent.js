import request from '@/utils/request'

// 查询商机信息列表
export function listOpportunity(data) {
    return request({
        url: '/hmkj-crm/resoBusinessOpportunity/queryListPage',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}


// 查询商机信息详细
export function getOpportunity(data) {
    return request({
        url: `/hmkj-crm/resoBusinessOpportunity/queryOne`,
        method: 'get',
        params: data
    })
}
// 查询商机信息详细
// export function getOpportunity(data) {
//   return request({
//     url:`/hmkj-crm/resoBusinessOpportunity/queryDetail`,
//     method: 'post',
//     params: data
//   })
// }

// 新增商机信息
export function addOpportunity(data) {
    return request({
        url: '/hmkj-crm/resoBusinessOpportunity/add',
        method: 'post',
        data: data
    })
}

// 修改商机信息
export function updateOpportunity(data) {
    return request({
        url: '/hmkj-crm/resoBusinessOpportunity/update',
        method: 'post',
        data: data
    })
}

// 删除商机信息
export function delOpportunity(data) {
    return request({
        url: `/hmkj-crm/resoBusinessOpportunity/fakeDelete`,
        method: 'get',
        params: data
    })
}
// 释放商机信息
export function toMareLiberum(data) {
    return request({
        url: `/hmkj-crm/resoBusinessOpportunity/toMareLiberum`,
        method: 'get',
        params: data
    })
}

// 移交商机信息
export function handOverBusiness(data) {
    return request({
        url: `/hmkj-crm/resoBusinessOpportunity/handOverBusiness`,
        method: 'post',
        data: data
    })
}


// 导出商机信息
// 模板下载
export function exportOpportunity(query) {
    return request({
        url: '/hmkj-crm/resoBusinessOpportunity/excelTemplate',
        method: 'get',
        params: query
    })
}

//批量导入
export function bulkImportOpportunity(data) {
    return request({
        url: `/hmkj-crm/resoBusinessOpportunity/bulkImport`,
        method: 'post',
        data: data
    })
}

//商机转成交
export function ConversionDealOpportunity(data) {
    return request({
        url: '/hmkj-crm/resoBusinessOpportunity/ConversionDeal',
        method: 'post',
        data: data
    })
}



//跟进记录
export function getFollowRecordList(data) {
    return request({
        url: '/hmkj-crm/crmFollowRecord/queryListToMany',
        method: 'get',
        params: data
    })
}
//图片删除
export function delRecordImg(data) {
    return request({
        url: '/hmkj-crm/crmRecordImg/delete',
        method: 'get',
        params: data
    })
}


//新增跟进记录
export function addFollowRecord(data) {
    return request({
        url: '/hmkj-crm/crmFollowRecord/add',
        method: 'post',
        data: data
    })
}
//联系人/crmContacts/queryList
export function getContactsList(data) {
    return request({
        url: '/hmkj-crm/crmContacts/queryList',
        method: 'post',
        data: data
    })
}
//联系人删除,伪删除
export function delContact(data) {
    return request({
        url: '/hmkj-crm/crmContacts/PseudoDeleteById',
        method: 'post',
        params: data
    })
}
//联系人新增
export function addContact(data) {
    return request({
        url: '/hmkj-crm/crmContacts/add',
        method: 'post',
        data: data
    })
}
//联系人新增
export function updateContact(data) {
    return request({
        url: '/hmkj-crm/crmContacts/update',
        method: 'post',
        data: data
    })
}