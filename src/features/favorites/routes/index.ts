import type { RouteRecordRaw } from "vue-router";
import { buildDetailModalChild } from "@/features/details/routes";

export const favoritesRoutes: Array<RouteRecordRaw> = [
  {
    path: "/favorites",
    component: () => import("@/features/pokedex/layouts/PokedexLayout.vue"),
    children: [
      {
        path: "",
        name: "favorites",
        component: () => import("../views/PokemonFavoritesView.vue"),
      },
      buildDetailModalChild(
        "favorites-detail",
        () => import("../views/PokemonFavoritesView.vue"),
      ),
    ],
  },
];
