import request from "@/utils/request";

//创建订单
export function createOrder(data) {
    return request({
        url: '/hmkj-crm/houproOrderTaxation/add',
        method: 'post',
        data: data

    })
}

//订单回显
export function orderEcho(data) {
    return request({
        url: '/hmkj-crm/houproOrderTaxation/queryDetail',
        method: 'post',
        data: data

    })
}

//模板下载
export function templateDownload(query) {
    return request({
        url: '/hmkj-crm/houproOrderTaxation/excelTemplate',
        method: 'get',
        params: query,
    })
}


//根据省市获取支付方式
export function GetPaymentMethod(data) {
    return request({
        url: '/hmkj-crm/houproPaymentSetting/findPaymentMethod',
        method: 'post',
        data: data

    })
}

//根据支付方式获取账号
export function GetAccountNumber(data) {
    return request({
        url: '/hmkj-crm/houproPaymentSetting/queryList',
        method: 'post',
        data: data

    })
}