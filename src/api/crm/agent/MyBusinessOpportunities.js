import request from '@/utils/request'

// 查询商机信息列表
export function BusinessOpportunityList(data) {
    return request({
        url: '/hmkj-crm/resoBusinessOpportunity/myBusinessOpportunity',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}