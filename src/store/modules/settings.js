/*
 * @Date: 2021-12-06 17:39:02
 * @LastEditTime: 2021-12-07 10:47:07
 * @FilePath: \vue-admin-demo\src\store\modules\settings.js
 */
import defaultSettings from '@/settings'

const { tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

