import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Cookies from "js-cookie";
/**
 * 是一种CSS reset的替代方案。在默认的HTML元素样式上提供了跨浏览器的高度一致性。
 * 相比于传统的CSS reset，Normalize.css是一种现代的、为HTML5准备的优质替代方案。
 *
 * 保护有用的浏览器默认样式而不是完全去掉它们
 * 一般化的样式：为大部分HTML元素提供
 * 修复浏览器自身的bug并保证各浏览器的一致性
 * 优化CSS可用性：用一些小技巧
 * 解释代码：用注释和详细的文档来
 */
import "normalize.css";
import Element from "element-ui";
import "./styles/element-variables.scss";

import "@/styles/index.scss"; // 引入 全局css
Vue.use(Element, {
  size: Cookies.get("size") || "medium", // 设置ElementUI默认尺寸
  // 这里的cookie是方便之后在页面上可调节尺寸的大小
}); // icon

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV )
  const { mockXHR } = require("./mock");
  mockXHR();
//}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
