import request from "@/utils/request";

// 对账审核列表展示
export function selectReceiptReview(data) {
    return request({
        url: "/hmkj-crm/canopyMarketCompanyBusir/selectReceiptReview",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}