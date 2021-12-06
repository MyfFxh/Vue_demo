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
const constantRoutes = [
  {
    path: "/login",
    name: "login",
    // 路由级别代码分割
    // 为该路由生成一个单独的chunk(大约.[hash].js)
    // 当路由被访问时惰性加载。
    component: () => import("@/views/login/index"),
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
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
    ],
  },
];

// 有权限要求的页面
// const asyncRoutes = []
const router = new VueRouter({
  // 属性routes
  routes: constantRoutes,
});

export default router;
