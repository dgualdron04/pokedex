import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { pokedexRoutes } from "../../features/pokedex/routes";
import { favoritesRoutes } from "../../features/favorites/routes";
import { searchRoutes } from "../../features/search/routes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "welcome",
    component: () => import("@/app/views/WelcomeView.vue"),
  },
  ...pokedexRoutes,
  ...favoritesRoutes,
  ...searchRoutes,
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
