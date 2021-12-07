/**
 * 根据角色动态获取路由
 * @Date: 2021-12-07 11:27:21
 * @LastEditTime: 2021-12-07 11:27:21
 * @FilePath: \vue-admin-demo\src\store\modules\permission.js
 */
import {constantRoutes, asyncRoutes} from '@/router'
const state = {
  routes: [],
  addRoutes: []
}
const mutations={
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes // 在默认路由上添加新的路由
    state.routes = constantRoutes.concat(routes)
    console.log(state.routes)
  }
}
const actions = {
  addAsyncRoutes ({commit }) {
    return new Promise(resolve => {
      commit('SET_ROUTES', asyncRoutes)
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
