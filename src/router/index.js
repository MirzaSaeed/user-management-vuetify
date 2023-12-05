import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "home" },
    beforeEnter: (to, from, next) => {
      let isAuth = false;
      if (store.state.auth.isAuth === true) {
        isAuth = true;
      } else {
        isAuth = false;
      }
      if (isAuth) {
        next("/dashboard/create-user");
      } else {
        next();
      }
    },
    component: HomeView,
  },

  {
    path: "/dashboard",
    name: "dashboard",
    beforeEnter: (to, from, next) => {
      let isAuth = false;
      if (store.state.auth.isAuth === true) {
        isAuth = true;
      } else {
        isAuth = false;
      }
      if (isAuth) {
        next();
      } else {
        next("/");
      }
    },
    component: () => import("../views/DashboardView.vue"),
    children: [
      {
        path: "",
        name: "dashboard-home",
        component: () => import("../views/DashboardHomeView.vue"),
      },
      {
        path: "create-user",
        name: "userForm",
        component: () => import("../views/UserFormView.vue"),
      },
      {
        path: "user-list",
        name: "userList",
        component: () => import("../views/UserListView.vue"),
      },
      {
        path: "fetch-users",
        name: "fetchUsers",
        component: () => import("../views/FetchUsersView.vue"),
      },
    ],
  },
  {
    path: "/*",
    name: "notFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   let isAuth = false;
//   if (localStorage.getItem("auth")) {
//     isAuth = true;
//   } else {
//     isAuth = false;
//   }
//   if (isAuth) {
//     next();
//   } else {
//     next("/");
//   }
// });
export default router;
