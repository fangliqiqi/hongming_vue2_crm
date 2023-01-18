import request from '@/utils/request'

// 查询用户列表
export function listUserPage(data) {
    return request({
        url: '/guns-cloud-system/entUser/queryListPage',
        method: 'post',
        data: data,
        params: { pageNo: data.pageNo, pageSize: data.pageSize }
    })
}

//查询公司员工列表
export function listUser(data) {
    return request({
        url: '/guns-cloud-system/entUser/queryCompanyIdList',
        method: 'get',
        params: data
    })
}


// 查询用户详细
export function getUser(data, type = 20) {
    return request({
        url: type == 20 ? '/guns-cloud-system/entUser/getCrmUserDetail' : '/guns-cloud-system/entUser/detail',
        method: 'get',
        params: data
    })
}

// 新增用户
export function addUser(data, type = 20) {
    return request({
        url: type == 20 ? '/guns-cloud-system/entUser/addCrmUser' : '/guns-cloud-system/entUser/add',
        method: 'post',
        data: data
    })
}

// 修改用户
export function updateUser(data, type = 20) {
    return request({
        url: type == 20 ? '/guns-cloud-system/entUser/updateCrmUser' : '/guns-cloud-system/entUser/update',
        method: 'post',
        data: data
    })
}


// 删除用户
export function delUser(data, type = 20) {
    return request({
        url: type == 20 ? '/guns-cloud-system/entUser/deleteCrmUser' : '/guns-cloud-system/entUser/delete',
        method: type == 20 ? 'get' : 'post',
        params: data,
        data: data
    })
}

// 用户密码重置
export function resetUserPwd(userId) {
    const data = {
        userId: userId
    }
    return request({
        url: '/guns-cloud-system/entUser/resetPassword',
        method: 'get',
        params: data
    })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
    const data = {
        userId: userId,
        status: status
    }
    return request({
        url: '/guns-cloud-system/entUser/changeStatus',
        method: 'get',
        params: data
    })
}

//账号唯一性校验
export function getCheckAccount(account, userId) {
    return request({
        url: '/guns-cloud-system/entUser/checkAccount',
        method: 'get',
        params: { account: account, userId: userId }
    })
}
//身份证号唯一性校验
export function getCheckIDCard(IDCard, userId) {
    return request({
        url: '/guns-cloud-system/entUser/checkIDCard',
        method: 'get',
        params: { IDCard: IDCard, userId: userId }
    })
}
//手机号唯一性校验
export function getCheckPhone(phone, userId) {
    return request({
        url: '/guns-cloud-system/entUser/checkPhone',
        method: 'get',
        params: { phone: phone, userId: userId }
    })
}

//手机号唯一性校验
export function getUserByPhone(phone, userId) {
    return request({
        url: '/guns-cloud-system/entUser/queryUserByPhone',
        method: 'get',
        params: { phone: phone, userId: userId }
    })
}

// 根据部门id获取用户下拉列表
export function findUserList(deptId) {
    return request({
        url: '/guns-cloud-system/entUser/findUserList',
        method: 'get',
        params: { deptId: deptId }
    })
}

// 根据员工id获取所有关联的应用id
export function getAppIdsByUserId(userId) {
    return request({
        url: '/guns-cloud-system/entUser/getAppIdsByUserId',
        method: 'get',
        params: { userId: userId }
    })
}

//获取公司下拉列表
export function getCompanySelect() {
    return request({
        url: '/guns-cloud-system/entUser/getCompanySelect',
        method: 'get',
    })
}

//获取部门下拉列表
export function getDeptSelect(companyId) {
    return request({
        url: '/guns-cloud-system/entUser/getDeptSelect',
        method: 'get',
        params: { companyId: companyId }
    })
}

//获取职务下拉列表
export function getDutySelect(companyId) {
    return request({
        url: '/guns-cloud-system/entUser/getDutySelect',
        method: 'get',
        params: { companyId: companyId }
    })
}

// 查询用户个人信息
export function getUserProfile() {
    return request({
        url: '/guns-cloud-system/entUser/getCurrentUser',
        method: 'get'
    })
}

// 保存当前登录人的信息
export function updateUserProfile(data) {
    return request({
        url: '/guns-cloud-system/entUser/saveCurrentUser',
        method: 'post',
        data: data
    })
}
// 保存人员配置好的角色
export function saveRolesProfile(data) {
    return request({
        url: '/guns-cloud-system/entUser/saveRoles',
        method: 'post',
        data: data
    })
}
// 用户密码重置
export function updateUserPwd(oldPassword, newPassword, repeatPassword) {
    const data = {
        newPassword: newPassword,
        oldPassword: oldPassword,
        repeatPassword: repeatPassword
    }
    return request({
        url: '/guns-cloud-system/entUser/updatePassword',
        method: 'post',
        data: data
    })
}

// 用户头像上传
export function uploadAvatar(data) {
    return request({
        url: '/system/user/profile/avatar',
        method: 'post',
        data: data
    })
}

//应用下拉列表
export function application(query) {
    return request({
        url: '/guns-cloud-system/app/getAppSelect',
        method: 'get',
        params: query
    })
}