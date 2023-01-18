import request from "@/utils/request";
//
// 外勤工单列表展示
export function workCompetentList(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/queryListPage",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// 任务详情
export function lookTaskConsumptionParticulars(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/allocationDetails",
        method: "get",
        data: data,
        params: data
    });
}
// 审核
export function submitAudit(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/audit",
        method: "get",
        data: data,
        params: data
    });
}
// 跟进记录
export function followRecord(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/queryProcedureList",
        method: "get",
        data: data,
        params: data
    });
}
// // 完成-备注确定
// export function accomplishSubmit(data) {
//   return request({
//     url: "/hmkj-crm/outWorkerClerkMarketBusirSerprice/accomplishProductSteps",
//     method: "get",
//     data: data,
//     params: data
//   });
// }

// 跟进记录-操作- 所需附件
export function AequiredAccessory(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/findDictName",
        method: "get",
        data: data,
        params: data
    });
}
// 跟进记录-操作- 所需附件-新增标签提交
export function addLabelLiaison(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/addDispatchDict",
        method: "post",
        data: data,
        params: data
    });
}
// 跟进记录-操作- 所需附件-删除标签
export function removeLiaison(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/deleteExecutionLabel",
        method: "get",
        data: data,
        params: data
    });
}
// 跟进记录-操作- 所需附件-提交按钮
export function updateExecutorLabel(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/updateExecutorLabel",
        method: "get",
        params: data
    });
}
//跟进记录-操作-插入
export function interposition(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/updateProcedure",
        method: "post",
        data: data
    });
}
//跟进记录-操作-删除
export function deleteLiaison(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/deleteProcedure",
        method: "get",
        params: data
    });
}
// 查看审核详情
export function lookParticulars(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/auditDetails",
        method: "get",
        params: data
    });
}
// 移交回显
export function handOver(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/queryCompany",
        method: "get",
        params: data
    });
}
// 移交提交
export function handOverSubmit(data) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/handOver",
        method: "post",
        data: data
            // params: data
    });
}

//派工
export function allocation(query) {
    return request({
        url: "/hmkj-crm/dispatchMarketCompanyBusir/allocation",
        method: "get",
        params: query
    });
}

//分配查询部门
export function entDept(data) {
    return request({
        url: "/guns-cloud-system/entDept/selectFieldStaff",
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
// 激活
export function activation(query) {
    return request({
        url: "/hmkj-crm/outWorkerMarketBusirSerprice/projectActivation",
        method: "get",
        params: query
    });
}