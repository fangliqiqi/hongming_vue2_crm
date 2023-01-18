import request from '@/utils/request'
// 合同审核列表展示
export function selectContractReviewList(data) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/contractReviewListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 变更审核列表展示
export function selecctChangeListPage(data) {
    return request({
        url: "/hmkj-crm/contractChangeReview/nzChangeListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 合同审核审核
export function contractReview(data) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/contractReview",
        method: "post",
        data: data,
    });
}
// 查询业务订单合同列表
export function listContract(data) {
    return request({
        url: '/hmkj-crm/marketCompanyContract/queryListPage',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

// 查询我的订单合同列表
export function listMyContract(data) {
    return request({
        url: '/hmkj-crm/marketMyCompanyContract/queryListPage',
        method: 'post',
        data: data,
    })
}
// 查询我的签约公司数据
export function selectMyClient(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectMyClient',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

// 查询业务订单合同详细
export function getContract(data) {
    return request({
        url: `/hmkj-crm/marketCompanyContract/queryDetail?id=${data.id}`,
        method: 'post',
        data: data
    })
}

// 新增业务订单合同
export function addContract(data) {
    return request({
        url: '/hmkj-crm/marketCompanyContract/add',
        method: 'post',
        data: data
    })
}

// 修改业务订单合同
export function updateContract(data) {
    return request({
        url: '/hmkj-crm/marketCompanyContract/update',
        method: 'post',
        data: data
    })
}

// 删除业务订单合同
export function delContract(data) {
    return request({
        url: `/hmkj-crm/marketCompanyContract/delete?id=${data.id}`,
        method: 'post',
        data: data
    })
}

//作废业务订单合同
export function fakeDelContract(data) {
    return request({
        url: `/hmkj-crm/marketCompanyContract/fakeDeleteDz`,
        method: 'get',
        params: data
    })
}

// 导出业务订单合同
export function exportContract(query) {
    return request({
        url: '/share/contract/export',
        method: 'get',
        params: query
    })
}

//电子合同
export function getContractInfo(query) {
    return request({
        url: '/hmkj-crm/electronicContract/generateContract',
        method: 'get',
        params: query
    })
}
//续费电子合同
export function getXufeiContractInfo(query) {
    return request({
        url: '/hmkj-crm/electronicContract/findBlankContract',
        method: 'get',
        params: query
    })
}

//合同详情
export function getContractDetail(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectContractParticulars',
        method: 'get',
        params: data,
    })
}
//合同 保存
export function uploadHt(data) {
    return request({
        url: '/hmkj-crm/electronicContract/uploadHt',
        method: 'post',
        data: data
    })
}
// 合同小程序二维码
export function updateCode(data) {
    return request({
        url: `/hmkj-crm/electronicContract/updateImage?id=${data.id}`,
        method: 'post',
        data: data
    })
}
// 合同H5二维码
export function updateH5Code(data) {
    return request({
        url: `/hmkj-crm/electronicContract/updateQrCode?id=${data.id}`,
        method: 'post',
        data: data
    })
}
// 免登录合同H5二维码
export function updateNoH5Code(data) {
    return request({
        url: `/hmkj-crm/electronicContract/updateQrCodeNoLg?id=${data.id}`,
        method: 'post',
        data: data
    })
}