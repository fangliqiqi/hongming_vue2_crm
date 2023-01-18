import { login, logout, getInfo, refreshToken } from '@/api/login'
import { getUserProfile } from "@/api/system/user";
import { tokenKey, appIdKey } from '@/settings'
import {
    _setSessionStore,
    _getSessionStore,
    _removeSessionStore
} from '@/utils/storage'
import { getAppSelect } from '@/api/system'

const user = {
    state: {
        token: '',
        name: '',
        avatar: '',
        roles: [],
        roleCodes: [],
        permissions: [],
        appList: [],
        myApps: [],
        id: '',
        appId: '',
        branchId: ''
    },

    mutations: {
        SET_APPS: (state, apps) => {
            state.appList = apps
        },
        SET_MYAPPS: (state, apps) => {
            state.myApps = apps
        },
        SET_APPID: (state, id) => {
            state.appId = id
        },
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_YUNFALG: (state, id) => {
            state.yunFalg = id
        },
        SET_BRANCHID: (state, id) => {
            state.branchId = id
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_EXPIRES_IN: (state, time) => {
            state.expires_in = time
        },
        SET_NAME: (state, name) => {
            state.name = name
        },

        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_ROLECODES: (state, roles) => {
            state.roleCodes = roles
        },
        SET_ROLENAMES: (state, roles) => {
            state.roleNames = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    },

    actions: {
        // 登录
        Login({ commit }, codeData) {
            return new Promise((resolve, reject) => {
                login(codeData).then(res => {
                    let data = res.data
                    _setSessionStore(tokenKey, data.token)
                    commit("SET_APPID", _getSessionStore(appIdKey))
                    commit('SET_TOKEN', data.token)
                        // setExpiresIn(data.expires_in)
                    commit('SET_EXPIRES_IN', data.expires_in)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    console.info("store.getInfo")
                    if (res.code == 200) {
                        const user = res.data
                        const avatar = user.photoUrl == "" ? require("@/assets/image/profile.jpg") : user.photoUrl;
                        if (user.roleIds && user.roleIds.length > 0) { // 验证返回的roles是否是一个非空数组
                            commit('SET_ROLES', user.roleIds)
                            commit('SET_ROLECODES', user.roleCodes)
                            commit('SET_PERMISSIONS', user.resourceUrls)
                            commit('SET_ROLENAMES', user.roleNames)
                        } else {
                            commit('SET_ROLES', ['ROLE_DEFAULT'])
                        }
                        commit('SET_YUNFALG', user.yunFalg);
                        commit('SET_ID', user.userId);
                        commit('SET_NAME', (user.name));
                        commit('SET_BRANCHID', user.branchId);
                        commit('SET_AVATAR', avatar);
                        commit("SET_APPID", _getSessionStore(appIdKey));
                        commit('SET_TOKEN', _getSessionStore(tokenKey));
                        getAppSelect().then(resp => {
                            let appList = resp.data.map(item => {
                                item.appId += ''
                                return item;
                            })
                            commit('SET_APPS', appList)
                            commit('SET_MYAPPS', appList.filter(item => {
                                return user.appId.includes(Number(item.appId));
                            }))
                        })
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 刷新token
        RefreshToken({ commit, state }) {
            return new Promise((resolve, reject) => {
                refreshToken(state.token).then(res => {
                    setExpiresIn(res.data)
                    commit('SET_EXPIRES_IN', res.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout({ token: state.token }).then(() => {
                    _removeSessionStore(tokenKey)
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSIONS', [])
                    resolve()
                }).catch(error => {
                    _removeSessionStore(tokenKey)
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                _removeSessionStore(tokenKey)
                resolve()
            })
        }
    }
}

export default user
