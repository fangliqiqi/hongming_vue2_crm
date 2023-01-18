// import request from "../clientRecycle/node_modules/@/utils/request";
import request from "@/utils/request";

// 客户列表
export function listClient(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/selectMyClient",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}
// // 行业分类
// export function getClassificationOfIndustryList(data) {
//   return request({
//     url:'/hmkj-crm/crmIntermIndustry/getList',
//     method: 'get',
//     data: data,
//   })
// }

// 查询客户
export function getClient(data) {
    return request({
        url: `/hmkj-crm/marketCompanyEssential/queryDetail`,
        method: "get",
        params: data
    });
}
// 新增客户信息
export function addClient(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/add",
        method: "post",
        data: data
    });
}

// 修改客户信息
export function alterClient(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/updateAndContact",
        method: "post",
        data: data
    });
}
// 删除客户
export function delClient(data) {
    return request({
        url: `/hmkj-crm/marketCompanyEssentialRecyclebin/update/recycleBin?id=${data.id}`,
        method: "get",
        data: data
    });
}

//跟进记录
export function getFollowRecordList(data) {
    return request({
        url: "/hmkj-crm/crmFollowRecord/queryListToMany",
        method: "get",
        params: data
    });
}
//新增跟进记录
export function addFollowRecord(data) {
    return request({
        url: "/hmkj-crm/crmFollowRecord/add",
        method: "post",
        data: data
    });
}
// 企业信息
export function entrepreneurMessageLiaison(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/businessQueryDetail",
        method: "get",
        data: data,
        params: data
    });
}
//合同列表
export function getContracRecordtList(query) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/selectContractAndImgFileByCompanyId",
        method: "get",
        params: query
    });
}
//新增合同
export function addContract(data) {
    return request({
        url: "/hmkj-crm/marketCompanyContract/add",
        method: "post",
        data: data
    });
}
// 客户订单表
// export function listOrder(data) {
//   return request({
//     url: "/hmkj-crm/marketCompanyBusir/queryList",
//     method: "post",
//     data: data
//   });
// }
//联系人/crmContacts/queryList

// 联系人展示
export function getContactsList(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/linkmanList",
        method: "get",
        data: data,
        params: data
    });
}
//联系人新增
export function addContact(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/linkmanAdd",
        method: "post",
        data: data
    });
}
//联系人修改
export function updateContact(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/linkmanUpdate",
        method: "post",
        data: data
    });
}
//联系人删除,伪删除
export function delContact(data) {
    return request({
        url: "/hmkj-crm/marketCompanyEssential/linkmanDelete",
        method: "get",
        params: data
    });
}
//足迹列表
export function getOpportunityFootprintList(id, classify = '') {
    return request({
        url: '/hmkj-crm/crmIntermLogin/getOpportunityFootprintList',
        method: 'post',
        data: { opportunityId: id, classify: classify }
    })
}

//即将到期客户
export function ExpiringCustomers(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectExpiring',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

//欠费客户
export function CustomerInArrears(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectArrears',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

//新建客户纳税性质
export function TaxNature(data) {
    return request({
        url: '/hmkj-crm/crmIntermUserlabel/selectTaxableValue',
        method: 'post',
        data: data,
    })
}

//客户信息纳税性质
export function PayTaxes(query) {
    return request({
        url: '/hmkj-crm/crmIntermUserlabel/selectPayTaxesLabel',
        method: 'get',
        params: query,
    })
}

//修改客户纳税性质
export function ModifyPayTaxes(data) {
    return request({
        url: '/hmkj-crm/companyLabel/update',
        method: 'post',
        data: data,
    })
}
//导出客户
export function exportCustomer(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/customerExport',
        method: 'post',
        data: data,
    })
}