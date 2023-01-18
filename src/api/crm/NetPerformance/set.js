import request from '@/utils/request'
// 新增净业绩
export function addNetPerformance(data) {
    return request({
        url: '/hmkj-crm/perfTypes/add',
        method: 'post',
        data: data,
    })
}

 //获取净业绩列表的接口
export function netPerformanceSeal(data) {
    return request({
        url: "/hmkj-crm/perfTypes/queryList",
        method: "post",
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    });
}

//修改净业绩
export function changeNetPerformance(data) {
    return request({
      
    });
}


//公章批量删除
export function deleteNetPer(data) {
    // return request({
    //     url: "/hmkj-crm/marketOfficialSeal/batchDeletion",
    //     method: "post",
    //     data: data,
    // });
}

////获取适用项目
export function getApplicableItems(data) {
    return request({

    })
}


