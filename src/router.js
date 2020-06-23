import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import CountryPage from "@/views/CountryPage";

Vue.use(Router);

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
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
  ],
});
