import Vue from "vue";
import Router from "vue-router";
import PageNotFound from "@/views/page-not-found";
const parseProps = r => ({ id: parseInt(r.params.id) });

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/people"
    },
    {
      path: "/people",
      name: "people",
      component: () => import("./views/people.vue")
    },
    {
      path: "/people/:id",
      name: "person-detail",
      component: () => import("./views/person-detail.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/about.vue")
    },
    {
      path: "*",
      component: PageNotFound
    }
  ]
});
