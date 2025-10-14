import type { RouteRecordRaw } from "vue-router";
import { buildDetailModalChild } from "@/features/details/routes";

export const searchRoutes: Array<RouteRecordRaw> = [
  {
    path: "/search",
    component: () => import("@/features/pokedex/layouts/PokedexLayout.vue"),
    children: [
      {
        path: "",
        name: "search",
        component: () => import("../views/SearchListView.vue"),
      },
      buildDetailModalChild(
        "search-detail",
        () => import("../views/SearchListView.vue"),
      ),
    ],
  },
];
