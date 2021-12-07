/*
 * @Date: 2021-12-03 16:31:51
 * @LastEditTime: 2021-12-07 14:57:27
 * @FilePath: \vue-admin-demo\src\store\modules\user.js
 */

import { getToken, setToken, removeToken } from "@/utils/auth";
import { login } from "@/api/user";

const state = {
  token: getToken(), // 从cookies中获取token
  name: "",
  avatar: "", // 头像
  introduction: "", // 个人介绍
  roles: [], //所属角色
};
const mutations = {
  /**
   * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
   * store.commit 调用mutations
   */
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};
/**
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 * Action 通过 store.dispatch 方法触发
 */
const actions = {
  /**
   * 用户登录
   * @param {*} param0 commit 简化
   * @param {*} userInfo 用户名+密码
   * @returns
   */
  login({ commit }, userInfo) {
    /**
     * increment ({ commit }) {
     *  commit('increment')
     * }相当于
     * increment (context) {
     *  context.commit('increment')
     * }
     */
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      // 调用api接口
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          // 放入cookie
          setToken(data.token);
          resolve(); // 设置promise的状态为已完成
        })
        .catch((error) => {
          reject(error); //设置promise的状态为已失败
        });
    });
  },

  /**
   * 更新 Token
   */
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
};

/**
 * vuex中的store分模块管理，需要在store的index.js中引入各个模块，
 * 为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
 * 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
 * $store.state.user.name
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
