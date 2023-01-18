import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView';

const permission = {
    state: {
        routes: [],
        addRoutes: []
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes
            state.routes = constantRoutes.concat(routes)
        }
    },
    actions: {
        // 生成路由
        GenerateRoutes({ commit }) {
            return new Promise(resolve => {
                // 向后端请求路由数据
                getRouters().then(res => {
                    const accessedRoutes = filterAsyncRouter(res.data)
                    accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
                    commit('SET_ROUTES', accessedRoutes)
                    resolve(accessedRoutes)
                    console.log(accessedRoutes);
                })
            })
        }
    }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
    return asyncRouterMap.map(route => {
        if (route.component || route.url) {
            // Layout ParentView 组件特殊处理
            if (route.component === 'Layout' || route.url === 'Layout') {
                route.component = Layout
                route.path = '/' + route.code
            } else if (route.component === 'ParentView' || route.url === 'ParentView') {
                route.component = ParentView
                route.path = route.code
            } else {
                route.path = route.code
                route.component = loadView(route.component || route.url)
            }
            route.meta = { icon: route.icon, title: route.name, noCache: true }
            route.hidden = route.hiddenFlag != 'N'
        } else {
            console.info(route)
            route.component = ParentView
            try {
                route.meta = { icon: route.icon, title: route.name, noCache: true }
            } catch (e) {
                console.info(e)
            }
            route.path = route.code
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return route
    }).filter(item => { return item != undefined })
}

export const loadView = (view) => { // 路由懒加载
    return (resolve) => require([`@/views/${view}`], resolve)
}

export default permission