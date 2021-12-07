/*
 * @Date: 2021-12-06 10:58:50
 * @LastEditTime: 2021-12-07 15:52:49
 * @FilePath: \vue-admin-demo\src\permission.js
 */
import router from './router'
// import constantRoutes from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar NProgress是页面跳转是出现在浏览器顶部的进度条
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import store from './store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      if(store.getters.routes.length ){
        console.log(store.getters.routes.length, to.name)
        next()
      }else {
          // 第一次登录时 加载路由
          // 将路由添加到 store 中，用来标记已添加动态路由
          await store.dispatch('permission/addAsyncRoutes')
          // router.addRoute(accessRoutes)
          // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            // 确保addRoutes()时动态添加的路由已经被完全加载上去。
          next({ ...to, replace: true })
          console.log(router)
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
