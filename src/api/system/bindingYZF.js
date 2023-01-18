import request from '@/utils/request'

// 云帐房一键登录
export function add(data) {
    return request({
        url: '/guns-cloud-system/crmuserOryzf/add',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}
// 云帐房一键登录-详情
export function queryDetailByUid(data) {
    return request({
        url: '/guns-cloud-system/crmuserOryzf/queryDetailByUid',
        method: 'post',
        data: data,
        // params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}
