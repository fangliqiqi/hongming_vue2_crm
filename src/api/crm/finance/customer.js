import request from "@/utils/request";
// 查询公司部门到人员
export function CompanyDepartmentPersonnel(data) {
    return request({
        url: '/guns-cloud-system/entCompany/companyTree',
        method: 'post',
        data: data
    })
}