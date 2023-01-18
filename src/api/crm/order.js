import request from '@/utils/request'

// 查询订单信息表
export function getOrder(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectOrderAndSerprice',
        method: 'get',
        params: data,
    })
}

// 修改公司业务工单（订单）
export function updateOrder(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/orderUpdate',
        method: 'post',
        data: data
    })
}
// 删除公司业务工单（订单）
export function delOrder(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/orderDelete',
        method: 'get',
        params: data
    })
}

// 新增订单信息
export function addOrder(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/orderAdd',
        method: 'post',
        data: data,
    })
}

//提交订单
export function orderSubmission(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/orderSubmission',
        method: 'post',
        data: data,
    })
}

// 查询公司业务工单（订单）列表
export function listOrder(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectOrderByCompanyId',
        method: 'get',
        params: query
    })
}

// 设置预收款
export function updateAdvance(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/updateAdvance',
        method: 'post',
        data: data,
    })
}

//添加购买的服务产品与订单的关系,并同时录入回款计划(如有预收款,产品金额减去预收款,并设置回款计划)
export function addBusirAndSerprice(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/addBusirAndSerprice',
        method: 'post',
        data: data,
    })
}
//添加赠送的服务项目与订单关系
export function addGiveSerprice(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/addGiveSerprice',
        method: 'post',
        data: data,
    })
}



// 修改项目信息
export function updateServe(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/updateSerprice',
        method: 'post',
        data: data,
    })
}

// 修改项目信息
export function productUpdate(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/productUpdate',
        method: 'post',
        data: data,
    })
}

// 删除项目信息
export function deleteServe(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/deleteSerprice',
        method: 'get',
        params: data
    })
}
//收款按钮
export function gathering(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/gathering',
        method: 'post',
        data: data
    })
}
//获取服务列表
export function getServeList(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectOrderAndSerprice',
        method: 'get',
        params: data,
    })
}

//收费详情
export function getServMoneyByOrderId(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectServMoneyByOrderId',
        method: 'get',
        params: data,
    })
}

//材料附件附件
export function getFileByOrderId(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectFileByOrderId',
        method: 'get',
        params: data,
    })
}

//获取服务下拉
export function getProTypeList(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectSerprice',
        method: 'get',
        params: data,
    })
}

//获取无参数服务下拉
export function selectProject(data) {
    return request({
        url: '/hmkj-crm/electronicContract/selectProject',
        method: 'get',
        params: data,
    })
}

//合同附件展示
export function getContractAndImgFile(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectContractAndImgFile',
        method: 'get',
        params: data,
    })
}

// 合同的修改并修改合同下的回款计划
export function updateContract(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/contractUpdate',
        method: 'post',
        data: data
    })
}
// 合同修改服务项目的服务时间
export function updateContractAndSerprice(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/updateContractAndSerprice',
        method: 'post',
        data: data
    })
}
//合同详情
export function getContract(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectContractParticulars',
        method: 'get',
        params: data,
    })
}

// 新增合同信息
export function addContract(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/contractAdd',
        method: 'post',
        data: data,
    })
}

//支出详情展示
export function getByOrderId(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectByOrderId',
        method: 'get',
        params: data,
    })
}

//展示这个订单下的项目对应的支出金额
export function getSerpriceExpendByOrderId(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectSerpriceExpendByOrderId',
        method: 'get',
        params: data,
    })
}

//支出的产品下拉展示
export function getExpenditure(data) {
    return request({
        url: '/hmkj-crm/crmAccountantSubject/selectExpenditure',
        method: 'post',
        data: data,
    })
}

//查询该订单下项目对应的对应的支出记录
export function getExpendByOrder(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectExpendByOrder',
        method: 'get',
        params: data,
    })
}

// 订单的额外支出添加
export function expenditureAdd(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/expenditureAdd',
        method: 'post',
        data: data,
    })
}

// 订单的额外支出添加
export function expenditureUpdate(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/expenditureUpdate',
        method: 'post',
        data: data,
    })
}


//查询这个订单下的所有服务项目对应的回款计划
export function getSerpriceServMoneyByOrderId(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectSerpriceServMoneyByOrderId',
        method: 'get',
        params: data,
    })
}

//回款计划,单独修改,已成交的不修改
export function updateReturned(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/updateReturned',
        method: 'post',
        data: data,
    })
}

//发起特殊审批
export function specialApproval(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/specialApproval',
        method: 'post',
        data: data,
    })
}
//合同选择列表
export function selectContractAndSerpriceByOrderId(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectContractAndSerpriceByOrderId',
        method: 'get',
        params: query
    })
}


//修改回款计划里的服务项
export function selectOrderAndSerprice(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectOrderAndSerprice',
        method: 'get',
        params: data,
    })
}

//撤销订单
export function revocation(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/revocation',
        method: 'get',
        params: data,
    })
}

//新增服务获取所属服务项
export function ServiceItem(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/selectByParent',
        method: 'post',
        data: data,
    })
}
//提价新增服务项
export function AddConfirmService(data) {
    return request({
        url: '/hmkj-crm/crmIntermSerprice/templateAdd',
        method: 'post',
        data: data,
    })
}

//预收款回显数据
export function AdvancePayment(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectDepositDetails',
        method: 'get',
        params: query,
    })
}

//材料附件富文本提交
export function richTextSubmission(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/productUpdate',
        method: 'post',
        data: data,
    })
}

//材料附件富文本修改回显
export function richTextEcho(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/projectRichText',
        method: 'get',
        params: query,
    })
}

//材料附件富文本下载
export function downloadRichText(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/generateProjectPdf',
        method: 'get',
        params: query,
    })
}
//修改合同详情
export function selectNewContractParticulars(query) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/selectNewContractParticulars',
        method: 'get',
        params: query,
    })
}
//修改合同详情-提交
export function contractUpdate(data) {
    return request({
        url: '/hmkj-crm/marketCompanyEssential/contractUpdate',
        method: 'post',
        data: data,
    })
}