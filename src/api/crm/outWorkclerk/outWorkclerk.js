import request from "@/utils/request";

// 列表展示
export function workclerkList(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 任务详情
export function lookTaskConsumptionParticulars(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/allocationDetails",
        method: "get",
        params: data
    });
}
// 查看详情
export function lookConsumptionParticulars(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/auditParticulars",
        method: "get",
        params: data
    });
}
// 跟进记录
export function followRecord(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/queryProcedureList",
        method: "get",
        params: data
    });
}
//跟进记录- 操作-完成
export function followRecordFulfill(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/accomplishProductSteps",
        method: "get",
        params: data
    });
}
//跟进记录- 上传步骤记录回显
export function uploadingEcho(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/stepsRecord",
        method: "get",
        params: data
    });
}
//跟进记录- 步骤记录提交
export function uploadingSubmit(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/updateStepsRecord",
        method: "post",
        data: data
            //    params:data,
    });
}
//跟进记录- 上传-图片上传
export function imageUpload(data) {
    return request({
        url: "/hmkj-crm/crmRecordImg/upload",
        method: "post",
        data: data
    });
}
//跟进记录- 删除图片
export function imageDelete(data) {
    return request({
        url: "/hmkj-crm/crmRecordImg/delete",
        method: "get",
        params: data
    });
}
//完成
export function performData(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/accomplishProduct",
        method: "get",
        params: data
    });
}
// 移交回显
export function handOver(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/queryCompany",
        method: "get",
        params: data
    });
}
// 移交提交
export function handOverSubmit(data) {
    return request({
        url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/handOver",
        method: "post",
        data: data
    });
} //分配查询部门
export function entDept(data) {
    return request({
        url: "/guns-cloud-system/entDept/queryList",
        method: "post",
        data: data
    });
}

//根据部门获取用户下拉列表
export function entUser(query) {
    return request({
        url: "/guns-cloud-system/entUser/findUserList",
        method: "get",
        params: query
    });
}
//关闭
export function shutOperation(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/closeProduct",
        method: "get",
        params: data
    });
}

//导出
export function exportD(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/fieldServiceExport",
        method: "post",
        data: data
    });
}