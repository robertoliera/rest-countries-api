import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import CountryPage from "@/views/CountryPage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/country/:id",
      name: "CountryPage",
      component: CountryPage,
    },
    /* {
      path: "/mi-cuenta/:id",
      name: "account-user",
      component: Account,
    }, */
  ],
});
