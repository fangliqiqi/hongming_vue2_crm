import request from '@/utils/request'

// 最新商机
export function newBusiness(data) {
    return request({
        url: '/hmkj-crm/homePage/newBusiness',
        method: 'post',
        data: data,
    })
}

//商机跟进提醒
export function followRemind(data) {
    return request({
        url: '/hmkj-crm/homePage/businessFollowRemind',
        method: 'post',
        data: data,
    })
}
//获取一级行业分类信息
export function getIndustryList(data) {
    return request({
        url: '/hmkj-crm/crmIntermIndustry/getList',
        method: 'get',
        data: data,
    })
}
//获取两级行业分类信息
export function getMapIndustry(data) {
    return request({
        url: '/hmkj-crm/crmIntermIndustry/getMapIndustry',
        method: 'get',
        data: data,
    })
}

//业务员主管首页首行
export function salesmanSupervisorOne(query) {
    return request({
        url: '/hmkj-crm/salespersonSupervisorChart/selectSupervisorMonthlyStatistics',
        method: 'get',
        params: query
    })
}

//业务员主管首页尾行
export function salesmanSupervisorLast(data) {
    return request({
        url: '/hmkj-crm/salespersonSupervisorChart/selectOrderReminder',
        method: 'post',
        data: data
    })
}

//业务员首页冠军榜
export function ChampionList(data) {
    return request({
        url: '/hmkj-crm/salesmanChart/selectChampionsList',
        method: 'post',
        data: data
    })
}

//业务员首页公海消息轮播
export function highSeasCarousel(query) {
    return request({
        url: '/hmkj-message/messageReceiving/highSeasCarousel',
        method: 'get',
        params: query
    })
}

//业务员首页首行数据
export function salesmanFirst(query) {
    return request({
        url: '/hmkj-crm/salesmanChart/selectMonthlyStatistics',
        method: 'get',
        params: query
    })
}

//业务员首页尾行数据
// export function salesmanLast(query) {
//     return request({
//         url: '/hmkj-crm/salesmanChart/clientRemind',
//         method: 'get',
//         params: query
//     })
// }
// 异常订单提醒
export function findAbnormalOrderMessage(query) {
    return request({
        url: '/hmkj-message/messageReceiving/findAbnormalOrderMessage',
        method: 'get',
        params: query
    })
}
// 审核失败提醒
export function findAuditFailureMessage(query) {
    return request({
        url: '/hmkj-message/messageReceiving/findAuditFailureMessage',
        method: 'get',
        params: query
    })
}
// 客户跟进提醒
export function findFollowMessage(query) {
    return request({
        url: '/hmkj-message/messageReceiving/findFollowMessage',
        method: 'get',
        params: query
    })
}
// 续签客户提醒
export function findRenewCustomerMessage(query) {
    return request({
        url: '/hmkj-message/messageReceiving/findRenewCustomerMessage',
        method: 'get',
        params: query
    })
}


//客服主管数据
export function CustomerServiceSupervisor(query) {
    return request({
        url: '/hmkj-crm/customerServiceSupervisor/customerServiceSupervisorHomeShow',
        method: 'get',
        params: query
    })
}

//客服数据
export function CustomerService(query) {
    return request({
        url: '/hmkj-crm/customerService/customerServiceHomeShow',
        method: 'get',
        params: query
    })
}

//外账主管数据
export function ForeignAccountAupervisor(query) {
    return request({
        url: '/hmkj-crm/foreignSupervisorChar/foreignSupervisorHomeShow',
        method: 'get',
        params: query
    })
}

//外账专员数据
export function ExternalAccount(query) {
    return request({
        url: '/hmkj-crm/foreignChar/foreignHomeShow',
        method: 'get',
        params: query
    })
}

//内账主管
export function InternalAccountingSupervisor(query) {
    return request({
        url: '/hmkj-crm/accountantSupervisor/accountantSupervisorHomeShow',
        method: 'get',
        params: query
    })
}

//内账办事员数据
export function InternalAccount(query) {
    return request({
        url: '/hmkj-crm/internalAccountant/internalAccountantHomeShow',
        method: 'get',
        params: query
    })
}

//外勤主管数据
export function FieldSupervisor(query) {
    return request({
        url: '/hmkj-crm/fieldSupervisor/fieldSupervisorHomeShow',
        method: 'get',
        params: query
    })
}

//外勤专员数据
export function FieldClerk(query) {
    return request({
        url: '/hmkj-crm/fieldSpecialist/fieldSpecialistHomeShow',
        method: 'get',
        params: query
    })
}

//房产业务员异常订单提醒
export function abnormalOrderReminder(query) {
    return request({
        url: '/hmkj-crm/houseSalesman/selectArrears',
        method: 'get',
        params: query
    })
}
//房产业务员首行
export function houseSalesman(query) {
    return request({
        url: '/hmkj-crm/houseSalesman/selectOrderNumber',
        method: 'get',
        params: query
    })
}

//房产业务员审核失败提醒
export function auditFailureReminder(query) {
    return request({
        url: '/hmkj-crm/houseSalesman/selectAuditFailure',
        method: 'get',
        params: query
    })
}

//房产业务员即将到期客户
export function expiringUsers(query) {
    return request({
        url: '/hmkj-crm/houseSalesman/selectExpiring',
        method: 'get',
        params: query
    })
}

//房产业务员、提单员冠军榜
export function houseChampionship(data) {
    return request({
        url: '/hmkj-crm/billOfLading/selectChampionList',
        method: 'post',
        data: data
    })
}

//房产提单员首行
export function houseBillOfLading(query) {
    return request({
        url: '/hmkj-crm/billOfLading/selectOrderNumber',
        method: 'get',
        params: query
    })
}

//房产提单员待提单提醒
export function ToBeRemindedByBillOfLading(query) {
    return request({
        url: '/hmkj-crm/billOfLading/selectToSubmitOrder',
        method: 'get',
        params: query
    })
}

//房产经理首行
export function PropertyManager(query) {
    return request({
        url: '/hmkj-crm/supervisor/selectOrderNumber',
        method: 'get',
        params: query
    })
}

//房产经理审核提醒
export function auditReminder(query) {
    return request({
        url: '/hmkj-crm/supervisor/selectReviewReminder',
        method: 'get',
        params: query
    })
}

//老板首行
export function bossManager(query) {
    return request({
        url: '/hmkj-crm/generalManager/selectClient',
        method: 'get',
        params: query
    })
}
//老板中间行总收入
export function totalRrevenue(data) {
    return request({
        url: '/hmkj-crm/generalManager/selectProjectTypeIncome',
        method: 'post',
        data: data
    })
}

//
