import hasRole from './hasRole'
import hasPermi from './hasPermi'
import noPermi from './noPermi'
import noRole from './noRole'

const install = function(Vue) {
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
  Vue.directive('noPermi', noPermi)
  Vue.directive('noRole', noRole)
}

if (window.Vue) {
  window['hasRole'] = hasRole
  window['hasPermi'] = hasPermi
  window['noPermi'] = noPermi
  window['noRole'] = noRole
  Vue.use(install); // eslint-disable-line
}

export default install
