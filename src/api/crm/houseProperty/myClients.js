// import request from "../clientRecycle/node_modules/@/utils/request";
import request from "@/utils/request";

// 客户列表
export function houseClientList(data) {
    return request({
        url: "/hmkj-crm/houproClient/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
//即将到期客户列表
export function ExpiringCustomersList(data) {
    return request({
        url: "/hmkj-crm/houproClient/findMaturityPageBySpec",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}

//新增客户
export function addClient(data) {
    return request({
        url: "/hmkj-crm/houproClient/add",
        method: 'post',
        data: data
    })
}

//客户标签

export function Userlabel(data) {
    return request({
        url: "/hmkj-crm/crmIntermUserlabel/queryList",
        method: 'post',
        data: data
    })
}