import request from '@/utils/request'

//业务员主管本月成交额
export function turnoverOfThisMonth(data) {
    return request({
        url: '/hmkj-crm/salespersonSupervisorChart/selectDeptMonthTurnover ',
        method: 'post',
        data: data,
    })
}

//客服主管首页中间行报表
export function CustomerServiceSupervisor(data) {
    return request({
        url: '/hmkj-crm/customerServiceSupervisor/selectMemberFeeData',
        method: 'post',
        data: data
    })
}

//客服首页中间行报表
export function CustomerService(data) {
    return request({
        url: '/hmkj-crm/customerService/selectCustomerClassification',
        method: 'post',
        data: data
    })
}

//内账主管中间行报表财税客户收入
export function totalRevenue(data) {
    return request({
        url: '/hmkj-crm/accountantSupervisor/selectIncomeStatistics',
        method: 'post',
        data: data
    })
}

//房产经理柱状图 订单数据
export function orderData(data) {
    return request({
        url: '/hmkj-crm/supervisor/selectOrderHistogram',
        method: 'post',
        data: data
    })
}

//房产经理折线图  客户数据
export function customerData(data) {
    return request({
        url: '/hmkj-crm/supervisor/customerDataLineChart',
        method: 'post',
        data: data
    })
}

//总经理整年收入情况 
export function overallIncome(data) {
    return request({
        url: '/hmkj-crm/generalManager/selectAnnualIncome',
        method: 'post',
        data: data
    })
}
//总经理首页客户增长流失情况
export function customerChurn(data) {
    return request({
        url: '/hmkj-crm/generalManager/selectCustomerChurnHappening',
        method: 'post',
        data: data
    })
}