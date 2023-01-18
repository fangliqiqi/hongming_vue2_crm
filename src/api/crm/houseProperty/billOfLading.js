import request from "@/utils/request";

// 提单列表
export function billOfList(data) {
    return request({
        url: "/hmkj-crm/houproOrderDeclare/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}

//提单
export function bringOrder(data) {
    return request({
        url: "/hmkj-crm/houproOrderDeclare/bringOrder",
        method: "post",
        data: data,
    });
}

//欠费订单
export function overdueOrders(data) {
    return request({
        url: "/hmkj-crm/houproOrderDeclare/queryArrearsListPage",
        method: "post",
        data: data,
    });
}