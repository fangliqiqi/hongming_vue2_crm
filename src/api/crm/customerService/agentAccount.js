import request from '@/utils/request'

//查询列表
export function BusirSerprice(data) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/query',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

//我的代账
export function MySpecialApproval(data) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/queryListDivideYour',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

//停止服务
export function stopService(query) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/stopService',
        method: 'get',
        params: query
    })
}
//收费登记列表
export function findReturnedMoney(query) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/findReturnedMoney',
        method: 'get',
        params: query
    })
}

//审核详情展示
export function auditDetailsDisplay(query) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/auditDetails',
        method: 'get',
        params: query
    })
}

//收费登记确认收费
export function MarketBusirSerpriceCharge(data) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/manualChargeAmount',
        method: 'post',
        data: data
    })
}

//修改回款计划
export function updateReturned(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/updateReturned',
        method: 'post',
        data: data
    })
}

//票据记录回显
export function findPaperRecordsList(data) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/findPaperRecordsList',
        method: 'post',
        params: data
    })
}

//新增票据记录
export function addPaperRecords(data) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/addPaperRecords',
        method: 'post',
        data: data
    })
}
//票据图片上传
export function imgUpload(data) {
    return request({
        url: '/hmkj-crm/crmBillImg/upload',
        method: 'post',
        params: data
    })
}

//删除图片
export function delImg(data) {
    return request({
        url: '/hmkj-crm/crmBillImg/delete',
        method: 'post',
        params: data
    })
}

//补充上传材料
export function replenishMaterials(query) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/replenishMaterials',
        method: 'get',
        params: query
    })
}


//补充材料回显
export function findBillList(query) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/findBillList',
        method: 'get',
        params: query
    })
}



//派工
export function allocation(data) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/allocation',
        method: 'post',
        data: data
    })
}

//分配查询部门
export function entDept(data) {
    return request({
        url: '/guns-cloud-system/entDept/queryList',
        method: 'post',
        data: data,
    })
}

//根据部门获取用户下拉列表
export function entUser(query) {
    return request({
        url: '/guns-cloud-system/entUser/findUserList',
        method: 'get',
        params: query,
    })
}

//联系人列表
export function getPersonnelList(data) {
    return request({
        url: '/hmkj-crm/marketCompanyPersonnel/queryList',
        method: 'post',
        data: data
    })
}
//删除联系人
export function delPersonnelList(data) {
    return request({
        url: '/hmkj-crm/marketCompanyPersonnel/logicDelete',
        method: 'post',
        params: data
    })
}

//新增联系人
export function addPersonnelList(data) {
    return request({
        url: '/hmkj-crm/marketCompanyPersonnel/add',
        method: 'post',
        data: data
    })
}

//修改联系人
export function updatePersonnelList(data) {
    return request({
        url: '/hmkj-crm/marketCompanyPersonnel/update',
        method: 'post',
        data: data
    })
}
//跟进记录
export function FollowRecord(query) {
    return request({
        url: '/hmkj-crm/crmFollowRecord/queryListToMany',
        method: 'get',
        params: query,
    })
}

//跟进记录图片上传
export function uploadImg(data) {
    return request({
        url: '/hmkj-crm/crmRecordImg/upload',
        method: 'post',
        params: data
    })
}

//删除跟进记录图片
export function deleteImg(query) {
    return request({
        url: '/hmkj-crm/crmRecordImg/delete',
        method: 'get',
        params: query,
    })
}


//添加跟进记录
export function addFollowRecord(data) {
    return request({
        url: '/hmkj-crm/crmFollowRecord/add',
        method: 'post',
        data: data
    })
}

//合同页面展示
export function FileByCompanyId(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectCustomerContractAndImgBySerpriceId',
        method: 'get',
        params: query,
    })
}


//合同续费提交
export function contractProjectRenewal(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/projectRenewal',
        method: 'post',
        data: data
    })
}

//续费失败时
export function contractProjectRenewalDetails(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/contractDetails',
        method: 'get',
        params: query,
    })
}

// 付款地址
export function findPayMethod(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/findPayMethod',
        method: 'get',
        params: query,
    })
}

//订单页面展示
export function selectOrderBySerpriceId(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectOrderBySerpriceId',
        method: 'get',
        params: query,
    })
}

//标记回显
export function MarkEcho(data) {
    return request({
        url: '/hmkj-crm/crmIntermUserlabel/selectLabel',
        method: 'post',
        data: data
    })
}

//选择的客户标签
export function checkLabel(data) {
    return request({
        url: '/hmkj-crm/companyLabel/addCompanyLabel',
        method: 'post',
        data: data
    })
}

//新增客户标签
export function addLabel(data) {
    return request({
        url: '/hmkj-crm/crmIntermUserlabel/addCompanyLabel',
        method: 'post',
        data: data
    })
}

//删除客户标签
export function delLabel(query) {
    return request({
        url: "/hmkj-crm/crmIntermUserlabel/delete",
        method: 'get',
        params: query
    })
}

//修改客户标签
export function updateLabel(data) {
    return request({
        url: '/hmkj-crm/crmIntermUserlabel/update',
        method: 'post',
        data: data
    })
}
//导出
export function exportD(data) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/customerServiceReportExport',
        method: 'post',
        data: data
    })
}

//客服查询分配部门列表
export function Department(data) {
    return request({
        url: '/guns-cloud-system/entDept/findDeptList',
        method: 'post',
        data: data
    })
}
//客服查询分配部门下员工列表
export function Staff(query) {
    return request({
        url: '/guns-cloud-system/entDept/findUserListByDeptId',
        method: 'get',
        params: query
    })
}

//即将到期客户
export function ExpiringCustomers(data) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/customerServiceExpiring',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

//欠费客户
export function CustomerInArrears(data) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/customerServiceArrears',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

//激活停止服务客户
export function activation(query) {
    return request({
        url: '/hmkj-crm/serviceMarketBusirSerprice/activateService',
        method: 'get',
        params: query,
    })
}
