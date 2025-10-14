import type { RouteRecordRaw } from "vue-router";
import { buildDetailModalChild } from "@/features/details/routes";

export const pokedexRoutes: Array<RouteRecordRaw> = [
  {
    path: "/pokedex",
    component: () => import("../layouts/PokedexLayout.vue"),
    children: [
      {
        path: "",
        name: "pokedex",
        components: {
          default: () => import("../views/PokedexListView.vue"),
        },
      },
      buildDetailModalChild(
        "pokemon-detail",
        () => import("../views/PokedexListView.vue"),
      ),
    ],
  },
];
