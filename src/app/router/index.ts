import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { pokedexRoutes } from "../../features/pokedex/routes";
import { favoritesRoutes } from "../../features/favorites/routes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "welcome",
    meta: { title: "Welcome" },
    component: () => import("@/app/views/WelcomeView.vue"),
  },
  ...pokedexRoutes,
  ...favoritesRoutes,
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  const baseTitle = "Pokedex App";
  document.title = to.meta.title
    ? `${to.meta.title} | ${baseTitle}`
    : baseTitle;
});
