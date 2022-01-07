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

var exp = (function() {
  var template = "/resources/extra/list/2323";
  // var  template = '/resources/extra/list/{id}'
  const stand = "isadsafadassfdadsaffsdljkjkjk";

  const final = template
    .replaceAll("/", "\\/")
    .replaceAll("-", "\\-")
    .replaceAll("_", "\\_")
    .replace(/[0-9]{1,}/g, `\{${stand}}`)
    .replaceAll(stand, "w{1,}");
  console.log("main的41行,into");
  console.log(final);

  return new RegExp(final);
})();
