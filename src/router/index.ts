import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import LoginView from "../views/Login.vue";
import SignUpView from "../views/SignUp.vue";
import HomeView from "../views/Home.vue";

const routes = [
  {
    path: "/signin",
    name: "signin",
    component: LoginView,
    meta: { auth: false },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
    meta: { auth: false },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.auth && !authStore.authenticated) {
    next({ name: "signin" });
  } else if (!to.meta.auth && authStore.authenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
