import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { tokenKey, appIdKey } from '@/settings'
import errorCode from '@/utils/errorCode'
import { tansParams } from "@/utils/hmt";
import { _getSessionStore } from '@/utils/storage'
import HttpConstant from './HttpConstant'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
    // 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 1000 * 60, // request timeout
    withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    config.headers['X-Auth-AppId'] = store.getters.appId || _getSessionStore(appIdKey) || ''
    config.headers['Authorization'] = store.getters.token || _getSessionStore(tokenKey) || ''

    console.log(config)

    if (config.type == HttpConstant.FORM_DATA_REQ) {
        config.headers["Content-Type"] = HttpConstant.FORM_DATA_REQ;
    }
    if (config.type == HttpConstant.APPLICATION_JSON_REQ) {
        config.headers["Content-Type"] = HttpConstant.APPLICATION_JSON_REQ;
    }
    console.info(config.type == HttpConstant.MUL_FORM_REQ)
    if (config.type == HttpConstant.MUL_FORM_REQ) {
        config.headers["Content-Type"] = HttpConstant.MUL_FORM_REQ;
    }
    return config
}, error => {
    // console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        // console.info(res)
        const code = res.data.code || 200;
        // 获取错误信息
        const msg = res.data.message || errorCode[code] || errorCode['default']
            // console.info(msg)
        if (code === 401) {
            MessageBox.confirm(
                '登录状态已过期，您可以继续留在该页面，或者重新登录',
                '系统提示', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            })
        } else if (code === 500) {
            Message({
                showClose: true,
                message: msg,
                type: 'error'
            })
            return Promise.reject(res)
        } else if (code == 400888 || code == 401666 || code == 41601) {
            //*
            // 401666 登录令牌为空，请检查是否已登录
            // 400888 token无效过期
            // 41601 token过期
            // 403777 没有访问该资源的权限
            // */
            return Promise.reject(res)
        } else if (code !== 200) {
            Notification.error({
                title: msg
            })
            return Promise.reject(res)
        } else {
            return res.data
        }
    },
    error => {
        // console.log('err' + error)
        // console.info(error.response)
        let { message: msg } = error;
        let { code, message } = error.response.data
        console.info(error.response)
        console.info(code, message)
        if (code == 400888 || code == 401666 || code == 41601) {
            MessageBox.confirm(
                '登录状态已过期，您可以继续留在该页面，或者重新登录',
                '系统提示', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                }).catch(err => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            })
        } else if (msg == "Network Error") {
            message = "后端接口连接异常";
        } else if (msg.includes("timeout")) {
            message = "系统接口请求超时";
        }
        // else if (msg.includes("Request failed with status code")) {
        //   message = "系统接口" + msg.substr(msg.length - 3) + "异常";
        // }
        if (message) {
            Message({
                showClose: true,
                message: message,
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            Message({
                showClose: true,
                message: "小莫处理数据" + msg.substr(msg.length - 3) + "异常",
                type: 'error',
                duration: 5 * 1000
            })
        }

        return Promise.reject(error)
    }
)

// 通用下载方法
export function download(url, params, filename) {

    if (params === false) {
        console.info(arguments)
        let elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(process.env.VUE_APP_FILE_API + url)
        document.body.appendChild(elink)
        console.info(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
            // document.body.removeChild(elink)
        return Promise.resolve()

    } else {
        return service.post(url, params, {
            transformRequest: [(params) => {
                return tansParams(params)
            }],
            headers: {
                'Content-Type': HttpConstant.FORM_DATA_REQ //'application/x-www-form-urlencoded'
            },
            responseType: 'blob'
        }).then((data) => {
            const content = data
            const blob = new Blob([content])
            if ('download' in document.createElement('a')) {
                const elink = document.createElement('a')
                elink.download = filename
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href)
                document.body.removeChild(elink)
            } else {
                navigator.msSaveBlob(blob, filename)
            }
        }).catch((r) => {
            // console.error(r)
        })
    }


}

export default service
