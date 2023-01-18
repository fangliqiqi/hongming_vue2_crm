// import request from "../clientRecycle/node_modules/@/utils/request";
import request from "@/utils/request";

// 套餐设置列表
export function PackageSettings(data) {
    return request({
        url: "/hmkj-crm/houproPackage/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
//获取套餐平台
export function PackagePlatform(query) {
    return request({
        url: "/hmkj-crm/houproPackage/findSetMealType",
        method: "get",
        params: query,
    });
}
//删除套餐
export function deletePackage(data) {
    return request({
        url: "/hmkj-crm/houproPackage/delete",
        method: "post",
        data: data,
    });
}
//添加新套餐
export function addPackage(data) {
    return request({
        url: "/hmkj-crm/houproPackage/add",
        method: "post",
        data: data,
    });
}
//修改套餐
export function updatePackage(data) {
    return request({
        url: "/hmkj-crm/houproPackage/update",
        method: "post",
        data: data,
    });
}
//新增套餐平台
export function addPackagePlatform(data) {
    return request({
        url: "/hmkj-crm/crmIntermUserlabel/add",
        method: "post",
        data: data,
    });
}


//支付设置列表
export function payment(data) {
    return request({
        url: "/hmkj-crm/houproPaymentSetting/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
//公章添加
export function OfficialSealAdd(data) {
    return request({
        url: "/hmkj-crm/marketOfficialSeal/add",
        method: "post",
        data: data,
    });
}
//公章修改
export function OfficialSealUpdate(data) {
    return request({
        url: "/hmkj-crm/marketOfficialSeal/update",
        method: "post",
        data: data,
    });
}
//公章批量删除
export function batchDeletion(data) {
    return request({
        url: "/hmkj-crm/marketOfficialSeal/batchDeletion",
        method: "post",
        data: data,
    });
}
//公章删除
export function deleteSeal(data) {
    return request({
        url: "/hmkj-crm/marketOfficialSeal/delete",
        method: "get",
        params: data,
    });
}
//公章设置列表
export function marketOfficialSeal(data) {
    return request({
        url: "/hmkj-crm/marketOfficialSeal/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}

//净业绩设置列表
export function netPerformanceSeal(data) {
    return request({
        url: "/hmkj-crm/marketOfficialSeal/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}





//新增支付方式
export function NewPaymentMethod(data) {
    return request({
        url: "/hmkj-crm/houproPaymentSetting/add",
        method: "post",
        data: data,
    });
}

//公章详情
export function findById(data) {
    return request({
        url: "/hmkj-crm/marketOfficialSeal/findById",
        method: "get",
        params: data,
    });
}
//删除支付方式
export function delPaymentMethod(data) {
    return request({
        url: "/hmkj-crm/houproPaymentSetting/deleteByIds",
        method: "post",
        data: data,
    });
}
//删除单条支付方式
export function deleteSingle(data) {
    return request({
        url: "/hmkj-crm/houproPaymentSetting/delete",
        method: "post",
        data: data,
    });
}

//修改回显数据
export function modifyPaymentMethod(data) {
    return request({
        url: "/hmkj-crm/houproPaymentSetting/queryDetail",
        method: "post",
        data: data,
    });
}


//修改支付方式
export function updatePaymentMethod(data) {
    return request({
        url: "/hmkj-crm/houproPaymentSetting/update",
        method: "post",
        data: data,
    });
}

//提单员区域设置列表
export function RegionalSettings(data) {
    return request({
        url: "/hmkj-crm/houproBillladingUser/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}

//删除提单员
export function delBilllading(data) {
    return request({
        url: "/hmkj-crm/houproBillladingUser/delete",
        method: "post",
        data: data,
    });
}

//标签回显
export function TagEcho(data) {
    return request({
        url: "/hmkj-crm/crmIntermUserlabel/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize, type: 20 }
    });
}

//删除标签
export function deleteLabel(data) {
    return request({
        url: "/hmkj-crm/crmIntermUserlabel/deleteByIds",
        method: "post",
        data: data,
    });
}