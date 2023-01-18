import request from '@/utils/request'
import HttpConstant from '@/utils/HttpConstant'
// 获取权限列表
export function getButtonList(data) {
    return request({
        url: '/guns-cloud-system/sysButton/queryListPage',
        method: 'get',
        params:data
    })
}
// 获取资源级联列表
export function getButtonArr(data) {
    return request({
        url: '/guns-cloud-system/sysButton/getResources',
        method: 'get',
        params:data
    })
}
// 新增
export function addButton(data) {
    return request({
        url: '/guns-cloud-system/sysButton/add',
        method: 'post',
        data:data
    })
}
// 更新
export function updateButton(data) {
    return request({
        url: '/guns-cloud-system/sysButton/update',
        method: 'post',
        data:data
    })
}
// 删除
export function delButton(data) {
    return request({
        url: '/guns-cloud-system/sysButton/delete',
        method: 'get',
        params:data
    })
}
//启用禁用菜单
export function changeStatus(data) {
    return request({
        url: '/guns-cloud-system/sysButton/changeStatus',
        method: 'get',
        params:data
    })
}
//获取菜单详情
export function getButtonDetail(data) {
    return request({
        url: '/guns-cloud-system/sysButton/getDetail',
        method: 'get',
        params:data
    })
}
