import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as fontawesome from "./plugins/fontawesome";
import { amount } from "./filters";

Vue.config.productionTip = false;

Vue.filter("amount", amount);

new Vue({
  router,
  store,
  fontawesome,
  render: (h) => h(App),
}).$mount("#app");
