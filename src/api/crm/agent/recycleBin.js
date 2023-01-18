// import request from '../clientRecycle/node_modules/@/utils/request'
import request from "@/utils/request";

// 查询回收站信息列表
export function BusinessRecycleBin(data) {
  return request({
    url: '/hmkj-crm/BusinessRecycleBin/queryListPage',
    method: 'post',
    data: data,
    params:{pageNo:data.pageNo,pageSize:data.pageSize}
  })
}

//还原
export function restore(query) {
  return request({
    url: '/hmkj-crm/BusinessRecycleBin/restore',
    method: 'get',
    params: query,
    
  })
}

//彻底删除
export function RecycleBinDelete (query) {
    return request({
      url: '/hmkj-crm/BusinessRecycleBin/delete',
      method: 'get',
      params: query,
      
    })
  }
