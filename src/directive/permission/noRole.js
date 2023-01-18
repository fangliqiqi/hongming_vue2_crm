 /**
 * 角色权限处理
 * Copyright (c) 2019 HMT
 */

import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roleCodes

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value

      const noRole = roles.some(role => {
        return  roleFlag.includes(role)
      })
      if (noRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置角色权限标签值"`)
    }
  }
}
