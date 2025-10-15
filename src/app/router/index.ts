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
    component: () => import("@/app/views/WelcomeView.vue"),
  },
  ...pokedexRoutes,
  ...favoritesRoutes,
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
