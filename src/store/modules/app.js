/*
 * @Date: 2021-12-06 09:20:10
 * @LastEditTime: 2021-12-06 09:23:17
 * @FilePath: \vue-admin-demo\src\store\modules\app.js
 */
import Cookies from 'js-cookie'

const state = {
  // ELementUI的尺寸大小
  size: Cookies.get('size') || 'medium'
}
/**
 * vuex中的store分模块管理，需要在store的index.js中引入各个模块，
 * 为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
 * 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
 * $store.state.app.size
 */
export default {
  namespaced: true,
  state,
  mutation:{},
  actions:{}
}
