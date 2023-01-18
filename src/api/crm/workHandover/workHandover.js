import request from "@/utils/request";
// 
// 工作交接列表展示
export function runApplyList(data) {
  return request({
    url: "/hmkj-crm/marketCompanyBusir/selectCompanyWorkHandover",
    method: "post",
    data: data,
    // params:{}
    params: { pageNo: data.pageNo, pageSize: data.pageSize }
  });
}