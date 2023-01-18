import request from "@/utils/request";

// 客户列表
export function houseOrder(data) {
    return request({
        url: "/hmkj-crm/houproOrderTaxation/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}

//报单审核详情
export function reviewDetails(query) {
    return request({
        url: "/hmkj-crm/houproOrderTaxation/reviewDetails",
        method: 'get',
        params: query
    });
}

//报单修改回显
export function ModificationOfDeclaration(data) {
    return request({
        url: "/hmkj-crm/houproOrderTaxation/queryDetail",
        method: 'post',
        data: data
    });
}

//尾款修改提交
export function updateFinalPayment(data) {
    return request({
        url: "/hmkj-crm/houproOrderTaxation/updateFinalPayment",
        method: 'post',
        data: data
    });
}