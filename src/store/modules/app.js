/*
 * @Date: 2021-12-06 09:20:10
 * @LastEditTime: 2021-12-07 10:59:22
 * @FilePath: \vue-admin-demo\src\store\modules\app.js
 */
import Cookies from 'js-cookie'

const state = {
  sidebar: {
    // 是否打开侧边栏
    /**
     * Cookies.get(‘sidebarStatus’))的意思是取出来的是 "0"
     * +Cookies.get(‘sidebarStatus’)的意思是 +"0" , 触发隐式类型转换, 会得到 0
     * !+Cookies.get(‘sidebarStatus’))的意思是 !0 , 对数值类型取反会返回布尔类型, 会得到 true
     * !!+Cookies.get(‘sidebarStatus’)的意思是 !true , 对布尔的true进行取反, 会得到 false
     */
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // withoutAnimation:false // 控制模式为mobile时的样式显示
  },
  // ELementUI的尺寸大小
  size: Cookies.get('size') || 'medium'
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
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
  mutations,
  actions
}
