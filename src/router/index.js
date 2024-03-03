import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Dashboard from "../views/Dashboard.vue";
import store from '../store';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // Add meta field for route guard
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is logged in
    if (!store.state.isLoggedIn) {
      // If not logged in, redirect to the login page
      next('/admin');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
