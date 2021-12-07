import Vue from "vue";
import VueRouter from "vue-router";
/* Layout */
import Layout from "@/layout";

Vue.use(VueRouter);

/**
 * constantRoutes
 * 没有权限要求的基本页
 * 所有的角色都可以访问的页面
 */
export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    // 路由级别代码分割
    // 为该路由生成一个单独的chunk(大约.[hash].js)
    // 当路由被访问时惰性加载。
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true //hidden 是否需要展示该路由,是否渲染该路由入口
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "house" },
      },
    ],
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'document' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

// 有权限要求的页面
export const asyncRoutes = []
const router = new VueRouter({
  // 属性routes
  routes: constantRoutes,
});

export default router;
