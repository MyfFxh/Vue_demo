const path = require("path");
// 读取默认的配置
const defaultSettings = require("./src/settings.js");
const name = defaultSettings.title || "vue Element Admin"; // page title

module.exports = {
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        assets: "@/assets",
        components: "@/components",
        styles: "@/styles",
        utils: "@/utils",
      },
    },
  },
};
