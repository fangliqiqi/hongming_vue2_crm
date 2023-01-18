import request from '@/utils/request'

const client_id = 'web'
const client_secret = '123456'
const scope = 'server'

// 登陆
export function getAuthCode(data) {
  return request({
    url: '/api/auth/accessCode',
    method: 'post',
    data: data
  })
}


// 图片验证码
export function getCodeImg() {
  let url='/api/sms/getVerifyCodeFactory'
  return request({
    url: url,
    method: 'get',
    params: {}
  })
}


// 登录方法
export function login(data) {
  return request({
    url: '/api/sso/login',
    method: 'post',
    data:data
  })
}

// 刷新方法
export function refreshToken() {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}

// 获取用户详细信息
export function getInfo(data) {
  return request({
    url: '/guns-cloud-system/system/getUserInfo',
    method: 'get',
    params:data
  })
}

// 退出方法
export function logout(data) {
  return request({
    url: '/api/sso/logout',
    method: 'post',
    data:data
  })
}


// 短信验证码
export function getSmsCode(data) {
  let url='/api/sms/sendShortMessage'
  return request({
    url: url,
    method: 'post',
    data: data
  })
}


// 登录方法
export function smslogin(data) {
  return request({
    url: '/api/app/smsCodeLogin',
    method: 'post',
    data:data
  })
}
