import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as fontawesome from "./plugins/fontawesome";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  fontawesome,
  render: (h) => h(App),
}).$mount("#app");
