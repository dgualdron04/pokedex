import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("@/app/views/WelcomeView.vue"),
  },
  {
    path: "/pokedex",
    name: "pokedex",
    component: () => import("@/features/pokedex/views/PokedexListView.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
