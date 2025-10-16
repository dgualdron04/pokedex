import type { Component } from "vue";
import type { RouteRecordRaw, RouteComponent } from "vue-router";

type LazyComp = () => Promise<{ default: Component }>;

export function buildDetailModalChild(
  name: string,
  defaultComponent?: RouteComponent | LazyComp,
): RouteRecordRaw {
  return {
    path: ":name",
    meta: { title: "Pokemon Detail" },
    name,
    components: {
      default: defaultComponent,
      modal: () => import("../views/PokemonDetailView.vue"),
    },
    props: { modal: true },
  };
}
