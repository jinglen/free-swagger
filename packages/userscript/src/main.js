import Vue from "vue";
import { createAppContainer } from "@/utils/monkey-starter";
import "@/style/index.scss";
import "@/icons";
import "./plugins/element.js";
import "@/utils/hooks";

import App from "./App.vue";

const selectorId = "extends-app";

createAppContainer(selectorId);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount(`#${selectorId}`);

// start(selectorId).then(async () => {
//   // 等待 prettier 加载完毕再加载组件
//   const { default: App } = await import("./App.vue");
// });

window.SWAGGER_EXTENDS_VERSION = {
  BRANCH,
  COMMITHASH,
  VERSION
};
